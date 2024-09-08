import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../Slices/AuthSlice";
import tokenReducer from "../../Redux/Slices/tokenSlice";
import { postApi } from "../../Redux/Slices/postSlice";
import { commentApi } from "../../Redux/Slices/commentSlice";
// import userReducer from '../../Redux/Slices/userSlice'


const store = configureStore({
    reducer: {
       [authApi.reducerPath]:authApi.reducer,
       [postApi.reducerPath]: postApi.reducer,
       [commentApi.reducerPath] : commentApi.reducer,
       token: tokenReducer,
    //    user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware).concat(postApi.middleware).concat(commentApi.middleware),
});

export default store