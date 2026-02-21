import FooterNav from "@/components/Footer";
import Header from "@/components/Header";
import { FiUser, FiUsers, FiPhone, FiMessageCircle } from "react-icons/fi";

export default function SecurityPage() {
  const user = {
    name: "Security",
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

      <main className="p-6">
        {/* Page content */}
      </main>

      <FooterNav
        items={[
          { label: "Profile", href: "/owner/profile", icon: FiUser },
          { label: "Emergency", href: "/owner/emergency", icon: FiPhone },
          { label: "Messages", href: "/owner/messages", icon: FiMessageCircle },
        ]}
      />
    </>
  );
}
