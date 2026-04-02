# Buổi học: File Upload với Multer và Validation với Zod trong Express

## Mục tiêu buổi học

Sau buổi này học viên sẽ biết xử lý upload file trong Node.js/Express theo hai hướng: lưu file vào thư mục local trên server và đẩy lên cloud storage với Cloudinary. Song song đó, học viên nắm được cách validate dữ liệu đầu vào bằng Zod, đóng gói thành middleware tái sử dụng cho nhiều route khác nhau.

---

<!--
Client -(req kèm theo file)-> Server Express -(req)-Middleware-> req mới
 -->

## Phần 1: Upload file với Multer

### 1. Multer là gì và tại sao cần nó?

Khi client gửi file lên server, dữ liệu được encode theo định dạng `multipart/form-data`. Express mặc định không hiểu định dạng này — nó chỉ hiểu `application/json` và `application/x-www-form-urlencoded`. Multer là middleware giải mã `multipart/form-data`, tách file ra khỏi body request và đưa vào `req.file` / `req.files` để bạn xử lý tiếp.

**Cài đặt:**

```bash
npm install multer
```

---

### 2. Các thành phần chính của Multer

#### 2.1. `multer.diskStorage(options)` — lưu file xuống ổ cứng

Tạo một storage engine điều khiển **nơi lưu** và **tên file**.

| Tham số       | Kiểu                      | Mô tả                                                                                                                    |
| ------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `destination` | `function(req, file, cb)` | Thư mục lưu file. Gọi `cb(null, 'đường/dẫn')`. Thư mục phải tồn tại trước.                                               |
| `filename`    | `function(req, file, cb)` | Tên file lưu vào disk. Gọi `cb(null, 'tên-file')`. Nếu không khai báo, Multer tự sinh tên ngẫu nhiên không có extension. |

Trong cả hai callback, tham số `file` chứa thông tin file **trước khi lưu** (chưa có `path`, `filename`):

```js
{
  fieldname: 'avatar',       // tên field trong form
  originalname: 'photo.jpg', // tên file gốc từ máy client
  encoding: '7bit',
  mimetype: 'image/jpeg'     // loại file (do browser khai báo)
}
```

#### 2.2. `multer.memoryStorage()` — giữ file trong RAM

File không lưu xuống disk mà giữ trong bộ nhớ dưới dạng `Buffer`. Dùng khi cần đẩy thẳng lên cloud (Cloudinary, S3) mà không muốn tạo file tạm.

```js
const storage = multer.memoryStorage();
// req.file.buffer → Buffer chứa nội dung file
// req.file.size   → kích thước tính bằng byte
```

#### 2.3. `fileFilter` — lọc file được phép upload

```js
function fileFilter(req, file, cb) {
  // cb(error, accept)
  // accept = true  → cho phép
  // accept = false → từ chối (không throw lỗi, chỉ bỏ qua file)
  // error !== null → throw lỗi ngay
}
```

#### 2.4. `limits` — giới hạn kích thước và số lượng

| Tùy chọn    | Mô tả                                       | Mặc định       |
| ----------- | ------------------------------------------- | -------------- |
| `fileSize`  | Kích thước tối đa của một file (byte)       | Không giới hạn |
| `files`     | Số file tối đa trong một request            | Không giới hạn |
| `fields`    | Số text field tối đa                        | Không giới hạn |
| `fieldSize` | Kích thước tối đa của một text field (byte) | 1MB            |
| `parts`     | Tổng số parts (fields + files)              | Không giới hạn |

#### 2.5. Các hàm xử lý request

Sau khi tạo instance `upload = multer(config)`, bạn dùng một trong các hàm sau làm middleware:

| Hàm                                 | Mô tả                                        | Kết quả              |
| ----------------------------------- | -------------------------------------------- | -------------------- |
| `upload.single(fieldname)`          | Nhận đúng 1 file từ field có tên `fieldname` | `req.file`           |
| `upload.array(fieldname, maxCount)` | Nhận nhiều file từ **cùng một field**        | `req.files` (array)  |
| `upload.fields(fields)`             | Nhận nhiều file từ **nhiều field khác nhau** | `req.files` (object) |
| `upload.none()`                     | Chỉ nhận text fields, không nhận file        | —                    |
| `upload.any()`                      | Nhận tất cả file từ bất kỳ field nào         | `req.files` (array)  |

Ví dụ `upload.fields`:

```js
upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "gallery", maxCount: 5 },
]);
// req.files['avatar'] → array 1 file
// req.files['gallery'] → array tối đa 5 file
```

#### 2.6. Thông tin trong `req.file` sau khi upload

| Thuộc tính     | Mô tả                                                |
| -------------- | ---------------------------------------------------- |
| `fieldname`    | Tên field trong form                                 |
| `originalname` | Tên file gốc trên máy client                         |
| `encoding`     | Encoding của file                                    |
| `mimetype`     | MIME type (do browser khai báo)                      |
| `size`         | Kích thước file (byte)                               |
| `destination`  | Thư mục đã lưu _(chỉ có với diskStorage)_            |
| `filename`     | Tên file đã lưu _(chỉ có với diskStorage)_           |
| `path`         | Đường dẫn đầy đủ đến file _(chỉ có với diskStorage)_ |
| `buffer`       | Buffer nội dung file _(chỉ có với memoryStorage)_    |

---

### 3. Upload lưu vào server (thư mục public/uploads)

**Cấu trúc thư mục:**

```
project/
  public/
    uploads/
  src/
    middlewares/
      upload.js
      handleMulterError.js
    routes/
      upload.route.js
  index.js
```

**Cấu hình Multer lưu local:**

```js
// src/middlewares/upload.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    // Lấy extension từ tên file gốc, thêm timestamp để tránh trùng tên
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ chấp nhận file ảnh (jpeg, png, webp)"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

module.exports = upload;
```

**Route xử lý upload:**

```js
// src/routes/upload.route.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

router.post("/upload-avatar", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Không có file nào được gửi lên" });
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ message: "Upload thành công", url: fileUrl });
});

// Upload nhiều file cùng lúc
router.post("/upload-multiple", upload.array("images", 5), (req, res) => {
  const urls = req.files.map(
    (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
  );
  res.json({ urls });
});

module.exports = router;
```

**Serve thư mục public trong Express:**

```js
// index.js
const express = require("express");
const app = express();

app.use(express.static("public"));
app.use("/api", require("./src/routes/upload.route"));

app.listen(3000, () => console.log("Server chạy trên port 3000"));
```

---

### 4. Gửi file bằng JavaScript (Fetch API)

Thay vì submit form HTML thuần, trong thực tế client thường dùng JavaScript để có thể xử lý response và hiển thị preview trước khi gửi.

**Upload 1 file:**

```html
<!-- index.html -->
<input type="file" id="fileInput" accept="image/*" />
<button id="uploadBtn">Upload</button>
<img id="preview" style="max-width: 300px; display: none;" />

<script>
  document.getElementById("uploadBtn").addEventListener("click", async () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
      alert("Vui lòng chọn file");
      return;
    }

    // Hiển thị preview trước khi upload
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = document.getElementById("preview");
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);

    // Tạo FormData — đây là cách duy nhất để gửi file qua fetch
    const formData = new FormData();
    formData.append("avatar", file); // "avatar" phải khớp với field name trong upload.single()

    try {
      const res = await fetch("/api/upload-avatar", {
        method: "POST",
        // KHÔNG set Content-Type header — trình duyệt tự set multipart/form-data + boundary
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        console.log("URL ảnh trên server:", data.url);
      } else {
        alert("Lỗi: " + data.message);
      }
    } catch (err) {
      console.error("Lỗi mạng:", err);
    }
  });
</script>
```

> **Lưu ý quan trọng:** Khi dùng `fetch` với `FormData`, **tuyệt đối không** set `Content-Type: multipart/form-data` thủ công. Trình duyệt phải tự set header này kèm `boundary` ngẫu nhiên. Nếu bạn set tay, server sẽ không parse được.

**Upload nhiều file kèm progress bar:**

```html
<input type="file" id="multiInput" accept="image/*" multiple />
<progress id="bar" value="0" max="100" style="width: 100%"></progress>
<p id="status"></p>

<script>
  document
    .getElementById("multiInput")
    .addEventListener("change", async (e) => {
      const files = e.target.files; // FileList
      if (!files.length) return;

      const formData = new FormData();
      // Append từng file — tên field phải giống upload.array("images")
      for (const file of files) {
        formData.append("images", file);
      }

      // Dùng XMLHttpRequest thay fetch để có progress event
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          document.getElementById("bar").value = percent;
          document.getElementById("status").textContent =
            `Đang upload: ${percent}%`;
        }
      });

      xhr.addEventListener("load", () => {
        const data = JSON.parse(xhr.responseText);
        document.getElementById("status").textContent = "Hoàn thành!";
        console.log("URLs:", data.urls);
      });

      xhr.open("POST", "/api/upload-multiple");
      xhr.send(formData);
    });
</script>
```

**Upload file kèm text fields:**

```html
<!-- Form cập nhật profile: có cả text lẫn ảnh -->
<input type="text" id="fullname" placeholder="Họ tên" />
<textarea id="bio" placeholder="Giới thiệu bản thân"></textarea>
<input type="file" id="avatar" accept="image/*" />
<button id="saveBtn">Lưu</button>

<script>
  document.getElementById("saveBtn").addEventListener("click", async () => {
    const formData = new FormData();
    formData.append("fullname", document.getElementById("fullname").value);
    formData.append("bio", document.getElementById("bio").value);

    const avatarFile = document.getElementById("avatar").files[0];
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    // Nếu không chọn ảnh, không append — req.file sẽ là undefined ở server

    const res = await fetch("/api/profile", {
      method: "PATCH",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  });
</script>
```

---

### 5. Upload lên Cloudinary (external storage)

Lưu file trên server có nhược điểm lớn: khi deploy lên cloud (Render, Railway), file upload sẽ **mất sau mỗi lần deploy** vì filesystem là ephemeral. Giải pháp là đẩy file lên dịch vụ lưu trữ ngoài như Cloudinary.

**Cloudinary là gì?** Dịch vụ lưu trữ ảnh và video trên cloud, có CDN sẵn, hỗ trợ transform ảnh (resize, crop, filter) qua URL.

**Cài đặt:**

```bash
npm install cloudinary multer-storage-cloudinary
```

**Cấu hình Cloudinary:**

```js
// src/config/cloudinary.js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
```

**Cấu hình Multer dùng Cloudinary storage:**

```js
// src/middlewares/uploadCloud.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "my-app/uploads", // Tên folder trên Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, crop: "limit" }], // Auto resize, không vượt 800px
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
```

**Route upload lên Cloudinary:**

```js
router.post("/upload-cloud", uploadCloud.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Không có file nào được gửi lên" });
  }

  // Khi dùng CloudinaryStorage:
  // req.file.path     → URL đầy đủ trên Cloudinary (CDN)
  // req.file.filename → public_id (dùng để xóa sau này)
  res.json({
    message: "Upload thành công",
    url: req.file.path,
    publicId: req.file.filename,
  });
});
```

**Xóa file trên Cloudinary:**

```js
router.delete("/delete-file/:publicId", async (req, res) => {
  // publicId có thể chứa "/" nên cần encode khi gửi từ client
  const result = await cloudinary.uploader.destroy(req.params.publicId);
  // result.result === 'ok' nếu xóa thành công
  res.json({ result });
});
```

**So sánh local upload và Cloudinary:**

|                      | Local           | Cloudinary               |
| -------------------- | --------------- | ------------------------ |
| Cài đặt              | Đơn giản        | Cần tài khoản + env vars |
| Tồn tại sau redeploy | ❌ Mất          | ✅ Vĩnh viễn             |
| CDN                  | ❌ Không        | ✅ Có sẵn                |
| Transform ảnh        | ❌ Cần tự xử lý | ✅ Qua URL               |
| Phù hợp cho          | Dev / test      | Production               |

---

### 6. Xử lý lỗi từ Multer

Multer throw lỗi kiểu `MulterError` khi vượt giới hạn. Cần middleware 4 tham số để bắt:

```js
// src/middlewares/handleMulterError.js
const multer = require("multer");

function handleMulterError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    // Các mã lỗi phổ biến:
    // LIMIT_FILE_SIZE    → file vượt fileSize limit
    // LIMIT_FILE_COUNT   → quá số file cho phép
    // LIMIT_FIELD_COUNT  → quá số text fields cho phép
    // LIMIT_UNEXPECTED_FILE → field name không khớp
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res.status(400).json({ message: "File quá lớn, tối đa 5MB" });
      case "LIMIT_FILE_COUNT":
        return res.status(400).json({ message: "Quá nhiều file" });
      case "LIMIT_UNEXPECTED_FILE":
        return res
          .status(400)
          .json({ message: `Field '${err.field}' không được phép` });
      default:
        return res.status(400).json({ message: "Lỗi upload: " + err.message });
    }
  }

  // Lỗi từ fileFilter tự custom
  if (err.message && err.message.includes("Chỉ chấp nhận file ảnh")) {
    return res.status(400).json({ message: err.message });
  }

  next(err); // Lỗi khác → chuyển sang error handler global
}

module.exports = handleMulterError;
```

```js
// index.js — đặt SAU tất cả routes
app.use(handleMulterError);
```

---

## Phần 2: Validation với Zod

### 1. Tại sao cần validation ở backend?

Frontend có thể validate trước khi gửi, nhưng người dùng hoàn toàn có thể dùng Postman, curl, hoặc tắt JS để bypass. Backend phải luôn validate dữ liệu độc lập.

**Tại sao Zod?**

Zod là schema-based validator. Một schema Zod vừa định nghĩa **cấu trúc dữ liệu** vừa **tự động suy ra TypeScript type**, vừa có thể **transform dữ liệu** (lowercase, trim, coerce...). Quan trọng hơn, schema này có thể tái sử dụng ở cả backend lẫn frontend.

**Cài đặt:**

```bash
npm install zod
```

---

### 2. Zod middleware — dùng được cho mọi route

Ý tưởng: tạo một hàm `validate(schema)` trả về middleware. Mỗi route truyền vào schema tương ứng, không cần viết lại logic bắt lỗi.

```js
// src/middlewares/validate.js
const { ZodError } = require("zod");

/**
 * Tạo middleware validate từ một Zod schema.
 * Validate req.body, nếu hợp lệ thì ghi đè req.body bằng dữ liệu đã parse.
 *
 * @param {import("zod").ZodSchema} schema
 * @param {"body" | "query" | "params"} source - Phần của request cần validate
 */
function validate(schema, source = "body") {
  return function (req, res, next) {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      // Chuyển lỗi Zod thành dạng dễ đọc: { field: ["lỗi 1", "lỗi 2"] }
      const errors = result.error.flatten().fieldErrors;
      return res.status(422).json({ errors });
    }

    // Ghi đè lại req[source] bằng dữ liệu đã được Zod parse + transform
    // Ví dụ: email đã được .toLowerCase(), số đã được .coerce()
    req[source] = result.data;
    next();
  };
}

module.exports = validate;
```

Middleware này:

- Validate `req.body` theo mặc định, hoặc `req.query` / `req.params` nếu truyền `source`.
- Nếu lỗi → trả về `422` với object mô tả lỗi từng field.
- Nếu hợp lệ → ghi đè lại `req[source]` bằng dữ liệu đã transform (rất quan trọng — xem ví dụ dưới).

---

### 3. Định nghĩa Zod schema cho từng route

```js
// src/validations/auth.schema.js
const { z } = require("zod");

const registerSchema = z.object({
  username: z
    .string({ required_error: "Username không được để trống" })
    .min(3, "Username phải từ 3 đến 20 ký tự")
    .max(20, "Username tối đa 20 ký tự")
    .regex(/^[a-zA-Z0-9_]+$/, "Username chỉ chứa chữ, số và dấu gạch dưới"),

  email: z
    .string({ required_error: "Email không được để trống" })
    .email("Email không hợp lệ")
    .toLowerCase(), // Transform: tự động lowercase sau khi validate

  password: z
    .string({ required_error: "Mật khẩu không được để trống" })
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .regex(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ hoa"),

  age: z
    .number()
    .int("Tuổi phải là số nguyên")
    .min(1, "Tuổi không hợp lệ")
    .max(120, "Tuổi không hợp lệ")
    .optional(),
});

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ").toLowerCase(),
  password: z.string().min(1, "Mật khẩu không được để trống"),
});

module.exports = { registerSchema, loginSchema };
```

---

### 4. Dùng middleware validate cho nhiều route

```js
// src/routes/auth.route.js
const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { registerSchema, loginSchema } = require("../validations/auth.schema");

// Mỗi route truyền schema khác nhau vào cùng một middleware
router.post("/register", validate(registerSchema), async (req, res) => {
  // Tới đây req.body đã hợp lệ và đã được transform
  // email đã lowercase nhờ .toLowerCase() trong schema
  const { username, email, password } = req.body;
  // ... tạo user trong database
  res.json({ message: "Đăng ký thành công" });
});

router.post("/login", validate(loginSchema), async (req, res) => {
  const { email, password } = req.body;
  // ... kiểm tra thông tin đăng nhập
  res.json({ message: "Đăng nhập thành công" });
});

module.exports = router;
```

**Response khi có lỗi validation:**

```json
{
  "errors": {
    "email": ["Email không hợp lệ"],
    "password": [
      "Mật khẩu tối thiểu 6 ký tự",
      "Mật khẩu phải có ít nhất 1 chữ hoa"
    ]
  }
}
```

---

### 5. Validate query params và route params

Middleware `validate` hỗ trợ tham số `source` để validate bất kỳ phần nào của request:

```js
// src/validations/product.schema.js
const { z } = require("zod");

// Validate query string: /products?page=2&limit=10&sort=price
const productQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1), // coerce: chuyển string "2" → number 2
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sort: z.enum(["price", "name", "createdAt"]).optional(),
});

// Validate route params: /products/:id
const productParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID không hợp lệ"), // MongoDB ObjectId
});

module.exports = { productQuerySchema, productParamSchema };
```

```js
// src/routes/product.route.js
const validate = require("../middlewares/validate");
const {
  productQuerySchema,
  productParamSchema,
} = require("../validations/product.schema");

router.get(
  "/products",
  validate(productQuerySchema, "query"), // validate req.query
  (req, res) => {
    // req.query.page là number (đã coerce), có default value
    const { page, limit, sort } = req.query;
    res.json({ page, limit, sort });
  },
);

router.get(
  "/products/:id",
  validate(productParamSchema, "params"), // validate req.params
  (req, res) => {
    res.json({ id: req.params.id });
  },
);
```

---

### 6. Kết hợp Multer và Zod trong cùng một route

Trường hợp thực tế: form cập nhật profile có cả ảnh avatar và text fields.

```js
// src/validations/user.schema.js
const { z } = require("zod");

const updateProfileSchema = z.object({
  fullname: z.string().min(2, "Tên tối thiểu 2 ký tự"),
  bio: z.string().max(200, "Bio tối đa 200 ký tự").optional(),
});

module.exports = { updateProfileSchema };
```

```js
// src/routes/user.route.js
const uploadCloud = require("../middlewares/uploadCloud");
const validate = require("../middlewares/validate");
const { updateProfileSchema } = require("../validations/user.schema");

// Thứ tự middleware: Multer trước, Zod sau
router.patch(
  "/profile",
  uploadCloud.single("avatar"), // 1. Multer parse multipart → req.body, req.file
  validate(updateProfileSchema), // 2. Zod validate req.body
  async (req, res) => {
    const { fullname, bio } = req.body;
    const avatarUrl = req.file?.path; // undefined nếu client không gửi ảnh
    // ... cập nhật user trong database
    res.json({ message: "Cập nhật thành công", avatarUrl });
  },
);
```

> **Lý do Multer phải đứng trước Zod:** Request `multipart/form-data` chưa được Multer parse thì `req.body` là `{}`. Đặt Zod trước Multer sẽ validate trên object rỗng và luôn báo lỗi.

---

## Tổng kết

**File upload với Multer:**

- `diskStorage` → lưu xuống ổ cứng, kiểm soát tên và thư mục
- `memoryStorage` → giữ trong RAM, dùng khi đẩy lên cloud
- `fileFilter` → lọc loại file được phép
- `limits` → giới hạn kích thước và số lượng
- `single / array / fields` → tương ứng với 1 file, nhiều file cùng field, nhiều file khác field
- Dùng `FormData` + `fetch` (không set Content-Type thủ công) để gửi file từ client
- Luôn có middleware `handleMulterError` để bắt `MulterError`

**Validation với Zod:**

- Đóng gói `validate(schema, source)` thành middleware tái sử dụng
- Mỗi route truyền schema tương ứng, không lặp lại logic bắt lỗi
- `source` có thể là `"body"`, `"query"`, hoặc `"params"`
- `z.coerce` để chuyển đổi kiểu (query string luôn là string, coerce về number)
- Zod transform dữ liệu (`.toLowerCase()`, `.default()`...) và ghi đè lại `req[source]`

**Kết hợp cả hai:** luôn đặt Multer trước Zod vì Multer mới parse được `req.body` trong `multipart/form-data`.
