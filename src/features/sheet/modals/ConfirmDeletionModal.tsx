import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { sheetActions, sheetSelectors } from "../slice/sheetSlice";

export default function ConfirmDeletionModal() {
  const request = useAppSelector(sheetSelectors.deleteRequest);
  const dispatch = useAppDispatch();

  return (
    <Modal show={request !== undefined} onHide={() => dispatch(sheetActions.deleteRequest(undefined))}>
      <Modal.Header closeButton>
        <Modal.Title>
          {request === 'cell' && <>Zmazanie bunky</>}
          {request === 'comment' && <>Zmazanie komentára</>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {request === 'cell' && <>Naozaj chcete zmazať bunku?</>}
          {request === 'comment' && <>Naozaj chcete zmazať komentár?</>}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(sheetActions.deleteRequest(undefined))}>Zrušiť</Button>
        <Button variant="danger" onClick={() => dispatch(sheetActions.confirmDeletion())}>Zmazať</Button>
      </Modal.Footer>
    </Modal>
  )
}