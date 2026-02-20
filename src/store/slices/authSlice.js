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

export const getRolesThunk = createAsyncThunk(
  "/roles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/roles");
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to load roles");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    roles: [], 
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
      state.user = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("buildingId");
        localStorage.removeItem("role_id");

        document.cookie = "token=; path=/; max-age=0";
        document.cookie = "role=; path=/; max-age=0";
        document.cookie = "buildingId=; path=/; max-age=0";
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
      })
      .addCase(getProfileThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRolesThunk.fulfilled, (state, action) => {
        state.roles = action.payload;
      });
  },
});

export const { logout, hydrate } = authSlice.actions;
export default authSlice.reducer;
