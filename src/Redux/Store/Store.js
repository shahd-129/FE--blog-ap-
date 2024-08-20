import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../AuthSlice/AuthSlice";
import tokenReducer from "../../Redux/tokenSlice/tokenSlice";



const store = configureStore({
    reducer: {
       [authApi.reducerPath]:authApi.reducer,
       token: tokenReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export default store