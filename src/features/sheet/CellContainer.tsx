import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { sheetActions, sheetSelectors } from "./slice/sheetSlice";
import AddToolbar from './AddToolbar';
import EditToolbar from './EditToolbar';
import AppCell from './AppCell';
import TextCell from './TextCell';
import styles from './CellContainer.module.css';
import AddComment from './AddComment';
import Comments from './Comments';
import { storageActions } from '../sheetStorage/sheetStorage';

export type CellContainerProps = {
  className?: string,
  cellId: number,
  cellIndex: number,
  katexMacros: object,
  onFullscreenToggleClick: (isFullscreen: boolean) => void,
};

export default function CellContainer(props: CellContainerProps) {
  const { className, cellId, cellIndex, katexMacros } = props;
  const { onFullscreenToggleClick } = props;

  const dispatch = useAppDispatch();
  const cell = useAppSelector(sheetSelectors.cell(cellId));
  const { type, data } = cell;
  const unsyncedDataKey = `cellData_${cellId}`;

  const lastCreatedCellId = useAppSelector(sheetSelectors.lastCreatedCellId);
  const undoRedoCounter = useAppSelector(sheetSelectors.undoRedoCounter);
  const lastUndoRedoCounter = useRef(undoRedoCounter);
  const [isEdited, setIsEdited] = useState(lastCreatedCellId === cellId);
  const [addComment, setAddComment] = useState(false);
  const [addToolbarVisible, setAddToolbarVisible] = useState(false);
  const [cellHovered, setCellHovered] = useState(false);
  const addToolbarHovered = useRef(false);
  const dropdownOpened = useRef(false);

  const lastData = useRef<any>(data);
  const finishUpdate = useRef<{timeout: ReturnType<typeof setTimeout>, getData: () => any} | undefined>(undefined);

  const toggleVisibility = (toolbarHovered: boolean, dropdownOpened_: boolean) => {
    addToolbarHovered.current = toolbarHovered
    dropdownOpened.current = dropdownOpened_

    if (dropdownOpened_ || toolbarHovered) {
      setAddToolbarVisible(true);
    } else {
      setAddToolbarVisible(false);
    }
  }

  useEffect(() => () => {
    console.log('unmounting cell ', cellId);
    const timeout = finishUpdate.current?.timeout;
    if (timeout) {
      dispatch(storageActions.unsyncedChange({key: unsyncedDataKey, unsynced: false}))
      //dispatch(storageActions.subUnsyncedChange())
      clearTimeout(timeout);
      finishUpdate.current = undefined;
    }
  }, []);

  if (lastUndoRedoCounter.current !== undoRedoCounter) {
    // data was changed in redux, delayed update must be canceled
    const timeout = finishUpdate.current?.timeout;
    if (timeout) {
      dispatch(storageActions.unsyncedChange({key: unsyncedDataKey, unsynced: false}))
      //dispatch(storageActions.subUnsyncedChange())
      clearTimeout(timeout);
      finishUpdate.current = undefined;
    }
    lastUndoRedoCounter.current = undoRedoCounter;
  }

  const updateData = () => {
    const {timeout, getData} = finishUpdate.current!; 
    const data = getData();
    clearTimeout(timeout);
    //dispatch(storageActions.subUnsyncedChange())
    dispatch(storageActions.unsyncedChange({key: unsyncedDataKey, unsynced: false}))
    finishUpdate.current = undefined;
    if (JSON.stringify(lastData.current) !== JSON.stringify(data)) {
      dispatch(sheetActions.updateCellData({cellId, data}));
      lastData.current = data;
    }
  }

  const toggleEditHandler = () => {
    setIsEdited(prev => {
      const n = !prev;
      if (n === false && finishUpdate.current !== undefined) {
        updateData();
      }
      return n;
    });
  }

  const onDataChangedHandler = (getData: () => any) => {
    console.log('onupdatehandler ', cellId)
    if (finishUpdate.current === undefined) {
      console.log('onupdatehandler ', cellId, ': creating timeout')
      //dispatch(storageActions.addUnsyncedChange())
      dispatch(storageActions.unsyncedChange({key: unsyncedDataKey, unsynced: true}))
      finishUpdate.current = {
        timeout: setTimeout(updateData, 10000), 
        getData
      }
    } else {
      console.log('onupdatehandler', cellId,': timeout exists')
      finishUpdate.current.getData = getData;
    }
  }

  const createCell = (id: number, type: string, onDataChanged: (data: any) => void) => {
    // When undoRedoCounter changes, cells are recreated so they are synced with changed sheet state in redux
    if (type === 'text') {
      return (<TextCell key={undoRedoCounter} katexMacros={katexMacros} isEdited={isEdited} data={cell.data} onDataChanged={onDataChanged} />)
    } else {
      return (<AppCell key={undoRedoCounter} cellId={id} isEdited={isEdited} onDataChanged={onDataChangedHandler} />)
    }
  }

  return (
    <div className={className}>
      <div className='d-flex'
        onMouseEnter={() => setCellHovered(true)}
        onMouseLeave={() => setCellHovered(false)}
      >
        <div
          onDoubleClick={toggleEditHandler}
          className={`${styles.cellWrapper} border`}
          style={{ position: 'relative' }}
        >
          <EditToolbar
            className={styles.editToolbar}
            style={cellHovered ? { display: 'initial' } : { display: 'none' }}
            cellId={cellId} cellIndex={cellIndex}
            isEdited={isEdited}
            onAddComment={() => setAddComment(prev => !prev)}
            onToggleFullscreen={(isFullscreen) => onFullscreenToggleClick(isFullscreen)}
            onToggleEdit={toggleEditHandler}
          />
          <div className="pt-3" style={{ overflowY: 'auto' }}>
            {createCell(cellId, type, onDataChangedHandler)}
          </div>
        </div>
        <div>
          <Comments className='ms-2' style={{ width: '20rem' }} cellId={cellId} />
          {addComment && <AddComment className='ms-2' style={{ width: '20rem' }} unsyncedKey={`newCellComment/${cellId}`} cellId={cellId} onSave={() => setAddComment(false)} onCancel={() => setAddComment(false)} />}
        </div>
      </div>
      <div
        onMouseEnter={() => toggleVisibility(true, dropdownOpened.current)}
        onMouseLeave={() => toggleVisibility(false, dropdownOpened.current)}
        style={{ height: '20px', display: 'flex' }}
      >
        <AddToolbar
          className={styles.addToolbar}
          style={cellHovered || addToolbarVisible ? { display: 'initial' } : { display: 'none' }}
          cellIndex={cellIndex}
          onDropdownToggled={(isOpen) => toggleVisibility(addToolbarHovered.current, isOpen)}
        />
      </div>
    </div>
  )
}