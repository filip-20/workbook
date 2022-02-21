import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    interactionsGetRestrictionsForOrg: build.query<
      InteractionsGetRestrictionsForOrgApiResponse,
      InteractionsGetRestrictionsForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/interaction-limits`,
      }),
    }),
    interactionsSetRestrictionsForOrg: build.mutation<
      InteractionsSetRestrictionsForOrgApiResponse,
      InteractionsSetRestrictionsForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/interaction-limits`,
        method: "PUT",
        body: queryArg.interactionLimit,
      }),
    }),
    interactionsRemoveRestrictionsForOrg: build.mutation<
      InteractionsRemoveRestrictionsForOrgApiResponse,
      InteractionsRemoveRestrictionsForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/interaction-limits`,
        method: "DELETE",
      }),
    }),
    interactionsGetRestrictionsForRepo: build.query<
      InteractionsGetRestrictionsForRepoApiResponse,
      InteractionsGetRestrictionsForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/interaction-limits`,
      }),
    }),
    interactionsSetRestrictionsForRepo: build.mutation<
      InteractionsSetRestrictionsForRepoApiResponse,
      InteractionsSetRestrictionsForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/interaction-limits`,
        method: "PUT",
        body: queryArg.interactionLimit,
      }),
    }),
    interactionsRemoveRestrictionsForRepo: build.mutation<
      InteractionsRemoveRestrictionsForRepoApiResponse,
      InteractionsRemoveRestrictionsForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/interaction-limits`,
        method: "DELETE",
      }),
    }),
    interactionsGetRestrictionsForAuthenticatedUser: build.query<
      InteractionsGetRestrictionsForAuthenticatedUserApiResponse,
      InteractionsGetRestrictionsForAuthenticatedUserApiArg
    >({
      query: () => ({ url: `/user/interaction-limits` }),
    }),
    interactionsSetRestrictionsForAuthenticatedUser: build.mutation<
      InteractionsSetRestrictionsForAuthenticatedUserApiResponse,
      InteractionsSetRestrictionsForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/interaction-limits`,
        method: "PUT",
        body: queryArg.interactionLimit,
      }),
    }),
    interactionsRemoveRestrictionsForAuthenticatedUser: build.mutation<
      InteractionsRemoveRestrictionsForAuthenticatedUserApiResponse,
      InteractionsRemoveRestrictionsForAuthenticatedUserApiArg
    >({
      query: () => ({ url: `/user/interaction-limits`, method: "DELETE" }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type InteractionsGetRestrictionsForOrgApiResponse =
  /** status 200 Response */ InteractionLimits | {};
export type InteractionsGetRestrictionsForOrgApiArg = {
  org: string;
};
export type InteractionsSetRestrictionsForOrgApiResponse =
  /** status 200 Response */ InteractionLimits;
export type InteractionsSetRestrictionsForOrgApiArg = {
  org: string;
  interactionLimit: InteractionRestrictions;
};
export type InteractionsRemoveRestrictionsForOrgApiResponse = unknown;
export type InteractionsRemoveRestrictionsForOrgApiArg = {
  org: string;
};
export type InteractionsGetRestrictionsForRepoApiResponse =
  /** status 200 Response */ InteractionLimits | {};
export type InteractionsGetRestrictionsForRepoApiArg = {
  owner: string;
  repo: string;
};
export type InteractionsSetRestrictionsForRepoApiResponse =
  /** status 200 Response */ InteractionLimits;
export type InteractionsSetRestrictionsForRepoApiArg = {
  owner: string;
  repo: string;
  interactionLimit: InteractionRestrictions;
};
export type InteractionsRemoveRestrictionsForRepoApiResponse = unknown;
export type InteractionsRemoveRestrictionsForRepoApiArg = {
  owner: string;
  repo: string;
};
export type InteractionsGetRestrictionsForAuthenticatedUserApiResponse =
  | /** status 200 Default response */ (InteractionLimits | {})
  | /** status 204 Response when there are no restrictions */ undefined;
export type InteractionsGetRestrictionsForAuthenticatedUserApiArg = void;
export type InteractionsSetRestrictionsForAuthenticatedUserApiResponse =
  /** status 200 Response */ InteractionLimits;
export type InteractionsSetRestrictionsForAuthenticatedUserApiArg = {
  interactionLimit: InteractionRestrictions;
};
export type InteractionsRemoveRestrictionsForAuthenticatedUserApiResponse =
  unknown;
export type InteractionsRemoveRestrictionsForAuthenticatedUserApiArg = void;
export type InteractionGroup =
  | "existing_users"
  | "contributors_only"
  | "collaborators_only";
export type InteractionLimits = {
  limit: InteractionGroup;
  origin: string;
  expires_at: string;
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
export type InteractionExpiry =
  | "one_day"
  | "three_days"
  | "one_week"
  | "one_month"
  | "six_months";
export type InteractionRestrictions = {
  limit: InteractionGroup;
  expiry?: InteractionExpiry;
};
export const {
  useInteractionsGetRestrictionsForOrgQuery,
  useInteractionsSetRestrictionsForOrgMutation,
  useInteractionsRemoveRestrictionsForOrgMutation,
  useInteractionsGetRestrictionsForRepoQuery,
  useInteractionsSetRestrictionsForRepoMutation,
  useInteractionsRemoveRestrictionsForRepoMutation,
  useInteractionsGetRestrictionsForAuthenticatedUserQuery,
  useInteractionsSetRestrictionsForAuthenticatedUserMutation,
  useInteractionsRemoveRestrictionsForAuthenticatedUserMutation,
} = injectedRtkApi;
