// console.log(1);
// setTimeout(() => {
//   console.log(2);
// }, 2000);
// console.log(3);

// Callback
// Promise
// Async/await

// function sum(num1, num2, callback) {
//   return callback(num1) + callback(num2);
// }

// sum(1, 2, (num) => {
//   return Number(num);
// });

// const xhr = new XMLHttpRequest();

// xhr.open("GET", "https://api01.f8team.dev/api/products");
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     const products = JSON.parse(xhr.responseText);
//     console.log(products);
//   }
// };
// xhr.onerror = function () {
//   console.log("Error");
// };
// xhr.send();

// setTimeout(() => {
//   console.log("1");
//   setTimeout(() => {
//     console.log("2");
//   }, 1000);
// }, 1000);

// const promise = new Promise((resolve, reject) => {
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       const products = JSON.parse(xhr.responseText);
//       resolve(products);
//     }
//   };
// });
// const promise2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Success 2");
//   }, 2000);
// });

// promise
//   .then((result) => {
//     console.log(result);
//     return promise2;
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// const fetchData = async () => {
//   const result = await promise;
//   console.log(result);
//   const result2 = await promise2;
//   console.log(result2);
// };

// fetchData();

// Đoạn code đồng bộ
// Đoạn code bất đồng bộ
//
//
// Bước 1: Đoạn code tính toán ... -> Gửi lên server
// Bước 2: Đoạn code xử lý kết quả

// const promise = new Promise((resolve, reject) => {
//   const num1 = 1;
//   const num2 = 2;

//   const sum = num1 + num2;
//   setTimeout(() => {
//     resolve(sum);
//   }, 2000);
// });

// let a;
// // Gửi lên server
// const fetchData = async () => {
//   await promise;
//   const result = {
//     id: 3,
//     name: "Iphone 18",
//     price: 1200,
//     stock: 100,
//   };
//   a = result;
//   console.log(`Tên sản phẩm: ${result.name}, giá ${result.price}`);
// };

// fetchData();

// console.log(a);
const renderProducts = (products) => {
  const htmlString = products
    .map((product) => {
      return `
      <li class="border border-gray-300 rounded-lg">
        <a class="" href="./product-detail.html?id=${product.id}">
          <img class="w-full aspect-[2/1] rounded-t-lg object-cover" src="https://picsum.photos/500/500" alt="${product.title}" />
          <div class="p-4">
            <p class="font-bold">${product.title}</p>
            <p class="text-orange-400 font-bold">$${product.price}</p>
          </div>
        </a>
      </li>  
    `;
    })
    .join("");
  document.querySelector("#product-list").innerHTML = htmlString;
};

const fetchData = async () => {
  const result = await fetch("https://api01.f8team.dev/api/products");
  const body = await result.json();
  const products = body.data.items;
  renderProducts(products);
};

fetchData();
