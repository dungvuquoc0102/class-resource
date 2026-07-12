# Day 32: OOP trong TypeScript - Design Pattern cơ bản

## 1. Bài tập OOP: Hệ thống Quản lý Bán hàng

Xây dựng hệ thống quản lý sản phẩm, khách hàng và đơn hàng. Toàn bộ code đặt trong thư mục `src/`.

### 1.1. Model: Product

```typescript
// FILE: src/models/Product.ts
export class Product {
  constructor(
    private _id: string,
    private _name: string,
    private _price: number,
    private _stock: number,
  ) {}

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get price(): number {
    return this._price;
  }
  get stock(): number {
    return this._stock;
  }

  set name(newName: string) {
    this._name = newName;
  }
  set price(newPrice: number) {
    this._price = newPrice;
  }

  public increaseStock(quantity: number): void {
    if (quantity <= 0) throw new Error("Số lượng tăng phải lớn hơn 0");
    this._stock += quantity;
  }

  public decreaseStock(quantity: number): void {
    if (quantity <= 0) throw new Error("Số lượng giảm phải lớn hơn 0");
    if (this._stock < quantity)
      throw new Error(`Sản phẩm ${this._name} không đủ hàng tồn kho!`);
    this._stock -= quantity;
  }

  public toString(): string {
    return `[SP - ${this._id}] ${this._name} | Giá: ${this._price}đ | Kho: ${this._stock}`;
  }
}
```

Product dùng **private fields** + **getter/setter** để kiểm soát truy cập, `increaseStock`/`decreaseStock` có validation.

### 1.2. Service: ProductService

```typescript
// FILE: src/services/ProductService.ts
import { Product } from "../models/Product";

interface IProductService {
  addProduct(product: Product): void;
  updateProduct(
    id: string,
    data: Partial<Pick<Product, "name" | "price">>,
  ): void;
  deleteProduct(id: string): void;
  findById(id: string): Product | undefined;
  findByName(keyword: string): Product[];
  getAllProducts(): Product[];
  printProducts(): void;
}

export class ProductService implements IProductService {
  private products: Product[] = [];

  public addProduct(product: Product): void {
    if (this.findById(product.id)) throw new Error("ID sản phẩm đã tồn tại");
    this.products.push(product);
  }

  public updateProduct(
    id: string,
    data: Partial<Pick<Product, "name" | "price">>,
  ): void {
    const product = this.findById(id);
    if (!product) throw new Error("Không tìm thấy sản phẩm để cập nhật");
    if (data.name) product.name = data.name;
    if (data.price !== undefined) product.price = data.price;
  }

  public deleteProduct(id: string): void {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Không tìm thấy sản phẩm để xóa");
    this.products.splice(index, 1);
  }

  public findById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  public findByName(keyword: string): Product[] {
    return this.products.filter((p) =>
      p.name.toLowerCase().includes(keyword.toLowerCase()),
    );
  }

  public getAllProducts(): Product[] {
    return [...this.products];
  }

  public printProducts(): void {
    console.log("=== DANH SÁCH SẢN PHẨM TRONG KHO ===");
    this.products.forEach((p) => console.log(p.toString()));
  }
}
```

`ProductService` quản lý danh sách `Product` trong mảng private. Các method: thêm, sửa, xóa, tìm kiếm. `getAllProducts()` trả về bản sao để tránh đột biến mảng gốc từ bên ngoài.

### 1.3. Model: Customer

```typescript
// FILE: src/models/Customer.ts
export class Customer {
  constructor(
    private _id: string,
    private _name: string,
    private _phone: string,
    private _address: string,
  ) {}

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get phone(): string {
    return this._phone;
  }
  get address(): string {
    return this._address;
  }

  public updatePhone(phone: string): void {
    if (!phone) throw new Error("Số điện thoại không được để trống");
    this._phone = phone;
  }

  public updateAddress(address: string): void {
    if (!address) throw new Error("Địa chỉ không được để trống");
    this._address = address;
  }

  public toString(): string {
    return `[KH - ${this._id}] ${this._name} | SĐT: ${this._phone} | ĐC: ${this._address}`;
  }
}
```

### 1.4. Service: CustomerService

```typescript
// FILE: src/services/CustomerService.ts
import { Customer } from "../models/Customer";

interface ICustomerService {
  addCustomer(customer: Customer): void;
  updateCustomer(id: string, data: { phone?: string; address?: string }): void;
  deleteCustomer(id: string): void;
  findById(id: string): Customer | undefined;
  findByPhone(phone: string): Customer | undefined;
  getAllCustomers(): Customer[];
  printCustomers(): void;
}

export class CustomerService implements ICustomerService {
  private customers: Customer[] = [];

  public addCustomer(customer: Customer): void {
    if (this.findById(customer.id)) throw new Error("ID khách hàng đã tồn tại");
    this.customers.push(customer);
  }

  public updateCustomer(
    id: string,
    data: { phone?: string; address?: string },
  ): void {
    const customer = this.findById(id);
    if (!customer) throw new Error("Không tìm thấy khách hàng");
    if (data.phone) customer.updatePhone(data.phone);
    if (data.address) customer.updateAddress(data.address);
  }

  public deleteCustomer(id: string): void {
    const index = this.customers.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Không tìm thấy khách hàng để xóa");
    this.customers.splice(index, 1);
  }

  public findById(id: string): Customer | undefined {
    return this.customers.find((c) => c.id === id);
  }

  public findByPhone(phone: string): Customer | undefined {
    return this.customers.find((c) => c.phone === phone);
  }

  public getAllCustomers(): Customer[] {
    return [...this.customers];
  }

  public printCustomers(): void {
    console.log("=== DANH SÁCH KHÁCH HÀNG ===");
    this.customers.forEach((c) => console.log(c.toString()));
  }
}
```

### 1.5. Model: OrderItem

```typescript
// FILE: src/models/OrderItem.ts
import { Product } from "./Product";

export class OrderItem {
  private _price: number;

  constructor(
    private _product: Product,
    private _quantity: number,
  ) {
    this._price = _product.price;
  }

  get product(): Product {
    return this._product;
  }
  get quantity(): number {
    return this._quantity;
  }
  get price(): number {
    return this._price;
  }

  set quantity(qty: number) {
    if (qty <= 0) throw new Error("Số lượng sản phẩm trong đơn phải lớn hơn 0");
    this._quantity = qty;
  }

  public getTotal(): number {
    return this._price * this._quantity;
  }
}
```

`OrderItem` chốt giá tại thời điểm tạo item, tránh việc `Product` đổi giá ảnh hưởng đơn cũ.

### 1.6. Model: Order

```typescript
// FILE: src/models/Order.ts
import { Customer } from "./Customer";
import { OrderItem } from "./OrderItem";

export enum OrderStatus {
  NEW = "NEW",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
}

export class Order {
  private _items: OrderItem[] = [];
  private _createdAt: Date;
  private _status: OrderStatus;

  constructor(
    private _id: string,
    private _customer: Customer,
  ) {
    this._createdAt = new Date();
    this._status = OrderStatus.NEW;
  }

  get id(): string {
    return this._id;
  }
  get customer(): Customer {
    return this._customer;
  }
  get items(): OrderItem[] {
    return this._items;
  }
  get status(): OrderStatus {
    return this._status;
  }
  get createdAt(): Date {
    return this._createdAt;
  }

  set status(newStatus: OrderStatus) {
    this._status = newStatus;
  }

  public addItem(item: OrderItem): void {
    if (this._status !== OrderStatus.NEW)
      throw new Error("Không thể thêm sản phẩm vào đơn hàng đã chốt/hủy");
    const existingItem = this._items.find(
      (i) => i.product.id === item.product.id,
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this._items.push(item);
    }
  }

  public removeItem(productId: string): void {
    if (this._status !== OrderStatus.NEW)
      throw new Error("Không thể xóa sản phẩm khỏi đơn hàng đã chốt/hủy");
    this._items = this._items.filter((item) => item.product.id !== productId);
  }

  public calculateTotal(): number {
    return this._items.reduce((total, item) => total + item.getTotal(), 0);
  }

  public printInvoice(): void {
    console.log(`\n================ HÓA ĐƠN: ${this._id} ================`);
    console.log(`Ngày tạo: ${this._createdAt.toLocaleString()}`);
    console.log(`Trạng thái: [${this._status}]`);
    console.log(
      `Khách hàng: ${this._customer.name} - ĐC: ${this._customer.address}`,
    );
    console.log(`--------------------------------------------------`);
    this._items.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.product.name} x ${item.quantity} | Đơn giá: ${item.price}đ | Thành tiền: ${item.getTotal()}đ`,
      );
    });
    console.log(`--------------------------------------------------`);
    console.log(`TỔNG CỘNG THÀNH TIỀN: ${this.calculateTotal()}đ`);
    console.log(`====================================================\n`);
  }
}
```

`Order` dùng `enum OrderStatus` quản lý trạng thái. Chỉ đơn ở trạng thái `NEW` mới được thêm/xóa sản phẩm.

### 1.7. Service: OrderService (Nhạc trưởng)

```typescript
// FILE: src/services/OrderService.ts
import { Order, OrderStatus } from "../models/Order";
import { Customer } from "../models/Customer";
import { OrderItem } from "../models/OrderItem";
import { ProductService } from "./ProductService";

export class OrderService {
  private orders: Order[] = [];

  constructor(private productService: ProductService) {}

  public createOrder(customer: Customer): Order {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = new Order(orderId, customer);
    this.orders.push(newOrder);
    return newOrder;
  }

  public addProduct(
    orderId: string,
    productId: string,
    quantity: number,
  ): void {
    const order = this.findOrder(orderId);
    if (!order) throw new Error("Không tìm thấy đơn hàng");
    const product = this.productService.findById(productId);
    if (!product) throw new Error("Sản phẩm không tồn tại trong hệ thống");
    if (product.stock < quantity)
      throw new Error(`Kho không đủ hàng cho sản phẩm: ${product.name}`);

    const orderItem = new OrderItem(product, quantity);
    order.addItem(orderItem);
  }

  public removeProduct(orderId: string, productId: string): void {
    const order = this.findOrder(orderId);
    if (!order) throw new Error("Không tìm thấy đơn hàng");
    order.removeItem(productId);
  }

  public checkout(orderId: string): void {
    const order = this.findOrder(orderId);
    if (!order) throw new Error("Không tìm thấy đơn hàng");
    if (order.status !== OrderStatus.NEW)
      throw new Error("Đơn hàng đã thanh toán hoặc đã hủy từ trước");

    for (const item of order.items) {
      item.product.decreaseStock(item.quantity);
    }
    order.status = OrderStatus.PAID;
    console.log(`[CHECKOUT SUCCESS] Đơn hàng ${orderId} đã được thanh toán!`);
  }

  public cancelOrder(orderId: string): void {
    const order = this.findOrder(orderId);
    if (!order) throw new Error("Không tìm thấy đơn hàng");

    if (order.status === OrderStatus.PAID) {
      for (const item of order.items) {
        item.product.increaseStock(item.quantity);
      }
    }
    order.status = OrderStatus.CANCELLED;
    console.log(`[CANCEL SUCCESS] Đơn hàng ${orderId} đã được hủy thành công!`);
  }

  public findOrder(orderId: string): Order | undefined {
    return this.orders.find((o) => o.id === orderId);
  }

  public getOrders(): Order[] {
    return [...this.orders];
  }

  public printOrders(): void {
    console.log("=== TOÀN BỘ ĐƠN HÀNG HỆ THỐNG ===");
    this.orders.forEach((o) => o.printInvoice());
  }
}
```

`OrderService` đóng vai trò **nhạc trưởng**: nhận `ProductService` qua constructor (dependency injection), điều phối luồng mua hàng: **checkout** thì trừ kho, **cancel** thì hoàn kho.

### 1.8. Kịch bản chạy thử

```typescript
// FILE: src/index.ts
import { Product } from "./models/Product";
import { ProductService } from "./services/ProductService";
import { Customer } from "./models/Customer";
import { CustomerService } from "./services/CustomerService";
import { OrderService } from "./services/OrderService";

const productService = new ProductService();
const customerService = new CustomerService();
const orderService = new OrderService(productService);

try {
  productService.addProduct(new Product("P1", "MacBook Pro M3", 45000000, 10));
  productService.addProduct(new Product("P2", "iPhone 15 Pro", 28000000, 5));
  productService.printProducts();

  const customer = new Customer(
    "C1",
    "Anh Học Viên F8",
    "0987654321",
    "Hà Nội",
  );
  customerService.addCustomer(customer);

  console.log("\n--- Bắt đầu tạo đơn hàng ---");
  const myOrder = orderService.createOrder(customer);
  orderService.addProduct(myOrder.id, "P1", 2);
  orderService.addProduct(myOrder.id, "P2", 1);
  myOrder.printInvoice();

  orderService.checkout(myOrder.id);

  console.log("\n--- Kiểm tra kho sau khi mua ---");
  productService.printProducts();

  console.log("\n--- Khách hàng đổi ý, yêu cầu hủy đơn ---");
  orderService.cancelOrder(myOrder.id);

  console.log("\n--- Kiểm tra kho sau khi HỦY đơn ---");
  productService.printProducts();
} catch (error: any) {
  console.error("❌ CÓ LỖI XẢY RA:", error.message);
}
```

---

## 2. Factory Pattern

Factory Pattern giúp **che giấu việc khởi tạo object** phức tạp. Client không cần biết class cụ thể nào được tạo, chỉ cần gọi factory với tham số mô tả.

```typescript
// 1. Định nghĩa Interface chung cho tất cả các loại Service thông báo
interface NotificationService {
  send(message: string): void;
}

// 2. Tạo các Class cụ thể triển khai Interface trên
class EmailNotification implements NotificationService {
  send(message: string): void {
    console.log(`[EMAIL] Gửi mail với nội dung: ${message}`);
  }
}

class SMSNotification implements NotificationService {
  send(message: string): void {
    console.log(
      `[SMS] Gửi tin nhắn đến số điện thoại với nội dung: ${message}`,
    );
  }
}

// 3. Tạo Factory để quản lý việc khởi tạo
class NotificationFactory {
  public static createNotification(type: "EMAIL" | "SMS"): NotificationService {
    switch (type) {
      case "EMAIL":
        return new EmailNotification();
      case "SMS":
        return new SMSNotification();
      default:
        throw new Error("Loại thông báo không hợp lệ!");
    }
  }
}

// --- Cách sử dụng ---
const channel = NotificationFactory.createNotification("EMAIL");
channel.send("Mã OTP của bạn là 123456");

const smsChannel = NotificationFactory.createNotification("SMS");
smsChannel.send("Mã OTP của bạn là 123456");
```

**Ý tưởng:** Việc `new EmailNotification()` hay `new SMSNotification()` được gói gọn trong `NotificationFactory`. Nếu sau này thêm `ZaloNotification`, client code không cần sửa, chỉ cần thêm case trong factory.

---

const sum = 1 + 2;

function sum(...args) {
return args.reduce((acc, curr) => acc + curr, 0);
}

sum(1, 2, 3, 4, 5); // 15

## 3. Observer Pattern

Observer Pattern định nghĩa mối quan hệ **một-nhiều** (one-to-many): khi một object (Subject) thay đổi trạng thái, tất cả các object phụ thuộc (Observer) tự động được thông báo.

```typescript
// 1. Định nghĩa Interface cho Người Quan Sát
interface Observer {
  update(lessonName: string): void;
}

// 2. Định nghĩa Interface cho Chủ Thể
interface Subject {
  attach(observer: Observer): void; // Đăng ký
  detach(observer: Observer): void; // Hủy đăng ký
  notify(): void; // Thông báo
}

// 3. Triển khai Chủ thể cụ thể (Concrete Subject)
class CourseCenter implements Subject {
  private observers: Observer[] = [];
  private latestLesson: string = "";

  attach(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  addNewLesson(name: string): void {
    this.latestLesson = name;
    this.notify();
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this.latestLesson);
    }
  }
}

// 4. Triển khai các Người quan sát cụ thể (Concrete Observers)
class Student implements Observer {
  constructor(private name: string) {}

  update(lessonName: string): void {
    console.log(
      `Học viên [${this.name}] nhận thông báo: Bài học mới "${lessonName}" đã lên sóng!`,
    );
  }
}

// --- Cách sử dụng ---
const f8Course = new CourseCenter();

const studentA = new Student("Dũng");
const studentB = new Student("Nam");

f8Course.attach(studentA);
f8Course.attach(studentB);

// Khi có bài học mới, tất cả học viên đã đăng ký tự động nhận thông báo
f8Course.addNewLesson("TypeScript nâng cao: Cấu trúc OOP");
```

**Ứng dụng thực tế:** Event listeners trong DOM, WebSocket notifications, React state management (Zustand, Redux), message queue.
