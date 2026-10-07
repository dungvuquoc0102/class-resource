import { renderCurrentRoute } from "../../app/router";

export const bindRegisterPage = () => {
  const form = document.querySelector("#register-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const res = await fetch("https://spotify.f8team.dev/api/auth/register", {
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

export const renderRegisterPage = () => {
  return `
  <div>
    <h1>Register page</h1>
    <form id="register-form">
      <input type="text" name="email" placeholder="Enter email..." />
      <input type="password" name="password" placeholder="Enter password..." />
      <button>Submit</button>
    </form>
  </div>`;
};
