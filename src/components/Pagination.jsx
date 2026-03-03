"use client";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (!totalPages || totalPages <= 1) return null; // 🔥 hide if only 1 page

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
      >
        Prev
      </button>

      <span className="text-sm text-[#001F3F] font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
      >
        Next
      </button>
    </div>
  );
}