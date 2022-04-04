import { PrepareResult } from 'fol-graphexplorer';
import { useState, useEffect, useRef } from 'react';
import { Fade } from 'react-bootstrap';
import { getAppInfo } from '../../embeddedApps';
import { useAppDispatch } from '../../store/hooks';
import { BiLock } from "react-icons/bi";
import { sheetActions } from '../../store/sheetSlice';

export interface AppCellProps {
  cellId: number,
  type: string,
  initialState: any,
  isEdited: boolean,
}

function AppCell(props: AppCellProps) {
  const dispatch = useAppDispatch();
  const { prepare, AppComponent } = getAppInfo(props.type)
  const { cellId, type, initialState, isEdited } = props;
  const [showLock, setShowLock] = useState(!isEdited);

  const prepareResult = useRef<PrepareResult | null>(null);
  if (prepareResult.current === null) {
    prepareResult.current = prepare(initialState)
  }

  const { instance, getState } = prepareResult.current;
  const stateChanged = useRef(false)

  var onAppStateChanged = () => {
    stateChanged.current = true
  }

  /* check for state change periodically */
  useEffect(() => {
    const interval = setInterval(() => {
      if (stateChanged.current) {
        console.log('saving state of ' + type + ' in cell ' + cellId);
        dispatch(sheetActions.updateCellData({ cellId: cellId, data: getState(instance) }));
        stateChanged.current = false
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{ position: 'relative' }}
      onDoubleClick={(e) => isEdited && e.stopPropagation()}
    >
      {!isEdited &&
        <div
          onMouseEnter={() => setShowLock(true)}
          onMouseLeave={() => setShowLock(false)}
          style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 999 }}
        >
          <Fade in={showLock}>
            <BiLock
              size={50}
              style={{ position: 'relative', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}
            />
          </Fade>
        </div>
      }
      <AppComponent isEdited={isEdited} instance={instance} onStateChange={onAppStateChanged} />
    </div>
  )
}

export default AppCell;