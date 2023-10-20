import React, { memo } from "react";
import { useAppSelector } from "../../app/hooks";
import AddToolbar from "./AddToolbar";
import CellContainer from "./CellContainer";
import { CellLocator, sheetSelectors } from "./slice/sheetSlice";
import sheetStyles from "./Sheet.module.scss";
import styles from "./ContextContainer.module.scss";

export interface ContextContainerProps {
  cellLoc: CellLocator,
  fullscreenCell: CellLocator | undefined,
  katexMacros: object,
  onFullscreenToggleClick: (isFullscreen: boolean, cellLoc: CellLocator) => void
}

function ContextContainer({ cellLoc, fullscreenCell, katexMacros, onFullscreenToggleClick }: ContextContainerProps) {
  const cellsOrder = useAppSelector(sheetSelectors.contextCellsList(cellLoc));
  const { contextId } = cellLoc;
  return (
    <div className={contextId === -1 ? styles.tldContext : styles.context}>
      {
        cellsOrder.map((cellId, index) => {
          const cellLoc1 = { id: cellId, index, contextId };
          return (
            <CellContainer
              key={cellId}
              cellLoc={cellLoc1}
              className={fullscreenCell !== undefined ? (cellId === fullscreenCell.id ? sheetStyles.fullscreenCell : 'd-none') : undefined}
              fullscreenCell={fullscreenCell}
              onFullscreenToggleClick={isFullscreen => onFullscreenToggleClick(isFullscreen, cellLoc1)}
              katexMacros={katexMacros}
            />
          )

        })
      }
      {cellsOrder.length === 0 &&
        <div className="my-5">
          {contextId !== -1 && <h3 className="text-center text-muted">Empty context</h3>}
          <AddToolbar className="justify-content-center" cellLoc={{ id: -1, index: -1, contextId }} />
        </div>
      }
    </div>
  )
}

export default memo(ContextContainer);