"use client";

import NavigationHeader from "@/components/common/NavigationHeader";
import FloatingActionButton from "@/components/FloatingButton";
import { FiPlus } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { getResidenceAmenitiesApi } from "@/lib/administrator";
import { useEffect, useState } from "react";

export default function ResidenceAmenitiesPage() {
  const router = useRouter();
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        setLoading(true);

        const res = await getResidenceAmenitiesApi();
        setAmenities(res.data?.data || []);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAmenities();
  }, []);

  return (
    <main className="min-h-screen bg-[#F3F4F6] pb-32">
      <NavigationHeader
        showBack
        backHref="/administration/unit-management"
        title="Residence Amenities"
        subtitle="Manage common areas and facilities"
      />

      <div className="px-4 mt-4 pb-28 space-y-4">
        {amenities.map((item) => (
          <div
            key={item.id}
            onClick={() =>
              router.push(`/administration/unit-management/amenities/${item.id}`)
            }
            className="cursor-pointer bg-white rounded-[10px] shadow-sm overflow-hidden border border-[#eff0f1] hover:shadow-md transition"
          >
            <div className="flex items-center h-[36px] gap-2 px-4 py-3 bg-[#001F3F] text-white text-[14px]">
              <LuBuilding2 size={16} />
              {item.name}
            </div>

            <div className="px-4 py-4 space-y-3 text-[13px]">
              <div>
                <p className="text-[#6A7282] text-[12px]">Type</p>
                <p className="text-[#001F3F] text-[14px]">
                  {item.residence_type?.name || "--"}
                </p>
              </div>

              <div>
                <p className="text-[#6A7282] text-[12px]">Building</p>
                <p className="text-[#001F3F] text-[14px]">
                  {item.building?.name || "--"}
                </p>
              </div>

              <div>
                <p className="text-[#6A7282] text-[12px]">Square Meters</p>
                <p className="text-[#001F3F] text-[14px]">
                  {item.square_meters ? `${item.square_meters} m²` : "--"}
                </p>
              </div>

              <div>
                <p className="text-[#6A7282] text-[12px]">Coefficient</p>
                <p className="text-[#001F3F] text-[14px]">
                  {item.coefficient ? `${item.coefficient}%` : "--"}
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