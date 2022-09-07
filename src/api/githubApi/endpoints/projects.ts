import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    projectsListForOrg: build.query<
      ProjectsListForOrgApiResponse,
      ProjectsListForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/projects`,
        params: {
          state: queryArg.state,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    projectsCreateForOrg: build.mutation<
      ProjectsCreateForOrgApiResponse,
      ProjectsCreateForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/projects`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    projectsGetCard: build.query<
      ProjectsGetCardApiResponse,
      ProjectsGetCardApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/columns/cards/${queryArg.cardId}`,
      }),
    }),
    projectsUpdateCard: build.mutation<
      ProjectsUpdateCardApiResponse,
      ProjectsUpdateCardApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/columns/cards/${queryArg.cardId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    projectsDeleteCard: build.mutation<
      ProjectsDeleteCardApiResponse,
      ProjectsDeleteCardApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/columns/cards/${queryArg.cardId}`,
        method: "DELETE",
      }),
    }),
    projectsMoveCard: build.mutation<
      ProjectsMoveCardApiResponse,
      ProjectsMoveCardApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/columns/cards/${queryArg.cardId}/moves`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    projectsGetColumn: build.query<
      ProjectsGetColumnApiResponse,
      ProjectsGetColumnApiArg
    >({
      query: (queryArg) => ({ url: `/projects/columns/${queryArg.columnId}` }),
    }),
    projectsUpdateColumn: build.mutation<
      ProjectsUpdateColumnApiResponse,
      ProjectsUpdateColumnApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/columns/${queryArg.columnId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    projectsDeleteColumn: build.mutation<
      ProjectsDeleteColumnApiResponse,
      ProjectsDeleteColumnApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/columns/${queryArg.columnId}`,
        method: "DELETE",
      }),
    }),
    projectsListCards: build.query<
      ProjectsListCardsApiResponse,
      ProjectsListCardsApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/columns/${queryArg.columnId}/cards`,
        params: {
          archived_state: queryArg.archivedState,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    projectsCreateCard: build.mutation<
      ProjectsCreateCardApiResponse,
      ProjectsCreateCardApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/columns/${queryArg.columnId}/cards`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    projectsMoveColumn: build.mutation<
      ProjectsMoveColumnApiResponse,
      ProjectsMoveColumnApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/columns/${queryArg.columnId}/moves`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    projectsGet: build.query<ProjectsGetApiResponse, ProjectsGetApiArg>({
      query: (queryArg) => ({ url: `/projects/${queryArg.projectId}` }),
    }),
    projectsUpdate: build.mutation<
      ProjectsUpdateApiResponse,
      ProjectsUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    projectsDelete: build.mutation<
      ProjectsDeleteApiResponse,
      ProjectsDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}`,
        method: "DELETE",
      }),
    }),
    projectsListCollaborators: build.query<
      ProjectsListCollaboratorsApiResponse,
      ProjectsListCollaboratorsApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}/collaborators`,
        params: {
          affiliation: queryArg.affiliation,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    projectsAddCollaborator: build.mutation<
      ProjectsAddCollaboratorApiResponse,
      ProjectsAddCollaboratorApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}/collaborators/${queryArg.username}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    projectsRemoveCollaborator: build.mutation<
      ProjectsRemoveCollaboratorApiResponse,
      ProjectsRemoveCollaboratorApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}/collaborators/${queryArg.username}`,
        method: "DELETE",
      }),
    }),
    projectsGetPermissionForUser: build.query<
      ProjectsGetPermissionForUserApiResponse,
      ProjectsGetPermissionForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}/collaborators/${queryArg.username}/permission`,
      }),
    }),
    projectsListColumns: build.query<
      ProjectsListColumnsApiResponse,
      ProjectsListColumnsApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}/columns`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    projectsCreateColumn: build.mutation<
      ProjectsCreateColumnApiResponse,
      ProjectsCreateColumnApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}/columns`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    projectsListForRepo: build.query<
      ProjectsListForRepoApiResponse,
      ProjectsListForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/projects`,
        params: {
          state: queryArg.state,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    projectsCreateForRepo: build.mutation<
      ProjectsCreateForRepoApiResponse,
      ProjectsCreateForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/projects`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    projectsCreateForAuthenticatedUser: build.mutation<
      ProjectsCreateForAuthenticatedUserApiResponse,
      ProjectsCreateForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/projects`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    projectsListForUser: build.query<
      ProjectsListForUserApiResponse,
      ProjectsListForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/projects`,
        params: {
          state: queryArg.state,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type ProjectsListForOrgApiResponse =
  /** status 200 Response */ Project[];
export type ProjectsListForOrgApiArg = {
  org: string;
  /** Indicates the state of the projects to return. Can be either `open`, `closed`, or `all`. */
  state?: "open" | "closed" | "all";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ProjectsCreateForOrgApiResponse =
  /** status 201 Response */ Project;
export type ProjectsCreateForOrgApiArg = {
  org: string;
  body: {
    name: string;
    body?: string;
  };
};
export type ProjectsGetCardApiResponse = /** status 200 Response */ ProjectCard;
export type ProjectsGetCardApiArg = {
  /** card_id parameter */
  cardId: number;
};
export type ProjectsUpdateCardApiResponse =
  /** status 200 Response */ ProjectCard;
export type ProjectsUpdateCardApiArg = {
  /** card_id parameter */
  cardId: number;
  body: {
    note?: string | null;
    archived?: boolean;
  };
};
export type ProjectsDeleteCardApiResponse =
  /** status 204 Response */ undefined;
export type ProjectsDeleteCardApiArg = {
  /** card_id parameter */
  cardId: number;
};
export type ProjectsMoveCardApiResponse = /** status 201 Response */ {};
export type ProjectsMoveCardApiArg = {
  /** card_id parameter */
  cardId: number;
  body: {
    position: string;
    column_id?: number;
  };
};
export type ProjectsGetColumnApiResponse =
  /** status 200 Response */ ProjectColumn;
export type ProjectsGetColumnApiArg = {
  /** column_id parameter */
  columnId: number;
};
export type ProjectsUpdateColumnApiResponse =
  /** status 200 Response */ ProjectColumn;
export type ProjectsUpdateColumnApiArg = {
  /** column_id parameter */
  columnId: number;
  body: {
    name: string;
  };
};
export type ProjectsDeleteColumnApiResponse =
  /** status 204 Response */ undefined;
export type ProjectsDeleteColumnApiArg = {
  /** column_id parameter */
  columnId: number;
};
export type ProjectsListCardsApiResponse =
  /** status 200 Response */ ProjectCard[];
export type ProjectsListCardsApiArg = {
  /** column_id parameter */
  columnId: number;
  /** Filters the project cards that are returned by the card's state. Can be one of `all`,`archived`, or `not_archived`. */
  archivedState?: "all" | "archived" | "not_archived";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ProjectsCreateCardApiResponse =
  /** status 201 Response */ ProjectCard;
export type ProjectsCreateCardApiArg = {
  /** column_id parameter */
  columnId: number;
  body:
    | {
        note: string | null;
      }
    | {
        content_id: number;
        content_type: string;
      };
};
export type ProjectsMoveColumnApiResponse = /** status 201 Response */ {};
export type ProjectsMoveColumnApiArg = {
  /** column_id parameter */
  columnId: number;
  body: {
    position: string;
  };
};
export type ProjectsGetApiResponse = /** status 200 Response */ Project;
export type ProjectsGetApiArg = {
  projectId: number;
};
export type ProjectsUpdateApiResponse = /** status 200 Response */ Project;
export type ProjectsUpdateApiArg = {
  projectId: number;
  body: {
    name?: string;
    body?: string | null;
    state?: string;
    organization_permission?: "read" | "write" | "admin" | "none";
    private?: boolean;
  };
};
export type ProjectsDeleteApiResponse =
  /** status 204 Delete Success */ undefined;
export type ProjectsDeleteApiArg = {
  projectId: number;
};
export type ProjectsListCollaboratorsApiResponse =
  /** status 200 Response */ SimpleUser2[];
export type ProjectsListCollaboratorsApiArg = {
  projectId: number;
  /** Filters the collaborators by their affiliation. Can be one of:
    \* `outside`: Outside collaborators of a project that are not a member of the project's organization.
    \* `direct`: Collaborators with permissions to a project, regardless of organization membership status.
    \* `all`: All collaborators the authenticated user can see. */
  affiliation?: "outside" | "direct" | "all";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ProjectsAddCollaboratorApiResponse =
  /** status 204 Response */ undefined;
export type ProjectsAddCollaboratorApiArg = {
  projectId: number;
  username: string;
  body: {
    permission?: "read" | "write" | "admin";
  } | null;
};
export type ProjectsRemoveCollaboratorApiResponse =
  /** status 204 Response */ undefined;
export type ProjectsRemoveCollaboratorApiArg = {
  projectId: number;
  username: string;
};
export type ProjectsGetPermissionForUserApiResponse =
  /** status 200 Response */ ProjectCollaboratorPermission;
export type ProjectsGetPermissionForUserApiArg = {
  projectId: number;
  username: string;
};
export type ProjectsListColumnsApiResponse =
  /** status 200 Response */ ProjectColumn[];
export type ProjectsListColumnsApiArg = {
  projectId: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ProjectsCreateColumnApiResponse =
  /** status 201 Response */ ProjectColumn;
export type ProjectsCreateColumnApiArg = {
  projectId: number;
  body: {
    name: string;
  };
};
export type ProjectsListForRepoApiResponse =
  /** status 200 Response */ Project[];
export type ProjectsListForRepoApiArg = {
  owner: string;
  repo: string;
  /** Indicates the state of the projects to return. Can be either `open`, `closed`, or `all`. */
  state?: "open" | "closed" | "all";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ProjectsCreateForRepoApiResponse =
  /** status 201 Response */ Project;
export type ProjectsCreateForRepoApiArg = {
  owner: string;
  repo: string;
  body: {
    name: string;
    body?: string;
  };
};
export type ProjectsCreateForAuthenticatedUserApiResponse =
  /** status 201 Response */ Project;
export type ProjectsCreateForAuthenticatedUserApiArg = {
  body: {
    name: string;
    body?: string | null;
  };
};
export type ProjectsListForUserApiResponse =
  /** status 200 Response */ Project[];
export type ProjectsListForUserApiArg = {
  username: string;
  /** Indicates the state of the projects to return. Can be either `open`, `closed`, or `all`. */
  state?: "open" | "closed" | "all";
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
} | null;
export type Project = {
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
  creator: SimpleUser;
  created_at: string;
  updated_at: string;
  organization_permission?: "read" | "write" | "admin" | "none";
  private?: boolean;
};
export type ValidationErrorSimple = {
  message: string;
  documentation_url: string;
  errors?: string[];
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
};
export type ProjectCard = {
  url: string;
  id: number;
  node_id: string;
  note: string | null;
  creator: SimpleUser;
  created_at: string;
  updated_at: string;
  archived?: boolean;
  column_name?: string;
  project_id?: string;
  column_url: string;
  content_url?: string;
  project_url: string;
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
export type ProjectColumn = {
  url: string;
  project_url: string;
  cards_url: string;
  id: number;
  node_id: string;
  name: string;
  created_at: string;
  updated_at: string;
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
export type ProjectCollaboratorPermission = {
  permission: string;
  user: SimpleUser;
};
export const {
  useProjectsListForOrgQuery,
  useProjectsCreateForOrgMutation,
  useProjectsGetCardQuery,
  useProjectsUpdateCardMutation,
  useProjectsDeleteCardMutation,
  useProjectsMoveCardMutation,
  useProjectsGetColumnQuery,
  useProjectsUpdateColumnMutation,
  useProjectsDeleteColumnMutation,
  useProjectsListCardsQuery,
  useProjectsCreateCardMutation,
  useProjectsMoveColumnMutation,
  useProjectsGetQuery,
  useProjectsUpdateMutation,
  useProjectsDeleteMutation,
  useProjectsListCollaboratorsQuery,
  useProjectsAddCollaboratorMutation,
  useProjectsRemoveCollaboratorMutation,
  useProjectsGetPermissionForUserQuery,
  useProjectsListColumnsQuery,
  useProjectsCreateColumnMutation,
  useProjectsListForRepoQuery,
  useProjectsCreateForRepoMutation,
  useProjectsCreateForAuthenticatedUserMutation,
  useProjectsListForUserQuery,
} = injectedRtkApi;
