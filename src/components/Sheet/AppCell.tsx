import { useEffect, useState } from 'react';
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

  const {instance, getState} = useState(prepare(props.initialState))[0];

  const [ stateChanged, setStateChanged ] = useState(false)
  var onAppStateChanged = () => {
    console.log(`app of type: ${props.type} on cell ${props.cellId} has changed its state`);
    console.log('set state to true')
    setStateChanged(true)
    console.log('stateChanged ' + stateChanged)
    //console.log('new state: ');
    //console.log(getState(instance));
    dispatch(updateCellData({cellId: props.cellId, data: getState(instance)}));
  }

  /* check for state change periodically */
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('periodic check ' + stateChanged);
      if (stateChanged) {
        console.log('state saved');
        dispatch(updateCellData({cellId: props.cellId, data: getState(instance)}));
        setStateChanged(false)
      } else {
        console.log('state not saved');
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);*/

  return (
    <AppComponent instance={instance} onStateChange={onAppStateChanged}/>
  )
}

export default AppCell;