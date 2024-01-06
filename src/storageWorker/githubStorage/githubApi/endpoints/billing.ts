import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    billingGetGithubActionsBillingGhe: build.query<
      BillingGetGithubActionsBillingGheApiResponse,
      BillingGetGithubActionsBillingGheApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/settings/billing/actions`,
      }),
    }),
    billingGetGithubAdvancedSecurityBillingGhe: build.query<
      BillingGetGithubAdvancedSecurityBillingGheApiResponse,
      BillingGetGithubAdvancedSecurityBillingGheApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/settings/billing/advanced-security`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    billingGetGithubPackagesBillingGhe: build.query<
      BillingGetGithubPackagesBillingGheApiResponse,
      BillingGetGithubPackagesBillingGheApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/settings/billing/packages`,
      }),
    }),
    billingGetSharedStorageBillingGhe: build.query<
      BillingGetSharedStorageBillingGheApiResponse,
      BillingGetSharedStorageBillingGheApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprises/${queryArg.enterprise}/settings/billing/shared-storage`,
      }),
    }),
    billingGetGithubActionsBillingOrg: build.query<
      BillingGetGithubActionsBillingOrgApiResponse,
      BillingGetGithubActionsBillingOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/settings/billing/actions`,
      }),
    }),
    billingGetGithubAdvancedSecurityBillingOrg: build.query<
      BillingGetGithubAdvancedSecurityBillingOrgApiResponse,
      BillingGetGithubAdvancedSecurityBillingOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/settings/billing/advanced-security`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    billingGetGithubPackagesBillingOrg: build.query<
      BillingGetGithubPackagesBillingOrgApiResponse,
      BillingGetGithubPackagesBillingOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/settings/billing/packages`,
      }),
    }),
    billingGetSharedStorageBillingOrg: build.query<
      BillingGetSharedStorageBillingOrgApiResponse,
      BillingGetSharedStorageBillingOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/settings/billing/shared-storage`,
      }),
    }),
    billingGetGithubActionsBillingUser: build.query<
      BillingGetGithubActionsBillingUserApiResponse,
      BillingGetGithubActionsBillingUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/settings/billing/actions`,
      }),
    }),
    billingGetGithubPackagesBillingUser: build.query<
      BillingGetGithubPackagesBillingUserApiResponse,
      BillingGetGithubPackagesBillingUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/settings/billing/packages`,
      }),
    }),
    billingGetSharedStorageBillingUser: build.query<
      BillingGetSharedStorageBillingUserApiResponse,
      BillingGetSharedStorageBillingUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/settings/billing/shared-storage`,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type BillingGetGithubActionsBillingGheApiResponse =
  /** status 200 Response */ ActionsBillingUsage;
export type BillingGetGithubActionsBillingGheApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
};
export type BillingGetGithubAdvancedSecurityBillingGheApiResponse =
  /** status 200 Success */ AdvancedSecurityActiveCommitters;
export type BillingGetGithubAdvancedSecurityBillingGheApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type BillingGetGithubPackagesBillingGheApiResponse =
  /** status 200 Response */ PackagesBillingUsage;
export type BillingGetGithubPackagesBillingGheApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
};
export type BillingGetSharedStorageBillingGheApiResponse =
  /** status 200 Response */ CombinedBillingUsage;
export type BillingGetSharedStorageBillingGheApiArg = {
  /** The slug version of the enterprise name. You can also substitute this value with the enterprise id. */
  enterprise: string;
};
export type BillingGetGithubActionsBillingOrgApiResponse =
  /** status 200 Response */ ActionsBillingUsage;
export type BillingGetGithubActionsBillingOrgApiArg = {
  org: string;
};
export type BillingGetGithubAdvancedSecurityBillingOrgApiResponse =
  /** status 200 Success */ AdvancedSecurityActiveCommitters;
export type BillingGetGithubAdvancedSecurityBillingOrgApiArg = {
  org: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type BillingGetGithubPackagesBillingOrgApiResponse =
  /** status 200 Response */ PackagesBillingUsage;
export type BillingGetGithubPackagesBillingOrgApiArg = {
  org: string;
};
export type BillingGetSharedStorageBillingOrgApiResponse =
  /** status 200 Response */ CombinedBillingUsage;
export type BillingGetSharedStorageBillingOrgApiArg = {
  org: string;
};
export type BillingGetGithubActionsBillingUserApiResponse =
  /** status 200 Response */ ActionsBillingUsage;
export type BillingGetGithubActionsBillingUserApiArg = {
  username: string;
};
export type BillingGetGithubPackagesBillingUserApiResponse =
  /** status 200 Response */ PackagesBillingUsage;
export type BillingGetGithubPackagesBillingUserApiArg = {
  username: string;
};
export type BillingGetSharedStorageBillingUserApiResponse =
  /** status 200 Response */ CombinedBillingUsage;
export type BillingGetSharedStorageBillingUserApiArg = {
  username: string;
};
export type ActionsBillingUsage = {
  total_minutes_used: number;
  total_paid_minutes_used: number;
  included_minutes: number;
  minutes_used_breakdown: {
    UBUNTU?: number;
    MACOS?: number;
    WINDOWS?: number;
  };
};
export type AdvancedSecurityActiveCommittersUser = {
  user_login: string;
  last_pushed_date: string;
};
export type AdvancedSecurityActiveCommittersRepository = {
  name: string;
  advanced_security_committers: number;
  advanced_security_committers_breakdown: AdvancedSecurityActiveCommittersUser[];
};
export type AdvancedSecurityActiveCommitters = {
  total_advanced_security_committers?: number;
  repositories: AdvancedSecurityActiveCommittersRepository[];
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
};
export type PackagesBillingUsage = {
  total_gigabytes_bandwidth_used: number;
  total_paid_gigabytes_bandwidth_used: number;
  included_gigabytes_bandwidth: number;
};
export type CombinedBillingUsage = {
  days_left_in_billing_cycle: number;
  estimated_paid_storage_for_month: number;
  estimated_storage_for_month: number;
};
export const {
  useBillingGetGithubActionsBillingGheQuery,
  useBillingGetGithubAdvancedSecurityBillingGheQuery,
  useBillingGetGithubPackagesBillingGheQuery,
  useBillingGetSharedStorageBillingGheQuery,
  useBillingGetGithubActionsBillingOrgQuery,
  useBillingGetGithubAdvancedSecurityBillingOrgQuery,
  useBillingGetGithubPackagesBillingOrgQuery,
  useBillingGetSharedStorageBillingOrgQuery,
  useBillingGetGithubActionsBillingUserQuery,
  useBillingGetGithubPackagesBillingUserQuery,
  useBillingGetSharedStorageBillingUserQuery,
} = injectedRtkApi;
