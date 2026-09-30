// const btnAddToCarts = document.querySelectorAll("button[data-product-id]");

// btnAddToCarts.forEach((btn) => {
//   btn.addEventListener("click", (event) => {
//     const productId = event.target.dataset.productId;
//     console.log(productId);
//   });
// });

// const productList = document.querySelector("ul#product-list");

// productList.addEventListener("click", (event) => {
//   const target = event.target;

//   // if (target.matches("button[data-product-id]")) {
//   //   console.log("Click vào button");
//   // }

//   if (target.closest("button[data-product-id]")) {
//     console.log("Click vào button");
//   }
// });

// let newWindow;

// newWindow = window.open(
//   "https://www.google.com.vn",
//   "_blank",
//   "width=400,height=400",
// );
// setTimeout(newWindow.close, 3000);

// console.log(window.innerWidth);
// console.log(window.innerHeight);

// console.log(window.outerWidth);
// console.log(window.outerHeight);

// window.addEventListener("resize", () => {
//   console.log(window.outerWidth);
//   console.log(window.outerHeight);
// });

// window.addEventListener("orientationchange", () => {
//   console.log("Change orientation");
// });

// const id = setTimeout(() => {
//   console.log("Hello F8");
// }, 3000);

// const id = setInterval(() => {
//   console.log("Hello F8");
// }, 1000);

// // clearTimeout(id);
// const btnStop = document.querySelector("#clear-interval");
// btnStop.addEventListener("click", () => {
//   clearInterval(id);
// });

// const timeAgo = document.querySelector("#time-ago");

// timeAgo.textContent = "Vừa xong";
// let minutes = 1;
// setInterval(() => {
//   timeAgo.textContent = minutes + " phút trước";
//   minutes++;
// }, 60_000);

// alert("Hello F8");
// const isConfirm = confirm("Bạn có muốn tiếp tục không?");
// console.log(isConfirm);
// const value = prompt("Nhập tên của bạn", "Hoàng");
// console.log(value);

// console.log(screen.width);
// console.log(screen.height);

// console.log(screen.orientation);

// console.log(location.protocol);
// console.log(location.hostname);
// console.log(location.port);
// console.log(location.pathname);
// console.log(location.search);
// console.log(location.hash);

// const path = location.pathname;
// document.body.innerHTML = `Bạn đang ở trang ${path} <button id="navigate-user-page">Trang user</button>`;

// const btnNavigate = document.querySelector("#navigate-user-page");

// btnNavigate.addEventListener("click", () => {
//   history.pushState(null, "", "/user");
//   document.body.textContent = "Bạn đang ở trang user";
// });

// window.addEventListener("popstate", () => {
//   const path = location.pathname;
//   document.body.innerHTML = `Bạn đang ở trang ${path} <button id="navigate-user-page">Trang user</button>`;
// });

const PI = 3.14;

navigator.userAgent = "abc";
console.log(navigator.userAgent);
navigator.language = "abc";
console.log(navigator.language);
console.log(navigator.languages);
console.log(navigator.onLine);

window.addEventListener("online", () => {
  console.log("Có kết nối mạng");
});

window.addEventListener("offline", () => {
  console.log("Mất kết nối mạng");
});

console.log(navigator.platform);
console.log(
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
  }),
);
