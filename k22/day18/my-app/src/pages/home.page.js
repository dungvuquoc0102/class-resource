import { renderCurrentRoute } from "../app/router";

export const renderHomePage = async () => {
  let email = null;
  try {
    const res = await fetch("https://spotify.f8team.dev/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        const res = await fetch(
          "https://spotify.f8team.dev/api/auth/refresh-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({
              refreshToken: localStorage.getItem("refresh_token"),
            }),
          },
        );

        const data = await res.json();
        console.log(data);
        localStorage.setItem("access_token", access_token);

        const reRes = await fetch("https://spotify.f8team.dev/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const reResult = await reRes.json();
        email = reResult.user.email;
      }
    } else {
      const result = await res.json();
      email = result.user.email;
    }
  } catch (error) {
    console.log(error);
  }
  return `
  <div>

    <h1>Home page</h1>
    ${
      email
        ? `<h2>Welcome ${email}</h2><div>
      <button id="logout-btn">Logout</button>
    </div>`
        : `
    <div>
      <a href="/register">Register</a>
      <a href="/login">Login</a>
    </div>`
    }
    
  `;
};

export const bindHomePage = () => {
  const logoutBtn = document.querySelector("#logout-btn");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    history.pushState({}, "", "/login");
    renderCurrentRoute();
  });
};
