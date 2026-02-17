import Link from "next/link";
import Image from "next/image";
import { FiBell, FiLogOut, FiUser } from "react-icons/fi";

export default function Header({
  name = "Carlos Rodriguez",
  unit = "Unit 405 - Ocean View Residences",
  avatarUrl = null,
  showWelcomeCard = true,
}) {
  return (
    <header className="w-full bg-[#001F3F]">
      <div className="mx-auto px-4 sm:px-6 py-4 sm:py-5">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          <h1 className="text-white text-[20px] sm:text-[24px] tracking-wide">
            VONNECT
          </h1>

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="relative text-white hover:opacity-80 transition">
              <FiBell size={22} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500" />
            </button>

            <Link
              href="/logout"
              className="flex items-center gap-2 text-white text-[14px] hover:opacity-80 transition"
            >
              <FiLogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </Link>
          </div>
        </div>

        {/* Welcome Card */}
        {showWelcomeCard && (
          <div className="mt-2 sm:mt-4 rounded-2xl backdrop-blur-md px-4 sm:px-4 py-4 flex items-center gap-4 hover:bg-white/10">
            {/* Avatar */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiUser className="text-[#001F3F]" size={24} />
              )}
            </div>

            {/* Text */}
            <div className="text-white">
              <p className="text-[14px] text-[#FFFFFF]/70">Welcome,</p>
              <p className="font-[16px] text-[#FFFFFF]">{name}</p>
              <p className="text-[14px] text-[#FFFFFF]/80">{unit}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
