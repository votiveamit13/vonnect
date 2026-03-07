"use client";

import { useEffect, useState } from "react";
import NavigationHeader from "@/components/common/NavigationHeader";
import { FiUser, FiMail, FiPhone, FiHome, FiHash } from "react-icons/fi";
import {
  getBuildingWiseUsers,
  verifyUserApi,
  getUnitsApi,
  assignUserToUnitApi,
} from "@/lib/administrator";
// import toast from "react-hot-toast";
import Pagination from "@/components/Pagination";
import { useSelector } from "react-redux";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const roles = useSelector((state) => state.lookup.roles);

  const [unitsByBuilding, setUnitsByBuilding] = useState({});
  const [assignedUsers, setAssignedUsers] = useState({});
  const OWNER_ROLE_ID = 2;
  const TENANT_ROLE_ID = 3;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const match = document.cookie.match(
          new RegExp("(^| )buildingId=([^;]+)")
        );
        const buildingId = match ? match[2] : null;

        if (!buildingId) {
          // toast.error("Building not selected");
          return;
        }

        const res = await getBuildingWiseUsers({
          buildingId,
          page,
          limit: 10,
        });

        const apiUsers = res.data?.data || [];
        setPagination(res.data.pagination);

        const normalized = apiUsers.map((item) => ({
          id: item.user?.id,
          name: item.user?.name || "--",
          email: item.user?.email || "--",
          mobile: item.user?.details?.phone || "--",
          idNumber: item.user?.details?.id_number || "--",
          building: item.building?.name || "--",
          buildingId: item.building?.id,
          roleId: Number(item.user?.role_id),
          isActive: item.user?.is_active ?? false,
        }));

        setUsers(normalized);

        // 🔥 Fetch units for unique buildings
        const uniqueBuildings = [
          ...new Set(normalized.map((u) => u.buildingId).filter(Boolean)),
        ];

        for (const bId of uniqueBuildings) {
          if (!unitsByBuilding[bId]) {
            const unitsRes = await getUnitsApi({
              building_id: bId,
              page: 1,
              limit: 100,
            });

            setUnitsByBuilding((prev) => ({
              ...prev,
              [bId]: unitsRes.data?.data || [],
            }));
          }
        }
      } catch (err) {
        console.error(err);
        // toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const getRoleName = (roleId) => {
    const role = roles.find((r) => Number(r.id) === Number(roleId));
    return role?.name || "--";
  };

  const handleAssignUnit = async (user, unitId) => {
    try {
      setProcessingId(user.id);

      const isOwner = user.roleId === OWNER_ROLE_ID;
      const isTenant = user.roleId === TENANT_ROLE_ID;

      await assignUserToUnitApi({
        user_id: user.id,
        unit_id: unitId,
        is_owner: isOwner,
        is_member: isOwner,   // owner = true, tenant = false
        role_id: user.roleId,
      });

      setAssignedUsers((prev) => ({
        ...prev,
        [user.id]: true,
      }));

      // toast.success("Unit assigned successfully");
    } catch (err) {
      console.error(err);
      // toast.error(
      //   err?.response?.data?.message || "Failed to assign unit"
      // );
    } finally {
      setProcessingId(null);
    }
  };

  const handleApprove = async (id) => {
    try {
      setProcessingId(id);

      await verifyUserApi({ user_id: id, status: 1 });

      setUsers((prev) => prev.filter((u) => u.id !== id));

      // toast.success("User approved & verification email sent");
    } catch (err) {
      console.error(err);
      // toast.error(
      //   err?.response?.data?.message || "Failed to approve user"
      // );
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setProcessingId(id);

      await verifyUserApi({ user_id: id, status: 2 });

      setUsers((prev) => prev.filter((u) => u.id !== id));

      // toast.success("User rejected successfully");
    } catch (err) {
      console.error(err);
      // toast.error(
      //   err?.response?.data?.message || "Failed to reject user"
      // );
    } finally {
      setProcessingId(null);
    }
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
              <div className="flex items-center justify-between bg-[#001F3F] px-4 py-3 text-white">
                <div className="flex items-center gap-2">
                  <FiUser />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
              </div>

              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div>
                  <p className="text-[#6A7282]">ID Number</p>
                  <p className="text-[#001F3F] font-medium flex items-center gap-2">
                    <FiHash /> {user.idNumber}
                  </p>
                </div>

                <div>
                  <p className="text-[#6A7282]">User Type</p>
                  <p className="text-[#001F3F] font-medium flex items-center gap-2">
                    <FiUser /> {getRoleName(user.roleId)}
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

                {(user.roleId === OWNER_ROLE_ID ||
                  user.roleId === TENANT_ROLE_ID) && (
                    <div className="pb-3">
                      <select
                        disabled={assignedUsers[user.id]}
                        onChange={(e) =>
                          handleAssignUnit(user, e.target.value)
                        }
                        className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3 text-sm"
                      >
                        <option value="">
                          {assignedUsers[user.id]
                            ? "Unit Assigned"
                            : "Assign Unit"}
                        </option>

                        {unitsByBuilding[user.buildingId]?.map((unit) => (
                          <option key={unit.id} value={unit.id}>
                            Unit {unit.unit_number}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

              </div>

              <div className="px-4 pb-4 flex gap-3">
                <button
                  disabled={
                    processingId === user.id ||
                    (
                      (user.roleId === OWNER_ROLE_ID ||
                        user.roleId === TENANT_ROLE_ID) &&
                      assignedUsers[user.id] !== true
                    )
                  }
                  onClick={() => handleApprove(user.id)}
                  className={`flex-1 h-10 rounded-lg text-sm transition
    ${(user.roleId === OWNER_ROLE_ID ||
                      user.roleId === TENANT_ROLE_ID) &&
                      assignedUsers[user.id] !== true
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-[#001F3F] text-white hover:opacity-90"
                    }
    ${processingId === user.id ? "opacity-70 cursor-wait" : ""}
  `}
                >
                  {processingId === user.id ? "Approving..." : "Approve"}
                </button>

                <button
                  disabled={processingId === user.id}
                  onClick={() => handleReject(user.id)}
                  className={`flex-1 h-10 rounded-lg text-sm transition
                    ${processingId === user.id
                      ? "border border-gray-300 text-gray-400 cursor-not-allowed"
                      : "border border-red-500 text-red-500 hover:bg-red-50"}
                  `}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}

        <Pagination
          currentPage={pagination?.current_page}
          totalPages={pagination?.total_pages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </main>
  );
}