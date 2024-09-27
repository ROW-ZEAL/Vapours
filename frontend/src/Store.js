// Store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAuthApi } from "../src/services/userAuthApi";
import userReducer from "../src/features/userSlice";
import authReducer from "../src/features/authSlice";

export const Store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    user: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
});

setupListeners(Store.dispatch);

export default Store;
