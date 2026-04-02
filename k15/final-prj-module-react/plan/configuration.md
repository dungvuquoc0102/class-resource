# Configuration

## 1. Environment Variables

- Cấu trúc các files biến môi trường:
  - .env # Development (thêm vào .gitignore)
  - .env.example # Template cho team
  - .env.production # Production (thêm vào .gitignore)
  - .env.staging # Staging environment (optional)

### 1.1. Chi tiết .env (Development)

```
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000

# Application
VITE_APP_NAME=Threads Clone Dev
VITE_APP_VERSION=1.0.0

# Features
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_SENTRY=false
VITE_ENABLE_DEBUG=true

# Authentication
VITE_TOKEN_REFRESH_INTERVAL=840000
VITE_SESSION_TIMEOUT=3600000

# Upload Configuration
VITE_MAX_FILE_SIZE=5242880
VITE_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp

# Monitoring
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Security
VITE_CSRF_ENABLED=true
VITE_RATE_LIMIT_ENABLED=true
```

## 2. Configuration Files

- Cấu trúc thư mục config:

```
configs/
├── constants.js # Quản lý các hằng số ứng dụng
└── index.js # Export tập trung tất cả configs
```

### 2.1. Chi tiết constants.js (Hằng số ứng dụng)

```js
// configs/constants.js
export const API_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER_PREFERENCES: "userPreferences",
  THEME: "theme",
  LANGUAGE: "language",
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  POST_MAX_LENGTH: 500,
  COMMENT_MAX_LENGTH: 300,
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile/:username",
  POST_DETAIL: "/post/:id",
  SEARCH: "/search",
  ACTIVITY: "/activity",
  SETTINGS: "/settings",
};
```

## 3. Internationalization (i18n)

- Cấu trúc thư mục i18n

```
public/locales/
├── en/
│   ├── translation.json      # Translations chính
│   ├── common.json           # Common terms (buttons, labels)
│   ├── errors.json           # Error messages
│   └── validation.json       # Validation messages
├── vi/
│   ├── translation.json
│   ├── common.json
│   ├── errors.json
│   └── validation.json
└── README.md                 # Translation guidelines
```

### 3.1. Chi tiết i18n.js (Thiết lập i18n với react-i18next)

```js
// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend) // Load translations from public/locales
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n to react-i18next
  .init({
    fallbackLng: "en",
    debug: import.meta.env.DEV,

    // Namespace configuration
    ns: ["translation", "common", "errors", "validation"],
    defaultNS: "translation",

    // Detection configuration
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },

    // Backend configuration
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    interpolation: {
      escapeValue: false, // React already escapes
    },

    // React configuration
    react: {
      useSuspense: true,
    },
  });

export default i18n;
```

### 3.2. Chi tiết cấu trúc các file dịch (Translation files structure)

```js
// public/locales/en/translation.json
{
  "nav": {
    "home": "Home",
    "search": "Search",
    "activity": "Activity",
    "profile": "Profile"
  },
  "whatNew": {
    "placeholder": "What's New",
    "post": "Post",
  }
  "post": {
    "create": "Create post",
    "edit": "Edit post",
    "delete": "Delete post",
    "deleteConfirm": "Are you sure you want to delete this post?",
    "placeholder": "What's on your mind?"
  },
  "auth": {
    "login": "Log in",
    "register": "Sign up",
    "logout": "Log out",
    "forgotPassword": "Forgot password?"
    "resetPassword": "Reset password"
  }
}
```

```js
// public/locales/en/validation.json
{
  "required": "{{field}} is required",
  "minLength": "{{field}} must be at least {{min}} characters",
  "maxLength": "{{field}} must be less than {{max}} characters",
  "email": "Invalid email address",
  "password": {
    "weak": "Password is too weak",
    "mismatch": "Passwords do not match"
  }
}
```

### 3.3. Sử dụng i18n trong component React

```js
// Using with hooks
import { useTranslation } from "react-i18next";
import Avatar from "./Avatar";
import { Modal } from "@/components/ui/modal";

const WhatNewComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Avatar />
      <Modal>
        <Modal.Trigger>
          <form onSubmit={(e) => e.preventDefault()}>
            <input placeholder={t("whatNew.placeholder")} />
            <button>{t("whatNew.post")}</button>
          </form>
        </Modal.Trigger>
        <Modal.Content>
          <h2>{t("whatNew.post")}</h2>
          {/* Modal content here */}
        </Modal.Content>
      </Modal>
    </div>
  );
};
```

### 3.4. Custom hook cho quản lý ngôn ngữ

```js
// hooks/useLanguage.js
import { useTranslation } from "react-i18next";
import { useCallback } from "react";

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    (lng) => {
      i18n.changeLanguage(lng);
      // Không cần vì i18next-browser-languagedetector đã auto lưu
      // localStorage.setItem("i18nextLng", lng);
    },
    [i18n],
  );

  const currentLanguage = i18n.language;

  const availableLanguages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  ];

  return {
    currentLanguage,
    changeLanguage,
    availableLanguages,
  };
};
```

### 3.5. Component ChangeLanguage

```js
// components/ChangeLanguage/ChangeLanguage.jsx
import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { Menu, MenuItem } from "@radix-ui/react-dropdown-menu";
import { GlobeIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const ChangeLanguage = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();

  return (
    <Menu>
      <Menu.Trigger>
        <GlobeIcon /> {t("changeLanguage")}
      </Menu.Trigger>
      <Menu.Content>
        {availableLanguages.map((lang) => (
          <MenuItem
            key={lang.code}
            className={clsx(
              "flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700",
              currentLanguage === lang.code && "font-bold",
            )}
            onSelect={() => changeLanguage(lang.code)}
          >
            <span>{lang.flag}</span>
            {lang.name}
          </MenuItem>
        ))}
      </Menu.Content>
    </Menu>
  );
};
export default ChangeLanguage;
```

## 4. Theme

- Cấu trúc thư mục theme:

```
src/index.css
```

### 4.1. Chi tiết index.css (Cấu hình theme với Tailwind CSS, Shadcn UI)

- Định nghĩa dark mode, radius, color background và text cho các thành phần UI, font family và đặt background cho body, font-size mặc định.
- Custom lại trực tiếp các giá trị biến của Shadcn UI để phù hợp với thiết kế của ứng dụng.

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
  /* Custom - Khi nào làm component nào thì thêm vào đây */
  --sans:
    system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --serif: Georgia, Cambria, "Times New Roman", Times, serif;
  --mono: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --side-navigation-background: rgba(250, 250, 250, 0.85);
  --side-navigation-foreground: rgb(184, 184, 184);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
  /* Custom */
  --side-navigation-background: rgba(10, 10, 10, 0.85);
  --side-navigation-foreground: rgb(77, 77, 77);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    font-size: 15px;
    font-family: var(--sans);
  }
}
```

### 4.2. Quản lý theme với ThemeProvider trong React

- Sử dụng RTK để quản lý theme (light/dark/system) trong ứng dụng React (xem trong state-management.md).
