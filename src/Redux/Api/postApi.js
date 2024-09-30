import { postApi } from "../Slices/postSlice";

export const PostApi = postApi.enhanceEndpoints({addTagTypes:["POST"]})
.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (params) => ({
        url: '/post/getAllPost',
        method: "GET",
        params,
        headers: {
          token: localStorage.getItem("token")
        }
      }),
      transformResponse: (response, meta, arg) => {
        console.log("response", response)
        return response?.data
      },
      providesTags: (result, error, arg) =>
        result
          ? [...result?.map(({ _id }) => ({ type: 'POST', id: _id })), "POST"]
          : ["POST"],
    }),
    createPost: builder.mutation({
      query: (data) => ({ 
        url: 'post/addPost', 
        method: "POST", 
        body: data ,
        headers: {
          token: localStorage.getItem("token")
        }
      }),
        invalidatesTags: ["POST"]
    }),

    updatePost: builder.mutation({
      query: ({ data, id }) => ({ 
        url: `post/update/${id}`, 
        method: "PUT", 
        body: data ,
        invalidatesTags: ["Post"],
        headers: {
          token: localStorage.getItem("token")
        }
      }),
      invalidatesTags: (result , error , {id}) => [{type:"POST" , id}]
    }),

    deletePost: builder.mutation({
      query: ( id ) => ({ 
        url: `post/delete/${id}`, 
        method: "DELETE" ,
        invalidatesTags: ["POST"],
        headers: {
          token: localStorage.getItem("token")
        }
      }),
      invalidatesTags:["POST"]
    }),
    addReact: builder.mutation({
      query: ( id ) => ({ 
        url: `post/like/${id}`, 
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
  useAddReactMutation,
  useGetPostsQuery
} = PostApi;
