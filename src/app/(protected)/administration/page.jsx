import LatestUpdateCard from "@/components/common/LatestUpdateCard";
import ServicesGrid from "@/components/common/ServicesGrid";
import FooterNav from "@/components/Footer";
import Header from "@/components/Header";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers, FiPhone, FiMessageCircle, FiMessageSquare, FiDollarSign, FiHome, FiCheckSquare, FiTruck, FiCalendar, FiUserPlus } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuLaptopMinimalCheck } from "react-icons/lu";
import { MdPets } from "react-icons/md";

export default function AdministratorPage() {
  const user = {
    name: "Administrator",
    unit: "Unit 405 - Ocean View Residences",
    avatar: null,
  };
  return (
    <>
      <Header
        name={user.name}
        unit={user.unit}
        avatarUrl={user.avatar}
        showWelcomeCard
      />

      <main className="pt-[180px] sm:pt-[200px] pb-[100px] p-6">
        <LatestUpdateCard
          icon={<FiMessageSquare size={20} />}
          heading="Pool Maintenance Scheduled"
          description="The community pool will be closed for maintenance on November 25th..."
          time="2 hours ago"
          href="/owner/announcements/1"
        />

        <ServicesGrid
          items={[
            { label: "Maintenance Fees", icon: <FiDollarSign size={24} />, href: "/owner/fees" },
            { label: "Unit Management", icon: <FiHome size={24} />, href: "/owner/units" },
            { label: "Tasks", icon: <FiCheckSquare size={24} />, href: "/owner/tasks" },

            { label: "Employees", icon: <FiUsers size={24} />, href: "/owner/employees" },
            { label: "Services", icon: <FiTruck size={24} />, href: "/owner/services" },
            { label: "Communications", icon: <FiMessageSquare size={24} />, href: "/owner/communications" },

            { label: "Events", icon: <FaRegCalendarAlt size={24} />, href: "/owner/events" },
            { label: "Voting System", icon: <LuLaptopMinimalCheck size={24} />, href: "/owner/voting" },
            { label: "Rules & Regulations", icon: <IoDocumentTextOutline size={24} />, href: "/owner/rules" },

            { label: "Reservations", icon: <FiCalendar size={24} />, href: "/owner/reservations" },
            { label: "Visitors", icon: <FiUserPlus size={24} />, href: "/owner/visitors" },
            { label: "Tenant Management", icon: <FiHome size={24} />, href: "/owner/tenants" },

            { label: "Pets", icon: <MdPets size={24} />, href: "/owner/pets" },
          ]}
        />
      </main>

      <FooterNav
        items={[
          { label: "Contacts", href: "/owner/contacts", icon: FiUsers },
          { label: "Emergency", href: "/owner/emergency", icon: FiPhone },
          { label: "Messages", href: "/owner/messages", icon: FiMessageCircle },
          { label: "Manage Users", href: "/administration/manage-users", icon: FiUsers },
        ]}
      />
    </>
  );
}
