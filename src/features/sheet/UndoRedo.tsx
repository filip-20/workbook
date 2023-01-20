import { Button, ButtonGroup } from "react-bootstrap";
import { BiRedo, BiUndo } from "react-icons/bi";
import { useAppDispatch } from "../../app/hooks";
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import {RootState} from '../../app/store'
import { connect } from 'react-redux';
import { useRef } from "react";
import { sheetActions } from "./slice/sheetSlice";


const mapStateToProps = (state: RootState) => {
  return {
    canUndo: state.sheet.past.length > 0,
    canRedo: state.sheet.future.length > 0
  }
}

function _UndoRedoButtonGroup(props: { canUndo: boolean, canRedo: boolean }) {
  const dispatch = useAppDispatch();
  const undoRedoCounter = useRef(0);

  const undo = () => {
    undoRedoCounter.current += 1;
    dispatch(UndoActionCreators.undo());
    dispatch(sheetActions.syncUndoRedoCounter(undoRedoCounter.current));
  }

  const redo = () => {
    undoRedoCounter.current += 1;
    dispatch(UndoActionCreators.redo());
    dispatch(sheetActions.syncUndoRedoCounter(undoRedoCounter.current));
  }
  
  return (
    <ButtonGroup className="me-2">
      <Button disabled={!props.canUndo} onClick={undo} variant="secondary"><BiUndo /> Undo</Button>
      <Button disabled={!props.canRedo} onClick={redo} variant="secondary">Redo <BiRedo /></Button>
    </ButtonGroup>
  )
}
const UndoRedoButtonGroup = connect(mapStateToProps, {})(_UndoRedoButtonGroup)
export default UndoRedoButtonGroup