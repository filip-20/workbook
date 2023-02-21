import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { BiCheck, BiComment, BiDuplicate, BiEdit, BiExitFullscreen, BiFullscreen, BiLock, BiLockOpen, BiTrash } from "react-icons/bi";
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { sheetActions, sheetSelectors } from "./slice/sheetSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import classNames from 'classnames/dedupe';

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
      {/* <div className="rounded-circle bg-body d-inline-block me-1">
        {isEdited
        ? <Button disabled
            variant="outline-success" size="sm" className="rounded-circle"
            title="Cell is being edited"
          >
            <BiLockOpen />
          </Button>
        : <Button disabled
            variant="outline-danger" size="sm" className="rounded-circle"
            title="Cell is not being edited"
          >
            <BiLock />
          </Button>
        }
      </div> */}
      <ButtonGroup size="sm" className="rounded bg-body">
        <Button className="text-nowrap"
          onClick={() => props.onToggleEdit(!isEdited)}>
          {isEdited ? <><BiCheck /> Done</> : <><BiEdit /> Edit</>}
        </Button>
        <Button title="Remove cell" variant="secondary"
          onClick={() => dispatch(sheetActions.deleteCell({cellId, cellIndex}))}
        >
          <BiTrash />
        </Button>
        <Button title="Add comment" variant="secondary"
          onClick={props.onAddComment}
        >
          <BiComment />
        </Button>
        <Button disabled={!showUp} title="Move up" variant="secondary"
          onClick={() => dispatch(sheetActions.moveUpCell(cellIndex))}
        >
          <ArrowUp />
        </Button>
        <Button disabled={!showDown} title="Move down" variant="secondary"
          onClick={() => dispatch(sheetActions.moveDownCell(cellIndex))}
        >
          <ArrowDown />
        </Button>
        <Button title="Duplicate cell" variant="secondary"
          onClick={() => dispatch(sheetActions.duplicateCell({cellId, cellIndex}))}
        >
          <BiDuplicate />
        </Button>
        <Button title="Toggle maximize cell" variant="secondary"
          onClick={() => setFullscreen(prev => !prev )}
        >
          {fullscreen ? <BiExitFullscreen /> : <BiFullscreen />}
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  )
}
