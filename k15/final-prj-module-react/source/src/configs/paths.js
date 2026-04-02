// configs/paths.js
export const PATHS = {
  // Public routes
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Protected routes
  PROFILE: (username) => `/profile/${username}`,
  POST_DETAIL: (id) => `/post/${id}`,
  EDIT_POST: (id) => `/post/${id}/edit`,

  // Feature routes
  SEARCH: "/search",
  ACTIVITY: "/activity",
  FOLLOWING: "/following",
  FOR_YOU: "/for-you",

  // Settings
  SETTINGS: "/settings",
  SETTINGS_PROFILE: "/settings/profile",
  SETTINGS_PRIVACY: "/settings/privacy",

  // Error pages
  NOT_FOUND: "/404",
  SERVER_ERROR: "/500",
};

// Navigation items
export const NAV_ITEMS = [
  { path: PATHS.HOME, label: "nav.home", icon: "Home" },
  { path: PATHS.SEARCH, label: "nav.search", icon: "Search" },
  { path: PATHS.ACTIVITY, label: "nav.activity", icon: "Activity" },
  { path: PATHS.SETTINGS, label: "nav.settings", icon: "Settings" },
];
