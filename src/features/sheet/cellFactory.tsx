import React from "react";
import { useAppDispatch } from "../../app/hooks";
import AppCell from "./AppCell";
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
    renderComponent: ({cellLoc, key, onDataChanged, isEdited, katexMacros}) => (
      <TextCell cellId={cellLoc.id} key={key} katexMacros={katexMacros} isEdited={isEdited} onDataChanged={onDataChanged} />
    ),
    addCell: ({dispatch, afterCell}) => dispatch(sheetActions.insertTextCell('', afterCell.index)),
  },
  {
    name: 'App',
    typeName: 'app',
    renderComponent: ({cellLoc, key, onDataChanged, isEdited}) => (
      <AppCell key={key} cellId={cellLoc.id} isEdited={isEdited} onDataChanged={onDataChanged} />
    ),
    addCell: ({dispatch, afterCell, typeName}) => dispatch(sheetActions.insertAppCell(typeName.slice(4) /* ??? */, null, afterCell.index)),
  }
]

const typeName2factory: {[key: string]: CellFactory} = {}
cells.forEach( f => {
  typeName2factory[f.typeName] = f
});

export function renderCellComponent(payload: RenderPayload): JSX.Element {
  if (payload.typeName.startsWith('app')) {
    return typeName2factory['app'].renderComponent(payload)
  }
  return typeName2factory[payload.typeName].renderComponent(payload)
}

export function addCell(payload: AddPayload): void {
  if (payload.typeName.startsWith('app')) {
    return typeName2factory['app'].addCell(payload);
  }
  return typeName2factory[payload.typeName].addCell(payload);
}