import axios from "axios";

const apiImg = axios.create({
  baseURL: "https://camping-web-production.up.railway.app",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

apiImg.interceptors.request.use(
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

export default apiImg;
