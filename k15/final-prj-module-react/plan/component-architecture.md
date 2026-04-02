# Component architecture

- Để xây dựng một component theo phong cách tối giản nhưng vẫn đầy đủ các tiêu chuẩn công nghiệp (Logic & UI tách biệt, TailwindCSS, Đa ngôn ngữ, Test), thực hiện theo cấu trúc: Hook (Logic) + Component (UI) + Test (Kiểm thử).

- Dưới đây là ví dụ thực tế cho component Post trong ứng dụng Threads Clone UI.
  - Cấu trúc thư mục:

```
components/
└── LikeComponent/
    ├── LikeComponent.jsx          # UI Component
    ├── LikeComponent.hooks.js     # Logic Hook
    └── LikeComponent.test.jsx     # Test Component
```

- Chi tiết từng phần:

## 1. File Logic: LikeComponent.hooks.js

```javascript
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLikePostMutation } from "@/services/postInteractionsApi";

export const useLikeComponentLogic = ({ post }) => {
  const { t } = useTranslation();
  const [likePost] = useLikePostMutation();

  const handleLike = async () => {
    try {
      await likePost(post.id).unwrap();
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  return {
    t,
    handleLike,
  };
};
```

## 2. File UI Component: LikeComponent.jsx

### 2.1. Đặc điểm của UI component

- Cấu trúc HTML gồm:
  - HeartIcon từ Radix UI
  - Số lượng like bên cạnh
- Layout:
  - display: flex
  - align-items: center
  - justify-content: center
  - width: max-content
- background: none
- color: var(--charcoal-text)
- font-size: var(--system-13-font-size)
- cursor: pointer
- white-space: nowrap
- div.wrapper:hover div.hover-bg {
  animation: scale1 0.2s forwards
  @keyframes scale1 {
  0% {
  transform: scale(0.95);
  background: none
  }
  100% {
  transform: scale(1);
  background: var(--hover-background);
  }
  }
  border-radius: var(--max-radius)
  background: var(--hover-background)
  }

### 2.2. File `index.css`

```css
:root {
  --system-13-font-size: 13px;
  --max-radius: 9999px;
  --charcoal-text: rgb(66, 66, 66);
  --hover-background: rgb(245, 245, 245);
}
.dark {
  --charcoal-text: rgb(204, 204, 204);
  --hover-background: rgb(30, 30, 30);
}
```

### 2.2.3 Component LikeComponent

```javascript
// /src/components/InteractionComponent/LikeComponent.jsx
import React from "react";
import { HeartIcon } from "@radix-ui/react-icons";
import { useLikeComponentLogic } from "./LikeComponent.hooks";
import PropTypes from "prop-types";
const LikeComponent = ({ post }) => {
  const { t, handleLike } = useLikeComponentLogic({ post });

  return (
    <div
      className="wrapper flex w-max cursor-pointer items-center justify-center select-none"
      onClick={handleLike}
    >
      <div className="hover-bg flex items-center justify-center rounded-full p-2">
        <HeartIcon className="text-charcoal-text h-5 w-5" />
        <span className="text-charcoal-text ml-2 text-[var(--system-13-font-size)]">
          {post.likes_count}
        </span>
      </div>
    </div>
  );
};
LikeComponent.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    likes_count: PropTypes.number.isRequired,
  }).isRequired,
};
export default LikeComponent;
```

## 3. File Test: PostCard.test.js

```javascript
import { render, screen, fireEvent } from "@testing-library/react";
import PostCard from "./PostCard";
import { Provider } from "react-redux";
import { store } from "../../../app/store";

const mockPost = {
  id: 1,
  content:
    "Đây là một nội dung rất dài nhằm mục đích test tính năng ẩn/hiện nội dung của component Threads clone.",
  likes_count: 10,
  author: { name: "John Doe", avatar: "" },
};

describe("PostCard Component", () => {
  test("Hiển thị nội dung rút gọn ban đầu", () => {
    render(
      <Provider store={store}>
        <PostCard post={mockPost} />
      </Provider>,
    );

    // Kiểm tra xem có dấu "..." không
    expect(screen.getByText(/.../i)).toBeInTheDocument();
  });

  test("Mở rộng nội dung khi nhấn nút Show More", () => {
    render(
      <Provider store={store}>
        <PostCard post={mockPost} />
      </Provider>,
    );

    const btn = screen.getByText(/show_more/i);
    fireEvent.click(btn);

    // Sau khi click, nút phải đổi thành Show Less
    expect(screen.getByText(/show_less/i)).toBeInTheDocument();
  });
});
```
