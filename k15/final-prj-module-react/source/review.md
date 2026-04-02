Hi Trung, sau khi xem bài của em, anh có một số nhận xét như sau:

# Yêu cầu: Threads Clone React

## 1. Yêu cầu chung

### 1.1. Tạo Github Repository với tên phù hợp

#### Điểm làm tốt:

- Em đã tạo repository với tên `day-34` và có cấu trúc dự án hợp lý.

### 1.2. Tuân thủ tên file và thư mục theo yêu cầu

#### Điểm làm tốt:

- Yêu cầu đề bài là tạo layout trong `/src/components/DefaultLayout.jsx` nhưng em đặt trong `/src/layouts/DefaultLayout/index.jsx` cũng hợp lý.

```jsx
// Yêu cầu: /src/components/DefaultLayout.jsx
// Thực tế: /src/layouts/DefaultLayout/index.jsx
```

### 1.3. Deploy dự án

#### Điểm làm tốt:

- Em đã deploy dự án lên Vercel tại `https://threads-day-34.vercel.app/`. Em có thể thêm file `vercel.json` để mở đường dẫn khác `/` không bị lỗi `404`.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 1.4. Tạo layout chung

#### Điểm làm tốt:

- Em đã tạo `DefaultLayout` bao gồm `Header`, `Main Content` và `Navigation` (Bottom Navigation Bar).

#### Điểm cần cải thiện:

- Em đã thêm class `max-w-175` trong default layout. Tuy nhiên, nếu page bên trong không có nhiều nội dung, nó sẽ bị co lại. Nên sửa thành `w-175 max-w-full`. Tương tự với các màn khác.

### 1.5. Thiết kế responsive

#### Điểm làm tốt:

- Giao diện có responsive, main content giới hạn chiều rộng trên desktop và full width trên mobile.

### 1.6. Cấu hình 7 Routes

- Bài làm tốt.

### 1.7. Navigation Component với NavLink

#### Điểm làm tốt:

- Em đã sử dụng `NavLink` để điều hướng và có style khác biệt cho link đang active thông qua class `group-[.active]`.

## 2. Xây dựng Trang chủ (Home Page)

### 2.1. API Integration

#### Điểm làm tốt:

- Em đã fetch dữ liệu từ `https://jsonplaceholder.typicode.com/posts` bằng `useEffect` và `fetch`.

#### Điểm cần cải thiện:

- Trong catch block, em viết `throw new error()` không đúng cú pháp. Nên viết `throw new Error()` hoặc `console.error(error)`.

```jsx
// File: HomePage.jsx
catch (error) {
  throw new error(); // nên sửa thành Error (viết hoa)
}
```

### 2.2. Post Item Component

#### Điểm làm tốt:

- Em đã tạo component `PostItem.jsx` để hiển thị dữ liệu bài đăng.
- Sử dụng Tailwind CSS và Shadcn/ui components như `Card`, `Avatar`.

### 2.3. Giao diện Responsive

#### Điểm làm tốt:

- Danh sách bài đăng hiển thị responsive, full width trên mobile và giới hạn chiều rộng trên desktop.

### 2.4. Placeholder Data

#### Điểm làm tốt:

- Em đã tạo dữ liệu giả cho `Avatar`, `Username`, `Time Ago` và `Metrics` (Like, Comment, Repost, Share).

### 2.5. Hiển thị tối thiểu 5 bài đăng

#### Điểm làm tốt:

- Em hiển thị tất cả bài đăng từ API (100 bài), đáp ứng yêu cầu tối thiểu 5 bài.

## 3. Xây dựng Trang chi tiết bài post

### 3.1. Routing với tham số động

#### Điểm làm tốt:

- Em đã sử dụng `useParams` để lấy `id` từ URL.

#### Điểm cần cải thiện:

- Trong `PostDetailPage.jsx`, em destructure `{ id, userId }` từ `useParams()` nhưng route chỉ có params `username` và `id`. Params `userId` không tồn tại trong route `/:username/post/:id`.

```jsx
// File: PostDetailPage.jsx
const { id, userId } = useParams(); // userId không có trong params
```

### 3.2. API Integration

#### Điểm làm tốt:

- Em đã fetch dữ liệu post theo `id` từ `https://jsonplaceholder.typicode.com/posts/:id`.
- Em đã fetch danh sách comments từ `https://jsonplaceholder.typicode.com/posts/:id/comments`.

#### Điểm cần cải thiện:

- Giống như HomePage, catch block có vấn đề với `throw new error()`.

- Em có `console.log(data)` trong code production. Nên xóa các console.log khi submit bài.

```jsx
// File: PostDetailPage.jsx
console.log(data); // nên xóa
```

### 3.3. Layout hiển thị post và comments

#### Điểm làm tốt:

- Em hiển thị bài post chính ở phía trên và danh sách comments ở dưới.
- Em đã tạo component `CommentItem` để hiển thị comment với Avatar, Username và nội dung.

### 3.4. Modal thêm mới comment khi click icon comment

#### Điểm cần cải thiện:

- Modal được tạo trong mỗi `PostItem` và `CommentItem`, dẫn đến nhiều modal được render cùng lúc. Nên tạo một modal duy nhất và quản lý state để hiển thị/ẩn.

## 4. Xây dựng Trang user

### 4.1. Routing với tham số động username

#### Điểm làm tốt:

- Em đã sử dụng `useParams` để lấy `username` từ URL.

### 4.2. API Integration

#### Điểm làm tốt:

- Em đã fetch thông tin user từ `https://jsonplaceholder.typicode.com/users/:userId`.
- Em đã fetch danh sách posts của user từ `https://jsonplaceholder.typicode.com/users/:userId/posts`.

#### Điểm cần cải thiện:

- Catch block gặp lỗi tương tự `throw new error()`.

### 4.3. Profile Header Layout

#### Điểm làm tốt:

- Em hiển thị Avatar, Name, Username, Followers và nút Follow.

### 4.4. Content Tabs

#### Điểm làm tốt:

- Em đã tạo 4 tabs: Threads, Replies, Media, Reposts bằng cách sử dụng hash navigation với `location.hash` và `navigate`.
- Tab Threads hiển thị danh sách posts của user, sử dụng lại component `PostItem`.

**Đánh giá tổng quan:**

> Điểm: 8.5 / 10
>
> Nhận xét: Bài làm tốt. Em đã áp dụng được các kiến thức về Tailwind CSS, Shadcn Components, React Router, API Integration để hoàn thành bài tập, thể hiện sự hiểu bài. Em bổ sung lại bài theo nhận xét phía trên của anh để bài làm hoàn thiện hơn nha.
>
> Chúc em học tốt!
