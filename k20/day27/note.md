# Day 27: Dispatch Event, Custom Event, BOM

## Event

- Custom event
- Dispatch event

## BOM (Browser Object Model)

- window
  - window.document
  - window.innerWidth, window.innerHeight
  - window.outerWidth, window.outerHeight
  - window.location
  - window.navigator

  #### Các phương thức chính
  - window.alert(message)
  - window.confirm(message)
  - window.prompt(message, defaultValue)
  - setTimeout(callback, delay)
  - setInterval(callback, delay)
  - open(url, name, specs)
  - close()

### screen

- screen.width, screen.height
- screen.availWidth, screen.availHeight
- screen.orientation

### location

### Properties

- `location.href`: Toàn bộ URL (ví dụ: https://example.com:8080/path?query=1#hash)
- `location.protocol`: Giao thức (http:, https:, file:, v.v.)
- `location.host`: Tên host và cổng (example.com:8080)
- `location.hostname`: Tên host (example.com)
- `location.port`: Cổng (ví dụ: 80, 443, 3000)
- `location.pathname`: Đường dẫn sau tên miền (/path)
- `location.search`: Chuỗi truy vấn (?query=1&foo=bar)
- `location.hash`: Phần hash trong URL (#hash)

#### Methods

- location.assign(url)
- location.replace(url)
- location.reload()

### history

#### Properties

- `history.length`: Số lượng mục trong lịch sử phiên duyệt web

#### Các phương thức chính

- history.back()
- history.forward()
- history.go(n)
- history.pushState(state, title, url)
- history.replaceState(state, title, url)

### navigator

#### Định nghĩa

- Đối tượng navigator cung cấp thông tin về trình duyệt và hệ điều hành của người dùng

#### Các thuộc tính chính

- `navigator.userAgent`: Chuỗi nhận diện trình duyệt (ví dụ: Mozilla/5.0 (Windows NT 10.0; Win64; x64))
- `navigator.language`: Ngôn ngữ chính của trình duyệt (ví dụ: en-US)
- `navigator.languages`: Mảng các ngôn ngữ người dùng ưu tiên
- `navigator.onLine`: Trả về true nếu trình duyệt đang kết nối mạng, false nếu không
- `navigator.platform`: Nền tảng hệ điều hành (ví dụ: Win32, MacIntel)
- `navigator.cookieEnabled`: Kiểm tra xem cookie có được bật hay không
- `navigator.geolocation`: Truy cập API định vị địa lý (nếu được phép)

#### Các phương thức chính

- `navigator.geolocation.getCurrentPosition(successCallback, errorCallback)`: Lấy vị trí địa lý hiện tại
- `navigator.sendBeacon(url, data)`: Gửi dữ liệu bất đồng bộ tới máy chủ (thường dùng để gửi phân tích trước khi rời trang)

#### Ví dụ

```js
console.log(navigator.userAgent); // Thông tin trình duyệt
console.log(navigator.language); // Ngôn ngữ trình duyệt
```

#### Ứng dụng

- Phát hiện trình duyệt, ngôn ngữ, hoặc lấy vị trí người dùng để cá nhân hóa nội dung

### Lưu ý

- BOM không có tiêu chuẩn chính thức, nên một số thuộc tính/phương thức có thể khác nhau giữa các trình duyệt
- Khi sử dụng BOM, cần kiểm tra sự tồn tại của thuộc tính/phương thức để tránh lỗi (ví dụ: `if (navigator.geolocation) {...}`)
- Một số tính năng (như geolocation) yêu cầu sự cho phép của người dùng
