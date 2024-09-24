import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../Slices/AuthSlice";
import tokenReducer from "../../Redux/Slices/tokenSlice";
import { postApi } from "../../Redux/Slices/postSlice";
// import userReducer from '../../Redux/Slices/userSlice'


const store = configureStore({
    reducer: {
       [authApi.reducerPath]:authApi.reducer,
       [postApi.reducerPath]: postApi.reducer,
       token: tokenReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware).concat(postApi.middleware),
});

export default store