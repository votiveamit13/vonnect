"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavigationHeader from "@/components/common/NavigationHeader";
import MemberPermissions from "@/components/common/profile-management/MemberPermission";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";

export default function MemberPermissionsPage() {
  const { unitId, memberId } = useParams();
  const assignments = useSelector((s) => s.units.assignments);

  const [member, setMember] = useState(null);
  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!unitId) return;

if (!assignments.length) {
  setLoading(false);   // 🔥 important
  return;
}

    const foundUnit = assignments.find(
      (a) => Number(a.Unit.id) === Number(unitId)
    );

    if (!foundUnit) {
      setLoading(false);
      return;
    }

    const foundMember = foundUnit.Unit.family_members.find(
      (m) => Number(m.id) === Number(memberId)
    );

    setUnit(foundUnit.Unit);
    setMember(foundMember);
    setLoading(false);
  }, [unitId, memberId, assignments]);

  if (loading) return <Loader text="Loading member..." size="md" />;
  if (!member) return null;

  return (
    <main className="min-h-screen w-full bg-[#F5F7FA]">
      <NavigationHeader
        showBack
        backHref={`/owner/profile/${unitId}/manage-unit`}
        title={member.full_name}
        subtitle="Manage permissions"
      />

      <MemberPermissions
        name={member.full_name}
        relationship={member.relationship}
        permissions={[]}
      />
    </main>
  );
}
