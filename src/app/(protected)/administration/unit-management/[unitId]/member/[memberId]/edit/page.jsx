"use client";

import NavigationHeader from "@/components/common/NavigationHeader";
import { getUnitFamilyMemberApi, updateUnitFamilyMemberApi } from "@/lib/administrator";
import { useParams, useRouter } from "next/navigation";
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
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const params = useParams();
  const memberId = params.memberId;
  const unitId = params.unitId;
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleAvatarChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setAvatarFile(file);
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
if (data.profile_picture) {
  setAvatarPreview(`${process.env.NEXT_PUBLIC_UPLOAD_URL}${data.profile_picture}`);
}
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

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.full_name.trim())
      newErrors.full_name = "Full name is required";

    if (!form.relationship.trim())
      newErrors.relationship = "Relationship is required";

    if (!form.date_of_birth)
      newErrors.date_of_birth = "Date of birth is required";

    if (!form.document_type)
      newErrors.document_type = "Document type is required";

    if (!form.document_number.trim())
      newErrors.document_number = "Document number is required";

    if (!form.residence_address.trim())
      newErrors.residence_address = "Residence address is required";

    if (!form.email.trim())
      newErrors.email = "Email is required";

    if (!form.phone.trim())
      newErrors.phone = "Phone is required";

    if (!form.emergency_name.trim())
      newErrors.emergency_name = "Emergency contact name is required";

    if (!form.emergency_phone.trim())
      newErrors.emergency_phone = "Emergency phone is required";

    if (!form.emergency_relation.trim())
      newErrors.emergency_relation = "Emergency relationship is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      setSaving(true);
      const formData = new FormData();

      formData.append("full_name", form.full_name);
      formData.append("relationship", form.relationship);
      formData.append("marital_status", form.marital_status);
      formData.append("date_of_birth", form.date_of_birth);
      formData.append("residence_address", form.residence_address);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("document_type", form.document_type);
      formData.append("document_number", form.document_number);
      formData.append("driver_license_number", form.driver_license_number);
      formData.append("driver_license_expiry", form.driver_license_expiry);

      formData.append(
        "emergency_contact",
        JSON.stringify({
          name: form.emergency_name,
          phone: form.emergency_phone,
          relation: form.emergency_relation,
        })
      );

      if (avatarFile) {
  formData.append("profile_picture", avatarFile);
}

      if (driverLicenseDoc && typeof driverLicenseDoc !== "string") {
        formData.append("driver_license_document", driverLicenseDoc);
      }

      const vehiclePayload = vehicles.map((v) => ({
        make: v.make,
        model: v.model,
        year: v.year,
        plate_number: v.plate,
        color: v.color,
        insurance_company: v.insurance,
        insurance_expiration: v.expiry,
      }));

      formData.append("vehicles", JSON.stringify(vehiclePayload));

      vehicles.forEach((v) => {
        if (v.doc && typeof v.doc !== "string") {
          formData.append("insurance_documents", v.doc);
        }
      });

      await updateUnitFamilyMemberApi(memberId, formData);

      router.push(`/administration/unit-management/${unitId}/member/${memberId}`);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F7FA] pb-10">
      <NavigationHeader
        showBack
        backHref={`/administration/unit-management/${unitId}/member/${memberId}`}
        title="Edit Information"
        subtitle={form.full_name}
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
              {errors.full_name && (
                <p className="text-red-500 text-[12px] mt-1">{errors.full_name}</p>
              )}
            </div>

            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Relationship <span className="text-[#E7000B]">*</span>
              </label>
              <input
                value={form.relationship}
                onChange={(e) => handleChange("relationship", e.target.value)}
                className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black placeholder:text-[#0A0A0A]/50" />
              {errors.relationship && (
                <p className="text-red-500 text-[12px] mt-1">{errors.relationship}</p>
              )}
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
              {errors.date_of_birth && (
                <p className="text-red-500 text-[12px] mt-1">{errors.date_of_birth}</p>
              )}
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
              <select
                value={form.document_type || ""}
                onChange={(e) => handleChange("document_type", e.target.value)}
                className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black bg-white outline-none focus:border-[#001F3F] appearance-none">
                <option value="">Select type</option>
                <option value="National ID">National ID</option>
                <option value="Passport">Passport</option>
                <option value="Driver License">Driver License</option>
                <option value="Widowed">Widowed</option>
              </select>
              {errors.document_type && (
                <p className="text-red-500 text-[12px] mt-1">{errors.document_type}</p>
              )}
            </div>

            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Document Number <span className="text-[#E7000B]">*</span>
              </label>
              <input
                value={form.document_number}
                onChange={(e) => handleChange("document_number", e.target.value)}
                className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black placeholder:text-[#0A0A0A]/50" />
              {errors.document_number && (
                <p className="text-red-500 text-[12px] mt-1">{errors.document_number}</p>
              )}
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
              {errors.residence_address && (
                <p className="text-red-500 text-[12px] mt-1">{errors.residence_address}</p>
              )}
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
              {errors.email && (
                <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>
              )}
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
              {errors.phone && (
                <p className="text-red-500 text-[12px] mt-1">{errors.phone}</p>
              )}
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
              {errors.name && (
                <p className="text-red-500 text-[12px] mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Phone <span className="text-[#E7000B]">*</span>
              </label>
              <input
                value={form.emergency_phone}
                onChange={(e) => handleChange("emergency_phone", e.target.value)}
                className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black placeholder:text-[#0A0A0A]/50" />
              {errors.emergency_phone && (
                <p className="text-red-500 text-[12px] mt-1">{errors.emergency_phone}</p>
              )}
            </div>

            <div>
              <label className="block text-[12px] text-[#364153] mb-1">
                Relationship <span className="text-[#E7000B]">*</span>
              </label>
              <input
                value={form.emergency_relation}
                onChange={(e) => handleChange("emergency_relation", e.target.value)}
                className="bg-white w-full h-[40px] px-3 rounded-[10px] border border-[#E5E7EB] text-[14px] text-black placeholder:text-[#0A0A0A]/50" />
              {errors.emergency_relation && (
                <p className="text-red-500 text-[12px] mt-1">{errors.emergency_relation}</p>
              )}
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
          <button
            onClick={handleSave}
            disabled={saving}
            className={`w-full h-[36px] rounded-[10px] text-white text-[14px]
  ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-[#001F3F] hover:bg-[#003d7a]"}`}
          >
            {saving ? "Saving..." : "Save"}
          </button>

          {/* <button className="w-full h-[36px] rounded-[10px] border border-red-200 text-[#E7000B] text-[14px] flex items-center justify-center gap-2 hover:bg-red-50">
            <FiTrash2 size={16} />
            Delete Member
          </button> */}
        </div>

      </div>

    </main>
  );
}