/* eslint-disable no-restricted-globals */

import { StorageEngine } from "./storageEngine";
import { EngineMessage } from "./workerApi";

import { initGithubEngine } from "./githubStorage/engine";
import { initGithubEngine as initGhEngine1 } from "./githubStorage1/engine";

let storageEngine: StorageEngine
self.onmessage = async (e: MessageEvent<{msg: EngineMessage, requestId: number}>) => {
  const {msg, requestId} = e.data;

  console.log('worker got message', e.data)

  if (msg.type === 'runCommand' && msg.command.name === 'init') {
    switch(msg.command.payload.engineType) {
      case 'github':
        storageEngine = initGithubEngine(msg.command.payload)
        break
      case 'github1':
          storageEngine = initGhEngine1(msg.command.payload)
          break
      default: 
        throw new Error('Unknown engine type')
    }
  }

  if (msg.type === 'runCommand') {
    postMessage({requestId, result: await storageEngine.runCommand(msg.command)})
  } else if (msg.type === 'runTask') {
    postMessage({requestId, result: await storageEngine.runTask(msg.task)})
  }

}
