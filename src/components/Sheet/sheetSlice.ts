import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../../store/store'

export interface Cell {
  id: number,
  type: string,
  data: string,
}

export interface SheetState {
  idCounter: number,
  cells: Array<Cell>,
  firstCellId: number,
  lastCellId: number,
}

const initialState: SheetState = {
  idCounter: 0,
  cells: [],
  firstCellId: -1,
  lastCellId: -1,
};

export const sheetSlice = createSlice({
  name: 'sheet',
  initialState,
  reducers: {
    insertCell: (state, action: PayloadAction<{ afterId: number, type: string, data: string }>) => {
      const cell = {
        id: state.idCounter,
        type: action.payload.type,
        data: action.payload.data
      };
      if (action.payload.afterId === -1) {
        state.cells.push(cell);
      } else {
        const index = state.cells.findIndex((cell) => cell.id === action.payload.afterId);
        state.cells.splice(index+1, 0, cell);
      }
      state.idCounter += 1;
      updateFirstLastCellId(state);
    },
    removeCell: (state, action: PayloadAction<number>) => {
      const index = state.cells.findIndex((cell) => cell.id === action.payload);
      if (index !== -1) {
        state.cells.splice(index, 1)
        updateFirstLastCellId(state);
      }
    },
    moveUpCell: (state, action: PayloadAction<number>) => {
      const cellId = action.payload
      const index = state.cells.findIndex((cell) => cell.id === cellId);
      if (index !== -1 && index !== 0) {
        const cell = state.cells[index]
        state.cells.splice(index, 1)
        state.cells.splice(index-1, 0, cell)
        
        updateFirstLastCellId(state);
      }
    },
    moveDownCell: (state, action: PayloadAction<number>) => {
      const cellId = action.payload
      const index = state.cells.findIndex((cell) => cell.id === cellId);
      if (index !== -1 && index !== state.cells.length - 1) {
        const cell = state.cells[index]
        state.cells.splice(index, 1)
        state.cells.splice(index+1, 0, cell)
        updateFirstLastCellId(state);
      }
    },
  }
});

function updateFirstLastCellId(state: SheetState) {
  if (state.cells.length === 0) {
    state.firstCellId = -1;
    state.lastCellId = -1;
  } else {
    state.firstCellId = state.cells[0].id;
    state.lastCellId = state.cells[state.cells.length-1].id
  }
}

/* Actions */
export const { insertCell, removeCell, moveUpCell, moveDownCell } = sheetSlice.actions;
export const insertTextCell = (text: string, afterId: number) => insertCell({ afterId, type: 'text', data: text })
export const insertAppCell = (type: string, state: string, afterId: number) => insertCell({ afterId, type, data: state })
/* Selectors */
export const selectCells = (state: RootState) => state.sheet.cells;
export const selectFirstCellId = (state: RootState) => state.sheet.firstCellId;
export const selectLastCellId = (state: RootState) => state.sheet.lastCellId;

export default sheetSlice.reducer;