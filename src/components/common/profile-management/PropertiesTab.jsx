import { FiBox } from "react-icons/fi";
import { LuCar } from "react-icons/lu";
import Link from "next/link";


export default function PropertiesTab({ properties = [] }) {
  return (
    <div className="mt-4 px-4 sm:px-6 pb-10 space-y-5">
      {properties.map((unit, i) => (
        <div
          key={i}
          className="bg-white rounded-[16px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.25)] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#001F3F] text-white px-5 py-3 rounded-t-[16px]">
            <p className="text-[12px]">Unit {unit.unitNumber}</p>
            <p className="text-[12px] text-white/70">{unit.propertyName}</p>
          </div>

          {/* Main Info */}
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[12px] text-[#6A7282]">Unit Type</p>
              <p className="text-[14px] text-[#001F3F]">{unit.unitType}</p>
            </div>

            <div>
              <p className="text-[12px] text-[#6A7282]">Unit Number</p>
              <p className="text-[14px] text-[#001F3F]">{unit.unitNumber}</p>
            </div>

            <div>
              <p className="text-[12px] text-[#6A7282]">Square Meters</p>
              <p className="text-[14px] text-[#001F3F]">
                {unit.squareMeters} m²
              </p>
            </div>

            <div>
              <p className="text-[12px] text-[#6A7282]">Coefficient (Total)</p>
              <p className="text-[14px] text-[#001F3F]">
                {unit.coefficient}%
              </p>
            </div>
          </div>
          <div className="flex justify-between w-full px-5 mb-4">
            <p className="text-[14px] text-[#4A5565] mb-1">Occupancy Status</p>
            <span
              className={`inline-block text-[12px] px-3 py-1 rounded-full ${unit.status === "Owner Occupied"
                  ? "bg-[#DBEAFE] text-[#001F3F]"
                  : "bg-[#DCFCE7] text-[#008236]"
                }`}
            >
              {unit.status}
            </span>
          </div>
          {/* Actions */}
          <div className="px-5 pb-4 space-y-2">
            <Link
               href={`/owner/profile/${unit.unitNumber}/manage-unit`}
              className="block w-full h-[36px] rounded-[10px] bg-[#001F3F] text-white text-[14px] 
             hover:opacity-90 transition text-center leading-[36px]"
            >
              Manage Unit
            </Link>


            {unit.showManageTenants && (
              <button className="w-full h-[36px] rounded-[10px] border border-[#001F3F] text-[#001F3F] text-[12px] hover:bg-[#001F3F] hover:text-white transition">
                Manage Tenants
              </button>
            )}
          </div>

          {/* Complementary Units */}
          {unit.complementaryUnits?.length > 0 && (
            <div className="border-t-2 border-[#E5E7EB] bg-[#F9FAFB] px-5 py-4">
              <p className="text-[12px] text-[#364153] mb-3">
                Complementary Units
              </p>

              <div className="space-y-3">
                {unit.complementaryUnits.map((c, idx) => (
                  <div
                    key={idx}
                    className="rounded-[10px] shadow-sm"
                  >
                    <div className="p-4 bg-[#F3F4F6] rounded-t-[10px] rounded-b-none flex items-center gap-2 mb-2 text-[14px] text-[#001F3F] border-b-2 border-[#E5E7EB]">
                      {c.type === "Parking Space" && <LuCar size={16} />}
                      {c.type === "Storage Unit" && <FiBox size={16} />}
                      <p className="text-[14px] text-[#001F3F]">
                        {c.type} {c.unitNumber}
                      </p>
                    </div>

                    <div className="px-4 py-3 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[12px] text-[#6A7282]">Unit Type</p>
                        <p className="text-[12px] text-[#001F3F]">
                          {c.type}
                        </p>
                      </div>

                      <div>
                        <p className="text-[12px] text-[#6A7282]">Unit Number</p>
                        <p className="text-[12px] text-[#001F3F]">
                          {c.unitNumber}
                        </p>
                      </div>

                      <div>
                        <p className="text-[12px] text-[#6A7282]">Square Meters</p>
                        <p className="text-[12px] text-[#001F3F]">
                          {c.squareMeters} m²
                        </p>
                      </div>

                      <div>
                        <p className="text-[12px] text-[#6A7282]">Coefficient</p>
                        <p className="text-[12px] text-[#001F3F]">
                          {c.coefficient}%
                        </p>
                      </div>
                    </div>

                    {c.showManageTenants && (
                      <div className="px-4">
                        <button className="mt-3 mb-3 w-full h-[36px] rounded-[10px] border border-[#001F3F] text-[#001F3F] text-[12px] hover:bg-[#001F3F] hover:text-white transition">
                          Manage Tenants
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
