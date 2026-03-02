"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavigationHeader from "@/components/common/NavigationHeader";
import MemberPermissions from "@/components/common/profile-management/MemberPermission";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";

import { getUserUnitsApi, getMemberPermissions, updateMemberPermission } from "@/lib/api";

export default function MemberPermissionsPage() {
  const { unitid, memberId } = useParams();

  const [member, setMember] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!unitid || !memberId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // 🔥 1. Fetch unit data
        const res = await getUserUnitsApi();
        const assignments = res.data?.data || [];

        const foundAssignment = assignments.find(
          (a) => Number(a.Unit.id) === Number(unitid)
        );

        if (!foundAssignment) {
          toast.error("Unit not found");
          return;
        }

        const foundMember = foundAssignment.Unit.family_members.find(
          (m) => Number(m.id) === Number(memberId)
        );

        if (!foundMember || !foundMember.user) {
          toast.error("Member not found");
          return;
        }

        setMember(foundMember);

        // 🔥 2. Extract correct role_id and user_id
        const roleId = foundMember.user.role.id;
        const userId = foundMember.user.id;

        // 🔥 3. Fetch permissions
        const permRes = await getMemberPermissions(roleId, userId);
        const apiPermissions = permRes.data?.data || [];

        const normalized = apiPermissions.map((p) => ({
          id: p.id,
          title: p.name,
          description: `Permission for ${p.name}`,
          enabled: p.assigned,
        }));

        setPermissions(normalized);

      } catch (err) {
        console.error(err);
        toast.error("Failed to load permissions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [unitid, memberId]);

  const handleToggle = async (permission) => {
    if (!member?.user) return;

    try {
      const roleId = member.user.role.id;
      const userId = member.user.id;

      await updateMemberPermission({
        role_id: roleId,
        permission_id: permission.id,
        user_id: userId,
        enabled: !permission.enabled,
      });

      // Optimistic UI update
      setPermissions((prev) =>
        prev.map((p) =>
          p.id === permission.id
            ? { ...p, enabled: !p.enabled }
            : p
        )
      );

      toast.success("Permission updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update permission");
    }
  };

  if (loading) return <Loader text="Loading permissions..." size="md" />;

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
        permissions={permissions}
        onToggle={handleToggle}
      />
    </main>
  );
}
