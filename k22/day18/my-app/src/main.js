import "./style.css";
import startRouter from "./app/router";
import {
  bindRegisterPage,
  renderRegisterPage,
} from "./pages/auth/register.page";
import { bindHomePage, renderHomePage } from "./pages/home.page";
import { bindLoginPage, renderLoginPage } from "./pages/auth/login.page";
const root = document.querySelector("#app");
const routes = [
  {
    path: "/",
    render: renderHomePage,
    bind: bindHomePage,
  },
  {
    path: "/register",
    render: renderRegisterPage,
    bind: bindRegisterPage,
  },
  {
    path: "/login",
    render: renderLoginPage,
    bind: bindLoginPage,
  },
];
startRouter(root, routes);
