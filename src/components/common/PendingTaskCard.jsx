export default function PendingTaskCard({
  title = "Pending / Ongoing Tasks",
  icon,
  taskTitle,
  status = "In Progress",
  priority = "Urgent",
  assigned = "Security Team - Carlos Rodriguez",
  description,
  href = "#",
}) {
  return (
    <div className="mb-6">
      <p className="text-[16px] text-[#001F3F] mb-2">
        {title}
      </p>

      <div className="bg-white rounded-[12px] border border-[#eff0f1] shadow-sm px-4 py-3 hover:shadow-md transition">

        <div className="flex gap-3">
          <div className="w-[40px] h-[40px] rounded-full bg-[#001F3F] flex items-center justify-center text-white shrink-0">
            {icon}
          </div>

          <div className="flex-1">
            <p className="text-[16px] text-[#001F3F]">
              {taskTitle}
            </p>

            <div className="flex-wrap items-center gap-4 text-[13px] mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[#4A5565] text-[12px]">Status:</span>
                <span className="px-2 py-1 rounded-full bg-[#DBEAFE] text-[#193CB8] text-[12px]">
                  {status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#4A5565] text-[12px]">Priority:</span>
                <span className="px-2 py-1 rounded-full bg-[#FFE2E2] text-[#9F0712] text-[12px]">
                  {priority}
                </span>
              </div>
            </div>

            <p className="text-[13px] text-[#4A5565] mb-1">
              <span className="text-[#4A5565]">Assigned to:</span> {assigned}
            </p>

            <p className="text-[14px] text-[#4A5565] mt-2">
              {description}
            </p>

            <div className="flex justify-end mt-3">
              <a
                href={href}
                className="text-[12px] text-[#001F3F]"
              >
                Tap to read more
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}