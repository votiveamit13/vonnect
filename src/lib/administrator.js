import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
    const token = match ? match[2] : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;

export const getBuildingWiseUsers = ({ buildingId, page = 1, limit = 10 } = {}) => {
  return api.get("/building-wise-users-list", {
    params: {
      building_id: buildingId,
      page,
      limit,
    },
  });
};

export const verifyUserApi = ({ user_id, status }) => {
  return api.post("/user-verification", { user_id, status });
};

// Unit Management
export const getUnitsApi = (params) => {
  return api.get("/units", { params });
};

export const getUnitDetailsApi = (id) => {
  return api.get(`/units/${id}`);
};

export const getUnitFamilyMembersApi = (unitId) => {
  return api.get(`/unit/family-members/${unitId}`);
};

export const getUnitFamilyMemberApi = (memberId) => {
  return api.get(`/unit/family-member/${memberId}`);
};

export const assignUserToUnitApi = (data) => {
  return api.post("/unit/assign-user", data);
};