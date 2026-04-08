# Bài Tập: Xây Dựng API Products - ExpressJS + TypeScript + Prisma + Zod

Trong buổi học, chúng ta đã xây dựng project `express-ts` với layered architecture và API quản lý Users, sử dụng Express.js + TypeScript + Prisma + PostgreSQL. Bài tập này yêu cầu bạn mở rộng project đó bằng cách thêm module quản lý Products.

## 1. Cập Nhật Database Schema

Thêm file `product.prisma` vào `src/models/`, tham khảo cách viết `user.prisma` đã có. Định nghĩa model `Product` với các trường sau:

```prisma
model Product {
  id         Int      @id @default(autoincrement())
  name       String
  desc       String?
  price      Float
  stock      Int      @default(0)
  userId     Int
  user       User     @relation(fields: [userId], references: [id])
  created_at DateTime @default(now()) @db.Timestamp()
  updated_at DateTime @updatedAt @db.Timestamp()

  @@map("products")
}
```

Đồng thời cập nhật lại `user.prisma`, bổ sung relation ngược từ `User` về `Product`:

```prisma
products Product[]
```

## 2. Cấu Trúc File Cần Tạo

Tuân thủ đúng cấu trúc project đã có, bổ sung các file sau:

```
src/
├── controllers/
│   └── product.controller.ts
├── services/
│   └── product.service.ts
├── validators/
│   └── product.validator.ts
├── models/
│   └── product.prisma
└── routes/
    └── index.route.ts
```

## 3. Các API Cần Xây Dựng

### 3.1. Tạo Product - `POST /products`

Request Body:

```json
{
  "name": "Laptop Dell XPS 13",
  "desc": "Laptop cao cấp cho lập trình viên",
  "price": 25000000,
  "stock": 10,
  "userId": 1
}
```

Validation bằng Zod trong `src/validators/product.validator.ts`:

- `name` - string, bắt buộc, tối thiểu 2 ký tự
- `desc` - string, không bắt buộc
- `price` - number, bắt buộc, phải lớn hơn 0
- `stock` - number, không bắt buộc, >= 0, mặc định `0` nếu không truyền
- `userId` - number, bắt buộc

Ngoài Zod, trong `product.service.ts` phải kiểm tra `userId` có tồn tại trong PostgreSQL trước khi insert. Dùng Prisma để query:

```typescript
const user = await prisma.user.findUnique({ where: { id: userId } });
if (!user) throw new Error("User not found");
```

Response - 201 Created:

```json
{
  "data": {
    "id": 1,
    "name": "Laptop Dell XPS 13",
    "price": 25000000,
    "stock": 10,
    "userId": 1,
    "created_at": "2026-04-01T10:00:00.000Z"
  }
}
```

Response khi lỗi:

Validation fail - 400:

```json
{
  "error": "Validation failed",
  "details": [ ...danh sách lỗi từ Zod... ]
}
```

userId không tồn tại - 404:

```json
{ "error": "User not found" }
```

### 3.2. Lấy Danh Sách Products - `GET /products`

Hỗ trợ filter và pagination qua query params:

- `userId` - lọc products theo user, không bắt buộc
- `q` - tìm kiếm gần đúng theo `name`, không bắt buộc
- `page` - trang hiện tại, mặc định `1`
- `limit` - số items mỗi trang, mặc định `10`, tối đa `50`

Ví dụ request:

```
GET /products?userId=1&q=laptop&page=1&limit=5
```

Trong `product.service.ts`, dùng `prisma.product.findMany` với `skip` và `take` để pagination, dùng `contains` để search:

```typescript
const products = await prisma.product.findMany({
  where: {
    userId: userId ? Number(userId) : undefined,
    name: q ? { contains: q, mode: "insensitive" } : undefined,
  },
  skip: (page - 1) * limit,
  take: limit,
});
```

Response - 200 OK:

```json
{
  "data": [ ...danh sách products... ],
  "pagination": {
    "total": 23,
    "page": 1,
    "limit": 5,
    "totalPages": 5
  }
}
```

---

### 3.3. Lấy Chi Tiết Product - `GET /products/:id`

Trả về thông tin product kèm thông tin user đã tạo. Dùng `include` của Prisma, kết hợp `select` để chỉ lấy các trường cần thiết của User:

```typescript
const product = await prisma.product.findUnique({
  where: { id },
  include: {
    user: {
      select: { id: true, name: true, email: true },
    },
  },
});
```

Response - 200 OK:

```json
{
  "data": {
    "id": 1,
    "name": "Laptop Dell XPS 13",
    "price": 25000000,
    "stock": 10,
    "createdBy": {
      "id": 1,
      "name": "Nguyen Van A",
      "email": "vana@example.com"
    }
  }
}
```

Response - 404 Not Found:

```json
{ "error": "Product not found" }
```

---

### 3.4. Cập Nhật Product - `PUT /products/:id`

Chỉ cho phép cập nhật `name`, `desc`, `price`, `stock`. Không cho phép thay đổi `userId`.

Request Body (tất cả không bắt buộc - partial update):

```json
{
  "price": 23000000,
  "stock": 8
}
```

Validation Zod: body không được rỗng hoàn toàn, các trường nếu có phải đúng kiểu và đúng ràng buộc.

Trong service, dùng `prisma.product.update`:

```typescript
const updated = await prisma.product.update({
  where: { id },
  data: { ...body, updated_at: new Date() },
});
```

Nếu product không tồn tại, Prisma sẽ throw `PrismaClientKnownRequestError` với code `P2025` - bắt lỗi này để trả về 404.

Response - 200 OK:

```json
{
  "data": { ...thông tin product sau khi cập nhật... }
}
```

Response - 404 Not Found:

```json
{ "error": "Product not found" }
```

---

### 3.5. Xoá Product - `DELETE /products/:id`

Tương tự như update, bắt `P2025` từ Prisma nếu product không tồn tại.

Response - 200 OK:

```json
{ "message": "Product deleted successfully" }
```

Response - 404 Not Found:

```json
{ "error": "Product not found" }
```

---

## 4. Yêu Cầu Kỹ Thuật

Kiến trúc:

```
Route -> Controller -> Service -> Prisma -> PostgreSQL
```

Mỗi layer đúng trách nhiệm:

- Route - chỉ khai báo endpoint, gắn controller
- Controller - nhận `req`/`res`, gọi validator, gọi service, trả response
- Service - toàn bộ business logic và Prisma query, không đụng vào `req`/`res`
- Validator - Zod schema, đặt trong `src/validators/`

HTTP status code hợp lý cho từng trường hợp:

- `201` - tạo mới thành công
- `200` - các thao tác còn lại thành công
- `400` - validation fail
- `404` - không tìm thấy resource
- `500` - lỗi server không xác định

Deadline: 23:59 Thứ Năm, ngày 02 tháng 04 năm 2026.
Nộp bài: Gửi link Github Repo.
Tự code, tự làm, không nhờ AI làm hộ. Chúc bạn hoàn thành tốt bài tập!
