import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { BiCheck, BiComment, BiEdit, BiExitFullscreen, BiFullscreen, BiLock, BiTrash } from "react-icons/bi";
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { sheetActions, sheetSelectors } from "./slice/sheetSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export interface EditToolbarProps {
  className?: string,
  style?: React.CSSProperties,
  cellId: number,
  cellIndex: number,
  isEdited: boolean,
  onAddComment: () => void,
  onToggleFullscreen: (isFullscreen: boolean) => void,
  onToggleEdit: (isEdited: boolean) => void
}

export default function EditToolbar(props: EditToolbarProps) {
  const { cellId, cellIndex, isEdited,  } = props;
  const [fullscreen, setFullscreen] = useState(false);

  const firstCellId = useAppSelector(sheetSelectors.firstCellId)
  const lastCellId = useAppSelector(sheetSelectors.lastCellId)

  const showUp = cellId !== firstCellId;
  const showDown = cellId !== lastCellId;

  const dispatch = useAppDispatch();

  useEffect(() => props.onToggleFullscreen(fullscreen), [fullscreen]);

  return (
    <ButtonToolbar className={props.className} style={props.style}>
      <ButtonGroup>
        {isEdited === false && <Button disabled variant="danger" ><BiLock /></Button>}
        <Button className="text-nowrap" onClick={() => props.onToggleEdit(!isEdited)}>
          {isEdited ? <><BiCheck /> Zamknúť</> : <><BiEdit /> Upraviť</>}
        </Button>
        <Button title="Remove cell" onClick={() => dispatch(sheetActions.deleteCell({cellId, cellIndex}))}><BiTrash /></Button>
        <Button title="Add comment" onClick={props.onAddComment}><BiComment /></Button>
        {showUp && <Button title="Move up" onClick={() => dispatch(sheetActions.moveUpCell(cellIndex))}><ArrowUp /></Button>}
        {showDown && <Button title="Move down" onClick={() => dispatch(sheetActions.moveDownCell(cellIndex))}><ArrowDown /></Button>}
        <Button title="Toggle maximize cell" onClick={() => setFullscreen(prev => !prev )}>{fullscreen ? <BiExitFullscreen /> : <BiFullscreen />}</Button>
      </ButtonGroup>
    </ButtonToolbar>
  )
}
