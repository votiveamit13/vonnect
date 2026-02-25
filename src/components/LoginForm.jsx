"use client";

import { useState, useEffect } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, getProfileThunk, clearError } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginForm({ role, role_id }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    password: "",
    general: "",
  });

  const dispatch = useDispatch();
  const { loading, error: serverError } = useSelector((s) => s.auth);
  const router = useRouter();

  useEffect(() => {
  dispatch(clearError());
}, []);

  useEffect(() => {
    const savedUsername = localStorage.getItem("remembered_username");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    if (serverError) {
      // map API error inline
      setFieldErrors((prev) => ({
        ...prev,
        general: serverError,
      }));
    }
  }, [serverError]);

  const validate = () => {
    const errors = {};

    if (!username.trim()) errors.username = "Username or email is required";
    if (!password.trim()) errors.password = "Password is required";

    setFieldErrors({
      username: errors.username || "",
      password: errors.password || "",
      general: "",
    });

    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    const res = await dispatch(loginThunk({ username, password, role_id }));

    if (res.meta.requestStatus === "fulfilled") {
      const token = res.payload.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (rememberMe) {
        localStorage.setItem("remembered_username", username);
      } else {
        localStorage.removeItem("remembered_username");
      }

      document.cookie = `token=${token}; path=/;`;
      document.cookie = `role=${role}; path=/;`;

      setTimeout(async () => {
        await dispatch(getProfileThunk());
        router.push("/building-selection");
      }, 50);
    }
  };


  return (
    <div className="bg-white rounded-2xl shadow-lg px-5 sm:px-8 py-6 sm:py-8 text-left">
      <label className="block text-[#364153] text-[16px] mb-2">
        Username / Email
      </label>
      <div
        className={`flex items-center gap-3 border border-[#D1D5DC] rounded-[10px] px-4 h-[52px] sm:h-[56px] mb-1 transition focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]`}
      >
        <FiUser className="text-[#99A1AF]" size={20} />
        <input
          type="text"
          placeholder="Enter your username or email"
          className="w-full outline-none text-[16px] text-black placeholder:text-[#0A0A0A]/50"
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

      <label className="block text-[#364153] text-[16px] mb-2 mt-6">
        Password
      </label>
      <div
        className={`flex items-center gap-3 border border-[#D1D5DC] rounded-[10px] px-4 h-[52px] sm:h-[56px] mb-1 transition focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]`}
      >
        <FiLock className="text-[#94A3B8]" size={20} />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="w-full outline-none text-[16px] text-black placeholder:text-[#0A0A0A]/50"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (fieldErrors.password)
              setFieldErrors((p) => ({ ...p, password: "" }));
          }}
        />

        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="text-[#99A1AF] hover:text-[#001F3F] transition"
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>
      {fieldErrors.password && (
        <p className="text-red-500 text-xs mb-4">{fieldErrors.password}</p>
      )}

      {serverError && (
        <p className="text-red-600 text-sm mb-4">{serverError}</p>
      )}
      <div className="flex items-center gap-2 mb-2 mt-6">
        <input
          id="remember"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 rounded border-[#CBD5E1] text-[#001F3F] focus:ring-[#001F3F]"
        />
        <label htmlFor="remember" className="text-[#364153] text-[16px] cursor-pointer">
          Remember me
        </label>
      </div>
      <button
        onClick={handleLogin}
        disabled={loading}
        className="mt-6 w-full h-[48px] sm:h-[52px] rounded-[10px] bg-[#001F3F] text-white hover:bg-[#003d7a] transition disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="text-center mt-5 space-y-4">
        <Link href={`/forgot-password?role=${role}`} className="text-[14px] text-[#001F3F]">
          <div className="mb-4">Forgot Password?</div>
        </Link>
        {role !== "administration" && (
          <>
            <hr className="text-[#E5E7EB]" />

            <div className="text-[16px] text-[#4A5565]">
              Do not have an account?{" "}
              <Link
                href={`/register?role=${role}`}
                className="text-[#001F3F] hover:underline"
              >
                Register here
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
