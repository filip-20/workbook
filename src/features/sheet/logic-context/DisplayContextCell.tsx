import { SymbolWithArity } from "@fmfi-uk-1-ain-412/js-fol-parser";
import { useAppSelector } from "../../../app/hooks";
import { CellLocator, sheetSelectors } from "../slice/sheetSlice";
import { NamedFormula, Theorem } from "../slice/logicContext";

interface DisplayContextCellProps {
  cellLoc: CellLocator,
}

export default function DisplayContextCell({ cellLoc }: DisplayContextCellProps) {
  const context = useAppSelector(sheetSelectors.logicContext(cellLoc))
  const stringifyAritySymbol = (a: SymbolWithArity) => `${a.name}/${a.arity}`;
  const strigifyNamedFormula = (f: NamedFormula | Theorem) => {
    if ('prooved' in f && f.prooved === true) {
      return `${f.name} = ${f.formula} [prooved]`;
    } else {
      return `${f.name} = ${f.formula}`;
    }
  }
  return (
    <div style={{padding: '1rem'}}>
      <p>Constants: {context.constants.join(', ')}</p>
      <p>Functions: {context.functions.map(stringifyAritySymbol).join(', ')}</p>
      <p>Predicates: {context.predicates.map(stringifyAritySymbol).join(', ')}</p>
      <p>Axioms: {context.axioms.map(strigifyNamedFormula).join(', ')}</p>
      <p>Theorems: {context.theorems.map(strigifyNamedFormula).join(', ')}</p>
    </div>
  )
}