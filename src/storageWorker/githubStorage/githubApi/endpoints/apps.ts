import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    appsGetAuthenticated: build.query<
      AppsGetAuthenticatedApiResponse,
      AppsGetAuthenticatedApiArg
    >({
      query: () => ({ url: `/app` }),
    }),
    appsCreateFromManifest: build.mutation<
      AppsCreateFromManifestApiResponse,
      AppsCreateFromManifestApiArg
    >({
      query: (queryArg) => ({
        url: `/app-manifests/${queryArg.code}/conversions`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    appsGetWebhookConfigForApp: build.query<
      AppsGetWebhookConfigForAppApiResponse,
      AppsGetWebhookConfigForAppApiArg
    >({
      query: () => ({ url: `/app/hook/config` }),
    }),
    appsUpdateWebhookConfigForApp: build.mutation<
      AppsUpdateWebhookConfigForAppApiResponse,
      AppsUpdateWebhookConfigForAppApiArg
    >({
      query: (queryArg) => ({
        url: `/app/hook/config`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    appsListWebhookDeliveries: build.query<
      AppsListWebhookDeliveriesApiResponse,
      AppsListWebhookDeliveriesApiArg
    >({
      query: (queryArg) => ({
        url: `/app/hook/deliveries`,
        params: { per_page: queryArg.perPage, cursor: queryArg.cursor },
      }),
    }),
    appsGetWebhookDelivery: build.query<
      AppsGetWebhookDeliveryApiResponse,
      AppsGetWebhookDeliveryApiArg
    >({
      query: (queryArg) => ({
        url: `/app/hook/deliveries/${queryArg.deliveryId}`,
      }),
    }),
    appsRedeliverWebhookDelivery: build.mutation<
      AppsRedeliverWebhookDeliveryApiResponse,
      AppsRedeliverWebhookDeliveryApiArg
    >({
      query: (queryArg) => ({
        url: `/app/hook/deliveries/${queryArg.deliveryId}/attempts`,
        method: "POST",
      }),
    }),
    appsListInstallations: build.query<
      AppsListInstallationsApiResponse,
      AppsListInstallationsApiArg
    >({
      query: (queryArg) => ({
        url: `/app/installations`,
        params: {
          per_page: queryArg.perPage,
          page: queryArg.page,
          since: queryArg.since,
          outdated: queryArg.outdated,
        },
      }),
    }),
    appsGetInstallation: build.query<
      AppsGetInstallationApiResponse,
      AppsGetInstallationApiArg
    >({
      query: (queryArg) => ({
        url: `/app/installations/${queryArg.installationId}`,
      }),
    }),
    appsDeleteInstallation: build.mutation<
      AppsDeleteInstallationApiResponse,
      AppsDeleteInstallationApiArg
    >({
      query: (queryArg) => ({
        url: `/app/installations/${queryArg.installationId}`,
        method: "DELETE",
      }),
    }),
    appsCreateInstallationAccessToken: build.mutation<
      AppsCreateInstallationAccessTokenApiResponse,
      AppsCreateInstallationAccessTokenApiArg
    >({
      query: (queryArg) => ({
        url: `/app/installations/${queryArg.installationId}/access_tokens`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    appsSuspendInstallation: build.mutation<
      AppsSuspendInstallationApiResponse,
      AppsSuspendInstallationApiArg
    >({
      query: (queryArg) => ({
        url: `/app/installations/${queryArg.installationId}/suspended`,
        method: "PUT",
      }),
    }),
    appsUnsuspendInstallation: build.mutation<
      AppsUnsuspendInstallationApiResponse,
      AppsUnsuspendInstallationApiArg
    >({
      query: (queryArg) => ({
        url: `/app/installations/${queryArg.installationId}/suspended`,
        method: "DELETE",
      }),
    }),
    appsDeleteAuthorization: build.mutation<
      AppsDeleteAuthorizationApiResponse,
      AppsDeleteAuthorizationApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.clientId}/grant`,
        method: "DELETE",
        body: queryArg.body,
      }),
    }),
    appsCheckToken: build.mutation<
      AppsCheckTokenApiResponse,
      AppsCheckTokenApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.clientId}/token`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    appsResetToken: build.mutation<
      AppsResetTokenApiResponse,
      AppsResetTokenApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.clientId}/token`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    appsDeleteToken: build.mutation<
      AppsDeleteTokenApiResponse,
      AppsDeleteTokenApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.clientId}/token`,
        method: "DELETE",
        body: queryArg.body,
      }),
    }),
    appsScopeToken: build.mutation<
      AppsScopeTokenApiResponse,
      AppsScopeTokenApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.clientId}/token/scoped`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    appsGetBySlug: build.query<AppsGetBySlugApiResponse, AppsGetBySlugApiArg>({
      query: (queryArg) => ({ url: `/apps/${queryArg.appSlug}` }),
    }),
    appsListReposAccessibleToInstallation: build.query<
      AppsListReposAccessibleToInstallationApiResponse,
      AppsListReposAccessibleToInstallationApiArg
    >({
      query: (queryArg) => ({
        url: `/installation/repositories`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    appsRevokeInstallationAccessToken: build.mutation<
      AppsRevokeInstallationAccessTokenApiResponse,
      AppsRevokeInstallationAccessTokenApiArg
    >({
      query: () => ({ url: `/installation/token`, method: "DELETE" }),
    }),
    appsGetSubscriptionPlanForAccount: build.query<
      AppsGetSubscriptionPlanForAccountApiResponse,
      AppsGetSubscriptionPlanForAccountApiArg
    >({
      query: (queryArg) => ({
        url: `/marketplace_listing/accounts/${queryArg.accountId}`,
      }),
    }),
    appsListPlans: build.query<AppsListPlansApiResponse, AppsListPlansApiArg>({
      query: (queryArg) => ({
        url: `/marketplace_listing/plans`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    appsListAccountsForPlan: build.query<
      AppsListAccountsForPlanApiResponse,
      AppsListAccountsForPlanApiArg
    >({
      query: (queryArg) => ({
        url: `/marketplace_listing/plans/${queryArg.planId}/accounts`,
        params: {
          sort: queryArg.sort,
          direction: queryArg.direction,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    appsGetSubscriptionPlanForAccountStubbed: build.query<
      AppsGetSubscriptionPlanForAccountStubbedApiResponse,
      AppsGetSubscriptionPlanForAccountStubbedApiArg
    >({
      query: (queryArg) => ({
        url: `/marketplace_listing/stubbed/accounts/${queryArg.accountId}`,
      }),
    }),
    appsListPlansStubbed: build.query<
      AppsListPlansStubbedApiResponse,
      AppsListPlansStubbedApiArg
    >({
      query: (queryArg) => ({
        url: `/marketplace_listing/stubbed/plans`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    appsListAccountsForPlanStubbed: build.query<
      AppsListAccountsForPlanStubbedApiResponse,
      AppsListAccountsForPlanStubbedApiArg
    >({
      query: (queryArg) => ({
        url: `/marketplace_listing/stubbed/plans/${queryArg.planId}/accounts`,
        params: {
          sort: queryArg.sort,
          direction: queryArg.direction,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    appsGetOrgInstallation: build.query<
      AppsGetOrgInstallationApiResponse,
      AppsGetOrgInstallationApiArg
    >({
      query: (queryArg) => ({ url: `/orgs/${queryArg.org}/installation` }),
    }),
    appsGetRepoInstallation: build.query<
      AppsGetRepoInstallationApiResponse,
      AppsGetRepoInstallationApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/installation`,
      }),
    }),
    appsListInstallationsForAuthenticatedUser: build.query<
      AppsListInstallationsForAuthenticatedUserApiResponse,
      AppsListInstallationsForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/installations`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    appsListInstallationReposForAuthenticatedUser: build.query<
      AppsListInstallationReposForAuthenticatedUserApiResponse,
      AppsListInstallationReposForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/installations/${queryArg.installationId}/repositories`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    appsAddRepoToInstallationForAuthenticatedUser: build.mutation<
      AppsAddRepoToInstallationForAuthenticatedUserApiResponse,
      AppsAddRepoToInstallationForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/installations/${queryArg.installationId}/repositories/${queryArg.repositoryId}`,
        method: "PUT",
      }),
    }),
    appsRemoveRepoFromInstallationForAuthenticatedUser: build.mutation<
      AppsRemoveRepoFromInstallationForAuthenticatedUserApiResponse,
      AppsRemoveRepoFromInstallationForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/installations/${queryArg.installationId}/repositories/${queryArg.repositoryId}`,
        method: "DELETE",
      }),
    }),
    appsListSubscriptionsForAuthenticatedUser: build.query<
      AppsListSubscriptionsForAuthenticatedUserApiResponse,
      AppsListSubscriptionsForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/marketplace_purchases`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    appsListSubscriptionsForAuthenticatedUserStubbed: build.query<
      AppsListSubscriptionsForAuthenticatedUserStubbedApiResponse,
      AppsListSubscriptionsForAuthenticatedUserStubbedApiArg
    >({
      query: (queryArg) => ({
        url: `/user/marketplace_purchases/stubbed`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    appsGetUserInstallation: build.query<
      AppsGetUserInstallationApiResponse,
      AppsGetUserInstallationApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/installation`,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type AppsGetAuthenticatedApiResponse =
  /** status 200 Response */ GitHubApp;
export type AppsGetAuthenticatedApiArg = void;
export type AppsCreateFromManifestApiResponse =
  /** status 201 Response */ GitHubApp &
    ({
      client_id: string;
      client_secret: string;
      webhook_secret: string | null;
      pem: string;
    } & {
      [key: string]: any;
    });
export type AppsCreateFromManifestApiArg = {
  code: string;
  body: object;
};
export type AppsGetWebhookConfigForAppApiResponse =
  /** status 200 Response */ WebhookConfiguration;
export type AppsGetWebhookConfigForAppApiArg = void;
export type AppsUpdateWebhookConfigForAppApiResponse =
  /** status 200 Response */ WebhookConfiguration;
export type AppsUpdateWebhookConfigForAppApiArg = {
  body: {
    url?: WebhookConfigUrl;
    content_type?: WebhookConfigContentType;
    secret?: WebhookConfigSecret;
    insecure_ssl?: WebhookConfigInsecureSsl;
  };
};
export type AppsListWebhookDeliveriesApiResponse =
  /** status 200 Response */ SimpleWebhookDelivery[];
export type AppsListWebhookDeliveriesApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Used for pagination: the starting delivery from which the page of deliveries is fetched. Refer to the `link` header for the next and previous page cursors. */
  cursor?: string;
};
export type AppsGetWebhookDeliveryApiResponse =
  /** status 200 Response */ WebhookDelivery;
export type AppsGetWebhookDeliveryApiArg = {
  deliveryId: number;
};
export type AppsRedeliverWebhookDeliveryApiResponse =
  /** status 202 Accepted */ object;
export type AppsRedeliverWebhookDeliveryApiArg = {
  deliveryId: number;
};
export type AppsListInstallationsApiResponse =
  /** status 200 The permissions the installation has are included under the `permissions` key. */ Installation[];
export type AppsListInstallationsApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
  /** Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  outdated?: string;
};
export type AppsGetInstallationApiResponse =
  /** status 200 Response */ Installation;
export type AppsGetInstallationApiArg = {
  /** installation_id parameter */
  installationId: number;
};
export type AppsDeleteInstallationApiResponse =
  /** status 204 Response */ undefined;
export type AppsDeleteInstallationApiArg = {
  /** installation_id parameter */
  installationId: number;
};
export type AppsCreateInstallationAccessTokenApiResponse =
  /** status 201 Response */ InstallationToken;
export type AppsCreateInstallationAccessTokenApiArg = {
  /** installation_id parameter */
  installationId: number;
  body: {
    repositories?: string[];
    repository_ids?: number[];
    permissions?: AppPermissions;
  };
};
export type AppsSuspendInstallationApiResponse =
  /** status 204 Response */ undefined;
export type AppsSuspendInstallationApiArg = {
  /** installation_id parameter */
  installationId: number;
};
export type AppsUnsuspendInstallationApiResponse =
  /** status 204 Response */ undefined;
export type AppsUnsuspendInstallationApiArg = {
  /** installation_id parameter */
  installationId: number;
};
export type AppsDeleteAuthorizationApiResponse =
  /** status 204 Response */ undefined;
export type AppsDeleteAuthorizationApiArg = {
  /** The client ID of your GitHub app. */
  clientId: string;
  body: {
    access_token: string;
  };
};
export type AppsCheckTokenApiResponse =
  /** status 200 Response */ Authorization;
export type AppsCheckTokenApiArg = {
  /** The client ID of your GitHub app. */
  clientId: string;
  body: {
    access_token: string;
  };
};
export type AppsResetTokenApiResponse =
  /** status 200 Response */ Authorization;
export type AppsResetTokenApiArg = {
  /** The client ID of your GitHub app. */
  clientId: string;
  body: {
    access_token: string;
  };
};
export type AppsDeleteTokenApiResponse = /** status 204 Response */ undefined;
export type AppsDeleteTokenApiArg = {
  /** The client ID of your GitHub app. */
  clientId: string;
  body: {
    access_token: string;
  };
};
export type AppsScopeTokenApiResponse =
  /** status 200 Response */ Authorization;
export type AppsScopeTokenApiArg = {
  /** The client ID of your GitHub app. */
  clientId: string;
  body: {
    access_token: string;
    target?: string;
    target_id?: number;
    repositories?: string[];
    repository_ids?: number[];
    permissions?: AppPermissions;
  };
};
export type AppsGetBySlugApiResponse = /** status 200 Response */ GitHubApp;
export type AppsGetBySlugApiArg = {
  appSlug: string;
};
export type AppsListReposAccessibleToInstallationApiResponse =
  /** status 200 Response */ {
    total_count: number;
    repositories: Repository[];
    repository_selection?: string;
  };
export type AppsListReposAccessibleToInstallationApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type AppsRevokeInstallationAccessTokenApiResponse = unknown;
export type AppsRevokeInstallationAccessTokenApiArg = void;
export type AppsGetSubscriptionPlanForAccountApiResponse =
  /** status 200 Response */ MarketplacePurchase;
export type AppsGetSubscriptionPlanForAccountApiArg = {
  /** account_id parameter */
  accountId: number;
};
export type AppsListPlansApiResponse =
  /** status 200 Response */ MarketplaceListingPlan[];
export type AppsListPlansApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type AppsListAccountsForPlanApiResponse =
  /** status 200 Response */ MarketplacePurchase[];
export type AppsListAccountsForPlanApiArg = {
  /** plan_id parameter */
  planId: number;
  /** One of `created` (when the repository was starred) or `updated` (when it was last pushed to). */
  sort?: "created" | "updated";
  /** To return the oldest accounts first, set to `asc`. Can be one of `asc` or `desc`. Ignored without the `sort` parameter. */
  direction?: "asc" | "desc";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type AppsGetSubscriptionPlanForAccountStubbedApiResponse =
  /** status 200 Response */ MarketplacePurchase;
export type AppsGetSubscriptionPlanForAccountStubbedApiArg = {
  /** account_id parameter */
  accountId: number;
};
export type AppsListPlansStubbedApiResponse =
  /** status 200 Response */ MarketplaceListingPlan[];
export type AppsListPlansStubbedApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type AppsListAccountsForPlanStubbedApiResponse =
  /** status 200 Response */ MarketplacePurchase[];
export type AppsListAccountsForPlanStubbedApiArg = {
  /** plan_id parameter */
  planId: number;
  /** One of `created` (when the repository was starred) or `updated` (when it was last pushed to). */
  sort?: "created" | "updated";
  /** To return the oldest accounts first, set to `asc`. Can be one of `asc` or `desc`. Ignored without the `sort` parameter. */
  direction?: "asc" | "desc";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type AppsGetOrgInstallationApiResponse =
  /** status 200 Response */ Installation;
export type AppsGetOrgInstallationApiArg = {
  org: string;
};
export type AppsGetRepoInstallationApiResponse =
  /** status 200 Response */ Installation;
export type AppsGetRepoInstallationApiArg = {
  owner: string;
  repo: string;
};
export type AppsListInstallationsForAuthenticatedUserApiResponse =
  /** status 200 You can find the permissions for the installation under the `permissions` key. */ {
    total_count: number;
    installations: Installation[];
  };
export type AppsListInstallationsForAuthenticatedUserApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type AppsListInstallationReposForAuthenticatedUserApiResponse =
  /** status 200 The access the user has to each repository is included in the hash under the `permissions` key. */ {
    total_count: number;
    repository_selection?: string;
    repositories: Repository[];
  };
export type AppsListInstallationReposForAuthenticatedUserApiArg = {
  /** installation_id parameter */
  installationId: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type AppsAddRepoToInstallationForAuthenticatedUserApiResponse =
  /** status 204 Response */ undefined;
export type AppsAddRepoToInstallationForAuthenticatedUserApiArg = {
  /** installation_id parameter */
  installationId: number;
  repositoryId: number;
};
export type AppsRemoveRepoFromInstallationForAuthenticatedUserApiResponse =
  /** status 204 Response */ undefined;
export type AppsRemoveRepoFromInstallationForAuthenticatedUserApiArg = {
  /** installation_id parameter */
  installationId: number;
  repositoryId: number;
};
export type AppsListSubscriptionsForAuthenticatedUserApiResponse =
  /** status 200 Response */ UserMarketplacePurchase[];
export type AppsListSubscriptionsForAuthenticatedUserApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type AppsListSubscriptionsForAuthenticatedUserStubbedApiResponse =
  /** status 200 Response */ UserMarketplacePurchase[];
export type AppsListSubscriptionsForAuthenticatedUserStubbedApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type AppsGetUserInstallationApiResponse =
  /** status 200 Response */ Installation;
export type AppsGetUserInstallationApiArg = {
  username: string;
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
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
};
export type ValidationErrorSimple = {
  message: string;
  documentation_url: string;
  errors?: string[];
};
export type WebhookConfigUrl = string;
export type WebhookConfigContentType = string;
export type WebhookConfigSecret = string;
export type WebhookConfigInsecureSsl = string | number;
export type WebhookConfiguration = {
  url?: WebhookConfigUrl;
  content_type?: WebhookConfigContentType;
  secret?: WebhookConfigSecret;
  insecure_ssl?: WebhookConfigInsecureSsl;
};
export type SimpleWebhookDelivery = {
  id: number;
  guid: string;
  delivered_at: string;
  redelivery: boolean;
  duration: number;
  status: string;
  status_code: number;
  event: string;
  action: string | null;
  installation_id: number | null;
  repository_id: number | null;
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
export type WebhookDelivery = {
  id: number;
  guid: string;
  delivered_at: string;
  redelivery: boolean;
  duration: number;
  status: string;
  status_code: number;
  event: string;
  action: string | null;
  installation_id: number | null;
  repository_id: number | null;
  url?: string;
  request: {
    headers: {
      [key: string]: any;
    } | null;
    payload: {
      [key: string]: any;
    } | null;
  };
  response: {
    headers: {
      [key: string]: any;
    } | null;
    payload: {
      [key: string]: any;
    } | null;
  };
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
export type Enterprise = {
  description?: string | null;
  html_url: string;
  website_url?: string | null;
  id: number;
  node_id: string;
  name: string;
  slug: string;
  created_at: string | null;
  updated_at: string | null;
  avatar_url: string;
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
export type Installation = {
  id: number;
  account: (SimpleUser2 | Enterprise) | null;
  repository_selection: "all" | "selected";
  access_tokens_url: string;
  repositories_url: string;
  html_url: string;
  app_id: number;
  target_id: number;
  target_type: string;
  permissions: AppPermissions;
  events: string[];
  created_at: string;
  updated_at: string;
  single_file_name: string | null;
  has_multiple_single_files?: boolean;
  single_file_paths?: string[];
  app_slug: string;
  suspended_by: SimpleUser;
  suspended_at: string | null;
  contact_email?: string | null;
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
export type InstallationToken = {
  token: string;
  expires_at: string;
  permissions?: AppPermissions;
  repository_selection?: "all" | "selected";
  repositories?: Repository[];
  single_file?: string;
  has_multiple_single_files?: boolean;
  single_file_paths?: string[];
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
export type MarketplaceListingPlan = {
  url: string;
  accounts_url: string;
  id: number;
  number: number;
  name: string;
  description: string;
  monthly_price_in_cents: number;
  yearly_price_in_cents: number;
  price_model: string;
  has_free_trial: boolean;
  unit_name: string | null;
  state: string;
  bullets: string[];
};
export type MarketplacePurchase = {
  url: string;
  type: string;
  id: number;
  login: string;
  organization_billing_email?: string;
  email?: string | null;
  marketplace_pending_change?: {
    is_installed?: boolean;
    effective_date?: string;
    unit_count?: number | null;
    id?: number;
    plan?: MarketplaceListingPlan;
  } | null;
  marketplace_purchase: {
    billing_cycle?: string;
    next_billing_date?: string | null;
    is_installed?: boolean;
    unit_count?: number | null;
    on_free_trial?: boolean;
    free_trial_ends_on?: string | null;
    updated_at?: string;
    plan?: MarketplaceListingPlan;
  };
};
export type MarketplaceAccount = {
  url: string;
  id: number;
  type: string;
  node_id?: string;
  login: string;
  email?: string | null;
  organization_billing_email?: string | null;
};
export type UserMarketplacePurchase = {
  billing_cycle: string;
  next_billing_date: string | null;
  unit_count: number | null;
  on_free_trial: boolean;
  free_trial_ends_on: string | null;
  updated_at: string | null;
  account: MarketplaceAccount;
  plan: MarketplaceListingPlan;
};
export const {
  useAppsGetAuthenticatedQuery,
  useAppsCreateFromManifestMutation,
  useAppsGetWebhookConfigForAppQuery,
  useAppsUpdateWebhookConfigForAppMutation,
  useAppsListWebhookDeliveriesQuery,
  useAppsGetWebhookDeliveryQuery,
  useAppsRedeliverWebhookDeliveryMutation,
  useAppsListInstallationsQuery,
  useAppsGetInstallationQuery,
  useAppsDeleteInstallationMutation,
  useAppsCreateInstallationAccessTokenMutation,
  useAppsSuspendInstallationMutation,
  useAppsUnsuspendInstallationMutation,
  useAppsDeleteAuthorizationMutation,
  useAppsCheckTokenMutation,
  useAppsResetTokenMutation,
  useAppsDeleteTokenMutation,
  useAppsScopeTokenMutation,
  useAppsGetBySlugQuery,
  useAppsListReposAccessibleToInstallationQuery,
  useAppsRevokeInstallationAccessTokenMutation,
  useAppsGetSubscriptionPlanForAccountQuery,
  useAppsListPlansQuery,
  useAppsListAccountsForPlanQuery,
  useAppsGetSubscriptionPlanForAccountStubbedQuery,
  useAppsListPlansStubbedQuery,
  useAppsListAccountsForPlanStubbedQuery,
  useAppsGetOrgInstallationQuery,
  useAppsGetRepoInstallationQuery,
  useAppsListInstallationsForAuthenticatedUserQuery,
  useAppsListInstallationReposForAuthenticatedUserQuery,
  useAppsAddRepoToInstallationForAuthenticatedUserMutation,
  useAppsRemoveRepoFromInstallationForAuthenticatedUserMutation,
  useAppsListSubscriptionsForAuthenticatedUserQuery,
  useAppsListSubscriptionsForAuthenticatedUserStubbedQuery,
  useAppsGetUserInstallationQuery,
} = injectedRtkApi;
