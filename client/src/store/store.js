import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import bookingReducer from "./slices/bookingSlice.js";
import { eventApi } from "./api/eventApi.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    [eventApi.reducerPath]: eventApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventApi.middleware),
});
