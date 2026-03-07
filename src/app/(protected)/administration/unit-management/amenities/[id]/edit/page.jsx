"use client";

import { useEffect, useState } from "react";
import NavigationHeader from "@/components/common/NavigationHeader";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { getResidenceAmenityApi, updateAmenityApi } from "@/lib/administrator";
import useBuildings from "@/hooks/useBuildings";

export default function AmenitiyEdit() {

    const { id } = useParams();
    const router = useRouter();
    const { buildings } = useBuildings();
    const days = ["S", "M", "T", "W", "TH", "F", "SA"];

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        name: "",
        residence_type_id: "",
        building_id: "",
        square_meters: "",
        capacity: "",
        opens_at: "",
        closes_at: "",
    });

    const [selectedDays, setSelectedDays] = useState([]);

    const toggleDay = (day) => {
        setSelectedDays((prev) =>
            prev.includes(day)
                ? prev.filter((d) => d !== day)
                : [...prev, day]
        );
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.name) newErrors.name = "Amenity name is required";
        if (!form.residence_type_id) newErrors.residence_type_id = "Type is required";
        if (!form.building_id) newErrors.building_id = "Building is required";
        if (!form.square_meters) newErrors.square_meters = "Square meters is required";
        if (!form.capacity) newErrors.capacity = "Capacity is required";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {

        const fetchAmenity = async () => {
            try {

                setLoading(true);

                const res = await getResidenceAmenityApi(id);
                const data = res.data?.data;

                setForm({
                    name: data.name || "",
                    residence_type_id: data.residence_type_id || "",
                    building_id: data.building_id || "",
                    square_meters: data.square_meters || "",
                    capacity: data.capacity || "",
                    opens_at: data.opens_at?.slice(0, 5) || "",
                    closes_at: data.closes_at?.slice(0, 5) || "",
                });

                setSelectedDays(data.operating_days || []);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchAmenity();

    }, [id]);

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {

            setSaving(true);

            await updateAmenityApi(id, {
                ...form,
                operating_days: selectedDays
            });

            router.push(`/administration/unit-management/amenities/${id}`);

        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }

    };

    const isFormValid =
        form.name &&
        form.residence_type_id &&
        form.building_id &&
        form.square_meters &&
        form.capacity;

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#F3F4F6]">
                <Loader text="Loading amenity..." size="md" />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F3F4F6] pb-20">
            <NavigationHeader
                showBack
                backHref={`/administration/unit-management/amenities/${id}`}
                title="Edit Amenity"
                subtitle="Update amenity information"
            />

            <div className="px-4 mt-4 pb-28">
                <div className="bg-white rounded-[10px] shadow-sm border border-[#eff0f1] p-5 space-y-5">
                    <div>
                        <label className="text-[12px] text-[#364153]">
                            Name of Amenity <span className="text-[#E7000B]">*</span>
                        </label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="e.g., Swimming Pool"
                            className="mt-1 w-full h-[40px] px-3 rounded-[10px] border border-[#D1D5DC] text-[14px] text-black placeholder:text-[#0A0A0A]/50"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-[12px] mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-[12px] text-[#364153]">
                            Type <span className="text-[#E7000B]">*</span>
                        </label>
                        <select
                            name="residence_type_id"
                            value={form.residence_type_id}
                            onChange={handleChange}
                            className="mt-1 w-full h-[40px] px-3 rounded-[10px] border border-[#D1D5DC] text-[14px] text-black placeholder:text-[#0A0A0A]/50] appearance-none">
                            <option value="">Select type</option>
                            <option value="6">Recreation</option>
                            <option value="8">Social</option>
                            <option value="7">Work</option>
                            <option value="9">Sports</option>
                        </select>
                        {errors.residence_type_id && (
                            <p className="text-red-500 text-[12px] mt-1">{errors.residence_type_id}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-[12px] text-[#364153]">
                            Building <span className="text-[#E7000B]">*</span>
                        </label>
                        <select
                            name="building_id"
  value={form.building_id}
  onChange={handleChange}
                            className="mt-1 w-full h-[40px] px-3 rounded-[10px] border border-[#D1D5DC] text-[14px] text-black placeholder:text-[#0A0A0A]/50] appearance-none">
                            <option value="">Select building</option>
 {buildings
    ?.filter((item) => item.building !== null)
    .map((item) => (
      <option key={item.building.id} value={item.building.id}>
        {item.building.name}
      </option>
    ))}
                        </select>
                        {errors.building_id && (
                            <p className="text-red-500 text-[12px] mt-1">{errors.building_id}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-[12px] text-[#364153]">
                            Square Meters <span className="text-[#E7000B]">*</span>
                        </label>
                        <input
                            type="number"
                            name="square_meters"
                            value={form.square_meters}
                            onChange={handleChange}
                            placeholder="e.g., 150"
                            className="mt-1 w-full h-[40px] px-3 rounded-[10px] border border-[#D1D5DC] text-[14px] text-black placeholder:text-[#0A0A0A]/50"
                        />
                        {errors.square_meters && (
                            <p className="text-red-500 text-[12px] mt-1">{errors.square_meters}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-[12px] text-[#364153]">
                            Capacity <span className="text-[#E7000B]">*</span>
                        </label>
                        <input
                            type="number"
                            name="capacity"
                            value={form.capacity}
                            onChange={handleChange}
                            placeholder="e.g., 20"
                            className="mt-1 w-full h-[40px] px-3 rounded-[10px] border border-[#D1D5DC] text-[14px] text-black placeholder:text-[#0A0A0A]/50"
                        />
                        {errors.capacity && (
                            <p className="text-red-500 text-[12px] mt-1">{errors.capacity}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-[12px] text-[#364153]">
                            Operating days
                        </label>

                        <div className="mt-2 flex gap-2">
                            {days.map((day) => {
                                const active = selectedDays.includes(day);

                                return (
                                    <button
                                        key={day}
                                        type="button"
                                        onClick={() => toggleDay(day)}
                                        className={`mt-1 w-full h-[40px] px-3 rounded-[10px] border border-[#D1D5DC] text-[14px]
                      ${active
                                                ? "bg-[#001F3F] text-white"
                                                : "bg-[#F3F4F6] text-[#364153]"
                                            }`}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <label className="text-[12px] text-[#364153]">
                            Operating hours
                        </label>

                        <div className="mt-2 flex gap-4">
                            <div className="flex-1">
                                <label className="text-[12px] text-[#6A7282]">from</label>
                                <input
                                    type="time"
                                    name="opens_at"
                                    value={form.opens_at}
                                    onChange={handleChange}
                                    className="mt-1 w-full h-[40px] px-3 rounded-[10px] border border-[#D1D5DC] text-[14px] text-black placeholder:text-[#0A0A0A]/50"
                                />
                            </div>

                            <div className="flex-1">
                                <label className="text-[12px] text-[#6A7282]">to</label>
                                <input
                                    type="time"
                                    name="closes_at"
                                    value={form.closes_at}
                                    onChange={handleChange}
                                    className="mt-1 w-full h-[40px] px-3 rounded-[10px] border border-[#D1D5DC] text-[14px] text-black placeholder:text-[#0A0A0A]/50"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!isFormValid || saving}
                        className={`h-[44px] w-full rounded-[12px] text-[14px] text-white transition-all
  ${isFormValid
                                ? "bg-[#001F3F] hover:bg-[#003d7a] cursor-pointer"
                                : "bg-[#99A1AF] cursor-not-allowed"
                            }`}
                    >
                        {saving ? "Updating..." : "Update Amenity"}
                    </button>

                </div>
            </div>
        </main>
    );
}