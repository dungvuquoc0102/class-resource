# Buổi 16: BOM

## `window` và các đối tượng bên trong

### Giới thiệu

`window` là đối tượng đại diện cho cửa sổ trình duyệt. Nó là phạm vi toàn cục của JavaScript: mọi biến và hàm khai báo ở cấp cao nhất đều là thuộc tính của `window`. Nhờ đó có thể gọi `document` mà không cần viết `window.document`.

Bên trong `window` có các đối tượng con dùng để làm việc với trang hiện tại:

| Đối tượng               | Ý nghĩa                                         |
| ----------------------- | ----------------------------------------------- |
| `window.document`       | Cây DOM của trang, đã học ở buổi 15             |
| `window.location`       | Địa chỉ trang hiện tại và các cách điều hướng   |
| `window.history`        | Lịch sử các lần đã điều hướng của tab           |
| `window.navigator`      | Thông tin về trình duyệt và thiết bị người dùng |
| `window.screen`         | Kích thước màn hình thiết bị                    |
| `window.localStorage`   | Dữ liệu lưu lâu dài, không mất khi đóng trang   |
| `window.sessionStorage` | Dữ liệu chỉ tồn tại trong tab đang mở           |

### Ví dụ

```js
console.log(window.document.title);
console.log(window.location.pathname);
console.log(window.navigator.language);

function greet() {}
console.log(window.greet === greet); // true: hàm khai báo cũng nằm trên window
```

### Khi nào dùng?

- Dùng khi cần làm việc với trình duyệt, ví dụ lấy thông tin thiết bị, điều hướng, lưu dữ liệu.

- Trong dự án thực tế gần như không cần viết `window.` ở đầu vì các đối tượng này đã ở sẵn trong phạm vi toàn cục. Chỉ viết rõ `window.` trong hai tình huống:
  - Cần phân biệt với một biến cục bộ trùng tên, ví dụ trong CommonJS có `module` của Node.
  - Gắn listener cho chính cửa sổ: `window.addEventListener("scroll", ...)`, `window.addEventListener("resize", ...)`.

### Lưu ý

- Không gán thuộc tính tùy ý lên `window` để chia sẻ dữ liệu giữa các file JavaScript. Khi có module hoặc bundler, mỗi file có phạm vi riêng và dữ liệu nên đi qua module hoặc biến trạng thái của ứng dụng.
- `window.open(url, ...)` mở tab hoặc cửa sổ mới và trả về đối tượng `Window`, hoặc `null` nếu trình duyệt chặn popup. `window.close()` chỉ đóng được cửa sổ do script mở. Trong sản phẩm thường mở tab bằng thẻ `<a target="_blank">`; tra cứu API này khi thật sự cần mở cửa sổ con.
- `window.outerWidth` và `window.outerHeight` là kích thước cả cửa sổ gồm thanh địa chỉ, tab và thanh công cụ. Phần lớn code CSS đã đáp ứng sẵn nên ít khi cần đến hai giá trị này.

---

## Kích thước vùng hiển thị: `window.innerWidth`, `window.innerHeight`

### Giới thiệu

`window.innerWidth` và `window.innerHeight` là chiều rộng, chiều cao của vùng hiển thị nội dung trang, tính bằng pixel CSS.

| Kích thước           | Ý nghĩa                                                 |
| -------------------- | ------------------------------------------------------- |
| `window.innerWidth`  | Bề rộng vùng hiển thị, không tính scrollbar dọc         |
| `window.innerHeight` | Chiều cao vùng hiển thị, có tính scrollbar ngang nếu có |

Hai giá trị này thay đổi khi người dùng xoay máy, thu nhỏ cửa sổ hoặc mở thanh địa chỉ trên di động.

### Ví dụ

```js
const MOBILE_BREAKPOINT = 768;

function updateLayoutHint() {
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  document.body.classList.toggle("is-mobile", isMobile);
}

window.addEventListener("resize", updateLayoutHint);
window.addEventListener("orientationchange", updateLayoutHint);
updateLayoutHint();
```

### Khi nào dùng?

- Biết người dùng đang xem trên màn hình nhỏ để điều chỉnh thư viện hoặc hành vi của thư viện bản đồ, biểu đồ.

Trong dự án web thông thường, ưu tiên CSS media query để xử lý giao diện theo kích thước. JavaScript chỉ cần khi giá trị kích thước cần dùng để tính toán logic.

### Lưu ý

- `innerHeight` có thể lớn hơn chiều cao thực tế khi thanh địa chỉ trên di động thu lại khi cuộn. Khi dùng cho toán toán bố cục, cần `resize` hoặc `visualViewport` cho chính xác trên iOS.
- Sự kiện `resize` bắn liên tục khi người dùng kéo cửa sổ. Không làm việc nặng trong listener này; tính toán lại khi thật sự cần.

---

## `setTimeout` và `setInterval`

### Giới thiệu

Hai hàm này trì hoãn hoặc lặp lại việc thực thi một hàm sau một khoảng thời gian.

| Hàm                               | Cách hoạt động                         | Trả về                         |
| --------------------------------- | -------------------------------------- | ------------------------------ |
| `setTimeout(fn, delay, ...args)`  | Chạy `fn` một lần sau `delay` ms       | id để dùng cho `clearTimeout`  |
| `clearTimeout(id)`                | Hủy lần chạy đang chờ của `setTimeout` | `undefined`                    |
| `setInterval(fn, delay, ...args)` | Chạy `fn` lặp lại mỗi `delay` ms       | id để dùng cho `clearInterval` |
| `clearInterval(id)`               | Dừng interval đang chạy                | `undefined`                    |

```js
const timerId = setTimeout(sayHello, 1000, "An");
clearTimeout(timerId);

const intervalId = setInterval(updateClock, 1000);
clearInterval(intervalId);
```

`fn` phải là tham chiếu hàm. Viết `setTimeout(sayHello(), 1000)` sẽ gọi hàm ngay lập tức rồi truyền kết quả trả về (thường là `undefined`) cho `setTimeout`, và hàm đó sẽ báo lỗi.

### Ví dụ debounce cho ô tìm kiếm

```js
const input = document.querySelector("#keyword");
let timerId;

input.addEventListener("input", () => {
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    console.log("Gửi tìm kiếm:", input.value);
  }, 300);
});
```

Ý nghĩa: mỗi lần người dùng gõ sẽ xóa lịch chạy cũ, chỉ khi ngừng gõ 300 ms mới gửi yêu cầu. Đây là debounce, cách dùng phổ biến nhất của `setTimeout` trong dự án thực tế.

### Ví dụ đồng hồ cập nhật mỗi giây

```js
const clock = document.querySelector("#clock");

function updateClock() {
  clock.textContent = new Date().toLocaleTimeString("vi-VN");
}

setInterval(updateClock, 1000);
updateClock(); // gọi ngay để không phải chờ 1 giây mới có chữ
```

### Khi nào dùng?

| Tình huống                                    | Dùng          |
| --------------------------------------------- | ------------- |
| Chờ người dùng ngừng nhập trước khi gọi API   | `setTimeout`  |
| Hiện thông báo tự biến mất sau vài giây       | `setTimeout`  |
| Đếm ngược, đồng hồ, thanh tiến trình chạy     | `setInterval` |
| Lấy dữ liệu lặp lại, ví dụ tin tức mỗi 5 phút | `setInterval` |

### Lưu ý

- Luôn lưu lại id để hủy. Nếu không hủy, các lần chạy cũ vẫn cập nhật giao diện sau khi phần tử đã bị xóa, gây lỗi hoặc hiệu năng kém.
- `setInterval` không chờ tác vụ trước kết thúc. Nếu một lần xử lý mất lâu hơn `delay`, các lần chạy sẽ chồng lên nhau. Với tác vụ gọi API, thêm cờ đang xử lý hoặc dùng `setTimeout` nối tiếp để tránh dồn yêu cầu.
- `delay` là độ trễ tối thiểu, không phải độ trỉ chính xác. Tab chạy nền có thể bị trình duyệt giới hạn timer.
- `setTimeout` với `delay` bằng `0` không chạy ngay lập tức mà được đẩy sang hàng đợi tác vụ; nó giúp trì hoãn một đoạn xử lý nặng để giao diện kịp vẽ.

---

## `alert`, `confirm`, `prompt`

### Giới thiệu

Ba hộp thoại do trình duyệt cung cấp, không thể tùy chỉnh giao diện.

| Hàm                             | Trả về                                | Ứng dụng            |
| ------------------------------- | ------------------------------------- | ------------------- |
| `alert(message)`                | `undefined`, không có nút quyết định  | Báo lỗi đơn giản    |
| `confirm(message)`              | `true` khi bấm OK, `false` khi Cancel | Hỏi xác nhận        |
| `prompt(message, defaultValue)` | Chuỗi người dùng nhập, `null` nếu hủy | Hỏi một giá trị đơn |

Cả ba hàm đều chặn trang cho đến khi người dùng đóng hộp thoại, và nhiều trình duyệt bỏ qua chúng khi trang đang đóng.

### Ví dụ

```js
function handleDelete(name) {
  if (!confirm(`Xóa sản phẩm "${name}"?`)) {
    return;
  }

  console.log("Đã xóa:", name);
}
```

### Khi nào dùng?

`confirm` dùng cho các thao tác hủy được như xóa, rời trang khi đang nhập liệu. `alert` và `prompt` rất ít dùng trong sản phẩm thật vì giao diện không đồng nhất với phần còn lại và không kiểm soát được trải nghiệm người dùng.

### Lưu ý

- Nếu cần giao diện riêng cho xác nhận, nhập liệu hoặc báo lỗi, dựng bằng phần tử HTML và CSS thay vì dùng các hộp thoại này.
- Không dùng `alert` để báo lỗi dữ liệu người dùng vừa nhập; lỗi cần hiển thị ngay cạnh ô nhập để họ biết sửa ở đâu.
- Giá trị trả về của `prompt` là chuỗi, kể cả khi người dùng nhập số; phải tự kiểm tra `null` và chuyển kiểu.

---

## `screen`: kích thước màn hình thiết bị

### Giới thiệu

| Thuộc tính           | Ý nghĩa                                      |
| -------------------- | -------------------------------------------- |
| `screen.width`       | Chiều rộng màn hình thiết bị                 |
| `screen.height`      | Chiều cao màn hình thiết bị                  |
| `screen.availWidth`  | Chiều rộng còn trống, trừ thanh taskbar/dock |
| `screen.availHeight` | Chiều cao còn trống, trừ thanh taskbar/dock  |
| `screen.orientation` | `{ type, angle }`, ví dụ `portrait-primary`  |

### Ví dụ

```js
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
const isPortrait = screen.orientation?.type.startsWith("portrait");

console.log({ isTouchDevice, isPortrait });
```

### Khi nào dùng?

Các thuộc tính này chủ yếu dùng trong ứng dụng chạy kiểu cửa sổ như Google Slides hay trình chơi. Với web thông thường, `screen.width` mô tả cả màn hình chứ không phải vùng hiển thị trang, nên không dùng để quyết định bố cục.

### Lưu ý

- Cần xác định thiết bị có cảm ứng hay không thì dùng `matchMedia("(pointer: coarse)")` thay vì đoán qua `screen` hoặc `navigator.userAgent`.
- `screen.orientation` có thể là `undefined` ở một số môi trường; dùng `?.` như ví dụ trên.

---

## `location`: đọc và thay đổi địa chỉ trang

### Giới thiệu

`location` mô tả địa chỉ trang hiện tại. Với đường dẫn `https://shop.vn/san-pham?q=ao&page=2#top`, các thuộc tính được tách như sau:

| Thuộc tính          | Giá trị trong ví dụ    | Ghi chú                       |
| ------------------- | ---------------------- | ----------------------------- |
| `location.href`     | đường dẫn đầy đủ       | Gán giá trị mới sẽ điều hướng |
| `location.protocol` | `https:`               | Có dấu hai chấm               |
| `location.host`     | `shop.vn:8080`         | Gồm cả cổng nếu có            |
| `location.hostname` | `shop.vn`              | Chỉ tên miền                  |
| `location.port`     | `8080` hoặc chuỗi rỗng | Rỗng với cổng mặc định        |
| `location.pathname` | `/san-pham`            | Luôn bắt đầu bằng `/`         |
| `location.search`   | `?q=ao&page=2`         | Luôn bắt đầu bằng `?`         |
| `location.hash`     | `#top`                 | Luôn bắt đầu bằng `#`         |

Ba hàm điều hướng:

| Hàm                     | Hành vi                                                  |
| ----------------------- | -------------------------------------------------------- |
| `location.assign(url)`  | Mở trang mới và thêm một mục vào lịch sử                 |
| `location.replace(url)` | Mở trang mới và thay thế mục hiện tại, không có nút Back |
| `location.reload()`     | Tải lại trang hiện tại                                   |

Gán `location.href = url` tương đương `assign`. Gán `location.replace(url)` là cách rút gọn của `replace`.

### Ví dụ đọc tham số trên URL

```js
const params = new URLSearchParams(location.search);
const keyword = params.get("q") ?? "";
const page = Number(params.get("page") ?? 1);

console.log(keyword, page);
```

`URLSearchParams` xử lý sẵn việc giải mã ký tự. Chia tay ký tự `?`, `&` bằng chuỗi thủ công rất dễ sai khi giá trị chứa ký tự đặc biệt.

### Ví dụ điều hướng sau khi đăng nhập

```js
const redirectAfterLogin = "/don-hang";
location.assign(redirectAfterLogin);

// Dán trang khi người dùng bấm nhầm vào liên kết giỏ hàng
const currentPath = location.pathname;
location.replace(currentPath);
```

### Khi nào dùng?

- Dựng lại trang theo tham số URL: phân trang, sắp xếp, bộ lọc.
- Chuyển trang sau khi đăng nhập, thanh toán, hoặc xử lý xong.
- Dựng lại trang khi người dùng sửa URL bằng tay.

### Lưu ý

- Đọc `location.pathname` chỉ ra thư mục, nên dùng `pathname + search + hash` khi cần lấy đầy đủ phần sau domain.
- `reload()` có thể khiến người dùng mất dữ liệu đang nhập. Tránh gọi trong lúc họ đang thao tác.
- Điều hướng bằng cách gán `location` sẽ tải lại toàn bộ trang. Trong ứng dụng một trang, dùng router và `history.pushState` thay cho việc này.

---

## `history`: lịch sử điều hướng và đổi URL không tải lại trang

### Giới thiệu

| Thành phần                                | Công dụng                                                                         |
| ----------------------------------------- | --------------------------------------------------------------------------------- |
| `history.length`                          | Số mục trong lịch sử của tab hiện tại                                             |
| `history.back()`                          | Quay lại mục trước, giống nút Back của trình duyệt                                |
| `history.forward()`                       | Đi tới mục sau                                                                    |
| `history.go(n)`                           | `go(-1)` tương đương `back`, `go(1)` tương đương `forward`, `go(0)` tải lại trang |
| `history.pushState(state, title, url)`    | Thêm một mục lịch sử với URL mới, không tải lại trang                             |
| `history.replaceState(state, title, url)` | Thay URL hiện tại, không thêm mục mới                                             |

Sự kiện `popstate` trên `window` bắn ra khi người dùng bấm Back, Forward hoặc điều hướng bằng phím tắt. `pushState` và `replaceState` không tự bắn sự kiện này.

### Ví dụ: lọc danh sách và đồng bộ URL

```js
const form = document.querySelector("#filter-form");
const input = document.querySelector("#keyword");
const list = document.querySelector("#products");

function renderFromUrl() {
  const keyword = new URLSearchParams(location.search).get("q") ?? "";
  input.value = keyword;
  renderProducts(list, keyword);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const keyword = input.value.trim();
  const search = new URLSearchParams();
  if (keyword) {
    search.set("q", keyword);
  }

  const query = search.toString();
  history.pushState({ keyword }, "", query ? `?${query}` : location.pathname);
  renderProducts(list, keyword);
});

window.addEventListener("popstate", renderFromUrl);

renderFromUrl();
```

Vì có `popstate`, người dùng bấm Back sẽ thấy danh sách trở lại trạng thái trước, và URL thay đổi được sao chép chia sẻ lại đúng như lúc đầu.

### Khi nào dùng?

`back`, `forward`, `go` dùng cho nút Back, Forward tự dựng trong ứng dụng một trang. `pushState` dùng để mọi thay đổi trạng thái trên trang đều có thể chia sẻ bằng link và quay lại bằng nút Back.

### Lưu ý

- URL truyền vào `pushState` chỉ được khác cùng origin, ví dụ chỉ đổi `/san-pham` sang `/gio-hang` chứ không đổi sang domain khác.
- Tham số `title` không được trình duyệt dùng; truyền chuỗi rỗng.
- `pushState` chỉ đổi URL, không tải nội dung mới. Hệ thống dựng trang phải tự đọc URL và render lại, như ví dụ trên.
- Chỉ giữ dữ liệu nhỏ trong `state`, ví dụ `{ keyword }`. Dữ liệu này bị mất khi người dùng tải lại trang, nên nơi lưu bền vững phải là server.
- Khi người dùng mở trực tiếp một URL đã dùng `pushState`, cần server trả về đúng trang đó. Trang trắng hoặc lỗi 404 ở đây là lỗi cấu hình server, không phải lỗi JavaScript.

---

## `navigator`: thông tin trình duyệt và thiết bị

### Giới thiệu

| Thuộc tính / API        | Ý nghĩa                                                |
| ----------------------- | ------------------------------------------------------ |
| `navigator.userAgent`   | Chuỗi mô tả trình duyệt, ví dụ chứa `Chrome`, `Safari` |
| `navigator.language`    | Ngôn ngữ ưu tiên của trình duyệt, ví dụ `vi-VN`        |
| `navigator.languages`   | Danh sách ngôn ngữ theo thứ tự ưu tiên, là một mảng    |
| `navigator.onLine`      | `true` khi trình duyệt cho là đang có mạng             |
| `navigator.platform`    | Nền tảng hệ điều hành, ví dụ `MacIntel`                |
| `navigator.geolocation` | API định vị, cần cấp quyền và chạy trên HTTPS          |

`navigator` còn có `hardwareConcurrency`, `maxTouchPoints` và các thông tin khác; chỉ tra cứu khi thật sự cần.

### Ví dụ: theo dõi trạng thái mạng

```js
const status = document.querySelector("#network-status");

function renderNetworkStatus() {
  status.textContent = navigator.onLine ? "Đang kết nối" : "Mất kết nối";
}

window.addEventListener("online", renderNetworkStatus);
window.addEventListener("offline", renderNetworkStatus);
renderNetworkStatus();
```

### Ví dụ: hiển thị ngày theo ngôn ngữ trình duyệt

```js
const locale = navigator.language;
const today = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
  new Date(),
);

console.log(today);
```

Kết quả với `vi-VN` là "29 tháng 9, 2026", với `en-US` là "September 29, 2026".

### Khi nào dùng?

- `onLine` cùng sự kiện `online`, `offline`: báo cho người dùng biết mất mạng và họ có thể thử lại.
- `language`: chọn ngôn ngữ hiển thị mặc định, định dạng ngày, số, tiền tệ.
- `geolocation`: gợi ý cửa hàng gần vị trí, hoặc chỉ đường.

### Ví dụ lấy vị trí

```js
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
  },
  (error) => {
    console.log("Không lấy được vị trí:", error.message);
  },
  { timeout: 5000 },
);
```

### Lưu ý

- Đừng dựa vào `navigator.userAgent` để quyết định tính năng. Chuỗi này dễ bị giả mạo và thay đổi giữa các phiên bản trình duyệt. Kiểm tra khả năng thật sự tồn tại:

  ```js
  if ("IntersectionObserver" in window) {
    // Trình duyệt hỗ trợ, dùng được
  }
  ```

- `navigator.onLine` chỉ cho biết có kết nối tới mạng, không có nghĩa là API của bạn còn truy cập được. Vẫn cần xử lý lỗi khi gọi API.
- `geolocation` yêu cầu HTTPS (trừ `localhost`), người dùng phải cho phép, và chỉ hoạt động khi thiết bị bật định vị. Luôn viết nhánh xử lý khi bị từ chối quyền.
- `navigator.platform` trả về giá trị rời rạc theo trình duyệt; nếu cần biết có con trỏ chuột hay không thì dùng `matchMedia("(pointer: fine)")`.

---

## `localStorage` và `sessionStorage`

### Giới thiệu

Cả hai đều lưu dữ liệu dạng chuỗi theo cặp key/value trong trình duyệt, không tự gửi lên server.

| Đặc điểm          | `localStorage`                                               | `sessionStorage`      |
| ----------------- | ------------------------------------------------------------ | --------------------- |
| Thời gian tồn tại | Không mất khi đóng trang                                     | Mất khi đóng tab      |
| Phạm vi           | Dùng chung giữa các tab cùng origin                          | Chỉ trong tab đang mở |
| Dung lượng        | Khoảng 5 MB                                                  | Khoảng 5 MB           |
| API               | `setItem`, `getItem`, `removeItem`, `clear`, `key`, `length` | giống `localStorage`  |

Giá trị lưu trong hai API này luôn là chuỗi. Muốn lưu object hoặc mảng phải chuyển qua `JSON.stringify` và `JSON.parse`.

### Ví dụ lưu giao diện và lưu nháp

```js
function getTheme() {
  return localStorage.getItem("theme") ?? "light";
}

function setTheme(theme) {
  localStorage.setItem("theme", theme);
  document.documentElement.dataset.theme = theme;
}

setTheme(getTheme());

// Dữ liệu chỉ cần giữ trong tab hiện tại
sessionStorage.setItem("draft-article", "Nội dung đang soạn");
```

### Ví dụ lưu giỏ hàng dạng object

```js
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const raw = localStorage.getItem("cart");
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem("cart");
    return [];
  }
}

saveCart([{ id: 1, name: "Áo thun", quantity: 2 }]);
console.log(loadCart());
```

### Khi nào dùng?

| Dữ liệu                                            | Nơi lưu          |
| -------------------------------------------------- | ---------------- |
| Giao diện sáng/tối, ngôn ngữ đang chọn             | `localStorage`   |
| Token đăng nhập, tên người dùng                    | `localStorage`   |
| Giỏ hàng, bộ lọc đã lưu, danh sách yêu thích       | `localStorage`   |
| Dữ liệu đang nhập dở để không mất khi chuyển trang | `sessionStorage` |
| Dữ liệu nhạy cảm, bí mật                           | Không lưu ở đây  |

### Lưu ý

- Lưu trữ theo origin, nên `localhost:3000` và `localhost:5173` không dùng chung dữ liệu.
- Bất kỳ ai cũng đọc được dữ liệu trong `localStorage` từ DevTools. Không lưu mật khẩu, số thẻ hay token có quyền cao. Muốn dùng token dài hạn mà trình duyệt không tự gửi lên server thì token phải là loại không thể dùng ngoài phạm vi web.
- `setItem` có thể ném lỗi khi hết dung lượng, và việc truy cập có thể ném lỗi khi trình duyệt chặn cookie ở chế độ riêng tư. Bọc trong `try ... catch` khi đây là chức năng quan trọng.
- Sự kiện `storage` trên `window` bắn ra ở các tab khác khi dữ liệu thay đổi; dùng để đồng bộ giao diện giữa các tab mở cùng trang.
- `localStorage.clear()` xóa toàn bộ key của ứng dụng trên origin đó; nên xóa từng key cần thiết bằng `removeItem` để không ảnh hưởng dữ liệu khác cùng origin.

---

## `cookies`

### Giới thiệu

Cookie lưu dữ liệu ở phía máy chủ gửi kèm, và trình duyệt tự gửi lại cookie theo tên miền khi gửi yêu cầu.

| API                                   | Công dụng                                                |
| ------------------------------------- | -------------------------------------------------------- |
| `document.cookie`                     | Đọc tất cả cookie không có cờ `HttpOnly` dưới dạng chuỗi |
| `document.cookie = "name=value; ..."` | Ghi hoặc xóa một cookie                                  |

Các thuộc tính thường gặp khi ghi cookie: `path`, `max-age` hoặc `expires`, `domain`, `Secure`, `HttpOnly`, `SameSite`.

### Ví dụ

```js
function setCookie(name, value, maxAgeSeconds) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; samesite=Lax`;
}

function getCookie(name) {
  const row = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return row ? decodeURIComponent(row.split("=").slice(1).join("=")) : null;
}

function removeCookie(name) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

setCookie("theme", "dark", 60 * 60 * 24 * 30);
console.log(getCookie("theme")); // "dark"
removeCookie("theme");
```

### Khi nào dùng?

- Cookie cần server đọc: phiên đăng nhập, theo dõi lượt truy cập, ưu đãi sản phẩm.
- Ưu tiên gửi cờ `HttpOnly` và `Secure` cho cookie phiên; hai cờ này không đặt được từ JavaScript, phải do server thiết lập.
- Với dữ liệu chỉ phía trình duyệt cần đọc, dùng `localStorage` sẽ đơn giản hơn.

### Lưu ý

- Cookie có `HttpOnly` bị ẩn khỏi JavaScript, đó là cách bảo vệ token phiên khỏi bị đánh cắp qua XSS.
- Cookie gửi lên server với mọi yêu cầu cùng tên miền, nên số lượng và kích thước cần được giới hạn. Mỗi cookie chỉ vài trăm byte, tổng số cookie mỗi domain cũng có trần.
- Ghi đè cookie cần trùng `path` và `domain` với lúc tạo, nếu không sẽ tồn tại hai cookie cùng tên.
- Cookie của một tên miền không đọc được từ tên miền khác, và JavaScript đọc được toàn bộ cookie không `HttpOnly` của trang.
- `document.cookie` trả về chuỗi có thể rỗng; phải kiểm tra trước khi tách chuỗi.
