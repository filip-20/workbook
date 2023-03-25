import ResolutionEditor from 'resolution-editor'
import StructureExplorer from 'fol-graphexplorer'
import TableauEditor from '@fmfi-uk-1-ain-412/tableaueditor'

export interface PrepareResult {
  instance: any,
  getState: (instance: any) => any,
}
type PrepareFunction = (
  initialState: any
) => PrepareResult

interface EmeddedApp {
  name: string,
  typeName: string,
  supportsProofs: boolean,
  prepare: PrepareFunction,
  AppComponent: (props: any) => JSX.Element,
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