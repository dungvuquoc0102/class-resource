import axios from "axios";

export const instance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            "https://dummyjson.com/auth/refresh",
            {
              refreshToken: refreshToken,
            },
          );
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            data;

          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(error.config);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    } else {
      return Promise.reject(error);
    }
  },
);
