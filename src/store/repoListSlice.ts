import { Octokit } from "@octokit/rest";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";

export interface RepoListState {
  listInfo?: ListInfo,
  listState?: ListState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error?: string,
}

export interface ListInfo {
  username: string,
  itemsPerPage: number,
  lastPage: number,
}

export interface ListState {
  currentPage: number,
  repos: Array<RepoItem>,
}

export interface RepoItem {
  id: number,
  name: string,
  description: string | null,
  private: boolean,
  language?: string | null,
  topics?: Array<string>,
  updatedAt?: string | null,
}

const octokit = new Octokit({
});

const initialState: RepoListState = {
  status: 'idle',
};

export const repoListSlice = createSlice({
  name: 'repoExplorer',
  initialState,
  reducers: {
    updateListInfo: (state, action: PayloadAction<ListInfo>) => {
      state.listInfo = action.payload;
    },
    updateListState: (state, action: PayloadAction<ListState>) => {
      state.listState = action.payload;
    },
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.listState && (state.listState.currentPage = action.payload);
    },
    closeList: (state) => {
      state.error = undefined;
      state.listInfo = undefined;
      state.listState = undefined;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRepos.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchRepos.fulfilled, (state, action) => {
      state.listState && ( state.listState.repos = action.payload )
      state.status = 'succeeded';
    });
    builder.addCase(fetchRepos.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

const { updateListInfo, updateListState, updateCurrentPage } = repoListSlice.actions;
export const { closeList } = repoListSlice.actions;

export const openList = (username: string, itemsPerPage: number, page?: number) => {
  return async (dispatch: AppDispatch) => {
    const res = await octokit.request({
      method: 'HEAD',
      url: `https://api.github.com/users/${username}/repos?per_page=${itemsPerPage}`
    });
    /* parse pagination info */
    let lastPage: number | null = null;
    if (res.headers.link) {
      const link = res.headers.link;
      link.split(', ').forEach(item => {
        const parts = item.split('; ');
        if (parts[1] === 'rel="last"') {
          const match = parts[0].match(/.*[?&]+page=([0-9]+)/)
          /* was positive integer parsed? */
          if (match && match[1] !== undefined && /^\d+$/.test(match[1])) {
            lastPage = parseInt(match[1]);
          }
        }
      })
    }
    if (!lastPage) {
      lastPage = 1
    }
    dispatch(updateListInfo({ username, itemsPerPage, lastPage }));
    dispatch(updateListState({currentPage: page || 1, repos: []}));
    dispatch(fetchRepos(page));
  }
}

export const fetchRepos = createAsyncThunk<
  Array<RepoItem>,
  number | undefined,
  { state: RootState }
>('repoList/fetchRepos', async (arg, thunkApi) => {
  const page = arg;
  const dispatch = thunkApi.dispatch;
  const listInfo = thunkApi.getState().repoList.listInfo
  if (listInfo) {
    const { username, itemsPerPage } = listInfo;
    dispatch(updateCurrentPage(page || 1))
    const res = await octokit.repos.listForUser({ username, page, per_page: itemsPerPage });
    const items = res.data.map(repo => {
      const item: RepoItem = {
        id: repo.id,
        name: repo.name,
        description: repo.description,
        private: repo.private,
        language: repo.language,
        topics: repo.topics,
        updatedAt: repo.updated_at
      }
      return item;
    });
    return items;
  } else {
    console.error('repo list was not initialized');
    throw Error('repo list was not initialized');
  }
});

/* Selectors */
export const selectListInfo = (state: RootState) => state.repoList.listInfo
export const selectListState = (state: RootState) => state.repoList.listState
export const selectListStatus = (state: RootState) => state.repoList.status;

export default repoListSlice.reducer;