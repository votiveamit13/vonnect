"use client";

import { useState } from "react";
import NavigationHeader from "@/components/common/NavigationHeader";

export default function CreateAmenityPage() {
    const [selectedDays, setSelectedDays] = useState([]);
    const isFormValid = false;
    const days = ["S", "M", "T", "W", "T", "F", "S"];

    const toggleDay = (index) => {
        setSelectedDays((prev) =>
            prev.includes(index)
                ? prev.filter((d) => d !== index)
                : [...prev, index]
        );
    };

    return (
        <main className="min-h-screen bg-[#F3F4F6] pb-20">
            <NavigationHeader
                showBack
                backHref="/administration/unit-management"
                title="Create New Amenity"
                subtitle="Add a new amenity to the residence"
            />

            <div className="px-4 mt-4 pb-28">
                <div className="bg-white rounded-[10px] shadow-sm border border-[#eff0f1] p-5 space-y-5">
                    <div>
                        <label className="text-[12px] text-[#364153]">
                            Name of Amenity <span className="text-[#E7000B]">*</span>
                        </label>
                        <input
                            placeholder="e.g., Swimming Pool"
                            className="mt-1 w-full h-[40px] px-3 rounded-[10px] border border-[#D1D5DC] text-[14px] text-black placeholder:text-[#0A0A0A]/50"
                        />
                    </div>

                    <div>
                        <label className="text-[12px] text-[#364153]">
                            Type <span className="text-[#E7000B]">*</span>
                        </label>
                        <select className="mt-1 w-full h-[40px] px-3 rounded-[10px] border border-[#D1D5DC] text-[14px] text-black placeholder:text-[#0A0A0A]/50] appearance-none">
                            <option value="">Select type</option>
                            <option>Recreation</option>
                            <option>Social</option>
                            <option>Work</option>
                            <option>Sports</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-[12px] text-[#364153]">
                            Building <span className="text-[#E7000B]">*</span>
                        </label>
                        <select className="mt-1 w-full h-[40px] px-3 rounded-[10px] border border-[#D1D5DC] text-[14px] text-black placeholder:text-[#0A0A0A]/50] appearance-none">
                            <option value="">Select building</option>
                            <option>Building A</option>
                            <option>Building B</option>
                            <option>Building C</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-[12px] text-[#364153]">
                            Square Meters <span className="text-[#E7000B]">*</span>
                        </label>
                        <input
                            placeholder="e.g., 150"
                            type="number"
                            className="mt-1 w-full h-[40px] px-3 rounded-[10px] border border-[#D1D5DC] text-[14px] text-black placeholder:text-[#0A0A0A]/50"
                        />
                    </div>

                    <div>
                        <label className="text-[12px] text-[#364153]">
                            Capacity <span className="text-[#E7000B]">*</span>
                        </label>
                        <input
                            placeholder="e.g., 20"
                            type="number"
                            className="mt-1 w-full h-[40px] px-3 rounded-[10px] border border-[#D1D5DC] text-[14px] text-black placeholder:text-[#0A0A0A]/50"
                        />
                    </div>

                    <div>
                        <label className="text-[12px] text-[#364153]">
                            Operating days
                        </label>

                        <div className="mt-2 flex gap-2">
                            {days.map((day, index) => {
                                const active = selectedDays.includes(index);

                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => toggleDay(index)}
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
                                    className="mt-1 w-full h-[40px] px-3 rounded-[10px] border border-[#D1D5DC] text-[14px] text-black placeholder:text-[#0A0A0A]/50"
                                />
                            </div>

                            <div className="flex-1">
                                <label className="text-[12px] text-[#6A7282]">to</label>
                                <input
                                    type="time"
                                    className="mt-1 w-full h-[40px] px-3 rounded-[10px] border border-[#D1D5DC] text-[14px] text-black placeholder:text-[#0A0A0A]/50"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        disabled={!isFormValid}
                        style={{
                            backgroundColor: isFormValid ? "#001F3F" : "#99A1AF",
                            color: "#ffffff",
                            height: "44px",
                            width: "100%",
                            borderRadius: "12px",
                            fontSize: "14px",
                            border: "none",
                            cursor: isFormValid ? "pointer" : "not-allowed",
                            transition: "all 0.2s ease",
                        }}
                    >
                        Create Amenity
                    </button>

                </div>
            </div>
        </main>
    );
}