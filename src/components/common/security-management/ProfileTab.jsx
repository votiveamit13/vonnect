import Link from "next/link";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiAlertTriangle,
  FiEye,
} from "react-icons/fi";
import { RiIdCardLine } from "react-icons/ri";
import { LuBriefcaseBusiness, LuCake, LuCar } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";

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
              <p className="text-[12px] text-[#6A7282]">Employee ID</p>
              <p className="text-[14px] text-[#001F3F]">{data.id_number}</p>
            </div>
          </div>
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

        <div className="flex gap-3 px-5 py-4 border-b-2 border-[#E5E5E5]">
          <div className="text-[#94A3B8] mt-1">
            <LuBriefcaseBusiness size={20} stroke="#99A1AF"/>
          </div>
          <div>
            <p className="text-[12px] text-[#6A7282]">Category/Role</p>
            <p className="text-[14px] text-[#001F3F]">{data.role}</p>
          </div>
        </div>

        <div className="flex gap-3 px-5 py-4 border-b-2 border-[#E5E5E5]">
          <div className="text-[#94A3B8] mt-1">
            <CiCalendar size={20} stroke="#99A1AF"/>
          </div>
          <div>
            <p className="text-[12px] text-[#6A7282]">Incorporation Date</p>
            <p className="text-[14px] text-[#001F3F]">{data.role}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
