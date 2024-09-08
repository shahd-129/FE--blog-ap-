import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "post",
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/post",
  }),

  
  endpoints: (builder) => ({})
});


