import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    markdownRender: build.mutation<
      MarkdownRenderApiResponse,
      MarkdownRenderApiArg
    >({
      query: (queryArg) => ({
        url: `/markdown`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    markdownRenderRaw: build.mutation<
      MarkdownRenderRawApiResponse,
      MarkdownRenderRawApiArg
    >({
      query: (queryArg) => ({
        url: `/markdown/raw`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type MarkdownRenderApiResponse = unknown;
export type MarkdownRenderApiArg = {
  body: {
    text: string;
    mode?: "markdown" | "gfm";
    context?: string;
  };
};
export type MarkdownRenderRawApiResponse = unknown;
export type MarkdownRenderRawApiArg = {
  body: string;
};
export const { useMarkdownRenderMutation, useMarkdownRenderRawMutation } =
  injectedRtkApi;
