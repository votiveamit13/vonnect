"use client";

import { useEffect, useState } from "react";
import NavigationHeader from "@/components/common/NavigationHeader";
import { FiUser, FiMail, FiPhone, FiHome, FiHash } from "react-icons/fi";
import { getBuildingWiseUsers, verifyUserApi } from "@/lib/administrator";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const match = document.cookie.match(new RegExp("(^| )buildingId=([^;]+)"));
        const buildingId = match ? match[2] : null;

        if (!buildingId) {
          toast.error("Building not selected");
          return;
        }

        const res = await getBuildingWiseUsers({ buildingId, page, limit: 10 });
        setPagination(res.data.pagination);

        const apiUsers = res.data?.data || [];

        const normalized = apiUsers.map((item) => ({
          id: item.user?.id,
          name: item.user?.name || "--",
          email: item.user?.email || "--",
          mobile: item.user?.details?.phone || "--",
          idNumber: item.user?.details?.id_number || "--",
          building: item.building?.name || "--",
          isActive: item.user?.is_active ?? false,
        }));

        setUsers(normalized);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

const handleApprove = async (id) => {
  try {
    setProcessingId(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    await verifyUserApi(id);
    toast.success("User approved & verification email sent");
  } catch (err) {
    toast.error("Failed to approve user");
    refetchUsers();
  } finally {
    setProcessingId(null);
  }
};

  const handleReject = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    // toast.success("User rejected (hook API here)");
  };

  return (
    <main className="min-h-screen w-full bg-[#F5F7FA]">
      <NavigationHeader showBack backHref="/administration" title="Manage Users" />

      <div className="px-4 sm:px-6 mt-4 pb-10">
        {loading ? (
          <p className="text-center text-sm text-gray-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No users found.</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden mb-4">
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
                  disabled={processingId === user.id}
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
          ))
        )}

        {/* Pagination UI (optional) */}
        {pagination && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm">
              Page {pagination.current_page} of {pagination.total_pages}
            </span>

            <button
              disabled={page >= pagination.total_pages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}