import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { sheetActions, sheetSelectors } from "../../store/sheetSlice";

export default function ConfirmDeletionModal() {
  const cellToDelete = useAppSelector(sheetSelectors.cellToDelete);
  const dispatch = useAppDispatch();

  return (
    <Modal show={cellToDelete !== undefined} onHide={() => dispatch(sheetActions.confirmCellDelete(undefined))}>
      <Modal.Header closeButton>
        <Modal.Title>Zmazanie bunky</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Naozaj chcete zmazať bunku?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(sheetActions.confirmCellDelete(undefined))}>Zrušiť</Button>
        <Button variant="danger" onClick={() => dispatch(sheetActions.removeCell())}>Zmazať</Button>
      </Modal.Footer>
    </Modal>
  )
}