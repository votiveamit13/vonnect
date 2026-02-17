import { FiUser } from "react-icons/fi";
import { LuBuilding2, LuUserCog } from "react-icons/lu";
import { MdOutlineShield } from "react-icons/md";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#001F3F] flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-white text-[28px] sm:text-[32px] md:text-[36px] font-semibold tracking-wide">
          VONNECT
        </h1>
        <p className="text-white text-[14px] sm:text-[15px] md:text-[16px] mt-2 mb-8 sm:mb-10">
          Select your user type to continue
        </p>

        {/* Card Wrapper */}
        <div className="space-y-4 sm:space-y-5">
          
          <Link
            href="/login?role=owner"
            className="group block w-full h-[96px] sm:h-[104px] md:h-[112px] bg-white rounded-xl shadow-md px-4 sm:px-5 flex items-center gap-4 sm:gap-5 transition-transform sm:hover:scale-[1.05] active:scale-[0.99]"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#071E34] flex items-center justify-center shrink-0">
              <FiUser stroke="white" size={22} />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-[18px] sm:text-[19px] md:text-[20px] text-[#001F3F]">
                Owner
              </h3>
              <p className="text-[#4A5565] text-[13px] sm:text-sm">
                Property owners and partners
              </p>
            </div>
          </Link>

          <Link
            href="/login?role=tenant"
            className="group block w-full h-[96px] sm:h-[104px] md:h-[112px] bg-white rounded-xl shadow-md px-4 sm:px-5 flex items-center gap-4 sm:gap-5 transition-transform sm:hover:scale-[1.05] active:scale-[0.99]"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#071E34] flex items-center justify-center shrink-0">
              <LuBuilding2 stroke="white" size={22} />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-[18px] sm:text-[19px] md:text-[20px] text-[#001F3F]">
                Tenant
              </h3>
              <p className="text-[#4A5565] text-[13px] sm:text-sm">
                Property tenants
              </p>
            </div>
          </Link>

          <Link
            href="/login?role=administration"
            className="group block w-full h-[96px] sm:h-[104px] md:h-[112px] bg-white rounded-xl shadow-md px-4 sm:px-5 flex items-center gap-4 sm:gap-5 transition-transform sm:hover:scale-[1.05] active:scale-[0.99]"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#071E34] flex items-center justify-center shrink-0">
              <LuUserCog stroke="white" size={22} />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-[18px] sm:text-[19px] md:text-[20px] text-[#001F3F]">
                Administration
              </h3>
              <p className="text-[#4A5565] text-[13px] sm:text-sm">
                Administrative staff
              </p>
            </div>
          </Link>

          <Link
            href="/login?role=security"
            className="group block w-full h-[96px] sm:h-[104px] md:h-[112px] bg-white rounded-xl shadow-md px-4 sm:px-5 flex items-center gap-4 sm:gap-5 transition-transform sm:hover:scale-[1.05] active:scale-[0.99]"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#071E34] flex items-center justify-center shrink-0">
              <MdOutlineShield fill="white" size={22} />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-[18px] sm:text-[19px] md:text-[20px] text-[#001F3F]">
                Security
              </h3>
              <p className="text-[#4A5565] text-[13px] sm:text-sm">
                Security personnel
              </p>
            </div>
          </Link>

        </div>
      </div>
    </main>
  );
}
