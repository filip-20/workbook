import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

import { RootState } from '../../store/store'

const baseQuery = fetchBaseQuery({ 
  baseUrl: "https://api.github.com/",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set('Authorization', `token ${accessToken}`);
    }
    return headers;
  }
 });
 
 /*
const githubBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown, FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  return baseQuery(args, api, extraOptions);
};
*/

export default baseQuery;
