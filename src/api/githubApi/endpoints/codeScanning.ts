import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    codeScanningListAlertsForOrg: build.query<
      CodeScanningListAlertsForOrgApiResponse,
      CodeScanningListAlertsForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/code-scanning/alerts`,
        params: {
          before: queryArg.before,
          after: queryArg.after,
          page: queryArg.page,
          per_page: queryArg.perPage,
          direction: queryArg.direction,
          state: queryArg.state,
          sort: queryArg.sort,
        },
      }),
    }),
    codeScanningListAlertsForRepo: build.query<
      CodeScanningListAlertsForRepoApiResponse,
      CodeScanningListAlertsForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/code-scanning/alerts`,
        params: {
          tool_name: queryArg.toolName,
          tool_guid: queryArg.toolGuid,
          page: queryArg.page,
          per_page: queryArg.perPage,
          ref: queryArg.ref,
          direction: queryArg.direction,
          sort: queryArg.sort,
          state: queryArg.state,
        },
      }),
    }),
    codeScanningGetAlert: build.query<
      CodeScanningGetAlertApiResponse,
      CodeScanningGetAlertApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/code-scanning/alerts/${queryArg.alertNumber}`,
      }),
    }),
    codeScanningUpdateAlert: build.mutation<
      CodeScanningUpdateAlertApiResponse,
      CodeScanningUpdateAlertApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/code-scanning/alerts/${queryArg.alertNumber}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    codeScanningListAlertInstances: build.query<
      CodeScanningListAlertInstancesApiResponse,
      CodeScanningListAlertInstancesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/code-scanning/alerts/${queryArg.alertNumber}/instances`,
        params: {
          page: queryArg.page,
          per_page: queryArg.perPage,
          ref: queryArg.ref,
        },
      }),
    }),
    codeScanningListRecentAnalyses: build.query<
      CodeScanningListRecentAnalysesApiResponse,
      CodeScanningListRecentAnalysesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/code-scanning/analyses`,
        params: {
          tool_name: queryArg.toolName,
          tool_guid: queryArg.toolGuid,
          page: queryArg.page,
          per_page: queryArg.perPage,
          ref: queryArg.ref,
          sarif_id: queryArg.sarifId,
        },
      }),
    }),
    codeScanningGetAnalysis: build.query<
      CodeScanningGetAnalysisApiResponse,
      CodeScanningGetAnalysisApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/code-scanning/analyses/${queryArg.analysisId}`,
      }),
    }),
    codeScanningDeleteAnalysis: build.mutation<
      CodeScanningDeleteAnalysisApiResponse,
      CodeScanningDeleteAnalysisApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/code-scanning/analyses/${queryArg.analysisId}`,
        method: "DELETE",
        params: { confirm_delete: queryArg.confirmDelete },
      }),
    }),
    codeScanningUploadSarif: build.mutation<
      CodeScanningUploadSarifApiResponse,
      CodeScanningUploadSarifApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/code-scanning/sarifs`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    codeScanningGetSarif: build.query<
      CodeScanningGetSarifApiResponse,
      CodeScanningGetSarifApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/code-scanning/sarifs/${queryArg.sarifId}`,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type CodeScanningListAlertsForOrgApiResponse =
  /** status 200 Response */ CodeScanningOrganizationAlertItems[];
export type CodeScanningListAlertsForOrgApiArg = {
  org: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/overview/resources-in-the-rest-api#link-header). If specified, the query only searches for events before this cursor. */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/overview/resources-in-the-rest-api#link-header). If specified, the query only searches for events after this cursor. */
  after?: string;
  /** Page number of the results to fetch. */
  page?: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** One of `asc` (ascending) or `desc` (descending). */
  direction?: "asc" | "desc";
  /** Set to `open`, `closed, `fixed`, or `dismissed` to list code scanning alerts in a specific state. */
  state?: CodeScanningAlertState;
  /** Can be one of `created`, `updated`. */
  sort?: "created" | "updated";
};
export type CodeScanningListAlertsForRepoApiResponse =
  /** status 200 Response */ CodeScanningAlertItems[];
export type CodeScanningListAlertsForRepoApiArg = {
  owner: string;
  repo: string;
  /** The name of a code scanning tool. Only results by this tool will be listed. You can specify the tool by using either `tool_name` or `tool_guid`, but not both. */
  toolName?: CodeScanningAnalysisToolName;
  /** The GUID of a code scanning tool. Only results by this tool will be listed. Note that some code scanning tools may not include a GUID in their analysis data. You can specify the tool by using either `tool_guid` or `tool_name`, but not both. */
  toolGuid?: CodeScanningAnalysisToolGuid;
  /** Page number of the results to fetch. */
  page?: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** The Git reference for the results you want to list. The `ref` for a branch can be formatted either as `refs/heads/<branch name>` or simply `<branch name>`. To reference a pull request use `refs/pull/<number>/merge`. */
  ref?: CodeScanningRef;
  /** One of `asc` (ascending) or `desc` (descending). */
  direction?: "asc" | "desc";
  /** Can be one of `created`, `updated`, `number`. */
  sort?: "created" | "updated" | "number";
  /** Set to `open`, `closed, `fixed`, or `dismissed` to list code scanning alerts in a specific state. */
  state?: CodeScanningAlertState;
};
export type CodeScanningGetAlertApiResponse =
  /** status 200 Response */ CodeScanningAlert;
export type CodeScanningGetAlertApiArg = {
  owner: string;
  repo: string;
  /** The number that identifies an alert. You can find this at the end of the URL for a code scanning alert within GitHub, and in the `number` field in the response from the `GET /repos/{owner}/{repo}/code-scanning/alerts` operation. */
  alertNumber: AlertNumber;
};
export type CodeScanningUpdateAlertApiResponse =
  /** status 200 Response */ CodeScanningAlert;
export type CodeScanningUpdateAlertApiArg = {
  owner: string;
  repo: string;
  /** The number that identifies an alert. You can find this at the end of the URL for a code scanning alert within GitHub, and in the `number` field in the response from the `GET /repos/{owner}/{repo}/code-scanning/alerts` operation. */
  alertNumber: AlertNumber;
  body: {
    state: CodeScanningAlertSetState;
    dismissed_reason?: CodeScanningAlertDismissedReason;
  };
};
export type CodeScanningListAlertInstancesApiResponse =
  /** status 200 Response */ CodeScanningAlertInstance[];
export type CodeScanningListAlertInstancesApiArg = {
  owner: string;
  repo: string;
  /** The number that identifies an alert. You can find this at the end of the URL for a code scanning alert within GitHub, and in the `number` field in the response from the `GET /repos/{owner}/{repo}/code-scanning/alerts` operation. */
  alertNumber: AlertNumber;
  /** Page number of the results to fetch. */
  page?: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** The Git reference for the results you want to list. The `ref` for a branch can be formatted either as `refs/heads/<branch name>` or simply `<branch name>`. To reference a pull request use `refs/pull/<number>/merge`. */
  ref?: CodeScanningRef;
};
export type CodeScanningListRecentAnalysesApiResponse =
  /** status 200 Response */ CodeScanningAnalysis[];
export type CodeScanningListRecentAnalysesApiArg = {
  owner: string;
  repo: string;
  /** The name of a code scanning tool. Only results by this tool will be listed. You can specify the tool by using either `tool_name` or `tool_guid`, but not both. */
  toolName?: CodeScanningAnalysisToolName;
  /** The GUID of a code scanning tool. Only results by this tool will be listed. Note that some code scanning tools may not include a GUID in their analysis data. You can specify the tool by using either `tool_guid` or `tool_name`, but not both. */
  toolGuid?: CodeScanningAnalysisToolGuid;
  /** Page number of the results to fetch. */
  page?: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** The Git reference for the analyses you want to list. The `ref` for a branch can be formatted either as `refs/heads/<branch name>` or simply `<branch name>`. To reference a pull request use `refs/pull/<number>/merge`. */
  ref?: CodeScanningRef;
  /** Filter analyses belonging to the same SARIF upload. */
  sarifId?: CodeScanningAnalysisSarifId;
};
export type CodeScanningGetAnalysisApiResponse =
  /** status 200 Response */ CodeScanningAnalysis;
export type CodeScanningGetAnalysisApiArg = {
  owner: string;
  repo: string;
  /** The ID of the analysis, as returned from the `GET /repos/{owner}/{repo}/code-scanning/analyses` operation. */
  analysisId: number;
};
export type CodeScanningDeleteAnalysisApiResponse =
  /** status 200 Response */ AnalysisDeletion;
export type CodeScanningDeleteAnalysisApiArg = {
  owner: string;
  repo: string;
  /** The ID of the analysis, as returned from the `GET /repos/{owner}/{repo}/code-scanning/analyses` operation. */
  analysisId: number;
  /** Allow deletion if the specified analysis is the last in a set. If you attempt to delete the final analysis in a set without setting this parameter to `true`, you'll get a 400 response with the message: `Analysis is last of its type and deletion may result in the loss of historical alert data. Please specify confirm_delete.` */
  confirmDelete?: string | null;
};
export type CodeScanningUploadSarifApiResponse =
  /** status 202 Response */ CodeScanningSarifsReceipt;
export type CodeScanningUploadSarifApiArg = {
  owner: string;
  repo: string;
  body: {
    commit_sha: CodeScanningAnalysisCommitSha;
    ref: CodeScanningRef;
    sarif: CodeScanningAnalysisSarifFile;
    checkout_uri?: string;
    started_at?: string;
    tool_name?: string;
  };
};
export type CodeScanningGetSarifApiResponse =
  /** status 200 Response */ CodeScanningSarifsStatus;
export type CodeScanningGetSarifApiArg = {
  owner: string;
  repo: string;
  /** The SARIF ID obtained after uploading. */
  sarifId: string;
};
export type AlertNumber = number;
export type AlertCreatedAt = string;
export type AlertUpdatedAt = string;
export type AlertUrl = string;
export type AlertHtmlUrl = string;
export type AlertInstancesUrl = string;
export type CodeScanningAlertState = "open" | "closed" | "dismissed" | "fixed";
export type CodeScanningAlertFixedAt = string | null;
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
export type CodeScanningAlertDismissedAt = string | null;
export type CodeScanningAlertDismissedReason =
  | (null | "false positive" | "won't fix" | "used in tests")
  | null;
export type CodeScanningAlertRule = {
  id?: string | null;
  name?: string;
  severity?: ("none" | "note" | "warning" | "error") | null;
  security_severity_level?: ("low" | "medium" | "high" | "critical") | null;
  description?: string;
  full_description?: string;
  tags?: string[] | null;
  help?: string | null;
};
export type CodeScanningAnalysisToolName = string;
export type CodeScanningAnalysisToolVersion = string | null;
export type CodeScanningAnalysisToolGuid = string | null;
export type CodeScanningAnalysisTool = {
  name?: CodeScanningAnalysisToolName;
  version?: CodeScanningAnalysisToolVersion;
  guid?: CodeScanningAnalysisToolGuid;
};
export type CodeScanningRef = string;
export type CodeScanningAnalysisAnalysisKey = string;
export type CodeScanningAlertEnvironment = string;
export type CodeScanningAnalysisCategory = string;
export type CodeScanningAlertLocation = {
  path?: string;
  start_line?: number;
  end_line?: number;
  start_column?: number;
  end_column?: number;
};
export type CodeScanningAlertClassification =
  | ("source" | "generated" | "test" | "library")
  | null;
export type CodeScanningAlertInstance = {
  ref?: CodeScanningRef;
  analysis_key?: CodeScanningAnalysisAnalysisKey;
  environment?: CodeScanningAlertEnvironment;
  category?: CodeScanningAnalysisCategory;
  state?: CodeScanningAlertState;
  commit_sha?: string;
  message?: {
    text?: string;
  };
  location?: CodeScanningAlertLocation;
  html_url?: string;
  classifications?: CodeScanningAlertClassification[];
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
export type CodeScanningOrganizationAlertItems = {
  number: AlertNumber;
  created_at: AlertCreatedAt;
  updated_at?: AlertUpdatedAt;
  url: AlertUrl;
  html_url: AlertHtmlUrl;
  instances_url: AlertInstancesUrl;
  state: CodeScanningAlertState;
  fixed_at?: CodeScanningAlertFixedAt;
  dismissed_by: SimpleUser;
  dismissed_at: CodeScanningAlertDismissedAt;
  dismissed_reason: CodeScanningAlertDismissedReason;
  rule: CodeScanningAlertRule;
  tool: CodeScanningAnalysisTool;
  most_recent_instance: CodeScanningAlertInstance;
  repository: MinimalRepository;
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
};
export type CodeScanningAlertRuleSummary = {
  id?: string | null;
  name?: string;
  tags?: string[] | null;
  severity?: ("none" | "note" | "warning" | "error") | null;
  description?: string;
};
export type CodeScanningAlertItems = {
  number: AlertNumber;
  created_at: AlertCreatedAt;
  updated_at?: AlertUpdatedAt;
  url: AlertUrl;
  html_url: AlertHtmlUrl;
  instances_url: AlertInstancesUrl;
  state: CodeScanningAlertState;
  fixed_at?: CodeScanningAlertFixedAt;
  dismissed_by: SimpleUser;
  dismissed_at: CodeScanningAlertDismissedAt;
  dismissed_reason: CodeScanningAlertDismissedReason;
  rule: CodeScanningAlertRuleSummary;
  tool: CodeScanningAnalysisTool;
  most_recent_instance: CodeScanningAlertInstance;
};
export type CodeScanningAlert = {
  number: AlertNumber;
  created_at: AlertCreatedAt;
  updated_at?: AlertUpdatedAt;
  url: AlertUrl;
  html_url: AlertHtmlUrl;
  instances_url: AlertInstancesUrl;
  state: CodeScanningAlertState;
  fixed_at?: CodeScanningAlertFixedAt;
  dismissed_by: SimpleUser;
  dismissed_at: CodeScanningAlertDismissedAt;
  dismissed_reason: CodeScanningAlertDismissedReason;
  rule: CodeScanningAlertRule;
  tool: CodeScanningAnalysisTool;
  most_recent_instance: CodeScanningAlertInstance;
};
export type CodeScanningAlertSetState = "open" | "dismissed";
export type CodeScanningAnalysisCommitSha = string;
export type CodeScanningAnalysisEnvironment = string;
export type CodeScanningAnalysisCreatedAt = string;
export type CodeScanningAnalysisUrl = string;
export type CodeScanningAnalysisSarifId = string;
export type CodeScanningAnalysis = {
  ref: CodeScanningRef;
  commit_sha: CodeScanningAnalysisCommitSha;
  analysis_key: CodeScanningAnalysisAnalysisKey;
  environment: CodeScanningAnalysisEnvironment;
  category?: CodeScanningAnalysisCategory;
  error: string;
  created_at: CodeScanningAnalysisCreatedAt;
  results_count: number;
  rules_count: number;
  id: number;
  url: CodeScanningAnalysisUrl;
  sarif_id: CodeScanningAnalysisSarifId;
  tool: CodeScanningAnalysisTool;
  deletable: boolean;
  warning: string;
};
export type AnalysisDeletion = {
  next_analysis_url: string | null;
  confirm_delete_url: string | null;
};
export type CodeScanningSarifsReceipt = {
  id?: CodeScanningAnalysisSarifId;
  url?: string;
};
export type CodeScanningAnalysisSarifFile = string;
export type CodeScanningSarifsStatus = {
  processing_status?: "pending" | "complete" | "failed";
  analyses_url?: string | null;
  errors?: string[] | null;
};
export const {
  useCodeScanningListAlertsForOrgQuery,
  useCodeScanningListAlertsForRepoQuery,
  useCodeScanningGetAlertQuery,
  useCodeScanningUpdateAlertMutation,
  useCodeScanningListAlertInstancesQuery,
  useCodeScanningListRecentAnalysesQuery,
  useCodeScanningGetAnalysisQuery,
  useCodeScanningDeleteAnalysisMutation,
  useCodeScanningUploadSarifMutation,
  useCodeScanningGetSarifQuery,
} = injectedRtkApi;
