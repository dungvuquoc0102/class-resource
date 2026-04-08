# Bài Tập: Xây Dựng API Upload Ảnh Sản Phẩm - ExpressJS + Multer + Cloudinary + Zod

Trong buổi học, chúng ta đã thực hành upload file với Multer (lưu local và đẩy lên Cloudinary) cùng với validation đầu vào bằng Zod. Bài tập này yêu cầu bạn mở rộng project `api/` đã có bằng cách xây dựng một API quản lý sản phẩm có hỗ trợ upload ảnh.

### 1. Cấu trúc file cần tạo

Tuân thủ đúng cấu trúc project đã có, bổ sung các file sau:

```
api/
├── middlewares/
│   └── uploadCloud.js        (đã có, tái sử dụng)
│   └── validate.js           (đã có, tái sử dụng)
│   └── handleMulterError.js  (đã có, tái sử dụng)
├── validations/
│   └── product.schema.js     (cần tạo mới)
├── routes/
│   └── product.route.js      (cần tạo mới)
└── server.js                 (cần cập nhật để mount route mới)
```

### 2. Định nghĩa Zod Schema cho sản phẩm

Tạo file `api/validations/product.schema.js`, định nghĩa các schema sau:

Schema tạo sản phẩm (`createProductSchema`):

- `name` - string, bắt buộc, tối thiểu 2 ký tự, tối đa 100 ký tự
- `price` - number, bắt buộc, phải lớn hơn 0
- `stock` - number, không bắt buộc, >= 0, mặc định `0` nếu không truyền
- `description` - string, không bắt buộc, tối đa 500 ký tự

Lưu ý: khi dùng `multipart/form-data` (upload file), tất cả text field đều là string. Dùng `z.coerce.number()` để chuyển `price` và `stock` từ string sang number.

Schema cập nhật sản phẩm (`updateProductSchema`):

Tương tự `createProductSchema` nhưng tất cả các trường đều không bắt buộc (partial update). Body không được rỗng hoàn toàn - nếu không có trường nào hợp lệ thì trả về lỗi.

### 3. Các API cần xây dựng

#### 3.1. Upload ảnh đơn lẻ - `POST /products`

Tạo sản phẩm mới kèm ảnh đại diện. Client gửi request dạng `multipart/form-data` với field `image` chứa file ảnh và các text field chứa thông tin sản phẩm.

Thứ tự middleware bắt buộc:

```
uploadCloud.single("image") -> validate(createProductSchema) -> handler
```

Trong handler, lấy URL ảnh từ `req.file.path` (Cloudinary URL), lấy dữ liệu text từ `req.body` (đã được Zod parse và transform).

Response - 201 Created:

```json
{
  "message": "Tạo sản phẩm thành công",
  "data": {
    "name": "Áo thun basic",
    "price": 150000,
    "stock": 50,
    "description": "Áo thun cotton 100%",
    "imageUrl": "https://res.cloudinary.com/your-cloud/image/upload/v.../abc.jpg"
  }
}
```

Response khi không gửi file ảnh - 400 Bad Request:

```json
{ "message": "Vui lòng upload ảnh sản phẩm" }
```

Response khi validation fail - 422 Unprocessable Entity:

```json
{
  "errors": {
    "name": ["Tên sản phẩm phải từ 2 đến 100 ký tự"],
    "price": ["Giá phải lớn hơn 0"]
  }
}
```

#### 3.2. Upload nhiều ảnh - `POST /products/gallery`

Upload tối đa 5 ảnh cùng lúc cho một bộ sưu tập. Client gửi nhiều file qua field `images`.

Dùng `uploadCloud.array("images", 5)` làm middleware upload.

Response - 200 OK:

```json
{
  "message": "Upload thành công 3 ảnh",
  "urls": [
    "https://res.cloudinary.com/your-cloud/image/upload/v.../img1.jpg",
    "https://res.cloudinary.com/your-cloud/image/upload/v.../img2.jpg",
    "https://res.cloudinary.com/your-cloud/image/upload/v.../img3.jpg"
  ]
}
```

Response khi không có file nào - 400 Bad Request:

```json
{ "message": "Vui lòng chọn ít nhất 1 ảnh" }
```

#### 3.3. Cập nhật thông tin sản phẩm kèm ảnh - `PATCH /products/:id`

Cập nhật thông tin sản phẩm. Ảnh là tuỳ chọn - nếu client không gửi ảnh mới thì giữ nguyên URL ảnh cũ. Client truyền `oldImageUrl` trong body để server biết URL ảnh hiện tại.

Thứ tự middleware:

```
uploadCloud.single("image") -> validate(updateProductSchema) -> handler
```

Trong handler:

- Nếu `req.file` tồn tại: dùng `req.file.path` làm `imageUrl` mới
- Nếu `req.file` không tồn tại: giữ nguyên `oldImageUrl` từ `req.body`

Response - 200 OK:

```json
{
  "message": "Cập nhật thành công",
  "data": {
    "id": "1",
    "name": "Áo thun premium",
    "price": 200000,
    "stock": 45,
    "imageUrl": "https://res.cloudinary.com/your-cloud/image/upload/v.../new.jpg"
  }
}
```

Response - 404 Not Found:

```json
{ "message": "Không tìm thấy sản phẩm" }
```

#### 3.4. Xoá ảnh trên Cloudinary - `DELETE /products/image`

Xoá một ảnh khỏi Cloudinary theo `publicId`. Client truyền `publicId` qua query string.

Validate query string bằng Zod (`source = "query"`): `publicId` là string, bắt buộc, không được rỗng.

Ví dụ request:

```
DELETE /products/image?publicId=my-app%2Fuploads%2Fabc123
```

Trong handler, gọi `cloudinary.uploader.destroy(publicId)` để xoá ảnh.

Response - 200 OK:

```json
{ "message": "Xoá ảnh thành công" }
```

Response khi `publicId` không hợp lệ hoặc không tìm thấy - 400 Bad Request:

```json
{ "message": "Không tìm thấy ảnh hoặc publicId không hợp lệ" }
```

### 4. Cập nhật `server.js`

Mount route sản phẩm vào server:

```js
app.use("/products", require("./routes/product.route"));
```

Đảm bảo middleware `handleMulterError` vẫn được đặt sau tất cả các route.

### 5. Phần nâng cao (Không bắt buộc)

Nếu bạn đã hoàn thành các yêu cầu trên, hãy thử thêm:

Validate loại file ở phía server trước khi đẩy lên Cloudinary: chỉ chấp nhận `image/jpeg`, `image/png`, `image/webp`, từ chối các loại file khác bằng `fileFilter` trong cấu hình Multer của `uploadCloud.js`.

Giới hạn kích thước file tối đa là 3MB cho mỗi ảnh bằng `limits.fileSize` trong cấu hình Multer.

### 6. Yêu cầu kỹ thuật

Middleware validate Zod phải dùng lại `validate.js` đã có, không viết logic validate riêng trong route hay handler.

Thứ tự middleware trong route kết hợp upload và validate phải đúng: Multer trước, Zod sau - vì `req.body` chỉ có dữ liệu sau khi Multer đã parse `multipart/form-data`.

Mọi lỗi từ Multer (vượt giới hạn file size, sai field name, quá số file cho phép) phải được xử lý qua `handleMulterError.js` và trả về response JSON rõ ràng, không để server crash.

HTTP status code hợp lý cho từng trường hợp:

- `201` - tạo mới thành công
- `200` - các thao tác còn lại thành công
- `422` - validation fail (Zod)
- `400` - lỗi upload file, lỗi nghiệp vụ
- `404` - không tìm thấy resource
- `500` - lỗi server không xác định

Deadline: 23:59 Thứ Bảy, ngày 05 tháng 04 năm 2026.
Nộp bài: Gửi link Github Repo hoặc link Postman Collection đã test đầy đủ các API. Tự code, tự làm, không nhờ AI làm hộ. Chúc bạn hoàn thành tốt bài tập!
