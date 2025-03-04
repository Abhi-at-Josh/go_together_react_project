import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

export interface Ride {
  ride_id: number;
  user_name: string;
  user_age: number;
  starting_coordinates: string;
  ending_coordinates: string;
  ride_time: string;
  vehicle_type: string;
  price: number | null;
}

// Define Types
interface RideState {
  pickup: string;
  dropoff: string;
  vehicleType: string;
  price: string;
  userType: boolean; // true for Create Ride, false for Book Ride
  rideTime: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  rides: Ride[];
}

const initialState: RideState = {
  pickup: "",
  dropoff: "",
  vehicleType: "",
  price: "",
  userType: true,
  rideTime: "",
  status: "idle",
  error: null,
  rides :[]
};


// Async Thunks
export const bookRide = createAsyncThunk(
  "ride/bookRide",
  async (data: { starting_coordinates: string; ending_coordinates: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3000/ride_requests/booking", data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in the request header
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Book Ride Response:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to book ride");
      }
      return rejectWithValue("Failed to book ride");
    
    }
  }
);

export const requestRide = createAsyncThunk(
   "ride/requestRide",
   async (data:{ ride_request_id: number;}, {rejectWithValue}) => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("http://localhost:3000/rides",data,
      {
       headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type" : "application/json",
       },
      }
    );
    console.log("Request send to rider:", response.data);
    return response.data;
    } catch ( error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to book ride");
      }
      return rejectWithValue("Failed to book ride");
    }
   } 
);

export const createRide = createAsyncThunk(
  "ride/createRide",
  async ( data: {  starting_coordinates: string; ending_coordinates: string; ride_time: string; price: string; vehicle_type: string },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("http://localhost:3000/ride_requests", {ride_request:data},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in the request header
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Create Ride Response:", response.data);
      window.alert("Ride Created successfully");
      return response.data;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to create ride");
      }
      return rejectWithValue("Failed to create ride");
    
    }
  }
);

// Slice
const rideSlice = createSlice({
  name: "ride",
  initialState,
  reducers: {
    setPickup: (state, action: PayloadAction<string>) => {
      state.pickup = action.payload;
    },
    setDropoff: (state, action: PayloadAction<string>) => {
      state.dropoff = action.payload;
    },
    setVehicleType: (state, action: PayloadAction<string>) => {
      state.vehicleType = action.payload;
    },
    setPrice: (state, action: PayloadAction<string>) => {
      state.price = action.payload;
    },
    setRideTime: (state, action: PayloadAction<string>) => {
      state.rideTime = action.payload;
    },
    setUserType: (state, action: PayloadAction<boolean>) => {
      state.userType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookRide.pending, (state) => {
        state.status = "loading";
      })
      .addCase(bookRide.fulfilled, (state,action) => {
        state.status = "succeeded";
        state.rides=action.payload
      })
      .addCase(bookRide.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(createRide.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRide.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createRide.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(requestRide.pending, (state) => {
        state.status = "loading";
      })
      .addCase(requestRide.fulfilled, (state) => {
        state.status =  "succeeded";
      })
      .addCase(requestRide.rejected, (state , action)=>{
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setPickup, setDropoff, setVehicleType, setPrice, setRideTime, setUserType } = rideSlice.actions;
export default rideSlice.reducer;
export const requestRideSelector = (state: RootState) => state.ride;


