# Sử dụng VPS cơ bản, Linux cơ bản, Nginx và Deploy ứng dụng web

## 1. Sử dụng VPS cơ bản

### 1.1. VPS là gì

VPS (Virtual Private Server) là máy chủ ảo riêng tư. Về bản chất, đây là một máy tính ảo được tạo ra từ một máy vật lý thực bằng các công nghệ ảo hóa như VMware hoặc các công nghệ tương tự. Một máy vật lý có thể được chia thành nhiều VPS độc lập.

Lý do cần sử dụng VPS thay vì máy tính cá nhân:

- Máy tính cá nhân không được thiết kế để chạy liên tục 24/7.
- Máy chủ cần có backup nguồn điện, backup mạng, phòng làm mát và hệ thống tản nhiệt để hoạt động ổn định nhiều năm mà không cần bảo dưỡng thường xuyên.
- Khi dùng VPS, người ta thường cài hệ điều hành dạng server (không có giao diện đồ họa), giúp tiết kiệm RAM và tài nguyên hệ thống.

### 1.2. Linux và các bản phân phối

Linux (đọc là "Linux") thực chất là một kernel, tức là lõi hệ điều hành, chứ không phải một hệ điều hành hoàn chỉnh. Các nhà phát triển dựa trên kernel Linux để xây dựng những bản phân phối (distribution) như:

- Ubuntu (phổ biến nhất cho người mới học)
- Debian
- CentOS
- Android (cũng dựa trên nhân Linux)

Ubuntu có phiên bản desktop đầy đủ giao diện đồ họa. Tuy nhiên khi sử dụng làm máy chủ, người ta thường chọn phiên bản Ubuntu Server không có giao diện đồ họa để tiết kiệm tài nguyên.

macOS cũng có nguồn gốc từ UNIX nên các lệnh terminal trên macOS rất giống với Linux.

### 1.3. Thuê VPS và thông tin cần lưu ý

Khi thuê VPS từ nhà cung cấp (ví dụ interdata.vn), sau khi thanh toán sẽ nhận được:

- Địa chỉ IP công khai: là địa chỉ duy nhất trên Internet xác định máy chủ đó.
- Mật khẩu root: mật khẩu của tài khoản quản trị cao nhất.

Không nên cắm thẻ thanh toán tự động nếu chỉ thuê để học tập. Một số nhà cung cấp cloud VPS quốc tế như AWS hay Google Cloud thường cung cấp credit miễn phí (AWS cho 300 USD) nếu có thẻ Visa.

Sự khác biệt giữa VPS và Hosting:

- VPS: mỗi VPS có một địa chỉ IP riêng. Người dùng toàn quyền quản trị máy ảo.
- Hosting: được xây dựng trên nền VPS, sau đó chia nhỏ thành nhiều hosting. Nhiều hosting dùng chung một địa chỉ IP. Bảo mật phụ thuộc vào nhà cung cấp, dễ bị ảnh hưởng lẫn nhau.

## 2. Các lệnh Linux cơ bản

### 2.1. Kết nối vào máy chủ qua SSH

SSH (Secure Shell) là giao thức bảo mật dùng để kết nối và điều khiển máy chủ từ xa thông qua dòng lệnh.

Cú pháp kết nối:

```
ssh [tên_tài_khoản]@[địa_chỉ_IP]
```

Ví dụ:

```
ssh root@103.x.x.x
```

Lần đầu kết nối sẽ hỏi xác nhận, nhập đầy đủ chữ "yes". Khi nhập mật khẩu, terminal sẽ không hiển thị ký tự nào, đây là cơ chế bảo mật bình thường.

Để thoát khỏi SSH, dùng lệnh:

```
exit
```

### 2.2. Cấu trúc hệ thống tệp

Khác với Windows chia ổ C, D, trên Linux toàn bộ hệ thống chỉ có một gốc duy nhất là dấu gạch chéo "/". Một số thư mục quan trọng:

- "/": thư mục gốc (root của toàn hệ thống)
- "/root": thư mục riêng của tài khoản root
- "/home": chứa thư mục riêng của tất cả tài khoản người dùng thường
- "/etc": chứa các file cấu hình của phần mềm cài đặt trên hệ thống

### 2.3. Di chuyển và xem vị trí

Xem đường dẫn hiện tại:

```
pwd
```

Đi về thư mục gốc:

```
cd /
```

Đi vào thư mục con:

```
cd tên_thư_mục
```

Quay lại thư mục cha:

```
cd ..
```

Đi về thư mục home của tài khoản đang dùng:

```
cd ~
```

Dấu "~" là ký tự đại diện cho thư mục home của tài khoản hiện tại. Có thể dùng đường dẫn tuyệt đối (bắt đầu từ "/") hoặc đường dẫn tương đối (tính từ vị trí hiện tại).

### 2.4. Liệt kê nội dung thư mục

Liệt kê đơn giản:

```
ls
```

Liệt kê chi tiết theo cột dọc:

```
ls -l
```

Liệt kê bao gồm cả file ẩn (file bắt đầu bằng dấu chấm):

```
ls -la
```

Trong kết quả của "ls -l":

- Ký tự đầu tiên: "d" là thư mục, "l" là symlink (shortcut), "-" là file thường
- 9 ký tự tiếp theo chia thành 3 nhóm, mỗi nhóm 3 ký tự: quyền của owner, group, other
- Tên nhóm và tên tài khoản chủ sở hữu

### 2.5. Tạo và chỉnh sửa file

Tạo file trống:

```
touch tên_file
```

Ghi đè nội dung vào file (tạo file nếu chưa có):

```
echo "nội dung" > tên_file
```

Thêm nội dung vào cuối file:

```
echo "nội dung" >> tên_file
```

Xem nội dung file:

```
cat tên_file
```

#### Dùng trình soạn thảo Vim

Mở file với Vim:

```
vim tên_file
```

Các thao tác trong Vim:

- Nhấn "i" để vào chế độ Insert (gõ nội dung); "a" để vào Insert và dịch con trỏ sang phải một ký tự.
- Nhấn "Esc" để thoát khỏi chế độ Insert.
- Gõ ":w" rồi Enter để lưu; ":q" để thoát; ":wq" hoặc ":x" để lưu và thoát; ":q!" để thoát không lưu.
- Gõ "$" (không ở Insert mode) để nhảy đến cuối dòng.
- Gõ "dd" để xóa cả dòng.
- Gõ "/" rồi từ khóa để tìm kiếm, "n" để chuyển đến kết quả tiếp theo.
- Gõ ":$" để nhảy đến dòng cuối file.

#### Dùng trình soạn thảo Nano

Mở file với Nano:

```
nano tên_file
```

Nano dễ dùng hơn Vim vì không cần chế độ Insert. Nhập nội dung trực tiếp. Để lưu và thoát: Ctrl+X rồi nhập "Y" và Enter xác nhận tên file.

### 2.6. Xóa file và thư mục

Xóa một hoặc nhiều file:

```
rm tên_file
rm file1 file2
rm abc*.js
```

Xóa thư mục và toàn bộ nội dung bên trong:

```
rm -r tên_thư_mục
rm -rf tên_thư_mục
```

Tham số "-f" (force) là ép buộc xóa. Lệnh "rm -rf" rất nguy hiểm vì xóa không thể khôi phục. Cần xác định kỹ đường dẫn trước khi thực thi.

### 2.7. Tạo thư mục

Tạo thư mục một cấp:

```
mkdir tên_thư_mục
```

Tạo nhiều cấp thư mục lồng nhau (kể cả những thư mục cha chưa tồn tại):

```
mkdir -p thư_mục_cha/thư_mục_con
```

### 2.8. Di chuyển, đổi tên, sao chép

Di chuyển hoặc đổi tên file/thư mục:

```
mv nguồn đích
```

Đổi tên là trường hợp đặc biệt của di chuyển: di chuyển đến cùng vị trí nhưng với tên khác.

Sao chép file:

```
cp nguồn đích
```

Ví dụ sao chép vào thư mục và giữ nguyên tên:

```
cp abc.js public/
```

### 2.9. Tạo symbolic link (symlink)

Symlink là shortcut trỏ đến file/thư mục gốc ở nơi khác:

```
ln -s đường_dẫn_gốc vị_trí_đặt_link
```

Khi tương tác với symlink, thực chất là đang tương tác với file/thư mục gốc. Thay đổi ở symlink sẽ ảnh hưởng đến file gốc.

### 2.10. Xem thông tin hệ thống

Xem thông tin hệ điều hành:

```
uname -a
```

Xem các tiến trình đang chạy (hiển thị thời gian thực):

```
top
```

Xem tiến trình với giao diện trực quan hơn (cần cài):

```
htop
```

Nhấn "Q" để thoát khỏi top/htop.

Xem tình trạng RAM:

```
free -h
```

Xem tình trạng ổ cứng:

```
df -h
```

Cần theo dõi ổ cứng thường xuyên vì nếu đầy ổ cứng, server sẽ ngừng hoạt động hoàn toàn.

Xem hướng dẫn sử dụng lệnh:

```
man tên_lệnh
```

Ví dụ: "man ls" sẽ hiện mô tả và các tham số của lệnh "ls".

Xem dòng cuối của file (mặc định 10 dòng):

```
tail tên_file
tail -n 5 tên_file
```

Theo dõi file liên tục khi có nội dung mới được thêm vào:

```
tail -f tên_file
```

Lệnh "tail -f" rất hữu ích để debug log của server theo thời gian thực.

Xem dòng đầu của file:

```
head tên_file
head -n 5 tên_file
```

### 2.11. Cập nhật hệ thống

Ngay sau khi thuê VPS, việc đầu tiên nên làm là cập nhật hệ thống:

```
sudo apt update && sudo apt upgrade -y
```

- "apt update": tải danh sách package mới nhất từ kho lưu trữ về, chưa cập nhật thật.
- "apt upgrade": thực sự cài đặt các bản cập nhật.
- "&&": chạy lệnh tiếp theo chỉ khi lệnh trước thành công.
- "-y": tự động chọn "yes" khi được hỏi xác nhận.

Nhiều hướng dẫn cài phần mềm trên mạng đều bắt đầu bằng "apt update" vì cần đảm bảo danh sách package đủ mới để tìm thấy phần mềm cần cài.

### 2.12. Quản lý người dùng và quyền hạn

#### Tại sao không dùng tài khoản root thường xuyên

Tài khoản root có toàn quyền trên hệ thống. Nếu một ứng dụng bị khai thác lỗ hổng bảo mật và thực thi với quyền root, kẻ tấn công sẽ chiếm toàn bộ máy chủ. Mỗi dự án nên chạy dưới một tài khoản riêng, hạn chế quyền hạn để giảm rủi ro.

Tạo tài khoản mới:

```
adduser tên_tài_khoản
```

Hệ thống sẽ tự động tạo group cùng tên và thư mục "/home/tên_tài_khoản".

Chuyển sang tài khoản khác:

```
su - tên_tài_khoản
```

Chuyển sang tài khoản root với mật khẩu tài khoản hiện tại:

```
sudo su -
```

Chuyến sang tài khoản root với mật khẩu root:

```
su -
```

#### Lệnh sudo

Lệnh "sudo" cho phép chạy một lệnh với quyền của root mà không cần đăng nhập trực tiếp vào root:

```
sudo lệnh
```

Cần nhập mật khẩu của tài khoản hiện tại (không phải mật khẩu root).

Thêm tài khoản vào nhóm sudo (thực hiện với quyền root):

```
usermod -aG sudo tên_tài_khoản
```

#### Hệ thống phân quyền

Mỗi file và thư mục có 9 bit quyền chia làm 3 nhóm (mỗi nhóm 3 ký tự: r, w, x hoặc dấu "-"):

- Nhóm 1 (ký tự 2-4): quyền của owner (chủ sở hữu, ký hiệu "u")
- Nhóm 2 (ký tự 5-7): quyền của group (nhóm, ký hiệu "g")
- Nhóm 3 (ký tự 8-10): quyền của other (những người khác, ký hiệu "o")

Ba loại quyền:

- "r" (read): quyền đọc nội dung
- "w" (write): quyền ghi, sửa, tạo
- "x" (execute): quyền thực thi lệnh trong file

Thêm quyền:

```
chmod +x tên_file
chmod u+x tên_file
chmod g+wx tên_file
```

Bớt quyền:

```
chmod -x tên_file
chmod o-x tên_file
```

## 3. Quản lý tiến trình

### 3.1. Chạy tiến trình nền

Khi chạy một lệnh thông thường, nếu đóng terminal thì tiến trình đó sẽ dừng. Để chạy nền (background):

```
lệnh &
```

Sau khi chạy, terminal sẽ hiển thị ID của tiến trình.

### 3.2. Tìm và dừng tiến trình

Xem danh sách tất cả tiến trình đang chạy (kết quả dạng standard output):

```
ps aux
```

Kết hợp với grep để tìm tiến trình cụ thể:

```
ps aux | grep tên_tiến_trình
```

Dấu "|" (pipe) chuyển kết quả của lệnh bên trái thành đầu vào để lọc bằng lệnh bên phải.

Để lệnh "grep" tìm chuỗi trong file:

```
grep "từ_khóa" tên_file
```

Dừng tiến trình theo ID:

```
kill -9 ID_tiến_trình
```

Tham số "-9" là tín hiệu force terminate, kết thúc ngay lập tức. Không có tham số thì tiến trình được phép dừng có kiểm soát.

## 4. Cài đặt Node.js với NVM

### 4.1. NVM là gì và tại sao cần dùng

NVM (Node Version Manager) là công cụ quản lý nhiều phiên bản Node.js trên cùng một máy. Trong thực tế, một máy có thể cần chạy nhiều dự án với các phiên bản Node khác nhau (ví dụ dự án cũ dùng Node 16, dự án mới dùng Node 22). Cài thẳng Node lên máy chỉ có được một phiên bản.

Tương tự NVM, còn có PVM (PHP Version Manager), JVM (Java Version Manager) cho các ngôn ngữ khác.

### 4.2. Cài đặt NVM

Truy cập trang GitHub của NVM, tìm phần "Install and Update", sao chép lệnh cài đặt dạng:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v.../install.sh | bash
```

Sau khi cài xong, cần tải lại biến môi trường để dùng được NVM. Có thể chạy lệnh được gợi ý sau khi cài hoặc mở lại terminal.

### 4.3. Cài và quản lý phiên bản Node

Cài phiên bản cụ thể:

```
nvm install 22
```

Chuyển sang phiên bản đã cài:

```
nvm use 22
```

Chạy file với phiên bản cụ thể:

```
nvm exec 16 node app.js
```

Đặt phiên bản mặc định:

```
nvm alias default 22
```

## 5. Nginx và deploy ứng dụng Frontend

### 5.1. Nginx là gì

Nginx (đọc là "engine-x") là phần mềm máy chủ web mã nguồn mở, chạy dưới dạng dịch vụ trên máy chủ. Nginx có thể:

- Phục vụ file tĩnh (HTML, CSS, JS, ảnh, video)
- Hoạt động như máy chủ ngược (Reverse Proxy): nhận request từ Internet và chuyển tiếp đến các dịch vụ backend

### 5.2. Cài đặt và quản lý dịch vụ Nginx

Cài Nginx:

```
sudo apt install nginx
```

Kiểm tra trạng thái dịch vụ:

```
service nginx status
```

Bật dịch vụ:

```
service nginx start
```

Dừng dịch vụ:

```
service nginx stop
```

Reload cấu hình (không dừng dịch vụ, không làm gián đoạn request đang xử lý):

```
sudo nginx -s reload
```

Nên dùng "reload" thay vì "restart" vì "restart" = stop + start, sẽ làm mất các request đang xử lý dở.

### 5.3. Cấu trúc thư mục Nginx

Nginx được cấu hình tại "/etc/nginx/":

- "nginx.conf": file cấu hình chung
- "sites-available/": chứa các file cấu hình của từng trang web/dịch vụ
- "sites-enabled/": chứa symlink trỏ đến các cấu hình trong "sites-available" đang được bật

Nginx chỉ nạp cấu hình từ "sites-enabled". Để bật một trang web, tạo symlink từ "sites-available" sang "sites-enabled". Để tắt, xóa symlink đó mà không xóa file cấu hình gốc.

File mặc định nằm ở "/var/www/html/" với file "index.nginx-debian.html".

### 5.4. Cấu trúc file cấu hình trang web

Ví dụ cấu hình cơ bản cho trang frontend:

```
server {
    listen 80;
    listen [::]:80;

    root /var/www/blog;
    index index.html;

    server_name _;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Giải thích:

- "listen 80": lắng nghe cổng 80 (HTTP mặc định)
- "root": đường dẫn đến thư mục chứa file tĩnh
- "index": thứ tự file index sẽ tự động tải
- "server*name *": dấu gạch dưới nghĩa là khớp với tất cả tên miền/IP
- "location /": cấu hình cho đường dẫn gốc; "try_files" thử tìm file, không có thì trả 404

### 5.5. Deploy ứng dụng React lên Nginx

Build dự án React ra file tĩnh:

```
npm run build
```

Sẽ tạo ra thư mục "dist/" chứa các file HTML, CSS, JS tĩnh đã được tối ưu (không dùng dev server).

Di chuyển thư mục build vào Nginx:

```
sudo mv dist /var/www/blog
```

Tạo file cấu hình trong "sites-available":

```
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/blog
sudo vim /etc/nginx/sites-available/blog
```

Tạo symlink để bật trang:

```
sudo ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/blog
```

Kiểm tra cấu hình trước khi reload (rất quan trọng, cấu hình sai sẽ dẫn đến sập server):

```
sudo nginx -t
```

Reload Nginx để áp dụng cấu hình mới:

```
sudo nginx -s reload
```

Sau bước này, trang web đã truy cập được qua địa chỉ IP của server qua cổng 80.

### 5.6. Kiểm tra cổng đang lắng nghe

Kiểm tra các cổng server đang lắng nghe:

```
ss -tlnp
```

Kết nối HTTP bằng lệnh trong terminal:

```
curl http://127.0.0.1
curl http://IP_server
```

### 5.7. Các bước tiếp theo

Sau khi có trang web chạy được qua IP, các bước tiếp theo gồm:

- Mua và trỏ tên miền về IP server
- Cấu hình chứng chỉ HTTPS, tự động gia hạn khi hết hạn
- Sử dụng Cloudflare để ẩn IP thật của server, bảo vệ khỏi tấn công DDoS
- Cấu hình Nginx làm Reverse Proxy để deploy ứng dụng Node.js backend (chạy ở cổng 3000 hoặc bất kỳ cổng nào), sau đó Nginx chuyển tiếp request từ cổng 80 vào cổng nội bộ đó
