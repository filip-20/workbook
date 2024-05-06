import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    gitignoreGetAllTemplates: build.query<
      GitignoreGetAllTemplatesApiResponse,
      GitignoreGetAllTemplatesApiArg
    >({
      query: () => ({ url: `/gitignore/templates` }),
    }),
    gitignoreGetTemplate: build.query<
      GitignoreGetTemplateApiResponse,
      GitignoreGetTemplateApiArg
    >({
      query: (queryArg) => ({ url: `/gitignore/templates/${queryArg.name}` }),
    }),
    gitCreateBlob: build.mutation<
      GitCreateBlobApiResponse,
      GitCreateBlobApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/git/blobs`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    gitGetBlob: build.query<GitGetBlobApiResponse, GitGetBlobApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/git/blobs/${queryArg.fileSha}`,
      }),
    }),
    gitCreateCommit: build.mutation<
      GitCreateCommitApiResponse,
      GitCreateCommitApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/git/commits`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    gitGetCommit: build.query<GitGetCommitApiResponse, GitGetCommitApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/git/commits/${queryArg.commitSha}`,
      }),
    }),
    gitListMatchingRefs: build.query<
      GitListMatchingRefsApiResponse,
      GitListMatchingRefsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/git/matching-refs/${queryArg.ref}`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    gitGetRef: build.query<GitGetRefApiResponse, GitGetRefApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/git/ref/${queryArg.ref}`,
      }),
    }),
    gitCreateRef: build.mutation<GitCreateRefApiResponse, GitCreateRefApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/git/refs`,
        method: "POST",
        body: queryArg.body,
      }),
      invalidatesTags: ['Refs']
    }),
    gitUpdateRef: build.mutation<GitUpdateRefApiResponse, GitUpdateRefApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/git/refs/${queryArg.ref}`,
        method: "PATCH",
        body: queryArg.body,
      }),
      invalidatesTags: ['Refs']
    }),
    gitDeleteRef: build.mutation<GitDeleteRefApiResponse, GitDeleteRefApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/git/refs/${queryArg.ref}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Refs']
    }),
    gitCreateTag: build.mutation<GitCreateTagApiResponse, GitCreateTagApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/git/tags`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    gitGetTag: build.query<GitGetTagApiResponse, GitGetTagApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/git/tags/${queryArg.tagSha}`,
      }),
    }),
    gitCreateTree: build.mutation<
      GitCreateTreeApiResponse,
      GitCreateTreeApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/git/trees`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    gitGetTree: build.query<GitGetTreeApiResponse, GitGetTreeApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/git/trees/${queryArg.treeSha}`,
        params: { recursive: queryArg.recursive },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type GitignoreGetAllTemplatesApiResponse =
  /** status 200 Response */ string[];
export type GitignoreGetAllTemplatesApiArg = void;
export type GitignoreGetTemplateApiResponse =
  /** status 200 Response */ GitignoreTemplate;
export type GitignoreGetTemplateApiArg = {
  name: string;
};
export type GitCreateBlobApiResponse = /** status 201 Response */ ShortBlob;
export type GitCreateBlobApiArg = {
  owner: string;
  repo: string;
  body: {
    content: string;
    encoding?: string;
  };
};
export type GitGetBlobApiResponse = /** status 200 Response */ Blob;
export type GitGetBlobApiArg = {
  owner: string;
  repo: string;
  fileSha: string;
};
export type GitCreateCommitApiResponse = /** status 201 Response */ GitCommit;
export type GitCreateCommitApiArg = {
  owner: string;
  repo: string;
  body: {
    message: string;
    tree: string;
    parents?: string[];
    author?: {
      name: string;
      email: string;
      date?: string;
    };
    committer?: {
      name?: string;
      email?: string;
      date?: string;
    };
    signature?: string;
  };
};
export type GitGetCommitApiResponse = /** status 200 Response */ GitCommit;
export type GitGetCommitApiArg = {
  owner: string;
  repo: string;
  /** commit_sha parameter */
  commitSha: string;
};
export type GitListMatchingRefsApiResponse =
  /** status 200 Response */ GitReference[];
export type GitListMatchingRefsApiArg = {
  owner: string;
  repo: string;
  /** ref parameter */
  ref: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type GitGetRefApiResponse = /** status 200 Response */ GitReference;
export type GitGetRefApiArg = {
  owner: string;
  repo: string;
  /** ref parameter */
  ref: string;
};
export type GitCreateRefApiResponse = /** status 201 Response */ GitReference;
export type GitCreateRefApiArg = {
  owner: string;
  repo: string;
  body: {
    ref: string;
    sha: string;
    key?: string;
  };
};
export type GitUpdateRefApiResponse = /** status 200 Response */ GitReference;
export type GitUpdateRefApiArg = {
  owner: string;
  repo: string;
  /** ref parameter */
  ref: string;
  body: {
    sha: string;
    force?: boolean;
  };
};
export type GitDeleteRefApiResponse = /** status 204 Response */ undefined;
export type GitDeleteRefApiArg = {
  owner: string;
  repo: string;
  /** ref parameter */
  ref: string;
};
export type GitCreateTagApiResponse = /** status 201 Response */ GitTag;
export type GitCreateTagApiArg = {
  owner: string;
  repo: string;
  body: {
    tag: string;
    message: string;
    object: string;
    type: "commit" | "tree" | "blob";
    tagger?: {
      name: string;
      email: string;
      date?: string;
    };
  };
};
export type GitGetTagApiResponse = /** status 200 Response */ GitTag;
export type GitGetTagApiArg = {
  owner: string;
  repo: string;
  tagSha: string;
};
export type GitCreateTreeApiResponse = /** status 201 Response */ GitTree;
export type GitCreateTreeApiArg = {
  owner: string;
  repo: string;
  body: {
    tree: {
      path?: string;
      mode?: "100644" | "100755" | "040000" | "160000" | "120000";
      type?: "blob" | "tree" | "commit";
      sha?: string | null;
      content?: string;
    }[];
    base_tree?: string;
  };
};
export type GitGetTreeApiResponse = /** status 200 Response */ GitTree;
export type GitGetTreeApiArg = {
  owner: string;
  repo: string;
  treeSha: string;
  /** Setting this parameter to any value returns the objects or subtrees referenced by the tree specified in `:tree_sha`. For example, setting `recursive` to any of the following will enable returning objects or subtrees: `0`, `1`, `"true"`, and `"false"`. Omit this parameter to prevent recursively returning objects or subtrees. */
  recursive?: string;
};
export type GitignoreTemplate = {
  name: string;
  source: string;
};
export type ShortBlob = {
  url: string;
  sha: string;
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
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
export type Blob = {
  content: string;
  encoding: string;
  url: string;
  sha: string;
  size: number | null;
  node_id: string;
  highlighted_content?: string;
};
export type GitCommit = {
  sha: string;
  node_id: string;
  url: string;
  author: {
    date: string;
    email: string;
    name: string;
  };
  committer: {
    date: string;
    email: string;
    name: string;
  };
  message: string;
  tree: {
    sha: string;
    url: string;
  };
  parents: {
    sha: string;
    url: string;
    html_url: string;
  }[];
  verification: {
    verified: boolean;
    reason: string;
    signature: string | null;
    payload: string | null;
  };
  html_url: string;
};
export type GitReference = {
  ref: string;
  node_id: string;
  url: string;
  object: {
    type: string;
    sha: string;
    url: string;
  };
};
export type Verification = {
  verified: boolean;
  reason: string;
  payload: string | null;
  signature: string | null;
};
export type GitTag = {
  node_id: string;
  tag: string;
  sha: string;
  url: string;
  message: string;
  tagger: {
    date: string;
    email: string;
    name: string;
  };
  object: {
    sha: string;
    type: string;
    url: string;
  };
  verification?: Verification;
};
export type GitTree = {
  sha: string;
  url: string;
  truncated: boolean;
  tree: {
    path?: string;
    mode?: string;
    type?: string;
    sha?: string;
    size?: number;
    url?: string;
  }[];
};
export const {
  useGitignoreGetAllTemplatesQuery,
  useGitignoreGetTemplateQuery,
  useGitCreateBlobMutation,
  useGitGetBlobQuery,
  useGitCreateCommitMutation,
  useGitGetCommitQuery,
  useGitListMatchingRefsQuery,
  useGitGetRefQuery,
  useGitCreateRefMutation,
  useGitUpdateRefMutation,
  useGitDeleteRefMutation,
  useGitCreateTagMutation,
  useGitGetTagQuery,
  useGitCreateTreeMutation,
  useGitGetTreeQuery,
} = injectedRtkApi;
