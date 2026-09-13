import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div>
      <img
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
        src="https://images.unsplash.com/photo-1787486433112-2ac2bc9f2983?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Auth Layout"
      />
      <Outlet />
    </div>
  );
}
