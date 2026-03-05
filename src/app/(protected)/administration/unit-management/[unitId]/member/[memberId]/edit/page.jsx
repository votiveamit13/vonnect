"use client";

import NavigationHeader from "@/components/common/NavigationHeader";
import { getUnitFamilyMemberApi } from "@/lib/administrator";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FiUser,
  FiShield,
  FiPhone,
  FiAlertCircle,
  FiCreditCard,
  FiTruck,
  FiTrash2,
  FiDownload,
  FiPlus,
} from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuCar } from "react-icons/lu";
import { MdOutlineShield } from "react-icons/md";

export default function EditMemberPage() {
  const avatarRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const params = useParams();
  const memberId = params.memberId;
  const unitId = params.unitId;

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
  };

  const driverRef = useRef(null);
  const [driverLicenseDoc, setDriverLicenseDoc] = useState(null);

  const handleDriverUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDriverLicenseDoc(file);
  };

  const [vehicles, setVehicles] = useState([]);

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
        expiry: "",
        doc: null,
      },
    ]);
  };

  const removeVehicle = (id) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  const handleVehicleChange = (id, field, value) => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, [field]: value } : v
      )
    );
  };

  const handleVehicleUpload = (id, file) => {
    if (!file) return;

    setVehicles((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, doc: file } : v
      )
    );
  };

  const removeVehicleDoc = (id) => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, doc: null } : v
      )
    );
  };

  const [form, setForm] = useState({
    full_name: "",
    relationship: "",
    marital_status: "",
    date_of_birth: "",
    residence_address: "",
    email: "",
    phone: "",
    document_type: "",
    document_number: "",
    driver_license_number: "",
    driver_license_expiry: "",
    emergency_name: "",
    emergency_phone: "",
    emergency_relation: "",
  });

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await getUnitFamilyMemberApi(memberId);
        const data = res.data?.data;

        if (!data) return;

        setForm({
          full_name: data.full_name || "",
          relationship: data.relationship || "",
          marital_status: data.marital_status || "",
          date_of_birth: data.date_of_birth || "",
          residence_address: data.residence_address || "",
          email: data.email || "",
          phone: data.phone || "",
          document_type: data.document_type || "",
          document_number: data.document_number || "",
          driver_license_number: data.driver_license_number || "",
          driver_license_expiry: data.driver_license_expiry || "",
          emergency_name: data?.emergency_contact?.name || "",
          emergency_phone: data?.emergency_contact?.phone || "",
          emergency_relation: data?.emergency_contact?.relation || "",
        });

        setDriverLicenseDoc(data.driver_license_document || null);

        if (data.vehicles && data.vehicles.length > 0) {
          const normalizedVehicles = data.vehicles.map((v) => ({
            id: v.id,
            make: v.make || "",
            model: v.model || "",
            year: v.year || "",
            plate: v.plate_number || "",
            color: v.color || "",
            insurance: v.insurance_company || "",
            expiry: v.insurance_expiration || "",
            doc: v.insurance_document || null,
          }));

          setVehicles(normalizedVehicles);
        } else {
          setVehicles([]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (memberId) fetchMember();
  }, [memberId]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <main className="min-h-screen bg-[#F5F7FA] pb-10">
      <NavigationHeader
        showBack
        backHref="/administration/unit-management/101/member/1"
        title="Edit Information"
        subtitle="Carlos Rodriguez"
      />

      <div className="flex justify-center mt-5 pt-6">
        <div
          onClick={() => avatarRef.current.click()}
          className="relative w-24 h-24 rounded-full bg-[#D1D5DB] flex items-center justify-center cursor-pointer overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:opacity-80"
          style={{
            border: "3px solid white",
          }}
        >
          {avatarPreview ? (
            <img src={avatarPreview} className="w-full h-full object-cover" />
          ) : (
            <FiUser size={36} className="text-[#6A7282]" />
          )}
          <input
            ref={avatarRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleAvatarChange}
          />
        </div>
      </div>

      <div className="px-4 mt-6 space-y-4 mx-auto"
        style={{
          width: "672px",
        }}
      >

        <div className="bg-gradient-to-b from-[#F9FAFB] to-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] shadow-sm">
          <div className="px-4 py-3 flex items-center gap-2 text-[14px] text-[#001F3F]">
            <FiUser size={16} /> Personal Information
          </div>

          <div className="px-4 pb-4 pt-0 space-y-3">
            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Full Name <span className="text-[#E7000B]">*</span>
              </label>
              <input
                value={form.full_name}
                onChange={(e) => handleChange("full_name", e.target.value)}
                className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black placeholder:text-[#0A0A0A]/50" />
            </div>

            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Relationship <span className="text-[#E7000B]">*</span>
              </label>
              <input
                value={form.relationship}
                onChange={(e) => handleChange("relationship", e.target.value)}
                className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black placeholder:text-[#0A0A0A]/50" />
            </div>

            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Marital Status
              </label>
              <select
                value={form.marital_status || ""}
                onChange={(e) => handleChange("marital_status", e.target.value)}
                className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black bg-white outline-none focus:border-[#001F3F] appearance-none">
                <option value="">Select status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Date of Birth <span className="text-[#E7000B]">*</span>
              </label>
              <input
                type="date"
                value={form.date_of_birth}
                onChange={(e) => handleChange("date_of_birth", e.target.value)}
                className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black placeholder:text-[#0A0A0A]/50" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#F9FAFB] to-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] shadow-sm">
          <div className="px-4 py-3 flex items-center gap-2 text-[14px] text-[#001F3F]">
            <FiCreditCard size={16} /> Document Information
          </div>

          <div className="px-4 pb-4 pt-0 space-y-3">
            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Type of Document <span className="text-[#E7000B]">*</span>
              </label>
              <select className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black bg-white outline-none focus:border-[#001F3F] appearance-none">
                <option value="">Select type</option>
                <option value="National ID">National ID</option>
                <option value="Passport">Passport</option>
                <option value="Driver License">Driver License</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Document Number <span className="text-[#E7000B]">*</span>
              </label>
              <input className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black placeholder:text-[#0A0A0A]/50" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#F9FAFB] to-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] shadow-sm">
          <div className="px-4 py-3 flex items-center gap-2 text-[14px] text-[#001F3F]">
            <FiPhone size={16} /> Contact Information
          </div>

          <div className="px-4 pb-4 pt-0 space-y-3">
            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Residence <span className="text-[#E7000B]">*</span>
              </label>
              <input
                value={form.residence_address}
                onChange={(e) => handleChange("residence_address", e.target.value)}
                className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black placeholder:text-[#0A0A0A]/50" />
            </div>

            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Email <span className="text-[#E7000B]">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black placeholder:text-[#0A0A0A]/50" />
            </div>

            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Phone <span className="text-[#E7000B]">*</span>
              </label>
              <input
                type="number"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black placeholder:text-[#0A0A0A]/50" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#F9FAFB] to-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] shadow-sm">
          <div className="px-4 py-3 flex items-center gap-2 text-[14px] text-[#001F3F]">
            <MdOutlineShield size={16} /> Emergency Contact
          </div>

          <div className="px-4 pb-4 pt-0 space-y-3">
            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Name <span className="text-[#E7000B]">*</span>
              </label>
              <input
                value={form.emergency_name}
                onChange={(e) => handleChange("emergency_name", e.target.value)}
                className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black placeholder:text-[#0A0A0A]/50" />
            </div>

            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Phone <span className="text-[#E7000B]">*</span>
              </label>
              <input className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black placeholder:text-[#0A0A0A]/50" />
            </div>

            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Relationship <span className="text-[#E7000B]">*</span>
              </label>
              <input className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black placeholder:text-[#0A0A0A]/50" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#F9FAFB] to-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] shadow-sm">
          <div className="px-4 py-3 flex items-center gap-2 text-[14px] text-[#001F3F]">
            <FiCreditCard size={16} /> Driver License
          </div>

          <div className="px-4 pb-4 pt-0 space-y-3">
            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                License Number
              </label>
              <input
                value={form.driver_license_number}
                onChange={(e) => handleChange("driver_license_number", e.target.value)}
                className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black placeholder:text-[#0A0A0A]/50" />
            </div>

            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                value={form.driver_license_expiry}
                onChange={(e) => handleChange("driver_license_expiry", e.target.value)}
                className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black placeholder:text-[#0A0A0A]/50" />
            </div>

            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Driver License Document
              </label>

              {!driverLicenseDoc ? (
                <div className="flex items-center gap-3 border border-[#E5E7EB] rounded-[10px] px-3 h-[40px] bg-white">
                  <button
                    type="button"
                    onClick={() => driverRef.current.click()}
                    className="text-white text-[13px] px-4 py-1.5 rounded-[20px]"
                    style={{
                      backgroundColor: "#0B3A6E",
                      color: "#ffffff",
                      fontSize: "13px",
                      padding: "2px 16px",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Choose File
                  </button>

                  <span className="text-[13px] text-[#6B7280]">
                    No file chosen
                  </span>

                  <input
                    ref={driverRef}
                    type="file"
                    hidden
                    onChange={handleDriverUpload}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between border border-[#E5E7EB] bg-[#F9FAFB] rounded-[10px] px-4 h-[40px]">
                  <div className="flex items-center gap-3 text-[13px] text-[#001F3F] truncate">
                    <IoDocumentTextOutline size={16} />
                    {typeof driverLicenseDoc === "string"
                      ? driverLicenseDoc.split("/").pop()
                      : driverLicenseDoc?.name}
                  </div>

                  <div className="flex items-center gap-4">
                    <FiDownload
                      size={16}
                      className="cursor-pointer text-[#001F3F]"
                    />
                    <FiTrash2
                      size={16}
                      className="cursor-pointer text-[#E7000B]"
                      onClick={() => setDriverLicenseDoc(null)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#F9FAFB] to-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] shadow-sm">
          <div className="px-4 py-3 flex items-center gap-2 text-[14px] text-[#001F3F] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LuCar size={16} /> Registered Vehicles
            </div>
            <button
              onClick={addVehicle}
              className="flex items-center gap-1 text-[12px]"
            >
              <FiPlus size={14} /> Add Vehicle
            </button>
          </div>

          <div className="px-4 pb-4 pt-0 space-y-4">
            {vehicles.map((v, index) => (
              <div key={v.id} className="border border-[#E5E7EB] bg-white rounded-[10px] p-4 space-y-3">

                <div className="flex justify-between text-[12px] text-[#001F3F]">
                  Vehicle {index + 1}
                  <button
                    onClick={() => removeVehicle(v.id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>

                {[
                  { key: "make", label: "Make", placeholder: "e.g., Toyota" },
                  { key: "model", label: "Model", placeholder: "e.g., Camry" },
                  { key: "year", label: "Year", placeholder: "e.g., 2023" },
                  { key: "plate", label: "Plate Number", placeholder: "e.g., ABC-1234" },
                  { key: "color", label: "Color", placeholder: "e.g., Silver" },
                  { key: "insurance", label: "Insurance Company", placeholder: "e.g., State Farm" },
                  { key: "expiry", label: "Insurance Expiration", placeholder: "Select expiration date" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-[12px] text-[#364153] mb-1">
                      {field.label}
                    </label>

                    <input
                      type={field.key === "expiry" ? "date" : "text"}
                      placeholder={field.placeholder}
                      value={v[field.key]}
                      onChange={(e) =>
                        handleVehicleChange(v.id, field.key, e.target.value)
                      }
                      className="w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black placeholder:text-[#0A0A0A]/50"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-[12px] text-[#364153] mb-1">
                    Insurance Document
                  </label>

                  {!v.doc ? (
                    <div className="flex items-center justify-start gap-4 border border-[#E5E7EB] rounded-[12px] px-4 h-[40px] bg-white">
                      <input
                        type="file"
                        hidden
                        id={`file-${v.id}`}
                        onChange={(e) =>
                          handleVehicleUpload(v.id, e.target.files?.[0])
                        }
                      />

                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById(`file-${v.id}`).click()
                        }
                        className="bg-[#0B3A6E] text-white text-[13px] px-5 rounded-full flex items-center"
                        style={{
                          backgroundColor: "#0B3A6E",
                          color: "#ffffff",
                          fontSize: "13px",
                          padding: "2px 16px",
                          borderRadius: "20px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Choose File
                      </button>

                      <span className="text-[13px] text-[#6B7280]">
                        No file chosen
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between border border-[#E5E7EB] bg-[#F9FAFB] rounded-[12px] px-4 h-[40px]">

                      <div className="flex items-center gap-3 text-[13px] text-[#001F3F] truncate">
                        <MdOutlineShield size={16} />
                        {typeof v.doc === "string"
                          ? v.doc.split("/").pop()
                          : v.doc?.name}
                      </div>

                      <div className="flex items-center gap-4">
                        <FiDownload
                          size={16}
                          className="cursor-pointer text-[#001F3F]"
                        />
                        <FiTrash2
                          size={16}
                          className="cursor-pointer text-[#E7000B]"
                          onClick={() => removeVehicleDoc(v.id)}
                        />
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 space-y-3">
          <button className="w-full h-[36px] rounded-[10px] bg-[#001F3F] text-white text-[14px] hover:bg-[#003d7a]">
            Save
          </button>

          <button className="w-full h-[36px] rounded-[10px] border border-red-200 text-[#E7000B] text-[14px] flex items-center justify-center gap-2 hover:bg-red-50">
            <FiTrash2 size={16} />
            Delete Member
          </button>
        </div>

      </div>

    </main>
  );
}