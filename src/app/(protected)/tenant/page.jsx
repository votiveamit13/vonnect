
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
import LatestUpdateCard from "@/components/common/LatestUpdateCard";
export default function TenantPage() {

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
          href="/tenant/announcements/1"
        />

        <ServicesGrid
          items={[
            { label: "Maintenance Fees", icon: <FiDollarSign size={24} />, href: "#" },
            { label: "Invite Visitors", icon: <FiGroup size={24} />, href: "#" },
            { label: "Service Providers", icon: <FiTruck size={24} />, href: "#" },
            { label: "Reservations", icon: <FiCalendar size={24} />, href: "#" },
            { label: "Pets", icon: <MdPets size={24} />, href: "#" },
            { label: "Communications", icon: <FiMessageSquare size={24} />, href: "#" },
            { label: "Events", icon: <FaRegCalendarAlt size={24} />, href: "#" },
            { label: "Services Guide", icon: <FiBookOpen size={24} />, href: "#" },
            { label: "Rules & Regulations", icon: <IoDocumentTextOutline size={24} />, href: "#" },
          ]}
        />
      </main>

      <FooterNav
        items={[
          { label: "Profile", href: "/tenant/profile", icon: FiUser },
          { label: "Emergency", href: "#", icon: FiPhone },
          { label: "Messages", href: "#", icon: FiMessageCircle },
          { label: "Contacts", href: "#", icon: FiUsers },
        ]}
      />
    </>
  );
}
