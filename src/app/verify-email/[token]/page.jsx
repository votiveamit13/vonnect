"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import { useParams, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/lib/api";

export default function EmailVerifiedPage() {
  const { token } = useParams();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "owner";

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await api.post(`/verify-email/${token}`);
        setVerified(true);
        toast.success("Email verified successfully 🎉");
      } catch (err) {
        toast.error(err.response?.data?.message || "Verification failed");
      } finally {
        setLoading(false);
      }
    };

    if (token) verifyEmail();
  }, [token]);

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

      {/* Content */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20">
        <div className="w-full max-w-lg text-center">
          <div className="bg-white rounded-2xl shadow-lg px-5 sm:px-8 py-8 sm:py-10 text-center">

            {loading ? (
              <p className="text-[#4A5565]">Verifying your email...</p>
            ) : verified ? (
              <>
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
                  You can now log in after your building admin approves your request.
                </p>

                <Link href={`/login?role=${role}`}>
                  <button className="w-full h-[48px] sm:h-[52px] rounded-xl bg-[#001F3F] text-white font-medium hover:bg-[#002040] transition">
                    Back to Login
                  </button>
                </Link>
              </>
            ) : (
              <>
                <h3 className="text-lg sm:text-xl font-medium text-red-600 mb-2">
                  Verification Failed
                </h3>
                <p className="text-sm text-[#4A5565]">
                  The verification link is invalid or expired.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}