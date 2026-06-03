# Fetch API: Gọi API từ Javascript

## Ý tưởng chung

**Fetch API** là cách hiện đại để gửi **HTTP request** từ trình duyệt, nhận dữ liệu từ server mà **không cần tải lại trang**. Thay vì dùng `XMLHttpRequest` (cũ), ta dùng `fetch()` — **async/await** sạch sẽ và **Promise**-based.

## HTTP Methods & Request/Response

### HTTP Methods (Các cách gửi request)

| Method | Ý nghĩa                          | Khi dùng                                  |
| ------ | -------------------------------- | ----------------------------------------- |
| GET    | Lấy dữ liệu                      | Yêu cầu lấy thông tin từ server           |
| POST   | Tạo dữ liệu mới                  | Gửi form, tạo bài post, tài khoản mới    |
| PUT    | Thay thế toàn bộ tài nguyên      | Cập nhật toàn bộ một object               |
| PATCH  | Cập nhật một phần tài nguyên      | Thay đổi một vài trường của object        |
| DELETE | Xóa tài nguyên                   | Xóa bài post, tài khoản, hình ảnh         |

### Request & Response

**Request** = Yêu cầu từ client gửi đến server
- URL: `https://api.example.com/posts`
- Method: `GET`, `POST`, v.v.
- Headers: Metadata (vd: `Content-Type: application/json`)
- Body: Dữ liệu gửi lên (nếu có)

**Response** = Trả lời từ server
- Status code: `200` (thành công), `404` (không tìm thấy), `500` (lỗi server)
- Headers: Metadata phản hồi
- Body: Dữ liệu trả về (JSON, HTML, text…)

## Fetch Basic

### GET Request - Lấy dữ liệu

```javascript
// Cách cơ bản
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Lỗi:', error));

// Dùng async/await (hiện đại hơn)
async function getPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Lỗi:', error);
  }
}

getPosts();
```

**Giải thích:**
- `fetch()` gửi request, trả về **Promise** chứa `Response`
- `.json()` chuyển response body thành object JS
- `try/catch` bắt lỗi mạng hoặc parsing

### Kiểm tra Status Code

```javascript
async function fetchWithCheck() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/999');
    
    // Kiểm tra xem request có thành công không
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Dữ liệu:', data);
  } catch (error) {
    console.error('Lỗi:', error.message);
  }
}

fetchWithCheck();
```

**Lưu ý:** `fetch()` chỉ reject promise khi có **lỗi mạng**, không phải lỗi HTTP. `response.ok` kiểm tra status `200-299`.

## POST, PUT, PATCH, DELETE

### POST - Tạo dữ liệu mới

```javascript
async function createPost() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Báo server dữ liệu ở dạng JSON
      },
      body: JSON.stringify({
        title: 'Bài viết mới',
        body: 'Nội dung bài viết',
        userId: 1,
      }),
    });

    const data = await response.json();
    console.log('Tạo thành công:', data);
  } catch (error) {
    console.error('Lỗi:', error);
  }
}

createPost();
```

### PUT - Thay thế toàn bộ

```javascript
async function updatePost(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        title: 'Tiêu đề cập nhật',
        body: 'Nội dung cập nhật',
        userId: 1,
      }),
    });

    const data = await response.json();
    console.log('Cập nhật thành công:', data);
  } catch (error) {
    console.error('Lỗi:', error);
  }
}

updatePost(1);
```

### PATCH - Cập nhật một phần

```javascript
async function partialUpdate(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Chỉ cập nhật tiêu đề', // Chỉ gửi field cần thay đổi
      }),
    });

    const data = await response.json();
    console.log('Cập nhật thành công:', data);
  } catch (error) {
    console.error('Lỗi:', error);
  }
}

partialUpdate(1);
```

### DELETE - Xóa dữ liệu

```javascript
async function deletePost(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Xóa thành công');
    }
  } catch (error) {
    console.error('Lỗi:', error);
  }
}

deletePost(1);
```

## Headers & Authentication

### Headers phổ biến

```javascript
const headers = {
  'Content-Type': 'application/json', // Loại dữ liệu gửi đi
  'Accept': 'application/json', // Loại dữ liệu nhận về
  'Authorization': 'Bearer token_here', // Xác thực
  'User-Agent': 'MyApp/1.0', // Định danh client
};

fetch('https://api.example.com/data', {
  method: 'GET',
  headers: headers,
});
```

### Xác thực với Token (JWT)

```javascript
async function fetchWithAuth(token) {
  try {
    const response = await fetch('https://api.example.com/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Token JWT
      },
    });

    const data = await response.json();
    console.log('Thông tin user:', data);
  } catch (error) {
    console.error('Lỗi xác thực:', error);
  }
}

const myToken = 'eyJhbGc...(token dài)...';
fetchWithAuth(myToken);
```

## Query Parameters

### Truyền tham số qua URL

```javascript
// Cách 1: String thông thường
const url = 'https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5';
fetch(url)
  .then(res => res.json())
  .then(data => console.log(data));

// Cách 2: URL object (sạch sẽ hơn)
const searchParams = new URLSearchParams({
  userId: 1,
  _limit: 5,
  _sort: 'id',
  _order: 'desc',
});

const fullUrl = `https://jsonplaceholder.typicode.com/posts?${searchParams}`;
fetch(fullUrl)
  .then(res => res.json())
  .then(data => console.log(data));
```

## Request Timeout

### Hủy request sau thời gian nhất định

```javascript
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal, // Liên kết với abort signal
    });
    clearTimeout(timeoutId);

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Request timeout');
    } else {
      console.error('Lỗi:', error);
    }
  }
}

fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1', 3000);
```

## Error Handling

### Xử lý các loại lỗi

```javascript
async function robustFetch() {
  try {
    const response = await fetch('https://api.example.com/data', {
      method: 'GET',
    });

    // Lỗi HTTP (4xx, 5xx)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `HTTP ${response.status}: ${errorData.message || 'Unknown error'}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Lỗi mạng
    if (!navigator.onLine) {
      console.error('Không có kết nối mạng');
    }
    // Lỗi parse JSON
    else if (error instanceof SyntaxError) {
      console.error('Lỗi parse JSON');
    }
    // Lỗi abort/timeout
    else if (error.name === 'AbortError') {
      console.error('Request bị hủy hoặc timeout');
    }
    // Lỗi khác
    else {
      console.error('Lỗi:', error.message);
    }

    throw error;
  }
}

robustFetch();
```

## Thực hành: Weather App với Fetch

### HTML

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather App</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      max-width: 500px;
      margin: 2rem auto;
      padding: 1rem;
    }

    .search-box {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #ccc;
      border-radius: 0.375rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      background: #0084ff;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
    }

    .weather-info {
      background: #f0f2f5;
      padding: 1.5rem;
      border-radius: 0.5rem;
    }

    .loading,
    .error {
      text-align: center;
      padding: 1rem;
    }

    .loading {
      color: #666;
    }

    .error {
      color: #d32f2f;
    }
  </style>
</head>
<body>
  <h1>Thời tiết</h1>
  
  <div class="search-box">
    <input 
      type="text" 
      id="cityInput" 
      placeholder="Nhập tên thành phố..."
      value="Hanoi"
    >
    <button id="searchBtn">Tìm kiếm</button>
  </div>

  <div id="weatherContainer">
    <p class="loading">Đang tải...</p>
  </div>

  <script src="app.js"></script>
</body>
</html>
```

### JavaScript

```javascript
const API_KEY = 'b6fd43953eb2a2c933b07fc0c2bdddb5'; // Free API key từ openweathermap.org
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherContainer = document.getElementById('weatherContainer');

// Lấy thời tiết theo thành phố
async function getWeather(city) {
  weatherContainer.innerHTML = '<p class="loading">Đang tải...</p>';

  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=vi`
    );

    if (!response.ok) {
      throw new Error(
        response.status === 404 ? 'Thành phố không tìm thấy' : 'Lỗi API'
      );
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherContainer.innerHTML = `<p class="error">❌ Lỗi: ${error.message}</p>`;
  }
}

// Hiển thị thông tin thời tiết
function displayWeather(data) {
  const { name, sys, main, weather, wind } = data;

  weatherContainer.innerHTML = `
    <div class="weather-info">
      <h2>${name}, ${sys.country}</h2>
      <p><strong>Nhiệt độ:</strong> ${Math.round(main.temp)}°C</p>
      <p><strong>Cảm giác:</strong> ${Math.round(main.feels_like)}°C</p>
      <p><strong>Mô tả:</strong> ${weather[0].description}</p>
      <p><strong>Độ ẩm:</strong> ${main.humidity}%</p>
      <p><strong>Gió:</strong> ${wind.speed} m/s</p>
      <p><strong>Áp suất:</strong> ${main.pressure} hPa</p>
    </div>
  `;
}

// Event listeners
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
  }
});

// Tải thời tiết mặc định khi page load
getWeather('Hanoi');
```

## Tổng kết

| Khái niệm              | Ý nghĩa                                       |
| ---------------------- | --------------------------------------------- |
| `fetch(url, options)`  | Gửi HTTP request, trả về Promise              |
| `response.ok`          | Kiểm tra status code 200-299                  |
| `response.json()`      | Chuyển response body thành JS object          |
| `method`               | GET, POST, PUT, PATCH, DELETE                 |
| `headers`              | Metadata request (Content-Type, Auth, v.v.)   |
| `body`                 | Dữ liệu gửi lên (JSON.stringify)              |
| Async/Await            | Cách hiện đại viết code bất đồng bộ           |
| `AbortController`      | Hủy request, thiết lập timeout                |
| Error handling         | Bắt lỗi mạng, HTTP, parse JSON                |
