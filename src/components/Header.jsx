"use client";
import { useDispatch, useSelector } from "react-redux";
import { logout, getProfileThunk } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiBell, FiLogOut, FiUser } from "react-icons/fi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { selectRoleName, selectBuildingName } from "@/store/selectors";

export default function Header({ showWelcomeCard }) {
  const user = useSelector((s) => s.auth.user);
  const token = useSelector((s) => s.auth.token);
  const dispatch = useDispatch();
  const router = useRouter();
  const UPLOAD_URL = process.env.NEXT_PUBLIC_UPLOAD_URL;
  const roleName = useSelector((s) => selectRoleName(s, user?.role_id));
  const buildingId = user?.assignments?.[0]?.building_id;
  const buildingName = useSelector((s) => selectBuildingName(s, buildingId));
  
  useEffect(() => {
    if (!user && token) {
      dispatch(getProfileThunk());
    }
  }, [user, token, dispatch]);

  const avatarUrl = user?.details?.profile_picture
    ? `${UPLOAD_URL}${user.details.profile_picture}`
    : null;

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/");
    toast.success("Logout Successful");
  };
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#001F3F]">
      <div className="mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-[20px] sm:text-[24px] tracking-wide">
            VONNECT
          </h1>

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="relative text-white hover:opacity-80 transition">
              <FiBell size={24} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500" />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white text-[14px] hover:opacity-80 transition"
            >
              <FiLogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {showWelcomeCard && (
          <Link href={`/owner/profile`} className="text-sm text-[#001F3F]">
            <div className="mt-2 sm:mt-4 rounded-2xl backdrop-blur-md px-4 sm:px-4 py-4 flex items-center gap-4 hover:bg-white/10">
              <div className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={user?.name || "User"}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUser className="text-[#001F3F]" size={24} />
                )}
              </div>

              <div className="text-white">
                <p className="text-[14px] text-white/70">Welcome,</p>
                <p className="text-[16px]">{user?.name || ""}</p>
                <p className="text-[14px] text-white/80">
                  {roleName === "Administration" ? (
                    <>Administrator - {buildingName || ""}</>
                  ) : (
                    <>{user?.details?.unit_id || ""} - {buildingName || ""}</>
                  )}
                </p>
              </div>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}
