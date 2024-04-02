/* eslint-disable no-restricted-globals */

import { initGithubEngine } from "./githubStorage/engine";
import { StorageEngine } from "./storageEngine";
import { EngineMessage } from "./workerApi";
/*
import { AutoSavePayload, CustomCmdPayload, EngineCommand, InitPayload, LoadSheetPayload, ManualSavePayload } from "./workerApi";

interface InitCmd {
  type: 'init',
  payload: InitPayload,
}

interface LoadSheetCmd {
  type: 'load_sheet',
  payload: LoadSheetPayload
}

interface AutoSaveCmd {
  type: 'auto_save',
  payload: AutoSavePayload
}
interface ManualSaveCmd {
  type: 'manual_save',
  payload: ManualSavePayload
}
interface ResumeCmd {
  type: 'resume',
  payload: undefined,
}

interface CustomCmd {
  type: 'custom_cmd',
  payload: CustomCmdPayload,
}

export type StorageWorkerCmd = 
  InitCmd
  | LoadSheetCmd
  | AutoSaveCmd
  | ManualSaveCmd
  | ResumeCmd
  | CustomCmd

*/
let storageEngine: StorageEngine
self.onmessage = async (e: MessageEvent<{msg: EngineMessage, requestId: number}>) => {
  const {msg, requestId} = e.data;

  console.log('worker got message', e.data)

  if (msg.type === 'runCommand' && msg.command.name === 'init') {
    switch(msg.command.payload.engineType) {
      case 'github':
        storageEngine = initGithubEngine(msg.command.payload)
        break
      default: 
        throw new Error('Unknown engine type')
    }
  }

  if (msg.type === 'runCommand') {
    console.log('runcommand start')
    postMessage({requestId, result: await storageEngine.runCommand(msg.command)})
    console.log('runcommand end')
  } else if (msg.type === 'runTask') {
    postMessage({requestId, result: await storageEngine.runTask(msg.task)})
  }

}
/*
  switch(cmd.type) {
    case 'init': {
      console.log('Init cmd payload', cmd.payload)
      if (cmd.payload.engineType === 'github') {
        storageEngine = initGithubEngine(cmd.payload.initPayload);
      } else {
        throw new Error('Unknown storage engine type')
      }
      postMessage({requestId, result: true})
      break
    }
    case 'load_sheet': {
      console.log('Loading sheet...', cmd.payload)
      const result = await storageEngine.loadSheet(cmd.payload)
      //console.log('result: ', res)
      postMessage({requestId, result})
      break;
    }
    case 'auto_save': {
      console.log('processing update', cmd)
      const result = await storageEngine.autoSave(cmd.payload)
      postMessage({result, requestId})
      break
    }
    case 'manual_save': {
      const result = await storageEngine.manualSave()
      postMessage({result, requestId})
      break
    }
    case 'resume': {
      const result = await storageEngine.resume();
      postMessage({result, requestId})
      break
    }
    case 'custom_cmd': {
      const result = await storageEngine.customCmd(cmd.payload);
      postMessage({result, requestId})
      break;
    }
  }*/


//export { StorageEngine };
