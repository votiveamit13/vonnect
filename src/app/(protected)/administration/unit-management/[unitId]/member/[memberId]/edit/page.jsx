"use client";

import { useRef, useState } from "react";
import NavigationHeader from "@/components/common/NavigationHeader";
import { FiUser, FiShield, FiPhone, FiAlertCircle, FiCreditCard, FiTruck, FiTrash2, FiDownload, FiPlus } from "react-icons/fi";

export default function EditMemberPage() {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

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
    onClick={handleClick}
    className="relative p-6 rounded-full bg-[#D1D5DB] flex items-center justify-center cursor-pointer overflow-hidden
             ring-4 ring-inset ring-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
  >
    {preview ? (
      <img
        src={preview}
        alt="avatar"
        className="w-full h-full object-cover"
      />
    ) : (
      <FiUser size={36} className="text-[#6A7282]" />
    )}

    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleChange}
    />
  </div>
</div>

      <div className="px-4 mt-6 space-y-4">

        {/* Personal Information */}
        <div className="bg-white rounded-[12px] shadow-sm">
          <div className="px-4 py-3 border-b flex items-center gap-2 text-[14px] text-[#001F3F] font-medium">
            <FiUser size={16} /> Personal Information
          </div>

          <div className="p-4 space-y-3">
            <Field label="Full Name *" value="Carlos Rodriguez" />
            <Field label="Relationship *" value="Owner" />
            <Field label="Marital Status" />
            <Field label="Date of Birth *" />
          </div>
        </div>

        {/* Document Information */}
        <div className="bg-white rounded-[12px] shadow-sm">
          <div className="px-4 py-3 border-b flex items-center gap-2 text-[14px] text-[#001F3F] font-medium">
            <FiShield size={16} /> Document Information
          </div>

          <div className="p-4 space-y-3">
            <Field label="Type of Document *" />
            <Field label="Document Number *" value="P123456789" />
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-[12px] shadow-sm">
          <div className="px-4 py-3 border-b flex items-center gap-2 text-[14px] text-[#001F3F] font-medium">
            <FiPhone size={16} /> Contact Information
          </div>

          <div className="p-4 space-y-3">
            <Field label="Residence *" value="Ocean View Residences, Tower A, Unit 101" />
            <Field label="Email *" value="carlos.rodriguez@email.com" />
            <Field label="Phone *" value="+1 234 567 8901" />
          </div>
        </div>

        {/* Emergency */}
        <div className="bg-white rounded-[12px] shadow-sm">
          <div className="px-4 py-3 border-b flex items-center gap-2 text-[14px] text-[#001F3F] font-medium">
            <FiAlertCircle size={16} /> Emergency Contact
          </div>

          <div className="p-4 space-y-3">
            <Field label="Name *" value="Maria Rodriguez" />
            <Field label="Phone *" value="+1 234 567 8902" />
            <Field label="Relationship *" value="Spouse" />
          </div>
        </div>

        {/* Driver License */}
        <div className="bg-white rounded-[12px] shadow-sm">
          <div className="px-4 py-3 border-b flex items-center gap-2 text-[14px] text-[#001F3F] font-medium">
            <FiCreditCard size={16} /> Driver License
          </div>

          <div className="p-4 space-y-3">
            <Field label="License Number" value="DL-12345678" />
            <Field label="Expiry Date" placeholder="dd-mm-yyyy" />

            <FileRow label="Driver_License_DL-12345678.pdf" />
          </div>
        </div>

        {/* Registered Vehicles */}
        <div className="bg-white rounded-[12px] shadow-sm">
          <div className="px-4 py-3 border-b flex items-center justify-between text-[14px] text-[#001F3F] font-medium">
            <div className="flex items-center gap-2">
              <FiTruck size={16} /> Registered Vehicles
            </div>

            <button onClick={addVehicle} className="text-[12px] text-[#001F3F] font-medium">
              + Add Vehicle
            </button>
          </div>

          <div className="p-4 space-y-4">
            {vehicles.map((v, idx) => (
              <div key={v.id} className="border rounded-[10px] p-3 space-y-2">
                <div className="flex items-center justify-between text-[13px] font-medium text-[#001F3F]">
                  Vehicle {idx + 1}
                  <button onClick={() => removeVehicle(v.id)} className="text-[#DC2626] text-[12px] flex items-center gap-1">
                    <FiTrash2 size={12} /> Remove
                  </button>
                </div>

                <Field label="Make" value={v.make} />
                <Field label="Model" value={v.model} />
                <Field label="Year" value={v.year} />
                <Field label="Plate Number" value={v.plate} />
                <Field label="Color" value={v.color} />
                <Field label="Insurance Company" value={v.insurance} />
                <Field label="Insurance Expiration" />

                {v.doc ? (
                  <FileRow label={v.doc} />
                ) : (
                  <UploadField />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Account */}
        <div className="bg-white rounded-[12px] shadow-sm">
          <div className="px-4 py-3 border-b flex items-center gap-2 text-[14px] text-[#001F3F] font-medium">
            <FiUser size={16} /> Manage User Account
          </div>

          <div className="p-4 space-y-3">
            <Field label="Username" placeholder="Enter username for member login" />
            <Field label="Password" placeholder="Enter password for member login" type="password" />
          </div>
        </div>

        {/* Actions */}
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

/* ---------- Atomic UI ---------- */

function Field({ label, value = "", placeholder = "", type = "text" }) {
  return (
    <div>
      <label className="block text-[12px] text-[#4A5565] mb-1">{label}</label>
      <input
        defaultValue={value}
        placeholder={placeholder}
        type={type}
        className="w-full h-[40px] px-3 rounded-[8px] border border-[#E5E7EB] text-[13px] outline-none focus:border-[#001F3F]"
      />
    </div>
  );
}

function FileRow({ label }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-[8px] border border-[#E5E7EB] bg-[#F9FAFB] text-[12px]">
      <span className="truncate">{label}</span>
      <div className="flex items-center gap-3">
        <FiDownload className="text-[#001F3F]" />
        <FiTrash2 className="text-[#DC2626]" />
      </div>
    </div>
  );
}

function UploadField() {
  return (
    <label className="w-full h-[40px] px-3 rounded-[8px] border border-[#E5E7EB] flex items-center justify-between cursor-pointer text-[12px]">
      <span className="inline-flex items-center gap-2 px-3 h-[24px] rounded-full bg-[#001F3F] text-white text-[11px]">
        Choose File
      </span>

      <span className="text-[#6A7282]">No file chosen</span>

      <input type="file" className="hidden" />
    </label>
  );
}