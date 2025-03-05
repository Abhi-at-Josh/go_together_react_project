import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
// Define User State Interface
interface UserState {
  username: string;
  email: string;
  token: string | null;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

// Initial state
const initialState: UserState = {
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
  phone_no?: string;
  password: string;
  confirm_password?: string;
  gender?: string;
  age?: string;
  id?:number;
}

// Async Thunk for Signup & Login
export const authUser = createAsyncThunk(
  "user/authUser",
  async ({ userData, isSignup }: { userData: AuthPayload; isSignup: boolean }, thunkAPI) => {
    try {
      const url = isSignup ? "http://localhost:3000/users/signup" : "http://localhost:3000/users/login";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (data.error && Array.isArray(data.error)) {
        const output = data.error.join("\n"); // Join errors with a newline
        window.alert(output);
      } else {
        // window.alert("An unknown error occurred.");
      }
      console.log("Response Data:", data);
      

      if (response.ok) {
        localStorage.setItem("token", data.token);
        const userCopy = { ...data.user };
        localStorage.setItem("user_id",userCopy.id);
        return { username: data.username || userData.first_name, email: userData.email, token: data.token };
      } else {
        window.alert("invalid email or password");
        return thunkAPI.rejectWithValue(data.message || "Authentication failed");
      }
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || "Something went wrong");
      }
      return thunkAPI.rejectWithValue("Something went wrong");
}

  }
);

// Create User Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
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
      .addCase(authUser.pending, (state) => {
        state.isFetching = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(
        authUser.fulfilled,
        (state, action: PayloadAction<{ username: string; email: string; token: string }>) => {
          state.isFetching = false;
          state.isSuccess = true;
          state.username = action.payload.username;
          state.email = action.payload.email;
          state.token = action.payload.token;
        }
      )
      .addCase(authUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
      });
  },
});

// Export actions and selectors
export const { logoutUser, clearState } = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
