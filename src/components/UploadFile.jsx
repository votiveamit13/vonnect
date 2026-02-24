"use client";

import { FiCamera, FiUpload } from "react-icons/fi";
import { useState } from "react";
import { updateProfilePictureApi } from "@/lib/api";
import { useDispatch } from "react-redux";
import { getProfileThunk } from "@/store/slices/authSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UploadFile({
  subtitle,
  buttonLabel = "Choose File",
  accept = "image/*",
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const isImage = accept.includes("image");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      await updateProfilePictureApi(file);
      await dispatch(getProfileThunk());

      toast.success("Profile picture updated");

      router.replace("/owner/profile");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 mt-6">
      <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 text-center mx-auto">
        <div className="w-24 h-24 rounded-full bg-[#F1F5F9] mx-auto flex items-center justify-center mb-4">
          {isImage ? <FiCamera size={40} stroke="#99A1AF"/> : <FiUpload size={40} stroke="#99A1AF"/>}
        </div>

        <p className="text-[#4A5565] mb-4">{subtitle}</p>

        <label className="cursor-pointer">
           <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />
          <div className="w-full h-[30px] sm:h-[36px] rounded-xl bg-[#001F3F] text-white 
                          hover:opacity-90 transition flex items-center justify-center gap-2">
            {isImage ? <FiCamera /> : <FiUpload />}
            {buttonLabel}
          </div>
        </label>

        <p className="text-[#6A7282] mt-3 text-sm">
          {isImage
            ? "Accepted formats: JPG, PNG, GIF (Max 5MB)"
            : "Accepted formats: PDF, JPG, PNG (Max 10MB)"}
        </p>
      </div>
    </div>
  );
}
