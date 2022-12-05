import { AnyAction, createEntityAdapter, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import undoable, { includeAction } from "redux-undo";
import { AppDispatch, RootState } from '../../../app/store'
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

export interface Cell {
  id: number,
  type: string,
  idCounter: number,
  comments: EntityState<CellComment>,
  isEdited: boolean,
  data: any,
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

export type DeleteRequest = 'cell' | 'comment';
type CellDeletePayload = { cellId: number, cellIndex: number };
type CommentDeletePayload = { cellId: number, commentId: number };
export type DeletePayload = CellDeletePayload | CommentDeletePayload;

export const emptySheet: SheetFile = {
  versionNumber: 1,
  cells: {},
  cellsOrder: [],
};

export interface LocalState {
  sheetId: string,
  cellIdCounter: number,
  deleteRequest?: DeleteRequest,
  deletePayload?: DeletePayload,
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
  localState: { cellIdCounter: 0, sheetId: 'initial' },
}

export const sheetSlice = createSlice({
  name: 'sheet',
  initialState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<{message: string | undefined, newState: SheetState | undefined}>) => {
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
      state.localState = { sheetId, cellIdCounter: 0 }

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

          // set all cells to closed
          for (let id in sf.cells) {
            sf.cells[id].isEdited = false;
          }

          state.sheetFile = sheetFile;
          state.state = 'loaded';
        }
      }
    },
    insertCell: (state, action: PayloadAction<{ afterIndex: number, type: string, data: string }>) => {
      const { afterIndex, type, data } = action.payload;
      const { sheetFile } = state;
      if (afterIndex >= -2 && afterIndex < sheetFile.cellsOrder.length) {
        const cell: Cell = {
          id: state.localState.cellIdCounter,
          type, data,
          idCounter: 0,
          comments: commentsAdapter.getInitialState(),
          isEdited: true,
        };

        sheetFile.cells[cell.id] = cell;
        if (action.payload.afterIndex === -2) {
          sheetFile.cellsOrder.push(cell.id);
        } else {
          sheetFile.cellsOrder.splice(action.payload.afterIndex + 1, 0, cell.id);
        }
        state.localState.cellIdCounter += 1;
        updateHistory(action, `Created new cell of type '${type}'`)
      } else {
        console.log('Invalid afterIndex parameters for insertCell action. ' + action.payload);
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
    setCellEdited: (state, action: PayloadAction<{ cellId: number, isEdited: boolean }>) => {
      const { cellId, isEdited } = action.payload;
      if (cellId in state.sheetFile.cells) {
        state.sheetFile.cells[cellId].isEdited = isEdited
      } else {
        console.log('Invalid cellId parameters for setCellEdited action. ' + action.payload);
      }
    },
    deleteRequest: (state, action: PayloadAction<{ request: DeleteRequest, payload: DeletePayload } | undefined>) => {
      const { localState } = state;
      if (action.payload === undefined) {
        localState.deleteRequest = localState.deletePayload = undefined;
      } else {
        const { request, payload } = action.payload;
        if (!isCellDeletePayload(request, payload) && !isCommentDeletePayload(request, payload)) {
          console.log(`Invalid deletion request or payload. ( ${JSON.stringify(action.payload)} )`)
        } else {
          localState.deleteRequest = request;
          localState.deletePayload = payload;
        }
      }
    },
    confirmDeletion: (state, action: AnyAction) => {
      const { localState } = state;
      const request = localState.deleteRequest;
      const payload = localState.deletePayload;

      if (request === 'cell') {
        if (isCellDeletePayload(request, payload)) {
          const { cellId, cellIndex } = payload;

          const { sheetFile } = state;
          if (cellIndex >= 0 && cellIndex < sheetFile.cellsOrder.length && sheetFile.cells[cellId] !== undefined) {
            delete sheetFile.cells[cellId];
            sheetFile.cellsOrder.splice(cellIndex, 1);
            localState.deleteRequest = localState.deletePayload = undefined;
            updateHistory(action, `Removed cell ${cellId}`);
          } else {
            console.log(`Invalid payload values for cell deletion. (payload: ${payload})`);
          }
        } else {
          console.log(`Invalid payload for cell deletion request (payload: ${payload})`)
        }
      } else if (request === 'comment') {
        if (isCommentDeletePayload(request, payload)) {
          const { cellId, commentId } = payload;

          const { sheetFile } = state;
          if (sheetFile.cells[cellId] !== undefined) {
            const cell = sheetFile.cells[cellId];
            commentsAdapter.removeOne(cell.comments, commentId);
            localState.deleteRequest = localState.deletePayload = undefined;
            updateHistory(action, `Removed comment of cell ${cellId}`);
          } else {
            console.log(`Invalid cellId parameter for comment deletion. (payload: ${payload})`);
          }
        } else {
          console.log(`Invalid payload for comment deletion request (payload: ${payload})`)
        }
      } else {
        console.log(`Invalid deletion confirmation (deleteRequest: ${localState.deleteRequest})`);
      }
    },
    updateSettings: (state, action: PayloadAction<SheetSettings | undefined>) => {
      state.sheetFile.settings = action.payload
      updateHistory(action, 'Updated sheet settings');
    }
  }
});

function updateHistory(action: AnyAction, message: string) {
  if ('historyChanged' in action) {
    (action as unknown as {historyChanged: (msg: string) => void}).historyChanged(message);
  } else {
    console.error('Storage middleware not applied');
  }
}

function isCellDeletePayload(request: DeleteRequest, payload: any): payload is CellDeletePayload {
  const p = payload as CellDeletePayload;
  return request === 'cell' && p.cellId !== undefined && p.cellIndex !== undefined;
}

function isCommentDeletePayload(request: DeleteRequest, payload: any): payload is CommentDeletePayload {
  const p = payload as CommentDeletePayload;
  return request === 'comment' && p.cellId !== undefined && p.commentId !== undefined;
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
            dispatch(sheetSlice.actions.deleteRequest({ request: 'comment', payload: { cellId, commentId } }));
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
  deleteRequest: (state: RootState) => state.sheet.present.localState.deleteRequest,
}

export default undoable(sheetSlice.reducer, {
  filter: includeAction([
    'sheet/insertCell',
    'sheet/updateCellData',
    'sheet/addCellComment',
    'sheet/updateCellComment',
    'sheet/moveUpCell',
    'sheet/moveDownCell',
    'sheet/confirmDeletion',
    'sheet/updateSettings',
  ])
});