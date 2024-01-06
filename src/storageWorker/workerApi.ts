/*
export interface AutosavePayload {
  message: string,
  contentObj: object
}*/

import { AutoSaveResult, LoadSheetResult, ManualSaveResult } from "./storageEngine"
import { StorageWorkerCmd } from "./worker"

// list of supported storage engine types 
export type EngineType = 'github'

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

let requestId = 0;
let worker = new Worker(new URL('worker.ts', import.meta.url), {type: 'module'});
function workerCall(worker: Worker, cmd: StorageWorkerCmd) {
  return new Promise((resolve, reject) => {
    const rId = requestId++;
    const listener = (e: MessageEvent<{cmd: EngineCommand, result: any, requestId: number}>) => {
      const {requestId: rId, result} = e.data;
      if (requestId === rId) {
        worker.removeEventListener('message', listener);
        resolve(result);
      }
    }
    worker.addEventListener('message', listener);
    worker.postMessage({cmd, requestId})
  });
}

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
}