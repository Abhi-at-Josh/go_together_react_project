import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import RideRequest from "../../types/admins/RideRequest";
import Ride from "../../types/admins/Ride";

const API_URL = "http://127.0.0.1:3000";

// Define entity types
type EntityType = "users" | "admins" | "ride_requests" | "rides";

// Define a generic type for non-ride entities
interface Entity {
  id: number;
  [key: string]: any;
}

// Define the slice state
interface EntitiesState {
  users: Entity[];
  admins: Entity[];
  riderequest: RideRequest[];
  rides: Ride[];
  loading: boolean;
  error: string | null;
}

const initialState: EntitiesState = {
  users: [],
  admins: [],
  riderequest: [],
  rides: [],
  loading: false,
  error: null,
};

// Generic fetch action
export const fetchEntities = createAsyncThunk<
  { entityType: EntityType; data: Entity[] | RideRequest[] | Ride[] },
  EntityType,
  { rejectValue: string }
>("entities/fetchEntities", async (entityType, { rejectWithValue }) => {
  try {
    const response = await axios.get<Entity[] | RideRequest[] | Ride[]>(`${API_URL}/${entityType}`);
    return { entityType, data: response.data };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || `Failed to fetch ${entityType}`);
  }
});

// Generic delete action
export const deleteEntity = createAsyncThunk<
  { entityType: EntityType; id: number },
  { entityType: EntityType; id: number },
  { rejectValue: string }
>("entities/deleteEntity", async ({ entityType, id }, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${entityType}/${id}`);
    return { entityType, id };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || `Failed to delete ${entityType}`);
  }
});

// Create the slice
const entitiesSlice = createSlice({
  name: "entities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEntities.fulfilled,
        (state, action: PayloadAction<{ entityType: EntityType; data: Entity[] | RideRequest[] | Ride[] }>) => {
          state.loading = false;

          if (action.payload.entityType === "ride_requests") {
            state.riderequest = action.payload.data as RideRequest[]; // Fix: Assign ride requests properly
          } else if (action.payload.entityType === "rides") {
            state.rides = action.payload.data as Ride[]; // Fix: Assign rides separately
          } else {
            state[action.payload.entityType] = action.payload.data as Entity[];
          }
        }
      )
      .addCase(fetchEntities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      })
      .addCase(deleteEntity.fulfilled, (state, action: PayloadAction<{ entityType: EntityType; id: number }>) => {
        if (action.payload.entityType === "ride_requests") {
          state.riderequest = state.riderequest.filter((ride) => ride.id !== action.payload.id); // Fix: Correct filtering
        } else if (action.payload.entityType === "rides") {
          state.rides = state.rides.filter((ride) => ride.id !== action.payload.id); // Fix: Ensure correct ride deletion
        } else {
          state[action.payload.entityType] = state[action.payload.entityType].filter(
            (item) => item.id !== action.payload.id
          );
        }
      })
      .addCase(deleteEntity.rejected, (state, action) => {
        state.error = action.payload || "Unknown error";
      });
  },
});

export default entitiesSlice.reducer;
