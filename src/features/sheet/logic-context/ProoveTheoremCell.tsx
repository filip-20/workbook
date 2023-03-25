import { useReducer, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useAppSelector } from "../../../app/hooks";
import { embeddedApps } from "../../../embeddedApps";
import AppCell from "../AppCell";
import { CellContext, Formula } from "../slice/logicContext";
import { CellLocator, sheetSelectors } from "../slice/sheetSlice";
import { formula2Tex, FormulaInput, FormulaItem } from "./AddFormulasCell";

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { childrenToReact } from "react-markdown/lib/ast-to-react";


interface ProoveTheoremCellProps {
  cellLoc: CellLocator,
  isEdited: boolean,
  katexMacros: object,
  data: LocalState,
  onDataChanged: (getData: () => any) => void,
}

interface LocalState {
  theorem: FormulaItem,
  theoremCorrect: boolean,
  prooveWith?: string,
  getProoverData?: () => any,
  prooverData: any | null,
  isProofValid: boolean,
}
type LocalActions =
  { type: 'update_formula', payload: { item: FormulaItem, correct: boolean } }
  | { type: 'set_proover', payload: string }
  | { type: 'update_proover_data', payload: () => any }
  | { type: 'update_language', payload: CellContext }
export const initialProoveTheoremCellState: LocalState = { theorem: { name: '', formula: '' }, theoremCorrect: false, prooverData: null, isProofValid: false };

export default function ProoveTheoremCell({ cellLoc, isEdited, data, onDataChanged }: ProoveTheoremCellProps) {
  const context = useAppSelector(sheetSelectors.logicContext(cellLoc));
  const [localState, localDispatch] = useReducer((state: LocalState, action: LocalActions) => {
    let newState = { ...state };
    switch (action.type) {
      case 'update_formula':
        newState.theorem = action.payload.item;
        newState.theoremCorrect = action.payload.correct;
        break;
      case 'set_proover':
        newState.prooveWith = action.payload;
        break;
      case 'update_proover_data':
        newState.getProoverData = action.payload;
        break;
    }

    onDataChanged(() => ({
      ...newState,
      prooverData: newState.getProoverData === undefined ? null : newState.getProoverData(),
      getProoverData: undefined
    }));
    return newState;
  }, data);

  return (
    <div style={{ padding: '1rem' }}>
      Let
      <div className="p-3">
        {localState.prooveWith === undefined ? (
          <FormulaInput context={context}
            item={localState.theorem}
            onChange={(item, correct) => localDispatch({ type: 'update_formula', payload: { item, correct } })}
            isNameUsed={name => context.symbolExits(name)}
            empty={false}
            showDelete={false} />
        ) : (
          <InlineMath math={formula2Tex(context, localState.theorem) || '\\text{invalid formula}'} />
        )}
        <div><InlineMath math={`T = \\{ ${context.axioms.map(a => `\\textsf{${a.name}}`).join(', ')} \\}`} /></div>
      </div>
      <p>Proof that <InlineMath math={`T \\models \\textsf{${localState.theorem.name}}`} />.</p>
      {!localState.prooveWith ? (
        <Dropdown>
          <Dropdown.Toggle disabled={!localState.theoremCorrect} variant="success">
            Proove with
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {embeddedApps.filter(app => app.supportsProofs).map(app => (
              <Dropdown.Item onClick={() => localDispatch({ type: 'set_proover', payload: app.typeName })}>{app.name}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <div className="border">
        <AppCell
          cellLoc={cellLoc}
          data={localState.prooverData}
          isEdited={isEdited}
          typeName={localState.prooveWith}
          proof={localState.theorem}
          onDataChanged={getData => localDispatch({ type: 'update_proover_data', payload: getData })}
        />
        </div>
      )}
    </div>
  )
}