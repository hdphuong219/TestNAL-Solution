import axios from "axios";

const requestServer = axios.create({
  baseURL: "https://api-placeholder.herokuapp.com/api/v2",
  timeout: 600000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

requestServer.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete requestServer.defaults.headers.common.Authorization;
    }
    return config;
  },

  (error) => Promise.reject(error)
);

export const Api = {
  requestServer,
};
