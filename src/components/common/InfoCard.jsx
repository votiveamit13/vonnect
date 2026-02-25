export default function InfoCard({ title, icon, children, footer }) {
  return (
    <div className="px-4 mt-4">
      <div className="bg-white rounded-[10px] shadow-sm border border-[#E5E7EB] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-[#001F3F] text-white text-[14px]">
          {icon}
          {title}
        </div>

        <div className="p-4 space-y-4">
          {children}
        </div>

        {footer && (
          <div className="px-4 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}