import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react";
import { setAuthState } from "../../store/authSlice";
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

 const githubBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown, FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  /* Detect when query resulted in 401 Unauthorized which means accessToken 
   * is invalid or expired.
   */
  let result = await baseQuery(args, api, extraOptions)
  console.log(result);
  if (result.error && result.error.status === 401) {
    api.dispatch(setAuthState('tokenExpired'));
  }
  return result;
};

export default githubBaseQuery;
