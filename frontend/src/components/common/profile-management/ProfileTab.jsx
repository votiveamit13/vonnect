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
import { RiIdCardLine } from "react-icons/ri";
import { LuCake, LuCar } from "react-icons/lu";

export default function ProfileTab({ data, viewDocumentHref }) {
  return (
    <div className="mt-4 px-4 sm:px-6 pb-10">
      <div className="bg-white rounded-[16px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="bg-[#001F3F] px-5 py-4 text-white flex items-center gap-2 rounded-t-2xl">
          <FiUser size={16} />
          <span className="text-[14px]">Personal Information</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 border-b-2 border-[#E5E5E5]">
          <div className="flex gap-3 px-5 py-4">
            <div className="text-[#94A3B8] mt-1">
              <RiIdCardLine size={20} stroke="#99A1AF" />
            </div>
            <div>
              <p className="text-[12px] text-[#6A7282]">Type of Document</p>
              <p className="text-[14px] text-[#001F3F]">{data.documentType}</p>
            </div>
          </div>

          <div className="flex gap-3 px-5 py-4">
            <div className="text-[#94A3B8] mt-1">
              <RiIdCardLine size={20} stroke="#99A1AF"/>
            </div>
            <div>
              <p className="text-[12px] text-[#6A7282]">Document Number</p>
              <p className="text-[14px] text-[#001F3F]">{data.documentNumber}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 px-5 py-4 border-b-2 border-[#E5E5E5]">
          <div className="text-[#94A3B8] mt-1">
            <LuCake size={20} stroke="#99A1AF"/>
          </div>
          <div>
            <p className="text-[12px] text-[#6A7282]">Date of Birth</p>
            <p className="text-[14px] text-[#001F3F]">{data.dob}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-3 px-5 py-4 border-b-2 border-[#E5E5E5]">
          <div className="text-[#94A3B8] mt-1">
            <FiMail size={20} stroke="#99A1AF"/>
          </div>
          <div>
            <p className="text-[12px] text-[#6A7282]">Email</p>
            <p className="text-[14px] text-[#001F3F]">{data.email}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex gap-3 px-5 py-4 border-b-2 border-[#E5E5E5]">
          <div className="text-[#94A3B8] mt-1">
            <FiPhone size={20} stroke="#99A1AF"/>
          </div>
          <div>
            <p className="text-[12px] text-[#6A7282]">Phone</p>
            <p className="text-[14px] text-[#001F3F]">{data.phone}</p>
          </div>
        </div>

        {/* Emergency */}
        <div className="flex gap-3 px-5 py-4 border-b-2 border-[#E5E5E5]">
          <div className="text-[#94A3B8] mt-1">
            <FiAlertTriangle size={20} stroke="#99A1AF"/>
          </div>
          <div>
            <p className="text-[12px] text-[#6A7282]">Emergency Contact</p>
            <p className="text-[14px] text-[#001F3F]">{data.emergency}</p>
          </div>
        </div>

        {/* Driver License */}
        <div className="flex gap-3 px-5 py-4 border-b-2 border-[#E5E5E5]">
          <div className="text-[#94A3B8] mt-1">
            <RiIdCardLine size={20} stroke="#99A1AF"/>
          </div>
          <div>
            <p className="text-[12px] text-[#6A7282]">Driver License</p>
            <p className="text-[14px] text-[#001F3F]">{data.licenseNumber}</p>
            <p className="text-[12px] text-[#99A1AF]">Expires: {data.licenseExpiry}</p>

            <Link
              href={viewDocumentHref}
              className="text-[12px] text-[#155DFC] flex items-center gap-1 mt-1"
            >
              <FiEye size={12} stroke="#155DFC" />
              View Document
            </Link>
          </div>
        </div>

        {/* Vehicles */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-2">
            <LuCar size={20} stroke="#99A1AF" /> 
            <p className="text-[12px] text-[#6A7282]">Registered Vehicles</p>
          </div>

          <div className="space-y-2">
            {data.vehicles.map((v, i) => (
              <div key={i} className="rounded-[10] border-1 ml-7 border-[#E5E7EB] p-3 bg-[#F9FAFB]">
                <p className="text-[14px] text-[#001F3F]">{v.name}</p>
                <p className="text-[12px] text-[#6A7282]">Plate: {v.plate}</p>
                <p className="text-[12px] text-[#6A7282]">Insurance: {v.insurance}</p>
                <p className="text-[12px] text-[#99A1AF]">Expires: {v.expires}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
