import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    codesOfConductGetAllCodesOfConduct: build.query<
      CodesOfConductGetAllCodesOfConductApiResponse,
      CodesOfConductGetAllCodesOfConductApiArg
    >({
      query: () => ({ url: `/codes_of_conduct` }),
    }),
    codesOfConductGetConductCode: build.query<
      CodesOfConductGetConductCodeApiResponse,
      CodesOfConductGetConductCodeApiArg
    >({
      query: (queryArg) => ({ url: `/codes_of_conduct/${queryArg.key}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type CodesOfConductGetAllCodesOfConductApiResponse =
  /** status 200 Response */ CodeOfConduct[];
export type CodesOfConductGetAllCodesOfConductApiArg = void;
export type CodesOfConductGetConductCodeApiResponse =
  /** status 200 Response */ CodeOfConduct;
export type CodesOfConductGetConductCodeApiArg = {
  key: string;
};
export type CodeOfConduct = {
  key: string;
  name: string;
  url: string;
  body?: string;
  html_url: string | null;
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
};
export const {
  useCodesOfConductGetAllCodesOfConductQuery,
  useCodesOfConductGetConductCodeQuery,
} = injectedRtkApi;
