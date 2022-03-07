import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { maxHeaderSize } from "http";
import { RootState } from './store'

export interface Cell {
  id: number,
  type: string,
  data: any,
}

export interface FileInfo {
  owner: string,
  repo: string,
  branch: string,
  path: string,
}

export interface SheetState {
  idCounter: number,
  cells: {[key: number]: Cell},
  cellsOrder: Array<number>,
  firstCellId: number,
  lastCellId: number,
}

export interface SheetSliceData {
  loadState: 'loaded' | 'not_loaded' | 'load_error'
  sheet: SheetState
  fileInfo?: FileInfo
  error?: string
}

export const emptySheet: SheetState = {
  idCounter: 0,
  cells: {},
  cellsOrder: [],
  firstCellId: -1,
  lastCellId: -1,
};

const initialState: SheetSliceData = {
  loadState: 'not_loaded',
  sheet: emptySheet,
}

export const sheetSlice = createSlice({
  name: 'sheet',
  initialState,
  reducers: {
    loadSheet: (state, action: PayloadAction<{json: string, fileInfo: FileInfo}>) => {
      const { json, fileInfo } = action.payload;
      let sheet = null;
      try {
        sheet = JSON.parse(json);
      } catch (e) {
        const syntaxErr = e as SyntaxError
        state.loadState = "load_error"
        state.error = `Súbor zošita je poškodený. (Syntax error: ${syntaxErr.message})`
      }
      if (sheet) {
        const { passed, error } = testSheetIntegrity(sheet);
        if (!passed) {
          state.loadState = "load_error"
          state.error = `Súbor zošita je poškodený. (${error})`;
        } else {
          state.fileInfo = fileInfo;
          state.sheet = sheet;
          state.loadState = 'loaded';
        }
      }
    },
    clearSheet: (state) => {
      state = initialState;
    },
    insertCell: (state, action: PayloadAction<{ afterIndex: number, type: string, data: string }>) => {
      const { afterIndex, type, data } = action.payload;
      const { sheet } = state;
      const cell = {
        id: sheet.idCounter,
        type,
        data,
      };
      if (afterIndex >= -2 && afterIndex < sheet.cellsOrder.length) {
        sheet.cells[cell.id] = cell;
        if (action.payload.afterIndex === -2) {
          sheet.cellsOrder.push(cell.id);
        } else {
          sheet.cellsOrder.splice(action.payload.afterIndex+1, 0, cell.id);
        }
        sheet.idCounter += 1;
        updateFirstLastCellId(sheet);
      } else {
        console.log('Invalid afterIndex parameters for insertCell action. ' + action.payload);
      }
    },
    removeCell: (state, action: PayloadAction<{cellIndex: number, cellId: number}>) => {
      const {cellIndex, cellId} = action.payload;
      const { sheet } = state;
      if (cellIndex >= 0 && cellIndex < sheet.cellsOrder.length && sheet.cells[cellId] !== undefined) {
        delete sheet.cells[cellId];
        sheet.cellsOrder.splice(cellIndex, 1);
      } else {
        console.log('Invalid arguments for removeCell action. ' + action.payload);
      }
    },
    updateCellData: (state, action: PayloadAction<{cellId: number, data: any}>) => {
      const { cellId, data } = action.payload;
      const { sheet } = state;
      if (sheet.cells[cellId] !== undefined) {
        sheet.cells[cellId].data = data;
      } else {
        console.log('Invalid cellId parameters for insertCell action. ' + action.payload);
      }
    },
    moveUpCell: (state, action: PayloadAction<number>) => {
      const cellIndex = action.payload;
      const { sheet } = state;
      if (cellIndex >= 1 && cellIndex < sheet.cellsOrder.length) {
        const cellId = sheet.cellsOrder[cellIndex];
        sheet.cellsOrder.splice(cellIndex, 1);
        sheet.cellsOrder.splice(cellIndex-1, 0, cellId)
        updateFirstLastCellId(sheet);
      } else {
        console.log('Invalid cellIndex parameters for moveUpCell action. ' + action.payload);
      }
    },
    moveDownCell: (state, action: PayloadAction<number>) => {
      const cellIndex = action.payload;
      const { sheet } = state;
      if (cellIndex >= 0 && cellIndex < sheet.cellsOrder.length - 1) {
        const cellId = sheet.cellsOrder[cellIndex];
        sheet.cellsOrder.splice(cellIndex, 1);
        sheet.cellsOrder.splice(cellIndex+1, 0, cellId)
        updateFirstLastCellId(sheet);
      } else {
        console.log('Invalid cellIndex parameters for moveDownCell action. ' + action.payload);
      }
    },
  }
});

function updateFirstLastCellId(state: SheetState) {
  if (state.cellsOrder.length === 0) {
    state.firstCellId = -1;
    state.lastCellId = -1;
  } else {
    state.firstCellId = state.cellsOrder[0];
    state.lastCellId = state.cellsOrder[state.cellsOrder.length-1];
  }
}

function testSheetIntegrity(sheet: SheetState): {passed: boolean, error?: string} {
  let passed = false, error = undefined;

  /* test keys and types of sheet object */
  const reqKeys: {[key: string]: string} = {
    'idCounter': 'number',
    'cells': 'object',
    'cellsOrder': 'object',
    'firstCellId': 'number',
    'lastCellId': 'number',
  }
  for (const [key,value] of Object.entries(sheet)) {
    if (!(key in sheet)) {
      error = `Chýba kľúč '${key}'`;
      break;
    }
    if (typeof value !== reqKeys[key]) {
      error = `Kľúč '${key}' je nesprávneho typu`;
      break;
    }
  }
  if (error) return {passed: false, error};

  /* idCounter is bigger than max id */
  const ids = Object.keys(sheet.cells).map(str => parseInt(str));
  if (sheet.idCounter <= Math.max(...ids)) {
    error = 'Hodnota idCounter je menšia ako maximálne ID bunky';
  }
  if (error) return {passed: false, error};

  /* cellsOrder has no duplicates */
  if (new Set(sheet.cellsOrder).size !== sheet.cellsOrder.length) {
    error = 'Poradie buniek obsahuje duplicitné hodnoty';
  }
  if (error) return {passed: false, error};
  

  return {passed: true}
}

/* Actions */
export const { loadSheet, clearSheet, insertCell, removeCell, updateCellData, moveUpCell, moveDownCell } = sheetSlice.actions;
export const insertTextCell = (text: string, afterIndex: number) => insertCell({ afterIndex, type: 'text', data: text })
export const insertAppCell = (type: string, state: any, afterIndex: number) => insertCell({ afterIndex, type, data: state })
/* Selectors */
export const selectLoadState = (state: RootState) => state.sheet.loadState;
export const selectSheetError = (state: RootState) => state.sheet.error;
export const selectCellsOrder = (state: RootState) => state.sheet.sheet.cellsOrder;
export const selectCells = (state: RootState) => state.sheet.sheet.cells;
export const selectFirstCellId = (state: RootState) => state.sheet.sheet.firstCellId;
export const selectLastCellId = (state: RootState) => state.sheet.sheet.lastCellId;

export default sheetSlice.reducer;