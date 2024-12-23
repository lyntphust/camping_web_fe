import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8888",
  headers: {
    "accept ": "application/json",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
