import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    secretScanningListAlertsForEnterprise: build.query<
      SecretScanningListAlertsForEnterpriseApiResponse,
      SecretScanningListAlertsForEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/secret-scanning/alerts`,
        params: {
          state: queryArg.state,
          secret_type: queryArg.secretType,
          resolution: queryArg.resolution,
          per_page: queryArg.perPage,
          before: queryArg.before,
          after: queryArg.after,
        },
      }),
    }),
    secretScanningListAlertsForOrg: build.query<
      SecretScanningListAlertsForOrgApiResponse,
      SecretScanningListAlertsForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/secret-scanning/alerts`,
        params: {
          state: queryArg.state,
          secret_type: queryArg.secretType,
          resolution: queryArg.resolution,
          page: queryArg.page,
          per_page: queryArg.perPage,
        },
      }),
    }),
    secretScanningListAlertsForRepo: build.query<
      SecretScanningListAlertsForRepoApiResponse,
      SecretScanningListAlertsForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/secret-scanning/alerts`,
        params: {
          state: queryArg.state,
          secret_type: queryArg.secretType,
          resolution: queryArg.resolution,
          page: queryArg.page,
          per_page: queryArg.perPage,
        },
      }),
    }),
    secretScanningGetAlert: build.query<
      SecretScanningGetAlertApiResponse,
      SecretScanningGetAlertApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/secret-scanning/alerts/${queryArg.alertNumber}`,
      }),
    }),
    secretScanningUpdateAlert: build.mutation<
      SecretScanningUpdateAlertApiResponse,
      SecretScanningUpdateAlertApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/secret-scanning/alerts/${queryArg.alertNumber}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    secretScanningListLocationsForAlert: build.query<
      SecretScanningListLocationsForAlertApiResponse,
      SecretScanningListLocationsForAlertApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/secret-scanning/alerts/${queryArg.alertNumber}/locations`,
        params: { page: queryArg.page, per_page: queryArg.perPage },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type SecretScanningListAlertsForEnterpriseApiResponse =
  /** status 200 Response */ OrganizationSecretScanningAlert[];
export type SecretScanningListAlertsForEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Set to `open` or `resolved` to only list secret scanning alerts in a specific state. */
  state?: "open" | "resolved";
  /** A comma-separated list of secret types to return. By default all secret types are returned.
    See "[About secret scanning for private repositories](https://docs.github.com/code-security/secret-security/about-secret-scanning#about-secret-scanning-for-private-repositories)"
    for a complete list of secret types (API slug). */
  secretType?: string;
  /** A comma-separated list of resolutions. Only secret scanning alerts with one of these resolutions are listed. Valid resolutions are `false_positive`, `wont_fix`, `revoked`, `pattern_edited`, `pattern_deleted` or `used_in_tests`. */
  resolution?: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/overview/resources-in-the-rest-api#link-header). If specified, the query only searches for events before this cursor. */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/overview/resources-in-the-rest-api#link-header). If specified, the query only searches for events after this cursor. */
  after?: string;
};
export type SecretScanningListAlertsForOrgApiResponse =
  /** status 200 Response */ OrganizationSecretScanningAlert[];
export type SecretScanningListAlertsForOrgApiArg = {
  org: string;
  /** Set to `open` or `resolved` to only list secret scanning alerts in a specific state. */
  state?: "open" | "resolved";
  /** A comma-separated list of secret types to return. By default all secret types are returned.
    See "[About secret scanning for private repositories](https://docs.github.com/code-security/secret-security/about-secret-scanning#about-secret-scanning-for-private-repositories)"
    for a complete list of secret types (API slug). */
  secretType?: string;
  /** A comma-separated list of resolutions. Only secret scanning alerts with one of these resolutions are listed. Valid resolutions are `false_positive`, `wont_fix`, `revoked`, `pattern_edited`, `pattern_deleted` or `used_in_tests`. */
  resolution?: string;
  /** Page number of the results to fetch. */
  page?: number;
  /** Results per page (max 100) */
  perPage?: number;
};
export type SecretScanningListAlertsForRepoApiResponse =
  /** status 200 Response */ SecretScanningAlert[];
export type SecretScanningListAlertsForRepoApiArg = {
  owner: string;
  repo: string;
  /** Set to `open` or `resolved` to only list secret scanning alerts in a specific state. */
  state?: "open" | "resolved";
  /** A comma-separated list of secret types to return. By default all secret types are returned.
    See "[About secret scanning for private repositories](https://docs.github.com/code-security/secret-security/about-secret-scanning#about-secret-scanning-for-private-repositories)"
    for a complete list of secret types (API slug). */
  secretType?: string;
  /** A comma-separated list of resolutions. Only secret scanning alerts with one of these resolutions are listed. Valid resolutions are `false_positive`, `wont_fix`, `revoked`, `pattern_edited`, `pattern_deleted` or `used_in_tests`. */
  resolution?: string;
  /** Page number of the results to fetch. */
  page?: number;
  /** Results per page (max 100) */
  perPage?: number;
};
export type SecretScanningGetAlertApiResponse =
  /** status 200 Response */ SecretScanningAlert;
export type SecretScanningGetAlertApiArg = {
  owner: string;
  repo: string;
  /** The number that identifies an alert. You can find this at the end of the URL for a code scanning alert within GitHub, and in the `number` field in the response from the `GET /repos/{owner}/{repo}/code-scanning/alerts` operation. */
  alertNumber: AlertNumber;
};
export type SecretScanningUpdateAlertApiResponse =
  /** status 200 Response */ SecretScanningAlert;
export type SecretScanningUpdateAlertApiArg = {
  owner: string;
  repo: string;
  /** The number that identifies an alert. You can find this at the end of the URL for a code scanning alert within GitHub, and in the `number` field in the response from the `GET /repos/{owner}/{repo}/code-scanning/alerts` operation. */
  alertNumber: AlertNumber;
  body: {
    state: SecretScanningAlertState;
    resolution?: SecretScanningAlertResolution;
  };
};
export type SecretScanningListLocationsForAlertApiResponse =
  /** status 200 Response */ SecretScanningLocation[];
export type SecretScanningListLocationsForAlertApiArg = {
  owner: string;
  repo: string;
  /** The number that identifies an alert. You can find this at the end of the URL for a code scanning alert within GitHub, and in the `number` field in the response from the `GET /repos/{owner}/{repo}/code-scanning/alerts` operation. */
  alertNumber: AlertNumber;
  /** Page number of the results to fetch. */
  page?: number;
  /** Results per page (max 100) */
  perPage?: number;
};
export type AlertNumber = number;
export type AlertCreatedAt = string;
export type AlertUrl = string;
export type AlertHtmlUrl = string;
export type SecretScanningAlertState = "open" | "resolved";
export type SecretScanningAlertResolution =
  | (null | "false_positive" | "wont_fix" | "revoked" | "used_in_tests")
  | null;
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
export type OrganizationSecretScanningAlert = {
  number?: AlertNumber;
  created_at?: AlertCreatedAt;
  url?: AlertUrl;
  html_url?: AlertHtmlUrl;
  locations_url?: string;
  state?: SecretScanningAlertState;
  resolution?: SecretScanningAlertResolution;
  resolved_at?: string | null;
  resolved_by?: SimpleUser;
  secret_type?: string;
  secret?: string;
  repository?: MinimalRepository;
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
};
export type SecretScanningAlert = {
  number?: AlertNumber;
  created_at?: AlertCreatedAt;
  url?: AlertUrl;
  html_url?: AlertHtmlUrl;
  locations_url?: string;
  state?: SecretScanningAlertState;
  resolution?: SecretScanningAlertResolution;
  resolved_at?: string | null;
  resolved_by?: SimpleUser;
  secret_type?: string;
  secret?: string;
};
export type SecretScanningLocationCommit = {
  path: string;
  start_line: number;
  end_line: number;
  start_column: number;
  end_column: number;
  blob_sha: string;
  blob_url: string;
  commit_sha: string;
  commit_url: string;
};
export type SecretScanningLocation = {
  type: "commit";
  details: SecretScanningLocationCommit;
};
export const {
  useSecretScanningListAlertsForEnterpriseQuery,
  useSecretScanningListAlertsForOrgQuery,
  useSecretScanningListAlertsForRepoQuery,
  useSecretScanningGetAlertQuery,
  useSecretScanningUpdateAlertMutation,
  useSecretScanningListLocationsForAlertQuery,
} = injectedRtkApi;
