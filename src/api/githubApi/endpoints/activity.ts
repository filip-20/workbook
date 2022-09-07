import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    activityListPublicEvents: build.query<
      ActivityListPublicEventsApiResponse,
      ActivityListPublicEventsApiArg
    >({
      query: (queryArg) => ({
        url: `/events`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    activityGetFeeds: build.query<
      ActivityGetFeedsApiResponse,
      ActivityGetFeedsApiArg
    >({
      query: () => ({ url: `/feeds` }),
    }),
    activityListPublicEventsForRepoNetwork: build.query<
      ActivityListPublicEventsForRepoNetworkApiResponse,
      ActivityListPublicEventsForRepoNetworkApiArg
    >({
      query: (queryArg) => ({
        url: `/networks/${queryArg.owner}/${queryArg.repo}/events`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    activityListNotificationsForAuthenticatedUser: build.query<
      ActivityListNotificationsForAuthenticatedUserApiResponse,
      ActivityListNotificationsForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/notifications`,
        params: {
          all: queryArg.all,
          participating: queryArg.participating,
          since: queryArg.since,
          before: queryArg.before,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    activityMarkNotificationsAsRead: build.mutation<
      ActivityMarkNotificationsAsReadApiResponse,
      ActivityMarkNotificationsAsReadApiArg
    >({
      query: (queryArg) => ({
        url: `/notifications`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    activityGetThread: build.query<
      ActivityGetThreadApiResponse,
      ActivityGetThreadApiArg
    >({
      query: (queryArg) => ({
        url: `/notifications/threads/${queryArg.threadId}`,
      }),
    }),
    activityMarkThreadAsRead: build.mutation<
      ActivityMarkThreadAsReadApiResponse,
      ActivityMarkThreadAsReadApiArg
    >({
      query: (queryArg) => ({
        url: `/notifications/threads/${queryArg.threadId}`,
        method: "PATCH",
      }),
    }),
    activityGetThreadSubscriptionForAuthenticatedUser: build.query<
      ActivityGetThreadSubscriptionForAuthenticatedUserApiResponse,
      ActivityGetThreadSubscriptionForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/notifications/threads/${queryArg.threadId}/subscription`,
      }),
    }),
    activitySetThreadSubscription: build.mutation<
      ActivitySetThreadSubscriptionApiResponse,
      ActivitySetThreadSubscriptionApiArg
    >({
      query: (queryArg) => ({
        url: `/notifications/threads/${queryArg.threadId}/subscription`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    activityDeleteThreadSubscription: build.mutation<
      ActivityDeleteThreadSubscriptionApiResponse,
      ActivityDeleteThreadSubscriptionApiArg
    >({
      query: (queryArg) => ({
        url: `/notifications/threads/${queryArg.threadId}/subscription`,
        method: "DELETE",
      }),
    }),
    activityListPublicOrgEvents: build.query<
      ActivityListPublicOrgEventsApiResponse,
      ActivityListPublicOrgEventsApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/events`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    activityListRepoEvents: build.query<
      ActivityListRepoEventsApiResponse,
      ActivityListRepoEventsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/events`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    activityListRepoNotificationsForAuthenticatedUser: build.query<
      ActivityListRepoNotificationsForAuthenticatedUserApiResponse,
      ActivityListRepoNotificationsForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/notifications`,
        params: {
          all: queryArg.all,
          participating: queryArg.participating,
          since: queryArg.since,
          before: queryArg.before,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    activityMarkRepoNotificationsAsRead: build.mutation<
      ActivityMarkRepoNotificationsAsReadApiResponse,
      ActivityMarkRepoNotificationsAsReadApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/notifications`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    activityListStargazersForRepo: build.query<
      ActivityListStargazersForRepoApiResponse,
      ActivityListStargazersForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/stargazers`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    activityListWatchersForRepo: build.query<
      ActivityListWatchersForRepoApiResponse,
      ActivityListWatchersForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/subscribers`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    activityGetRepoSubscription: build.query<
      ActivityGetRepoSubscriptionApiResponse,
      ActivityGetRepoSubscriptionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/subscription`,
      }),
    }),
    activitySetRepoSubscription: build.mutation<
      ActivitySetRepoSubscriptionApiResponse,
      ActivitySetRepoSubscriptionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/subscription`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    activityDeleteRepoSubscription: build.mutation<
      ActivityDeleteRepoSubscriptionApiResponse,
      ActivityDeleteRepoSubscriptionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/subscription`,
        method: "DELETE",
      }),
    }),
    activityListReposStarredByAuthenticatedUser: build.query<
      ActivityListReposStarredByAuthenticatedUserApiResponse,
      ActivityListReposStarredByAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/starred`,
        params: {
          sort: queryArg.sort,
          direction: queryArg.direction,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    activityCheckRepoIsStarredByAuthenticatedUser: build.query<
      ActivityCheckRepoIsStarredByAuthenticatedUserApiResponse,
      ActivityCheckRepoIsStarredByAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/starred/${queryArg.owner}/${queryArg.repo}`,
      }),
    }),
    activityStarRepoForAuthenticatedUser: build.mutation<
      ActivityStarRepoForAuthenticatedUserApiResponse,
      ActivityStarRepoForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/starred/${queryArg.owner}/${queryArg.repo}`,
        method: "PUT",
      }),
    }),
    activityUnstarRepoForAuthenticatedUser: build.mutation<
      ActivityUnstarRepoForAuthenticatedUserApiResponse,
      ActivityUnstarRepoForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/starred/${queryArg.owner}/${queryArg.repo}`,
        method: "DELETE",
      }),
    }),
    activityListWatchedReposForAuthenticatedUser: build.query<
      ActivityListWatchedReposForAuthenticatedUserApiResponse,
      ActivityListWatchedReposForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/subscriptions`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    activityListEventsForAuthenticatedUser: build.query<
      ActivityListEventsForAuthenticatedUserApiResponse,
      ActivityListEventsForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/events`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    activityListOrgEventsForAuthenticatedUser: build.query<
      ActivityListOrgEventsForAuthenticatedUserApiResponse,
      ActivityListOrgEventsForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/events/orgs/${queryArg.org}`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    activityListPublicEventsForUser: build.query<
      ActivityListPublicEventsForUserApiResponse,
      ActivityListPublicEventsForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/events/public`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    activityListReceivedEventsForUser: build.query<
      ActivityListReceivedEventsForUserApiResponse,
      ActivityListReceivedEventsForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/received_events`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    activityListReceivedPublicEventsForUser: build.query<
      ActivityListReceivedPublicEventsForUserApiResponse,
      ActivityListReceivedPublicEventsForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/received_events/public`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    activityListReposStarredByUser: build.query<
      ActivityListReposStarredByUserApiResponse,
      ActivityListReposStarredByUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/starred`,
        params: {
          sort: queryArg.sort,
          direction: queryArg.direction,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    activityListReposWatchedByUser: build.query<
      ActivityListReposWatchedByUserApiResponse,
      ActivityListReposWatchedByUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/subscriptions`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type ActivityListPublicEventsApiResponse =
  /** status 200 Response */ Event[];
export type ActivityListPublicEventsApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActivityGetFeedsApiResponse = /** status 200 Response */ Feed;
export type ActivityGetFeedsApiArg = void;
export type ActivityListPublicEventsForRepoNetworkApiResponse =
  /** status 200 Response */ Event[];
export type ActivityListPublicEventsForRepoNetworkApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActivityListNotificationsForAuthenticatedUserApiResponse =
  /** status 200 Response */ Thread[];
export type ActivityListNotificationsForAuthenticatedUserApiArg = {
  /** If `true`, show notifications marked as read. */
  all?: boolean;
  /** If `true`, only shows notifications in which the user is directly participating or mentioned. */
  participating?: boolean;
  /** Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** Only show notifications updated before the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  before?: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActivityMarkNotificationsAsReadApiResponse =
  /** status 202 Response */
    | {
        message?: string;
      }
    | /** status 205 Reset Content */ undefined;
export type ActivityMarkNotificationsAsReadApiArg = {
  body: {
    last_read_at?: string;
    read?: boolean;
  };
};
export type ActivityGetThreadApiResponse = /** status 200 Response */ Thread;
export type ActivityGetThreadApiArg = {
  /** thread_id parameter */
  threadId: number;
};
export type ActivityMarkThreadAsReadApiResponse =
  /** status 205 Reset Content */ undefined;
export type ActivityMarkThreadAsReadApiArg = {
  /** thread_id parameter */
  threadId: number;
};
export type ActivityGetThreadSubscriptionForAuthenticatedUserApiResponse =
  /** status 200 Response */ ThreadSubscription;
export type ActivityGetThreadSubscriptionForAuthenticatedUserApiArg = {
  /** thread_id parameter */
  threadId: number;
};
export type ActivitySetThreadSubscriptionApiResponse =
  /** status 200 Response */ ThreadSubscription;
export type ActivitySetThreadSubscriptionApiArg = {
  /** thread_id parameter */
  threadId: number;
  body: {
    ignored?: boolean;
  };
};
export type ActivityDeleteThreadSubscriptionApiResponse =
  /** status 204 Response */ undefined;
export type ActivityDeleteThreadSubscriptionApiArg = {
  /** thread_id parameter */
  threadId: number;
};
export type ActivityListPublicOrgEventsApiResponse =
  /** status 200 Response */ Event[];
export type ActivityListPublicOrgEventsApiArg = {
  org: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActivityListRepoEventsApiResponse =
  /** status 200 Response */ Event[];
export type ActivityListRepoEventsApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActivityListRepoNotificationsForAuthenticatedUserApiResponse =
  /** status 200 Response */ Thread[];
export type ActivityListRepoNotificationsForAuthenticatedUserApiArg = {
  owner: string;
  repo: string;
  /** If `true`, show notifications marked as read. */
  all?: boolean;
  /** If `true`, only shows notifications in which the user is directly participating or mentioned. */
  participating?: boolean;
  /** Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** Only show notifications updated before the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  before?: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActivityMarkRepoNotificationsAsReadApiResponse =
  /** status 202 Response */
    | {
        message?: string;
        url?: string;
      }
    | /** status 205 Reset Content */ undefined;
export type ActivityMarkRepoNotificationsAsReadApiArg = {
  owner: string;
  repo: string;
  body: {
    last_read_at?: string;
  };
};
export type ActivityListStargazersForRepoApiResponse =
  /** status 200 Response */ SimpleUser2[] | Stargazer[];
export type ActivityListStargazersForRepoApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActivityListWatchersForRepoApiResponse =
  /** status 200 Response */ SimpleUser2[];
export type ActivityListWatchersForRepoApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActivityGetRepoSubscriptionApiResponse =
  /** status 200 if you subscribe to the repository */ RepositoryInvitation;
export type ActivityGetRepoSubscriptionApiArg = {
  owner: string;
  repo: string;
};
export type ActivitySetRepoSubscriptionApiResponse =
  /** status 200 Response */ RepositoryInvitation;
export type ActivitySetRepoSubscriptionApiArg = {
  owner: string;
  repo: string;
  body: {
    subscribed?: boolean;
    ignored?: boolean;
  };
};
export type ActivityDeleteRepoSubscriptionApiResponse = unknown;
export type ActivityDeleteRepoSubscriptionApiArg = {
  owner: string;
  repo: string;
};
export type ActivityListReposStarredByAuthenticatedUserApiResponse =
  /** status 200 Response */ Repository[];
export type ActivityListReposStarredByAuthenticatedUserApiArg = {
  /** One of `created` (when the repository was starred) or `updated` (when it was last pushed to). */
  sort?: "created" | "updated";
  /** One of `asc` (ascending) or `desc` (descending). */
  direction?: "asc" | "desc";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActivityCheckRepoIsStarredByAuthenticatedUserApiResponse =
  /** status 204 Response if this repository is starred by you */ undefined;
export type ActivityCheckRepoIsStarredByAuthenticatedUserApiArg = {
  owner: string;
  repo: string;
};
export type ActivityStarRepoForAuthenticatedUserApiResponse =
  /** status 204 Response */ undefined;
export type ActivityStarRepoForAuthenticatedUserApiArg = {
  owner: string;
  repo: string;
};
export type ActivityUnstarRepoForAuthenticatedUserApiResponse =
  /** status 204 Response */ undefined;
export type ActivityUnstarRepoForAuthenticatedUserApiArg = {
  owner: string;
  repo: string;
};
export type ActivityListWatchedReposForAuthenticatedUserApiResponse =
  /** status 200 Response */ MinimalRepository[];
export type ActivityListWatchedReposForAuthenticatedUserApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActivityListEventsForAuthenticatedUserApiResponse =
  /** status 200 Response */ Event[];
export type ActivityListEventsForAuthenticatedUserApiArg = {
  username: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActivityListOrgEventsForAuthenticatedUserApiResponse =
  /** status 200 Response */ Event[];
export type ActivityListOrgEventsForAuthenticatedUserApiArg = {
  username: string;
  org: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActivityListPublicEventsForUserApiResponse =
  /** status 200 Response */ Event[];
export type ActivityListPublicEventsForUserApiArg = {
  username: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActivityListReceivedEventsForUserApiResponse =
  /** status 200 Response */ Event[];
export type ActivityListReceivedEventsForUserApiArg = {
  username: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActivityListReceivedPublicEventsForUserApiResponse =
  /** status 200 Response */ Event[];
export type ActivityListReceivedPublicEventsForUserApiArg = {
  username: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActivityListReposStarredByUserApiResponse =
  /** status 200 Response */ StarredRepository[] | Repository[];
export type ActivityListReposStarredByUserApiArg = {
  username: string;
  /** One of `created` (when the repository was starred) or `updated` (when it was last pushed to). */
  sort?: "created" | "updated";
  /** One of `asc` (ascending) or `desc` (descending). */
  direction?: "asc" | "desc";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActivityListReposWatchedByUserApiResponse =
  /** status 200 Response */ MinimalRepository[];
export type ActivityListReposWatchedByUserApiArg = {
  username: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type Actor = {
  id: number;
  login: string;
  display_login?: string;
  gravatar_id: string | null;
  url: string;
  avatar_url: string;
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
export type AuthorAssociation =
  | "COLLABORATOR"
  | "CONTRIBUTOR"
  | "FIRST_TIMER"
  | "FIRST_TIME_CONTRIBUTOR"
  | "MANNEQUIN"
  | "MEMBER"
  | "NONE"
  | "OWNER";
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
export type Issue = {
  id: number;
  node_id: string;
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  number: number;
  state: string;
  title: string;
  body?: string | null;
  user: SimpleUser;
  labels: (
    | string
    | {
        id?: number;
        node_id?: string;
        url?: string;
        name?: string;
        description?: string | null;
        color?: string | null;
        default?: boolean;
      }
  )[];
  assignee: SimpleUser;
  assignees?: SimpleUser2[] | null;
  milestone: Milestone;
  locked: boolean;
  active_lock_reason?: string | null;
  comments: number;
  pull_request?: {
    merged_at?: string | null;
    diff_url: string | null;
    html_url: string | null;
    patch_url: string | null;
    url: string | null;
  };
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  draft?: boolean;
  closed_by?: SimpleUser;
  body_html?: string;
  body_text?: string;
  timeline_url?: string;
  repository?: Repository;
  performed_via_github_app?: GitHubApp;
  author_association: AuthorAssociation;
  reactions?: ReactionRollup;
};
export type IssueComment = {
  id: number;
  node_id: string;
  url: string;
  body?: string;
  body_text?: string;
  body_html?: string;
  html_url: string;
  user: SimpleUser;
  created_at: string;
  updated_at: string;
  issue_url: string;
  author_association: AuthorAssociation;
  performed_via_github_app?: GitHubApp;
  reactions?: ReactionRollup;
};
export type Event = {
  id: string;
  type: string | null;
  actor: Actor;
  repo: {
    id: number;
    name: string;
    url: string;
  };
  org?: Actor;
  payload: {
    action?: string;
    issue?: Issue;
    comment?: IssueComment;
    pages?: {
      page_name?: string;
      title?: string;
      summary?: string | null;
      action?: string;
      sha?: string;
      html_url?: string;
    }[];
  };
  public: boolean;
  created_at: string | null;
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
};
export type LinkWithType = {
  href: string;
  type: string;
};
export type Feed = {
  timeline_url: string;
  user_url: string;
  current_user_public_url?: string;
  current_user_url?: string;
  current_user_actor_url?: string;
  current_user_organization_url?: string;
  current_user_organization_urls?: string[];
  security_advisories_url?: string;
  _links: {
    timeline: LinkWithType;
    user: LinkWithType;
    security_advisories?: LinkWithType;
    current_user?: LinkWithType;
    current_user_public?: LinkWithType;
    current_user_actor?: LinkWithType;
    current_user_organization?: LinkWithType;
    current_user_organizations?: LinkWithType[];
  };
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
export type Thread = {
  id: string;
  repository: MinimalRepository;
  subject: {
    title: string;
    url: string;
    latest_comment_url: string;
    type: string;
  };
  reason: string;
  unread: boolean;
  updated_at: string;
  last_read_at: string | null;
  url: string;
  subscription_url: string;
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
export type ThreadSubscription = {
  subscribed: boolean;
  ignored: boolean;
  reason: string | null;
  created_at: string | null;
  url: string;
  thread_url?: string;
  repository_url?: string;
};
export type Stargazer = {
  starred_at: string;
  user: SimpleUser;
};
export type RepositoryInvitation = {
  subscribed: boolean;
  ignored: boolean;
  reason: string | null;
  created_at: string;
  url: string;
  repository_url: string;
};
export type StarredRepository = {
  starred_at: string;
  repo: Repository;
};
export const {
  useActivityListPublicEventsQuery,
  useActivityGetFeedsQuery,
  useActivityListPublicEventsForRepoNetworkQuery,
  useActivityListNotificationsForAuthenticatedUserQuery,
  useActivityMarkNotificationsAsReadMutation,
  useActivityGetThreadQuery,
  useActivityMarkThreadAsReadMutation,
  useActivityGetThreadSubscriptionForAuthenticatedUserQuery,
  useActivitySetThreadSubscriptionMutation,
  useActivityDeleteThreadSubscriptionMutation,
  useActivityListPublicOrgEventsQuery,
  useActivityListRepoEventsQuery,
  useActivityListRepoNotificationsForAuthenticatedUserQuery,
  useActivityMarkRepoNotificationsAsReadMutation,
  useActivityListStargazersForRepoQuery,
  useActivityListWatchersForRepoQuery,
  useActivityGetRepoSubscriptionQuery,
  useActivitySetRepoSubscriptionMutation,
  useActivityDeleteRepoSubscriptionMutation,
  useActivityListReposStarredByAuthenticatedUserQuery,
  useActivityCheckRepoIsStarredByAuthenticatedUserQuery,
  useActivityStarRepoForAuthenticatedUserMutation,
  useActivityUnstarRepoForAuthenticatedUserMutation,
  useActivityListWatchedReposForAuthenticatedUserQuery,
  useActivityListEventsForAuthenticatedUserQuery,
  useActivityListOrgEventsForAuthenticatedUserQuery,
  useActivityListPublicEventsForUserQuery,
  useActivityListReceivedEventsForUserQuery,
  useActivityListReceivedPublicEventsForUserQuery,
  useActivityListReposStarredByUserQuery,
  useActivityListReposWatchedByUserQuery,
} = injectedRtkApi;
