import LatestUpdateCard from "@/components/common/LatestUpdateCard";
import ServicesGrid from "@/components/common/ServicesGrid";
import FooterNav from "@/components/Footer";
import Header from "@/components/Header";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers, FiPhone, FiMessageCircle, FiMessageSquare, FiDollarSign, FiHome, FiCheckSquare, FiTruck, FiCalendar, FiUserPlus } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuBriefcaseBusiness, LuBuilding2, LuClipboardList, LuLaptopMinimalCheck } from "react-icons/lu";
import { MdPets } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function AdministratorPage() {
  return (
    <>
      <Header
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
            { label: "Maintenance Fees", icon: <FiDollarSign size={24} />, href: "/" },
            { label: "Unit Management", icon: <LuBuilding2 size={24} />, href: "/administration/unit-management" },
            { label: "Tasks", icon: <LuClipboardList size={24} />, href: "/" },

            { label: "Employees", icon: <LuBriefcaseBusiness size={24} />, href: "/" },
            { label: "Services", icon: <FaArrowTrendUp size={24} />, href: "/" },
            { label: "Communications", icon: <FiMessageSquare size={24} />, href: "/" },

            { label: "Events", icon: <FaRegCalendarAlt size={24} />, href: "/" },
            { label: "Voting System", icon: <LuLaptopMinimalCheck size={24} />, href: "/" },
            { label: "Rules & Regulations", icon: <IoDocumentTextOutline size={24} />, href: "/" },

            { label: "Reservations", icon: <FiCalendar size={24} />, href: "/" },
            { label: "Visitors", icon: <FiUserPlus size={24} />, href: "/" },
            { label: "Tenant Management", icon: <FiHome size={24} />, href: "/" },

            { label: "Pets", icon: <MdPets size={24} />, href: "/" },
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
