import { createApi } from "@reduxjs/toolkit/query/react";
import githubBaseQuery from "./baseQuery";
import { ReposListForAuthenticatedUserApiArg, ReposListForUserApiArg } from "./endpoints/repos";
import { SearchReposApiArg } from "./endpoints/search";

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: githubBaseQuery,
  tagTypes: ['Files'],
  endpoints: (build) => ({
    reposListForUserHeaders: build.query<{link?: string}, ReposListForUserApiArg>({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/repos`,
        method: 'HEAD',
        params: {
          type: queryArg['type'],
          sort: queryArg.sort,
          direction: queryArg.direction,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
      transformResponse(apiResponse, meta) {
        return { link: meta?.response?.headers.get("link") || undefined }
      }
    }),
    reposListForAuthenticatedUserHeaders: build.query<{link?: string}, ReposListForAuthenticatedUserApiArg>({
      query: (queryArg) => ({
        method: 'HEAD',
        url: `/user/repos`,
        params: {
          visibility: queryArg.visibility,
          affiliation: queryArg.affiliation,
          type: queryArg["type"],
          sort: queryArg.sort,
          direction: queryArg.direction,
          per_page: queryArg.perPage,
          page: queryArg.page,
          since: queryArg.since,
          before: queryArg.before,
        },
      }),
      transformResponse(apiResponse, meta) {
        return { link: meta?.response?.headers.get("link") || undefined }
      }
    }),
    searchReposHeaders: build.query<{link?: string}, SearchReposApiArg>({
      query: (queryArg) => ({
        method: 'HEAD',
        url: `/search/repositories`,
        params: {
          q: queryArg.q,
          sort: queryArg.sort,
          order: queryArg.order,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
      transformResponse(apiResponse, meta) {
        return { link: meta?.response?.headers.get("link") || undefined }
      }
    }),
  }),
});

export const { useReposListForUserHeadersQuery, useReposListForAuthenticatedUserHeadersQuery, useSearchReposHeadersQuery } = githubApi;