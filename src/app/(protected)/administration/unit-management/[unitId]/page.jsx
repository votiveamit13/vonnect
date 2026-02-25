"use client";

import InfoCard from "@/components/common/InfoCard";
import NavigationHeader from "@/components/common/NavigationHeader";
import Tabs from "@/components/common/Tabs";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiHome, FiUser, FiCheckCircle, FiChevronRight, FiPlus, FiFileText } from "react-icons/fi";
import { LuBuilding2, LuCar } from "react-icons/lu";

export default function UnitDetailsPage() {
    const [activeTab, setActiveTab] = useState("unit");
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [docName, setDocName] = useState("");
    const [file, setFile] = useState(null);
    const [documents, setDocuments] = useState([]);

    return (
        <main className="min-h-screen bg-[#F5F7FA]">
            <NavigationHeader
                showBack
                backHref="/administration/unit-management"
                title="Unit 101"
                subtitle="Building A"
            />

            <Tabs
                active={activeTab}
                onChange={setActiveTab}
                tabs={[
                    { key: "unit", label: "Unit" },
                    { key: "parking", label: "Parking Space" },
                    { key: "family", label: "Family Members" },
                    { key: "documents", label: "Documents" },
                ]}
            />

            {activeTab === "unit" && (
                <InfoCard
                    title="Residential Unit"
                    icon={<LuBuilding2 size={16} />}
                    footer={
                        <div className="pt-3 border-t border-[#EFF0F1] space-y-4">
                            <div>
                                <p className="text-[#4A5565] text-[12px] mb-1">Occupancy Status</p>
                                <div className="flex items-center gap-2">
                                    <FiUser size={16} className="text-[#0A0A0A]" />
                                    <span className="px-2 py-[6px] text-[12px] rounded-[4px] bg-[#DBEAFE] text-[#193CB8]">
                                        Owner Occupied
                                    </span>
                                </div>
                            </div>

                            <div>
                                <p className="text-[#4A5565] text-[12px] mb-1">Maintenance Fee Status</p>
                                <div className="flex items-center gap-2">
                                    <FiCheckCircle size={16} className="text-[#0A0A0A]" />
                                    <span className="px-2 py-[6px] text-[12px] rounded-[4px] bg-[#DCFCE7] text-[#016630]">
                                        Paid
                                    </span>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <p className="text-[#4A5565] text-[12px]">Unit Type</p>
                            <p className="text-[#001F3F] text-[14px]">Residential Unit</p>
                        </div>

                        <div>
                            <p className="text-[#4A5565] text-[12px]">Building</p>
                            <p className="text-[#001F3F] text-[14px]">Building A</p>
                        </div>

                        <div>
                            <p className="text-[#4A5565] text-[12px]">Square Meters</p>
                            <p className="text-[#001F3F] text-[14px]">120 m²</p>
                        </div>

                        <div>
                            <p className="text-[#4A5565] text-[12px]">Coefficient</p>
                            <p className="text-[#001F3F] text-[14px]">2.50%</p>
                        </div>
                    </div>
                </InfoCard>
            )}

            {activeTab === "parking" && (
                <InfoCard
                    title="Parking Space"
                    icon={<LuCar size={16} />}
                    footer={
                        <div className="pt-3 border-t border-[#EFF0F1] space-y-4">
                            {/* Occupancy */}
                            <div>
                                <p className="text-[#4A5565] text-[12px] mb-1">Occupancy Status</p>
                                <div className="flex items-center gap-2">
                                    <FiUser size={16} className="text-[#0A0A0A]" />
                                    <span className="px-2 py-[6px] text-[12px] rounded-[4px] bg-[#DBEAFE] text-[#193CB8]">
                                        Owner Occupied
                                    </span>
                                </div>
                            </div>

                            {/* Maintenance */}
                            <div>
                                <p className="text-[#4A5565] text-[12px] mb-1">Maintenance Fee Status</p>
                                <div className="flex items-center gap-2">
                                    <FiCheckCircle size={16} className="text-[#0A0A0A]" />
                                    <span className="px-2 py-[6px] text-[12px] rounded-[4px] bg-[#DCFCE7] text-[#016630]">
                                        Paid
                                    </span>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <p className="text-[#4A5565] text-[12px]">Unit Type</p>
                            <p className="text-[#001F3F] text-[14px]">Parking Space</p>
                        </div>

                        <div>
                            <p className="text-[#4A5565] text-[12px]">Building</p>
                            <p className="text-[#001F3F] text-[14px]">Building A</p>
                        </div>

                        <div>
                            <p className="text-[#4A5565] text-[12px]">Square Meters</p>
                            <p className="text-[#001F3F] text-[14px]">12.5 m²</p>
                        </div>

                        <div>
                            <p className="text-[#4A5565] text-[12px]">Coefficient</p>
                            <p className="text-[#001F3F] text-[14px]">0.80%</p>
                        </div>
                    </div>
                </InfoCard>
            )}

            {activeTab === "family" && (
                <div className="px-4 mt-4 pb-28 space-y-4">
                    {[
                        {
                            id: 1,
                            name: "Carlos Rodriguez",
                            document: "Passport - P123456789",
                            phone: "+1 234 567 8901",
                            email: "carlos.rodriguez@email.com",
                            mainOwner: true,
                        },
                        {
                            id: 2,
                            name: "Maria Rodriguez",
                            document: "National ID - ID987654321",
                            phone: "+1 234 567 8902",
                            email: "maria.rodriguez@email.com",
                            mainOwner: false,
                        },
                    ].map((member) => (
                        <div
                            key={member.id}
                            className="bg-white rounded-[10px] shadow-sm overflow-hidden border border-[#eff0f1] hover:shadow-md transition"
                        >
                            <div className="flex items-center justify-between px-4 py-3 bg-[#001F3F] text-white text-[14px]">
                                <div className="flex items-center gap-2">
                                    <FiUser size={16} />
                                    {member.name}
                                </div>
                                <FiChevronRight size={16} />
                            </div>

                            <div className="p-4 space-y-3 text-[14px]">
                                <div>
                                    <p className="text-[#4A5565] text-[12px]">Document</p>
                                    <p className="text-[#364153] text-[14px]">{member.document}</p>
                                </div>

                                <div>
                                    <p className="text-[#4A5565] text-[12px]">Phone</p>
                                    <p className="text-[#364153] text-[14px]">{member.phone}</p>
                                </div>

                                <div>
                                    <p className="text-[#4A5565] text-[12px]">Email</p>
                                    <p className="text-[#364153] text-[14px]">{member.email}</p>
                                </div>

                                <div className="pt-3 flex items-center justify-end gap-2">
                                    <span className="text-[12px] text-[#6A7282]">Main Owner</span>
                                    <div
                                        className={`w-9 h-5 rounded-full p-[2px] transition ${member.mainOwner ? "bg-[#001F3F]" : "bg-[#CBD5E1]"
                                            }`}
                                    >
                                        <div
                                            className={`w-4 h-4 bg-white rounded-full transition ${member.mainOwner ? "translate-x-4" : ""
                                                }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 h-[56px] rounded-full bg-[#001F3F] text-white text-[14px] font-normal shadow-lg hover:bg-[#036] transition"
                        onClick={() => console.log("Add new member")}
                    >
                        <span><FiPlus size={24} /></span>
                        Add New Member
                    </button>
                </div>
            )}

            {activeTab === "documents" && (
                <div className="px-4 mt-4 pb-28">
                    <div className="bg-white rounded-[10px] shadow-sm border border-[#E5E7EB] overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 bg-[#001F3F] text-white text-[14px]">
                            <FiFileText size={16} />
                            Documents
                        </div>

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
                                        className="flex items-center justify-between px-4 py-3 rounded-[8px] border border-[#EFF0F1] hover:bg-[#F8FAFC] transition"
                                    >
                                        <div className="flex items-center gap-2 text-[#001F3F] text-[14px]">
                                            <FiFileText size={16} />
                                            {doc.name}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button className="text-[#001F3F] hover:scale-110 transition">
                                                ⬇️
                                            </button>
                                            <button className="text-red-500 hover:scale-110 transition">
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 h-[56px] rounded-full bg-[#001F3F] text-white text-[14px] shadow-lg hover:bg-[#036] transition"
                        onClick={() => setShowUploadModal(true)}
                    >
                        <FiPlus size={20} />
                        Upload Document
                    </button>
                </div>
            )}
            {showUploadModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-[2px] px-4">
                    <div className="w-full max-w-[420px] bg-white rounded-[12px] shadow-xl overflow-hidden">

                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 bg-[#001F3F] text-white">
                            <div>
                                <p className="text-[14px]">Upload New Document</p>
                                <p className="text-[12px] text-white/80">Unit 101</p>
                            </div>

                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="hover:opacity-80"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-[13px] text-[#4A5565] mb-1">
                                    Document Name *
                                </label>
                                <input
                                    value={docName}
                                    onChange={(e) => setDocName(e.target.value)}
                                    placeholder="Enter document name"
                                    className="w-full h-[44px] px-3 rounded-[8px] border border-[#D1D5DC] outline-none focus:border-[#001F3F]"
                                />
                            </div>

                            <div>
                                <label className="block text-[13px] text-[#4A5565] mb-1">
                                    Choose File *
                                </label>

                                <label className="w-full h-[44px] px-3 rounded-[8px] border border-[#D1D5DC] flex items-center justify-between cursor-pointer hover:border-[#001F3F] transition">
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