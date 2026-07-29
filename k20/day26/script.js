// const activeItem = document.querySelector(".active");
// console.log(activeItem.nextElementSibling);
// console.log(activeItem.previousElementSibling);
// console.log(activeItem.parentElement);
// console.log(activeItem.parentElement.firstElementChild);
// console.log(activeItem.parentElement.lastElementChild);

// const eventMethodList = document.querySelector(".event-method-list");
// console.log(eventMethodList.children);

// const liEls = document.querySelectorAll(".event-method-list li");

// liEls.forEach((liEl) => {
//   liEl.addEventListener("click", (e) => {
//     console.log(e.target.textContent);
//   });
// });

// eventMethodList.addEventListener("click", (e) => {
//   if (e.target.closest(".event-method-list li")) {
//     console.log(e.target.textContent);
//   }
// });

// eventMethodList.addEventListener("click", (e) => {
//   console.log(e.currentTarget);
// });

// const userForm = document.querySelector(".user-form");

// userForm.addEventListener("submit", (e) => {
//   console.log(e.preventDefault());
// });

// activeItem.addEventListener("click", (e) => {
//   console.log("Click ở phần tử con");
// });
// eventMethodList.addEventListener(
//   "click",
//   (e) => {
//     console.log("Click ở phần tử cha");
//   },
//   { capture: true },
// );
// window.addEventListener("click", (e) => {
//   console.log("Click ở phần tử window");
// });

// activeItem.addEventListener("click", (e) => {
//   console.log(e);
// });

// const userInput = document.querySelector(".user-input");
// console.log(eventMethodList);

// userInput.addEventListener("keydown", (e) => {
//   console.log(e);
// });

// eventMethodList.addEventListener("mouseleave", (e) => {
//   console.log("Con trỏ chuột đang rời khỏi phần tử con");
// });
// eventMethodList.onMouseLeave = (e) => {
//   console.log("Con trỏ chuột đang rời khỏi phần tử con");
// };

// eventMethodList.addEventListener("mouseover", (e) => {
//   console.log("Con trỏ chuột đang ở trên phần tử con");
// });

// console.log(eventMethodList);

const inputAll = document.querySelector("#input-all");
const inputs = document.querySelectorAll(".input-todo");
const checkedNum = document.querySelector("#checked-num");

let checkedTodoNum = 0;
// console.log(checkAll);
inputAll.addEventListener("change", (e) => {
  inputs.forEach((input) => {
    input.checked = inputAll.checked;
  });
  if (inputAll.checked) {
    checkedTodoNum = inputs.length;
  } else {
    checkedTodoNum = 0;
  }
  checkedNum.textContent = checkedTodoNum;
});

inputs.forEach((input) => {
  input.addEventListener("change", () => {
    checkedTodoNum += input.checked ? 1 : -1;
    checkedNum.textContent = checkedTodoNum;

    switch (true) {
      case checkedTodoNum === inputs.length:
        inputAll.checked = true;
        inputAll.indeterminate = false;
        break;
      case checkedTodoNum === 0:
        inputAll.checked = false;
        inputAll.indeterminate = false;
        break;
      default:
        inputAll.checked = false;
        inputAll.indeterminate = true;
    }
  });
});
