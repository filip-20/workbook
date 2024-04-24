import { Button, Modal } from "react-bootstrap";
import { useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { storageSelectors } from "../storageSlice";
import { Gh1CustomState, Gh1MergeErr } from "../../../storageWorker/githubStorage1/types";

export interface MergeSheetModalProps {
  show: boolean
  onClose: () => void
}

export default function MergeSheetModal(props: MergeSheetModalProps) {
  const engine = useAppSelector(storageSelectors.storageEngine)
  const mergeTask = useAppSelector(state => storageSelectors.lastProcessedTask(state, 'merge'))
  const [closed, setClosed] = useState(false);
  
  const customState = engine?.custom as Gh1CustomState
  const mergeError = mergeTask?.result?.result === 'error' ? mergeTask.result.customError as Gh1MergeErr : undefined

  
  useEffect(() => {
    setClosed(false);
  }, [mergeError])

  if (engine === undefined || engine.type !== 'github1' || engine.custom === undefined) {
    return <></>
  }

  const handleClose = () => {
    setClosed(true);
  }

  const renderError = (error: Gh1MergeErr | undefined) => {
    if (error === undefined) {
      return <></>
    }
    if (error.reason === 'api_call_failed') {
      return (
        <>
          <p>{error.message}. Try it again.</p>
        </>
      )
    }
    if (error.reason === 'not_mergable') {
      return (
        <>
          <p>Changes are <strong>not mergable</strong> to origin branch. This may be because manual changes to workbook file were made in origin branch.</p>
          <p>To fix this problem you need resolve conflicts manually on github{error.pullUrl === undefined ? '. ' : <> at <a target="_blank" href={error.pullUrl}>{error.pullUrl}</a></>} </p>
        </>
      )
    }
    /*if (error.type === 'no_session_branch') {
      return (
        <>
          <p>Changes are <strong>not mergable</strong> to origin branch. This may be because manual changes to workbook file were made in origin branch.</p>
          <p>To fix this problem you need resolve conflicts manually on github{error.url === undefined ? '. ' : <> at <a href={error.url}>{error.url}</a></>} </p>
        </>
      )
    }*/
    return (<p>Unknown error{error.message && <>: {error.message}</>}</p>)
  }

  return (
    <Modal
      show={mergeError !== undefined && !closed}
      onHide={handleClose}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Merging changes <strong>failed</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-danger">Merging from branch <strong>{customState.sessionBranch}</strong> to <strong>{customState.baseBranch}</strong> failed.</p>
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