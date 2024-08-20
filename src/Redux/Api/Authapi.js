import { authApi } from "../Slices/AuthSlice";

export const AuthApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({ url: "signup", method: "POST", body: data }),
     
    }),

    login: builder.mutation({
      query: (data) => ({ url: "login", method: "POST", body: data }),
    }),
    profile: builder.query({
      query: (id) => ({
        url: `getuser/${id}`
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useProfileMutation } =
  AuthApi;
