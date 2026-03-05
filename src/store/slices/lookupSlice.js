import Cookies from "js-cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/api";

export const fetchLookups = createAsyncThunk("lookup/fetch", async () => {
  const buildingId = Cookies.get("buildingId");
  const [rolesRes, buildingsRes, unitsRes] = await Promise.all([
    api.get("/roles"),
    api.get("/building-list"),
    api.get(`/units?building_id=${buildingId}`),
  ]);

  const units = (unitsRes.data.data || unitsRes.data).map((unit) => ({
      id: unit.id,
      unit_number: unit.unit_number,
    }));

  return {
    roles: rolesRes.data.data || rolesRes.data,
    buildings: buildingsRes.data.data || buildingsRes.data,
    units,
  };
});

const lookupSlice = createSlice({
  name: "lookup",
  initialState: {
    roles: [],
    buildings: [],
    units: [],
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
        state.units = action.payload.units;
      })
      .addCase(fetchLookups.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default lookupSlice.reducer;