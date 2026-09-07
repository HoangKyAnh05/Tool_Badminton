import { TrainingMode } from '../types';

export interface DailyWorkout {
  day: number;
  title: string;
  category: 'SHADOW' | 'SERVE' | 'FOOTWORK' | 'SMASH' | 'CLEAR' | 'DRIVE' | 'NET' | 'TEST' | 'REVIEW';
  suggestedMode: TrainingMode;
  phaseNumber: number; // 1 to 5
  phaseName: string;
  description: string;
  isSpecialTest?: boolean;
}

export const DAILY_PLAN_100: DailyWorkout[] = [
  // GIAI ĐOẠN 1: NỀN TẢNG CƠ BẢN & PHẢN XẠ BAN ĐẦU (Ngày 1 - 20)
  {
    day: 1,
    title: 'Shadow 4 góc sân + split step, 5 × 2 phút',
    category: 'SHADOW',
    suggestedMode: 'CHÂN',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Tập trung vào nhịp bật split-step ở trung tâm trước khi bứt tốc ra 4 góc sân. Giữ trọng tâm thấp, hồi tâm nhanh sau mỗi cú đánh.'
  },
  {
    day: 2,
    title: 'Giao cầu ngắn 50 quả + giao cầu cao 30 quả',
    category: 'SERVE',
    suggestedMode: 'TAY',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Kiểm soát điểm rơi sát mép lưới đối với giao cầu ngắn. Giao cầu cao cần bay sâu sát vạch đáy đối phương.'
  },
  {
    day: 3,
    title: 'Đánh cầu lên cao bằng forehand 100 lần',
    category: 'CLEAR',
    suggestedMode: 'TAY',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Mở vai hết biên độ, tiếp xúc cầu ở điểm cao nhất phía trước trán, dùng lực xoay hông và cổ tay.'
  },
  {
    day: 4,
    title: 'Footwork 6 góc sân, 6 × 45 giây',
    category: 'FOOTWORK',
    suggestedMode: 'CHÂN',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Di chuyển đến 6 góc: 2 lưới, 2 tạt ngang, 2 cuối sân. Chú ý bước lunge chân thuận chắc chắn, không bị chúi người.'
  },
  {
    day: 5,
    title: 'Clear cuối sân 50 quả + shadow clear',
    category: 'CLEAR',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Chạy lùi bước chassé ra sau, nhảy đổi chân scissor-kick phát lực đưa cầu bổng sâu về cuối sân đối thủ.'
  },
  {
    day: 6,
    title: 'Phản xạ 9 ô, 50 lần',
    category: 'FOOTWORK',
    suggestedMode: 'CHÂN',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Sử dụng hệ thống 9 ô của BadmintonPro để rèn phản xạ nhận diện vị trí và kích hoạt bứt tốc tức thì.'
  },
  {
    day: 7,
    title: 'Drive forehand/backhand 100 lần',
    category: 'DRIVE',
    suggestedMode: 'TAY',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Tạt cầu ngang tầm ngực, đánh ngắn tay, giật cổ tay dứt khoát. Luôn giữ đầu vợt cao hơn cổ tay.'
  },
  {
    day: 8,
    title: 'Shadow di chuyển trước–sau + lên lưới',
    category: 'SHADOW',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Mô phỏng chuỗi phòng thủ cuối sân lùi về, sau đó lao nhanh lên lưới vồ cầu hoặc gài lưới.'
  },
  {
    day: 9,
    title: 'Bỏ nhỏ thuận tay 50 quả',
    category: 'NET',
    suggestedMode: 'TAY',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Thả lỏng cổ tay, đón cầu sát mép lưới, xoa nhẹ mặt vợt để cầu lướt sát mép lưới rồi rơi cắm.'
  },
  {
    day: 10,
    title: 'Đập cầu 30 quả + trở về vị trí giữa sân sau mỗi cú',
    category: 'SMASH',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Đập cầu uy lực cắm sàn và lập tức dùng bước hãm để phục hồi vị trí trung tâm chuẩn bị đón quả tiếp.'
  },
  {
    day: 11,
    title: 'Backhand cơ bản 80 lần',
    category: 'DRIVE',
    suggestedMode: 'TAY',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Chuyển ngón cái tì vào cạnh vát của cán vợt, vung cẳng tay từ trong ra ngoài dứt khoát.'
  },
  {
    day: 12,
    title: 'Footwork 8 hướng + split step',
    category: 'FOOTWORK',
    suggestedMode: 'CHÂN',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Di chuyển toàn diện theo hình hoa tiêu 8 hướng. Bật nhẹ hai chân chạm đất đồng thời trước khi bứt tốc.'
  },
  {
    day: 13,
    title: 'Giao cầu thấp vào 4 vị trí khác nhau',
    category: 'SERVE',
    suggestedMode: 'TAY',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Giao vào chữ T, góc xa nách chữ T, góc biên ngoài bên phải và góc biên ngoài bên trái.'
  },
  {
    day: 14,
    title: '🧠 Ôn lại kỹ thuật 1–13 + tự quay video kiểm tra',
    category: 'REVIEW',
    suggestedMode: 'TOÀN BỘ',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Bật chức năng Camera trong app, tự quay lại 3 động tác bất kỳ và soi lại tư thế chân, góc vung vợt.',
    isSpecialTest: true
  },
  {
    day: 15,
    title: 'Shadow toàn sân 10 × 30 giây',
    category: 'SHADOW',
    suggestedMode: 'CHÂN',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Di chuyển liên tục không ngắt quãng trong 30 giây với tốc độ cao, nghỉ 30 giây giữa các lượt.'
  },
  {
    day: 16,
    title: 'Clear cao và sâu 60 quả',
    category: 'CLEAR',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Đánh cầu đạt độ cao tối thiểu 4m và tiếp đất trong phạm vi 50cm từ vạch đáy đối phương.'
  },
  {
    day: 17,
    title: 'Drive liên tục 3 × 2 phút',
    category: 'DRIVE',
    suggestedMode: 'TAY',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Giữ cánh tay luôn ở tư thế chủ động phía trước ngực, phản hồi cầu nhanh không hạ tay.'
  },
  {
    day: 18,
    title: 'Di chuyển góc trước + đánh cầu giả lập',
    category: 'FOOTWORK',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Lunge tới 2 góc lưới, xen kẽ giữa gõ cầu cắm sàn và hất cầu sâu chéo góc.'
  },
  {
    day: 19,
    title: 'Bỏ nhỏ thuận tay + trái tay',
    category: 'NET',
    suggestedMode: 'TAY',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Luyện cảm giác tay mềm mại ở cả hai phía lưới để ép đối phương phải hất cầu lên.'
  },
  {
    day: 20,
    title: 'Phản xạ trái/phải bằng app random',
    category: 'FOOTWORK',
    suggestedMode: 'TOÀN BỘ',
    phaseNumber: 1,
    phaseName: 'Giai Đoạn 1: Nền Tảng & Phản Xạ (Ngày 1 - 20)',
    description: 'Sử dụng chế độ TOÀN BỘ trên app với tốc độ 4 giây, ép phản ứng sang 2 cánh sân.',
    isSpecialTest: true
  },

  // GIAI ĐOẠN 2: TĂNG TỐC BỘ PHÁP & NÂNG CAO TẤN CÔNG (Ngày 21 - 40)
  {
    day: 21,
    title: 'Đập cầu + follow-up lên lưới',
    category: 'SMASH',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Sau cú smash uy lực từ cuối sân, lập tức lao nhanh lên lưới vồ cầu dứt điểm đợt 2.'
  },
  {
    day: 22,
    title: 'Giao cầu + di chuyển về vị trí phòng thủ',
    category: 'SERVE',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Sau khi phát cầu ngắn, lập tức lùi nhẹ 1 bước, giơ vợt ngang ngực sẵn sàng đỡ cú tạt cầu đối thủ.'
  },
  {
    day: 23,
    title: 'Backhand clear 40 quả',
    category: 'CLEAR',
    suggestedMode: 'TAY',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Xoay lưng về hướng lưới, ngón cái tì cạnh vợt, bung lực cẳng tay đưa cầu bay bổng sang cuối sân.'
  },
  {
    day: 24,
    title: 'Footwork 6 góc tính thời gian',
    category: 'FOOTWORK',
    suggestedMode: 'CHÂN',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Thiết lập thời gian 3.5s trên app, ép đôi chân di chuyển tốc độ cao không để mất nhịp.'
  },
  {
    day: 25,
    title: 'Đánh cầu vào tường: forehand + backhand',
    category: 'DRIVE',
    suggestedMode: 'TAY',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Tập phản xạ cổ tay tốc độ cực cao, kiểm soát lực đẩy để cầu dội lại nhịp nhàng.'
  },
  {
    day: 26,
    title: 'Phòng thủ đập cầu bằng shadow',
    category: 'SHADOW',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Hạ thấp trọng tâm ở trung tâm, bung vợt chặn cầu sang 2 biên hoặc hất ngược ra cuối sân.'
  },
  {
    day: 27,
    title: 'Net shot 50 quả',
    category: 'NET',
    suggestedMode: 'TAY',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Đặt mặt vợt nghiêng góc đón cầu, tạo đường cong rơi sát mép lưới gây áp lực tối đa.'
  },
  {
    day: 28,
    title: '🧠 Kiểm tra: giao cầu + clear + footwork',
    category: 'TEST',
    suggestedMode: 'TOÀN BỘ',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Bài test tích hợp kiểm tra độ chính xác cú giao cầu, độ sâu cú clear và độ mượt mà của bộ chân.',
    isSpecialTest: true
  },
  {
    day: 29,
    title: 'Shadow 8 góc random',
    category: 'SHADOW',
    suggestedMode: 'CHÂN',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Kích hoạt chế độ CHÂN ngẫu nhiên 9 ô, di chuyển theo đúng vị trí đèn báo hiệu.'
  },
  {
    day: 30,
    title: 'Đập cầu 40 quả, tập kỹ thuật tiếp đất',
    category: 'SMASH',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Bật nhảy smash và tiếp đất bằng chân không thuận trước, chùng gối giảm chấn an toàn.'
  },
  {
    day: 31,
    title: 'Drive forehand/backhand đổi bên',
    category: 'DRIVE',
    suggestedMode: 'TAY',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Chuyển ngón tay linh hoạt giữa cán thuận và cán trái chỉ trong 0.2 giây.'
  },
  {
    day: 32,
    title: 'Giao cầu ngắn 100 quả',
    category: 'SERVE',
    suggestedMode: 'TAY',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Lặp lại đều đặn để tạo thành trí nhớ cơ bắp, đường cầu phải lướt sát dải băng trắng trên mép lưới.'
  },
  {
    day: 33,
    title: 'Bắt cầu bằng vợt phản xạ 50 lần',
    category: 'NET',
    suggestedMode: 'TAY',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Tập giơ vợt đón điểm tiếp xúc cầu ở tầm cao nhất phía trước mặt trước khi cầu hạ xuống.'
  },
  {
    day: 34,
    title: 'Clear → lên giữa sân → shadow smash',
    category: 'SHADOW',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Tổ hợp di chuyển kinh điển: Đánh clear giải tỏa $\\rightarrow$ chiếm trung tâm $\\rightarrow$ chớp thời cơ đập cầu.'
  },
  {
    day: 35,
    title: 'Footwork trước–sau tốc độ cao',
    category: 'FOOTWORK',
    suggestedMode: 'CHÂN',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Di chuyển con thoi giữa lưới và cuối sân trong 10 lượt, mỗi lượt 6 lần chạm vạch.'
  },
  {
    day: 36,
    title: 'Bỏ nhỏ → lùi về → clear',
    category: 'SHADOW',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Lunge lên lưới thả nhỏ $\\rightarrow$ lùi bước nhanh về ô cuối sân thực hiện cú phông cầu cầu cao sâu.'
  },
  {
    day: 37,
    title: 'Backhand drive 100 lần',
    category: 'DRIVE',
    suggestedMode: 'TAY',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Tì ngón cái chắc chắn, giật cổ tay tốc độ cao ép cầu bay ngang lưới hướng về người đối phương.'
  },
  {
    day: 38,
    title: 'Phản xạ 9 ô + split step',
    category: 'FOOTWORK',
    suggestedMode: 'CHÂN',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Mỗi khi app đổi ô, bắt buộc phải bật split step trước khi xuất phát chân sang ô đó.'
  },
  {
    day: 39,
    title: 'Net kill giả lập + trở về giữa sân',
    category: 'NET',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Lao dứt khoát chữ T, gõ cầu cắm sàn và lùi 1 bước nhẹ về vị trí sẵn sàng.'
  },
  {
    day: 40,
    title: '🧠 Kiểm tra 10 phút kỹ thuật tổng hợp',
    category: 'TEST',
    suggestedMode: 'TOÀN BỘ',
    phaseNumber: 2,
    phaseName: 'Giai Đoạn 2: Tăng Tốc & Tấn Công (Ngày 21 - 40)',
    description: 'Bài kiểm tra 10 phút liên tục với app ở chế độ TOÀN BỘ, đạt tối thiểu 90% độ phản xạ chính xác.',
    isSpecialTest: true
  },

  // GIAI ĐOẠN 3: KỸ THUẬT CHUYÊN SÂU & BỀN BỈ THỂ LỰC (Ngày 41 - 60)
  {
    day: 41,
    title: 'Shadow 4 góc × 10 lượt',
    category: 'SHADOW',
    suggestedMode: 'CHÂN',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Tăng cường sức bền tốc độ, kiểm soát nhịp thở đều đặn trong suốt 10 lượt shadow.'
  },
  {
    day: 42,
    title: 'Clear 80 quả, ưu tiên độ sâu',
    category: 'CLEAR',
    suggestedMode: 'TAY',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Tập trung đưa cầu bay qua đầu đối phương sát vạch cuối, không đánh ngắn tạo cơ hội đối thủ đập cầu.'
  },
  {
    day: 43,
    title: 'Smash 50 quả',
    category: 'SMASH',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Phát lực toàn thân từ chân, hông, lưng đến cánh tay và cổ tay tại thời điểm tiếp xúc cầu.'
  },
  {
    day: 44,
    title: 'Drive 150 lần',
    category: 'DRIVE',
    suggestedMode: 'TAY',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Nâng cao khối lượng tạt cầu để tăng sức bền cổ tay và cẳng tay trong các pha giằng co nhanh.'
  },
  {
    day: 45,
    title: 'Giao cầu ngắn + flick serve',
    category: 'SERVE',
    suggestedMode: 'TAY',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Giữ động tác chuẩn bị giống hệt nhau, sau đó bất ngờ giật cổ tay bắn cầu bổng qua đầu đối thủ (Flick serve).'
  },
  {
    day: 46,
    title: 'Phản xạ 9 ô tốc độ nhanh',
    category: 'FOOTWORK',
    suggestedMode: 'CHÂN',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Cài đặt tốc độ 3.0s trên ứng dụng BadmintonPro, tập bứt tốc ngay khi ô phát sáng.'
  },
  {
    day: 47,
    title: 'Footwork 8 hướng + chạm vạch',
    category: 'FOOTWORK',
    suggestedMode: 'CHÂN',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Mỗi lần di chuyển ra góc, ngón tay hoặc đầu vợt phải chạm nhẹ xuống vạch sân trước khi lùi về.'
  },
  {
    day: 48,
    title: 'Net shot trái tay/phải tay',
    category: 'NET',
    suggestedMode: 'TAY',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Xoay cổ tay khéo léo để điều chỉnh góc tiếp xúc, đổi hướng cầu chéo lưới bất ngờ.'
  },
  {
    day: 49,
    title: 'Phòng thủ: block cầu giả lập',
    category: 'DRIVE',
    suggestedMode: 'TAY',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Chặn đứng lực đập của đối phương bằng cách hãm mặt vợt, thả cầu rơi ngắn ngay sau lưới.'
  },
  {
    day: 50,
    title: '🔥 Test giữa chặng: 20 phút tổng hợp',
    category: 'TEST',
    suggestedMode: 'TOÀN BỘ',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'CỘT MỐC 50 NGÀY! Luyện tập liên tục 20 phút kết hợp cả Tay, Chân và Phản xạ ngẫu nhiên toàn diện.',
    isSpecialTest: true
  },
  {
    day: 51,
    title: 'Shadow tình huống bị ép cuối sân',
    category: 'SHADOW',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Mô phỏng pha cầu bị ép sâu góc trái cuối sân, xoay người thực hiện cứu cầu và nhanh chóng hồi vị.'
  },
  {
    day: 52,
    title: 'Backhand clear 60 quả',
    category: 'CLEAR',
    suggestedMode: 'TAY',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Tập trung vào điểm rơi và độ sâu, sử dụng tối đa lực bẩy của ngón tay cái trên cán vợt.'
  },
  {
    day: 53,
    title: 'Smash → lên lưới',
    category: 'SMASH',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Đập cầu uy lực rồi lập tức chớp thời cơ lao lên lưới, không đứng nhìn đường cầu vừa đánh.'
  },
  {
    day: 54,
    title: 'Drive ngang sân 4 × 2 phút',
    category: 'DRIVE',
    suggestedMode: 'TAY',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Tạt cầu tốc độ cao đổi góc chéo sân và dọc biên, duy trì áp lực liên tục.'
  },
  {
    day: 55,
    title: 'Giao cầu vào mục tiêu',
    category: 'SERVE',
    suggestedMode: 'TAY',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Đặt hộp cầu hoặc tờ giấy ở góc chữ T, giao chính xác vào mục tiêu đạt tỷ lệ trên 80%.'
  },
  {
    day: 56,
    title: 'Random 9 ô: 100 lần',
    category: 'FOOTWORK',
    suggestedMode: 'TOÀN BỘ',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Thử thách thể lực và phản xạ: Hoàn thành 100 lượt di chuyển theo app ở cường độ cao.'
  },
  {
    day: 57,
    title: 'Split step + phản xạ trước/sau',
    category: 'FOOTWORK',
    suggestedMode: 'CHÂN',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Rèn luyện khả năng chuyển đổi trọng tâm đột ngột giữa thế phòng thủ lưới và lùi cuối sân.'
  },
  {
    day: 58,
    title: 'Bỏ nhỏ + net kill',
    category: 'NET',
    suggestedMode: 'TAY',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Gài cầu hiểm hóc kéo đối thủ hớ hênh rồi lập tức gõ dứt điểm cắm sàn.'
  },
  {
    day: 59,
    title: 'Clear → smash → recovery',
    category: 'SHADOW',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Phối hợp nhịp nhàng: Phông cầu lùi sâu $\\rightarrow$ Bật nhảy smash uy lực $\\rightarrow$ Trở về tâm sân trong 1 giây.'
  },
  {
    day: 60,
    title: '🧠 Tự quay video 3 kỹ thuật và sửa lỗi',
    category: 'REVIEW',
    suggestedMode: 'TOÀN BỘ',
    phaseNumber: 3,
    phaseName: 'Giai Đoạn 3: Chuyên Sâu & Thể Lực (Ngày 41 - 60)',
    description: 'Bật Camera quay lại: 1. Smash, 2. Footwork 4 góc, 3. Backhand. Tự soi lại dáng và điều chỉnh góc vợt.',
    isSpecialTest: true
  },

  // GIAI ĐOẠN 4: ĐỘT PHÁ TỐC ĐỘ & PHẢN XẠ ĐỈNH CAO (Ngày 61 - 80)
  {
    day: 61,
    title: 'Footwork 6 góc tốc độ tối đa kiểm soát được',
    category: 'FOOTWORK',
    suggestedMode: 'CHÂN',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Đẩy tốc độ bước chân lên giới hạn cao nhất nhưng vẫn phải kiểm soát được điểm dừng chân.'
  },
  {
    day: 62,
    title: 'Smash 60 quả',
    category: 'SMASH',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Tập trung vào góc đập hiểm: Đập chéo sân và đập sát nách đối phương.'
  },
  {
    day: 63,
    title: 'Drive 200 lần',
    category: 'DRIVE',
    suggestedMode: 'TAY',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Tăng cường sức chịu đựng của cổ tay, duy trì đường cầu bay phẳng và cắm.'
  },
  {
    day: 64,
    title: 'Giao cầu 4 góc + kiểm soát độ cao',
    category: 'SERVE',
    suggestedMode: 'TAY',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Điều chỉnh linh hoạt điểm rơi sang 4 góc sân giao cầu với quỹ đạo lướt mép lưới hoàn hảo.'
  },
  {
    day: 65,
    title: 'Backhand + chuyển sang forehand',
    category: 'DRIVE',
    suggestedMode: 'TAY',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Đánh cú trái tay rồi lập tức đổi cán vợt đón quả thuận tay ở tốc độ phản xạ cao.'
  },
  {
    day: 66,
    title: 'Phản xạ random 9 ô + tay',
    category: 'FOOTWORK',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Chế độ TAY + CHÂN trên ứng dụng: Vừa bứt tốc đúng ô vừa thực hiện động tác vung vợt mô phỏng.'
  },
  {
    day: 67,
    title: 'Shadow phòng thủ liên tục',
    category: 'SHADOW',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Mô phỏng chống đỡ liên tiếp 5 cú đập cầu của đối phương bằng cách bung vợt sang 2 cánh.'
  },
  {
    day: 68,
    title: 'Net shot 80 quả',
    category: 'NET',
    suggestedMode: 'TAY',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Mài giũa cảm giác tiếp xúc vi tế của đầu ngón tay và mặt vợt, tạo độ xoáy cho quả cầu.'
  },
  {
    day: 69,
    title: 'Clear cuối sân 100 quả',
    category: 'CLEAR',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: '100 cú phông cầu chất lượng cao, giữ vững phong độ ổn định dù thể lực bắt đầu suy giảm.'
  },
  {
    day: 70,
    title: '🔥 Test: 100 lần footwork + kỹ thuật',
    category: 'TEST',
    suggestedMode: 'TOÀN BỘ',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'CỘT MỐC 70 NGÀY! Thử thách hoàn thành trọn vẹn 100 lượt footwork tích hợp kỹ thuật.',
    isSpecialTest: true
  },
  {
    day: 71,
    title: 'Shadow toàn sân 15 phút',
    category: 'SHADOW',
    suggestedMode: 'CHÂN',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Di chuyển biến hóa trên toàn sân, tưởng tượng từng tình huống cầu thực chiến cụ thể.'
  },
  {
    day: 72,
    title: 'Smash + recovery 50 lần',
    category: 'SMASH',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Sau mỗi cú đập cầu, bắt buộc phải trở về vị trí trung tâm trong vòng 0.8 giây.'
  },
  {
    day: 73,
    title: 'Drive nhanh 5 × 2 phút',
    category: 'DRIVE',
    suggestedMode: 'TAY',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Tập trung vào phản xạ ngực và mặt, không để cầu vượt qua tầm kiểm soát.'
  },
  {
    day: 74,
    title: 'Giao cầu + giả lập tình huống giao đôi',
    category: 'SERVE',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Giao cầu ngắn rồi lập tức thủ lưới chữ T, khóa chặt góc vồ cầu của đối thủ.'
  },
  {
    day: 75,
    title: 'Phản xạ 9 ô cấp độ khó',
    category: 'FOOTWORK',
    suggestedMode: 'TOÀN BỘ',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Cài đặt tốc độ 2.5s trên app, thử thách phản xạ thần tốc của mắt và chân.'
  },
  {
    day: 76,
    title: 'Bỏ nhỏ → lùi → clear → trở giữa',
    category: 'SHADOW',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Chuỗi liên hoàn 4 nhịp: Lunge gài lưới $\\rightarrow$ Lùi sau clear sâu $\\rightarrow$ Hồi vị trung tâm.'
  },
  {
    day: 77,
    title: 'Backhand drive + backhand clear',
    category: 'DRIVE',
    suggestedMode: 'TAY',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Luyện kỹ thuật trái tay toàn diện: Tạt cầu cắm khi cầu ngang ngực và phông sâu khi cầu bay qua đầu.'
  },
  {
    day: 78,
    title: 'Phòng thủ smash + chuyển sang phản công',
    category: 'DRIVE',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Đón cú đập của đối thủ rồi bất ngờ tạt cầu cắm chéo sân để xoay chuyển cục diện trận đấu.'
  },
  {
    day: 79,
    title: 'Footwork random 8 hướng',
    category: 'FOOTWORK',
    suggestedMode: 'CHÂN',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Di chuyển thanh thoát, bước chân nhẹ nhàng êm ái, tiếp đất bằng nửa bàn chân trước.'
  },
  {
    day: 80,
    title: '🧠 Kiểm tra kỹ thuật toàn diện',
    category: 'TEST',
    suggestedMode: 'TOÀN BỘ',
    phaseNumber: 4,
    phaseName: 'Giai Đoạn 4: Đột Phá Tốc Độ (Ngày 61 - 80)',
    description: 'Đánh giá lại toàn bộ các nhóm kỹ thuật: Giao cầu, Bộ chân, Smash, Drop, Drive và Clear.',
    isSpecialTest: true
  },

  // GIAI ĐOẠN 5: THỰC CHIẾN ĐỈNH CAO & CHINH PHỤC 100 NGÀY (Ngày 81 - 100)
  {
    day: 81,
    title: '10 phút shadow không dừng',
    category: 'SHADOW',
    suggestedMode: 'CHÂN',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'Thử thách ý chí và thể lực: Di chuyển liên tục không nghỉ trong suốt 10 phút.'
  },
  {
    day: 82,
    title: '100 quả clear + kiểm tra độ sâu',
    category: 'CLEAR',
    suggestedMode: 'TAY',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'Đảm bảo 100% các cú đánh đều đưa cầu vào khu vực 1 mét cuối sân đối phương.'
  },
  {
    day: 83,
    title: '60 quả smash, tập điểm tiếp xúc',
    category: 'SMASH',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'Đón điểm tiếp xúc cầu ở góc 1 giờ phía trên đầu, tạo độ cắm tối đa cho quả smash.'
  },
  {
    day: 84,
    title: '200 drive đổi forehand/backhand',
    category: 'DRIVE',
    suggestedMode: 'TAY',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'Tốc độ tạt cầu đỉnh cao, cổ tay phản xạ vô điều kiện không cần suy nghĩ.'
  },
  {
    day: 85,
    title: '100 quả giao cầu vào mục tiêu',
    category: 'SERVE',
    suggestedMode: 'TAY',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'Rèn sự điềm tĩnh và chính xác tuyệt đối ở thời khắc phát cầu mở màn trận đấu.'
  },
  {
    day: 86,
    title: 'Random 9 ô + split step + shadow shot',
    category: 'FOOTWORK',
    suggestedMode: 'TOÀN BỘ',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'Tổ hợp hoàn chỉnh: Split step $\\rightarrow$ bứt tốc $\\rightarrow$ vung vợt kỹ thuật $\\rightarrow$ hồi tâm nhanh.'
  },
  {
    day: 87,
    title: 'Net shot + net kill',
    category: 'NET',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'Làm chủ hoàn toàn khu vực tiền sân, biến lưới thành vũ khí ghi điểm kết liễu.'
  },
  {
    day: 88,
    title: 'Backhand toàn diện',
    category: 'DRIVE',
    suggestedMode: 'TAY',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'Thực hiện thuần thục: Backhand clear, Backhand drop và Backhand drive không tì vết.'
  },
  {
    day: 89,
    title: 'Phòng thủ → drive phản công',
    category: 'DRIVE',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'Chuyển hóa từ thế bị động sang chủ động chỉ bằng 1 cú tạt góc chết của sân đối phương.'
  },
  {
    day: 90,
    title: '🔥 Test 30 phút tổng hợp',
    category: 'TEST',
    suggestedMode: 'TOÀN BỘ',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'CỘT MỐC 90 NGÀY! Luyện tập liên tục 30 phút với cường độ thi đấu thực tế.',
    isSpecialTest: true
  },
  {
    day: 91,
    title: 'Footwork 8 góc × 10 lượt',
    category: 'FOOTWORK',
    suggestedMode: 'CHÂN',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'Bộ chân lướt sân nhẹ như bay, kiểm soát hoàn toàn không gian trên sân đấu.'
  },
  {
    day: 92,
    title: 'Shadow smash + recovery 100 lần',
    category: 'SMASH',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: '100 cú đập cầu chất lượng cao kết hợp hồi tâm tốc độ, rèn thể lực phi thường.'
  },
  {
    day: 93,
    title: 'Clear → smash → net',
    category: 'SHADOW',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'Combo 3 đòn tấn công hủy diệt ép đối thủ vào thế bế tắc hoàn toàn.'
  },
  {
    day: 94,
    title: 'Drive tốc độ cao 5 × 3 phút',
    category: 'DRIVE',
    suggestedMode: 'TAY',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'Thử thách sức bền cơ bắp tay ở tốc độ phản xạ chớp nhoáng.'
  },
  {
    day: 95,
    title: 'Random phản xạ 9 ô 150 lần',
    category: 'FOOTWORK',
    suggestedMode: 'TOÀN BỘ',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: '150 lần phản xạ cùng ứng dụng BadmintonPro ở tốc độ tối đa.'
  },
  {
    day: 96,
    title: 'Giao cầu + di chuyển + shadow cú 3',
    category: 'SERVE',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'Luyện bài bản quả thứ 3 sau khi giao cầu - chìa khóa vàng chiến thắng trong đánh đôi.'
  },
  {
    day: 97,
    title: 'Phòng thủ toàn sân bằng shadow',
    category: 'SHADOW',
    suggestedMode: 'TAY + CHÂN',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'Hóa giải mọi góc đánh hiểm của đối phương bằng bộ pháp phòng ngự kiên cố.'
  },
  {
    day: 98,
    title: 'Combo 5 kỹ thuật: giao → clear → smash → net → recovery',
    category: 'SHADOW',
    suggestedMode: 'TOÀN BỘ',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'Đồng bộ hoàn hảo 5 kỹ năng cốt lõi thành một dòng chảy vận động mượt mà.'
  },
  {
    day: 99,
    title: '🔥 Bài kiểm tra 100 ngày giả lập: random toàn sân',
    category: 'TEST',
    suggestedMode: 'TOÀN BỘ',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'SÁT NGÀY VỀ ĐÍCH! Bài tổng duyệt toàn sân mô phỏng 1 trận đấu căng thẳng 3 set.',
    isSpecialTest: true
  },
  {
    day: 100,
    title: '🏆 FINAL TEST: footwork + giao cầu + clear + drive + smash + net + phản xạ',
    category: 'TEST',
    suggestedMode: 'TOÀN BỘ',
    phaseNumber: 5,
    phaseName: 'Giai Đoạn 5: Thực Chiến Đỉnh Cao (Ngày 81 - 100)',
    description: 'CHÚC MỪNG BẠN ĐÃ CHINH PHỤC 100 NGÀY! Bài kiểm tra tốt nghiệp toàn diện mọi kỹ thuật để chính thức nâng tầm thành vận động viên bán chuyên!',
    isSpecialTest: true
  }
];
