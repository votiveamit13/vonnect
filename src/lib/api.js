import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const changePasswordApi = (payload) => {
  return api.post("/change-password", payload);
};

export const getBuildings = () => api.get("/building-list");

export const forgotPasswordApi = (email) => {
  return api.post("/forgot-password", { email });
};

export const resetPasswordApi = (token, password) => {
  return api.post(`/reset-password/${token}`, { password });
};