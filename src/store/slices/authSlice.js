import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/api";

export const loginThunk = createAsyncThunk(
  "/login",
  async ({ username, password, role_id }, { rejectWithValue }) => {
    try {
      const res = await api.post("/login", { username, password, role_id });
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

export const getProfileThunk = createAsyncThunk(
  "/profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/profile");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load profile");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
  hydrate(state) {
    if (typeof window !== "undefined") {
      const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
      state.token = match ? match[2] : null;
      state.error = null;
    }
  },

  logout(state) {
    state.token = null;
    state.user = null;
    state.error = null;

    if (typeof window !== "undefined") {
      localStorage.removeItem("remembered_username");

      document.cookie = "token=; path=/; max-age=0";
      document.cookie = "role=; path=/; max-age=0";
      document.cookie = "buildingId=; path=/; max-age=0";
    }
  },

  clearError(state) {
    state.error = null;
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
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;

        localStorage.setItem("token", action.payload.data.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfileThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(getProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, hydrate, clearError } = authSlice.actions;
export default authSlice.reducer;
