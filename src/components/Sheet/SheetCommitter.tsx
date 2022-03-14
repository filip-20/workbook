import { useReposCreateOrUpdateFileContentsMutation } from "../../services/githubApi/endpoints/repos";
import { selectAuthState, selectUser } from "../../store/authSlice";
import { dequeueCommit, selectCommitQueueHead } from "../../store/sheetSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectSheetFileInfo } from "../../store/sheetSlice";
import { useEffect, useRef, useState } from "react";
import { githubApiErrorMessage } from "../../services/githubApi/errorMessage";
import { Base64 } from 'js-base64';
import { Button } from "react-bootstrap";

export interface SheetCommitterProps {

}

function SheetCommitter(props: SheetCommitterProps) {
  const authState = useAppSelector(selectAuthState);
  const fileInfo = useAppSelector(selectSheetFileInfo);
  const commit = useAppSelector(selectCommitQueueHead);

  const [updateFile, updateFileResult] = useReposCreateOrUpdateFileContentsMutation();
  const [lastCommitId, setLastCommitId] = useState(-1);

  const dispatch = useAppDispatch();

  /*
  console.log('commiter');
  console.log('updateFileResult');
  console.log(updateFileResult);*/
  /*console.log('file info')
  console.log(fileInfo)*/

  if (updateFileResult.isLoading) {
    console.log('update pending');
  }
  if (updateFileResult.isError) {
    console.log('update failed');
  }
  if (updateFileResult.isSuccess) {
    console.log('update succeeded dequeing commit id ' + lastCommitId);
    //console.log(updateFileResult.data)
    const updateSha = updateFileResult.data.content!!.sha!!
    dispatch(dequeueCommit({id: lastCommitId, updateSha}))
  }

  if (!updateFileResult.isLoading && !updateFileResult.isError && commit && fileInfo) {
    console.log('current sha: ' + fileInfo.sha);
    //console.log('running commit?');
    //console.log(`${commit.id} !== ${lastCommitId} ?`)
    if (commit.id === lastCommitId) {
      console.log('already commited id commit.id' )
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
    }
  }
  return <></>
}

export default SheetCommitter;