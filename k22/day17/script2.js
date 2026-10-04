// console.log(sessionStorage.getItem("a"));

console.log(1);

setTimeout(() => {
  console.log(2);
}, 1000);

// fetch().then(() => {
//   products.map(() => {});
// });

console.log(3);

// JS + Browser
// JS + NodeJS

// Asynchronous callback

// function A() {}

// function B() {}

// A(B);

// setTimeout(B, 1000);

// A

// Chỉ thực thi B sau khi điều kiện thỏa mãn (sau một khoảng thời gian, sau khi nhận được dữ liệu từ server về)
// B

const promise = new Promise((resolve, reject) => {
  // setTimeout(() => {
  //   resolve("Done");
  // }, 1000);

  // fetch("https://dummyjson.com/products").then((res) => res.json()).then((data) => {
  //   setTimeout(() => {
  //     resolve(data);
  //   }, 1000);
  // })

  resolve("Done");
});

// pending
// fulfilled
// rejected

promise
  .then(() => {
    console.log("abc");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Done");
      }, 1000);
    });
  })
  .then((data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Done 2");
      }, 1000);
    });
  })
  .catch(() => {
    console.log("error");
  })
  .finally(() => {
    console.log("finally");
  });

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    const result = document.querySelector("#result");
    result.innerHTML = data.products
      .map(
        (product) => `
      <div class="product">
        <img src="${product.thumbnail}" alt="" />
        <p >${product.title}</p>
        <p>$${product.price}</p>
      </div>
      `,
      )
      .join("");
  })
  .catch((error) => {
    console.log(error);
  });

async function fetchData() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    console.log(data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  } catch (error) {
    console.error(error);
  }
}

await fetchData().then((data) => {
  console.log(data);
});

fetchData();

// Code bất đồng bộ
// - Callback: trong thân hàm
// - Promise: thân hàm trong then
// - Async/Await: trong async function nhưng sau await
