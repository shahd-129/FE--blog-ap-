import { postApi } from "../Slices/postSlice";

export const CommentApi = postApi
  .enhanceEndpoints({ addTagTypes: ["POST"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createComment: builder.mutation({
        query: (data) => ({
          url: "comment/createComment",
          method: "POST",
          body: data,
          headers: {
            token: localStorage.getItem("token"),
          },
        }),
        invalidatesTags: (result , error , arg) =>
          [{type: "POST" , id: arg.postId} , "POST"]
      }),

      updateComment: builder.mutation({
        query: ({ data, id }) => ({
          url: `comment/updateComment/${id}`,
          method: "PUT",
          body: data,
          headers: {
            token: localStorage.getItem("token"),
          },
        }),
        invalidatesTags: (result, error, arg) => [{ type: "POST", id: arg.postId }]
        
        ,
      }),

      deleteComment: builder.mutation({
        query: (id) => ({
          url: `comment/deleteComment/${id}`,
          method: "DELETE",
          headers: {
            token: localStorage.getItem("token"),
          },
        }),
        invalidatesTags: ["POST"],
      }),
    }),
  });

export const {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = CommentApi;
