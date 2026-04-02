import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor (Bạn có thể thêm logic gửi token, xử lý lỗi chung ở đây)
axiosClient.interceptors.request.use(
  (config) => {
    // Ví dụ: Lấy token từ Local Storage hoặc Redux Store
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor xử lý phản hồi
axiosClient.interceptors.response.use(
  (response) => {
    return response.data; // Trả về data (thường là { success: true, data: ... })
  },
  (error) => {
    // Xử lý lỗi toàn cục (ví dụ: logOut nếu nhận 401 Unauthorized)
    if (error.response && error.response.status === 401) {
      // Log out người dùng
    }
    return Promise.reject(error.response.data || error.message);
  },
);

export default axiosClient;
