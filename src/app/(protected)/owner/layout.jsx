"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserUnitsApi } from "@/lib/api";
import { setUnits } from "@/store/slices/unitSlice";
import toast from "react-hot-toast";

export default function OwnerLayout({ children }) {
  const dispatch = useDispatch();
  const assignments = useSelector((s) => s.units.assignments);

  useEffect(() => {
    const fetchUnits = async () => {
      // ✅ prevent refetch if already loaded
      if (assignments.length) return;

      try {
        const res = await getUserUnitsApi();
        const data = res.data?.data || [];
        dispatch(setUnits(data));
      } catch (err) {
        toast.error("Failed to load units");
      }
    };

    fetchUnits();
  }, []);

  return children;
}