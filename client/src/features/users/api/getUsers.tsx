import { apiSlice } from "../../../stores/baseApiSlice";

const getUsers = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<any, void>({
      query: () => "/auth/test",
    }),
  }),
});

export const { useGetUsersQuery } = getUsers;
