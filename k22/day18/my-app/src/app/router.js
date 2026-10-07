let appRoot = null;
let appRoutes = [];

export const renderCurrentRoute = async () => {
  const path = location.pathname;
  const route = appRoutes.find((route) => route.path === path);

  if (!route) {
    appRoot.innerHTML = "<h1>404 Not Found</h1>";
  }

  appRoot.innerHTML = await route.render();
  route.bind?.();
};

const startRouter = (root, routes) => {
  appRoot = root;
  appRoutes = routes;

  renderCurrentRoute();
};

export default startRouter;
