import { Command, Task, CommandResult, TaskResult } from "./workerApi"

export interface StorageEngine {
  runTask: (task: Task) => Promise<TaskResult>,
  runCommand: (cmd: Command) => Promise<CommandResult>,
}