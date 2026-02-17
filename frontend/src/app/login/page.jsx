import Link from "next/link";
import { FiArrowLeft, FiUser, FiLock } from "react-icons/fi";

const roleLabels = {
  owner: "Owner",
  tenant: "Tenant",
  administration: "Administration",
  security: "Security",
};

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const role = params?.role || "owner";
  const roleLabel = roleLabels[role] || "User";

  return (
    <main className="min-h-screen w-full bg-[#001F3F] flex items-center justify-center px-4 sm:px-6 relative">
      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-5 left-4 sm:left-6 flex items-center gap-2 text-white text-[16px] hover:opacity-80"
      >
        <FiArrowLeft size={18} />
        Back
      </Link>

      <div className="w-full max-w-md sm:max-w-lg text-center">
        {/* Logo / Title */}
        <h1 className="text-white text-[28px] sm:text-[32px] md:text-[36px] font-semibold tracking-wide">
          VONNECT
        </h1>
        <p className="text-white text-[14px] sm:text-[15px] md:text-[16px] mt-2 mb-8">
          {roleLabel} Login
        </p>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg px-5 sm:px-8 py-6 sm:py-8 text-left">
          {/* Username */}
          <label className="block text-[#364153] text-[16px] mb-2">
            Username / Email
          </label>
          <div className="flex items-center gap-3 border border-[#CBD5E1] rounded-xl px-4 h-[52px] sm:h-[56px] mb-5 transition focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
            <FiUser className="text-[#94A3B8]" size={20} />
            <input
              type="text"
              placeholder="Enter your username or email"
              className="w-full outline-none text-sm sm:text-base placeholder:text-[#0A0A0A]/50"
            />
          </div>

          {/* Password */}
          <label className="block text-[#364153] text-[16px] mb-2">
            Password
          </label>
          <div className="flex items-center gap-3 border border-[#CBD5E1] rounded-xl px-4 h-[52px] sm:h-[56px] mb-6 transition focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
            <FiLock className="text-[#94A3B8]" size={20} />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full outline-none text-sm sm:text-base placeholder:text-[#0A0A0A 50%]"
            />
          </div>

          {/* Login Button */}
          <button className="w-full h-[48px] sm:h-[52px] rounded-xl bg-[#001F3F] text-white font-medium hover:bg-[#003d7a] transition">
            Login
          </button>

          {/* Links */}
          <div className="text-center mt-5 space-y-4">
            <Link
                href={`/forgot-password?role=${role}`}
                className="text-sm text-[#001F3F]"
                >
                <div className="mb-4">Forgot Password?</div>
            </Link>

            <hr className="text-[#E5E7EB]"/>
            <div className="text-sm text-[#4A5565]">
              Do not have an account?{" "}
              <Link
                href={`/register?role=${role}`}
                className="text-[#001F3F] font-medium hover:underline"
              >
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
