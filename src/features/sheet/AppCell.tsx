// TODO put interface into separate package
import { PrepareResult } from '@fmfi-uk-1-ain-412/tableaueditor';
import { useEffect, useMemo, useRef } from 'react';
import { getAppInfo } from '../../embeddedApps';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CellLocator, sheetActions, sheetSelectors } from "./slice/sheetSlice";
import { BsExclamationTriangleFill } from 'react-icons/bs';
import styles from './CellContainer.module.scss';

export interface AppCellProps {
  cellLoc: CellLocator
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

function AppCell({ cellLoc, isEdited, onDataChanged }: AppCellProps) {
  const cell = useAppSelector(sheetSelectors.cell(cellLoc.id));
  const { type, data } = cell;
  const context = useAppSelector(sheetSelectors.logicContext(cellLoc))
  const { prepare, AppComponent } = getAppInfo(type) || unsupportedApp(type);
  const prepareResult = useRef<PrepareResult | null>(null);

  useMemo(() => console.error('App cell context changed', context), [context]);

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
      className={`${styles.appCell} ${styles[`${type}Cell`]}`}
      onDoubleClick={(e) => isEdited && e.stopPropagation()}
    >
      {!isEdited && <div className={styles.appOverlay}/>}
      <div className={styles.appContainer}>
        <AppComponent isEdited={isEdited} context={context} instance={instance} onStateChange={onAppStateChanged} />
      </div>
    </div>
  )
}

export default AppCell;