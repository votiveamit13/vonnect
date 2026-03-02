"use client";

import NavigationHeader from "@/components/common/NavigationHeader";
import FloatingActionButton from "@/components/FloatingButton";
import { FiPlus } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import { useRouter } from "next/navigation";

export default function ResidenceAmenitiesPage() {
    const router = useRouter();
  const amenities = [
    {
      name: "Swimming Pool",
      type: "Recreation",
      building: "Building A",
      size: "150 m²",
      coefficient: "1.50%",
    },
    {
      name: "Gym & Fitness Center",
      type: "Recreation",
      building: "Building A",
      size: "120 m²",
      coefficient: "1.20%",
    },
    {
      name: "Community Room",
      type: "Social",
      building: "Building B",
      size: "80 m²",
      coefficient: "1.00%",
    },
    {
      name: "Children's Playground",
      type: "Recreation",
      building: "Building B",
      size: "100 m²",
      coefficient: "0.80%",
    },
    {
      name: "Rooftop Terrace",
      type: "Social",
      building: "Building C",
      size: "200 m²",
      coefficient: "1.80%",
    },
    {
      name: "Business Center",
      type: "Work",
      building: "Building A",
      size: "60 m²",
      coefficient: "0.90%",
    },
    {
      name: "BBQ Area",
      type: "Social",
      building: "Building C",
      size: "50 m²",
      coefficient: "0.70%",
    },
    {
      name: "Yoga Studio",
      type: "Recreation",
      building: "Building B",
      size: "70 m²",
      coefficient: "0.60%",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F3F4F6] pb-32">
        <NavigationHeader
          showBack
          backHref="/administration/unit-management"
          title="Residence Amenities"
          subtitle="Manage common areas and facilities"
        />

      <div className="px-4 mt-4 pb-28 space-y-4">
        {amenities.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-[10px] shadow-sm overflow-hidden border border-[#eff0f1] hover:shadow-md transition"
          >
            <div className="flex items-center h-[36px] gap-2 px-4 py-3 bg-[#001F3F] text-white text-[14px]">
              <LuBuilding2 size={16} />
              {item.name}
            </div>

            <div className="px-4 py-4 space-y-3 text-[13px]">
              <div>
                <p className="text-[#6A7282] text-[12px]">Type</p>
                <p className="text-[#001F3F] text-[14px]">
                  {item.type}
                </p>
              </div>

              <div>
                <p className="text-[#6A7282] text-[12px]">Building</p>
                <p className="text-[#001F3F] text-[14px]">
                  {item.building}
                </p>
              </div>

              <div>
                <p className="text-[#6A7282] text-[12px]">Square Meters</p>
                <p className="text-[#001F3F] text-[14px]">
                  {item.size}
                </p>
              </div>

              <div>
                <p className="text-[#6A7282] text-[12px]">Coefficient</p>
                <p className="text-[#001F3F] text-[14px]">
                  {item.coefficient}
                </p>
              </div>

            </div>
          </div>
        ))}

      </div>

      <FloatingActionButton
        label="Add Amenity"
        icon={FiPlus}
        onClick={() => router.push("/administration/unit-management/amenities/add")}
      />

    </main>
  );
}