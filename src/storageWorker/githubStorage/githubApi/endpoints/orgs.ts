import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    orgsList: build.query<OrgsListApiResponse, OrgsListApiArg>({
      query: (queryArg) => ({
        url: `/organizations`,
        params: { since: queryArg.since, per_page: queryArg.perPage },
      }),
    }),
    orgsListCustomRoles: build.query<
      OrgsListCustomRolesApiResponse,
      OrgsListCustomRolesApiArg
    >({
      query: (queryArg) => ({
        url: `/organizations/${queryArg.organizationId}/custom_roles`,
      }),
    }),
    orgsGet: build.query<OrgsGetApiResponse, OrgsGetApiArg>({
      query: (queryArg) => ({ url: `/orgs/${queryArg.org}` }),
    }),
    orgsUpdate: build.mutation<OrgsUpdateApiResponse, OrgsUpdateApiArg>({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    orgsGetAuditLog: build.query<
      OrgsGetAuditLogApiResponse,
      OrgsGetAuditLogApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/audit-log`,
        params: {
          phrase: queryArg.phrase,
          include: queryArg.include,
          after: queryArg.after,
          before: queryArg.before,
          order: queryArg.order,
          per_page: queryArg.perPage,
        },
      }),
    }),
    orgsListBlockedUsers: build.query<
      OrgsListBlockedUsersApiResponse,
      OrgsListBlockedUsersApiArg
    >({
      query: (queryArg) => ({ url: `/orgs/${queryArg.org}/blocks` }),
    }),
    orgsCheckBlockedUser: build.query<
      OrgsCheckBlockedUserApiResponse,
      OrgsCheckBlockedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/blocks/${queryArg.username}`,
      }),
    }),
    orgsBlockUser: build.mutation<
      OrgsBlockUserApiResponse,
      OrgsBlockUserApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/blocks/${queryArg.username}`,
        method: "PUT",
      }),
    }),
    orgsUnblockUser: build.mutation<
      OrgsUnblockUserApiResponse,
      OrgsUnblockUserApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/blocks/${queryArg.username}`,
        method: "DELETE",
      }),
    }),
    orgsListSamlSsoAuthorizations: build.query<
      OrgsListSamlSsoAuthorizationsApiResponse,
      OrgsListSamlSsoAuthorizationsApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/credential-authorizations`,
        params: {
          per_page: queryArg.perPage,
          page: queryArg.page,
          login: queryArg.login,
        },
      }),
    }),
    orgsRemoveSamlSsoAuthorization: build.mutation<
      OrgsRemoveSamlSsoAuthorizationApiResponse,
      OrgsRemoveSamlSsoAuthorizationApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/credential-authorizations/${queryArg.credentialId}`,
        method: "DELETE",
      }),
    }),
    orgsListFailedInvitations: build.query<
      OrgsListFailedInvitationsApiResponse,
      OrgsListFailedInvitationsApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/failed_invitations`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    orgsListWebhooks: build.query<
      OrgsListWebhooksApiResponse,
      OrgsListWebhooksApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/hooks`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    orgsCreateWebhook: build.mutation<
      OrgsCreateWebhookApiResponse,
      OrgsCreateWebhookApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/hooks`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    orgsGetWebhook: build.query<
      OrgsGetWebhookApiResponse,
      OrgsGetWebhookApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/hooks/${queryArg.hookId}`,
      }),
    }),
    orgsUpdateWebhook: build.mutation<
      OrgsUpdateWebhookApiResponse,
      OrgsUpdateWebhookApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/hooks/${queryArg.hookId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    orgsDeleteWebhook: build.mutation<
      OrgsDeleteWebhookApiResponse,
      OrgsDeleteWebhookApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/hooks/${queryArg.hookId}`,
        method: "DELETE",
      }),
    }),
    orgsGetWebhookConfigForOrg: build.query<
      OrgsGetWebhookConfigForOrgApiResponse,
      OrgsGetWebhookConfigForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/hooks/${queryArg.hookId}/config`,
      }),
    }),
    orgsUpdateWebhookConfigForOrg: build.mutation<
      OrgsUpdateWebhookConfigForOrgApiResponse,
      OrgsUpdateWebhookConfigForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/hooks/${queryArg.hookId}/config`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    orgsListWebhookDeliveries: build.query<
      OrgsListWebhookDeliveriesApiResponse,
      OrgsListWebhookDeliveriesApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/hooks/${queryArg.hookId}/deliveries`,
        params: { per_page: queryArg.perPage, cursor: queryArg.cursor },
      }),
    }),
    orgsGetWebhookDelivery: build.query<
      OrgsGetWebhookDeliveryApiResponse,
      OrgsGetWebhookDeliveryApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/hooks/${queryArg.hookId}/deliveries/${queryArg.deliveryId}`,
      }),
    }),
    orgsRedeliverWebhookDelivery: build.mutation<
      OrgsRedeliverWebhookDeliveryApiResponse,
      OrgsRedeliverWebhookDeliveryApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/hooks/${queryArg.hookId}/deliveries/${queryArg.deliveryId}/attempts`,
        method: "POST",
      }),
    }),
    orgsPingWebhook: build.mutation<
      OrgsPingWebhookApiResponse,
      OrgsPingWebhookApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/hooks/${queryArg.hookId}/pings`,
        method: "POST",
      }),
    }),
    orgsListAppInstallations: build.query<
      OrgsListAppInstallationsApiResponse,
      OrgsListAppInstallationsApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/installations`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    orgsListPendingInvitations: build.query<
      OrgsListPendingInvitationsApiResponse,
      OrgsListPendingInvitationsApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/invitations`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    orgsCreateInvitation: build.mutation<
      OrgsCreateInvitationApiResponse,
      OrgsCreateInvitationApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/invitations`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    orgsCancelInvitation: build.mutation<
      OrgsCancelInvitationApiResponse,
      OrgsCancelInvitationApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/invitations/${queryArg.invitationId}`,
        method: "DELETE",
      }),
    }),
    orgsListInvitationTeams: build.query<
      OrgsListInvitationTeamsApiResponse,
      OrgsListInvitationTeamsApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/invitations/${queryArg.invitationId}/teams`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    orgsListMembers: build.query<
      OrgsListMembersApiResponse,
      OrgsListMembersApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/members`,
        params: {
          filter: queryArg.filter,
          role: queryArg.role,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    orgsCheckMembershipForUser: build.query<
      OrgsCheckMembershipForUserApiResponse,
      OrgsCheckMembershipForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/members/${queryArg.username}`,
      }),
    }),
    orgsRemoveMember: build.mutation<
      OrgsRemoveMemberApiResponse,
      OrgsRemoveMemberApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/members/${queryArg.username}`,
        method: "DELETE",
      }),
    }),
    orgsGetMembershipForUser: build.query<
      OrgsGetMembershipForUserApiResponse,
      OrgsGetMembershipForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/memberships/${queryArg.username}`,
      }),
    }),
    orgsSetMembershipForUser: build.mutation<
      OrgsSetMembershipForUserApiResponse,
      OrgsSetMembershipForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/memberships/${queryArg.username}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    orgsRemoveMembershipForUser: build.mutation<
      OrgsRemoveMembershipForUserApiResponse,
      OrgsRemoveMembershipForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/memberships/${queryArg.username}`,
        method: "DELETE",
      }),
    }),
    orgsListOutsideCollaborators: build.query<
      OrgsListOutsideCollaboratorsApiResponse,
      OrgsListOutsideCollaboratorsApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/outside_collaborators`,
        params: {
          filter: queryArg.filter,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    orgsConvertMemberToOutsideCollaborator: build.mutation<
      OrgsConvertMemberToOutsideCollaboratorApiResponse,
      OrgsConvertMemberToOutsideCollaboratorApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/outside_collaborators/${queryArg.username}`,
        method: "PUT",
      }),
    }),
    orgsRemoveOutsideCollaborator: build.mutation<
      OrgsRemoveOutsideCollaboratorApiResponse,
      OrgsRemoveOutsideCollaboratorApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/outside_collaborators/${queryArg.username}`,
        method: "DELETE",
      }),
    }),
    orgsListPublicMembers: build.query<
      OrgsListPublicMembersApiResponse,
      OrgsListPublicMembersApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/public_members`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    orgsCheckPublicMembershipForUser: build.query<
      OrgsCheckPublicMembershipForUserApiResponse,
      OrgsCheckPublicMembershipForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/public_members/${queryArg.username}`,
      }),
    }),
    orgsSetPublicMembershipForAuthenticatedUser: build.mutation<
      OrgsSetPublicMembershipForAuthenticatedUserApiResponse,
      OrgsSetPublicMembershipForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/public_members/${queryArg.username}`,
        method: "PUT",
      }),
    }),
    orgsRemovePublicMembershipForAuthenticatedUser: build.mutation<
      OrgsRemovePublicMembershipForAuthenticatedUserApiResponse,
      OrgsRemovePublicMembershipForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/public_members/${queryArg.username}`,
        method: "DELETE",
      }),
    }),
    orgsListMembershipsForAuthenticatedUser: build.query<
      OrgsListMembershipsForAuthenticatedUserApiResponse,
      OrgsListMembershipsForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/memberships/orgs`,
        params: {
          state: queryArg.state,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    orgsGetMembershipForAuthenticatedUser: build.query<
      OrgsGetMembershipForAuthenticatedUserApiResponse,
      OrgsGetMembershipForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({ url: `/user/memberships/orgs/${queryArg.org}` }),
    }),
    orgsUpdateMembershipForAuthenticatedUser: build.mutation<
      OrgsUpdateMembershipForAuthenticatedUserApiResponse,
      OrgsUpdateMembershipForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/memberships/orgs/${queryArg.org}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    orgsListForAuthenticatedUser: build.query<
      OrgsListForAuthenticatedUserApiResponse,
      OrgsListForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/orgs`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    orgsListForUser: build.query<
      OrgsListForUserApiResponse,
      OrgsListForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/orgs`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type OrgsListApiResponse =
  /** status 200 Response */ OrganizationSimple[];
export type OrgsListApiArg = {
  /** An organization ID. Only return organizations with an ID greater than this ID. */
  since?: number;
  /** Results per page (max 100) */
  perPage?: number;
};
export type OrgsListCustomRolesApiResponse =
  /** status 200 Response - list of custom role names */ {
    total_count?: number;
    custom_roles?: OrganizationCustomRepositoryRole[];
  };
export type OrgsListCustomRolesApiArg = {
  organizationId: string;
};
export type OrgsGetApiResponse = /** status 200 Response */ OrganizationFull;
export type OrgsGetApiArg = {
  org: string;
};
export type OrgsUpdateApiResponse = /** status 200 Response */ OrganizationFull;
export type OrgsUpdateApiArg = {
  org: string;
  body: {
    billing_email?: string;
    company?: string;
    email?: string;
    twitter_username?: string;
    location?: string;
    name?: string;
    description?: string;
    has_organization_projects?: boolean;
    has_repository_projects?: boolean;
    default_repository_permission?: "read" | "write" | "admin" | "none";
    members_can_create_repositories?: boolean;
    members_can_create_internal_repositories?: boolean;
    members_can_create_private_repositories?: boolean;
    members_can_create_public_repositories?: boolean;
    members_allowed_repository_creation_type?: "all" | "private" | "none";
    members_can_create_pages?: boolean;
    members_can_create_public_pages?: boolean;
    members_can_create_private_pages?: boolean;
    members_can_fork_private_repositories?: boolean;
    blog?: string;
  };
};
export type OrgsGetAuditLogApiResponse =
  /** status 200 Response */ AuditLogEvent[];
export type OrgsGetAuditLogApiArg = {
  org: string;
  /** A search phrase. For more information, see [Searching the audit log](https://docs.github.com/github/setting-up-and-managing-organizations-and-teams/reviewing-the-audit-log-for-your-organization#searching-the-audit-log). */
  phrase?: string;
  /** The event types to include:
    
    - `web` - returns web (non-Git) events.
    - `git` - returns Git events.
    - `all` - returns both web and Git events.
    
    The default is `web`. */
  include?: "web" | "git" | "all";
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/overview/resources-in-the-rest-api#link-header). If specified, the query only searches for events after this cursor. */
  after?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/overview/resources-in-the-rest-api#link-header). If specified, the query only searches for events before this cursor. */
  before?: string;
  /** The order of audit log events. To list newest events first, specify `desc`. To list oldest events first, specify `asc`.
    
    The default is `desc`. */
  order?: "desc" | "asc";
  /** Results per page (max 100) */
  perPage?: number;
};
export type OrgsListBlockedUsersApiResponse =
  /** status 200 Response */ SimpleUser[];
export type OrgsListBlockedUsersApiArg = {
  org: string;
};
export type OrgsCheckBlockedUserApiResponse =
  /** status 204 If the user is blocked: */ undefined;
export type OrgsCheckBlockedUserApiArg = {
  org: string;
  username: string;
};
export type OrgsBlockUserApiResponse = /** status 204 Response */ undefined;
export type OrgsBlockUserApiArg = {
  org: string;
  username: string;
};
export type OrgsUnblockUserApiResponse = unknown;
export type OrgsUnblockUserApiArg = {
  org: string;
  username: string;
};
export type OrgsListSamlSsoAuthorizationsApiResponse =
  /** status 200 Response */ CredentialAuthorization[];
export type OrgsListSamlSsoAuthorizationsApiArg = {
  org: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page token */
  page?: number;
  /** Limits the list of credentials authorizations for an organization to a specific login */
  login?: string;
};
export type OrgsRemoveSamlSsoAuthorizationApiResponse =
  /** status 204 Response */ undefined;
export type OrgsRemoveSamlSsoAuthorizationApiArg = {
  org: string;
  credentialId: number;
};
export type OrgsListFailedInvitationsApiResponse =
  /** status 200 Response */ OrganizationInvitation[];
export type OrgsListFailedInvitationsApiArg = {
  org: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type OrgsListWebhooksApiResponse = /** status 200 Response */ OrgHook[];
export type OrgsListWebhooksApiArg = {
  org: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type OrgsCreateWebhookApiResponse = /** status 201 Response */ OrgHook;
export type OrgsCreateWebhookApiArg = {
  org: string;
  body: {
    name: string;
    config: {
      url: WebhookConfigUrl;
      content_type?: WebhookConfigContentType;
      secret?: WebhookConfigSecret;
      insecure_ssl?: WebhookConfigInsecureSsl;
      username?: string;
      password?: string;
    };
    events?: string[];
    active?: boolean;
  };
};
export type OrgsGetWebhookApiResponse = /** status 200 Response */ OrgHook;
export type OrgsGetWebhookApiArg = {
  org: string;
  hookId: number;
};
export type OrgsUpdateWebhookApiResponse = /** status 200 Response */ OrgHook;
export type OrgsUpdateWebhookApiArg = {
  org: string;
  hookId: number;
  body: {
    config?: {
      url: WebhookConfigUrl;
      content_type?: WebhookConfigContentType;
      secret?: WebhookConfigSecret;
      insecure_ssl?: WebhookConfigInsecureSsl;
    };
    events?: string[];
    active?: boolean;
    name?: string;
  };
};
export type OrgsDeleteWebhookApiResponse = /** status 204 Response */ undefined;
export type OrgsDeleteWebhookApiArg = {
  org: string;
  hookId: number;
};
export type OrgsGetWebhookConfigForOrgApiResponse =
  /** status 200 Response */ WebhookConfiguration;
export type OrgsGetWebhookConfigForOrgApiArg = {
  org: string;
  hookId: number;
};
export type OrgsUpdateWebhookConfigForOrgApiResponse =
  /** status 200 Response */ WebhookConfiguration;
export type OrgsUpdateWebhookConfigForOrgApiArg = {
  org: string;
  hookId: number;
  body: {
    url?: WebhookConfigUrl;
    content_type?: WebhookConfigContentType;
    secret?: WebhookConfigSecret;
    insecure_ssl?: WebhookConfigInsecureSsl;
  };
};
export type OrgsListWebhookDeliveriesApiResponse =
  /** status 200 Response */ SimpleWebhookDelivery[];
export type OrgsListWebhookDeliveriesApiArg = {
  org: string;
  hookId: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Used for pagination: the starting delivery from which the page of deliveries is fetched. Refer to the `link` header for the next and previous page cursors. */
  cursor?: string;
};
export type OrgsGetWebhookDeliveryApiResponse =
  /** status 200 Response */ WebhookDelivery;
export type OrgsGetWebhookDeliveryApiArg = {
  org: string;
  hookId: number;
  deliveryId: number;
};
export type OrgsRedeliverWebhookDeliveryApiResponse =
  /** status 202 Accepted */ object;
export type OrgsRedeliverWebhookDeliveryApiArg = {
  org: string;
  hookId: number;
  deliveryId: number;
};
export type OrgsPingWebhookApiResponse = /** status 204 Response */ undefined;
export type OrgsPingWebhookApiArg = {
  org: string;
  hookId: number;
};
export type OrgsListAppInstallationsApiResponse = /** status 200 Response */ {
  total_count: number;
  installations: Installation[];
};
export type OrgsListAppInstallationsApiArg = {
  org: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type OrgsListPendingInvitationsApiResponse =
  /** status 200 Response */ OrganizationInvitation[];
export type OrgsListPendingInvitationsApiArg = {
  org: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type OrgsCreateInvitationApiResponse =
  /** status 201 Response */ OrganizationInvitation;
export type OrgsCreateInvitationApiArg = {
  org: string;
  body: {
    invitee_id?: number;
    email?: string;
    role?: "admin" | "direct_member" | "billing_manager";
    team_ids?: number[];
  };
};
export type OrgsCancelInvitationApiResponse =
  /** status 204 Response */ undefined;
export type OrgsCancelInvitationApiArg = {
  org: string;
  /** invitation_id parameter */
  invitationId: number;
};
export type OrgsListInvitationTeamsApiResponse =
  /** status 200 Response */ Team[];
export type OrgsListInvitationTeamsApiArg = {
  org: string;
  /** invitation_id parameter */
  invitationId: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type OrgsListMembersApiResponse =
  /** status 200 Response */ SimpleUser[];
export type OrgsListMembersApiArg = {
  org: string;
  /** Filter members returned in the list. Can be one of:
    \* `2fa_disabled` - Members without [two-factor authentication](https://github.com/blog/1614-two-factor-authentication) enabled. Available for organization owners.
    \* `all` - All members the authenticated user can see. */
  filter?: "2fa_disabled" | "all";
  /** Filter members returned by their role. Can be one of:
    \* `all` - All members of the organization, regardless of role.
    \* `admin` - Organization owners.
    \* `member` - Non-owner organization members. */
  role?: "all" | "admin" | "member";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type OrgsCheckMembershipForUserApiResponse = unknown;
export type OrgsCheckMembershipForUserApiArg = {
  org: string;
  username: string;
};
export type OrgsRemoveMemberApiResponse = /** status 204 Response */ undefined;
export type OrgsRemoveMemberApiArg = {
  org: string;
  username: string;
};
export type OrgsGetMembershipForUserApiResponse =
  /** status 200 Response */ OrgMembership;
export type OrgsGetMembershipForUserApiArg = {
  org: string;
  username: string;
};
export type OrgsSetMembershipForUserApiResponse =
  /** status 200 Response */ OrgMembership;
export type OrgsSetMembershipForUserApiArg = {
  org: string;
  username: string;
  body: {
    role?: "admin" | "member";
  };
};
export type OrgsRemoveMembershipForUserApiResponse =
  /** status 204 Response */ undefined;
export type OrgsRemoveMembershipForUserApiArg = {
  org: string;
  username: string;
};
export type OrgsListOutsideCollaboratorsApiResponse =
  /** status 200 Response */ SimpleUser[];
export type OrgsListOutsideCollaboratorsApiArg = {
  org: string;
  /** Filter the list of outside collaborators. Can be one of:
    \* `2fa_disabled`: Outside collaborators without [two-factor authentication](https://github.com/blog/1614-two-factor-authentication) enabled.
    \* `all`: All outside collaborators. */
  filter?: "2fa_disabled" | "all";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type OrgsConvertMemberToOutsideCollaboratorApiResponse =
  /** status 202 User is getting converted asynchronously */
    | {}
    | /** status 204 User was converted */ undefined;
export type OrgsConvertMemberToOutsideCollaboratorApiArg = {
  org: string;
  username: string;
};
export type OrgsRemoveOutsideCollaboratorApiResponse =
  /** status 204 Response */ undefined;
export type OrgsRemoveOutsideCollaboratorApiArg = {
  org: string;
  username: string;
};
export type OrgsListPublicMembersApiResponse =
  /** status 200 Response */ SimpleUser[];
export type OrgsListPublicMembersApiArg = {
  org: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type OrgsCheckPublicMembershipForUserApiResponse = unknown;
export type OrgsCheckPublicMembershipForUserApiArg = {
  org: string;
  username: string;
};
export type OrgsSetPublicMembershipForAuthenticatedUserApiResponse =
  /** status 204 Response */ undefined;
export type OrgsSetPublicMembershipForAuthenticatedUserApiArg = {
  org: string;
  username: string;
};
export type OrgsRemovePublicMembershipForAuthenticatedUserApiResponse = unknown;
export type OrgsRemovePublicMembershipForAuthenticatedUserApiArg = {
  org: string;
  username: string;
};
export type OrgsListMembershipsForAuthenticatedUserApiResponse =
  /** status 200 Response */ OrgMembership[];
export type OrgsListMembershipsForAuthenticatedUserApiArg = {
  /** Indicates the state of the memberships to return. Can be either `active` or `pending`. If not specified, the API returns both active and pending memberships. */
  state?: "active" | "pending";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type OrgsGetMembershipForAuthenticatedUserApiResponse =
  /** status 200 Response */ OrgMembership;
export type OrgsGetMembershipForAuthenticatedUserApiArg = {
  org: string;
};
export type OrgsUpdateMembershipForAuthenticatedUserApiResponse =
  /** status 200 Response */ OrgMembership;
export type OrgsUpdateMembershipForAuthenticatedUserApiArg = {
  org: string;
  body: {
    state: "active";
  };
};
export type OrgsListForAuthenticatedUserApiResponse =
  /** status 200 Response */ OrganizationSimple[];
export type OrgsListForAuthenticatedUserApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type OrgsListForUserApiResponse =
  /** status 200 Response */ OrganizationSimple[];
export type OrgsListForUserApiArg = {
  username: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type OrganizationSimple = {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string | null;
};
export type OrganizationCustomRepositoryRole = {
  id: number;
  name: string;
};
export type OrganizationFull = {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string | null;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  twitter_username?: string | null;
  is_verified?: boolean;
  has_organization_projects: boolean;
  has_repository_projects: boolean;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
  type: string;
  total_private_repos?: number;
  owned_private_repos?: number;
  private_gists?: number | null;
  disk_usage?: number | null;
  collaborators?: number | null;
  billing_email?: string | null;
  plan?: {
    name: string;
    space: number;
    private_repos: number;
    filled_seats?: number;
    seats?: number;
  };
  default_repository_permission?: string | null;
  members_can_create_repositories?: boolean | null;
  two_factor_requirement_enabled?: boolean | null;
  members_allowed_repository_creation_type?: string;
  members_can_create_public_repositories?: boolean;
  members_can_create_private_repositories?: boolean;
  members_can_create_internal_repositories?: boolean;
  members_can_create_pages?: boolean;
  members_can_create_public_pages?: boolean;
  members_can_create_private_pages?: boolean;
  members_can_fork_private_repositories?: boolean | null;
  updated_at: string;
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
export type ValidationErrorSimple = {
  message: string;
  documentation_url: string;
  errors?: string[];
};
export type AuditLogEvent = {
  "@timestamp"?: number;
  action?: string;
  active?: boolean;
  active_was?: boolean;
  actor?: string;
  actor_id?: number;
  actor_location?: {
    country_name?: string;
  };
  data?: {
    [key: string]: any;
  };
  org_id?: number;
  blocked_user?: string;
  business?: string;
  config?: object[];
  config_was?: object[];
  content_type?: string;
  created_at?: number;
  deploy_key_fingerprint?: string;
  _document_id?: string;
  emoji?: string;
  events?: object[];
  events_were?: object[];
  explanation?: string;
  fingerprint?: string;
  hook_id?: number;
  limited_availability?: boolean;
  message?: string;
  name?: string;
  old_user?: string;
  openssh_public_key?: string;
  org?: string;
  previous_visibility?: string;
  read_only?: boolean;
  repo?: string;
  repository?: string;
  repository_public?: boolean;
  target_login?: string;
  team?: string;
  transport_protocol?: number;
  transport_protocol_name?: string;
  user?: string;
  visibility?: string;
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
export type CredentialAuthorization = {
  login: string;
  credential_id: number;
  credential_type: string;
  token_last_eight?: string;
  credential_authorized_at: string;
  scopes?: string[];
  fingerprint?: string;
  credential_accessed_at: string | null;
  authorized_credential_id: number | null;
  authorized_credential_title?: string | null;
  authorized_credential_note?: string | null;
  authorized_credential_expires_at?: string | null;
};
export type OrganizationInvitation = {
  id: number;
  login: string | null;
  email: string | null;
  role: string;
  created_at: string;
  failed_at?: string | null;
  failed_reason?: string | null;
  inviter: SimpleUser;
  team_count: number;
  node_id: string;
  invitation_teams_url: string;
};
export type OrgHook = {
  id: number;
  url: string;
  ping_url: string;
  deliveries_url?: string;
  name: string;
  events: string[];
  active: boolean;
  config: {
    url?: string;
    insecure_ssl?: string;
    content_type?: string;
    secret?: string;
  };
  updated_at: string;
  created_at: string;
  type: string;
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
export type Installation = {
  id: number;
  account: (SimpleUser | Enterprise) | null;
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
  suspended_by: SimpleUser2;
  suspended_at: string | null;
  contact_email?: string | null;
};
export type TeamSimple = {
  id: number;
  node_id: string;
  url: string;
  members_url: string;
  name: string;
  description: string | null;
  permission: string;
  privacy?: string;
  html_url: string;
  repositories_url: string;
  slug: string;
  ldap_dn?: string;
} | null;
export type Team = {
  id: number;
  node_id: string;
  name: string;
  slug: string;
  description: string | null;
  privacy?: string;
  permission: string;
  permissions?: {
    pull: boolean;
    triage: boolean;
    push: boolean;
    maintain: boolean;
    admin: boolean;
  };
  url: string;
  html_url: string;
  members_url: string;
  repositories_url: string;
  parent: TeamSimple;
};
export type OrgMembership = {
  url: string;
  state: "active" | "pending";
  role: "admin" | "member" | "billing_manager";
  organization_url: string;
  organization: OrganizationSimple;
  user: SimpleUser2;
  permissions?: {
    can_create_repository: boolean;
  };
};
export const {
  useOrgsListQuery,
  useOrgsListCustomRolesQuery,
  useOrgsGetQuery,
  useOrgsUpdateMutation,
  useOrgsGetAuditLogQuery,
  useOrgsListBlockedUsersQuery,
  useOrgsCheckBlockedUserQuery,
  useOrgsBlockUserMutation,
  useOrgsUnblockUserMutation,
  useOrgsListSamlSsoAuthorizationsQuery,
  useOrgsRemoveSamlSsoAuthorizationMutation,
  useOrgsListFailedInvitationsQuery,
  useOrgsListWebhooksQuery,
  useOrgsCreateWebhookMutation,
  useOrgsGetWebhookQuery,
  useOrgsUpdateWebhookMutation,
  useOrgsDeleteWebhookMutation,
  useOrgsGetWebhookConfigForOrgQuery,
  useOrgsUpdateWebhookConfigForOrgMutation,
  useOrgsListWebhookDeliveriesQuery,
  useOrgsGetWebhookDeliveryQuery,
  useOrgsRedeliverWebhookDeliveryMutation,
  useOrgsPingWebhookMutation,
  useOrgsListAppInstallationsQuery,
  useOrgsListPendingInvitationsQuery,
  useOrgsCreateInvitationMutation,
  useOrgsCancelInvitationMutation,
  useOrgsListInvitationTeamsQuery,
  useOrgsListMembersQuery,
  useOrgsCheckMembershipForUserQuery,
  useOrgsRemoveMemberMutation,
  useOrgsGetMembershipForUserQuery,
  useOrgsSetMembershipForUserMutation,
  useOrgsRemoveMembershipForUserMutation,
  useOrgsListOutsideCollaboratorsQuery,
  useOrgsConvertMemberToOutsideCollaboratorMutation,
  useOrgsRemoveOutsideCollaboratorMutation,
  useOrgsListPublicMembersQuery,
  useOrgsCheckPublicMembershipForUserQuery,
  useOrgsSetPublicMembershipForAuthenticatedUserMutation,
  useOrgsRemovePublicMembershipForAuthenticatedUserMutation,
  useOrgsListMembershipsForAuthenticatedUserQuery,
  useOrgsGetMembershipForAuthenticatedUserQuery,
  useOrgsUpdateMembershipForAuthenticatedUserMutation,
  useOrgsListForAuthenticatedUserQuery,
  useOrgsListForUserQuery,
} = injectedRtkApi;
