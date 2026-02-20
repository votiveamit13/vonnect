import NavigationHeader from "@/components/common/NavigationHeader";
import DocumentsTab from "@/components/common/profile-management/DocumentsTab";
import NotificationTab from "@/components/common/profile-management/NotificationTab";
import ProfileTab from "@/components/common/profile-management/ProfileTab";
import PropertiesTab from "@/components/common/profile-management/PropertiesTab";
import { FiDollarSign, FiCalendar, FiUsers, FiTool, FiMessageSquare, FiBell, FiLock, FiGlobe, FiHelpCircle, FiSettings } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import SettingsTab from "@/components/common/profile-management/SettingsTab";
import AboutTab from "@/components/common/profile-management/AboutTab";

export default async function ProfilePage({ searchParams }) {
  const params = await searchParams;
  const tab = params?.tab || "profile";
  const view = params?.view || null;

  return (
    <>
      <NavigationHeader
        showBack
        backHref="/owner"
        title="My Profile"
        showProfile
        avatarHref="/owner/profile/upload-photo"
        profileData={{
          name: "Carlos Rodriguez",
          role: "Owner",
          unit: "Tower A - Unit 405",
          property: "Ocean View Residences",
          image: "",
        }}
        tabs={["Profile", "Properties", "Documents", "Notifications", "Settings", "About"]}
        activeTab={tab.charAt(0).toUpperCase() + tab.slice(1)}
        baseTabHref="/owner/profile"
      />

      {tab === "profile" && (
        <ProfileTab
          viewDocumentHref="/owner/profile/documents/driver-license"
          data={{
            documentType: "DNI",
            documentNumber: "35.123.456",
            dob: "Mar 15, 1988",
            email: "carlos.rodriguez@example.com",
            phone: "+54 11 4567-8901",
            emergency: "+54 11 9876-5432",
            licenseNumber: "B-35123456-8",
            licenseExpiry: "Mar 15, 2026",
            vehicles: [
              {
                name: "Toyota Camry 2022",
                plate: "ABC-123",
                insurance: "Seguros Rivadavia",
                expires: "Jun 30, 2025",
              },
              {
                name: "Honda CR-V 2021",
                plate: "XYZ-789",
                insurance: "La Caja Seguros",
                expires: "Aug 15, 2025",
              },
            ],
          }}
        />
      )}
      {tab === "properties" && (
        <PropertiesTab
          properties={[
            {
              unitNumber: "405",
              propertyName: "Ocean View Residences",
              unitType: "Functional Unit",
              squareMeters: 120,
              coefficient: 1.5,
              status: "Owner Occupied",
              showManageTenants: false,
              complementaryUnits: [
                {
                  type: "Parking Space",
                  unitNumber: "P-A12",
                  squareMeters: 15,
                  coefficient: 0.15,
                  showManageTenants: true,
                },
                {
                  type: "Storage Unit",
                  unitNumber: "S-105",
                  squareMeters: 8,
                  coefficient: 0.1,
                  showManageTenants: true,
                },
              ],
            },
            {
              unitNumber: "108",
              propertyName: "Ocean View Residences",
              unitType: "Functional Unit",
              squareMeters: 95,
              coefficient: 1.05,
              status: "Rented",
              showManageTenants: true,
              complementaryUnits: [
                {
                  type: "Parking Space",
                  unitNumber: "P-B08",
                  squareMeters: 15,
                  coefficient: 0.12,
                },
                {
                  type: "Storage Unit",
                  unitNumber: "S-208",
                  squareMeters: 10,
                  coefficient: 0.08,
                },
              ],
            },
          ]}
        />
      )}

      {tab === "documents" && (
        <DocumentsTab
          documents={[
            {
              type: "ownership",
              title: "Ownership Certificate",
              subtitle: "Certificate #: OC-2024-405",
              downloadUrl: "/docs/ownership.pdf",
            },
            {
              type: "insurance",
              title: "Property Insurance",
              subtitle: "Policy #: PI-789456-2024",
              downloadUrl: "/docs/property-insurance.pdf",
            },
            {
              type: "vehicle",
              title: "Vehicle Insurance - ABC-123",
              subtitle: "Toyota Camry 2022",
              downloadUrl: "/docs/vehicle-abc.pdf",
            },
            {
              type: "vehicle",
              title: "Vehicle Insurance - XYZ-789",
              subtitle: "Honda CR-V 2021",
              downloadUrl: "/docs/vehicle-xyz.pdf",
            },
            {
              type: "other",
              title: "Other Documents",
              subtitle: "Additional files",
              downloadUrl: "/docs/other.pdf",
            },
          ]}
        />
      )}
      {tab === "notifications" && (
        <NotificationTab
          title="Notification Settings"
          items={[
            {
              key: "fees",
              title: "Maintenance Fees",
              description: "Payment reminders and updates",
              icon: <FiDollarSign size={20} />,
              app: true,
              email: true,
            },
            {
              key: "events",
              title: "Events",
              description: "Community events and activities",
              icon: <FiCalendar size={20} />,
              app: true,
              email: true,
            },
            {
              key: "visitors",
              title: "Visitors",
              description: "Guest arrivals and invitations",
              icon: <FiUsers size={20} />,
              app: true,
              email: false,
            },
            {
              key: "services",
              title: "Service Providers",
              description: "Maintenance and service updates",
              icon: <FiTool size={20} />,
              app: true,
              email: true,
            },
            {
              key: "messages",
              title: "Messages",
              description: "Direct messages and chats",
              icon: <FiMessageSquare size={20} />,
              app: true,
              email: true,
            },
            {
              key: "communications",
              title: "Communications",
              description: "Announcements and bulletins",
              icon: <FiBell size={20} />,
              app: true,
              email: true,
            },
            {
              key: "reservations",
              title: "Reservations",
              description: "Booking confirmations and reminders",
              icon: <CiCalendar size={20} />,
              app: true,
              email: true,
            },
          ]}
        />
      )}
      {tab === "settings" && (
        <SettingsTab
          title="Settings"
          items={[
            {
              key: "change-password",
              label: "Change Password",
              icon: <FiLock size={20} />,
              type: "link",
              href: "/owner/profile/change-password",
            },
            {
              key: "language",
              label: "Preferred Language",
              icon: <FiGlobe size={20} />,
              type: "dropdown",
              options: ["English", "Spanish", "French"],
            },
            {
              key: "support",
              label: "Support & Help",
              icon: <FiHelpCircle size={20} />,
              type: "link",
            },
          ]}
        />
      )}

      {tab === "about" && (
        <AboutTab
          appName="VONNECT"
          subtitle="Property Management Platform"
          description="The all-in-one community app for smarter, simpler living."
          longDescription="VONNECT is designed for today’s residential communities – connecting residents and management in one secure, intuitive platform. From smart access and intercom to facility bookings, payments, visitor management, and announcements, VONNECT streamlines everyday living for condos and private estates."
          legalTitle="End User License Agreement"
          legalText="By using VONNECT, you agree to our terms of service and privacy policy. This application is licensed, not sold, and your use is governed by specific terms and restrictions."
          legalHref="/legal"
          version="1.0.0"
          copyright="© 2024 VONNECT. All rights reserved."
          logoSrc="/assets/logo.png"
        />
      )}
    </>
  );
}
