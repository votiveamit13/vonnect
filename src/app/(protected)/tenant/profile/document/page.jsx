"use client";

import NavigationHeader from "@/components/common/NavigationHeader";
import { FiCreditCard, FiDownload } from "react-icons/fi";
import { LuIdCard } from "react-icons/lu";

export default function DocumentView() {
  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <NavigationHeader
        showBack
        backHref="/owner/profile"
        title="Driver License"
        subtitle="View your driver license document"
      />

      <div className="px-4 mt-6 pb-10">
        <div className="w-full bg-white rounded-[16px] border border-[#E5E7EB] overflow-hidden">
          <div className="relative p-4">
            <div className="bg-[#F3F4F6] rounded-[10px] flex flex-col items-center justify-center text-center" style={{
                height: "515px"
            }}>
              
              <LuIdCard
                size={48}
                className="text-[#99A1AF] mb-3"
              />

              <p className="text-[12px] text-[#4A5565]">
                Driver License Document
              </p>

              <p className="text-[12px] text-[#6A7282] mt-1">
                License # B-35123456-8
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="p-4">

            <div className="flex items-center justify-between py-4 border-b border-[#E5E5E5]">
              <span className="text-[14px] text-[#4A5565]">
                License Number
              </span>
              <span className="text-[14px] text-[#001F3F]">
                B-35123456-8
              </span>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-[#E5E5E5]">
              <span className="text-[14px] text-[#4A5565]">
                Expiration Date
              </span>
              <span className="text-[14px] text-[#001F3F]">
                Mar 15, 2026
              </span>
            </div>

            <div className="flex items-center justify-between py-4">
              <span className="text-[14px] text-[#4A5565]">
                Status
              </span>

              <span className="px-3 py-2 text-[12px] rounded-[4px] bg-[#DCFCE7] text-[#008236] font-medium">
                Valid
              </span>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}