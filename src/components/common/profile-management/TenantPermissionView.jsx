import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function TenantPermissionsView({ units = [] }) {
  return (
    <div className="px-4 sm:px-6 mt-4 pb-10 space-y-3">
      {units.map((unit, i) => (
        <UnitAccordion key={i} unit={unit} />
      ))}
    </div>
  );
}

/* Single Unit Accordion */
function UnitAccordion({ unit }) {
  const isOpen = unit.open;

  return (
    <div className="bg-white rounded-[16px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.25)] overflow-hidden">
      
      {/* Header */}
      <div className="bg-[#001F3F] px-5 py-3 flex items-center justify-between text-white">
        <div className="flex items-center gap-2 text-[14px]">
          {unit.icon}
          <span>{unit.title}</span>
        </div>

        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>

      {isOpen && (
        <div>
          {/* Tenant Info */}
          <div className="px-5 py-4 border-b">
            <p className="text-[12px] text-[#6A7282]">Full Name</p>
            <p className="text-[14px] text-[#001F3F]">{unit.tenantName}</p>
          </div>

          {/* Permissions */}
          <div>
            {unit.permissions.map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-4 border-b last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#99A1AF]">{p.icon}</span>

                  <div>
                    <p className="text-[14px] text-[#001F3F] leading-tight">
                      {p.title}
                    </p>
                    <p className="text-[12px] text-[#6A7282] leading-tight">
                      {p.description}
                    </p>
                  </div>
                </div>

                {/* Toggle UI */}
                <span
                  className={`w-10 h-5 rounded-full relative ${
                    p.enabled ? "bg-[#001F3F]" : "bg-[#E5E7EB]"
                  }`}
                >
                  <span
                    className={`absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full transition ${
                      p.enabled ? "translate-x-5" : ""
                    }`}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
