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

export const updateUnitFamilyMemberApi = (id, data) => {
  return api.put(`/unit/family-member/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addUnitFamilyMemberApi = (formData) => {
  return api.post("/unit/add-family-members", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteUnitFamilyMemberApi = (unitId, memberId) => {
  return api.delete(`/unit/family-members/${unitId}/${memberId}`);
};

export const assignOwnerToUnitApi = (payload) => {
  return api.post("/unit/assign-owner", payload);
};

export const getUnitDocumentsApi = (unitId) => {
  return api.get(`/unit/documents/${unitId}`);
};

export const deleteUnitDocumentApi = (unitId, documentId) => {
  return api.delete(`/unit/documents/${unitId}/${documentId}`);
};

export const uploadUnitDocumentApi = (formData) => {
  return api.post("/unit/upload-document", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const assignUserToUnitApi = (data) => {
  return api.post("/unit/assign-user", data);
};

// Residence
export const getResidenceAmenitiesApi = () => {
  return api.get("/residence/amenities");
};

export const getResidenceAmenityApi = (id) => {
  return api.get(`/residence/amenity/${id}`);
};

export const updateAmenityApi = (id, payload) => {
  return api.put(`/residence/amenity/${id}`, payload);
};

export const createAmenityApi = (payload) => {
  return api.post(`/residence/add-amenity`, payload);
};

export const getResidenceDocumentsApi = () => {
  return api.get("/residence/documents");
};

export const uploadResidenceDocumentApi = (formData) => {
  return api.post("/residence-document", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteResidenceDocumentApi = (id) => {
  return api.delete(`/residence/document/${id}`);
};