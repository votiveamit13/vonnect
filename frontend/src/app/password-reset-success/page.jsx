import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";

export default async function PasswordResetSuccess({ searchParams }) {
  const params = await searchParams;
  const role = params?.role || "owner";

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

      {/* Centered */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20">
        <div className="w-full max-w-lg text-center">
          <div className="bg-white rounded-2xl shadow-lg px-5 sm:px-8 py-8 sm:py-10 text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/assets/icons/success.svg"
                alt="Success"
                width={64}
                height={64}
              />
            </div>

            <h3 className="text-[24px] font-semibold text-[#001F3F] mb-2">
              Password Updated Successfully
            </h3>

            <p className="text-[#4A5565] text-[16px] mb-6">
              Your password has been updated. You can now log in using your new password.
            </p>

            <Link href={`/login?role=${role}`}>
              <button className="w-full h-[48px] sm:h-[52px] rounded-xl bg-[#001F3F] text-white font-medium hover:bg-[#003d7a] transition">
                Back to Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
