import ResolutionEditor from 'resolution-editor'
import StructureExplorer from 'structure-explorer'
import TableauEditor from 'tableauEditor'
import { CellContext } from './features/sheet/slice/logicContext'

export interface PrepareResult {
  instance: any,
  getState: (instance: any) => any,
}
type PrepareFunction = (
  initialState: any
) => PrepareResult

interface AppComponentProps {
  instance: any,
  onStateChange: () => void,
  isEdited: boolean,
  context?: CellContext,
  proof?: any,
  updateProofVerdict?: (verdict: boolean) => void,
} 

interface EmeddedApp {
  name: string,
  typeName: string,
  supportsProofs: boolean,
  prepare: PrepareFunction,
  AppComponent: (props: AppComponentProps) => JSX.Element,
}

export const embeddedApps: EmeddedApp[] = 
  [
    {
      name: 'Structure explorer',
      typeName: 'structureExplorer',
      supportsProofs: false,
      ...StructureExplorer
    },
    {
      name: 'Tableau editor',
      typeName: 'tableauEditor',
      supportsProofs: true,
      ...TableauEditor
    },
    {
      name: 'Resolution editor',
      supportsProofs: true,
      typeName: 'resolutionEditor',
      ...ResolutionEditor
    },
  ]

var appType2AppInfo: { [key: string]: EmeddedApp} = {};

embeddedApps.forEach( app => {
  appType2AppInfo[app.typeName] = app
});

export function getAppInfo(typeName: string): EmeddedApp {
  return appType2AppInfo[typeName];
}
