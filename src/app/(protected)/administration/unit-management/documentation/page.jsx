"use client";

import { useEffect, useState } from "react";
import NavigationHeader from "@/components/common/NavigationHeader";
import { FiDownload, FiFileText, FiPlus } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteResidenceDocumentApi, getResidenceDocumentsApi, uploadResidenceDocumentApi } from "@/lib/administrator";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function Documentation() {
  const [documents, setDocuments] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [docName, setDocName] = useState("");
  const [file, setFile] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      const res = await getResidenceDocumentsApi();

      setDocuments(res.data?.data || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUpload = async () => {
    try {

      setUploading(true);

      const formData = new FormData();
      formData.append("document_name", docName);
      formData.append("document_file", file);

      await uploadResidenceDocumentApi(formData);

      // reset modal
      setDocName("");
      setFile(null);
      setShowUploadModal(false);

      // refresh list
      fetchDocuments();

    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    try {

      setDeleting(true);

      await deleteResidenceDocumentApi(selectedDocId);

      setConfirmOpen(false);
      setSelectedDocId(null);

      fetchDocuments();

    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className="min-h-screen pb-32">
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
                    {doc.document_name}
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      href={`${process.env.NEXT_PUBLIC_UPLOAD_URL}${doc.file_path}`}
                      target="_blank"
                    >
                      <FiDownload size={16} />
                    </a>
                    <button
                      className="text-[#E7000B]"
                      onClick={() => {
                        setSelectedDocId(doc.id);
                        setConfirmOpen(true);
                      }}
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
                onClick={() => {
  setShowUploadModal(false);
  setDocName("");
  setFile(null);
}}
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
                disabled={!docName || !file || uploading}
                onClick={handleUpload}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Document"
        message="Are you sure you want to delete this document? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setSelectedDocId(null);
        }}
      />
    </main>
  );
}