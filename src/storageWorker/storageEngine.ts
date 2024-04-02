import { Task, Command, TaskResult, CommandResult } from "./workerApi"
/*
export type LoadSheetResult = {
  json: string, 
  sheetId: string,
  custom?: any
} | {
  errMsg: string, 
  customErrObj?: any
}

export type AutoSaveResult = {success: true, custom:any} | {errMsg: string, customErrObj?: any}
export type ManualSaveResult = {success: true,custom:any} | {errMsg: string, customErrObj?: any}
*/
export interface StorageEngine {
  runTask: (task: Task) => Promise<TaskResult>,
  runCommand: (cmd: Command) => Promise<CommandResult>,
/*
  loadSheet: (addr: any) => Promise<LoadSheetResult>
  autoSave: (record: AutoSavePayload) => Promise<AutoSaveResult>
  manualSave: () => Promise<ManualSaveResult>
  resume: () => Promise<true | {errMsg: string}>,
  customCmd: (cmd: CustomCmdPayload) => Promise<any>,*/
}