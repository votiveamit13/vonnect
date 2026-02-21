export default function ServicesGrid({ title = "Services", items = [] }) {
  return (
    <div>
      <p className="text-[16px] text-[#001F3F] mb-3">{title}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <ServiceItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

function ServiceItem({ label, icon, href = "#" }) {
  return (
    <a
      href={href}
      className="bg-white rounded-[12px] shadow-sm p-4 flex flex-col items-center justify-center gap-2 border border-[#eff0f1] hover:shadow-md transition"
    >
      <div className="w-[48px] h-[48px] rounded-[10px] bg-[#001F3F] flex items-center justify-center text-white">
        {icon}
      </div>

      <p className="text-[12px] text-[#001F3F] text-center">
        {label}
      </p>
    </a>
  );
}