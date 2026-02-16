import Link from "next/link";
import Image from "next/image";
import { FiBell, FiLogOut } from "react-icons/fi";

export default function Header({
  name = "Carlos Rodriguez",
  unit = "Unit 405 - Ocean View Residences",
  showWelcomeCard = true,
}) {
  return (
    <header className="w-full bg-[#001F3F]">
      <div className="w-full mx-auto px-4 sm:px-6 py-4 sm:py-5">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          <h1 className="text-white text-[20px] sm:text-[32px] font-semibold tracking-wide">
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
          <div className=" rounded-2xl backdrop-blur-md py-4 flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shrink-0">
              <Image
                src="/assets/icon/user.svg"  // put your user icon here
                alt="User"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>

            {/* Text */}
            <div className="text-white">
              <p className="text-sm text-white/70">Welcome,</p>
              <p className="font-medium leading-tight">{name}</p>
              <p className="text-sm text-white/70">{unit}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
