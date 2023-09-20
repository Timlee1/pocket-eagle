import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    setTimeout(async () => {
      // delayed for 200 ms
      result = await baseQuery(args, api, extraOptions);
    }, 2000);
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithRetry,
  endpoints: () => ({}),
});
