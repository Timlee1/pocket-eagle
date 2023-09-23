import { apiSlice } from "@/stores/baseApiSlice";

const createCustomerPortalSession = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCustomerPortalSession: builder.mutation({
      query: (res) => ({
        url: "/payment/createCustomerPortalSession",
        method: "POST",
        body: { ...res },
      }),
    }),
  }),
});

export const { useCreateCustomerPortalSessionMutation } =
  createCustomerPortalSession;
