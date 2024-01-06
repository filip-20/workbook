import { Button } from "react-bootstrap";
import { IoMdGitMerge } from "react-icons/io";
import { MdCheck } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Loading from "../../../components/Loading";
import { storageActions, storageSelectors } from "../sheetStorage";
//import { ghStorageSelectors } from "./githubStorage";

export default function MergeButton() {
  const dispatch = useAppDispatch();

  const storageType = useAppSelector(storageSelectors.storage)?.type;
  const state = useAppSelector((state) => state.sheetStorage.saveStatus);

  if (storageType !== 'github') {
    return <></>
  }

  //const state = ghState.mergeState;
  const variant = (() => {
    switch (state) {
      case 'error':
        return 'danger';
      case 'save_waiting':
        return 'secondary';
      case 'saving':
        return 'warning';
      case 'success':
        return 'success';
      default:
        return 'success';
    }
  })()

  const disabled = /*ghState.sessionBranch === undefined
    || */state === 'save_waiting'
    || state === 'saving'

  return (
    <Button variant={variant} title="Merge changes" disabled={disabled} onClick={() => dispatch(storageActions.saveChanges())}>
      <IoMdGitMerge />&nbsp;Merge changes
      {(state === 'saving' || state === 'save_waiting') && <>&nbsp;<Loading compact /></>}
      {state === 'success' && <>&nbsp;<MdCheck /></>}
    </Button>
  )
}