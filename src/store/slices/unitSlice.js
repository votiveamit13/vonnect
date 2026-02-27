import { createSlice } from "@reduxjs/toolkit";

const unitSlice = createSlice({
  name: "units",
  initialState: {
    assignments: [],
  },
  reducers: {
    setUnits: (state, action) => {
      state.assignments = action.payload;
    },
    clearUnits: (state) => {
      state.assignments = [];
    },
  },
});

export const { setUnits, clearUnits } = unitSlice.actions;
export default unitSlice.reducer;