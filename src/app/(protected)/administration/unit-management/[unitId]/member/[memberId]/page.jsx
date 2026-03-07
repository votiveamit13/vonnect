"use client";

import NavigationHeader from "@/components/common/NavigationHeader";
import FloatingActionButton from "@/components/FloatingButton";
import Loader from "@/components/Loader";
import { getUnitFamilyMemberApi } from "@/lib/administrator";
import { formatDate } from "@/lib/formatdate";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FiEdit2, FiDownload, FiUser, FiCreditCard } from "react-icons/fi";
import { LuCar, LuIdCard } from "react-icons/lu";
import { useSelector } from "react-redux";

export default function MemberDetailsPage() {
    const UPLOAD_URL = process.env.NEXT_PUBLIC_UPLOAD_URL;
    const params = useParams();
    const memberId = params.memberId;
    const unitId = params.unitId;
    const router = useRouter();
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const units = useSelector((state) => state.lookup.units);

    const unitNumber = units.find(
        (u) => u.id == member?.unit_id
    )?.unit_number;

    useEffect(() => {
        const fetchMember = async () => {
            try {
                setLoading(true);

                const res = await getUnitFamilyMemberApi(memberId);

                setMember(res.data?.data || null);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (memberId) fetchMember();
    }, [memberId]);

    const profileImage = member?.profile_picture
  ? `${UPLOAD_URL}${member.profile_picture}`
  : null;

    return (
        <main className="min-h-screen bg-[#F5F7FA] pb-28">
            <NavigationHeader
                showBack
                backHref={`/administration/unit-management/${unitId}`}
                title={member?.full_name || "Member Details"}
                subtitle={unitNumber}
            />

            {loading ? (
                <div className="flex justify-center mt-10">
                    <Loader text="Loading member details..." size="md" />
                </div>
            ) : (
                <div className="px-4 mt-4 space-y-4">
                    <div className="bg-white rounded-[10px] border border-[#E5E7EB] shadow-sm p-4 flex items-start gap-4">
                        <div className="flex-1 space-y-2">
                            <div>
                                <p className="text-[#4A5565] text-[12px]">Full Name</p>
                                <p className="text-[18px] text-[#001F3F]">{member.full_name}</p>
                            </div>

                            <div>
                                <p className="text-[#4A5565] text-[12px]">Residence</p>
                                <p className="text-[14px] text-[#101828]">{member?.residence_address}</p>
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

                        <div className="w-[80px] h-[80px] rounded-full bg-[#D1D5DC] overflow-hidden flex items-center justify-center text-[#6A7282] hover:opacity-80">

                            {profileImage ? (
                                <Image
                                    src={profileImage}
                                    alt={member?.full_name}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <FiUser size={40} stroke="#6A7282" />
                            )}
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
                                <p className="text-[#101828] text-[14px]"> {member?.document_type}</p>
                            </div>
                            <div>
                                <p className="text-[#4A5565] text-[12px]">Document Number</p>
                                <p className="text-[#101828] text-[14px]">{member?.document_number}</p>
                            </div>
                            <div>
                                <p className="text-[#4A5565] text-[12px]">Date of Birth</p>
                                <p className="text-[#101828] text-[14px]">{formatDate(member?.date_of_birth)}</p>
                            </div>
                            <div>
                                <p className="text-[#4A5565] text-[12px]">Marital Status</p>
                                <p className="text-[#101828] text-[14px]">{member?.marital_status}</p>
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
                                <p className="text-[#101828] text-[14px]">{member?.emergency_contact?.name}</p>
                            </div>
                            <div>
                                <p className="text-[#4A5565] text-[12px]">Phone</p>
                                <p className="text-[#101828] text-[14px]">{member?.emergency_contact?.phone}</p>
                            </div>
                            <div>
                                <p className="text-[#4A5565] text-[12px]">Relationship</p>
                                <p className="text-[#101828] text-[14px]">{member?.emergency_contact?.relation}</p>
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
                                <p className="text-[#101828] text-[14px]">{member?.driver_license_number}</p>
                            </div>
                            <div>
                                <p className="text-[#4A5565] text-[12px]">Expiry Date</p>
                                <p className="text-[#101828] text-[14px]">{formatDate(member?.driver_license_expiry)}</p>
                            </div>
                        </div>
                        {member?.driver_license_document && (
                            <Link
                                href={member.driver_license_document} className="px-4 col-span-2 mb-3 flex items-center gap-2 text-[#001F3F] text-[12px] hover:underline underline-offset-2">
                                <FiDownload size={14} />
                                Download Driver License
                            </Link>
                        )}
                    </div>

                    <div className="bg-white rounded-[10px] border border-[#E5E7EB] shadow-sm">
                        <div className="flex items-center gap-2 rounded-[10px] px-4 py-3 bg-white text-[#001F3F] text-[16px]">
                            <LuCar size={20} stroke="#001F3F" />
                            Registered Vehicles
                        </div>

                        <div className="px-4 py-3 space-y-3">
                            {member?.vehicles?.length === 0 && (
                                <p className="text-sm text-[#6A7282]">No registered vehicles</p>
                            )}

                            {member?.vehicles?.map((vehicle) => (
                                <div
                                    key={vehicle.id}
                                    className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] p-4 text-[14px]">
                                    <p className="text-[#001F3F] text-[14px] mb-3">
                                        {vehicle.make} {vehicle.model}
                                    </p>

                                    <div className="grid grid-cols-2 gap-y-4">
                                        <div>
                                            <p className="text-[#4A5565] text-[12px]">Plate</p>
                                            <p className="text-[#101828] text-[12px]">{vehicle.plate_number}</p>
                                        </div>

                                        <div>
                                            <p className="text-[#4A5565] text-[12px]">Color</p>
                                            <p className="text-[#101828] text-[12px]">{vehicle.color}</p>
                                        </div>

                                        <div>
                                            <p className="text-[#4A5565] text-[12px]">Insurance</p>
                                            <p className="text-[#101828] text-[12px]">{vehicle.insurance_company}</p>
                                        </div>

                                        <div>
                                            <p className="text-[#4A5565] text-[12px]">Expiry Date</p>
                                            <p className="text-[#101828] text-[12px]">{formatDate(vehicle.insurance_expiration)}</p>
                                        </div>
                                    </div>

                                    {vehicle.insurance_document && (
                                        <Link
                                            href={vehicle.insurance_document}
                                            className="col-span-2 mt-2 flex items-center gap-2 text-[#001F3F] text-[12px] hover:underline underline-offset-2"
                                        >
                                            <FiDownload size={14} />
                                            Insurance Document
                                        </Link>
                                    )}

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <FloatingActionButton
                label="Edit Information"
                icon={FiEdit2}
                onClick={() =>
                    router.push(`/administration/unit-management/${unitId}/member/${memberId}/edit`)
                }
            />
        </main>
    );
}