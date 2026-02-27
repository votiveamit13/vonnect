"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import NavigationHeader from "@/components/common/NavigationHeader";
import { FiDollarSign, FiUserPlus, FiCalendar, FiTool } from "react-icons/fi";
import { LuCar } from "react-icons/lu";
import { FiBox } from "react-icons/fi";
import TenantPermissionsView from "@/components/common/profile-management/TenantPermissionView";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";

export default function ManageTenantPermissionsPage() {
  const { unitId } = useParams();
  const searchParams = useSearchParams();
  const complementaryId = searchParams.get("complementary");

  const assignments = useSelector((s) => s.units.assignments);

  const [unitData, setUnitData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!unitId) return;

if (!assignments.length) {
  setLoading(false);   // 🔥 important
  return;
}

    const found = assignments.find(
      (a) => Number(a.Unit.id) === Number(unitId)
    );

    if (!found) {
      setLoading(false);
      return;
    }

    setUnitData(found.Unit);
    setLoading(false);
  }, [unitId, assignments]);

  if (loading) return <Loader text="Loading tenant..." size="md" />;
  if (!unitData) return null;

  const isComplementary = Boolean(complementaryId);

  const selectedUnit = isComplementary
    ? unitData.complementary_units.find(
        (c) => Number(c.id) === Number(complementaryId)
      )
    : unitData;
  return (
    <main className="min-h-screen w-full bg-[#F5F7FA]">
      <NavigationHeader
        showBack
        backHref={`/owner/profile/${unitId}/manage-unit`}
        title="Manage Tenant Permissions"
        subtitle="Configure tenant access and permissions"
      />

      <TenantPermissionsView
        units={[
          {
            title: isComplementary
              ? `${selectedUnit?.title} - ${selectedUnit?.unit_number}`
              : `Unit - ${unitData.unit_number}`,

            icon: isComplementary ? (
              selectedUnit?.title?.toLowerCase().includes("parking") ? (
                <LuCar size={16} />
              ) : (
                <FiBox size={16} />
              )
            ) : null,

            open: true,
            tenantName: unitData.occupaycy_status ? "Tenant Assigned" : "—",

            permissions: [
              {
                title: "Maintenance Fees",
                description: "Allow tenant to view and pay fees",
                enabled: true,
              },
              {
                title: "Create Invitations",
                description: "Allow tenant to invite guests",
                enabled: true,
              },
              {
                title: "Make Paid Reservations",
                description: "Allow tenant to book amenities",
                enabled: true,
              },
              {
                title: "Service Providers",
                description: "Allow tenant to request services",
                enabled: true,
              },
            ],
          },
        ]}
      />
    </main>
  );
}
