"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { resetPasswordApi } from "@/lib/api";

export default function ResetPassword() {
  const params = useSearchParams();
  const role = params.get("role") || "owner";
  const { token } = useParams();

  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#001F3F] text-white">
        Invalid or expired reset link.
      </main>
    );
  }

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    password: "",
    confirm: "",
    server: "",
  });

  const router = useRouter();

  const handleSubmit = async () => {
    const e = { password: "", confirm: "", server: "" };

    if (!password.trim()) e.password = "Password is required";
    if (!confirm.trim()) e.confirm = "Confirm password is required";
    if (password && confirm && password !== confirm)
      e.confirm = "Passwords do not match";

    setErrors(e);

    if (e.password || e.confirm) return;

    try {
      setLoading(true);
      await resetPasswordApi(token, password, confirm);
      router.push(`/password-reset-success?role=${role}`);
    } catch (err) {
      setErrors((p) => ({
        ...p,
        server: err.response?.data?.message || "Reset failed",
      }));
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen w-full bg-[#001F3F] relative">
      <div className="absolute top-0 left-0 w-full h-14 sm:h-16 flex items-center px-4 sm:px-6">
        <Link href={`/login?role=${role}`} className="flex items-center gap-2 text-white text-[16px] hover:opacity-80">
          <FiArrowLeft size={18} />
          Back to Login
        </Link>
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20">
        <div className="w-full max-w-md text-center">
          <h1 className="text-white text-[28px] sm:text-[32px] md:text-[36px] tracking-wide">
            VONNECT
          </h1>

          <p className="text-white text-[14px] sm:text-[15px] md:text-[16px] mt-2 mb-8">
            Set New Password
          </p>

          <div className="bg-white rounded-2xl shadow-lg px-5 sm:px-8 py-6 sm:py-8 text-left">
            <div className="mb-4">
            <label className="block text-[#364153] mb-2">New Password</label>
            <div className="group flex items-center gap-3 border border-[#CBD5E1] rounded-xl px-4 h-[52px] mb-1 focus-within:ring-2 focus-within:ring-[#001F3F]">
              <FiLock size={18} className="text-[#94A3B8]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((p) => ({ ...p, password: "" }));
                }}
                className="w-full outline-none text-[16px] text-black bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-[#99A1AF] hover:text-[#001F3F] transition"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
             {errors.password && <p className="text-red-500 text-xs mb-3">{errors.password}</p>}
            </div>
            <div className="mb-4">
            <label className="block text-[#364153] mb-2">Confirm New Password</label>
            <div className="group flex items-center gap-3 border border-[#CBD5E1] rounded-xl px-4 h-[52px] mb-1 focus-within:ring-2 focus-within:ring-[#001F3F]">
              <FiLock size={18} className="text-[#94A3B8]" />
              <input
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirm new password"
                onChange={(e) => {
                  setConfirm(e.target.value);
                  if (errors.confirm) setErrors((p) => ({ ...p, confirm: "" }));
                }}
                className="w-full outline-none text-[16px] text-black bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="text-[#99A1AF] hover:text-[#001F3F] transition"
              >
                {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {errors.confirm && <p className="text-red-500 text-xs mb-3">{errors.confirm}</p>}
            </div>
            {errors.server && <p className="text-red-600 text-sm mb-4">{errors.server}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-[48px] sm:h-[52px] rounded-xl bg-[#001F3F] text-white hover:bg-[#003d7a]"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}