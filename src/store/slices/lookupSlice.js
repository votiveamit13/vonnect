import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/api";

export const fetchLookups = createAsyncThunk("lookup/fetch", async () => {
  const [rolesRes, buildingsRes] = await Promise.all([
    api.get("/roles"),
    api.get("/building-list"),
  ]);

  return {
    roles: rolesRes.data.data || rolesRes.data,
    buildings: buildingsRes.data.data || buildingsRes.data,
  };
});

const lookupSlice = createSlice({
  name: "lookup",
  initialState: {
    roles: [],
    buildings: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLookups.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLookups.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload.roles;
        state.buildings = action.payload.buildings;
      })
      .addCase(fetchLookups.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default lookupSlice.reducer;