import Link from "next/link";
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";

const roleLabels = {
  owner: "Owner",
  tenant: "Tenant",
  administration: "Administration",
  security: "Security",
};

export default async function RegisterPage({ searchParams }) {
  const params = await searchParams; 
  const role = params?.role || "owner";
  const roleLabel = roleLabels[role] || "User";

  return (
    <main className="min-h-screen w-full bg-[#001F3F] flex items-center justify-center px-4 sm:px-6 relative pt-16 sm:pt-20">

      {/* Back */}
      <Link
        href={`/login?role=${role}`}
        className="absolute top-5 left-4 sm:left-6 flex items-center gap-2 text-white text-[16px] hover:opacity-80"
      >
        <FiArrowLeft size={18} />
        Back to Login
      </Link>

      <div className="w-full max-w-md sm:max-w-lg text-center">
        {/* Logo / Title */}
        <h1 className="text-white text-[28px] sm:text-[32px] md:text-[36px] font-semibold tracking-wide">
          VONNECT
        </h1>
        <p className="text-white text-[14px] sm:text-[15px] md:text-[16px] mt-2 mb-8">
          {roleLabel} Registration
        </p>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg px-5 sm:px-8 py-6 sm:py-8 text-left mb-4">
          {/* Full Name */}
          <label className="block text-[#364153] text-[16px] mb-2">Full Name</label>
          <div className="group flex items-center gap-3 border border-[#CBD5E1] rounded-xl px-4 h-[52px] sm:h-[56px] mb-5 transition
                          focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
            <FiUser className="text-[#94A3B8] group-focus-within:text-[#001F3F]" size={18} />
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full outline-none text-sm sm:text-base placeholder:text-[#0A0A0A]/50 bg-transparent"
            />
          </div>

          {/* Email */}
          <label className="block text-[#364153] text-[16px] mb-2">Email</label>
          <div className="group flex items-center gap-3 border border-[#CBD5E1] rounded-xl px-4 h-[52px] sm:h-[56px] mb-5 transition
                          focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
            <FiMail className="text-[#94A3B8] group-focus-within:text-[#001F3F]" size={18} />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full outline-none text-sm sm:text-base placeholder:text-[#0A0A0A]/50 bg-transparent"
            />
          </div>

          {/* Phone */}
          <label className="block text-[#364153] text-[16px] mb-2">Phone</label>
          <div className="group flex items-center gap-3 border border-[#CBD5E1] rounded-xl px-4 h-[52px] sm:h-[56px] mb-5 transition
                          focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
            <FiPhone className="text-[#94A3B8] group-focus-within:text-[#001F3F]" size={18} />
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full outline-none text-sm sm:text-base placeholder:text-[#0A0A0A]/50 bg-transparent"
            />
          </div>

          {/* Username */}
          <label className="block text-[#364153] text-[16px] mb-2">Username</label>
          <div className="group flex items-center gap-3 border border-[#CBD5E1] rounded-xl px-4 h-[52px] sm:h-[56px] mb-5 transition
                          focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
            <FiUser className="text-[#94A3B8] group-focus-within:text-[#001F3F]" size={18} />
            <input
              type="text"
              placeholder="Choose a username"
              className="w-full outline-none text-sm sm:text-base placeholder:text-[#0A0A0A]/50 bg-transparent"
            />
          </div>

          {/* Password */}
          <label className="block text-[#364153] text-[16px] mb-2">Password</label>
          <div className="group flex items-center gap-3 border border-[#CBD5E1] rounded-xl px-4 h-[52px] sm:h-[56px] mb-5 transition
                          focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
            <FiLock className="text-[#94A3B8] group-focus-within:text-[#001F3F]" size={18} />
            <input
              type="password"
              placeholder="Create a password"
              className="w-full outline-none text-sm sm:text-base placeholder:text-[#0A0A0A]/50 bg-transparent"
            />
          </div>

          {/* Confirm Password */}
          <label className="block text-[#364153] text-[16px] mb-2">Confirm Password</label>
          <div className="group flex items-center gap-3 border border-[#CBD5E1] rounded-xl px-4 h-[52px] sm:h-[56px] mb-6 transition
                          focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
            <FiLock className="text-[#94A3B8] group-focus-within:text-[#001F3F]" size={18} />
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full outline-none text-sm sm:text-base placeholder:text-[#0A0A0A]/50 bg-transparent"
            />
          </div>

          {/* Submit */}
          <button className="w-full h-[48px] sm:h-[52px] rounded-xl bg-[#001F3F] text-white font-medium hover:bg-[#003d7a] transition">
            Create Account
          </button>
        </div>
      </div>
    </main>
  );
}
