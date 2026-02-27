"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavigationHeader from "@/components/common/NavigationHeader";
import ManageUnitView from "@/components/common/profile-management/ManageUnitView";
import { getUserUnitsApi } from "@/lib/api";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function ManageUnit() {
  const { unitId } = useParams();

  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
const assignments = useSelector((s) => s.units.assignments);

useEffect(() => {
  const loadUnit = async () => {
    if (!unitId) return;

    let data = assignments;

    if (!data.length) {
      try {
        const res = await getUserUnitsApi();
        data = res.data?.data || [];
        dispatch(setUnits(data));
      } catch (err) {
        toast.error("Failed to load units");
        setLoading(false);
        return;
      }
    }

    const found = data.find(
      (a) => Number(a.Unit.id) === Number(unitId)
    );

    if (!found) {
      toast.error("Unit not found");
      setLoading(false);
      return;
    }

    setUnit(found);
    setLoading(false);
  };

  loadUnit();
}, [unitId, assignments]);

  if (loading) return <Loader text="Loading unit..." size="md" />;

  if (!unit) return null;

  return (
    <main className="min-h-screen w-full bg-[#F5F7FA]">
      <NavigationHeader
        showBack
        backHref="/owner/profile?tab=properties"
        title={`Manage Unit ${unit.Unit.unit_number}`}
        subtitle={unit.Unit.building?.name}
      />

      <ManageUnitView
        unitId={unit.Unit.id}
        title="Family Members"
        members={unit.Unit.family_members.map((m) => ({
          id: m.id,
          name: m.full_name,
          role: m.relationship,
        }))}
      />
    </main>
  );
}
