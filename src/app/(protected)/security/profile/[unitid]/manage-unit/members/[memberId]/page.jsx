import NavigationHeader from "@/components/common/NavigationHeader";
import MemberPermissions from "@/components/common/profile-management/MemberPermission";
import {
  FiDollarSign,
  FiUserPlus,
  FiCalendar,
  FiTool,
} from "react-icons/fi";

export default async function MemberPermissionsPage({ params }) {
  const { unitId, memberId } = params;

  return (
    <main className="min-h-screen w-full bg-[#F5F7FA]">
      <NavigationHeader
        showBack
        backHref={`/owner/profile/${unitId}/manage-unit`}
        title="Carlos Rodriguez"
        subtitle="Manage permissions"
      />

      <MemberPermissions
        name="Carlos Rodriguez"
        relationship="Main Owner"
        permissions={[
          {
            title: "Maintenance Fees",
            description: "Allow to view and pay fees",
            icon: <FiDollarSign size={20} />,
            enabled: true,
          },
          {
            title: "Create Invitations",
            description: "Allow to invite guests",
            icon: <FiUserPlus size={20} />,
            enabled: true,
          },
          {
            title: "Make Paid Reservations",
            description: "Allow to book amenities",
            icon: <FiCalendar size={20} />,
            enabled: true,
          },
          {
            title: "Service Providers",
            description: "Allow to request services",
            icon: <FiTool size={20} />,
            enabled: true,
          },
        ]}
      />
    </main>
  );
}
