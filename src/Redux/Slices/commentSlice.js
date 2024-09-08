import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
  reducerPath: "comment",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/comment",
  }),

  
  endpoints: (builder) => ({})
});


