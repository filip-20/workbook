import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../../store/store'

export interface Cell {
  id: number,
  type: string,
  data: any,
}

export interface SheetState {
  idCounter: number,
  cells: {[key: number]: Cell},
  cellsOrder: Array<number>,
  firstCellId: number,
  lastCellId: number,
}

const initialState: SheetState = {
  idCounter: 0,
  cells: {},
  cellsOrder: [],
  firstCellId: -1,
  lastCellId: -1,
};

export const sheetSlice = createSlice({
  name: 'sheet',
  initialState,
  reducers: {
    insertCell: (state, action: PayloadAction<{ afterIndex: number, type: string, data: string }>) => {
      const { afterIndex, type, data } = action.payload;
      const cell = {
        id: state.idCounter,
        type,
        data,
      };
      if (afterIndex >= -2 && afterIndex < state.cellsOrder.length) {
        state.cells[cell.id] = cell;
        if (action.payload.afterIndex === -2) {
          state.cellsOrder.push(cell.id);
        } else {
          state.cellsOrder.splice(action.payload.afterIndex+1, 0, cell.id);
        }
        state.idCounter += 1;
        updateFirstLastCellId(state);
      } else {
        console.log('Invalid afterIndex parameters for insertCell action. ' + action.payload);
      }
    },
    removeCell: (state, action: PayloadAction<{cellIndex: number, cellId: number}>) => {
      const {cellIndex, cellId} = action.payload;
      if (cellIndex >= 0 && cellIndex < state.cellsOrder.length && state.cells[cellId] !== undefined) {
        delete state.cells[cellId];
        state.cellsOrder.splice(cellIndex, 1);
      } else {
        console.log('Invalid arguments for removeCell action. ' + action.payload);
      }
    },
    updateCellData: (state, action: PayloadAction<{cellId: number, data: any}>) => {
      const { cellId, data } = action.payload;
      if (state.cells[cellId] !== undefined) {
        state.cells[cellId].data = data;
      } else {
        console.log('Invalid cellId parameters for insertCell action. ' + action.payload);
      }
    },
    moveUpCell: (state, action: PayloadAction<number>) => {
      const cellIndex = action.payload
      if (cellIndex >= 1 && cellIndex < state.cellsOrder.length) {
        const cellId = state.cellsOrder[cellIndex];
        state.cellsOrder.splice(cellIndex, 1);
        state.cellsOrder.splice(cellIndex-1, 0, cellId)
        updateFirstLastCellId(state);
      } else {
        console.log('Invalid cellIndex parameters for moveUpCell action. ' + action.payload);
      }
    },
    moveDownCell: (state, action: PayloadAction<number>) => {
      const cellIndex = action.payload
      if (cellIndex >= 0 && cellIndex < state.cellsOrder.length - 1) {
        const cellId = state.cellsOrder[cellIndex];
        state.cellsOrder.splice(cellIndex, 1);
        state.cellsOrder.splice(cellIndex+1, 0, cellId)
        updateFirstLastCellId(state);
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

/* Actions */
export const { insertCell, removeCell, updateCellData, moveUpCell, moveDownCell } = sheetSlice.actions;
export const insertTextCell = (text: string, afterIndex: number) => insertCell({ afterIndex, type: 'text', data: text })
export const insertAppCell = (type: string, state: any, afterIndex: number) => insertCell({ afterIndex, type, data: state })
/* Selectors */
export const selectCellsOrder = (state: RootState) => state.sheet.cellsOrder;
export const selectCells = (state: RootState) => state.sheet.cells;
export const selectFirstCellId = (state: RootState) => state.sheet.firstCellId;
export const selectLastCellId = (state: RootState) => state.sheet.lastCellId;

export default sheetSlice.reducer;