# Dự án cuối module 3 - Clone Threads

## 1. Công nghệ sử dụng

- Tạo dự án React với Vite
- Sử dụng Tailwind và Shadcn xây dựng UI (Dark/light mode, responsive)
- `React Router` để điều hướng trong app
- Zustand để quản lý global state
- Tanstack Query (RTK Query) để gọi API
- Axios để gửi các yêu cầu HTTP (gọi API)
- Sử dụng `react-hook-form` và `zod` để tạo toàn bộ các form và validation

## 2. Xây dựng trang Register

- Tạo file `src/pages/Auth/Register.jsx`
- Sử dụng `AuthLayout` cho trang register
- Form register với 4 input: `Tên hiển thị`, `Email`, `Mật khẩu`, `Xác nhận mật khẩu` — tất cả bắt buộc
- Username và Email: validation ngay sau khi gõ (debounce 600–800ms). Password tối thiểu 8 ký tự, phải trùng với `Xác nhận mật khẩu`
- Khi click `Đăng ký` với form hợp lệ thì gọi API và xử lý thành công / lỗi
- Đăng ký thành công: hiển thị message `Chúng tôi đã gửi một liên kết xác thực tới email của bạn. Vui lòng kiểm tra email để xác thực tài khoản.` giữa tiêu đề trang và input `Tên hiển thị`
- Đăng ký thất bại: kiểm tra response để xác định lỗi và hiển thị
- Text `Đã có tài khoản? Đăng nhập`, nhấn vào chuyển `/login`

## 3. Xây dựng trang VerifyEmail

- Tạo file `src/pages/Auth/VerifyEmail.jsx`
- Bọc bằng `AuthLayout`
- Khi mount: đọc token từ URL, gọi API Verify mail với body `{ token }`
- Đang gọi API: spinner + text `Đang xác minh...`
- Thất bại: message đỏ `Liên kết đã hết hạn hoặc không hợp lệ.` — không form, chỉ nút `Đi tới trang đăng nhập` về `/login`
- Thành công: chuyển về `/login`
- Sau khi redirect về `/login` từ verify thành công: hiển thị `Đã xác minh tài khoản thành công. Vui lòng đăng nhập.` giữa tiêu đề và input đầu tiên

Cách Login biết vừa verify thành công: dùng link state — từ `/verify-email` redirect `/login` kèm state ví dụ `{ verified: true }`; trang `/login` đọc state (ví dụ `verified`) để hiển thị message.

Tham khảo: `https://reactrouter.com/api/components/Link#state`

## 4. Xây dựng trang Login

- Tạo file `src/pages/Auth/Login.jsx`
- Sử dụng `AuthLayout` cho trang login
- Có form login với 2 input: `Email hoặc tên người dùng` và `Mật khẩu`, cả hai đều bắt buộc nhập
- Khi click `Đăng nhập` với form hợp lệ thì gọi API Login và xử lý đăng nhập thành công hoặc xử lý lỗi (nếu có)
- Đăng nhập thành công: lưu `access_token` và `refresh_token` vào `localStorage`, đính kèm `access_token` vào mọi request của instance Axios hoặc RTK Query (tùy lựa chọn). Dùng API Get User Info để lấy thông tin user đang đăng nhập và lưu vào global state
- Đăng nhập thất bại: hiển thị lỗi, kiểm tra response để biết chi tiết
- Khi token hết hạn (response code `401` và có refresh token trong `localStorage`), thực hiện refresh token
- Refresh thành công: lưu `access_token` và `refresh_token` mới vào `localStorage` và gọi lại các API `401` trước đó
- Refresh thất bại: chuyển hướng sang `/login`
- Hiển thị link `Quên mật khẩu?` dưới input `Mật khẩu`, nhấn vào chuyển `/forgot-password`
- Cuối trang: text `Bạn chưa có tài khoản? Đăng ký`, nhấn `Đăng ký` chuyển `/register`

## 5. Xây dựng trang ForgotPassword

- Tạo file `src/pages/Auth/ForgotPassword.jsx`. Dựa UI của Login và Register, đổi text và input cho trang quên mật khẩu
- Sử dụng `AuthLayout`
- Mô tả: `Nhập email của bạn để nhận liên kết đặt lại mật khẩu`
- Form với 1 input `Email` — bắt buộc và validate định dạng email
- Khi click `Đặt lại mật khẩu` với form hợp lệ: gọi API gửi mã reset hoặc xử lý lỗi
- Nếu bước trên thành công: hiển thị message (info) `Liên kết đặt lại mật khẩu đã được gửi tới email của bạn`

## 6. Xây dựng trang ResetPassword

- Tạo file `src/pages/Auth/ResetPassword.jsx` cho trang reset password
- Liên kết trong email mở page này kèm `token` ở query params
- Path: `/reset-password`
- Sử dụng `AuthLayout`
- Đọc `token` từ query params, gọi API kiểm tra token hợp lệ; lỗi thì báo `Liên kết đã hết hạn hoặc không hợp lệ`; thành công thì hiển thị form `Tạo mật khẩu mới`
- Form 2 input: `Mật khẩu mới`, `Xác nhận mật khẩu` — validate giống form Register
- Click `Tạo mật khẩu mới` với form hợp lệ: gọi API reset; thành công thì chuyển `/login` với route state chứa `message` `Tạo mật khẩu mới thành công, vui lòng đăng nhập` (trang Login kiểm tra route state `message` để hiển thị); xử lý lỗi nếu có

Gợi ý: tìm hiểu router state tại `https://reactrouter.com/api/hooks/useNavigate`

## 7. Xây dựng trang Home: Hiển thị / thêm / sửa / xóa post

- Trang Home sử dụng `DefaultLayout`, trong `DefaultLayout` có Sidebar bên trái và phần content chính bên phải
  - Sidebar chứa logo ở trên, menu navigation với các item: Home (active), Search, Create, Activity, Profile — mỗi item giao diện chỉ có icon
- Trang Home có nội dung:
  - Header: có 3 tabs "For you", "Following", "Ghost posts, click tab sẽ load danh sách post tương ứng
  - Post list: Hiển thị danh sách các bài post dưới dạng `PostCard`, mỗi card gồm: avatar user, tên user, thời gian `2h`, nội dung text và interaction bar
    - Mỗi `PostCard` có `InteractionBar` với 4 button: Like (heart icon), Comment (chat icon), Repost (repeat icon), Share (send icon) — hiển thị số lượng tương tác bên cạnh. Tạo file `src/components/post/PostCard.jsx` để viết component này
    - Các phần trong `PostCard` có thể chia nhỏ cho phù hợp, tránh quá phức tạp trong một file. Ví dụ `InteractionBar` có thể tách thành `src/components/post/InteractionBar.jsx` và import vào `PostCard`
    - Infinite scroll: tạo custom hook `useInfiniteScroll` với Intersection Observer API, hoặc dùng `react-infinite-scroll-component`, hoặc `react-infinite-scroll-hook` để tự động load thêm post khi scroll tới cuối
    - Like / Unlike post: icon heart đỏ khi chính mình like; cập nhật số lượng ngay (optimistic update); gọi API lưu trạng thái. Gợi ý: đổi UI và số đếm trước, gọi API sau; thành công giữ nguyên, thất bại báo lỗi và rollback
    - Comment: click Comment mở `ReplyModal`, mô tả chi tiết trong phần "Xây dựng ReplyModal" bên dưới
    - Repost / Unrepost: Bấm vào icon hiển thị menu 2 item Repost và Quote, icon xanh khi chính mình đã repost
    - Quote: click `Quote` trong menu ở icon Repost mở `QuoteModal`, sử dụng lại `ReplyModal` nhưng placeholder là `Quote this post...`, có thêm phần hiển thị nội dung post đang quote
    - Share: mở menu share với các lựa chọn:
      - Copy link: thư viện `copy-to-clipboard`
      - Copy as image: modal như bản gốc; dùng `html-to-image` chuyển DOM sang ảnh; dùng `download` để tải (xem demo trong README của `html-to-image`)
      - Get embed code:
        - Mở `EmbedModal`, mô tả chi tiết trong phần "Xây dựng EmbedModal" bên dưới
        - Hiển thị preview; phần preview khi làm trang Embed dùng `iframe`
        - Code embed: thẻ `<iframe>` với `src` là `location.origin + "/" + username + "/post/" + postId + "/embed"`. Ví dụ URL: `https://domain.com/nguyenvana/post/DiyNUECS0k/embed`. Nút Copy sao chép code vào clipboard
    - Post menu (3 chấm): dropdown với các option:
      - Save / Unsave: lưu bài vào collection
      - Not interested: ẩn bài khỏi feed
      - Mute: tắt tiếng user
      - Restrict: hạn chế user
      - Block: chặn user (màu đỏ, cần confirmation modal)
      - Report: báo cáo bài (màu đỏ, modal chọn lý do)
      - Copy link: copy URL bài + toast
      - Edit / Delete: chỉ với post của user hiện tại (Delete cần confirmation)
    - API integration: tạo `src/services/postService.js` với các method gọi API cho các action trên.
  - Login panel: Nếu chưa đăng nhập, bên phải hiển thị `LoginPanel` với text `Đăng nhập để xem thêm`, nhấn vào chuyển trang `/login`

## 8. Xây dựng ReplyModal

- Reply form: avatar user hiện tại, username, placeholder `Reply to [username]...`, textarea nhập reply
- Toolbar dưới textarea: 5 nút — upload ảnh/video, upload GIF, chọn emoji, Poll/Survey (nếu cần), add location
- Add topic: link `Add a topic` để thêm topic/tag
- Add to thread: nút `Add to thread` để nối reply vào thread
- Reply options: nút `Reply options` để cấu hình ai được reply
- Post: nút `Post` — disabled khi chưa có nội dung, active khi có. Sau khi post thành công: đóng modal và refresh danh sách comment

## 9. Xây dựng trang Embed Post

Trang này dùng trong `iframe` để nhúng post vào site khác, không nhắm end-user truy cập trực tiếp.

- Trang Embed: file `src/pages/Embed.jsx`, route `/:username/post/:postId/embed` — một post dạng embed, không Sidebar, không `LoginPanel`, chỉ `PostCard` nền trắng
- Layout: `src/layouts/EmbedLayout.jsx` — main full width, không nav, không footer, phù hợp iframe
- Fetch: gọi API lấy post, render `PostCard` đủ avatar, username, timestamp, content, media, interaction bar, `View on Threads`
- Responsive: trang Embed responsive khi nhúng ở site khác
