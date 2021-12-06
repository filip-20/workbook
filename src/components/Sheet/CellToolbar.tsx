import { Button, ButtonGroup, ButtonToolbar, Col, Container, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { ArrowDown, ArrowUp, Plus, Trash } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { insertTextCell, insertAppCell, removeCell, moveUpCell, moveDownCell, selectFirstCellId, selectLastCellId } from "./sheetSlice";

export interface CellToolbarProps {
  cellId?: number,
  addGroup?: boolean,
  removeGroup?: boolean,
  moveGroup?: boolean,

  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onMouseMove?: () => void

  style?: React.CSSProperties
}

const defaultProps: CellToolbarProps = {
  cellId: -1,
  addGroup: true,
  removeGroup: true,
  moveGroup: true,
}

function CellToolbar(props: CellToolbarProps) {
  const dispatch = useAppDispatch();

  const firstCellId = useAppSelector(selectFirstCellId)
  const lastCellId = useAppSelector(selectLastCellId)

  const addGroup = () => {
    return (
      <ButtonGroup onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} className="me-2" size="sm">
        <Button variant="secondary" onClick={() => dispatch(insertTextCell('some content', props.cellId!!))}><Plus /> Text</Button>
        <DropdownButton size="sm" variant="secondary" as={ButtonGroup} title={<><Plus /> App</>}>
          <Dropdown.Item onClick={() => dispatch(insertAppCell('app1', '{}', props.cellId!!))} size="sm">app1</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(insertAppCell('app2', '{}', props.cellId!!))} size="sm">app2</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(insertAppCell('app3', '{}', props.cellId!!))} size="sm">app3</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    )
  }

  const removeGroup = () => {
    return (
      <ButtonGroup className="me-2" size="sm">
        <Button variant="secondary" onClick={() => dispatch(removeCell(props.cellId!!))}><Trash /></Button>
      </ButtonGroup>
    )
  }

  const moveGroup = () => {
    return (
      <ButtonGroup className="me-2" size="sm">
        { props.cellId === firstCellId ? '' : <Button variant="secondary" onClick={() => dispatch(moveUpCell(props.cellId!!))}><ArrowUp /></Button> }
        { props.cellId === lastCellId ? '' : <Button variant="secondary" onClick={() => dispatch(moveDownCell(props.cellId!!))}><ArrowDown /></Button> }
      </ButtonGroup>
    )
  }

  return (
    <ButtonToolbar className="justify-content-center" style={props.style}>
      {props.addGroup ? addGroup() : ''}
      {props.removeGroup ? removeGroup() : ''}
      {props.moveGroup && !(firstCellId === lastCellId && props.cellId === firstCellId) ? moveGroup() : ''}
    </ButtonToolbar>
  )
}

CellToolbar.defaultProps = defaultProps

export default CellToolbar
