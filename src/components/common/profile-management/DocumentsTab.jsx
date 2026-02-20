import { FiFileText, FiDownload, FiShield, FiTruck, FiFile } from "react-icons/fi";
import { LuCar } from "react-icons/lu";

export default function DocumentsTab({ documents = [] }) {
  return (
    <div className="mt-4 px-4 sm:px-6 pb-10">
      <div className="bg-white rounded-[16px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.25)] overflow-hidden">
        {/* Header */}
        <div className="bg-[#001F3F] px-5 py-4 text-white rounded-t-[16px] flex items-center gap-2">
          <FiFileText size={16} />
          <span className="text-[14px]">Documents</span>
        </div>

        {/* List */}
        <div className="p-4 space-y-3">
          {documents.map((doc, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-[10px] border border-[#E5E7EB]"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <div className="text-[#001F3F]">
                    {doc.type === "ownership" && <FiFileText size={16} />}
                    {doc.type === "insurance" && <FiShield size={16} />}
                    {doc.type === "vehicle" && <LuCar size={16} />}
                    {doc.type === "other" && <FiFileText size={16} />}
                </div>

                <div>
                    <p className="text-[12px] text-[#364153] leading-tight">
                    {doc.title}
                    </p>
                    <p className="text-[12px] text-[#6A7282] leading-tight">
                    {doc.subtitle}
                    </p>
                </div>
               </div>


              {/* Right */}
              <a
                href={doc.downloadUrl}
                download
                className="p-2 rounded-full hover:bg-[#001F3F]/10 transition text-[#001F3F]"
              >
                <FiDownload size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
