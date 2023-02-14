import { useAppSelector } from "../../app/hooks";
import { storageSelectors } from "./sheetStorage";
import { IconType } from "react-icons/lib";
import {
  BsCloudArrowUpFill,
  BsCloudCheck,
  BsCloudSlash,
  BsCloudSlashFill,
  BsExclamationTriangleFill
} from "react-icons/bs";

export interface SaveIndicatorProps {
  className?: string,
  style?: React.CSSProperties,
}

export interface IndicatorTemplateProps {
  icon: IconType
}

const IndicatorTemplate: React.FC<IndicatorTemplateProps> = (props) =>
  <><props.icon/>&nbsp;<span className="small">{props.children}</span></>;

export default function SaveIndicator(props: SaveIndicatorProps) {
  const storageSynced = useAppSelector(storageSelectors.storageSynced)
  const storageStatus = useAppSelector(storageSelectors.status);
  const queue = useAppSelector(storageSelectors.queue);
  const errorMessage = useAppSelector(storageSelectors.errorMessage);

  // Active/error states: filled icons, idle states: regular icons
  const showOffline = (pending: number) =>
    pending > 0
      ? <IndicatorTemplate icon={BsCloudSlashFill}>
          Pending changes: {pending}
        </IndicatorTemplate>
      : <IndicatorTemplate icon={BsCloudSlash}>
          Offline
        </IndicatorTemplate>;

  return (
    <div className={props.className} style={props.style}>
      {storageStatus === 'idle' && queue.items.length > 0 && storageSynced &&
        <IndicatorTemplate icon={BsCloudCheck}>
          Changes saved
        </IndicatorTemplate>}
      {(storageStatus === 'processing' || storageStatus === 'task_finished') &&
        <IndicatorTemplate icon={BsCloudArrowUpFill}>
          Saving changes
        </IndicatorTemplate>}
      {storageStatus === 'error' &&
        <div title={errorMessage}>
          <IndicatorTemplate icon={BsExclamationTriangleFill}>
            Save error
          </IndicatorTemplate>
        </div>}
      {storageStatus === 'offline_paused' &&
        showOffline(queue.items.length - queue.nextIndex)}
    </div>
  );
}