import { Button, ButtonGroup, ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

import { embeddedApps } from "../../embeddedApps";


export interface AddToolbarProps {
  className?: string, 
  style?: React.CSSProperties,
  onAddCellClick: (cellType: string) => void
  onDropdownToggled?: (isOpen: boolean) => void,
}

export default function AddToolbar(props: AddToolbarProps) {
  return (
    <ButtonToolbar className={props.className} style={props.style}>
      <ButtonGroup className="me-2" size="sm">
        <Button variant="secondary" onClick={() => props.onAddCellClick('text')}><Plus /> Text</Button>
        <DropdownButton onToggle={(isOpen, evt) => props.onDropdownToggled?.call(null, isOpen)} size="sm" variant="secondary" as={ButtonGroup} title={<><Plus /> App</>}>
          {embeddedApps.map( app => <Dropdown.Item key={app.typeName} onClick={() => props.onAddCellClick(`app/${app.typeName}`)} size="sm">{app.name}</Dropdown.Item>)}
        </DropdownButton>
      </ButtonGroup>
    </ButtonToolbar>
  )
}
