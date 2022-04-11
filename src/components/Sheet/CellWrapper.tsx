import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { sheetActions, sheetSelectors } from '../../store/sheetSlice';
import AddToolbar from './AddToolbar';
import EditToolbar from './EditToolbar';
import AppCell from './AppCell';
import TextCell from './TextCell';

import styles from './CellWrapper.module.css';
import AddComment from './AddComment';
import Comments from './Comments';
import { BiLock } from 'react-icons/bi';
import { Button, Modal } from 'react-bootstrap';

type CellWrapperProps = {
  key: number,
  cellId: number,
  cellIndex: number,
};

function CellWrapper(props: CellWrapperProps) {
  const { cellId, cellIndex } = props;
  const dispatch = useAppDispatch();

  const firstCellId = useAppSelector(sheetSelectors.firstCellId)
  const lastCellId = useAppSelector(sheetSelectors.lastCellId)
  const cells = useAppSelector(sheetSelectors.cells);
  const isEdited = cells[cellId].isEdited;

  const [addComment, setAddComment] = useState(false);
  const [addToolbarVisible, setAddToolbarVisible] = useState(false);
  const [cellHovered, setCellHovered] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
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
    <>
      <Modal show={confirmDeletion} onHide={() => setConfirmDeletion(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Zmazanie bunky</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Naozaj chcete zmazať bunku?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDeletion(false)}>Zrušiť</Button>
          <Button variant="danger" onClick={() => dispatch(sheetActions.removeCell({ cellId, cellIndex }))}>Zmazať</Button>
        </Modal.Footer>
      </Modal>

      <div style={{ display: 'flex' }}
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
            onRemoveClick={() => setConfirmDeletion(true)}
            onMoveUpClick={() => dispatch(sheetActions.moveUpCell(cellIndex))}
            onMoveDownClick={() => dispatch(sheetActions.moveDownCell(cellIndex))}
          />
          <BiLock
            className='bg-primary text-white'
            size={35}
            style={
              {
                display: cellHovered && !isEdited ? 'initial' : 'none',
                position: 'absolute',
                padding: '0.25rem',
                borderRadius: '50%',
                left: '50%',
                transform: 'translateX(-50%) translateY(calc(-50% - 1rem))'
              }}
          />
          <div className="pt-2" style={{ overflowY: 'auto' }}>
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
    </>
  )
}

export default CellWrapper;