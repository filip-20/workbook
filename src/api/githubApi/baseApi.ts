import { createApi } from "@reduxjs/toolkit/query/react";
import githubBaseQuery from "./baseQuery";
import { ReposListBranchesApiArg, ReposListBranchesApiResponse, ReposListForAuthenticatedUserApiArg, ReposListForUserApiArg, ReposMergeApiArg, ReposMergeApiResponse } from "./endpoints/repos";
import { SearchReposApiArg } from "./endpoints/search";
import githubApiParseLastPage from "./lastPage";

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: githubBaseQuery,
  tagTypes: ['Files', 'Refs', 'Pulls'],
  endpoints: (build) => ({
    reposListForUserHeaders: build.query<{ link?: string }, ReposListForUserApiArg>({
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
    reposListForAuthenticatedUserHeaders: build.query<{ link?: string }, ReposListForAuthenticatedUserApiArg>({
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
    searchReposHeaders: build.query<{ link?: string }, SearchReposApiArg>({
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
    reposListBranchesHeaders: build.query<{ link?: string }, ReposListBranchesApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches`,
        params: {
          protected: queryArg["protected"],
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
      transformResponse(apiResponse, meta) {
        return { link: meta?.response?.headers.get("link") || undefined }
      }
    }),
    reposListAllBranches: build.query<ReposListBranchesApiResponse, { owner: string, repo: string, protected?: boolean }>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/branches`,
        params: {
          protected: queryArg["protected"],
          per_page: 50
        },
      }),
      async onQueryStarted({ owner, repo }, { dispatch, getState, queryFulfilled, updateCachedData }) {
        let headers = await githubApi.endpoints.reposListBranchesHeaders.initiate({ owner, repo, perPage: 50 })(dispatch, getState, null)
        if (headers.isSuccess) {
          const lastPage = githubApiParseLastPage(headers.data.link);
          try {
            let result = await queryFulfilled
            console.log('reposListAllBranches: got result ', result, ' lastPage is ', lastPage);
            let extraBranches: ReposListBranchesApiResponse = []
            for (let page = 1; page < lastPage; page++) {
              //const r1 = await reposApi.endpoints.reposListBranches.initiate({owner, repo, page, perPage: 50})(dispatch, getState, null)
              console.log('loading extra branches on page ', page);
              /*if (r1.isSuccess) {
                extraBranches = extraBranches.concat(r1.data)
              } else {
                // TODO
              }*/
            }
            updateCachedData(recipe => recipe.concat(extraBranches))
          } catch (err) {
            // TODO
          }
        }
      },
    }),
    reposMergeWithResponseCode: build.mutation<{ status: number, response: ReposMergeApiResponse }, ReposMergeApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/merges`,
        method: "POST",
        body: queryArg.body,
      }),
      transformResponse: (baseQueryReturnValue, meta, arg) => {
        console.log(meta);
        return { status: meta?.response?.status || -1, response: baseQueryReturnValue as ReposMergeApiResponse}
      },
    }),
    reposRenameBranchWithResponseCode: build.mutation<{ status: number, reponse: ReposMergeApiResponse }, ReposMergeApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/merges`,
        method: "POST",
        body: queryArg.body,
      }),
      transformResponse: (baseQueryReturnValue, meta, arg) => {
        console.log(meta);
        return { status: 0, reponse: undefined }
      },
    }),
  }),
});

export const { useReposListForUserHeadersQuery, useReposListForAuthenticatedUserHeadersQuery, useSearchReposHeadersQuery, useReposListBranchesHeadersQuery, useReposListAllBranchesQuery } = githubApi;