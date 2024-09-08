import { commentApi } from "../Slices/commentSlice";


export const CommentApi = commentApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (data) => ({ 
        url: '/createComment', 
        method: "POST", 
        body: data ,
        headers: {
          token: localStorage.getItem("token")
        }
      })
    }),

    updateComment: builder.mutation({
      query: ({ data, id }) => ({ 
        url: `/updateComment/${id}`, 
        method: "PUT", 
        body: data ,
        headers: {
          token: localStorage.getItem("token")
        }
      })
    }),

    deleteComment: builder.mutation({
      query: ( id ) => ({ 
        url: `/deleteComment/${id}`, 
        method: "DELETE" ,
        headers: {
          token: localStorage.getItem("token")
        }
      })
    }),
  }),
});

export const {
 useCreateCommentMutation,
 useDeleteCommentMutation,
 useUpdateCommentMutation
} = CommentApi;
