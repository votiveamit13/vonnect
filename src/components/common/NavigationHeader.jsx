import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiUser } from "react-icons/fi";
import { LuCamera } from "react-icons/lu";

export default function NavigationHeader({
  showBack = false,
  backHref = "/",
  title = "",
  subtitle = "",
  showProfile = false,
  profileData = {},
  avatarHref,
  tabs = [],
  activeTab = "",
  baseTabHref = "",
}) {
  return (
    <div className="w-full bg-[#001F3F] text-white pb-4">
      <div className="flex items-center justify-between px-4 sm:px-6 pt-4">
        {showBack ? (
          <Link href={backHref} className="flex items-center gap-2 text-[16px] hover:opacity-80">
            <FiArrowLeft size={18} />
            Back
          </Link>
        ) : (
          <div />
        )}
      </div>

      {(title || subtitle) && (
        <div className="px-4 sm:px-6 mt-3">
          {title && <h1 className="text-[18px] sm:text-[20px]">{title}</h1>}
          {subtitle && <p className="text-[14px] text-white/70">{subtitle}</p>}
        </div>
      )}

      {showProfile && profileData?.name && (
        <div className="rounded-xl px-4 sm:px-6 mt-2 flex items-center gap-4">
          <Link
            href={avatarHref || "#"}
            className="relative w-[60px] h-[60px] sm:w-[64px] sm:h-[64px] rounded-full bg-white/10 border border-white/20 
                        flex items-center justify-center overflow-visible"
            >
            {profileData.image ? (
                <Image src={profileData.image} alt="Profile" fill className="object-cover rounded-full" />
            ) : (
                <FiUser className="text-white" size={32} />
            )}

            <div
                className="absolute -bottom-1 -right-2 w-[24px] h-[24px] rounded-full bg-white border border-[#001F3F]/20
                        text-[#001F3F] flex items-center justify-center shadow-md"
            >
                <LuCamera size={12} />
            </div>
            </Link>


          <div>
            <h3 className="text-[18px] mb-1">{profileData.name}</h3>
            <div className="flex gap-2 mt-1 flex-wrap">
              {profileData.role && (
                <span className="bg-white/20 px-3 py-1 rounded-full text-[12px]">
                  {profileData.role}
                </span>
              )}
              {profileData.unit && (
                <span className="bg-white/20 px-3 py-1 rounded-full text-[12px]">
                  {profileData.unit}
                </span>
              )}
            </div>
            {profileData.property && (
              <p className="text-[12px] text-white/70 mt-1">
                {profileData.property}
              </p>
            )}
          </div>
        </div>
      )}

      {tabs.length > 0 && (
        <div className="px-4 sm:px-6 mt-4 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Link
              key={tab}
              href={`${baseTabHref}?tab=${tab.toLowerCase()}`}
              className={`px-4 py-2 rounded-lg text-[12px] transition ${
                activeTab === tab
                  ? "bg-white text-[#001F3F]"
                  : "bg-white/10 text-white hover:bg-[#244A74]"
              }`}
            >
              {tab}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/*
<NavigationHeader
  showBack
  backHref="/owner"
  title="My Profile"
  showProfile
  profileData={{
    name: "Carlos Rodriguez",
    unit: "Tower A - Unit 405",
    property: "Ocean View Residences",
    image: "", // optional
  }}
  tabs={["Profile", "Properties", "Documents", "Notifications", "Settings", "About"]}
  activeTab="Profile"
/>

---------------------------
OTHER WAY TO USE
---------------------------
<NavigationHeader
  showBack
  backHref="/owner"
  title="Maintenance Fees"
  subtitle="Select a property to view details"
/>

*/