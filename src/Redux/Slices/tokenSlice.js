

import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

 const initialState = {
   token: null,
   user: null,
   post: [],
   mode: "light",
   comment:[]
 };

 const tokenSlice = createSlice({
   name: 'token',
   initialState,
   reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
     setToken: (state, action) => {
       state.token = action.payload;
       localStorage.setItem('token', action.payload);
       const decodedToken = jwtDecode(action.payload);
       state.user = decodedToken;
     },
     clearToken: (state) => {
       state.token = null;
       localStorage.removeItem('token');
     },
     setUserId: (state, action) => {
        state.user.userId = action.payload;
    },
    setPostId: (state , action) =>{
      state.post = state.post.filter(p => p.id !== action.payload)
      // state.post = action.payload
    },
    setCommentId: (state , action) =>{
      state.comment = action.payload
    }, 
     incrementCommentCount: (state, action) => {
      state.post = state.post.map(post =>
        post._id === action.payload.postId ? { ...post, commentCount: post.commentCount + 1 } : post
      );
    },
    decrementCommentCount: (state, action) => {
      state.post = state.post.map(post =>
        post._id === action.payload.postId ? { ...post, commentCount: post.commentCount - 1 } : post
      );
    },
   },
 });

 export const { setToken,setMode ,clearToken , setUserId , setPostId , setCommentId , incrementCommentCount , decrementCommentCount } = tokenSlice.actions;

 export default tokenSlice.reducer;
