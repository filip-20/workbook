import { Button, Form, InputGroup } from "react-bootstrap";
import { BiCheck } from "react-icons/bi";
import { useAppSelector } from "../../../app/hooks";
import { CellLocator, sheetSelectors } from "../slice/sheetSlice";

interface AddAxiomsCellProps {
  cellLoc: CellLocator,
  isEdited: boolean,
  onDataChanged: (getData: () => any) => void,
}

export default function AddAxiomsCell({ cellLoc }: AddAxiomsCellProps) {
  const context = useAppSelector(sheetSelectors.logicContext(cellLoc))
  return (
    <div style={{ padding: '1rem' }}>
      <FormulaInput />
    </div>
  )
}

function FormulaInput() {
  return (
    <InputGroup>
      <Form.Control className="w-50" />
      <InputGroup.Text>=</InputGroup.Text>
      <Form.Control /*onChange={e => updateFunction(e.target.value)}*/ />
    </InputGroup>
  )
}