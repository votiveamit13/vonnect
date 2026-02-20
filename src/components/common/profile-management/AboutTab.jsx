import Link from "next/link";
import Image from "next/image";
import { FiFileText } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";

export default function AboutTab({
  appName = "VONNECT",
  subtitle = "Property Management Platform",
  description = "The all-in-one community app for smarter, simpler living.",
  longDescription,
  legalTitle = "End User License Agreement",
  legalText,
  legalHref = "#",
  version = "1.0.0",
  copyright = "© 2024 VONNECT. All rights reserved.",
  logoSrc = "/assets/logo.png",
}) {
  return (
    <div className="mt-4 px-4 sm:px-6 pb-10">
      <div className="bg-white rounded-[16px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.25)] p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="w-[47px] h-[47px] rounded-[10px] bg-[#001F3F] flex items-center justify-center overflow-hidden">
            {logoSrc ? (
              <IoBookOutline size={24} stroke="white"/>
            ) : (
              <span className="text-white font-bold text-sm">APP</span>
            )}
          </div>

          <div>
            <p className="text-[20px] text-[#001F3F] leading-tight">
              {appName}
            </p>
            <p className="text-[14px] text-[#6A7282]">
              {subtitle}
            </p>
          </div>
        </div>

        <p className="mt-4 text-[16px] text-[#364153] leading-relaxed">
          {description}
        </p>

        {longDescription && (
          <p className="mt-2 text-[14px] text-[#4A5565] leading-relaxed">
            {longDescription}
          </p>
        )}

        <div className="my-5 h-[1px] bg-[#E5E7EB]" />

        <p className="text-[14px] text-[#001F3F]">
          {legalTitle}
        </p>

        <p className="mt-1 text-[12px] text-[#4A5565] leading-relaxed">
          {legalText}
        </p>

        <Link
          href="/owner/profile/agreement"
          className="mt-4 inline-flex items-center justify-center gap-2 w-full h-[44px] rounded-[10px] 
                     bg-[#001F3F] text-white text-[14px] hover:opacity-90 transition"
        >
          <FiFileText size={16} />
          View Full Legal Agreement
        </Link>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t-2 border-[#E5E5E5]">
          <p className="text-[14px] text-[#6A7282]">
            Version {version}
          </p>
          <p className="text-[14px] text-[#6A7282]">
            {copyright}
          </p>
        </div>
      </div>
    </div>
  );
}
