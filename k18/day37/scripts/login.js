async function login(email, password) {
  const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Sai email hoặc mật khẩu");
  }

  console.log();

  const { access_token, refresh_token } = await response.json();

  // Lưu token vào localStorage
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);

  return access_token;
}

// Gọi

const formEl = document.querySelector("#login-form");

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = formEl.email.value;
  const password = formEl.password.value;

  try {
    await login(email, password);
    console.log("Đăng nhập thành công");
    window.location.href = "/k18/day37/index.html";
  } catch (error) {
    console.error(error);
    alert("Đăng nhập thất bại: " + error.message);
  }
});

function isLoggedIn() {
  return !!localStorage.getItem("access_token");
}

if (isLoggedIn()) {
  window.location.href = "/k18/day37/index.html";
}
