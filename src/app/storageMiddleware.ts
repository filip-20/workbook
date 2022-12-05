import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from "redux";
import { processQueue, storageActions } from "../features/sheetStorage/sheetStorage";
import { AppDispatch, RootState } from "./store";

export const storageMiddleware: Middleware =
(api: MiddlewareAPI<AppDispatch, RootState>) =>
(next: Dispatch) =>
(action: AnyAction) => {
  let message: string | undefined = undefined;
  const historyChanged = (msg: string) => {
    message = msg;
  }

  console.log('storagemiddleware action: ', action);
  const type = action.type as string;
  if (type.startsWith('sheet/')) {
    message = undefined;
    const res = next({...action, historyChanged});
    const state = api.getState();
    if (message !== undefined) {
      console.log('history changed');
      const fileContent = state.sheet.present.sheetFile;
      const change = {
        content: JSON.stringify(fileContent, null, 2), 
        message
      }
      api.dispatch(storageActions.enqueueChange(change));
      if (state.sheetStorage.status === 'ready') {
        api.dispatch(processQueue())
      }
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
      content: JSON.stringify(fileContent, null, 2), 
      message: type.slice(-4)
    }
    api.dispatch(storageActions.enqueueChange(change));
    if (state.sheetStorage.status === 'ready') {
      api.dispatch(processQueue())
    }
    return res;
  }

  const continueQueue = () => {
    const { status, queue } = api.getState().sheetStorage;
    if (queue.nextIndex < queue.items.length && status === 'ready') {
      api.dispatch(processQueue())
    }
  }

  if (type === 'sheetStorage/processResult' 
      || type === 'sheetStorage/resume'
  ) {
    const res = next(action);
    continueQueue();
    return res;
  }

  return next(action);
}