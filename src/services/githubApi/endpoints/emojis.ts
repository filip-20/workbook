import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    emojisGet: build.query<EmojisGetApiResponse, EmojisGetApiArg>({
      query: () => ({ url: `/emojis` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type EmojisGetApiResponse = /** status 200 Response */ {
  [key: string]: string;
};
export type EmojisGetApiArg = void;
export const { useEmojisGetQuery } = injectedRtkApi;
