import React from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { useAppDispatch } from "../../app/hooks";
import AppCell from "./AppCell";
import AddFormulasCell, { initialAddFormulasCellData } from "./logic-context/AddFormulasCell";
import DisplayContextCell from "./logic-context/DisplayContextCell";
import LanguageCell, { initialLanguageCellData } from "./logic-context/LanguageCell";
import { emptyContext } from "./slice/logicContext";
import { CellLocator, sheetActions } from "./slice/sheetSlice";
import TextCell from "./TextCell";


interface RenderPayload {
  cellLoc: CellLocator,
  typeName: string,
  key: React.Key,
  onDataChanged: (data: any) => void,
  isEdited: boolean,
  katexMacros: object
}

interface AddPayload {
  dispatch: ReturnType<typeof useAppDispatch>,
  afterCell: CellLocator,
  typeName: string
}

interface CellFactory {
  name: string,
  typeName: string,
  renderComponent: (payload: RenderPayload) => JSX.Element,
  addCell: (payload: AddPayload) => void,
}

const cells: Array<CellFactory> = [
  {
    name: 'Text',
    typeName: 'text',
    renderComponent: ({ cellLoc, key, onDataChanged, isEdited, katexMacros }) => (
      <TextCell cellId={cellLoc.id} key={key} katexMacros={katexMacros} isEdited={isEdited} onDataChanged={onDataChanged} />
    ),
    addCell: ({ dispatch, afterCell }) => dispatch(sheetActions.insertTextCell('', afterCell.index)),
  },
  {
    name: 'App',
    typeName: 'app',
    renderComponent: (props) => (
      <AppCell {...props} />
    ),
    addCell: ({ dispatch, afterCell, typeName }) => dispatch(sheetActions.insertAppCell(typeName.slice(4) /* ??? */, null, afterCell.index)),
  },
  {
    name: 'Language',
    typeName: 'context/language',
    renderComponent: (payload) => (
      <LanguageCell {...payload} />
    ),
    addCell: ({ dispatch, afterCell, typeName }) => dispatch(sheetActions.insertCell({ afterIndex: afterCell.index, type: typeName, data: initialLanguageCellData }))
  },
  {
    name: 'Display context',
    typeName: 'context/display',
    renderComponent: (payload) => (
      <DisplayContextCell {...payload} />
    ),
    addCell: ({ dispatch, afterCell, typeName }) => dispatch(sheetActions.insertCell({ afterIndex: afterCell.index, type: typeName, data: initialLanguageCellData }))
  },
  {
    name: 'Add axioms',
    typeName: 'context/addAxioms',
    renderComponent: (payload) => (
      <AddFormulasCell
        makeContextExtension={formulas => ({...emptyContext, axioms: formulas})}
        {...payload}
      />
    ),
    addCell: ({ dispatch, afterCell, typeName }) => dispatch(sheetActions.insertCell({ afterIndex: afterCell.index, type: typeName, data: initialAddFormulasCellData }))
  },
  {
    name: 'Add formulas',
    typeName: 'context/addFormulas',
    renderComponent: (payload) => (
      <AddFormulasCell
        makeContextExtension={formulas => ({...emptyContext, formulas: formulas})}
        {...payload}
      />
    ),
    addCell: ({ dispatch, afterCell, typeName }) => dispatch(sheetActions.insertCell({ afterIndex: afterCell.index, type: typeName, data: initialAddFormulasCellData }))
  },
]

const typeName2factory: { [key: string]: CellFactory } = {}
cells.forEach(f => {
  typeName2factory[f.typeName] = f
});

export function renderCellComponent(payload: RenderPayload): JSX.Element {
  if (typeName2factory[payload.typeName] === undefined) {
    return typeName2factory['app'].renderComponent(payload)
  }
  return typeName2factory[payload.typeName]!.renderComponent(payload);
}

export function addCell(payload: AddPayload): void {
  if (payload.typeName.startsWith('app')) {
    return typeName2factory['app'].addCell(payload);
  }
  return typeName2factory[payload.typeName].addCell(payload);
}

export const contextCells = cells.filter(f => f.typeName.startsWith('context'));