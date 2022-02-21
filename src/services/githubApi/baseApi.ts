import { createApi } from "@reduxjs/toolkit/query/react";
import githubBaseQuery from "./baseQuery";

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: githubBaseQuery,
  endpoints: () => ({}),
});
