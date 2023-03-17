import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { sheetActions, sheetSelectors } from "./slice/sheetSlice";
import AddToolbar from './AddToolbar';
import EditToolbar from './EditToolbar';
import AddComment from './AddComment';
import Comments from './Comments';
import { storageActions } from '../sheetStorage/sheetStorage';
import styles from './CellContainer.module.scss';
import classNames from 'classnames/dedupe';
import { renderCellComponent } from './cellFactory';

import config from '../../config.json';

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
  const hasComments = useAppSelector(sheetSelectors.cellComments(cellId)).length > 0;

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
      dispatch(storageActions.unsyncedChange({key: unsyncedDataKey, unsynced: updateData}))
      finishUpdate.current = {
        timeout: setTimeout(updateData,
                  config.frontend.cellUpdateIntervalSec * 1000), 
        getData
      }
    } else {
      finishUpdate.current.getData = getData;
    }
  }

  return (
    <div className={className}>
      <Row
        className='g-2'
        onMouseEnter={() => setCellHovered(true)}
        onMouseLeave={() => setCellHovered(false)}
      >
        <Col xs={!(hasComments || addComment) || 8} xl={!(hasComments || addComment) || 9}>
          <div
            onDoubleClick={toggleEditHandler}
            className={classNames(styles.cellWrapper,
              'border w-100 position-relative',
              {[styles.isEdited]: isEdited})}
            tabIndex={0}
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
            <div className={styles.cellContent}>
              {renderCellComponent({
                cellLoc: {id: cellId, index: cellIndex},
                /* When undoRedoCounter changes, cells are recreated so they are synced with changed sheet state in redux */
                key: undoRedoCounter,
                katexMacros,
                isEdited,
                onDataChanged: onDataChangedHandler,
                typeName: type,
              })}
            </div>
          </div>
        </Col>
        {(hasComments || addComment) &&
          <Col xs={4} xl={3}>
            <Comments cellId={cellId} katexMacros={katexMacros} />
            {addComment &&
              <AddComment
                unsyncedKey={`newCellComment/${cellId}`}
                cellId={cellId}
                onSave={() => setAddComment(false)}
                onCancel={() => setAddComment(false)}
                katexMacros={katexMacros}
              />}
          </Col>
        }
      </Row>
      <div
        onMouseEnter={() => toggleVisibility(true, dropdownOpened.current)}
        onMouseLeave={() => toggleVisibility(false, dropdownOpened.current)}
        className={classNames('d-flex', styles.addToolbarContainer)}
      >
        <AddToolbar
          className={styles.addToolbar}
          style={cellHovered || addToolbarVisible ? { display: 'initial' } : { display: 'none' }}
          cellLoc={{id: cellId, index: cellIndex}}
          onDropdownToggled={(isOpen) => toggleVisibility(addToolbarHovered.current, isOpen)}
        />
      </div>
    </div>
  )
}