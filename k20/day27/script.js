// const tabBtns = document.querySelectorAll(".tab");
// const tabContents = document.querySelectorAll(".tab-content");
// tabBtns[0].classList.add("active");
// tabContents[0].classList.add("active");
// tabBtns.forEach((tabBtn, index) => {
//   tabBtn.addEventListener("click", () => {
//     const activedBtn = document.querySelector(".tab.active");
//     if (activedBtn) {
//       activedBtn.classList.remove("active");
//     }
//     tabBtn.classList.add("active");
//     const activedTab = document.querySelector(".tab-content.active");
//     if (activedTab) {
//       activedTab.classList.remove("active");
//     }
//     tabContents[index].classList.add("active"); // Hoặc
//     // tabContents[tabBtn.dataset.tab - 1].classList.add("active");
//   });
// });

// const customEvent = new CustomEvent("customEvent", {
//   bubbles: true,
//   detail: {
//     message: "Hello",
//   },
// });
// const btn = document.querySelector("button");

// document.addEventListener("click", () => {
//   console.log("Click vào nút");
//   btn.dispatchEvent(customEvent);
// });

// document.addEventListener("customEvent", (e) => {
//   console.log("Custom event được gọi với dữ liệu:", e.detail);
// });

// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);
// const tabs = $$(".tab");
// const tabContents = $$(".tab-content");
// tabs.forEach((tab) => {
//   const currentTab = tab.dataset.tab;
//   tab.addEventListener("click", () => {
//     tabContents.forEach((tabContent) => {
//       if (currentTab === tabContent.dataset.tab) {
//         tabContent.classList.remove("hidden");
//       } else {
//         tabContent.classList.add("hidden");
//       }
//     });
//     tabs.forEach((item) => {
//       if (currentTab === item.dataset.tab) {
//         item.classList.add("active");
//       } else {
//         item.classList.remove("active");
//       }
//     });
//   });
// });

// console.log(window.document);
// console.log(window.innerWidth);
// console.log(window.innerHeight);
// console.log(window.outerWidth);
// console.log(window.outerHeight);

// alert("Hello");
// console.log(confirm("Bạn có muốn tiếp tục không?"));
// console.log(prompt("Sửa công việc:", "Nấu cơm"));
// const id = setTimeout(() => {
//   console.log("Chạy sau 3 giây");
// }, 3000);
// const id2 = setTimeout(() => {
//   console.log("Chạy sau 3 giây");
// }, 0);

// console.log(id);
// console.log(id2);

// const id = setInterval(() => {
//   console.log("Chạy sau 3 giây");
// }, 3000);

// clearInterval(id2);

// window.open("https://www.google.com", "_blank");
// setTimeout(() => {
//   window.close();
// }, 3000);
// let hello = Number(location.search.split("=")[1]) || 10;
// const btn = document.querySelector("button");
// btn.addEventListener("click", () => {
//   // console.log((hello += 10));
//   // console.log((location.search = `?hello=${hello}`));

//   // location.href = "/k20/day27/contact.html";
//   location.assign("/k20/day27/contact.html");
//   // location.assign("https://www.google.com");
//   // location.replace("/k20/day27/contact.html");
//   // location.reload();
// });

// const btnNoReload = document.querySelector("#change-page-no-reload");
// btnNoReload.addEventListener("click", () => {
//   history.pushState({ page: "contact" }, "Contact", "/k20/day27/contact.html");
//   document.title = "Contact";
//   document.body.innerHTML = "<h1>Contact</h1>";
//   // history.replaceState(
//   //   { page: "contact" },
//   //   "Contact",
//   //   "/k20/day27/contact.html",
//   // );
// });

// window.addEventListener("popstate", (e) => {
//   console.log("popstate", e.state);
//   if (e.state?.page === "contact") {
//     document.title = "Contact";
//     document.body.innerHTML = "<h1>Contact</h1>";
//   } else {
//     document.title = "Home";
//     document.body.innerHTML = "<h1>Home</h1>";
//   }
// });

console.log(navigator.userAgent);
console.log(navigator.language);
console.log(navigator.languages);
console.log(navigator.onLine);
console.log(
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
  }),
);

const employee = {
  name: "Nguyen Van A",
  age: 30,
  info() {
    console.log(`Tên: ${this.name}, tuổi: ${this.age}`);
  },
};

const newObj = Object.create(employee);
