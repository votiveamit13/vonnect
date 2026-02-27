"use client";

import { useRef, useState } from "react";
import NavigationHeader from "@/components/common/NavigationHeader";
import {
  FiUser,
  FiShield,
  FiPhone,
  FiAlertCircle,
  FiCreditCard,
  FiTruck,
  FiTrash2,
  FiDownload,
} from "react-icons/fi";

export default function EditMemberPage() {
  const avatarRef = useRef(null);

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [driverLicenseDoc, setDriverLicenseDoc] = useState(
    "Driver_License_DL-12345678.pdf"
  );

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: "2022",
      plate: "ABC-1234",
      color: "Silver",
      insurance: "ABC Insurance",
      doc: "Insurance_ABC-1234.pdf",
    },
  ]);

  /* ---------------- Avatar ---------------- */

  const handleAvatarClick = () => {
    avatarRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
  };

  /* ---------------- Vehicles ---------------- */

  const addVehicle = () => {
    setVehicles((prev) => [
      ...prev,
      {
        id: Date.now(),
        make: "",
        model: "",
        year: "",
        plate: "",
        color: "",
        insurance: "",
        doc: null,
      },
    ]);
  };

  const removeVehicle = (id) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  const removeVehicleDoc = (id) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, doc: null } : v))
    );
  };

  const handleVehicleUpload = (id, file) => {
    if (!file) return;

    setVehicles((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, doc: file.name } : v
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#F5F7FA] pb-28">
      <NavigationHeader
        showBack
        backHref="/administration/unit-management/101/member/1"
        title="Edit Information"
        subtitle="Carlos Rodriguez"
      />

      {/* Avatar */}
      <div className="flex justify-center mt-6">
        <div
          onClick={handleAvatarClick}
          className="relative w-24 h-24 rounded-full bg-[#D1D5DB] flex items-center justify-center cursor-pointer overflow-hidden ring-4 ring-inset ring-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
        >
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <FiUser size={36} className="text-[#6A7282]" />
          )}

          <input
            ref={avatarRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
      </div>

      <div className="px-4 mt-6 space-y-4 w-full max-w-lg mx-auto">

        {/* PERSONAL INFORMATION */}
        <div className="bg-white rounded-[12px] shadow-sm">
          <div className="px-4 py-3 border-b flex items-center gap-2 text-[14px] font-medium text-[#001F3F]">
            <FiUser size={16} /> Personal Information
          </div>

          <div className="p-4 space-y-3">
            <div>
              <label className="block text-[12px] text-[#4A5565] mb-1">Full Name *</label>
              <input defaultValue="Carlos Rodriguez" className="w-full h-[40px] px-3 rounded-[8px] border border-[#E5E7EB] text-[13px] outline-none focus:border-[#001F3F]" />
            </div>

            <div>
              <label className="block text-[12px] text-[#4A5565] mb-1">Relationship *</label>
              <input defaultValue="Owner" className="w-full h-[40px] px-3 rounded-[8px] border border-[#E5E7EB] text-[13px] outline-none focus:border-[#001F3F]" />
            </div>

            <div>
              <label className="block text-[12px] text-[#4A5565] mb-1">Marital Status</label>
              <input className="w-full h-[40px] px-3 rounded-[8px] border border-[#E5E7EB] text-[13px] outline-none focus:border-[#001F3F]" />
            </div>

            <div>
              <label className="block text-[12px] text-[#4A5565] mb-1">Date of Birth *</label>
              <input className="w-full h-[40px] px-3 rounded-[8px] border border-[#E5E7EB] text-[13px] outline-none focus:border-[#001F3F]" />
            </div>
          </div>
        </div>

        {/* DOCUMENT INFORMATION */}
        <div className="bg-white rounded-[12px] shadow-sm">
          <div className="px-4 py-3 border-b flex items-center gap-2 text-[14px] font-medium text-[#001F3F]">
            <FiShield size={16} /> Document Information
          </div>

          <div className="p-4 space-y-3">
            <div>
              <label className="block text-[12px] text-[#4A5565] mb-1">Type of Document *</label>
              <input className="w-full h-[40px] px-3 rounded-[8px] border border-[#E5E7EB] text-[13px] outline-none focus:border-[#001F3F]" />
            </div>

            <div>
              <label className="block text-[12px] text-[#4A5565] mb-1">Document Number *</label>
              <input defaultValue="P123456789" className="w-full h-[40px] px-3 rounded-[8px] border border-[#E5E7EB] text-[13px] outline-none focus:border-[#001F3F]" />
            </div>
          </div>
        </div>

        {/* CONTACT INFORMATION */}
        <div className="bg-white rounded-[12px] shadow-sm">
          <div className="px-4 py-3 border-b flex items-center gap-2 text-[14px] font-medium text-[#001F3F]">
            <FiPhone size={16} /> Contact Information
          </div>

          <div className="p-4 space-y-3">
            <div>
              <label className="block text-[12px] text-[#4A5565] mb-1">Residence *</label>
              <input defaultValue="Ocean View Residences, Tower A, Unit 101" className="w-full h-[40px] px-3 rounded-[8px] border border-[#E5E7EB] text-[13px] outline-none focus:border-[#001F3F]" />
            </div>

            <div>
              <label className="block text-[12px] text-[#4A5565] mb-1">Email *</label>
              <input defaultValue="carlos.rodriguez@email.com" className="w-full h-[40px] px-3 rounded-[8px] border border-[#E5E7EB] text-[13px] outline-none focus:border-[#001F3F]" />
            </div>

            <div>
              <label className="block text-[12px] text-[#4A5565] mb-1">Phone *</label>
              <input defaultValue="+1 234 567 8901" className="w-full h-[40px] px-3 rounded-[8px] border border-[#E5E7EB] text-[13px] outline-none focus:border-[#001F3F]" />
            </div>
          </div>
        </div>

        {/* EMERGENCY CONTACT */}
        <div className="bg-white rounded-[12px] shadow-sm">
          <div className="px-4 py-3 border-b flex items-center gap-2 text-[14px] font-medium text-[#001F3F]">
            <FiAlertCircle size={16} /> Emergency Contact
          </div>

          <div className="p-4 space-y-3">
            <div>
              <label className="block text-[12px] text-[#4A5565] mb-1">Name *</label>
              <input defaultValue="Maria Rodriguez" className="w-full h-[40px] px-3 rounded-[8px] border border-[#E5E7EB]" />
            </div>

            <div>
              <label className="block text-[12px] text-[#4A5565] mb-1">Phone *</label>
              <input defaultValue="+1 234 567 8902" className="w-full h-[40px] px-3 rounded-[8px] border border-[#E5E7EB]" />
            </div>

            <div>
              <label className="block text-[12px] text-[#4A5565] mb-1">Relationship *</label>
              <input defaultValue="Spouse" className="w-full h-[40px] px-3 rounded-[8px] border border-[#E5E7EB]" />
            </div>
          </div>
        </div>

        {/* SAVE / DELETE */}
        <div className="pt-6 space-y-3">
          <button className="w-full h-[46px] rounded-[10px] bg-[#001F3F] text-white text-[14px]">
            Save
          </button>

          <button className="w-full h-[46px] rounded-[10px] border border-[#FCA5A5] text-[#DC2626] text-[14px] flex items-center justify-center gap-2">
            <FiTrash2 size={16} />
            Delete Member
          </button>
        </div>

      </div>
    </main>
  );
}