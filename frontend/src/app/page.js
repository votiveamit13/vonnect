import { FiUser } from "react-icons/fi";
import { LuBuilding2, LuUserCog } from "react-icons/lu";
import { MdOutlineShield } from "react-icons/md";
import RoleCard from "@/components/RoleCard";

const roles = [
  {
    key: "owner",
    title: "Owner",
    description: "Property owners and partners",
    href: "/login?role=owner",
    icon: FiUser,
  },
  {
    key: "tenant",
    title: "Tenant",
    description: "Property tenants",
    href: "/login?role=tenant",
    icon: LuBuilding2,
  },
  {
    key: "administration",
    title: "Administration",
    description: "Administrative staff",
    href: "/login?role=administration",
    icon: LuUserCog,
  },
  {
    key: "security",
    title: "Security",
    description: "Security personnel",
    href: "/login?role=security",
    icon: MdOutlineShield,
    iconProps: { fill: "white" },
  },
];

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#001F3F] flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-white text-[28px] sm:text-[32px] md:text-[36px] font-semibold tracking-wide">
          VONNECT
        </h1>
        <p className="text-white text-[14px] sm:text-[15px] md:text-[16px] mt-2 mb-8 sm:mb-10">
          Select your user type to continue
        </p>

        <div className="space-y-4 sm:space-y-5">
          {roles.map((role) => (
            <RoleCard
              key={role.key}
              href={role.href}
              icon={role.icon}
              title={role.title}
              description={role.description}
              iconProps={role.iconProps}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
