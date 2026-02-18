"use client";

import { FiCamera, FiUpload } from "react-icons/fi";

export default function UploadFile({
  subtitle,
  buttonLabel = "Choose File",
  accept = "image/*",
}) {
  const isImage = accept.includes("image");

  return (
    <div className="px-4 sm:px-6 mt-6">
      <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 text-center mx-auto">
        <div className="w-24 h-24 rounded-full bg-[#F1F5F9] mx-auto flex items-center justify-center mb-4">
          {isImage ? <FiCamera size={32} /> : <FiUpload size={32} />}
        </div>

        <p className="text-[#4A5565] mb-4">{subtitle}</p>

        <label className="cursor-pointer">
          <input type="file" className="hidden" accept={accept} />
          <div className="w-full h-[45px] sm:h-[52px] rounded-xl bg-[#001F3F] text-white 
                          hover:bg-[#003d7a] transition flex items-center justify-center gap-2">
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
