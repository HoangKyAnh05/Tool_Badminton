import { GridPosition } from '../types';

export const BADMINTON_POSITIONS: GridPosition[] = [
  {
    id: 1,
    name: "Góc Lưới Trái (Net Left)",
    zoneName: "LƯỚI TRÁI",
    row: 1,
    col: 1,
    directionLabel: "Vị trí 1 - Góc lưới bên trái",
    courtZone: 'front',
    courtSide: 'left',
    handMovement: {
      title: "Chặt Lưới / Vắt Cầu Trái Tay (Backhand Net Slice)",
      subTitle: "Cổ tay thả lỏng, mặt vợt nghiêng 45°, miết nhẹ đầu quả cầu",
      description: "Thực hiện cú chạm cầu tinh tế sát mép lưới đối phương. Điểm tiếp xúc cao nhất có thể.",
      coachingTip: "Giữ cổ tay linh hoạt, ngón cái tì vào cạnh vát vợt để kiểm soát lực miết cầu lộn qua lưới."
    },
    footMovement: {
      title: "Bước Chéo Tới Lưới Trái (Forecourt Lunge Left)",
      subTitle: "Split-step trung tâm -> Bước đệm chân phải -> Chùng gối chân thuận",
      description: "Khởi đầu từ tâm sân, bật nhẹ split-step, bước chân phải hướng thẳng góc 10h, gót chạm đất trước rồi hạ mũi.",
      coachingTip: "Đầu gối chân trước không vượt quá mũi bàn chân, lưng giữ thẳng để hồi vị nhanh."
    },
    combinedMovement: {
      title: "Phối Hợp: Đỡ Cầu Sát Lưới Trái Tay & Hồi Vị",
      subTitle: "Lunge chân phải vươn dài + vẩy cổ tay trái chạm cầu + bật đẩy hồi tâm",
      description: "Đồng thời chân phải chạm đất thì vợt chạm cầu ở đỉnh lưới, ngay sau đó chân phải bật đẩy cơ thể lùi về vị trí sẵn sàng số 5.",
      coachingTip: "Đừng đứng nhìn cầu sau khi đánh; lực đẩy của chân trước chính là đà để hồi về tâm sân."
    }
  },
  {
    id: 2,
    name: "Lưới Giữa (Net Center)",
    zoneName: "LƯỚI GIỮA",
    row: 1,
    col: 2,
    directionLabel: "Vị trí 2 - Sát lưới trung tâm",
    courtZone: 'front',
    courtSide: 'center',
    handMovement: {
      title: "Vồ Cầu / Gõ Cầu Nhanh (Net Kill / Tap)",
      subTitle: "Động tác ngắn dứt khoát, dùng lực ngón tay gập vợt cắm xuống",
      description: "Bắt cầu nổi trên mép lưới. Giật vợt bằng các ngón tay để cầu cắm xuống nhanh, không chạm lưới.",
      coachingTip: "Tránh vung vợt biên độ rộng vì dễ bị lỗi vợt chạm lưới (net fault). Rút vợt lại ngay sau khi gõ."
    },
    footMovement: {
      title: "Bật Thẳng Lưới Giữa (Forward Direct Step)",
      subTitle: "Bước bật nhanh 1 nhịp bằng chân thuận tiếp cận sát T-junction",
      description: "Từ tâm sân lao thẳng lên chữ T lưới với 1 bước đệm và 1 bước với chân thuận dứt khoát.",
      coachingTip: "Hạ trọng tâm thấp để mắt nhìn ngang tầm mép lưới, chuẩn bị gõ cầu dứt điểm."
    },
    combinedMovement: {
      title: "Phối Hợp: Bắt Cầu Nổi Đỉnh Lưới & Phản Đòn",
      subTitle: "Lao dứt khoát lên chữ T + gõ nhanh mũi vợt + giơ vợt chặn tiếp",
      description: "Đón lõng pha cầu đối phương trả non, lao lên gõ cầu cắm thẳng xuống đất đối thủ.",
      coachingTip: "Cực kỳ dứt khoát, sau khi gõ vẫn giơ cao đầu vợt đề phòng đối thủ thủ được."
    }
  },
  {
    id: 3,
    name: "Góc Lưới Phải (Net Right)",
    zoneName: "LƯỚI PHẢI",
    row: 1,
    col: 3,
    directionLabel: "Vị trí 3 - Góc lưới bên phải",
    courtZone: 'front',
    courtSide: 'right',
    handMovement: {
      title: "Kéo Lưới Thuận Tay (Forehand Net Shot)",
      subTitle: "Vợt mở đón cầu sớm, miết nhẹ hoặc đẩy thẳng góc chữ A",
      description: "Tiếp xúc cầu bằng mặt vợt thuận tay, đẩy góc ngắn hoặc kéo chéo lưới đánh lừa đối thủ.",
      coachingTip: "Mở khuỷu tay vừa phải, lực chủ yếu từ ngón trỏ và ngón cái bóp nhẹ cán vợt."
    },
    footMovement: {
      title: "Bước Lunge Thuận Tay Lưới Phải (Forecourt Lunge Right)",
      subTitle: "Split-step -> Xoay hông -> Bước dài chân phải hướng góc 2h",
      description: "Chân phải bước sải dài hướng góc 2 giờ, tay không cầm vợt mở ra sau giữ thăng bằng tối ưu.",
      coachingTip: "Chân trụ sau giữ thẳng làm đòn bẩy, mắt tập trung cao độ vào quả cầu."
    },
    combinedMovement: {
      title: "Phối Hợp: Đẩy Cầu Chéo Lưới Thuận Tay & Rút Về",
      subTitle: "Bước sải dài góc phải + kéo cầu lộn lưới + đẩy chân thu về trung tâm",
      description: "Thực hiện pha gài cầu lưới cực hiểm sang góc chữ A, đẩy đối thủ vào thế bị động.",
      coachingTip: "Chạm cầu khi quả cầu vừa nhô khỏi mép lưới sẽ khiến đối phương bất ngờ nhất."
    }
  },
  {
    id: 4,
    name: "Trung Tâm Trái (Midcourt Left)",
    zoneName: "TRUNG TÂM TRÁI",
    row: 2,
    col: 1,
    directionLabel: "Vị trí 4 - Ngang hông bên trái",
    courtZone: 'mid',
    courtSide: 'left',
    handMovement: {
      title: "Thủ Smash Trái Tay / Tạt Nhanh (Backhand Drive / Defense)",
      subTitle: "Ngón cái tì cạnh lớn, đẩy mặt vợt phẳng phản tạt qua lưới",
      description: "Đón các pha đập cầu hoặc tạt cầu nhanh của đối phương vào hông trái. Đẩy cầu sâu hoặc bỏ nhỏ.",
      coachingTip: "Không vung vợt ra sau; giơ vợt trước người và dùng lực ngón cái búng ra trước."
    },
    footMovement: {
      title: "Bước Trượt Ngang Trái (Sideways Shuffle Left)",
      subTitle: "Bước đệm ngang 1 nhịp sang trái, hạ thấp gối thủ đập",
      description: "Trọng tâm chùng thấp, hai chân rộng hơn vai, thân người hơi đổ về trước đón cầu cắm.",
      coachingTip: "Đừng đứng thẳng lưng; trọng tâm thấp giúp mắt dễ theo dõi đường cầu đi với tốc độ 300km/h."
    },
    combinedMovement: {
      title: "Phối Hợp: Chặn Đứng Cú Smash & Phản Tạt Chéo Sân",
      subTitle: "Chùng gối đón cú đập + tì ngón cái búng vợt đổi hướng cầu",
      description: "Hóa giải pha tấn công uy lực của đối thủ thành đường phản công cầu đi vào góc trống.",
      coachingTip: "Thả lỏng cổ tay đến mili-giây cuối cùng mới siết tay siết lực đổi hướng."
    }
  },
  {
    id: 5,
    name: "Trung Tâm Giữa (Center / Base Court)",
    zoneName: "TRUNG TÂM GIỮA",
    row: 2,
    col: 2,
    directionLabel: "Vị trí 5 - Tâm sân / Tư thế chuẩn bị",
    courtZone: 'mid',
    courtSide: 'center',
    handMovement: {
      title: "Tư Thế Sẵn Sàng Cơ Bản (Ready Stance / Guard)",
      subTitle: "Vợt giơ cao ngang ngực, đầu vợt chúc nhẹ 15°, hai tay thả lỏng",
      description: "Vị trí phòng thủ và tấn công then chốt. Luôn sẵn sàng phản ứng tới mọi hướng trong 0.2s.",
      coachingTip: "Cán vợt cầm lỏng để sẵn sàng đổi sang grip thuận tay hoặc trái tay tức thì."
    },
    footMovement: {
      title: "Nhún Split-Step Nhịp Điệu (Rhythmic Split-Step)",
      subTitle: "Bật nhẹ tách hai chân bằng 2 mũi chân ngay khi đối phương chạm cầu",
      description: "Động tác kích hoạt cơ bắp thiết yếu của mọi VĐV đỉnh cao. Tích trữ lực đàn hồi cơ bắp để lao đi.",
      coachingTip: "Bật đúng thời điểm đối thủ chạm vợt vào cầu; không tiếp đất bằng cả bàn chân."
    },
    combinedMovement: {
      title: "Phối Hợp: Reset Vị Trí Vàng Tâm Sân & Đọc Cầu",
      subTitle: "Hồi vị về ô số 5 + split-step nhún nhịp nhàng + giơ vợt quét 360°",
      description: "Sau mỗi pha cầu, nhanh chóng di chuyển về ô 5 để bao quát toàn bộ 8 vị trí còn lại trên sân.",
      coachingTip: "Người làm chủ được vị trí số 5 là người làm chủ 80% thế trận trên sân cầu."
    }
  },
  {
    id: 6,
    name: "Trung Tâm Phải (Midcourt Right)",
    zoneName: "TRUNG TÂM PHẢI",
    row: 2,
    col: 3,
    directionLabel: "Vị trí 6 - Ngang hông bên phải",
    courtZone: 'mid',
    courtSide: 'right',
    handMovement: {
      title: "Tạt Cầu / Bung Cầu Thuận Tay (Forehand Drive / Block)",
      subTitle: "Gập cẳng tay nhanh, đón cầu trước mặt, tạt cầu sát mép lưới",
      description: "Bắt những pha cầu ngang lưới tốc độ cao bên phải. Đẩy cầu ép đối thủ phải lùi bước.",
      coachingTip: "Cổ tay khoá chắc lúc tiếp xúc, mặt vợt đi hơi chếch xuống để cầu không bị bổng."
    },
    footMovement: {
      title: "Bước Trượt Ngang Phải (Sideways Shuffle Right)",
      subTitle: "Bật nhả chân trái, chân phải trượt nhanh 1 bước dài sang mạn sườn phải",
      description: "Di chuyển ngang nhanh như chớp, mở hông phải đón đường cầu bắn thẳng vào mạn sườn.",
      coachingTip: "Chân phải trụ vững để hấp thu lực dội và bật ngược lại tâm sân."
    },
    combinedMovement: {
      title: "Phối Hợp: Đỡ Smash Bung Cao Sâu Về Cuối Sân",
      subTitle: "Hạ tấn đón cầu góc phải + búng cẳng tay bung cầu vút lên cao sát vạch đáy",
      description: "Chuyển từ thế bị đối phương đập dồn dập sang thế câu giờ tái lập vị trí phòng ngự vững chắc.",
      coachingTip: "Độ cao của đường cầu cứu nguy sẽ giúp bạn có đủ thời gian quay về ô số 5."
    }
  },
  {
    id: 7,
    name: "Cuối Sân Trái (Rear Left)",
    zoneName: "CUỐI SÂN TRÁI",
    row: 3,
    col: 1,
    directionLabel: "Vị trí 7 - Góc sâu cuối sân bên trái",
    courtZone: 'rear',
    courtSide: 'left',
    handMovement: {
      title: "Vòng Đầu Đập Cầu / Trái Tay Sâu (Round-the-Head / Backhand Clear)",
      subTitle: "Uốn lượn thân người đánh vòng qua đầu hoặc xoay lưng búng trái tay",
      description: "Xử lý pha cầu bổng sâu bên góc trái. Vận dụng kỹ thuật Round-The-Head để giữ thế chủ động tấn công.",
      coachingTip: "Xoay vai sớm, điểm tiếp xúc cầu phải nằm chếch trước trán bên trái."
    },
    footMovement: {
      title: "Bật Lùi Chéo Góc Trái (Backward Chassé & Scissor Kick)",
      subTitle: "Bật chassé lùi 2 bước chéo -> Chân trái trụ bật đổi chân trên không",
      description: "Xoay thân 90 độ, chạy lùi nhanh về góc 7h, bật nhảy đánh cầu và đổi chân hạ cánh.",
      coachingTip: "Không vừa đi lùi vừa nhìn ngược; phải xoay thân chạy bước chéo để đạt tốc độ tối đa."
    },
    combinedMovement: {
      title: "Phối Hợp: Nhảy Vòng Đầu Đập Cầu Chéo Sân Uy Lực",
      subTitle: "Lùi nhanh góc trái + bật nhảy xoay hông dập nát góc trống đối thủ",
      description: "Tận dụng góc Round-the-Head để tung ra cú smash chéo sân bất ngờ hạ gục đối thủ.",
      coachingTip: "Gập bụng mạnh khi phát lực để quả cầu đi cắm và dốc thẳng xuống sàn."
    }
  },
  {
    id: 8,
    name: "Cuối Sân Giữa (Rear Center)",
    zoneName: "CUỐI SÂN GIỮA",
    row: 3,
    col: 2,
    directionLabel: "Vị trí 8 - Đáy sân chính giữa",
    courtZone: 'rear',
    courtSide: 'center',
    handMovement: {
      title: "Smash Thẳng / Bỏ Nhỏ Chặt Cầu (Straight Smash / Fast Drop)",
      subTitle: "Vươn hết tầm cánh tay, đánh vào tâm cầu hướng cắm xuống giữa sân",
      description: "Cơ hội tấn công dứt điểm khi đối phương trả cầu bổng ngắn giữa sân.",
      coachingTip: "Thả lỏng cánh tay như động tác quất roi; siết chặt cơ tay đúng khoảnh khắc chạm cầu."
    },
    footMovement: {
      title: "Lùi Thẳng & Bật Nhảy Đôi Chân (Straight Backpedal & Jump)",
      subTitle: "Bước đuổi lùi nhanh 2 nhịp -> Dậm nhảy 2 chân bằng sức bật bắp chân",
      description: "Lùi thẳng tắp về vạch đáy, dậm nhảy tại chỗ đạt độ cao tối đa để bắt cầu ở điểm rơi cao nhất.",
      coachingTip: "Bật cao giúp góc đánh dốc hơn và đường bay ngắn hơn 30% so với đánh chạm đất."
    },
    combinedMovement: {
      title: "Phối Hợp: Bật Nhảy Smash Uy Lực 300km/h Giữa Sân",
      subTitle: "Lùi vạch đáy + bật nhảy hết tầm + vung roi smash dội lửa",
      description: "Cú smash uy lực bậc nhất trong cầu lông hiện đại, kết liễu pha cầu ngay tức thì.",
      coachingTip: "Tiếp đất cân bằng bằng cả hai chân chùng gối để bảo vệ khớp gối và hồi vị."
    }
  },
  {
    id: 9,
    name: "Cuối Sân Phải (Rear Right)",
    zoneName: "CUỐI SÂN PHẢI",
    row: 3,
    col: 3,
    directionLabel: "Vị trí 9 - Góc sâu cuối sân bên phải",
    courtZone: 'rear',
    courtSide: 'right',
    handMovement: {
      title: "Phông Cầu Cao Sâu / Cắt Cầu Chém Gió (Forehand Clear / Slice Drop)",
      subTitle: "Mở rộng cung vai, tiếp xúc đỉnh đầu, vung vợt theo quán tính qua hông trái",
      description: "Bung đường cầu bay cao sâu sát vạch đáy đối phương hoặc miết mặt vợt cắt cầu bỏ nhỏ góc lưới.",
      coachingTip: "Dùng đà xoay của cả trục thân trên (hông và vai) thay vì chỉ gồng cơ bắp tay."
    },
    footMovement: {
      title: "Bước Chạy Lùi Thuận Tay (Forehand Rear Court Footwork)",
      subTitle: "Xoay hông phải -> Chạy bước đuổi 2-3 nhịp -> Chân phải hạ trụ sâu",
      description: "Xoay vai nghiêng 90 độ, lùi nhanh về góc 4h, chân phải đặt sau tích lực cho cú đánh.",
      coachingTip: "Mũi chân phải mở hướng chếch ra góc sân để khóa khớp gối vững chãi khi phát lực."
    },
    combinedMovement: {
      title: "Phối Hợp: Phông Cầu Cao Sâu & Chạy Đà Về Trung Tâm",
      subTitle: "Chân phải đạp đà phát lực + vung phông sâu vạch đáy + sải bước lướt về ô 5",
      description: "Giải tỏa áp lực góc phải cuối sân, đưa đối phương lùi sâu và chủ động tái chiếm tâm sân.",
      coachingTip: "Ngay khi chân trái tiếp đất sau quả đánh, lập tức đẩy chân lao về ô số 5."
    }
  }
];

export function getPositionById(id: number): GridPosition {
  const pos = BADMINTON_POSITIONS.find(p => p.id === id);
  if (!pos) {
    return BADMINTON_POSITIONS[4]; // Fallback to center position 5
  }
  return pos;
}
