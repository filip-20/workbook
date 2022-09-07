import { useReposCreateOrUpdateFileContentsMutation } from "../../api/githubApi/endpoints/repos";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useRef, useState } from "react";
import { githubApiErrorMessage, isFetchBaseQueryError, isGithubErrorResponse } from "../../api/githubApi/errorMessage";
import { Base64 } from 'js-base64';
import { Alert, Spinner } from "react-bootstrap";
import { sheetActions, sheetSelectors } from "./sheetSlice";
import { BsExclamationTriangle } from "react-icons/bs";

export interface SheetCommitterProps {
  className?: string,
  style?: React.CSSProperties,
}

function SheetCommitter(props: SheetCommitterProps) {
  const fileInfo = useAppSelector(sheetSelectors.fileInfo);
  const commit = useAppSelector(sheetSelectors.commitQueueHead);
  const resumeCommitter = useAppSelector(sheetSelectors.resumeCommitter);

  const dispatch = useAppDispatch();

  const [updateFile, updateFileResult] = useReposCreateOrUpdateFileContentsMutation();
  type CommitterState = 'waiting_for_commit' | 'waiting_for_dequeue' | 'error'
  const commiterState = useRef<CommitterState>('waiting_for_commit');
  const [lastCommitId, setLastCommitId] = useState(-1);

  const doUpdate = () => {
    if (commiterState.current === 'waiting_for_dequeue') {
      if (updateFileResult.isSuccess) {
        console.log('update succeeded dequeing commit id ' + lastCommitId);
        const updateSha = updateFileResult.data.content!!.sha!!
        dispatch(sheetActions.dequeueCommit({ id: lastCommitId, updateSha }))
        commiterState.current = 'waiting_for_commit';
      } else if (updateFileResult.isError) {
        const { error } = updateFileResult;
        console.log('waiting_for_dequeue: update error');
        commiterState.current = 'error';
        if (isFetchBaseQueryError(error) && typeof error.status === 'number' && isGithubErrorResponse(error.data)) {
          dispatch(sheetActions.saveError({ errorCode: error.status, errorMsg: error.data.message }))
        } else {
          dispatch(sheetActions.saveError({ errorCode: -1, errorMsg: githubApiErrorMessage(updateFileResult.error) }))
        }
      }
    } else if (commiterState.current === 'waiting_for_commit') {
      if (updateFileResult.isError) {
        console.log('waiting_for_commit: update error');
      } else if (!updateFileResult.isLoading && commit && fileInfo) {
        if (commit.id === lastCommitId) {
          console.log('already commited id commit.id');
        } else {
          const { owner, repo, branch, path, sha } = fileInfo;
          const updateArgs = {
            owner, repo, path,
            body: {
              content: Base64.encode(commit.json),
              message: commit.message,
              branch,
              sha
            }
          }
          console.log('running commit id ' + commit.id)
          setLastCommitId(commit.id);
          updateFile(updateArgs);
          commiterState.current = 'waiting_for_dequeue';
        }
      }
    }
  }

  useEffect(() => {
    doUpdate();
  }, [updateFileResult, commit, fileInfo]);

  useEffect(() => {
    if (resumeCommitter === true && commiterState.current === 'error') {
      commiterState.current = 'waiting_for_commit';
      updateFileResult.reset();
      setLastCommitId(-1);
      dispatch(sheetActions.resumeCommitterAck());
      doUpdate();
    }
  }, [resumeCommitter]);

  var body;
  if (updateFileResult.isLoading) {
    body = <>Ukladám...<Spinner size="sm" role="status" animation="grow" /></>
  } else if (updateFileResult.isSuccess || (updateFileResult.isUninitialized && !commit)) {
    body = <></>
  } else if (updateFileResult.isError) {
    body = <Alert variant="danger" title={githubApiErrorMessage(updateFileResult.error)}>Uloženie hárku zlyhalo. <BsExclamationTriangle /></Alert>
  } else {
    body = <p>What's going on??</p>
    console.log('weird updateFileResult');
    console.log(updateFileResult)
  }

  return (
    <div className={props.className} style={props.style}>
      {body}
    </div>
  );
}

export default SheetCommitter;