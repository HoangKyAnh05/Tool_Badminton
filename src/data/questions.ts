import { TheoryQuestion } from '../types';

export const BADMINTON_QUESTIONS: TheoryQuestion[] = [
  {
    id: 1,
    category: 'Chiến thuật',
    difficulty: 'Cơ bản',
    question: 'Đối thủ đánh cầu vào góc trái cuối sân. Bạn đang ở vị trí trung tâm (ô 5). Bạn nên xử lý như thế nào?',
    options: [
      { id: 'A', text: 'Chạy thẳng lùi quay lưng lại lưới rồi đánh bừa' },
      { id: 'B', text: 'Xoay hông, chạy bước chéo (chassé) lùi góc trái, đánh cú Round-the-Head hoặc phông sâu' },
      { id: 'C', text: 'Đứng yên tại chỗ chờ cầu rơi xuống thấp ngang gối mới vung vợt' },
      { id: 'D', text: 'Lao thẳng lên lưới bắt bài bỏ nhỏ' }
    ],
    correctAnswer: 'B',
    explanation: 'Khi đối thủ ép cầu góc sâu trái, kỹ thuật tối ưu là xoay hông, di chuyển bước chéo để đón cầu ở vị trí cao nhất, thực hiện cú Round-the-Head ép lại đối thủ hoặc phông sâu giải tỏa áp lực.',
    contextTip: 'Xoay vai sớm giúp mắt luôn khóa mục tiêu và không bị mất phương hướng.'
  },
  {
    id: 2,
    category: 'Đánh đôi',
    difficulty: 'Trung bình',
    question: 'Trong đánh đôi nam, khi đồng đội của bạn ở sân sau tung cú ĐẬP CẦU (smash) uy lực, vị trí chuẩn của bạn ở trên lưới là gì?',
    options: [
      { id: 'A', text: 'Đứng sát vạch biên bên phải ngắm nhìn đường cầu' },
      { id: 'B', text: 'Lùi về đứng song song ngang hàng với đồng đội ở vạch đáy' },
      { id: 'C', text: 'Đứng khu vực chữ T trên lưới, giơ cao vợt sẵn sàng vồ cầu hoặc gõ cầu khi đối phương thủ non' },
      { id: 'D', text: 'Quay đầu nhìn ra sau xem đồng đội đập trúng hay hụt' }
    ],
    correctAnswer: 'C',
    explanation: 'Trong thế trận tấn công đôi (trước - sau), người đứng lưới phải ôm sát khu vực chữ T, giơ vợt ngang tầm mắt để săn các quả đỡ non hoặc phản tạt của đối thủ, bịt kín đường thoát cầu.',
    contextTip: 'Tuyệt đối không quay đầu nhìn người đập phía sau vì nguy cơ chấn thương mắt rất cao!'
  },
  {
    id: 3,
    category: 'Phòng thủ',
    difficulty: 'Cơ bản',
    question: 'Khi đối thủ chuẩn bị đập cầu cắm dốc, tư thế phòng thủ nào là chính xác nhất?',
    options: [
      { id: 'A', text: 'Đứng thẳng lưng, hai chân khép sát nhau, hạ vợt xuống dưới háng' },
      { id: 'B', text: 'Hạ thấp trọng tâm, hai chân rộng hơn vai, vợt giơ trước ngực, mắt tập trung vào điểm tiếp xúc cầu của đối thủ' },
      { id: 'C', text: 'Ngồi hẳn xuống sàn thi đấu để tránh cầu bay vào mặt' },
      { id: 'D', text: 'Nhảy liên tục tại chỗ để tạo áp lực tâm lý' }
    ],
    correctAnswer: 'B',
    explanation: 'Hạ thấp trọng tâm giúp tầm mắt gần với quỹ đạo cầu bay, hai chân rộng hơn vai tạo đà bật sang 2 bên, giơ vợt phía trước giúp búng cổ tay đón cầu trước khi cầu cắm xuống sàn.',
    contextTip: 'Cán vợt cầm lỏng để sẵn sàng bung lực ngón tay đổi góc đỡ cầu sang góc xa đối thủ.'
  },
  {
    id: 4,
    category: 'Footwork',
    difficulty: 'Trung bình',
    question: 'Kỹ thuật "Split-step" (nhún bật tách chân) trong cầu lông có mục đích chính là gì?',
    options: [
      { id: 'A', text: 'Để nhảy ăn mừng sau khi ghi điểm' },
      { id: 'B', text: 'Tích lũy thế năng đàn hồi của cơ bắp, giúp bứt tốc về bất kỳ hướng nào nhanh nhất ngay khi đối thủ chạm cầu' },
      { id: 'C', text: 'Làm đối thủ giật mình mất tập trung' },
      { id: 'D', text: 'Giúp đôi giày thi đấu ma sát tốt hơn với mặt sân thảm' }
    ],
    correctAnswer: 'B',
    explanation: 'Split-step là chìa khóa của bộ chân di chuyển. Nhún bật nhẹ bằng 2 mũi chân đúng tích tắc đối thủ đánh cầu kích hoạt phản xạ cơ bắp, triệt tiêu quán tính đứng yên giúp lao đi cực nhanh.',
    contextTip: 'Thời điểm vàng: nhún bật ngay khoảnh khắc mặt vợt đối thủ tiếp xúc trái cầu.'
  },
  {
    id: 5,
    category: 'Đánh đơn',
    difficulty: 'Nâng cao',
    question: 'Trong đánh đơn, khi nhận thấy thể lực của đối thủ đang giảm sút rõ rệt, chiến thuật 4 góc sân nào hiệu quả nhất?',
    options: [
      { id: 'A', text: 'Liên tục đánh cầu vào đúng vị trí giữa ngực đối thủ' },
      { id: 'B', text: 'Đập cầu liên tục dù ở bất kỳ tư thế nào dù bị mất thăng bằng' },
      { id: 'C', text: 'Điều cầu liên tục luân phiên 2 góc lưới và 2 góc cuối sân (chiến thuật ép 4 góc) để đối thủ phải chạy quãng đường dài nhất' },
      { id: 'D', text: 'Cố tình đánh cầu ra ngoài biên để nghỉ giải lao' }
    ],
    correctAnswer: 'C',
    explanation: 'Chiến thuật điều cầu 4 góc ép đối thủ phải liên tục thay đổi trọng tâm từ trước ra sau, từ trái sang phải, nhanh chóng vắt kiệt thể lực và dẫn tới những pha trả cầu hỏng hoặc non.',
    contextTip: 'Kết hợp đường cầu cao sâu sát vạch đáy và bỏ nhỏ sát mép lưới đối phương.'
  },
  {
    id: 6,
    category: 'Vị trí sân',
    difficulty: 'Cơ bản',
    question: 'Sau khi thực hiện một cú bỏ nhỏ sát lưới bên trái, bạn nên di chuyển như thế nào?',
    options: [
      { id: 'A', text: 'Đứng yên sát lưới ngắm xem cầu có rơi vào sân không' },
      { id: 'B', text: 'Ngay lập tức dùng chân trước bật đẩy cơ thể rút về vị trí trung tâm (ô số 5) trong tư thế sẵn sàng' },
      { id: 'C', text: 'Chạy hẳn về góc cuối sân đối diện' },
      { id: 'D', text: 'Ngồi xuống buộc lại dây giày' }
    ],
    correctAnswer: 'B',
    explanation: 'Quy tắc vàng trong cầu lông: Sau mỗi cú đánh phải lập tức hồi vị về tâm sân (base position) để bao quát 360 độ các góc sân, tránh bị đối thủ khai thác khoảng trống.',
    contextTip: 'Chân bước lên lưới chính là chân tạo lực đẩy bật cơ thể lùi về.'
  },
  {
    id: 7,
    category: 'Tấn công',
    difficulty: 'Trung bình',
    question: 'Cú "Smash chéo sân" (Cross-court Smash) nguy hiểm nhất nhưng có nhược điểm chí mạng nào cần lưu ý?',
    options: [
      { id: 'A', text: 'Quả cầu bay với tốc độ quá nhanh làm đứt lưới' },
      { id: 'B', text: 'Quãng đường cầu bay dài hơn đập thẳng, và nếu đối thủ chặn thẳng lại góc lưới thì bản thân người đập sẽ khó cứu kịp do sân trống rất rộng' },
      { id: 'C', text: 'Trọng tài không nhìn thấy điểm rơi của cầu' },
      { id: 'D', text: 'Dễ bị gió thổi lệch đường bay trong nhà thi đấu kín' }
    ],
    correctAnswer: 'B',
    explanation: 'Đường chéo sân dài hơn đường thẳng, cho đối thủ thêm thời gian phản xạ. Nếu đối phương chặn thẳng cầu dọc dây (line), khoảng trống sân của bên tấn công bị hở rất lớn.',
    contextTip: 'Chỉ nên smash chéo sân khi đối thủ đã bị hút người lệch hẳn sang một bên sân.'
  },
  {
    id: 8,
    category: 'Đọc hướng cầu',
    difficulty: 'Nâng cao',
    question: 'Khi quan sát đối thủ giơ vợt chuẩn bị đánh cầu bổng cuối sân, dấu hiệu nào cho thấy họ sắp thực hiện cú "Bỏ nhỏ cắt cầu" (Drop shot) thay vì Phông cầu (Clear)?',
    options: [
      { id: 'A', text: 'Đối thủ nhắm mắt khi vung vợt' },
      { id: 'B', text: 'Đối thủ vung vợt với tốc độ tối đa nhưng gồng cứng cánh tay' },
      { id: 'C', text: 'Động tác chuẩn bị giống như đập/phông, nhưng điểm tiếp xúc cầu trễ hơn một chút và mặt vợt miết nhẹ nghiêng qua quả cầu thay vì phát lực vuông góc' },
      { id: 'D', text: 'Đối thủ lùi sâu ra ngoài đường biên' }
    ],
    correctAnswer: 'C',
    explanation: 'Cú drop shot đẳng cấp luôn có động tác chuẩn bị giống hệt smash/clear (đánh lừa), nhưng tại khoảnh khắc tiếp xúc, mặt vợt nghiêng chém vào lông cầu để giảm lực và tạo độ lượn.',
    contextTip: 'Quan sát mặt vợt và âm thanh chạm cầu: tiếng cắt cầu thường "xoẹt" êm hơn tiếng nổ đanh của cú clear.'
  },
  {
    id: 9,
    category: 'Phản xạ',
    difficulty: 'Cơ bản',
    question: 'Trong những pha đấu tạt cầu nhanh (Drive) ở cự ly trung bình, cách cầm cán vợt (Grip) chuẩn nhất là:',
    options: [
      { id: 'A', text: 'Cầm tít dưới đáy chuôi vợt thật chặt không thể xoay vợt' },
      { id: 'B', text: 'Dịch tay cầm lên gần cổ vợt hơn một chút, các ngón tay thả lỏng để dễ dàng đổi mặt vợt nhanh giữa thuận và trái tay' },
      { id: 'C', text: 'Chỉ dùng 2 ngón tay kẹp cán vợt' },
      { id: 'D', text: 'Cầm ngược đầu vợt' }
    ],
    correctAnswer: 'B',
    explanation: 'Cầm vợt ngắn hơn (lên sát chóp cán) làm giảm mô men quán tính, giúp vung vợt phản xạ nhanh hơn trong các pha đôi công tốc độ cao mạn sườn.',
    contextTip: 'Ngón cái linh hoạt tì mặt dẹt khi đánh trái tay, ngón trỏ móc giữ khi đánh thuận tay.'
  },
  {
    id: 10,
    category: 'Đánh đôi',
    difficulty: 'Trung bình',
    question: 'Trong đánh đôi, khi đội bạn buộc phải bung cầu cao sâu (Lift) lên trời cho đối phương tấn công, đội hình phòng thủ cần chuyển sang thế nào?',
    options: [
      { id: 'A', text: 'Một người đứng trước một người đứng sau' },
      { id: 'B', text: 'Cả hai người cùng chạy về góc trái để bảo vệ góc yếu' },
      { id: 'C', text: 'Chuyển sang đội hình Song Song (Side-by-Side), mỗi người phụ trách một nửa sân dọc từ lưới về đáy' },
      { id: 'D', text: 'Cả hai cùng nhảy lên vồ cầu giữa không trung' }
    ],
    correctAnswer: 'C',
    explanation: 'Quy tắc bất biến trong đánh đôi: Tấn công thì đứng Trước - Sau (Front - Back); Phòng thủ thì đứng Song Song (Side by Side) để chia đều diện tích đỡ smash.',
    contextTip: 'Người đứng bên phía cầu bay sẽ đứng lùi sâu hơn người bên đối diện một chút để đón góc đập thẳng.'
  },
  {
    id: 11,
    category: 'Chiến thuật',
    difficulty: 'Trung bình',
    question: 'Khi đối phương có quả đập (Smash) cực mạnh, chiến thuật đối phó nào sau đây là khôn ngoan nhất?',
    options: [
      { id: 'A', text: 'Liên tục bung cầu bổng ngắn vào giữa sân cho họ đập tiếp' },
      { id: 'B', text: 'Hạn chế nâng cầu bổng; chủ động đánh cầu phẳng thấp ngang mép lưới, đẩy cầu vào góc lưới hoặc gài cầu sát chân' },
      { id: 'C', text: 'Bỏ vị trí để đối thủ đập ra ngoài' },
      { id: 'D', text: 'Đứng sát vạch lưới để dùng ngực chặn cầu' }
    ],
    correctAnswer: 'B',
    explanation: 'Không ai có thể đập cầu nếu quả cầu bay dưới mép lưới. Đánh cầu đè mép lưới, tạt phẳng hoặc bỏ nhỏ sẽ vô hiệu hóa hoàn toàn vũ khí smash của đối thủ.',
    contextTip: 'Ép đối phương phải nâng cầu (lift), lúc đó quyền tấn công sẽ thuộc về bạn.'
  },
  {
    id: 12,
    category: 'Di chuyển',
    difficulty: 'Cơ bản',
    question: 'Khi bước lunge lên góc lưới phải để đỡ cầu, chân nào sẽ là chân bước dài chạm đất cuối cùng?',
    options: [
      { id: 'A', text: 'Chân không thuận' },
      { id: 'B', text: 'Chân cùng bên với tay cầm vợt (chân thuận)' },
      { id: 'C', text: 'Tiếp đất bằng cả hai đầu gối cùng lúc' },
      { id: 'D', text: 'Chân trái xoay 180 độ ra sau' }
    ],
    correctAnswer: 'B',
    explanation: 'Với người thuận tay phải, chân phải luôn là chân sải dài lên phía trước. Gót chân phải chạm sàn trước, mũi chân hướng góc cầu, tạo thế kiềng vững chắc.',
    contextTip: 'Tay trái mở rộng ra sau như cánh chim để giữ trọng tâm thăng bằng tuyệt đối.'
  },
  {
    id: 13,
    category: 'Chiến thuật',
    difficulty: 'Nâng cao',
    question: 'Điểm mù (tử huyệt) khó xử lý nhất trên người của một VĐV cầu lông khi bị tấn công là vị trí nào?',
    options: [
      { id: 'A', text: 'Đỉnh đầu cao hơn tầm với' },
      { id: 'B', text: 'Khu vực hông bên tay cầm vợt (Racket Hip) và giữa ngực/mặt' },
      { id: 'C', text: 'Hai góc xa ngoài sân' },
      { id: 'D', text: 'Mũi giày chân sau' }
    ],
    correctAnswer: 'B',
    explanation: 'Cầu cắm thẳng vào hông bên tay cầm vợt khiến người đỡ bị kẹt tay: dùng thuận tay thì hẹp góc xoay cổ tay, chuyển trái tay thì không kịp thời gian đổi grip.',
    contextTip: 'Tận dụng cú smash thẳng người (Body Smash) vào hông phải đối thủ để ghi điểm trực tiếp.'
  },
  {
    id: 14,
    category: 'Footwork',
    difficulty: 'Nâng cao',
    question: 'Động tác bật đổi chân "Scissor Kick" (nhảy cắt kéo) ở cuối sân mang lại lợi thế vượt trội nào?',
    options: [
      { id: 'A', text: 'Tạo tiếng động lớn dọa đối thủ' },
      { id: 'B', text: 'Đổi trọng tâm từ chân sau sang chân trước ngay trên không, biến lực rơi thành đà lao ngược về tâm sân ngay khi tiếp đất' },
      { id: 'C', text: 'Giúp bay qua đầu trọng tài biên' },
      { id: 'D', text: 'Giảm 50% trọng lượng cơ thể' }
    ],
    correctAnswer: 'B',
    explanation: 'Scissor Kick cho phép người đánh tung cú đánh uy lực ở vạch đáy đồng thời hoán đổi vị trí hai chân trên không, giúp chân trước tiếp đất là đòn bẩy lao về tâm sân ngay tức thì.',
    contextTip: 'Tiếp đất nhẹ nhàng bằng mũi bàn chân, gối hơi chùng để triệt tiêu chấn động.'
  },
  {
    id: 15,
    category: 'Đánh đôi',
    difficulty: 'Cơ bản',
    question: 'Khi đối thủ thực hiện cú giao cầu ngắn (Short Serve), người nhận giao cầu nên có tâm lý và tư thế thế nào?',
    options: [
      { id: 'A', text: 'Đứng sát vạch đáy chờ cầu rơi xuống đất' },
      { id: 'B', text: 'Đứng áp sát vạch giao cầu trước, chân thuận phía trước, giơ vợt ngang đỉnh lưới đe dọa vồ cầu' },
      { id: 'C', text: 'Ngồi xổm xuống đất' },
      { id: 'D', text: 'Quay mặt đi hướng khác để giả vờ không chuẩn bị' }
    ],
    correctAnswer: 'B',
    explanation: 'Áp sát vạch chữ T với cây vợt giơ cao tạo áp lực tâm lý khủng khiếp lên người giao cầu, buộc họ phải giao cầu bổng hoặc run tay giao lỗi chạm lưới.',
    contextTip: 'Tuy nhiên vẫn phải giữ trọng tâm có thể bật lùi nếu đối phương bất ngờ giao cầu dài (Flick serve).'
  }
];
