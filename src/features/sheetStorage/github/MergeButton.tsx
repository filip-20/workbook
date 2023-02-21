import { Button } from "react-bootstrap";
import { IoMdGitMerge } from "react-icons/io";
import { MdCheck } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Loading from "../../../components/Loading";
import { storageActions, storageSelectors } from "../sheetStorage";
import { ghStorageSelectors } from "./githubStorage";

export default function MergeButton() {
  const dispatch = useAppDispatch();

  const storageStatus = useAppSelector(storageSelectors.status);
  const ghState = useAppSelector(ghStorageSelectors.ghState);

  if (ghState === undefined) {
    return <></>
  }

  const state = ghState.mergeState;
  const variant = (() => {
    switch (state) {
      case 'error':
        return 'danger';
      case 'merge_waiting':
        return 'secondary';
      case 'merging':
        return 'warning';
      case 'success':
        return 'success';
      default:
        return 'success';
    }
  })()

  const disabled = ghState.sessionBranch === undefined
    || state === 'merge_waiting'
    || state === 'merging'

  return (
    <Button variant={variant} title="Merge changes" disabled={disabled} onClick={() => dispatch(storageActions.saveChanges())}>
      <IoMdGitMerge />&nbsp;Merge changes
      {(state === 'merging' || state === 'merge_waiting') && <>&nbsp;<Loading compact /></>}
      {state === 'success' && <>&nbsp;<MdCheck /></>}
    </Button>
  )
}