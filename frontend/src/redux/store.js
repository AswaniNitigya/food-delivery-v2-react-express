import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import authReducer from "./authSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        auth:authReducer
    },
})