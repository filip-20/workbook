import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { BiDownload, BiRefresh } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { parseFilepath } from "../../../pages/RepoPage";
import { storageActions, storageSelectors } from "../sheetStorage";
import { GhSaveError, ghStorageSelectors } from "./githubStorage";

export default function SaveErrorModal() {
  const queue = useAppSelector(storageSelectors.queue);
  const ghState = useAppSelector(ghStorageSelectors.ghState);

  const dispatch = useAppDispatch();

  let fileName: string | undefined = undefined;
  if (ghState !== undefined) {
    fileName = parseFilepath(ghState.location.path).filename;
  }

  const download = (json: string) => {
    const url = window.URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    const link = document.createElement('a');
    link.setAttribute('download', fileName || 'workbook-sheet.json');
    link.href = url;
    link.click();
    link.remove();
  }

  const json: string | undefined = (() => {
    if (queue.items.length > 0) {
      return queue.items[queue.items.length - 1].content;
    } else {
      return undefined;
    }
  })();

  useEffect(() => {
    if (ghState?.saveError !== undefined) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  }, [ghState?.saveError])

  if (ghState === undefined) {
    return <></>
  }

  const type = ghState.saveError?.type;
  const unknownError = (saveError: GhSaveError) => (
    <>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Zmeny hárku sa nepodarilo uložiť
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Pri ukladaní zmien nastala <strong>neočakávaná chyba</strong>: ${saveError.message}.</p>
        <p>
          Vykonané zmeny sa nepodarilo uložiť.&nbsp;
          {json !== undefined && 'Hárok zo zmenami urobenými v tomto okne si môžete stiahnuť.&nbsp;'}
          Môžete skúsiť zopakovať uloženie zmien do repozitára.
        </p>
        <p className="text-danger">Ak <strong>obnovíte</strong> stránku alebo <strong>zavriete</strong> toto okno, neuložené zmeny vykonané v tomto okne budú <strong>stratené</strong>.</p>
        <p>Čo chcete urobiť?</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="mx-auto">
          {json !== undefined && <Button className="mx-2" variant="success" onClick={() => download(json)}><BiDownload /> Stiahnuť hárok</Button>}
          <Button className="mx-2" variant="success" onClick={() => dispatch(storageActions.resume())}><BiRefresh /> Skúsiť znova uložiť</Button>
        </div>
      </Modal.Footer>
    </>
  )
  const backgroundUpdateError = (saveError: GhSaveError) => (
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
        <p className="text-danger">Ak <strong>obnovíte</strong> stránku alebo <strong>zavriete</strong> toto okno, neuložené zmeny vykonané v tomto okne budú <strong>stratené</strong>.</p>
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

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={type !== undefined}
    /*onHide={() => setClosed(true)}*/
    /*centered*/
    >
      {type === 'background_update' && backgroundUpdateError(ghState.saveError!)}
      {type === 'unknown_error' && unknownError(ghState.saveError!)}
    </Modal>
  )

}