import FooterNav from "@/components/Footer";
import Header from "@/components/Header";
import { FiUsers, FiPhone, FiMessageCircle } from "react-icons/fi";

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

      <main className="p-6">
        {/* Page content */}
      </main>

      <FooterNav
        items={[
            { label: "Contacts", href: "/owner/contacts", icon: FiUsers },
          { label: "Emergency", href: "/owner/emergency", icon: FiPhone },
          { label: "Messages", href: "/owner/messages", icon: FiMessageCircle },
        ]}
      />
    </>
  );
}
