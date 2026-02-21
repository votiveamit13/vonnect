import LatestUpdateCard from "@/components/common/LatestUpdateCard";
import ServicesGrid from "@/components/common/ServicesGrid";
import FooterNav from "@/components/Footer";
import Header from "@/components/Header";
import {
  FiUser,
  FiUsers,
  FiPhone,
  FiMessageCircle,
  FiDollarSign,
  FiCalendar,
  FiUsers as FiGroup,
  FiHome,
  FiBookOpen,
  FiMessageSquare,
  FiTruck,
} from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuLaptopMinimalCheck } from "react-icons/lu";

export default function OwnerPage() {
  const user = {
    name: "Owner",
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
            { label: "Invite Visitors", icon: <FiGroup size={24} />, href: "/owner/visitors" },
            { label: "Service Providers", icon: <FiTruck size={24} />, href: "/owner/services" },
            { label: "Reservations", icon: <FiCalendar size={24} />, href: "/owner/reservations" },
            { label: "Tenant Management", icon: <FiHome size={24} />, href: "/owner/tenants" },
            { label: "Pets", icon: <MdPets size={24} />, href: "/owner/pets" },
            { label: "Communications", icon: <FiMessageSquare size={24} />, href: "/owner/communications" },
            { label: "Events", icon: <FaRegCalendarAlt size={24} />, href: "/owner/events" },
            { label: "Services Guide", icon: <FiBookOpen size={24} />, href: "/owner/guide" },
            { label: "Rules & Regulations", icon: <IoDocumentTextOutline size={24} />, href: "/owner/rules" },
            { label: "Voting System", icon: <LuLaptopMinimalCheck size={24} />, href: "/owner/voting" },
          ]}
        />
      </main>

      <FooterNav
        items={[
          { label: "Profile", href: "/owner/profile", icon: FiUser },
          { label: "Emergency", href: "/owner/emergency", icon: FiPhone },
          { label: "Messages", href: "/owner/messages", icon: FiMessageCircle },
          { label: "Contacts", href: "/owner/contacts", icon: FiUsers },
        ]}
      />
    </>
  );
}
