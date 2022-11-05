import { Alert, Container, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CellContainer from "./CellContainer";
import AddToolbar from "./AddToolbar";
import { sheetActions, sheetSelectors } from "./slice/sheetSlice";
import { useEffect, useMemo, useState } from "react";

import styles from "./Sheet.module.css";
import FileErrorModal from "./FileErrorModal";
import ConfirmDeletionModal from "./ConfirmDeletionModal";
import katex from "katex";

interface FileInfo {
  owner: string,
  repo: string,
  path: string,
  branch: string,
}

export interface SheetProps {
  fileInfo: FileInfo
}

function fileInfoCmp(f1: FileInfo, f2: FileInfo) {
  return (f1.owner === f2.owner
    && f1.repo === f2.repo 
    && f1.path === f2.path
    && f1.branch === f2.branch
  )
}

export default function Sheet(props: SheetProps) {
  const {owner, repo, path, branch} = props.fileInfo;
 
  const loadState = useAppSelector(sheetSelectors.state);
  const sheetError = useAppSelector(sheetSelectors.error);
  const cellsOrder = useAppSelector(sheetSelectors.cellsOrder);
  const settings = useAppSelector(sheetSelectors.sheetSettings);
  const openedFile = useAppSelector(sheetSelectors.openedFile)

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (loadState === "not_loaded" || (openedFile !== undefined && fileInfoCmp(openedFile, { owner, repo, path, branch })) === false) {
      dispatch(sheetActions.openSheet({owner, repo, path, branch}));
    }
  }, [loadState, openedFile, owner, repo, path, branch, dispatch])

  if (loadState === "not_loaded" || loadState === "loading") {
    return (<Container><div style={{ width: '100%', textAlign: 'center' }}><Spinner animation="grow" role="status" /></div></Container>)
  } else if (loadState === 'load_error') {
    return (<Container><Alert variant="danger">Načítanie hárku zlyhalo.{sheetError && <> ({sheetError})</>}</Alert></Container>)
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