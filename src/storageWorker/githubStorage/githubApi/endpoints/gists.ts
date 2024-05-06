import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    gistsList: build.query<GistsListApiResponse, GistsListApiArg>({
      query: (queryArg) => ({
        url: `/gists`,
        params: {
          since: queryArg.since,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    gistsCreate: build.mutation<GistsCreateApiResponse, GistsCreateApiArg>({
      query: (queryArg) => ({
        url: `/gists`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    gistsListPublic: build.query<
      GistsListPublicApiResponse,
      GistsListPublicApiArg
    >({
      query: (queryArg) => ({
        url: `/gists/public`,
        params: {
          since: queryArg.since,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    gistsListStarred: build.query<
      GistsListStarredApiResponse,
      GistsListStarredApiArg
    >({
      query: (queryArg) => ({
        url: `/gists/starred`,
        params: {
          since: queryArg.since,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    gistsGet: build.query<GistsGetApiResponse, GistsGetApiArg>({
      query: (queryArg) => ({ url: `/gists/${queryArg.gistId}` }),
    }),
    gistsUpdate: build.mutation<GistsUpdateApiResponse, GistsUpdateApiArg>({
      query: (queryArg) => ({
        url: `/gists/${queryArg.gistId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    gistsDelete: build.mutation<GistsDeleteApiResponse, GistsDeleteApiArg>({
      query: (queryArg) => ({
        url: `/gists/${queryArg.gistId}`,
        method: "DELETE",
      }),
    }),
    gistsListComments: build.query<
      GistsListCommentsApiResponse,
      GistsListCommentsApiArg
    >({
      query: (queryArg) => ({
        url: `/gists/${queryArg.gistId}/comments`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    gistsCreateComment: build.mutation<
      GistsCreateCommentApiResponse,
      GistsCreateCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/gists/${queryArg.gistId}/comments`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    gistsGetComment: build.query<
      GistsGetCommentApiResponse,
      GistsGetCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/gists/${queryArg.gistId}/comments/${queryArg.commentId}`,
      }),
    }),
    gistsUpdateComment: build.mutation<
      GistsUpdateCommentApiResponse,
      GistsUpdateCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/gists/${queryArg.gistId}/comments/${queryArg.commentId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    gistsDeleteComment: build.mutation<
      GistsDeleteCommentApiResponse,
      GistsDeleteCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/gists/${queryArg.gistId}/comments/${queryArg.commentId}`,
        method: "DELETE",
      }),
    }),
    gistsListCommits: build.query<
      GistsListCommitsApiResponse,
      GistsListCommitsApiArg
    >({
      query: (queryArg) => ({
        url: `/gists/${queryArg.gistId}/commits`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    gistsListForks: build.query<
      GistsListForksApiResponse,
      GistsListForksApiArg
    >({
      query: (queryArg) => ({
        url: `/gists/${queryArg.gistId}/forks`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    gistsFork: build.mutation<GistsForkApiResponse, GistsForkApiArg>({
      query: (queryArg) => ({
        url: `/gists/${queryArg.gistId}/forks`,
        method: "POST",
      }),
    }),
    gistsCheckIsStarred: build.query<
      GistsCheckIsStarredApiResponse,
      GistsCheckIsStarredApiArg
    >({
      query: (queryArg) => ({ url: `/gists/${queryArg.gistId}/star` }),
    }),
    gistsStar: build.mutation<GistsStarApiResponse, GistsStarApiArg>({
      query: (queryArg) => ({
        url: `/gists/${queryArg.gistId}/star`,
        method: "PUT",
      }),
    }),
    gistsUnstar: build.mutation<GistsUnstarApiResponse, GistsUnstarApiArg>({
      query: (queryArg) => ({
        url: `/gists/${queryArg.gistId}/star`,
        method: "DELETE",
      }),
    }),
    gistsGetRevision: build.query<
      GistsGetRevisionApiResponse,
      GistsGetRevisionApiArg
    >({
      query: (queryArg) => ({
        url: `/gists/${queryArg.gistId}/${queryArg.sha}`,
      }),
    }),
    gistsListForUser: build.query<
      GistsListForUserApiResponse,
      GistsListForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/gists`,
        params: {
          since: queryArg.since,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type GistsListApiResponse = /** status 200 Response */ BaseGist[];
export type GistsListApiArg = {
  /** Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type GistsCreateApiResponse = /** status 201 Response */ GistSimple;
export type GistsCreateApiArg = {
  body: {
    description?: string;
    files: {
      [key: string]: {
        content: string;
      };
    };
    public?: boolean | ("true" | "false");
  };
};
export type GistsListPublicApiResponse = /** status 200 Response */ BaseGist[];
export type GistsListPublicApiArg = {
  /** Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type GistsListStarredApiResponse = /** status 200 Response */ BaseGist[];
export type GistsListStarredApiArg = {
  /** Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type GistsGetApiResponse = /** status 200 Response */ GistSimple;
export type GistsGetApiArg = {
  /** gist_id parameter */
  gistId: string;
};
export type GistsUpdateApiResponse = /** status 200 Response */ GistSimple;
export type GistsUpdateApiArg = {
  /** gist_id parameter */
  gistId: string;
  body: (any | any) | null;
};
export type GistsDeleteApiResponse = /** status 204 Response */ undefined;
export type GistsDeleteApiArg = {
  /** gist_id parameter */
  gistId: string;
};
export type GistsListCommentsApiResponse =
  /** status 200 Response */ GistComment[];
export type GistsListCommentsApiArg = {
  /** gist_id parameter */
  gistId: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type GistsCreateCommentApiResponse =
  /** status 201 Response */ GistComment;
export type GistsCreateCommentApiArg = {
  /** gist_id parameter */
  gistId: string;
  body: {
    body: string;
  };
};
export type GistsGetCommentApiResponse = /** status 200 Response */ GistComment;
export type GistsGetCommentApiArg = {
  /** gist_id parameter */
  gistId: string;
  /** comment_id parameter */
  commentId: number;
};
export type GistsUpdateCommentApiResponse =
  /** status 200 Response */ GistComment;
export type GistsUpdateCommentApiArg = {
  /** gist_id parameter */
  gistId: string;
  /** comment_id parameter */
  commentId: number;
  body: {
    body: string;
  };
};
export type GistsDeleteCommentApiResponse =
  /** status 204 Response */ undefined;
export type GistsDeleteCommentApiArg = {
  /** gist_id parameter */
  gistId: string;
  /** comment_id parameter */
  commentId: number;
};
export type GistsListCommitsApiResponse =
  /** status 200 Response */ GistCommit[];
export type GistsListCommitsApiArg = {
  /** gist_id parameter */
  gistId: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type GistsListForksApiResponse = /** status 200 Response */ GistSimple[];
export type GistsListForksApiArg = {
  /** gist_id parameter */
  gistId: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type GistsForkApiResponse = /** status 201 Response */ BaseGist;
export type GistsForkApiArg = {
  /** gist_id parameter */
  gistId: string;
};
export type GistsCheckIsStarredApiResponse =
  /** status 204 Response if gist is starred */ undefined;
export type GistsCheckIsStarredApiArg = {
  /** gist_id parameter */
  gistId: string;
};
export type GistsStarApiResponse = /** status 204 Response */ undefined;
export type GistsStarApiArg = {
  /** gist_id parameter */
  gistId: string;
};
export type GistsUnstarApiResponse = /** status 204 Response */ undefined;
export type GistsUnstarApiArg = {
  /** gist_id parameter */
  gistId: string;
};
export type GistsGetRevisionApiResponse = /** status 200 Response */ GistSimple;
export type GistsGetRevisionApiArg = {
  /** gist_id parameter */
  gistId: string;
  sha: string;
};
export type GistsListForUserApiResponse = /** status 200 Response */ BaseGist[];
export type GistsListForUserApiArg = {
  username: string;
  /** Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type SimpleUser = {
  name?: string | null;
  email?: string | null;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  starred_at?: string;
} | null;
export type SimpleUser2 = {
  name?: string | null;
  email?: string | null;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  starred_at?: string;
};
export type BaseGist = {
  url: string;
  forks_url: string;
  commits_url: string;
  id: string;
  node_id: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  files: {
    [key: string]: {
      filename?: string;
      type?: string;
      language?: string;
      raw_url?: string;
      size?: number;
    };
  };
  public: boolean;
  created_at: string;
  updated_at: string;
  description: string | null;
  comments: number;
  user: SimpleUser;
  comments_url: string;
  owner?: SimpleUser2;
  truncated?: boolean;
  forks?: any[];
  history?: any[];
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
};
export type PublicUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username?: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  plan?: {
    collaborators: number;
    name: string;
    space: number;
    private_repos: number;
  };
  suspended_at?: string | null;
  private_gists?: number;
  total_private_repos?: number;
  owned_private_repos?: number;
  disk_usage?: number;
  collaborators?: number;
};
export type GistHistory = {
  user?: SimpleUser;
  version?: string;
  committed_at?: string;
  change_status?: {
    total?: number;
    additions?: number;
    deletions?: number;
  };
  url?: string;
};
export type GistSimple = {
  forks?:
    | {
        id?: string;
        url?: string;
        user?: PublicUser;
        created_at?: string;
        updated_at?: string;
      }[]
    | null;
  history?: GistHistory[] | null;
  fork_of?: {
    url: string;
    forks_url: string;
    commits_url: string;
    id: string;
    node_id: string;
    git_pull_url: string;
    git_push_url: string;
    html_url: string;
    files: {
      [key: string]: {
        filename?: string;
        type?: string;
        language?: string;
        raw_url?: string;
        size?: number;
      };
    };
    public: boolean;
    created_at: string;
    updated_at: string;
    description: string | null;
    comments: number;
    user: SimpleUser;
    comments_url: string;
    owner?: SimpleUser;
    truncated?: boolean;
    forks?: any[];
    history?: any[];
  } | null;
  url?: string;
  forks_url?: string;
  commits_url?: string;
  id?: string;
  node_id?: string;
  git_pull_url?: string;
  git_push_url?: string;
  html_url?: string;
  files?: {
    [key: string]: {
      filename?: string;
      type?: string;
      language?: string;
      raw_url?: string;
      size?: number;
      truncated?: boolean;
      content?: string;
    } | null;
  };
  public?: boolean;
  created_at?: string;
  updated_at?: string;
  description?: string | null;
  comments?: number;
  user?: string | null;
  comments_url?: string;
  owner?: SimpleUser2;
  truncated?: boolean;
};
export type ValidationError = {
  message: string;
  documentation_url: string;
  errors?: {
    resource?: string;
    field?: string;
    message?: string;
    code: string;
    index?: number;
    value?: (string | null) | (number | null) | (string[] | null);
  }[];
};
export type AuthorAssociation =
  | "COLLABORATOR"
  | "CONTRIBUTOR"
  | "FIRST_TIMER"
  | "FIRST_TIME_CONTRIBUTOR"
  | "MANNEQUIN"
  | "MEMBER"
  | "NONE"
  | "OWNER";
export type GistComment = {
  id: number;
  node_id: string;
  url: string;
  body: string;
  user: SimpleUser;
  created_at: string;
  updated_at: string;
  author_association: AuthorAssociation;
};
export type GistCommit = {
  url: string;
  version: string;
  user: SimpleUser;
  change_status: {
    total?: number;
    additions?: number;
    deletions?: number;
  };
  committed_at: string;
};
export const {
  useGistsListQuery,
  useGistsCreateMutation,
  useGistsListPublicQuery,
  useGistsListStarredQuery,
  useGistsGetQuery,
  useGistsUpdateMutation,
  useGistsDeleteMutation,
  useGistsListCommentsQuery,
  useGistsCreateCommentMutation,
  useGistsGetCommentQuery,
  useGistsUpdateCommentMutation,
  useGistsDeleteCommentMutation,
  useGistsListCommitsQuery,
  useGistsListForksQuery,
  useGistsForkMutation,
  useGistsCheckIsStarredQuery,
  useGistsStarMutation,
  useGistsUnstarMutation,
  useGistsGetRevisionQuery,
  useGistsListForUserQuery,
} = injectedRtkApi;
