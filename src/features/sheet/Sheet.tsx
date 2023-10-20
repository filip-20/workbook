import { Alert, Container, Spinner } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import CellContainer from "./CellContainer";
import AddToolbar from "./AddToolbar";
import { CellLocator, sheetSelectors } from "./slice/sheetSlice";
import { useMemo, useState } from "react";

import styles from "./Sheet.module.scss";
import katex from "katex";
import ContextContainer from "./ContextContainer";

export interface SheetProps {
}

export default function Sheet(props: SheetProps) {
  const loadState = useAppSelector(sheetSelectors.state);
  const sheetError = useAppSelector(sheetSelectors.error);
  const cellsOrder = useAppSelector(sheetSelectors.cellsOrder);
  const settings = useAppSelector(sheetSelectors.sheetSettings);

  const [fullscreenCell, setFullscreenCell] = useState<CellLocator | undefined>(undefined);

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
    return (<Container className="p-3"><div style={{ width: '100%', textAlign: 'center' }}><Spinner animation="grow" role="status" /></div></Container>)
  } else if (loadState === 'load_error') {
    return (<Container className="p-3"><Alert variant="danger">Načítanie hárku zlyhalo.{sheetError && <> ({sheetError})</>}</Alert></Container>)
  } else {
    return (
      <article className="m-3 h-100">
        <ContextContainer
          cellLoc={{id: -1, index: -1, contextId: -1}}
          katexMacros={katexMacros}
          fullscreenCell={fullscreenCell}
          onFullscreenToggleClick={(isFullscreen, cell) => setFullscreenCell(isFullscreen ? cell : undefined) }
        />
      </article>
    )
  }
}

