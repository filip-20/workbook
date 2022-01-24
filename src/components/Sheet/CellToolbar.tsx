import { Button, ButtonGroup, ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";
import { ArrowDown, ArrowUp, Plus, Trash } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { insertTextCell, insertAppCell, removeCell, moveUpCell, moveDownCell, selectFirstCellId, selectLastCellId } from "../../store/sheetSlice";
import { embeddedApps } from "../../embeddedApps";


export interface CellToolbarProps {
  cellId?: number,
  cellIndex?: number,
  addGroup?: boolean,
  removeGroup?: boolean,
  moveGroup?: boolean,
  onDropdownToggled?: (isOpen: boolean) => void,
  style?: React.CSSProperties,
}

const defaultProps: CellToolbarProps = {
  cellId: -1,
  cellIndex: -2,
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
      <ButtonGroup className="me-2" size="sm">
        <Button variant="secondary" onClick={() => dispatch(insertTextCell('some content', props.cellIndex!!))}><Plus /> Text</Button>
        <DropdownButton onToggle={(isOpen, evt) => props.onDropdownToggled?.call(null, isOpen)} size="sm" variant="secondary" as={ButtonGroup} title={<><Plus /> App</>}>
          {embeddedApps.map( app => <Dropdown.Item key={app.typeName} onClick={() => dispatch(insertAppCell(app.typeName, null, props.cellIndex!!))} size="sm">{app.name}</Dropdown.Item>)}
        </DropdownButton>
      </ButtonGroup>
    )
  }

  const removeGroup = () => {
    const removePayload = {
      cellIndex: props.cellIndex!!,
      cellId: props.cellId!!,
    };
    return (
      <ButtonGroup className="me-2" size="sm">
        <Button variant="secondary" onClick={() => dispatch(removeCell(removePayload))}><Trash /></Button>
      </ButtonGroup>
    )
  }

  const moveGroup = () => {
    return (
      <ButtonGroup className="me-2" size="sm">
        { props.cellId === firstCellId ? '' : <Button variant="secondary" onClick={() => dispatch(moveUpCell(props.cellIndex!!))}><ArrowUp /></Button> }
        { props.cellId === lastCellId ? '' : <Button variant="secondary" onClick={() => dispatch(moveDownCell(props.cellIndex!!))}><ArrowDown /></Button> }
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
