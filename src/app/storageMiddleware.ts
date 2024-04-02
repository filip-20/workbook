import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from "redux";
import { storageActions } from "../features/sheetStorage/storageSlice";
import { AppDispatch, RootState } from "./store";

export const storageMiddleware: Middleware =
(api: MiddlewareAPI<AppDispatch, RootState>) =>
(next: Dispatch) =>
(action: AnyAction) => {
  let message: string | undefined = undefined;
  const historyChanged = (msg: string) => {
    message = msg;
  }

  const type = action.type as string;
  if (type.startsWith('sheet/')) {
    message = undefined;
    const res = next({...action, historyChanged});
    const state = api.getState();
    if (message !== undefined) {
      console.log('history changed');
      const fileContent = state.sheet.present.sheetFile;
      const change = {
        contentObj: fileContent, //JSON.stringify(fileContent, null, 2), 
        message
      }
      api.dispatch(storageActions.enqueueTask({
        type: 'autosave',
        payload: change
      }));
    } else {
      console.log('history NOT CHANGED')
    }
    return res;
  }
  if (type === '@@redux-undo/UNDO' || type === '@@redux-undo/REDO') {
    const res = next({...action, historyChanged});
    const state = api.getState();
    const fileContent = state.sheet.present.sheetFile;
    const change = {
      contentObj: fileContent,//JSON.stringify(fileContent, null, 2), 
      message: type.slice(-4)
    }
    api.dispatch(storageActions.enqueueTask({
      type: 'autosave',
      payload: change
    }));
    return res;
  }

  if (type === 'storage/processTaskResult') {
    const res = next(action);
    api.dispatch(storageActions.processQueue())
    return res;
  }

  if (type === 'browser/online' || type === 'browser/offline') {
    const res = next(action);
    api.dispatch(storageActions.processQueue());
    return res;
  }

  return next(action);
}