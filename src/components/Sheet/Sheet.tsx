import { Alert, Button, Container, Modal, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CellContainer from "./CellContainer";
import AddToolbar from "./AddToolbar";
import { sheetActions, sheetSelectors } from "../../store/sheetSlice";
import { useState } from "react";

import styles from "./Sheet.module.css";
import FileErrorModal from "./FileErrorModal";

function Sheet() {
  const dispatch = useAppDispatch();
  const loadState = useAppSelector(sheetSelectors.state);
  const sheetError = useAppSelector(sheetSelectors.error);
  const cellsOrder = useAppSelector(sheetSelectors.cellsOrder);

  const [confirmDeletion, setConfirmDeletion] = useState<{ cellId: number, cellIndex: number } | undefined>(undefined);
  const [fullscreenCellId, setFullscreenCellId] = useState<number | undefined>(undefined);

  const addCellHandler = (typeName: string) => {
    if (typeName.startsWith('app/')) {
      dispatch(sheetActions.insertAppCell(typeName.slice(4), null, -1))
    } else {
      dispatch(sheetActions.insertTextCell('some content', -1))
    }
  }

  const displayToolbar = () => {
    return (
      <AddToolbar
        className="justify-content-center"
        onAddCellClick={addCellHandler}
      />
    )
  }

  if (loadState === "not_loaded") {
    return (<Container><div style={{ width: '100%', textAlign: 'center' }}><Spinner animation="grow" role="status" /></div></Container>)
  } else if (loadState === 'load_error') {
    return (<Container><Alert variant="danger">{sheetError}</Alert></Container>)
  } else {
    return (
      <>
        <Modal show={confirmDeletion !== undefined} onHide={() => setConfirmDeletion(undefined)}>
          <Modal.Header closeButton>
            <Modal.Title>Zmazanie bunky</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Naozaj chcete zmazať bunku?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setConfirmDeletion(undefined)}>Zrušiť</Button>
            <Button variant="danger" onClick={() => { dispatch(sheetActions.removeCell(confirmDeletion!)); setConfirmDeletion(undefined) }}>Zmazať</Button>
          </Modal.Footer>
        </Modal>

        <FileErrorModal />

        {
          cellsOrder.map((cellId, index) => (
            <CellContainer key={cellId} cellId={cellId} cellIndex={index}
              className={fullscreenCellId !== undefined ? (cellId === fullscreenCellId ? styles.fullscreenCell : 'd-none') : undefined}
              onFullscreenToggleClick={isFullscreen => { console.log('fullscreen: ' + isFullscreen); setFullscreenCellId(isFullscreen ? cellId : undefined) }}
              onDeleteClick={cell => setConfirmDeletion(cell)}
            />
          ))
        }
        {cellsOrder.length === 0 ? displayToolbar() : ''}
      </>
    )
  }
}

export default Sheet;