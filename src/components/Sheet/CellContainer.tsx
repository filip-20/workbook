import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { sheetActions, sheetSelectors } from '../../store/sheetSlice';
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
  key: number,
  cellId: number,
  cellIndex: number,
  onDeleteClick: (cell: { cellId: number, cellIndex: number }) => void,
  onFullscreenToggleClick: (isFullscreen: boolean) => void,
};

export default function CellContainer(props: CellContainerProps) {
  const { className, cellId, cellIndex } = props;
  const { onDeleteClick, onFullscreenToggleClick } = props;

  const dispatch = useAppDispatch();

  const firstCellId = useAppSelector(sheetSelectors.firstCellId)
  const lastCellId = useAppSelector(sheetSelectors.lastCellId)
  const cells = useAppSelector(sheetSelectors.cells);
  const isEdited = cells[cellId].isEdited;

  const [addComment, setAddComment] = useState(false);
  const [addToolbarVisible, setAddToolbarVisible] = useState(false);
  const [cellHovered, setCellHovered] = useState(false);
  const addToolbarHovered = useRef(false);
  const dropdownOpened = useRef(false);

  console.log('CellWrapper function called')

  const toggleVisibility = (toolbarHovered: boolean, dropdownOpened_: boolean) => {
    addToolbarHovered.current = toolbarHovered
    dropdownOpened.current = dropdownOpened_

    if (dropdownOpened_ || toolbarHovered) {
      setAddToolbarVisible(true);
    } else {
      setAddToolbarVisible(false);
    }
  }

  const addCellHandler = (typeName: string) => {
    if (typeName.startsWith('app/')) {
      dispatch(sheetActions.insertAppCell(typeName.slice(4), null, cellIndex))
    } else {
      dispatch(sheetActions.insertTextCell('some content', cellIndex))
    }
  }

  const createCell = (id: number, type: string, data: any) => {
    if (type === 'text') {
      return (<TextCell isEdited={isEdited} cellId={id} text={data} />)
    } else {
      return (<AppCell isEdited={isEdited} cellId={id} type={type} initialState={data} />)
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
            showUp={cellId !== firstCellId}
            showDown={cellId !== lastCellId}
            isEdited={isEdited}
            onToggleEditClick={(isEdited) => dispatch(sheetActions.setCellEdited({ cellId, isEdited }))}
            onCommentClick={() => setAddComment(prev => !prev)}
            onRemoveClick={() => onDeleteClick({ cellId, cellIndex })}
            onMoveUpClick={() => dispatch(sheetActions.moveUpCell(cellIndex))}
            onMoveDownClick={() => dispatch(sheetActions.moveDownCell(cellIndex))}
            onToggleFullscreenClick={(isFullscreen) => onFullscreenToggleClick(isFullscreen)}
          />

          <BiLock
            className={`bg-secondary text-white ${styles.lockIcon}`}
            size={35}
            style={{ display: cellHovered && !isEdited ? 'initial' : 'none' }}
          />
          <div className="pt-3" style={{ overflowY: 'auto' }}>
            {createCell(cellId, cells[cellId].type, cells[cellId].data)}
          </div>
        </div>
        <div>
          <Comments className='ms-2 mb-2' style={{ width: '20rem' }} cellId={cellId} />
          {addComment && <AddComment className='ms-2' style={{ width: '20rem' }} onCancel={() => setAddComment(false)} onAddComment={(text) => dispatch(sheetActions.addCellComment({ cellId, text }))} />}
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
          onAddCellClick={addCellHandler}
          onDropdownToggled={(isOpen) => toggleVisibility(addToolbarHovered.current, isOpen)}
        />
      </div>
    </div>
  )
}