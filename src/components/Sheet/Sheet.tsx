import { Alert, Container, Spinner } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import CellContainer from "./CellContainer";
import AddToolbar from "./AddToolbar";
import { sheetSelectors } from "../../store/sheetSlice";
import { useState } from "react";

import styles from "./Sheet.module.css";
import FileErrorModal from "./FileErrorModal";
import ConfirmDeletionModal from "./ConfirmDeletionModal";

function Sheet() {
  const loadState = useAppSelector(sheetSelectors.state);
  const sheetError = useAppSelector(sheetSelectors.error);
  const cellsOrder = useAppSelector(sheetSelectors.cellsOrder);

  const [fullscreenCellId, setFullscreenCellId] = useState<number | undefined>(undefined);

  const displayToolbar = () => {
    return (
      <AddToolbar
        className="justify-content-center"
        cellIndex={-1}
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
        <ConfirmDeletionModal />
        <FileErrorModal />
        {
          cellsOrder.map((cellId, index) => (
            <CellContainer key={cellId} cellId={cellId} cellIndex={index}
              className={fullscreenCellId !== undefined ? (cellId === fullscreenCellId ? styles.fullscreenCell : 'd-none') : undefined}
              onFullscreenToggleClick={isFullscreen => { console.log('fullscreen: ' + isFullscreen); setFullscreenCellId(isFullscreen ? cellId : undefined) }}
            />
          ))
        }
        {cellsOrder.length === 0 ? displayToolbar() : ''}
      </>
    )
  }
}

export default Sheet;