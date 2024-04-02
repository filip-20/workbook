/*
export interface AutosavePayload {
  message: string,
  contentObj: object
}*/

//import { AutoSaveResult, LoadSheetResult, ManualSaveResult } from "./storageEngine"
//import { StorageWorkerCmd } from "./worker"

// list of supported storage engine types 
export type EngineType = 'github'


/*
export type EngineCommand = 'init'
  | 'load_sheet'
  | 'process_update'
  | 'save_changes'
  | 'resume'

export type InitPayload = {
  engineType: EngineType
  initPayload: any
}
export interface LoadSheetPayload {
  location: any
}
export interface AutoSavePayload {
  message: string,
  contentObj: object
}
export type ManualSavePayload = undefined
export type ResumePayload = undefined
export interface CustomCmdPayload {
  type: string,
  payload: any,
}
*/

export interface LoadCommand {
  name: 'load',
  payload: any
}
export interface InitCommand {
  name: 'init',
  payload: {
    engineType: EngineType,
    custom: any,
  }
}
interface CustomCommand {
  name: string,
  payload: any,
}
export type Command = InitCommand | LoadCommand | CustomCommand

interface CommandSuccess {
  result: 'success',
  custom?: any,
  data?: any,
}
interface CommandError {
  result: 'error',
  errorMessage: string,
  custom?: any,
}
export type CommandResult = CommandSuccess | CommandError

export interface AutosavePayload {
  message: string,
  contentObj: object
}
export interface AutosaveTask {
  type: 'autosave',
  payload: AutosavePayload
}
interface CustomTask {
  type: string,
  payload: any
}
export type Task = AutosaveTask | CustomTask

interface TaskSuccess {
  result: 'success',
  custom?: any
}
interface TaskError {
  result: 'error',
  errorMessage: string,
  custom?: any,
}
export type TaskResult = TaskSuccess | TaskError

export type EngineMessage = {
  type: 'runCommand'
  command: Command
} | {
  type: 'runTask'
  task: Task
}

let requestId = 0;
let worker = new Worker(new URL('worker.ts', import.meta.url), {type: 'module'});
function workerCall(worker: Worker, msg: EngineMessage) {
  return new Promise((resolve, reject) => {
    const rId = requestId++;
    const listener = (e: MessageEvent<{result: any, requestId: number}>) => {
      const {requestId: rId, result} = e.data;
      if (requestId === rId) {
        worker.removeEventListener('message', listener);
        resolve(result);
      }
    }
    worker.addEventListener('message', listener);
    worker.postMessage({msg, requestId})
  });
}


export async function swCommand(command: Command) {
  return workerCall(worker, {type: 'runCommand', command}) as unknown as CommandResult
}

export async function swTask(task: Task) {
  return workerCall(worker, {type: 'runTask', task}) as unknown as TaskResult
}

/*
export async function swInit(engineType: EngineType, initPayload: any) {
  return workerCall(worker, {type: 'init', payload: {engineType, initPayload}}) ;
}

export async function swLoadSheet(location: any) {
  return workerCall(worker, {type: 'load_sheet', payload: location}) as any as LoadSheetResult;
}

export async function swAutoSave(message: string, contentObj: object) {
  return workerCall(worker, {type: 'auto_save', payload: {message, contentObj}}) as any as AutoSaveResult;
}

export async function swManualSave() {
  return workerCall(worker, {type: 'manual_save', payload: undefined}) as any as ManualSaveResult;
}

export async function swResume() {
  return workerCall(worker, {type: 'resume', payload: undefined});
}

export async function swCustomCmd(cmd: CustomCmdPayload) {
  return workerCall(worker, {type: 'custom_cmd', payload: cmd});
}*/