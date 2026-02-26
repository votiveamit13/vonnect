import { FiPlus } from "react-icons/fi";

export default function FloatingActionButton({
  label = "Add New Member",
  onClick,
  icon: Icon = FiPlus,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 h-[56px] rounded-full 
        bg-[#001F3F] text-white text-[14px] font-normal shadow-lg 
        hover:bg-[#036] transition ${className}`}
    >
      <span>
        <Icon size={24} />
      </span>
      {label}
    </button>
  );
}