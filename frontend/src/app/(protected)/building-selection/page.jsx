// import Link from "next/link";
// import { LuBuilding2 } from "react-icons/lu";

// export default async function SelectBuildingPage() {
//   const buildings = [
//     { id: 1, name: "Building 1", href: "/owner" },
//     { id: 2, name: "Building 2", href: "/owner" },
//     { id: 3, name: "Building 3", href: "/owner" },
//     { id: 4, name: "Building 4", href: "/owner" },
//   ];

//   return (
//     <main className="min-h-screen w-full bg-[#001F3F] flex items-center justify-center px-4 sm:px-6 relative">
//       <div className="w-full max-w-md sm:max-w-lg text-center">
//         {/* Title */}
//         <h1 className="text-white text-[28px] sm:text-[32px] md:text-[36px] font-semibold tracking-wide">
//           VONNECT
//         </h1>
//         <p className="text-white text-[14px] sm:text-[15px] md:text-[16px] mt-2 mb-8">
//           Select your building to continue
//         </p>

//         {/* List */}
//         <div className="space-y-4 sm:space-y-5">
//           {buildings.map((b) => (
//             <Link
//               key={b.id}
//               href={b.href}
//               className="group block w-full h-[96px] sm:h-[104px] md:h-[112px] bg-white rounded-xl shadow-md px-4 sm:px-5 flex items-center gap-4 sm:gap-5 transition-transform sm:hover:scale-[1.05] active:scale-[0.99]"
//             >
//               <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#071E34] flex items-center justify-center shrink-0">
//                 <LuBuilding2 stroke="white" size={22}/>
//               </div>
//               <div className="text-left">
//                 <h3 className="font-medium text-[18px] sm:text-[19px] md:text-[20px] text-[#001F3F]">
//                   {b.name}
//                 </h3>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LuBuilding2 } from "react-icons/lu";

export default function SelectBuildingPage() {
  const router = useRouter();

  const buildings = [
    { id: 1, name: "Building 1" },
    { id: 2, name: "Building 2" },
    { id: 3, name: "Building 3" },
    { id: 4, name: "Building 4" },
  ];

  const handleSelect = (id) => {
    const role = localStorage.getItem("role"); // owner | tenant | security | administration

    // persist building
    localStorage.setItem("buildingId", id);
    document.cookie = `buildingId=${id}; path=/;`;

    // redirect to role dashboard
    router.push(`/${role}`);
  };

  return (
    <main className="min-h-screen w-full bg-[#001F3F] flex items-center justify-center px-4 sm:px-6 relative">
      <div className="w-full max-w-md sm:max-w-lg text-center">
        <h1 className="text-white text-[28px] sm:text-[32px] md:text-[36px] tracking-wide">
          VONNECT
        </h1>
        <p className="text-white/80 text-[14px] sm:text-[15px] md:text-[16px] mt-2 mb-8">
          Select your building to continue
        </p>

        <div className="space-y-4 sm:space-y-5">
          {buildings.map((b) => (
            <button
              key={b.id}
              onClick={() => handleSelect(b.id)}
              className="group block w-full h-[80px] sm:h-[85px] md:h-[90px] bg-white rounded-[10px] px-4 sm:px-5 flex items-center gap-4 sm:gap-5 transition-transform sm:hover:scale-[1.05] active:scale-[0.99]"
            >
              <div className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full bg-[#071E34] flex items-center justify-center shrink-0">
                <LuBuilding2 stroke="white" size={24} />
              </div>
              <div className="text-left">
                <h3 className="text-[14px] sm:text-[15px] md:text-[18px] text-[#001F3F]">
                  {b.name}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
