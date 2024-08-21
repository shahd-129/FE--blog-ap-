
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    postId:[]
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setPostId: (state , action) =>{
      state.postId = action.payload
    }
  },
});

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;
