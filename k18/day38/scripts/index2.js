import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";

try {
  await axios.post("https://api.escuelajs.co/api/v1/auth/refresh-token", {
    refreshToken: "abc",
  });
} catch (error) {
  console.log(error);
}
