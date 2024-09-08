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
      query: ({ data, id }) => ({ 
        url: `/update/${id}`, 
        method: "PUT", 
        body: data ,
        invalidatesTags: ["Post"],
        headers: {
          token: localStorage.getItem("token")
        }
      })
    }),

    deletePost: builder.mutation({
      query: ( id ) => ({ 
        url: `/delete/${id}`, 
        method: "DELETE" ,
        invalidatesTags: ["Post"],
        headers: {
          token: localStorage.getItem("token")
        }
      })
    }),
    addReact: builder.mutation({
      query: ( id ) => ({ 
        url: `/like/${id}`, 
        method: "PUT" ,
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
  useUpdatePostMutation,
  useAddReactMutation
} = PostApi;
