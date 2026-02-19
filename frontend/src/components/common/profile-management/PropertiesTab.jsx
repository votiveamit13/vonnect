import { FiHome, FiTruck, FiBox } from "react-icons/fi";

export default function PropertiesTab({ properties = [] }) {
  return (
    <div className="mt-4 px-4 sm:px-6 pb-10 space-y-5">
      {properties.map((unit, i) => (
        <div
          key={i}
          className="bg-white rounded-[16px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.25)] overflow-hidden border"
        >
          {/* Header */}
          <div className="bg-[#001F3F] text-white px-5 py-3 rounded-t-[16px]">
            <p className="text-sm font-medium">Unit {unit.unitNumber}</p>
            <p className="text-xs text-white/70">{unit.propertyName}</p>
          </div>

          {/* Main Info */}
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Info label="Unit Type" value={unit.unitType} />
            <Info label="Unit Number" value={unit.unitNumber} />
            <Info label="Square Meters" value={`${unit.squareMeters} m²`} />
            <Info label="Coefficient (Total)" value={`${unit.coefficient}%`} />

            <div>
              <p className="text-xs text-[#6A7282] mb-1">Occupancy Status</p>
              <span
                className={`inline-block text-xs px-3 py-1 rounded-full ${
                  unit.status === "Owner Occupied"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {unit.status}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="px-5 pb-4 space-y-2">
            <button className="w-full h-[40px] rounded-lg bg-[#001F3F] text-white text-sm hover:bg-[#003d7a] transition">
              Manage Unit
            </button>

            {unit.showManageTenants && (
              <button className="w-full h-[40px] rounded-lg border border-[#001F3F] text-[#001F3F] text-sm hover:bg-[#001F3F]/5 transition">
                Manage Tenants
              </button>
            )}
          </div>

          {/* Complementary Units */}
          {unit.complementaryUnits?.length > 0 && (
            <div className="border-t bg-[#FAFAFA] px-5 py-4">
              <p className="text-xs text-[#6A7282] mb-3">
                Complementary Units
              </p>

              <div className="space-y-3">
                {unit.complementaryUnits.map((c, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F9FAFB] rounded-xl p-4 border"
                  >
                    <div className="flex items-center gap-2 mb-2 text-[#001F3F]">
                      {c.type === "Parking Space" && <FiTruck size={16} />}
                      {c.type === "Storage Unit" && <FiBox size={16} />}
                      <p className="text-sm font-medium">
                        {c.type} {c.unitNumber}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <Info label="Unit Type" value={c.type} />
                      <Info label="Unit Number" value={c.unitNumber} />
                      <Info label="Square Meters" value={`${c.squareMeters} m²`} />
                      <Info label="Coefficient" value={`${c.coefficient}%`} />
                    </div>

                    {c.showManageTenants && (
                      <button className="mt-3 w-full h-[36px] rounded-lg border border-[#001F3F] text-[#001F3F] text-xs hover:bg-[#001F3F]/5 transition">
                        Manage Tenants
                      </button>
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

/* Small reusable info block */
function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-[#6A7282]">{label}</p>
      <p className="text-sm font-medium text-[#001F3F]">{value}</p>
    </div>
  );
}
