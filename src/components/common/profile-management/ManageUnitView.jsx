import Link from "next/link";
import { FiUser, FiChevronRight } from "react-icons/fi";

export default function ManageUnitView({
  title = "Family Members",
  members = [],
  unitId,
}) {
  return (
    <div className="px-4 sm:px-6 mt-4 pb-10">
      <div className="bg-white rounded-[16px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.25)] overflow-hidden">

        <div className="bg-[#001F3F] px-5 py-3 text-white rounded-t-[16px] flex items-center gap-2">
          <FiUser size={16} />
          <span className="text-[12px]">{title}</span>
        </div>

        {/* List */}
        <div>
          {members.map((m, i) => (
            <Link
              key={i}
              href={`/owner/profile/${unitId}/manage-unit/members/${m.id}`}
              className={`flex items-center justify-between px-5 py-4 ${
                i !== members.length - 1 ? "border-b border-[#E5E7EB]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <FiUser className="text-[#9CA3AF]" size={20} />

                <div>
                  <p className="text-[14px] text-[#001F3F] leading-tight">
                    {m.name}
                  </p>
                  <p className="text-[12px] text-[#6A7282] leading-tight">
                    {m.role}
                  </p>
                </div>
              </div>

              <FiChevronRight className="text-[#9CA3AF]" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
