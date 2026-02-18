import Link from "next/link";
import {
  FiUser,
  FiFileText,
  FiCalendar,
  FiMail,
  FiPhone,
  FiAlertTriangle,
  FiTruck,
  FiEye,
} from "react-icons/fi";

export default function ProfileTab({ data, viewDocumentHref }) {
  return (
    <div className="mt-4 px-4 sm:px-6 pb-10">
      <div className="bg-white rounded-[16px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="bg-[#001F3F] px-5 py-4 text-white flex items-center gap-2 rounded-t-2xl">
          <FiUser size={18} />
          <span>Personal Information</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="flex gap-3 px-5 py-4">
            <div className="text-[#94A3B8] mt-1">
              <FiUser />
            </div>
            <div>
              <p className=" text-[#6A7282]">Type of Document</p>
              <p className=" font-medium text-[#001F3F]">{data.documentType}</p>
            </div>
          </div>

          <div className="flex gap-3 px-5 py-4">
            <div className="text-[#94A3B8] mt-1">
              <FiFileText />
            </div>
            <div>
              <p className="text-xs text-gray-400">Document Number</p>
              <p className="font-medium text-[#001F3F]">{data.documentNumber}</p>
            </div>
          </div>
        </div>

        {/* Date of Birth */}
        <div className="flex gap-3 px-5 py-4">
          <div className="text-[#94A3B8] mt-1">
            <FiCalendar />
          </div>
          <div>
            <p className="text-xs text-gray-400">Date of Birth</p>
            <p className="font-medium text-[#001F3F]">{data.dob}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-3 px-5 py-4">
          <div className="text-[#94A3B8] mt-1">
            <FiMail />
          </div>
          <div>
            <p className="text-xs text-gray-400">Email</p>
            <p className="font-medium text-[#001F3F]">{data.email}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex gap-3 px-5 py-4">
          <div className="text-[#94A3B8] mt-1">
            <FiPhone />
          </div>
          <div>
            <p className="text-xs text-gray-400">Phone</p>
            <p className="font-medium text-[#001F3F]">{data.phone}</p>
          </div>
        </div>

        {/* Emergency */}
        <div className="flex gap-3 px-5 py-4">
          <div className="text-[#94A3B8] mt-1">
            <FiAlertTriangle />
          </div>
          <div>
            <p className="text-xs text-gray-400">Emergency Contact</p>
            <p className="font-medium text-[#001F3F]">{data.emergency}</p>
          </div>
        </div>

        {/* Driver License */}
        <div className="flex gap-3 px-5 py-4">
          <div className="text-[#94A3B8] mt-1">
            <FiFileText />
          </div>
          <div>
            <p className="text-xs text-gray-400">Driver License</p>
            <p className="font-medium text-[#001F3F]">{data.licenseNumber}</p>
            <p className="text-xs text-gray-400">Expires: {data.licenseExpiry}</p>

            <Link
              href={viewDocumentHref}
              className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1"
            >
              <FiEye size={14} />
              View Document
            </Link>
          </div>
        </div>

        {/* Vehicles */}
        <div className="px-5 py-4">
          <p className="text-xs text-gray-400 flex items-center gap-2 mb-2">
            <FiTruck size={14} /> Registered Vehicles
          </p>

          <div className="space-y-2">
            {data.vehicles.map((v, i) => (
              <div key={i} className="rounded-xl p-3 bg-[#F9FAFB]">
                <p className="font-medium">{v.name}</p>
                <p className="text-sm text-gray-500">Plate: {v.plate}</p>
                <p className="text-sm text-gray-500">Insurance: {v.insurance}</p>
                <p className="text-xs text-gray-400">Expires: {v.expires}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
