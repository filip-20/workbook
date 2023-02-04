// TODO put interface into separate package
import { PrepareResult } from '@fmfi-uk-1-ain-412/fol-graphexplorer';
import { useEffect, useRef } from 'react';
import { getAppInfo } from '../../embeddedApps';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { sheetActions, sheetSelectors } from "./slice/sheetSlice";
import { BsExclamationTriangleFill } from 'react-icons/bs';

export interface AppCellProps {
  cellId: number
  isEdited: boolean,
  onDataChanged: (getData: () => any) => void,
}

const unsupportedApp = (type: string) => {
  return {
    prepare: () => 0,
    AppComponent: () => (
      <div style={{textAlign: 'center'}}>
      <BsExclamationTriangleFill color='red' size={70} />
      <p>Unsupported app type: {type}</p>
      </div>
    )
  }
}

function AppCell(props: AppCellProps) {
  const { cellId, isEdited, onDataChanged } = props;
  const cell = useAppSelector(sheetSelectors.cell(cellId));
  const { type, data } = cell;
  const { prepare, AppComponent } = getAppInfo(type) || unsupportedApp(type);
  const prepareResult = useRef<PrepareResult | null>(null);

  if (prepareResult.current === null) {
    prepareResult.current = prepare(data)
  }

  const { instance, getState } = prepareResult.current;
  const getState1 = () => getState(instance);

  const onAppStateChanged = () => {
    onDataChanged(getState1)
  }

  return (
    <div
      style={{ position: 'relative' }}
      onDoubleClick={(e) => isEdited && e.stopPropagation()}
    >
      {!isEdited && <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 999 }}></div>}
      <AppComponent isEdited={isEdited} instance={instance} onStateChange={onAppStateChanged} />
    </div>
  )
}

export default AppCell;