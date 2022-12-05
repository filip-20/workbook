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

  const type = action.type as string;
  if (type.startsWith('sheet/')) {
    message = undefined;
    const res = next({...action, historyChanged});
    const state = api.getState();
    if (message !== undefined) {
      console.log('history changed');
      const fileContent = state.sheet.sheetFile;
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

  if (type === 'sheetStorage/processResult' 
      || type === 'sheetStorage/resume'
  ) {
    const res = next(action);
    api.dispatch(processQueue())
    return res;
  }

  if (type === 'browser/online' || type === 'browser/offline') {
    const res = next(action);
    api.dispatch(processQueue());
    return res;
  }

  return next(action);
}