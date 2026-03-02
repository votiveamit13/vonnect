"use client";

import { useState } from "react";
import NavigationHeader from "@/components/common/NavigationHeader";
import { FiDownload, FiFileText, FiPlus } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

export default function Documentation() {
  const [documents, setDocuments] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [docName, setDocName] = useState("");
  const [file, setFile] = useState(null);

  return (
    <main className="min-h-screen bg-[#F3F4F6] pb-32">

      {/* Header */}
      <NavigationHeader
        showBack
        backHref="/administration/unit-management"
        title="Documentation"
        subtitle="Manage residence documents"
      />

      {/* Content */}
      <div className="px-4 mt-4 space-y-4">

        <div className="bg-white rounded-[12px] shadow-sm border border-[#E5E7EB] overflow-hidden">

          {/* Section Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#001F3F] text-white text-[14px]">
            <FiFileText size={16} />
            Documents
          </div>

          {/* Empty State */}
          {documents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <FiFileText size={48} className="text-[#D1D5DC] mb-3" />
              <p className="text-[#6A7282] text-[14px]">
                No documents uploaded yet
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between px-4 h-[54px] rounded-[10px] border border-[#E5E7EB] bg-[#F9FAFB]"
                >
                  <div className="flex items-center gap-2 text-[#364153] text-[13px] truncate">
                    <FiFileText size={16} className="text-[#001F3F]" />
                    {doc.name}
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="text-[#001F3F] hover:scale-110 transition">
                      <FiDownload size={16} />
                    </button>
                    <button
                      className="text-[#E7000B] hover:scale-110 transition"
                      onClick={() =>
                        setDocuments((prev) =>
                          prev.filter((d) => d.id !== doc.id)
                        )
                      }
                    >
                      <RiDeleteBinLine size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Upload Button */}
      <button
                        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 h-[56px] rounded-full bg-[#001F3F] text-white text-[14px] shadow-lg hover:bg-[#036] transition"
        onClick={() => setShowUploadModal(true)}
      >
        <FiPlus size={18} />
        Upload Document
      </button>

      {/* Modal */}
      {showUploadModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
                    <div className="w-full max-w-[448px] bg-white rounded-[10px] shadow-xl overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 bg-[#001F3F] text-white">
                            <div>
                                <p className="text-[14px]">Upload New Document</p>
                                <p className="text-[12px] text-white/80">Residence Documentation</p>
                            </div>

                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="hover:opacity-80"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-[12px] text-[#4A5565] mb-1">
                                    Document Name *
                                </label>
                                <input
                                    value={docName}
                                    onChange={(e) => setDocName(e.target.value)}
                                    placeholder="Enter document name"
                                    className="w-full h-[44px] px-3 rounded-[10px] border border-[#D1D5DC] text-black placeholder:text-[#0A0A0A]/50 outline-none transition focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]"
                                />
                            </div>

                            <div>
                                <label className="block text-[12px] text-[#4A5565] mb-1">
                                    Choose File *
                                </label>

                                <label className="w-full h-[44px] px-3 rounded-[8px] border border-[#D1D5DC] flex items-center gap-2 cursor-pointer">
                                    <span className="inline-flex items-center gap-2 px-3 h-[28px] rounded-full bg-[#001F3F] text-white text-[12px]">
                                        Choose File
                                    </span>

                                    <span className="text-[13px] text-[#6A7282] truncate max-w-[180px]">
                                        {file ? file.name : "No file chosen"}
                                    </span>

                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => setFile(e.target.files?.[0])}
                                    />
                                </label>
                            </div>

                            <button
                                className="w-full h-[46px] rounded-[10px] bg-[#001F3F] text-white text-[14px] hover:bg-[#036] transition disabled:opacity-50"
                                disabled={!docName || !file}
                                onClick={() => {
                                    const newDoc = {
                                        id: Date.now(),
                                        name: docName,
                                    };

                                    setDocuments((prev) => [newDoc, ...prev]);
                                    setShowUploadModal(false);
                                    setDocName("");
                                    setFile(null);
                                }}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}

    </main>
  );
}