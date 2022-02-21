import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    migrationsListForOrg: build.query<
      MigrationsListForOrgApiResponse,
      MigrationsListForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/migrations`,
        params: {
          per_page: queryArg.perPage,
          page: queryArg.page,
          exclude: queryArg.exclude,
        },
      }),
    }),
    migrationsStartForOrg: build.mutation<
      MigrationsStartForOrgApiResponse,
      MigrationsStartForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/migrations`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    migrationsGetStatusForOrg: build.query<
      MigrationsGetStatusForOrgApiResponse,
      MigrationsGetStatusForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/migrations/${queryArg.migrationId}`,
        params: { exclude: queryArg.exclude },
      }),
    }),
    migrationsDownloadArchiveForOrg: build.query<
      MigrationsDownloadArchiveForOrgApiResponse,
      MigrationsDownloadArchiveForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/migrations/${queryArg.migrationId}/archive`,
      }),
    }),
    migrationsDeleteArchiveForOrg: build.mutation<
      MigrationsDeleteArchiveForOrgApiResponse,
      MigrationsDeleteArchiveForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/migrations/${queryArg.migrationId}/archive`,
        method: "DELETE",
      }),
    }),
    migrationsUnlockRepoForOrg: build.mutation<
      MigrationsUnlockRepoForOrgApiResponse,
      MigrationsUnlockRepoForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/migrations/${queryArg.migrationId}/repos/${queryArg.repoName}/lock`,
        method: "DELETE",
      }),
    }),
    migrationsListReposForOrg: build.query<
      MigrationsListReposForOrgApiResponse,
      MigrationsListReposForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/migrations/${queryArg.migrationId}/repositories`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    migrationsGetImportStatus: build.query<
      MigrationsGetImportStatusApiResponse,
      MigrationsGetImportStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/import`,
      }),
    }),
    migrationsStartImport: build.mutation<
      MigrationsStartImportApiResponse,
      MigrationsStartImportApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/import`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    migrationsUpdateImport: build.mutation<
      MigrationsUpdateImportApiResponse,
      MigrationsUpdateImportApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/import`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    migrationsCancelImport: build.mutation<
      MigrationsCancelImportApiResponse,
      MigrationsCancelImportApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/import`,
        method: "DELETE",
      }),
    }),
    migrationsGetCommitAuthors: build.query<
      MigrationsGetCommitAuthorsApiResponse,
      MigrationsGetCommitAuthorsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/import/authors`,
        params: { since: queryArg.since },
      }),
    }),
    migrationsMapCommitAuthor: build.mutation<
      MigrationsMapCommitAuthorApiResponse,
      MigrationsMapCommitAuthorApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/import/authors/${queryArg.authorId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    migrationsGetLargeFiles: build.query<
      MigrationsGetLargeFilesApiResponse,
      MigrationsGetLargeFilesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/import/large_files`,
      }),
    }),
    migrationsSetLfsPreference: build.mutation<
      MigrationsSetLfsPreferenceApiResponse,
      MigrationsSetLfsPreferenceApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/import/lfs`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    migrationsListForAuthenticatedUser: build.query<
      MigrationsListForAuthenticatedUserApiResponse,
      MigrationsListForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/migrations`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    migrationsStartForAuthenticatedUser: build.mutation<
      MigrationsStartForAuthenticatedUserApiResponse,
      MigrationsStartForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/migrations`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    migrationsGetStatusForAuthenticatedUser: build.query<
      MigrationsGetStatusForAuthenticatedUserApiResponse,
      MigrationsGetStatusForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/migrations/${queryArg.migrationId}`,
        params: { exclude: queryArg.exclude },
      }),
    }),
    migrationsGetArchiveForAuthenticatedUser: build.query<
      MigrationsGetArchiveForAuthenticatedUserApiResponse,
      MigrationsGetArchiveForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/migrations/${queryArg.migrationId}/archive`,
      }),
    }),
    migrationsDeleteArchiveForAuthenticatedUser: build.mutation<
      MigrationsDeleteArchiveForAuthenticatedUserApiResponse,
      MigrationsDeleteArchiveForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/migrations/${queryArg.migrationId}/archive`,
        method: "DELETE",
      }),
    }),
    migrationsUnlockRepoForAuthenticatedUser: build.mutation<
      MigrationsUnlockRepoForAuthenticatedUserApiResponse,
      MigrationsUnlockRepoForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/migrations/${queryArg.migrationId}/repos/${queryArg.repoName}/lock`,
        method: "DELETE",
      }),
    }),
    migrationsListReposForAuthenticatedUser: build.query<
      MigrationsListReposForAuthenticatedUserApiResponse,
      MigrationsListReposForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/migrations/${queryArg.migrationId}/repositories`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type MigrationsListForOrgApiResponse =
  /** status 200 Response */ Migration[];
export type MigrationsListForOrgApiArg = {
  org: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
  /** Exclude attributes from the API response to improve performance */
  exclude?: "repositories"[];
};
export type MigrationsStartForOrgApiResponse =
  /** status 201 Response */ Migration;
export type MigrationsStartForOrgApiArg = {
  org: string;
  body: {
    repositories: string[];
    lock_repositories?: boolean;
    exclude_attachments?: boolean;
    exclude_releases?: boolean;
    exclude_owner_projects?: boolean;
    exclude?: "repositories"[];
  };
};
export type MigrationsGetStatusForOrgApiResponse =
  /** status 200 *   `pending`, which means the migration hasn't started yet.
   *   `exporting`, which means the migration is in progress.
   *   `exported`, which means the migration finished successfully.
   *   `failed`, which means the migration failed. */ Migration;
export type MigrationsGetStatusForOrgApiArg = {
  org: string;
  /** migration_id parameter */
  migrationId: number;
  /** Exclude attributes from the API response to improve performance */
  exclude?: "repositories"[];
};
export type MigrationsDownloadArchiveForOrgApiResponse = unknown;
export type MigrationsDownloadArchiveForOrgApiArg = {
  org: string;
  /** migration_id parameter */
  migrationId: number;
};
export type MigrationsDeleteArchiveForOrgApiResponse =
  /** status 204 Response */ undefined;
export type MigrationsDeleteArchiveForOrgApiArg = {
  org: string;
  /** migration_id parameter */
  migrationId: number;
};
export type MigrationsUnlockRepoForOrgApiResponse =
  /** status 204 Response */ undefined;
export type MigrationsUnlockRepoForOrgApiArg = {
  org: string;
  /** migration_id parameter */
  migrationId: number;
  /** repo_name parameter */
  repoName: string;
};
export type MigrationsListReposForOrgApiResponse =
  /** status 200 Response */ MinimalRepository[];
export type MigrationsListReposForOrgApiArg = {
  org: string;
  /** migration_id parameter */
  migrationId: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type MigrationsGetImportStatusApiResponse =
  /** status 200 Response */ Import;
export type MigrationsGetImportStatusApiArg = {
  owner: string;
  repo: string;
};
export type MigrationsStartImportApiResponse =
  /** status 201 Response */ Import;
export type MigrationsStartImportApiArg = {
  owner: string;
  repo: string;
  body: {
    vcs_url: string;
    vcs?: "subversion" | "git" | "mercurial" | "tfvc";
    vcs_username?: string;
    vcs_password?: string;
    tfvc_project?: string;
  };
};
export type MigrationsUpdateImportApiResponse =
  /** status 200 Response */ Import;
export type MigrationsUpdateImportApiArg = {
  owner: string;
  repo: string;
  body: {
    vcs_username?: string;
    vcs_password?: string;
    vcs?: string;
    tfvc_project?: string;
  } | null;
};
export type MigrationsCancelImportApiResponse = unknown;
export type MigrationsCancelImportApiArg = {
  owner: string;
  repo: string;
};
export type MigrationsGetCommitAuthorsApiResponse =
  /** status 200 Response */ PorterAuthor[];
export type MigrationsGetCommitAuthorsApiArg = {
  owner: string;
  repo: string;
  /** A user ID. Only return users with an ID greater than this ID. */
  since?: number;
};
export type MigrationsMapCommitAuthorApiResponse =
  /** status 200 Response */ PorterAuthor;
export type MigrationsMapCommitAuthorApiArg = {
  owner: string;
  repo: string;
  authorId: number;
  body: {
    email?: string;
    name?: string;
  };
};
export type MigrationsGetLargeFilesApiResponse =
  /** status 200 Response */ PorterLargeFile[];
export type MigrationsGetLargeFilesApiArg = {
  owner: string;
  repo: string;
};
export type MigrationsSetLfsPreferenceApiResponse =
  /** status 200 Response */ Import;
export type MigrationsSetLfsPreferenceApiArg = {
  owner: string;
  repo: string;
  body: {
    use_lfs: "opt_in" | "opt_out";
  };
};
export type MigrationsListForAuthenticatedUserApiResponse =
  /** status 200 Response */ Migration[];
export type MigrationsListForAuthenticatedUserApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type MigrationsStartForAuthenticatedUserApiResponse =
  /** status 201 Response */ Migration;
export type MigrationsStartForAuthenticatedUserApiArg = {
  body: {
    lock_repositories?: boolean;
    exclude_attachments?: boolean;
    exclude_releases?: boolean;
    exclude_owner_projects?: boolean;
    exclude?: "repositories"[];
    repositories: string[];
  };
};
export type MigrationsGetStatusForAuthenticatedUserApiResponse =
  /** status 200 Response */ Migration;
export type MigrationsGetStatusForAuthenticatedUserApiArg = {
  /** migration_id parameter */
  migrationId: number;
  exclude?: string[];
};
export type MigrationsGetArchiveForAuthenticatedUserApiResponse = unknown;
export type MigrationsGetArchiveForAuthenticatedUserApiArg = {
  /** migration_id parameter */
  migrationId: number;
};
export type MigrationsDeleteArchiveForAuthenticatedUserApiResponse =
  /** status 204 Response */ undefined;
export type MigrationsDeleteArchiveForAuthenticatedUserApiArg = {
  /** migration_id parameter */
  migrationId: number;
};
export type MigrationsUnlockRepoForAuthenticatedUserApiResponse =
  /** status 204 Response */ undefined;
export type MigrationsUnlockRepoForAuthenticatedUserApiArg = {
  /** migration_id parameter */
  migrationId: number;
  /** repo_name parameter */
  repoName: string;
};
export type MigrationsListReposForAuthenticatedUserApiResponse =
  /** status 200 Response */ MinimalRepository[];
export type MigrationsListReposForAuthenticatedUserApiArg = {
  /** migration_id parameter */
  migrationId: number;
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
};
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
export type Migration = {
  id: number;
  owner: SimpleUser;
  guid: string;
  state: string;
  lock_repositories: boolean;
  exclude_metadata: boolean;
  exclude_git_data: boolean;
  exclude_attachments: boolean;
  exclude_releases: boolean;
  exclude_owner_projects: boolean;
  repositories: Repository[];
  url: string;
  created_at: string;
  updated_at: string;
  node_id: string;
  archive_url?: string;
  exclude?: any[];
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
export type Repository2 = {
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
  template_repository?: Repository2;
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
export type Import = {
  vcs: string | null;
  use_lfs?: boolean;
  vcs_url: string;
  svc_root?: string;
  tfvc_project?: string;
  status:
    | "auth"
    | "error"
    | "none"
    | "detecting"
    | "choose"
    | "auth_failed"
    | "importing"
    | "mapping"
    | "waiting_to_push"
    | "pushing"
    | "complete"
    | "setup"
    | "unknown"
    | "detection_found_multiple"
    | "detection_found_nothing"
    | "detection_needs_auth";
  status_text?: string | null;
  failed_step?: string | null;
  error_message?: string | null;
  import_percent?: number | null;
  commit_count?: number | null;
  push_percent?: number | null;
  has_large_files?: boolean;
  large_files_size?: number;
  large_files_count?: number;
  project_choices?: {
    vcs?: string;
    tfvc_project?: string;
    human_name?: string;
  }[];
  message?: string;
  authors_count?: number | null;
  url: string;
  html_url: string;
  authors_url: string;
  repository_url: string;
  svn_root?: string;
};
export type PorterAuthor = {
  id: number;
  remote_id: string;
  remote_name: string;
  email: string;
  name: string;
  url: string;
  import_url: string;
};
export type PorterLargeFile = {
  ref_name: string;
  path: string;
  oid: string;
  size: number;
};
export const {
  useMigrationsListForOrgQuery,
  useMigrationsStartForOrgMutation,
  useMigrationsGetStatusForOrgQuery,
  useMigrationsDownloadArchiveForOrgQuery,
  useMigrationsDeleteArchiveForOrgMutation,
  useMigrationsUnlockRepoForOrgMutation,
  useMigrationsListReposForOrgQuery,
  useMigrationsGetImportStatusQuery,
  useMigrationsStartImportMutation,
  useMigrationsUpdateImportMutation,
  useMigrationsCancelImportMutation,
  useMigrationsGetCommitAuthorsQuery,
  useMigrationsMapCommitAuthorMutation,
  useMigrationsGetLargeFilesQuery,
  useMigrationsSetLfsPreferenceMutation,
  useMigrationsListForAuthenticatedUserQuery,
  useMigrationsStartForAuthenticatedUserMutation,
  useMigrationsGetStatusForAuthenticatedUserQuery,
  useMigrationsGetArchiveForAuthenticatedUserQuery,
  useMigrationsDeleteArchiveForAuthenticatedUserMutation,
  useMigrationsUnlockRepoForAuthenticatedUserMutation,
  useMigrationsListReposForAuthenticatedUserQuery,
} = injectedRtkApi;
