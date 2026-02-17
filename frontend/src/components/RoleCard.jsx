import Link from "next/link";

export default function RoleCard({ href, icon: Icon, title, description, iconProps = {} }) {
  return (
    <Link
      href={href}
      className="group block w-full h-[96px] sm:h-[104px] md:h-[112px] bg-white rounded-xl shadow-md px-4 sm:px-5 
                 flex items-center gap-4 sm:gap-5 transition-transform sm:hover:scale-[1.05] active:scale-[0.99]"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#071E34] flex items-center justify-center shrink-0">
        <Icon {...iconProps} size={22} className="text-white" />
      </div>

      <div className="text-left">
        <h3 className="font-medium text-[18px] sm:text-[19px] md:text-[20px] text-[#001F3F]">
          {title}
        </h3>
        <p className="text-[#4A5565] text-[13px] sm:text-sm">
          {description}
        </p>
      </div>
    </Link>
  );
}
