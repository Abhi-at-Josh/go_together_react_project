import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userReducer from "./userSlice"; 
import rideReducer from "./rideSlice";
import entitiesReducer from "./adminslice/entities"; // Correct import
import adminReducer from "./adminslice/adminSlice";
import rideRequestReducer from "./rideRequestSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    ride: rideReducer,
    entities: entitiesReducer,
    admin: adminReducer,
    rideRequest: rideRequestReducer,
  },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Corrected custom hook
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();
