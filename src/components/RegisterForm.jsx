"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { signupThunk } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getBuildings } from "@/lib/api";


export default function RegisterForm({ role, role_id }) {
  const dispatch = useDispatch();
  const { loading, error: serverError } = useSelector((s) => s.auth);
  const router = useRouter();

  const [buildings, setBuildings] = useState([]);
  const [loadingBuildings, setLoadingBuildings] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    building_id: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        setLoadingBuildings(true);
        const res = await getBuildings();
        setBuildings(res.data?.data || []);
      } catch (e) {
        toast.error("Failed to load buildings");
      } finally {
        setLoadingBuildings(false);
      }
    };

    fetchBuildings();
  }, []);

  const onChange = (key) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setForm((p) => ({ ...p, [key]: value }));

    if (errors[key]) {
      setErrors((p) => ({ ...p, [key]: "" }));
    }

    if (key === "password" || key === "confirmPassword") {
      setErrors((p) => ({ ...p, confirmPassword: "" }));
    }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.phone.trim()) e.phone = "Phone Number is required";
    if (!form.username.trim()) e.username = "Username is required";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Min 6 characters";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    if (!form.building_id) e.building_id = "Select a building";
    if (!form.terms) e.terms = "Accept terms to continue";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      username: form.username,
      password: form.password,
      role_id,
      building_id: form.building_id,
      accepted_terms: form.terms,
    };

    const res = await dispatch(signupThunk(payload));

    if (res.meta.requestStatus === "fulfilled") {
      // localStorage.setItem("token", res.payload.token);
      // localStorage.setItem("role", role);
      // document.cookie = `token=${res.payload.token}; path=/;`;

      // toast.success("Registration successful");
      // router.push("/building-selection");
      toast.success("Registration successful. Check your email to verify your account ✉️");
      router.push(`/login?role=${role}`);
    } else {
      toast.error(res.payload || "Signup failed");
    }
  };


  return (
    <div className="bg-white rounded-2xl shadow-lg px-5 sm:px-8 py-6 sm:py-8 text-left mb-4">

      {/* Building Select */}
      <div className="mb-4">
        <label className="block text-[#364153] text-[16px] mb-2">Select Building</label>
        <div className="group flex items-center gap-3 border border-[#D1D5DC] rounded-[10px] px-4 h-[52px] mb-1 focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
          <LuBuilding2 className="text-[#99A1AF]" size={20} />
          <select
            value={form.building_id}
            onChange={onChange("building_id")}
            className="w-full outline-none text-[16px] bg-transparent"
          >
            <option value="">Select building</option>
            {buildings.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        {errors.building_id && (
          <p className="text-red-500 text-xs mb-3">{errors.building_id}</p>
        )}
      </div>
      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-[#364153] text-[16px] mb-2">Full Name</label>
        <div className="group flex items-center gap-3 border border-[#D1D5DC] rounded-[10px] px-4 h-[52px] sm:h-[56px] mb-1 transition focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
          <FiUser className="text-[#99A1AF]" size={20} />
          <input type="text" placeholder="Enter your full name" className="w-full outline-none text-[16px] placeholder:text-[#0A0A0A]/50 bg-transparent" value={form.name} onChange={onChange("name")} />
        </div>
        {errors.name && <p className="text-red-500 text-xs mb-3">{errors.name}</p>}
      </div>
      {/* Email */}
      <div className="mb-4">
        <label className="block text-[#364153] text-[16px] mb-2">Email</label>
        <div className="group flex items-center gap-3 border border-[#D1D5DC] rounded-[10px] px-4 h-[52px] sm:h-[56px] mb-1 transition focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
          <FiMail className="text-[#99A1AF]" size={20} />
          <input type="email" placeholder="Enter your email" className="w-full outline-none text-[16px] placeholder:text-[#0A0A0A]/50 bg-transparent" value={form.email} onChange={onChange("email")} />
        </div>
        {errors.email && <p className="text-red-500 text-xs mb-3">{errors.email}</p>}
      </div>
      {/* Phone */}
      <div className="mb-4">
        <label className="block text-[#364153] text-[16px] mb-2">Phone</label>
        <div className="group flex items-center gap-3 border border-[#D1D5DC] rounded-[10px] px-4 h-[52px] sm:h-[56px] mb-1 transition focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
          <FiPhone className="text-[#99A1AF]" size={20} />
          <input type="tel" placeholder="Enter your phone number" className="w-full outline-none text-[16px] placeholder:text-[#0A0A0A]/50 bg-transparent" value={form.phone} onChange={onChange("phone")} />
        </div>
        {errors.phone && <p className="text-red-500 text-xs mb-3">{errors.phone}</p>}
      </div>
      {/* Username */}
      <div className="mb-4">
        <label className="block text-[#364153] text-[16px]">Username</label>
        <div className="group flex items-center gap-3 border border-[#D1D5DC] rounded-[10px] px-4 h-[52px] sm:h-[56px] mb-1 transition focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
          <FiUser className="text-[#99A1AF]" size={20} />
          <input type="text" placeholder="Choose a username" className="w-full outline-none text-[16px] placeholder:text-[#0A0A0A]/50 bg-transparent" value={form.username} onChange={onChange("username")} />
        </div>
        {errors.username && <p className="text-red-500 text-xs mb-3">{errors.username}</p>}
      </div>
      {/* Password */}
      <div className="mb-4">
        <label className="block text-[#364153] text-[16px] mb-2">Password</label>
        <div className="group flex items-center gap-3 border border-[#D1D5DC] rounded-[10px] px-4 h-[52px] sm:h-[56px] mb-1 transition focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
          <FiLock className="text-[#99A1AF]" size={20} />
          <input type="password" placeholder="Create a password" className="w-full outline-none text-[16px] placeholder:text-[#0A0A0A]/50 bg-transparent" value={form.password} onChange={onChange("password")} />
        </div>
        {errors.password && <p className="text-red-500 text-xs mb-3">{errors.password}</p>}
      </div>
      {/* Confirm Password */}
      <div className="mb-4">
        <label className="block text-[#364153] text-[16px] mb-2">Confirm Password</label>
        <div className="group flex items-center gap-3 border border-[#D1D5DC] rounded-[10px] px-4 h-[52px] sm:h-[56px] mb-1 transition focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
          <FiLock className="text-[#99A1AF]" size={20} />
          <input type="password" placeholder="Confirm your password" className="w-full outline-none text-[16px] placeholder:text-[#0A0A0A]/50 bg-transparent" value={form.confirmPassword} onChange={onChange("confirmPassword")} />
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-xs mb-3">{errors.confirmPassword}</p>}
      </div>
      {/* Terms */}
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-4">
          <input id="terms" type="checkbox" className="mt-1 h-4 w-4 rounded border-[#CBD5E1] text-[#001F3F] focus:ring-[#001F3F]" checked={form.terms} onChange={onChange("terms")} />
          <label htmlFor="terms" className="text-sm text-[#4A5565] leading-relaxed">
            I have read and agree to the{" "}
            <Link href="/terms" className="text-[#001F3F] font-medium hover:underline">Terms and Conditions</Link> and{" "}
            <Link href="/user-agreement" className="text-[#001F3F] font-medium hover:underline">User Agreement</Link>.
          </label>
        </div>
        {errors.terms && <p className="text-red-500 text-xs mb-4">{errors.terms}</p>}
      </div>
      {serverError && <p className="text-red-600 text-sm mb-4">{serverError}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full h-[48px] sm:h-[52px] rounded-[10px] bg-[#001F3F] text-white hover:bg-[#003d7a] transition disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </div>
  );
}
