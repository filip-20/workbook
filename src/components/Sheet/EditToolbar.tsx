import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { BiCheck, BiComment, BiEdit, BiExitFullscreen, BiFullscreen, BiTrash } from "react-icons/bi";
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
  onToggleFullscreenClick: (isFullscreen: boolean) => void,
}

export default function EditToolbar(props: EditToolbarProps) {
  const [editMode, setEditMode] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (props.isEdited !== undefined) {
      setEditMode(props.isEdited);
    }
  }, [props.isEdited])

  useEffect(() => props.onToggleFullscreenClick(fullscreen), [fullscreen]);

  return (
    <ButtonToolbar className={props.className} style={props.style}>
      <ButtonGroup>
        {/*<Button disabled variant="secondary" ><BiEdit /></Button>*/}
        <Button className="text-nowrap" onClick={() => setEditMode(prev => { props.onToggleEditClick(!prev); return !prev })}>
          {editMode ? <><BiCheck /> Zamknúť</> : <><BiEdit /> Upraviť</>}
        </Button>
        <Button title="Odstrániť bunku" onClick={props.onRemoveClick}><BiTrash /></Button>
        <Button title="Pridať komentár" onClick={props.onCommentClick}><BiComment /></Button>
        {props.showUp && <Button title="Presunúť vyššie" onClick={props.onMoveUpClick}><ArrowUp /></Button>}
        {props.showDown && <Button title="Presunúť nižšie" onClick={props.onMoveDownClick}><ArrowDown /></Button>}
        <Button title="Zväčšiť bunku" onClick={() => setFullscreen(prev => !prev )}>{fullscreen ? <BiExitFullscreen /> : <BiFullscreen />}</Button>
      </ButtonGroup>
    </ButtonToolbar>
  )
}
