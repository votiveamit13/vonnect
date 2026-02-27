import PendingTaskCard from "@/components/common/PendingTaskCard";
import ServicesGrid from "@/components/common/ServicesGrid";
import FooterNav from "@/components/Footer";
import Header from "@/components/Header";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiUser, FiUsers, FiPhone, FiMessageCircle, FiMessageSquare, FiCalendar, FiHome, FiUserCheck } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { MdPets } from "react-icons/md";

export default function SecurityPage() {
  const user = {
    name: "Security",
    unit: "Unit 405 - Ocean View Residences",
    avatar: null,
  };
  return (
    <>
      <Header showWelcomeCard />

      <main className="pt-[180px] sm:pt-[200px] pb-[100px] p-6">
        <PendingTaskCard
          icon={<LuClipboardList size={18} />}
          taskTitle="Front Gate Maintenance Check"
          description="Inspect front gate mechanism and test security cameras in lobby area..."
        />

        <ServicesGrid
          items={[
            { label: "Visitors", icon: <FiUsers size={24} />, href: "/" },
            { label: "Services", icon: <FaArrowTrendUp size={24} />, href: "/" },
            { label: "Tasks", icon: <LuClipboardList size={24} />, href: "/" },
            { label: "Communications", icon: <FiMessageSquare size={24} />, href: "/" },
            { label: "Reservations", icon: <FiCalendar size={24} />, href: "/" },
            { label: "Events", icon: <FaRegCalendarAlt size={24} />, href: "/" },
            { label: "Rules & Regulations", icon: <IoDocumentTextOutline size={24} />, href: "/" },
            { label: "Tenant", icon: <FiHome size={24} />, href: "/" },
            { label: "Pets", icon: <MdPets size={24} />, href: "/" },
            { label: "Attendance & Vacation", icon: <FiUserCheck size={24} />, href: "/" },
          ]}
        />
      </main>

      <FooterNav
        items={[
          { label: "Profile", href: "/security/profile", icon: FiUser },
          { label: "Emergency", href: "#", icon: FiPhone },
          { label: "Messages", href: "#", icon: FiMessageCircle },
        ]}
      />
    </>
  );
}
