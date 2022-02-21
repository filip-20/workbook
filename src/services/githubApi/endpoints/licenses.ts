import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    licensesGetAllCommonlyUsed: build.query<
      LicensesGetAllCommonlyUsedApiResponse,
      LicensesGetAllCommonlyUsedApiArg
    >({
      query: (queryArg) => ({
        url: `/licenses`,
        params: {
          featured: queryArg.featured,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    licensesGet: build.query<LicensesGetApiResponse, LicensesGetApiArg>({
      query: (queryArg) => ({ url: `/licenses/${queryArg.license}` }),
    }),
    licensesGetForRepo: build.query<
      LicensesGetForRepoApiResponse,
      LicensesGetForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/license`,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type LicensesGetAllCommonlyUsedApiResponse =
  /** status 200 Response */ LicenseSimple[];
export type LicensesGetAllCommonlyUsedApiArg = {
  featured?: boolean;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type LicensesGetApiResponse = /** status 200 Response */ License;
export type LicensesGetApiArg = {
  license: string;
};
export type LicensesGetForRepoApiResponse =
  /** status 200 Response */ LicenseContent;
export type LicensesGetForRepoApiArg = {
  owner: string;
  repo: string;
};
export type LicenseSimple = {
  key: string;
  name: string;
  url: string | null;
  spdx_id: string | null;
  node_id: string;
  html_url?: string;
};
export type License = {
  key: string;
  name: string;
  spdx_id: string | null;
  url: string | null;
  node_id: string;
  html_url: string;
  description: string;
  implementation: string;
  permissions: string[];
  conditions: string[];
  limitations: string[];
  body: string;
  featured: boolean;
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
};
export type LicenseSimple2 = {
  key: string;
  name: string;
  url: string | null;
  spdx_id: string | null;
  node_id: string;
  html_url?: string;
} | null;
export type LicenseContent = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string | null;
  git_url: string | null;
  download_url: string | null;
  type: string;
  content: string;
  encoding: string;
  _links: {
    git: string | null;
    html: string | null;
    self: string;
  };
  license: LicenseSimple2;
};
export const {
  useLicensesGetAllCommonlyUsedQuery,
  useLicensesGetQuery,
  useLicensesGetForRepoQuery,
} = injectedRtkApi;
