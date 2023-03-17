import { Button, ButtonGroup, ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

import { embeddedApps } from "../../embeddedApps";
import { useAppDispatch } from "../../app/hooks";
import { CellLocator } from "./slice/sheetSlice";
import { addCell, contextCells } from "./cellFactory";


export interface AddToolbarProps {
  className?: string,
  style?: React.CSSProperties,
  cellLoc: CellLocator,
  onDropdownToggled?: (isOpen: boolean) => void,
}

export default function AddToolbar(props: AddToolbarProps) {
  const { cellLoc } = props;
  const dispatch = useAppDispatch();

  const addCellHandler = (typeName: string) => {
    addCell({dispatch, typeName, afterCell: cellLoc})
  }

  return (
    <ButtonToolbar className={props.className} style={props.style}>
      <ButtonGroup className="me-2" size="sm">
        <Button variant="success" onClick={() => addCellHandler('text')}><Plus /> Text</Button>
        <DropdownButton onToggle={(isOpen, evt) => props.onDropdownToggled?.call(null, isOpen)} size="sm" variant="success" as={ButtonGroup} title={<><Plus /> App</>}>
          {embeddedApps.map(app => <Dropdown.Item key={app.typeName} onClick={() => addCellHandler(`app/${app.typeName}`)} size="sm">{app.name}</Dropdown.Item>)}
        </DropdownButton>
        <DropdownButton onToggle={(isOpen, evt) => props.onDropdownToggled?.call(null, isOpen)} size="sm" variant="success" as={ButtonGroup} title={<><Plus /> Context</>}>
          {contextCells.map(({name, typeName}) => <Dropdown.Item onClick={() => addCellHandler(typeName)} size="sm">{name}</Dropdown.Item>)}
        </DropdownButton>
      </ButtonGroup>
    </ButtonToolbar>
  )
}
