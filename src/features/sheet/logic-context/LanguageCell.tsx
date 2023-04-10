import { parseConstants, parseFunctions, parsePredicates, SyntaxError } from "@fmfi-uk-1-ain-412/js-fol-parser";
import { useEffect, useRef, useState } from "react";
import { Card, Form, FormControl, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import FormattedTextRenderer from "../../../components/FormattedTextRenderer";
import { CellLocator, sheetActions, sheetSelectors } from "../slice/sheetSlice";

interface LanguageCellProps {
  cellLoc: CellLocator,
  isEdited: boolean,
  onDataChanged: (getData: () => any) => void,
}

interface LanguageCellData {
  constants: string,
  predicates: string,
  functions: string,
}

export const initialLanguageCellData: LanguageCellData = {
  constants: '',
  predicates: '',
  functions: '',
}

function parseOrEmpty<T>(value: string, parseFunction: (value: string) => Array<T>): Array<T> {
  try {
    return parseFunction(value);
  } catch (_) {
    return [];
  }
}

export default function LanguageCell({ cellLoc, isEdited, onDataChanged }: LanguageCellProps) {
  const cell = useAppSelector(sheetSelectors.cell(cellLoc.id));
  const data = { ...(cell.data as LanguageCellData) };

  const [constants, setConstants] = useState(data.constants)
  const [functions, setFunctions] = useState(data.functions)
  const [predicates, setPredicates] = useState(data.predicates)

  const syncedState = useRef({constants, predicates, functions})
  syncedState.current = {constants, predicates, functions}
  const getData = () => syncedState.current

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEdited) {
      dispatch(sheetActions.extendLogicContext({
        cellLoc, contextExtension: {
          constants: parseOrEmpty(constants, parseConstants),
          functions: parseOrEmpty(functions, v => parseFunctions(v)),
          predicates: parseOrEmpty(predicates, v => parsePredicates(v)),
        }
      }))
    }
  }, [isEdited])

  const updateData = (value: string, setFunction: (v: string) => void) => {
    setFunction(value);
    onDataChanged(getData);
  }

  const symStr = (syms: string) => syms.split(',').map(s => `\\text{\\textsf{${s.trim()}}}`)
  if (isEdited) {
    return (
      <Card>
        <Card.Header>Language</Card.Header>
        <Card.Body>

          <LanguageInput
            label="Individual constant"
            value={constants}
            updateFunction={v => updateData(v, setConstants)}
            parseFunction={parseConstants}
          />
          <LanguageInput
            label="Functions"
            value={functions}
            updateFunction={v => updateData(v, setFunctions)}
            parseFunction={parseFunctions}
          />
          <LanguageInput
            label="Predicates"
            value={predicates}
            updateFunction={v => updateData(v, setPredicates)}
            parseFunction={parsePredicates}
          />
        </Card.Body>
      </Card>
    )
  } else {
    const text = `
$$ \\mathcal{C}_{\\mathcal{L}} = \\{${symStr(constants)}\\} $$

$$ \\mathcal{F}_{\\mathcal{L}} = \\{${symStr(functions)}\\} $$

$$ \\mathcal{P}_{\\mathcal{L}} = \\{${symStr(predicates)}\\} $$
    `;
    return (
      <div style={{ padding: '1rem' }}>
        <FormattedTextRenderer
          text={text}
        />
      </div>
    )
  }
}

interface LanguageInputProps {
  label: string,
  value: string,
  updateFunction: (v: string) => void,
  parseFunction: (v: string) => any[],
}

function LanguageInput({ label, value, updateFunction, parseFunction }: LanguageInputProps) {
  const [parseError, setParseError] = useState<string | undefined>(undefined);
  const changeHandler = (v: string) => {
    updateFunction(v);
    try {
      parseFunction(v);
      setParseError(undefined);
    } catch (e) {
      setParseError((e as SyntaxError).message);
    }
  }

  return (
      <InputGroup className="mb-2">
        <InputGroup.Text>
          {label}:
        </InputGroup.Text>
        <Form.Control isInvalid={parseError !== undefined} value={value} onChange={e => changeHandler(e.target.value)} />
        <FormControl.Feedback type="invalid">{parseError && parseError}</FormControl.Feedback>
      </InputGroup>
  )
}