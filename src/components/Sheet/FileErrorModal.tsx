import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BiDownload, BiRefresh } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { sheetActions, sheetSelectors, SheetState } from "../../store/sheetSlice";

export default function FileErrorModal() {
  const sheetState = useAppSelector(sheetSelectors.state);
  const [closed, setClosed] = useState(false);

  const show = (sheetState === 'save_error' || sheetState === 'update_detected') /*&& (!closed)*/;

  useEffect(() => {
    if (show) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  })

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={show}
      onHide={() => setClosed(true)}
      centered
    >
      {sheetState === 'save_error' && <SaveError />}
      {sheetState === 'update_detected' && <UpdateDetected />}
    </Modal>
  )
}

function UpdateDetected() {
  return (
    <>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Hárok bol aktualizovaný na pozadí
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Zdá sa že súbor hárku bol aktualizovaný na pozadí. Ak chcete upravovať hárok v tomto okne, je potrebné obnoviť stránku pre načítanie zmien.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => window.location.reload()}><BiRefresh /> Obnoviť stránku</Button>
      </Modal.Footer>
    </>
  )
}

function SaveError() {
  const dispatch = useAppDispatch();
  const commitQueue = useAppSelector(sheetSelectors.commitQueue)
  const commitQueueHead = useAppSelector(sheetSelectors.commitQueueHead)
  const sheetError = {
    errorCode: useAppSelector(sheetSelectors.errorCode),
    errorMsg: useAppSelector(sheetSelectors.error),
  }

  const download = (json: string) => {
    const url = window.URL.createObjectURL(new Blob([JSON.stringify(json)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.setAttribute("download", "workbook-sheet.json");
    link.href = url;
    link.click();
    link.remove();
  }

  const json: string | undefined = (() => {
    if (commitQueue.length === 0 && commitQueueHead != undefined) {
      return commitQueueHead.json;
    } else if (commitQueue.length > 0) {
      return commitQueue[commitQueue.length - 1].json;
    }
  })();

  if (sheetError.errorCode !== undefined && sheetError.errorCode === 409) {
    return (
      <>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Zmeny hárku sa <strong>nepodarilo</strong> uložiť
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Zdá sa že súbor hárku bol aktualizovaný na pozadí.
            Zmeny ktoré ste vykonali boli ale spravené na neaktuálnom hárku.
            {json !== undefined && 'Hárok zo zmenami urobenými v tomto okne si môžete stiahnuť.'}
          </p>
          <p className="text-danger">Ak <strong>aktualizujete</strong> stránku alebo <strong>zavriete</strong> toto okno, neuložené zmeny vykonané v tomto okne budú <strong>stratené</strong>.</p>
          <p>Čo chcete urobiť?</p>
        </Modal.Body>
        <Modal.Footer>
          <div className="mx-auto">
            {json !== undefined && <Button className="mx-2" variant="success" onClick={() => download(json)}><BiDownload /> Stiahnuť hárok</Button>}
            <Button className="mx-2" variant="danger" onClick={() => window.location.reload()}><BiRefresh /> Obnoviť stránku</Button>
          </div>
        </Modal.Footer>
      </>
    )
  } else {
    return (
      <>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Zmeny hárku sa nepodarilo uložiť
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Pri ukladaní zmien nastala <strong>neočakávaná chyba</strong>: ${sheetError.errorMsg}.</p>
          <p>
            Vykonané zmeny sa nepodarilo uložiť.&nbsp;
            {json !== undefined && 'Hárok zo zmenami urobenými v tomto okne si môžete stiahnuť.&nbsp;'}
            Môžete skúsiť zopakovať uloženie zmien do repozitára.
          </p>
          <p className="text-danger">Ak <strong>aktualizujete</strong> stránku alebo <strong>zavriete</strong> toto okno, neuložené zmeny vykonané v tomto okne budú <strong>stratené</strong>.</p>
          <p>Čo chcete urobiť?</p>
        </Modal.Body>
        <Modal.Footer>
          <div className="mx-auto">
            {json !== undefined && <Button className="mx-2" variant="success" onClick={() => download(json)}><BiDownload /> Stiahnuť hárok</Button>}
            <Button className="mx-2" variant="success" onClick={() => dispatch(sheetActions.resumeCommitter())}><BiRefresh /> Skúsiť znova uložiť</Button>
          </div>
        </Modal.Footer>
      </>
    )
  }
}
