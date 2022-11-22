import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    pullsList: build.query<PullsListApiResponse, PullsListApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls`,
        params: {
          state: queryArg.state,
          head: queryArg.head,
          base: queryArg.base,
          sort: queryArg.sort,
          direction: queryArg.direction,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    pullsCreate: build.mutation<PullsCreateApiResponse, PullsCreateApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    pullsListReviewCommentsForRepo: build.query<
      PullsListReviewCommentsForRepoApiResponse,
      PullsListReviewCommentsForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/comments`,
        params: {
          sort: queryArg.sort,
          direction: queryArg.direction,
          since: queryArg.since,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    pullsGetReviewComment: build.query<
      PullsGetReviewCommentApiResponse,
      PullsGetReviewCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/comments/${queryArg.commentId}`,
      }),
    }),
    pullsUpdateReviewComment: build.mutation<
      PullsUpdateReviewCommentApiResponse,
      PullsUpdateReviewCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/comments/${queryArg.commentId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    pullsDeleteReviewComment: build.mutation<
      PullsDeleteReviewCommentApiResponse,
      PullsDeleteReviewCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/comments/${queryArg.commentId}`,
        method: "DELETE",
      }),
    }),
    pullsGet: build.query<PullsGetApiResponse, PullsGetApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}`,
      }),
    }),
    pullsUpdate: build.mutation<PullsUpdateApiResponse, PullsUpdateApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    pullsListReviewComments: build.query<
      PullsListReviewCommentsApiResponse,
      PullsListReviewCommentsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/comments`,
        params: {
          sort: queryArg.sort,
          direction: queryArg.direction,
          since: queryArg.since,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    pullsCreateReviewComment: build.mutation<
      PullsCreateReviewCommentApiResponse,
      PullsCreateReviewCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/comments`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    pullsCreateReplyForReviewComment: build.mutation<
      PullsCreateReplyForReviewCommentApiResponse,
      PullsCreateReplyForReviewCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/comments/${queryArg.commentId}/replies`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    pullsListCommits: build.query<
      PullsListCommitsApiResponse,
      PullsListCommitsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/commits`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    pullsListFiles: build.query<
      PullsListFilesApiResponse,
      PullsListFilesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/files`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    pullsCheckIfMerged: build.query<
      PullsCheckIfMergedApiResponse,
      PullsCheckIfMergedApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/merge`,
      }),
    }),
    pullsMerge: build.mutation<PullsMergeApiResponse, PullsMergeApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/merge`,
        method: "PUT",
        body: queryArg.body,
      }),
      invalidatesTags: ['Files'],  // workbook file changes after merge 
    }),
    pullsListRequestedReviewers: build.query<
      PullsListRequestedReviewersApiResponse,
      PullsListRequestedReviewersApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/requested_reviewers`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    pullsRequestReviewers: build.mutation<
      PullsRequestReviewersApiResponse,
      PullsRequestReviewersApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/requested_reviewers`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    pullsRemoveRequestedReviewers: build.mutation<
      PullsRemoveRequestedReviewersApiResponse,
      PullsRemoveRequestedReviewersApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/requested_reviewers`,
        method: "DELETE",
        body: queryArg.body,
      }),
    }),
    pullsListReviews: build.query<
      PullsListReviewsApiResponse,
      PullsListReviewsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/reviews`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    pullsCreateReview: build.mutation<
      PullsCreateReviewApiResponse,
      PullsCreateReviewApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/reviews`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    pullsGetReview: build.query<
      PullsGetReviewApiResponse,
      PullsGetReviewApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/reviews/${queryArg.reviewId}`,
      }),
    }),
    pullsUpdateReview: build.mutation<
      PullsUpdateReviewApiResponse,
      PullsUpdateReviewApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/reviews/${queryArg.reviewId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    pullsDeletePendingReview: build.mutation<
      PullsDeletePendingReviewApiResponse,
      PullsDeletePendingReviewApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/reviews/${queryArg.reviewId}`,
        method: "DELETE",
      }),
    }),
    pullsListCommentsForReview: build.query<
      PullsListCommentsForReviewApiResponse,
      PullsListCommentsForReviewApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/reviews/${queryArg.reviewId}/comments`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    pullsDismissReview: build.mutation<
      PullsDismissReviewApiResponse,
      PullsDismissReviewApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/reviews/${queryArg.reviewId}/dismissals`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    pullsSubmitReview: build.mutation<
      PullsSubmitReviewApiResponse,
      PullsSubmitReviewApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/reviews/${queryArg.reviewId}/events`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    pullsUpdateBranch: build.mutation<
      PullsUpdateBranchApiResponse,
      PullsUpdateBranchApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/update-branch`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type PullsListApiResponse =
  /** status 200 Response */ PullRequestSimple[];
export type PullsListApiArg = {
  owner: string;
  repo: string;
  /** Either `open`, `closed`, or `all` to filter by state. */
  state?: "open" | "closed" | "all";
  /** Filter pulls by head user or head organization and branch name in the format of `user:ref-name` or `organization:ref-name`. For example: `github:new-script-format` or `octocat:test-branch`. */
  head?: string;
  /** Filter pulls by base branch name. Example: `gh-pages`. */
  base?: string;
  /** What to sort results by. Can be either `created`, `updated`, `popularity` (comment count) or `long-running` (age, filtering by pulls updated in the last month). */
  sort?: "created" | "updated" | "popularity" | "long-running";
  /** The direction of the sort. Can be either `asc` or `desc`. Default: `desc` when sort is `created` or sort is not specified, otherwise `asc`. */
  direction?: "asc" | "desc";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type PullsCreateApiResponse = /** status 201 Response */ PullRequest;
export type PullsCreateApiArg = {
  owner: string;
  repo: string;
  body: {
    title?: string;
    head: string;
    base: string;
    body?: string;
    maintainer_can_modify?: boolean;
    draft?: boolean;
    issue?: number;
  };
};
export type PullsListReviewCommentsForRepoApiResponse =
  /** status 200 Response */ PullRequestReviewComment[];
export type PullsListReviewCommentsForRepoApiArg = {
  owner: string;
  repo: string;
  sort?: "created" | "updated" | "created_at";
  /** Can be either `asc` or `desc`. Ignored without `sort` parameter. */
  direction?: "asc" | "desc";
  /** Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type PullsGetReviewCommentApiResponse =
  /** status 200 Response */ PullRequestReviewComment;
export type PullsGetReviewCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
};
export type PullsUpdateReviewCommentApiResponse =
  /** status 200 Response */ PullRequestReviewComment;
export type PullsUpdateReviewCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
  body: {
    body: string;
  };
};
export type PullsDeleteReviewCommentApiResponse =
  /** status 204 Response */ undefined;
export type PullsDeleteReviewCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
};
export type PullsGetApiResponse =
  /** status 200 Pass the appropriate [media type](https://docs.github.com/rest/overview/media-types/#commits-commit-comparison-and-pull-requests) to fetch diff and patch formats. */ PullRequest;
export type PullsGetApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
};
export type PullsUpdateApiResponse = /** status 200 Response */ PullRequest;
export type PullsUpdateApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  body: {
    title?: string;
    body?: string;
    state?: "open" | "closed";
    base?: string;
    maintainer_can_modify?: boolean;
  };
};
export type PullsListReviewCommentsApiResponse =
  /** status 200 Response */ PullRequestReviewComment[];
export type PullsListReviewCommentsApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  /** One of `created` (when the repository was starred) or `updated` (when it was last pushed to). */
  sort?: "created" | "updated";
  /** Can be either `asc` or `desc`. Ignored without `sort` parameter. */
  direction?: "asc" | "desc";
  /** Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type PullsCreateReviewCommentApiResponse =
  /** status 201 Response */ PullRequestReviewComment;
export type PullsCreateReviewCommentApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  body: {
    body: string;
    commit_id?: string;
    path?: string;
    position?: number;
    side?: "LEFT" | "RIGHT";
    line?: number;
    start_line?: number;
    start_side?: "LEFT" | "RIGHT" | "side";
    in_reply_to?: number;
  };
};
export type PullsCreateReplyForReviewCommentApiResponse =
  /** status 201 Response */ PullRequestReviewComment;
export type PullsCreateReplyForReviewCommentApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  /** comment_id parameter */
  commentId: number;
  body: {
    body: string;
  };
};
export type PullsListCommitsApiResponse = /** status 200 Response */ Commit[];
export type PullsListCommitsApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type PullsListFilesApiResponse = /** status 200 Response */ DiffEntry[];
export type PullsListFilesApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type PullsCheckIfMergedApiResponse = unknown;
export type PullsCheckIfMergedApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
};
export type PullsMergeApiResponse =
  /** status 200 if merge was successful */ PullRequestMergeResult;
export type PullsMergeApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  body: {
    commit_title?: string;
    commit_message?: string;
    sha?: string;
    merge_method?: "merge" | "squash" | "rebase";
  } | null;
};
export type PullsListRequestedReviewersApiResponse =
  /** status 200 Response */ PullRequestReviewRequest;
export type PullsListRequestedReviewersApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type PullsRequestReviewersApiResponse =
  /** status 201 Response */ PullRequestSimple;
export type PullsRequestReviewersApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  body: any | any;
};
export type PullsRemoveRequestedReviewersApiResponse =
  /** status 200 Response */ PullRequestSimple;
export type PullsRemoveRequestedReviewersApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  body: {
    reviewers: string[];
    team_reviewers?: string[];
  };
};
export type PullsListReviewsApiResponse =
  /** status 200 The list of reviews returns in chronological order. */ PullRequestReview[];
export type PullsListReviewsApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type PullsCreateReviewApiResponse =
  /** status 200 Response */ PullRequestReview;
export type PullsCreateReviewApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  body: {
    commit_id?: string;
    body?: string;
    event?: "APPROVE" | "REQUEST_CHANGES" | "COMMENT";
    comments?: {
      path: string;
      position?: number;
      body: string;
      line?: number;
      side?: string;
      start_line?: number;
      start_side?: string;
    }[];
  };
};
export type PullsGetReviewApiResponse =
  /** status 200 Response */ PullRequestReview;
export type PullsGetReviewApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  /** review_id parameter */
  reviewId: number;
};
export type PullsUpdateReviewApiResponse =
  /** status 200 Response */ PullRequestReview;
export type PullsUpdateReviewApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  /** review_id parameter */
  reviewId: number;
  body: {
    body: string;
  };
};
export type PullsDeletePendingReviewApiResponse =
  /** status 200 Response */ PullRequestReview;
export type PullsDeletePendingReviewApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  /** review_id parameter */
  reviewId: number;
};
export type PullsListCommentsForReviewApiResponse =
  /** status 200 Response */ LegacyReviewComment[];
export type PullsListCommentsForReviewApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  /** review_id parameter */
  reviewId: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type PullsDismissReviewApiResponse =
  /** status 200 Response */ PullRequestReview;
export type PullsDismissReviewApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  /** review_id parameter */
  reviewId: number;
  body: {
    message: string;
    event?: string;
  };
};
export type PullsSubmitReviewApiResponse =
  /** status 200 Response */ PullRequestReview;
export type PullsSubmitReviewApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  /** review_id parameter */
  reviewId: number;
  body: {
    body?: string;
    event: "APPROVE" | "REQUEST_CHANGES" | "COMMENT";
  };
};
export type PullsUpdateBranchApiResponse = /** status 202 Response */ {
  message?: string;
  url?: string;
};
export type PullsUpdateBranchApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  body: {
    expected_head_sha?: string;
  } | null;
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
export type Milestone = {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: string;
  number: number;
  state: "open" | "closed";
  title: string;
  description: string | null;
  creator: SimpleUser;
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  due_on: string | null;
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
export type TeamSimple = {
  id: number;
  node_id: string;
  url: string;
  members_url: string;
  name: string;
  description: string | null;
  permission: string;
  privacy?: string;
  html_url: string;
  repositories_url: string;
  slug: string;
  ldap_dn?: string;
} | null;
export type Team = {
  id: number;
  node_id: string;
  name: string;
  slug: string;
  description: string | null;
  privacy?: string;
  permission: string;
  permissions?: {
    pull: boolean;
    triage: boolean;
    push: boolean;
    maintain: boolean;
    admin: boolean;
  };
  url: string;
  html_url: string;
  members_url: string;
  repositories_url: string;
  parent: TeamSimple;
};
export type LicenseSimple = {
  key: string;
  name: string;
  url: string | null;
  spdx_id: string | null;
  node_id: string;
  html_url?: string;
} | null;
export type Repository = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  license: LicenseSimple;
  organization?: SimpleUser;
  forks: number;
  permissions?: {
    admin: boolean;
    pull: boolean;
    triage?: boolean;
    push: boolean;
    maintain?: boolean;
  };
  owner: SimpleUser2;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  archive_url: string;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  deployments_url: string;
  downloads_url: string;
  events_url: string;
  forks_url: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  notifications_url: string;
  pulls_url: string;
  releases_url: string;
  ssh_url: string;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  clone_url: string;
  mirror_url: string | null;
  hooks_url: string;
  svn_url: string;
  homepage: string | null;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  size: number;
  default_branch: string;
  open_issues_count: number;
  is_template?: boolean;
  topics?: string[];
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_downloads: boolean;
  archived: boolean;
  disabled: boolean;
  visibility?: string;
  pushed_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  allow_rebase_merge?: boolean;
  template_repository?: {
    id?: number;
    node_id?: string;
    name?: string;
    full_name?: string;
    owner?: {
      login?: string;
      id?: number;
      node_id?: string;
      avatar_url?: string;
      gravatar_id?: string;
      url?: string;
      html_url?: string;
      followers_url?: string;
      following_url?: string;
      gists_url?: string;
      starred_url?: string;
      subscriptions_url?: string;
      organizations_url?: string;
      repos_url?: string;
      events_url?: string;
      received_events_url?: string;
      type?: string;
      site_admin?: boolean;
    };
    private?: boolean;
    html_url?: string;
    description?: string;
    fork?: boolean;
    url?: string;
    archive_url?: string;
    assignees_url?: string;
    blobs_url?: string;
    branches_url?: string;
    collaborators_url?: string;
    comments_url?: string;
    commits_url?: string;
    compare_url?: string;
    contents_url?: string;
    contributors_url?: string;
    deployments_url?: string;
    downloads_url?: string;
    events_url?: string;
    forks_url?: string;
    git_commits_url?: string;
    git_refs_url?: string;
    git_tags_url?: string;
    git_url?: string;
    issue_comment_url?: string;
    issue_events_url?: string;
    issues_url?: string;
    keys_url?: string;
    labels_url?: string;
    languages_url?: string;
    merges_url?: string;
    milestones_url?: string;
    notifications_url?: string;
    pulls_url?: string;
    releases_url?: string;
    ssh_url?: string;
    stargazers_url?: string;
    statuses_url?: string;
    subscribers_url?: string;
    subscription_url?: string;
    tags_url?: string;
    teams_url?: string;
    trees_url?: string;
    clone_url?: string;
    mirror_url?: string;
    hooks_url?: string;
    svn_url?: string;
    homepage?: string;
    language?: string;
    forks_count?: number;
    stargazers_count?: number;
    watchers_count?: number;
    size?: number;
    default_branch?: string;
    open_issues_count?: number;
    is_template?: boolean;
    topics?: string[];
    has_issues?: boolean;
    has_projects?: boolean;
    has_wiki?: boolean;
    has_pages?: boolean;
    has_downloads?: boolean;
    archived?: boolean;
    disabled?: boolean;
    visibility?: string;
    pushed_at?: string;
    created_at?: string;
    updated_at?: string;
    permissions?: {
      admin?: boolean;
      maintain?: boolean;
      push?: boolean;
      triage?: boolean;
      pull?: boolean;
    };
    allow_rebase_merge?: boolean;
    temp_clone_token?: string;
    allow_squash_merge?: boolean;
    allow_auto_merge?: boolean;
    delete_branch_on_merge?: boolean;
    allow_update_branch?: boolean;
    allow_merge_commit?: boolean;
    subscribers_count?: number;
    network_count?: number;
  } | null;
  temp_clone_token?: string;
  allow_squash_merge?: boolean;
  allow_auto_merge?: boolean;
  delete_branch_on_merge?: boolean;
  allow_merge_commit?: boolean;
  allow_forking?: boolean;
  subscribers_count?: number;
  network_count?: number;
  open_issues: number;
  watchers: number;
  master_branch?: string;
  starred_at?: string;
};
export type Link = {
  href: string;
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
export type AutoMerge = {
  enabled_by: SimpleUser2;
  merge_method: "merge" | "squash" | "rebase";
  commit_title: string;
  commit_message: string;
} | null;
export type PullRequestSimple = {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  comments_url: string;
  statuses_url: string;
  number: number;
  state: string;
  locked: boolean;
  title: string;
  user: SimpleUser;
  body: string | null;
  labels: {
    id: number;
    node_id: string;
    url: string;
    name: string;
    description: string;
    color: string;
    default: boolean;
  }[];
  milestone: Milestone;
  active_lock_reason?: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  merge_commit_sha: string | null;
  assignee: SimpleUser;
  assignees?: SimpleUser2[] | null;
  requested_reviewers?: SimpleUser2[] | null;
  requested_teams?: Team[] | null;
  head: {
    label: string;
    ref: string;
    repo: Repository;
    sha: string;
    user: SimpleUser;
  };
  base: {
    label: string;
    ref: string;
    repo: Repository;
    sha: string;
    user: SimpleUser;
  };
  _links: {
    comments: Link;
    commits: Link;
    statuses: Link;
    html: Link;
    issue: Link;
    review_comments: Link;
    review_comment: Link;
    self: Link;
  };
  author_association: AuthorAssociation;
  auto_merge: AutoMerge;
  draft?: boolean;
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
export type TeamSimple2 = {
  id: number;
  node_id: string;
  url: string;
  members_url: string;
  name: string;
  description: string | null;
  permission: string;
  privacy?: string;
  html_url: string;
  repositories_url: string;
  slug: string;
  ldap_dn?: string;
};
export type PullRequest = {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  comments_url: string;
  statuses_url: string;
  number: number;
  state: "open" | "closed";
  locked: boolean;
  title: string;
  user: SimpleUser;
  body: string | null;
  labels: {
    id: number;
    node_id: string;
    url: string;
    name: string;
    description: string | null;
    color: string;
    default: boolean;
  }[];
  milestone: Milestone;
  active_lock_reason?: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  merge_commit_sha: string | null;
  assignee: SimpleUser;
  assignees?: SimpleUser2[] | null;
  requested_reviewers?: SimpleUser2[] | null;
  requested_teams?: TeamSimple2[] | null;
  head: {
    label: string;
    ref: string;
    repo: {
      archive_url: string;
      assignees_url: string;
      blobs_url: string;
      branches_url: string;
      collaborators_url: string;
      comments_url: string;
      commits_url: string;
      compare_url: string;
      contents_url: string;
      contributors_url: string;
      deployments_url: string;
      description: string | null;
      downloads_url: string;
      events_url: string;
      fork: boolean;
      forks_url: string;
      full_name: string;
      git_commits_url: string;
      git_refs_url: string;
      git_tags_url: string;
      hooks_url: string;
      html_url: string;
      id: number;
      node_id: string;
      issue_comment_url: string;
      issue_events_url: string;
      issues_url: string;
      keys_url: string;
      labels_url: string;
      languages_url: string;
      merges_url: string;
      milestones_url: string;
      name: string;
      notifications_url: string;
      owner: {
        avatar_url: string;
        events_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        gravatar_id: string | null;
        html_url: string;
        id: number;
        node_id: string;
        login: string;
        organizations_url: string;
        received_events_url: string;
        repos_url: string;
        site_admin: boolean;
        starred_url: string;
        subscriptions_url: string;
        type: string;
        url: string;
      };
      private: boolean;
      pulls_url: string;
      releases_url: string;
      stargazers_url: string;
      statuses_url: string;
      subscribers_url: string;
      subscription_url: string;
      tags_url: string;
      teams_url: string;
      trees_url: string;
      url: string;
      clone_url: string;
      default_branch: string;
      forks: number;
      forks_count: number;
      git_url: string;
      has_downloads: boolean;
      has_issues: boolean;
      has_projects: boolean;
      has_wiki: boolean;
      has_pages: boolean;
      homepage: string | null;
      language: string | null;
      master_branch?: string;
      archived: boolean;
      disabled: boolean;
      visibility?: string;
      mirror_url: string | null;
      open_issues: number;
      open_issues_count: number;
      permissions?: {
        admin: boolean;
        maintain?: boolean;
        push: boolean;
        triage?: boolean;
        pull: boolean;
      };
      temp_clone_token?: string;
      allow_merge_commit?: boolean;
      allow_squash_merge?: boolean;
      allow_rebase_merge?: boolean;
      license: {
        key: string;
        name: string;
        url: string | null;
        spdx_id: string | null;
        node_id: string;
      } | null;
      pushed_at: string;
      size: number;
      ssh_url: string;
      stargazers_count: number;
      svn_url: string;
      topics?: string[];
      watchers: number;
      watchers_count: number;
      created_at: string;
      updated_at: string;
      allow_forking?: boolean;
      is_template?: boolean;
    } | null;
    sha: string;
    user: {
      avatar_url: string;
      events_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      gravatar_id: string | null;
      html_url: string;
      id: number;
      node_id: string;
      login: string;
      organizations_url: string;
      received_events_url: string;
      repos_url: string;
      site_admin: boolean;
      starred_url: string;
      subscriptions_url: string;
      type: string;
      url: string;
    };
  };
  base: {
    label: string;
    ref: string;
    repo: {
      archive_url: string;
      assignees_url: string;
      blobs_url: string;
      branches_url: string;
      collaborators_url: string;
      comments_url: string;
      commits_url: string;
      compare_url: string;
      contents_url: string;
      contributors_url: string;
      deployments_url: string;
      description: string | null;
      downloads_url: string;
      events_url: string;
      fork: boolean;
      forks_url: string;
      full_name: string;
      git_commits_url: string;
      git_refs_url: string;
      git_tags_url: string;
      hooks_url: string;
      html_url: string;
      id: number;
      is_template?: boolean;
      node_id: string;
      issue_comment_url: string;
      issue_events_url: string;
      issues_url: string;
      keys_url: string;
      labels_url: string;
      languages_url: string;
      merges_url: string;
      milestones_url: string;
      name: string;
      notifications_url: string;
      owner: {
        avatar_url: string;
        events_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        gravatar_id: string | null;
        html_url: string;
        id: number;
        node_id: string;
        login: string;
        organizations_url: string;
        received_events_url: string;
        repos_url: string;
        site_admin: boolean;
        starred_url: string;
        subscriptions_url: string;
        type: string;
        url: string;
      };
      private: boolean;
      pulls_url: string;
      releases_url: string;
      stargazers_url: string;
      statuses_url: string;
      subscribers_url: string;
      subscription_url: string;
      tags_url: string;
      teams_url: string;
      trees_url: string;
      url: string;
      clone_url: string;
      default_branch: string;
      forks: number;
      forks_count: number;
      git_url: string;
      has_downloads: boolean;
      has_issues: boolean;
      has_projects: boolean;
      has_wiki: boolean;
      has_pages: boolean;
      homepage: string | null;
      language: string | null;
      master_branch?: string;
      archived: boolean;
      disabled: boolean;
      visibility?: string;
      mirror_url: string | null;
      open_issues: number;
      open_issues_count: number;
      permissions?: {
        admin: boolean;
        maintain?: boolean;
        push: boolean;
        triage?: boolean;
        pull: boolean;
      };
      temp_clone_token?: string;
      allow_merge_commit?: boolean;
      allow_squash_merge?: boolean;
      allow_rebase_merge?: boolean;
      license: LicenseSimple;
      pushed_at: string;
      size: number;
      ssh_url: string;
      stargazers_count: number;
      svn_url: string;
      topics?: string[];
      watchers: number;
      watchers_count: number;
      created_at: string;
      updated_at: string;
      allow_forking?: boolean;
    };
    sha: string;
    user: {
      avatar_url: string;
      events_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      gravatar_id: string | null;
      html_url: string;
      id: number;
      node_id: string;
      login: string;
      organizations_url: string;
      received_events_url: string;
      repos_url: string;
      site_admin: boolean;
      starred_url: string;
      subscriptions_url: string;
      type: string;
      url: string;
    };
  };
  _links: {
    comments: Link;
    commits: Link;
    statuses: Link;
    html: Link;
    issue: Link;
    review_comments: Link;
    review_comment: Link;
    self: Link;
  };
  author_association: AuthorAssociation;
  auto_merge: AutoMerge;
  draft?: boolean;
  merged: boolean;
  mergeable: boolean | null;
  rebaseable?: boolean | null;
  mergeable_state: string;
  merged_by: SimpleUser;
  comments: number;
  review_comments: number;
  maintainer_can_modify: boolean;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
};
export type ReactionRollup = {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  confused: number;
  heart: number;
  hooray: number;
  eyes: number;
  rocket: number;
};
export type PullRequestReviewComment = {
  url: string;
  pull_request_review_id: number | null;
  id: number;
  node_id: string;
  diff_hunk: string;
  path: string;
  position: number;
  original_position: number;
  commit_id: string;
  original_commit_id: string;
  in_reply_to_id?: number;
  user: SimpleUser2;
  body: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  pull_request_url: string;
  author_association: AuthorAssociation;
  _links: {
    self: {
      href: string;
    };
    html: {
      href: string;
    };
    pull_request: {
      href: string;
    };
  };
  start_line?: number | null;
  original_start_line?: number | null;
  start_side?: ("LEFT" | "RIGHT") | null;
  line?: number;
  original_line?: number;
  side?: "LEFT" | "RIGHT";
  reactions?: ReactionRollup;
  body_html?: string;
  body_text?: string;
};
export type GitUser = {
  name?: string;
  email?: string;
  date?: string;
} | null;
export type Verification = {
  verified: boolean;
  reason: string;
  payload: string | null;
  signature: string | null;
};
export type DiffEntry = {
  sha: string;
  filename: string;
  status:
    | "added"
    | "removed"
    | "modified"
    | "renamed"
    | "copied"
    | "changed"
    | "unchanged";
  additions: number;
  deletions: number;
  changes: number;
  blob_url: string;
  raw_url: string;
  contents_url: string;
  patch?: string;
  previous_filename?: string;
};
export type Commit = {
  url: string;
  sha: string;
  node_id: string;
  html_url: string;
  comments_url: string;
  commit: {
    url: string;
    author: GitUser;
    committer: GitUser;
    message: string;
    comment_count: number;
    tree: {
      sha: string;
      url: string;
    };
    verification?: Verification;
  };
  author: SimpleUser;
  committer: SimpleUser;
  parents: {
    sha: string;
    url: string;
    html_url?: string;
  }[];
  stats?: {
    additions?: number;
    deletions?: number;
    total?: number;
  };
  files?: DiffEntry[];
};
export type PullRequestMergeResult = {
  sha: string;
  merged: boolean;
  message: string;
};
export type PullRequestReviewRequest = {
  users: SimpleUser2[];
  teams: Team[];
};
export type PullRequestReview = {
  id: number;
  node_id: string;
  user: SimpleUser;
  body: string;
  state: string;
  html_url: string;
  pull_request_url: string;
  _links: {
    html: {
      href: string;
    };
    pull_request: {
      href: string;
    };
  };
  submitted_at?: string;
  commit_id: string;
  body_html?: string;
  body_text?: string;
  author_association: AuthorAssociation;
};
export type ValidationErrorSimple = {
  message: string;
  documentation_url: string;
  errors?: string[];
};
export type LegacyReviewComment = {
  url: string;
  pull_request_review_id: number | null;
  id: number;
  node_id: string;
  diff_hunk: string;
  path: string;
  position: number | null;
  original_position: number;
  commit_id: string;
  original_commit_id: string;
  in_reply_to_id?: number;
  user: SimpleUser;
  body: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  pull_request_url: string;
  author_association: AuthorAssociation;
  _links: {
    self: Link;
    html: Link;
    pull_request: Link;
  };
  body_text?: string;
  body_html?: string;
  reactions?: ReactionRollup;
  side?: "LEFT" | "RIGHT";
  start_side?: ("LEFT" | "RIGHT") | null;
  line?: number;
  original_line?: number;
  start_line?: number | null;
  original_start_line?: number | null;
};
export const {
  usePullsListQuery,
  usePullsCreateMutation,
  usePullsListReviewCommentsForRepoQuery,
  usePullsGetReviewCommentQuery,
  usePullsUpdateReviewCommentMutation,
  usePullsDeleteReviewCommentMutation,
  usePullsGetQuery,
  usePullsUpdateMutation,
  usePullsListReviewCommentsQuery,
  usePullsCreateReviewCommentMutation,
  usePullsCreateReplyForReviewCommentMutation,
  usePullsListCommitsQuery,
  usePullsListFilesQuery,
  usePullsCheckIfMergedQuery,
  usePullsMergeMutation,
  usePullsListRequestedReviewersQuery,
  usePullsRequestReviewersMutation,
  usePullsRemoveRequestedReviewersMutation,
  usePullsListReviewsQuery,
  usePullsCreateReviewMutation,
  usePullsGetReviewQuery,
  usePullsUpdateReviewMutation,
  usePullsDeletePendingReviewMutation,
  usePullsListCommentsForReviewQuery,
  usePullsDismissReviewMutation,
  usePullsSubmitReviewMutation,
  usePullsUpdateBranchMutation,
} = injectedRtkApi;
