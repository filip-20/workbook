import { useReposCreateOrUpdateFileContentsMutation } from "../../services/githubApi/endpoints/repos";
import { selectAuthState, selectUser } from "../../store/authSlice";
import { dequeueCommit, selectCommitQueueHead } from "../../store/sheetSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectSheetFileInfo } from "../../store/sheetSlice";
import { useEffect, useRef, useState } from "react";
import { githubApiErrorMessage } from "../../services/githubApi/errorMessage";
import { Base64 } from 'js-base64';
import { Alert, Button, Spinner } from "react-bootstrap";

export interface SheetCommitterProps {

}

function SheetCommitter(props: SheetCommitterProps) {
  const authState = useAppSelector(selectAuthState);
  const fileInfo = useAppSelector(selectSheetFileInfo);
  const commit = useAppSelector(selectCommitQueueHead);

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
        dispatch(dequeueCommit({ id: lastCommitId, updateSha }))
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
    body = <div>Ukladám...<Spinner size="sm" role="status" animation="grow" /></div>
  } else if (updateFileResult.isSuccess || (updateFileResult.isUninitialized && !commit)) {
    body = <></>
  } else if (updateFileResult.isError) {
    body = <Alert variant="danger">Uloženie zošita zlyhalo. ({githubApiErrorMessage(updateFileResult.error)})</Alert>
  } else {
    body = <p>What's going on??</p>
  }

  return body;
}

export default SheetCommitter;