import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import { useAppSelector } from "../../../app/hooks";
import { CellContext, emptyContext, Formula, LogicContext } from "../slice/logicContext";
import { CellLocator, sheetActions, sheetSelectors } from "../slice/sheetSlice";
import { ErrorExpected, FormulaFactories, parseFormulaStrict, SyntaxError } from "@fmfi-uk-1-ain-412/js-fol-parser"
import { useDispatch } from "react-redux";
import FormattedTextRenderer from "../../../components/FormattedTextRenderer";

interface AddAxiomsCellProps {
  cellLoc: CellLocator,
  isEdited: boolean,
  katexMacros: object,
  makeContextExtension: (formulas: Formula[]) => LogicContext
  onDataChanged: (getData: () => any) => void,
}

export const initialAddFormulasCellData: Array<{ name: string, formula: string }> = []

export default function AddFormulasCell({ cellLoc, isEdited, katexMacros, makeContextExtension, onDataChanged }: AddAxiomsCellProps) {
  const data = useAppSelector(sheetSelectors.cell(cellLoc.id)).data as typeof initialAddFormulasCellData;
  const context = useAppSelector(sheetSelectors.logicContext(cellLoc))
  const dispatch = useDispatch();

  const [parsed, setParsed] = useState<Array<Formula | undefined>>([])
  const [formulas, dispatch1] = useReducer((state: Array<FormulaItem>, action: any) => {
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
      const newParsed: Array<Formula | undefined> = [];
      for (const { name, formula } of formulas) {
        const names = new Set<string>();
        try {
          if (names.has(name) || context.symbolExits(name)) {
            console.log('name exists')
            newParsed.push(undefined);
          } else {
            newParsed.push({ name, formula: parseFormulaStrict(formula, context, stringFactory(context)) })
          }
        } catch (e) {
          console.log('parse error', e, context)
          newParsed.push(undefined);
        }
      }
      dispatch(sheetActions.extendLogicContext({ cellLoc, logicContext: makeContextExtension(newParsed.filter(i => i !== undefined) as Formula[]) }));
      setParsed(newParsed);
    }
  }, [isEdited, context])

  return (
    <div style={{ padding: '1rem' }}>
      {isEdited ?
        <FormulaAdder
          context={context}
          formulas={formulas}
          onChange={(index, item) => dispatch1({ type: 'change', payload: { index, item } })}
          onAdd={item => dispatch1({ type: 'add', payload: item })}
          onDelete={(index, count) => dispatch1({ type: 'delete', payload: { index, count } })}
        />
        :
        <FormattedTextRenderer
          katexMacros={katexMacros}
          text={parsed.map((item, index) =>
            item ? `$$\\text{\\textsf{${item.name}}} = ${parseFormulaStrict(item.formula, context, texFactory(context))}$$`
              : `<span style='color: red'> ${formulas[index].name} = ${formulas[index].formula} </span>`).join('\n\n')
          }
        />
      }
    </div>
  )
}

interface FormulaItem { name: string, formula: string }
interface FormulaAdderProps {
  context: CellContext,
  formulas: Array<FormulaItem>,
  onChange: (index: number, item: FormulaItem) => void,
  onAdd: (item: FormulaItem) => void,
  onDelete: (index: number, count: number) => void,
}

function FormulaAdder({ context, formulas, onChange, onAdd, onDelete }: FormulaAdderProps) {
  const isEmpty = (f: FormulaItem) => f.name === '' && f.formula === ''

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

  const handleChange = (index: number, item: FormulaItem) => {
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

  const gen = function* (formulas: Array<FormulaItem>) {
    let last: FormulaItem | null = null;
    for (const f of formulas) {
      yield f;
      last = f;
    }
    if (!last || !isEmpty(last)) {
      yield { name: '', formula: '', isValid: false } as FormulaItem
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
          last={index === formulas.length}
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

const stringFactory = (context: CellContext) => {
  const testArity = (symbol: string, args: any[], ee: ErrorExpected) => {
    const a = context.symbolArity(symbol)
    a !== args.length && ee.expected(`${a} arguments for ${symbol}`);
  }
  const factory: FormulaFactories<string, string> = {
    variable: (symbol: string, ee: ErrorExpected) => symbol,
    constant: (symbol: string, ee: ErrorExpected) => symbol,
    equalityAtom: (lhs: string, rhs: string, ee: ErrorExpected) => `${lhs} ≐ ${rhs}`,
    negation: (subf: string, ee: ErrorExpected) => `¬${subf}`,
    conjunction: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} ∧ ${rhs})`,
    disjunction: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} ∨ ${rhs})`,
    implication: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} ⇒ ${rhs})`,
    equivalence: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} ⇔ ${rhs})`,
    existentialQuant: (variable: string, subf: string, ee: ErrorExpected) => `∃ ${variable}: ${subf}`,
    universalQuant: (variable: string, subf: string, ee: ErrorExpected) => `∀ ${variable}: ${subf}`,
    functionApplication: (symbol: string, args: string[], ee: ErrorExpected) => {
      testArity(symbol, args, ee);
      return `${symbol}(${args.join(', ')})`
    },
    predicateAtom: (symbol: string, args: string[], ee: ErrorExpected) => {
      testArity(symbol, args, ee);
      return `${symbol}(${args.join(', ')})`
    },
  };
  return factory;
}

const texFactory = (context: CellContext) => {
  const testArity = (symbol: string, args: any[], ee: ErrorExpected) => {
    const a = context.symbolArity(symbol)
    a !== args.length && ee.expected(`${a} arguments for ${symbol}`);
  }
  const factory: FormulaFactories<string, string> = {
    variable: (symbol: string, ee: ErrorExpected) => `\\text{\\textsf{${symbol}}}`,
    constant: (symbol: string, ee: ErrorExpected) => `\\text{\\textsf{${symbol}}}`,
    equalityAtom: (lhs: string, rhs: string, ee: ErrorExpected) => `${lhs} \\doteq ${rhs}`,
    negation: (subf: string, ee: ErrorExpected) => `\\neg ${subf}`,
    conjunction: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} \\land ${rhs})`,
    disjunction: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} \\lor ${rhs})`,
    implication: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} \\rarr ${rhs})`,
    equivalence: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} \\lrarr ${rhs})`,
    existentialQuant: (variable: string, subf: string, ee: ErrorExpected) => `\\exists ${variable} ${subf}`,
    universalQuant: (variable: string, subf: string, ee: ErrorExpected) => `\\forall ${variable}: ${subf}`,
    functionApplication: (symbol: string, args: string[], ee: ErrorExpected) => {
      testArity(symbol, args, ee);
      return `\\text{\\textsf{${symbol}}}(${args.map(a => `\\text{\\textsf{${a}}}`).join(', ')})`
    },
    predicateAtom: (symbol: string, args: string[], ee: ErrorExpected) => {
      testArity(symbol, args, ee);
      return `\\text{\\textsf{${symbol}}}(${args.map(a => `\\text{\\textsf{${a}}}`).join(', ')})`
    },
  };
  return factory;
}

interface FormulaInputProps {
  context: CellContext,
  item: FormulaItem,
  last: boolean,
  isNameUsed: (name: string) => boolean,
  onChange: (item: FormulaItem) => void
  onDelete?: () => void
}

function FormulaInput({ context, item, last, isNameUsed, onChange, onDelete }: FormulaInputProps) {
  const [parseError, setParseError] = useState<string | undefined>(undefined);
  const [nameError, setNameError] = useState<string | undefined>(undefined);

  const parse = (value: string) => {
    try {
      const parsed = parseFormulaStrict(value, context, stringFactory(context))
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
    } else if (isNameUsed(name)) {
      setNameError('Symbol name is already used. ')
    } else {
      setNameError(undefined)
    }
  }

  useEffect(() => {
    if (last) {
      nameError && setNameError(undefined);
      parseError && setParseError(undefined);
    } else {
      testName(item.name)
      parse(item.formula)
    }
  }, [item.name, item.formula, last]);

  /*
  if (parseError === undefined && item.parsed === undefined && !last) {
    parse(item.formula);
  }*/

  const formulaChanged = (value: string) => {
    onChange({ ...item, formula: value });
  }
  const nameChanged = (value: string) => {
    onChange({ ...item, name: value })
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
          {!last &&
            <Button variant="danger" tabIndex={-1} onClick={() => onDelete && onDelete()}><BiTrash /></Button>
          }
          <Form.Control.Feedback type="invalid">{nameError && nameError} {parseError && parseError}</Form.Control.Feedback>
        </InputGroup>
    </>
  )
}