import { useAppSelector } from "../../../app/hooks";
import { CellLocator, sheetSelectors } from "../slice/sheetSlice";

interface DisplayContextCellProps {
  cellLoc: CellLocator,
}

export default function DisplayContextCell({ cellLoc }: DisplayContextCellProps) {
  const context = useAppSelector(sheetSelectors.logicContext(cellLoc))
  return (
    <div style={{padding: '1rem'}}>
      <p>Constants: {context.constants.join(', ')}</p>
      <p>Functions: {context.functions.join(', ')}</p>
      <p>Predicates: {context.predicates.join(', ')}</p>
      <p>Axioms: {context.axioms.join(', ')}</p>
      <p>Theorems: {context.theorems.join(', ')}</p>
    </div>
  )
}