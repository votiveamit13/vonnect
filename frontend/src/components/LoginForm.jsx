"use client";

import { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, getProfileThunk } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginForm({ role, role_id }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, error: serverError } = useSelector((s) => s.auth);
  const router = useRouter();

  const validate = () => {
    const errors = {};

    if (!username.trim()) errors.username = "Username or email is required";
    if (!password.trim()) errors.password = "Password is required";

    setFieldErrors({
      username: errors.username || "",
      password: errors.password || "",
    });

    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    const res = await dispatch(loginThunk({ username, password, role_id }));

    if (res.meta.requestStatus === "fulfilled") {
      const token = res.payload.token;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      document.cookie = `token=${token}; path=/;`;
      document.cookie = `role=${role}; path=/;`;

      await dispatch(getProfileThunk());
      toast.success("Login successful");
      router.push("/building-selection");
    } else {
      toast.error(res.payload || "Login failed");
    }

  };

  return (
    <div className="bg-white rounded-2xl shadow-lg px-5 sm:px-8 py-6 sm:py-8 text-left">
      {/* Username */}
      <label className="block text-[#364153] text-[16px] mb-2">
        Username / Email
      </label>
      <div
        className={`flex items-center gap-3 border border-[#CBD5E1] rounded-xl px-4 h-[52px] sm:h-[56px] mb-1 transition focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]`}
      >
        <FiUser className="text-[#94A3B8]" size={20} />
        <input
          type="text"
          placeholder="Enter your username or email"
          className="w-full outline-none text-sm sm:text-base placeholder:text-[#0A0A0A]/50"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (fieldErrors.username)
              setFieldErrors((p) => ({ ...p, username: "" }));
          }}
        />
      </div>
      {fieldErrors.username && (
        <p className="text-red-500 text-xs mb-3">{fieldErrors.username}</p>
      )}

      {/* Password */}
      <label className="block text-[#364153] text-[16px] mb-2 mt-6">
        Password
      </label>
      <div
        className={`flex items-center gap-3 border border-[#CBD5E1] rounded-xl px-4 h-[52px] sm:h-[56px] mb-1 transition focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]`}
      >
        <FiLock className="text-[#94A3B8]" size={20} />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full outline-none text-sm sm:text-base placeholder:text-[#0A0A0A]/50"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (fieldErrors.password)
              setFieldErrors((p) => ({ ...p, password: "" }));
          }}
        />
      </div>
      {fieldErrors.password && (
        <p className="text-red-500 text-xs mb-4">{fieldErrors.password}</p>
      )}

      {/* Server Error */}
      {serverError && (
        <p className="text-red-600 text-sm mb-4">{serverError}</p>
      )}

      <button
        onClick={handleLogin}
        disabled={loading}
        className="mt-6 w-full h-[48px] sm:h-[52px] rounded-xl bg-[#001F3F] text-white font-medium hover:bg-[#003d7a] transition disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="text-center mt-5 space-y-4">
        <Link href={`/forgot-password?role=${role}`} className="text-sm text-[#001F3F]">
          <div className="mb-4">Forgot Password?</div>
        </Link>

        <hr className="text-[#E5E7EB]" />

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
  );
}
