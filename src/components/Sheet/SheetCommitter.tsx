import { useReposCreateOrUpdateFileContentsMutation } from "../../services/githubApi/endpoints/repos";
import { authSelectors } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useRef, useState } from "react";
import { githubApiErrorMessage } from "../../services/githubApi/errorMessage";
import { Base64 } from 'js-base64';
import { Alert, Button, Spinner } from "react-bootstrap";
import { sheetActions, sheetSelectors } from "../../store/sheetSlice";

export interface SheetCommitterProps {
  className?: string,
  style?: React.CSSProperties,
}

function SheetCommitter(props: SheetCommitterProps) {
  const authState = useAppSelector(authSelectors.authState);
  const fileInfo = useAppSelector(sheetSelectors.fileInfo);
  const commit = useAppSelector(sheetSelectors.commitQueueHead);

  const dispatch = useAppDispatch();

  const [updateFile, updateFileResult] = useReposCreateOrUpdateFileContentsMutation();
  type CommiterState = 'waiting_for_commit' | 'waiting_for_dequeue' | 'error'
  const commiterState = useRef<CommiterState>('waiting_for_commit');
  const [ lastCommitId, setLastCommitId ] = useState(-1);

  const doUpdate = () => {
    if (commiterState.current === 'waiting_for_dequeue') {
      if (updateFileResult.isSuccess) {
        console.log('update succeeded dequeing commit id ' + lastCommitId);
        const updateSha = updateFileResult.data.content!!.sha!!
        dispatch(sheetActions.dequeueCommit({ id: lastCommitId, updateSha }))
        commiterState.current = 'waiting_for_commit';
      } else if (updateFileResult.isError) {
        console.log('waiting_for_dequeue: update error');
        commiterState.current = 'error';
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

  var body;
  if (updateFileResult.isLoading) {
    body = <>Ukladám...<Spinner size="sm" role="status" animation="grow" /></>
  } else if (updateFileResult.isSuccess || (updateFileResult.isUninitialized && !commit)) {
    body = <></>
  } else if (updateFileResult.isError) {
    body = <Alert variant="danger">Uloženie zošita zlyhalo. ({githubApiErrorMessage(updateFileResult.error)})</Alert>
  } else {
    body = <p>What's going on??</p>
  }

  return <div className={props.className} style={props.style}>{body}</div>;
}

export default SheetCommitter;