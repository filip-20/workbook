import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    checksCreate: build.mutation<ChecksCreateApiResponse, ChecksCreateApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/check-runs`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    checksGet: build.query<ChecksGetApiResponse, ChecksGetApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/check-runs/${queryArg.checkRunId}`,
      }),
    }),
    checksUpdate: build.mutation<ChecksUpdateApiResponse, ChecksUpdateApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/check-runs/${queryArg.checkRunId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    checksListAnnotations: build.query<
      ChecksListAnnotationsApiResponse,
      ChecksListAnnotationsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/check-runs/${queryArg.checkRunId}/annotations`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    checksRerequestRun: build.mutation<
      ChecksRerequestRunApiResponse,
      ChecksRerequestRunApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/check-runs/${queryArg.checkRunId}/rerequest`,
        method: "POST",
      }),
    }),
    checksCreateSuite: build.mutation<
      ChecksCreateSuiteApiResponse,
      ChecksCreateSuiteApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/check-suites`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    checksSetSuitesPreferences: build.mutation<
      ChecksSetSuitesPreferencesApiResponse,
      ChecksSetSuitesPreferencesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/check-suites/preferences`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    checksGetSuite: build.query<
      ChecksGetSuiteApiResponse,
      ChecksGetSuiteApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/check-suites/${queryArg.checkSuiteId}`,
      }),
    }),
    checksListForSuite: build.query<
      ChecksListForSuiteApiResponse,
      ChecksListForSuiteApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/check-suites/${queryArg.checkSuiteId}/check-runs`,
        params: {
          check_name: queryArg.checkName,
          status: queryArg.status,
          filter: queryArg.filter,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    checksRerequestSuite: build.mutation<
      ChecksRerequestSuiteApiResponse,
      ChecksRerequestSuiteApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/check-suites/${queryArg.checkSuiteId}/rerequest`,
        method: "POST",
      }),
    }),
    checksListForRef: build.query<
      ChecksListForRefApiResponse,
      ChecksListForRefApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/commits/${queryArg.ref}/check-runs`,
        params: {
          check_name: queryArg.checkName,
          status: queryArg.status,
          filter: queryArg.filter,
          per_page: queryArg.perPage,
          page: queryArg.page,
          app_id: queryArg.appId,
        },
      }),
    }),
    checksListSuitesForRef: build.query<
      ChecksListSuitesForRefApiResponse,
      ChecksListSuitesForRefApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/commits/${queryArg.ref}/check-suites`,
        params: {
          app_id: queryArg.appId,
          check_name: queryArg.checkName,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type ChecksCreateApiResponse = /** status 201 Response */ CheckRun;
export type ChecksCreateApiArg = {
  owner: string;
  repo: string;
  body:
    | ({
        status: "completed";
      } & {
        [key: string]: any;
      })
    | ({
        status?: "queued" | "in_progress";
      } & {
        [key: string]: any;
      });
};
export type ChecksGetApiResponse = /** status 200 Response */ CheckRun;
export type ChecksGetApiArg = {
  owner: string;
  repo: string;
  /** check_run_id parameter */
  checkRunId: number;
};
export type ChecksUpdateApiResponse = /** status 200 Response */ CheckRun;
export type ChecksUpdateApiArg = {
  owner: string;
  repo: string;
  /** check_run_id parameter */
  checkRunId: number;
  body:
    | ({
        status?: "completed";
      } & {
        [key: string]: any;
      })
    | ({
        status?: "queued" | "in_progress";
      } & {
        [key: string]: any;
      });
};
export type ChecksListAnnotationsApiResponse =
  /** status 200 Response */ CheckAnnotation[];
export type ChecksListAnnotationsApiArg = {
  owner: string;
  repo: string;
  /** check_run_id parameter */
  checkRunId: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ChecksRerequestRunApiResponse = /** status 201 Response */ {};
export type ChecksRerequestRunApiArg = {
  owner: string;
  repo: string;
  /** check_run_id parameter */
  checkRunId: number;
};
export type ChecksCreateSuiteApiResponse =
  /** status 200 when the suite already existed */
    | CheckSuite
    | /** status 201 Response when the suite was created */ CheckSuite;
export type ChecksCreateSuiteApiArg = {
  owner: string;
  repo: string;
  body: {
    head_sha: string;
  };
};
export type ChecksSetSuitesPreferencesApiResponse =
  /** status 200 Response */ CheckSuitePreference;
export type ChecksSetSuitesPreferencesApiArg = {
  owner: string;
  repo: string;
  body: {
    auto_trigger_checks?: {
      app_id: number;
      setting: boolean;
    }[];
  };
};
export type ChecksGetSuiteApiResponse = /** status 200 Response */ CheckSuite;
export type ChecksGetSuiteApiArg = {
  owner: string;
  repo: string;
  /** check_suite_id parameter */
  checkSuiteId: number;
};
export type ChecksListForSuiteApiResponse = /** status 200 Response */ {
  total_count: number;
  check_runs: CheckRun[];
};
export type ChecksListForSuiteApiArg = {
  owner: string;
  repo: string;
  /** check_suite_id parameter */
  checkSuiteId: number;
  /** Returns check runs with the specified `name`. */
  checkName?: string;
  /** Returns check runs with the specified `status`. Can be one of `queued`, `in_progress`, or `completed`. */
  status?: "queued" | "in_progress" | "completed";
  /** Filters check runs by their `completed_at` timestamp. Can be one of `latest` (returning the most recent check runs) or `all`. */
  filter?: "latest" | "all";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ChecksRerequestSuiteApiResponse = /** status 201 Response */ {};
export type ChecksRerequestSuiteApiArg = {
  owner: string;
  repo: string;
  /** check_suite_id parameter */
  checkSuiteId: number;
};
export type ChecksListForRefApiResponse = /** status 200 Response */ {
  total_count: number;
  check_runs: CheckRun[];
};
export type ChecksListForRefApiArg = {
  owner: string;
  repo: string;
  /** ref parameter */
  ref: string;
  /** Returns check runs with the specified `name`. */
  checkName?: string;
  /** Returns check runs with the specified `status`. Can be one of `queued`, `in_progress`, or `completed`. */
  status?: "queued" | "in_progress" | "completed";
  /** Filters check runs by their `completed_at` timestamp. Can be one of `latest` (returning the most recent check runs) or `all`. */
  filter?: "latest" | "all";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
  appId?: number;
};
export type ChecksListSuitesForRefApiResponse = /** status 200 Response */ {
  total_count: number;
  check_suites: CheckSuite[];
};
export type ChecksListSuitesForRefApiArg = {
  owner: string;
  repo: string;
  /** ref parameter */
  ref: string;
  /** Filters check suites by GitHub App `id`. */
  appId?: number;
  /** Returns check runs with the specified `name`. */
  checkName?: string;
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
export type GitHubApp = {
  id: number;
  slug?: string;
  node_id: string;
  owner: SimpleUser;
  name: string;
  description: string | null;
  external_url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  permissions: {
    issues?: string;
    checks?: string;
    metadata?: string;
    contents?: string;
    deployments?: string;
  } & {
    [key: string]: string;
  };
  events: string[];
  installations_count?: number;
  client_id?: string;
  client_secret?: string;
  webhook_secret?: string | null;
  pem?: string;
} | null;
export type PullRequestMinimal = {
  id: number;
  number: number;
  url: string;
  head: {
    ref: string;
    sha: string;
    repo: {
      id: number;
      url: string;
      name: string;
    };
  };
  base: {
    ref: string;
    sha: string;
    repo: {
      id: number;
      url: string;
      name: string;
    };
  };
};
export type Deployment = {
  url: string;
  id: number;
  node_id: string;
  task: string;
  original_environment?: string;
  environment: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  statuses_url: string;
  repository_url: string;
  transient_environment?: boolean;
  production_environment?: boolean;
  performed_via_github_app?: GitHubApp;
};
export type CheckRun = {
  id: number;
  head_sha: string;
  node_id: string;
  external_id: string | null;
  url: string;
  html_url: string | null;
  details_url: string | null;
  status: "queued" | "in_progress" | "completed";
  conclusion:
    | (
        | "success"
        | "failure"
        | "neutral"
        | "cancelled"
        | "skipped"
        | "timed_out"
        | "action_required"
      )
    | null;
  started_at: string | null;
  completed_at: string | null;
  output: {
    title: string | null;
    summary: string | null;
    text: string | null;
    annotations_count: number;
    annotations_url: string;
  };
  name: string;
  check_suite: {
    id: number;
  } | null;
  app: GitHubApp;
  pull_requests: PullRequestMinimal[];
  deployment?: Deployment;
};
export type CheckAnnotation = {
  path: string;
  start_line: number;
  end_line: number;
  start_column: number | null;
  end_column: number | null;
  annotation_level: string | null;
  title: string | null;
  message: string | null;
  raw_details: string | null;
  blob_href: string;
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
};
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
} | null;
export type CodeOfConduct = {
  key: string;
  name: string;
  url: string;
  body?: string;
  html_url: string | null;
};
export type MinimalRepository = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
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
  git_url?: string;
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
  ssh_url?: string;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  clone_url?: string;
  mirror_url?: string | null;
  hooks_url: string;
  svn_url?: string;
  homepage?: string | null;
  language?: string | null;
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
  pushed_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  permissions?: {
    admin?: boolean;
    maintain?: boolean;
    push?: boolean;
    triage?: boolean;
    pull?: boolean;
  };
  role_name?: string;
  template_repository?: Repository;
  temp_clone_token?: string;
  delete_branch_on_merge?: boolean;
  subscribers_count?: number;
  network_count?: number;
  code_of_conduct?: CodeOfConduct;
  license?: {
    key?: string;
    name?: string;
    spdx_id?: string;
    url?: string;
    node_id?: string;
  } | null;
  forks?: number;
  open_issues?: number;
  watchers?: number;
  allow_forking?: boolean;
};
export type SimpleCommit = {
  id: string;
  tree_id: string;
  message: string;
  timestamp: string;
  author: {
    name: string;
    email: string;
  } | null;
  committer: {
    name: string;
    email: string;
  } | null;
};
export type CheckSuite = {
  id: number;
  node_id: string;
  head_branch: string | null;
  head_sha: string;
  status: ("queued" | "in_progress" | "completed") | null;
  conclusion:
    | (
        | "success"
        | "failure"
        | "neutral"
        | "cancelled"
        | "skipped"
        | "timed_out"
        | "action_required"
      )
    | null;
  url: string | null;
  before: string | null;
  after: string | null;
  pull_requests: PullRequestMinimal[] | null;
  app: GitHubApp;
  repository: MinimalRepository;
  created_at: string | null;
  updated_at: string | null;
  head_commit: SimpleCommit;
  latest_check_runs_count: number;
  check_runs_url: string;
  rerequestable?: boolean;
  runs_rerequestable?: boolean;
};
export type CheckSuitePreference = {
  preferences: {
    auto_trigger_checks?: {
      app_id: number;
      setting: boolean;
    }[];
  };
  repository: MinimalRepository;
};
export const {
  useChecksCreateMutation,
  useChecksGetQuery,
  useChecksUpdateMutation,
  useChecksListAnnotationsQuery,
  useChecksRerequestRunMutation,
  useChecksCreateSuiteMutation,
  useChecksSetSuitesPreferencesMutation,
  useChecksGetSuiteQuery,
  useChecksListForSuiteQuery,
  useChecksRerequestSuiteMutation,
  useChecksListForRefQuery,
  useChecksListSuitesForRefQuery,
} = injectedRtkApi;
