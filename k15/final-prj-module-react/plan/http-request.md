# Http request

## 1. Cấu trúc thư mục

```
src/
 └── utils/
      └── httpRequest.js
```

## 2. Chi tiết httpRequest.js

```javascript
// src/utils/httpRequest.js
import axios from "axios";

// Giả định các hàm quản lý Token:
const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");
const setTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};
const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// ----------------------------------------------------
// 1. AXIOS INSTANCE CHÍNH (Dùng cho mọi API trừ refresh)
// ----------------------------------------------------
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.yourdomain.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ----------------------------------------------------
// 2. AXIOS INSTANCE PHỤ (CHỈ DÙNG CHO API REFRESH TOKEN)
// ----------------------------------------------------
const axiosRefresh = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://api.yourdomain.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------------------------------------------------
// 3. LOGIC XỬ LÝ REFRESH TOKEN VÀ HÀNG ĐỢI REQUEST
// ----------------------------------------------------
let isRefreshing = false; // Cờ hiệu để ngăn chặn race condition (nhiều request refresh cùng lúc)
let failedQueue = []; // Hàng đợi lưu các request lỗi 401 cần retry

const processQueue = (error) => {
  // Xử lý tất cả các request trong hàng đợi
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      // Gửi lại request với token mới
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Hàm gọi API làm mới token
const refreshToken = async () => {
  const refreshTokenValue = getRefreshToken();
  if (!refreshTokenValue) {
    throw new Error("No refresh token available");
  }

  // Dùng axiosRefresh để tránh lặp vô hạn
  const response = await axiosRefresh.post("/auth/refresh", {
    refreshToken: refreshTokenValue,
  });
  return response.data; // Giả định trả về { accessToken, refreshToken }
};

// ----------------------------------------------------
// 4. INTERCEPTOR REQUEST CHO AXIOS CLIENT
// ----------------------------------------------------
instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    // Đính kèm Access Token vào Header Bearer
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ----------------------------------------------------
// 5. INTERCEPTOR RESPONSE CHO AXIOS CLIENT (Xử lý 401)
// ----------------------------------------------------
instance.interceptors.response.use(
  (response) => response, // Thành công, trả về response
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra:
    // 1. Lỗi phải là 401 Unauthorized
    // 2. Chưa thử lại (để tránh lặp vô hạn nếu refresh token cũng bị lỗi)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Đánh dấu request này đã được thử lại một lần
      originalRequest._retry = true;

      // Nếu không phải là request đang làm mới token, thêm nó vào hàng đợi
      if (isRefreshing) {
        // Trả về một Promise đang chờ, sẽ được resolve/reject sau khi refresh thành công/thất bại
        return (
          new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            // Promise này sẽ resolve lại request gốc với token mới
            .then(() => {
              return instance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            })
        );
      }

      // --- CHỈ MỘT REQUEST ĐƯỢC CHỌN LÀM REFRESHER ---
      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          const newTokens = await refreshToken();
          setTokens(newTokens);

          // Cập nhật token mới cho request gốc
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

          // Xử lý tất cả các request trong hàng đợi
          processQueue();

          // Gửi lại request gốc
          resolve(instance(originalRequest));
        } catch (refreshError) {
          // Refresh thất bại (Refresh Token không hợp lệ)
          clearTokens();
          processQueue(refreshError);
          reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      });
    }

    return Promise.reject(error);
  },
);

export default instance;
```
