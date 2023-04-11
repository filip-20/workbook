import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import { useAppSelector } from "../../../app/hooks";
import { CellContext, ContextExtension, NamedFormula } from "../slice/logicContext";
import { CellLocator, sheetActions, sheetSelectors } from "../slice/sheetSlice";
import { ErrorExpected, FormulaFactories, parseFormulaWithPrecedence, SyntaxError } from "@fmfi-uk-1-ain-412/js-fol-parser"
import { useDispatch } from "react-redux";
import FormattedTextRenderer from "../../../components/FormattedTextRenderer";
import { asciiFactory, texFactory, unicodeFactory } from "../../../utils/formulaUtils/stringify";

interface AddAxiomsCellProps {
  cellLoc: CellLocator,
  isEdited: boolean,
  katexMacros: object,
  makeContextExtension: (formulas: NamedFormula[]) => ContextExtension
  onDataChanged: (getData: () => any) => void,
}

type SavedState = NamedFormula[];
type LocalState = {
  formulas: NamedFormula[],
  parsed: Array<string | undefined>,
}
type LocalActions =
  { type: 'add', payload: NamedFormula }
  | { type: 'change', payload: { index: number, item: NamedFormula } }
  | { type: 'delete', payload: { index: number, count: number } };
export const initialAddFormulasCellData: SavedState = [];

export default function AddFormulasCell({ cellLoc, isEdited, katexMacros, makeContextExtension, onDataChanged }: AddAxiomsCellProps) {
  const data = useAppSelector(sheetSelectors.cell(cellLoc.id)).data as SavedState;
  const context = useAppSelector(sheetSelectors.logicContext(cellLoc))
  const dispatch = useDispatch();

  const parse = (formula: string) => {
    try {
      return parseFormulaWithPrecedence(formula, context, asciiFactory(context));
    } catch (_) {
      return undefined;
    }
  }

  const [localState, localDispatch] = useReducer((state: LocalState, action: LocalActions) => {
    const newState = { formulas: [...state.formulas], parsed: [...state.parsed] };
    switch (action.type) {
      case 'add':
        newState.formulas.push(action.payload);
        newState.parsed.push(parse(action.payload.formula));
        break;
      case 'change':
        newState.formulas[action.payload.index] = action.payload.item;
        newState.parsed[action.payload.index] = parse(action.payload.item.formula);
        break;
      case 'delete':
        const { index, count } = action.payload;
        newState.formulas.splice(index, count);
        newState.parsed.splice(index, count);
        break;
    }
    onDataChanged(() => [...newState.formulas]);
    return newState;
  }, { formulas: [...data], parsed: data.map(f => parse(f.formula)) })

  useEffect(() => {
    if (!isEdited) {
      const contextExtension = makeContextExtension(
        localState.formulas
          .filter((_, index) => localState.parsed[index] !== undefined)
          .map((_, index) => ({
            name: localState.formulas[index].name,
            formula: localState.parsed[index]!
          }))
      )
      dispatch(sheetActions.extendLogicContext({ cellLoc, contextExtension }));
    }
  }, [isEdited])

  return (
    <div style={{ padding: '1rem' }}>
      {isEdited ?
        <FormulaAdder
          context={context}
          formulas={localState.formulas}
          onChange={(index, item) => localDispatch({ type: 'change', payload: { index, item } })}
          onAdd={item => localDispatch({ type: 'add', payload: item })}
          onDelete={(index, count) => localDispatch({ type: 'delete', payload: { index, count } })}
        />
        :
        <FormattedTextRenderer
          katexMacros={katexMacros}
          text={localState.parsed.map((item, index) =>
            item ? `$$\\text{\\textsf{${localState.formulas[index].name}}} = ${parseFormulaWithPrecedence(item, context, texFactory(context))}$$`
              : `<span style='color: red'> ${localState.formulas[index].name} = ${localState.formulas[index].formula} </span>`).join('\n\n')
          }
        />
      }
    </div>
  )
}

interface FormulaAdderProps {
  context: CellContext,
  formulas: Array<NamedFormula>,
  onChange: (index: number, item: NamedFormula) => void,
  onAdd: (item: NamedFormula) => void,
  onDelete: (index: number, count: number) => void,
}

function FormulaAdder({ context, formulas, onChange, onAdd, onDelete }: FormulaAdderProps) {
  const isEmpty = (f: NamedFormula) => f.name === '' && f.formula === ''
  const deleteLast = () => {
    let index = formulas.length - 2;
    while (index >= 0 && isEmpty(formulas[index])) {
      index--;
    }
    onDelete(index + 1, formulas.length - index + 1);
  }

  const nameMap = new Map<string, number>();
  let i = 0;
  for (let f of formulas) {
    if (!nameMap.has(f.name)) {
      nameMap.set(f.name, i);
    }
    i++;
  }
  
  console.log('nameMap', nameMap);
  const isNameUsed = (name: string, index: number) => {
    const t = nameMap.get(name);
    return (t !== undefined && t < index) || context.symbolExits(name);
  }

  const handleChange = (index: number, item: NamedFormula) => {
    if (isEmpty(item) && index === formulas.length - 1) {
      deleteLast()
    } else if (index === formulas.length && !isEmpty(item)) {
      console.log('adding item ');
      onAdd(item);
    } else {
      onChange(index, item);
    }
  }

  const handleDelete = (index: number) => {
    if (index === formulas.length - 1) {
      deleteLast()
    } else {
      onDelete(index, 1);
    }
  }
  const gen = function* (formulas: Array<NamedFormula>) {
    let last: NamedFormula | null = null;
    for (const f of formulas) {
      yield f;
      last = f;
    }
    if (!last || !isEmpty(last)) {
      yield { name: '', formula: '', isValid: false } as NamedFormula
    }
  }

  return (
    <>
      {Array.from(gen(formulas)).map((item, index) => {

        console.log('Rendering ', index, formulas.length, index === formulas.length, index !== formulas.length);

        return <FormulaInput
          context={context}
          key={index}
          isNameUsed={(name) => isNameUsed(name, index)}
          item={item}
          empty={index === formulas.length}
          showDelete={index !== formulas.length}
          onChange={item => handleChange(index, item)}
          onDelete={() => handleDelete(index)}
        />
      })}
    </>
  )
}

export function formula2Tex(context: CellContext, formula: NamedFormula) {
  const f = parseFormulaWithPrecedence(formula.formula, context, texFactory(context));
  return f === undefined ? undefined : `\\text{\\textsf{${formula.name}}} = ${f}`;
}

interface FormulaInputProps {
  context: CellContext,
  item: NamedFormula,
  empty: boolean,
  showDelete: boolean,
  isNameUsed: (name: string) => boolean,
  onChange: (item: NamedFormula, correct: boolean) => void
  onDelete?: () => void
}

export function FormulaInput({ context, item, empty, showDelete, isNameUsed, onChange, onDelete }: FormulaInputProps) {
  const getNameError = (name: string) => {
    if (name.trim() === '') {
      return 'Name is empty. '
    } else if (isNameUsed(name)) {
      return 'Symbol name is already used. '
    }
  }
  const parse = (formula: string): { error?: string, parsed?: string } => {
    try {
      const parsed = parseFormulaWithPrecedence(formula, context, unicodeFactory(context))
      return { parsed };
    } catch (e: unknown) {
      const se = (e as SyntaxError)
      return { error: se.message };
    }
  }
  const [parseError, setParseError] = useState<string | undefined>(getNameError(item.name));
  const [nameError, setNameError] = useState<string | undefined>(parse(item.formula).error);

  const formulaChanged = (value: string) => {
    const correct = !nameError && !parse(value).error
    onChange({ ...item, formula: value }, correct);
  }
  const nameChanged = (value: string) => {
    const correct = !getNameError(value) && !parseError
    onChange({ ...item, name: value }, correct);
  }

  useEffect(() => {
    if (empty) {
      setNameError(undefined);
    } else {
      setNameError(getNameError(item.name));
    }
  }, [item.name, empty])
  useEffect(() => {
    if (empty) {
      setParseError(undefined);
    } else {
      setParseError(parse(item.formula).error);
    }
  }, [item.formula, empty])

  return (
    <>
      <InputGroup className="mb-2" hasValidation>
        <Form.Control
          style={{ flexBasis: "5rem", flexGrow: "0", flexShrink: '0' }}
          isInvalid={nameError !== undefined}
          value={item.name}
          onChange={e => { console.log('name change handler ', e); nameChanged(e.target.value) }}
        />
        <InputGroup.Text>=</InputGroup.Text>
        <Form.Control
          isInvalid={parseError !== undefined}
          value={item.formula}
          onChange={e => formulaChanged(e.target.value)}
        />
        {showDelete &&
          <Button variant="danger" tabIndex={-1} onClick={() => onDelete && onDelete()}><BiTrash /></Button>
        }
        <Form.Control.Feedback type="invalid">{nameError && nameError} {parseError && parseError}</Form.Control.Feedback>
      </InputGroup>
    </>
  )
}