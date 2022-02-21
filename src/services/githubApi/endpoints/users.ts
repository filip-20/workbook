import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    usersGetAuthenticated: build.query<
      UsersGetAuthenticatedApiResponse,
      UsersGetAuthenticatedApiArg
    >({
      query: () => ({ url: `/user` }),
    }),
    usersUpdateAuthenticated: build.mutation<
      UsersUpdateAuthenticatedApiResponse,
      UsersUpdateAuthenticatedApiArg
    >({
      query: (queryArg) => ({
        url: `/user`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    usersListBlockedByAuthenticatedUser: build.query<
      UsersListBlockedByAuthenticatedUserApiResponse,
      UsersListBlockedByAuthenticatedUserApiArg
    >({
      query: () => ({ url: `/user/blocks` }),
    }),
    usersCheckBlocked: build.query<
      UsersCheckBlockedApiResponse,
      UsersCheckBlockedApiArg
    >({
      query: (queryArg) => ({ url: `/user/blocks/${queryArg.username}` }),
    }),
    usersBlock: build.mutation<UsersBlockApiResponse, UsersBlockApiArg>({
      query: (queryArg) => ({
        url: `/user/blocks/${queryArg.username}`,
        method: "PUT",
      }),
    }),
    usersUnblock: build.mutation<UsersUnblockApiResponse, UsersUnblockApiArg>({
      query: (queryArg) => ({
        url: `/user/blocks/${queryArg.username}`,
        method: "DELETE",
      }),
    }),
    usersSetPrimaryEmailVisibilityForAuthenticatedUser: build.mutation<
      UsersSetPrimaryEmailVisibilityForAuthenticatedUserApiResponse,
      UsersSetPrimaryEmailVisibilityForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/email/visibility`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    usersListEmailsForAuthenticatedUser: build.query<
      UsersListEmailsForAuthenticatedUserApiResponse,
      UsersListEmailsForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/emails`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    usersAddEmailForAuthenticatedUser: build.mutation<
      UsersAddEmailForAuthenticatedUserApiResponse,
      UsersAddEmailForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/emails`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    usersDeleteEmailForAuthenticatedUser: build.mutation<
      UsersDeleteEmailForAuthenticatedUserApiResponse,
      UsersDeleteEmailForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/emails`,
        method: "DELETE",
        body: queryArg.body,
      }),
    }),
    usersListFollowersForAuthenticatedUser: build.query<
      UsersListFollowersForAuthenticatedUserApiResponse,
      UsersListFollowersForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/followers`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    usersListFollowedByAuthenticatedUser: build.query<
      UsersListFollowedByAuthenticatedUserApiResponse,
      UsersListFollowedByAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/following`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    usersCheckPersonIsFollowedByAuthenticated: build.query<
      UsersCheckPersonIsFollowedByAuthenticatedApiResponse,
      UsersCheckPersonIsFollowedByAuthenticatedApiArg
    >({
      query: (queryArg) => ({ url: `/user/following/${queryArg.username}` }),
    }),
    usersFollow: build.mutation<UsersFollowApiResponse, UsersFollowApiArg>({
      query: (queryArg) => ({
        url: `/user/following/${queryArg.username}`,
        method: "PUT",
      }),
    }),
    usersUnfollow: build.mutation<
      UsersUnfollowApiResponse,
      UsersUnfollowApiArg
    >({
      query: (queryArg) => ({
        url: `/user/following/${queryArg.username}`,
        method: "DELETE",
      }),
    }),
    usersListGpgKeysForAuthenticatedUser: build.query<
      UsersListGpgKeysForAuthenticatedUserApiResponse,
      UsersListGpgKeysForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/gpg_keys`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    usersCreateGpgKeyForAuthenticatedUser: build.mutation<
      UsersCreateGpgKeyForAuthenticatedUserApiResponse,
      UsersCreateGpgKeyForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/gpg_keys`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    usersGetGpgKeyForAuthenticatedUser: build.query<
      UsersGetGpgKeyForAuthenticatedUserApiResponse,
      UsersGetGpgKeyForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({ url: `/user/gpg_keys/${queryArg.gpgKeyId}` }),
    }),
    usersDeleteGpgKeyForAuthenticatedUser: build.mutation<
      UsersDeleteGpgKeyForAuthenticatedUserApiResponse,
      UsersDeleteGpgKeyForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/gpg_keys/${queryArg.gpgKeyId}`,
        method: "DELETE",
      }),
    }),
    usersListPublicSshKeysForAuthenticatedUser: build.query<
      UsersListPublicSshKeysForAuthenticatedUserApiResponse,
      UsersListPublicSshKeysForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/keys`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    usersCreatePublicSshKeyForAuthenticatedUser: build.mutation<
      UsersCreatePublicSshKeyForAuthenticatedUserApiResponse,
      UsersCreatePublicSshKeyForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/keys`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    usersGetPublicSshKeyForAuthenticatedUser: build.query<
      UsersGetPublicSshKeyForAuthenticatedUserApiResponse,
      UsersGetPublicSshKeyForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({ url: `/user/keys/${queryArg.keyId}` }),
    }),
    usersDeletePublicSshKeyForAuthenticatedUser: build.mutation<
      UsersDeletePublicSshKeyForAuthenticatedUserApiResponse,
      UsersDeletePublicSshKeyForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/keys/${queryArg.keyId}`,
        method: "DELETE",
      }),
    }),
    usersListPublicEmailsForAuthenticatedUser: build.query<
      UsersListPublicEmailsForAuthenticatedUserApiResponse,
      UsersListPublicEmailsForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/public_emails`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    usersList: build.query<UsersListApiResponse, UsersListApiArg>({
      query: (queryArg) => ({
        url: `/users`,
        params: { since: queryArg.since, per_page: queryArg.perPage },
      }),
    }),
    usersGetByUsername: build.query<
      UsersGetByUsernameApiResponse,
      UsersGetByUsernameApiArg
    >({
      query: (queryArg) => ({ url: `/users/${queryArg.username}` }),
    }),
    usersListFollowersForUser: build.query<
      UsersListFollowersForUserApiResponse,
      UsersListFollowersForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/followers`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    usersListFollowingForUser: build.query<
      UsersListFollowingForUserApiResponse,
      UsersListFollowingForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/following`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    usersCheckFollowingForUser: build.query<
      UsersCheckFollowingForUserApiResponse,
      UsersCheckFollowingForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/following/${queryArg.targetUser}`,
      }),
    }),
    usersListGpgKeysForUser: build.query<
      UsersListGpgKeysForUserApiResponse,
      UsersListGpgKeysForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/gpg_keys`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    usersGetContextForUser: build.query<
      UsersGetContextForUserApiResponse,
      UsersGetContextForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/hovercard`,
        params: {
          subject_type: queryArg.subjectType,
          subject_id: queryArg.subjectId,
        },
      }),
    }),
    usersListPublicKeysForUser: build.query<
      UsersListPublicKeysForUserApiResponse,
      UsersListPublicKeysForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/keys`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type UsersGetAuthenticatedApiResponse = /** status 200 Response */
  | PrivateUser
  | PublicUser;
export type UsersGetAuthenticatedApiArg = void;
export type UsersUpdateAuthenticatedApiResponse =
  /** status 200 Response */ PrivateUser;
export type UsersUpdateAuthenticatedApiArg = {
  body: {
    name?: string;
    email?: string;
    blog?: string;
    twitter_username?: string | null;
    company?: string;
    location?: string;
    hireable?: boolean;
    bio?: string;
  };
};
export type UsersListBlockedByAuthenticatedUserApiResponse =
  /** status 200 Response */ SimpleUser[];
export type UsersListBlockedByAuthenticatedUserApiArg = void;
export type UsersCheckBlockedApiResponse =
  /** status 204 If the user is blocked: */ undefined;
export type UsersCheckBlockedApiArg = {
  username: string;
};
export type UsersBlockApiResponse = /** status 204 Response */ undefined;
export type UsersBlockApiArg = {
  username: string;
};
export type UsersUnblockApiResponse = /** status 204 Response */ undefined;
export type UsersUnblockApiArg = {
  username: string;
};
export type UsersSetPrimaryEmailVisibilityForAuthenticatedUserApiResponse =
  /** status 200 Response */ Email[];
export type UsersSetPrimaryEmailVisibilityForAuthenticatedUserApiArg = {
  body: {
    visibility: "public" | "private";
  };
};
export type UsersListEmailsForAuthenticatedUserApiResponse =
  /** status 200 Response */ Email[];
export type UsersListEmailsForAuthenticatedUserApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type UsersAddEmailForAuthenticatedUserApiResponse =
  /** status 201 Response */ Email[];
export type UsersAddEmailForAuthenticatedUserApiArg = {
  body:
    | {
        emails: string[];
      }
    | string[]
    | string;
};
export type UsersDeleteEmailForAuthenticatedUserApiResponse =
  /** status 204 Response */ undefined;
export type UsersDeleteEmailForAuthenticatedUserApiArg = {
  body:
    | {
        emails: string[];
      }
    | string[]
    | string;
};
export type UsersListFollowersForAuthenticatedUserApiResponse =
  /** status 200 Response */ SimpleUser[];
export type UsersListFollowersForAuthenticatedUserApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type UsersListFollowedByAuthenticatedUserApiResponse =
  /** status 200 Response */ SimpleUser[];
export type UsersListFollowedByAuthenticatedUserApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type UsersCheckPersonIsFollowedByAuthenticatedApiResponse =
  /** status 204 if the person is followed by the authenticated user */ undefined;
export type UsersCheckPersonIsFollowedByAuthenticatedApiArg = {
  username: string;
};
export type UsersFollowApiResponse = /** status 204 Response */ undefined;
export type UsersFollowApiArg = {
  username: string;
};
export type UsersUnfollowApiResponse = /** status 204 Response */ undefined;
export type UsersUnfollowApiArg = {
  username: string;
};
export type UsersListGpgKeysForAuthenticatedUserApiResponse =
  /** status 200 Response */ GpgKey[];
export type UsersListGpgKeysForAuthenticatedUserApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type UsersCreateGpgKeyForAuthenticatedUserApiResponse =
  /** status 201 Response */ GpgKey;
export type UsersCreateGpgKeyForAuthenticatedUserApiArg = {
  body: {
    armored_public_key: string;
  };
};
export type UsersGetGpgKeyForAuthenticatedUserApiResponse =
  /** status 200 Response */ GpgKey;
export type UsersGetGpgKeyForAuthenticatedUserApiArg = {
  /** gpg_key_id parameter */
  gpgKeyId: number;
};
export type UsersDeleteGpgKeyForAuthenticatedUserApiResponse =
  /** status 204 Response */ undefined;
export type UsersDeleteGpgKeyForAuthenticatedUserApiArg = {
  /** gpg_key_id parameter */
  gpgKeyId: number;
};
export type UsersListPublicSshKeysForAuthenticatedUserApiResponse =
  /** status 200 Response */ Key[];
export type UsersListPublicSshKeysForAuthenticatedUserApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type UsersCreatePublicSshKeyForAuthenticatedUserApiResponse =
  /** status 201 Response */ Key;
export type UsersCreatePublicSshKeyForAuthenticatedUserApiArg = {
  body: {
    title?: string;
    key: string;
  };
};
export type UsersGetPublicSshKeyForAuthenticatedUserApiResponse =
  /** status 200 Response */ Key;
export type UsersGetPublicSshKeyForAuthenticatedUserApiArg = {
  /** key_id parameter */
  keyId: number;
};
export type UsersDeletePublicSshKeyForAuthenticatedUserApiResponse =
  /** status 204 Response */ undefined;
export type UsersDeletePublicSshKeyForAuthenticatedUserApiArg = {
  /** key_id parameter */
  keyId: number;
};
export type UsersListPublicEmailsForAuthenticatedUserApiResponse =
  /** status 200 Response */ Email[];
export type UsersListPublicEmailsForAuthenticatedUserApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type UsersListApiResponse = /** status 200 Response */ SimpleUser[];
export type UsersListApiArg = {
  /** A user ID. Only return users with an ID greater than this ID. */
  since?: number;
  /** Results per page (max 100) */
  perPage?: number;
};
export type UsersGetByUsernameApiResponse = /** status 200 Response */
  | PrivateUser
  | PublicUser;
export type UsersGetByUsernameApiArg = {
  username: string;
};
export type UsersListFollowersForUserApiResponse =
  /** status 200 Response */ SimpleUser[];
export type UsersListFollowersForUserApiArg = {
  username: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type UsersListFollowingForUserApiResponse =
  /** status 200 Response */ SimpleUser[];
export type UsersListFollowingForUserApiArg = {
  username: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type UsersCheckFollowingForUserApiResponse = unknown;
export type UsersCheckFollowingForUserApiArg = {
  username: string;
  targetUser: string;
};
export type UsersListGpgKeysForUserApiResponse =
  /** status 200 Response */ GpgKey[];
export type UsersListGpgKeysForUserApiArg = {
  username: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type UsersGetContextForUserApiResponse =
  /** status 200 Response */ Hovercard;
export type UsersGetContextForUserApiArg = {
  username: string;
  /** Identifies which additional information you'd like to receive about the person's hovercard. Can be `organization`, `repository`, `issue`, `pull_request`. **Required** when using `subject_id`. */
  subjectType?: "organization" | "repository" | "issue" | "pull_request";
  /** Uses the ID for the `subject_type` you specified. **Required** when using `subject_type`. */
  subjectId?: string;
};
export type UsersListPublicKeysForUserApiResponse =
  /** status 200 Response */ KeySimple[];
export type UsersListPublicKeysForUserApiArg = {
  username: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type PrivateUser = {
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
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan?: {
    collaborators: number;
    name: string;
    space: number;
    private_repos: number;
  };
  suspended_at?: string | null;
  business_plus?: boolean;
  ldap_dn?: string;
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
export type Email = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
};
export type GpgKey = {
  id: number;
  primary_key_id: number | null;
  key_id: string;
  public_key: string;
  emails: {
    email?: string;
    verified?: boolean;
  }[];
  subkeys: {
    id?: number;
    primary_key_id?: number;
    key_id?: string;
    public_key?: string;
    emails?: any[];
    subkeys?: any[];
    can_sign?: boolean;
    can_encrypt_comms?: boolean;
    can_encrypt_storage?: boolean;
    can_certify?: boolean;
    created_at?: string;
    expires_at?: string | null;
    raw_key?: string | null;
  }[];
  can_sign: boolean;
  can_encrypt_comms: boolean;
  can_encrypt_storage: boolean;
  can_certify: boolean;
  created_at: string;
  expires_at: string | null;
  raw_key: string | null;
};
export type Key = {
  key: string;
  id: number;
  url: string;
  title: string;
  created_at: string;
  verified: boolean;
  read_only: boolean;
};
export type Hovercard = {
  contexts: {
    message: string;
    octicon: string;
  }[];
};
export type KeySimple = {
  id: number;
  key: string;
};
export const {
  useUsersGetAuthenticatedQuery,
  useUsersUpdateAuthenticatedMutation,
  useUsersListBlockedByAuthenticatedUserQuery,
  useUsersCheckBlockedQuery,
  useUsersBlockMutation,
  useUsersUnblockMutation,
  useUsersSetPrimaryEmailVisibilityForAuthenticatedUserMutation,
  useUsersListEmailsForAuthenticatedUserQuery,
  useUsersAddEmailForAuthenticatedUserMutation,
  useUsersDeleteEmailForAuthenticatedUserMutation,
  useUsersListFollowersForAuthenticatedUserQuery,
  useUsersListFollowedByAuthenticatedUserQuery,
  useUsersCheckPersonIsFollowedByAuthenticatedQuery,
  useUsersFollowMutation,
  useUsersUnfollowMutation,
  useUsersListGpgKeysForAuthenticatedUserQuery,
  useUsersCreateGpgKeyForAuthenticatedUserMutation,
  useUsersGetGpgKeyForAuthenticatedUserQuery,
  useUsersDeleteGpgKeyForAuthenticatedUserMutation,
  useUsersListPublicSshKeysForAuthenticatedUserQuery,
  useUsersCreatePublicSshKeyForAuthenticatedUserMutation,
  useUsersGetPublicSshKeyForAuthenticatedUserQuery,
  useUsersDeletePublicSshKeyForAuthenticatedUserMutation,
  useUsersListPublicEmailsForAuthenticatedUserQuery,
  useUsersListQuery,
  useUsersGetByUsernameQuery,
  useUsersListFollowersForUserQuery,
  useUsersListFollowingForUserQuery,
  useUsersCheckFollowingForUserQuery,
  useUsersListGpgKeysForUserQuery,
  useUsersGetContextForUserQuery,
  useUsersListPublicKeysForUserQuery,
} = injectedRtkApi;
