import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import lookupReducer from "./slices/lookupSlice";
import unitsReducer from "./slices/unitSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lookup: lookupReducer,
    units: unitsReducer,
  },
});
