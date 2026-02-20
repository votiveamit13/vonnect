import { FiChevronRight } from "react-icons/fi";
import { LuSettings } from "react-icons/lu";

export default function SettingsTab({ title = "Settings", items = [] }) {
  return (
    <div className="mt-4 px-4 sm:px-6 pb-10">
      <div className="bg-white rounded-[16px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.25)] overflow-hidden">

        {/* Header */}
        <div className="bg-[#001F3F] px-5 py-4 text-white rounded-t-[16px] flex items-center gap-2">
          <LuSettings size={16} stroke="white"/>
          <span className="text-[14px]">{title}</span>
        </div>

        {/* Items */}
        <div>
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-5 py-4 ${
                i !== items.length - 1 ? "border-b border-[#E5E7EB]" : ""
              }`}
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <span className="text-[#99A1AF]">{item.icon}</span>
                <span className="text-[14px] text-[#001F3F]">
                  {item.label}
                </span>
              </div>

              {/* Right */}
              {item.type === "dropdown" ? (
                <select className="border border-[#D1D5DC] rounded-[10px] px-3 py-1 text-[12px] text-[#001F3F] bg-white focus:outline-none">
                  {item.options?.map((opt, idx) => (
                    <option key={idx}>{opt}</option>
                  ))}
                </select>
              ) : (
                <FiChevronRight className="text-[#9CA3AF]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
