# Reverse proxy, DNS config, Certbot, Cloudflare

## 1. Dùng VS Code để SSH vào VPS

- Khi làm việc với VPS, việc chỉnh sửa file trực tiếp trên terminal có thể bất tiện. VS Code hỗ trợ kết nối SSH để mở và chỉnh sửa file trên VPS ngay trong giao diện quen thuộc, trực quan hơn so với dùng nano hay vim trên terminal.
- Yêu cầu trước khi bắt đầu
  - Đã có VPS với thông tin: địa chỉ IP, username, password.
  - Đã cài VS Code trên máy local.
- Cài đặt extension Remote - SSH
  - Mở VS Code, vào phần Extensions (Ctrl+Shift+X).
  - Tìm "Remote - SSH" của Microsoft, nhấn Install.
  - Extension này cho phép VS Code kết nối tới máy chủ từ xa qua giao thức SSH, mở folder và chỉnh sửa file như đang làm việc trên máy local.
- Cấu hình SSH
  - Mở Command Palette (Ctrl+Shift+P hoặc Cmd+Shift+P trên macOS).
  - Gõ "Remote-SSH: Add New SSH Host..." rồi nhập lệnh SSH, ví dụ:

```
ssh username@ip_address
```

- Chọn file cấu hình SSH ở tài khoản cá nhân (thường là ~/.ssh/config).
- File cấu hình chỉ nên gồm 3 dòng cơ bản:

```
Host ten-vps
    HostName ip_address
    User username
```

- Trong đó:
  - Host: tên tùy chọn để nhận diện kết nối.
  - HostName: địa chỉ IP hoặc domain của VPS.
  - User: tên user để đăng nhập vào VPS.
- Kết nối tới VPS
  - Mở Command Palette, gõ "Remote-SSH: Connect to Host...".
  - Chọn host vừa cấu hình.
  - VS Code sẽ mở một cửa sổ mới, kết nối tới VPS. Lần đầu kết nối có thể cần nhập password.
  - Sau khi kết nối thành công, có thể mở folder, chỉnh sửa file, mở terminal tích hợp ngay trên VPS.
- Tham khảo thêm: https://code.visualstudio.com/docs/remote/ssh

## 2. Cấu hình SSL/TLS cho tên miền localhost

- TLS (Transport Layer Security, phiên bản nâng cấp của SSL) dùng để mã hóa dữ liệu truyền giữa trình duyệt và máy chủ. Trên môi trường production, chứng chỉ TLS cần được cấp bởi các tổ chức uy tín (CA - Certificate Authority) nhằm bảo chứng rằng domain đó thực sự thuộc về server tương ứng.
- Khi phát triển ở local, không thể xin chứng chỉ từ CA công cộng cho domain localhost. Giải pháp là dùng self-signed certificate (chứng chỉ tự ký). Công cụ mkcert giúp đơn giản hóa quá trình này.
- Cài đặt mkcert
  - Trên Ubuntu:

```
sudo apt install libnss3-tools
sudo wget https://github.com/FiloSottile/mkcert/releases/download/v1.4.3/mkcert-v1.4.3-linux-amd64
sudo mv mkcert-v1.4.3-linux-amd64 mkcert
sudo chmod +x mkcert
sudo cp mkcert /usr/local/bin/
```

- Trên macOS:

```
brew install mkcert
brew install nss  # nếu dùng Firefox
```

- Trên Windows (dùng Chocolatey):

```
choco install mkcert
```

- Tạo chứng chỉ SSL cho domain local
  - Cài CA của mkcert vào trình duyệt:

```
mkcert -install
```

- Lệnh này tự động import CA của mkcert vào Chrome/Chromium và Firefox.
- Tạo chứng chỉ cho domain cần dùng:

```
mkcert ten_domain
```

- Ví dụ tạo chứng chỉ cho domain mysite.local:

```
mkcert mysite.local
```

- Kết quả sẽ tạo ra 2 file: mysite.local.pem (certificate) và mysite.local-key.pem (private key).
- Nên cd đến thư mục muốn lưu chứng chỉ trước khi chạy lệnh, vì file sẽ được tạo tại thư mục hiện tại.
- Cấu hình Nginx sử dụng SSL
  - Mở port 443 và trỏ tới 2 file chứng chỉ vừa tạo:

```
server {
    listen 443 ssl http2;
    ssl_certificate /etc/nginx/ssl/mysite.local.pem;
    ssl_certificate_key /etc/nginx/ssl/mysite.local-key.pem;
    server_name mysite.local;
    root /var/www/mysite.local;
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php$query_string;
    }
}
```

- Trong đó:
  - listen 443 ssl http2: lắng nghe trên port 443 với SSL và HTTP/2.
  - ssl_certificate: đường dẫn tới file certificate.
  - ssl_certificate_key: đường dẫn tới file private key.
- Tham khảo thêm: https://toidicode.com/cai-dat-ssl-tren-local-su-dung-mkcert-478.html

## 3. Cài MariaDB trên Ubuntu

- MariaDB là hệ quản trị cơ sở dữ liệu quan hệ mã nguồn mở, được tạo bởi Michael "Monty" Widenius (một trong những người phát triển MySQL ban đầu). MariaDB tương thích hoàn toàn với MySQL, có cải tiến về hiệu năng và cam kết duy trì mã nguồn mở.
- Cài đặt MariaDB
  - Cập nhật danh sách gói:

```
sudo apt update
```

- Cài đặt MariaDB server:

```
sudo apt install mariadb-server
```

- Lệnh này cài cả server và các công cụ client đi kèm (mariadb, mysqladmin, mysqldump).
- Khởi động MariaDB:

```
sudo systemctl start mariadb.service
```

- Bật MariaDB tự khởi động cùng hệ thống:

```
sudo systemctl enable mariadb.service
```

- Bảo mật MariaDB
  - Chạy script bảo mật đi kèm:

```
sudo mysql_secure_installation
```

- Script này sẽ hỏi từng bước:
  - Nhập mật khẩu root hiện tại: nhấn Enter (chưa có mật khẩu).
  - Đặt mật khẩu root: nhấn N (trên Ubuntu, tài khoản root dùng unix_socket authentication, không nên đổi).
  - Các câu hỏi còn lại: nhấn Y để xóa anonymous users, tắt remote root login, xóa test database.
- Kiểm tra MariaDB
  - Kiểm tra trạng thái:

```
sudo systemctl status mariadb
```

- Kiểm tra phiên bản:

```
mariadb --version
```

- Kết nối vào MariaDB:

```
sudo mariadb
```

- Các lệnh quản lý thường dùng
  - Khởi động: sudo systemctl start mariadb
  - Dừng: sudo systemctl stop mariadb
  - Khởi động lại: sudo systemctl restart mariadb
  - Xem trạng thái: sudo systemctl status mariadb
  - Xem danh sách database: sudo mariadb -e "SHOW DATABASES;"
- Tham khảo thêm: https://www.digitalocean.com/community/tutorials/how-to-install-mariadb-on-ubuntu-20-04

## 4. Xử lý lỗi 404 khi deploy ứng dụng React trên VPS

- Khi deploy ứng dụng React (hoặc các SPA - Single Page Application) lên VPS, truy cập trang chủ hoạt động bình thường nhưng khi chuyển tới các trang con rồi refresh trình duyệt sẽ bị lỗi 404.
- Nguyên nhân
  - Ứng dụng React chỉ có một file index.html duy nhất. Việc điều hướng giữa các trang được xử lý hoàn toàn bởi JavaScript ở phía client (client-side routing).
  - Khi refresh trang tại một đường dẫn con (ví dụ /about), Nginx sẽ tìm file hoặc thư mục tương ứng trên server. Vì không tồn tại file /about trên server nên Nginx trả về lỗi 404.
- Cách khắc phục
  - Cấu hình Nginx để mọi request không khớp với file hoặc thư mục thực tế đều trả về index.html, để React Router xử lý điều hướng.
  - Mở file cấu hình Nginx (thường ở /etc/nginx/sites-available/ten_domain):

```
server {
    listen 80;
    server_name mydomain.com www.mydomain.com;

    root /var/www/mydomain;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

- Giải thích cấu hình:
  - listen 80: lắng nghe trên port 80.
  - server_name: tên domain của ứng dụng.
  - root: thư mục chứa file build của React.
  - index index.html: file mặc định khi truy cập.
  - try_files $uri $uri/ /index.html: Nginx thử tìm file hoặc thư mục theo đường dẫn request. Nếu không tìm thấy, trả về index.html để React Router xử lý phần còn lại.
- Kiểm tra cấu hình Nginx:

```
sudo nginx -t
```

- Reload Nginx để áp dụng thay đổi:

```
sudo systemctl reload nginx
```

- Tham khảo thêm: https://www.digitalocean.com/community/questions/there-is-404-error-in-sub-link-after-build-then-copy-to-the-server-directory
