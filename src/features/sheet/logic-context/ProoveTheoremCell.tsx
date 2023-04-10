import { useReducer, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useAppSelector } from "../../../app/hooks";
import { embeddedApps } from "../../../embeddedApps";
import AppCell from "../AppCell";
import { CellContext, NamedFormula, Theorem } from "../slice/logicContext";
import { CellLocator, sheetActions, sheetSelectors } from "../slice/sheetSlice";
import { formula2Tex, FormulaInput } from "./AddFormulasCell";

import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

import styles from './ProoveTheoremCell.module.scss'
import { useDispatch } from "react-redux";

interface ProoveTheoremCellProps {
  cellLoc: CellLocator,
  isEdited: boolean,
  katexMacros: object,
  data: LocalState,
  onDataChanged: (getData: () => any) => void,
}

interface LocalState {
  proof: ProofAssignment,
  theoremCorrect: boolean,
  prooveWith?: string,
  getProoverData?: () => any,
  prooverData: any | null,
  verdict: boolean,
  context?: CellContext,
}
type LocalActions =
  { type: 'update_theorem', payload: { item: NamedFormula, correct: boolean } }
  | { type: 'set_proover', payload: string }
  | { type: 'update_proover_data', payload: () => any }
  | { type: 'update_verdict', payload: boolean }
  | { type: 'update_context', payload: CellContext }

interface ProofAssignment {
  axioms: NamedFormula[],
  theorems: Theorem[],
  theorem: NamedFormula,
}

export const initialProoveTheoremCellState: LocalState = {
  proof: {axioms: [], theorems: [], theorem: {name: '', formula: ''}},
  theoremCorrect: false,
  prooverData: null,
  verdict: false
};

export default function ProoveTheoremCell({ cellLoc, isEdited, data, onDataChanged }: ProoveTheoremCellProps) {
  const context = useAppSelector(sheetSelectors.logicContext(cellLoc));

  const dispatch = useDispatch();

  const [localState, localDispatch] = useReducer((state: LocalState, action: LocalActions) => {
    let newState = { ...state };
    switch (action.type) {
      case 'update_theorem':
        newState.proof.theorem = action.payload.item;
        newState.theoremCorrect = action.payload.correct;
        break;
      case 'set_proover':
        newState.prooveWith = action.payload;
        dispatch(sheetActions.extendLogicContext({
          cellLoc,
          contextExtension: { theorems: [{ theorem: state.proof.theorem, prooved: false }] }
        }));
        break;
      case 'update_proover_data':
        newState.getProoverData = action.payload;
        break;
      case 'update_verdict':
        newState.verdict = action.payload;
        dispatch(sheetActions.extendLogicContext({
          cellLoc,
          contextExtension: { theorems: [{ theorem: state.proof.theorem, prooved: newState.verdict }] }
        }));
        break;
      case 'update_context':
        const ctx = action.payload;
        newState.context = ctx;
        newState.proof = {
          ...newState.proof,
          axioms: ctx.axioms,
          theorems: ctx.theorems,
        }
        break;
    }

    onDataChanged(() => ({
      ...newState,
      prooverData: newState.getProoverData === undefined ? null : newState.getProoverData(),
      getProoverData: undefined
    }));
    return newState;
  }, data);

  if (localState.context !== context) {
    localDispatch({type: 'update_context', payload: context});
  }

  return (
    <div style={{ padding: '1rem' }}>
      Let
      <div className="p-3">
        {localState.prooveWith === undefined ? (
          <FormulaInput context={context}
            item={localState.proof.theorem}
            onChange={(item, correct) => localDispatch({ type: 'update_theorem', payload: { item, correct } })}
            isNameUsed={name => context.symbolExits(name)}
            empty={false}
            showDelete={false} />
        ) : (
          <InlineMath math={formula2Tex(context, localState.proof.theorem) || '\\text{invalid formula}'} />
        )}
        <div><InlineMath math={`T = \\{ ${context.axioms.map(a => `\\textsf{${a.name}}`).join(', ')} \\}`} /></div>
      </div>
      <p>Proof that <InlineMath math={`T \\models \\textsf{${localState.proof.theorem.name}}`} />.</p>
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
        <div className={styles.proover}>
          <AppCell
            cellLoc={cellLoc}
            data={localState.prooverData}
            isEdited={isEdited}
            typeName={localState.prooveWith}
            proof={localState.proof}
            onDataChanged={getData => localDispatch({ type: 'update_proover_data', payload: getData })}
            updateProofVerdict={verdict => {
              if (localState.verdict !== verdict) {
                localDispatch({ type: 'update_verdict', payload: verdict });
              }
            }}
          />
          <p className="mt-2">
            It was {localState.verdict ? '' : <strong>not</strong>} prooved that <InlineMath math={`T \\models \\textsf{${localState.proof.theorem.name}}`} />.
          </p>
        </div>
      )}
    </div>
  )
}
