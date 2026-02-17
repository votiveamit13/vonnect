import Link from "next/link";
import { FiArrowLeft, FiLock } from "react-icons/fi";

export default async function ResetPasswordPage({ searchParams }) {
  const params = await searchParams;
  const role = params?.role || "owner";
  const token = params?.token || "";

  return (
    <main className="min-h-screen w-full bg-[#001F3F] relative">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full h-14 sm:h-16 flex items-center px-4 sm:px-6">
        <Link
          href={`/login?role=${role}`}
          className="flex items-center gap-2 text-white text-[16px] hover:opacity-80"
        >
          <FiArrowLeft size={18} />
          Back to Login
        </Link>
      </div>

      {/* Centered Content */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20">
        <div className="w-full max-w-lg text-center">
          {/* Title */}
          <h1 className="text-white text-[28px] sm:text-[32px] md:text-[36px] font-semibold tracking-wide">
            VONNECT
          </h1>
          <p className="text-white text-[14px] sm:text-[15px] md:text-[16px] mt-2 mb-8">
            Set New Password
          </p>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg px-5 sm:px-8 py-6 sm:py-8 text-left">
            <p className="text-[#364153] text-[16px] mb-6">
              Please enter your new password below.
            </p>

            {/* New Password */}
            <label className="block text-[#364153] text-[16px] mb-2">
              New Password
            </label>
            <div className="group flex items-center gap-3 border border-[#CBD5E1] rounded-xl px-4 h-[52px] sm:h-[56px] mb-5 transition
                            focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
              <FiLock className="text-[#94A3B8] group-focus-within:text-[#001F3F]" size={18} />
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full outline-none text-sm sm:text-base placeholder:text-[#0A0A0A]/50 bg-transparent"
              />
            </div>

            {/* Confirm Password */}
            <label className="block text-[#364153] text-[16px] mb-2">
              Confirm New Password
            </label>
            <div className="group flex items-center gap-3 border border-[#CBD5E1] rounded-xl px-4 h-[52px] sm:h-[56px] mb-6 transition
                            focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
              <FiLock className="text-[#94A3B8] group-focus-within:text-[#001F3F]" size={18} />
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full outline-none text-sm sm:text-base placeholder:text-[#0A0A0A]/50 bg-transparent"
              />
            </div>

            {/* Hidden token (for later form submit) */}
            <input type="hidden" name="token" value={token} />

            {/* Submit */}
            <Link href={`/password-reset-success?role=${role}`} className="block">
              <button
                className="w-full h-[48px] sm:h-[52px] rounded-xl bg-[#001F3F] text-white font-medium 
                           hover:bg-[#002040] active:bg-[#002040] transition"
              >
                Update Password
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
