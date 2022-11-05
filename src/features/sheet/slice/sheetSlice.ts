import { createEntityAdapter, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from '../../../app/store'
import { pathURIEncode } from "../../repository/RepoExplorer";
import { openSheet } from "./openCloseSession";
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

export interface FileInfo {
  owner: string,
  repo: string,
  branch: string,
  path: string,
  sha: string,
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

interface CommitInfo {
  id: number,
  message: string,
  json: string,
}

export type SheetState = 'loaded' | 'not_loaded' | 'loading' | 'load_error' | 'save_error' | 'update_detected';
export type DeleteRequest = 'cell' | 'comment';
type CellDeletePayload = { cellId: number, cellIndex: number };
type CommentDeletePayload = { cellId: number, commentId: number };
export type DeletePayload = CellDeletePayload | CommentDeletePayload;

export interface SheetSliceData {
  state: SheetState,
  sheetFile: SheetFile,
  cellIdCounter: number,

  commitIdCounter: number,
  commitQueue: Array<CommitInfo>,
  resumeCommitter?: boolean,
  queueHead?: CommitInfo
  fileInfo?: FileInfo,

  openedFile?: { owner: string, repo: string, path: string, branch: string },

  deleteRequest?: DeleteRequest,
  deletePayload?: DeletePayload,

  errorCode?: number,
  error?: string
}

export const emptySheet: SheetFile = {
  versionNumber: 1,
  cells: {},
  cellsOrder: [],
};

const initialState: SheetSliceData = {
  state: 'not_loaded',
  cellIdCounter: 0,
  commitIdCounter: 0,
  commitQueue: [],
  sheetFile: emptySheet,
}

export const sheetSlice = createSlice({
  name: 'sheet',
  initialState,
  reducers: {
    loadSheet: (state, action: PayloadAction<{ json: string, fileInfo: FileInfo }>) => {
      const { json, fileInfo } = action.payload;
      let sheetFile = null;
      try {
        sheetFile = JSON.parse(json);
      } catch (e) {
        const syntaxErr = e as SyntaxError
        state.state = "load_error"
        state.error = `Súbor zošita je poškodený: ${syntaxErr.message}`
      }
      if (sheetFile) {
        const { passed, error } = testSheetIntegrity(sheetFile);
        if (!passed) {
          state.state = "load_error"
          state.error = `Súbor zošita je poškodený: ${error}`;
        } else {
          const sf = sheetFile as SheetFile
          state.fileInfo = fileInfo;
          
          // initialize cellIdCounter with max cell id + 1
          state.cellIdCounter = Object.entries(sf.cells).map(e => e[1].id).reduce((prev, cur) => Math.max(prev, cur), 0) + 1
          
          // set all cells to closed
          for (let id in sf.cells) {
            sf.cells[id].isEdited = false;
          }

          state.sheetFile = sheetFile;
          state.state = 'loaded';
        }
      }
    },
    clearSheet: (state) => {
      state = initialState;
    },
    setState: (state, action: PayloadAction<SheetState>) => {
      state.state = action.payload
    },
    dequeueCommit: (state, action: PayloadAction<{ id: number, updateSha: string }>) => {
      const { id, updateSha } = action.payload;
      if (state.commitQueue.length !== 0) {
        if (state.commitQueue[0].id === id) {
          state.commitQueue.shift();
          state.fileInfo && (state.fileInfo.sha = updateSha);
          if (state.commitQueue.length !== 0) {
            state.queueHead = state.commitQueue[0];
          } else {
            state.queueHead = undefined;
          }
        } else {
          console.log('dequeueCommit: head contains different commit id');
        }
      } else {
        console.log('Commit queue is empty, cannot call dequeueCommit');
      }
    },
    setOpenedFile: (state, action: PayloadAction<{ owner: string, repo: string, path: string, branch: string } | undefined>) => {
      state.openedFile = action.payload;
    },
    setError: (state, action: PayloadAction<{ errorCode: number, errorMsg: string, newState: SheetState | undefined }>) => {
      const { errorCode, errorMsg, newState } = action.payload;
      state.errorCode = errorCode;
      state.error = errorMsg;
      newState != undefined && (state.state = newState);
    },
    saveError: (state, action: PayloadAction<{ errorCode: number, errorMsg: string }>) => {
      const { errorCode, errorMsg } = action.payload;
      state.state = 'save_error';
      state.errorCode = errorCode;
      state.error = errorMsg;
    },
    resumeCommitter: (state) => {
      state.resumeCommitter = true;
    },
    resumeCommitterAck: (state) => {
      state.state = 'loaded';
      state.resumeCommitter = undefined;
    },
    insertCell: (state, action: PayloadAction<{ afterIndex: number, type: string, data: string }>) => {
      const { afterIndex, type, data } = action.payload;
      const { sheetFile } = state;
      if (afterIndex >= -2 && afterIndex < sheetFile.cellsOrder.length) {
        const cell: Cell = {
          id: state.cellIdCounter,
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
        state.cellIdCounter += 1;
        enqueUpdate(state, `Created new cell of type '${type}'`)
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
        enqueUpdate(state, `Updated cell ${cellId}`)
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
        enqueUpdate(state, `Added comment to cell ${cellId}`);
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
        enqueUpdate(state, `Updated comment ${commentId} in cell ${cellId}`);
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
        enqueUpdate(state, `Moved up cell ${cellId}`);
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
        enqueUpdate(state, `Moved down cell ${cellId}`)
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
      if (action.payload === undefined) {
        state.deleteRequest = state.deletePayload = undefined;
      } else {
        const { request, payload } = action.payload;
        if (!isCellDeletePayload(request, payload) && !isCommentDeletePayload(request, payload)) {
          console.log(`Invalid deletion request or payload. ( ${JSON.stringify(action.payload)} )`)
        } else {
          state.deleteRequest = request;
          state.deletePayload = payload;
        }
      }
    },
    confirmDeletion: (state) => {
      const request = state.deleteRequest;
      const payload = state.deletePayload;

      if (request === 'cell') {
        if (isCellDeletePayload(request, payload)) {
          const { cellId, cellIndex } = payload;

          const { sheetFile } = state;
          if (cellIndex >= 0 && cellIndex < sheetFile.cellsOrder.length && sheetFile.cells[cellId] !== undefined) {
            delete sheetFile.cells[cellId];
            sheetFile.cellsOrder.splice(cellIndex, 1);
            state.deleteRequest = state.deletePayload = undefined;
            enqueUpdate(state, `Removed cell ${cellId}`);
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
            state.deleteRequest = state.deletePayload = undefined;
            enqueUpdate(state, `Removed comment of cell ${cellId}`);
          } else {
            console.log(`Invalid cellId parameter for comment deletion. (payload: ${payload})`);
          }
        } else {
          console.log(`Invalid payload for comment deletion request (payload: ${payload})`)
        }
      } else {
        console.log(`Invalid deletion confirmation (deleteRequest: ${state.deleteRequest})`);
      }
    },
    updateSettings: (state, action: PayloadAction<SheetSettings | undefined>) => {
      state.sheetFile.settings = action.payload
      enqueUpdate(state, 'Updated sheet settings');
    }
  }
});

function isValidSheetFilename(filename: string) {
  
}

function isCellDeletePayload(request: DeleteRequest, payload: any): payload is CellDeletePayload {
  const p = payload as CellDeletePayload;
  return request === 'cell' && p.cellId !== undefined && p.cellIndex !== undefined;
}

function isCommentDeletePayload(request: DeleteRequest, payload: any): payload is CommentDeletePayload {
  const p = payload as CommentDeletePayload;
  return request === 'comment' && p.cellId !== undefined && p.commentId !== undefined;
}

function enqueUpdate(data: SheetSliceData, message: string) {
  const commit = { id: data.commitIdCounter++, message, json: JSON.stringify(data.sheetFile, null, 2) };
  data.commitQueue.push(commit);
  if (data.commitQueue.length === 1) {
    data.queueHead = commit;
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
    const cell = state.sheet.sheetFile.cells[cellId]
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
export const sheetActions = { ...sheetSlice.actions, openSheet, addCellComment, remmoveCellComment, insertTextCell, insertAppCell };
/* Selectors */
export const sheetSelectors = {
  state: (state: RootState) => state.sheet.state,
  error: (state: RootState) => state.sheet.error,
  errorCode: (state: RootState) => state.sheet.errorCode,
  openedFile: (state: RootState) => state.sheet.openedFile,
  commitQueueHead: (state: RootState) => state.sheet.queueHead,
  commitQueue: (state: RootState) => state.sheet.commitQueue,
  resumeCommitter: (state: RootState) => state.sheet.resumeCommitter,
  fileInfo: (state: RootState) => state.sheet.fileInfo,
  cellsOrder: (state: RootState) => state.sheet.sheetFile.cellsOrder,
  cells: (state: RootState) => state.sheet.sheetFile.cells,
  cell: (cellId: number) => { return (state: RootState) => state.sheet.sheetFile.cells[cellId] },
  sheetSettings: (state: RootState) => state.sheet.sheetFile.settings || defaultSettings,
  firstCellId: (state: RootState) => state.sheet.sheetFile.cellsOrder.length === 0 ? -1 : state.sheet.sheetFile.cellsOrder[0],
  lastCellId: (state: RootState) => state.sheet.sheetFile.cellsOrder.length === 0 ? -1 : state.sheet.sheetFile.cellsOrder[state.sheet.sheetFile.cellsOrder.length - 1],
  cellComments: (cellId: number) => { return (state: RootState) => commentsAdapter.getSelectors().selectAll(state.sheet.sheetFile.cells[cellId].comments) },
  deleteRequest: (state: RootState) => state.sheet.deleteRequest,
}

export default sheetSlice.reducer;