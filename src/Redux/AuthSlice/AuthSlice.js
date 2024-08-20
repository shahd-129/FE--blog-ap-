import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/user",
  }),
  // prepareHeaders: (headers) => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     headers.set('authorization', `Bearer ${token}`);
  //   }
  //   return headers;
  // },
  
  endpoints: (builder) => ({})
});



// prepareHeaders: (headers, { getState }) => {
//   const token = getState().auth.token;
//   if (token) {
//     headers.set('authorization', `Bearer ${token}`);
//   }
//   return headers;
// },
