"use client";

import NavigationHeader from "@/components/common/NavigationHeader";
import Loader from "@/components/Loader";
import { FiEdit2, FiHome } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getResidenceAmenityApi } from "@/lib/administrator";
import { LuBuilding2 } from "react-icons/lu";

export default function AmenitiyDetail() {

    const { id } = useParams();
    const router = useRouter();

    const [amenity, setAmenity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchAmenity = async () => {

            try {
                setLoading(true);

                const res = await getResidenceAmenityApi(id);

                setAmenity(res.data?.data || null);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }

        };

        if (id) fetchAmenity();

    }, [id]);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#F3F4F6]">
                <Loader text="Loading amenity..." size="md" />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F3F4F6] pb-28">

            <NavigationHeader
                showBack
                backHref="/administration/unit-management/amenities"
                title={amenity?.name}
                subtitle="Amenity Information"
            />

            <div className="px-4 mt-4 space-y-4">
                <div className="bg-white rounded-[10px] shadow-sm border border-[#E5E7EB] p-5">

                    <div className="flex items-center gap-2 mb-4 text-[#001F3F] text-[16px]">
                        <LuBuilding2 size={16} />
                        Basic Information
                    </div>

                    <div className="space-y-4 text-[14px]">

                        <div>
                            <p className="text-[#6A7282] text-[12px]">Amenity Name</p>
                            <p className="text-[#001F3F] text-[14px]">{amenity?.name}</p>
                        </div>

                        <div>
                            <p className="text-[#6A7282] text-[12px]">Type</p>
                            <p className="text-[#001F3F]">
                                {amenity?.residence_type?.name || "--"}
                            </p>
                        </div>

                        <div>
                            <p className="text-[#6A7282] text-[12px]">Building</p>
                            <p className="text-[#001F3F]">
                                {amenity?.building?.name || "--"}
                            </p>
                        </div>

                        <div>
                            <p className="text-[#6A7282] text-[12px]">Square Meters</p>
                            <p className="text-[#001F3F]">
                                {amenity?.square_meters} m²
                            </p>
                        </div>

                        <div>
                            <p className="text-[#6A7282] text-[12px]">Coefficient</p>
                            <p className="text-[#001F3F]">
                                {amenity?.coefficient ? `${amenity.coefficient}%` : "--"}
                            </p>
                        </div>

                    </div>
                </div>

                <div className="bg-white rounded-[10px] shadow-sm border border-[#E5E7EB] p-5">

                    <div className="flex items-center gap-2 mb-4 text-[#001F3F] font-medium">
                        <FiHome size={16} />
                        Facility Details
                    </div>

                    <div className="space-y-4 text-[14px]">

                        <div>
                            <p className="text-[#6A7282] text-[12px]">Capacity</p>
                            <p className="text-[#001F3F]">
                                {amenity?.capacity} people
                            </p>
                        </div>

                        <div>
                            <p className="text-[#6A7282] text-[12px]">Operating Days</p>
                            <p className="text-[#001F3F]">
                                {amenity?.operating_days?.join(", ")}
                            </p>
                        </div>

                        <div>
                            <p className="text-[#6A7282] text-[12px]">Operating Hours</p>
                            <p className="text-[#001F3F]">
                                {amenity?.opens_at?.slice(0, 5)} - {amenity?.closes_at?.slice(0, 5)}
                            </p>
                        </div>

                    </div>

                </div>

                <button
                    onClick={() =>
                        router.push(`/administration/unit-management/amenities/${id}/edit`)
                    }
                    className="flex items-center gap-2 justify-center w-full h-[44px] rounded-[10px] bg-[#001F3F] text-white text-[14px] hover:bg-[#003d7a]"
                >
                    <FiEdit2 size={16}/> Edit Amenity
                </button>

            </div>
        </main>
    );
}