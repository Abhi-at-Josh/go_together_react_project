import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AdminState {
  username: string;
  email: string;
  token: string | null;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialState: AdminState = {
  username: "",
  email: "",
  token: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

// Define interface for Auth Payload (Signup/Login)
interface AuthPayload {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  confirm_password?: string;
}

export const authAdmin = createAsyncThunk(
  "admin/authAdmin",
  async ({ adminData, isSignup }: { adminData: AuthPayload; isSignup: boolean }, thunkAPI) => {
    try {
      const url = isSignup
        ? "http://localhost:3000/admins/signup"
        : "http://localhost:3000/admins/login";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.error || "Authentication failed");
      }

      // Store token in local storage
      localStorage.setItem("token", data.token);

      return {
        username: data.username || adminData.first_name || "",
        email: adminData.email,
        token: data.token,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Create admin Slice
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      localStorage.removeItem("token");
      state.username = "";
      state.email = "";
      state.token = null;
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
    clearState: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authAdmin.pending, (state) => {
        state.isFetching = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(
        authAdmin.fulfilled,
        (state, action: PayloadAction<{ username: string; email: string; token: string }>) => {
          state.isFetching = false;
          state.isSuccess = true;
          state.username = action.payload.username;
          state.email = action.payload.email;
          state.token = action.payload.token;
        }
      )
      .addCase(authAdmin.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { logoutAdmin, clearState } = adminSlice.actions;
export const adminSelector = (state: RootState) => state.admin || initialState; // ✅ Fixed adminSelector
export default adminSlice.reducer;
