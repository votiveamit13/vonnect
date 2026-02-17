"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const buildingId = localStorage.getItem("buildingId");

    if (!token) router.replace("/login");
    else if (!buildingId) router.replace("/building-selection");
  }, [router]);

  return children;
}
