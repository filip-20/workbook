import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "https://api.github.com/" });
const githubBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown, FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  /*
  console.log('args:');
  console.log(args);
  console.log('extraOptions:');
  console.log(extraOptions);*/
  return baseQuery(args, api, extraOptions);
};

export default githubBaseQuery;
