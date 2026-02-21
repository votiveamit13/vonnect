export default function LatestUpdateCard({
  title = "Latest Community Update",
  icon,
  heading,
  description,
  time,
  href = "#",
}) {
  return (
    <div className="mb-6">
      <p className="text-[16px] text-[#001F3F] mb-2">{title}</p>

      <div className="bg-white rounded-[12px] border border-[#eff0f1] shadow-sm px-4 py-3 hover:shadow-md transition">
        
        <div className="flex items-start justify-between gap-4">
          {/* Left Content */}
          <div className="flex gap-3">
            <div className="w-[36px] h-[36px] rounded-full bg-[#001F3F] flex items-center justify-center text-white shrink-0">
              {icon}
            </div>

            <div>
              <p className="text-[14px] font-medium text-[#001F3F]">
                {heading}
              </p>
              <p className="text-[13px] text-[#4A5565] leading-relaxed">
                {description}
              </p>
              <p className="text-[12px] text-[#6A7282] mt-1">
                {time}
              </p>
            </div>
          </div>

          {/* Right Bottom Link */}
          <a
            href={href}
            className="self-end text-[12px] text-[#001F3F] whitespace-nowrap"
          >
            Tap to read more
          </a>
        </div>
      </div>
    </div>
  );
}