import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    codespacesListInRepositoryForAuthenticatedUser: build.query<
      CodespacesListInRepositoryForAuthenticatedUserApiResponse,
      CodespacesListInRepositoryForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/codespaces`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    codespacesCreateWithRepoForAuthenticatedUser: build.mutation<
      CodespacesCreateWithRepoForAuthenticatedUserApiResponse,
      CodespacesCreateWithRepoForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/codespaces`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    codespacesRepoMachinesForAuthenticatedUser: build.query<
      CodespacesRepoMachinesForAuthenticatedUserApiResponse,
      CodespacesRepoMachinesForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/codespaces/machines`,
        params: { location: queryArg.location },
      }),
    }),
    codespacesCreateWithPrForAuthenticatedUser: build.mutation<
      CodespacesCreateWithPrForAuthenticatedUserApiResponse,
      CodespacesCreateWithPrForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/${queryArg.pullNumber}/codespaces`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    codespacesListForAuthenticatedUser: build.query<
      CodespacesListForAuthenticatedUserApiResponse,
      CodespacesListForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces`,
        params: {
          per_page: queryArg.perPage,
          page: queryArg.page,
          repository_id: queryArg.repositoryId,
        },
      }),
    }),
    codespacesCreateForAuthenticatedUser: build.mutation<
      CodespacesCreateForAuthenticatedUserApiResponse,
      CodespacesCreateForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    codespacesListSecretsForAuthenticatedUser: build.query<
      CodespacesListSecretsForAuthenticatedUserApiResponse,
      CodespacesListSecretsForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces/secrets`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    codespacesGetPublicKeyForAuthenticatedUser: build.query<
      CodespacesGetPublicKeyForAuthenticatedUserApiResponse,
      CodespacesGetPublicKeyForAuthenticatedUserApiArg
    >({
      query: () => ({ url: `/user/codespaces/secrets/public-key` }),
    }),
    codespacesGetSecretForAuthenticatedUser: build.query<
      CodespacesGetSecretForAuthenticatedUserApiResponse,
      CodespacesGetSecretForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces/secrets/${queryArg.secretName}`,
      }),
    }),
    codespacesCreateOrUpdateSecretForAuthenticatedUser: build.mutation<
      CodespacesCreateOrUpdateSecretForAuthenticatedUserApiResponse,
      CodespacesCreateOrUpdateSecretForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces/secrets/${queryArg.secretName}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    codespacesDeleteSecretForAuthenticatedUser: build.mutation<
      CodespacesDeleteSecretForAuthenticatedUserApiResponse,
      CodespacesDeleteSecretForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces/secrets/${queryArg.secretName}`,
        method: "DELETE",
      }),
    }),
    codespacesListRepositoriesForSecretForAuthenticatedUser: build.query<
      CodespacesListRepositoriesForSecretForAuthenticatedUserApiResponse,
      CodespacesListRepositoriesForSecretForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces/secrets/${queryArg.secretName}/repositories`,
      }),
    }),
    codespacesSetRepositoriesForSecretForAuthenticatedUser: build.mutation<
      CodespacesSetRepositoriesForSecretForAuthenticatedUserApiResponse,
      CodespacesSetRepositoriesForSecretForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces/secrets/${queryArg.secretName}/repositories`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    codespacesAddRepositoryForSecretForAuthenticatedUser: build.mutation<
      CodespacesAddRepositoryForSecretForAuthenticatedUserApiResponse,
      CodespacesAddRepositoryForSecretForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces/secrets/${queryArg.secretName}/repositories/${queryArg.repositoryId}`,
        method: "PUT",
      }),
    }),
    codespacesRemoveRepositoryForSecretForAuthenticatedUser: build.mutation<
      CodespacesRemoveRepositoryForSecretForAuthenticatedUserApiResponse,
      CodespacesRemoveRepositoryForSecretForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces/secrets/${queryArg.secretName}/repositories/${queryArg.repositoryId}`,
        method: "DELETE",
      }),
    }),
    codespacesGetForAuthenticatedUser: build.query<
      CodespacesGetForAuthenticatedUserApiResponse,
      CodespacesGetForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces/${queryArg.codespaceName}`,
      }),
    }),
    codespacesUpdateForAuthenticatedUser: build.mutation<
      CodespacesUpdateForAuthenticatedUserApiResponse,
      CodespacesUpdateForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces/${queryArg.codespaceName}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    codespacesDeleteForAuthenticatedUser: build.mutation<
      CodespacesDeleteForAuthenticatedUserApiResponse,
      CodespacesDeleteForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces/${queryArg.codespaceName}`,
        method: "DELETE",
      }),
    }),
    codespacesExportForAuthenticatedUser: build.mutation<
      CodespacesExportForAuthenticatedUserApiResponse,
      CodespacesExportForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces/${queryArg.codespaceName}/exports`,
        method: "POST",
      }),
    }),
    codespacesGetExportDetailsForAuthenticatedUser: build.query<
      CodespacesGetExportDetailsForAuthenticatedUserApiResponse,
      CodespacesGetExportDetailsForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces/${queryArg.codespaceName}/exports/${queryArg.exportId}`,
      }),
    }),
    codespacesCodespaceMachinesForAuthenticatedUser: build.query<
      CodespacesCodespaceMachinesForAuthenticatedUserApiResponse,
      CodespacesCodespaceMachinesForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces/${queryArg.codespaceName}/machines`,
      }),
    }),
    codespacesStartForAuthenticatedUser: build.mutation<
      CodespacesStartForAuthenticatedUserApiResponse,
      CodespacesStartForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces/${queryArg.codespaceName}/start`,
        method: "POST",
      }),
    }),
    codespacesStopForAuthenticatedUser: build.mutation<
      CodespacesStopForAuthenticatedUserApiResponse,
      CodespacesStopForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/codespaces/${queryArg.codespaceName}/stop`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type CodespacesListInRepositoryForAuthenticatedUserApiResponse =
  /** status 200 Response */ {
    total_count: number;
    codespaces: Codespace[];
  };
export type CodespacesListInRepositoryForAuthenticatedUserApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
  owner: string;
  repo: string;
};
export type CodespacesCreateWithRepoForAuthenticatedUserApiResponse =
  /** status 201 Response when the codespace was successfully created */
    | Codespace
    | /** status 202 Response when the codespace creation partially failed but is being retried in the background */ Codespace;
export type CodespacesCreateWithRepoForAuthenticatedUserApiArg = {
  owner: string;
  repo: string;
  body: {
    ref?: string;
    location: string;
    machine?: string;
    working_directory?: string;
    idle_timeout_minutes?: number;
    display_name?: string;
  };
};
export type CodespacesRepoMachinesForAuthenticatedUserApiResponse =
  /** status 200 Response */ {
    total_count: number;
    machines: CodespaceMachine2[];
  };
export type CodespacesRepoMachinesForAuthenticatedUserApiArg = {
  owner: string;
  repo: string;
  /** Required. The location to check for available machines. */
  location: string;
};
export type CodespacesCreateWithPrForAuthenticatedUserApiResponse =
  /** status 201 Response when the codespace was successfully created */
    | Codespace
    | /** status 202 Response when the codespace creation partially failed but is being retried in the background */ Codespace;
export type CodespacesCreateWithPrForAuthenticatedUserApiArg = {
  owner: string;
  repo: string;
  pullNumber: number;
  body: {
    location: string;
    machine?: string;
    working_directory?: string;
    idle_timeout_minutes?: number;
    display_name?: string;
  };
};
export type CodespacesListForAuthenticatedUserApiResponse =
  /** status 200 Response */ {
    total_count: number;
    codespaces: Codespace[];
  };
export type CodespacesListForAuthenticatedUserApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
  /** ID of the Repository to filter on */
  repositoryId?: number;
};
export type CodespacesCreateForAuthenticatedUserApiResponse =
  /** status 201 Response when the codespace was successfully created */
    | Codespace
    | /** status 202 Response when the codespace creation partially failed but is being retried in the background */ Codespace;
export type CodespacesCreateForAuthenticatedUserApiArg = {
  body:
    | {
        repository_id: number;
        ref?: string;
        location: string;
        machine?: string;
        working_directory?: string;
        idle_timeout_minutes?: number;
        display_name?: string;
      }
    | {
        pull_request: {
          pull_request_number: number;
          repository_id: number;
        };
        location: string;
        machine?: string;
        working_directory?: string;
        idle_timeout_minutes?: number;
      };
};
export type CodespacesListSecretsForAuthenticatedUserApiResponse =
  /** status 200 Response */ {
    total_count: number;
    secrets: CodespacesSecret[];
  };
export type CodespacesListSecretsForAuthenticatedUserApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type CodespacesGetPublicKeyForAuthenticatedUserApiResponse =
  /** status 200 Response */ CodespacesUserPublicKey;
export type CodespacesGetPublicKeyForAuthenticatedUserApiArg = void;
export type CodespacesGetSecretForAuthenticatedUserApiResponse =
  /** status 200 Response */ CodespacesSecret;
export type CodespacesGetSecretForAuthenticatedUserApiArg = {
  /** secret_name parameter */
  secretName: string;
};
export type CodespacesCreateOrUpdateSecretForAuthenticatedUserApiResponse =
  /** status 201 Response after successfully creaing a secret */
    | {}
    | /** status 204 Response after successfully updating a secret */ undefined;
export type CodespacesCreateOrUpdateSecretForAuthenticatedUserApiArg = {
  /** secret_name parameter */
  secretName: string;
  body: {
    encrypted_value: string;
    key_id: string;
    selected_repository_ids?: string[];
  };
};
export type CodespacesDeleteSecretForAuthenticatedUserApiResponse = unknown;
export type CodespacesDeleteSecretForAuthenticatedUserApiArg = {
  /** secret_name parameter */
  secretName: string;
};
export type CodespacesListRepositoriesForSecretForAuthenticatedUserApiResponse =
  /** status 200 Response */ {
    total_count: number;
    repositories: MinimalRepository[];
  };
export type CodespacesListRepositoriesForSecretForAuthenticatedUserApiArg = {
  /** secret_name parameter */
  secretName: string;
};
export type CodespacesSetRepositoriesForSecretForAuthenticatedUserApiResponse =
  /** status 204 No Content when repositories were added to the selected list */ undefined;
export type CodespacesSetRepositoriesForSecretForAuthenticatedUserApiArg = {
  /** secret_name parameter */
  secretName: string;
  body: {
    selected_repository_ids: number[];
  };
};
export type CodespacesAddRepositoryForSecretForAuthenticatedUserApiResponse =
  /** status 204 No Content when repository was added to the selected list */ undefined;
export type CodespacesAddRepositoryForSecretForAuthenticatedUserApiArg = {
  /** secret_name parameter */
  secretName: string;
  repositoryId: number;
};
export type CodespacesRemoveRepositoryForSecretForAuthenticatedUserApiResponse =
  /** status 204 No Content when repository was removed from the selected list */ undefined;
export type CodespacesRemoveRepositoryForSecretForAuthenticatedUserApiArg = {
  /** secret_name parameter */
  secretName: string;
  repositoryId: number;
};
export type CodespacesGetForAuthenticatedUserApiResponse =
  /** status 200 Response */ Codespace;
export type CodespacesGetForAuthenticatedUserApiArg = {
  /** The name of the codespace. */
  codespaceName: string;
};
export type CodespacesUpdateForAuthenticatedUserApiResponse =
  /** status 200 Response */ Codespace;
export type CodespacesUpdateForAuthenticatedUserApiArg = {
  /** The name of the codespace. */
  codespaceName: string;
  body: {
    machine?: string;
    display_name?: string;
    recent_folders?: string[];
  };
};
export type CodespacesDeleteForAuthenticatedUserApiResponse =
  /** status 202 Accepted */ object;
export type CodespacesDeleteForAuthenticatedUserApiArg = {
  /** The name of the codespace. */
  codespaceName: string;
};
export type CodespacesExportForAuthenticatedUserApiResponse =
  /** status 202 Response */ FetchesInformationAboutAnExportOfACodespace;
export type CodespacesExportForAuthenticatedUserApiArg = {
  /** The name of the codespace. */
  codespaceName: string;
};
export type CodespacesGetExportDetailsForAuthenticatedUserApiResponse =
  /** status 200 Response */ FetchesInformationAboutAnExportOfACodespace;
export type CodespacesGetExportDetailsForAuthenticatedUserApiArg = {
  /** The name of the codespace. */
  codespaceName: string;
  /** The ID of the export operation, or `latest`. Currently only `latest` is currently supported. */
  exportId: string;
};
export type CodespacesCodespaceMachinesForAuthenticatedUserApiResponse =
  /** status 200 Response */ {
    total_count: number;
    machines: CodespaceMachine2[];
  };
export type CodespacesCodespaceMachinesForAuthenticatedUserApiArg = {
  /** The name of the codespace. */
  codespaceName: string;
};
export type CodespacesStartForAuthenticatedUserApiResponse =
  /** status 200 Response */ Codespace;
export type CodespacesStartForAuthenticatedUserApiArg = {
  /** The name of the codespace. */
  codespaceName: string;
};
export type CodespacesStopForAuthenticatedUserApiResponse =
  /** status 200 Response */ Codespace;
export type CodespacesStopForAuthenticatedUserApiArg = {
  /** The name of the codespace. */
  codespaceName: string;
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
};
export type LicenseSimple = {
  key: string;
  name: string;
  url: string | null;
  spdx_id: string | null;
  node_id: string;
  html_url?: string;
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
} | null;
export type Repository = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  license: LicenseSimple;
  organization?: SimpleUser2;
  forks: number;
  permissions?: {
    admin: boolean;
    pull: boolean;
    triage?: boolean;
    push: boolean;
    maintain?: boolean;
  };
  owner: SimpleUser;
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
  owner: SimpleUser;
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
export type CodespaceMachine = {
  name: string;
  display_name: string;
  operating_system: string;
  storage_in_bytes: number;
  memory_in_bytes: number;
  cpus: number;
  prebuild_availability: ("none" | "blob" | "pool") | null;
} | null;
export type Codespace = {
  id: number;
  name: string;
  display_name?: string | null;
  environment_id: string | null;
  owner: SimpleUser;
  billable_owner: SimpleUser;
  repository: MinimalRepository;
  machine: CodespaceMachine;
  prebuild: boolean | null;
  created_at: string;
  updated_at: string;
  last_used_at: string;
  state:
    | "Unknown"
    | "Created"
    | "Queued"
    | "Provisioning"
    | "Available"
    | "Awaiting"
    | "Unavailable"
    | "Deleted"
    | "Moved"
    | "Shutdown"
    | "Archived"
    | "Starting"
    | "ShuttingDown"
    | "Failed"
    | "Exporting"
    | "Updating"
    | "Rebuilding";
  url: string;
  git_status: {
    ahead?: number;
    behind?: number;
    has_unpushed_changes?: boolean;
    has_uncommitted_changes?: boolean;
    ref?: string;
  };
  location: "EastUs" | "SouthEastAsia" | "WestEurope" | "WestUs2";
  idle_timeout_minutes: number | null;
  web_url: string;
  machines_url: string;
  start_url: string;
  stop_url: string;
  pulls_url: string | null;
  recent_folders: string[];
  runtime_constraints?: {
    allowed_port_privacy_settings?: string[] | null;
  };
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
};
export type CodespaceMachine2 = {
  name: string;
  display_name: string;
  operating_system: string;
  storage_in_bytes: number;
  memory_in_bytes: number;
  cpus: number;
  prebuild_availability: ("none" | "blob" | "pool") | null;
};
export type CodespacesSecret = {
  name: string;
  created_at: string;
  updated_at: string;
  visibility: "all" | "private" | "selected";
  selected_repositories_url: string;
};
export type CodespacesUserPublicKey = {
  key_id: string;
  key: string;
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
export type FetchesInformationAboutAnExportOfACodespace = {
  state?: string | null;
  completed_at?: string | null;
  branch?: string | null;
  sha?: string | null;
  id?: string;
  export_url?: string;
};
export const {
  useCodespacesListInRepositoryForAuthenticatedUserQuery,
  useCodespacesCreateWithRepoForAuthenticatedUserMutation,
  useCodespacesRepoMachinesForAuthenticatedUserQuery,
  useCodespacesCreateWithPrForAuthenticatedUserMutation,
  useCodespacesListForAuthenticatedUserQuery,
  useCodespacesCreateForAuthenticatedUserMutation,
  useCodespacesListSecretsForAuthenticatedUserQuery,
  useCodespacesGetPublicKeyForAuthenticatedUserQuery,
  useCodespacesGetSecretForAuthenticatedUserQuery,
  useCodespacesCreateOrUpdateSecretForAuthenticatedUserMutation,
  useCodespacesDeleteSecretForAuthenticatedUserMutation,
  useCodespacesListRepositoriesForSecretForAuthenticatedUserQuery,
  useCodespacesSetRepositoriesForSecretForAuthenticatedUserMutation,
  useCodespacesAddRepositoryForSecretForAuthenticatedUserMutation,
  useCodespacesRemoveRepositoryForSecretForAuthenticatedUserMutation,
  useCodespacesGetForAuthenticatedUserQuery,
  useCodespacesUpdateForAuthenticatedUserMutation,
  useCodespacesDeleteForAuthenticatedUserMutation,
  useCodespacesExportForAuthenticatedUserMutation,
  useCodespacesGetExportDetailsForAuthenticatedUserQuery,
  useCodespacesCodespaceMachinesForAuthenticatedUserQuery,
  useCodespacesStartForAuthenticatedUserMutation,
  useCodespacesStopForAuthenticatedUserMutation,
} = injectedRtkApi;
