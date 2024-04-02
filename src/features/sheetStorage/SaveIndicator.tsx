import { useAppSelector } from "../../app/hooks";
import { storageSelectors } from "./storageSlice";
import { IconType } from "react-icons/lib";
import {
  BsClock,
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
  const queueState = useAppSelector(storageSelectors.taskQueueState);
  const queue = useAppSelector(storageSelectors.taskQueue);
  const errorMessage = useAppSelector(storageSelectors.taskError);
  const unsyncedChanges = useAppSelector(storageSelectors.unsyncedChanges);

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
      {queueState === 'idle' && queue.items.length > 0 && storageSynced &&
        <IndicatorTemplate icon={BsCloudCheck}>
          Changes saved
        </IndicatorTemplate>}
      {queueState === 'idle' && unsyncedChanges > 0 &&
        <IndicatorTemplate icon={BsClock}>
          Waiting changes {unsyncedChanges}
        </IndicatorTemplate>}
      {(queueState === 'processing' || queueState === 'task_finished') &&
        <IndicatorTemplate icon={BsCloudArrowUpFill}>
          Saving changes
        </IndicatorTemplate>}
      {queueState === 'error' &&
        <div title={errorMessage}>
          <IndicatorTemplate icon={BsExclamationTriangleFill}>
            Save error
          </IndicatorTemplate>
        </div>}
      {queueState === 'offline_paused' &&
        showOffline(queue.items.length - queue.nextIndex)}
    </div>
  );
}