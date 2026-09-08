const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

async function buildExecutiveReport() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Hệ Thống Huấn Luyện Cầu Lông Badminton Pro';
  workbook.lastModifiedBy = 'Ban Dự Án Công Nghệ Thể Thao';
  workbook.created = new Date();
  workbook.modified = new Date();

  // Common Styles
  const fontFamily = 'Segoe UI';
  const borderThin = {
    top: { style: 'thin', color: { argb: 'CBD5E1' } },
    left: { style: 'thin', color: { argb: 'CBD5E1' } },
    bottom: { style: 'thin', color: { argb: 'CBD5E1' } },
    right: { style: 'thin', color: { argb: 'CBD5E1' } }
  };

  const headerFill = (colorHex) => ({
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: colorHex }
  });

  // =========================================================================
  // SHEET 1: BÁO CÁO TỔNG QUAN (EXECUTIVE SUMMARY)
  // =========================================================================
  const ws1 = workbook.addWorksheet('1. Báo Cáo Tổng Quan', {
    views: [{ showGridLines: true }]
  });

  ws1.columns = [
    { width: 34 },
    { width: 58 },
    { width: 46 }
  ];

  // Title Banner
  ws1.mergeCells('A1:C1');
  const titleCell = ws1.getCell('A1');
  titleCell.value = 'BÁO CÁO TỔNG QUAN HỆ THỐNG BADMINTON PRO TRAINER';
  titleCell.font = { name: fontFamily, size: 16, bold: true, color: { argb: 'FFFFFF' } };
  titleCell.fill = headerFill('0F172A'); // Slate 900
  titleCell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  ws1.getRow(1).height = 42;

  // Subtitle
  ws1.mergeCells('A2:C2');
  const subCell = ws1.getCell('A2');
  subCell.value = 'Tài liệu báo cáo tính năng, kiến trúc huấn luyện & giá trị thực tế trình Ban Lãnh Đạo / Huấn Luyện Viên Trưởng';
  subCell.font = { name: fontFamily, size: 10, italic: true, color: { argb: '94A3B8' } };
  subCell.fill = headerFill('1E293B'); // Slate 800
  subCell.alignment = { vertical: 'middle', horizontal: 'center' };
  ws1.getRow(2).height = 24;

  // Blank row
  ws1.getRow(3).height = 10;

  // Info Block (Meta)
  const metaRows = [
    ['Tên Ứng Dụng:', 'Badminton Pro Trainer (Hệ Thống Phản Xạ & Chiến Thuật Cầu Lông)', 'Trạng Thái: ĐÃ TRIỂN KHAI HOÀN TẤT'],
    ['Phiên Bản:', 'v2.5.0 Chuyên Nghiệp (Cập nhật 2026)', 'Môi Trường: Web Online (Render) & Desktop App (.exe)'],
    ['Người Lập Báo Cáo:', 'Ban Phát Triển Kỹ Thuật & Huấn Luyện Số', 'Ngày Báo Cáo: ' + new Date().toLocaleDateString('vi-VN')],
    ['Mục Tiêu Trọng Tâm:', 'Chuẩn hóa bộ pháp di chuyển 9 ô, tăng tốc phản ứng tay/vợt và nâng cao tư duy đọc cầu thực chiến.', 'Đánh Giá Chung: ĐẠT TIÊU CHUẨN ĐỈNH CAO']
  ];

  metaRows.forEach((r, idx) => {
    const rowNum = 4 + idx;
    const row = ws1.getRow(rowNum);
    row.values = r;
    row.height = 24;

    const cA = ws1.getCell(`A${rowNum}`);
    const cB = ws1.getCell(`B${rowNum}`);
    const cC = ws1.getCell(`C${rowNum}`);

    cA.font = { name: fontFamily, size: 10, bold: true, color: { argb: '1E3A8A' } };
    cA.fill = headerFill('F1F5F9');
    cA.border = borderThin;
    cA.alignment = { vertical: 'middle' };

    cB.font = { name: fontFamily, size: 10, color: { argb: '0F172A' } };
    cB.fill = headerFill('FFFFFF');
    cB.border = borderThin;
    cB.alignment = { vertical: 'middle' };

    cC.font = { name: fontFamily, size: 9, bold: true, color: { argb: '047857' } };
    cC.fill = headerFill('ECFDF5');
    cC.border = borderThin;
    cC.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  // KPI Metric Cards Block
  ws1.getRow(8).height = 12;
  ws1.mergeCells('A9:C9');
  const kpiTitle = ws1.getCell('A9');
  kpiTitle.value = 'CHỈ SỐ QUY MÔ & TÍNH NĂNG CỐT LÕI (KEY METRICS)';
  kpiTitle.font = { name: fontFamily, size: 11, bold: true, color: { argb: 'FFFFFF' } };
  kpiTitle.fill = headerFill('1E3A8A');
  kpiTitle.alignment = { vertical: 'middle', horizontal: 'center' };
  ws1.getRow(9).height = 28;

  const kpiItems = [
    ['5 CHẾ ĐỘ HUẤN LUYỆN TOÀN DIỆN', 'Tay, Chân, Phối Hợp, Lý Thuyết Thực Chiến & Tổng Hợp Trận Đấu', 'Phủ kín 100% nhu cầu tập'],
    ['9 VÙNG SÂN & 27 BIẾN THỂ ĐÁNH', 'Mô phỏng chuẩn cơ sinh học Lưới - Trung Sân - Cuối Sân', 'Hình ảnh mô phỏng trực quan'],
    ['17 VIDEO THỰC TẾ (4 CHUYÊN MỤC)', '6 Đơn Nam + 3 Đôi Nam + 4 Đơn Nữ + 4 Đôi Nữ, chống tua, tự động đổi theo ô sân', '100% Video thực tế'],
    ['LỘ TRÌNH THỬ THÁCH 100 NGÀY', '5 giai đoạn từ Nền tảng, Tăng tốc, Sức bền đến Master Kiện tướng', 'Duy trì kỷ luật tập luyện'],
    ['CÔNG CỤ QUAY VIDEO QUA WEBCAM', 'Tự soi động tác, đo thời gian, tải file MP4/WebM về máy tức thì', 'Tự phân tích & nộp bài HLV'],
    ['TÍNH NĂNG GẮN LINK MỞ RỘNG', 'Tự do gắn link YouTube / Shorts / MP4 online không giới hạn', 'Không tốn dung lượng ổ cứng']
  ];

  kpiItems.forEach((item, idx) => {
    const rowNum = 10 + idx;
    const row = ws1.getRow(rowNum);
    row.values = item;
    row.height = 25;

    const cA = ws1.getCell(`A${rowNum}`);
    const cB = ws1.getCell(`B${rowNum}`);
    const cC = ws1.getCell(`C${rowNum}`);

    cA.font = { name: fontFamily, size: 10, bold: true, color: { argb: '0F172A' } };
    cA.fill = headerFill(idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF');
    cA.border = borderThin;
    cA.alignment = { vertical: 'middle' };

    cB.font = { name: fontFamily, size: 10, color: { argb: '334155' } };
    cB.fill = headerFill(idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF');
    cB.border = borderThin;
    cB.alignment = { vertical: 'middle', wrapText: true };

    cC.font = { name: fontFamily, size: 9, bold: true, color: { argb: '0284C7' } };
    cC.fill = headerFill(idx % 2 === 0 ? 'F0F9FF' : 'FFFFFF');
    cC.border = borderThin;
    cC.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  // Feature Table Header
  const startRowFeat = 17;
  ws1.getRow(startRowFeat - 1).height = 12;
  const hRow = ws1.getRow(startRowFeat);
  hRow.values = ['TÍNH NĂNG NỔI BẬT ĐÃ PHÁT TRIỂN', 'MÔ TẢ CHI TIẾT CÁCH VẬN HÀNH', 'GIÁ TRỊ MANG LẠI CHO NGƯỜI TẬP & HLV'];
  hRow.height = 30;
  for (let c = 1; c <= 3; c++) {
    const cell = hRow.getCell(c);
    cell.font = { name: fontFamily, size: 10, bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = headerFill('047857'); // Emerald 700
    cell.border = borderThin;
    cell.alignment = { vertical: 'middle', horizontal: c === 1 ? 'left' : 'center' };
  }

  const detailedFeatures = [
    [
      '1. Huấn luyện 5 Chế độ chuyên biệt',
      'Lựa chọn linh hoạt: Chỉ Tay (phản xạ vợt), Chỉ Chân (bộ pháp footwork), Phối hợp Tay + Chân, Lý thuyết câu hỏi trắc nghiệm thực chiến, Toàn bộ tổng hợp áp lực trận đấu.',
      'Rèn luyện phản xạ vô điều kiện, học viên biết chính xác khi cầu đến vị trí nào thì chân bước ra sao và tay đón thế nào.'
    ],
    [
      '2. Bản đồ 9 Ô Sân & 27 Biến thể kỹ thuật',
      'Chia sân thành 9 vùng chuẩn quốc tế. Mỗi vùng có 3 biến thể đánh thực chiến từ cứu cầu lưới, ve trái tay, tạt biên đến đập smash cắm sàn.',
      'Xóa bỏ cách tập mơ hồ; học viên hiểu sâu bản chất kỹ thuật, vị trí đặt chân và góc mở mặt vợt.'
    ],
    [
      '3. Đo tốc độ phản xạ & Chấm điểm tự động',
      'Đồng hồ đo mili-giây cực nhạy, tính toán thời gian phản ứng, tỷ lệ chính xác %, tổng kết biểu đồ sau mỗi lượt tập.',
      'HLV và học viên theo dõi được sự tiến bộ rõ rệt theo từng ngày bằng số liệu thống kê khoa học.'
    ],
    [
      '4. Video Thực Chiến Tự Đổi Theo Ô Sân',
      'Mặc định vào phòng tập là Video thực tế. Khi bài tập nhảy sang ô nào (1 đến 9), video tự động đổi đúng bài của ô đó và phát từ đầu.',
      'Trực quan 100%, nhìn thấy VĐV chuyên nghiệp di chuyển và tung đòn đánh mẫu để làm theo ngay lập tức.'
    ],
    [
      '5. Công nghệ Gắn Link Video Không Giới Hạn',
      'Cho phép người dùng hoặc HLV tự dán thêm bất kỳ link YouTube, YouTube Shorts hoặc MP4 trực tuyến vào 4 chuyên mục.',
      'Kho giáo trình mở rộng vô tận theo giáo án riêng của từng CLB mà không gây nặng tải ứng dụng.'
    ],
    [
      '6. Thử Thách 100 Ngày (100-Day Challenge)',
      'Lộ trình 100 ngày bài bản phân thành 5 giai đoạn: Nền tảng -> Tăng tốc -> Lưới -> Sức bền -> Master kiện tướng.',
      'Duy trì chuỗi ngày tập liên tục (Streak), tạo thói quen kỷ luật thể thao mỗi ngày cho học viên.'
    ],
    [
      '7. Tự Ghi Hình Video Qua Camera Máy Tính',
      'Tích hợp công cụ quay video HD ngay trong web, có đếm giờ, tùy chọn camera và tự động lưu file về máy tính.',
      'Học viên tự soi lại góc chân, tư thế vung vợt để sửa lỗi hoặc gửi clip cho HLV nhận xét từ xa.'
    ],
    [
      '8. Tự Động Giao Bài Tập Về Nhà',
      'Sau mỗi buổi tập, hệ thống xuất phiếu giao bài tập gồm: Mã buổi tập, Ngày giao, Hạn deadline, Người phụ trách.',
      'Giúp trung tâm đào tạo cầu lông chuyên nghiệp hóa quy trình quản lý học viên bài bản.'
    ]
  ];

  detailedFeatures.forEach((feat, idx) => {
    const rowNum = startRowFeat + 1 + idx;
    const row = ws1.getRow(rowNum);
    row.values = feat;
    row.height = 42;

    const cA = ws1.getCell(`A${rowNum}`);
    const cB = ws1.getCell(`B${rowNum}`);
    const cC = ws1.getCell(`C${rowNum}`);

    cA.font = { name: fontFamily, size: 10, bold: true, color: { argb: '0F172A' } };
    cA.fill = headerFill(idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF');
    cA.border = borderThin;
    cA.alignment = { vertical: 'middle', wrapText: true };

    cB.font = { name: fontFamily, size: 9.5, color: { argb: '334155' } };
    cB.fill = headerFill(idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF');
    cB.border = borderThin;
    cB.alignment = { vertical: 'middle', wrapText: true };

    cC.font = { name: fontFamily, size: 9.5, color: { argb: '065F46' } };
    cC.fill = headerFill(idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF');
    cC.border = borderThin;
    cC.alignment = { vertical: 'middle', wrapText: true };
  });

  // =========================================================================
  // SHEET 2: 5 CHẾ ĐỘ TẬP LUYỆN
  // =========================================================================
  const ws2 = workbook.addWorksheet('2. 5 Chế Độ Luyện Tập', {
    views: [{ showGridLines: true }]
  });

  ws2.columns = [
    { width: 8 },
    { width: 28 },
    { width: 40 },
    { width: 56 },
    { width: 44 }
  ];

  // Header Title
  ws2.mergeCells('A1:E1');
  const t2 = ws2.getCell('A1');
  t2.value = 'CHI TIẾT 5 CHẾ ĐỘ HUẤN LUYỆN CHUYÊN BIỆT';
  t2.font = { name: fontFamily, size: 14, bold: true, color: { argb: 'FFFFFF' } };
  t2.fill = headerFill('1E3A8A');
  t2.alignment = { vertical: 'middle', horizontal: 'center' };
  ws2.getRow(1).height = 36;

  const hRow2 = ws2.getRow(2);
  hRow2.values = ['STT', 'CHẾ ĐỘ TẬP', 'MỤC TIÊU HUẤN LUYỆN', 'QUY TRÌNH HOẠT ĐỘNG TRỰC QUAN', 'THAM SỐ TÙY CHỈNH HỆ THỐNG'];
  hRow2.height = 28;
  for (let c = 1; c <= 5; c++) {
    const cell = hRow2.getCell(c);
    cell.font = { name: fontFamily, size: 10, bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = headerFill('0284C7'); // Sky 600
    cell.border = borderThin;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  }

  const modesData = [
    [
      '1',
      'PHẢN XẠ TAY (✋)',
      'Rèn tốc độ vung vợt, độ gập cổ tay, phản xạ xoay chuyển mặt vợt thuận/trái tay chớp nhoáng.',
      'Màn hình kích hoạt ngẫu nhiên 1 trong 9 vị trí kèm hình ảnh thị phạm góc vợt, yêu cầu vung vợt dứt khoát theo hiệu lệnh.',
      'Tốc độ (Rất chậm -> Rất nhanh -> Vô hạn), Thời gian giữ động tác (1s - 10s), Âm thanh đếm nhịp.'
    ],
    [
      '2',
      'BỘ PHÁP CHÂN (🦶)',
      'Rèn các bước di chuyển: Lunge gối 90°, trượt ngang chassé, bước đệm, bật nhảy cắt kéo scissor kick.',
      'Chỉ thị ô mục tiêu và sơ đồ vector hướng chạy từ tâm sân số 5 phóng tới góc, yêu cầu hoàn thành bước chân trước khi hết giờ.',
      'Số hiệp (5 - 50 hiệp), Thời gian countdown chuẩn bị (3s - 10s), Thời gian nghỉ giữa hiệp (1s - 5s).'
    ],
    [
      '3',
      'PHỐI HỢP TAY & CHÂN (⚡)',
      'Đồng bộ hóa toàn bộ cơ thể: Chân tới điểm rơi đúng lúc tay chạm cầu ở điểm cao nhất.',
      'Kết hợp đồng thời chỉ dẫn chân lunge/chassé và kỹ thuật vợt miết/gõ/đập cắm sàn. Thử thách sức bền và phản xạ đỉnh cao.',
      'Bật/Tắt Camera tự động nhận diện vùng sân, đếm nhịp bằng giọng nói tiếng Việt.'
    ],
    [
      '4',
      'LÝ THUYẾT CHIẾN THUẬT (🧠)',
      'Nâng cao tư duy đọc tình huống: chọn đường đánh tối ưu khi bị ép góc, cách di chuyển bọc lót trong đánh đơn và đánh đôi.',
      'Xuất hiện câu hỏi trắc nghiệm thực chiến (A, B, C, D) có đồng hồ đếm ngược. Chấm điểm tức thì kèm lời giải thích chiến thuật từ HLV.',
      'Ngân hàng 20+ câu hỏi phân theo độ khó (Cơ bản, Trung bình, Nâng cao), chủ đề Đơn/Đôi/Phòng thủ/Tấn công.'
    ],
    [
      '5',
      'TOÀN BỘ TỔNG HỢP (🌟)',
      'Mô phỏng một trận đấu cầu lông thực tế: Đan xen ngẫu nhiên giữa Tay, Chân, Phối hợp và Câu hỏi lý thuyết.',
      'Tạo áp lực tâm lý và phản xạ đa chiều giống hệt như đang thi đấu set 3 căng thẳng trên sân cầu chuyên nghiệp.',
      'Tự động tổng kết biểu đồ phân bổ tỷ lệ các hiệp, phản xạ trung bình và lưu bảng thành tích lịch sử.'
    ]
  ];

  modesData.forEach((m, idx) => {
    const rowNum = 3 + idx;
    const row = ws2.getRow(rowNum);
    row.values = m;
    row.height = 46;

    for (let c = 1; c <= 5; c++) {
      const cell = row.getCell(c);
      cell.font = { name: fontFamily, size: 9.5, color: { argb: '0F172A' }, bold: c <= 2 };
      cell.fill = headerFill(idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF');
      cell.border = borderThin;
      cell.alignment = { vertical: 'middle', horizontal: c === 1 ? 'center' : 'left', wrapText: true };
    }
  });

  // =========================================================================
  // SHEET 3: 9 Ô SÂN & 27 BIẾN THỂ
  // =========================================================================
  const ws3 = workbook.addWorksheet('3. 9 Ô Sân & 27 Kỹ Thuật', {
    views: [{ showGridLines: true }]
  });

  ws3.columns = [
    { width: 10 },
    { width: 22 },
    { width: 22 },
    { width: 40 },
    { width: 46 },
    { width: 46 },
    { width: 48 }
  ];

  ws3.mergeCells('A1:G1');
  const t3 = ws3.getCell('A1');
  t3.value = 'DANH MỤC CHI TIẾT 9 VỊ TRÍ SÂN VÀ 27 BIẾN THỂ KỸ THUẬT THỰC CHIẾN';
  t3.font = { name: fontFamily, size: 14, bold: true, color: { argb: 'FFFFFF' } };
  t3.fill = headerFill('047857'); // Emerald 700
  t3.alignment = { vertical: 'middle', horizontal: 'center' };
  ws3.getRow(1).height = 36;

  const hRow3 = ws3.getRow(2);
  hRow3.values = ['VỊ TRÍ Ô', 'TÊN VÙNG SÂN', 'KHU VỰC SÂN', 'TÊN KỸ THUẬT BIẾN THỂ', 'KỸ THUẬT TAY / CỔ TAY', 'BỘ PHÁP CHÂN (FOOTWORK)', 'TRỌNG TÂM HUẤN LUYỆN'];
  hRow3.height = 28;
  for (let c = 1; c <= 7; c++) {
    const cell = hRow3.getCell(c);
    cell.font = { name: fontFamily, size: 9.5, bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = headerFill('059669');
    cell.border = borderThin;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  }

  const courtData = [
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

  courtData.forEach((rowVal, idx) => {
    const rowNum = 3 + idx;
    const row = ws3.getRow(rowNum);
    row.values = rowVal;
    row.height = 30;

    for (let c = 1; c <= 7; c++) {
      const cell = row.getCell(c);
      cell.font = { name: fontFamily, size: 9, color: { argb: '0F172A' }, bold: c <= 2 };
      cell.fill = headerFill(idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF');
      cell.border = borderThin;
      cell.alignment = { vertical: 'middle', horizontal: c === 1 ? 'center' : 'left', wrapText: true };
    }
  });

  // =========================================================================
  // SHEET 4: VIDEO THỰC CHIẾN
  // =========================================================================
  const ws4 = workbook.addWorksheet('4. Video Thực Chiến', {
    views: [{ showGridLines: true }]
  });

  ws4.columns = [
    { width: 8 },
    { width: 16 },
    { width: 44 },
    { width: 56 },
    { width: 40 },
    { width: 38 }
  ];

  ws4.mergeCells('A1:F1');
  const t4 = ws4.getCell('A1');
  t4.value = 'DANH MỤC 17 VIDEO THỰC CHIẾN (ĐƠN NAM, ĐÔI NAM, ĐƠN NỮ, ĐÔI NỮ) & CÔNG NGHỆ GẮN LINK';
  t4.font = { name: fontFamily, size: 14, bold: true, color: { argb: 'FFFFFF' } };
  t4.fill = headerFill('4338CA'); // Indigo 700
  t4.alignment = { vertical: 'middle', horizontal: 'center' };
  ws4.getRow(1).height = 36;

  const hRow4 = ws4.getRow(2);
  hRow4.values = ['STT', 'CHUYÊN MỤC', 'TÊN BÀI HỌC THỰC CHIẾN', 'TRỌNG ĐIỂM KỸ THUẬT PHÂN TÍCH', 'TẬP TIN VIDEO THỰC TẾ TRÊN HỆ THỐNG', 'CÔNG NGHỆ BỔ TRỢ'];
  hRow4.height = 28;
  for (let c = 1; c <= 6; c++) {
    const cell = hRow4.getCell(c);
    cell.font = { name: fontFamily, size: 9.5, bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = headerFill('6366F1');
    cell.border = borderThin;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  }

  const videosData = [
    ["01", "ĐƠN NAM", "Kỹ Thuật Đọc Hướng & Di Chuyển 4 Góc Sân", "Phân tích cách VĐV đơn nam bao quát sân 13.4m, nhịp bật bước chéo đón cầu và thu chân hồi tâm sân.", "snaptik.vn_7465697345355713799.mp4", "Chống tua, tự đổi theo Ô 5 tâm sân, quay chậm 0.5x"],
    ["02", "ĐƠN NAM", "Chiến Thuật Ép Cầu Hai Góc Cuối Sân", "Kỹ năng phông bổng sâu, ép đối thủ xoay lưng và mở góc sân trống để tung đòn dứt điểm.", "snaptik.vn_7476759285720993040.mp4", "Chống tua, tự đổi theo Ô 7 đáy trái, toàn màn hình"],
    ["03", "ĐƠN NAM", "Phản Xạ Bỏ Nhỏ Sát Lưới & Kéo Lưới Đổi Hướng", "Kỹ thuật tay thả lỏng trước khi chạm cầu, miết nhẹ tạo độ xoáy lộn sát mép lưới đối phương.", "snaptik.vn_7501608184688299271.mp4", "Chống tua, tự đổi theo Ô 1 lưới trái, tích xanh hoàn thành"],
    ["04", "ĐƠN NAM", "Kỹ Thuật Bước Lùi Đón Cầu & Chém Cầu Bạt Góc", "Động tác giả smash, giảm lực chém xiên mặt vợt đưa cầu rơi sát mép biên đánh lừa phán đoán.", "snaptik.vn_7568145336158440724.mp4", "Chống tua, tự đổi theo Ô 8 đáy giữa, âm thanh chuẩn"],
    ["05", "ĐƠN NAM", "Bật Nhảy Đập Cầu Tấn Công Dứt Điểm (Jump Smash)", "Quy trình tích lũy lực từ chân, hông, cơ bụng truyền đến cổ tay đập cầu cắm sàn sấm sét.", "snaptik.vn_7631002086502649109.mp4", "Chống tua, tự đổi theo Ô 9 đáy phải, soi nhịp gập bụng"],
    ["06", "ĐƠN NAM", "Kỹ Năng Thủ Cầu Bung Sâu Đảo Ngược Thế Trận", "Cách hạ thấp trọng tâm, ngửa mặt vợt linh hoạt cứu những pha tấn công hiểm hóc sát sườn.", "snaptik.vn_7665340734379281682.mp4", "Chống tua, tự đổi theo Ô 4 trung tâm trái, tua lại 5s"],
    ["07", "ĐÔI NAM", "Chiến Thuật Bọc Lót & Đổi Vị Trí Trong Đôi Nam", "Quy tắc chia sân công - thủ, di chuyển xoay tua bọc lót khi đồng đội bị đối phương ép góc sâu.", "viesnap.vn_tiktok_7556982998449655047.mp4", "Chống tua, tự đổi theo Ô 6 trung tâm phải, thumbnail đẹp"],
    ["08", "ĐÔI NAM", "Kỹ Năng Đè Lưới & Phản Tạt Ép Góc Đôi Nam", "Kỹ thuật giữ lưới chủ động, tạt cầu thấp tước đoạt quyền tấn công, ép đối thủ nâng bổng.", "viesnap.vn_tiktok_ZSq6N6mx5.mp4", "Chống tua, tự đổi theo Ô 2 lưới giữa, chế độ rạp hát"],
    ["09", "ĐÔI NAM", "Phối Hợp Tấn Công Đập Cầu & Bồi Cầu Dứt Điểm", "Quy trình triển khai liên hoàn: người sau đập cầu uy lực tạo đà cho người trước lao vào vồ dứt điểm.", "viesnap.vn_tiktok_ZSq6NmtCb.mp4", "Chống tua, tự đổi theo Ô 3 lưới phải, báo cáo tiến độ"],
    ["10", "ĐƠN NỮ", "Kỹ Thuật Di Chuyển Bộ Pháp Dẻo Dai & Điều Cầu Đơn Nữ", "Bộ pháp linh hoạt, di chuyển 4 góc sân êm ái và hồi vị nhịp nhàng.", "snaptik.vn_7500378802141269256.mp4", "Chống tua nhanh, tự động tích xanh, xem chậm 0.5x"],
    ["11", "ĐƠN NỮ", "Chiến Thuật Ép Cầu Đáy Sân & Mở Góc Tấn Công Đơn Nữ", "Kỹ thuật phông cầu cao sâu, khai thác khoảng trống hai góc biên.", "snaptik.vn_7567643845215669521.mp4", "Chống tua nhanh, tự động tích xanh, xem toàn màn hình"],
    ["12", "ĐƠN NỮ", "Kỹ Thuật Bỏ Nhỏ Sát Lưới & Kéo Lưới Lừa Hướng Đơn Nữ", "Cảm giác mặt vợt tinh tế, cắt cầu đổi hướng đánh gục phản xạ.", "snaptik.vn_7598797082912181511.mp4", "Chống tua nhanh, tự động tích xanh, quay chậm"],
    ["13", "ĐƠN NỮ", "Kỹ Năng Đập Cầu Điểm Rơi & Chém Cầu Bạt Góc Đơn Nữ", "Biến hóa giữa đập cắm biên và chém cầu rơi chéo sân dứt điểm.", "snaptik.vn_7651286512998288661.mp4", "Chống tua nhanh, tự động tích xanh, âm thanh chuẩn"],
    ["14", "ĐÔI NỮ", "Chiến Thuật Bọc Lót & Phòng Thủ Bền Bỉ Đôi Nữ", "Phối hợp di chuyển bọc lót, cứu cầu liên hoàn và phá thế tấn công.", "snaptik.vn_7372888645730192658.mp4", "Chống tua nhanh, tự động tích xanh, xem toàn màn hình"],
    ["15", "ĐÔI NỮ", "Kỹ Thuật Phản Tạt Đè Cầu & Gài Lưới Đôi Nữ", "Giữ thế chủ động trên lưới, tạt cầu thấp không cho đối thủ nâng bổng.", "snaptik.vn_7495761376141397255.mp4", "Chống tua nhanh, tự động tích xanh, xem chậm 0.5x"],
    ["16", "ĐÔI NỮ", "Đổi Vị Trí Công - Thủ & Chuyển Giao Quyền Tấn Công", "Quy tắc di chuyển hoán đổi trước - sau trong trận đấu đôi nữ.", "snaptik.vn_7669811035297172757.mp4", "Chống tua nhanh, tự động tích xanh, tua lại 5s"],
    ["17", "ĐÔI NỮ", "Tấn Công Liên Hoàn Đập Cầu & Bắt Lưới Dứt Điểm Đôi Nữ", "Phối hợp nhịp nhàng giữa quả đập phía sau và quả chớp lưới phía trước.", "snaptik.vn_7681640086798159124.mp4", "Chống tua nhanh, tự động tích xanh, âm thanh sống động"],
    ["18", "TÍNH NĂNG MỞ RỘNG", "NÚT '➕ GẮN LINK VIDEO MỚI'", "Cho phép người dùng hoặc HLV tự dán link YouTube, YouTube Shorts hoặc MP4 online vào 4 chuyên mục.", "Link YouTube / Shorts / MP4 CDN", "KHÔNG GIỚI HẠN SỐ LƯỢNG, không tốn 1MB ổ cứng máy"]
  ];

  videosData.forEach((rowVal, idx) => {
    const rowNum = 3 + idx;
    const row = ws4.getRow(rowNum);
    row.values = rowVal;
    row.height = 36;

    for (let c = 1; c <= 6; c++) {
      const cell = row.getCell(c);
      cell.font = { name: fontFamily, size: 9.5, color: { argb: '0F172A' }, bold: c <= 2 };
      cell.fill = headerFill(idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF');
      cell.border = borderThin;
      cell.alignment = { vertical: 'middle', horizontal: c === 1 ? 'center' : 'left', wrapText: true };
    }
  });

  // =========================================================================
  // SHEET 5: THỬ THÁCH 100 NGÀY
  // =========================================================================
  const ws5 = workbook.addWorksheet('5. Thử Thách 100 Ngày', {
    views: [{ showGridLines: true }]
  });

  ws5.columns = [
    { width: 14 },
    { width: 18 },
    { width: 34 },
    { width: 56 },
    { width: 50 }
  ];

  ws5.mergeCells('A1:E1');
  const t5 = ws5.getCell('A1');
  t5.value = 'LỘ TRÌNH HUẤN LUYỆN THỬ THÁCH 100 NGÀY CẦU LÔNG (100-DAY ROADMAP)';
  t5.font = { name: fontFamily, size: 14, bold: true, color: { argb: 'FFFFFF' } };
  t5.fill = headerFill('92400E'); // Amber 800
  t5.alignment = { vertical: 'middle', horizontal: 'center' };
  ws5.getRow(1).height = 36;

  const hRow5 = ws5.getRow(2);
  hRow5.values = ['GIAI ĐOẠN', 'SỐ NGÀY TẬP', 'TÊN GIAI ĐOẠN', 'NỘI DUNG GIÁO ÁN TRỌNG TÂM', 'TIÊU CHUẨN ĐẠT ĐƯỢC'];
  hRow5.height = 28;
  for (let c = 1; c <= 5; c++) {
    const cell = hRow5.getCell(c);
    cell.font = { name: fontFamily, size: 9.5, bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = headerFill('D97706');
    cell.border = borderThin;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  }

  const roadmapData = [
    ["Giai đoạn 1", "Ngày 01 -> 15", "NỀN TẢNG FOOTWORK CƠ BẢN", "Tập trung phản xạ Ô 5 tâm sân, bước lunge gối 90° góc lưới (Ô 1, Ô 3), nhún bật split-step.", "Hình thành phản xạ vô điều kiện hồi về tâm sân sau khi đánh; không bị ngã hay chúi người."],
    ["Giai đoạn 2", "Ngày 16 -> 35", "TĂNG TỐC PHẢN TẠT TRUNG SÂN", "Luyện phản xạ Ô 4 (Biên trái) và Ô 6 (Biên phải), thủ ve trái tay, tạt phẳng ngang hông.", "Tăng tốc độ phản xạ dưới 2.5 giây/hiệp; xử lý mượt các pha cầu đập thẳng nách và sườn."],
    ["Giai đoạn 3", "Ngày 36 -> 60", "BỨT TỐC TẤN CÔNG & LƯỚI", "Phối hợp di chuyển Lưới - Đáy sân, kỹ thuật vồ cầu dứt điểm Ô 2, bỏ nhỏ gài xoáy.", "Thời gian phản xạ đạt mốc dưới 1.8 giây; di chuyển thanh thoát không tốn sức."],
    ["Giai đoạn 4", "Ngày 61 -> 85", "SỨC BỀN & ĐẬP CẦU SCISSOR KICK", "Luyện các bài đáy sân Ô 7, Ô 8, Ô 9. Bật nhảy đập cầu cắt kéo, chém cầu bạt góc lừa hướng.", "Duy trì thể lực và độ chuẩn xác trên 85% trong các chuỗi bài tập kéo dài 30 - 50 hiệp."],
    ["Giai đoạn 5", "Ngày 86 -> 100", "MASTER TOÀN DIỆN THỰC CHIẾN", "Chế độ Toàn Bộ ngẫu nhiên 9 ô sân tốc độ cao kết hợp câu hỏi chiến thuật đánh đơn và đánh đôi.", "Đạt danh hiệu 'Kiện Tướng Cầu Lông' (Badminton Master), phản xạ siêu nhanh dưới 1.2 giây."]
  ];

  roadmapData.forEach((rowVal, idx) => {
    const rowNum = 3 + idx;
    const row = ws5.getRow(rowNum);
    row.values = rowVal;
    row.height = 42;

    for (let c = 1; c <= 5; c++) {
      const cell = row.getCell(c);
      cell.font = { name: fontFamily, size: 9.5, color: { argb: '0F172A' }, bold: c <= 3 };
      cell.fill = headerFill(idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF');
      cell.border = borderThin;
      cell.alignment = { vertical: 'middle', horizontal: c <= 2 ? 'center' : 'left', wrapText: true };
    }
  });

  // =========================================================================
  // SHEET 6: TÍNH NĂNG BỔ TRỢ & ĐỀ XUẤT
  // =========================================================================
  const ws6 = workbook.addWorksheet('6. Tính Năng Bổ Trợ', {
    views: [{ showGridLines: true }]
  });

  ws6.columns = [
    { width: 34 },
    { width: 62 },
    { width: 52 }
  ];

  ws6.mergeCells('A1:C1');
  const t6 = ws6.getCell('A1');
  t6.value = 'CÁC CÔNG CỤ BỔ TRỢ, GHI HÌNH VÀ BÁO CÁO NÂNG CAO';
  t6.font = { name: fontFamily, size: 14, bold: true, color: { argb: 'FFFFFF' } };
  t6.fill = headerFill('334155'); // Slate 700
  t6.alignment = { vertical: 'middle', horizontal: 'center' };
  ws6.getRow(1).height = 36;

  const hRow6 = ws6.getRow(2);
  hRow6.values = ['TÊN TÍNH NĂNG CÔNG NGHỆ', 'MÔ TẢ NGUYÊN LÝ HOẠT ĐỘNG CHI TIẾT', 'LỢI ÍCH THỰC TẾ CHO TRUNG TÂM & HỌC VIÊN'];
  hRow6.height = 28;
  for (let c = 1; c <= 3; c++) {
    const cell = hRow6.getCell(c);
    cell.font = { name: fontFamily, size: 10, bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = headerFill('475569');
    cell.border = borderThin;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  }

  const extraFeatures = [
    ["1. Công cụ Tự Ghi Hình Video (Recorder)", "Mở camera máy tính, ghi lại toàn bộ buổi tập luyện, có thanh thời gian và tùy chọn tải ngay file MP4/WebM về máy.", "Giúp học viên soi lại góc chân, độ mở vai và cách cầm vợt của bản thân để tự sửa lỗi sai."],
    ["2. Nhật Ký Lịch Sử Tập Luyện (History)", "Tự động lưu trữ 50 buổi tập gần nhất với đầy đủ thông tin: Ngày giờ, Chế độ, Số hiệp, Độ chính xác, Tốc độ trung bình, Tốc độ tốt nhất.", "Xem lại quá trình phát triển phong độ theo từng tuần, từng tháng."],
    ["3. Thống Kê Trọn Đời (Lifetime Stats)", "Tính tổng số buổi đã tập, tổng số hiệp hoàn thành, chuỗi ngày liên tục (Streak) và kỷ lục phản xạ nhanh nhất.", "Tạo động lực thi đua, duy trì thói quen tập luyện đều đặn không bỏ cuộc."],
    ["4. Tự Động Giao Bài Tập Về Nhà", "Ngay khi hoàn thành bài tập, hệ thống xuất thẻ bài tập với Mã buổi tập, Ngày giao, Deadline, Người phụ trách và Yêu cầu quay camera nộp bài.", "Chuẩn hóa quy trình dạy học cho các HLV và trung tâm cầu lông chuyên nghiệp."],
    ["5. Động cơ Âm Thanh & Đếm Nhịp Giọng Nói", "Tích hợp âm thanh đếm ngược 3-2-1, còi hiệu lệnh xuất phát, âm thanh thành công, chúc mừng pháo hoa Confetti.", "Tăng cường sự tập trung cao độ và hưng phấn của học viên trong suốt buổi tập."],
    ["6. Hỗ Trợ Đa Nền Tảng (Web & Desktop App)", "Chạy online mượt mà trên Render.com, đồng thời đóng gói sẵn file chạy Windows .exe không cần cài đặt phức tạp.", "Tiện lợi mở trên điện thoại, máy tính bảng, laptop hoặc máy tính để bàn tại sân tập."]
  ];

  extraFeatures.forEach((feat, idx) => {
    const rowNum = 3 + idx;
    const row = ws6.getRow(rowNum);
    row.values = feat;
    row.height = 42;

    const cA = ws6.getCell(`A${rowNum}`);
    const cB = ws6.getCell(`B${rowNum}`);
    const cC = ws6.getCell(`C${rowNum}`);

    cA.font = { name: fontFamily, size: 10, bold: true, color: { argb: '0F172A' } };
    cA.fill = headerFill(idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF');
    cA.border = borderThin;
    cA.alignment = { vertical: 'middle', wrapText: true };

    cB.font = { name: fontFamily, size: 9.5, color: { argb: '334155' } };
    cB.fill = headerFill(idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF');
    cB.border = borderThin;
    cB.alignment = { vertical: 'middle', wrapText: true };

    cC.font = { name: fontFamily, size: 9.5, color: { argb: '065F46' } };
    cC.fill = headerFill(idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF');
    cC.border = borderThin;
    cC.alignment = { vertical: 'middle', wrapText: true };
  });

  // Save to root, public, and dist
  const rootFile = path.resolve('Gioi_Thieu_Tinh_Nang_Badminton_Pro.xlsx');
  const publicFile = path.resolve('public/Gioi_Thieu_Tinh_Nang_Badminton_Pro.xlsx');
  const distFile = path.resolve('dist/Gioi_Thieu_Tinh_Nang_Badminton_Pro.xlsx');

  await workbook.xlsx.writeFile(rootFile);
  await workbook.xlsx.writeFile(publicFile);
  await workbook.xlsx.writeFile(distFile);

  console.log('Executive Styled Excel files generated successfully at:');
  console.log(' - Root:', rootFile);
  console.log(' - Public:', publicFile);
  console.log(' - Dist:', distFile);
}

buildExecutiveReport().catch(err => {
  console.error('Error generating executive Excel:', err);
  process.exit(1);
});
