"use client";

import { useState } from "react";
import NavigationHeader from "@/components/common/NavigationHeader";
import toast from "react-hot-toast";
import api from "@/lib/api";

export default function ChangePasswordView() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = (key) => (e) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));

    // 🔥 clear inline error on typing
    if (errors[key]) {
      setErrors((p) => ({ ...p, [key]: "" }));
    }
  };

  const validate = () => {
    const e = {};

    if (!form.currentPassword.trim())
      e.currentPassword = "Current password is required";

    if (!form.newPassword.trim())
      e.newPassword = "New password is required";
    else if (form.newPassword.length < 8)
      e.newPassword = "Min 8 characters required";

    if (!form.confirmPassword.trim())
      e.confirmPassword = "Confirm password is required";
    else if (form.confirmPassword !== form.newPassword)
      e.confirmPassword = "Passwords do not match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await api.post("/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      toast.success("Password changed successfully 🔐");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to change password";

      // backend messages like: "Current password is incorrect"
      if (msg.toLowerCase().includes("current")) {
        setErrors((p) => ({ ...p, currentPassword: msg }));
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#F5F7FA]">
      <NavigationHeader
        showBack
        backHref="/owner/profile?tab=settings"
        title="Change Password"
        subtitle="Update your account password"
      />

      <div className="px-4 sm:px-6 mt-6">
        <div className="bg-white rounded-[16px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.25)] p-4 sm:p-6 mx-auto">

          {/* Current Password */}
          <div className="mb-3">
            <label className="block text-[12px] text-[#364153] mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={form.currentPassword}
              onChange={onChange("currentPassword")}
              placeholder="Enter current password"
              className="w-full h-[44px] border border-[#D1D5DC] rounded-[10px] px-4 text-[14px] outline-none focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]"
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.currentPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="mb-3">
            <label className="block text-[12px] text-[#364153] mb-1">
              New Password
            </label>
            <input
              type="password"
              value={form.newPassword}
              onChange={onChange("newPassword")}
              placeholder="Enter new password"
              className="w-full h-[44px] border border-[#D1D5DC] rounded-[10px] px-4 text-[14px] outline-none focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <label className="block text-[12px] text-[#364153] mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={onChange("confirmPassword")}
              placeholder="Confirm new password"
              className="w-full h-[44px] border border-[#D1D5DC] rounded-[10px] px-4 text-[14px] outline-none focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-[40px] rounded-[12px] bg-[#001F3F] text-[14px] text-white hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </main>
  );
}