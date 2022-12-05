import { Button, ButtonGroup } from "react-bootstrap";
import { BiRedo, BiUndo } from "react-icons/bi";
import { useAppDispatch } from "../../app/hooks";
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import {RootState, AppDispatch} from '../../app/store'
import { connect } from 'react-redux';


const mapStateToProps = (state: RootState) => {
  return {
    canUndo: state.sheet.past.length > 0,
    canRedo: state.sheet.future.length > 0
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
  }
}

function _UndoRedoButtonGroup(props: { canUndo: boolean, canRedo: boolean, onUndo: () => void, onRedo: () => void }) {
  return (
    <ButtonGroup className="me-2">
      <Button disabled={!props.canUndo}><BiUndo onClick={props.onUndo} /></Button>
      <Button disabled={!props.canRedo}><BiRedo onClick={props.onRedo} /></Button>
    </ButtonGroup>
  )
}
const UndoRedoButtonGroup = connect(mapStateToProps, mapDispatchToProps)(_UndoRedoButtonGroup)
export default UndoRedoButtonGroup