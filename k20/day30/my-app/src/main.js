import { httpRequest } from "./libs/httpRequest.js";

// const response = await httpRequest.post("/api/auth/register", {
//   username: "dungvq",
//   email: "dung.vuquoc010210@gmail.com",
//   password: "Aa123456@",
//   display_name: "dungvq",
//   bio: "dungvq bio",
//   country: "VN",
// });

const response = await httpRequest.get("/api/artists");
console.log(response);

// Header
// Main
// Sidebar
// Controls
