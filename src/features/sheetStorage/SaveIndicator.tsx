import { useAppSelector } from "../../app/hooks";
import { storageSelectors } from "./sheetStorage";
import { MdCheck } from "react-icons/md";
import Loading from "../../components/Loading";
import { BsExclamationTriangle } from "react-icons/bs";

export interface SaveIndicatorProps {
  className?: string,
  style?: React.CSSProperties,
}

export default function SaveIndicator(props: SaveIndicatorProps) {
  const storageStatus = useAppSelector(storageSelectors.status);
  const queue = useAppSelector(storageSelectors.queue);
  const errorMessage = useAppSelector(storageSelectors.errorMessage);
  return (
    <div className={props.className} style={props.style}>
      {storageStatus === 'ready' && queue.items.length > 0 && <>Changes saved <MdCheck /></>}
      {storageStatus === 'processing' && <>Saving changes <Loading compact /></>}
      {storageStatus === 'error' && <div title={errorMessage}>Save error <BsExclamationTriangle /></div>}
    </div>
  );
}