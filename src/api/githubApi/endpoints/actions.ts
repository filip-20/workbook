import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    actionsGetGithubActionsPermissionsOrganization: build.query<
      ActionsGetGithubActionsPermissionsOrganizationApiResponse,
      ActionsGetGithubActionsPermissionsOrganizationApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/permissions`,
      }),
    }),
    actionsSetGithubActionsPermissionsOrganization: build.mutation<
      ActionsSetGithubActionsPermissionsOrganizationApiResponse,
      ActionsSetGithubActionsPermissionsOrganizationApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/permissions`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    actionsListSelectedRepositoriesEnabledGithubActionsOrganization:
      build.query<
        ActionsListSelectedRepositoriesEnabledGithubActionsOrganizationApiResponse,
        ActionsListSelectedRepositoriesEnabledGithubActionsOrganizationApiArg
      >({
        query: (queryArg) => ({
          url: `/orgs/${queryArg.org}/actions/permissions/repositories`,
          params: { per_page: queryArg.perPage, page: queryArg.page },
        }),
      }),
    actionsSetSelectedRepositoriesEnabledGithubActionsOrganization:
      build.mutation<
        ActionsSetSelectedRepositoriesEnabledGithubActionsOrganizationApiResponse,
        ActionsSetSelectedRepositoriesEnabledGithubActionsOrganizationApiArg
      >({
        query: (queryArg) => ({
          url: `/orgs/${queryArg.org}/actions/permissions/repositories`,
          method: "PUT",
          body: queryArg.body,
        }),
      }),
    actionsEnableSelectedRepositoryGithubActionsOrganization: build.mutation<
      ActionsEnableSelectedRepositoryGithubActionsOrganizationApiResponse,
      ActionsEnableSelectedRepositoryGithubActionsOrganizationApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/permissions/repositories/${queryArg.repositoryId}`,
        method: "PUT",
      }),
    }),
    actionsDisableSelectedRepositoryGithubActionsOrganization: build.mutation<
      ActionsDisableSelectedRepositoryGithubActionsOrganizationApiResponse,
      ActionsDisableSelectedRepositoryGithubActionsOrganizationApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/permissions/repositories/${queryArg.repositoryId}`,
        method: "DELETE",
      }),
    }),
    actionsGetAllowedActionsOrganization: build.query<
      ActionsGetAllowedActionsOrganizationApiResponse,
      ActionsGetAllowedActionsOrganizationApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/permissions/selected-actions`,
      }),
    }),
    actionsSetAllowedActionsOrganization: build.mutation<
      ActionsSetAllowedActionsOrganizationApiResponse,
      ActionsSetAllowedActionsOrganizationApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/permissions/selected-actions`,
        method: "PUT",
        body: queryArg.selectedActions,
      }),
    }),
    actionsGetGithubActionsDefaultWorkflowPermissionsOrganization: build.query<
      ActionsGetGithubActionsDefaultWorkflowPermissionsOrganizationApiResponse,
      ActionsGetGithubActionsDefaultWorkflowPermissionsOrganizationApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/permissions/workflow`,
      }),
    }),
    actionsSetGithubActionsDefaultWorkflowPermissionsOrganization:
      build.mutation<
        ActionsSetGithubActionsDefaultWorkflowPermissionsOrganizationApiResponse,
        ActionsSetGithubActionsDefaultWorkflowPermissionsOrganizationApiArg
      >({
        query: (queryArg) => ({
          url: `/orgs/${queryArg.org}/actions/permissions/workflow`,
          method: "PUT",
          body: queryArg.actionsSetDefaultWorkflowPermissions,
        }),
      }),
    actionsListSelfHostedRunnerGroupsForOrg: build.query<
      ActionsListSelfHostedRunnerGroupsForOrgApiResponse,
      ActionsListSelfHostedRunnerGroupsForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runner-groups`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    actionsCreateSelfHostedRunnerGroupForOrg: build.mutation<
      ActionsCreateSelfHostedRunnerGroupForOrgApiResponse,
      ActionsCreateSelfHostedRunnerGroupForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runner-groups`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    actionsGetSelfHostedRunnerGroupForOrg: build.query<
      ActionsGetSelfHostedRunnerGroupForOrgApiResponse,
      ActionsGetSelfHostedRunnerGroupForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runner-groups/${queryArg.runnerGroupId}`,
      }),
    }),
    actionsUpdateSelfHostedRunnerGroupForOrg: build.mutation<
      ActionsUpdateSelfHostedRunnerGroupForOrgApiResponse,
      ActionsUpdateSelfHostedRunnerGroupForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runner-groups/${queryArg.runnerGroupId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    actionsDeleteSelfHostedRunnerGroupFromOrg: build.mutation<
      ActionsDeleteSelfHostedRunnerGroupFromOrgApiResponse,
      ActionsDeleteSelfHostedRunnerGroupFromOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runner-groups/${queryArg.runnerGroupId}`,
        method: "DELETE",
      }),
    }),
    actionsListRepoAccessToSelfHostedRunnerGroupInOrg: build.query<
      ActionsListRepoAccessToSelfHostedRunnerGroupInOrgApiResponse,
      ActionsListRepoAccessToSelfHostedRunnerGroupInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runner-groups/${queryArg.runnerGroupId}/repositories`,
        params: { page: queryArg.page, per_page: queryArg.perPage },
      }),
    }),
    actionsSetRepoAccessToSelfHostedRunnerGroupInOrg: build.mutation<
      ActionsSetRepoAccessToSelfHostedRunnerGroupInOrgApiResponse,
      ActionsSetRepoAccessToSelfHostedRunnerGroupInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runner-groups/${queryArg.runnerGroupId}/repositories`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    actionsAddRepoAccessToSelfHostedRunnerGroupInOrg: build.mutation<
      ActionsAddRepoAccessToSelfHostedRunnerGroupInOrgApiResponse,
      ActionsAddRepoAccessToSelfHostedRunnerGroupInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runner-groups/${queryArg.runnerGroupId}/repositories/${queryArg.repositoryId}`,
        method: "PUT",
      }),
    }),
    actionsRemoveRepoAccessToSelfHostedRunnerGroupInOrg: build.mutation<
      ActionsRemoveRepoAccessToSelfHostedRunnerGroupInOrgApiResponse,
      ActionsRemoveRepoAccessToSelfHostedRunnerGroupInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runner-groups/${queryArg.runnerGroupId}/repositories/${queryArg.repositoryId}`,
        method: "DELETE",
      }),
    }),
    actionsListSelfHostedRunnersInGroupForOrg: build.query<
      ActionsListSelfHostedRunnersInGroupForOrgApiResponse,
      ActionsListSelfHostedRunnersInGroupForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runner-groups/${queryArg.runnerGroupId}/runners`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    actionsSetSelfHostedRunnersInGroupForOrg: build.mutation<
      ActionsSetSelfHostedRunnersInGroupForOrgApiResponse,
      ActionsSetSelfHostedRunnersInGroupForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runner-groups/${queryArg.runnerGroupId}/runners`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    actionsAddSelfHostedRunnerToGroupForOrg: build.mutation<
      ActionsAddSelfHostedRunnerToGroupForOrgApiResponse,
      ActionsAddSelfHostedRunnerToGroupForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runner-groups/${queryArg.runnerGroupId}/runners/${queryArg.runnerId}`,
        method: "PUT",
      }),
    }),
    actionsRemoveSelfHostedRunnerFromGroupForOrg: build.mutation<
      ActionsRemoveSelfHostedRunnerFromGroupForOrgApiResponse,
      ActionsRemoveSelfHostedRunnerFromGroupForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runner-groups/${queryArg.runnerGroupId}/runners/${queryArg.runnerId}`,
        method: "DELETE",
      }),
    }),
    actionsListSelfHostedRunnersForOrg: build.query<
      ActionsListSelfHostedRunnersForOrgApiResponse,
      ActionsListSelfHostedRunnersForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runners`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    actionsListRunnerApplicationsForOrg: build.query<
      ActionsListRunnerApplicationsForOrgApiResponse,
      ActionsListRunnerApplicationsForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runners/downloads`,
      }),
    }),
    actionsCreateRegistrationTokenForOrg: build.mutation<
      ActionsCreateRegistrationTokenForOrgApiResponse,
      ActionsCreateRegistrationTokenForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runners/registration-token`,
        method: "POST",
      }),
    }),
    actionsCreateRemoveTokenForOrg: build.mutation<
      ActionsCreateRemoveTokenForOrgApiResponse,
      ActionsCreateRemoveTokenForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runners/remove-token`,
        method: "POST",
      }),
    }),
    actionsGetSelfHostedRunnerForOrg: build.query<
      ActionsGetSelfHostedRunnerForOrgApiResponse,
      ActionsGetSelfHostedRunnerForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runners/${queryArg.runnerId}`,
      }),
    }),
    actionsDeleteSelfHostedRunnerFromOrg: build.mutation<
      ActionsDeleteSelfHostedRunnerFromOrgApiResponse,
      ActionsDeleteSelfHostedRunnerFromOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runners/${queryArg.runnerId}`,
        method: "DELETE",
      }),
    }),
    actionsListLabelsForSelfHostedRunnerForOrg: build.query<
      ActionsListLabelsForSelfHostedRunnerForOrgApiResponse,
      ActionsListLabelsForSelfHostedRunnerForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runners/${queryArg.runnerId}/labels`,
      }),
    }),
    actionsAddCustomLabelsToSelfHostedRunnerForOrg: build.mutation<
      ActionsAddCustomLabelsToSelfHostedRunnerForOrgApiResponse,
      ActionsAddCustomLabelsToSelfHostedRunnerForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runners/${queryArg.runnerId}/labels`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    actionsSetCustomLabelsForSelfHostedRunnerForOrg: build.mutation<
      ActionsSetCustomLabelsForSelfHostedRunnerForOrgApiResponse,
      ActionsSetCustomLabelsForSelfHostedRunnerForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runners/${queryArg.runnerId}/labels`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    actionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrg: build.mutation<
      ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrgApiResponse,
      ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runners/${queryArg.runnerId}/labels`,
        method: "DELETE",
      }),
    }),
    actionsRemoveCustomLabelFromSelfHostedRunnerForOrg: build.mutation<
      ActionsRemoveCustomLabelFromSelfHostedRunnerForOrgApiResponse,
      ActionsRemoveCustomLabelFromSelfHostedRunnerForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/runners/${queryArg.runnerId}/labels/${queryArg.name}`,
        method: "DELETE",
      }),
    }),
    actionsListOrgSecrets: build.query<
      ActionsListOrgSecretsApiResponse,
      ActionsListOrgSecretsApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/secrets`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    actionsGetOrgPublicKey: build.query<
      ActionsGetOrgPublicKeyApiResponse,
      ActionsGetOrgPublicKeyApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/secrets/public-key`,
      }),
    }),
    actionsGetOrgSecret: build.query<
      ActionsGetOrgSecretApiResponse,
      ActionsGetOrgSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/secrets/${queryArg.secretName}`,
      }),
    }),
    actionsCreateOrUpdateOrgSecret: build.mutation<
      ActionsCreateOrUpdateOrgSecretApiResponse,
      ActionsCreateOrUpdateOrgSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/secrets/${queryArg.secretName}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    actionsDeleteOrgSecret: build.mutation<
      ActionsDeleteOrgSecretApiResponse,
      ActionsDeleteOrgSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/secrets/${queryArg.secretName}`,
        method: "DELETE",
      }),
    }),
    actionsListSelectedReposForOrgSecret: build.query<
      ActionsListSelectedReposForOrgSecretApiResponse,
      ActionsListSelectedReposForOrgSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/secrets/${queryArg.secretName}/repositories`,
        params: { page: queryArg.page, per_page: queryArg.perPage },
      }),
    }),
    actionsSetSelectedReposForOrgSecret: build.mutation<
      ActionsSetSelectedReposForOrgSecretApiResponse,
      ActionsSetSelectedReposForOrgSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/secrets/${queryArg.secretName}/repositories`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    actionsAddSelectedRepoToOrgSecret: build.mutation<
      ActionsAddSelectedRepoToOrgSecretApiResponse,
      ActionsAddSelectedRepoToOrgSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/secrets/${queryArg.secretName}/repositories/${queryArg.repositoryId}`,
        method: "PUT",
      }),
    }),
    actionsRemoveSelectedRepoFromOrgSecret: build.mutation<
      ActionsRemoveSelectedRepoFromOrgSecretApiResponse,
      ActionsRemoveSelectedRepoFromOrgSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/actions/secrets/${queryArg.secretName}/repositories/${queryArg.repositoryId}`,
        method: "DELETE",
      }),
    }),
    actionsListArtifactsForRepo: build.query<
      ActionsListArtifactsForRepoApiResponse,
      ActionsListArtifactsForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/artifacts`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    actionsGetArtifact: build.query<
      ActionsGetArtifactApiResponse,
      ActionsGetArtifactApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/artifacts/${queryArg.artifactId}`,
      }),
    }),
    actionsDeleteArtifact: build.mutation<
      ActionsDeleteArtifactApiResponse,
      ActionsDeleteArtifactApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/artifacts/${queryArg.artifactId}`,
        method: "DELETE",
      }),
    }),
    actionsDownloadArtifact: build.query<
      ActionsDownloadArtifactApiResponse,
      ActionsDownloadArtifactApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/artifacts/${queryArg.artifactId}/${queryArg.archiveFormat}`,
      }),
    }),
    actionsGetJobForWorkflowRun: build.query<
      ActionsGetJobForWorkflowRunApiResponse,
      ActionsGetJobForWorkflowRunApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/jobs/${queryArg.jobId}`,
      }),
    }),
    actionsDownloadJobLogsForWorkflowRun: build.query<
      ActionsDownloadJobLogsForWorkflowRunApiResponse,
      ActionsDownloadJobLogsForWorkflowRunApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/jobs/${queryArg.jobId}/logs`,
      }),
    }),
    actionsGetGithubActionsPermissionsRepository: build.query<
      ActionsGetGithubActionsPermissionsRepositoryApiResponse,
      ActionsGetGithubActionsPermissionsRepositoryApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/permissions`,
      }),
    }),
    actionsSetGithubActionsPermissionsRepository: build.mutation<
      ActionsSetGithubActionsPermissionsRepositoryApiResponse,
      ActionsSetGithubActionsPermissionsRepositoryApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/permissions`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    actionsGetAllowedActionsRepository: build.query<
      ActionsGetAllowedActionsRepositoryApiResponse,
      ActionsGetAllowedActionsRepositoryApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/permissions/selected-actions`,
      }),
    }),
    actionsSetAllowedActionsRepository: build.mutation<
      ActionsSetAllowedActionsRepositoryApiResponse,
      ActionsSetAllowedActionsRepositoryApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/permissions/selected-actions`,
        method: "PUT",
        body: queryArg.selectedActions,
      }),
    }),
    actionsListSelfHostedRunnersForRepo: build.query<
      ActionsListSelfHostedRunnersForRepoApiResponse,
      ActionsListSelfHostedRunnersForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runners`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    actionsListRunnerApplicationsForRepo: build.query<
      ActionsListRunnerApplicationsForRepoApiResponse,
      ActionsListRunnerApplicationsForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runners/downloads`,
      }),
    }),
    actionsCreateRegistrationTokenForRepo: build.mutation<
      ActionsCreateRegistrationTokenForRepoApiResponse,
      ActionsCreateRegistrationTokenForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runners/registration-token`,
        method: "POST",
      }),
    }),
    actionsCreateRemoveTokenForRepo: build.mutation<
      ActionsCreateRemoveTokenForRepoApiResponse,
      ActionsCreateRemoveTokenForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runners/remove-token`,
        method: "POST",
      }),
    }),
    actionsGetSelfHostedRunnerForRepo: build.query<
      ActionsGetSelfHostedRunnerForRepoApiResponse,
      ActionsGetSelfHostedRunnerForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runners/${queryArg.runnerId}`,
      }),
    }),
    actionsDeleteSelfHostedRunnerFromRepo: build.mutation<
      ActionsDeleteSelfHostedRunnerFromRepoApiResponse,
      ActionsDeleteSelfHostedRunnerFromRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runners/${queryArg.runnerId}`,
        method: "DELETE",
      }),
    }),
    actionsListLabelsForSelfHostedRunnerForRepo: build.query<
      ActionsListLabelsForSelfHostedRunnerForRepoApiResponse,
      ActionsListLabelsForSelfHostedRunnerForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runners/${queryArg.runnerId}/labels`,
      }),
    }),
    actionsAddCustomLabelsToSelfHostedRunnerForRepo: build.mutation<
      ActionsAddCustomLabelsToSelfHostedRunnerForRepoApiResponse,
      ActionsAddCustomLabelsToSelfHostedRunnerForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runners/${queryArg.runnerId}/labels`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    actionsSetCustomLabelsForSelfHostedRunnerForRepo: build.mutation<
      ActionsSetCustomLabelsForSelfHostedRunnerForRepoApiResponse,
      ActionsSetCustomLabelsForSelfHostedRunnerForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runners/${queryArg.runnerId}/labels`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    actionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepo: build.mutation<
      ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoApiResponse,
      ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runners/${queryArg.runnerId}/labels`,
        method: "DELETE",
      }),
    }),
    actionsRemoveCustomLabelFromSelfHostedRunnerForRepo: build.mutation<
      ActionsRemoveCustomLabelFromSelfHostedRunnerForRepoApiResponse,
      ActionsRemoveCustomLabelFromSelfHostedRunnerForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runners/${queryArg.runnerId}/labels/${queryArg.name}`,
        method: "DELETE",
      }),
    }),
    actionsListWorkflowRunsForRepo: build.query<
      ActionsListWorkflowRunsForRepoApiResponse,
      ActionsListWorkflowRunsForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runs`,
        params: {
          actor: queryArg.actor,
          branch: queryArg.branch,
          event: queryArg.event,
          status: queryArg.status,
          per_page: queryArg.perPage,
          page: queryArg.page,
          created: queryArg.created,
          exclude_pull_requests: queryArg.excludePullRequests,
          check_suite_id: queryArg.checkSuiteId,
        },
      }),
    }),
    actionsGetWorkflowRun: build.query<
      ActionsGetWorkflowRunApiResponse,
      ActionsGetWorkflowRunApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runs/${queryArg.runId}`,
        params: { exclude_pull_requests: queryArg.excludePullRequests },
      }),
    }),
    actionsDeleteWorkflowRun: build.mutation<
      ActionsDeleteWorkflowRunApiResponse,
      ActionsDeleteWorkflowRunApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runs/${queryArg.runId}`,
        method: "DELETE",
      }),
    }),
    actionsGetReviewsForRun: build.query<
      ActionsGetReviewsForRunApiResponse,
      ActionsGetReviewsForRunApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runs/${queryArg.runId}/approvals`,
      }),
    }),
    actionsApproveWorkflowRun: build.mutation<
      ActionsApproveWorkflowRunApiResponse,
      ActionsApproveWorkflowRunApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runs/${queryArg.runId}/approve`,
        method: "POST",
      }),
    }),
    actionsListWorkflowRunArtifacts: build.query<
      ActionsListWorkflowRunArtifactsApiResponse,
      ActionsListWorkflowRunArtifactsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runs/${queryArg.runId}/artifacts`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    actionsGetWorkflowRunAttempt: build.query<
      ActionsGetWorkflowRunAttemptApiResponse,
      ActionsGetWorkflowRunAttemptApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runs/${queryArg.runId}/attempts/${queryArg.attemptNumber}`,
        params: { exclude_pull_requests: queryArg.excludePullRequests },
      }),
    }),
    actionsListJobsForWorkflowRunAttempt: build.query<
      ActionsListJobsForWorkflowRunAttemptApiResponse,
      ActionsListJobsForWorkflowRunAttemptApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runs/${queryArg.runId}/attempts/${queryArg.attemptNumber}/jobs`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    actionsDownloadWorkflowRunAttemptLogs: build.query<
      ActionsDownloadWorkflowRunAttemptLogsApiResponse,
      ActionsDownloadWorkflowRunAttemptLogsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runs/${queryArg.runId}/attempts/${queryArg.attemptNumber}/logs`,
      }),
    }),
    actionsCancelWorkflowRun: build.mutation<
      ActionsCancelWorkflowRunApiResponse,
      ActionsCancelWorkflowRunApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runs/${queryArg.runId}/cancel`,
        method: "POST",
      }),
    }),
    actionsListJobsForWorkflowRun: build.query<
      ActionsListJobsForWorkflowRunApiResponse,
      ActionsListJobsForWorkflowRunApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runs/${queryArg.runId}/jobs`,
        params: {
          filter: queryArg.filter,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    actionsDownloadWorkflowRunLogs: build.query<
      ActionsDownloadWorkflowRunLogsApiResponse,
      ActionsDownloadWorkflowRunLogsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runs/${queryArg.runId}/logs`,
      }),
    }),
    actionsDeleteWorkflowRunLogs: build.mutation<
      ActionsDeleteWorkflowRunLogsApiResponse,
      ActionsDeleteWorkflowRunLogsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runs/${queryArg.runId}/logs`,
        method: "DELETE",
      }),
    }),
    actionsGetPendingDeploymentsForRun: build.query<
      ActionsGetPendingDeploymentsForRunApiResponse,
      ActionsGetPendingDeploymentsForRunApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runs/${queryArg.runId}/pending_deployments`,
      }),
    }),
    actionsReviewPendingDeploymentsForRun: build.mutation<
      ActionsReviewPendingDeploymentsForRunApiResponse,
      ActionsReviewPendingDeploymentsForRunApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runs/${queryArg.runId}/pending_deployments`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    actionsReRunWorkflow: build.mutation<
      ActionsReRunWorkflowApiResponse,
      ActionsReRunWorkflowApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runs/${queryArg.runId}/rerun`,
        method: "POST",
      }),
    }),
    actionsGetWorkflowRunUsage: build.query<
      ActionsGetWorkflowRunUsageApiResponse,
      ActionsGetWorkflowRunUsageApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/runs/${queryArg.runId}/timing`,
      }),
    }),
    actionsListRepoSecrets: build.query<
      ActionsListRepoSecretsApiResponse,
      ActionsListRepoSecretsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/secrets`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    actionsGetRepoPublicKey: build.query<
      ActionsGetRepoPublicKeyApiResponse,
      ActionsGetRepoPublicKeyApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/secrets/public-key`,
      }),
    }),
    actionsGetRepoSecret: build.query<
      ActionsGetRepoSecretApiResponse,
      ActionsGetRepoSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/secrets/${queryArg.secretName}`,
      }),
    }),
    actionsCreateOrUpdateRepoSecret: build.mutation<
      ActionsCreateOrUpdateRepoSecretApiResponse,
      ActionsCreateOrUpdateRepoSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/secrets/${queryArg.secretName}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    actionsDeleteRepoSecret: build.mutation<
      ActionsDeleteRepoSecretApiResponse,
      ActionsDeleteRepoSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/secrets/${queryArg.secretName}`,
        method: "DELETE",
      }),
    }),
    actionsListRepoWorkflows: build.query<
      ActionsListRepoWorkflowsApiResponse,
      ActionsListRepoWorkflowsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/workflows`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    actionsGetWorkflow: build.query<
      ActionsGetWorkflowApiResponse,
      ActionsGetWorkflowApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/workflows/${queryArg.workflowId}`,
      }),
    }),
    actionsDisableWorkflow: build.mutation<
      ActionsDisableWorkflowApiResponse,
      ActionsDisableWorkflowApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/workflows/${queryArg.workflowId}/disable`,
        method: "PUT",
      }),
    }),
    actionsCreateWorkflowDispatch: build.mutation<
      ActionsCreateWorkflowDispatchApiResponse,
      ActionsCreateWorkflowDispatchApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/workflows/${queryArg.workflowId}/dispatches`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    actionsEnableWorkflow: build.mutation<
      ActionsEnableWorkflowApiResponse,
      ActionsEnableWorkflowApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/workflows/${queryArg.workflowId}/enable`,
        method: "PUT",
      }),
    }),
    actionsListWorkflowRuns: build.query<
      ActionsListWorkflowRunsApiResponse,
      ActionsListWorkflowRunsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/workflows/${queryArg.workflowId}/runs`,
        params: {
          actor: queryArg.actor,
          branch: queryArg.branch,
          event: queryArg.event,
          status: queryArg.status,
          per_page: queryArg.perPage,
          page: queryArg.page,
          created: queryArg.created,
          exclude_pull_requests: queryArg.excludePullRequests,
          check_suite_id: queryArg.checkSuiteId,
        },
      }),
    }),
    actionsGetWorkflowUsage: build.query<
      ActionsGetWorkflowUsageApiResponse,
      ActionsGetWorkflowUsageApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/actions/workflows/${queryArg.workflowId}/timing`,
      }),
    }),
    actionsListEnvironmentSecrets: build.query<
      ActionsListEnvironmentSecretsApiResponse,
      ActionsListEnvironmentSecretsApiArg
    >({
      query: (queryArg) => ({
        url: `/repositories/${queryArg.repositoryId}/environments/${queryArg.environmentName}/secrets`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    actionsGetEnvironmentPublicKey: build.query<
      ActionsGetEnvironmentPublicKeyApiResponse,
      ActionsGetEnvironmentPublicKeyApiArg
    >({
      query: (queryArg) => ({
        url: `/repositories/${queryArg.repositoryId}/environments/${queryArg.environmentName}/secrets/public-key`,
      }),
    }),
    actionsGetEnvironmentSecret: build.query<
      ActionsGetEnvironmentSecretApiResponse,
      ActionsGetEnvironmentSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/repositories/${queryArg.repositoryId}/environments/${queryArg.environmentName}/secrets/${queryArg.secretName}`,
      }),
    }),
    actionsCreateOrUpdateEnvironmentSecret: build.mutation<
      ActionsCreateOrUpdateEnvironmentSecretApiResponse,
      ActionsCreateOrUpdateEnvironmentSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/repositories/${queryArg.repositoryId}/environments/${queryArg.environmentName}/secrets/${queryArg.secretName}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    actionsDeleteEnvironmentSecret: build.mutation<
      ActionsDeleteEnvironmentSecretApiResponse,
      ActionsDeleteEnvironmentSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/repositories/${queryArg.repositoryId}/environments/${queryArg.environmentName}/secrets/${queryArg.secretName}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type ActionsGetGithubActionsPermissionsOrganizationApiResponse =
  /** status 200 Response */ ActionsOrganizationPermissions;
export type ActionsGetGithubActionsPermissionsOrganizationApiArg = {
  org: string;
};
export type ActionsSetGithubActionsPermissionsOrganizationApiResponse = unknown;
export type ActionsSetGithubActionsPermissionsOrganizationApiArg = {
  org: string;
  body: {
    enabled_repositories: EnabledRepositories;
    allowed_actions?: AllowedActions;
  };
};
export type ActionsListSelectedRepositoriesEnabledGithubActionsOrganizationApiResponse =
  /** status 200 Response */ {
    total_count: number;
    repositories: Repository[];
  };
export type ActionsListSelectedRepositoriesEnabledGithubActionsOrganizationApiArg =
  {
    org: string;
    /** Results per page (max 100) */
    perPage?: number;
    /** Page number of the results to fetch. */
    page?: number;
  };
export type ActionsSetSelectedRepositoriesEnabledGithubActionsOrganizationApiResponse =
  unknown;
export type ActionsSetSelectedRepositoriesEnabledGithubActionsOrganizationApiArg =
  {
    org: string;
    body: {
      selected_repository_ids: number[];
    };
  };
export type ActionsEnableSelectedRepositoryGithubActionsOrganizationApiResponse =
  unknown;
export type ActionsEnableSelectedRepositoryGithubActionsOrganizationApiArg = {
  org: string;
  repositoryId: number;
};
export type ActionsDisableSelectedRepositoryGithubActionsOrganizationApiResponse =
  unknown;
export type ActionsDisableSelectedRepositoryGithubActionsOrganizationApiArg = {
  org: string;
  repositoryId: number;
};
export type ActionsGetAllowedActionsOrganizationApiResponse =
  /** status 200 Response */ SelectedActions;
export type ActionsGetAllowedActionsOrganizationApiArg = {
  org: string;
};
export type ActionsSetAllowedActionsOrganizationApiResponse = unknown;
export type ActionsSetAllowedActionsOrganizationApiArg = {
  org: string;
  selectedActions: SelectedActions;
};
export type ActionsGetGithubActionsDefaultWorkflowPermissionsOrganizationApiResponse =
  /** status 200 Response */ ActionsGetDefaultWorkflowPermissions;
export type ActionsGetGithubActionsDefaultWorkflowPermissionsOrganizationApiArg =
  {
    org: string;
  };
export type ActionsSetGithubActionsDefaultWorkflowPermissionsOrganizationApiResponse =
  unknown;
export type ActionsSetGithubActionsDefaultWorkflowPermissionsOrganizationApiArg =
  {
    org: string;
    actionsSetDefaultWorkflowPermissions: ActionsSetDefaultWorkflowPermissions;
  };
export type ActionsListSelfHostedRunnerGroupsForOrgApiResponse =
  /** status 200 Response */ {
    total_count: number;
    runner_groups: RunnerGroupsOrg[];
  };
export type ActionsListSelfHostedRunnerGroupsForOrgApiArg = {
  org: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActionsCreateSelfHostedRunnerGroupForOrgApiResponse =
  /** status 201 Response */ RunnerGroupsOrg;
export type ActionsCreateSelfHostedRunnerGroupForOrgApiArg = {
  org: string;
  body: {
    name: string;
    visibility?: "selected" | "all" | "private";
    selected_repository_ids?: number[];
    runners?: number[];
    allows_public_repositories?: boolean;
  };
};
export type ActionsGetSelfHostedRunnerGroupForOrgApiResponse =
  /** status 200 Response */ RunnerGroupsOrg;
export type ActionsGetSelfHostedRunnerGroupForOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runnerGroupId: number;
};
export type ActionsUpdateSelfHostedRunnerGroupForOrgApiResponse =
  /** status 200 Response */ RunnerGroupsOrg;
export type ActionsUpdateSelfHostedRunnerGroupForOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runnerGroupId: number;
  body: {
    name: string;
    visibility?: "selected" | "all" | "private";
    allows_public_repositories?: boolean;
  };
};
export type ActionsDeleteSelfHostedRunnerGroupFromOrgApiResponse = unknown;
export type ActionsDeleteSelfHostedRunnerGroupFromOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runnerGroupId: number;
};
export type ActionsListRepoAccessToSelfHostedRunnerGroupInOrgApiResponse =
  /** status 200 Response */ {
    total_count: number;
    repositories: MinimalRepository[];
  };
export type ActionsListRepoAccessToSelfHostedRunnerGroupInOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runnerGroupId: number;
  /** Page number of the results to fetch. */
  page?: number;
  /** Results per page (max 100) */
  perPage?: number;
};
export type ActionsSetRepoAccessToSelfHostedRunnerGroupInOrgApiResponse =
  unknown;
export type ActionsSetRepoAccessToSelfHostedRunnerGroupInOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runnerGroupId: number;
  body: {
    selected_repository_ids: number[];
  };
};
export type ActionsAddRepoAccessToSelfHostedRunnerGroupInOrgApiResponse =
  unknown;
export type ActionsAddRepoAccessToSelfHostedRunnerGroupInOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runnerGroupId: number;
  repositoryId: number;
};
export type ActionsRemoveRepoAccessToSelfHostedRunnerGroupInOrgApiResponse =
  unknown;
export type ActionsRemoveRepoAccessToSelfHostedRunnerGroupInOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runnerGroupId: number;
  repositoryId: number;
};
export type ActionsListSelfHostedRunnersInGroupForOrgApiResponse =
  /** status 200 Response */ {
    total_count: number;
    runners: SelfHostedRunners[];
  };
export type ActionsListSelfHostedRunnersInGroupForOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runnerGroupId: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActionsSetSelfHostedRunnersInGroupForOrgApiResponse = unknown;
export type ActionsSetSelfHostedRunnersInGroupForOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runnerGroupId: number;
  body: {
    runners: number[];
  };
};
export type ActionsAddSelfHostedRunnerToGroupForOrgApiResponse = unknown;
export type ActionsAddSelfHostedRunnerToGroupForOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runnerGroupId: number;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
};
export type ActionsRemoveSelfHostedRunnerFromGroupForOrgApiResponse = unknown;
export type ActionsRemoveSelfHostedRunnerFromGroupForOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runnerGroupId: number;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
};
export type ActionsListSelfHostedRunnersForOrgApiResponse =
  /** status 200 Response */ {
    total_count: number;
    runners: SelfHostedRunners[];
  };
export type ActionsListSelfHostedRunnersForOrgApiArg = {
  org: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActionsListRunnerApplicationsForOrgApiResponse =
  /** status 200 Response */ RunnerApplication[];
export type ActionsListRunnerApplicationsForOrgApiArg = {
  org: string;
};
export type ActionsCreateRegistrationTokenForOrgApiResponse =
  /** status 201 Response */ AuthenticationToken;
export type ActionsCreateRegistrationTokenForOrgApiArg = {
  org: string;
};
export type ActionsCreateRemoveTokenForOrgApiResponse =
  /** status 201 Response */ AuthenticationToken;
export type ActionsCreateRemoveTokenForOrgApiArg = {
  org: string;
};
export type ActionsGetSelfHostedRunnerForOrgApiResponse =
  /** status 200 Response */ SelfHostedRunners;
export type ActionsGetSelfHostedRunnerForOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
};
export type ActionsDeleteSelfHostedRunnerFromOrgApiResponse = unknown;
export type ActionsDeleteSelfHostedRunnerFromOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
};
export type ActionsListLabelsForSelfHostedRunnerForOrgApiResponse =
  /** status 200 Response */ {
    total_count: number;
    labels: SelfHostedRunnerLabel[];
  };
export type ActionsListLabelsForSelfHostedRunnerForOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
};
export type ActionsAddCustomLabelsToSelfHostedRunnerForOrgApiResponse =
  /** status 200 Response */ {
    total_count: number;
    labels: SelfHostedRunnerLabel[];
  };
export type ActionsAddCustomLabelsToSelfHostedRunnerForOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
  body: {
    labels: string[];
  };
};
export type ActionsSetCustomLabelsForSelfHostedRunnerForOrgApiResponse =
  /** status 200 Response */ {
    total_count: number;
    labels: SelfHostedRunnerLabel[];
  };
export type ActionsSetCustomLabelsForSelfHostedRunnerForOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
  body: {
    labels: string[];
  };
};
export type ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrgApiResponse =
  /** status 200 Response */ {
    total_count: number;
    labels: SelfHostedRunnerLabel[];
  };
export type ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
};
export type ActionsRemoveCustomLabelFromSelfHostedRunnerForOrgApiResponse =
  /** status 200 Response */ {
    total_count: number;
    labels: SelfHostedRunnerLabel[];
  };
export type ActionsRemoveCustomLabelFromSelfHostedRunnerForOrgApiArg = {
  org: string;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
  /** The name of a self-hosted runner's custom label. */
  name: string;
};
export type ActionsListOrgSecretsApiResponse = /** status 200 Response */ {
  total_count: number;
  secrets: ActionsSecretForAnOrganization[];
};
export type ActionsListOrgSecretsApiArg = {
  org: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActionsGetOrgPublicKeyApiResponse =
  /** status 200 Response */ ActionsPublicKey;
export type ActionsGetOrgPublicKeyApiArg = {
  org: string;
};
export type ActionsGetOrgSecretApiResponse =
  /** status 200 Response */ ActionsSecretForAnOrganization;
export type ActionsGetOrgSecretApiArg = {
  org: string;
  /** secret_name parameter */
  secretName: string;
};
export type ActionsCreateOrUpdateOrgSecretApiResponse =
  /** status 201 Response when creating a secret */
    | EmptyObject
    | /** status 204 Response when updating a secret */ undefined;
export type ActionsCreateOrUpdateOrgSecretApiArg = {
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
export type ActionsDeleteOrgSecretApiResponse = unknown;
export type ActionsDeleteOrgSecretApiArg = {
  org: string;
  /** secret_name parameter */
  secretName: string;
};
export type ActionsListSelectedReposForOrgSecretApiResponse =
  /** status 200 Response */ {
    total_count: number;
    repositories: MinimalRepository[];
  };
export type ActionsListSelectedReposForOrgSecretApiArg = {
  org: string;
  /** secret_name parameter */
  secretName: string;
  /** Page number of the results to fetch. */
  page?: number;
  /** Results per page (max 100) */
  perPage?: number;
};
export type ActionsSetSelectedReposForOrgSecretApiResponse = unknown;
export type ActionsSetSelectedReposForOrgSecretApiArg = {
  org: string;
  /** secret_name parameter */
  secretName: string;
  body: {
    selected_repository_ids: number[];
  };
};
export type ActionsAddSelectedRepoToOrgSecretApiResponse = unknown;
export type ActionsAddSelectedRepoToOrgSecretApiArg = {
  org: string;
  /** secret_name parameter */
  secretName: string;
  repositoryId: number;
};
export type ActionsRemoveSelectedRepoFromOrgSecretApiResponse = unknown;
export type ActionsRemoveSelectedRepoFromOrgSecretApiArg = {
  org: string;
  /** secret_name parameter */
  secretName: string;
  repositoryId: number;
};
export type ActionsListArtifactsForRepoApiResponse =
  /** status 200 Response */ {
    total_count: number;
    artifacts: Artifact[];
  };
export type ActionsListArtifactsForRepoApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActionsGetArtifactApiResponse = /** status 200 Response */ Artifact;
export type ActionsGetArtifactApiArg = {
  owner: string;
  repo: string;
  /** artifact_id parameter */
  artifactId: number;
};
export type ActionsDeleteArtifactApiResponse = unknown;
export type ActionsDeleteArtifactApiArg = {
  owner: string;
  repo: string;
  /** artifact_id parameter */
  artifactId: number;
};
export type ActionsDownloadArtifactApiResponse = unknown;
export type ActionsDownloadArtifactApiArg = {
  owner: string;
  repo: string;
  /** artifact_id parameter */
  artifactId: number;
  archiveFormat: string;
};
export type ActionsGetJobForWorkflowRunApiResponse =
  /** status 200 Response */ Job;
export type ActionsGetJobForWorkflowRunApiArg = {
  owner: string;
  repo: string;
  /** job_id parameter */
  jobId: number;
};
export type ActionsDownloadJobLogsForWorkflowRunApiResponse = unknown;
export type ActionsDownloadJobLogsForWorkflowRunApiArg = {
  owner: string;
  repo: string;
  /** job_id parameter */
  jobId: number;
};
export type ActionsGetGithubActionsPermissionsRepositoryApiResponse =
  /** status 200 Response */ ActionsRepositoryPermissions;
export type ActionsGetGithubActionsPermissionsRepositoryApiArg = {
  owner: string;
  repo: string;
};
export type ActionsSetGithubActionsPermissionsRepositoryApiResponse = unknown;
export type ActionsSetGithubActionsPermissionsRepositoryApiArg = {
  owner: string;
  repo: string;
  body: {
    enabled: ActionsEnabled;
    allowed_actions?: AllowedActions;
  };
};
export type ActionsGetAllowedActionsRepositoryApiResponse =
  /** status 200 Response */ SelectedActions;
export type ActionsGetAllowedActionsRepositoryApiArg = {
  owner: string;
  repo: string;
};
export type ActionsSetAllowedActionsRepositoryApiResponse = unknown;
export type ActionsSetAllowedActionsRepositoryApiArg = {
  owner: string;
  repo: string;
  selectedActions: SelectedActions;
};
export type ActionsListSelfHostedRunnersForRepoApiResponse =
  /** status 200 Response */ {
    total_count: number;
    runners: SelfHostedRunners[];
  };
export type ActionsListSelfHostedRunnersForRepoApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActionsListRunnerApplicationsForRepoApiResponse =
  /** status 200 Response */ RunnerApplication[];
export type ActionsListRunnerApplicationsForRepoApiArg = {
  owner: string;
  repo: string;
};
export type ActionsCreateRegistrationTokenForRepoApiResponse =
  /** status 201 Response */ AuthenticationToken;
export type ActionsCreateRegistrationTokenForRepoApiArg = {
  owner: string;
  repo: string;
};
export type ActionsCreateRemoveTokenForRepoApiResponse =
  /** status 201 Response */ AuthenticationToken;
export type ActionsCreateRemoveTokenForRepoApiArg = {
  owner: string;
  repo: string;
};
export type ActionsGetSelfHostedRunnerForRepoApiResponse =
  /** status 200 Response */ SelfHostedRunners;
export type ActionsGetSelfHostedRunnerForRepoApiArg = {
  owner: string;
  repo: string;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
};
export type ActionsDeleteSelfHostedRunnerFromRepoApiResponse = unknown;
export type ActionsDeleteSelfHostedRunnerFromRepoApiArg = {
  owner: string;
  repo: string;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
};
export type ActionsListLabelsForSelfHostedRunnerForRepoApiResponse =
  /** status 200 Response */ {
    total_count: number;
    labels: SelfHostedRunnerLabel[];
  };
export type ActionsListLabelsForSelfHostedRunnerForRepoApiArg = {
  owner: string;
  repo: string;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
};
export type ActionsAddCustomLabelsToSelfHostedRunnerForRepoApiResponse =
  /** status 200 Response */ {
    total_count: number;
    labels: SelfHostedRunnerLabel[];
  };
export type ActionsAddCustomLabelsToSelfHostedRunnerForRepoApiArg = {
  owner: string;
  repo: string;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
  body: {
    labels: string[];
  };
};
export type ActionsSetCustomLabelsForSelfHostedRunnerForRepoApiResponse =
  /** status 200 Response */ {
    total_count: number;
    labels: SelfHostedRunnerLabel[];
  };
export type ActionsSetCustomLabelsForSelfHostedRunnerForRepoApiArg = {
  owner: string;
  repo: string;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
  body: {
    labels: string[];
  };
};
export type ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoApiResponse =
  /** status 200 Response */ {
    total_count: number;
    labels: SelfHostedRunnerLabel[];
  };
export type ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoApiArg = {
  owner: string;
  repo: string;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
};
export type ActionsRemoveCustomLabelFromSelfHostedRunnerForRepoApiResponse =
  /** status 200 Response */ {
    total_count: number;
    labels: SelfHostedRunnerLabel[];
  };
export type ActionsRemoveCustomLabelFromSelfHostedRunnerForRepoApiArg = {
  owner: string;
  repo: string;
  /** Unique identifier of the self-hosted runner. */
  runnerId: number;
  /** The name of a self-hosted runner's custom label. */
  name: string;
};
export type ActionsListWorkflowRunsForRepoApiResponse =
  /** status 200 Response */ {
    total_count: number;
    workflow_runs: WorkflowRun[];
  };
export type ActionsListWorkflowRunsForRepoApiArg = {
  owner: string;
  repo: string;
  /** Returns someone's workflow runs. Use the login for the user who created the `push` associated with the check suite or workflow run. */
  actor?: string;
  /** Returns workflow runs associated with a branch. Use the name of the branch of the `push`. */
  branch?: string;
  /** Returns workflow run triggered by the event you specify. For example, `push`, `pull_request` or `issue`. For more information, see "[Events that trigger workflows](https://docs.github.com/en/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows)." */
  event?: string;
  /** Returns workflow runs with the check run `status` or `conclusion` that you specify. For example, a conclusion can be `success` or a status can be `in_progress`. Only GitHub can set a status of `waiting` or `requested`. For a list of the possible `status` and `conclusion` options, see "[Create a check run](https://docs.github.com/rest/reference/checks#create-a-check-run)." */
  status?:
    | "completed"
    | "action_required"
    | "cancelled"
    | "failure"
    | "neutral"
    | "skipped"
    | "stale"
    | "success"
    | "timed_out"
    | "in_progress"
    | "queued"
    | "requested"
    | "waiting";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
  /** Returns workflow runs created within the given date-time range. For more information on the syntax, see "[Understanding the search syntax](https://docs.github.com/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax#query-for-dates)." */
  created?: string;
  /** If `true` pull requests are omitted from the response (empty array). */
  excludePullRequests?: boolean;
  /** Returns workflow runs with the `check_suite_id` that you specify. */
  checkSuiteId?: number;
};
export type ActionsGetWorkflowRunApiResponse =
  /** status 200 Response */ WorkflowRun;
export type ActionsGetWorkflowRunApiArg = {
  owner: string;
  repo: string;
  /** The id of the workflow run. */
  runId: number;
  /** If `true` pull requests are omitted from the response (empty array). */
  excludePullRequests?: boolean;
};
export type ActionsDeleteWorkflowRunApiResponse = unknown;
export type ActionsDeleteWorkflowRunApiArg = {
  owner: string;
  repo: string;
  /** The id of the workflow run. */
  runId: number;
};
export type ActionsGetReviewsForRunApiResponse =
  /** status 200 Response */ EnvironmentApproval[];
export type ActionsGetReviewsForRunApiArg = {
  owner: string;
  repo: string;
  /** The id of the workflow run. */
  runId: number;
};
export type ActionsApproveWorkflowRunApiResponse =
  /** status 201 Response */ EmptyObject;
export type ActionsApproveWorkflowRunApiArg = {
  owner: string;
  repo: string;
  /** The id of the workflow run. */
  runId: number;
};
export type ActionsListWorkflowRunArtifactsApiResponse =
  /** status 200 Response */ {
    total_count: number;
    artifacts: Artifact[];
  };
export type ActionsListWorkflowRunArtifactsApiArg = {
  owner: string;
  repo: string;
  /** The id of the workflow run. */
  runId: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActionsGetWorkflowRunAttemptApiResponse =
  /** status 200 Response */ WorkflowRun;
export type ActionsGetWorkflowRunAttemptApiArg = {
  owner: string;
  repo: string;
  /** The id of the workflow run. */
  runId: number;
  /** The attempt number of the workflow run. */
  attemptNumber: number;
  /** If `true` pull requests are omitted from the response (empty array). */
  excludePullRequests?: boolean;
};
export type ActionsListJobsForWorkflowRunAttemptApiResponse =
  /** status 200 Response */ {
    total_count: number;
    jobs: Job[];
  };
export type ActionsListJobsForWorkflowRunAttemptApiArg = {
  owner: string;
  repo: string;
  /** The id of the workflow run. */
  runId: number;
  /** The attempt number of the workflow run. */
  attemptNumber: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActionsDownloadWorkflowRunAttemptLogsApiResponse = unknown;
export type ActionsDownloadWorkflowRunAttemptLogsApiArg = {
  owner: string;
  repo: string;
  /** The id of the workflow run. */
  runId: number;
  /** The attempt number of the workflow run. */
  attemptNumber: number;
};
export type ActionsCancelWorkflowRunApiResponse = /** status 202 Response */ {};
export type ActionsCancelWorkflowRunApiArg = {
  owner: string;
  repo: string;
  /** The id of the workflow run. */
  runId: number;
};
export type ActionsListJobsForWorkflowRunApiResponse =
  /** status 200 Response */ {
    total_count: number;
    jobs: Job[];
  };
export type ActionsListJobsForWorkflowRunApiArg = {
  owner: string;
  repo: string;
  /** The id of the workflow run. */
  runId: number;
  /** Filters jobs by their `completed_at` timestamp. Can be one of:
    \* `latest`: Returns jobs from the most recent execution of the workflow run.
    \* `all`: Returns all jobs for a workflow run, including from old executions of the workflow run. */
  filter?: "latest" | "all";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActionsDownloadWorkflowRunLogsApiResponse = unknown;
export type ActionsDownloadWorkflowRunLogsApiArg = {
  owner: string;
  repo: string;
  /** The id of the workflow run. */
  runId: number;
};
export type ActionsDeleteWorkflowRunLogsApiResponse =
  /** status 204 Response */ undefined;
export type ActionsDeleteWorkflowRunLogsApiArg = {
  owner: string;
  repo: string;
  /** The id of the workflow run. */
  runId: number;
};
export type ActionsGetPendingDeploymentsForRunApiResponse =
  /** status 200 Response */ PendingDeployment[];
export type ActionsGetPendingDeploymentsForRunApiArg = {
  owner: string;
  repo: string;
  /** The id of the workflow run. */
  runId: number;
};
export type ActionsReviewPendingDeploymentsForRunApiResponse =
  /** status 200 Response */ Deployment[];
export type ActionsReviewPendingDeploymentsForRunApiArg = {
  owner: string;
  repo: string;
  /** The id of the workflow run. */
  runId: number;
  body: {
    environment_ids: number[];
    state: "approved" | "rejected";
    comment: string;
  };
};
export type ActionsReRunWorkflowApiResponse = /** status 201 Response */ {};
export type ActionsReRunWorkflowApiArg = {
  owner: string;
  repo: string;
  /** The id of the workflow run. */
  runId: number;
};
export type ActionsGetWorkflowRunUsageApiResponse =
  /** status 200 Response */ WorkflowRunUsage;
export type ActionsGetWorkflowRunUsageApiArg = {
  owner: string;
  repo: string;
  /** The id of the workflow run. */
  runId: number;
};
export type ActionsListRepoSecretsApiResponse = /** status 200 Response */ {
  total_count: number;
  secrets: ActionsSecret[];
};
export type ActionsListRepoSecretsApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActionsGetRepoPublicKeyApiResponse =
  /** status 200 Response */ ActionsPublicKey;
export type ActionsGetRepoPublicKeyApiArg = {
  owner: string;
  repo: string;
};
export type ActionsGetRepoSecretApiResponse =
  /** status 200 Response */ ActionsSecret;
export type ActionsGetRepoSecretApiArg = {
  owner: string;
  repo: string;
  /** secret_name parameter */
  secretName: string;
};
export type ActionsCreateOrUpdateRepoSecretApiResponse =
  /** status 201 Response when creating a secret */
    | {}
    | /** status 204 Response when updating a secret */ undefined;
export type ActionsCreateOrUpdateRepoSecretApiArg = {
  owner: string;
  repo: string;
  /** secret_name parameter */
  secretName: string;
  body: {
    encrypted_value?: string;
    key_id?: string;
  };
};
export type ActionsDeleteRepoSecretApiResponse = unknown;
export type ActionsDeleteRepoSecretApiArg = {
  owner: string;
  repo: string;
  /** secret_name parameter */
  secretName: string;
};
export type ActionsListRepoWorkflowsApiResponse = /** status 200 Response */ {
  total_count: number;
  workflows: Workflow[];
};
export type ActionsListRepoWorkflowsApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActionsGetWorkflowApiResponse = /** status 200 Response */ Workflow;
export type ActionsGetWorkflowApiArg = {
  owner: string;
  repo: string;
  /** The ID of the workflow. You can also pass the workflow file name as a string. */
  workflowId: number | string;
};
export type ActionsDisableWorkflowApiResponse = unknown;
export type ActionsDisableWorkflowApiArg = {
  owner: string;
  repo: string;
  /** The ID of the workflow. You can also pass the workflow file name as a string. */
  workflowId: number | string;
};
export type ActionsCreateWorkflowDispatchApiResponse = unknown;
export type ActionsCreateWorkflowDispatchApiArg = {
  owner: string;
  repo: string;
  /** The ID of the workflow. You can also pass the workflow file name as a string. */
  workflowId: number | string;
  body: {
    ref: string;
    inputs?: {
      [key: string]: string;
    };
  };
};
export type ActionsEnableWorkflowApiResponse = unknown;
export type ActionsEnableWorkflowApiArg = {
  owner: string;
  repo: string;
  /** The ID of the workflow. You can also pass the workflow file name as a string. */
  workflowId: number | string;
};
export type ActionsListWorkflowRunsApiResponse = /** status 200 Response */ {
  total_count: number;
  workflow_runs: WorkflowRun[];
};
export type ActionsListWorkflowRunsApiArg = {
  owner: string;
  repo: string;
  /** The ID of the workflow. You can also pass the workflow file name as a string. */
  workflowId: number | string;
  /** Returns someone's workflow runs. Use the login for the user who created the `push` associated with the check suite or workflow run. */
  actor?: string;
  /** Returns workflow runs associated with a branch. Use the name of the branch of the `push`. */
  branch?: string;
  /** Returns workflow run triggered by the event you specify. For example, `push`, `pull_request` or `issue`. For more information, see "[Events that trigger workflows](https://docs.github.com/en/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows)." */
  event?: string;
  /** Returns workflow runs with the check run `status` or `conclusion` that you specify. For example, a conclusion can be `success` or a status can be `in_progress`. Only GitHub can set a status of `waiting` or `requested`. For a list of the possible `status` and `conclusion` options, see "[Create a check run](https://docs.github.com/rest/reference/checks#create-a-check-run)." */
  status?:
    | "completed"
    | "action_required"
    | "cancelled"
    | "failure"
    | "neutral"
    | "skipped"
    | "stale"
    | "success"
    | "timed_out"
    | "in_progress"
    | "queued"
    | "requested"
    | "waiting";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
  /** Returns workflow runs created within the given date-time range. For more information on the syntax, see "[Understanding the search syntax](https://docs.github.com/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax#query-for-dates)." */
  created?: string;
  /** If `true` pull requests are omitted from the response (empty array). */
  excludePullRequests?: boolean;
  /** Returns workflow runs with the `check_suite_id` that you specify. */
  checkSuiteId?: number;
};
export type ActionsGetWorkflowUsageApiResponse =
  /** status 200 Response */ WorkflowUsage;
export type ActionsGetWorkflowUsageApiArg = {
  owner: string;
  repo: string;
  /** The ID of the workflow. You can also pass the workflow file name as a string. */
  workflowId: number | string;
};
export type ActionsListEnvironmentSecretsApiResponse =
  /** status 200 Response */ {
    total_count: number;
    secrets: ActionsSecret[];
  };
export type ActionsListEnvironmentSecretsApiArg = {
  repositoryId: number;
  /** The name of the environment */
  environmentName: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ActionsGetEnvironmentPublicKeyApiResponse =
  /** status 200 Response */ ActionsPublicKey;
export type ActionsGetEnvironmentPublicKeyApiArg = {
  repositoryId: number;
  /** The name of the environment */
  environmentName: string;
};
export type ActionsGetEnvironmentSecretApiResponse =
  /** status 200 Response */ ActionsSecret;
export type ActionsGetEnvironmentSecretApiArg = {
  repositoryId: number;
  /** The name of the environment */
  environmentName: string;
  /** secret_name parameter */
  secretName: string;
};
export type ActionsCreateOrUpdateEnvironmentSecretApiResponse =
  /** status 201 Response when creating a secret */
    | EmptyObject
    | /** status 204 Response when updating a secret */ undefined;
export type ActionsCreateOrUpdateEnvironmentSecretApiArg = {
  repositoryId: number;
  /** The name of the environment */
  environmentName: string;
  /** secret_name parameter */
  secretName: string;
  body: {
    encrypted_value: string;
    key_id: string;
  };
};
export type ActionsDeleteEnvironmentSecretApiResponse = unknown;
export type ActionsDeleteEnvironmentSecretApiArg = {
  repositoryId: number;
  /** The name of the environment */
  environmentName: string;
  /** secret_name parameter */
  secretName: string;
};
export type EnabledRepositories = "all" | "none" | "selected";
export type AllowedActions = "all" | "local_only" | "selected";
export type SelectedActionsUrl = string;
export type ActionsOrganizationPermissions = {
  enabled_repositories: EnabledRepositories;
  selected_repositories_url?: string;
  allowed_actions?: AllowedActions;
  selected_actions_url?: SelectedActionsUrl;
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
export type SelectedActions = {
  github_owned_allowed?: boolean;
  verified_allowed?: boolean;
  patterns_allowed?: string[];
};
export type ActionsDefaultWorkflowPermissions = "read" | "write";
export type ActionsCanApprovePullRequestReviews = boolean;
export type ActionsGetDefaultWorkflowPermissions = {
  default_workflow_permissions: ActionsDefaultWorkflowPermissions;
  can_approve_pull_request_reviews: ActionsCanApprovePullRequestReviews;
};
export type ActionsSetDefaultWorkflowPermissions = {
  default_workflow_permissions?: ActionsDefaultWorkflowPermissions;
  can_approve_pull_request_reviews?: ActionsCanApprovePullRequestReviews;
};
export type RunnerGroupsOrg = {
  id: number;
  name: string;
  visibility: string;
  default: boolean;
  selected_repositories_url?: string;
  runners_url: string;
  inherited: boolean;
  inherited_allows_public_repositories?: boolean;
  allows_public_repositories: boolean;
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
export type ActionsSecretForAnOrganization = {
  name: string;
  created_at: string;
  updated_at: string;
  visibility: "all" | "private" | "selected";
  selected_repositories_url?: string;
};
export type ActionsPublicKey = {
  key_id: string;
  key: string;
  id?: number;
  url?: string;
  title?: string;
  created_at?: string;
};
export type EmptyObject = {};
export type Artifact = {
  id: number;
  node_id: string;
  name: string;
  size_in_bytes: number;
  url: string;
  archive_download_url: string;
  expired: boolean;
  created_at: string | null;
  expires_at: string | null;
  updated_at: string | null;
};
export type Job = {
  id: number;
  run_id: number;
  run_url: string;
  run_attempt?: number;
  node_id: string;
  head_sha: string;
  url: string;
  html_url: string | null;
  status: "queued" | "in_progress" | "completed";
  conclusion: string | null;
  started_at: string;
  completed_at: string | null;
  name: string;
  steps?: {
    status: "queued" | "in_progress" | "completed";
    conclusion: string | null;
    name: string;
    number: number;
    started_at?: string | null;
    completed_at?: string | null;
  }[];
  check_run_url: string;
  labels: string[];
  runner_id: number | null;
  runner_name: string | null;
  runner_group_id: number | null;
  runner_group_name: string | null;
};
export type ActionsEnabled = boolean;
export type ActionsRepositoryPermissions = {
  enabled: ActionsEnabled;
  allowed_actions?: AllowedActions;
  selected_actions_url?: SelectedActionsUrl;
};
export type PullRequestMinimal = {
  id: number;
  number: number;
  url: string;
  head: {
    ref: string;
    sha: string;
    repo: {
      id: number;
      url: string;
      name: string;
    };
  };
  base: {
    ref: string;
    sha: string;
    repo: {
      id: number;
      url: string;
      name: string;
    };
  };
};
export type SimpleCommit = {
  id: string;
  tree_id: string;
  message: string;
  timestamp: string;
  author: {
    name: string;
    email: string;
  } | null;
  committer: {
    name: string;
    email: string;
  } | null;
} | null;
export type WorkflowRun = {
  id: number;
  name?: string | null;
  node_id: string;
  check_suite_id?: number;
  check_suite_node_id?: string;
  head_branch: string | null;
  head_sha: string;
  run_number: number;
  run_attempt?: number;
  event: string;
  status: string | null;
  conclusion: string | null;
  workflow_id: number;
  url: string;
  html_url: string;
  pull_requests: PullRequestMinimal[] | null;
  created_at: string;
  updated_at: string;
  run_started_at?: string;
  jobs_url: string;
  logs_url: string;
  check_suite_url: string;
  artifacts_url: string;
  cancel_url: string;
  rerun_url: string;
  previous_attempt_url?: string | null;
  workflow_url: string;
  head_commit: SimpleCommit;
  repository: MinimalRepository;
  head_repository: MinimalRepository;
  head_repository_id?: number;
};
export type EnvironmentApproval = {
  environments: {
    id?: number;
    node_id?: string;
    name?: string;
    url?: string;
    html_url?: string;
    created_at?: string;
    updated_at?: string;
  }[];
  state: "approved" | "rejected";
  user: SimpleUser2;
  comment: string;
};
export type DeploymentReviewerType = "User" | "Team";
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
export type PendingDeployment = {
  environment: {
    id?: number;
    node_id?: string;
    name?: string;
    url?: string;
    html_url?: string;
  };
  wait_timer: number;
  wait_timer_started_at: string | null;
  current_user_can_approve: boolean;
  reviewers: {
    type?: DeploymentReviewerType;
    reviewer?: SimpleUser2 | Team;
  }[];
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
export type Deployment = {
  url: string;
  id: number;
  node_id: string;
  sha: string;
  ref: string;
  task: string;
  payload:
    | {
        [key: string]: any;
      }
    | string;
  original_environment?: string;
  environment: string;
  description: string | null;
  creator: SimpleUser;
  created_at: string;
  updated_at: string;
  statuses_url: string;
  repository_url: string;
  transient_environment?: boolean;
  production_environment?: boolean;
  performed_via_github_app?: GitHubApp;
};
export type WorkflowRunUsage = {
  billable: {
    UBUNTU?: {
      total_ms: number;
      jobs: number;
      job_runs?: {
        job_id: number;
        duration_ms: number;
      }[];
    };
    MACOS?: {
      total_ms: number;
      jobs: number;
      job_runs?: {
        job_id: number;
        duration_ms: number;
      }[];
    };
    WINDOWS?: {
      total_ms: number;
      jobs: number;
      job_runs?: {
        job_id: number;
        duration_ms: number;
      }[];
    };
  };
  run_duration_ms?: number;
};
export type ActionsSecret = {
  name: string;
  created_at: string;
  updated_at: string;
};
export type Workflow = {
  id: number;
  node_id: string;
  name: string;
  path: string;
  state:
    | "active"
    | "deleted"
    | "disabled_fork"
    | "disabled_inactivity"
    | "disabled_manually";
  created_at: string;
  updated_at: string;
  url: string;
  html_url: string;
  badge_url: string;
  deleted_at?: string;
};
export type WorkflowUsage = {
  billable: {
    UBUNTU?: {
      total_ms?: number;
    };
    MACOS?: {
      total_ms?: number;
    };
    WINDOWS?: {
      total_ms?: number;
    };
  };
};
export const {
  useActionsGetGithubActionsPermissionsOrganizationQuery,
  useActionsSetGithubActionsPermissionsOrganizationMutation,
  useActionsListSelectedRepositoriesEnabledGithubActionsOrganizationQuery,
  useActionsSetSelectedRepositoriesEnabledGithubActionsOrganizationMutation,
  useActionsEnableSelectedRepositoryGithubActionsOrganizationMutation,
  useActionsDisableSelectedRepositoryGithubActionsOrganizationMutation,
  useActionsGetAllowedActionsOrganizationQuery,
  useActionsSetAllowedActionsOrganizationMutation,
  useActionsGetGithubActionsDefaultWorkflowPermissionsOrganizationQuery,
  useActionsSetGithubActionsDefaultWorkflowPermissionsOrganizationMutation,
  useActionsListSelfHostedRunnerGroupsForOrgQuery,
  useActionsCreateSelfHostedRunnerGroupForOrgMutation,
  useActionsGetSelfHostedRunnerGroupForOrgQuery,
  useActionsUpdateSelfHostedRunnerGroupForOrgMutation,
  useActionsDeleteSelfHostedRunnerGroupFromOrgMutation,
  useActionsListRepoAccessToSelfHostedRunnerGroupInOrgQuery,
  useActionsSetRepoAccessToSelfHostedRunnerGroupInOrgMutation,
  useActionsAddRepoAccessToSelfHostedRunnerGroupInOrgMutation,
  useActionsRemoveRepoAccessToSelfHostedRunnerGroupInOrgMutation,
  useActionsListSelfHostedRunnersInGroupForOrgQuery,
  useActionsSetSelfHostedRunnersInGroupForOrgMutation,
  useActionsAddSelfHostedRunnerToGroupForOrgMutation,
  useActionsRemoveSelfHostedRunnerFromGroupForOrgMutation,
  useActionsListSelfHostedRunnersForOrgQuery,
  useActionsListRunnerApplicationsForOrgQuery,
  useActionsCreateRegistrationTokenForOrgMutation,
  useActionsCreateRemoveTokenForOrgMutation,
  useActionsGetSelfHostedRunnerForOrgQuery,
  useActionsDeleteSelfHostedRunnerFromOrgMutation,
  useActionsListLabelsForSelfHostedRunnerForOrgQuery,
  useActionsAddCustomLabelsToSelfHostedRunnerForOrgMutation,
  useActionsSetCustomLabelsForSelfHostedRunnerForOrgMutation,
  useActionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrgMutation,
  useActionsRemoveCustomLabelFromSelfHostedRunnerForOrgMutation,
  useActionsListOrgSecretsQuery,
  useActionsGetOrgPublicKeyQuery,
  useActionsGetOrgSecretQuery,
  useActionsCreateOrUpdateOrgSecretMutation,
  useActionsDeleteOrgSecretMutation,
  useActionsListSelectedReposForOrgSecretQuery,
  useActionsSetSelectedReposForOrgSecretMutation,
  useActionsAddSelectedRepoToOrgSecretMutation,
  useActionsRemoveSelectedRepoFromOrgSecretMutation,
  useActionsListArtifactsForRepoQuery,
  useActionsGetArtifactQuery,
  useActionsDeleteArtifactMutation,
  useActionsDownloadArtifactQuery,
  useActionsGetJobForWorkflowRunQuery,
  useActionsDownloadJobLogsForWorkflowRunQuery,
  useActionsGetGithubActionsPermissionsRepositoryQuery,
  useActionsSetGithubActionsPermissionsRepositoryMutation,
  useActionsGetAllowedActionsRepositoryQuery,
  useActionsSetAllowedActionsRepositoryMutation,
  useActionsListSelfHostedRunnersForRepoQuery,
  useActionsListRunnerApplicationsForRepoQuery,
  useActionsCreateRegistrationTokenForRepoMutation,
  useActionsCreateRemoveTokenForRepoMutation,
  useActionsGetSelfHostedRunnerForRepoQuery,
  useActionsDeleteSelfHostedRunnerFromRepoMutation,
  useActionsListLabelsForSelfHostedRunnerForRepoQuery,
  useActionsAddCustomLabelsToSelfHostedRunnerForRepoMutation,
  useActionsSetCustomLabelsForSelfHostedRunnerForRepoMutation,
  useActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoMutation,
  useActionsRemoveCustomLabelFromSelfHostedRunnerForRepoMutation,
  useActionsListWorkflowRunsForRepoQuery,
  useActionsGetWorkflowRunQuery,
  useActionsDeleteWorkflowRunMutation,
  useActionsGetReviewsForRunQuery,
  useActionsApproveWorkflowRunMutation,
  useActionsListWorkflowRunArtifactsQuery,
  useActionsGetWorkflowRunAttemptQuery,
  useActionsListJobsForWorkflowRunAttemptQuery,
  useActionsDownloadWorkflowRunAttemptLogsQuery,
  useActionsCancelWorkflowRunMutation,
  useActionsListJobsForWorkflowRunQuery,
  useActionsDownloadWorkflowRunLogsQuery,
  useActionsDeleteWorkflowRunLogsMutation,
  useActionsGetPendingDeploymentsForRunQuery,
  useActionsReviewPendingDeploymentsForRunMutation,
  useActionsReRunWorkflowMutation,
  useActionsGetWorkflowRunUsageQuery,
  useActionsListRepoSecretsQuery,
  useActionsGetRepoPublicKeyQuery,
  useActionsGetRepoSecretQuery,
  useActionsCreateOrUpdateRepoSecretMutation,
  useActionsDeleteRepoSecretMutation,
  useActionsListRepoWorkflowsQuery,
  useActionsGetWorkflowQuery,
  useActionsDisableWorkflowMutation,
  useActionsCreateWorkflowDispatchMutation,
  useActionsEnableWorkflowMutation,
  useActionsListWorkflowRunsQuery,
  useActionsGetWorkflowUsageQuery,
  useActionsListEnvironmentSecretsQuery,
  useActionsGetEnvironmentPublicKeyQuery,
  useActionsGetEnvironmentSecretQuery,
  useActionsCreateOrUpdateEnvironmentSecretMutation,
  useActionsDeleteEnvironmentSecretMutation,
} = injectedRtkApi;
