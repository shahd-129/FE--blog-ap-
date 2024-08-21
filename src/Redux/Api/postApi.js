import { postApi } from "../Slices/postSlice";

export const PostApi = postApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({ 
        url: '/addPost', 
        method: "POST", 
        body: data ,
        headers: {
          token: localStorage.getItem("token")
        }
      })
    }),

    updatePost: builder.mutation({
      query: ({ data, userId }) => ({ 
        url: `/update/${userId}`, 
        method: "PUT", 
        body: data ,
        headers: {
          token: localStorage.getItem("token")
        }
      })
    }),

    deletePost: builder.mutation({
      query: ({ id }) => ({ 
        url: `/delete/${id}`, 
        method: "DELETE" ,
        headers: {
          token: localStorage.getItem("token")
        }
      })
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation
} = PostApi;
