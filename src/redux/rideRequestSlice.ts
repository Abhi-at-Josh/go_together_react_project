import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface RideRequest {
  id: number;
  passenger_name: string;
  rider_name: string;
  starting_coordinates: string;
  ending_coordinates: string;
  status: string;
  price: string;
}

interface RideRequestState {
  rides: RideRequest[]; // Change from `ride: RideRequest | null` to an array
  loading: boolean;
  error: string | null;
}

const initialState: RideRequestState = {
  rides: [], // Store as an array
  loading: false,
  error: null,
};

// Fetch ride requests (now expecting an array)
export const fetchRideRequests = createAsyncThunk<RideRequest[], number>(
  "rideRequest/fetchRideRequests",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/rides/${id}`);
      return response.data; // Expecting an array
     } 
    catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data || "Failed to fetch ride requests");
        }
        return rejectWithValue("Failed to fetch ride requests");
  }
}
)

export const acceptRideRequest =createAsyncThunk<RideRequest,  { id: number; status: string }>(
    "rideRequest/acceptRideRequest",
    async ({id,status},{ rejectWithValue }) => {
       try {
        const token = localStorage.getItem("token");
        const response = await axios.patch(`http://127.0.0.1:3000/rides/${id}`, { ride: { status: status } }, { headers: { Authorization: `Bearer ${token}` } });

        return response.data;
       }catch(error){
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data || "Failed to accept the ride request");
        }
        return rejectWithValue("Failed to accept ride request");
       }
    }
)



const rideRequestSlice = createSlice({
  name: "rideRequest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRideRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRideRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.rides = action.payload; // Store array of ride requests
      })
      .addCase(fetchRideRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
        .addCase(acceptRideRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptRideRequest.fulfilled, (state, action) => {
        state.loading = false;
        
        // Find and update the specific ride request
        state.rides = state.rides.map((ride) =>
          ride.id === action.payload.id ? { ...ride, status: action.payload.status } : ride
        );
      })
      .addCase(acceptRideRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default rideRequestSlice.reducer;
