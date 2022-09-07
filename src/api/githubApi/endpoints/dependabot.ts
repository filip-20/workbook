import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    dependabotListOrgSecrets: build.query<
      DependabotListOrgSecretsApiResponse,
      DependabotListOrgSecretsApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/dependabot/secrets`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    dependabotGetOrgPublicKey: build.query<
      DependabotGetOrgPublicKeyApiResponse,
      DependabotGetOrgPublicKeyApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/dependabot/secrets/public-key`,
      }),
    }),
    dependabotGetOrgSecret: build.query<
      DependabotGetOrgSecretApiResponse,
      DependabotGetOrgSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/dependabot/secrets/${queryArg.secretName}`,
      }),
    }),
    dependabotCreateOrUpdateOrgSecret: build.mutation<
      DependabotCreateOrUpdateOrgSecretApiResponse,
      DependabotCreateOrUpdateOrgSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/dependabot/secrets/${queryArg.secretName}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    dependabotDeleteOrgSecret: build.mutation<
      DependabotDeleteOrgSecretApiResponse,
      DependabotDeleteOrgSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/dependabot/secrets/${queryArg.secretName}`,
        method: "DELETE",
      }),
    }),
    dependabotListSelectedReposForOrgSecret: build.query<
      DependabotListSelectedReposForOrgSecretApiResponse,
      DependabotListSelectedReposForOrgSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/dependabot/secrets/${queryArg.secretName}/repositories`,
        params: { page: queryArg.page, per_page: queryArg.perPage },
      }),
    }),
    dependabotSetSelectedReposForOrgSecret: build.mutation<
      DependabotSetSelectedReposForOrgSecretApiResponse,
      DependabotSetSelectedReposForOrgSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/dependabot/secrets/${queryArg.secretName}/repositories`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    dependabotAddSelectedRepoToOrgSecret: build.mutation<
      DependabotAddSelectedRepoToOrgSecretApiResponse,
      DependabotAddSelectedRepoToOrgSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/dependabot/secrets/${queryArg.secretName}/repositories/${queryArg.repositoryId}`,
        method: "PUT",
      }),
    }),
    dependabotRemoveSelectedRepoFromOrgSecret: build.mutation<
      DependabotRemoveSelectedRepoFromOrgSecretApiResponse,
      DependabotRemoveSelectedRepoFromOrgSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/dependabot/secrets/${queryArg.secretName}/repositories/${queryArg.repositoryId}`,
        method: "DELETE",
      }),
    }),
    dependabotListRepoSecrets: build.query<
      DependabotListRepoSecretsApiResponse,
      DependabotListRepoSecretsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/dependabot/secrets`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    dependabotGetRepoPublicKey: build.query<
      DependabotGetRepoPublicKeyApiResponse,
      DependabotGetRepoPublicKeyApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/dependabot/secrets/public-key`,
      }),
    }),
    dependabotGetRepoSecret: build.query<
      DependabotGetRepoSecretApiResponse,
      DependabotGetRepoSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/dependabot/secrets/${queryArg.secretName}`,
      }),
    }),
    dependabotCreateOrUpdateRepoSecret: build.mutation<
      DependabotCreateOrUpdateRepoSecretApiResponse,
      DependabotCreateOrUpdateRepoSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/dependabot/secrets/${queryArg.secretName}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    dependabotDeleteRepoSecret: build.mutation<
      DependabotDeleteRepoSecretApiResponse,
      DependabotDeleteRepoSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/dependabot/secrets/${queryArg.secretName}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type DependabotListOrgSecretsApiResponse = /** status 200 Response */ {
  total_count: number;
  secrets: DependabotSecretForAnOrganization[];
};
export type DependabotListOrgSecretsApiArg = {
  org: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type DependabotGetOrgPublicKeyApiResponse =
  /** status 200 Response */ DependabotPublicKey;
export type DependabotGetOrgPublicKeyApiArg = {
  org: string;
};
export type DependabotGetOrgSecretApiResponse =
  /** status 200 Response */ DependabotSecretForAnOrganization;
export type DependabotGetOrgSecretApiArg = {
  org: string;
  /** secret_name parameter */
  secretName: string;
};
export type DependabotCreateOrUpdateOrgSecretApiResponse =
  /** status 201 Response when creating a secret */
    | EmptyObject
    | /** status 204 Response when updating a secret */ undefined;
export type DependabotCreateOrUpdateOrgSecretApiArg = {
  org: string;
  /** secret_name parameter */
  secretName: string;
  body: {
    encrypted_value?: string;
    key_id?: string;
    visibility: "all" | "private" | "selected";
    selected_repository_ids?: string[];
  };
};
export type DependabotDeleteOrgSecretApiResponse = unknown;
export type DependabotDeleteOrgSecretApiArg = {
  org: string;
  /** secret_name parameter */
  secretName: string;
};
export type DependabotListSelectedReposForOrgSecretApiResponse =
  /** status 200 Response */ {
    total_count: number;
    repositories: MinimalRepository[];
  };
export type DependabotListSelectedReposForOrgSecretApiArg = {
  org: string;
  /** secret_name parameter */
  secretName: string;
  /** Page number of the results to fetch. */
  page?: number;
  /** Results per page (max 100) */
  perPage?: number;
};
export type DependabotSetSelectedReposForOrgSecretApiResponse = unknown;
export type DependabotSetSelectedReposForOrgSecretApiArg = {
  org: string;
  /** secret_name parameter */
  secretName: string;
  body: {
    selected_repository_ids: number[];
  };
};
export type DependabotAddSelectedRepoToOrgSecretApiResponse = unknown;
export type DependabotAddSelectedRepoToOrgSecretApiArg = {
  org: string;
  /** secret_name parameter */
  secretName: string;
  repositoryId: number;
};
export type DependabotRemoveSelectedRepoFromOrgSecretApiResponse = unknown;
export type DependabotRemoveSelectedRepoFromOrgSecretApiArg = {
  org: string;
  /** secret_name parameter */
  secretName: string;
  repositoryId: number;
};
export type DependabotListRepoSecretsApiResponse = /** status 200 Response */ {
  total_count: number;
  secrets: DependabotSecret[];
};
export type DependabotListRepoSecretsApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type DependabotGetRepoPublicKeyApiResponse =
  /** status 200 Response */ DependabotPublicKey;
export type DependabotGetRepoPublicKeyApiArg = {
  owner: string;
  repo: string;
};
export type DependabotGetRepoSecretApiResponse =
  /** status 200 Response */ DependabotSecret;
export type DependabotGetRepoSecretApiArg = {
  owner: string;
  repo: string;
  /** secret_name parameter */
  secretName: string;
};
export type DependabotCreateOrUpdateRepoSecretApiResponse =
  /** status 201 Response when creating a secret */
    | {}
    | /** status 204 Response when updating a secret */ undefined;
export type DependabotCreateOrUpdateRepoSecretApiArg = {
  owner: string;
  repo: string;
  /** secret_name parameter */
  secretName: string;
  body: {
    encrypted_value?: string;
    key_id?: string;
  };
};
export type DependabotDeleteRepoSecretApiResponse = unknown;
export type DependabotDeleteRepoSecretApiArg = {
  owner: string;
  repo: string;
  /** secret_name parameter */
  secretName: string;
};
export type DependabotSecretForAnOrganization = {
  name: string;
  created_at: string;
  updated_at: string;
  visibility: "all" | "private" | "selected";
  selected_repositories_url?: string;
};
export type DependabotPublicKey = {
  key_id: string;
  key: string;
};
export type EmptyObject = {};
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
export type DependabotSecret = {
  name: string;
  created_at: string;
  updated_at: string;
};
export const {
  useDependabotListOrgSecretsQuery,
  useDependabotGetOrgPublicKeyQuery,
  useDependabotGetOrgSecretQuery,
  useDependabotCreateOrUpdateOrgSecretMutation,
  useDependabotDeleteOrgSecretMutation,
  useDependabotListSelectedReposForOrgSecretQuery,
  useDependabotSetSelectedReposForOrgSecretMutation,
  useDependabotAddSelectedRepoToOrgSecretMutation,
  useDependabotRemoveSelectedRepoFromOrgSecretMutation,
  useDependabotListRepoSecretsQuery,
  useDependabotGetRepoPublicKeyQuery,
  useDependabotGetRepoSecretQuery,
  useDependabotCreateOrUpdateRepoSecretMutation,
  useDependabotDeleteRepoSecretMutation,
} = injectedRtkApi;
