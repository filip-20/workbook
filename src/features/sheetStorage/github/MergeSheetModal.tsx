import { Button, Modal } from "react-bootstrap";
import { ReposCompareCommitsApiResponse } from "../../../api/githubApi/endpoints/repos";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import ErrBox from "../../../components/ErrBox";
import Loading from "../../../components/Loading";
import { IoMdGitMerge } from "react-icons/io";
import { storageActions } from "../sheetStorage";
import { GhMergeError, ghStorageSelectors } from "./githubStorage";
import { useEffect, useState } from "react";

export interface MergeSheetModalProps {
  show: boolean
  onClose: () => void
}

export default function MergeSheetModal(props: MergeSheetModalProps) {
  const ghState = useAppSelector(ghStorageSelectors.ghState);
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    setClosed(false);
  }, [ghState?.mergeState])

  if (ghState === undefined) {
    return <></>
  }

  const state = ghState.mergeState;
  const { mergeError } = ghState;

  const handleClose = () => {
    setClosed(true);
  }

  const renderError = (error: GhMergeError | undefined) => {
    if (error === undefined) {
      return <></>
    }
    if (error.type === 'api_call_failed') {
      return (
        <>
          <p>Api call{error.call !== undefined && `' ${error.call}'`} to github failed: {error.message}. Try it again.</p>
        </>
      )
    }
    if (error.type === 'not_mergable') {
      return (
        <>
          <p>Changes are <strong>not mergable</strong> to origin branch. This may be because manual changes to workbook file were made in origin branch.</p>
          <p>To fix this problem you need resolve conflicts manually on github{error.url === undefined ? '. ' : <> at <a href={error.url}>{error.url}</a></>} </p>
        </>
      )
    }
    return (<p>Unknown error</p>)
  }

  return (
    <Modal
      show={state === 'error' && !closed}
      onHide={handleClose}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Merging changes <strong>failed</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-danger">Merging from branch <strong>{ghState.sessionBranch?.name}</strong> to <strong>{ghState.baseBranch}</strong> failed.</p>
        {renderError(mergeError)}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}