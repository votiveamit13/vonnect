import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const roleLabels = {
  owner: "Owner",
  tenant: "Tenant",
  administration: "Administration",
  security: "Security",
};

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;   // ✅ REQUIRED
  const role = params?.role || "owner";
  const roleLabel = roleLabels[role] || "User";

  return (
    <main className="min-h-screen w-full bg-[#001F3F] flex items-center justify-center px-4 sm:px-6 relative">
      <Link
        href="/"
        className="absolute top-5 left-4 sm:left-6 flex items-center gap-2 text-white text-[16px] hover:opacity-80"
      >
        <FiArrowLeft size={18} />
        Back
      </Link>

      <div className="w-full max-w-md sm:max-w-lg text-center">
        <h1 className="text-white text-[28px] sm:text-[32px] md:text-[36px] font-semibold tracking-wide">
          VONNECT
        </h1>
        <p className="text-white text-[14px] sm:text-[15px] md:text-[16px] mt-2 mb-8">
          {roleLabel} Login
        </p>

        <LoginForm role={role} />
      </div>
    </main>
  );
}
