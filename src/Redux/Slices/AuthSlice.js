import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  // reducerPath: "auth",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/user",
  }),


  endpoints: (builder) => ({})
});






