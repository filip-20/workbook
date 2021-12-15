import { AppModule as appResolutionEditor } from 'resolution-editor'
import { AppModule as appStructureExplorer } from 'fol-graphexplorer'
import { AppModule as appTableauEditor } from 'tableaueditor'

const embeddedApps =
  [
    {
      name: 'Resolution editor',
      typeName: 'resolutionEditor',
      appModule: appResolutionEditor,
    },
    {
      name: 'Structure explorer',
      typeName: 'structureExplorer',
      appModule: appStructureExplorer,
    },
    {
      name: 'Tableau editor',
      typeName: 'tableauEditor',
      appModule: appTableauEditor,
    },
  ]


const appTypeNameToMod: { [key: string]: () => JSX.Element } = {}
embeddedApps.map(app => appTypeNameToMod[app.typeName] = app.appModule )

function createEmbeddedApp(typeName: string): () => JSX.Element {
  return appTypeNameToMod[typeName];
}

export { embeddedApps, createEmbeddedApp }