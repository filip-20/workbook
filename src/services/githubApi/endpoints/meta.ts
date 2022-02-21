import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    metaRoot: build.query<MetaRootApiResponse, MetaRootApiArg>({
      query: () => ({ url: `/` }),
    }),
    metaGet: build.query<MetaGetApiResponse, MetaGetApiArg>({
      query: () => ({ url: `/meta` }),
    }),
    metaGetOctocat: build.query<
      MetaGetOctocatApiResponse,
      MetaGetOctocatApiArg
    >({
      query: (queryArg) => ({ url: `/octocat`, params: { s: queryArg.s } }),
    }),
    metaGetZen: build.query<MetaGetZenApiResponse, MetaGetZenApiArg>({
      query: () => ({ url: `/zen` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type MetaRootApiResponse = /** status 200 Response */ {
  current_user_url: string;
  current_user_authorizations_html_url: string;
  authorizations_url: string;
  code_search_url: string;
  commit_search_url: string;
  emails_url: string;
  emojis_url: string;
  events_url: string;
  feeds_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  hub_url: string;
  issue_search_url: string;
  issues_url: string;
  keys_url: string;
  label_search_url: string;
  notifications_url: string;
  organization_url: string;
  organization_repositories_url: string;
  organization_teams_url: string;
  public_gists_url: string;
  rate_limit_url: string;
  repository_url: string;
  repository_search_url: string;
  current_user_repositories_url: string;
  starred_url: string;
  starred_gists_url: string;
  topic_search_url?: string;
  user_url: string;
  user_organizations_url: string;
  user_repositories_url: string;
  user_search_url: string;
};
export type MetaRootApiArg = void;
export type MetaGetApiResponse = /** status 200 Response */ ApiOverview;
export type MetaGetApiArg = void;
export type MetaGetOctocatApiResponse = unknown;
export type MetaGetOctocatApiArg = {
  /** The words to show in Octocat's speech bubble */
  s?: string;
};
export type MetaGetZenApiResponse = unknown;
export type MetaGetZenApiArg = void;
export type ApiOverview = {
  verifiable_password_authentication: boolean;
  ssh_key_fingerprints?: {
    SHA256_RSA?: string;
    SHA256_DSA?: string;
    SHA256_ECDSA?: string;
    SHA256_ED25519?: string;
  };
  ssh_keys?: string[];
  hooks?: string[];
  web?: string[];
  api?: string[];
  git?: string[];
  packages?: string[];
  pages?: string[];
  importer?: string[];
  actions?: string[];
  dependabot?: string[];
};
export const {
  useMetaRootQuery,
  useMetaGetQuery,
  useMetaGetOctocatQuery,
  useMetaGetZenQuery,
} = injectedRtkApi;
