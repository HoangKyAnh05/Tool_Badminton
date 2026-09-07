# 🏸 BADMINTON PRO - REACTION & TACTICAL TRAINING SYSTEM

Ứng dụng huấn luyện phản xạ 9 ô, bộ pháp footwork, kỹ thuật vung vợt và lý thuyết chiến thuật cầu lông chuyên nghiệp. 
Được xây dựng với kiến trúc kép: **Desktop App (Electron)** và **Web App (Vite + React + TypeScript)**.

---

## 🌟 TÍNH NĂNG NỔI BẬT

1. **Hệ thống Lưới Phản Xạ 9 Ô (3×3)**
   - Mô phỏng chính xác 9 khu vực chiến lược trên nửa sân thi đấu:
     - Hàng 1 (Lưới): Ô 1 (Lưới trái) | Ô 2 (Lưới giữa / chữ T) | Ô 3 (Lưới phải)
     - Hàng 2 (Trung tâm): Ô 4 (Ngang trái) | Ô 5 (Tâm sân / Base) | Ô 6 (Ngang phải)
     - Hàng 3 (Đáy sân): Ô 7 (Đáy trái / Round-the-head) | Ô 8 (Đáy giữa) | Ô 9 (Đáy phải / Phông smash)
   - Mục tiêu tròn trung tâm với hiệu ứng vòng tròn xung lực phát sáng (Pulse ring) ngay khi vị trí kích hoạt.

2. **5 Chế Độ Tập Luyện**
   - ✋ **TAY**: Rèn phản xạ thân trên và vung vợt (chặt lưới, vồ cầu, tạt ngang, thủ đập, bung cầu...).
   - 🦶 **CHÂN**: Rèn luyện footwork (split-step bật nhảy, lunge lên lưới, di chuyển chéo lùi, scissor kick...).
   - ⚡ **TAY + CHÂN**: Phối hợp toàn diện giữa bước chạm đất và thời điểm vợt tiếp xúc cầu.
   - 🧠 **LÝ THUYẾT**: Hệ thống câu hỏi trắc nghiệm chiến thuật 4 phương án (A, B, C, D) với giải thích cặn kẽ và phân tích chuyên môn của HLV.
   - 🌐 **TOÀN BỘ**: Chế độ thử thách tối thượng, hệ thống tự động trộn ngẫu nhiên liên tục giữa cả 4 nội dung trên theo thứ tự không lặp lại.

3. **Giao Diện Hiển Thị Phóng To Trực Diện**
   - Khi bước vào hành động, hệ thống tự động làm mờ sân và kích hoạt **Overlay Trung Tâm Cỡ Lớn**.
   - Hình ảnh sơ đồ động tác rõ nét, tỷ lệ chuẩn, kèm đồng hồ đếm ngược cỡ lớn và mẹo huấn luyện viên, người tập đứng cách xa màn hình 2–4 mét vẫn quan sát cực kỳ rõ ràng.

4. **Đồng Hồ Đếm Ngược Chuẩn Xác & Cài Đặt Tốc Độ**
   - Chu kỳ: **Chuẩn bị (3-2-1-GO!)** ➔ **Hành động (Action)** ➔ **Nghỉ hồi phục (Rest)**.
   - 6 mức tốc độ: *Rất chậm (3.0s), Chậm (2.0s), Bình thường (1.5s), Nhanh (1.0s), Rất nhanh (0.5s), Tùy chỉnh (0.4s - 4.0s)*.
   - Số lượt tập linh hoạt: *10, 20, 30, 50, 100 lượt*.

5. **Hệ Thống Âm Thanh Tổng Hợp Web Audio**
   - Tích hợp sẵn âm thanh còi xuất phát, beep đếm nhịp 3-2-1, âm báo đúng/sai và nhạc chiến thắng hoàn toàn ngoại tuyến không cần tải file ngoài.

6. **Tích Hợp Camera Soi Dáng (Webcam)**
   - Truy cập webcam qua chuẩn `navigator.mediaDevices.getUserMedia()`.
   - Cửa sổ PiP góc dưới có thể thu nhỏ/phóng to để VĐV vừa nhìn bài tập vừa tự soi form di chuyển của mình.

7. **Bảng Kết Quả & Lịch Sử Tập Luyện**
   - Thống kê tỷ lệ chính xác (%), phản xạ nhanh nhất, tốc độ trung bình, phân bổ từng chế độ.
   - Lưu trữ tự động vào `localStorage` kèm xem lại lịch sử các buổi tập.

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY NHANH

### Cách 1: Chạy bằng file .bat (Khuyên dùng trên Windows)
- Nhấp đúp vào file **`run.bat`** trong thư mục dự án. File sẽ tự động kiểm tra thư viện và mở ứng dụng Desktop Electron.

### Cách 2: Tạo lối tắt ngoài Desktop
- Nhấp đúp vào file **`create_shortcut.bat`**. Ứng dụng sẽ tự động tạo một biểu tượng lối tắt **`Badminton Pro Trainer`** trên màn hình Desktop của bạn với icon cầu lông chuyên nghiệp.

### Cách 3: Chạy bằng dòng lệnh (Terminal)
```bash
# Cài đặt thư viện
npm install

# Chạy bản Web (trình duyệt)
npm run dev

# Chạy bản Desktop Electron
npm run electron:dev

# Kiểm tra build sản phẩm
npm run build
```

### Cách 4: Đóng gói thành file cài đặt Windows (.exe)
- **1-Click**: Nhấp đúp vào file **`build_exe.bat`** để hệ thống tự động biên dịch và tạo ra bộ cài Windows.
- **File đầu ra** sẽ được lưu trong thư mục `release/`:
  - `Badminton Pro Trainer Setup 1.0.0.exe`: Bộ cài đặt Windows chính thức, tự tạo shortcut màn hình Desktop và Start Menu.
  - `Badminton Pro Trainer-Portable-1.0.0.exe`: Phiên bản di động, copy vào USB hoặc máy khác mở lên chạy ngay không cần cài đặt.
- **Hoặc bằng lệnh**:
  ```bash
  # Đóng gói cả bản Installer và Portable
  npm run electron:build
  
  # Chỉ đóng gói bản Portable
  npm run electron:portable
  ```

---

## 🔄 ĐỒNG BỘ MÃ NGUỒN VỚI GITHUB

Để đẩy mã nguồn lên kho lưu trữ GitHub `https://github.com/trongtinozzzz-stack/Tool_Badminton.git`:
- Chỉ cần nhấp đúp vào file **`git_push.bat`**.
- Nhập ghi chú commit hoặc nhấn Enter để tự động đẩy lên nhánh `main`.

---

## 🛠️ CẤU TRÚC THƯ MỤC DỰ ÁN

```
Tool_badminton/
├── electron/
│   ├── main.cjs            # Electron main process (quản lý cửa sổ & quyền camera)
│   └── preload.cjs         # Preload an toàn
├── public/
│   ├── icon.ico            # Icon cho Windows & desktop shortcut
│   ├── icon.png            # Icon cho Electron
│   └── icon.svg            # Vector icon gốc
├── src/
│   ├── components/
│   │   ├── Arena/          # Lưới 9 ô, Overlay phóng to động tác, Sơ đồ di chuyển
│   │   ├── Camera/         # Khung xem trước Webcam PiP
│   │   ├── History/        # Xem lại lịch sử các buổi tập
│   │   ├── Home/           # Màn hình Dashboard chào mừng & chọn chế độ
│   │   ├── Navbar/         # Thanh công cụ thể thao, bật/tắt âm thanh
│   │   ├── Results/        # Bảng tổng kết kết quả & kỷ lục
│   │   ├── Setup/          # Màn hình cấu hình thông số phòng tập
│   │   └── Theory/         # Bộ câu hỏi trắc nghiệm A/B/C/D
│   ├── data/
│   │   ├── movements.ts    # Dữ liệu 9 vị trí (Tay, Chân, Phối hợp, Mẹo HLV)
│   │   └── questions.ts    # Ngân hàng 20+ câu hỏi chiến thuật & giải thích
│   ├── hooks/
│   │   ├── useCamera.ts    # Quản lý webcam và xử lý quyền thiết bị
│   │   ├── useSound.ts     # Bộ tổng hợp âm thanh Web Audio API
│   │   └── useTraining.ts  # Cỗ máy trạng thái (State Machine) quản lý phiên tập
│   ├── services/
│   │   ├── randomizer.ts   # Thuật toán ngẫu nhiên thông minh không lặp liên tiếp
│   │   └── storage.ts      # Lưu trữ cấu hình và lịch sử
│   ├── types/
│   │   └── index.ts        # Định nghĩa kiểu dữ liệu TypeScript
│   ├── App.tsx             # Điều phối chính các màn hình
│   ├── index.css           # Hệ thống giao diện thể thao phong cách Dark Mode
│   └── main.tsx            # Điểm bắt đầu React
├── create_shortcut.bat     # Tạo shortcut ra màn hình Desktop
├── git_push.bat            # Đẩy mã nguồn lên GitHub tự động
├── run.bat                 # Khởi động ứng dụng Desktop nhanh
├── package.json
└── vite.config.ts
```

---

## ✍️ CÁCH THÊM ĐỘNG TÁC HOẶC CÂU HỎI MỚI

### 1. Thêm/Sửa động tác 9 ô:
Mở file `src/data/movements.ts`. Mỗi vị trí trong mảng `BADMINTON_POSITIONS` hỗ trợ:
```typescript
{
  id: 1, // từ 1 đến 9
  name: "Tên vị trí",
  zoneName: "LƯỚI TRÁI",
  handMovement: {
    title: "Tên kỹ thuật tay",
    subTitle: "Mô tả ngắn",
    description: "Chi tiết",
    coachingTip: "Mẹo của HLV",
    imageUrl: "/duong-dan-anh.jpg" // (Tùy chọn: dùng ảnh tùy chỉnh hoặc vector tự động)
  },
  footMovement: { ... },
  combinedMovement: { ... }
}
```

### 2. Thêm câu hỏi lý thuyết chiến thuật:
Mở file `src/data/questions.ts` và thêm vào mảng `BADMINTON_QUESTIONS`:
```typescript
{
  id: 16,
  category: "Chiến thuật", // hoặc 'Phòng thủ', 'Đánh đơn', 'Đánh đôi', v.v.
  difficulty: "Trung bình",
  question: "Nội dung câu hỏi tình huống?",
  options: [
    { id: "A", text: "Phương án A" },
    { id: "B", text: "Phương án B" },
    { id: "C", text: "Phương án C" },
    { id: "D", text: "Phương án D" }
  ],
  correctAnswer: "B",
  explanation: "Giải thích lý do chuyên môn...",
  contextTip: "Gợi ý thêm nếu có"
}
```
