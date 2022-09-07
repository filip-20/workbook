import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    teamsListLinkedExternalIdpGroupsToTeamForOrg: build.query<
      TeamsListLinkedExternalIdpGroupsToTeamForOrgApiResponse,
      TeamsListLinkedExternalIdpGroupsToTeamForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/organizations/${queryArg.org}/team/${queryArg.teamSlug}/external-groups`,
      }),
    }),
    teamsExternalIdpGroupInfoForOrg: build.query<
      TeamsExternalIdpGroupInfoForOrgApiResponse,
      TeamsExternalIdpGroupInfoForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/external-group/${queryArg.groupId}`,
      }),
    }),
    teamsListExternalIdpGroupsForOrg: build.query<
      TeamsListExternalIdpGroupsForOrgApiResponse,
      TeamsListExternalIdpGroupsForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/external-groups`,
        params: {
          per_page: queryArg.perPage,
          page: queryArg.page,
          display_name: queryArg.displayName,
        },
      }),
    }),
    teamsListIdpGroupsForOrg: build.query<
      TeamsListIdpGroupsForOrgApiResponse,
      TeamsListIdpGroupsForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/team-sync/groups`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    teamsList: build.query<TeamsListApiResponse, TeamsListApiArg>({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    teamsCreate: build.mutation<TeamsCreateApiResponse, TeamsCreateApiArg>({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    teamsGetByName: build.query<
      TeamsGetByNameApiResponse,
      TeamsGetByNameApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}`,
      }),
    }),
    teamsUpdateInOrg: build.mutation<
      TeamsUpdateInOrgApiResponse,
      TeamsUpdateInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    teamsDeleteInOrg: build.mutation<
      TeamsDeleteInOrgApiResponse,
      TeamsDeleteInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}`,
        method: "DELETE",
      }),
    }),
    teamsListDiscussionsInOrg: build.query<
      TeamsListDiscussionsInOrgApiResponse,
      TeamsListDiscussionsInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/discussions`,
        params: {
          direction: queryArg.direction,
          per_page: queryArg.perPage,
          page: queryArg.page,
          pinned: queryArg.pinned,
        },
      }),
    }),
    teamsCreateDiscussionInOrg: build.mutation<
      TeamsCreateDiscussionInOrgApiResponse,
      TeamsCreateDiscussionInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/discussions`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    teamsGetDiscussionInOrg: build.query<
      TeamsGetDiscussionInOrgApiResponse,
      TeamsGetDiscussionInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/discussions/${queryArg.discussionNumber}`,
      }),
    }),
    teamsUpdateDiscussionInOrg: build.mutation<
      TeamsUpdateDiscussionInOrgApiResponse,
      TeamsUpdateDiscussionInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/discussions/${queryArg.discussionNumber}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    teamsDeleteDiscussionInOrg: build.mutation<
      TeamsDeleteDiscussionInOrgApiResponse,
      TeamsDeleteDiscussionInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/discussions/${queryArg.discussionNumber}`,
        method: "DELETE",
      }),
    }),
    teamsListDiscussionCommentsInOrg: build.query<
      TeamsListDiscussionCommentsInOrgApiResponse,
      TeamsListDiscussionCommentsInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/discussions/${queryArg.discussionNumber}/comments`,
        params: {
          direction: queryArg.direction,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    teamsCreateDiscussionCommentInOrg: build.mutation<
      TeamsCreateDiscussionCommentInOrgApiResponse,
      TeamsCreateDiscussionCommentInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/discussions/${queryArg.discussionNumber}/comments`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    teamsGetDiscussionCommentInOrg: build.query<
      TeamsGetDiscussionCommentInOrgApiResponse,
      TeamsGetDiscussionCommentInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/discussions/${queryArg.discussionNumber}/comments/${queryArg.commentNumber}`,
      }),
    }),
    teamsUpdateDiscussionCommentInOrg: build.mutation<
      TeamsUpdateDiscussionCommentInOrgApiResponse,
      TeamsUpdateDiscussionCommentInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/discussions/${queryArg.discussionNumber}/comments/${queryArg.commentNumber}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    teamsDeleteDiscussionCommentInOrg: build.mutation<
      TeamsDeleteDiscussionCommentInOrgApiResponse,
      TeamsDeleteDiscussionCommentInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/discussions/${queryArg.discussionNumber}/comments/${queryArg.commentNumber}`,
        method: "DELETE",
      }),
    }),
    teamsLinkExternalIdpGroupToTeamForOrg: build.mutation<
      TeamsLinkExternalIdpGroupToTeamForOrgApiResponse,
      TeamsLinkExternalIdpGroupToTeamForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/external-groups`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    teamsUnlinkExternalIdpGroupFromTeamForOrg: build.mutation<
      TeamsUnlinkExternalIdpGroupFromTeamForOrgApiResponse,
      TeamsUnlinkExternalIdpGroupFromTeamForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/external-groups`,
        method: "DELETE",
      }),
    }),
    teamsListPendingInvitationsInOrg: build.query<
      TeamsListPendingInvitationsInOrgApiResponse,
      TeamsListPendingInvitationsInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/invitations`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    teamsListMembersInOrg: build.query<
      TeamsListMembersInOrgApiResponse,
      TeamsListMembersInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/members`,
        params: {
          role: queryArg.role,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    teamsGetMembershipForUserInOrg: build.query<
      TeamsGetMembershipForUserInOrgApiResponse,
      TeamsGetMembershipForUserInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/memberships/${queryArg.username}`,
      }),
    }),
    teamsAddOrUpdateMembershipForUserInOrg: build.mutation<
      TeamsAddOrUpdateMembershipForUserInOrgApiResponse,
      TeamsAddOrUpdateMembershipForUserInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/memberships/${queryArg.username}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    teamsRemoveMembershipForUserInOrg: build.mutation<
      TeamsRemoveMembershipForUserInOrgApiResponse,
      TeamsRemoveMembershipForUserInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/memberships/${queryArg.username}`,
        method: "DELETE",
      }),
    }),
    teamsListProjectsInOrg: build.query<
      TeamsListProjectsInOrgApiResponse,
      TeamsListProjectsInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/projects`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    teamsCheckPermissionsForProjectInOrg: build.query<
      TeamsCheckPermissionsForProjectInOrgApiResponse,
      TeamsCheckPermissionsForProjectInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/projects/${queryArg.projectId}`,
      }),
    }),
    teamsAddOrUpdateProjectPermissionsInOrg: build.mutation<
      TeamsAddOrUpdateProjectPermissionsInOrgApiResponse,
      TeamsAddOrUpdateProjectPermissionsInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/projects/${queryArg.projectId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    teamsRemoveProjectInOrg: build.mutation<
      TeamsRemoveProjectInOrgApiResponse,
      TeamsRemoveProjectInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/projects/${queryArg.projectId}`,
        method: "DELETE",
      }),
    }),
    teamsListReposInOrg: build.query<
      TeamsListReposInOrgApiResponse,
      TeamsListReposInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/repos`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    teamsCheckPermissionsForRepoInOrg: build.query<
      TeamsCheckPermissionsForRepoInOrgApiResponse,
      TeamsCheckPermissionsForRepoInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/repos/${queryArg.owner}/${queryArg.repo}`,
      }),
    }),
    teamsAddOrUpdateRepoPermissionsInOrg: build.mutation<
      TeamsAddOrUpdateRepoPermissionsInOrgApiResponse,
      TeamsAddOrUpdateRepoPermissionsInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/repos/${queryArg.owner}/${queryArg.repo}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    teamsRemoveRepoInOrg: build.mutation<
      TeamsRemoveRepoInOrgApiResponse,
      TeamsRemoveRepoInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/repos/${queryArg.owner}/${queryArg.repo}`,
        method: "DELETE",
      }),
    }),
    teamsListIdpGroupsInOrg: build.query<
      TeamsListIdpGroupsInOrgApiResponse,
      TeamsListIdpGroupsInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/team-sync/group-mappings`,
      }),
    }),
    teamsCreateOrUpdateIdpGroupConnectionsInOrg: build.mutation<
      TeamsCreateOrUpdateIdpGroupConnectionsInOrgApiResponse,
      TeamsCreateOrUpdateIdpGroupConnectionsInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/team-sync/group-mappings`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    teamsListChildInOrg: build.query<
      TeamsListChildInOrgApiResponse,
      TeamsListChildInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/teams`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    teamsGetLegacy: build.query<
      TeamsGetLegacyApiResponse,
      TeamsGetLegacyApiArg
    >({
      query: (queryArg) => ({ url: `/teams/${queryArg.teamId}` }),
    }),
    teamsUpdateLegacy: build.mutation<
      TeamsUpdateLegacyApiResponse,
      TeamsUpdateLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    teamsDeleteLegacy: build.mutation<
      TeamsDeleteLegacyApiResponse,
      TeamsDeleteLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}`,
        method: "DELETE",
      }),
    }),
    teamsListDiscussionsLegacy: build.query<
      TeamsListDiscussionsLegacyApiResponse,
      TeamsListDiscussionsLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/discussions`,
        params: {
          direction: queryArg.direction,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    teamsCreateDiscussionLegacy: build.mutation<
      TeamsCreateDiscussionLegacyApiResponse,
      TeamsCreateDiscussionLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/discussions`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    teamsGetDiscussionLegacy: build.query<
      TeamsGetDiscussionLegacyApiResponse,
      TeamsGetDiscussionLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/discussions/${queryArg.discussionNumber}`,
      }),
    }),
    teamsUpdateDiscussionLegacy: build.mutation<
      TeamsUpdateDiscussionLegacyApiResponse,
      TeamsUpdateDiscussionLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/discussions/${queryArg.discussionNumber}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    teamsDeleteDiscussionLegacy: build.mutation<
      TeamsDeleteDiscussionLegacyApiResponse,
      TeamsDeleteDiscussionLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/discussions/${queryArg.discussionNumber}`,
        method: "DELETE",
      }),
    }),
    teamsListDiscussionCommentsLegacy: build.query<
      TeamsListDiscussionCommentsLegacyApiResponse,
      TeamsListDiscussionCommentsLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/discussions/${queryArg.discussionNumber}/comments`,
        params: {
          direction: queryArg.direction,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    teamsCreateDiscussionCommentLegacy: build.mutation<
      TeamsCreateDiscussionCommentLegacyApiResponse,
      TeamsCreateDiscussionCommentLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/discussions/${queryArg.discussionNumber}/comments`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    teamsGetDiscussionCommentLegacy: build.query<
      TeamsGetDiscussionCommentLegacyApiResponse,
      TeamsGetDiscussionCommentLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/discussions/${queryArg.discussionNumber}/comments/${queryArg.commentNumber}`,
      }),
    }),
    teamsUpdateDiscussionCommentLegacy: build.mutation<
      TeamsUpdateDiscussionCommentLegacyApiResponse,
      TeamsUpdateDiscussionCommentLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/discussions/${queryArg.discussionNumber}/comments/${queryArg.commentNumber}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    teamsDeleteDiscussionCommentLegacy: build.mutation<
      TeamsDeleteDiscussionCommentLegacyApiResponse,
      TeamsDeleteDiscussionCommentLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/discussions/${queryArg.discussionNumber}/comments/${queryArg.commentNumber}`,
        method: "DELETE",
      }),
    }),
    teamsListPendingInvitationsLegacy: build.query<
      TeamsListPendingInvitationsLegacyApiResponse,
      TeamsListPendingInvitationsLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/invitations`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    teamsListMembersLegacy: build.query<
      TeamsListMembersLegacyApiResponse,
      TeamsListMembersLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/members`,
        params: {
          role: queryArg.role,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    teamsGetMemberLegacy: build.query<
      TeamsGetMemberLegacyApiResponse,
      TeamsGetMemberLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/members/${queryArg.username}`,
      }),
    }),
    teamsAddMemberLegacy: build.mutation<
      TeamsAddMemberLegacyApiResponse,
      TeamsAddMemberLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/members/${queryArg.username}`,
        method: "PUT",
      }),
    }),
    teamsRemoveMemberLegacy: build.mutation<
      TeamsRemoveMemberLegacyApiResponse,
      TeamsRemoveMemberLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/members/${queryArg.username}`,
        method: "DELETE",
      }),
    }),
    teamsGetMembershipForUserLegacy: build.query<
      TeamsGetMembershipForUserLegacyApiResponse,
      TeamsGetMembershipForUserLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/memberships/${queryArg.username}`,
      }),
    }),
    teamsAddOrUpdateMembershipForUserLegacy: build.mutation<
      TeamsAddOrUpdateMembershipForUserLegacyApiResponse,
      TeamsAddOrUpdateMembershipForUserLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/memberships/${queryArg.username}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    teamsRemoveMembershipForUserLegacy: build.mutation<
      TeamsRemoveMembershipForUserLegacyApiResponse,
      TeamsRemoveMembershipForUserLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/memberships/${queryArg.username}`,
        method: "DELETE",
      }),
    }),
    teamsListProjectsLegacy: build.query<
      TeamsListProjectsLegacyApiResponse,
      TeamsListProjectsLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/projects`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    teamsCheckPermissionsForProjectLegacy: build.query<
      TeamsCheckPermissionsForProjectLegacyApiResponse,
      TeamsCheckPermissionsForProjectLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/projects/${queryArg.projectId}`,
      }),
    }),
    teamsAddOrUpdateProjectPermissionsLegacy: build.mutation<
      TeamsAddOrUpdateProjectPermissionsLegacyApiResponse,
      TeamsAddOrUpdateProjectPermissionsLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/projects/${queryArg.projectId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    teamsRemoveProjectLegacy: build.mutation<
      TeamsRemoveProjectLegacyApiResponse,
      TeamsRemoveProjectLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/projects/${queryArg.projectId}`,
        method: "DELETE",
      }),
    }),
    teamsListReposLegacy: build.query<
      TeamsListReposLegacyApiResponse,
      TeamsListReposLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/repos`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    teamsCheckPermissionsForRepoLegacy: build.query<
      TeamsCheckPermissionsForRepoLegacyApiResponse,
      TeamsCheckPermissionsForRepoLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/repos/${queryArg.owner}/${queryArg.repo}`,
      }),
    }),
    teamsAddOrUpdateRepoPermissionsLegacy: build.mutation<
      TeamsAddOrUpdateRepoPermissionsLegacyApiResponse,
      TeamsAddOrUpdateRepoPermissionsLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/repos/${queryArg.owner}/${queryArg.repo}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    teamsRemoveRepoLegacy: build.mutation<
      TeamsRemoveRepoLegacyApiResponse,
      TeamsRemoveRepoLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/repos/${queryArg.owner}/${queryArg.repo}`,
        method: "DELETE",
      }),
    }),
    teamsListIdpGroupsForLegacy: build.query<
      TeamsListIdpGroupsForLegacyApiResponse,
      TeamsListIdpGroupsForLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/team-sync/group-mappings`,
      }),
    }),
    teamsCreateOrUpdateIdpGroupConnectionsLegacy: build.mutation<
      TeamsCreateOrUpdateIdpGroupConnectionsLegacyApiResponse,
      TeamsCreateOrUpdateIdpGroupConnectionsLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/team-sync/group-mappings`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    teamsListChildLegacy: build.query<
      TeamsListChildLegacyApiResponse,
      TeamsListChildLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/teams`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    teamsListForAuthenticatedUser: build.query<
      TeamsListForAuthenticatedUserApiResponse,
      TeamsListForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/teams`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type TeamsListLinkedExternalIdpGroupsToTeamForOrgApiResponse =
  /** status 200 Response */ ExternalGroups;
export type TeamsListLinkedExternalIdpGroupsToTeamForOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
};
export type TeamsExternalIdpGroupInfoForOrgApiResponse =
  /** status 200 Response */ ExternalGroup;
export type TeamsExternalIdpGroupInfoForOrgApiArg = {
  org: string;
  /** group_id parameter */
  groupId: number;
};
export type TeamsListExternalIdpGroupsForOrgApiResponse =
  /** status 200 Response */ ExternalGroups;
export type TeamsListExternalIdpGroupsForOrgApiArg = {
  org: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page token */
  page?: number;
  /** Limits the list to groups containing the text in the group name */
  displayName?: string;
};
export type TeamsListIdpGroupsForOrgApiResponse =
  /** status 200 Response */ GroupMapping;
export type TeamsListIdpGroupsForOrgApiArg = {
  org: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page token */
  page?: string;
};
export type TeamsListApiResponse = /** status 200 Response */ Team[];
export type TeamsListApiArg = {
  org: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type TeamsCreateApiResponse = /** status 201 Response */ FullTeam;
export type TeamsCreateApiArg = {
  org: string;
  body: {
    name: string;
    description?: string;
    maintainers?: string[];
    repo_names?: string[];
    privacy?: "secret" | "closed";
    permission?: "pull" | "push";
    parent_team_id?: number;
  };
};
export type TeamsGetByNameApiResponse = /** status 200 Response */ FullTeam;
export type TeamsGetByNameApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
};
export type TeamsUpdateInOrgApiResponse = /** status 201 Response */ FullTeam;
export type TeamsUpdateInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  body: {
    name?: string;
    description?: string;
    privacy?: "secret" | "closed";
    permission?: "pull" | "push" | "admin";
    parent_team_id?: number | null;
  };
};
export type TeamsDeleteInOrgApiResponse = unknown;
export type TeamsDeleteInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
};
export type TeamsListDiscussionsInOrgApiResponse =
  /** status 200 Response */ TeamDiscussion[];
export type TeamsListDiscussionsInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  /** One of `asc` (ascending) or `desc` (descending). */
  direction?: "asc" | "desc";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
  /** Pinned discussions only filter */
  pinned?: string;
};
export type TeamsCreateDiscussionInOrgApiResponse =
  /** status 201 Response */ TeamDiscussion;
export type TeamsCreateDiscussionInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  body: {
    title: string;
    body: string;
    private?: boolean;
  };
};
export type TeamsGetDiscussionInOrgApiResponse =
  /** status 200 Response */ TeamDiscussion;
export type TeamsGetDiscussionInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  discussionNumber: number;
};
export type TeamsUpdateDiscussionInOrgApiResponse =
  /** status 200 Response */ TeamDiscussion;
export type TeamsUpdateDiscussionInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  discussionNumber: number;
  body: {
    title?: string;
    body?: string;
  };
};
export type TeamsDeleteDiscussionInOrgApiResponse = unknown;
export type TeamsDeleteDiscussionInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  discussionNumber: number;
};
export type TeamsListDiscussionCommentsInOrgApiResponse =
  /** status 200 Response */ TeamDiscussionComment[];
export type TeamsListDiscussionCommentsInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  discussionNumber: number;
  /** One of `asc` (ascending) or `desc` (descending). */
  direction?: "asc" | "desc";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type TeamsCreateDiscussionCommentInOrgApiResponse =
  /** status 201 Response */ TeamDiscussionComment;
export type TeamsCreateDiscussionCommentInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  discussionNumber: number;
  body: {
    body: string;
  };
};
export type TeamsGetDiscussionCommentInOrgApiResponse =
  /** status 200 Response */ TeamDiscussionComment;
export type TeamsGetDiscussionCommentInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  discussionNumber: number;
  commentNumber: number;
};
export type TeamsUpdateDiscussionCommentInOrgApiResponse =
  /** status 200 Response */ TeamDiscussionComment;
export type TeamsUpdateDiscussionCommentInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  discussionNumber: number;
  commentNumber: number;
  body: {
    body: string;
  };
};
export type TeamsDeleteDiscussionCommentInOrgApiResponse = unknown;
export type TeamsDeleteDiscussionCommentInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  discussionNumber: number;
  commentNumber: number;
};
export type TeamsLinkExternalIdpGroupToTeamForOrgApiResponse =
  /** status 200 Response */ ExternalGroup;
export type TeamsLinkExternalIdpGroupToTeamForOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  body: {
    group_id: number;
  };
};
export type TeamsUnlinkExternalIdpGroupFromTeamForOrgApiResponse = unknown;
export type TeamsUnlinkExternalIdpGroupFromTeamForOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
};
export type TeamsListPendingInvitationsInOrgApiResponse =
  /** status 200 Response */ OrganizationInvitation[];
export type TeamsListPendingInvitationsInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type TeamsListMembersInOrgApiResponse =
  /** status 200 Response */ SimpleUser2[];
export type TeamsListMembersInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  /** Filters members returned by their role in the team. Can be one of:
    \* `member` - normal members of the team.
    \* `maintainer` - team maintainers.
    \* `all` - all members of the team. */
  role?: "member" | "maintainer" | "all";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type TeamsGetMembershipForUserInOrgApiResponse =
  /** status 200 Response */ TeamMembership;
export type TeamsGetMembershipForUserInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  username: string;
};
export type TeamsAddOrUpdateMembershipForUserInOrgApiResponse =
  /** status 200 Response */ TeamMembership;
export type TeamsAddOrUpdateMembershipForUserInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  username: string;
  body: {
    role?: "member" | "maintainer";
  };
};
export type TeamsRemoveMembershipForUserInOrgApiResponse = unknown;
export type TeamsRemoveMembershipForUserInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  username: string;
};
export type TeamsListProjectsInOrgApiResponse =
  /** status 200 Response */ TeamProject[];
export type TeamsListProjectsInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type TeamsCheckPermissionsForProjectInOrgApiResponse =
  /** status 200 Response */ TeamProject;
export type TeamsCheckPermissionsForProjectInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  projectId: number;
};
export type TeamsAddOrUpdateProjectPermissionsInOrgApiResponse =
  /** status 204 Response */ undefined;
export type TeamsAddOrUpdateProjectPermissionsInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  projectId: number;
  body: {
    permission?: "read" | "write" | "admin";
  } | null;
};
export type TeamsRemoveProjectInOrgApiResponse = unknown;
export type TeamsRemoveProjectInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  projectId: number;
};
export type TeamsListReposInOrgApiResponse =
  /** status 200 Response */ MinimalRepository[];
export type TeamsListReposInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type TeamsCheckPermissionsForRepoInOrgApiResponse =
  /** status 200 Alternative response with repository permissions */
    | TeamRepository
    | /** status 204 Response if team has permission for the repository. This is the response when the repository media type hasn't been provded in the Accept header. */ undefined;
export type TeamsCheckPermissionsForRepoInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  owner: string;
  repo: string;
};
export type TeamsAddOrUpdateRepoPermissionsInOrgApiResponse = unknown;
export type TeamsAddOrUpdateRepoPermissionsInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  owner: string;
  repo: string;
  body: {
    permission?: "pull" | "push" | "admin" | "maintain" | "triage";
  };
};
export type TeamsRemoveRepoInOrgApiResponse = unknown;
export type TeamsRemoveRepoInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  owner: string;
  repo: string;
};
export type TeamsListIdpGroupsInOrgApiResponse =
  /** status 200 Response */ GroupMapping;
export type TeamsListIdpGroupsInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
};
export type TeamsCreateOrUpdateIdpGroupConnectionsInOrgApiResponse =
  /** status 200 Response */ GroupMapping;
export type TeamsCreateOrUpdateIdpGroupConnectionsInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  body: {
    groups?: {
      group_id: string;
      group_name: string;
      group_description: string;
    }[];
  };
};
export type TeamsListChildInOrgApiResponse =
  /** status 200 if child teams exist */ Team[];
export type TeamsListChildInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type TeamsGetLegacyApiResponse = /** status 200 Response */ FullTeam;
export type TeamsGetLegacyApiArg = {
  teamId: number;
};
export type TeamsUpdateLegacyApiResponse = /** status 200 Response */
  | FullTeam
  | /** status 201 Response */ FullTeam;
export type TeamsUpdateLegacyApiArg = {
  teamId: number;
  body: {
    name: string;
    description?: string;
    privacy?: "secret" | "closed";
    permission?: "pull" | "push" | "admin";
    parent_team_id?: number | null;
  };
};
export type TeamsDeleteLegacyApiResponse = /** status 204 Response */ undefined;
export type TeamsDeleteLegacyApiArg = {
  teamId: number;
};
export type TeamsListDiscussionsLegacyApiResponse =
  /** status 200 Response */ TeamDiscussion[];
export type TeamsListDiscussionsLegacyApiArg = {
  teamId: number;
  /** One of `asc` (ascending) or `desc` (descending). */
  direction?: "asc" | "desc";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type TeamsCreateDiscussionLegacyApiResponse =
  /** status 201 Response */ TeamDiscussion;
export type TeamsCreateDiscussionLegacyApiArg = {
  teamId: number;
  body: {
    title: string;
    body: string;
    private?: boolean;
  };
};
export type TeamsGetDiscussionLegacyApiResponse =
  /** status 200 Response */ TeamDiscussion;
export type TeamsGetDiscussionLegacyApiArg = {
  teamId: number;
  discussionNumber: number;
};
export type TeamsUpdateDiscussionLegacyApiResponse =
  /** status 200 Response */ TeamDiscussion;
export type TeamsUpdateDiscussionLegacyApiArg = {
  teamId: number;
  discussionNumber: number;
  body: {
    title?: string;
    body?: string;
  };
};
export type TeamsDeleteDiscussionLegacyApiResponse = unknown;
export type TeamsDeleteDiscussionLegacyApiArg = {
  teamId: number;
  discussionNumber: number;
};
export type TeamsListDiscussionCommentsLegacyApiResponse =
  /** status 200 Response */ TeamDiscussionComment[];
export type TeamsListDiscussionCommentsLegacyApiArg = {
  teamId: number;
  discussionNumber: number;
  /** One of `asc` (ascending) or `desc` (descending). */
  direction?: "asc" | "desc";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type TeamsCreateDiscussionCommentLegacyApiResponse =
  /** status 201 Response */ TeamDiscussionComment;
export type TeamsCreateDiscussionCommentLegacyApiArg = {
  teamId: number;
  discussionNumber: number;
  body: {
    body: string;
  };
};
export type TeamsGetDiscussionCommentLegacyApiResponse =
  /** status 200 Response */ TeamDiscussionComment;
export type TeamsGetDiscussionCommentLegacyApiArg = {
  teamId: number;
  discussionNumber: number;
  commentNumber: number;
};
export type TeamsUpdateDiscussionCommentLegacyApiResponse =
  /** status 200 Response */ TeamDiscussionComment;
export type TeamsUpdateDiscussionCommentLegacyApiArg = {
  teamId: number;
  discussionNumber: number;
  commentNumber: number;
  body: {
    body: string;
  };
};
export type TeamsDeleteDiscussionCommentLegacyApiResponse = unknown;
export type TeamsDeleteDiscussionCommentLegacyApiArg = {
  teamId: number;
  discussionNumber: number;
  commentNumber: number;
};
export type TeamsListPendingInvitationsLegacyApiResponse =
  /** status 200 Response */ OrganizationInvitation[];
export type TeamsListPendingInvitationsLegacyApiArg = {
  teamId: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type TeamsListMembersLegacyApiResponse =
  /** status 200 Response */ SimpleUser2[];
export type TeamsListMembersLegacyApiArg = {
  teamId: number;
  /** Filters members returned by their role in the team. Can be one of:
    \* `member` - normal members of the team.
    \* `maintainer` - team maintainers.
    \* `all` - all members of the team. */
  role?: "member" | "maintainer" | "all";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type TeamsGetMemberLegacyApiResponse = unknown;
export type TeamsGetMemberLegacyApiArg = {
  teamId: number;
  username: string;
};
export type TeamsAddMemberLegacyApiResponse =
  /** status 204 Response */ undefined;
export type TeamsAddMemberLegacyApiArg = {
  teamId: number;
  username: string;
};
export type TeamsRemoveMemberLegacyApiResponse = unknown;
export type TeamsRemoveMemberLegacyApiArg = {
  teamId: number;
  username: string;
};
export type TeamsGetMembershipForUserLegacyApiResponse =
  /** status 200 Response */ TeamMembership;
export type TeamsGetMembershipForUserLegacyApiArg = {
  teamId: number;
  username: string;
};
export type TeamsAddOrUpdateMembershipForUserLegacyApiResponse =
  /** status 200 Response */ TeamMembership;
export type TeamsAddOrUpdateMembershipForUserLegacyApiArg = {
  teamId: number;
  username: string;
  body: {
    role?: "member" | "maintainer";
  };
};
export type TeamsRemoveMembershipForUserLegacyApiResponse = unknown;
export type TeamsRemoveMembershipForUserLegacyApiArg = {
  teamId: number;
  username: string;
};
export type TeamsListProjectsLegacyApiResponse =
  /** status 200 Response */ TeamProject[];
export type TeamsListProjectsLegacyApiArg = {
  teamId: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type TeamsCheckPermissionsForProjectLegacyApiResponse =
  /** status 200 Response */ TeamProject;
export type TeamsCheckPermissionsForProjectLegacyApiArg = {
  teamId: number;
  projectId: number;
};
export type TeamsAddOrUpdateProjectPermissionsLegacyApiResponse =
  /** status 204 Response */ undefined;
export type TeamsAddOrUpdateProjectPermissionsLegacyApiArg = {
  teamId: number;
  projectId: number;
  body: {
    permission?: "read" | "write" | "admin";
  };
};
export type TeamsRemoveProjectLegacyApiResponse =
  /** status 204 Response */ undefined;
export type TeamsRemoveProjectLegacyApiArg = {
  teamId: number;
  projectId: number;
};
export type TeamsListReposLegacyApiResponse =
  /** status 200 Response */ MinimalRepository[];
export type TeamsListReposLegacyApiArg = {
  teamId: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type TeamsCheckPermissionsForRepoLegacyApiResponse =
  /** status 200 Alternative response with extra repository information */
    | TeamRepository
    | /** status 204 Response if repository is managed by this team */ undefined;
export type TeamsCheckPermissionsForRepoLegacyApiArg = {
  teamId: number;
  owner: string;
  repo: string;
};
export type TeamsAddOrUpdateRepoPermissionsLegacyApiResponse =
  /** status 204 Response */ undefined;
export type TeamsAddOrUpdateRepoPermissionsLegacyApiArg = {
  teamId: number;
  owner: string;
  repo: string;
  body: {
    permission?: "pull" | "push" | "admin";
  };
};
export type TeamsRemoveRepoLegacyApiResponse = unknown;
export type TeamsRemoveRepoLegacyApiArg = {
  teamId: number;
  owner: string;
  repo: string;
};
export type TeamsListIdpGroupsForLegacyApiResponse =
  /** status 200 Response */ GroupMapping;
export type TeamsListIdpGroupsForLegacyApiArg = {
  teamId: number;
};
export type TeamsCreateOrUpdateIdpGroupConnectionsLegacyApiResponse =
  /** status 200 Response */ GroupMapping;
export type TeamsCreateOrUpdateIdpGroupConnectionsLegacyApiArg = {
  teamId: number;
  body: {
    groups: {
      group_id: string;
      group_name: string;
      group_description: string;
      id?: string;
      name?: string;
      description?: string;
    }[];
    synced_at?: string;
  };
};
export type TeamsListChildLegacyApiResponse =
  /** status 200 if child teams exist */ Team[];
export type TeamsListChildLegacyApiArg = {
  teamId: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type TeamsListForAuthenticatedUserApiResponse =
  /** status 200 Response */ FullTeam[];
export type TeamsListForAuthenticatedUserApiArg = {
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ExternalGroups = {
  groups?: {
    group_id: number;
    group_name: string;
    updated_at: string;
  }[];
};
export type ExternalGroup = {
  group_id: number;
  group_name: string;
  updated_at?: string;
  teams: {
    team_id: number;
    team_name: string;
  }[];
  members: {
    member_id: number;
    member_login: string;
    member_name: string;
    member_email: string;
  }[];
};
export type GroupMapping = {
  groups?: {
    group_id: string;
    group_name: string;
    group_description: string;
    status?: string;
    synced_at?: string | null;
  }[];
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
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
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
export type FullTeam = {
  id: number;
  node_id: string;
  url: string;
  html_url: string;
  name: string;
  slug: string;
  description: string | null;
  privacy?: "closed" | "secret";
  permission: string;
  members_url: string;
  repositories_url: string;
  parent?: TeamSimple;
  members_count: number;
  repos_count: number;
  created_at: string;
  updated_at: string;
  organization: OrganizationFull;
  ldap_dn?: string;
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
} | null;
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
export type TeamDiscussion = {
  author: SimpleUser;
  body: string;
  body_html: string;
  body_version: string;
  comments_count: number;
  comments_url: string;
  created_at: string;
  last_edited_at: string | null;
  html_url: string;
  node_id: string;
  number: number;
  pinned: boolean;
  private: boolean;
  team_url: string;
  title: string;
  updated_at: string;
  url: string;
  reactions?: ReactionRollup;
};
export type TeamDiscussionComment = {
  author: SimpleUser;
  body: string;
  body_html: string;
  body_version: string;
  created_at: string;
  last_edited_at: string | null;
  discussion_url: string;
  html_url: string;
  node_id: string;
  number: number;
  updated_at: string;
  url: string;
  reactions?: ReactionRollup;
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
export type OrganizationInvitation = {
  id: number;
  login: string | null;
  email: string | null;
  role: string;
  created_at: string;
  failed_at?: string | null;
  failed_reason?: string | null;
  inviter: SimpleUser2;
  team_count: number;
  node_id: string;
  invitation_teams_url: string;
};
export type TeamMembership = {
  url: string;
  role: "member" | "maintainer";
  state: "active" | "pending";
};
export type TeamProject = {
  owner_url: string;
  url: string;
  html_url: string;
  columns_url: string;
  id: number;
  node_id: string;
  name: string;
  body: string | null;
  number: number;
  state: string;
  creator: SimpleUser2;
  created_at: string;
  updated_at: string;
  organization_permission?: string;
  private?: boolean;
  permissions: {
    read: boolean;
    write: boolean;
    admin: boolean;
  };
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
export type TeamRepository = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  license: LicenseSimple;
  forks: number;
  permissions?: {
    admin: boolean;
    pull: boolean;
    triage?: boolean;
    push: boolean;
    maintain?: boolean;
  };
  role_name?: string;
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
  template_repository?: Repository;
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
};
export const {
  useTeamsListLinkedExternalIdpGroupsToTeamForOrgQuery,
  useTeamsExternalIdpGroupInfoForOrgQuery,
  useTeamsListExternalIdpGroupsForOrgQuery,
  useTeamsListIdpGroupsForOrgQuery,
  useTeamsListQuery,
  useTeamsCreateMutation,
  useTeamsGetByNameQuery,
  useTeamsUpdateInOrgMutation,
  useTeamsDeleteInOrgMutation,
  useTeamsListDiscussionsInOrgQuery,
  useTeamsCreateDiscussionInOrgMutation,
  useTeamsGetDiscussionInOrgQuery,
  useTeamsUpdateDiscussionInOrgMutation,
  useTeamsDeleteDiscussionInOrgMutation,
  useTeamsListDiscussionCommentsInOrgQuery,
  useTeamsCreateDiscussionCommentInOrgMutation,
  useTeamsGetDiscussionCommentInOrgQuery,
  useTeamsUpdateDiscussionCommentInOrgMutation,
  useTeamsDeleteDiscussionCommentInOrgMutation,
  useTeamsLinkExternalIdpGroupToTeamForOrgMutation,
  useTeamsUnlinkExternalIdpGroupFromTeamForOrgMutation,
  useTeamsListPendingInvitationsInOrgQuery,
  useTeamsListMembersInOrgQuery,
  useTeamsGetMembershipForUserInOrgQuery,
  useTeamsAddOrUpdateMembershipForUserInOrgMutation,
  useTeamsRemoveMembershipForUserInOrgMutation,
  useTeamsListProjectsInOrgQuery,
  useTeamsCheckPermissionsForProjectInOrgQuery,
  useTeamsAddOrUpdateProjectPermissionsInOrgMutation,
  useTeamsRemoveProjectInOrgMutation,
  useTeamsListReposInOrgQuery,
  useTeamsCheckPermissionsForRepoInOrgQuery,
  useTeamsAddOrUpdateRepoPermissionsInOrgMutation,
  useTeamsRemoveRepoInOrgMutation,
  useTeamsListIdpGroupsInOrgQuery,
  useTeamsCreateOrUpdateIdpGroupConnectionsInOrgMutation,
  useTeamsListChildInOrgQuery,
  useTeamsGetLegacyQuery,
  useTeamsUpdateLegacyMutation,
  useTeamsDeleteLegacyMutation,
  useTeamsListDiscussionsLegacyQuery,
  useTeamsCreateDiscussionLegacyMutation,
  useTeamsGetDiscussionLegacyQuery,
  useTeamsUpdateDiscussionLegacyMutation,
  useTeamsDeleteDiscussionLegacyMutation,
  useTeamsListDiscussionCommentsLegacyQuery,
  useTeamsCreateDiscussionCommentLegacyMutation,
  useTeamsGetDiscussionCommentLegacyQuery,
  useTeamsUpdateDiscussionCommentLegacyMutation,
  useTeamsDeleteDiscussionCommentLegacyMutation,
  useTeamsListPendingInvitationsLegacyQuery,
  useTeamsListMembersLegacyQuery,
  useTeamsGetMemberLegacyQuery,
  useTeamsAddMemberLegacyMutation,
  useTeamsRemoveMemberLegacyMutation,
  useTeamsGetMembershipForUserLegacyQuery,
  useTeamsAddOrUpdateMembershipForUserLegacyMutation,
  useTeamsRemoveMembershipForUserLegacyMutation,
  useTeamsListProjectsLegacyQuery,
  useTeamsCheckPermissionsForProjectLegacyQuery,
  useTeamsAddOrUpdateProjectPermissionsLegacyMutation,
  useTeamsRemoveProjectLegacyMutation,
  useTeamsListReposLegacyQuery,
  useTeamsCheckPermissionsForRepoLegacyQuery,
  useTeamsAddOrUpdateRepoPermissionsLegacyMutation,
  useTeamsRemoveRepoLegacyMutation,
  useTeamsListIdpGroupsForLegacyQuery,
  useTeamsCreateOrUpdateIdpGroupConnectionsLegacyMutation,
  useTeamsListChildLegacyQuery,
  useTeamsListForAuthenticatedUserQuery,
} = injectedRtkApi;
