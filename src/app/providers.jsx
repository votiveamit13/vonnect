"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/store";
import { useEffect } from "react";
import { hydrate, getProfileThunk } from "@/store/slices/authSlice";
import { fetchLookups } from "@/store/slices/lookupSlice";

function Bootstrap({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrate());
    dispatch(fetchLookups());

    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getProfileThunk());
    }
  }, [dispatch]);

  return children;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <Bootstrap>{children}</Bootstrap>
    </Provider>
  );
}