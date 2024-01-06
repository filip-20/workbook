import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    gitignoreGetAllTemplates: build.query<
      GitignoreGetAllTemplatesApiResponse,
      GitignoreGetAllTemplatesApiArg
    >({
      query: () => ({ url: `/gitignore/templates` }),
    }),
    gitignoreGetTemplate: build.query<
      GitignoreGetTemplateApiResponse,
      GitignoreGetTemplateApiArg
    >({
      query: (queryArg) => ({ url: `/gitignore/templates/${queryArg.name}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type GitignoreGetAllTemplatesApiResponse =
  /** status 200 Response */ string[];
export type GitignoreGetAllTemplatesApiArg = void;
export type GitignoreGetTemplateApiResponse =
  /** status 200 Response */ GitignoreTemplate;
export type GitignoreGetTemplateApiArg = {
  name: string;
};
export type GitignoreTemplate = {
  name: string;
  source: string;
};
export const {
  useGitignoreGetAllTemplatesQuery,
  useGitignoreGetTemplateQuery,
} = injectedRtkApi;
