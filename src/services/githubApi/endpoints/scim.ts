import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    scimListProvisionedIdentities: build.query<
      ScimListProvisionedIdentitiesApiResponse,
      ScimListProvisionedIdentitiesApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/organizations/${queryArg.org}/Users`,
        params: {
          startIndex: queryArg.startIndex,
          count: queryArg.count,
          filter: queryArg.filter,
        },
      }),
    }),
    scimProvisionAndInviteUser: build.mutation<
      ScimProvisionAndInviteUserApiResponse,
      ScimProvisionAndInviteUserApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/organizations/${queryArg.org}/Users`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    scimGetProvisioningInformationForUser: build.query<
      ScimGetProvisioningInformationForUserApiResponse,
      ScimGetProvisioningInformationForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/organizations/${queryArg.org}/Users/${queryArg.scimUserId}`,
      }),
    }),
    scimSetInformationForProvisionedUser: build.mutation<
      ScimSetInformationForProvisionedUserApiResponse,
      ScimSetInformationForProvisionedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/organizations/${queryArg.org}/Users/${queryArg.scimUserId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    scimUpdateAttributeForUser: build.mutation<
      ScimUpdateAttributeForUserApiResponse,
      ScimUpdateAttributeForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/organizations/${queryArg.org}/Users/${queryArg.scimUserId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    scimDeleteUserFromOrg: build.mutation<
      ScimDeleteUserFromOrgApiResponse,
      ScimDeleteUserFromOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/scim/v2/organizations/${queryArg.org}/Users/${queryArg.scimUserId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type ScimListProvisionedIdentitiesApiResponse =
  /** status 200 Response */ Blob;
export type ScimListProvisionedIdentitiesApiArg = {
  org: string;
  /** Used for pagination: the index of the first result to return. */
  startIndex?: number;
  /** Used for pagination: the number of results to return. */
  count?: number;
  /** Filters results using the equals query parameter operator (`eq`). You can filter results that are equal to `id`, `userName`, `emails`, and `external_id`. For example, to search for an identity with the `userName` Octocat, you would use this query:
    
    `?filter=userName%20eq%20\"Octocat\"`.
    
    To filter results for the identity with the email `octocat@github.com`, you would use this query:
    
    `?filter=emails%20eq%20\"octocat@github.com\"`. */
  filter?: string;
};
export type ScimProvisionAndInviteUserApiResponse =
  /** status 201 Response */ Blob;
export type ScimProvisionAndInviteUserApiArg = {
  org: string;
  body: {
    userName: string;
    displayName?: string;
    name: {
      givenName: string;
      familyName: string;
      formatted?: string;
    };
    emails: {
      value: string;
      primary?: boolean;
      type?: string;
    }[];
    schemas?: string[];
    externalId?: string;
    groups?: string[];
    active?: boolean;
  };
};
export type ScimGetProvisioningInformationForUserApiResponse =
  /** status 200 Response */ Blob;
export type ScimGetProvisioningInformationForUserApiArg = {
  org: string;
  /** scim_user_id parameter */
  scimUserId: string;
};
export type ScimSetInformationForProvisionedUserApiResponse =
  /** status 200 Response */ Blob;
export type ScimSetInformationForProvisionedUserApiArg = {
  org: string;
  /** scim_user_id parameter */
  scimUserId: string;
  body: {
    schemas?: string[];
    displayName?: string;
    externalId?: string;
    groups?: string[];
    active?: boolean;
    userName: string;
    name: {
      givenName: string;
      familyName: string;
      formatted?: string;
    };
    emails: {
      type?: string;
      value: string;
      primary?: boolean;
    }[];
  };
};
export type ScimUpdateAttributeForUserApiResponse =
  /** status 200 Response */ Blob;
export type ScimUpdateAttributeForUserApiArg = {
  org: string;
  /** scim_user_id parameter */
  scimUserId: string;
  body: {
    schemas?: string[];
    Operations: {
      op: "add" | "remove" | "replace";
      path?: string;
      value?:
        | {
            active?: boolean | null;
            userName?: string | null;
            externalId?: string | null;
            givenName?: string | null;
            familyName?: string | null;
          }
        | {
            value?: string;
            primary?: boolean;
          }[]
        | string;
    }[];
  };
};
export type ScimDeleteUserFromOrgApiResponse =
  /** status 204 Response */ undefined;
export type ScimDeleteUserFromOrgApiArg = {
  org: string;
  /** scim_user_id parameter */
  scimUserId: string;
};
export type ScimError = {
  message?: string | null;
  documentation_url?: string | null;
  detail?: string | null;
  status?: number;
  scimType?: string | null;
  schemas?: string[];
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
};
export const {
  useScimListProvisionedIdentitiesQuery,
  useScimProvisionAndInviteUserMutation,
  useScimGetProvisioningInformationForUserQuery,
  useScimSetInformationForProvisionedUserMutation,
  useScimUpdateAttributeForUserMutation,
  useScimDeleteUserFromOrgMutation,
} = injectedRtkApi;
