import { AnyAction, createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import undoable, { includeAction } from "redux-undo";
import { AppDispatch, RootState } from '../../../app/store'
import { ContextExtension, LogicContext, cellContext } from "./logicContext";
import { testSheetIntegrity } from "./sheetVersions";

export interface CellComment {
  id: number,
  author: string,
  timestamp: number,
  text: string,
}

const commentsAdapter = createEntityAdapter({
  sortComparer: (a: CellComment, b: CellComment) => a.timestamp - b.timestamp
});

export interface CellLocator {
  id: number,
  index: number,
}

export interface Cell {
  id: number,
  type: string,
  idCounter: number,
  comments: EntityState<CellComment>,
  data: any,
  contextExtension?: ContextExtension,
}

export interface SheetSettings {
  katexMacros?: string
}

const defaultSettings: SheetSettings = {
  katexMacros: ''
}

export interface SheetFile {
  versionNumber?: number,
  settings?: SheetSettings,
  cells: { [key: number]: Cell },
  cellsOrder: Array<number>,
}

export const emptySheet: SheetFile = {
  versionNumber: 1,
  cells: {},
  cellsOrder: [],
};

export interface LocalState {
  sheetId: string,
  cellIdCounter: number,
  undoRedoCounter: number,
  lastCreatedCellId?: number,
}

export type SheetState = 'not_loaded' | 'loading' | 'loaded' | 'load_error';

export interface SheetSlice {
  state: SheetState,
  errorMessage?: string,
  sheetFile: SheetFile,
  localState: LocalState,
}

const initialState: SheetSlice = {
  state: 'not_loaded',
  sheetFile: emptySheet,
  localState: {
    cellIdCounter: 0,
    undoRedoCounter: 0,
    sheetId: 'initial',
  },
}

export const sheetSlice = createSlice({
  name: 'sheet',
  initialState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<{ message: string | undefined, newState: SheetState | undefined }>) => {
      const { message, newState } = action.payload;
      state.errorMessage = message;
      if (newState !== undefined) {
        state.state = newState;
      }
    },
    startLoading: (state) => {
      state.state = 'loading';
    },
    initFromJson: (state, action: PayloadAction<{ json: string, sheetId: string }>) => {
      const { json, sheetId } = action.payload;

      state.sheetFile = emptySheet;
      state.localState = {
        ...initialState.localState,
        sheetId
      }

      let sheetFile = null;
      try {
        sheetFile = JSON.parse(json);
      } catch (e) {
        const syntaxErr = e as SyntaxError
        state.state = "load_error";
        state.errorMessage = `JSON parse failed: ${syntaxErr.message}`;
      }
      if (sheetFile) {
        const { passed, error } = testSheetIntegrity(sheetFile);
        if (!passed) {
          state.state = "load_error"
          state.errorMessage = `JSON file does not contain propper workbook: ${error}`;
        } else {
          const { localState } = state;
          const sf = sheetFile as SheetFile

          // initialize cellIdCounter with max cell id + 1
          localState.cellIdCounter = Object.entries(sf.cells).map(e => e[1].id).reduce((prev, cur) => Math.max(prev, cur), 0) + 1

          /*
          for (let id of sf.cellsOrder) {
            localState.logicContext[id] = undefined;
          }*/

          state.sheetFile = sheetFile;
          state.state = 'loaded';
        }
      }
    },
    insertCell: (state, action: PayloadAction<{ afterIndex: number, type: string, data: any }>) => {
      const { afterIndex, type, data } = action.payload;
      const { sheetFile } = state;
      if (afterIndex >= -2 && afterIndex < sheetFile.cellsOrder.length) {
        const cell: Cell = {
          id: state.localState.cellIdCounter,
          type, data,
          idCounter: 0,
          comments: commentsAdapter.getInitialState(),
        };

        sheetFile.cells[cell.id] = cell;
        if (action.payload.afterIndex === -2) {
          sheetFile.cellsOrder.push(cell.id);
        } else {
          sheetFile.cellsOrder.splice(action.payload.afterIndex + 1, 0, cell.id);
        }
        state.localState.cellIdCounter += 1;
        state.localState.lastCreatedCellId = cell.id;
        updateHistory(action, `Created new cell of type '${type}'`)
      } else {
        console.log('Invalid afterIndex parameters for insertCell action. ' + action.payload);
      }
    },
    duplicateCell: (state, action: PayloadAction<{ cellId: number, cellIndex: number }>) => {
      const { cellId, cellIndex } = action.payload;
      const { sheetFile } = state;
      if (sheetFile.cells[cellId] !== undefined) {
        const srcCell = sheetFile.cells[cellId];
        const { type } = srcCell;
        const data = JSON.parse(JSON.stringify(srcCell.data))

        const newCell: Cell = {
          id: state.localState.cellIdCounter,
          type, data,
          idCounter: 0,
          comments: commentsAdapter.getInitialState(),
        };
        state.localState.cellIdCounter += 1;

        sheetFile.cells[newCell.id] = newCell;
        sheetFile.cellsOrder.splice(cellIndex + 1, 0, newCell.id);

        updateHistory(action, `Duplicated cell ${cellId}`)
      } else {
        console.log('Invalid cellId parameter for duplicateCell action. ' + action.payload);
      }
    },
    updateCellData: (state, action: PayloadAction<{ cellId: number, data: any }>) => {
      const { cellId, data } = action.payload;
      const { sheetFile } = state;
      if (sheetFile.cells[cellId] !== undefined) {
        sheetFile.cells[cellId].data = data;
        console.log(`updating cell ${cellId} data`)
        //console.log(data);
        updateHistory(action, `Updated cell ${cellId}`)
      } else {
        console.log('Invalid cellId parameters for updateCellData action. ' + action.payload);
      }
    },
    addCellComment: (state, action: PayloadAction<{ cellId: number, author: string, text: string }>) => {
      const { cellId, author, text } = action.payload;
      const { sheetFile } = state;
      if (sheetFile.cells[cellId] !== undefined) {
        const cell = sheetFile.cells[cellId];
        const comment: CellComment = {
          author, text, timestamp: new Date().getTime(), id: cell.idCounter++
        }
        commentsAdapter.addOne(cell.comments, comment);
        updateHistory(action, `Added comment to cell ${cellId}`);
      } else {
        console.log('Invalid cellId parameters for addCellComment action. ' + action.payload);
      }
    },
    updateCellComment: (state, action: PayloadAction<{ cellId: number, commentId: number, text: string }>) => {
      const { cellId, commentId, text } = action.payload;
      const { sheetFile } = state;
      if (sheetFile.cells[cellId] !== undefined) {
        const cell = sheetFile.cells[cellId];

        commentsAdapter.updateOne(cell.comments, { id: commentId, changes: { text, timestamp: new Date().getTime() } })
        updateHistory(action, `Updated comment ${commentId} in cell ${cellId}`);
      } else {
        console.log('Invalid cellId parameters for updateCellComment action. ' + action.payload);
      }
    },
    moveUpCell: (state, action: PayloadAction<number>) => {
      const cellIndex = action.payload;
      const { sheetFile } = state;
      if (cellIndex >= 1 && cellIndex < sheetFile.cellsOrder.length) {
        const cellId = sheetFile.cellsOrder[cellIndex];
        sheetFile.cellsOrder.splice(cellIndex, 1);
        sheetFile.cellsOrder.splice(cellIndex - 1, 0, cellId);
        updateHistory(action, `Moved up cell ${cellId}`);
      } else {
        console.log('Invalid cellIndex parameters for moveUpCell action. ' + action.payload);
      }
    },
    moveDownCell: (state, action: PayloadAction<number>) => {
      const cellIndex = action.payload;
      const { sheetFile } = state;
      if (cellIndex >= 0 && cellIndex < sheetFile.cellsOrder.length - 1) {
        const cellId = sheetFile.cellsOrder[cellIndex];
        sheetFile.cellsOrder.splice(cellIndex, 1);
        sheetFile.cellsOrder.splice(cellIndex + 1, 0, cellId)
        updateHistory(action, `Moved down cell ${cellId}`)
      } else {
        console.log('Invalid cellIndex parameters for moveDownCell action. ' + action.payload);
      }
    },
    deleteCell: (state, action: PayloadAction<{ cellId: number, cellIndex: number }>) => {
      const { localState } = state;
      const { cellId, cellIndex } = action.payload;

      const { sheetFile } = state;
      if (cellIndex >= 0 && cellIndex < sheetFile.cellsOrder.length && sheetFile.cells[cellId] !== undefined) {
        delete sheetFile.cells[cellId];
        sheetFile.cellsOrder.splice(cellIndex, 1);
        updateHistory(action, `Removed cell ${cellId}`);
      } else {
        console.log(`Invalid payload values for cell deletion. (payload: ${action.payload})`);
      }
    },
    deleteComment: (state, action: PayloadAction<{ cellId: number, commentId: number }>) => {
      const { localState } = state;
      const { cellId, commentId } = action.payload;

      const { sheetFile } = state;
      if (sheetFile.cells[cellId] !== undefined) {
        const cell = sheetFile.cells[cellId];
        commentsAdapter.removeOne(cell.comments, commentId);
        updateHistory(action, `Removed comment of cell ${cellId}`);
      } else {
        console.log(`Invalid cellId parameter for comment deletion. (payload: ${action.payload})`);
      }
    },
    updateSettings: (state, action: PayloadAction<SheetSettings | undefined>) => {
      state.sheetFile.settings = action.payload
      updateHistory(action, 'Updated sheet settings');
    },
    syncUndoRedoCounter: (state, action: PayloadAction<number>) => {
      state.localState.undoRedoCounter = action.payload;
    },
    extendLogicContext: (state, action: PayloadAction<{ cellLoc: CellLocator, contextExtension: ContextExtension }>) => {
      const { cellLoc, contextExtension } = action.payload;
      if (JSON.stringify(state.sheetFile.cells[cellLoc.id].contextExtension) !== JSON.stringify(contextExtension)) {
        state.sheetFile.cells[cellLoc.id].contextExtension = contextExtension;
        console.log('updating context of ', cellLoc);
      }
    },
  }
});

function updateHistory(action: AnyAction, message: string) {
  if ('historyChanged' in action) {
    (action as unknown as { historyChanged: (msg: string) => void }).historyChanged(message);
  } else {
    console.error('Storage middleware not applied');
  }
}

const addCellComment = function (payload: { cellId: number, text: string }) {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    if (state.auth.user) {
      const author = state.auth.user.login;
      const { cellId, text } = payload;
      dispatch(sheetSlice.actions.addCellComment({ cellId, author, text }));
    }
  }
}

const remmoveCellComment = function (payload: { cellId: number, commentId: number }) {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const { cellId, commentId } = payload;
    const cell = state.sheet.present.sheetFile.cells[cellId]
    if (cell !== undefined) {
      if (state.auth.user) {
        const user = state.auth.user.login;
        const comment = commentsAdapter.getSelectors().selectById(cell.comments, commentId);
        if (comment) {
          if (comment.author === user) {
            dispatch(sheetSlice.actions.deleteComment({ cellId, commentId }));
          } else {
            console.log('You can delete only your own comments. ' + payload);
          }
        } else {
          console.log('Invalid commentId parameter for removeCellComment action. ' + payload);
        }
      } else {
        console.log('Auth state error, can\'t use remmoveCellComment' + payload);
      }
    } else {
      console.log('Invalid cellId parameter for removeCellComment action. ' + payload);
    }
  }
}

/* Actions */
const insertTextCell = (text: string, afterIndex: number) => sheetActions.insertCell({ afterIndex, type: 'text', data: text })
const insertAppCell = (type: string, state: any, afterIndex: number) => sheetActions.insertCell({ afterIndex, type, data: state })
export const sheetActions = { ...sheetSlice.actions, addCellComment, remmoveCellComment, insertTextCell, insertAppCell };

export interface CellLocator {
  id: number,
  index: number,
}

/* Selectors */
export const sheetSelectors = {
  state: (state: RootState) => state.sheet.present.state,
  sheetId: (state: RootState) => state.sheet.present.localState.sheetId,
  error: (state: RootState) => state.sheet.present.errorMessage,
  cellsOrder: (state: RootState) => state.sheet.present.sheetFile.cellsOrder,
  cells: (state: RootState) => state.sheet.present.sheetFile.cells,
  cell: (cellId: number) => { return (state: RootState) => state.sheet.present.sheetFile.cells[cellId] },
  sheetSettings: (state: RootState) => state.sheet.present.sheetFile.settings || defaultSettings,
  firstCellId: (state: RootState) => state.sheet.present.sheetFile.cellsOrder.length === 0 ? -1 : state.sheet.present.sheetFile.cellsOrder[0],
  lastCellId: (state: RootState) => state.sheet.present.sheetFile.cellsOrder.length === 0 ? -1 : state.sheet.present.sheetFile.cellsOrder[state.sheet.present.sheetFile.cellsOrder.length - 1],
  cellComments: (cellId: number) => { return (state: RootState) => commentsAdapter.getSelectors().selectAll(state.sheet.present.sheetFile.cells[cellId].comments) },
  undoRedoCounter: (state: RootState) => state.sheet.present.localState.undoRedoCounter,
  lastCreatedCellId: (state: RootState) => state.sheet.present.localState.lastCreatedCellId,
  logicContext: (cell: CellLocator) => cellContext(cell),
}

export default undoable(sheetSlice.reducer, {
  filter: includeAction([
    'sheet/insertCell',
    'sheet/duplicateCell',
    'sheet/updateCellData',
    'sheet/addCellComment',
    'sheet/updateCellComment',
    'sheet/moveUpCell',
    'sheet/moveDownCell',
    'sheet/deleteCell',
    'sheet/deleteComment',
    'sheet/updateSettings',
  ])
});