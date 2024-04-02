import { Button } from "react-bootstrap";
import { IoMdGitMerge } from "react-icons/io";
import { MdCheck } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Loading from "../../../components/Loading";
import { storageActions, storageSelectors } from "../storageSlice";
import { useState } from "react";
//import { ghStorageSelectors } from "./githubStorage";

export default function MergeButton() {
  const dispatch = useAppDispatch();
  const [ taskIndex, setTaskIndex ] = useState(-1);

  const engine = useAppSelector(storageSelectors.storageEngine);
  const mergeState = useAppSelector(storageSelectors.taskState(taskIndex));

  if (engine?.type !== 'github') {
    return <></>
  }

  //const state = ghState.mergeState;
  const variant = (() => {
    switch (mergeState) {
      case 'error':
        return 'danger';
      case 'waiting':
        return 'warning';
      case 'done':
        return 'success';
      default:
        return 'success';
    }
  })()

  const disabled = engine.custom?.canMerge !== true 
    || mergeState === 'waiting'
    || mergeState === 'processing'

  const startMerge = () => {
    const taskIndex = dispatch(storageActions.enqueueTask({
      type: 'merge',
      payload: undefined,
    }))
    setTaskIndex(taskIndex)
  }

  return (
    <Button variant={variant} title="Merge changes" disabled={disabled} onClick={startMerge}>
      <IoMdGitMerge />&nbsp;Merge changes
      {(mergeState === 'waiting' || mergeState === 'processing') && <>&nbsp;<Loading compact /></>}
      {mergeState === 'done' && <>&nbsp;<MdCheck /></>}
    </Button>
  )
}