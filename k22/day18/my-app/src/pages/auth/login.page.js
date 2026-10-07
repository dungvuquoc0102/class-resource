import { renderCurrentRoute } from "../../app/router";

export const bindLoginPage = () => {
  const form = document.querySelector("#login-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const res = await fetch("https://spotify.f8team.dev/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const session = await res.json();
    localStorage.setItem("access_token", session.access_token);
    localStorage.setItem("refresh_token", session.refresh_token);

    history.pushState({}, "", "/");
    renderCurrentRoute();
  });
};

export const renderLoginPage = () => {
  return `
  <div>
    <h1>Login page</h1>
    <form id="login-form">
      <input type="text" name="email" placeholder="Enter email..." />
      <input type="password" name="password" placeholder="Enter password..." />
      <button>Submit</button>
    </form>
  </div>`;
};
