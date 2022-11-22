import { Button } from "react-bootstrap";
import { IoMdGitMerge } from "react-icons/io";
import { MdCheck } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Loading from "../../../components/Loading";
import { storageActions } from "../sheetStorage";
import { ghStorageSelectors } from "./githubStorage";

export default function MergeButton() {
  const dispatch = useAppDispatch();

  const ghState = useAppSelector(ghStorageSelectors.ghState);

  if (ghState === undefined) {
    return <></>
  }

  const {state} = ghState.mergeState;
  const variant = (() => {
    switch (state) {
      case 'error':
        return 'danger';
      case 'merging':
        return 'warning';
      case 'success': 
        return 'success';
      default:
        return 'success';
    }
  })()

  return (
    <Button variant={variant} title="Merge changes" disabled={ghState.sessionBranch === undefined} onClick={() => dispatch(storageActions.saveChanges())}>
      <IoMdGitMerge />Merge changes
      {state === 'merging' && <Loading compact />}
      {state === 'success' && <MdCheck />}
    </Button>
  )
}