"use client";

import InfoCard from "@/components/common/InfoCard";
import NavigationHeader from "@/components/common/NavigationHeader";
import Tabs from "@/components/common/Tabs";
import FloatingActionButton from "@/components/FloatingButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiHome, FiUser, FiCheckCircle, FiChevronRight, FiPlus, FiFileText, FiDownload } from "react-icons/fi";
import { LuBuilding2, LuCar } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { useParams } from "next/navigation";
import { getUnitDetailsApi, getUnitFamilyMembersApi } from "@/lib/administrator";
import Loader from "@/components/Loader";
import { useSelector } from "react-redux";

export default function UnitDetailsPage() {
    const params = useParams();
    const unitId = params.unitId;
    const [unit, setUnit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("unit");
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [docName, setDocName] = useState("");
    const [file, setFile] = useState(null);
    const [documents, setDocuments] = useState([]);
    const buildings = useSelector((state) => state.lookup.buildings);
    const [familyMembers, setFamilyMembers] = useState([]);
    const [loadingFamily, setLoadingFamily] = useState(false);

    const getBuildingName = (buildingId) => {
        return (
            buildings?.find((b) => String(b.id) === String(buildingId))?.name || "--"
        );
    };

    useEffect(() => {
        const fetchUnitDetails = async () => {
            try {
                setLoading(true);

                const res = await getUnitDetailsApi(unitId);

                setUnit(res.data?.data || null);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (unitId) {
            fetchUnitDetails();
        }
    }, [unitId]);

    const occupancyLabel = unit?.occupaycy_status ? "Occupied" : "Vacant";

    const maintenanceLabel =
        unit?.maintenance_fee_status === "paid" ? "Paid" : "Pending";

    const maintenanceColor =
        unit?.maintenance_fee_status === "paid"
            ? "bg-[#DCFCE7] text-[#016630]"
            : "bg-[#FEF3C7] text-[#92400E]";


    const fetchFamilyMembers = async () => {
        try {
            setLoadingFamily(true);

            const res = await getUnitFamilyMembersApi(unitId);

            setFamilyMembers(res.data?.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingFamily(false);
        }
    };

    useEffect(() => {
        if (activeTab === "family" && unitId) {
            fetchFamilyMembers();
        }
    }, [activeTab, unitId]);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
                <Loader text="Loading Unit Details..." size="md" />
            </main>
        );
    }
    return (
        <main className="min-h-screen bg-[#F5F7FA]">
            <NavigationHeader
                showBack
                backHref="/administration/unit-management"
                title={`${unit?.unit_number}`}
                subtitle={unit?.building?.name || "Building A"}
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
                    title={unit?.unit_type || "Residential Unit"}
                    icon={<LuBuilding2 size={16} />}
                    footer={
                        <div className="pt-3 border-t border-[#EFF0F1] space-y-4">
                            <div>
                                <p className="text-[#4A5565] text-[12px] mb-1">Occupancy Status</p>
                                <div className="flex items-center gap-2">
                                    <FiUser size={16} className="text-[#0A0A0A]" />
                                    <span className="px-2 py-[6px] text-[12px] rounded-[4px] bg-[#DBEAFE] text-[#193CB8]">
                                        {occupancyLabel}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <p className="text-[#4A5565] text-[12px] mb-1">Maintenance Fee Status</p>
                                <div className="flex items-center gap-2">
                                    <FiCheckCircle size={16} className="text-[#0A0A0A]" />
                                    <span className={`px-2 py-[6px] text-[12px] rounded-[4px] ${maintenanceColor}`}>
                                        {maintenanceLabel}
                                    </span>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <p className="text-[#4A5565] text-[12px]">Unit Type</p>
                            <p className="text-[#001F3F] text-[14px]">{unit?.unit_type || "Residential Unit"}</p>
                        </div>

                        <div>
                            <p className="text-[#4A5565] text-[12px]">Building</p>
                            <p className="text-[#001F3F] text-[14px]">{unit?.building?.name || "--"}</p>
                        </div>

                        <div>
                            <p className="text-[#4A5565] text-[12px]">Square Meters</p>
                            <p className="text-[#001F3F] text-[14px]">{unit?.square_meters || "--"} m²</p>
                        </div>

                        <div>
                            <p className="text-[#4A5565] text-[12px]">Coefficient</p>
                            <p className="text-[#001F3F] text-[14px]">{unit?.coefficient ? `${unit.coefficient}%` : "--"}</p>
                        </div>
                    </div>
                </InfoCard>
            )}

            {activeTab === "parking" && (
                <div className="mt-4 space-y-4">
                    {unit?.complementary_units?.length === 0 && (
                        <p className="text-center text-sm text-[#6A7282]">
                            No parking or complementary units found
                        </p>
                    )}

                    {unit?.complementary_units?.map((item) => (
                        <InfoCard
                            key={item.id}
                            title={item.title || item.unit_type}
                            icon={<LuCar size={16} />}
                            footer={
                                <div className="pt-3 border-t border-[#EFF0F1] space-y-4">
                                    <div>
                                        <p className="text-[#4A5565] text-[12px] mb-1">Occupancy Status</p>
                                        <div className="flex items-center gap-2">
                                            <FiUser size={16} className="text-[#0A0A0A]" />
                                            <span className="px-2 py-[6px] text-[12px] rounded-[4px] bg-[#DBEAFE] text-[#193CB8]">
                                                {item.occupaycy_status ? "Occupied" : "Vacant"}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[#4A5565] text-[12px] mb-1">Maintenance Fee Status</p>
                                        <div className="flex items-center gap-2">
                                            <FiCheckCircle size={16} className="text-[#0A0A0A]" />
                                            <span className={`px-2 py-[6px] text-[12px] rounded-[4px] ${item.maintenance_fee_status === "paid"
                                                ? "bg-[#DCFCE7] text-[#016630]"
                                                : "bg-[#FEF3C7] text-[#92400E]"
                                                }`}
                                            >
                                                {item.maintenance_fee_status === "paid" ? "Paid" : "Pending"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            }
                        >
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <p className="text-[#4A5565] text-[12px]">Unit Type</p>
                                    <p className="text-[#001F3F] text-[14px]">{item.unit_number}</p>
                                </div>

                                <div>
                                    <p className="text-[#4A5565] text-[12px]">Building</p>
                                    <p className="text-[#001F3F] text-[14px]">{getBuildingName(item.building_id)}</p>
                                </div>

                                <div>
                                    <p className="text-[#4A5565] text-[12px]">Square Meters</p>
                                    <p className="text-[#001F3F] text-[14px]">{item.square_meters} m²</p>
                                </div>

                                <div>
                                    <p className="text-[#4A5565] text-[12px]">Coefficient</p>
                                    <p className="text-[#001F3F] text-[14px]">{item.coefficient}%</p>
                                </div>
                            </div>
                        </InfoCard>
                    ))}
                </div>
            )}

            {activeTab === "family" && (
                <div className="px-4 mt-4 pb-28 space-y-4">
                    {loadingFamily && (
                        <Loader text="Loading family members..." size="md" />
                    )}

                    {!loadingFamily && familyMembers.length === 0 && (
                        <p className="text-center text-sm text-[#6A7282]">
                            No family members found
                        </p>
                    )}

                    {familyMembers.map((member) => (
                        <Link
                            key={member.id}
                            href={`/administration/unit-management/${unitId}/member/${member.id}`}
                            className="block"
                        >
                            <div
                                key={member.id}
                                className="bg-white rounded-[10px] shadow-sm overflow-hidden border border-[#eff0f1] hover:shadow-md transition"
                            >
                                <div className="flex items-center justify-between px-4 py-3 bg-[#001F3F] text-white text-[14px]">
                                    <div className="flex items-center gap-2">
                                        <FiUser size={16} />
                                        {member.full_name}
                                    </div>
                                    <FiChevronRight size={16} />
                                </div>

                                <div className="p-4 space-y-3 text-[14px]">
                                    <div>
                                        <p className="text-[#4A5565] text-[12px]">Document</p>
                                        <p className="text-[#364153] text-[14px]">{member.document_type} - {member.document_number}</p>
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
                                            className={`w-9 h-5 rounded-full p-[2px] transition ${member.is_owner ? "bg-[#001F3F]" : "bg-[#CBD5E1]"
                                                }`}
                                        >
                                            <div
                                                className={`w-4 h-4 bg-white rounded-full transition ${member.is_owner ? "translate-x-4" : ""
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    <FloatingActionButton
                        label="Add New Member"
                        icon={FiPlus}
                        onClick={() => console.log("Add new member")}
                    />
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
                                        className="flex items-center justify-between px-4 h-[54px] rounded-[10px] border border-[#E5E7EB] bg-[#F9FAFB]"
                                    >
                                        <div className="flex items-center gap-2 text-[#364153] text-[12px]">
                                            <FiFileText size={16} stroke="#001F3F" />
                                            {doc.name}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button className="text-[#001F3F] hover:scale-110 transition">
                                                <FiDownload size={16} />
                                            </button>
                                            <button className="text-[#E7000B] hover:scale-110 transition">
                                                <RiDeleteBinLine size={16} />
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
                <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
                    <div className="w-full max-w-[448px] bg-white rounded-[10px] shadow-xl overflow-hidden">
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

                                <label className="w-full h-[44px] px-3 rounded-[8px] border border-[#D1D5DC] flex items-center justify-between cursor-pointer">
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