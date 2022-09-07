import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    rateLimitGet: build.query<RateLimitGetApiResponse, RateLimitGetApiArg>({
      query: () => ({ url: `/rate_limit` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type RateLimitGetApiResponse =
  /** status 200 Response */ RateLimitOverview;
export type RateLimitGetApiArg = void;
export type RateLimit = {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
};
export type RateLimitOverview = {
  resources: {
    core: RateLimit;
    graphql?: RateLimit;
    search: RateLimit;
    source_import?: RateLimit;
    integration_manifest?: RateLimit;
    code_scanning_upload?: RateLimit;
    actions_runner_registration?: RateLimit;
    scim?: RateLimit;
  };
  rate: RateLimit;
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
};
export const { useRateLimitGetQuery } = injectedRtkApi;
