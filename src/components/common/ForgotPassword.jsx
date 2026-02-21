"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { forgotPasswordApi } from "@/lib/api";

export default function ForgotPassword() {
  const params = useSearchParams();
  const role = params.get("role") || "owner";
  const sent = params.get("sent") === "1";

  const [email, setEmail] = useState(params.get("email") || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email) return toast.error("Email is required");

    try {
      setLoading(true);
      await forgotPasswordApi(email);

      toast.success("Reset link sent to your email ✉️");
      router.push(`/forgot-password?role=${role}&sent=1&email=${email}`);
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

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
          {!sent ? (
            <>
              <h1 className="text-white text-[28px] sm:text-[32px] md:text-[36px] font-semibold tracking-wide">
                VONNECT
              </h1>
              <p className="text-white text-[14px] sm:text-[15px] md:text-[16px] mt-2 mb-8">
                Reset Your Password
              </p>

              <div className="bg-white rounded-2xl shadow-lg px-5 sm:px-8 py-6 sm:py-8 text-left">
                <p className="text-[#4A5565] text-[16px] mb-5">
                  Enter your email address and we will send you a link to reset your password.
                </p>

                <label className="block text-[#364153] text-[16px] mb-2">
                  Email Address
                </label>

                <div className="group flex items-center gap-3 border border-[#CBD5E1] rounded-xl px-4 h-[52px] sm:h-[56px] mb-6 focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
                  <FiMail className="text-[#94A3B8]" size={18} />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full outline-none text-sm sm:text-base bg-transparent"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full h-[48px] sm:h-[52px] rounded-xl bg-[#001F3F] text-white hover:bg-[#003d7a] transition"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg px-5 sm:px-8 py-6 sm:py-8 text-left">
              <div className="flex justify-center mb-4">
                <Image src="/assets/icons/success.svg" alt="Success" width={62} height={62} />
              </div>

              <h3 className="text-center text-[24px] font-medium text-[#001F3F] mb-2">
                Check Your Email
              </h3>

              <p className="text-center text-[16px] text-[#4A5565] mb-6">
                We have sent a password reset link to{" "}
                <span className="font-medium text-[#001F3F]">{email}</span>.
              </p>

              <Link href={`/login?role=${role}`}>
                <button className="w-full h-[48px] sm:h-[52px] rounded-xl bg-[#001F3F] text-white hover:bg-[#003d7a] transition">
                  Back to Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}