"use client";

export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="px-4 mt-4">
      <div className="flex gap-2">
        {tabs.map((tab) => {
          const isActive = active === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`px-4 py-2 rounded-[10px] text-[14px] transition border
                ${
                  isActive
                    ? "bg-[#001F3F] text-white border-[#001F3F]"
                    : "bg-white text-[#364153] border-[#D1D5DC] hover:bg-[#fbf9fa]"
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}