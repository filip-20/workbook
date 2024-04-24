import { SheetFile } from "../features/sheet/slice/sheetSlice"

// list of supported storage engine types 
export type EngineType = 'github' | 'github1'

interface CustomCommand {
  type: string,
  payload?: any,
}
export interface InitCommand extends CustomCommand {
  type: 'init',
  payload: {
    engineType: EngineType,
    custom: any,
  }
}
export type Command = InitCommand | CustomCommand

export interface LoadResult {
  filename: string, json: string, sheetId: string
}

export interface AutosavePayload {
  message: string,
  contentObj: SheetFile,
  serialized: string,
}

export interface CustomTask extends CustomCommand {
  skipOnError: boolean,
}
export interface AutosaveTask extends CustomTask {
  type: 'autosave',
  payload: AutosavePayload
}
export type Task = AutosaveTask | CustomTask

interface TaskSuccess {
  result: 'success',
  data?: any,
  customState?: any,
}
interface TaskError {
  result: 'error',
  // general error message for every failed task
  errorMessage: string,
  // optional custom specific error 
  customError?: any,
  customState?: any,
}
interface TaskSkipped {
  result: 'skipped',
  errorMessage: string,
}

export type TaskResult = TaskSuccess | TaskError | TaskSkipped
export type CommandResult = TaskSuccess | TaskError

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
  return new Promise<TaskResult | CommandResult>((resolve, reject) => {
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

export async function swCommand<Data>(command: Command): Promise<CommandResult> {
  return workerCall(worker, {type: 'runCommand', command}) as unknown as CommandResult
}

export async function swTask<Data, CustomState>(task: Task): Promise<TaskResult> {
  return workerCall(worker, {type: 'runTask', task})
}