import NavigationHeader from "@/components/common/NavigationHeader";
import ProfileTab from "@/components/common/profile-management/ProfileTab";
import PropertiesTab from "@/components/common/profile-management/PropertiesTab";

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

      {tab === "documents" && <div>Documents Content</div>}
    </>
  );
}
