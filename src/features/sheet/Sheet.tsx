import { Alert, Container, Spinner } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import CellContainer from "./CellContainer";
import AddToolbar from "./AddToolbar";
import { sheetSelectors } from "./slice/sheetSlice";
import { useMemo, useState } from "react";

import styles from "./Sheet.module.scss";
import katex from "katex";

export interface SheetProps {
}

export default function Sheet(props: SheetProps) {
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

  if (loadState === "not_loaded" || loadState === "loading") {
    return (<Container><div style={{ width: '100%', textAlign: 'center' }}><Spinner animation="grow" role="status" /></div></Container>)
  } else if (loadState === 'load_error') {
    return (<Container><Alert variant="danger">Načítanie hárku zlyhalo.{sheetError && <> ({sheetError})</>}</Alert></Container>)
  } else {
    return (
      <>
        {
          cellsOrder.map((cellId, index) => (
            <CellContainer key={cellId} cellId={cellId} cellIndex={index}
              className={fullscreenCellId !== undefined ? (cellId === fullscreenCellId ? styles.fullscreenCell : 'd-none') : undefined}
              onFullscreenToggleClick={isFullscreen => { console.log('fullscreen: ' + isFullscreen); setFullscreenCellId(isFullscreen ? cellId : undefined) }}
              katexMacros={katexMacros}
            />
          ))
        }
        {cellsOrder.length === 0 && <AddToolbar className="justify-content-center" cellLoc={{id: -1, index: -1}} />}
      </>
    )
  }
}