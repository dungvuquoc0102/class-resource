// console.log(document);
// document -> HTMLDocument.prototype -> Document.prototype
// -> Node.prototype -> EventTarget.prototype -> Object.prototype
// HTMLDocument.prototype.abc = "Hello";
// console.log(document.abc);

// const btnOpenEl = document.getElementById("btn-open");
// const btnEls = document.getElementsByClassName("btn");
// const btnEls = document.getElementsByTagName("div");
let btnOpenEl = document.querySelector("#btn-open");
// const btnEls = document.querySelectorAll(".btn");
// const parentEl = document.querySelector(".parent");
// const deleteBtnEl = document.querySelector("#btn-delete");

// console.log(btnOpenEl);
// console.log(
//   [...btnEls].forEach((btnEl) => {
//     console.log(btnEl);
//   }),
// );
// console.log(btnEls);
// btnEls[0].remove();
// console.log(btnEls);

// console.log(btnOpenEl);
// console.log(
//   btnEls.forEach((btnEl) => {
//     console.log(btnEl);
//   }),
// );

// console.log(btnOpenEl.innerHTML);
// console.log(btnOpenEl.textContent);
// console.log(btnOpenEl.innerText);

// console.log(btnOpenEl.outerHTML);
// console.log(btnOpenEl.outerText);

// btnOpenEl.setAttribute("title", "Open button");
// console.log(btnOpenEl.getAttribute("id"));
// console.log(btnOpenEl.getAttribute("class"));
// console.log(btnOpenEl.getAttribute("title"));
// btnOpenEl.removeAttribute("class");

// console.log(btnOpenEl.id);
// console.log(btnOpenEl.className);
// btnOpenEl.title = "Open button";

// btnOpenEl.style = "color: red; background-color: brown;";
// btnOpenEl.style.color = "red";
// btnOpenEl.style.backgroundColor = "brown";
// btnOpenEl.className = "text-orange-500 bg-blue-500 px-2 py-1 rounded-md";
// console.log(btnOpenEl.classList.contains("bg-blue-500"));

// const newBtn = document.createElement("button");
// newBtn.textContent = "Info";
// newBtn.className = "text-white bg-green-400 px-2 py-1 rounded-md";

// deleteBtnEl.insertAdjacentElement("beforebegin", newBtn);
// deleteBtnEl.insertAdjacentElement("afterend", newBtn);
// parentEl.append(newBtn);
// parentEl.prepend(newBtn);

// deleteBtnEl.insertAdjacentHTML(
//   "afterend",
//   "<button class='text-white bg-green-400 px-2 py-1 rounded-md'>Hello</button>",
// );
// parentEl.innerHTML = `
//   <button class="text-white bg-green-400 px-2 py-1 rounded-md">
//     Info
//   </button>
// `;

// deleteBtnEl.remove();

// const products = [
//   { id: 1, name: "Product 1", price: 100 },
//   { id: 2, name: "Product 2", price: 200 },
//   { id: 3, name: "Product 3", price: 300 }
// ];

// btnOpenEl.onclick = function () {
//   console.log("Click");
// };
// btnOpenEl.onclick = function () {
//   console.log("Hello");
// };
// btnOpenEl.onclick = null;

btnOpenEl.addEventListener("click", function (e) {
  console.dir(e);
});

// const clickHandler = function () {
//   console.log("Click");
// };
// btnOpenEl.addEventListener("click", clickHandler);
// btnOpenEl.addEventListener("click", function () {
//   console.log("Hello");
// });
// btnOpenEl.removeEventListener("click", clickHandler);
