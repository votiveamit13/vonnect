"use client";

import { useEffect, useState } from "react";
import { FiChevronRight, FiFileText } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import { FiHome } from "react-icons/fi";
import Link from "next/link";
import NavigationHeader from "@/components/common/NavigationHeader";
import { getUnitsApi } from "@/lib/administrator";
import Loader from "@/components/Loader";

export default function UnitManagementPage() {
  const [activeTab, setActiveTab] = useState("unit");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("all");
  const [units, setUnits] = useState([]);
  const [loadingUnits, setLoadingUnits] = useState(true);

  const residences = [
    {
      id: 1,
      title: "Amenities",
      subtitle: "View residence amenities",
      icon: LuBuilding2,
      link: "/administration/unit-management/amenities",
    },
    {
      id: 2,
      title: "Documentation",
      subtitle: "View residence documents",
      icon: FiFileText,
      link: "/administration/unit-management/documentation",
    },
  ];

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        setLoadingUnits(true);

        const match = document.cookie.match(
          new RegExp("(^| )buildingId=([^;]+)")
        );
        const buildingId = match ? match[2] : null;

        if (!buildingId) return;

        const res = await getUnitsApi({
          building_id: buildingId,
          page: 1,
          limit: 100,
        });

        const list = res.data?.data || [];

        const normalized = list.map((unit) => ({
          id: unit.id,
          type: "Residential Unit",
          unitNumber: unit.unit_number,
        }));

        setUnits(normalized);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUnits(false);
      }
    };

    fetchUnits();
  }, []);

  const filteredUnits =
    selectedUnit === "all"
      ? units
      : units.filter((u) => u.unitNumber === selectedUnit);

  return (
    <main className="min-h-screen w-full bg-[#F5F7FA]">
      <NavigationHeader
        showBack
        backHref="/administration"
        title="Unit Management"
        subtitle="Manage all residential units"
      />

      <div className="px-4 mt-4">
        <div className="bg-white rounded-[10px] border border-[#eff0f1] shadow-sm p-1 flex gap-2">
          <button
            onClick={() => setActiveTab("unit")}
            className={`flex-1 py-2.5 text-[14px] rounded-[7px] flex items-center justify-center gap-2 transition
              ${activeTab === "unit" ? "bg-[#001F3F] text-white" : "text-[#364153] hover:bg-[#f6f3f4]"}`}
          >
            <LuBuilding2 size={16} />
            Unit
          </button>

          <button
            onClick={() => setActiveTab("residence")}
            className={`flex-1 py-2.5 text-[14px] rounded-[7px] flex items-center justify-center gap-2 transition
              ${activeTab === "residence" ? "bg-[#001F3F] text-white" : "text-[#364153] hover:bg-[#f6f3f4]"}`}
          >
            <FiHome size={16} />
            Residence
          </button>
        </div>
      </div>

      {activeTab === "unit" && (
        <div className="px-4 mt-4">
          <div className="relative w-full">
            <button
              onClick={() => setShowFilter((v) => !v)}
              className="w-full h-[44px] border-2 border-[#001F3F] rounded-[10px] flex items-center justify-center gap-2 text-[14px] text-[#001F3F] hover:bg-[#eff6ff]"
            >
              <LuBuilding2 size={16} />
              {selectedUnit === "all" ? "Filter by Unit" : `Unit ${selectedUnit}`}
            </button>

            {showFilter && (
              <div
                className="
                  absolute left-0 right-0 mt-2
                  bg-white rounded-[10px] shadow-lg
                  border border-[#eff0f1]
                  overflow-hidden
                "
              >
                <button
                  onClick={() => {
                    setSelectedUnit("all");
                    setShowFilter(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-[14px] hover:bg-[#F1F5F9]
                  ${selectedUnit === "all" ? "bg-[#EFF6FF] text-[#001F3F] font-medium" : ""}`}
                >
                  All Units
                </button>

                {units.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      setSelectedUnit(u.unitNumber);
                      setShowFilter(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-[14px] hover:bg-[#F1F5F9]
                ${selectedUnit === u.unitNumber ? "bg-[#EFF6FF] text-[#001F3F] font-medium" : ""}`}
                  >
                    Unit {u.unitNumber}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="px-4 mt-4 space-y-3 pb-10">
        {activeTab === "unit" && loadingUnits && (
          <Loader text="Loading units..." size="md" />
        )}

        {activeTab === "unit" &&
          !loadingUnits &&
          filteredUnits.map((unit) => (
            <Link
              key={unit.id}
              href={`/administration/unit-management/${unit.id}`}
              className="bg-white rounded-[10px] shadow-sm px-4 py-4 flex items-center justify-between border border-[#eff0f1] hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] rounded-[10px] bg-[#001F3F] flex items-center justify-center text-white">
                  <LuBuilding2 size={20} />
                </div>
                <div>
                  <p className="text-[#001F3F] text-[16px] font-[600]">{unit.unitNumber}</p>
                  <p className="text-[12px] text-[#4A5565]">{unit.type}</p>
                </div>
              </div>
              <FiChevronRight size={20} className="text-[#99A1AF]" />
            </Link>
          ))}

          {activeTab === "unit" &&
          !loadingUnits &&
          filteredUnits.length === 0 && (
            <p className="text-center text-sm text-[#6A7282]">
              No units found.
            </p>
          )}

        {activeTab === "residence" &&
          residences.map((item) => (
            <Link
              key={item.id}
              href={`${item.link}`}
              className="bg-white rounded-[10px] shadow-sm px-4 py-4 flex items-center justify-between border border-[#eff0f1] hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] rounded-[10px] bg-[#001F3F] flex items-center justify-center text-white">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-[#001F3F] text-[16px] font-[600]">{item.title}</p>
                  <p className="text-[12px] text-[#4A5565]">{item.subtitle}</p>
                </div>
              </div>
              <FiChevronRight size={20} className="text-[#99A1AF]" />
            </Link>
          ))}
      </div>
    </main>
  );
}