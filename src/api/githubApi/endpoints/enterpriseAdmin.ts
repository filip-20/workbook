import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    enterpriseAdminGetGithubActionsPermissionsEnterprise: build.query<
      EnterpriseAdminGetGithubActionsPermissionsEnterpriseApiResponse,
      EnterpriseAdminGetGithubActionsPermissionsEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/permissions`,
      }),
    }),
    enterpriseAdminSetGithubActionsPermissionsEnterprise: build.mutation<
      EnterpriseAdminSetGithubActionsPermissionsEnterpriseApiResponse,
      EnterpriseAdminSetGithubActionsPermissionsEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/permissions`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    enterpriseAdminListSelectedOrganizationsEnabledGithubActionsEnterprise:
      build.query<
        EnterpriseAdminListSelectedOrganizationsEnabledGithubActionsEnterpriseApiResponse,
        EnterpriseAdminListSelectedOrganizationsEnabledGithubActionsEnterpriseApiArg
      >({
        query: (queryArg) => ({
          url: `/enterprises/${queryArg.enterprise}/actions/permissions/organizations`,
          params: { per_page: queryArg.perPage, page: queryArg.page },
        }),
      }),
    enterpriseAdminSetSelectedOrganizationsEnabledGithubActionsEnterprise:
      build.mutation<
        EnterpriseAdminSetSelectedOrganizationsEnabledGithubActionsEnterpriseApiResponse,
        EnterpriseAdminSetSelectedOrganizationsEnabledGithubActionsEnterpriseApiArg
      >({
        query: (queryArg) => ({
          url: `/enterprises/${queryArg.enterprise}/actions/permissions/organizations`,
          method: "PUT",
          body: queryArg.body,
        }),
      }),
    enterpriseAdminEnableSelectedOrganizationGithubActionsEnterprise:
      build.mutation<
        EnterpriseAdminEnableSelectedOrganizationGithubActionsEnterpriseApiResponse,
        EnterpriseAdminEnableSelectedOrganizationGithubActionsEnterpriseApiArg
      >({
        query: (queryArg) => ({
          url: `/enterprises/${queryArg.enterprise}/actions/permissions/organizations/${queryArg.orgId}`,
          method: "PUT",
        }),
      }),
    enterpriseAdminDisableSelectedOrganizationGithubActionsEnterprise:
      build.mutation<
        EnterpriseAdminDisableSelectedOrganizationGithubActionsEnterpriseApiResponse,
        EnterpriseAdminDisableSelectedOrganizationGithubActionsEnterpriseApiArg
      >({
        query: (queryArg) => ({
          url: `/enterprises/${queryArg.enterprise}/actions/permissions/organizations/${queryArg.orgId}`,
          method: "DELETE",
        }),
      }),
    enterpriseAdminGetAllowedActionsEnterprise: build.query<
      EnterpriseAdminGetAllowedActionsEnterpriseApiResponse,
      EnterpriseAdminGetAllowedActionsEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/permissions/selected-actions`,
      }),
    }),
    enterpriseAdminSetAllowedActionsEnterprise: build.mutation<
      EnterpriseAdminSetAllowedActionsEnterpriseApiResponse,
      EnterpriseAdminSetAllowedActionsEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/permissions/selected-actions`,
        method: "PUT",
        body: queryArg.selectedActions,
      }),
    }),
    enterpriseAdminListSelfHostedRunnerGroupsForEnterprise: build.query<
      EnterpriseAdminListSelfHostedRunnerGroupsForEnterpriseApiResponse,
      EnterpriseAdminListSelfHostedRunnerGroupsForEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/runner-groups`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    enterpriseAdminCreateSelfHostedRunnerGroupForEnterprise: build.mutation<
      EnterpriseAdminCreateSelfHostedRunnerGroupForEnterpriseApiResponse,
      EnterpriseAdminCreateSelfHostedRunnerGroupForEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/runner-groups`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    enterpriseAdminGetSelfHostedRunnerGroupForEnterprise: build.query<
      EnterpriseAdminGetSelfHostedRunnerGroupForEnterpriseApiResponse,
      EnterpriseAdminGetSelfHostedRunnerGroupForEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/runner-groups/${queryArg.runnerGroupId}`,
      }),
    }),
    enterpriseAdminUpdateSelfHostedRunnerGroupForEnterprise: build.mutation<
      EnterpriseAdminUpdateSelfHostedRunnerGroupForEnterpriseApiResponse,
      EnterpriseAdminUpdateSelfHostedRunnerGroupForEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/runner-groups/${queryArg.runnerGroupId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    enterpriseAdminDeleteSelfHostedRunnerGroupFromEnterprise: build.mutation<
      EnterpriseAdminDeleteSelfHostedRunnerGroupFromEnterpriseApiResponse,
      EnterpriseAdminDeleteSelfHostedRunnerGroupFromEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/runner-groups/${queryArg.runnerGroupId}`,
        method: "DELETE",
      }),
    }),
    enterpriseAdminListOrgAccessToSelfHostedRunnerGroupInEnterprise:
      build.query<
        EnterpriseAdminListOrgAccessToSelfHostedRunnerGroupInEnterpriseApiResponse,
        EnterpriseAdminListOrgAccessToSelfHostedRunnerGroupInEnterpriseApiArg
      >({
        query: (queryArg) => ({
          url: `/enterprises/${queryArg.enterprise}/actions/runner-groups/${queryArg.runnerGroupId}/organizations`,
          params: { per_page: queryArg.perPage, page: queryArg.page },
        }),
      }),
    enterpriseAdminSetOrgAccessToSelfHostedRunnerGroupInEnterprise:
      build.mutation<
        EnterpriseAdminSetOrgAccessToSelfHostedRunnerGroupInEnterpriseApiResponse,
        EnterpriseAdminSetOrgAccessToSelfHostedRunnerGroupInEnterpriseApiArg
      >({
        query: (queryArg) => ({
          url: `/enterprises/${queryArg.enterprise}/actions/runner-groups/${queryArg.runnerGroupId}/organizations`,
          method: "PUT",
          body: queryArg.body,
        }),
      }),
    enterpriseAdminAddOrgAccessToSelfHostedRunnerGroupInEnterprise:
      build.mutation<
        EnterpriseAdminAddOrgAccessToSelfHostedRunnerGroupInEnterpriseApiResponse,
        EnterpriseAdminAddOrgAccessToSelfHostedRunnerGroupInEnterpriseApiArg
      >({
        query: (queryArg) => ({
          url: `/enterprises/${queryArg.enterprise}/actions/runner-groups/${queryArg.runnerGroupId}/organizations/${queryArg.orgId}`,
          method: "PUT",
        }),
      }),
    enterpriseAdminRemoveOrgAccessToSelfHostedRunnerGroupInEnterprise:
      build.mutation<
        EnterpriseAdminRemoveOrgAccessToSelfHostedRunnerGroupInEnterpriseApiResponse,
        EnterpriseAdminRemoveOrgAccessToSelfHostedRunnerGroupInEnterpriseApiArg
      >({
        query: (queryArg) => ({
          url: `/enterprises/${queryArg.enterprise}/actions/runner-groups/${queryArg.runnerGroupId}/organizations/${queryArg.orgId}`,
          method: "DELETE",
        }),
      }),
    enterpriseAdminListSelfHostedRunnersInGroupForEnterprise: build.query<
      EnterpriseAdminListSelfHostedRunnersInGroupForEnterpriseApiResponse,
      EnterpriseAdminListSelfHostedRunnersInGroupForEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/runner-groups/${queryArg.runnerGroupId}/runners`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    enterpriseAdminSetSelfHostedRunnersInGroupForEnterprise: build.mutation<
      EnterpriseAdminSetSelfHostedRunnersInGroupForEnterpriseApiResponse,
      EnterpriseAdminSetSelfHostedRunnersInGroupForEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/runner-groups/${queryArg.runnerGroupId}/runners`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    enterpriseAdminAddSelfHostedRunnerToGroupForEnterprise: build.mutation<
      EnterpriseAdminAddSelfHostedRunnerToGroupForEnterpriseApiResponse,
      EnterpriseAdminAddSelfHostedRunnerToGroupForEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/runner-groups/${queryArg.runnerGroupId}/runners/${queryArg.runnerId}`,
        method: "PUT",
      }),
    }),
    enterpriseAdminRemoveSelfHostedRunnerFromGroupForEnterprise: build.mutation<
      EnterpriseAdminRemoveSelfHostedRunnerFromGroupForEnterpriseApiResponse,
      EnterpriseAdminRemoveSelfHostedRunnerFromGroupForEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/runner-groups/${queryArg.runnerGroupId}/runners/${queryArg.runnerId}`,
        method: "DELETE",
      }),
    }),
    enterpriseAdminListSelfHostedRunnersForEnterprise: build.query<
      EnterpriseAdminListSelfHostedRunnersForEnterpriseApiResponse,
      EnterpriseAdminListSelfHostedRunnersForEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/runners`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    enterpriseAdminListRunnerApplicationsForEnterprise: build.query<
      EnterpriseAdminListRunnerApplicationsForEnterpriseApiResponse,
      EnterpriseAdminListRunnerApplicationsForEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/runners/downloads`,
      }),
    }),
    enterpriseAdminCreateRegistrationTokenForEnterprise: build.mutation<
      EnterpriseAdminCreateRegistrationTokenForEnterpriseApiResponse,
      EnterpriseAdminCreateRegistrationTokenForEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/runners/registration-token`,
        method: "POST",
      }),
    }),
    enterpriseAdminCreateRemoveTokenForEnterprise: build.mutation<
      EnterpriseAdminCreateRemoveTokenForEnterpriseApiResponse,
      EnterpriseAdminCreateRemoveTokenForEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/runners/remove-token`,
        method: "POST",
      }),
    }),
    enterpriseAdminGetSelfHostedRunnerForEnterprise: build.query<
      EnterpriseAdminGetSelfHostedRunnerForEnterpriseApiResponse,
      EnterpriseAdminGetSelfHostedRunnerForEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/runners/${queryArg.runnerId}`,
      }),
    }),
    enterpriseAdminDeleteSelfHostedRunnerFromEnterprise: build.mutation<
      EnterpriseAdminDeleteSelfHostedRunnerFromEnterpriseApiResponse,
      EnterpriseAdminDeleteSelfHostedRunnerFromEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/runners/${queryArg.runnerId}`,
        method: "DELETE",
      }),
    }),
    enterpriseAdminListLabelsForSelfHostedRunnerForEnterprise: build.query<
      EnterpriseAdminListLabelsForSelfHostedRunnerForEnterpriseApiResponse,
      EnterpriseAdminListLabelsForSelfHostedRunnerForEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/actions/runners/${queryArg.runnerId}/labels`,
      }),
    }),
    enterpriseAdminAddCustomLabelsToSelfHostedRunnerForEnterprise:
      build.mutation<
        EnterpriseAdminAddCustomLabelsToSelfHostedRunnerForEnterpriseApiResponse,
        EnterpriseAdminAddCustomLabelsToSelfHostedRunnerForEnterpriseApiArg
      >({
        query: (queryArg) => ({
          url: `/enterprises/${queryArg.enterprise}/actions/runners/${queryArg.runnerId}/labels`,
          method: "POST",
          body: queryArg.body,
        }),
      }),
    enterpriseAdminSetCustomLabelsForSelfHostedRunnerForEnterprise:
      build.mutation<
        EnterpriseAdminSetCustomLabelsForSelfHostedRunnerForEnterpriseApiResponse,
        EnterpriseAdminSetCustomLabelsForSelfHostedRunnerForEnterpriseApiArg
      >({
        query: (queryArg) => ({
          url: `/enterprises/${queryArg.enterprise}/actions/runners/${queryArg.runnerId}/labels`,
          method: "PUT",
          body: queryArg.body,
        }),
      }),
    enterpriseAdminRemoveAllCustomLabelsFromSelfHostedRunnerForEnterprise:
      build.mutation<
        EnterpriseAdminRemoveAllCustomLabelsFromSelfHostedRunnerForEnterpriseApiResponse,
        EnterpriseAdminRemoveAllCustomLabelsFromSelfHostedRunnerForEnterpriseApiArg
      >({
        query: (queryArg) => ({
          url: `/enterprises/${queryArg.enterprise}/actions/runners/${queryArg.runnerId}/labels`,
          method: "DELETE",
        }),
      }),
    enterpriseAdminRemoveCustomLabelFromSelfHostedRunnerForEnterprise:
      build.mutation<
        EnterpriseAdminRemoveCustomLabelFromSelfHostedRunnerForEnterpriseApiResponse,
        EnterpriseAdminRemoveCustomLabelFromSelfHostedRunnerForEnterpriseApiArg
      >({
        query: (queryArg) => ({
          url: `/enterprises/${queryArg.enterprise}/actions/runners/${queryArg.runnerId}/labels/${queryArg.name}`,
          method: "DELETE",
        }),
      }),
    enterpriseAdminGetAuditLog: build.query<
      EnterpriseAdminGetAuditLogApiResponse,
      EnterpriseAdminGetAuditLogApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/audit-log`,
        params: {
          phrase: queryArg.phrase,
          include: queryArg.include,
          after: queryArg.after,
          before: queryArg.before,
          order: queryArg.order,
          page: queryArg.page,
          per_page: queryArg.perPage,
        },
      }),
    }),
    enterpriseAdminListProvisionedGroupsEnterprise: build.query<
      EnterpriseAdminListProvisionedGroupsEnterpriseApiResponse,
      EnterpriseAdminListProvisionedGroupsEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/enterprises/${queryArg.enterprise}/Groups`,
        params: {
          startIndex: queryArg.startIndex,
          count: queryArg.count,
          filter: queryArg.filter,
          excludedAttributes: queryArg.excludedAttributes,
        },
      }),
    }),
    enterpriseAdminProvisionAndInviteEnterpriseGroup: build.mutation<
      EnterpriseAdminProvisionAndInviteEnterpriseGroupApiResponse,
      EnterpriseAdminProvisionAndInviteEnterpriseGroupApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/enterprises/${queryArg.enterprise}/Groups`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    enterpriseAdminGetProvisioningInformationForEnterpriseGroup: build.query<
      EnterpriseAdminGetProvisioningInformationForEnterpriseGroupApiResponse,
      EnterpriseAdminGetProvisioningInformationForEnterpriseGroupApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/enterprises/${queryArg.enterprise}/Groups/${queryArg.scimGroupId}`,
        params: { excludedAttributes: queryArg.excludedAttributes },
      }),
    }),
    enterpriseAdminSetInformationForProvisionedEnterpriseGroup: build.mutation<
      EnterpriseAdminSetInformationForProvisionedEnterpriseGroupApiResponse,
      EnterpriseAdminSetInformationForProvisionedEnterpriseGroupApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/enterprises/${queryArg.enterprise}/Groups/${queryArg.scimGroupId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    enterpriseAdminUpdateAttributeForEnterpriseGroup: build.mutation<
      EnterpriseAdminUpdateAttributeForEnterpriseGroupApiResponse,
      EnterpriseAdminUpdateAttributeForEnterpriseGroupApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/enterprises/${queryArg.enterprise}/Groups/${queryArg.scimGroupId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    enterpriseAdminDeleteScimGroupFromEnterprise: build.mutation<
      EnterpriseAdminDeleteScimGroupFromEnterpriseApiResponse,
      EnterpriseAdminDeleteScimGroupFromEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/enterprises/${queryArg.enterprise}/Groups/${queryArg.scimGroupId}`,
        method: "DELETE",
      }),
    }),
    enterpriseAdminListProvisionedIdentitiesEnterprise: build.query<
      EnterpriseAdminListProvisionedIdentitiesEnterpriseApiResponse,
      EnterpriseAdminListProvisionedIdentitiesEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/enterprises/${queryArg.enterprise}/Users`,
        params: {
          startIndex: queryArg.startIndex,
          count: queryArg.count,
          filter: queryArg.filter,
        },
      }),
    }),
    enterpriseAdminProvisionAndInviteEnterpriseUser: build.mutation<
      EnterpriseAdminProvisionAndInviteEnterpriseUserApiResponse,
      EnterpriseAdminProvisionAndInviteEnterpriseUserApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/enterprises/${queryArg.enterprise}/Users`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    enterpriseAdminGetProvisioningInformationForEnterpriseUser: build.query<
      EnterpriseAdminGetProvisioningInformationForEnterpriseUserApiResponse,
      EnterpriseAdminGetProvisioningInformationForEnterpriseUserApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/enterprises/${queryArg.enterprise}/Users/${queryArg.scimUserId}`,
      }),
    }),
    enterpriseAdminSetInformationForProvisionedEnterpriseUser: build.mutation<
      EnterpriseAdminSetInformationForProvisionedEnterpriseUserApiResponse,
      EnterpriseAdminSetInformationForProvisionedEnterpriseUserApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/enterprises/${queryArg.enterprise}/Users/${queryArg.scimUserId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    enterpriseAdminUpdateAttributeForEnterpriseUser: build.mutation<
      EnterpriseAdminUpdateAttributeForEnterpriseUserApiResponse,
      EnterpriseAdminUpdateAttributeForEnterpriseUserApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/enterprises/${queryArg.enterprise}/Users/${queryArg.scimUserId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    enterpriseAdminDeleteUserFromEnterprise: build.mutation<
      EnterpriseAdminDeleteUserFromEnterpriseApiResponse,
      EnterpriseAdminDeleteUserFromEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/enterprises/${queryArg.enterprise}/Users/${queryArg.scimUserId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type EnterpriseAdminGetGithubActionsPermissionsEnterpriseApiResponse =
  /** status 200 Response */ ActionsEnterprisePermissions;
export type EnterpriseAdminGetGithubActionsPermissionsEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
};
export type EnterpriseAdminSetGithubActionsPermissionsEnterpriseApiResponse =
  unknown;
export type EnterpriseAdminSetGithubActionsPermissionsEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  body: {
    enabled_organizations: EnabledOrganizations;
    allowed_actions?: AllowedActions;
  };
};
export type EnterpriseAdminListSelectedOrganizationsEnabledGithubActionsEnterpriseApiResponse =
  /** status 200 Response */ {
    total_count: number;
    organizations: OrganizationSimple[];
  };
export type EnterpriseAdminListSelectedOrganizationsEnabledGithubActionsEnterpriseApiArg =
  {
    /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
    enterprise: string;
    /** Results per page (max 100) */
    perPage?: number;
    /** Page number of the results to fetch. */
    page?: number;
  };
export type EnterpriseAdminSetSelectedOrganizationsEnabledGithubActionsEnterpriseApiResponse =
  unknown;
export type EnterpriseAdminSetSelectedOrganizationsEnabledGithubActionsEnterpriseApiArg =
  {
    /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
    enterprise: string;
    body: {
      selected_organization_ids: number[];
    };
  };
export type EnterpriseAdminEnableSelectedOrganizationGithubActionsEnterpriseApiResponse =
  unknown;
export type EnterpriseAdminEnableSelectedOrganizationGithubActionsEnterpriseApiArg =
  {
    /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
    enterprise: string;
    /** Unique identifier of an organization. */
    orgId: number;
  };
export type EnterpriseAdminDisableSelectedOrganizationGithubActionsEnterpriseApiResponse =
  unknown;
export type EnterpriseAdminDisableSelectedOrganizationGithubActionsEnterpriseApiArg =
  {
    /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
    enterprise: string;
    /** Unique identifier of an organization. */
    orgId: number;
  };
export type EnterpriseAdminGetAllowedActionsEnterpriseApiResponse =
  /** status 200 Response */ SelectedActions;
export type EnterpriseAdminGetAllowedActionsEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
};
export type EnterpriseAdminSetAllowedActionsEnterpriseApiResponse = unknown;
export type EnterpriseAdminSetAllowedActionsEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  selectedActions: SelectedActions;
};
export type EnterpriseAdminListSelfHostedRunnerGroupsForEnterpriseApiResponse =
  /** status 200 Response */ {
    total_count: number;
    runner_groups: RunnerGroupsEnterprise[];
  };
export type EnterpriseAdminListSelfHostedRunnerGroupsForEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type EnterpriseAdminCreateSelfHostedRunnerGroupForEnterpriseApiResponse =
  /** status 201 Response */ RunnerGroupsEnterprise;
export type EnterpriseAdminCreateSelfHostedRunnerGroupForEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  body: {
    name: string;
    visibility?: "selected" | "all";
    selected_organization_ids?: number[];
    runners?: number[];
    allows_public_repositories?: boolean;
  };
};
export type EnterpriseAdminGetSelfHostedRunnerGroupForEnterpriseApiResponse =
  /** status 200 Response */ RunnerGroupsEnterprise;
export type EnterpriseAdminGetSelfHostedRunnerGroupForEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Unique identifier of the self-hosted runner group. */
  runnerGroupId: number;
};
export type EnterpriseAdminUpdateSelfHostedRunnerGroupForEnterpriseApiResponse =
  /** status 200 Response */ RunnerGroupsEnterprise;
export type EnterpriseAdminUpdateSelfHostedRunnerGroupForEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Unique identifier of the self-hosted runner group. */
  runnerGroupId: number;
  body: {
    name?: string;
    visibility?: "selected" | "all";
    allows_public_repositories?: boolean;
  };
};
export type EnterpriseAdminDeleteSelfHostedRunnerGroupFromEnterpriseApiResponse =
  unknown;
export type EnterpriseAdminDeleteSelfHostedRunnerGroupFromEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Unique identifier of the self-hosted runner group. */
  runnerGroupId: number;
};
export type EnterpriseAdminListOrgAccessToSelfHostedRunnerGroupInEnterpriseApiResponse =
  /** status 200 Response */ {
    total_count: number;
    organizations: OrganizationSimple[];
  };
export type EnterpriseAdminListOrgAccessToSelfHostedRunnerGroupInEnterpriseApiArg =
  {
    /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
    enterprise: string;
    /** Unique identifier of the self-hosted runner group. */
    runnerGroupId: number;
    /** Results per page (max 100) */
    perPage?: number;
    /** Page number of the results to fetch. */
    page?: number;
  };
export type EnterpriseAdminSetOrgAccessToSelfHostedRunnerGroupInEnterpriseApiResponse =
  unknown;
export type EnterpriseAdminSetOrgAccessToSelfHostedRunnerGroupInEnterpriseApiArg =
  {
    /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
    enterprise: string;
    /** Unique identifier of the self-hosted runner group. */
    runnerGroupId: number;
    body: {
      selected_organization_ids: number[];
    };
  };
export type EnterpriseAdminAddOrgAccessToSelfHostedRunnerGroupInEnterpriseApiResponse =
  unknown;
export type EnterpriseAdminAddOrgAccessToSelfHostedRunnerGroupInEnterpriseApiArg =
  {
    /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
    enterprise: string;
    /** Unique identifier of the self-hosted runner group. */
    runnerGroupId: number;
    /** Unique identifier of an organization. */
    orgId: number;
  };
export type EnterpriseAdminRemoveOrgAccessToSelfHostedRunnerGroupInEnterpriseApiResponse =
  unknown;
export type EnterpriseAdminRemoveOrgAccessToSelfHostedRunnerGroupInEnterpriseApiArg =
  {
    /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
    enterprise: string;
    /** Unique identifier of the self-hosted runner group. */
    runnerGroupId: number;
    /** Unique identifier of an organization. */
    orgId: number;
  };
export type EnterpriseAdminListSelfHostedRunnersInGroupForEnterpriseApiResponse =
  /** status 200 Response */ {
    total_count: number;
    runners: SelfHostedRunners[];
  };
export type EnterpriseAdminListSelfHostedRunnersInGroupForEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Unique identifier of the self-hosted runner group. */
  runnerGroupId: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type EnterpriseAdminSetSelfHostedRunnersInGroupForEnterpriseApiResponse =
  unknown;
export type EnterpriseAdminSetSelfHostedRunnersInGroupForEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Unique identifier of the self-hosted runner group. */
  runnerGroupId: number;
  body: {
    runners: number[];
  };
};
export type EnterpriseAdminAddSelfHostedRunnerToGroupForEnterpriseApiResponse =
  unknown;
export type EnterpriseAdminAddSelfHostedRunnerToGroupForEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Unique identifier of the self-hosted runner group. */
  runnerGroupId: number;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
};
export type EnterpriseAdminRemoveSelfHostedRunnerFromGroupForEnterpriseApiResponse =
  unknown;
export type EnterpriseAdminRemoveSelfHostedRunnerFromGroupForEnterpriseApiArg =
  {
    /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
    enterprise: string;
    /** Unique identifier of the self-hosted runner group. */
    runnerGroupId: number;
    /** Unique identifier of the self-hosted runner. */
    runnerId: number;
  };
export type EnterpriseAdminListSelfHostedRunnersForEnterpriseApiResponse =
  /** status 200 Response */ {
    total_count?: number;
    runners?: SelfHostedRunners[];
  };
export type EnterpriseAdminListSelfHostedRunnersForEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type EnterpriseAdminListRunnerApplicationsForEnterpriseApiResponse =
  /** status 200 Response */ RunnerApplication[];
export type EnterpriseAdminListRunnerApplicationsForEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
};
export type EnterpriseAdminCreateRegistrationTokenForEnterpriseApiResponse =
  /** status 201 Response */ AuthenticationToken;
export type EnterpriseAdminCreateRegistrationTokenForEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
};
export type EnterpriseAdminCreateRemoveTokenForEnterpriseApiResponse =
  /** status 201 Response */ AuthenticationToken;
export type EnterpriseAdminCreateRemoveTokenForEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
};
export type EnterpriseAdminGetSelfHostedRunnerForEnterpriseApiResponse =
  /** status 200 Response */ SelfHostedRunners;
export type EnterpriseAdminGetSelfHostedRunnerForEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
};
export type EnterpriseAdminDeleteSelfHostedRunnerFromEnterpriseApiResponse =
  unknown;
export type EnterpriseAdminDeleteSelfHostedRunnerFromEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
};
export type EnterpriseAdminListLabelsForSelfHostedRunnerForEnterpriseApiResponse =
  /** status 200 Response */ {
    total_count: number;
    labels: SelfHostedRunnerLabel[];
  };
export type EnterpriseAdminListLabelsForSelfHostedRunnerForEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
};
export type EnterpriseAdminAddCustomLabelsToSelfHostedRunnerForEnterpriseApiResponse =
  /** status 200 Response */ {
    total_count: number;
    labels: SelfHostedRunnerLabel[];
  };
export type EnterpriseAdminAddCustomLabelsToSelfHostedRunnerForEnterpriseApiArg =
  {
    /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
    enterprise: string;
    /** Unique identifier of the self-hosted runner. */
    runnerId: number;
    body: {
      labels: string[];
    };
  };
export type EnterpriseAdminSetCustomLabelsForSelfHostedRunnerForEnterpriseApiResponse =
  /** status 200 Response */ {
    total_count: number;
    labels: SelfHostedRunnerLabel[];
  };
export type EnterpriseAdminSetCustomLabelsForSelfHostedRunnerForEnterpriseApiArg =
  {
    /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
    enterprise: string;
    /** Unique identifier of the self-hosted runner. */
    runnerId: number;
    body: {
      labels: string[];
    };
  };
export type EnterpriseAdminRemoveAllCustomLabelsFromSelfHostedRunnerForEnterpriseApiResponse =
  /** status 200 Response */ {
    total_count: number;
    labels: SelfHostedRunnerLabel[];
  };
export type EnterpriseAdminRemoveAllCustomLabelsFromSelfHostedRunnerForEnterpriseApiArg =
  {
    /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
    enterprise: string;
    /** Unique identifier of the self-hosted runner. */
    runnerId: number;
  };
export type EnterpriseAdminRemoveCustomLabelFromSelfHostedRunnerForEnterpriseApiResponse =
  /** status 200 Response */ {
    total_count: number;
    labels: SelfHostedRunnerLabel[];
  };
export type EnterpriseAdminRemoveCustomLabelFromSelfHostedRunnerForEnterpriseApiArg =
  {
    /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
    enterprise: string;
    /** Unique identifier of the self-hosted runner. */
    runnerId: number;
    /** The name of a self-hosted runner's custom label. */
    name: string;
  };
export type EnterpriseAdminGetAuditLogApiResponse =
  /** status 200 Response */ AuditLogEvent[];
export type EnterpriseAdminGetAuditLogApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
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
  /** Page number of the results to fetch. */
  page?: number;
  /** Results per page (max 100) */
  perPage?: number;
};
export type EnterpriseAdminListProvisionedGroupsEnterpriseApiResponse =
  /** status 200 Response */ ScimGroupListEnterprise;
export type EnterpriseAdminListProvisionedGroupsEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Used for pagination: the index of the first result to return. */
  startIndex?: number;
  /** Used for pagination: the number of results to return. */
  count?: number;
  /** filter results */
  filter?: string;
  /** attributes to exclude */
  excludedAttributes?: string;
};
export type EnterpriseAdminProvisionAndInviteEnterpriseGroupApiResponse =
  /** status 201 Response */ ScimEnterpriseGroup;
export type EnterpriseAdminProvisionAndInviteEnterpriseGroupApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  body: {
    schemas: string[];
    displayName: string;
    members?: {
      value: string;
    }[];
  };
};
export type EnterpriseAdminGetProvisioningInformationForEnterpriseGroupApiResponse =
  /** status 200 Response */ ScimEnterpriseGroup;
export type EnterpriseAdminGetProvisioningInformationForEnterpriseGroupApiArg =
  {
    /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
    enterprise: string;
    /** Identifier generated by the GitHub SCIM endpoint. */
    scimGroupId: string;
    /** Attributes to exclude. */
    excludedAttributes?: string;
  };
export type EnterpriseAdminSetInformationForProvisionedEnterpriseGroupApiResponse =
  /** status 200 Response */ ScimEnterpriseGroup;
export type EnterpriseAdminSetInformationForProvisionedEnterpriseGroupApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Identifier generated by the GitHub SCIM endpoint. */
  scimGroupId: string;
  body: {
    schemas: string[];
    displayName: string;
    members?: {
      value: string;
    }[];
  };
};
export type EnterpriseAdminUpdateAttributeForEnterpriseGroupApiResponse =
  /** status 200 Response */ ScimEnterpriseGroup;
export type EnterpriseAdminUpdateAttributeForEnterpriseGroupApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Identifier generated by the GitHub SCIM endpoint. */
  scimGroupId: string;
  body: {
    schemas: string[];
    Operations: {
      op: "add" | "Add" | "remove" | "Remove" | "replace" | "Replace";
      path?: string;
      value?: any;
    }[];
  };
};
export type EnterpriseAdminDeleteScimGroupFromEnterpriseApiResponse = unknown;
export type EnterpriseAdminDeleteScimGroupFromEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Identifier generated by the GitHub SCIM endpoint. */
  scimGroupId: string;
};
export type EnterpriseAdminListProvisionedIdentitiesEnterpriseApiResponse =
  /** status 200 Response */ ScimUserListEnterprise;
export type EnterpriseAdminListProvisionedIdentitiesEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Used for pagination: the index of the first result to return. */
  startIndex?: number;
  /** Used for pagination: the number of results to return. */
  count?: number;
  /** filter results */
  filter?: string;
};
export type EnterpriseAdminProvisionAndInviteEnterpriseUserApiResponse =
  /** status 201 Response */ ScimEnterpriseUser;
export type EnterpriseAdminProvisionAndInviteEnterpriseUserApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  body: {
    schemas: string[];
    userName: string;
    name: {
      givenName: string;
      familyName: string;
    };
    emails: {
      value: string;
      type: string;
      primary: boolean;
    }[];
    groups?: {
      value?: string;
    }[];
  };
};
export type EnterpriseAdminGetProvisioningInformationForEnterpriseUserApiResponse =
  /** status 200 Response */ ScimEnterpriseUser;
export type EnterpriseAdminGetProvisioningInformationForEnterpriseUserApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** scim_user_id parameter */
  scimUserId: string;
};
export type EnterpriseAdminSetInformationForProvisionedEnterpriseUserApiResponse =
  /** status 200 Response */ ScimEnterpriseUser;
export type EnterpriseAdminSetInformationForProvisionedEnterpriseUserApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** scim_user_id parameter */
  scimUserId: string;
  body: {
    schemas: string[];
    userName: string;
    name: {
      givenName: string;
      familyName: string;
    };
    emails: {
      value: string;
      type: string;
      primary: boolean;
    }[];
    groups?: {
      value?: string;
    }[];
  };
};
export type EnterpriseAdminUpdateAttributeForEnterpriseUserApiResponse =
  /** status 200 Response */ ScimEnterpriseUser;
export type EnterpriseAdminUpdateAttributeForEnterpriseUserApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** scim_user_id parameter */
  scimUserId: string;
  body: {
    schemas: string[];
    Operations: object[];
  };
};
export type EnterpriseAdminDeleteUserFromEnterpriseApiResponse = unknown;
export type EnterpriseAdminDeleteUserFromEnterpriseApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** scim_user_id parameter */
  scimUserId: string;
};
export type EnabledOrganizations = "all" | "none" | "selected";
export type AllowedActions = "all" | "local_only" | "selected";
export type SelectedActionsUrl = string;
export type ActionsEnterprisePermissions = {
  enabled_organizations: EnabledOrganizations;
  selected_organizations_url?: string;
  allowed_actions?: AllowedActions;
  selected_actions_url?: SelectedActionsUrl;
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
export type SelectedActions = {
  github_owned_allowed?: boolean;
  verified_allowed?: boolean;
  patterns_allowed?: string[];
};
export type RunnerGroupsEnterprise = {
  id: number;
  name: string;
  visibility: string;
  default: boolean;
  selected_organizations_url?: string;
  runners_url: string;
  allows_public_repositories: boolean;
};
export type SelfHostedRunnerLabel = {
  id?: number;
  name: string;
  type?: "read-only" | "custom";
};
export type SelfHostedRunners = {
  id: number;
  name: string;
  os: string;
  status: string;
  busy: boolean;
  labels: SelfHostedRunnerLabel[];
};
export type RunnerApplication = {
  os: string;
  architecture: string;
  download_url: string;
  filename: string;
  temp_download_token?: string;
  sha256_checksum?: string;
};
export type LicenseSimple = {
  key: string;
  name: string;
  url: string | null;
  spdx_id: string | null;
  node_id: string;
  html_url?: string;
} | null;
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
export type AuthenticationToken = {
  token: string;
  expires_at: string;
  permissions?: object;
  repositories?: Repository[];
  single_file?: string | null;
  repository_selection?: "all" | "selected";
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
export type ScimGroupListEnterprise = {
  schemas: string[];
  totalResults: number;
  itemsPerPage: number;
  startIndex: number;
  Resources: {
    schemas: string[];
    id: string;
    externalId?: string | null;
    displayName?: string;
    members?: {
      value?: string;
      $ref?: string;
      display?: string;
    }[];
    meta?: {
      resourceType?: string;
      created?: string;
      lastModified?: string;
      location?: string;
    };
  }[];
};
export type ScimEnterpriseGroup = {
  schemas: string[];
  id: string;
  externalId?: string | null;
  displayName?: string;
  members?: {
    value?: string;
    $ref?: string;
    display?: string;
  }[];
  meta?: {
    resourceType?: string;
    created?: string;
    lastModified?: string;
    location?: string;
  };
};
export type ScimUserListEnterprise = {
  schemas: string[];
  totalResults: number;
  itemsPerPage: number;
  startIndex: number;
  Resources: {
    schemas: string[];
    id: string;
    externalId?: string;
    userName?: string;
    name?: {
      givenName?: string;
      familyName?: string;
    };
    emails?: {
      value?: string;
      primary?: boolean;
      type?: string;
    }[];
    groups?: {
      value?: string;
    }[];
    active?: boolean;
    meta?: {
      resourceType?: string;
      created?: string;
      lastModified?: string;
      location?: string;
    };
  }[];
};
export type ScimEnterpriseUser = {
  schemas: string[];
  id: string;
  externalId?: string;
  userName?: string;
  name?: {
    givenName?: string;
    familyName?: string;
  };
  emails?: {
    value?: string;
    type?: string;
    primary?: boolean;
  }[];
  groups?: {
    value?: string;
  }[];
  active?: boolean;
  meta?: {
    resourceType?: string;
    created?: string;
    lastModified?: string;
    location?: string;
  };
};
export const {
  useEnterpriseAdminGetGithubActionsPermissionsEnterpriseQuery,
  useEnterpriseAdminSetGithubActionsPermissionsEnterpriseMutation,
  useEnterpriseAdminListSelectedOrganizationsEnabledGithubActionsEnterpriseQuery,
  useEnterpriseAdminSetSelectedOrganizationsEnabledGithubActionsEnterpriseMutation,
  useEnterpriseAdminEnableSelectedOrganizationGithubActionsEnterpriseMutation,
  useEnterpriseAdminDisableSelectedOrganizationGithubActionsEnterpriseMutation,
  useEnterpriseAdminGetAllowedActionsEnterpriseQuery,
  useEnterpriseAdminSetAllowedActionsEnterpriseMutation,
  useEnterpriseAdminListSelfHostedRunnerGroupsForEnterpriseQuery,
  useEnterpriseAdminCreateSelfHostedRunnerGroupForEnterpriseMutation,
  useEnterpriseAdminGetSelfHostedRunnerGroupForEnterpriseQuery,
  useEnterpriseAdminUpdateSelfHostedRunnerGroupForEnterpriseMutation,
  useEnterpriseAdminDeleteSelfHostedRunnerGroupFromEnterpriseMutation,
  useEnterpriseAdminListOrgAccessToSelfHostedRunnerGroupInEnterpriseQuery,
  useEnterpriseAdminSetOrgAccessToSelfHostedRunnerGroupInEnterpriseMutation,
  useEnterpriseAdminAddOrgAccessToSelfHostedRunnerGroupInEnterpriseMutation,
  useEnterpriseAdminRemoveOrgAccessToSelfHostedRunnerGroupInEnterpriseMutation,
  useEnterpriseAdminListSelfHostedRunnersInGroupForEnterpriseQuery,
  useEnterpriseAdminSetSelfHostedRunnersInGroupForEnterpriseMutation,
  useEnterpriseAdminAddSelfHostedRunnerToGroupForEnterpriseMutation,
  useEnterpriseAdminRemoveSelfHostedRunnerFromGroupForEnterpriseMutation,
  useEnterpriseAdminListSelfHostedRunnersForEnterpriseQuery,
  useEnterpriseAdminListRunnerApplicationsForEnterpriseQuery,
  useEnterpriseAdminCreateRegistrationTokenForEnterpriseMutation,
  useEnterpriseAdminCreateRemoveTokenForEnterpriseMutation,
  useEnterpriseAdminGetSelfHostedRunnerForEnterpriseQuery,
  useEnterpriseAdminDeleteSelfHostedRunnerFromEnterpriseMutation,
  useEnterpriseAdminListLabelsForSelfHostedRunnerForEnterpriseQuery,
  useEnterpriseAdminAddCustomLabelsToSelfHostedRunnerForEnterpriseMutation,
  useEnterpriseAdminSetCustomLabelsForSelfHostedRunnerForEnterpriseMutation,
  useEnterpriseAdminRemoveAllCustomLabelsFromSelfHostedRunnerForEnterpriseMutation,
  useEnterpriseAdminRemoveCustomLabelFromSelfHostedRunnerForEnterpriseMutation,
  useEnterpriseAdminGetAuditLogQuery,
  useEnterpriseAdminListProvisionedGroupsEnterpriseQuery,
  useEnterpriseAdminProvisionAndInviteEnterpriseGroupMutation,
  useEnterpriseAdminGetProvisioningInformationForEnterpriseGroupQuery,
  useEnterpriseAdminSetInformationForProvisionedEnterpriseGroupMutation,
  useEnterpriseAdminUpdateAttributeForEnterpriseGroupMutation,
  useEnterpriseAdminDeleteScimGroupFromEnterpriseMutation,
  useEnterpriseAdminListProvisionedIdentitiesEnterpriseQuery,
  useEnterpriseAdminProvisionAndInviteEnterpriseUserMutation,
  useEnterpriseAdminGetProvisioningInformationForEnterpriseUserQuery,
  useEnterpriseAdminSetInformationForProvisionedEnterpriseUserMutation,
  useEnterpriseAdminUpdateAttributeForEnterpriseUserMutation,
  useEnterpriseAdminDeleteUserFromEnterpriseMutation,
} = injectedRtkApi;
