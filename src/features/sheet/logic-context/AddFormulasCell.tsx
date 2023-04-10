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

type LocalState = Array<NamedFormula>
type LocalActions =
  { type: 'add', payload:  NamedFormula }
  | { type: 'change', payload: { index: number, item: NamedFormula } }
  | { type: 'delete', payload: { index: number, count: number } };
export const initialAddFormulasCellData : LocalState = [];

export default function AddFormulasCell({ cellLoc, isEdited, katexMacros, makeContextExtension, onDataChanged }: AddAxiomsCellProps) {
  const data = useAppSelector(sheetSelectors.cell(cellLoc.id)).data as LocalState;
  const context = useAppSelector(sheetSelectors.logicContext(cellLoc))
  const dispatch = useDispatch();

  const [parsed, setParsed] = useState<Array<NamedFormula | undefined>>([])
  const [formulas, localDispatch] = useReducer((state: LocalState, action: LocalActions) => {
    const newState = [...state];
    switch (action.type) {
      case 'add':
        newState.push(action.payload);
        break;
      case 'change':
        newState[action.payload.index] = action.payload.item;
        break;
      case 'delete':
        const { index, count } = action.payload;
        newState.splice(index, count);
    }
    onDataChanged(() => newState.map(i => ({ name: i.name, formula: i.formula })));
    return newState;
  }, data)


  useEffect(() => {
    if (!isEdited) {
      const newParsed: Array<NamedFormula | undefined> = [];
      for (const { name, formula } of formulas) {
        const names = new Set<string>();
        try {
          if (names.has(name) || context.symbolExits(name)) {
            console.log('name exists')
            newParsed.push(undefined);
          } else {
            newParsed.push({ name, formula: parseFormulaWithPrecedence(formula, context, asciiFactory(context)) })
          }
        } catch (e) {
          console.log('parse error', e, context)
          newParsed.push(undefined);
        }
      }
      dispatch(sheetActions.extendLogicContext({ cellLoc, contextExtension: makeContextExtension(newParsed.filter(i => i !== undefined) as NamedFormula[]) }));
      setParsed(newParsed);
    }
  }, [isEdited, context])

  return (
    <div style={{ padding: '1rem' }}>
      {isEdited ?
        <FormulaAdder
          context={context}
          formulas={formulas}
          onChange={(index, item) => localDispatch({ type: 'change', payload: { index, item } })}
          onAdd={item => localDispatch({ type: 'add', payload: item })}
          onDelete={(index, count) => localDispatch({ type: 'delete', payload: { index, count } })}
        />
        :
        <FormattedTextRenderer
          katexMacros={katexMacros}
          text={parsed.map((item, index) =>
            item ? `$$\\text{\\textsf{${item.name}}} = ${parseFormulaWithPrecedence(item.formula, context, texFactory(context))}$$`
              : `<span style='color: red'> ${formulas[index].name} = ${formulas[index].formula} </span>`).join('\n\n')
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

  const nameMap = useMemo(() => {
    const map = new Map<string, number>();
    formulas.forEach((f, index) => map.has(f.name) || map.set(f.name, index))
    return {
      map,
      change(from: string, to: string, index: number) {
        this.map.get(from) === index && this.map.delete(from);
        (to !== '' && this.map.get(to) === undefined) && this.map.set(to, index);
      },
      delete(name: string, index: number) {
        this.map.get(name) === index && this.map.delete(name);
        this.map.forEach((v, k) => v > index && this.map.set(k, v - 1));
      },
      add(name: string, index: number) {
        (name !== '' && this.map.get(name) === undefined) && this.map.set(name, index);
      },
      isUsed(name: string, index: number) {
        //console.log('namemap: ', this.map);
        return context.symbolExits(name) || (this.map.has(name) && this.map.get(name) !== index)
      }
    }
  }, []);

  const deleteLast = () => {
    nameMap.delete(formulas[formulas.length - 1].name, formulas.length - 1)
    let index = formulas.length - 2;
    while (index >= 0 && isEmpty(formulas[index])) {
      nameMap.delete(formulas[index].name, index);
      index--;
    }
    onDelete(index + 1, formulas.length - index + 1);
  }

  const handleChange = (index: number, item: NamedFormula) => {
    if (isEmpty(item) && index === formulas.length - 1) {
      deleteLast()
    } else if (index === formulas.length && !isEmpty(item)) {
      nameMap.add(item.name, index);
      onAdd(item);
    } else {
      nameMap.change(formulas[index].name, item.name, index);
      onChange(index, item);
    }

  }

  const handleDelete = (index: number) => {
    if (index === formulas.length - 1) {
      deleteLast()
    } else {
      nameMap.delete(formulas[index].name, index);
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
      {Array.from(gen(formulas)).map((item, index) =>
        <FormulaInput
          context={context}
          key={index}
          isNameUsed={(name) => nameMap.isUsed(name, index)}
          item={item}
          empty={index === formulas.length}
          showDelete={!(index === formulas.length)}
          onChange={item => handleChange(index, item)}
          onDelete={() => handleDelete(index)}
        />)}
    </>
  )
}

/*
interface FormulaItem { name: string, formula: string, parsed: string | undefined }
interface FormulaAdderProps {
  context: CellContext,
  initialFormulas?: Array<FormulaItem>,
  onChange: (index: number, item: FormulaItem) => void,
  onAdd: (item: FormulaItem) => void,
  onDelete: (index: number) => void,
}

function FormulaAdder({ context, initialFormulas, onChange, onAdd, onDelete }: FormulaAdderProps) {
  const emptyFormula: FormulaItem = {
    name: '', formula: '', parsed: undefined,
  }
  const tidyList = (n: Array<FormulaItem>) => {
    if (!isEmptyFormula(n[n.length - 1])) {
      n.push({ name: '', formula: '', parsed: undefined })
    }
    while (n.length - 2 >= 0 && isEmptyFormula(n[n.length - 2])) {
      n.pop();
      onDelete(n.length - 2);
    }
    return n;
  }
  const isEmptyFormula = (f: Formula) => f.name === '' && f.formula === '';
  const [formulas, setFormulas] = useState(initialFormulas ?
    tidyList([...initialFormulas])
    : [{ name: '', formula: '', parsed: undefined }]
  );

  const formulaChanged = (index: number, item: FormulaItem) => {
    setFormulas(p => {
      const n = [...p];
      n[index] = item;
      if (index === n.length - 1) {
        onAdd(item)
      }
      tidyList(n);
      return n;
    });
  }

  const handleDelete = (index: number) => {
    setFormulas(p => {
      const n = [...p]
      n.splice(index, 1);
      onDelete(index);
      tidyList(n);
      return n;
    })
  }

  return (
    <>
      {
        formulas.map((f, index) =>
          <FormulaInput
            context={context}
            key={index}
            name={f.name}
            formula={f.formula}
            showDelete={index !== formulas.length - 1}
            onChange={(name, formula, parsed) => formulaChanged(index, {name, formula, parsed})}
            onDelete={() => handleDelete(index)}
          />)
      }
    </>
  )
}*/

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
  const [parseError, setParseError] = useState<string | undefined>(undefined);
  const [nameError, setNameError] = useState<string | undefined>(undefined);

  const parse = (value: string) => {
    try {
      const parsed = parseFormulaWithPrecedence(value, context, unicodeFactory(context))
      setParseError(undefined);
      return parsed;
    } catch (e: unknown) {
      const se = (e as SyntaxError)
      setParseError(se.message);
      return undefined;
    }
  }
  const testName = (name: string) => {
    if (name.trim() === '' && item.formula !== '') {
      setNameError('Name is empty. ')
      return false;
    } else if (isNameUsed(name)) {
      setNameError('Symbol name is already used. ')
      return false;
    } else {
      setNameError(undefined)
      return true;
    }
  }

  
  useEffect(() => {
    if (empty) {
      nameError && setNameError(undefined);
      parseError && setParseError(undefined);
    }
  }, [item.name, item.formula, empty]);

  const formulaChanged = (value: string) => {
    let correct = true;
    if (!empty) {
      correct = parse(value) !== undefined && nameError === undefined;
    }
    onChange({ ...item, formula: value }, correct);
  }
  const nameChanged = (value: string) => {
    let correct = true;
    if (!empty) {
      correct = testName(item.name) && parseError === undefined;
    }
    onChange({ ...item, name: value }, correct);
  }

  return (
    <>
      <InputGroup className="mb-2" hasValidation>
        <Form.Control
          style={{ flexBasis: "5rem", flexGrow: "0", flexShrink: '0' }}
          isInvalid={nameError !== undefined}
          value={item.name}
          onChange={e => nameChanged(e.target.value)}
        />
        <InputGroup.Text>=</InputGroup.Text>
        <Form.Control
          isInvalid={parseError !== undefined}
          value={item.formula}
          onChange={e => formulaChanged(e.target.value)}
        />
        {!showDelete &&
          <Button variant="danger" tabIndex={-1} onClick={() => onDelete && onDelete()}><BiTrash /></Button>
        }
        <Form.Control.Feedback type="invalid">{nameError && nameError} {parseError && parseError}</Form.Control.Feedback>
      </InputGroup>
    </>
  )
}