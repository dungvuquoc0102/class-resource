// // 1. Định nghĩa Interface cho Người Quan Sát
// interface Observer {
//   update(lessonName: string): void;
// }

// // 2. Định nghĩa Interface cho Chủ Thể
// interface Subject {
//   attach(observer: Observer): void; // Đăng ký
//   detach(observer: Observer): void; // Hủy đăng ký
//   notify(): void; // Thông báo
// }

// // 3. Triển khai Chủ thể cụ thể (Concrete Subject)
// class CourseCenter implements Subject {
//   private observers: Observer[] = [];
//   private latestLesson: string = "";

//   attach(observer: Observer): void {
//     if (!this.observers.includes(observer)) {
//       this.observers.push(observer);
//     }
//   }

//   detach(observer: Observer): void {
//     this.observers = this.observers.filter((obs) => obs !== observer);
//   }

//   addNewLesson(name: string): void {
//     this.latestLesson = name;
//     this.notify();
//   }

//   notify(): void {
//     for (const observer of this.observers) {
//       observer.update(this.latestLesson);
//     }
//   }
// }

// // 4. Triển khai các Người quan sát cụ thể (Concrete Observers)
// class Student implements Observer {
//   constructor(private name: string) {}

//   update(lessonName: string): void {
//     console.log(
//       `Học viên [${this.name}] nhận thông báo: Bài học mới "${lessonName}" đã lên sóng!`,
//     );
//   }
// }

// // --- Cách sử dụng ---
// const f8Course = new CourseCenter();

// const studentA = new Student("Dũng");
// const studentB = new Student("Nam");

// f8Course.attach(studentA);
// f8Course.attach(studentB);

// // Khi có bài học mới, tất cả học viên đã đăng ký tự động nhận thông báo
// f8Course.addNewLesson("TypeScript nâng cao: Cấu trúc OOP");

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
