// CRUD - Create Read Update Delete - Tạo Đọc Sửa Xóa

// const liElements = document.getElementsByTagName("li");
// const liElements = document.getElementsByClassName("li");
// const divElement = document.getElementById("greeting");

const liElement = document.querySelector("div ul li+li");
const liElements = document.querySelectorAll("div ul li");

// liElements.forEach((li) => {
//   console.log(li.textContent);
// });

// console.log(Array.from(liElements));

// const abc = [...liElement.parentElement.children];

// console.log(liElement.textContent);
// liElement.textContent = "<b>Hello World</b>";

// console.log(liElement.innerHTML); // Lỗ hổng XSS
// liElement.innerHTML = "<b>Hello World</b>";

// console.log(liElement.outerHTML);
// liElement.outerHTML = "<b>Hello World</b>";

// console.log(liElement.getAttribute("abc"));
// console.log(liElement.getAttribute("class"));
// console.log(liElement.setAttribute("class", "item-2-update"));
// liElement.removeAttribute("class");

// console.log(liElement.className);
// liElement.className = "item-2-update";
// liElement.className = "";
// console.log(liElement.id);

// console.log(liElement.classList.add("text-red-500"));
// console.log(liElement.classList.remove("item-2-update"));
// console.log(liElement.classList.contains("item"));
// console.log(liElement.classList.toggle("item-has"));

const buttonElements = document.querySelectorAll("button");

buttonElements.forEach((button) => {
  // console.log(button.getAttribute("data-product-id"));
  console.log(button.dataset.productId);
});

// liElement.style = "color: orange; font-size: 30px";
// liElement.style.color = "violet";
// liElement.style.fontSize = "30px";

Object.assign(liElement.style, {
  color: "orange",
  fontSize: "30px",
  backgroundColor: "black",
});

// const newDiv = document.createElement("div");
// newDiv.textContent = "Hello World";
// newDiv.style.color = "green";

// console.log(newDiv);

// liElement.prepend(newDiv);

// newDiv.remove();

liElement.innerHTML = `
  Item 2
  <div style="color: green">
    Hello World
  </div>
`;

// liElement.remove();
// liElement.outerHTML = ``;

// liElement.onclick = () => {
//   liElement.style.userSelect = "none";
//   liElement.style.color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

//   liElement.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
// };

// liElement.onclick = () => {
//   liElement.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
// };

// Khi click thì thực hiện Hàm 1
liElement.addEventListener("click", (event) => {
  // console.log(event.target);
  // console.log(event.currentTarget);
  // console.log(event.preventDefault());

  liElement.style.userSelect = "none";
  liElement.style.color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
});

// Khi click thì thực hiện Hàm 2

// const handleClick = () => changeBackgroundColor("brown");

// const changeBackgroundColor = (color) => {
//   liElement.style.backgroundColor = color;
// };
// liElement.addEventListener("click", handleClick);

// liElement.removeEventListener("click", handleClick);

const formElement = document.querySelector("form");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Submit form");
});
