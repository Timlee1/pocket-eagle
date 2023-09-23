import { apiSlice } from "../../../stores/baseApiSlice";

const getUsers = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => "/auth/test",
    }),
  }),
});

export const { useGetUsersQuery } = getUsers;
