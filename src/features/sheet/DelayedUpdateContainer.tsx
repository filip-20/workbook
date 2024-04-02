import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { storageActions } from "../sheetStorage/storageSlice";
import { sheetSelectors } from "./slice/sheetSlice";
import { CellUpdateFunction } from "./cellFactory";

type UpdatableStateCell = {
  onDataChanged: CellUpdateFunction,
  isEdited: boolean,
}

export interface DelayedUpdateContainerProps<T extends UpdatableStateCell> {
  onDelayedUpdate: (getData: () => any) => void
  delay: number,
  unsyncedDataKey: string,
  component: (props: T) => JSX.Element
  props: T
}

export function DelayedUpdateContainer<T extends UpdatableStateCell>({onDelayedUpdate, delay, unsyncedDataKey, component: Component, props}: DelayedUpdateContainerProps<T>) {
  const finishUpdate = useRef<{ timeout: ReturnType<typeof setTimeout>, getData: () => any } | undefined>(undefined);
  const undoRedoCounter = useAppSelector(sheetSelectors.undoRedoCounter);
  const lastUndoRedoCounter = useRef(undoRedoCounter);
  const lastIsEdited = useRef(props.isEdited)
  const dispatch = useAppDispatch();

  // when cell is unmounted pending update is ignored
  useEffect(() => () => {
    console.log('unmounting cell ', unsyncedDataKey);
    const timeout = finishUpdate.current?.timeout;
    if (timeout) {
      let t = performance.now()
      dispatch(storageActions.unsyncedChange({ key: unsyncedDataKey, unsynced: false }))
      console.log('dispatch of unsyncedChange took ', performance.now()-t);
      //dispatch(storageActions.subUnsyncedChange())
      clearTimeout(timeout);
      finishUpdate.current = undefined;
    }
  }, []);

  const updateData = () => {
    const { timeout, getData } = finishUpdate.current!;
    clearTimeout(timeout);
    dispatch(storageActions.unsyncedChange({ key: unsyncedDataKey, unsynced: false }))
    finishUpdate.current = undefined;
    onDelayedUpdate(getData)
  }

  const onDataChangedHandler = (getData: () => any) => {
    //console.log('onupdatehandler ', cellId)
    if (finishUpdate.current === undefined) {
      //console.log('onupdatehandler ', cellId, ': creating timeout')
      //dispatch(storageActions.addUnsyncedChange())
      let t = performance.now()
      dispatch(storageActions.unsyncedChange({ key: unsyncedDataKey, unsynced: updateData }))
      console.log('dispatch of unsyncedChange took ', performance.now() - t);
      finishUpdate.current = {
        timeout: setTimeout(updateData, delay),
        getData
      }
    } else {
      finishUpdate.current.getData = getData;
    }
  }

  // when undo/redo event happened, unsynced changes is ignored 
  if (lastUndoRedoCounter.current !== undoRedoCounter) {
    const timeout = finishUpdate.current?.timeout;
    if (timeout) {
      dispatch(storageActions.unsyncedChange({ key: unsyncedDataKey, unsynced: false }))
      clearTimeout(timeout);
      finishUpdate.current = undefined;
    }
    lastUndoRedoCounter.current = undoRedoCounter;
  }
  // if cell was locked and there are pending update, update should be triggered immediately
  if (lastIsEdited.current !== props.isEdited) {
    if (finishUpdate.current !== undefined) {
      updateData();
    }
    lastIsEdited.current = props.isEdited
  }

  return <><Component {...props} onDataChanged={onDataChangedHandler} /></>
}

