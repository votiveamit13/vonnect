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
  const params = useParams();
  const unitid = params.unitid; // Use lowercase 'unitid' to match folder name
  
  console.log("ManageUnit - unitid from params:", unitid);

  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    console.log("ManageUnit - useEffect running with unitid:", unitid);
    
    if (!unitid) {
      console.log("ManageUnit - No unitid provided");
      return;
    }

    const fetchUnit = async () => {
      console.log("ManageUnit - Fetching unit with ID:", unitid);
      setLoading(true);

      try {
        const res = await getUserUnitsApi();
        console.log("ManageUnit - API response:", res.data);
        
        const assignments = res.data?.data || [];
        console.log("ManageUnit - Assignments:", assignments);

        // Find the assignment that contains our unit
        const foundAssignment = assignments.find(
          (a) => {
            console.log("Comparing:", Number(a.Unit.id), "vs", Number(unitid));
            return Number(a.Unit.id) === Number(unitid);
          }
        );

        console.log("ManageUnit - Found assignment:", foundAssignment);

        if (!foundAssignment) {
          console.log("ManageUnit - Unit not found in assignments");
          toast.error("Unit not found");
          setUnit(null);
          setFamilyMembers([]);
          return;
        }

        // Set the unit data
        console.log("ManageUnit - Setting unit data:", foundAssignment.Unit);
        setUnit(foundAssignment.Unit);
        
        // Set family members from the Unit object
        console.log("ManageUnit - Family members:", foundAssignment.Unit.family_members);
        setFamilyMembers(foundAssignment.Unit.family_members || []);

      } catch (err) {
        console.error("ManageUnit - Error:", err);
        toast.error("Failed to load unit");
        setUnit(null);
        setFamilyMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUnit();
  }, [unitid]);

  if (loading) return <Loader text="Loading unit..." size="md" />;

  if (!unit) {
    return (
      <div className="p-6 text-center text-gray-500">
        Unit not available.
      </div>
    );
  }

  console.log("ManageUnit - Rendering with members:", familyMembers);

  console.log("ManageUnit - Rendering with members:", familyMembers); // Add this log

  return (
    <main className="min-h-screen w-full bg-[#F5F7FA]">
      <NavigationHeader
        showBack
        backHref="/owner/profile?tab=properties"
        title={`Manage Unit ${unit.unit_number}`}
        subtitle={unit.building?.name}
      />

      <ManageUnitView
        unitId={unit.id}
        title="Family Members"
        members={familyMembers.map((m) => ({
          id: m.id,
          name: m.full_name,
          role: m.relationship,
        }))}
      />
    </main>
  );
}
