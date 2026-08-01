import { createStore, reducer } from "./public/redux.js";

const add = document.querySelector("#add");
const minus = document.querySelector("#minus");
const reset = document.querySelector("#reset");
const count = document.querySelector("#count");
const unsubscribeBtn = document.querySelector("#unsubscribe");

const store = createStore(reducer, { count: 0 });

const unsubscribe = store.subscribe(() => {
  count.textContent = store.getState().count;
});

add.addEventListener("click", () => {
  store.dispatch({ type: "INCREMENT" });
  console.log(`Count: ${store.getState().count}`);
});

minus.addEventListener("click", () => {
  store.dispatch({ type: "DECREMENT" });
  console.log(`Count: ${store.getState().count}`);
});

reset.addEventListener("click", () => {
  store.dispatch({ type: "RESET" });
  console.log(`Count: ${store.getState().count}`);
});

unsubscribeBtn.addEventListener("click", () => {
  unsubscribe();
});
