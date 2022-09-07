import { Alert, Container, Spinner } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import CellContainer from "./CellContainer";
import AddToolbar from "./AddToolbar";
import { sheetSelectors } from "./sheetSlice";
import { useMemo, useState } from "react";

import styles from "./Sheet.module.css";
import FileErrorModal from "./FileErrorModal";
import ConfirmDeletionModal from "./ConfirmDeletionModal";
import katex from "katex";

function Sheet() {
  const loadState = useAppSelector(sheetSelectors.state);
  const sheetError = useAppSelector(sheetSelectors.error);
  const cellsOrder = useAppSelector(sheetSelectors.cellsOrder);
  const settings = useAppSelector(sheetSelectors.sheetSettings);

  const [fullscreenCellId, setFullscreenCellId] = useState<number | undefined>(undefined);

  /* parse global katex macros string from sheet settings */
  const katexMacros = useMemo(() => {
    let m = {};
    console.log('parsing global macros');
    try {
      katex.renderToString(settings.katexMacros || '', {
        globalGroup: true,
        macros: m,
      });
      console.log('parsed macros: ', m);
    } catch (err) {
      console.log('Failed to parse global katex macros');
      m = {};
    }
    return m;
  }, [settings.katexMacros]);

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
              katexMacros={katexMacros}
            />
          ))
        }
        {cellsOrder.length === 0 && <AddToolbar className="justify-content-center" cellIndex={-1} />}
      </>
    )
  }
}

export default Sheet;