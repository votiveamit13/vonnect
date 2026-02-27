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

export const changePasswordApi = (payload) => {
  return api.post("/change-password", payload);
};

export const getBuildings = () => api.get("/building-list");

export const forgotPasswordApi = (email) => {
  return api.post("/forgot-password", { email });
};

export const resetPasswordApi = (token, password, confirmPassword) => {
  return api.post(`/reset-password/${token}`, {
    password,
    confirmPassword,
  });
};

export const updateProfilePictureApi = (file) => {
  const formData = new FormData();
  formData.append("profile_picture", file);

  return api.put("/update-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAssociatedBuildings = () => {
  return api.get("/associate-building-list");
};

export const getUserDocumentsApi = () => {
  return api.get("/user-document-list");
};

export const updateLanguageApi = (language_code) => {
  return api.put("/language-update", { language_code });
};

export const getNotificationTypesApi = () => {
  return api.get("/notification-types-list");
};

export const getAboutApi = () => {
  return api.get("/api/about");
}

export const getAgreementApi = () => {
  return api.get("/api/agreement");
}