import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { BiCheck, BiComment, BiDuplicate, BiEdit, BiExitFullscreen, BiFullscreen, BiLock, BiLockOpen, BiTrash } from "react-icons/bi";
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { CellLocator, sheetActions, sheetSelectors } from "./slice/sheetSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import classNames from 'classnames/dedupe';

export interface EditToolbarProps {
  className?: string,
  style?: React.CSSProperties,
  cellLoc: CellLocator,
  isEdited: boolean,
  onAddComment: () => void,
  onToggleFullscreen: (isFullscreen: boolean) => void,
  onToggleEdit: (isEdited: boolean) => void
}

export default function EditToolbar({ className, style, cellLoc, isEdited, onAddComment, onToggleFullscreen, onToggleEdit }: EditToolbarProps) {
  const { id: cellId, index: cellIndex } = cellLoc;
  const [fullscreen, setFullscreen] = useState(false);
  const firstCellId = useAppSelector(sheetSelectors.firstCellId)
  const lastCellId = useAppSelector(sheetSelectors.lastCellId)

  const showUp = cellLoc.index !== 0;
  const showDown = cellId !== lastCellId;
  const showToggleEdit = useAppSelector(sheetSelectors.cell(cellLoc)).type !== 'context';

  const dispatch = useAppDispatch();

  useEffect(() => onToggleFullscreen(fullscreen), [fullscreen]);

  return (
    <ButtonToolbar className={className} style={style}>
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
        {showToggleEdit && (
          <Button className="text-nowrap"
            onClick={() => onToggleEdit(!isEdited)}>
            {isEdited ? <><BiCheck /> Done</> : <><BiEdit /> Edit</>}
          </Button>
        )}
        <Button title="Remove cell" variant="secondary"
          onClick={() => dispatch(sheetActions.deleteCell(cellLoc))}
        >
          <BiTrash />
        </Button>
        <Button title="Add comment" variant="secondary"
          onClick={onAddComment}
        >
          <BiComment />
        </Button>
        <Button disabled={!showUp} title="Move up" variant="secondary"
          onClick={() => dispatch(sheetActions.moveUpCell(cellLoc))}
        >
          <ArrowUp />
        </Button>
        <Button disabled={!showDown} title="Move down" variant="secondary"
          onClick={() => dispatch(sheetActions.moveDownCell(cellLoc))}
        >
          <ArrowDown />
        </Button>
        <Button title="Duplicate cell" variant="secondary"
          onClick={() => dispatch(sheetActions.duplicateCell(cellLoc))}
        >
          <BiDuplicate />
        </Button>
        {/*
        <Button title="Toggle maximize cell" variant="secondary"
          onClick={() => setFullscreen(prev => !prev)}
        >
          {fullscreen ? <BiExitFullscreen /> : <BiFullscreen />}
        </Button>
        */}
      </ButtonGroup>
    </ButtonToolbar>
  )
}
