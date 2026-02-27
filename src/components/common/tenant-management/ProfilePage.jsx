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
import {
  getAboutApi,
  getNotificationTypesApi,
  getUserNotificationTypesApi,
  getUserDocumentsApi,
  getUserUnitsApi,
  updateLanguageApi
} from "@/lib/api";
import { updateUserLang } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setUnits } from "@/store/slices/unitSlice";

export default function Profile() {
  // const params = await searchParams;
  const user = useSelector((s) => s.auth.user);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "profile";
  const UPLOAD_URL = process.env.NEXT_PUBLIC_UPLOAD_URL;
  const roleName = useSelector((s) => selectRoleName(s, user?.role_id));
  const buildingId = user?.assignments?.[0]?.building_id;

  const buildingName = useSelector((s) =>
    selectBuildingName(s, buildingId)
  );
  const [documents, setDocuments] = useState([]);
  const [docsLoading, setDocsLoading] = useState(false);
  const dispatch = useDispatch();
  const [notificationItems, setNotificationItems] = useState([]);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [aboutLoading, setAboutLoading] = useState(false);
  const [unitsLoading, setUnitsLoading] = useState(false);
  const [normalizedUnits, setNormalizedUnits] = useState([]);
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

  useEffect(() => {
  const fetchUnits = async () => {
    try {
      setUnitsLoading(true);

      const res = await getUserUnitsApi();
      const assignments = res.data?.data || [];

      dispatch(setUnits(assignments));

      const normalized = assignments.map((assignment) => {
        const unit = assignment.Unit;
        const isRented = String(unit.occupaycy_status) === "true";

        return {
          id: Number(unit.id),
          unitNumber: unit.unit_number,
          propertyName: unit.building?.name || "Building",
          unitType: unit.unit_type || "Unit",
          squareMeters: Number(unit.square_meters) || 0,
          coefficient: Number(unit.coefficient) || 0,
          status: isRented ? "Rented" : "Owner Occupied",
          showManageUnit: true,
          showManageTenant: isRented,
          complementaryUnits: (unit.complementary_units || []).map((c) => ({
            id: Number(c.id),
            type: c.title || c.unit_type,
            unitNumber: c.unit_number,
            squareMeters: Number(c.square_meters),
            coefficient: Number(c.coefficient),
            showManageTenant: !isRented,
          })),
        };
      });

      setNormalizedUnits(normalized);

    } catch (err) {
      toast.error("Failed to load units");
    } finally {
      setUnitsLoading(false);
    }
  };

  fetchUnits();
}, []);   // 🔥 REMOVE tab dependency

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

  useEffect(() => {
    if (tab !== "notifications") return;

    const fetchNotifications = async () => {
      try {
        setNotificationLoading(true);

        const [typesRes, userRes] = await Promise.all([
          getNotificationTypesApi(),
          getUserNotificationTypesApi(),
        ]);

        const types = typesRes.data?.data || [];
        const userSettings = userRes.data?.data || [];

        // Map user settings by notification type id
        const userMap = {};
        userSettings.forEach((setting) => {
          userMap[setting.notification_type.id] = setting;
        });

        const normalized = types.map((type) => {
          const userSetting = userMap[type.id];

          return {
            key: `type_${type.id}`,
            id: type.id,
            title: type.title,
            description: "Notification updates",
            app: userSetting
              ? userSetting.app_enabled
              : false,
            email: userSetting
              ? userSetting.email_enabled
              : false,
          };
        });

        setNotificationItems(normalized);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load notifications");
      } finally {
        setNotificationLoading(false);
      }
    };

    fetchNotifications();
  }, [tab]);

  useEffect(() => {
    if (tab !== "about") return;

    const fetchAbout = async () => {
      try {
        setAboutLoading(true);
        const res = await getAboutApi();
        setAboutData(res.data?.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load about information");
      } finally {
        setAboutLoading(false);
      }
    };

    fetchAbout();
  }, [tab]);



  if (!user) return null;

  return (
    <>
      <NavigationHeader
        showBack
        backHref="/tenant"
        title="My Profile"
        showProfile
        avatarHref="/tenant/profile/upload-photo"
        profileData={{
          name: user.name,
          role: roleName,
          unit: `${user.details.unit_id || "Unit"}`,
          property: buildingName,
          image: avatarUrl,
        }}
        tabs={["Profile", "Properties", "Documents", "Notifications", "Settings", "About"]}
        activeTab={tab.charAt(0).toUpperCase() + tab.slice(1)}
        baseTabHref="/tenant/profile"
      />

      {tab === "profile" && (
        <ProfileTab
          viewDocumentHref="/tenant/profile/document"
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
          properties={normalizedUnits}
          loading={unitsLoading}
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
          items={notificationItems}
          loading={notificationLoading}
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
              href: "/tenant/profile/change-password",
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
          appName={aboutData?.app_name}
          subtitle={aboutData?.subtitle}
          description={aboutData?.description}
          longDescription={aboutData?.long_description}
          legalTitle={aboutData?.legal_title}
          legalText={aboutData?.legal_text}
          version={aboutData?.version}
          copyright={aboutData?.copyright}
          logoSrc={aboutData?.logo || "/assets/logo.png"}
          loading={aboutLoading}
        />
      )}
    </>
  );
}
