// // console.log(localStorage);
// // console.log(sessionStorage);
// // console.log(document.cookie);

// console.log(localStorage);
// console.log(localStorage.getItem("abc"));
// console.log(localStorage.getItem("a"));

// localStorage.setItem("k22-day17", JSON.stringify({ name: "Alice", age: 30 }));
// console.log(localStorage.getItem("k22-day17"));

// console.log(localStorage.length);

// // Truy cập trang A - request (tài khoản mật khẩu) -> A biết bạn là ai
// localStorage.setItem("username", "abc");
// localStorage.setItem("password", "123");

// // fetch("https://example.com/api", {
// //   method: "POST",
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// //   body: JSON.stringify({
// //     username: localStorage.getItem("username"),
// //     password: localStorage.getItem("password"),
// //   }),
// // });

// // Đăng nhập   (tài khoản, mật khẩu) -> server
// // Server trả về token -> lưu vào localStorage

// const inputElement = document.querySelector("#email");
// inputElement.addEventListener("input", (event) => {
//   const email = inputElement.value;
//   localStorage.setItem("email", email);
// });

// inputElement.value = localStorage.getItem("email") || "";

// console.log(sessionStorage.getItem("IsThisFirstTime_Log_From_LiveServer"));

// sessionStorage.setItem("abc", "123");

// sessionStorage.removeItem("abc");

// console.log(sessionStorage.length);

// sessionStorage.setItem("a", 10);

// // Object.fromEntries(
// //   document.cookie.split(";").map((cookie) => {
// //     const [key, value] = cookie.split("=");
// //     return [key.trim(), value.trim()];
// //   }),
// // );

// // vnexpress.net
// // request -> gửi lên đúng vnexpress.net thì mới gửi kèm cookie

// // .vnexpress.net
// // request -> gửi lên với bất kỳ tên miền nào có dạng
// // <sub-domain>.vnexpress.net/abc/... / vnexpress.net/abc/...
// // thì đều gửi kèm cookie

// // 2026-10-03T15:00:00.000Z

// // Tấn công XSS - Excute  Script

// // innerHTML

// const result = document.querySelector("#result");

// result.innerHTML = `<button onclick="console.log(localStorage.getItem('p'));">Click me</button>`;

// // server gửi yêu cầu set cookie về cho trình duyệt httpOnly: true
