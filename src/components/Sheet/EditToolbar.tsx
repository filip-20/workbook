import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { BiCheck, BiComment, BiEdit, BiTrash } from "react-icons/bi";
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";
import { useEffect, useState } from "react";

export interface EditToolbarProps {
  className?: string,
  style?: React.CSSProperties,
  showUp?: boolean,
  showDown?: boolean,
  isEdited?: boolean,
  onToggleEditClick: (isEditing: boolean) => void,
  onRemoveClick: () => void,
  onMoveUpClick: () => void,
  onCommentClick: () => void,
  onMoveDownClick: () => void,
}

export default function EditToolbar(props: EditToolbarProps) {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (props.isEdited !== undefined) {
      setEditMode(props.isEdited);
    }
  }, [props.isEdited])

  return (
    <ButtonToolbar className={props.className} style={props.style}>
      <ButtonGroup size="sm">
        <Button onClick={() => setEditMode(prev => { props.onToggleEditClick(!prev); return !prev })}>
          {editMode ? <BiCheck /> : <BiEdit />}
        </Button>
        <Button onClick={props.onRemoveClick}><BiTrash /></Button>
        <Button onClick={props.onCommentClick}><BiComment /></Button>
        {props.showUp && <Button onClick={props.onMoveUpClick}><ArrowUp /></Button>}
        {props.showDown && <Button onClick={props.onMoveDownClick}><ArrowDown /></Button>}
      </ButtonGroup>
    </ButtonToolbar>
  )
}
