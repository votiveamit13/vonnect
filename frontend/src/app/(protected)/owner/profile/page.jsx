import NavigationHeader from "@/components/common/NavigationHeader";
import ProfileTab from "@/components/common/profile-management/ProfileTab";

export default async function ProfilePage({ searchParams }) {
    const params = await searchParams;
    const tab = params?.tab || "profile";

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
            {tab === "properties" && <div>Properties Content</div>}
            {tab === "documents" && <div>Documents Content</div>}
        </>
    );
}
