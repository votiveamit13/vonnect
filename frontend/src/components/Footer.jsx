import Link from "next/link";

export default function FooterNav({ items = [], activePath = "" }) {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#001F3F]">
      <nav className="mx-auto">
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
          {items.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activePath === item.href;

            return (
              <li
                key={idx}
                className={`relative ${
                  idx !== items.length - 1 ? "border-r border-white/10" : ""
                }`}
              >
                <Link
                  href={item.href}
                  className={`flex flex-col items-center justify-center gap-1 py-3 sm:py-4 text-white transition
                    ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  <Icon size={24} />
                  <span className="text-[11px] sm:text-[12px]">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
}
