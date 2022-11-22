import { Button, Modal } from "react-bootstrap";
import { ReposCompareCommitsApiResponse } from "../../../api/githubApi/endpoints/repos";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import ErrBox from "../../../components/ErrBox";
import Loading from "../../../components/Loading";
import { IoMdGitMerge } from "react-icons/io";
import { storageActions } from "../sheetStorage";
import { ghStorageSelectors } from "./githubStorage";
import { useEffect, useState } from "react";

export interface MergeSheetModalProps {
  show: boolean
  onClose: () => void
}

export default function MergeSheetModal(props: MergeSheetModalProps) {
  const ghState = useAppSelector(ghStorageSelectors.ghState);
  const dispatch = useAppDispatch();
/*
  const compareArgs = (() => {
    if (ghState === undefined || ghState.sessionBranch === undefined) {
      return {owner: '', repo: '', basehead: ''};
    }
    return {
      owner: ghState.location.owner,
      repo: ghState.location.repo,
      basehead: `${ghState.baseBranch.name}...${ghState.sessionBranch}`,
    }
  })();
  const compare = useReposCompareCommitsQuery(compareArgs, { skip: ghState === undefined });

  const [unmergedChanges, setUnmergedChanges] = useState(false);

  useEffect(() => setUnmergedChanges((compare.data?.ahead_by || 0) > 0), [compare.data?.ahead_by])
  useEffect(() => {
    console.log('refetching compare');
    compare.refetch();
  }, [props.show])
*/

  const [ closed, setClosed ] = useState(false);
  useEffect(() => {
    setClosed(false);
  }, [ghState?.mergeState?.state])

  if (ghState === undefined) {
    return <></>
  }

  const {state, errorAdditional, errorMessage, url} = ghState.mergeState;
  /*
  const showCompare = (data: ReposCompareCommitsApiResponse) => {
    return (
      <>
        <p>Počet neuložených zmien v hárku: {data.ahead_by}</p>
        <p>Počet zmien v hlavnej vetve: {data.behind_by}</p>
      </>
    )
  }*/

  const handleClose = () => {
    setClosed(true);
  }

  return (
    <Modal show={state === 'error' && !closed} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Zlúčenie zmien do hlavnej vetvy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/*displayLoadable(compare, <Loading />, showCompare, <ErrBox>Api volanie zlyhalo</ErrBox>)*/}
        {errorMessage !== undefined &&
          <ErrBox>
            <>
              {errorMessage} ({errorAdditional})
              {url !== undefined && <p>Skontrolujte pull request na stránke githubu: <a href={url}>{url}</a></p> }
            </>
          </ErrBox>
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/*
        <Button variant="primary" onClick={() => dispatch(storageActions.saveChanges())}>
          <IoMdGitMerge /> Merge changes
          {state === 'merging' && <Loading compact />}
      </Button>*/}
      </Modal.Footer>
    </Modal>
  )
}