import { Button, ButtonGroup, ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

import { embeddedApps } from "../../embeddedApps";
import { useAppDispatch } from "../../app/hooks";
import { sheetActions } from "./slice/sheetSlice";


export interface AddToolbarProps {
  className?: string, 
  style?: React.CSSProperties,
  cellIndex: number,
  onDropdownToggled?: (isOpen: boolean) => void,
}

export default function AddToolbar(props: AddToolbarProps) {
  const { cellIndex } = props;
  const dispatch = useAppDispatch();

  const addCellHandler = (typeName: string) => {
    if (typeName.startsWith('app/')) {
      dispatch(sheetActions.insertAppCell(typeName.slice(4), null, cellIndex))
    } else {
      dispatch(sheetActions.insertTextCell('some content', cellIndex))
    }
  }

  return (
    <ButtonToolbar className={props.className} style={props.style}>
      <ButtonGroup className="me-2" size="sm">
        <Button variant="success" onClick={() => addCellHandler('text')}><Plus /> Text</Button>
        <DropdownButton onToggle={(isOpen, evt) => props.onDropdownToggled?.call(null, isOpen)} size="sm" variant="success" as={ButtonGroup} title={<><Plus /> App</>}>
          {embeddedApps.map( app => <Dropdown.Item key={app.typeName} onClick={() => addCellHandler(`app/${app.typeName}`)} size="sm">{app.name}</Dropdown.Item>)}
        </DropdownButton>
      </ButtonGroup>
    </ButtonToolbar>
  )
}
