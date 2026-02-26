"use client";
import { useSelector } from "react-redux";
import NavigationHeader from "@/components/common/NavigationHeader";
import DocumentsTab from "@/components/common/profile-management/DocumentsTab";
import NotificationTab from "@/components/common/profile-management/NotificationTab";
import ProfileTab from "@/components/common/profile-management/ProfileTab";
import PropertiesTab from "@/components/common/profile-management/PropertiesTab";
import { FiDollarSign, FiCalendar, FiUsers, FiTool, FiMessageSquare, FiBell, FiLock, FiGlobe, FiHelpCircle, FiSettings } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import SettingsTab from "@/components/common/profile-management/SettingsTab";
import AboutTab from "@/components/common/profile-management/AboutTab";
import { useSearchParams } from "next/navigation";
import { selectRoleName, selectBuildingName } from "@/store/selectors";
import { useEffect, useState } from "react";
import { getUserDocumentsApi, updateLanguageApi } from "@/lib/api";
import { updateUserLang } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function Profile() {
  // const params = await searchParams;
  const user = useSelector((s) => s.auth.user);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "profile";
  const UPLOAD_URL = process.env.NEXT_PUBLIC_UPLOAD_URL;
  const roleName = useSelector((s) => selectRoleName(s, user?.role_id));
  const buildingName = useSelector((s) => selectBuildingName(s, user?.details?.building_id));
  const [documents, setDocuments] = useState([]);
  const [docsLoading, setDocsLoading] = useState(false);
  const dispatch = useDispatch();

  const avatarUrl = user?.details?.profile_picture
    ? `${UPLOAD_URL}${user.details.profile_picture}`
    : null;

  // const view = params?.view || null;

  useEffect(() => {
    if (tab !== "documents") return;

    const fetchDocs = async () => {
      try {
        setDocsLoading(true);
        const res = await getUserDocumentsApi();

        const apiDocs = res.data?.data || [];

        const normalized = apiDocs.map((d) => ({
          type: d.document_type || "other",
          title: d.file_name,
          subtitle: d.meta_data?.label || "Uploaded document",
          downloadUrl: `${UPLOAD_URL}${d.file_path}`,  // full URL
          mimeType: d.mime_type,
          createdAt: d.created_at,
        }));

        setDocuments(normalized);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load documents");
      } finally {
        setDocsLoading(false);
      }
    };

    fetchDocs();
  }, [tab]);

  const handleLanguageChange = async (lang) => {
    console.log("Updating language to:", lang);

    try {
      const res = await updateLanguageApi(lang);
      console.log("API response:", res.data);

      dispatch(updateUserLang(lang));
      toast.success("Language updated");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update language");
    }
  };

  if (!user) return null;

  return (
    <>
      <NavigationHeader
        showBack
        backHref="/owner"
        title="My Profile"
        showProfile
        avatarHref="/owner/profile/upload-photo"
        // profileData={{
        //   name: "Carlos Rodriguez",
        //   role: "Owner",
        //   unit: "Tower A - Unit 405",
        //   property: "Ocean View Residences",
        //   image: "",
        // }}
        profileData={{
          name: user.name,
          role: roleName,
          unit: buildingName,
          property: `${user.details.unit_id || ""}`,
          image: avatarUrl,
        }}
        tabs={["Profile", "Properties", "Documents", "Notifications", "Settings", "About"]}
        activeTab={tab.charAt(0).toUpperCase() + tab.slice(1)}
        baseTabHref="/owner/profile"
      />

      {tab === "profile" && (
        <ProfileTab
          viewDocumentHref="/owner/profile/documents/driver-license"
          data={{
            documentType: user.details?.document_type || "--",
            documentNumber: user.details?.document_number || "--",
            dob: user.details?.date_of_birth || "--",
            email: user.email,
            phone: user.details?.phone || "--",
            emergency: user.details?.emergency_number || "--",
            licenseNumber: user.details?.driver_license_number || "--",
            licenseExpiry: user.details?.driver_license_expiry || "--",
            vehicles: user.vehicles || [],
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
          loading={docsLoading}
          documents={documents}
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
              value: user?.lang || "en",
              options: [
                { label: "English", value: "en" },
                { label: "Spanish", value: "es" },
              ],
              onChange: handleLanguageChange
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
