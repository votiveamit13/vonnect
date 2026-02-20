import { FiDollarSign, FiUserPlus, FiCalendar, FiTool } from "react-icons/fi";

export default function MemberPermissions({
    name,
    relationship,
    permissions = [],
}) {
    return (
        <div className="px-4 sm:px-6 mt-4 pb-10">
            <div className="bg-white rounded-[16px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.25)] overflow-hidden mb-5">
                <div className="bg-[#001F3F] px-5 py-3 text-white rounded-t-[16px] flex items-center gap-2">
                    <span className="text-[14px]">Member Information</span>
                </div>

                <div className="px-5 py-4 border-b-2 border-[#E5E5E5]">
                    <p className="text-[12px] text-[#6A7282]">Name</p>
                    <p className="text-[14px] text-[#001F3F]">{name}</p>
                </div>

                <div className="px-5 py-4">
                    <p className="text-[12px] text-[#6A7282]">Relationship</p>
                    <p className="text-[14px] text-[#001F3F]">{relationship}</p>
                </div>
            </div>
            <div className="bg-white rounded-[16px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.25)] overflow-hidden">
                <div className="bg-[#001F3F] px-5 py-3 text-white flex items-center gap-2">
                    <span className="text-[12px]">Permissions</span>
                </div>

                <div>
                    {permissions.map((p, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between px-5 py-4 border-b-2 border-[#E5E5E5]"
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

                            <span
                                className={`w-[44px] h-[24px] rounded-full relative ${p.enabled ? "bg-[#001F3F]" : "bg-[#E5E7EB]"
                                    }`}
                            >
                                <span
                                    className={`absolute top-[4px] left-[4px] w-[16px] h-[16px] bg-white rounded-full transition ${p.enabled ? "translate-x-5" : ""
                                        }`}
                                />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
