import { authApi } from "../Redux/AuthSlice/AuthSlice";

export const AuthApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({ url: "signup", method: "POST", body: data }),
    }),

    login: builder.mutation({
      query: (data) => ({ url: "login", method: "POST", body: data }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = AuthApi;
