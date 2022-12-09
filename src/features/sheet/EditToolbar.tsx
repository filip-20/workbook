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
  onCommentClick: () => void,
  onToggleFullscreenClick: (isFullscreen: boolean) => void,
}

export default function EditToolbar(props: EditToolbarProps) {
  const { cellId, cellIndex } = props;
  const [fullscreen, setFullscreen] = useState(false);

  const firstCellId = useAppSelector(sheetSelectors.firstCellId)
  const lastCellId = useAppSelector(sheetSelectors.lastCellId)
  const cells = useAppSelector(sheetSelectors.cells);
  const isEdited = cells[cellId].isEdited;

  const showUp = cellId !== firstCellId;
  const showDown = cellId !== lastCellId;

  const dispatch = useAppDispatch();

  useEffect(() => props.onToggleFullscreenClick(fullscreen), [fullscreen]);

  return (
    <ButtonToolbar className={props.className} style={props.style}>
      <ButtonGroup>
        {isEdited === false && <Button disabled variant="danger" ><BiLock /></Button>}
        <Button className="text-nowrap" onClick={() => dispatch(sheetActions.setCellEdited({ cellId, isEdited: !isEdited }))}>
          {isEdited ? <><BiCheck /> Zamknúť</> : <><BiEdit /> Upraviť</>}
        </Button>
        <Button title="Odstrániť bunku" onClick={() => dispatch(sheetActions.deleteCell({cellId, cellIndex}))}><BiTrash /></Button>
        <Button title="Pridať komentár" onClick={props.onCommentClick}><BiComment /></Button>
        {showUp && <Button title="Presunúť vyššie" onClick={() => dispatch(sheetActions.moveUpCell(cellIndex))}><ArrowUp /></Button>}
        {showDown && <Button title="Presunúť nižšie" onClick={() => dispatch(sheetActions.moveDownCell(cellIndex))}><ArrowDown /></Button>}
        <Button title="Zväčšiť bunku" onClick={() => setFullscreen(prev => !prev )}>{fullscreen ? <BiExitFullscreen /> : <BiFullscreen />}</Button>
      </ButtonGroup>
    </ButtonToolbar>
  )
}
