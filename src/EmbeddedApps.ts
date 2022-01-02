import ResolutionEditor from 'resolution-editor'
import StructureExplorer from 'resolution-editor'
import TableauEditor from 'resolution-editor'

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
      name: 'Resolution editor',
      typeName: 'resolutionEditor',
      ...
      ResolutionEditor
    },
    {
      name: 'Structure explorer',
      typeName: 'structureExplorer',
      ...
      StructureExplorer
    },
    {
      name: 'Tableau editor',
      typeName: 'tableauEditor',
      ...
      TableauEditor
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