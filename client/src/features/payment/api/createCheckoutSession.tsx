import { apiSlice } from "@/stores/baseApiSlice";

const createCheckoutSession = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (res) => ({
        url: "/payment/createCheckoutSession",
        method: "POST",
        body: { ...res },
      }),
    }),
  }),
});

export const { useCreateCheckoutSessionMutation } = createCheckoutSession;
