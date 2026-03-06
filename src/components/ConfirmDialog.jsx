"use client";

import { FiAlertTriangle, FiX } from "react-icons/fi";

export default function ConfirmDialog({
  open,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-[420px] bg-white rounded-[14px] shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EFF0F1]">
          <div className="flex items-center gap-2 text-[#001F3F] text-[15px] font-medium">
            <FiAlertTriangle size={18} className="text-[#E7000B]" />
            {title}
          </div>

          <button
            onClick={onCancel}
            className="text-[#6A7282] hover:text-black"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Message */}
        <div className="px-5 py-5 text-[14px] text-[#364153]">
          {message}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 px-5 pb-5">
          <button
            onClick={onCancel}
            className="h-[36px] px-4 rounded-[8px] border border-[#E5E7EB] text-[#364153] text-[14px] hover:bg-gray-50"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`h-[36px] px-4 rounded-[8px] text-white text-[14px]
            ${loading ? "bg-gray-400" : "bg-[#E7000B] hover:bg-red-600"}`}
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}