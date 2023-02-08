import { useAppSelector } from "../../app/hooks";
import { storageSelectors } from "./sheetStorage";
import { MdCheck, MdOfflineBolt } from "react-icons/md";
import Loading from "../../components/Loading";
import { BsExclamationTriangle } from "react-icons/bs";

export interface SaveIndicatorProps {
  className?: string,
  style?: React.CSSProperties,
}

export default function SaveIndicator(props: SaveIndicatorProps) {
  const storageSynced = useAppSelector(storageSelectors.storageSynced)
  const storageStatus = useAppSelector(storageSelectors.status);
  const queue = useAppSelector(storageSelectors.queue);
  const errorMessage = useAppSelector(storageSelectors.errorMessage);

  const showOffline = () => {
    if (queue.items.length - queue.nextIndex > 0) {
      return <div>Pending changes: {queue.items.length - queue.nextIndex} <MdOfflineBolt /></div>
    } else {
      return <div>Offline <MdOfflineBolt /></div>
    }
  }

  return (
    <div className={props.className} style={props.style}>

      {storageStatus === 'idle' && queue.items.length > 0 && storageSynced && <>Changes saved <MdCheck /></>}
      {(storageStatus === 'processing' || storageStatus === 'task_finished') && <>Saving changes <Loading compact /></>}
      {storageStatus === 'error' && <div title={errorMessage}>Save error <BsExclamationTriangle /></div>}
      {storageStatus === 'offline_paused' && showOffline()}
    </div>
  );
}