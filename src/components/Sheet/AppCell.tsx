import { useEffect, useRef } from 'react';
import { getAppInfo } from '../../EmbeddedApps';
import { useAppDispatch } from '../../store/hooks';
import { updateCellData } from './sheetSlice';

export interface AppCellProps {
  cellId: number,
  type: string,
  initialState: any,
}

function AppCell(props: AppCellProps) {
  const dispatch = useAppDispatch();
  const { prepare, AppComponent } = getAppInfo(props.type)

  const {instance, getState} = useRef(prepare(props.initialState)).current;
  const stateChanged = useRef(false)

  var onAppStateChanged = () => {
    stateChanged.current = true
    //dispatch(updateCellData({cellId: props.cellId, data: getState(instance)}));
  }

  /* check for state change periodically */
  useEffect(() => {
    const interval = setInterval(() => {
      if (stateChanged.current) {
        console.log('saving state of ' + props.type + ' in cell ' + props.cellId);
        dispatch(updateCellData({cellId: props.cellId, data: getState(instance)}));
        stateChanged.current = false
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppComponent instance={instance} onStateChange={onAppStateChanged}/>
  )
}

export default AppCell;