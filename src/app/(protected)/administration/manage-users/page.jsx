"use client";

import NavigationHeader from "@/components/common/NavigationHeader";
import { FiChevronRight, FiUser, FiMail, FiPhone, FiHome, FiHash } from "react-icons/fi";

export default function ManageUsers() {
    const users = [
        {
            id: 1,
            name: "Maria Santos",
            idNumber: "EMP-2023-001",
            email: "maria.santos@example.com",
            building: "Building A - 405",
            mobile: "+971 50 123 4567",
        },
        {
            id: 2,
            name: "John Carter",
            idNumber: "EMP-2023-002",
            email: "john.carter@example.com",
            building: "Building B - 210",
            mobile: "+971 55 987 6543",
        },
    ];

    const handleApprove = (id) => {
        console.log("Approved:", id);
    };

    const handleReject = (id) => {
        console.log("Rejected:", id);
    };

    return (
        <main className="min-h-screen w-full bg-[#F5F7FA]">
            <NavigationHeader
                showBack
                backHref="/administration"
                title={`Manage Users`}
            />
            <div className="px-4 sm:px-6 mt-4 pb-10">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden mb-4"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between bg-[#001F3F] px-4 py-3 text-white">
                            <div className="flex items-center gap-2">
                                <FiUser />
                                <span className="text-sm font-medium">{user.name}</span>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                            <div>
                                <p className="text-[#6A7282]">ID Number</p>
                                <p className="text-[#001F3F] font-medium flex items-center gap-2">
                                    <FiHash /> {user.idNumber}
                                </p>
                            </div>

                            <div>
                                <p className="text-[#6A7282]">Email</p>
                                <p className="text-[#001F3F] font-medium flex items-center gap-2">
                                    <FiMail /> {user.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-[#6A7282]">Building</p>
                                <p className="text-[#001F3F] font-medium flex items-center gap-2">
                                    <FiHome /> {user.building}
                                </p>
                            </div>

                            <div>
                                <p className="text-[#6A7282]">Mobile Number</p>
                                <p className="text-[#001F3F] font-medium flex items-center gap-2">
                                    <FiPhone /> {user.mobile}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="px-4 pb-4 flex gap-3">
                            <button
                                onClick={() => handleApprove(user.id)}
                                className="flex-1 h-10 rounded-lg bg-[#001F3F] text-white text-sm hover:opacity-90 transition"
                            >
                                Approve
                            </button>

                            <button
                                onClick={() => handleReject(user.id)}
                                className="flex-1 h-10 rounded-lg border border-red-500 text-red-500 text-sm hover:bg-red-50 transition"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}