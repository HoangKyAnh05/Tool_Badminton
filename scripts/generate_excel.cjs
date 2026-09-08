const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const workbook = XLSX.utils.book_new();

// =========================================================================
// SHEET 1: TỔNG QUAN HỆ THỐNG
// =========================================================================
const sheet1Data = [
  ["HỆ THỐNG HUẤN LUYỆN PHẢN XẠ & KỸ CHIẾN THUẬT CẦU LÔNG CHUYÊN NGHIỆP", "", ""],
  ["Tên ứng dụng", "Badminton Pro Trainer (Hệ thống Luyện Phản Xạ & Chiến Thuật Cầu Lông)", ""],
  ["Phiên bản", "v2.0.0 (Cập nhật 2026)", ""],
  ["Nền tảng hỗ trợ", "Web Trực Tuyến (Render.com) & Desktop App (.exe Portable/Cài đặt)", ""],
  ["Đối tượng sử dụng", "Vận động viên, Huấn luyện viên, Người chơi phong trào, Học viên các CLB", ""],
  ["Mục tiêu cốt lõi", "Chuẩn hóa bộ pháp (footwork), tốc độ phản xạ tay/mắt, tư duy đọc cầu và chiến thuật thực chiến", ""],
  ["", "", ""],
  ["CÁC ĐIỂM NỔI BẬT & ĐỘT PHÁ CỦA ỨNG DỤNG", "CHI TIẾT TÍNH NĂNG", "GIÁ TRỊ MANG LẠI"],
  [
    "1. Huấn luyện đa chế độ (5 Modes)",
    "Hỗ trợ 5 chế độ: Chỉ Tay, Chỉ Chân, Phối hợp Tay + Chân, Lý thuyết chiến thuật, Toàn bộ tổng hợp.",
    "Giúp người tập rèn luyện toàn diện từ tư duy, phản xạ cơ bắp đến bộ pháp di chuyển."
  ],
  [
    "2. Bản đồ 9 Ô Sân & 27 Kỹ thuật thực chiến",
    "Mô phỏng chính xác 9 vùng sân thi đấu thực tế (Lưới, Trung sân, Cuối sân) với 27 biến thể đánh đỉnh cao.",
    "Học viên hình dung rõ nét góc đánh, tư thế mở vợt, bộ pháp chân lunge và điểm tiếp xúc cầu."
  ],
  [
    "3. Đo phản xạ mili-giây & Chấm điểm tự động",
    "Hệ thống tự động tính toán thời gian phản xạ (giây/mili-giây), độ chính xác, tỷ lệ hoàn thành hiệp.",
    "Theo dõi sự tiến bộ hàng ngày một cách khoa học bằng số liệu chuẩn xác."
  ],
  [
    "4. Kho Video Giáo Trình Chiến Thuật 4 Mục",
    "Phân chia rõ ràng: Đơn Nam, Đôi Nam, Đơn Nữ, Đôi Nữ. Tích hợp công nghệ chống tua video và tự động tích xanh.",
    "Học viên bắt buộc phải theo dõi nghiêm túc từng bài giảng để nắm chắc nguyên tắc thi đấu."
  ],
  [
    "5. Tính năng Gắn Link Video Không Giới Hạn",
    "Cho phép người dùng hoặc HLV tự dán link YouTube, YouTube Shorts hoặc MP4 online vào bất kỳ chuyên mục nào.",
    "Không lo nặng dung lượng máy, mở rộng bài tập vô tận theo giáo án riêng của từng CLB."
  ],
  [
    "6. Thử Thách 100 Ngày (100-Day Challenge)",
    "Lộ trình 100 ngày tập luyện bài bản từ Cơ bản, Trung cấp, Nâng cao đến Master.",
    "Duy trì chuỗi ngày tập luyện (Streak), tạo thói quen kỷ luật thể thao mỗi ngày."
  ],
  [
    "7. Tự Quay Video Luyện Tập Qua Webcam",
    "Tích hợp công cụ quay video Full HD, đo thời gian, tùy chọn tốc độ và tự động tải file MP4/WebM về máy.",
    "Học viên tự xem lại động tác của mình hoặc gửi clip cho HLV chấm điểm, sửa lỗi."
  ],
  [
    "8. Tự Động Giao Bài Tập Về Nhà",
    "Sau mỗi buổi tập, hệ thống tự tạo mã bài tập, ngày giao, hạn chót deadline và nhân viên phụ trách.",
    "Giúp công tác huấn luyện tại trung tâm/CLB được chuyên nghiệp và quản lý chặt chẽ."
  ]
];
const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);
ws1['!cols'] = [{ wch: 35 }, { wch: 65 }, { wch: 55 }];
XLSX.utils.book_append_sheet(workbook, ws1, "1_Tong_Quan");

// =========================================================================
// SHEET 2: 5 CHẾ ĐỘ TẬP LUYỆN
// =========================================================================
const sheet2Data = [
  ["CHI TIẾT 5 CHẾ ĐỘ HUẤN LUYỆN TRONG BADMINTON PRO TRAINER", "", "", "", ""],
  ["STT", "Chế Độ Tập", "Mục Tiêu Huấn Luyện", "Quy Trình Hoạt Động Trên Màn Hình", "Tham Số Tùy Chỉnh Có Sẵn"],
  [
    "1",
    "PHẢN XẠ TAY (✋)",
    "Rèn tốc độ vung vợt, độ gập cổ tay, phản xạ xoay chuyển mặt vợt thuận/trái tay.",
    "Màn hình kích hoạt ngẫu nhiên 1 trong 9 vị trí kèm hình ảnh thị phạm góc vợt, yêu cầu vung vợt dứt khoát theo hiệu lệnh.",
    "Tốc độ (Rất chậm -> Rất nhanh -> Vô hạn), Thời gian giữ động tác (1s - 10s), Âm thanh đếm nhịp."
  ],
  [
    "2",
    "FOOTWORK BỘ PHÁP CHÂN (🦶)",
    "Rèn các bước di chuyển: Lunge gối 90°, trượt ngang chassé, bước đệm, bật nhảy cắt kéo scissor kick.",
    "Chỉ thị ô mục tiêu và sơ đồ vector hướng chạy từ tâm sân số 5 phóng tới góc, yêu cầu hoàn thành bước chân trước khi hết giờ.",
    "Số hiệp (5 - 50 hiệp), Thời gian chuẩn bị countdown (3s - 10s), Thời gian nghỉ giữa hiệp (1s - 5s)."
  ],
  [
    "3",
    "PHỐI HỢP TAY & CHÂN (⚡)",
    "Đồng bộ hóa toàn bộ cơ thể: Chân tới điểm rơi đúng lúc tay chạm cầu ở điểm cao nhất.",
    "Kết hợp đồng thời chỉ dẫn chân lunge/chassé và kỹ thuật vợt miết/gõ/đập cắm sàn. Thử thách sức bền và phản xạ đỉnh cao.",
    "Bật/Tắt Camera tự động nhận diện vùng sân, đếm nhịp bằng giọng nói tiếng Việt."
  ],
  [
    "4",
    "LÝ THUYẾT CHIẾN THUẬT (🧠)",
    "Nâng cao tư duy đọc tình huống: chọn đường đánh tối ưu khi bị ép góc, cách di chuyển bọc lót.",
    "Xuất hiện câu hỏi trắc nghiệm thực chiến (A, B, C, D) có đồng hồ đếm ngược. Chấm điểm tức thì kèm lời giải thích chiến thuật từ HLV.",
    "Bộ ngân hàng câu hỏi phân theo độ khó (Cơ bản, Trung bình, Nâng cao), chủ đề Đơn/Đôi/Phòng thủ/Tấn công."
  ],
  [
    "5",
    "TOÀN BỘ TỔNG HỢP (🌟)",
    "Mô phỏng một trận đấu cầu lông thực tế: Đan xen ngẫu nhiên giữa Tay, Chân, Phối hợp và Câu hỏi lý thuyết.",
    "Tạo áp lực tâm lý và phản xạ đa chiều giống hệt như đang thi đấu set 3 căng thẳng trên sân cầu.",
    "Tự động tổng kết biểu đồ phân bổ tỷ lệ các hiệp, phản xạ trung bình và lưu bảng thành tích lịch sử."
  ]
];
const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);
ws2['!cols'] = [{ wch: 6 }, { wch: 26 }, { wch: 45 }, { wch: 60 }, { wch: 50 }];
XLSX.utils.book_append_sheet(workbook, ws2, "2_Che_Do_Tap");

// =========================================================================
// SHEET 3: 9 VỊ TRÍ SÂN & 27 BIẾN THỂ KỸ THUẬT
// =========================================================================
const sheet3Data = [
  ["DANH MỤC 9 VỊ TRÍ SÂN VÀ 27 BIẾN THỂ KỸ THUẬT CƠ SINH HỌC", "", "", "", "", "", ""],
  ["Vị Trí Ô", "Tên Vùng Sân", "Khu Vực", "Tên Kỹ Thuật Biến Thể", "Kỹ Thuật Vợt / Cổ Tay", "Bộ Pháp Chân (Footwork)", "Trọng Tâm Huấn Luyện"],
  ["Ô 1", "Góc Lưới Trái", "Lưới trước bên trái", "1. Gài Lưới Trái Tay (Net Spin/Slice)", "Mặt vợt nghiêng 45°, miết nhẹ đầu quả cầu", "Lunge chân phải chùng sâu, gót chạm trước", "Cổ tay thả lỏng, điểm rơi bóng sát mép lưới đối thủ"],
  ["Ô 1", "Góc Lưới Trái", "Lưới trước bên trái", "2. Vồ Cầu / Chụp Lưới (Net Kill)", "Gõ cắm cổ tay cực nhanh, biên độ ngắn", "Bứt tốc chân phải lao thẳng lên đỉnh lưới", "Không để chạm lưới (Net fault), đón bóng trên cao"],
  ["Ô 1", "Góc Lưới Trái", "Lưới trước bên trái", "3. Hất Cầu Bổng Sâu (Cross Net Lift)", "Mở mặt vợt 60°, bung lực cẳng tay lên cao", "Lunge thấp cứu cầu sát sàn rồi bật lùi", "Đổi hướng chéo sang góc 9 đối phương để thoát ép"],
  ["Ô 2", "Lưới Giữa (Chữ T)", "Lưới trước trung tâm", "1. Đè Lưới Dứt Điểm (T-Tap Kill)", "Úp mặt vợt gõ cắm thẳng xuống đất", "Bước đệm ngắn bật nhanh tới chữ T", "Dùng lực ngón tay giật dứt điểm chớp nhoáng"],
  ["Ô 2", "Lưới Giữa (Chữ T)", "Lưới trước trung tâm", "2. Bỏ Nhỏ Ngay Chữ T (Straight Net Drop)", "Cổ tay thả lỏng nâng nhẹ đầu quả cầu", "Bước lướt êm, hãm quán tính bằng gối", "Cầu lộn nhào qua lưới khiến đối thủ khó bung sâu"],
  ["Ô 2", "Lưới Giữa (Chữ T)", "Lưới trước trung tâm", "3. Hất Cầu Thẳng Sâu (Straight Net Lift)", "Bung cẳng tay ngửa vợt đẩy bóng vọt cao", "Dậm chân phải lấy trụ bung người lên", "Ép người công của đối thủ phải lùi sâu phòng ngự"],
  ["Ô 3", "Góc Lưới Phải", "Lưới trước bên phải", "1. Gài Lưới Thuận Tay (Forehand Net Slice)", "Cắt chéo đáy cầu bằng mặt vợt thuận", "Lunge chân phải hướng 2h, lưng thẳng", "Tạo độ xoáy cho quả cầu rơi chìm sát vạch"],
  ["Ô 3", "Góc Lưới Phải", "Lưới trước bên phải", "2. Vồ Lưới Thuận Tay (Forehand Net Kill)", "Đón cầu đỉnh mép lưới, gõ cắm sàn", "Lao nhanh vươn dài cánh tay thuận", "Thu vợt lại ngay trước ngực sau khi đập"],
  ["Ô 3", "Góc Lưới Phải", "Lưới trước bên phải", "3. Hất Cầu Chéo Góc (Forehand Cross Lift)", "Vung vợt từ dưới lên chéo qua vai trái", "Hạ thấp vai cứu cầu rơi sâu", "Hất bổng sang góc 7 đối phương đảo ngược thế trận"],
  ["Ô 4", "Trung Tâm Trái", "Ngang biên trái", "1. Phản Tạt Trái Tay (Backhand Flat Drive)", "Đón cầu ngang hông, ngón cái tì cạnh vát", "Trượt ngang chassé dậm chân phải", "Đè cầu phẳng ngang mép lưới tước quyền tấn công"],
  ["Ô 4", "Trung Tâm Trái", "Ngang biên trái", "2. Thủ Ve Trái Tay Đẩy Sâu (Backhand Defense)", "Hạ thấp trọng tâm, bung lực cẳng tay", "Đứng tấn thấp hai chân rộng bằng vai", "Cứu cú smash cắm sàn đẩy sâu về đáy sân đối thủ"],
  ["Ô 4", "Trung Tâm Trái", "Ngang biên trái", "3. Chặn Cầu Nhỏ Lưới (Backhand Soft Block)", "Thả lỏng cổ tay hãm lực cú đập cực mạnh", "Chùng gối đón bóng ngay trước sườn", "Quả cầu rơi ngay sau lưới triệt tiêu sức tấn công"],
  ["Ô 5", "Tâm Sân (Base Ready)", "Trung tâm sân đấu", "1. Nhún Bật Split-Step Đàn Hồi", "Giơ vợt trước ngực sẵn sàng cả công lẫn thủ", "Bật nhẹ tách hai chân tiếp đất bằng mũi", "Tạo năng lượng lò xo bứt tốc tới bất kỳ 8 góc còn lại"],
  ["Ô 5", "Tâm Sân (Base Ready)", "Trung tâm sân đấu", "2. Đọc Hướng & Đổi Nhịp (Read & React)", "Xoay mặt vợt linh hoạt đón nhịp phản xạ", "Nhấp chân chuyển trọng tâm theo hướng đánh", "Mắt quan sát điểm chạm cầu của đối phương"],
  ["Ô 5", "Tâm Sân (Base Ready)", "Trung tâm sân đấu", "3. Khóa Lưới Trung Tâm (Midcourt Push)", "Đẩy cầu nhanh vào khoảng trống sườn đối thủ", "Bước đệm nửa bước đón cầu trên ngực", "Không cho đối thủ cơ hội nâng cầu cao"],
  ["Ô 6", "Trung Tâm Phải", "Ngang biên phải", "1. Phản Tạt Thuận Tay (Forehand Flat Drive)", "Đón cầu ngang ngực/hông, vung đè phẳng", "Bước mở chân phải rộng sang biên phải", "Bạt bóng xuyên qua nách đối phương"],
  ["Ô 6", "Trung Tâm Phải", "Ngang biên phải", "2. Thủ Cầu Thuận Tay Đẩy Sâu (Forehand Defense)", "Ngửa mặt vợt đón cú smash nách phải", "Hạ trọng tâm dồn lực chân phải", "Đẩy bóng bổng vọt cao về góc 7 phía sau"],
  ["Ô 6", "Trung Tâm Phải", "Ngang biên phải", "3. Gài Cầu Chéo Góc (Forehand Cross Block)", "Gập cổ tay đổi hướng bay chéo sân", "Trụ vững chân phải hãm quán tính", "Bắt đối thủ phải di chuyển quãng đường dài nhất"],
  ["Ô 7", "Đáy Sân Trái", "Cuối sân góc trái", "1. Ve Cầu Trái Tay Cuối Sân (Backhand Clear)", "Xoay lưng về lưới, bung lực xoay cẳng tay", "Bước lùi chassé 2 nhịp dậm chân phải", "Cú đánh kỹ thuật khó nhất: đẩy bóng sâu về đáy"],
  ["Ô 7", "Đáy Sân Trái", "Cuối sân góc trái", "2. Vòng Đầu Đập Cầu (Round-the-Head Smash)", "Vung tay thuận uốn cong qua đầu sang trái", "Bật nhảy kiễng gót xoay vai trên không", "Smash bất ngờ từ góc trái bằng tay thuận"],
  ["Ô 7", "Đáy Sân Trái", "Cuối sân góc trái", "3. Chém Cầu Rơi Chéo Sân (Overhead Slice Drop)", "Giả động tác phông sâu rồi miết xiên mặt vợt", "Lùi chân đón cầu trên đỉnh đầu", "Cầu rơi cắm sát mép biên lưới đối diện đánh lừa"],
  ["Ô 8", "Đáy Sân Giữa", "Cuối sân trung tâm", "1. Phông Cầu Cao Sâu (Overhead Clear)", "Vung trọn cánh tay từ sau ra trước qua đầu", "Lùi 2 bước đón bóng phía trước trán", "Đưa cầu đi cao và sát vạch cuối sân ép đối thủ"],
  ["Ô 8", "Đáy Sân Giữa", "Cuối sân trung tâm", "2. Chém Cầu Bạt Cạnh Sân (Fast Drop Shot)", "Cắt xiên góc mặt vợt giảm lực tiếp xúc", "Kiễng gót bật nhẹ dồn trọng tâm tới", "Cầu bay nhanh rơi cắm góc chữ T hoặc mép biên"],
  ["Ô 8", "Đáy Sân Giữa", "Cuối sân trung tâm", "3. Bật Đập Cầu Trung Tâm (Straight Power Smash)", "Gập bụng dồn lực cơ liên sườn và cánh tay", "Bật nhảy hai chân đón bóng đỉnh cao nhất", "Cú đập sấm sét cắm thẳng giữa hai người đối thủ"],
  ["Ô 9", "Đáy Sân Phải", "Cuối sân góc phải", "1. Bật Nhảy Đập Cầu Cắt Kéo (Jump Smash)", "Chân phải tạo đà bật cao, hoán đổi chân trên không", "Scissor-kick bật nhảy hai chân rời sàn", "Cú đánh uy lực nhất trong cầu lông hiện đại"],
  ["Ô 9", "Đáy Sân Phải", "Cuối sân góc phải", "2. Phông Cầu Thuận Tay Đáy Sân (Forehand Clear)", "Mở rộng lồng ngực xoay vai đẩy cầu", "Bước lùi chassé đón cầu đúng điểm rơi", "Thoát thế ép cuối sân, hồi về tâm số 5"],
  ["Ô 9", "Đáy Sân Phải", "Cuối sân góc phải", "3. Chém Cầu Bạt Góc Sâu (Forehand Slice Drop)", "Miết mặt vợt cắt chéo đầu quả cầu", "Chùng gối chân phải lấy đà phóng tới", "Bắt đối thủ phải lao hết tốc lực cứu cầu lưới"]
];
const ws3 = XLSX.utils.aoa_to_sheet(sheet3Data);
ws3['!cols'] = [{ wch: 10 }, { wch: 22 }, { wch: 22 }, { wch: 42 }, { wch: 45 }, { wch: 45 }, { wch: 55 }];
XLSX.utils.book_append_sheet(workbook, ws3, "3_9_Vi_Tri_27_Ky_Thuat");

// =========================================================================
// SHEET 4: KHO VIDEO THỰC CHIẾN & QUẢN LÝ LINK
// =========================================================================
const sheet4Data = [
  ["KHO VIDEO GIÁO TRÌNH CHIẾN THUẬT & TÍNH NĂNG GẮN LINK VIDEO", "", "", "", "", ""],
  ["STT", "Chuyên Mục", "Tên Bài Học Kỹ Thuật", "Mô Tả Trọng Điểm Huấn Luyện", "Tập Tin Video Thực Tế / Nguồn", "Tính Năng Hỗ Trợ Độc Quyền"],
  [
    "01",
    "ĐƠN NAM",
    "Kỹ Thuật Đọc Hướng & Di Chuyển 4 Góc Sân",
    "Phân tích cách VĐV đơn nam bao quát sân 13.4m, nhịp bật bước chéo đón cầu và thu chân hồi tâm sân.",
    "snaptik.vn_7465697345355713799.mp4",
    "Chống tua nhanh (Anti-seek), Tự động tích xanh khi xem xong, Quay chậm 0.5x"
  ],
  [
    "02",
    "ĐƠN NAM",
    "Chiến Thuật Ép Cầu Hai Góc Cuối Sân",
    "Kỹ năng phông bổng sâu, ép đối thủ xoay lưng và mở góc sân trống để tung đòn dứt điểm.",
    "snaptik.vn_7476759285720993040.mp4",
    "Chống tua nhanh, Lưu tiến độ học tập vào LocalStorage, Xem toàn màn hình"
  ],
  [
    "03",
    "ĐƠN NAM",
    "Phản Xạ Bỏ Nhỏ Sát Lưới & Kéo Lưới Đổi Hướng",
    "Kỹ thuật tay thả lỏng trước khi chạm cầu, miết nhẹ tạo độ xoáy lộn sát mép lưới đối phương.",
    "snaptik.vn_7501608184688299271.mp4",
    "Chống tua nhanh, Tự động tích xanh, Xem chậm từng nhịp miết mặt vợt"
  ],
  [
    "04",
    "ĐƠN NAM",
    "Kỹ Thuật Bước Lùi Đón Cầu & Chém Cầu Bạt Góc",
    "Động tác giả smash, giảm lực chém xiên mặt vợt đưa cầu rơi sát mép biên đánh lừa phán đoán.",
    "snaptik.vn_7568145336158440724.mp4",
    "Chống tua nhanh, Nhận diện video MP4 hiển thị trực tiếp khung hình thực tế"
  ],
  [
    "05",
    "ĐƠN NAM",
    "Bật Nhảy Đập Cầu Tấn Công Dứt Điểm (Jump Smash)",
    "Quy trình tích lũy lực từ chân, hông, cơ bụng truyền đến cổ tay đập cầu cắm sàn sấm sét.",
    "snaptik.vn_7631002086502649109.mp4",
    "Chống tua nhanh, Tự động tích xanh, Quay chậm soi kỹ nhịp gập bụng trên không"
  ],
  [
    "06",
    "ĐƠN NAM",
    "Kỹ Năng Thủ Cầu Bung Sâu Đảo Ngược Thế Trận",
    "Cách hạ thấp trọng tâm, ngửa mặt vợt linh hoạt cứu những pha tấn công hiểm hóc sát sườn.",
    "snaptik.vn_7665340734379281682.mp4",
    "Chống tua nhanh, Bật tắt tiếng, Điều khiển tua lại 5s ôn tập"
  ],
  [
    "07",
    "ĐÔI NAM",
    "Chiến Thuật Bọc Lót & Đổi Vị Trí Trong Đôi Nam",
    "Quy tắc chia sân công - thủ, di chuyển xoay tua bọc lót khi đồng đội bị đối phương ép góc sâu.",
    "viesnap.vn_tiktok_7556982998449655047.mp4",
    "Chống tua nhanh, Tự động tích xanh, Kèm hình ảnh thumbnail sắc nét"
  ],
  [
    "08",
    "ĐÔI NAM",
    "Kỹ Năng Đè Lưới & Phản Tạt Ép Góc Đôi Nam",
    "Kỹ thuật giữ lưới chủ động, tạt cầu thấp tước đoạt quyền tấn công, ép đối thủ nâng bổng.",
    "viesnap.vn_tiktok_ZSq6N6mx5.mp4",
    "Chống tua nhanh, Tự động tích xanh, Chế độ xem rạp hát Theater Mode"
  ],
  [
    "09",
    "ĐÔI NAM",
    "Phối Hợp Tấn Công Đập Cầu & Bồi Cầu Dứt Điểm",
    "Quy trình triển khai liên hoàn: người sau đập cầu uy lực tạo đà cho người trước lao vào vồ dứt điểm.",
    "viesnap.vn_tiktok_ZSq6NmtCb.mp4",
    "Chống tua nhanh, Tự động tích xanh, Báo cáo tiến độ khóa học"
  ],
  [
    "10",
    "TÍNH NĂNG MỞ RỘNG",
    "NÚT '➕ GẮN LINK VIDEO MỚI'",
    "Cho phép người dùng hoặc HLV tự dán link YouTube, YouTube Shorts hoặc MP4 online vào 4 chuyên mục.",
    "Hỗ trợ Link YouTube / Shorts / MP4 CDN",
    "KHÔNG GIỚI HẠN SỐ LƯỢNG VIDEO, Không tốn 1MB ổ cứng, lưu trữ bền vững"
  ]
];
const ws4 = XLSX.utils.aoa_to_sheet(sheet4Data);
ws4['!cols'] = [{ wch: 6 }, { wch: 22 }, { wch: 45 }, { wch: 60 }, { wch: 45 }, { wch: 45 }];
XLSX.utils.book_append_sheet(workbook, ws4, "4_Kho_Video_Chien_Thuat");

// =========================================================================
// SHEET 5: THỬ THÁCH 100 NGÀY
// =========================================================================
const sheet5Data = [
  ["GIÁO ÁN LỘ TRÌNH THỬ THÁCH 100 NGÀY CẦU LÔNG (100-DAY BADMINTON CHALLENGE)", "", "", "", ""],
  ["Giai Đoạn", "Số Ngày", "Tên Giai Đoạn", "Nội Dung Giáo Án Trọng Tâm", "Mục Tiêu & Tiêu Chuẩn Đạt Được"],
  [
    "Giai đoạn 1",
    "Ngày 01 -> 15",
    "NỀN TẢNG FOOTWORK CƠ BẢN",
    "Tập trung phản xạ Ô 5 tâm sân, bước lunge gối 90° góc lưới (Ô 1, Ô 3), nhún bật split-step.",
    "Hình thành phản xạ vô điều kiện hồi về tâm sân sau khi đánh; không bị ngã hay chúi người."
  ],
  [
    "Giai đoạn 2",
    "Ngày 16 -> 35",
    "TĂNG TỐC PHẢN TẠT TRUNG SÂN",
    "Luyện phản xạ Ô 4 (Biên trái) và Ô 6 (Biên phải), thủ ve trái tay, tạt phẳng ngang hông.",
    "Tăng tốc độ phản xạ dưới 2.5 giây/hiệp; xử lý mượt các pha cầu đập thẳng nách và sườn."
  ],
  [
    "Giai đoạn 3",
    "Ngày 36 -> 60",
    "BỨT TỐC TẤN CÔNG & LƯỚI",
    "Phối hợp di chuyển Lưới - Đáy sân, kỹ thuật vồ cầu dứt điểm Ô 2, bỏ nhỏ gài xoáy.",
    "Thời gian phản xạ đạt mốc dưới 1.8 giây; di chuyển thanh thoát không tốn sức."
  ],
  [
    "Giai đoạn 4",
    "Ngày 61 -> 85",
    "SỨC BỀN & ĐẬP CẦU SCISSOR KICK",
    "Luyện các bài đáy sân Ô 7, Ô 8, Ô 9. Bật nhảy đập cầu cắt kéo, chém cầu bạt góc lừa hướng.",
    "Duy trì thể lực và độ chuẩn xác trên 85% trong các chuỗi bài tập kéo dài 30 - 50 hiệp."
  ],
  [
    "Giai đoạn 5",
    "Ngày 86 -> 100",
    "MASTER TOÀN DIỆN THỰC CHIẾN",
    "Chế độ Toàn Bộ ngẫu nhiên 9 ô sân tốc độ cao kết hợp câu hỏi chiến thuật đánh đơn và đánh đôi.",
    "Đạt danh hiệu 'Kiện Tướng Cầu Lông' (Badminton Master), phản xạ siêu nhanh dưới 1.2 giây."
  ]
];
const ws5 = XLSX.utils.aoa_to_sheet(sheet5Data);
ws5['!cols'] = [{ wch: 14 }, { wch: 16 }, { wch: 35 }, { wch: 60 }, { wch: 55 }];
XLSX.utils.book_append_sheet(workbook, ws5, "5_Thu_Thach_100_Ngay");

// =========================================================================
// SHEET 6: TÍNH NĂNG BỔ TRỢ & BÁO CÁO
// =========================================================================
const sheet6Data = [
  ["CÁC CÔNG CỤ BỔ TRỢ, GHI HÌNH VÀ BÁO CÁO HUẤN LUYỆN NÂNG CAO", "", ""],
  ["Tên Tính Năng", "Mô Tả Chi Tiết Hoạt Động", "Lợi Ích Thực Tế Cho Học Viên & HLV"],
  [
    "1. Công cụ Tự Ghi Hình Video (Recorder)",
    "Mở camera máy tính, ghi lại toàn bộ buổi tập luyện, có thanh thời gian và tùy chọn tải ngay file MP4/WebM về máy.",
    "Giúp học viên soi lại góc chân, độ mở vai và cách cầm vợt của bản thân để tự sửa lỗi sai."
  ],
  [
    "2. Nhật Ký Lịch Sử Tập Luyện (History)",
    "Tự động lưu trữ 50 buổi tập gần nhất với đầy đủ thông tin: Ngày giờ, Chế độ, Số hiệp, Độ chính xác, Tốc độ trung bình, Tốc độ tốt nhất.",
    "Xem lại quá trình phát triển phong độ theo từng tuần, từng tháng."
  ],
  [
    "3. Thống Kê Trọn Đời (Lifetime Stats)",
    "Tính tổng số buổi đã tập, tổng số hiệp hoàn thành, chuỗi ngày liên tục (Streak) và kỷ lục phản xạ nhanh nhất.",
    "Tạo động lực thi đua, duy trì thói quen tập luyện đều đặn không bỏ cuộc."
  ],
  [
    "4. Tự Động Giao Bài Tập Về Nhà",
    "Ngay khi hoàn thành bài tập, hệ thống xuất thẻ bài tập với Mã buổi tập, Ngày giao, Deadline, Người phụ trách và Yêu cầu quay camera nộp bài.",
    "Chuẩn hóa quy trình dạy học cho các HLV và trung tâm cầu lông chuyên nghiệp."
  ],
  [
    "5. Động cơ Âm Thanh & Đếm Nhịp Giọng Nói",
    "Tích hợp âm thanh đếm ngược 3-2-1, còi hiệu lệnh xuất phát, âm thanh thành công, chúc mừng pháo hoa Confetti.",
    "Tăng cường sự tập trung cao độ và hưng phấn của học viên trong suốt buổi tập."
  ],
  [
    "6. Hỗ Trợ Đa Nền Tảng (Web & Desktop App)",
    "Chạy online mượt mà trên Render.com, đồng thời đóng gói sẵn file chạy Windows .exe không cần cài đặt phức tạp.",
    "Tiện lợi mở trên điện thoại, máy tính bảng, laptop hoặc máy tính để bàn tại sân tập."
  ]
];
const ws6 = XLSX.utils.aoa_to_sheet(sheet6Data);
ws6['!cols'] = [{ wch: 35 }, { wch: 65 }, { wch: 55 }];
XLSX.utils.book_append_sheet(workbook, ws6, "6_Tinh_Nang_Bo_Tro");

// Save to root directory
const targetFile = path.resolve('Gioi_Thieu_Tinh_Nang_Badminton_Pro.xlsx');
XLSX.writeFile(workbook, targetFile);

console.log('Successfully generated Excel file at:', targetFile);
