// const inputs = document.querySelectorAll("#form-login input");
// const formLogin = document.querySelector("#form-login");

// inputs.forEach((input) => {
//   input.addEventListener("input", (e) => {
//     const value = e.target.value;
//     const name = e.target.name;

//     if (name !== "password") {
//       localStorage.setItem(name, value);
//     }
//   });

//   input.value = localStorage.getItem(input.name) || "";
// });

// formLogin.addEventListener("submit", (e) => {
//   e.preventDefault();
//   // localStorage.clear();
//   inputs.forEach((input) => {
//     localStorage.removeItem(input.name);
//   });
//   formLogin.reset();
// });

//server: abc123 - 1786284382948
//client: abc123
// req -(abc123)-> server

//server
//client: JWT
// req -(JWT)-> server
// blacklist: JWT - 1786287908938

// const payload = {
//   sub: "1234567890",
//   name: "John Doe",
//   admin: true,
//   iat: 1516239022,
//   expiredAt: 1786287908938,
// };
