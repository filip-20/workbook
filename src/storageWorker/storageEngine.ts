import { AutoSavePayload, CustomCmdPayload } from "./workerApi"

export type LoadSheetResult = {
  json: string, 
  sheetId: string
} | {
  errMsg: string, 
  customErrObj?: any
}

export type AutoSaveResult = true | {errMsg: string, customErrObj?: any}
export type ManualSaveResult = true | {errMsg: string, customErrObj?: any}

export interface StorageEngine {
  loadSheet: (addr: any) => Promise<LoadSheetResult>
  autoSave: (record: AutoSavePayload) => Promise<AutoSaveResult>
  manualSave: () => Promise<ManualSaveResult>
  resume: () => Promise<true | {errMsg: string}>,
  customCmd: (cmd: CustomCmdPayload) => Promise<any>,
}