import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/api";

export const loginThunk = createAsyncThunk(
  "/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/login", { username, password });
      return res.data; // { token }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const signupThunk = createAsyncThunk(
  "/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/signup", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    hydrate(state) {
      if (typeof window !== "undefined") {
        state.token = localStorage.getItem("token");
      }
    },
    logout(state) {
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("buildingId");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, hydrate } = authSlice.actions;
export default authSlice.reducer;
