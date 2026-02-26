"use client";

import NavigationHeader from "@/components/common/NavigationHeader";
import FloatingActionButton from "@/components/FloatingButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { FiEdit2, FiDownload, FiUser, FiCreditCard } from "react-icons/fi";
import { LuCar, LuIdCard } from "react-icons/lu";

export default function MemberDetailsPage() {
    const router = useRouter();
    const member = {
        name: "Carlos Rodriguez",
        unit: "Unit 101",
        residence: "Ocean View Residences, Tower A, Unit 101",
        email: "carlos.rodriguez@email.com",
        phone: "+1 234 567 8901",

        identification: {
            type: "Passport",
            number: "P123456789",
            dob: "May 15, 1980",
            marital: "Married",
        },

        emergency: {
            name: "Maria Rodriguez",
            phone: "+1 234 567 8902",
            relation: "Spouse",
        },

        license: {
            number: "DL-12345678",
            expiry: "Dec 31, 2027",
        },

        vehicle: {
            name: "Toyota Camry",
            plate: "ABC-1234",
            color: "Silver",
            insurance: "ABC Insurance",
            expiry: "Dec 31, 2025",
        },
    };

    return (
        <main className="min-h-screen bg-[#F5F7FA] pb-28">
            <NavigationHeader
                showBack
                backHref="/administration/unit-management/101"
                title={member.name}
                subtitle={member.unit}
            />

            <div className="px-4 mt-4 space-y-4">
                <div className="bg-white rounded-[10px] border border-[#E5E7EB] shadow-sm p-4 flex items-start gap-4">
                    <div className="flex-1 space-y-2">
                        <div>
                            <p className="text-[#4A5565] text-[12px]">Full Name</p>
                            <p className="text-[18px] text-[#001F3F]">{member.name}</p>
                        </div>

                        <div>
                            <p className="text-[#4A5565] text-[12px]">Residence</p>
                            <p className="text-[14px] text-[#101828]">{member.residence}</p>
                        </div>

                        <div>
                            <p className="text-[#4A5565] text-[12px]">Email</p>
                            <p className="text-[14px] text-[#101828]">{member.email}</p>
                        </div>

                        <div>
                            <p className="text-[#4A5565] text-[12px]">Phone</p>
                            <p className="text-[14px] text-[#101828]">{member.phone}</p>
                        </div>
                    </div>

                    <div className="w-[80px] h-[80px] rounded-full bg-[#D1D5DC] flex items-center justify-center text-[#6A7282] hover:opacity-80">
                        <FiUser size={40} stroke="#6A7282" />
                    </div>
                </div>

                <div className="bg-white rounded-[10px] border border-[#E5E7EB] shadow-sm">
                    <div className="flex items-center gap-2 rounded-[10px] px-4 py-3 bg-white text-[#001F3F] text-[16px]">
                        <LuIdCard size={20} stroke="#001F3F" />
                        Identification
                    </div>

                    <div className="px-4 py-3 grid grid-cols-2 gap-y-4">
                        <div>
                            <p className="text-[#4A5565] text-[12px]">Document Type</p>
                            <p className="text-[#101828] text-[14px]">Passport</p>
                        </div>
                        <div>
                            <p className="text-[#4A5565] text-[12px]">Document Number</p>
                            <p className="text-[#101828] text-[14px]">P123456789</p>
                        </div>
                        <div>
                            <p className="text-[#4A5565] text-[12px]">Date of Birth</p>
                            <p className="text-[#101828] text-[14px]">May 15, 1980</p>
                        </div>
                        <div>
                            <p className="text-[#4A5565] text-[12px]">Marital Status</p>
                            <p className="text-[#101828] text-[14px]">Married</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[10px] border border-[#E5E7EB] shadow-sm">
                    <div className="flex items-center gap-2 rounded-[10px] px-4 py-3 bg-white text-[#001F3F] text-[16px]">
                        <FaRegHeart size={20} stroke="#001F3F" />
                        Emergency Contact
                    </div>

                    <div className="px-4 py-3 grid grid-cols-2 gap-y-4">
                        <div>
                            <p className="text-[#4A5565] text-[12px]">Full Name</p>
                            <p className="text-[#101828] text-[14px]">Maria Rodriguez</p>
                        </div>
                        <div>
                            <p className="text-[#4A5565] text-[12px]">Phone</p>
                            <p className="text-[#101828] text-[14px]">+1 234 567 8902</p>
                        </div>
                        <div>
                            <p className="text-[#4A5565] text-[12px]">Relationship</p>
                            <p className="text-[#101828] text-[14px]">Spouse</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[10px] border border-[#E5E7EB] shadow-sm">
                    <div className="flex items-center gap-2 rounded-[10px] px-4 py-3 bg-white text-[#001F3F] text-[16px]">
                        <FiCreditCard size={20} stroke="#001F3F" />
                        Driver License
                    </div>

                    <div className="px-4 py-3 grid grid-cols-2 gap-y-4">
                        <div>
                            <p className="text-[#4A5565] text-[12px]">License Number</p>
                            <p className="text-[#101828] text-[14px]">DL-12345678</p>
                        </div>
                        <div>
                            <p className="text-[#4A5565] text-[12px]">Expiry Date</p>
                            <p className="text-[#101828] text-[14px]">Dec 31, 2027</p>
                        </div>
                    </div>
                    <Link href="#" className="px-4 col-span-2 mb-3 flex items-center gap-2 text-[#001F3F] text-[12px] hover:underline underline-offset-2">
                            <FiDownload size={14} />
                            Download Driver License
                        </Link>
                </div>

                <div className="bg-white rounded-[10px] border border-[#E5E7EB] shadow-sm">
                    <div className="flex items-center gap-2 rounded-[10px] px-4 py-3 bg-white text-[#001F3F] text-[16px]">
                        <LuCar size={20} stroke="#001F3F" />
                        Registered Vehicles
                    </div>

                    <div className="px-4 py-3">
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] p-4 text-[14px]">
                            <p className="text-[#001F3F] text-[14px] mb-3">
                                {member.vehicle.name}
                            </p>

                            <div className="grid grid-cols-2 gap-y-4">
                                <div>
                                    <p className="text-[#4A5565] text-[12px]">Plate</p>
                                    <p className="text-[#101828] text-[12px]">{member.vehicle.plate}</p>
                                </div>

                                <div>
                                    <p className="text-[#4A5565] text-[12px]">Color</p>
                                    <p className="text-[#101828] text-[12px]">{member.vehicle.color}</p>
                                </div>

                                <div>
                                    <p className="text-[#4A5565] text-[12px]">Insurance</p>
                                    <p className="text-[#101828] text-[12px]">{member.vehicle.insurance}</p>
                                </div>

                                <div>
                                    <p className="text-[#4A5565] text-[12px]">Expiry Date</p>
                                    <p className="text-[#101828] text-[12px]">{member.vehicle.expiry}</p>
                                </div>
                            </div>

                            <Link
                                href="#"
                                className="col-span-2 mt-2 flex items-center gap-2 text-[#001F3F] text-[12px] hover:underline underline-offset-2"
                            >
                                <FiDownload size={14} />
                                Insurance Document
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <FloatingActionButton
                label="Edit Information"
                icon={FiEdit2}
                onClick={() =>
          router.push("/administration/unit-management/101/member/1/edit")
        }
            />
        </main>
    );
}