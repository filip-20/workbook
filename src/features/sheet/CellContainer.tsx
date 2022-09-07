import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { sheetActions, sheetSelectors } from "./sheetSlice";
import AddToolbar from './AddToolbar';
import EditToolbar from './EditToolbar';
import AppCell from './AppCell';
import TextCell from './TextCell';
import styles from './CellContainer.module.css';
import AddComment from './AddComment';
import Comments from './Comments';
import { BiLock } from 'react-icons/bi';

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
  const { isEdited, type } = cell;

  const [addComment, setAddComment] = useState(false);
  const [addToolbarVisible, setAddToolbarVisible] = useState(false);
  const [cellHovered, setCellHovered] = useState(false);
  const addToolbarHovered = useRef(false);
  const dropdownOpened = useRef(false);

  const toggleVisibility = (toolbarHovered: boolean, dropdownOpened_: boolean) => {
    addToolbarHovered.current = toolbarHovered
    dropdownOpened.current = dropdownOpened_

    if (dropdownOpened_ || toolbarHovered) {
      setAddToolbarVisible(true);
    } else {
      setAddToolbarVisible(false);
    }
  }

  const createCell = (id: number, type: string) => {
    if (type === 'text') {
      return (<TextCell katexMacros={katexMacros} cellId={id} />)
    } else {
      return (<AppCell cellId={id} />)
    }
  }

  return (
    <div className={className}>
      <div className='d-flex'
        onMouseEnter={() => setCellHovered(true)}
        onMouseLeave={() => setCellHovered(false)}
      >
        <div
          onDoubleClick={() => dispatch(sheetActions.setCellEdited({ cellId: cellId, isEdited: !isEdited }))}
          className={`${styles.cellWrapper} border`}
          style={{ position: 'relative' }}
        >
          <EditToolbar
            className={styles.editToolbar}
            style={cellHovered ? { display: 'initial' } : { display: 'none' }}
            cellId={cellId} cellIndex={cellIndex}
            onCommentClick={() => setAddComment(prev => !prev)}
            onToggleFullscreenClick={(isFullscreen) => onFullscreenToggleClick(isFullscreen)}
          />

          <BiLock
            className={`bg-secondary text-white ${styles.lockIcon}`}
            size={35}
            style={{ display: cellHovered && !isEdited ? 'initial' : 'none' }}
          />
          <div className="pt-3" style={{ overflowY: 'auto' }}>
            {createCell(cellId, type)}
          </div>
        </div>
        <div>
          <Comments className='ms-2' style={{ width: '20rem' }} cellId={cellId} />
          {addComment && <AddComment className='ms-2' style={{ width: '20rem' }} cellId={cellId} onCancel={() => setAddComment(false)} />}
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