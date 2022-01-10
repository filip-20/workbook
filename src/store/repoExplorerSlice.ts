import { Octokit } from "@octokit/rest";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { AppDispatch, RootState } from "./store";

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface RepoExplorerState {
  repoInfo?: RepoInfo,
  repoState?: RepoState,
  status: Status,
  error?: string,
}

export interface RepoInfo {
  owner: string,
  repo: string,
  defaultBranch: string,
}

export interface RepoState {
  path: string,
  branch: string,
  files: Array<FileItem>,
}

export interface FileItem {
  name: string,
  type: 'file' | 'dir',
}

const octokit = new Octokit();

const initialState: RepoExplorerState = {
  status: 'idle',
};

function fileSortCmp(f1: FileItem, f2: FileItem) {
  if (f1.type === f2.type) {
    return f1.name.localeCompare(f2.name)
  } else {
    // folders before files
    return f1.type === 'dir' ? -1 : 1;
  }
}

export const repoExplorerSlice = createSlice({
  name: 'repoExplorer',
  initialState,
  reducers: {
    updateRepoInfo: (state, action: PayloadAction<RepoInfo>) => {
      const repoInfo = action.payload;
      state.repoInfo = repoInfo;
    },
    updateRepoState: (state, action: PayloadAction<RepoState>) => {
      state.repoState = action.payload;
    },
    updateStatus: (state, action: PayloadAction<{ status: Status, error?: string }>) => {
      const { status, error } = action.payload;
      state.status = status;
      state.error = error;
    },
    updatePath: (state, action: PayloadAction<string>) => {
      state.repoState && (state.repoState.path = action.payload);
    },
    closeRepo: (state) => {
      console.log('closeRepo reducer');
      state.repoInfo = undefined;
      state.repoState = undefined;
      state.status = 'idle';
      state.error = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFiles.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchFiles.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.repoState && (state.repoState.files = action.payload);
    });
    builder.addCase(fetchFiles.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

/* actions */
const { updateRepoInfo, updateRepoState, updateStatus, updatePath } = repoExplorerSlice.actions;
export const { closeRepo } = repoExplorerSlice.actions;

export const fetchFiles = createAsyncThunk<
  Array<FileItem>,
  string,
  { state: RootState }
>('repoExplorer/fetchFiles', async (path, thunkApi) => {
  const repoInfo = thunkApi.getState().repoExplorer.repoInfo;
  const dispatch = thunkApi.dispatch;
  if (repoInfo) {
    const { owner, repo } = repoInfo;
    /* trailing slash cause problem in octokit */
    dispatch(updatePath(path.slice(-1) === '/' ? path.slice(0, -1) : path));
    /* load files */
    const res = await octokit.repos.getContent({ owner, repo, path });
    const resFiles = res.data as Array<any>;

    let files: Array<FileItem> = [];
    if (path !== '') {
      files.push({ name: '..', type: 'dir' });
    }
    files = files.concat(resFiles.map(f => { return { name: f.name, type: f.type } }));
    files.sort(fileSortCmp);
    return files;
  } else {
    console.error('repo explorer was not initialized');
    throw Error('repo explorer was not initialized');
  }
});

export const openRepo = (owner: string, repo: string, path?: string, branch?: string) => {
  return async (dispatch: AppDispatch) => {
    /* load default branch */
    const res = await octokit.repos.get({ owner, repo });
    const defaultBranch = res.data.default_branch;
    dispatch(updateRepoInfo({ owner, repo, defaultBranch }));
    dispatch(updateRepoState({
      path: path || '',
      branch: branch || defaultBranch,
      files: []
    }));
    dispatch(fetchFiles(path || ''));
  }
}

export const openFile = (file: string) => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    const repoState = getState().repoExplorer.repoState;
    if (repoState) {
      const currentPath = repoState.path
      if (file === '..') {
        const reducer = (prev: string, current: string) => (prev === '' ? '' : prev + '/') + current;
        const path = currentPath.split('/').slice(0, -1).reduce(reducer, '');
        console.log('opening file ' + path);
        dispatch(fetchFiles(path));
      } else {
        const path = currentPath === '' ? file : currentPath + '/' + file;
        dispatch(fetchFiles(path));
      }
    } else {
      console.error('repo explorer was not initialized');
      throw Error('repo explorer was not initialized');
    }
  }
}

/* Selectors */
export const selectRepoInfo = (state: RootState) => state.repoExplorer.repoInfo;
export const selectRepoState = (state: RootState) => state.repoExplorer.repoState;
export const selectStatus = (state: RootState) => { return { status: state.repoExplorer.status, error: state.repoExplorer.error } };

export default repoExplorerSlice.reducer;