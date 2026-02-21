import NavigationHeader from "@/components/common/NavigationHeader";
import { FiDollarSign, FiUserPlus, FiCalendar, FiTool } from "react-icons/fi";
import { LuCar } from "react-icons/lu";
import { FiBox } from "react-icons/fi";
import TenantPermissionsView from "@/components/common/profile-management/TenantPermissionView";

export default function ManageTenantPermissionsPage() {
  return (
    <main className="min-h-screen w-full bg-[#F5F7FA]">
      <NavigationHeader
        showBack
        backHref="/owner/profile/405/manage-unit"
        title="Manage Tenant Permissions"
        subtitle="Configure tenant access and permissions"
      />

      <TenantPermissionsView
        units={[
          {
            title: "Parking Space - P-A12",
            icon: <LuCar size={16} />,
            open: true,
            tenantName: "Ana Fernandez",
            permissions: [
              {
                title: "Maintenance Fees",
                description: "Allow tenant to view and pay fees",
                icon: <FiDollarSign size={18} />,
                enabled: true,
              },
              {
                title: "Create Invitations",
                description: "Allow tenant to invite guests",
                icon: <FiUserPlus size={18} />,
                enabled: true,
              },
              {
                title: "Make Paid Reservations",
                description: "Allow tenant to book amenities",
                icon: <FiCalendar size={18} />,
                enabled: true,
              },
              {
                title: "Service Providers",
                description: "Allow tenant to request services",
                icon: <FiTool size={18} />,
                enabled: true,
              },
            ],
          },
          {
            title: "Storage Unit - S-105",
            icon: <FiBox size={16} />,
            open: false,
            tenantName: "—",
            permissions: [],
          },
        ]}
      />
    </main>
  );
}
