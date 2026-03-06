import { getAssociatedBuildings } from "@/lib/api";
import { useEffect, useState } from "react";

export default function useBuildings() {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      const res = await getAssociatedBuildings();
      setBuildings(res.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch buildings", error);
    } finally {
      setLoading(false);
    }
  };

  return { buildings, loading };
}