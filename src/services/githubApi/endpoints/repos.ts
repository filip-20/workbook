import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    reposListForOrg: build.query<
      ReposListForOrgApiResponse,
      ReposListForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/repos`,
        params: {
          type: queryArg["type"],
          sort: queryArg.sort,
          direction: queryArg.direction,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    reposCreateInOrg: build.mutation<
      ReposCreateInOrgApiResponse,
      ReposCreateInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/repos`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposGet: build.query<ReposGetApiResponse, ReposGetApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}`,
      }),
    }),
    reposUpdate: build.mutation<ReposUpdateApiResponse, ReposUpdateApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    reposDelete: build.mutation<ReposDeleteApiResponse, ReposDeleteApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}`,
        method: "DELETE",
      }),
    }),
    reposListAutolinks: build.query<
      ReposListAutolinksApiResponse,
      ReposListAutolinksApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/autolinks`,
        params: { page: queryArg.page },
      }),
    }),
    reposCreateAutolink: build.mutation<
      ReposCreateAutolinkApiResponse,
      ReposCreateAutolinkApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/autolinks`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposGetAutolink: build.query<
      ReposGetAutolinkApiResponse,
      ReposGetAutolinkApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/autolinks/${queryArg.autolinkId}`,
      }),
    }),
    reposDeleteAutolink: build.mutation<
      ReposDeleteAutolinkApiResponse,
      ReposDeleteAutolinkApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/autolinks/${queryArg.autolinkId}`,
        method: "DELETE",
      }),
    }),
    reposEnableAutomatedSecurityFixes: build.mutation<
      ReposEnableAutomatedSecurityFixesApiResponse,
      ReposEnableAutomatedSecurityFixesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/automated-security-fixes`,
        method: "PUT",
      }),
    }),
    reposDisableAutomatedSecurityFixes: build.mutation<
      ReposDisableAutomatedSecurityFixesApiResponse,
      ReposDisableAutomatedSecurityFixesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/automated-security-fixes`,
        method: "DELETE",
      }),
    }),
    reposListBranches: build.query<
      ReposListBranchesApiResponse,
      ReposListBranchesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches`,
        params: {
          protected: queryArg["protected"],
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    reposGetBranch: build.query<
      ReposGetBranchApiResponse,
      ReposGetBranchApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}`,
      }),
    }),
    reposGetBranchProtection: build.query<
      ReposGetBranchProtectionApiResponse,
      ReposGetBranchProtectionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection`,
      }),
    }),
    reposUpdateBranchProtection: build.mutation<
      ReposUpdateBranchProtectionApiResponse,
      ReposUpdateBranchProtectionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    reposDeleteBranchProtection: build.mutation<
      ReposDeleteBranchProtectionApiResponse,
      ReposDeleteBranchProtectionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection`,
        method: "DELETE",
      }),
    }),
    reposGetAdminBranchProtection: build.query<
      ReposGetAdminBranchProtectionApiResponse,
      ReposGetAdminBranchProtectionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/enforce_admins`,
      }),
    }),
    reposSetAdminBranchProtection: build.mutation<
      ReposSetAdminBranchProtectionApiResponse,
      ReposSetAdminBranchProtectionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/enforce_admins`,
        method: "POST",
      }),
    }),
    reposDeleteAdminBranchProtection: build.mutation<
      ReposDeleteAdminBranchProtectionApiResponse,
      ReposDeleteAdminBranchProtectionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/enforce_admins`,
        method: "DELETE",
      }),
    }),
    reposGetPullRequestReviewProtection: build.query<
      ReposGetPullRequestReviewProtectionApiResponse,
      ReposGetPullRequestReviewProtectionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/required_pull_request_reviews`,
      }),
    }),
    reposUpdatePullRequestReviewProtection: build.mutation<
      ReposUpdatePullRequestReviewProtectionApiResponse,
      ReposUpdatePullRequestReviewProtectionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/required_pull_request_reviews`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    reposDeletePullRequestReviewProtection: build.mutation<
      ReposDeletePullRequestReviewProtectionApiResponse,
      ReposDeletePullRequestReviewProtectionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/required_pull_request_reviews`,
        method: "DELETE",
      }),
    }),
    reposGetCommitSignatureProtection: build.query<
      ReposGetCommitSignatureProtectionApiResponse,
      ReposGetCommitSignatureProtectionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/required_signatures`,
      }),
    }),
    reposCreateCommitSignatureProtection: build.mutation<
      ReposCreateCommitSignatureProtectionApiResponse,
      ReposCreateCommitSignatureProtectionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/required_signatures`,
        method: "POST",
      }),
    }),
    reposDeleteCommitSignatureProtection: build.mutation<
      ReposDeleteCommitSignatureProtectionApiResponse,
      ReposDeleteCommitSignatureProtectionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/required_signatures`,
        method: "DELETE",
      }),
    }),
    reposGetStatusChecksProtection: build.query<
      ReposGetStatusChecksProtectionApiResponse,
      ReposGetStatusChecksProtectionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/required_status_checks`,
      }),
    }),
    reposUpdateStatusCheckProtection: build.mutation<
      ReposUpdateStatusCheckProtectionApiResponse,
      ReposUpdateStatusCheckProtectionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/required_status_checks`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    reposRemoveStatusCheckProtection: build.mutation<
      ReposRemoveStatusCheckProtectionApiResponse,
      ReposRemoveStatusCheckProtectionApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/required_status_checks`,
        method: "DELETE",
      }),
    }),
    reposGetAllStatusCheckContexts: build.query<
      ReposGetAllStatusCheckContextsApiResponse,
      ReposGetAllStatusCheckContextsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/required_status_checks/contexts`,
      }),
    }),
    reposAddStatusCheckContexts: build.mutation<
      ReposAddStatusCheckContextsApiResponse,
      ReposAddStatusCheckContextsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/required_status_checks/contexts`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposSetStatusCheckContexts: build.mutation<
      ReposSetStatusCheckContextsApiResponse,
      ReposSetStatusCheckContextsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/required_status_checks/contexts`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    reposRemoveStatusCheckContexts: build.mutation<
      ReposRemoveStatusCheckContextsApiResponse,
      ReposRemoveStatusCheckContextsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/required_status_checks/contexts`,
        method: "DELETE",
        body: queryArg.body,
      }),
    }),
    reposGetAccessRestrictions: build.query<
      ReposGetAccessRestrictionsApiResponse,
      ReposGetAccessRestrictionsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/restrictions`,
      }),
    }),
    reposDeleteAccessRestrictions: build.mutation<
      ReposDeleteAccessRestrictionsApiResponse,
      ReposDeleteAccessRestrictionsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/restrictions`,
        method: "DELETE",
      }),
    }),
    reposGetAppsWithAccessToProtectedBranch: build.query<
      ReposGetAppsWithAccessToProtectedBranchApiResponse,
      ReposGetAppsWithAccessToProtectedBranchApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/restrictions/apps`,
      }),
    }),
    reposAddAppAccessRestrictions: build.mutation<
      ReposAddAppAccessRestrictionsApiResponse,
      ReposAddAppAccessRestrictionsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/restrictions/apps`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposSetAppAccessRestrictions: build.mutation<
      ReposSetAppAccessRestrictionsApiResponse,
      ReposSetAppAccessRestrictionsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/restrictions/apps`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    reposRemoveAppAccessRestrictions: build.mutation<
      ReposRemoveAppAccessRestrictionsApiResponse,
      ReposRemoveAppAccessRestrictionsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/restrictions/apps`,
        method: "DELETE",
        body: queryArg.body,
      }),
    }),
    reposGetTeamsWithAccessToProtectedBranch: build.query<
      ReposGetTeamsWithAccessToProtectedBranchApiResponse,
      ReposGetTeamsWithAccessToProtectedBranchApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/restrictions/teams`,
      }),
    }),
    reposAddTeamAccessRestrictions: build.mutation<
      ReposAddTeamAccessRestrictionsApiResponse,
      ReposAddTeamAccessRestrictionsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/restrictions/teams`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposSetTeamAccessRestrictions: build.mutation<
      ReposSetTeamAccessRestrictionsApiResponse,
      ReposSetTeamAccessRestrictionsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/restrictions/teams`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    reposRemoveTeamAccessRestrictions: build.mutation<
      ReposRemoveTeamAccessRestrictionsApiResponse,
      ReposRemoveTeamAccessRestrictionsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/restrictions/teams`,
        method: "DELETE",
        body: queryArg.body,
      }),
    }),
    reposGetUsersWithAccessToProtectedBranch: build.query<
      ReposGetUsersWithAccessToProtectedBranchApiResponse,
      ReposGetUsersWithAccessToProtectedBranchApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/restrictions/users`,
      }),
    }),
    reposAddUserAccessRestrictions: build.mutation<
      ReposAddUserAccessRestrictionsApiResponse,
      ReposAddUserAccessRestrictionsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/restrictions/users`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposSetUserAccessRestrictions: build.mutation<
      ReposSetUserAccessRestrictionsApiResponse,
      ReposSetUserAccessRestrictionsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/restrictions/users`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    reposRemoveUserAccessRestrictions: build.mutation<
      ReposRemoveUserAccessRestrictionsApiResponse,
      ReposRemoveUserAccessRestrictionsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/protection/restrictions/users`,
        method: "DELETE",
        body: queryArg.body,
      }),
    }),
    reposRenameBranch: build.mutation<
      ReposRenameBranchApiResponse,
      ReposRenameBranchApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches/${queryArg.branch}/rename`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposCodeownersErrors: build.query<
      ReposCodeownersErrorsApiResponse,
      ReposCodeownersErrorsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/codeowners/errors`,
        params: { ref: queryArg.ref },
      }),
    }),
    reposListCollaborators: build.query<
      ReposListCollaboratorsApiResponse,
      ReposListCollaboratorsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/collaborators`,
        params: {
          affiliation: queryArg.affiliation,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    reposCheckCollaborator: build.query<
      ReposCheckCollaboratorApiResponse,
      ReposCheckCollaboratorApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/collaborators/${queryArg.username}`,
      }),
    }),
    reposAddCollaborator: build.mutation<
      ReposAddCollaboratorApiResponse,
      ReposAddCollaboratorApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/collaborators/${queryArg.username}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    reposRemoveCollaborator: build.mutation<
      ReposRemoveCollaboratorApiResponse,
      ReposRemoveCollaboratorApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/collaborators/${queryArg.username}`,
        method: "DELETE",
      }),
    }),
    reposGetCollaboratorPermissionLevel: build.query<
      ReposGetCollaboratorPermissionLevelApiResponse,
      ReposGetCollaboratorPermissionLevelApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/collaborators/${queryArg.username}/permission`,
      }),
    }),
    reposListCommitCommentsForRepo: build.query<
      ReposListCommitCommentsForRepoApiResponse,
      ReposListCommitCommentsForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/comments`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    reposGetCommitComment: build.query<
      ReposGetCommitCommentApiResponse,
      ReposGetCommitCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/comments/${queryArg.commentId}`,
      }),
    }),
    reposUpdateCommitComment: build.mutation<
      ReposUpdateCommitCommentApiResponse,
      ReposUpdateCommitCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/comments/${queryArg.commentId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    reposDeleteCommitComment: build.mutation<
      ReposDeleteCommitCommentApiResponse,
      ReposDeleteCommitCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/comments/${queryArg.commentId}`,
        method: "DELETE",
      }),
    }),
    reposListCommits: build.query<
      ReposListCommitsApiResponse,
      ReposListCommitsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/commits`,
        params: {
          sha: queryArg.sha,
          path: queryArg.path,
          author: queryArg.author,
          since: queryArg.since,
          until: queryArg.until,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    reposListBranchesForHeadCommit: build.query<
      ReposListBranchesForHeadCommitApiResponse,
      ReposListBranchesForHeadCommitApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/commits/${queryArg.commitSha}/branches-where-head`,
      }),
    }),
    reposListCommentsForCommit: build.query<
      ReposListCommentsForCommitApiResponse,
      ReposListCommentsForCommitApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/commits/${queryArg.commitSha}/comments`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    reposCreateCommitComment: build.mutation<
      ReposCreateCommitCommentApiResponse,
      ReposCreateCommitCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/commits/${queryArg.commitSha}/comments`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposListPullRequestsAssociatedWithCommit: build.query<
      ReposListPullRequestsAssociatedWithCommitApiResponse,
      ReposListPullRequestsAssociatedWithCommitApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/commits/${queryArg.commitSha}/pulls`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    reposGetCommit: build.query<
      ReposGetCommitApiResponse,
      ReposGetCommitApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/commits/${queryArg.ref}`,
        params: { page: queryArg.page, per_page: queryArg.perPage },
      }),
    }),
    reposGetCombinedStatusForRef: build.query<
      ReposGetCombinedStatusForRefApiResponse,
      ReposGetCombinedStatusForRefApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/commits/${queryArg.ref}/status`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    reposListCommitStatusesForRef: build.query<
      ReposListCommitStatusesForRefApiResponse,
      ReposListCommitStatusesForRefApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/commits/${queryArg.ref}/statuses`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    reposGetCommunityProfileMetrics: build.query<
      ReposGetCommunityProfileMetricsApiResponse,
      ReposGetCommunityProfileMetricsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/community/profile`,
      }),
    }),
    reposCompareCommits: build.query<
      ReposCompareCommitsApiResponse,
      ReposCompareCommitsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/compare/${queryArg.basehead}`,
        params: { page: queryArg.page, per_page: queryArg.perPage },
      }),
    }),
    reposGetContent: build.query<
      ReposGetContentApiResponse,
      ReposGetContentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/contents/${queryArg.path}`,
        params: { ref: queryArg.ref },
      }),
      providesTags: ['Files']
    }),
    reposCreateOrUpdateFileContents: build.mutation<
      ReposCreateOrUpdateFileContentsApiResponse,
      ReposCreateOrUpdateFileContentsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/contents/${queryArg.path}`,
        method: "PUT",
        body: queryArg.body,
      }),
      extraOptions: {maxRetries: 0},
      invalidatesTags: ['Files']
    }),
    reposDeleteFile: build.mutation<
      ReposDeleteFileApiResponse,
      ReposDeleteFileApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/contents/${queryArg.path}`,
        method: "DELETE",
        body: queryArg.body,
      }),
    }),
    reposListContributors: build.query<
      ReposListContributorsApiResponse,
      ReposListContributorsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/contributors`,
        params: {
          anon: queryArg.anon,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    reposListDeployments: build.query<
      ReposListDeploymentsApiResponse,
      ReposListDeploymentsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/deployments`,
        params: {
          sha: queryArg.sha,
          ref: queryArg.ref,
          task: queryArg.task,
          environment: queryArg.environment,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    reposCreateDeployment: build.mutation<
      ReposCreateDeploymentApiResponse,
      ReposCreateDeploymentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/deployments`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposGetDeployment: build.query<
      ReposGetDeploymentApiResponse,
      ReposGetDeploymentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/deployments/${queryArg.deploymentId}`,
      }),
    }),
    reposDeleteDeployment: build.mutation<
      ReposDeleteDeploymentApiResponse,
      ReposDeleteDeploymentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/deployments/${queryArg.deploymentId}`,
        method: "DELETE",
      }),
    }),
    reposListDeploymentStatuses: build.query<
      ReposListDeploymentStatusesApiResponse,
      ReposListDeploymentStatusesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/deployments/${queryArg.deploymentId}/statuses`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    reposCreateDeploymentStatus: build.mutation<
      ReposCreateDeploymentStatusApiResponse,
      ReposCreateDeploymentStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/deployments/${queryArg.deploymentId}/statuses`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposGetDeploymentStatus: build.query<
      ReposGetDeploymentStatusApiResponse,
      ReposGetDeploymentStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/deployments/${queryArg.deploymentId}/statuses/${queryArg.statusId}`,
      }),
    }),
    reposCreateDispatchEvent: build.mutation<
      ReposCreateDispatchEventApiResponse,
      ReposCreateDispatchEventApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/dispatches`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposGetAllEnvironments: build.query<
      ReposGetAllEnvironmentsApiResponse,
      ReposGetAllEnvironmentsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/environments`,
      }),
    }),
    reposGetEnvironment: build.query<
      ReposGetEnvironmentApiResponse,
      ReposGetEnvironmentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/environments/${queryArg.environmentName}`,
      }),
    }),
    reposCreateOrUpdateEnvironment: build.mutation<
      ReposCreateOrUpdateEnvironmentApiResponse,
      ReposCreateOrUpdateEnvironmentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/environments/${queryArg.environmentName}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    reposDeleteAnEnvironment: build.mutation<
      ReposDeleteAnEnvironmentApiResponse,
      ReposDeleteAnEnvironmentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/environments/${queryArg.environmentName}`,
        method: "DELETE",
      }),
    }),
    reposListForks: build.query<
      ReposListForksApiResponse,
      ReposListForksApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/forks`,
        params: {
          sort: queryArg.sort,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    reposCreateFork: build.mutation<
      ReposCreateForkApiResponse,
      ReposCreateForkApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/forks`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposListWebhooks: build.query<
      ReposListWebhooksApiResponse,
      ReposListWebhooksApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/hooks`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    reposCreateWebhook: build.mutation<
      ReposCreateWebhookApiResponse,
      ReposCreateWebhookApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/hooks`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposGetWebhook: build.query<
      ReposGetWebhookApiResponse,
      ReposGetWebhookApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/hooks/${queryArg.hookId}`,
      }),
    }),
    reposUpdateWebhook: build.mutation<
      ReposUpdateWebhookApiResponse,
      ReposUpdateWebhookApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/hooks/${queryArg.hookId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    reposDeleteWebhook: build.mutation<
      ReposDeleteWebhookApiResponse,
      ReposDeleteWebhookApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/hooks/${queryArg.hookId}`,
        method: "DELETE",
      }),
    }),
    reposGetWebhookConfigForRepo: build.query<
      ReposGetWebhookConfigForRepoApiResponse,
      ReposGetWebhookConfigForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/hooks/${queryArg.hookId}/config`,
      }),
    }),
    reposUpdateWebhookConfigForRepo: build.mutation<
      ReposUpdateWebhookConfigForRepoApiResponse,
      ReposUpdateWebhookConfigForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/hooks/${queryArg.hookId}/config`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    reposListWebhookDeliveries: build.query<
      ReposListWebhookDeliveriesApiResponse,
      ReposListWebhookDeliveriesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/hooks/${queryArg.hookId}/deliveries`,
        params: { per_page: queryArg.perPage, cursor: queryArg.cursor },
      }),
    }),
    reposGetWebhookDelivery: build.query<
      ReposGetWebhookDeliveryApiResponse,
      ReposGetWebhookDeliveryApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/hooks/${queryArg.hookId}/deliveries/${queryArg.deliveryId}`,
      }),
    }),
    reposRedeliverWebhookDelivery: build.mutation<
      ReposRedeliverWebhookDeliveryApiResponse,
      ReposRedeliverWebhookDeliveryApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/hooks/${queryArg.hookId}/deliveries/${queryArg.deliveryId}/attempts`,
        method: "POST",
      }),
    }),
    reposPingWebhook: build.mutation<
      ReposPingWebhookApiResponse,
      ReposPingWebhookApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/hooks/${queryArg.hookId}/pings`,
        method: "POST",
      }),
    }),
    reposTestPushWebhook: build.mutation<
      ReposTestPushWebhookApiResponse,
      ReposTestPushWebhookApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/hooks/${queryArg.hookId}/tests`,
        method: "POST",
      }),
    }),
    reposListInvitations: build.query<
      ReposListInvitationsApiResponse,
      ReposListInvitationsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/invitations`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    reposUpdateInvitation: build.mutation<
      ReposUpdateInvitationApiResponse,
      ReposUpdateInvitationApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/invitations/${queryArg.invitationId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    reposDeleteInvitation: build.mutation<
      ReposDeleteInvitationApiResponse,
      ReposDeleteInvitationApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/invitations/${queryArg.invitationId}`,
        method: "DELETE",
      }),
    }),
    reposListDeployKeys: build.query<
      ReposListDeployKeysApiResponse,
      ReposListDeployKeysApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/keys`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    reposCreateDeployKey: build.mutation<
      ReposCreateDeployKeyApiResponse,
      ReposCreateDeployKeyApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/keys`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposGetDeployKey: build.query<
      ReposGetDeployKeyApiResponse,
      ReposGetDeployKeyApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/keys/${queryArg.keyId}`,
      }),
    }),
    reposDeleteDeployKey: build.mutation<
      ReposDeleteDeployKeyApiResponse,
      ReposDeleteDeployKeyApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/keys/${queryArg.keyId}`,
        method: "DELETE",
      }),
    }),
    reposListLanguages: build.query<
      ReposListLanguagesApiResponse,
      ReposListLanguagesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/languages`,
      }),
    }),
    reposEnableLfsForRepo: build.mutation<
      ReposEnableLfsForRepoApiResponse,
      ReposEnableLfsForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/lfs`,
        method: "PUT",
      }),
    }),
    reposDisableLfsForRepo: build.mutation<
      ReposDisableLfsForRepoApiResponse,
      ReposDisableLfsForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/lfs`,
        method: "DELETE",
      }),
    }),
    reposMergeUpstream: build.mutation<
      ReposMergeUpstreamApiResponse,
      ReposMergeUpstreamApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/merge-upstream`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposMerge: build.mutation<ReposMergeApiResponse, ReposMergeApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/merges`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposGetPages: build.query<ReposGetPagesApiResponse, ReposGetPagesApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pages`,
      }),
    }),
    reposCreatePagesSite: build.mutation<
      ReposCreatePagesSiteApiResponse,
      ReposCreatePagesSiteApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pages`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposUpdateInformationAboutPagesSite: build.mutation<
      ReposUpdateInformationAboutPagesSiteApiResponse,
      ReposUpdateInformationAboutPagesSiteApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pages`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    reposDeletePagesSite: build.mutation<
      ReposDeletePagesSiteApiResponse,
      ReposDeletePagesSiteApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pages`,
        method: "DELETE",
      }),
    }),
    reposListPagesBuilds: build.query<
      ReposListPagesBuildsApiResponse,
      ReposListPagesBuildsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pages/builds`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    reposRequestPagesBuild: build.mutation<
      ReposRequestPagesBuildApiResponse,
      ReposRequestPagesBuildApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pages/builds`,
        method: "POST",
      }),
    }),
    reposGetLatestPagesBuild: build.query<
      ReposGetLatestPagesBuildApiResponse,
      ReposGetLatestPagesBuildApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pages/builds/latest`,
      }),
    }),
    reposGetPagesBuild: build.query<
      ReposGetPagesBuildApiResponse,
      ReposGetPagesBuildApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pages/builds/${queryArg.buildId}`,
      }),
    }),
    reposGetPagesHealthCheck: build.query<
      ReposGetPagesHealthCheckApiResponse,
      ReposGetPagesHealthCheckApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pages/health`,
      }),
    }),
    reposGetReadme: build.query<
      ReposGetReadmeApiResponse,
      ReposGetReadmeApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/readme`,
        params: { ref: queryArg.ref },
      }),
    }),
    reposGetReadmeInDirectory: build.query<
      ReposGetReadmeInDirectoryApiResponse,
      ReposGetReadmeInDirectoryApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/readme/${queryArg.dir}`,
        params: { ref: queryArg.ref },
      }),
    }),
    reposListReleases: build.query<
      ReposListReleasesApiResponse,
      ReposListReleasesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/releases`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    reposCreateRelease: build.mutation<
      ReposCreateReleaseApiResponse,
      ReposCreateReleaseApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/releases`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposGetReleaseAsset: build.query<
      ReposGetReleaseAssetApiResponse,
      ReposGetReleaseAssetApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/releases/assets/${queryArg.assetId}`,
      }),
    }),
    reposUpdateReleaseAsset: build.mutation<
      ReposUpdateReleaseAssetApiResponse,
      ReposUpdateReleaseAssetApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/releases/assets/${queryArg.assetId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    reposDeleteReleaseAsset: build.mutation<
      ReposDeleteReleaseAssetApiResponse,
      ReposDeleteReleaseAssetApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/releases/assets/${queryArg.assetId}`,
        method: "DELETE",
      }),
    }),
    reposGenerateReleaseNotes: build.mutation<
      ReposGenerateReleaseNotesApiResponse,
      ReposGenerateReleaseNotesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/releases/generate-notes`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposGetLatestRelease: build.query<
      ReposGetLatestReleaseApiResponse,
      ReposGetLatestReleaseApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/releases/latest`,
      }),
    }),
    reposGetReleaseByTag: build.query<
      ReposGetReleaseByTagApiResponse,
      ReposGetReleaseByTagApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/releases/tags/${queryArg.tag}`,
      }),
    }),
    reposGetRelease: build.query<
      ReposGetReleaseApiResponse,
      ReposGetReleaseApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/releases/${queryArg.releaseId}`,
      }),
    }),
    reposUpdateRelease: build.mutation<
      ReposUpdateReleaseApiResponse,
      ReposUpdateReleaseApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/releases/${queryArg.releaseId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    reposDeleteRelease: build.mutation<
      ReposDeleteReleaseApiResponse,
      ReposDeleteReleaseApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/releases/${queryArg.releaseId}`,
        method: "DELETE",
      }),
    }),
    reposListReleaseAssets: build.query<
      ReposListReleaseAssetsApiResponse,
      ReposListReleaseAssetsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/releases/${queryArg.releaseId}/assets`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    reposUploadReleaseAsset: build.mutation<
      ReposUploadReleaseAssetApiResponse,
      ReposUploadReleaseAssetApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/releases/${queryArg.releaseId}/assets`,
        method: "POST",
        body: queryArg.body,
        params: { name: queryArg.name, label: queryArg.label },
      }),
    }),
    reposGetCodeFrequencyStats: build.query<
      ReposGetCodeFrequencyStatsApiResponse,
      ReposGetCodeFrequencyStatsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/stats/code_frequency`,
      }),
    }),
    reposGetCommitActivityStats: build.query<
      ReposGetCommitActivityStatsApiResponse,
      ReposGetCommitActivityStatsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/stats/commit_activity`,
      }),
    }),
    reposGetContributorsStats: build.query<
      ReposGetContributorsStatsApiResponse,
      ReposGetContributorsStatsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/stats/contributors`,
      }),
    }),
    reposGetParticipationStats: build.query<
      ReposGetParticipationStatsApiResponse,
      ReposGetParticipationStatsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/stats/participation`,
      }),
    }),
    reposGetPunchCardStats: build.query<
      ReposGetPunchCardStatsApiResponse,
      ReposGetPunchCardStatsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/stats/punch_card`,
      }),
    }),
    reposCreateCommitStatus: build.mutation<
      ReposCreateCommitStatusApiResponse,
      ReposCreateCommitStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/statuses/${queryArg.sha}`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposListTags: build.query<ReposListTagsApiResponse, ReposListTagsApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/tags`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    reposDownloadTarballArchive: build.query<
      ReposDownloadTarballArchiveApiResponse,
      ReposDownloadTarballArchiveApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/tarball/${queryArg.ref}`,
      }),
    }),
    reposListTeams: build.query<
      ReposListTeamsApiResponse,
      ReposListTeamsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/teams`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    reposGetAllTopics: build.query<
      ReposGetAllTopicsApiResponse,
      ReposGetAllTopicsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/topics`,
        params: { page: queryArg.page, per_page: queryArg.perPage },
      }),
    }),
    reposReplaceAllTopics: build.mutation<
      ReposReplaceAllTopicsApiResponse,
      ReposReplaceAllTopicsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/topics`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    reposGetClones: build.query<
      ReposGetClonesApiResponse,
      ReposGetClonesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/traffic/clones`,
        params: { per: queryArg.per },
      }),
    }),
    reposGetTopPaths: build.query<
      ReposGetTopPathsApiResponse,
      ReposGetTopPathsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/traffic/popular/paths`,
      }),
    }),
    reposGetTopReferrers: build.query<
      ReposGetTopReferrersApiResponse,
      ReposGetTopReferrersApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/traffic/popular/referrers`,
      }),
    }),
    reposGetViews: build.query<ReposGetViewsApiResponse, ReposGetViewsApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/traffic/views`,
        params: { per: queryArg.per },
      }),
    }),
    reposTransfer: build.mutation<
      ReposTransferApiResponse,
      ReposTransferApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/transfer`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposCheckVulnerabilityAlerts: build.query<
      ReposCheckVulnerabilityAlertsApiResponse,
      ReposCheckVulnerabilityAlertsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/vulnerability-alerts`,
      }),
    }),
    reposEnableVulnerabilityAlerts: build.mutation<
      ReposEnableVulnerabilityAlertsApiResponse,
      ReposEnableVulnerabilityAlertsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/vulnerability-alerts`,
        method: "PUT",
      }),
    }),
    reposDisableVulnerabilityAlerts: build.mutation<
      ReposDisableVulnerabilityAlertsApiResponse,
      ReposDisableVulnerabilityAlertsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/vulnerability-alerts`,
        method: "DELETE",
      }),
    }),
    reposDownloadZipballArchive: build.query<
      ReposDownloadZipballArchiveApiResponse,
      ReposDownloadZipballArchiveApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/zipball/${queryArg.ref}`,
      }),
    }),
    reposCreateUsingTemplate: build.mutation<
      ReposCreateUsingTemplateApiResponse,
      ReposCreateUsingTemplateApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.templateOwner}/${queryArg.templateRepo}/generate`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposListPublic: build.query<
      ReposListPublicApiResponse,
      ReposListPublicApiArg
    >({
      query: (queryArg) => ({
        url: `/repositories`,
        params: { since: queryArg.since },
      }),
    }),
    reposListForAuthenticatedUser: build.query<
      ReposListForAuthenticatedUserApiResponse,
      ReposListForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/repos`,
        params: {
          visibility: queryArg.visibility,
          affiliation: queryArg.affiliation,
          type: queryArg["type"],
          sort: queryArg.sort,
          direction: queryArg.direction,
          per_page: queryArg.perPage,
          page: queryArg.page,
          since: queryArg.since,
          before: queryArg.before,
        },
      }),
    }),
    reposCreateForAuthenticatedUser: build.mutation<
      ReposCreateForAuthenticatedUserApiResponse,
      ReposCreateForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/repos`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reposListInvitationsForAuthenticatedUser: build.query<
      ReposListInvitationsForAuthenticatedUserApiResponse,
      ReposListInvitationsForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/repository_invitations`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    reposAcceptInvitationForAuthenticatedUser: build.mutation<
      ReposAcceptInvitationForAuthenticatedUserApiResponse,
      ReposAcceptInvitationForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/repository_invitations/${queryArg.invitationId}`,
        method: "PATCH",
      }),
    }),
    reposDeclineInvitationForAuthenticatedUser: build.mutation<
      ReposDeclineInvitationForAuthenticatedUserApiResponse,
      ReposDeclineInvitationForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/repository_invitations/${queryArg.invitationId}`,
        method: "DELETE",
      }),
    }),
    reposListForUser: build.query<
      ReposListForUserApiResponse,
      ReposListForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/repos`,
        params: {
          type: queryArg["type"],
          sort: queryArg.sort,
          direction: queryArg.direction,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type ReposListForOrgApiResponse =
  /** status 200 Response */ MinimalRepository[];
export type ReposListForOrgApiArg = {
  org: string;
  /** Specifies the types of repositories you want returned. Can be one of `all`, `public`, `private`, `forks`, `sources`, `member`, `internal`. Note: For GitHub AE, can be one of `all`, `private`, `forks`, `sources`, `member`, `internal`. Default: `all`. If your organization is associated with an enterprise account using GitHub Enterprise Cloud or GitHub Enterprise Server 2.20+, `type` can also be `internal`. However, the `internal` value is not yet supported when a GitHub App calls this API with an installation access token. */
  type?:
    | "all"
    | "public"
    | "private"
    | "forks"
    | "sources"
    | "member"
    | "internal";
  /** Can be one of `created`, `updated`, `pushed`, `full_name`. */
  sort?: "created" | "updated" | "pushed" | "full_name";
  /** Can be one of `asc` or `desc`. Default: when using `full_name`: `asc`, otherwise `desc` */
  direction?: "asc" | "desc";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposCreateInOrgApiResponse =
  /** status 201 Response */ Repository2;
export type ReposCreateInOrgApiArg = {
  org: string;
  body: {
    name: string;
    description?: string;
    homepage?: string;
    private?: boolean;
    visibility?: "public" | "private" | "internal";
    has_issues?: boolean;
    has_projects?: boolean;
    has_wiki?: boolean;
    is_template?: boolean;
    team_id?: number;
    auto_init?: boolean;
    gitignore_template?: string;
    license_template?: string;
    allow_squash_merge?: boolean;
    allow_merge_commit?: boolean;
    allow_rebase_merge?: boolean;
    allow_auto_merge?: boolean;
    delete_branch_on_merge?: boolean;
  };
};
export type ReposGetApiResponse = /** status 200 Response */ FullRepository;
export type ReposGetApiArg = {
  owner: string;
  repo: string;
};
export type ReposUpdateApiResponse = /** status 200 Response */ FullRepository;
export type ReposUpdateApiArg = {
  owner: string;
  repo: string;
  body: {
    name?: string;
    description?: string;
    homepage?: string;
    private?: boolean;
    visibility?: "public" | "private" | "internal";
    security_and_analysis?: {
      advanced_security?: {
        status?: string;
      };
      secret_scanning?: {
        status?: string;
      };
    } | null;
    has_issues?: boolean;
    has_projects?: boolean;
    has_wiki?: boolean;
    is_template?: boolean;
    default_branch?: string;
    allow_squash_merge?: boolean;
    allow_merge_commit?: boolean;
    allow_rebase_merge?: boolean;
    allow_auto_merge?: boolean;
    delete_branch_on_merge?: boolean;
    archived?: boolean;
    allow_forking?: boolean;
  };
};
export type ReposDeleteApiResponse = /** status 204 Response */ undefined;
export type ReposDeleteApiArg = {
  owner: string;
  repo: string;
};
export type ReposListAutolinksApiResponse =
  /** status 200 Response */ AutolinkReference[];
export type ReposListAutolinksApiArg = {
  owner: string;
  repo: string;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposCreateAutolinkApiResponse =
  /** status 201 response */ AutolinkReference;
export type ReposCreateAutolinkApiArg = {
  owner: string;
  repo: string;
  body: {
    key_prefix: string;
    url_template: string;
  };
};
export type ReposGetAutolinkApiResponse =
  /** status 200 Response */ AutolinkReference;
export type ReposGetAutolinkApiArg = {
  owner: string;
  repo: string;
  /** autolink_id parameter */
  autolinkId: number;
};
export type ReposDeleteAutolinkApiResponse =
  /** status 204 Response */ undefined;
export type ReposDeleteAutolinkApiArg = {
  owner: string;
  repo: string;
  /** autolink_id parameter */
  autolinkId: number;
};
export type ReposEnableAutomatedSecurityFixesApiResponse = unknown;
export type ReposEnableAutomatedSecurityFixesApiArg = {
  owner: string;
  repo: string;
};
export type ReposDisableAutomatedSecurityFixesApiResponse = unknown;
export type ReposDisableAutomatedSecurityFixesApiArg = {
  owner: string;
  repo: string;
};
export type ReposListBranchesApiResponse =
  /** status 200 Response */ ShortBranch[];
export type ReposListBranchesApiArg = {
  owner: string;
  repo: string;
  /** Setting to `true` returns only protected branches. When set to `false`, only unprotected branches are returned. Omitting this parameter returns all branches. */
  protected?: boolean;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposGetBranchApiResponse =
  /** status 200 Response */ BranchWithProtection;
export type ReposGetBranchApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposGetBranchProtectionApiResponse =
  /** status 200 Response */ BranchProtection;
export type ReposGetBranchProtectionApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposUpdateBranchProtectionApiResponse =
  /** status 200 Response */ ProtectedBranch;
export type ReposUpdateBranchProtectionApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
  body: {
    required_status_checks: {
      strict: boolean;
      contexts: string[];
      checks?: {
        context: string;
        app_id?: number;
      }[];
    } | null;
    enforce_admins: boolean | null;
    required_pull_request_reviews: {
      dismissal_restrictions?: {
        users?: string[];
        teams?: string[];
      };
      dismiss_stale_reviews?: boolean;
      require_code_owner_reviews?: boolean;
      required_approving_review_count?: number;
      bypass_pull_request_allowances?: {
        users?: string[];
        teams?: string[];
      } | null;
    } | null;
    restrictions: {
      users: string[];
      teams: string[];
      apps?: string[];
    } | null;
    required_linear_history?: boolean;
    allow_force_pushes?: boolean | null;
    allow_deletions?: boolean;
    required_conversation_resolution?: boolean;
  };
};
export type ReposDeleteBranchProtectionApiResponse =
  /** status 204 Response */ undefined;
export type ReposDeleteBranchProtectionApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposGetAdminBranchProtectionApiResponse =
  /** status 200 Response */ ProtectedBranchAdminEnforced;
export type ReposGetAdminBranchProtectionApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposSetAdminBranchProtectionApiResponse =
  /** status 200 Response */ ProtectedBranchAdminEnforced;
export type ReposSetAdminBranchProtectionApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposDeleteAdminBranchProtectionApiResponse =
  /** status 204 Response */ undefined;
export type ReposDeleteAdminBranchProtectionApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposGetPullRequestReviewProtectionApiResponse =
  /** status 200 Response */ ProtectedBranchPullRequestReview;
export type ReposGetPullRequestReviewProtectionApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposUpdatePullRequestReviewProtectionApiResponse =
  /** status 200 Response */ ProtectedBranchPullRequestReview;
export type ReposUpdatePullRequestReviewProtectionApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
  body: {
    dismissal_restrictions?: {
      users?: string[];
      teams?: string[];
    };
    dismiss_stale_reviews?: boolean;
    require_code_owner_reviews?: boolean;
    required_approving_review_count?: number;
    bypass_pull_request_allowances?: {
      users?: string[];
      teams?: string[];
    } | null;
  };
};
export type ReposDeletePullRequestReviewProtectionApiResponse =
  /** status 204 Response */ undefined;
export type ReposDeletePullRequestReviewProtectionApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposGetCommitSignatureProtectionApiResponse =
  /** status 200 Response */ ProtectedBranchAdminEnforced;
export type ReposGetCommitSignatureProtectionApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposCreateCommitSignatureProtectionApiResponse =
  /** status 200 Response */ ProtectedBranchAdminEnforced;
export type ReposCreateCommitSignatureProtectionApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposDeleteCommitSignatureProtectionApiResponse =
  /** status 204 Response */ undefined;
export type ReposDeleteCommitSignatureProtectionApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposGetStatusChecksProtectionApiResponse =
  /** status 200 Response */ StatusCheckPolicy;
export type ReposGetStatusChecksProtectionApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposUpdateStatusCheckProtectionApiResponse =
  /** status 200 Response */ StatusCheckPolicy;
export type ReposUpdateStatusCheckProtectionApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
  body: {
    strict?: boolean;
    contexts?: string[];
    checks?: {
      context: string;
      app_id?: number;
    }[];
  };
};
export type ReposRemoveStatusCheckProtectionApiResponse = unknown;
export type ReposRemoveStatusCheckProtectionApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposGetAllStatusCheckContextsApiResponse =
  /** status 200 Response */ string[];
export type ReposGetAllStatusCheckContextsApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposAddStatusCheckContextsApiResponse =
  /** status 200 Response */ string[];
export type ReposAddStatusCheckContextsApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
  body:
    | {
        contexts: string[];
      }
    | string[];
};
export type ReposSetStatusCheckContextsApiResponse =
  /** status 200 Response */ string[];
export type ReposSetStatusCheckContextsApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
  body:
    | {
        contexts: string[];
      }
    | string[];
};
export type ReposRemoveStatusCheckContextsApiResponse =
  /** status 200 Response */ string[];
export type ReposRemoveStatusCheckContextsApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
  body:
    | {
        contexts: string[];
      }
    | string[];
};
export type ReposGetAccessRestrictionsApiResponse =
  /** status 200 Response */ BranchRestrictionPolicy;
export type ReposGetAccessRestrictionsApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposDeleteAccessRestrictionsApiResponse = unknown;
export type ReposDeleteAccessRestrictionsApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposGetAppsWithAccessToProtectedBranchApiResponse =
  /** status 200 Response */ GitHubApp[];
export type ReposGetAppsWithAccessToProtectedBranchApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposAddAppAccessRestrictionsApiResponse =
  /** status 200 Response */ GitHubApp[];
export type ReposAddAppAccessRestrictionsApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
  body:
    | {
        apps: string[];
      }
    | string[];
};
export type ReposSetAppAccessRestrictionsApiResponse =
  /** status 200 Response */ GitHubApp[];
export type ReposSetAppAccessRestrictionsApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
  body:
    | {
        apps: string[];
      }
    | string[];
};
export type ReposRemoveAppAccessRestrictionsApiResponse =
  /** status 200 Response */ GitHubApp[];
export type ReposRemoveAppAccessRestrictionsApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
  body:
    | {
        apps: string[];
      }
    | string[];
};
export type ReposGetTeamsWithAccessToProtectedBranchApiResponse =
  /** status 200 Response */ Team[];
export type ReposGetTeamsWithAccessToProtectedBranchApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposAddTeamAccessRestrictionsApiResponse =
  /** status 200 Response */ Team[];
export type ReposAddTeamAccessRestrictionsApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
  body:
    | {
        teams: string[];
      }
    | string[];
};
export type ReposSetTeamAccessRestrictionsApiResponse =
  /** status 200 Response */ Team[];
export type ReposSetTeamAccessRestrictionsApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
  body:
    | {
        teams: string[];
      }
    | string[];
};
export type ReposRemoveTeamAccessRestrictionsApiResponse =
  /** status 200 Response */ Team[];
export type ReposRemoveTeamAccessRestrictionsApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
  body:
    | {
        teams: string[];
      }
    | string[];
};
export type ReposGetUsersWithAccessToProtectedBranchApiResponse =
  /** status 200 Response */ SimpleUser[];
export type ReposGetUsersWithAccessToProtectedBranchApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
};
export type ReposAddUserAccessRestrictionsApiResponse =
  /** status 200 Response */ SimpleUser[];
export type ReposAddUserAccessRestrictionsApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
  body:
    | {
        users: string[];
      }
    | string[];
};
export type ReposSetUserAccessRestrictionsApiResponse =
  /** status 200 Response */ SimpleUser[];
export type ReposSetUserAccessRestrictionsApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
  body:
    | {
        users: string[];
      }
    | string[];
};
export type ReposRemoveUserAccessRestrictionsApiResponse =
  /** status 200 Response */ SimpleUser[];
export type ReposRemoveUserAccessRestrictionsApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
  body:
    | {
        users: string[];
      }
    | string[];
};
export type ReposRenameBranchApiResponse =
  /** status 201 Response */ BranchWithProtection;
export type ReposRenameBranchApiArg = {
  owner: string;
  repo: string;
  /** The name of the branch. */
  branch: string;
  body: {
    new_name: string;
  };
};
export type ReposCodeownersErrorsApiResponse =
  /** status 200 Response */ CodeownersErrors;
export type ReposCodeownersErrorsApiArg = {
  owner: string;
  repo: string;
  /** A branch, tag or commit name used to determine which version of the CODEOWNERS file to use. Default: the repository's default branch (e.g. `main`) */
  ref?: string;
};
export type ReposListCollaboratorsApiResponse =
  /** status 200 Response */ Collaborator[];
export type ReposListCollaboratorsApiArg = {
  owner: string;
  repo: string;
  /** Filter collaborators returned by their affiliation. Can be one of:
    \* `outside`: All outside collaborators of an organization-owned repository.
    \* `direct`: All collaborators with permissions to an organization-owned repository, regardless of organization membership status.
    \* `all`: All collaborators the authenticated user can see. */
  affiliation?: "outside" | "direct" | "all";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposCheckCollaboratorApiResponse = unknown;
export type ReposCheckCollaboratorApiArg = {
  owner: string;
  repo: string;
  username: string;
};
export type ReposAddCollaboratorApiResponse =
  /** status 201 Response when a new invitation is created */
    | RepositoryInvitation
    | /** status 204 Response when person is already a collaborator */ undefined;
export type ReposAddCollaboratorApiArg = {
  owner: string;
  repo: string;
  username: string;
  body: {
    permission?: "pull" | "push" | "admin" | "maintain" | "triage";
    permissions?: string;
  };
};
export type ReposRemoveCollaboratorApiResponse = unknown;
export type ReposRemoveCollaboratorApiArg = {
  owner: string;
  repo: string;
  username: string;
};
export type ReposGetCollaboratorPermissionLevelApiResponse =
  /** status 200 if user has admin permissions */ RepositoryCollaboratorPermission;
export type ReposGetCollaboratorPermissionLevelApiArg = {
  owner: string;
  repo: string;
  username: string;
};
export type ReposListCommitCommentsForRepoApiResponse =
  /** status 200 Response */ CommitComment[];
export type ReposListCommitCommentsForRepoApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposGetCommitCommentApiResponse =
  /** status 200 Response */ CommitComment;
export type ReposGetCommitCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
};
export type ReposUpdateCommitCommentApiResponse =
  /** status 200 Response */ CommitComment;
export type ReposUpdateCommitCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
  body: {
    body: string;
  };
};
export type ReposDeleteCommitCommentApiResponse =
  /** status 204 Response */ undefined;
export type ReposDeleteCommitCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
};
export type ReposListCommitsApiResponse = /** status 200 Response */ Commit[];
export type ReposListCommitsApiArg = {
  owner: string;
  repo: string;
  /** SHA or branch to start listing commits from. Default: the repository’s default branch (usually `master`). */
  sha?: string;
  /** Only commits containing this file path will be returned. */
  path?: string;
  /** GitHub login or email address by which to filter by commit author. */
  author?: string;
  /** Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** Only commits before this date will be returned. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  until?: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposListBranchesForHeadCommitApiResponse =
  /** status 200 Response */ BranchShort[];
export type ReposListBranchesForHeadCommitApiArg = {
  owner: string;
  repo: string;
  /** commit_sha parameter */
  commitSha: string;
};
export type ReposListCommentsForCommitApiResponse =
  /** status 200 Response */ CommitComment[];
export type ReposListCommentsForCommitApiArg = {
  owner: string;
  repo: string;
  /** commit_sha parameter */
  commitSha: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposCreateCommitCommentApiResponse =
  /** status 201 Response */ CommitComment;
export type ReposCreateCommitCommentApiArg = {
  owner: string;
  repo: string;
  /** commit_sha parameter */
  commitSha: string;
  body: {
    body: string;
    path?: string;
    position?: number;
    line?: number;
  };
};
export type ReposListPullRequestsAssociatedWithCommitApiResponse =
  /** status 200 Response */ PullRequestSimple[];
export type ReposListPullRequestsAssociatedWithCommitApiArg = {
  owner: string;
  repo: string;
  /** commit_sha parameter */
  commitSha: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposGetCommitApiResponse = /** status 200 Response */ Commit;
export type ReposGetCommitApiArg = {
  owner: string;
  repo: string;
  /** Page number of the results to fetch. */
  page?: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** ref parameter */
  ref: string;
};
export type ReposGetCombinedStatusForRefApiResponse =
  /** status 200 Response */ CombinedCommitStatus;
export type ReposGetCombinedStatusForRefApiArg = {
  owner: string;
  repo: string;
  /** ref parameter */
  ref: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposListCommitStatusesForRefApiResponse =
  /** status 200 Response */ Status[];
export type ReposListCommitStatusesForRefApiArg = {
  owner: string;
  repo: string;
  /** ref parameter */
  ref: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposGetCommunityProfileMetricsApiResponse =
  /** status 200 Response */ CommunityProfile;
export type ReposGetCommunityProfileMetricsApiArg = {
  owner: string;
  repo: string;
};
export type ReposCompareCommitsApiResponse =
  /** status 200 Response */ CommitComparison;
export type ReposCompareCommitsApiArg = {
  owner: string;
  repo: string;
  /** Page number of the results to fetch. */
  page?: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** The base branch and head branch to compare. This parameter expects the format `{base}...{head}`. */
  basehead: string;
};
export type ReposGetContentApiResponse = /** status 200 Response */
  | ContentDirectory
  | ContentFile
  | SymlinkContent
  | SymlinkContent2;
export type ReposGetContentApiArg = {
  owner: string;
  repo: string;
  /** path parameter */
  path: string;
  /** The name of the commit/branch/tag. Default: the repository’s default branch (usually `master`) */
  ref?: string;
};
export type ReposCreateOrUpdateFileContentsApiResponse =
  /** status 200 Response */ FileCommit | /** status 201 Response */ FileCommit;
export type ReposCreateOrUpdateFileContentsApiArg = {
  owner: string;
  repo: string;
  /** path parameter */
  path: string;
  body: {
    message: string;
    content: string;
    sha?: string;
    branch?: string;
    committer?: {
      name: string;
      email: string;
      date?: string;
    };
    author?: {
      name: string;
      email: string;
      date?: string;
    };
  };
};
export type ReposDeleteFileApiResponse = /** status 200 Response */ FileCommit;
export type ReposDeleteFileApiArg = {
  owner: string;
  repo: string;
  /** path parameter */
  path: string;
  body: {
    message: string;
    sha: string;
    branch?: string;
    committer?: {
      name?: string;
      email?: string;
    };
    author?: {
      name?: string;
      email?: string;
    };
  };
};
export type ReposListContributorsApiResponse =
  /** status 200 if repository contains content */
    | Contributor[]
    | /** status 204 Response if repository is empty */ undefined;
export type ReposListContributorsApiArg = {
  owner: string;
  repo: string;
  /** Set to `1` or `true` to include anonymous contributors in results. */
  anon?: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposListDeploymentsApiResponse =
  /** status 200 Response */ Deployment[];
export type ReposListDeploymentsApiArg = {
  owner: string;
  repo: string;
  /** The SHA recorded at creation time. */
  sha?: string;
  /** The name of the ref. This can be a branch, tag, or SHA. */
  ref?: string;
  /** The name of the task for the deployment (e.g., `deploy` or `deploy:migrations`). */
  task?: string;
  /** The name of the environment that was deployed to (e.g., `staging` or `production`). */
  environment?: string | null;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposCreateDeploymentApiResponse = /** status 201 Response */
  | Deployment
  | /** status 202 Merged branch response */ {
      message?: string;
    };
export type ReposCreateDeploymentApiArg = {
  owner: string;
  repo: string;
  body: {
    ref: string;
    task?: string;
    auto_merge?: boolean;
    required_contexts?: string[];
    payload?:
      | {
          [key: string]: any;
        }
      | string;
    environment?: string;
    description?: string | null;
    transient_environment?: boolean;
    production_environment?: boolean;
  };
};
export type ReposGetDeploymentApiResponse =
  /** status 200 Response */ Deployment;
export type ReposGetDeploymentApiArg = {
  owner: string;
  repo: string;
  /** deployment_id parameter */
  deploymentId: number;
};
export type ReposDeleteDeploymentApiResponse =
  /** status 204 Response */ undefined;
export type ReposDeleteDeploymentApiArg = {
  owner: string;
  repo: string;
  /** deployment_id parameter */
  deploymentId: number;
};
export type ReposListDeploymentStatusesApiResponse =
  /** status 200 Response */ DeploymentStatus[];
export type ReposListDeploymentStatusesApiArg = {
  owner: string;
  repo: string;
  /** deployment_id parameter */
  deploymentId: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposCreateDeploymentStatusApiResponse =
  /** status 201 Response */ DeploymentStatus;
export type ReposCreateDeploymentStatusApiArg = {
  owner: string;
  repo: string;
  /** deployment_id parameter */
  deploymentId: number;
  body: {
    state:
      | "error"
      | "failure"
      | "inactive"
      | "in_progress"
      | "queued"
      | "pending"
      | "success";
    target_url?: string;
    log_url?: string;
    description?: string;
    environment?: "production" | "staging" | "qa";
    environment_url?: string;
    auto_inactive?: boolean;
  };
};
export type ReposGetDeploymentStatusApiResponse =
  /** status 200 Response */ DeploymentStatus;
export type ReposGetDeploymentStatusApiArg = {
  owner: string;
  repo: string;
  /** deployment_id parameter */
  deploymentId: number;
  statusId: number;
};
export type ReposCreateDispatchEventApiResponse =
  /** status 204 Response */ undefined;
export type ReposCreateDispatchEventApiArg = {
  owner: string;
  repo: string;
  body: {
    event_type: string;
    client_payload?: {
      [key: string]: any;
    };
  };
};
export type ReposGetAllEnvironmentsApiResponse = /** status 200 Response */ {
  total_count?: number;
  environments?: Environment[];
};
export type ReposGetAllEnvironmentsApiArg = {
  owner: string;
  repo: string;
};
export type ReposGetEnvironmentApiResponse =
  /** status 200 Response */ Environment;
export type ReposGetEnvironmentApiArg = {
  owner: string;
  repo: string;
  /** The name of the environment */
  environmentName: string;
};
export type ReposCreateOrUpdateEnvironmentApiResponse =
  /** status 200 Response */ Environment;
export type ReposCreateOrUpdateEnvironmentApiArg = {
  owner: string;
  repo: string;
  /** The name of the environment */
  environmentName: string;
  body: {
    wait_timer?: WaitTimer;
    reviewers?:
      | {
          type?: DeploymentReviewerType;
          id?: number;
        }[]
      | null;
    deployment_branch_policy?: DeploymentBranchPolicy;
  } | null;
};
export type ReposDeleteAnEnvironmentApiResponse = unknown;
export type ReposDeleteAnEnvironmentApiArg = {
  owner: string;
  repo: string;
  /** The name of the environment */
  environmentName: string;
};
export type ReposListForksApiResponse =
  /** status 200 Response */ MinimalRepository[];
export type ReposListForksApiArg = {
  owner: string;
  repo: string;
  /** The sort order. Can be either `newest`, `oldest`, or `stargazers`. */
  sort?: "newest" | "oldest" | "stargazers" | "watchers";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposCreateForkApiResponse =
  /** status 202 Response */ FullRepository;
export type ReposCreateForkApiArg = {
  owner: string;
  repo: string;
  body: {
    organization?: string;
  } | null;
};
export type ReposListWebhooksApiResponse = /** status 200 Response */ Webhook[];
export type ReposListWebhooksApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposCreateWebhookApiResponse = /** status 201 Response */ Webhook;
export type ReposCreateWebhookApiArg = {
  owner: string;
  repo: string;
  body: {
    name?: string;
    config?: {
      url?: WebhookConfigUrl;
      content_type?: WebhookConfigContentType;
      secret?: WebhookConfigSecret;
      insecure_ssl?: WebhookConfigInsecureSsl;
      token?: string;
      digest?: string;
    };
    events?: string[];
    active?: boolean;
  } | null;
};
export type ReposGetWebhookApiResponse = /** status 200 Response */ Webhook;
export type ReposGetWebhookApiArg = {
  owner: string;
  repo: string;
  hookId: number;
};
export type ReposUpdateWebhookApiResponse = /** status 200 Response */ Webhook;
export type ReposUpdateWebhookApiArg = {
  owner: string;
  repo: string;
  hookId: number;
  body: {
    config?: {
      url: WebhookConfigUrl;
      content_type?: WebhookConfigContentType;
      secret?: WebhookConfigSecret;
      insecure_ssl?: WebhookConfigInsecureSsl;
      address?: string;
      room?: string;
    };
    events?: string[];
    add_events?: string[];
    remove_events?: string[];
    active?: boolean;
  };
};
export type ReposDeleteWebhookApiResponse =
  /** status 204 Response */ undefined;
export type ReposDeleteWebhookApiArg = {
  owner: string;
  repo: string;
  hookId: number;
};
export type ReposGetWebhookConfigForRepoApiResponse =
  /** status 200 Response */ WebhookConfiguration;
export type ReposGetWebhookConfigForRepoApiArg = {
  owner: string;
  repo: string;
  hookId: number;
};
export type ReposUpdateWebhookConfigForRepoApiResponse =
  /** status 200 Response */ WebhookConfiguration;
export type ReposUpdateWebhookConfigForRepoApiArg = {
  owner: string;
  repo: string;
  hookId: number;
  body: {
    url?: WebhookConfigUrl;
    content_type?: WebhookConfigContentType;
    secret?: WebhookConfigSecret;
    insecure_ssl?: WebhookConfigInsecureSsl;
  };
};
export type ReposListWebhookDeliveriesApiResponse =
  /** status 200 Response */ SimpleWebhookDelivery[];
export type ReposListWebhookDeliveriesApiArg = {
  owner: string;
  repo: string;
  hookId: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Used for pagination: the starting delivery from which the page of deliveries is fetched. Refer to the `link` header for the next and previous page cursors. */
  cursor?: string;
};
export type ReposGetWebhookDeliveryApiResponse =
  /** status 200 Response */ WebhookDelivery;
export type ReposGetWebhookDeliveryApiArg = {
  owner: string;
  repo: string;
  hookId: number;
  deliveryId: number;
};
export type ReposRedeliverWebhookDeliveryApiResponse =
  /** status 202 Accepted */ object;
export type ReposRedeliverWebhookDeliveryApiArg = {
  owner: string;
  repo: string;
  hookId: number;
  deliveryId: number;
};
export type ReposPingWebhookApiResponse = /** status 204 Response */ undefined;
export type ReposPingWebhookApiArg = {
  owner: string;
  repo: string;
  hookId: number;
};
export type ReposTestPushWebhookApiResponse =
  /** status 204 Response */ undefined;
export type ReposTestPushWebhookApiArg = {
  owner: string;
  repo: string;
  hookId: number;
};
export type ReposListInvitationsApiResponse =
  /** status 200 Response */ RepositoryInvitation[];
export type ReposListInvitationsApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposUpdateInvitationApiResponse =
  /** status 200 Response */ RepositoryInvitation;
export type ReposUpdateInvitationApiArg = {
  owner: string;
  repo: string;
  /** invitation_id parameter */
  invitationId: number;
  body: {
    permissions?: "read" | "write" | "maintain" | "triage" | "admin";
  };
};
export type ReposDeleteInvitationApiResponse = unknown;
export type ReposDeleteInvitationApiArg = {
  owner: string;
  repo: string;
  /** invitation_id parameter */
  invitationId: number;
};
export type ReposListDeployKeysApiResponse =
  /** status 200 Response */ DeployKey[];
export type ReposListDeployKeysApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposCreateDeployKeyApiResponse =
  /** status 201 Response */ DeployKey;
export type ReposCreateDeployKeyApiArg = {
  owner: string;
  repo: string;
  body: {
    title?: string;
    key: string;
    read_only?: boolean;
  };
};
export type ReposGetDeployKeyApiResponse = /** status 200 Response */ DeployKey;
export type ReposGetDeployKeyApiArg = {
  owner: string;
  repo: string;
  /** key_id parameter */
  keyId: number;
};
export type ReposDeleteDeployKeyApiResponse = unknown;
export type ReposDeleteDeployKeyApiArg = {
  owner: string;
  repo: string;
  /** key_id parameter */
  keyId: number;
};
export type ReposListLanguagesApiResponse = /** status 200 Response */ Language;
export type ReposListLanguagesApiArg = {
  owner: string;
  repo: string;
};
export type ReposEnableLfsForRepoApiResponse =
  /** status 202 Accepted */ object;
export type ReposEnableLfsForRepoApiArg = {
  owner: string;
  repo: string;
};
export type ReposDisableLfsForRepoApiResponse = unknown;
export type ReposDisableLfsForRepoApiArg = {
  owner: string;
  repo: string;
};
export type ReposMergeUpstreamApiResponse =
  /** status 200 The branch has been successfully synced with the upstream repository */ MergedUpstream;
export type ReposMergeUpstreamApiArg = {
  owner: string;
  repo: string;
  body: {
    branch: string;
  };
};
export type ReposMergeApiResponse =
  /** status 201 Successful Response (The resulting merge commit) */
    | Commit
    | /** status 204 Response when already merged */ undefined;
export type ReposMergeApiArg = {
  owner: string;
  repo: string;
  body: {
    base: string;
    head: string;
    commit_message?: string;
  };
};
export type ReposGetPagesApiResponse = /** status 200 Response */ GitHubPages;
export type ReposGetPagesApiArg = {
  owner: string;
  repo: string;
};
export type ReposCreatePagesSiteApiResponse =
  /** status 201 Response */ GitHubPages;
export type ReposCreatePagesSiteApiArg = {
  owner: string;
  repo: string;
  body: {
    source: {
      branch: string;
      path?: "/" | "/docs";
    };
  } | null;
};
export type ReposUpdateInformationAboutPagesSiteApiResponse =
  /** status 204 Response */ undefined;
export type ReposUpdateInformationAboutPagesSiteApiArg = {
  owner: string;
  repo: string;
  body: any | any | any | any;
};
export type ReposDeletePagesSiteApiResponse =
  /** status 204 Response */ undefined;
export type ReposDeletePagesSiteApiArg = {
  owner: string;
  repo: string;
};
export type ReposListPagesBuildsApiResponse =
  /** status 200 Response */ PageBuild[];
export type ReposListPagesBuildsApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposRequestPagesBuildApiResponse =
  /** status 201 Response */ PageBuildStatus;
export type ReposRequestPagesBuildApiArg = {
  owner: string;
  repo: string;
};
export type ReposGetLatestPagesBuildApiResponse =
  /** status 200 Response */ PageBuild;
export type ReposGetLatestPagesBuildApiArg = {
  owner: string;
  repo: string;
};
export type ReposGetPagesBuildApiResponse =
  /** status 200 Response */ PageBuild;
export type ReposGetPagesBuildApiArg = {
  owner: string;
  repo: string;
  buildId: number;
};
export type ReposGetPagesHealthCheckApiResponse = /** status 200 Response */
  | PagesHealthCheckStatus
  | /** status 202 Empty response */ EmptyObject;
export type ReposGetPagesHealthCheckApiArg = {
  owner: string;
  repo: string;
};
export type ReposGetReadmeApiResponse = /** status 200 Response */ ContentFile;
export type ReposGetReadmeApiArg = {
  owner: string;
  repo: string;
  /** The name of the commit/branch/tag. Default: the repository’s default branch (usually `master`) */
  ref?: string;
};
export type ReposGetReadmeInDirectoryApiResponse =
  /** status 200 Response */ ContentFile;
export type ReposGetReadmeInDirectoryApiArg = {
  owner: string;
  repo: string;
  /** The alternate path to look for a README file */
  dir: string;
  /** The name of the commit/branch/tag. Default: the repository’s default branch (usually `master`) */
  ref?: string;
};
export type ReposListReleasesApiResponse = /** status 200 Response */ Release[];
export type ReposListReleasesApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposCreateReleaseApiResponse = /** status 201 Response */ Release;
export type ReposCreateReleaseApiArg = {
  owner: string;
  repo: string;
  body: {
    tag_name: string;
    target_commitish?: string;
    name?: string;
    body?: string;
    draft?: boolean;
    prerelease?: boolean;
    discussion_category_name?: string;
    generate_release_notes?: boolean;
  };
};
export type ReposGetReleaseAssetApiResponse =
  /** status 200 To download the asset's binary content, set the `Accept` header of the request to [`application/octet-stream`](https://docs.github.com/rest/overview/media-types). The API will either redirect the client to the location, or stream it directly if possible. API clients should handle both a `200` or `302` response. */ ReleaseAsset;
export type ReposGetReleaseAssetApiArg = {
  owner: string;
  repo: string;
  /** asset_id parameter */
  assetId: number;
};
export type ReposUpdateReleaseAssetApiResponse =
  /** status 200 Response */ ReleaseAsset;
export type ReposUpdateReleaseAssetApiArg = {
  owner: string;
  repo: string;
  /** asset_id parameter */
  assetId: number;
  body: {
    name?: string;
    label?: string;
    state?: string;
  };
};
export type ReposDeleteReleaseAssetApiResponse = unknown;
export type ReposDeleteReleaseAssetApiArg = {
  owner: string;
  repo: string;
  /** asset_id parameter */
  assetId: number;
};
export type ReposGenerateReleaseNotesApiResponse =
  /** status 200 Name and body of generated release notes */ GeneratedReleaseNotesContent;
export type ReposGenerateReleaseNotesApiArg = {
  owner: string;
  repo: string;
  body: {
    tag_name: string;
    target_commitish?: string;
    previous_tag_name?: string;
    configuration_file_path?: string;
  };
};
export type ReposGetLatestReleaseApiResponse =
  /** status 200 Response */ Release;
export type ReposGetLatestReleaseApiArg = {
  owner: string;
  repo: string;
};
export type ReposGetReleaseByTagApiResponse =
  /** status 200 Response */ Release;
export type ReposGetReleaseByTagApiArg = {
  owner: string;
  repo: string;
  /** tag parameter */
  tag: string;
};
export type ReposGetReleaseApiResponse =
  /** status 200 **Note:** This returns an `upload_url` key corresponding to the endpoint for uploading release assets. This key is a [hypermedia resource](https://docs.github.com/rest/overview/resources-in-the-rest-api#hypermedia). */ Release;
export type ReposGetReleaseApiArg = {
  owner: string;
  repo: string;
  /** release_id parameter */
  releaseId: number;
};
export type ReposUpdateReleaseApiResponse = /** status 200 Response */ Release;
export type ReposUpdateReleaseApiArg = {
  owner: string;
  repo: string;
  /** release_id parameter */
  releaseId: number;
  body: {
    tag_name?: string;
    target_commitish?: string;
    name?: string;
    body?: string;
    draft?: boolean;
    prerelease?: boolean;
    discussion_category_name?: string;
  };
};
export type ReposDeleteReleaseApiResponse = unknown;
export type ReposDeleteReleaseApiArg = {
  owner: string;
  repo: string;
  /** release_id parameter */
  releaseId: number;
};
export type ReposListReleaseAssetsApiResponse =
  /** status 200 Response */ ReleaseAsset[];
export type ReposListReleaseAssetsApiArg = {
  owner: string;
  repo: string;
  /** release_id parameter */
  releaseId: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposUploadReleaseAssetApiResponse =
  /** status 201 Response for successful upload */ ReleaseAsset;
export type ReposUploadReleaseAssetApiArg = {
  owner: string;
  repo: string;
  /** release_id parameter */
  releaseId: number;
  name: string;
  label?: string;
  body: string;
};
export type ReposGetCodeFrequencyStatsApiResponse =
  /** status 200 Returns a weekly aggregate of the number of additions and deletions pushed to a repository. */
    | CodeFrequencyStat[]
    | /** status 202 Accepted */ object
    | /** status 204 A header with no content is returned. */ undefined;
export type ReposGetCodeFrequencyStatsApiArg = {
  owner: string;
  repo: string;
};
export type ReposGetCommitActivityStatsApiResponse = /** status 200 Response */
  | CommitActivity[]
  | /** status 202 Accepted */ object
  | /** status 204 A header with no content is returned. */ undefined;
export type ReposGetCommitActivityStatsApiArg = {
  owner: string;
  repo: string;
};
export type ReposGetContributorsStatsApiResponse =
  /** status 200 *   `w` - Start of the week, given as a [Unix timestamp](http://en.wikipedia.org/wiki/Unix_time).
   *   `a` - Number of additions
   *   `d` - Number of deletions
   *   `c` - Number of commits */
    | ContributorActivity[]
    | /** status 202 Accepted */ object
    | /** status 204 A header with no content is returned. */ undefined;
export type ReposGetContributorsStatsApiArg = {
  owner: string;
  repo: string;
};
export type ReposGetParticipationStatsApiResponse =
  /** status 200 The array order is oldest week (index 0) to most recent week. */ ParticipationStats;
export type ReposGetParticipationStatsApiArg = {
  owner: string;
  repo: string;
};
export type ReposGetPunchCardStatsApiResponse =
  /** status 200 For example, `[2, 14, 25]` indicates that there were 25 total commits, during the 2:00pm hour on Tuesdays. All times are based on the time zone of individual commits. */
    | CodeFrequencyStat[]
    | /** status 204 A header with no content is returned. */ undefined;
export type ReposGetPunchCardStatsApiArg = {
  owner: string;
  repo: string;
};
export type ReposCreateCommitStatusApiResponse =
  /** status 201 Response */ Status;
export type ReposCreateCommitStatusApiArg = {
  owner: string;
  repo: string;
  sha: string;
  body: {
    state: "error" | "failure" | "pending" | "success";
    target_url?: string;
    description?: string;
    context?: string;
  };
};
export type ReposListTagsApiResponse = /** status 200 Response */ Tag[];
export type ReposListTagsApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposDownloadTarballArchiveApiResponse = unknown;
export type ReposDownloadTarballArchiveApiArg = {
  owner: string;
  repo: string;
  ref: string;
};
export type ReposListTeamsApiResponse = /** status 200 Response */ Team[];
export type ReposListTeamsApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposGetAllTopicsApiResponse = /** status 200 Response */ Topic;
export type ReposGetAllTopicsApiArg = {
  owner: string;
  repo: string;
  /** Page number of the results to fetch. */
  page?: number;
  /** Results per page (max 100) */
  perPage?: number;
};
export type ReposReplaceAllTopicsApiResponse = /** status 200 Response */ Topic;
export type ReposReplaceAllTopicsApiArg = {
  owner: string;
  repo: string;
  body: {
    names: string[];
  };
};
export type ReposGetClonesApiResponse = /** status 200 Response */ CloneTraffic;
export type ReposGetClonesApiArg = {
  owner: string;
  repo: string;
  /** Must be one of: `day`, `week`. */
  per?: "" | "day" | "week";
};
export type ReposGetTopPathsApiResponse =
  /** status 200 Response */ ContentTraffic[];
export type ReposGetTopPathsApiArg = {
  owner: string;
  repo: string;
};
export type ReposGetTopReferrersApiResponse =
  /** status 200 Response */ ReferrerTraffic[];
export type ReposGetTopReferrersApiArg = {
  owner: string;
  repo: string;
};
export type ReposGetViewsApiResponse = /** status 200 Response */ ViewTraffic;
export type ReposGetViewsApiArg = {
  owner: string;
  repo: string;
  /** Must be one of: `day`, `week`. */
  per?: "" | "day" | "week";
};
export type ReposTransferApiResponse =
  /** status 202 Response */ MinimalRepository;
export type ReposTransferApiArg = {
  owner: string;
  repo: string;
  body: {
    new_owner: string;
    team_ids?: number[];
  };
};
export type ReposCheckVulnerabilityAlertsApiResponse = unknown;
export type ReposCheckVulnerabilityAlertsApiArg = {
  owner: string;
  repo: string;
};
export type ReposEnableVulnerabilityAlertsApiResponse = unknown;
export type ReposEnableVulnerabilityAlertsApiArg = {
  owner: string;
  repo: string;
};
export type ReposDisableVulnerabilityAlertsApiResponse = unknown;
export type ReposDisableVulnerabilityAlertsApiArg = {
  owner: string;
  repo: string;
};
export type ReposDownloadZipballArchiveApiResponse = unknown;
export type ReposDownloadZipballArchiveApiArg = {
  owner: string;
  repo: string;
  ref: string;
};
export type ReposCreateUsingTemplateApiResponse =
  /** status 201 Response */ Repository2;
export type ReposCreateUsingTemplateApiArg = {
  templateOwner: string;
  templateRepo: string;
  body: {
    owner?: string;
    name: string;
    description?: string;
    include_all_branches?: boolean;
    private?: boolean;
  };
};
export type ReposListPublicApiResponse =
  /** status 200 Response */ MinimalRepository[];
export type ReposListPublicApiArg = {
  /** A repository ID. Only return repositories with an ID greater than this ID. */
  since?: number;
};
export type ReposListForAuthenticatedUserApiResponse =
  /** status 200 Response */ Repository2[];
export type ReposListForAuthenticatedUserApiArg = {
  /** Can be one of `all`, `public`, or `private`. Note: For GitHub AE, can be one of `all`, `internal`, or `private`. */
  visibility?: "all" | "public" | "private";
  /** Comma-separated list of values. Can include:
    \* `owner`: Repositories that are owned by the authenticated user.
    \* `collaborator`: Repositories that the user has been added to as a collaborator.
    \* `organization_member`: Repositories that the user has access to through being a member of an organization. This includes every repository on every team that the user is on. */
  affiliation?: string;
  /** Can be one of `all`, `owner`, `public`, `private`, `member`. Note: For GitHub AE, can be one of `all`, `owner`, `internal`, `private`, `member`. Default: `all`
      
    Will cause a `422` error if used in the same request as **visibility** or **affiliation**. Will cause a `422` error if used in the same request as **visibility** or **affiliation**. */
  type?: "all" | "owner" | "public" | "private" | "member";
  /** Can be one of `created`, `updated`, `pushed`, `full_name`. */
  sort?: "created" | "updated" | "pushed" | "full_name";
  /** Can be one of `asc` or `desc`. Default: `asc` when using `full_name`, otherwise `desc` */
  direction?: "asc" | "desc";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
  /** Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** Only show notifications updated before the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  before?: string;
};
export type ReposCreateForAuthenticatedUserApiResponse =
  /** status 201 Response */ Repository2;
export type ReposCreateForAuthenticatedUserApiArg = {
  body: {
    name: string;
    description?: string;
    homepage?: string;
    private?: boolean;
    has_issues?: boolean;
    has_projects?: boolean;
    has_wiki?: boolean;
    team_id?: number;
    auto_init?: boolean;
    gitignore_template?: string;
    license_template?: string;
    allow_squash_merge?: boolean;
    allow_merge_commit?: boolean;
    allow_rebase_merge?: boolean;
    allow_auto_merge?: boolean;
    delete_branch_on_merge?: boolean;
    has_downloads?: boolean;
    is_template?: boolean;
  };
};
export type ReposListInvitationsForAuthenticatedUserApiResponse =
  /** status 200 Response */ RepositoryInvitation[];
export type ReposListInvitationsForAuthenticatedUserApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReposAcceptInvitationForAuthenticatedUserApiResponse =
  /** status 204 Response */ undefined;
export type ReposAcceptInvitationForAuthenticatedUserApiArg = {
  /** invitation_id parameter */
  invitationId: number;
};
export type ReposDeclineInvitationForAuthenticatedUserApiResponse =
  /** status 204 Response */ undefined;
export type ReposDeclineInvitationForAuthenticatedUserApiArg = {
  /** invitation_id parameter */
  invitationId: number;
};
export type ReposListForUserApiResponse =
  /** status 200 Response */ MinimalRepository[];
export type ReposListForUserApiArg = {
  username: string;
  /** Can be one of `all`, `owner`, `member`. */
  type?: "all" | "owner" | "member";
  /** Can be one of `created`, `updated`, `pushed`, `full_name`. */
  sort?: "created" | "updated" | "pushed" | "full_name";
  /** Can be one of `asc` or `desc`. Default: `asc` when using `full_name`, otherwise `desc` */
  direction?: "asc" | "desc";
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
export type Repository2 = {
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
export type CodeOfConductSimple = {
  url: string;
  key: string;
  name: string;
  html_url: string | null;
};
export type FullRepository = {
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
  pushed_at: string;
  created_at: string;
  updated_at: string;
  permissions?: {
    admin: boolean;
    maintain?: boolean;
    push: boolean;
    triage?: boolean;
    pull: boolean;
  };
  allow_rebase_merge?: boolean;
  template_repository?: Repository;
  temp_clone_token?: string | null;
  allow_squash_merge?: boolean;
  allow_auto_merge?: boolean;
  delete_branch_on_merge?: boolean;
  allow_merge_commit?: boolean;
  allow_forking?: boolean;
  subscribers_count: number;
  network_count: number;
  license: LicenseSimple;
  organization?: SimpleUser2;
  parent?: Repository2;
  source?: Repository2;
  forks: number;
  master_branch?: string;
  open_issues: number;
  watchers: number;
  anonymous_access_enabled?: boolean;
  code_of_conduct?: CodeOfConductSimple;
  security_and_analysis?: {
    advanced_security?: {
      status?: "enabled" | "disabled";
    };
    secret_scanning?: {
      status?: "enabled" | "disabled";
    };
  } | null;
};
export type AutolinkReference = {
  id: number;
  key_prefix: string;
  url_template: string;
};
export type ProtectedBranchRequiredStatusCheck = {
  url?: string;
  enforcement_level?: string;
  contexts: string[];
  checks: {
    context: string;
    app_id: number | null;
  }[];
  contexts_url?: string;
  strict?: boolean;
};
export type ProtectedBranchAdminEnforced = {
  url: string;
  enabled: boolean;
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
export type ProtectedBranchPullRequestReview = {
  url?: string;
  dismissal_restrictions?: {
    users?: SimpleUser[];
    teams?: Team[];
    url?: string;
    users_url?: string;
    teams_url?: string;
  };
  bypass_pull_request_allowances?: {
    users?: SimpleUser[];
    teams?: Team[];
  } | null;
  dismiss_stale_reviews: boolean;
  require_code_owner_reviews: boolean;
  required_approving_review_count?: number;
};
export type BranchRestrictionPolicy = {
  url: string;
  users_url: string;
  teams_url: string;
  apps_url: string;
  users: {
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
  }[];
  teams: {
    id?: number;
    node_id?: string;
    url?: string;
    html_url?: string;
    name?: string;
    slug?: string;
    description?: string | null;
    privacy?: string;
    permission?: string;
    members_url?: string;
    repositories_url?: string;
    parent?: string | null;
  }[];
  apps: {
    id?: number;
    slug?: string;
    node_id?: string;
    owner?: {
      login?: string;
      id?: number;
      node_id?: string;
      url?: string;
      repos_url?: string;
      events_url?: string;
      hooks_url?: string;
      issues_url?: string;
      members_url?: string;
      public_members_url?: string;
      avatar_url?: string;
      description?: string;
      gravatar_id?: string;
      html_url?: string;
      followers_url?: string;
      following_url?: string;
      gists_url?: string;
      starred_url?: string;
      subscriptions_url?: string;
      organizations_url?: string;
      received_events_url?: string;
      type?: string;
      site_admin?: boolean;
    };
    name?: string;
    description?: string;
    external_url?: string;
    html_url?: string;
    created_at?: string;
    updated_at?: string;
    permissions?: {
      metadata?: string;
      contents?: string;
      issues?: string;
      single_file?: string;
    };
    events?: string[];
  }[];
};
export type BranchProtection = {
  url?: string;
  enabled?: boolean;
  required_status_checks?: ProtectedBranchRequiredStatusCheck;
  enforce_admins?: ProtectedBranchAdminEnforced;
  required_pull_request_reviews?: ProtectedBranchPullRequestReview;
  restrictions?: BranchRestrictionPolicy;
  required_linear_history?: {
    enabled?: boolean;
  };
  allow_force_pushes?: {
    enabled?: boolean;
  };
  allow_deletions?: {
    enabled?: boolean;
  };
  required_conversation_resolution?: {
    enabled?: boolean;
  };
  name?: string;
  protection_url?: string;
  required_signatures?: {
    url: string;
    enabled: boolean;
  };
};
export type ShortBranch = {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
  protection?: BranchProtection;
  protection_url?: string;
};
export type GitUser = {
  name?: string;
  email?: string;
  date?: string;
} | null;
export type Verification = {
  verified: boolean;
  reason: string;
  payload: string | null;
  signature: string | null;
};
export type DiffEntry = {
  sha: string;
  filename: string;
  status:
    | "added"
    | "removed"
    | "modified"
    | "renamed"
    | "copied"
    | "changed"
    | "unchanged";
  additions: number;
  deletions: number;
  changes: number;
  blob_url: string;
  raw_url: string;
  contents_url: string;
  patch?: string;
  previous_filename?: string;
};
export type Commit = {
  url: string;
  sha: string;
  node_id: string;
  html_url: string;
  comments_url: string;
  commit: {
    url: string;
    author: GitUser;
    committer: GitUser;
    message: string;
    comment_count: number;
    tree: {
      sha: string;
      url: string;
    };
    verification?: Verification;
  };
  author: SimpleUser2;
  committer: SimpleUser2;
  parents: {
    sha: string;
    url: string;
    html_url?: string;
  }[];
  stats?: {
    additions?: number;
    deletions?: number;
    total?: number;
  };
  files?: DiffEntry[];
};
export type BranchWithProtection = {
  name: string;
  commit: Commit;
  _links: {
    html: string;
    self: string;
  };
  protected: boolean;
  protection: BranchProtection;
  protection_url: string;
  pattern?: string;
  required_approving_review_count?: number;
};
export type StatusCheckPolicy = {
  url: string;
  strict: boolean;
  contexts: string[];
  checks: {
    context: string;
    app_id: number | null;
  }[];
  contexts_url: string;
};
export type ProtectedBranch = {
  url: string;
  required_status_checks?: StatusCheckPolicy;
  required_pull_request_reviews?: {
    url: string;
    dismiss_stale_reviews?: boolean;
    require_code_owner_reviews?: boolean;
    required_approving_review_count?: number;
    dismissal_restrictions?: {
      url: string;
      users_url: string;
      teams_url: string;
      users: SimpleUser[];
      teams: Team[];
    };
    bypass_pull_request_allowances?: {
      users: SimpleUser[];
      teams: Team[];
    };
  };
  required_signatures?: {
    url: string;
    enabled: boolean;
  };
  enforce_admins?: {
    url: string;
    enabled: boolean;
  };
  required_linear_history?: {
    enabled: boolean;
  };
  allow_force_pushes?: {
    enabled: boolean;
  };
  allow_deletions?: {
    enabled: boolean;
  };
  restrictions?: BranchRestrictionPolicy;
  required_conversation_resolution?: {
    enabled?: boolean;
  };
};
export type ValidationErrorSimple = {
  message: string;
  documentation_url: string;
  errors?: string[];
};
export type GitHubApp = {
  id: number;
  slug?: string;
  node_id: string;
  owner: SimpleUser2;
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
export type CodeownersErrors = {
  errors: {
    line: number;
    column: number;
    source?: string;
    kind: string;
    suggestion?: string | null;
    message: string;
    path: string;
  }[];
};
export type Collaborator = {
  login: string;
  id: number;
  email?: string | null;
  name?: string | null;
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
  permissions?: {
    pull: boolean;
    triage?: boolean;
    push: boolean;
    maintain?: boolean;
    admin: boolean;
  };
  role_name: string;
};
export type RepositoryInvitation = {
  id: number;
  repository: MinimalRepository;
  invitee: SimpleUser2;
  inviter: SimpleUser2;
  permissions: "read" | "write" | "admin" | "triage" | "maintain";
  created_at: string;
  expired?: boolean;
  url: string;
  html_url: string;
  node_id: string;
};
export type Collaborator2 = {
  login: string;
  id: number;
  email?: string | null;
  name?: string | null;
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
  permissions?: {
    pull: boolean;
    triage?: boolean;
    push: boolean;
    maintain?: boolean;
    admin: boolean;
  };
  role_name: string;
} | null;
export type RepositoryCollaboratorPermission = {
  permission: string;
  role_name: string;
  user: Collaborator2;
};
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
export type CommitComment = {
  html_url: string;
  url: string;
  id: number;
  node_id: string;
  body: string;
  path: string | null;
  position: number | null;
  line: number | null;
  commit_id: string;
  user: SimpleUser2;
  created_at: string;
  updated_at: string;
  author_association: AuthorAssociation;
  reactions?: ReactionRollup;
};
export type BranchShort = {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
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
  creator: SimpleUser2;
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  due_on: string | null;
} | null;
export type Link = {
  href: string;
};
export type AutoMerge = {
  enabled_by: SimpleUser;
  merge_method: "merge" | "squash" | "rebase";
  commit_title: string;
  commit_message: string;
} | null;
export type PullRequestSimple = {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  comments_url: string;
  statuses_url: string;
  number: number;
  state: string;
  locked: boolean;
  title: string;
  user: SimpleUser2;
  body: string | null;
  labels: {
    id: number;
    node_id: string;
    url: string;
    name: string;
    description: string;
    color: string;
    default: boolean;
  }[];
  milestone: Milestone;
  active_lock_reason?: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  merge_commit_sha: string | null;
  assignee: SimpleUser2;
  assignees?: SimpleUser[] | null;
  requested_reviewers?: SimpleUser[] | null;
  requested_teams?: Team[] | null;
  head: {
    label: string;
    ref: string;
    repo: Repository2;
    sha: string;
    user: SimpleUser2;
  };
  base: {
    label: string;
    ref: string;
    repo: Repository2;
    sha: string;
    user: SimpleUser2;
  };
  _links: {
    comments: Link;
    commits: Link;
    statuses: Link;
    html: Link;
    issue: Link;
    review_comments: Link;
    review_comment: Link;
    self: Link;
  };
  author_association: AuthorAssociation;
  auto_merge: AutoMerge;
  draft?: boolean;
};
export type SimpleCommitStatus = {
  description: string | null;
  id: number;
  node_id: string;
  state: string;
  context: string;
  target_url: string;
  required?: boolean | null;
  avatar_url: string | null;
  url: string;
  created_at: string;
  updated_at: string;
};
export type CombinedCommitStatus = {
  state: string;
  statuses: SimpleCommitStatus[];
  sha: string;
  total_count: number;
  repository: MinimalRepository;
  commit_url: string;
  url: string;
};
export type Status = {
  url: string;
  avatar_url: string | null;
  id: number;
  node_id: string;
  state: string;
  description: string;
  target_url: string;
  context: string;
  created_at: string;
  updated_at: string;
  creator: SimpleUser2;
};
export type CodeOfConductSimple2 = {
  url: string;
  key: string;
  name: string;
  html_url: string | null;
} | null;
export type CommunityHealthFile = {
  url: string;
  html_url: string;
} | null;
export type CommunityProfile = {
  health_percentage: number;
  description: string | null;
  documentation: string | null;
  files: {
    code_of_conduct: CodeOfConductSimple2;
    code_of_conduct_file: CommunityHealthFile;
    license: LicenseSimple;
    contributing: CommunityHealthFile;
    readme: CommunityHealthFile;
    issue_template: CommunityHealthFile;
    pull_request_template: CommunityHealthFile;
  };
  updated_at: string | null;
  content_reports_enabled?: boolean;
};
export type CommitComparison = {
  url: string;
  html_url: string;
  permalink_url: string;
  diff_url: string;
  patch_url: string;
  base_commit: Commit;
  merge_base_commit: Commit;
  status: "diverged" | "ahead" | "behind" | "identical";
  ahead_by: number;
  behind_by: number;
  total_commits: number;
  commits: Commit[];
  files?: DiffEntry[];
};
export type ContentDirectory = {
  type: string;
  size: number;
  name: string;
  path: string;
  content?: string;
  sha: string;
  url: string;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
  _links: {
    git: string | null;
    html: string | null;
    self: string;
  };
}[];
export type ContentFile = {
  type: string;
  encoding: string;
  size: number;
  name: string;
  path: string;
  content: string;
  sha: string;
  url: string;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
  _links: {
    git: string | null;
    html: string | null;
    self: string;
  };
  target?: string;
  submodule_git_url?: string;
};
export type SymlinkContent = {
  type: string;
  target: string;
  size: number;
  name: string;
  path: string;
  sha: string;
  url: string;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
  _links: {
    git: string | null;
    html: string | null;
    self: string;
  };
};
export type SymlinkContent2 = {
  type: string;
  submodule_git_url: string;
  size: number;
  name: string;
  path: string;
  sha: string;
  url: string;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
  _links: {
    git: string | null;
    html: string | null;
    self: string;
  };
};
export type FileCommit = {
  content: {
    name?: string;
    path?: string;
    sha?: string;
    size?: number;
    url?: string;
    html_url?: string;
    git_url?: string;
    download_url?: string;
    type?: string;
    _links?: {
      self?: string;
      git?: string;
      html?: string;
    };
  } | null;
  commit: {
    sha?: string;
    node_id?: string;
    url?: string;
    html_url?: string;
    author?: {
      date?: string;
      name?: string;
      email?: string;
    };
    committer?: {
      date?: string;
      name?: string;
      email?: string;
    };
    message?: string;
    tree?: {
      url?: string;
      sha?: string;
    };
    parents?: {
      url?: string;
      html_url?: string;
      sha?: string;
    }[];
    verification?: {
      verified?: boolean;
      reason?: string;
      signature?: string | null;
      payload?: string | null;
    };
  };
};
export type Contributor = {
  login?: string;
  id?: number;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string | null;
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
  type: string;
  site_admin?: boolean;
  contributions: number;
  email?: string;
  name?: string;
};
export type GitHubApp2 = {
  id: number;
  slug?: string;
  node_id: string;
  owner: SimpleUser2;
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
  creator: SimpleUser2;
  created_at: string;
  updated_at: string;
  statuses_url: string;
  repository_url: string;
  transient_environment?: boolean;
  production_environment?: boolean;
  performed_via_github_app?: GitHubApp2;
};
export type DeploymentStatus = {
  url: string;
  id: number;
  node_id: string;
  state:
    | "error"
    | "failure"
    | "inactive"
    | "pending"
    | "success"
    | "queued"
    | "in_progress";
  creator: SimpleUser2;
  description: string;
  environment?: string;
  target_url: string;
  created_at: string;
  updated_at: string;
  deployment_url: string;
  repository_url: string;
  environment_url?: string;
  log_url?: string;
  performed_via_github_app?: GitHubApp2;
};
export type WaitTimer = number;
export type DeploymentReviewerType = "User" | "Team";
export type DeploymentBranchPolicy = {
  protected_branches: boolean;
  custom_branch_policies: boolean;
} | null;
export type Environment = {
  id: number;
  node_id: string;
  name: string;
  url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  protection_rules?: (
    | {
        id: number;
        node_id: string;
        type: string;
        wait_timer?: WaitTimer;
      }
    | {
        id: number;
        node_id: string;
        type: string;
        reviewers?: {
          type?: DeploymentReviewerType;
          reviewer?: SimpleUser | Team;
        }[];
      }
    | {
        id: number;
        node_id: string;
        type: string;
      }
  )[];
  deployment_branch_policy?: DeploymentBranchPolicy;
};
export type WebhookConfigUrl = string;
export type WebhookConfigInsecureSsl = string | number;
export type WebhookConfigContentType = string;
export type WebhookConfigSecret = string;
export type HookResponse = {
  code: number | null;
  status: string | null;
  message: string | null;
};
export type Webhook = {
  type: string;
  id: number;
  name: string;
  active: boolean;
  events: string[];
  config: {
    email?: string;
    password?: string;
    room?: string;
    subdomain?: string;
    url?: WebhookConfigUrl;
    insecure_ssl?: WebhookConfigInsecureSsl;
    content_type?: WebhookConfigContentType;
    digest?: string;
    secret?: WebhookConfigSecret;
    token?: string;
  };
  updated_at: string;
  created_at: string;
  url: string;
  test_url: string;
  ping_url: string;
  deliveries_url?: string;
  last_response: HookResponse;
};
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
export type DeployKey = {
  id: number;
  key: string;
  url: string;
  title: string;
  verified: boolean;
  created_at: string;
  read_only: boolean;
};
export type Language = {
  [key: string]: number;
};
export type MergedUpstream = {
  message?: string;
  merge_type?: "merge" | "fast-forward" | "none";
  base_branch?: string;
};
export type PagesSourceHash = {
  branch: string;
  path: string;
};
export type PagesHttpsCertificate = {
  state:
    | "new"
    | "authorization_created"
    | "authorization_pending"
    | "authorized"
    | "authorization_revoked"
    | "issued"
    | "uploaded"
    | "approved"
    | "errored"
    | "bad_authz"
    | "destroy_pending"
    | "dns_changed";
  description: string;
  domains: string[];
  expires_at?: string;
};
export type GitHubPages = {
  url: string;
  status: ("built" | "building" | "errored") | null;
  cname: string | null;
  protected_domain_state?: ("pending" | "verified" | "unverified") | null;
  pending_domain_unverified_at?: string | null;
  custom_404: boolean;
  html_url?: string;
  source?: PagesSourceHash;
  public: boolean;
  https_certificate?: PagesHttpsCertificate;
  https_enforced?: boolean;
};
export type PageBuild = {
  url: string;
  status: string;
  error: {
    message: string | null;
  };
  pusher: SimpleUser2;
  commit: string;
  duration: number;
  created_at: string;
  updated_at: string;
};
export type PageBuildStatus = {
  url: string;
  status: string;
};
export type PagesHealthCheckStatus = {
  domain?: {
    host?: string;
    uri?: string;
    nameservers?: string;
    dns_resolves?: boolean;
    is_proxied?: boolean | null;
    is_cloudflare_ip?: boolean | null;
    is_fastly_ip?: boolean | null;
    is_old_ip_address?: boolean | null;
    is_a_record?: boolean | null;
    has_cname_record?: boolean | null;
    has_mx_records_present?: boolean | null;
    is_valid_domain?: boolean;
    is_apex_domain?: boolean;
    should_be_a_record?: boolean | null;
    is_cname_to_github_user_domain?: boolean | null;
    is_cname_to_pages_dot_github_dot_com?: boolean | null;
    is_cname_to_fastly?: boolean | null;
    is_pointed_to_github_pages_ip?: boolean | null;
    is_non_github_pages_ip_present?: boolean | null;
    is_pages_domain?: boolean;
    is_served_by_pages?: boolean | null;
    is_valid?: boolean;
    reason?: string | null;
    responds_to_https?: boolean;
    enforces_https?: boolean;
    https_error?: string | null;
    is_https_eligible?: boolean | null;
    caa_error?: string | null;
  };
  alt_domain?: {
    host?: string;
    uri?: string;
    nameservers?: string;
    dns_resolves?: boolean;
    is_proxied?: boolean | null;
    is_cloudflare_ip?: boolean | null;
    is_fastly_ip?: boolean | null;
    is_old_ip_address?: boolean | null;
    is_a_record?: boolean | null;
    has_cname_record?: boolean | null;
    has_mx_records_present?: boolean | null;
    is_valid_domain?: boolean;
    is_apex_domain?: boolean;
    should_be_a_record?: boolean | null;
    is_cname_to_github_user_domain?: boolean | null;
    is_cname_to_pages_dot_github_dot_com?: boolean | null;
    is_cname_to_fastly?: boolean | null;
    is_pointed_to_github_pages_ip?: boolean | null;
    is_non_github_pages_ip_present?: boolean | null;
    is_pages_domain?: boolean;
    is_served_by_pages?: boolean | null;
    is_valid?: boolean;
    reason?: string | null;
    responds_to_https?: boolean;
    enforces_https?: boolean;
    https_error?: string | null;
    is_https_eligible?: boolean | null;
    caa_error?: string | null;
  } | null;
};
export type EmptyObject = {};
export type ReleaseAsset = {
  url: string;
  browser_download_url: string;
  id: number;
  node_id: string;
  name: string;
  label: string | null;
  state: "uploaded" | "open";
  content_type: string;
  size: number;
  download_count: number;
  created_at: string;
  updated_at: string;
  uploader: SimpleUser2;
};
export type Release = {
  url: string;
  html_url: string;
  assets_url: string;
  upload_url: string;
  tarball_url: string | null;
  zipball_url: string | null;
  id: number;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string | null;
  body?: string | null;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string | null;
  author: SimpleUser;
  assets: ReleaseAsset[];
  body_html?: string;
  body_text?: string;
  mentions_count?: number;
  discussion_url?: string;
  reactions?: ReactionRollup;
};
export type GeneratedReleaseNotesContent = {
  name: string;
  body: string;
};
export type CodeFrequencyStat = number[];
export type CommitActivity = {
  days: number[];
  total: number;
  week: number;
};
export type ContributorActivity = {
  author: SimpleUser2;
  total: number;
  weeks: {
    w?: number;
    a?: number;
    d?: number;
    c?: number;
  }[];
};
export type ParticipationStats = {
  all: number[];
  owner: number[];
};
export type Tag = {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  zipball_url: string;
  tarball_url: string;
  node_id: string;
};
export type Topic = {
  names: string[];
};
export type Traffic = {
  timestamp: string;
  uniques: number;
  count: number;
};
export type CloneTraffic = {
  count: number;
  uniques: number;
  clones: Traffic[];
};
export type ContentTraffic = {
  path: string;
  title: string;
  count: number;
  uniques: number;
};
export type ReferrerTraffic = {
  referrer: string;
  count: number;
  uniques: number;
};
export type ViewTraffic = {
  count: number;
  uniques: number;
  views: Traffic[];
};
export const {
  useReposListForOrgQuery,
  useReposCreateInOrgMutation,
  useReposGetQuery,
  useReposUpdateMutation,
  useReposDeleteMutation,
  useReposListAutolinksQuery,
  useReposCreateAutolinkMutation,
  useReposGetAutolinkQuery,
  useReposDeleteAutolinkMutation,
  useReposEnableAutomatedSecurityFixesMutation,
  useReposDisableAutomatedSecurityFixesMutation,
  useReposListBranchesQuery,
  useReposGetBranchQuery,
  useReposGetBranchProtectionQuery,
  useReposUpdateBranchProtectionMutation,
  useReposDeleteBranchProtectionMutation,
  useReposGetAdminBranchProtectionQuery,
  useReposSetAdminBranchProtectionMutation,
  useReposDeleteAdminBranchProtectionMutation,
  useReposGetPullRequestReviewProtectionQuery,
  useReposUpdatePullRequestReviewProtectionMutation,
  useReposDeletePullRequestReviewProtectionMutation,
  useReposGetCommitSignatureProtectionQuery,
  useReposCreateCommitSignatureProtectionMutation,
  useReposDeleteCommitSignatureProtectionMutation,
  useReposGetStatusChecksProtectionQuery,
  useReposUpdateStatusCheckProtectionMutation,
  useReposRemoveStatusCheckProtectionMutation,
  useReposGetAllStatusCheckContextsQuery,
  useReposAddStatusCheckContextsMutation,
  useReposSetStatusCheckContextsMutation,
  useReposRemoveStatusCheckContextsMutation,
  useReposGetAccessRestrictionsQuery,
  useReposDeleteAccessRestrictionsMutation,
  useReposGetAppsWithAccessToProtectedBranchQuery,
  useReposAddAppAccessRestrictionsMutation,
  useReposSetAppAccessRestrictionsMutation,
  useReposRemoveAppAccessRestrictionsMutation,
  useReposGetTeamsWithAccessToProtectedBranchQuery,
  useReposAddTeamAccessRestrictionsMutation,
  useReposSetTeamAccessRestrictionsMutation,
  useReposRemoveTeamAccessRestrictionsMutation,
  useReposGetUsersWithAccessToProtectedBranchQuery,
  useReposAddUserAccessRestrictionsMutation,
  useReposSetUserAccessRestrictionsMutation,
  useReposRemoveUserAccessRestrictionsMutation,
  useReposRenameBranchMutation,
  useReposCodeownersErrorsQuery,
  useReposListCollaboratorsQuery,
  useReposCheckCollaboratorQuery,
  useReposAddCollaboratorMutation,
  useReposRemoveCollaboratorMutation,
  useReposGetCollaboratorPermissionLevelQuery,
  useReposListCommitCommentsForRepoQuery,
  useReposGetCommitCommentQuery,
  useReposUpdateCommitCommentMutation,
  useReposDeleteCommitCommentMutation,
  useReposListCommitsQuery,
  useReposListBranchesForHeadCommitQuery,
  useReposListCommentsForCommitQuery,
  useReposCreateCommitCommentMutation,
  useReposListPullRequestsAssociatedWithCommitQuery,
  useReposGetCommitQuery,
  useReposGetCombinedStatusForRefQuery,
  useReposListCommitStatusesForRefQuery,
  useReposGetCommunityProfileMetricsQuery,
  useReposCompareCommitsQuery,
  useReposGetContentQuery,
  useReposCreateOrUpdateFileContentsMutation,
  useReposDeleteFileMutation,
  useReposListContributorsQuery,
  useReposListDeploymentsQuery,
  useReposCreateDeploymentMutation,
  useReposGetDeploymentQuery,
  useReposDeleteDeploymentMutation,
  useReposListDeploymentStatusesQuery,
  useReposCreateDeploymentStatusMutation,
  useReposGetDeploymentStatusQuery,
  useReposCreateDispatchEventMutation,
  useReposGetAllEnvironmentsQuery,
  useReposGetEnvironmentQuery,
  useReposCreateOrUpdateEnvironmentMutation,
  useReposDeleteAnEnvironmentMutation,
  useReposListForksQuery,
  useReposCreateForkMutation,
  useReposListWebhooksQuery,
  useReposCreateWebhookMutation,
  useReposGetWebhookQuery,
  useReposUpdateWebhookMutation,
  useReposDeleteWebhookMutation,
  useReposGetWebhookConfigForRepoQuery,
  useReposUpdateWebhookConfigForRepoMutation,
  useReposListWebhookDeliveriesQuery,
  useReposGetWebhookDeliveryQuery,
  useReposRedeliverWebhookDeliveryMutation,
  useReposPingWebhookMutation,
  useReposTestPushWebhookMutation,
  useReposListInvitationsQuery,
  useReposUpdateInvitationMutation,
  useReposDeleteInvitationMutation,
  useReposListDeployKeysQuery,
  useReposCreateDeployKeyMutation,
  useReposGetDeployKeyQuery,
  useReposDeleteDeployKeyMutation,
  useReposListLanguagesQuery,
  useReposEnableLfsForRepoMutation,
  useReposDisableLfsForRepoMutation,
  useReposMergeUpstreamMutation,
  useReposMergeMutation,
  useReposGetPagesQuery,
  useReposCreatePagesSiteMutation,
  useReposUpdateInformationAboutPagesSiteMutation,
  useReposDeletePagesSiteMutation,
  useReposListPagesBuildsQuery,
  useReposRequestPagesBuildMutation,
  useReposGetLatestPagesBuildQuery,
  useReposGetPagesBuildQuery,
  useReposGetPagesHealthCheckQuery,
  useReposGetReadmeQuery,
  useReposGetReadmeInDirectoryQuery,
  useReposListReleasesQuery,
  useReposCreateReleaseMutation,
  useReposGetReleaseAssetQuery,
  useReposUpdateReleaseAssetMutation,
  useReposDeleteReleaseAssetMutation,
  useReposGenerateReleaseNotesMutation,
  useReposGetLatestReleaseQuery,
  useReposGetReleaseByTagQuery,
  useReposGetReleaseQuery,
  useReposUpdateReleaseMutation,
  useReposDeleteReleaseMutation,
  useReposListReleaseAssetsQuery,
  useReposUploadReleaseAssetMutation,
  useReposGetCodeFrequencyStatsQuery,
  useReposGetCommitActivityStatsQuery,
  useReposGetContributorsStatsQuery,
  useReposGetParticipationStatsQuery,
  useReposGetPunchCardStatsQuery,
  useReposCreateCommitStatusMutation,
  useReposListTagsQuery,
  useReposDownloadTarballArchiveQuery,
  useReposListTeamsQuery,
  useReposGetAllTopicsQuery,
  useReposReplaceAllTopicsMutation,
  useReposGetClonesQuery,
  useReposGetTopPathsQuery,
  useReposGetTopReferrersQuery,
  useReposGetViewsQuery,
  useReposTransferMutation,
  useReposCheckVulnerabilityAlertsQuery,
  useReposEnableVulnerabilityAlertsMutation,
  useReposDisableVulnerabilityAlertsMutation,
  useReposDownloadZipballArchiveQuery,
  useReposCreateUsingTemplateMutation,
  useReposListPublicQuery,
  useReposListForAuthenticatedUserQuery,
  useReposCreateForAuthenticatedUserMutation,
  useReposListInvitationsForAuthenticatedUserQuery,
  useReposAcceptInvitationForAuthenticatedUserMutation,
  useReposDeclineInvitationForAuthenticatedUserMutation,
  useReposListForUserQuery,
} = injectedRtkApi;
