import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";

export default async function EmailVerifiedPage({ searchParams }) {
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

      {/* Centered Content */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20">
        <div className="w-full max-w-lg text-center">
          <div className="bg-white rounded-2xl shadow-lg px-5 sm:px-8 py-8 sm:py-10 text-center">
            
            <div className="flex justify-center mb-5">
              <div className="rounded-full bg-green-100 flex items-center justify-center">
                <Image
                  src="/assets/icons/success.svg"
                  alt="Verified"
                  width={62}
                  height={62}
                />
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-medium text-[#001F3F] mb-2">
              Email Verified Successfully
            </h3>

            <p className="text-sm sm:text-base text-[#4A5565] mb-8">
              Your email address has been successfully verified.  
              You can now log in to your account and continue.
            </p>

            <Link href={`/login?role=${role}`}>
              <button
                className="w-full h-[48px] sm:h-[52px] rounded-xl bg-[#001F3F] text-white font-medium 
                           hover:bg-[#002040] active:bg-[#002040] transition"
              >
                Back to Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
