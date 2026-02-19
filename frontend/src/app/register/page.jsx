import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { ROLE_TO_ID } from "@/lib/roles";

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
  const role_id = ROLE_TO_ID[role] || ROLE_TO_ID.owner;

  return (
    <main className="min-h-screen w-full bg-[#001F3F] flex items-center justify-center px-4 sm:px-6 relative pt-16 sm:pt-20">
      <Link
        href={`/login?role=${role}`}
        className="absolute top-5 left-4 sm:left-6 flex items-center gap-2 text-white text-[16px] hover:opacity-80"
      >
        <FiArrowLeft size={20} />
        Back to Login
      </Link>

      <div className="w-full max-w-md sm:max-w-lg text-center">
        <h1 className="text-white text-[28px] sm:text-[32px] md:text-[36px] font-normal tracking-wide">
          VONNECT
        </h1>
        <p className="text-white/80 text-[14px] sm:text-[15px] md:text-[16px] mt-2 mb-8">
          {roleLabel} Registration
        </p>

        <RegisterForm role={role} role_id={role_id} />
      </div>
    </main>
  );
}
