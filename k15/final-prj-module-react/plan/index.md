# Plan: Xây dựng ứng dụng React tiêu chuẩn

1. Configuration
2. State Management
3. Http request
4. API requests
5. Component architecture
6. Routing

## 3. Component architecture

### 3.1. Design Component

- Components có kích thước vừa đủ
- Logic và UI tách biệt
- Dễ tái sử dụng

### 3.2. Logic of component: Custom Hooks

Tạo hooks để tách logic khỏi UI:

```javascript
// useFetchPosts.js
export const useFetchPosts = (userId) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch logic với proper error handling
  }, [userId]);

  return { posts, loading, error, refetch };
};
```

### 3.3. UI of components

- Sử dụng Tailwind CSS cho styling
- Sử dụng Radix UI cho các component phức tạp

### 3.4. Component Props Validation

```javascript
// PostItem.jsx
import PropTypes from "prop-types";

PostItem.propTypes = {
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  isPermitDetailPost: PropTypes.bool.isRequired,
};

PostItem.defaultProps = {
  body: "",
};
```

## 4. Performance optimization

### 4.1. Code splitting & Lazy loading

```javascript
// routes.js
const Home = lazy(() => import("@/pages/HomePage"));
const PostDetail = lazy(() => import("@/pages/PostDetailPage"));
const Profile = lazy(() => import("@/pages/ProfilePage"));

// App.jsx với Suspense
<Suspense fallback={<Spinner />}>
  <Routes>...</Routes>
</Suspense>;
```

### 4.2. Memoization

- Tự động bởi React 19.

### 4.3. Image Optimization

```javascript
// LazyImage component
const LazyImage = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-full"
    />
  );
};
```

### 4.4. Infinite Scrolling & Pagination

```javascript
// useInfiniteScroll.js
import { useEffect } from "react";
export const useInfiniteScroll = (callback) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback]);
};
```

## 5. Error Handling & User Feedback

### 5.1. Error Boundary

```javascript
// components/ErrorBoundary.jsx
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### 5.2. Loading States Pattern

```javascript
// components/LoadingState.jsx
const LoadingState = ({ type }) => {
  const variants = {
    post: <PostSkeleton />,
    list: <ListSkeleton />,
    page: <Spinner />,
  };
  return variants[type] || <Spinner />;
};
```

### 5.3. Toast Notifications

```javascript
// Install: sonner
import { toast } from "sonner";

// Usage
const handleSubmit = async () => {
  try {
    await createPost(data);
    toast.success("Post created successfully!");
  } catch (error) {
    toast.error("Failed to create post");
  }
};
```

---

### 6. Form management

### 6.1. React Hook Form + Zod

```javascript
// Install: react-hook-form zod @hookform/resolvers

// schemas/postSchema.js
import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().max(500, "Content must be less than 500 characters"),
  image: z.string().url().optional(),
});

// CreatePostModal.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const CreatePostModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data) => {
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} />
      {errors.title && <span>{errors.title.message}</span>}
    </form>
  );
};
```

## 7. Testing

### 7.1. Setup Testing

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

#### 7.2. **Unit Tests**

```javascript
// __tests__/PostItem.test.jsx
import { render, screen } from "@testing-library/react";
import { PostItem } from "../PostItem";

describe("PostItem", () => {
  it("renders post content", () => {
    render(<PostItem title="Test" body="Content" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

---

### 8. Accessibility & SEO

### 8.1. ARIA Labels

```javascript
<button aria-label="Like post" onClick={handleLike}>
  <LikeIcon aria-hidden="true" />
</button>
```

#### 8.2. **Semantic HTML**

```javascript
<article className="post-card">
  <header>
    <h2>{title}</h2>
  </header>
  <main>{content}</main>
  <footer>
    <nav aria-label="Post actions">{/* Actions */}</nav>
  </footer>
</article>
```

### 8.3. Meta Tags (React Helmet)

```javascript
import { Helmet } from "react-helmet-async";

<Helmet>
  <title>{post.title} - Threads Clone</title>
  <meta name="description" content={post.body.slice(0, 150)} />
</Helmet>;
```

### 8.4 Prerender

- Prerender.io setup for static generation of key pages.

## 9. Code Quality

### 9.1. ESLint Rules Enhancement

```javascript
// eslint.config.js
rules: {
  'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  'react/prop-types': 'error',
  'react-hooks/exhaustive-deps': 'warn',
  'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
}
```

### 9.2. Prettier Configuration

```javascript
// prettier.config.js
export default {
  semi: true,
  singleQuote: true,
  trailingComma: "es5",
  printWidth: 100,
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
};
```

### 9.3. Husky & Lint-Staged

```bash
npm install --save-dev husky lint-staged

# package.json
{
  "lint-staged": {
    "*.{js,jsx}": ["eslint --fix", "prettier --write"]
  }
}
```

---

## 10. Deployment & Monitoring

### 10.1. Environment Variables

```bash
# .env.production
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=Threads Clone
VITE_ENABLE_ANALYTICS=true
```

### 10.2. Build Optimization

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["@radix-ui/react-avatar", "@radix-ui/react-dropdown-menu"],
        },
      },
    },
  },
});
```

### 10.3. Monitoring (Sentry)

```javascript
// main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
});
```

### 10.4. Server deployment

- Có 2 lựa chọn:
  - Sử dụng dịch vụ: Vercel, Netlify để tự động deploy từ GitHub.
  - Tự quản lý server: Sử dụng Docker để đóng gói ứng dụng và triển khai trên VPS hoặc dịch vụ đám mây như AWS, DigitalOcean. Nếu tự quản lý server, cần thiết lập CI/CD pipeline để tự động hóa quá trình build và deploy.
