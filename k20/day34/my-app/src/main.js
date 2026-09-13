import "./style.css";

console.log(location.pathname);

// router
// / -> render giao diện "Trang chủ"
// /products -> render giao diện "Trang sản phẩm"
// /cart -> render giao diện "Giỏ hàng"

const layout = (content) => {
  return `
  <header>
    <a href="/">Trang chủ</a>
    <a href="/products">Sản phẩm</a>
    <a href="/cart">Giỏ hàng</a>
  </header>
  <main>${content}</main>
  `;
};

const root = document.querySelector("#app");

const routes = [
  {
    path: "/",
    render: () => {
      return "Trang chủ";
    },
  },
  {
    path: "/products",
    render: () => {
      return `
      <div>
        <h1>Trang sản phẩm</h1>
        <ul>
          <li><a href="/products/iphone-due">Iphone Due</a></li>
          <li><a href="/products/samsung-zfold-8">Samsung ZFold 8</a></li>
        </ul>
      </div>
      `;
    },
  },
  {
    path: "/products/:slug",
    render: (params) => {
      return "Trang chi tiết: " + params.slug;
    },
  },
  {
    path: "/cart",
    render: () => {
      return "Giỏ hàng";
    },
  },
];

function router(root, routes) {
  const currentPath = location.pathname;
  let params;
  const route = routes.find((r) => {
    const routeParts = r.path.split("/").filter(Boolean); // ["products", ":slug"]
    const currentPathParts = currentPath.split("/").filter(Boolean); // ["products", "iphone-due"]

    if (routeParts.length !== currentPathParts.length) return false;

    for (let i = 0; i < routeParts.length; i++) {
      const part = routeParts[i];
      if (part.startsWith(":")) {
        const paramName = part.slice(1);
        if (!params) params = {};
        params[paramName] = currentPathParts[i];
      } else if (part !== currentPathParts[i]) {
        return false;
      }
    }

    return true;
  });
  if (route) {
    const content = route.render(params);
    root.innerHTML = layout(content);
  } else {
    root.textContent = "404 Not Found";
  }
}

document.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    history.pushState(null, null, href);
    router(root, routes);
  }
});

window.addEventListener("popstate", () => {
  router(root, routes);
});

router(root, routes);
