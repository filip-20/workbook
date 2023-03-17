import ResolutionEditor from '@fmfi-uk-1-ain-412/resolution-editor'
import StructureExplorer from 'fol-graphexplorer'
import TableauEditor from '@fmfi-uk-1-ain-412/tableaueditor'

interface PrepareResult {
  instance: any,
  getState: (instance: any) => any,
}
type PrepareFunction = (
  initialState: any
) => PrepareResult

interface EmeddedApp {
  name: string,
  typeName: string,
  prepare: PrepareFunction,
  AppComponent: (props: any) => JSX.Element,
}

const embeddedApps: EmeddedApp[] = 
  [
    {
      name: 'Structure explorer',
      typeName: 'structureExplorer',
      ...StructureExplorer
    },
    {
      name: 'Tableau editor',
      typeName: 'tableauEditor',
      ...TableauEditor
    },
    {
      name: 'Resolution editor',
      typeName: 'resolutionEditor',
      ...ResolutionEditor
    },
  ]

var appType2AppInfo: { [key: string]: EmeddedApp} = {};

embeddedApps.forEach( app => {
  appType2AppInfo[app.typeName] = app
});

function getAppInfo(typeName: string): EmeddedApp {
  return appType2AppInfo[typeName];
}

export { embeddedApps, getAppInfo }