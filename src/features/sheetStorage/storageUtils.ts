import { store } from "../../app/store";
import { storageSelectors, StorageStatus } from "./sheetStorage";

export function waitForStorageIdle() {
  return new Promise<void>((resolve, reject) => {
    const processStatus = (status: StorageStatus) => {
      if (status === 'idle') {
        resolve()
        return true;
      } else if (status !== 'task_finished' && status !== 'processing') {
        reject()
        return true;
      }
      return false;
    }
    if (processStatus(storageSelectors.status(store.getState())) === false) {
      const unsubscribe = store.subscribe(() => {
        if (processStatus(storageSelectors.status(store.getState()))) {
          unsubscribe()
        }
      })
    }
  })
}