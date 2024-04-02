import { StorageEngine } from "../storageEngine";
import { AutosavePayload, Command, CommandResult, Task } from "../workerApi";

export interface GhOpenPayload {
  owner: string,
  repo: string,
  path: string,
  ref: string,
  openAs?: string,
}

export function initGithubEngine(initPayload: any): StorageEngine {

  function init(payload: any): CommandResult {
    throw new Error('to be implemented');
  }

  async function load(addr: GhOpenPayload): Promise<CommandResult> {
    throw new Error('to be implemented');
  }

  async function autosave(payload: AutosavePayload): Promise<CommandResult> {
    throw new Error('to be implemented');
  }

  async function merge(): Promise<CommandResult> {
    throw new Error('to be implemented');
  }

  const engine: StorageEngine = {
    runCommand: async (cmd: Command) => {
      switch (cmd.name) {
        case 'init': return init(cmd.payload);
        case 'load': return load(cmd.payload as GhOpenPayload)
        default:
          throw new Error("Unknown command in github engine: " + cmd.name)
      }
    },
    runTask: async (task: Task) => {
      switch (task.type) {
        case 'autosave': return autosave(task.payload as AutosavePayload)
        case 'merge': return merge()
        default:
          throw new Error("Unknown task in github engine: " + task.type)
      }
    },
  }
  return engine;
}