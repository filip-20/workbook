import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CellLocator, sheetActions, sheetSelectors } from "./slice/sheetSlice";
import AddToolbar from './AddToolbar';
import EditToolbar from './EditToolbar';
import AddComment from './AddComment';
import Comments from './Comments';
import { storageActions } from '../sheetStorage/storageSlice';
import styles from './CellContainer.module.scss';
import classNames from 'classnames/dedupe';
import { RenderPayload, getCellComponentFunction, renderCellComponent } from './cellFactory';

import config from '../../config.json';
import { DelayedUpdateContainer } from './DelayedUpdateContainer';

export type CellContainerProps = {
  className?: string,
  cellLoc: CellLocator,
  katexMacros: object,
  fullscreenCell: CellLocator | undefined,
  onFullscreenToggleClick: (isFullscreen: boolean, cellLoc: CellLocator) => void,
};

export default function CellContainer({ className, cellLoc, katexMacros, fullscreenCell, onFullscreenToggleClick }: CellContainerProps) {
  const dispatch = useAppDispatch();
  const { id: cellId } = cellLoc;
  const cell = useAppSelector(sheetSelectors.cell(cellLoc));
  const { type, data } = cell;
  const unsyncedDataKey = `cellData_${cellId}_${type.replace('/','_')}`;

  const undoRedoCounter = useAppSelector(sheetSelectors.undoRedoCounter);
  const lastCreatedCellId = useAppSelector(sheetSelectors.lastCreatedCellId);
  const [isEdited, setIsEdited] = useState(
    /* ensures newly created cell is editable */
    lastCreatedCellId === cellId && type !== 'context'
  );
  const [addComment, setAddComment] = useState(false);
  const [addToolbarVisible, setAddToolbarVisible] = useState(false);
  const [cellHovered, setCellHovered] = useState(false);
  const addToolbarHovered = useRef(false);
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const hasComments = useAppSelector(sheetSelectors.cellComments(cellLoc)).length > 0;

  const lastData = useRef<any>(data);

  const toggleVisibility = (toolbarHovered: boolean, dropdownOpened_: boolean) => {
    addToolbarHovered.current = toolbarHovered
    //dropdownOpened.current = dropdownOpened_
    setDropdownOpened(dropdownOpened_)

    if (dropdownOpened_ || toolbarHovered) {
      setAddToolbarVisible(true);
    } else {
      setAddToolbarVisible(false);
    }
  }

  const toggleEditHandler = () => {
    setIsEdited(prev => !prev);
  }

  const requestEditMode = (isEdited1: boolean) => {
    if (isEdited1 && !isEdited) {
      toggleEditHandler();
    } else if (!isEdited1 && isEdited) {
      toggleEditHandler();
    }
  }

  const onDelayedUpdate = (getData: () => any) => {
    const data = getData();
    if (JSON.stringify(lastData.current) !== JSON.stringify(data)) {
      dispatch(sheetActions.updateCellData({ cellLoc, data }));
      lastData.current = data;
    }
  }

  const addToolbarStyle = () => {
    let style: React.CSSProperties = {};
    style.display = cellHovered || addToolbarVisible ? 'initial' : 'none';
    style.zIndex = dropdownOpened ? 1050 : undefined;
    return style;
  }

  return (
    <div
      className={
        classNames(className)
      }
    >
      <Row
        className='g-2'
        onMouseEnter={() => setCellHovered(true)}
        onMouseLeave={() => setCellHovered(false)}
      >
        <Col xs={!(hasComments || addComment) || 8} xl={!(hasComments || addComment) || 9}>
          <div
            // unlock with double click
            onDoubleClick={() => requestEditMode(true)}
            className={classNames(styles.cellContainer,
              'w-100 position-relative',
              {
                [styles.isEdited]: isEdited,
                [styles.notContextContainer]: type !== 'context',
              })}
            tabIndex={0}
          >
            <EditToolbar
              className={type === 'context' ? styles.editToolbarCtx : styles.editToolbar}
              style={cellHovered ? { display: 'initial' } : { display: 'none' }}
              cellLoc={cellLoc}
              isEdited={isEdited}
              onAddComment={() => setAddComment(prev => !prev)}
              onToggleFullscreen={(isFullscreen) => onFullscreenToggleClick(isFullscreen, cellLoc)}
              onToggleEdit={toggleEditHandler}
            />
            <div className={styles.cellContent}>
              <DelayedUpdateContainer
                onDelayedUpdate={onDelayedUpdate}
                delay={config.frontend.cellUpdateIntervalSec * 1000}
                unsyncedDataKey={unsyncedDataKey}
                component={getCellComponentFunction(type)}
                props={{
                  cellLoc,
                  /* When undoRedoCounter changes, cells are recreated so they are synced with changed sheet state in redux */
                  key: undoRedoCounter,
                  katexMacros,
                  isEdited,
                  typeName: type,
                  data: cell.data,
                  fullscreenCell,
                  requestEditMode,
                  onDataChanged: () => 0, // dummy function, this value is replaced inside DelayedUpdateContainer component
                  onFullscreenToggleClick,
                } as RenderPayload}
              />
            </div>
          </div>
        </Col>
        {(hasComments || addComment) &&
          <Col xs={4} xl={3}>
            <Comments cellLoc={cellLoc} katexMacros={katexMacros} />
            {addComment &&
              <AddComment
                unsyncedKey={`newCellComment/${cellId}`}
                cellLoc={cellLoc}
                onSave={() => setAddComment(false)}
                onCancel={() => setAddComment(false)}
                katexMacros={katexMacros}
              />}
          </Col>
        }
      </Row>
      <div
        onMouseEnter={() => toggleVisibility(true, dropdownOpened)}
        onMouseLeave={() => toggleVisibility(false, dropdownOpened)}
        className={classNames('d-flex', styles.addToolbarContainer)}
      >
        {
          <AddToolbar
            className={styles.addToolbar}
            style={addToolbarStyle()}
            cellLoc={cellLoc}
            onDropdownToggled={(isOpen) => toggleVisibility(addToolbarHovered.current, isOpen)}
          />
        }
      </div>
    </div>
  )
}