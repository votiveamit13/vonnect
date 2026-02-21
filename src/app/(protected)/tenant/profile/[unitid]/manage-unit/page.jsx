import NavigationHeader from "@/components/common/NavigationHeader";
import ManageUnitView from "@/components/common/profile-management/ManageUnitView";

export default async function ManageUnit({ params }) {
  const { unitId } = params;

  return (
    <main className="min-h-screen w-full bg-[#F5F7FA]">
      <NavigationHeader
        showBack
        backHref="/owner/profile?tab=properties"
        title={`Manage Unit ${unitId}`}
        subtitle="Tower A"
      />

      <ManageUnitView
        title="Family Members"
         unitId={unitId}
        members={[
          { id: 1, name: "Carlos Rodriguez", role: "Main Owner" },
          { id: 2, name: "Maria Rodriguez", role: "Spouse" },
          { id: 3, name: "Sofia Rodriguez", role: "Daughter" },
        ]}
      />
    </main>
  );
}
