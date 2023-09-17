import { apiSlice } from "../../../stores/baseApiSlice";

const getUsers = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<any, void>({
      query: () => "/users/test",
    }),
  }),
});

export const { useGetUsersQuery } = getUsers;
