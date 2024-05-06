import { GhStorageState } from "./githubStorage"

export type GhCustomAutosaveErrInfo = Pick<GhStorageState,
  'location'
  | 'sessionBranch'
  | 'baseBranch'
  | 'saveError'
>

export type GhCustomManualSaveErrInfo = Pick<GhStorageState,
  'mergeState'
  | 'mergeError'
  | 'sessionBranch'
  | 'baseBranch'
>

export interface GithubFileLocation {
  owner: string,
  repo: string,
  path: string,
  ref: string,
}

export interface GhSaveError {
  type: 'background_update' | 'unknown_error' | 'merged_session',
  message: string,
}

export interface GhMergeError {
  type: 'not_mergable' | 'api_call_failed' | 'multiple_pulls' | 'no_session_branch' | 'pr_create_failed' | 'branch_delete_failed' | 'sync_fail' | 'unknown',
  message: string,
  call?: string,
  url?: string,
}