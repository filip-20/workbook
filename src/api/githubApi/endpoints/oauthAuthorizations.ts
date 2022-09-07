import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    oauthAuthorizationsListGrants: build.query<
      OauthAuthorizationsListGrantsApiResponse,
      OauthAuthorizationsListGrantsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/grants`,
        params: {
          per_page: queryArg.perPage,
          page: queryArg.page,
          client_id: queryArg.clientId,
        },
      }),
    }),
    oauthAuthorizationsGetGrant: build.query<
      OauthAuthorizationsGetGrantApiResponse,
      OauthAuthorizationsGetGrantApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/grants/${queryArg.grantId}`,
      }),
    }),
    oauthAuthorizationsDeleteGrant: build.mutation<
      OauthAuthorizationsDeleteGrantApiResponse,
      OauthAuthorizationsDeleteGrantApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/grants/${queryArg.grantId}`,
        method: "DELETE",
      }),
    }),
    oauthAuthorizationsListAuthorizations: build.query<
      OauthAuthorizationsListAuthorizationsApiResponse,
      OauthAuthorizationsListAuthorizationsApiArg
    >({
      query: (queryArg) => ({
        url: `/authorizations`,
        params: {
          per_page: queryArg.perPage,
          page: queryArg.page,
          client_id: queryArg.clientId,
        },
      }),
    }),
    oauthAuthorizationsCreateAuthorization: build.mutation<
      OauthAuthorizationsCreateAuthorizationApiResponse,
      OauthAuthorizationsCreateAuthorizationApiArg
    >({
      query: (queryArg) => ({
        url: `/authorizations`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    oauthAuthorizationsGetOrCreateAuthorizationForApp: build.mutation<
      OauthAuthorizationsGetOrCreateAuthorizationForAppApiResponse,
      OauthAuthorizationsGetOrCreateAuthorizationForAppApiArg
    >({
      query: (queryArg) => ({
        url: `/authorizations/clients/${queryArg.clientId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    oauthAuthorizationsGetOrCreateAuthorizationForAppAndFingerprint:
      build.mutation<
        OauthAuthorizationsGetOrCreateAuthorizationForAppAndFingerprintApiResponse,
        OauthAuthorizationsGetOrCreateAuthorizationForAppAndFingerprintApiArg
      >({
        query: (queryArg) => ({
          url: `/authorizations/clients/${queryArg.clientId}/${queryArg.fingerprint}`,
          method: "PUT",
          body: queryArg.body,
        }),
      }),
    oauthAuthorizationsGetAuthorization: build.query<
      OauthAuthorizationsGetAuthorizationApiResponse,
      OauthAuthorizationsGetAuthorizationApiArg
    >({
      query: (queryArg) => ({
        url: `/authorizations/${queryArg.authorizationId}`,
      }),
    }),
    oauthAuthorizationsUpdateAuthorization: build.mutation<
      OauthAuthorizationsUpdateAuthorizationApiResponse,
      OauthAuthorizationsUpdateAuthorizationApiArg
    >({
      query: (queryArg) => ({
        url: `/authorizations/${queryArg.authorizationId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    oauthAuthorizationsDeleteAuthorization: build.mutation<
      OauthAuthorizationsDeleteAuthorizationApiResponse,
      OauthAuthorizationsDeleteAuthorizationApiArg
    >({
      query: (queryArg) => ({
        url: `/authorizations/${queryArg.authorizationId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type OauthAuthorizationsListGrantsApiResponse =
  /** status 200 Response */ ApplicationGrant[];
export type OauthAuthorizationsListGrantsApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
  /** The client ID of your GitHub app. */
  clientId?: string;
};
export type OauthAuthorizationsGetGrantApiResponse =
  /** status 200 Response */ ApplicationGrant;
export type OauthAuthorizationsGetGrantApiArg = {
  /** grant_id parameter */
  grantId: number;
};
export type OauthAuthorizationsDeleteGrantApiResponse =
  /** status 204 Response */ undefined;
export type OauthAuthorizationsDeleteGrantApiArg = {
  /** grant_id parameter */
  grantId: number;
};
export type OauthAuthorizationsListAuthorizationsApiResponse =
  /** status 200 Response */ Authorization[];
export type OauthAuthorizationsListAuthorizationsApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
  /** The client ID of your GitHub app. */
  clientId?: string;
};
export type OauthAuthorizationsCreateAuthorizationApiResponse =
  /** status 201 Response */ Authorization;
export type OauthAuthorizationsCreateAuthorizationApiArg = {
  body: {
    scopes?: string[] | null;
    note?: string;
    note_url?: string;
    client_id?: string;
    client_secret?: string;
    fingerprint?: string;
  };
};
export type OauthAuthorizationsGetOrCreateAuthorizationForAppApiResponse =
  /** status 200 if returning an existing token */
    | Authorization
    | /** status 201 **Deprecation Notice:** GitHub will discontinue the [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations), which is used by integrations to create personal access tokens and OAuth tokens, and you must now create these tokens using our [web application flow](https://docs.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow). The [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations) will be removed on November, 13, 2020. For more information, including scheduled brownouts, see the [blog post](https://developer.github.com/changes/2020-02-14-deprecating-oauth-auth-endpoint/). */ Authorization;
export type OauthAuthorizationsGetOrCreateAuthorizationForAppApiArg = {
  /** The client ID of your GitHub app. */
  clientId: string;
  body: {
    client_secret: string;
    scopes?: string[] | null;
    note?: string;
    note_url?: string;
    fingerprint?: string;
  };
};
export type OauthAuthorizationsGetOrCreateAuthorizationForAppAndFingerprintApiResponse =
  /** status 200 if returning an existing token */
    | Authorization
    | /** status 201 Response if returning a new token */ Authorization;
export type OauthAuthorizationsGetOrCreateAuthorizationForAppAndFingerprintApiArg =
  {
    /** The client ID of your GitHub app. */
    clientId: string;
    fingerprint: string;
    body: {
      client_secret: string;
      scopes?: string[] | null;
      note?: string;
      note_url?: string;
    };
  };
export type OauthAuthorizationsGetAuthorizationApiResponse =
  /** status 200 Response */ Authorization;
export type OauthAuthorizationsGetAuthorizationApiArg = {
  /** authorization_id parameter */
  authorizationId: number;
};
export type OauthAuthorizationsUpdateAuthorizationApiResponse =
  /** status 200 Response */ Authorization;
export type OauthAuthorizationsUpdateAuthorizationApiArg = {
  /** authorization_id parameter */
  authorizationId: number;
  body: {
    scopes?: string[] | null;
    add_scopes?: string[];
    remove_scopes?: string[];
    note?: string;
    note_url?: string;
    fingerprint?: string;
  };
};
export type OauthAuthorizationsDeleteAuthorizationApiResponse =
  /** status 204 Response */ undefined;
export type OauthAuthorizationsDeleteAuthorizationApiArg = {
  /** authorization_id parameter */
  authorizationId: number;
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
export type ApplicationGrant = {
  id: number;
  url: string;
  app: {
    client_id: string;
    name: string;
    url: string;
  };
  created_at: string;
  updated_at: string;
  scopes: string[];
  user?: SimpleUser;
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
};
export type AppPermissions = {
  actions?: "read" | "write";
  administration?: "read" | "write";
  checks?: "read" | "write";
  contents?: "read" | "write";
  deployments?: "read" | "write";
  environments?: "read" | "write";
  issues?: "read" | "write";
  metadata?: "read" | "write";
  packages?: "read" | "write";
  pages?: "read" | "write";
  pull_requests?: "read" | "write";
  repository_hooks?: "read" | "write";
  repository_projects?: "read" | "write" | "admin";
  secret_scanning_alerts?: "read" | "write";
  secrets?: "read" | "write";
  security_events?: "read" | "write";
  single_file?: "read" | "write";
  statuses?: "read" | "write";
  vulnerability_alerts?: "read" | "write";
  workflows?: "write";
  members?: "read" | "write";
  organization_administration?: "read" | "write";
  organization_hooks?: "read" | "write";
  organization_plan?: "read";
  organization_projects?: "read" | "write" | "admin";
  organization_packages?: "read" | "write";
  organization_secrets?: "read" | "write";
  organization_self_hosted_runners?: "read" | "write";
  organization_user_blocking?: "read" | "write";
  team_discussions?: "read" | "write";
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
export type ScopedInstallation = {
  permissions: AppPermissions;
  repository_selection: "all" | "selected";
  single_file_name: string | null;
  has_multiple_single_files?: boolean;
  single_file_paths?: string[];
  repositories_url: string;
  account: SimpleUser2;
} | null;
export type Authorization = {
  id: number;
  url: string;
  scopes: string[] | null;
  token: string;
  token_last_eight: string | null;
  hashed_token: string | null;
  app: {
    client_id: string;
    name: string;
    url: string;
  };
  note: string | null;
  note_url: string | null;
  updated_at: string;
  created_at: string;
  fingerprint: string | null;
  user?: SimpleUser;
  installation?: ScopedInstallation;
  expires_at: string | null;
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
export const {
  useOauthAuthorizationsListGrantsQuery,
  useOauthAuthorizationsGetGrantQuery,
  useOauthAuthorizationsDeleteGrantMutation,
  useOauthAuthorizationsListAuthorizationsQuery,
  useOauthAuthorizationsCreateAuthorizationMutation,
  useOauthAuthorizationsGetOrCreateAuthorizationForAppMutation,
  useOauthAuthorizationsGetOrCreateAuthorizationForAppAndFingerprintMutation,
  useOauthAuthorizationsGetAuthorizationQuery,
  useOauthAuthorizationsUpdateAuthorizationMutation,
  useOauthAuthorizationsDeleteAuthorizationMutation,
} = injectedRtkApi;
