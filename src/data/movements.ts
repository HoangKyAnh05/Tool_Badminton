import { GridPosition } from '../types';

export const BADMINTON_POSITIONS: GridPosition[] = [
  // ==========================================
  // Ô 1: GÓC LƯỚI TRÁI (FRONT LEFT)
  // ==========================================
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
    },
    variations: [
      {
        id: "pos1_var1",
        shotName: "Gài Lưới / Nhỏ Cầu Trái Tay (Net Spin/Slice)",
        shotType: "Bỏ nhỏ sát lưới",
        handMovement: {
          title: "Chặt Lưới / Vắt Cầu Trái Tay (Backhand Net Slice)",
          subTitle: "Cổ tay thả lỏng, mặt vợt nghiêng 45°, miết nhẹ đầu quả cầu",
          description: "Thực hiện cú chạm cầu tinh tế sát mép lưới đối phương. Điểm tiếp xúc cao nhất có thể.",
          coachingTip: "Giữ cổ tay linh hoạt, ngón cái tì vào cạnh vát vợt để kiểm soát lực miết cầu lộn qua lưới."
        },
        footMovement: {
          title: "Bước Chéo Tới Lưới Trái (Forecourt Lunge Left)",
          subTitle: "Split-step trung tâm -> Bước đệm chân phải -> Chùng gối chân thuận",
          description: "Khởi đầu từ tâm sân, bật nhẹ split-step, bước chân phải hướng thẳng góc 10h, gót chạm đất trước.",
          coachingTip: "Đầu gối chân trước không vượt quá mũi bàn chân, lưng giữ thẳng để hồi vị nhanh."
        },
        combinedMovement: {
          title: "Gài Lưới Trái Tay Tinh Tế & Hồi Tâm",
          subTitle: "Lunge chân phải vươn dài + miết cổ tay chạm cầu + bật đẩy lùi về tâm",
          description: "Chân phải chạm đất đồng thời mặt vợt cắt chéo đầu quả cầu cho rơi sát mép lưới bên kia, lập tức rút chân hồi vị.",
          coachingTip: "Lực miết bóng rất nhẹ, điểm rơi bóng càng sát vạch lưới càng làm đối thủ khó cứu."
        }
      },
      {
        id: "pos1_var2",
        shotName: "Vồ Cầu / Chụp Lưới Góc Trái (Backhand Net Kill)",
        shotType: "Vồ cầu dứt điểm",
        handMovement: {
          title: "Vồ Cầu / Bắt Lưới Trái Tay Chớp Nhoáng",
          subTitle: "Đón cầu ngay trên đỉnh lưới, cổ tay giật nhanh dứt khoát",
          description: "Đón lõng pha cầu đối phương trả non nổi trên mép lưới, gập cổ tay dùng lực ngón tay ấn cắm cầu xuống sàn.",
          coachingTip: "Biên độ vung vợt thật ngắn, ngón cái tì thẳng vào gáy cán vợt giật dứt điểm."
        },
        footMovement: {
          title: "Bứt Tốc Lao Lưới Trái (Explosive Forward Lunge)",
          subTitle: "Bật nhịp chân trái phóng dài chân phải lao vào góc lưới",
          description: "Tăng tốc cực đại từ tâm sân, sải chân dài đón cầu tại thời điểm bóng vừa nhô qua mép lưới.",
          coachingTip: "Hạ thấp vai để mắt ngang tầm lưới, quan sát rõ ràng góc cắm của quả cầu."
        },
        combinedMovement: {
          title: "Vồ Cầu Dứt Điểm Góc Lưới Trái",
          subTitle: "Lao dũng mãnh + gõ cắm quả cầu + giơ vợt chặn tiếp",
          description: "Vừa lướt tới là gõ cắm thẳng quả cầu xuống đất đối thủ, ngay sau đó giơ vợt trước ngực đề phòng phản xạ thủ.",
          coachingTip: "Cực kỳ cảnh giác lỗi chạm lưới (net fault), đánh xong thu vợt lại tức thì."
        }
      },
      {
        id: "pos1_var3",
        shotName: "Hất Cầu Bổng Sâu Chéo Góc (Backhand Cross Net Lift)",
        shotType: "Hất cầu bổng sâu",
        handMovement: {
          title: "Hất Cầu Bổng Trái Tay Chéo Sân",
          subTitle: "Mở mặt vợt từ dưới lên, bung hết lực cẳng tay và cổ tay",
          description: "Đổi hướng từ thế bị ép sát lưới, bung cầu cao vọt qua đầu đối thủ về tận góc 9 phía sau.",
          coachingTip: "Mặt vợt ngửa khoảng 60°, vung tay theo hình vòng cung từ dưới lên trên qua vai."
        },
        footMovement: {
          title: "Lunge Sâu Đỡ Cầu Sát Sàn (Deep Low Lunge)",
          subTitle: "Chùng sâu gối chân phải cứu cầu khi bóng đã rơi dưới mép lưới",
          description: "Khi đối thủ bỏ nhỏ hiểm, người phải hạ thật thấp, chân trái duỗi dài làm trụ hãm quán tính.",
          coachingTip: "Tránh chúi đầu về phía trước; giữ lưng nghiêng nhẹ để có lực vung vợt lên cao."
        },
        combinedMovement: {
          title: "Cứu Cầu Sát Sàn & Hất Đổi Hướng Chéo Góc",
          subTitle: "Lunge sâu đón cầu + bung lực hất cao sâu + bật người chạy lùi",
          description: "Cứu quả cầu đang rơi sát mặt đất, hất bổng chéo góc 9 đối phương để đảo ngược thế trận bị động.",
          coachingTip: "Sau cú hất bổng bạn có đủ thời gian để lùi về tâm sân chuẩn bị phòng thủ đập cầu."
        }
      }
    ]
  },

  // ==========================================
  // Ô 2: LƯỚI GIỮA (FRONT CENTER - T-JUNCTION)
  // ==========================================
  {
    id: 2,
    name: "Lưới Giữa (Net Center)",
    zoneName: "LƯỚI GIỮA",
    row: 1,
    col: 2,
    directionLabel: "Vị trí 2 - Sát lưới trung tâm (chữ T)",
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
    },
    variations: [
      {
        id: "pos2_var1",
        shotName: "Vồ Cầu / Gõ Cầu Cắm Sàn (Fast Net Kill)",
        shotType: "Vồ cầu dứt điểm",
        handMovement: {
          title: "Vồ Cầu / Gõ Cầu Nhanh Chữ T",
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
          title: "Lao Chữ T & Gõ Cầu Cắm Sàn",
          subTitle: "Lao dứt khoát lên chữ T + gõ nhanh mũi vợt + giơ vợt sẵn sàng",
          description: "Đón lõng pha cầu đối phương trả non, lao lên gõ cầu cắm thẳng xuống đất đối thủ.",
          coachingTip: "Cực kỳ dứt khoát, sau khi gõ vẫn giơ cao đầu vợt đề phòng đối thủ thủ được."
        }
      },
      {
        id: "pos2_var2",
        shotName: "Bỏ Nhỏ Tinh Tế Đổi Hướng (Tumble Net Drop)",
        shotType: "Bỏ nhỏ tinh tế",
        handMovement: {
          title: "Bỏ Nhỏ Xoay Đầu Cầu Chữ T",
          subTitle: "Mặt vợt phẳng, đệm nhẹ nhàng triệt tiêu xung lực",
          description: "Đỡ cầu êm ái khi đối phương tạt nhẹ, cho cầu lộn nhào qua mép lưới và rơi cắm sát vạch phát cầu.",
          coachingTip: "Thả lỏng cổ tay tối đa, chạm nhẹ như nhung vào đáy quả cầu."
        },
        footMovement: {
          title: "Lướt Nhẹ Tiếp Cận Chữ T (Smooth Approach)",
          subTitle: "2 bước đệm êm ái giữ thân trên thăng bằng tuyệt đối",
          description: "Di chuyển nhịp nhàng không gây xáo trộn trọng tâm cơ thể, đảm bảo tay cầm vợt hoàn toàn tĩnh.",
          coachingTip: "Bước chân êm ái giúp tay điều khiển mặt vợt đạt độ chuẩn xác từng milimet."
        },
        combinedMovement: {
          title: "Đệm Cầu Bỏ Nhỏ Sát Lưới & Kéo Lưới",
          subTitle: "Tiếp cận êm + vuốt nhẹ quả cầu + giữ thế rình vồ tiếp",
          description: "Thả cầu rơi sát mép lưới buộc đối thủ phải hất cầu bổng, tạo cơ hội cho bản thân hoặc đồng đội đập cầu.",
          coachingTip: "Sau cú bỏ nhỏ đứng rình ngay trước lưới, không vội lùi về."
        }
      },
      {
        id: "pos2_var3",
        shotName: "Đẩy Cầu Nhanh Vào Nách Đối Thủ (Push to Body)",
        shotType: "Đẩy cầu nhanh ép nách",
        handMovement: {
          title: "Đẩy Cầu Phẳng Nhanh Ngang Ngực",
          subTitle: "Đẩy thẳng mặt vợt, búng lực cổ tay đưa cầu bay xiết vào thân người",
          description: "Giả vờ bỏ nhỏ nhưng bất ngờ đẩy cầu phẳng bay nhanh vào nách hoặc hông tay cầm vợt của đối phương.",
          coachingTip: "Đổi nhịp bất ngờ ở 0.1s cuối cùng để đối phương bị giật mình không kịp phản xạ."
        },
        footMovement: {
          title: "Bước Đệm Nhử Lưới (Deceptive Forward Step)",
          subTitle: "Lao lên làm bộ bỏ nhỏ rồi dậm chân giữ đà đẩy cầu",
          description: "Bước chân dài uy lực tạo áp lực thị giác khiến đối thủ lùi lại, sau đó búng cầu vào vị trí họ vừa di chuyển.",
          coachingTip: "Trọng tâm hơi ngả về sau một chút lúc búng cầu để không bị trôi người vào lưới."
        },
        combinedMovement: {
          title: "Nhử Lưới & Búng Cầu Ép Nách Bất Ngờ",
          subTitle: "Lướt lên chữ T + giật cổ tay đẩy cầu phẳng + thủ phản tạt",
          description: "Lia quả cầu tốc độ cao xuyên thẳng qua người đứng lưới đối phương khiến họ đỡ hỏng.",
          coachingTip: "Đường cầu bay xiết ngang tầm ngực là khó đỡ nhất trong đánh đôi."
        }
      }
    ]
  },

  // ==========================================
  // Ô 3: GÓC LƯỚI PHẢI (FRONT RIGHT)
  // ==========================================
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
      title: "Vồ Cầu / Đè Lưới Thuận Tay (Forehand Net Tap)",
      subTitle: "Mặt vợt úp nhẹ, vẩy cổ tay dứt điểm cắm vào góc chữ V",
      description: "Đón đánh cầu phía trên mép lưới. Dùng lực gập cổ tay và ngón trỏ siết chặt cán vợt.",
      coachingTip: "Mở mặt vợt sớm trước khi chân chạm đất để chớp cơ hội tiếp xúc cầu ở điểm cao nhất."
    },
    footMovement: {
      title: "Lunge Thuận Tay Lưới Phải (Forehand Net Lunge)",
      subTitle: "Xoay mũi chân phải hướng góc 2h -> Bước sải dài dồn trọng tâm",
      description: "Bật split-step, bước chân phải dài về góc lưới phải, đầu gối chùng tạo thành góc vuông 90°.",
      coachingTip: "Chân trái duỗi dài phía sau, má trong bàn chân trái miết sàn giữ thăng bằng."
    },
    combinedMovement: {
      title: "Phối Hợp: Bắt Lưới Thuận Tay & Đẩy Cầu Nhanh",
      subTitle: "Lunge chân phải + đè vợt gõ cắm cầu + đạp gót chân hồi vị",
      description: "Đồng bộ tuyệt đối: vừa dậm gót chân phải xuống đất là mặt vợt va chạm quả cầu tại đỉnh lưới.",
      coachingTip: "Giữ đầu vợt luôn ở phía trước ngực trong suốt quá trình di chuyển lên và rút về."
    },
    variations: [
      {
        id: "pos3_var1",
        shotName: "Vồ Cầu / Đè Lưới Thuận Tay (Forehand Net Kill)",
        shotType: "Vồ cầu dứt điểm",
        handMovement: {
          title: "Vồ Cầu / Đè Lưới Thuận Tay",
          subTitle: "Mặt vợt úp nhẹ, vẩy cổ tay dứt điểm cắm vào góc chữ V",
          description: "Đón đánh cầu phía trên mép lưới. Dùng lực gập cổ tay và ngón trỏ siết chặt cán vợt.",
          coachingTip: "Mở mặt vợt sớm trước khi chân chạm đất để chớp cơ hội tiếp xúc cầu ở điểm cao nhất."
        },
        footMovement: {
          title: "Lunge Thuận Tay Lưới Phải (Forehand Net Lunge)",
          subTitle: "Xoay mũi chân phải hướng góc 2h -> Bước sải dài dồn trọng tâm",
          description: "Bật split-step, bước chân phải dài về góc lưới phải, đầu gối chùng tạo thành góc vuông 90°.",
          coachingTip: "Chân trái duỗi dài phía sau, má trong bàn chân trái miết sàn giữ thăng bằng."
        },
        combinedMovement: {
          title: "Lao Lưới Phải & Đè Vợt Cắm Góc",
          subTitle: "Lunge chân phải + đè vợt gõ cắm cầu + đạp gót chân hồi vị",
          description: "Vừa dậm gót chân phải xuống đất là mặt vợt va chạm quả cầu tại đỉnh lưới, dứt điểm chớp nhoáng.",
          coachingTip: "Giữ đầu vợt luôn ở phía trước ngực trong suốt quá trình di chuyển lên và rút về."
        }
      },
      {
        id: "pos3_var2",
        shotName: "Gài Lưới Chéo Góc Thuận Tay (Cross Net Spin)",
        shotType: "Gài lưới chéo góc",
        handMovement: {
          title: "Cắt Cầu Xoáy Chéo Lưới Thuận Tay",
          subTitle: "Kéo mặt vợt cắt chéo từ phải qua trái dưới đáy quả cầu",
          description: "Tạo độ xoáy lốc cho quả cầu bay sát sạt qua mép lưới và rơi sang góc lưới bên trái của đối phương.",
          coachingTip: "Đổi góc mặt vợt ở khoảnh khắc cuối cùng để đối phương bị phân vân hướng di chuyển."
        },
        footMovement: {
          title: "Bước Lunge Góc Mở (Open Stance Lunge)",
          subTitle: "Bước chân phải dài, thân trên hơi nghiêng mở góc chéo",
          description: "Tạo không gian cho cánh tay vung từ phải sang trái mà không bị vướng vào cơ thể.",
          coachingTip: "Giữ chân trụ trái vững chãi để hãm toàn bộ quán tính lao người."
        },
        combinedMovement: {
          title: "Cắt Cầu Chéo Góc Hiểm Hóc & Hồi Tâm",
          subTitle: "Lunge dài + xoay cổ tay cắt chéo + bật lùi về trung tâm",
          description: "Đánh lừa đối thủ đang chờ ở góc phải, đưa quả cầu bay chéo sang góc 1 bên kia lưới.",
          coachingTip: "Đường cầu chéo bay qua lưới phải thật thấp, nếu cao sẽ bị đối phương bắt bài vồ lại."
        }
      },
      {
        id: "pos3_var3",
        shotName: "Hất Cầu Cao Sâu Thuận Tay (Forehand High Lift)",
        shotType: "Hất cầu bổng sâu",
        handMovement: {
          title: "Hất Cầu Thuận Tay Dọc Biên Sâu Đáy Sân",
          subTitle: "Hạ thấp vợt, vung hết biên độ từ dưới lên trên qua đầu",
          description: "Giải tỏa áp lực khi bị đối thủ ép sát lưới phải, đưa quả cầu bổng sâu sát vạch cuối sân đối phương.",
          coachingTip: "Dùng lực ngón tay và cẳng tay phối hợp, đánh cầu chạm mặt vợt ở điểm căng nhất."
        },
        footMovement: {
          title: "Chùng Gối Sâu Cứu Cầu Thấp (Low Forecourt Recovery)",
          subTitle: "Hạ trọng tâm gần sát sàn, vươn dài chân phải",
          description: "Cứu những quả cầu rơi sát đất, giữ thăng bằng cơ thể bằng cánh tay trái giang ngang.",
          coachingTip: "Không cúi gập lưng, dùng sức mạnh của cơ đùi để đỡ và đẩy cơ thể lên."
        },
        combinedMovement: {
          title: "Cứu Cầu Lưới Phải & Hất Sâu Đảo Thế Trận",
          subTitle: "Lunge sâu cứu cầu + bung lực hất cao + chạy lùi về thế thủ",
          description: "Đưa cầu bay bổng chạm trần về góc 7 đối phương, lập tức chạy lùi 2 bước về vị trí số 5.",
          coachingTip: "Hất cầu xong lập tức nhìn hướng cầu và lùi chân, không đứng ngắm đường cầu."
        }
      }
    ]
  },

  // ==========================================
  // Ô 4: TRUNG TÂM TRÁI (MIDCOURT LEFT)
  // ==========================================
  {
    id: 4,
    name: "Trung Tâm Trái (Midcourt Left)",
    zoneName: "TRUNG TÂM TRÁI",
    row: 2,
    col: 1,
    directionLabel: "Vị trí 4 - Trung tâm mép biên trái",
    courtZone: 'mid',
    courtSide: 'left',
    handMovement: {
      title: "Phản Tạt Trái Tay (Backhand Drive)",
      subTitle: "Ngón cái tì lưng cán vợt, vẩy cổ tay ngang ngực tạo đường cầu phẳng",
      description: "Đánh trả các pha tạt cầu tốc độ cao. Giữ đường cầu đi sát mép lưới với quỹ đạo cắm thẳng.",
      coachingTip: "Không vung vợt quá rộng ra sau lưng. Động tác giật ngắn (compact stroke) để kịp nhịp cầu nhanh."
    },
    footMovement: {
      title: "Bước Trượt Ngang Trái (Side Chassé Left)",
      subTitle: "Bước đệm ngang chân trái -> Bước chân phải chéo qua đón cầu",
      description: "Di chuyển ngang từ tâm sân số 5 sang vị trí số 4 với 1 bước trượt nhanh và 1 bước chéo chân phải đón cầu.",
      coachingTip: "Hạ thấp hông, giữ 2 chân mở rộng hơn vai để phản xạ 2 bên sườn linh hoạt."
    },
    combinedMovement: {
      title: "Phối Hợp: Bắt Tốc Độ Trái Tay Ngang Hông",
      subTitle: "Trượt ngang + dậm chân phải xoay hông + giật cổ tay tạt cầu",
      description: "Đồng thời chân phải dậm xuống sàn là điểm tiếp xúc cầu ngang hông trái, đẩy cầu cắm về nách đối phương.",
      coachingTip: "Phản tạt đòi hỏi mắt theo sát cầu và siết ngón cái đúng thời điểm bóng chạm mặt vợt."
    },
    variations: [
      {
        id: "pos4_var1",
        shotName: "Phản Tạt Trái Tay Ngang Lưới (Backhand Flat Drive)",
        shotType: "Phản tạt tốc độ cao",
        handMovement: {
          title: "Phản Tạt Trái Tay Ngang Ngực",
          subTitle: "Ngón cái tì lưng cán vợt, vẩy cổ tay ngang ngực tạo đường cầu phẳng",
          description: "Đánh trả các pha tạt cầu tốc độ cao. Giữ đường cầu đi sát mép lưới với quỹ đạo cắm thẳng.",
          coachingTip: "Không vung vợt quá rộng ra sau lưng. Động tác giật ngắn (compact stroke) để kịp nhịp cầu nhanh."
        },
        footMovement: {
          title: "Bước Trượt Ngang Trái (Side Chassé Left)",
          subTitle: "Bước đệm ngang chân trái -> Bước chân phải chéo qua đón cầu",
          description: "Di chuyển ngang từ tâm sân số 5 sang vị trí số 4 với 1 bước trượt nhanh và 1 bước chéo chân phải đón cầu.",
          coachingTip: "Hạ thấp hông, giữ 2 chân mở rộng hơn vai để phản xạ 2 bên sườn linh hoạt."
        },
        combinedMovement: {
          title: "Trượt Ngang & Tạt Cầu Trái Tay Nhanh",
          subTitle: "Trượt ngang + dậm chân phải + giật cổ tay tạt cầu chìm",
          description: "Đồng thời chân phải dậm xuống sàn là điểm tiếp xúc cầu ngang hông trái, đẩy cầu cắm về nách đối phương.",
          coachingTip: "Phản tạt đòi hỏi mắt theo sát cầu và siết ngón cái đúng thời điểm bóng chạm mặt vợt."
        }
      },
      {
        id: "pos4_var2",
        shotName: "Thủ Cầu Ngắn Sát Lưới Trái Tay (Backhand Net Block)",
        shotType: "Phòng thủ hãm lực",
        handMovement: {
          title: "Thủ Hãm Lực Cú Đập Của Đối Phương",
          subTitle: "Thả lỏng cổ tay, ngửa nhẹ mặt vợt hấp thụ toàn bộ lực smash",
          description: "Đón đỡ cú đập cắm thẳng từ đối thủ, triệt tiêu lực giúp quả cầu rơi êm ái sát mép lưới bên kia.",
          coachingTip: "Không đẩy tay ra trước; giữ mặt vợt êm như một tấm đệm nhung."
        },
        footMovement: {
          title: "Trụ Vững Phòng Thủ (Low Defensive Base)",
          subTitle: "Chân mở rộng gấp rưỡi vai, gối chùng 45°, trọng tâm cực thấp",
          description: "Tạo bệ đỡ vững chắc để mắt nhìn thẳng vào quỹ đạo cầu lao xuống với tốc độ 300+ km/h.",
          coachingTip: "Nhón nhẹ gót chân để cơ thể linh hoạt sẵn sàng nhao lên theo quả cầu trả ngắn."
        },
        combinedMovement: {
          title: "Hóa Giải Đập Cầu & Bỏ Nhỏ Phòng Thủ",
          subTitle: "Chùng gối đón smash + giữ êm mặt vợt + nhao lên bắt lưới",
          description: "Biến cú đập sấm sét của đối thủ thành đường cầu rơi sát lưới, tước đoạt quyền tấn công của họ.",
          coachingTip: "Ngay sau khi đỡ cầu rơi êm, lập tức bước lên 1 bước đón bắt đòn trả cầu tiếp theo."
        }
      },
      {
        id: "pos4_var3",
        shotName: "Bung Cầu Thủ Bổng Cuối Sân (Backhand Defensive Lift)",
        shotType: "Bung cầu phòng thủ",
        handMovement: {
          title: "Bung Cầu Cao Sâu Trái Tay Bằng Ngón Cái",
          subTitle: "Ngón cái ấn mạnh vào gáy cán vợt, vung vợt bổng vút lên cao",
          description: "Khi đối thủ đập cầu quá hiểm sát sàn, bung hết lực ngón cái đưa cầu bay cao sát trần về vạch đáy sân.",
          coachingTip: "Dùng lực xoay của cẳng tay kết hợp búng ngón cái để tạo lực đẩy tối đa."
        },
        footMovement: {
          title: "Bật Chéo Cứu Cầu Biên Trái (Deep Lateral Recovery)",
          subTitle: "Bật chân phải chéo sang trái, thân nghiêng đón đường cầu cắm",
          description: "Rướn người tối đa cứu pha cầu cắm sát vạch biên dọc bên trái.",
          coachingTip: "Sau khi bung cầu, dùng lực bật của chân phải đẩy cơ thể quay về giữa sân."
        },
        combinedMovement: {
          title: "Cứu Cầu Smash Cắm Sàn & Bung Cao Sâu",
          subTitle: "Bật chéo chân + bung ngón cái hất bổng + lùi về thế thủ",
          description: "Giải vây ngoạn mục khi bị đối phương tấn công dồn dập, tạo thời gian tái lập thế trận.",
          coachingTip: "Đường cầu phải đủ cao để đối phương không thể nhảy đập bồi liên hoàn."
        }
      }
    ]
  },

  // ==========================================
  // Ô 5: TRUNG TÂM GIỮA (CENTER STANCE)
  // ==========================================
  {
    id: 5,
    name: "Trung Tâm Giữa (Center / Base)",
    zoneName: "TRUNG TÂM GIỮA",
    row: 2,
    col: 2,
    directionLabel: "Vị trí 5 - Tâm sân / Tư thế chuẩn bị",
    courtZone: 'mid',
    courtSide: 'center',
    handMovement: {
      title: "Thế Thủ Cầu Trung Tâm (Ready Defense Stance)",
      subTitle: "Vợt giơ ngang cằm, khuỷu tay hơi mở, cổ tay sẵn sàng xoay 2 hướng",
      description: "Tư thế đón cầu căn bản. Giữ đầu vợt luôn cao hơn cổ tay, sẵn sàng ứng phó với cả cú đập thẳng lẫn bỏ nhỏ.",
      coachingTip: "Không hạ thấp đầu vợt xuống hông. Luôn giữ vợt phía trước mặt trong tầm mắt."
    },
    footMovement: {
      title: "Split-Step Cơ Động (Center Split-Step)",
      subTitle: "Nhún 2 chân bật tách nhẹ đúng khoảnh khắc đối thủ tiếp xúc cầu",
      description: "Đứng nhón gót tại tâm sân, bật nhẹ 2 chân tách ngang bằng vai để nạp thế năng sẵn sàng bứt tốc về mọi hướng.",
      coachingTip: "Thời điểm split-step quyết định 80% tốc độ phản xạ: nhảy đúng lúc đối phương vung vợt chạm cầu."
    },
    combinedMovement: {
      title: "Phối Hợp: Nạp Năng Lượng & Sẵn Sàng Bứt Tốc",
      subTitle: "Nhấp split-step chân + giơ cao đầu vợt + khóa mắt vào quả cầu",
      description: "Hợp nhất cơ thể thành lò xo nén tại ô số 5: mắt đọc hướng cầu, chân nạp lực bứt phá, tay giữ vợt thăng bằng.",
      coachingTip: "Tâm sân là gốc rễ của mọi pha cầu. Dù đánh ở góc nào xong cũng phải có ý thức hồi về ô 5."
    },
    variations: [
      {
        id: "pos5_var1",
        shotName: "Split-Step & Sẵn Sàng Cơ Động (Active Ready Base)",
        shotType: "Tư thế chuẩn bị",
        handMovement: {
          title: "Thế Thủ Căn Bản Sẵn Sàng 8 Hướng",
          subTitle: "Vợt giơ ngang cằm, khuỷu tay hơi mở, cổ tay sẵn sàng xoay 2 hướng",
          description: "Tư thế đón cầu căn bản. Giữ đầu vợt luôn cao hơn cổ tay, sẵn sàng ứng phó với cả cú đập thẳng lẫn bỏ nhỏ.",
          coachingTip: "Không hạ thấp đầu vợt xuống hông. Luôn giữ vợt phía trước mặt trong tầm mắt."
        },
        footMovement: {
          title: "Split-Step Cơ Động (Center Split-Step)",
          subTitle: "Nhún 2 chân bật tách nhẹ đúng khoảnh khắc đối thủ tiếp xúc cầu",
          description: "Đứng nhón gót tại tâm sân, bật nhẹ 2 chân tách ngang bằng vai để nạp thế năng sẵn sàng bứt tốc về mọi hướng.",
          coachingTip: "Thời điểm split-step quyết định 80% tốc độ phản xạ: nhảy đúng lúc đối phương chạm cầu."
        },
        combinedMovement: {
          title: "Nạp Thế Năng & Sẵn Sàng Bứt Tốc Về 8 Góc",
          subTitle: "Nhấp split-step chân + giơ cao đầu vợt + khóa mắt vào cầu",
          description: "Hợp nhất cơ thể thành lò xo nén tại ô số 5: mắt đọc hướng cầu, chân nạp lực bứt phá, tay giữ vợt thăng bằng.",
          coachingTip: "Tâm sân là gốc rễ của mọi pha cầu. Luôn hồi tâm sau mỗi lượt đánh."
        }
      },
      {
        id: "pos5_var2",
        shotName: "Thủ Đập Thẳng Người (Body Defense Reflex)",
        shotType: "Thủ cầu đập vào người",
        handMovement: {
          title: "Phản Xạ Chặn Cầu Đập Thẳng Ngực",
          subTitle: "Co cùi chỏ, xoay cổ tay trái tay che chắn vùng ngực và mặt",
          description: "Khi đối thủ smash cực mạnh nhắm thẳng vào ngực/bụng, dùng mặt trái tay giơ lên chặn phản xạ tức thời.",
          coachingTip: "Ưu tiên dùng mặt trái tay phòng thủ thân mình vì góc che chắn rộng và nhanh hơn thuận tay."
        },
        footMovement: {
          title: "Trụ Chân Chống Trôi Trọng Tâm (Stable Center Plant)",
          subTitle: "2 chân găm chặt xuống sàn, hơi nghiêng người mở góc đánh",
          description: "Chống lại phản lực từ cú smash như búa bổ, giữ cơ thể không bị ngửa ra sau.",
          coachingTip: "Hơi gập bụng và chùng gối để hấp thụ lực tác động."
        },
        combinedMovement: {
          title: "Chặn Đứng Cú Smash Thẳng Ngực Bất Ngờ",
          subTitle: "Ghim chân trụ + giơ mặt trái tay gạt cầu + phản đòn",
          description: "Biến pha tấn công trực diện hiểm hóc của đối thủ thành đường cầu trả bật ngược cắm sang sân đối diện.",
          coachingTip: "Giữ ánh mắt không được chớp khi cầu lao thẳng về phía mặt."
        }
      },
      {
        id: "pos5_var3",
        shotName: "Cắt Cầu Ngang / Bắt Phản Tạt (Midcourt Intercept)",
        shotType: "Bắt cầu phản tạt",
        handMovement: {
          title: "Bắt Bài Cắt Cầu Tạt Ngang Sân",
          subTitle: "Chặt vợt ngang sườn đón trước đường bay của đối thủ",
          description: "Đọc trước ý đồ tạt cầu của đối phương, đưa vợt ra chặn ngang đường cầu trên không trung.",
          coachingTip: "Chạm cầu ở điểm cao hơn mép lưới, ấn nhẹ đầu vợt để cầu cắm nhanh."
        },
        footMovement: {
          title: "Bước Lướt Ngang Cắt Cầu (Lateral Intercept Step)",
          subTitle: "Bật 1 bước ngang đón đầu đường cầu trước khi nó bay qua người",
          description: "Chủ động bước cắt đường bay thay vì đứng chờ cầu bay đến vị trí.",
          coachingTip: "Phán đoán nhịp vung vợt của đối phương để xuất phát sớm nửa giây."
        },
        combinedMovement: {
          title: "Chặn Đứng Đôi Công & Chuyển Sang Tấn Công",
          subTitle: "Bật cắt ngang + gõ nhanh quả cầu + cướp quyền chủ động",
          description: "Chặn đứng pha đôi công qua lại, dứt điểm bất ngờ vào khoảng trống giữa 2 người đối thủ.",
          coachingTip: "Động tác này là vũ khí lợi hại bậc nhất trong đánh đôi chuyên nghiệp."
        }
      }
    ]
  },

  // ==========================================
  // Ô 6: TRUNG TÂM PHẢI (MIDCOURT RIGHT)
  // ==========================================
  {
    id: 6,
    name: "Trung Tâm Phải (Midcourt Right)",
    zoneName: "TRUNG TÂM PHẢI",
    row: 2,
    col: 3,
    directionLabel: "Vị trí 6 - Trung tâm mép biên phải",
    courtZone: 'mid',
    courtSide: 'right',
    handMovement: {
      title: "Phản Tạt Thuận Tay (Forehand Flat Drive)",
      subTitle: "Vung vợt ngang sườn phải, miết cẳng tay và cổ tay đưa cầu đi cắm",
      description: "Đánh đối kháng tốc độ cao bên cánh thuận tay. Tận dụng lực mở vai để đưa cầu bay nhanh và chìm.",
      coachingTip: "Điểm tiếp xúc cầu ở phía trước hông phải. Khóa chặt cổ tay đúng khoảnh khắc chạm cầu."
    },
    footMovement: {
      title: "Bước Đệm Ngang Phải (Side Step Right)",
      subTitle: "Đạp chân trái đẩy người sang phải -> Tiếp đất chân phải chùng gối",
      description: "Từ tâm sân bật trượt nhanh sang mép biên phải, dồn trọng tâm lên chân thuận để phát lực đánh ngang.",
      coachingTip: "Mũi chân phải mở nhẹ góc 45° để bảo vệ khớp gối khi tiếp đất với tốc độ cao."
    },
    combinedMovement: {
      title: "Phối Hợp: Đôi Công Tốc Độ Cao Thuận Tay",
      subTitle: "Bật ngang + vung vợt chém phẳng + hồi vị tâm sân",
      description: "Chân phải chạm đất đồng bộ với cú vung vợt ngang ngực, tạo ra đường phản tạt xé gió sang phần sân trống.",
      coachingTip: "Sau cú tạt không được buông thõng vợt; lập tức co tay thu vợt về tư thế phòng thủ số 5."
    },
    variations: [
      {
        id: "pos6_var1",
        shotName: "Phản Tạt Thuận Tay Chìm Lưới (Forehand Flat Drive)",
        shotType: "Phản tạt thuận tay",
        handMovement: {
          title: "Phản Tạt Thuận Tay Tốc Độ Cao",
          subTitle: "Vung vợt ngang sườn phải, miết cẳng tay và cổ tay đưa cầu đi cắm",
          description: "Đánh đối kháng tốc độ cao bên cánh thuận tay. Tận dụng lực mở vai để đưa cầu bay nhanh và chìm.",
          coachingTip: "Điểm tiếp xúc cầu ở phía trước hông phải. Khóa chặt cổ tay đúng khoảnh khắc chạm cầu."
        },
        footMovement: {
          title: "Bước Đệm Ngang Phải (Side Step Right)",
          subTitle: "Đạp chân trái đẩy người sang phải -> Tiếp đất chân phải chùng gối",
          description: "Từ tâm sân bật trượt nhanh sang mép biên phải, dồn trọng tâm lên chân thuận để phát lực đánh ngang.",
          coachingTip: "Mũi chân phải mở nhẹ góc 45° để bảo vệ khớp gối khi tiếp đất với tốc độ cao."
        },
        combinedMovement: {
          title: "Trượt Ngang & Tạt Cầu Thuận Tay Chìm Lưới",
          subTitle: "Bật ngang + vung vợt chém phẳng + hồi vị tâm sân",
          description: "Chân phải chạm đất đồng bộ với cú vung vợt ngang ngực, tạo ra đường phản tạt xé gió sang phần sân trống.",
          coachingTip: "Sau cú tạt không được buông thõng vợt; lập tức co tay thu vợt về tư thế phòng thủ số 5."
        }
      },
      {
        id: "pos6_var2",
        shotName: "Thủ Cầu Ngắn Thuận Tay (Forehand Net Block)",
        shotType: "Thủ cầu hãm lực",
        handMovement: {
          title: "Thủ Đỡ Đập Cầu Thuận Tay Sát Lưới",
          subTitle: "Mở mặt vợt phẳng, dùng ngón tay ghìm lại lực đập dũng mãnh",
          description: "Hãm lực cú smash sấm sét của đối thủ bên cánh phải, biến quả cầu thành pha thả lưới đổi hướng.",
          coachingTip: "Mặt vợt ngửa êm ái, tiếp xúc cầu ở phía trước người không để bị trễ."
        },
        footMovement: {
          title: "Hạ Trọng Tâm Đón Cú Smash Phải (Forehand Defensive Base)",
          subTitle: "Bước chân phải sang bên, hạ thấp đùi tạo điểm tựa chắc chắn",
          description: "Trụ vững thân người trước áp lực quả cầu lao xuống với vận tốc cực lớn.",
          coachingTip: "Mắt dõi theo từng chuyển động cổ tay của người đập cầu."
        },
        combinedMovement: {
          title: "Hãm Lực Smash & Trả Cầu Ngắn Chữ T",
          subTitle: "Ghim chân đón smash + đệm mặt vợt trả ngắn + nhao lên bắt lưới",
          description: "Đường cầu trả ngắn rơi cắm ngay vạch phát cầu khiến người vừa đập phải lao lên cứu trong tuyệt vọng.",
          coachingTip: "Đây là tuyệt chiêu phản công sắc bén nhất khi bị đối phương tấn công liên tiếp."
        }
      },
      {
        id: "pos6_var3",
        shotName: "Bật Nhảy Tạt Cầu Nách (Jump Drive Right)",
        shotType: "Nhảy tạt tấn công",
        handMovement: {
          title: "Bật Nhảy Tạt Cầu Tấn Công Trên Không",
          subTitle: "Bật lên đón cầu ở điểm cao nhất, quất cổ tay chém cắm quả cầu",
          description: "Tấn công chủ động khi bóng bay ngang tầm vai, nhảy lên tạt cắm thẳng vào người đối thủ đứng gần.",
          coachingTip: "Tiếp xúc cầu càng cao thì góc đánh càng dốc và đối phương càng khó phản xạ."
        },
        footMovement: {
          title: "Bật Nhảy Lướt Ngang (Lateral Jump Step)",
          subTitle: "Dậm chân phải bật lướt ngang sang bên, tiếp đất 2 chân thăng bằng",
          description: "Sử dụng sức bật bùng nổ của cổ chân để nâng cơ thể lên bắt cầu sớm hơn nửa giây.",
          coachingTip: "Tiếp đất bằng phần nửa trước bàn chân để giảm chấn cho khớp gối."
        },
        combinedMovement: {
          title: "Bật Nhảy Tạt Cầu Trên Không & Đè Ép Đối Thủ",
          subTitle: "Bật nhảy lướt + quất cổ tay dứt điểm + tiếp đất sẵn sàng",
          description: "Đòn đánh tốc độ cao bóp nghẹt thời gian suy nghĩ của đối thủ, ép họ phải nâng cầu bổng.",
          coachingTip: "Ngay khi tiếp đất lập tức nhìn phản ứng của đối phương để vào thế vồ tiếp theo."
        }
      }
    ]
  },

  // ==========================================
  // Ô 7: CUỐI SÂN TRÁI (REAR LEFT)
  // ==========================================
  {
    id: 7,
    name: "Cuối Sân Trái (Rear Left)",
    zoneName: "CUỐI SÂN TRÁI",
    row: 3,
    col: 1,
    directionLabel: "Vị trí 7 - Góc cuối sân bên trái (Vòng đầu)",
    courtZone: 'rear',
    courtSide: 'left',
    handMovement: {
      title: "Đập Cầu Vòng Đầu (Round-the-Head Smash)",
      subTitle: "Uốn lườn nghiêng sang trái, vung vợt vòng qua đầu đập chéo sân",
      description: "Kỹ thuật tấn công đặc trưng khi cầu rơi góc trái cuối sân nhưng vẫn dùng tay thuận đánh qua đầu.",
      coachingTip: "Nghiêng người tạo khoảng trống cho tay vung qua đầu, tiếp xúc cầu ở điểm cao nhất phía trên tai trái."
    },
    footMovement: {
      title: "Chạy Lùi Bước Chéo Sang Trái (Rear Left Footwork)",
      subTitle: "Bật xoay hông -> Bước chassé lùi -> Dậm chân trái bật nhảy đổi chân",
      description: "Lùi nhanh 2-3 bước chéo về góc 7h, chân trái dậm trụ bật người lên không trung và đổi chân khi đánh.",
      coachingTip: "Không chạy lùi thẳng lưng; xoay vai nghiêng người để mắt luôn quan sát được quả cầu."
    },
    combinedMovement: {
      title: "Phối Hợp: Bật Nhảy Vòng Đầu Đập Cầu Sấm Sét",
      subTitle: "Lùi bước chéo + bật nhảy uốn lườn + quất vợt đập cắm chéo sân",
      description: "Tiếp đất bằng chân phải đồng thời hoàn tất cú vung vợt, cơ thể lao về phía trước hồi tâm.",
      coachingTip: "Dồn lực từ hông và cơ bụng uốn lườn để tăng uy lực cho cú smash vòng đầu."
    },
    variations: [
      {
        id: "pos7_var1",
        shotName: "Đập Cầu Vòng Đầu Uy Lực (Round-the-Head Smash)",
        shotType: "Đập cầu tấn công",
        handMovement: {
          title: "Đập Cầu Vòng Đầu Uốn Lườn",
          subTitle: "Uốn lườn nghiêng sang trái, vung vợt vòng qua đầu đập chéo sân",
          description: "Kỹ thuật tấn công đặc trưng khi cầu rơi góc trái cuối sân nhưng vẫn dùng tay thuận đánh qua đầu.",
          coachingTip: "Nghiêng người tạo khoảng trống cho tay vung qua đầu, tiếp xúc cầu ở điểm cao nhất phía trên tai trái."
        },
        footMovement: {
          title: "Chạy Lùi Bước Chéo Sang Trái (Rear Left Footwork)",
          subTitle: "Bật xoay hông -> Bước chassé lùi -> Dậm chân trái bật nhảy đổi chân",
          description: "Lùi nhanh 2-3 bước chéo về góc 7h, chân trái dậm trụ bật người lên không trung và đổi chân khi đánh.",
          coachingTip: "Không chạy lùi thẳng lưng; xoay vai nghiêng người để mắt luôn quan sát được quả cầu."
        },
        combinedMovement: {
          title: "Nhảy Uốn Lườn Đập Cầu Chéo Góc Sấm Sét",
          subTitle: "Lùi bước chéo + bật nhảy uốn lườn + quất vợt đập cắm chéo",
          description: "Tiếp đất bằng chân phải đồng thời hoàn tất cú vung vợt, cơ thể lao về phía trước hồi tâm.",
          coachingTip: "Dồn lực từ hông và cơ bụng uốn lườn để tăng uy lực cho cú smash vòng đầu."
        }
      },
      {
        id: "pos7_var2",
        shotName: "Chém Cầu Bỏ Nhỏ Vòng Đầu (Round-the-Head Drop)",
        shotType: "Bỏ nhỏ lừa hướng",
        handMovement: {
          title: "Chém Cầu Cắt Góc Sát Lưới Vòng Đầu",
          subTitle: "Lấy đà như đập cầu nhưng trượt mặt vợt cắt chéo quả cầu",
          description: "Giả vờ tung đòn smash cực mạnh khiến đối thủ lùi sâu thủ, nhưng giây cuối cắt mặt vợt cho cầu rơi cắm sát lưới góc 1.",
          coachingTip: "Tốc độ vung vợt phải giữ nguyên nhanh như đập để động tác giả đánh lừa thành công."
        },
        footMovement: {
          title: "Lùi Góc 7h Tiếp Đất Chủ Động (Controlled Rear Stance)",
          subTitle: "Lùi nhanh về góc, tiếp đất chân phải chuẩn bị bứt tốc lên trước",
          description: "Không dậm nhảy quá cao, giữ đôi chân chủ động để lao ngay lên lưới sau cú bỏ nhỏ.",
          coachingTip: "Trọng tâm sẵn sàng đổ về phía trước ngay sau khi chạm cầu."
        },
        combinedMovement: {
          title: "Giả Đập Bỏ Nhỏ Sát Lưới Đổi Hướng",
          subTitle: "Lấy đà smash + cắt mặt vợt phút chót + bứt tốc lên lưới",
          description: "Quả cầu lộn nhào rơi cắm ngay vạch phát cầu góc trái đối phương, biến thế trận thành áp đảo hoàn toàn.",
          coachingTip: "Động tác lừa này ghi điểm trực tiếp rất nhiều trong các trận đấu đỉnh cao."
        }
      },
      {
        id: "pos7_var3",
        shotName: "Phông Cầu Cao Sâu Vòng Đầu (Round-the-Head Clear)",
        shotType: "Phông cầu thoát hiểm",
        handMovement: {
          title: "Phông Cầu Vút Cao Chạm Trần Đáy Sân",
          subTitle: "Bung lực toàn thân từ chân, hông, vai qua cẳng tay đẩy cầu bổng",
          description: "Khi bị ép sâu ở góc trái, bung hết lực đẩy quả cầu bay hình parabol cao vút về góc 9 của đối phương.",
          coachingTip: "Khóa cổ tay và đẩy thẳng mặt vợt lên trời, cầu phải sâu qua vạch giao cầu đôi."
        },
        footMovement: {
          title: "Chạy Lùi Bứt Phá Góc Sâu (Deep Corner Extraction)",
          subTitle: "3 bước lùi nhanh, chân trái cắm trụ sâu nhất có thể",
          description: "Đón bóng khi đã bay sát vạch biên cuối sân, giữ thăng bằng bằng chân phải phía trước.",
          coachingTip: "Đạp mạnh chân trụ trái để mượn lực đẩy cơ thể về phía trước sau khi đánh."
        },
        combinedMovement: {
          title: "Phông Cầu Cao Sâu Thoát Pressing Cuối Sân Trái",
          subTitle: "Lùi sâu đón bóng + bung hết lực phông bổng + chạy vội hồi tâm",
          description: "Đưa cầu bay cao tạo đủ 3 giây quý giá để chạy ngược từ góc 7 về tâm sân chuẩn bị phòng ngự.",
          coachingTip: "Đừng vội nhìn theo bóng, đánh xong phải lo chạy hồi vị trí ngay lập tức."
        }
      }
    ]
  },

  // ==========================================
  // Ô 8: CUỐI SÂN GIỮA (REAR CENTER)
  // ==========================================
  {
    id: 8,
    name: "Cuối Sân Giữa (Rear Center)",
    zoneName: "CUỐI SÂN GIỮA",
    row: 3,
    col: 2,
    directionLabel: "Vị trí 8 - Cuối sân trung tâm",
    courtZone: 'rear',
    courtSide: 'center',
    handMovement: {
      title: "Nhảy Đập Cuối Sân (Jump Smash Center)",
      subTitle: "Bật cao tại đỉnh, gập bụng đập cắm quả cầu vào giữa 2 đối thủ",
      description: "Vũ khí dứt điểm uy lực nhất. Đánh quả cầu ở điểm cao nhất phía trước trán, ép cầu đi dốc thẳng xuống sàn.",
      coachingTip: "Thả lỏng cơ thể khi lấy đà, siết chặt toàn bộ cơ bắp vào 0.05s tiếp xúc cầu để tạo vận tốc tối đa."
    },
    footMovement: {
      title: "Lùi Thẳng & Bật Nhảy Scissor Kick (Rear Jump Footwork)",
      subTitle: "Chạy lùi 2 bước chéo -> Dậm nhảy chân phải -> Đổi chân trên không",
      description: "Lùi thẳng từ tâm sân số 5 về số 8, dậm trụ chân phải bật nhảy lên không trung, hoán đổi chân trái ra trước khi tiếp đất.",
      coachingTip: "Tiếp đất bằng chân không thuận (chân trái) trước để chuyển đà lao về phía trước đón cầu tiếp theo."
    },
    combinedMovement: {
      title: "Phối Hợp: Bật Nhảy Scissor Kick Đập Cầu Cắm Sàn",
      subTitle: "Lùi nhanh + dậm nhảy đổi chân trên không + gập bụng quất vợt",
      description: "Đỉnh cao phối hợp: chân dậm nhảy, cơ bụng gập siết, cánh tay vung roi quất mạnh vào quả cầu ở đỉnh điểm.",
      coachingTip: "Đập xong mượn đà tiếp đất của chân trước lao ngay lên trung tâm sân kiểm soát."
    },
    variations: [
      {
        id: "pos8_var1",
        shotName: "Bật Nhảy Scissor Kick Đập Cầu (Jump Smash)",
        shotType: "Đập cầu dứt điểm uy lực",
        handMovement: {
          title: "Bật Nhảy Gập Bụng Đập Cầu Cắm Sàn",
          subTitle: "Bật cao tại đỉnh, gập bụng đập cắm quả cầu vào giữa 2 đối thủ",
          description: "Vũ khí dứt điểm uy lực nhất. Đánh quả cầu ở điểm cao nhất phía trước trán, ép cầu đi dốc thẳng xuống sàn.",
          coachingTip: "Thả lỏng cơ thể khi lấy đà, siết chặt toàn bộ cơ bắp vào 0.05s tiếp xúc cầu để tạo vận tốc tối đa."
        },
        footMovement: {
          title: "Lùi Thẳng & Bật Nhảy Scissor Kick (Rear Jump Footwork)",
          subTitle: "Chạy lùi 2 bước chéo -> Dậm nhảy chân phải -> Đổi chân trên không",
          description: "Lùi thẳng từ tâm sân số 5 về số 8, dậm trụ chân phải bật nhảy lên không trung, hoán đổi chân trái ra trước khi tiếp đất.",
          coachingTip: "Tiếp đất bằng chân không thuận (chân trái) trước để chuyển đà lao về phía trước đón cầu tiếp theo."
        },
        combinedMovement: {
          title: "Bật Nhảy Đổi Chân Đập Cầu Sấm Sét",
          subTitle: "Lùi nhanh + dậm nhảy đổi chân trên không + gập bụng quất vợt",
          description: "Đỉnh cao phối hợp: chân dậm nhảy, cơ bụng gập siết, cánh tay vung roi quất mạnh vào quả cầu ở đỉnh điểm.",
          coachingTip: "Đập xong mượn đà tiếp đất của chân trước lao ngay lên trung tâm sân kiểm soát."
        }
      },
      {
        id: "pos8_var2",
        shotName: "Chặt Cầu Nhanh Rơi Chữ T (Fast Slice Drop to T)",
        shotType: "Chặt cầu chữ T",
        handMovement: {
          title: "Chặt Cầu Nhanh Cắm Thẳng Chữ T",
          subTitle: "Cắt mặt vợt chéo góc 45° đưa cầu lướt nhanh là là mép lưới",
          description: "Đường cầu bay nhanh như smash nhưng đột ngột chúc đầu cắm ngay ngã ba chữ T lưới, làm đối thủ phân vân.",
          coachingTip: "Cắt mặt vợt vào sườn quả cầu để tạo quỹ đạo xoáy cắm."
        },
        footMovement: {
          title: "Nhảy Đệm Lùi 2 Nhịp (Quick Rhythm Backward Step)",
          subTitle: "Lùi 2 nhịp nhanh, dậm nhảy nhẹ bằng cả 2 chân",
          description: "Tạo nhịp đà giả như chuẩn bị smash hết lực, làm hàng thủ đối phương co cụm lùi lại.",
          coachingTip: "Giữ đầu thẳng và không cúi gập người khi chuẩn bị chạm bóng."
        },
        combinedMovement: {
          title: "Giả Smash Chặt Cầu Rơi Chữ T Hiểm Hóc",
          subTitle: "Bật nhảy lấy đà + trượt mặt vợt chém nhanh + lao theo cầu",
          description: "Khi đối thủ co cụm lùi về sau chờ smash, quả cầu rơi cắm ngay chữ T trước mặt khiến họ không thể cứu.",
          coachingTip: "Động tác phối hợp này là chìa khóa mở toang hàng phòng ngự đối phương."
        }
      },
      {
        id: "pos8_var3",
        shotName: "Phông Cầu Tấn Công Lướt Nhanh (Attacking Punch Clear)",
        shotType: "Phông cầu tấn công",
        handMovement: {
          title: "Búng Cầu Nhanh Sát Trần Qua Đầu Đối Thủ",
          subTitle: "Đánh cầu thẳng quỹ đạo phẳng nhanh, bay vọt qua tầm với nhảy đập",
          description: "Không đánh bổng lên trần cao; đâm thẳng quả cầu bay nhanh với trần thấp ép đối phương phải chạy giật lùi.",
          coachingTip: "Mặt vợt hơi ngửa, búng cổ tay cực mạnh đẩy quả cầu lao đi như mũi tên."
        },
        footMovement: {
          title: "Bật Lùi Dậm Trụ Chân Phải (Power Plant Rear Step)",
          subTitle: "Dậm trụ chân phải cực chắc, búng toàn bộ thân người về trước",
          description: "Lùi nhanh và đứng vững chãi, mượn phản lực từ mặt sàn để đẩy quả cầu bay nhanh gấp đôi.",
          coachingTip: "Chân phải làm lò xo đẩy cả cơ thể lao ngược về trước ngay sau cú đánh."
        },
        combinedMovement: {
          title: "Búng Cầu Tấn Công Xuyên Thủng Hàng Thủ",
          subTitle: "Dậm trụ chân phải + búng cẳng tay lia cầu nhanh + tràn lên lưới",
          description: "Đưa đối phương vào thế bị với tay ra sau lưng, ngay lập tức tràn lên lưới dứt điểm pha cầu tiếp theo.",
          coachingTip: "Cú punch clear bất ngờ luôn tạo ra cơ hội dứt điểm ở nhịp đánh kế tiếp."
        }
      }
    ]
  },

  // ==========================================
  // Ô 9: CUỐI SÂN PHẢI (REAR RIGHT)
  // ==========================================
  {
    id: 9,
    name: "Cuối Sân Phải (Rear Right)",
    zoneName: "CUỐI SÂN PHẢI",
    row: 3,
    col: 3,
    directionLabel: "Vị trí 9 - Góc cuối sân bên phải (Thuận tay)",
    courtZone: 'rear',
    courtSide: 'right',
    handMovement: {
      title: "Đập Cầu Thuận Tay Uy Lực (Forehand Power Smash)",
      subTitle: "Mở rộng vai ngực, vung vợt từ sau lưng ra trước với tốc độ tối đa",
      description: "Cú đập cầu kết liễu từ góc thuận tay. Sử dụng chuỗi động tác: đạp chân -> xoay hông -> xoay vai -> quất cẳng tay -> gập cổ tay.",
      coachingTip: "Thả lỏng cổ tay khi đưa vợt ra sau lưng; chỉ siết chặt ngón tay vào thời điểm tiếp xúc cầu 0.01s."
    },
    footMovement: {
      title: "Bộ Chân Lùi Chéo Góc Phải (Forehand Rear Footwork)",
      subTitle: "Xoay hông hướng 5h -> Bước chéo chân trái qua trước -> Dậm chân phải bật nhảy",
      description: "Chạy lùi 3 bước nhịp nhàng về góc 5h, chân phải đặt sát vạch đáy làm trụ bật nhảy lên đón cầu.",
      coachingTip: "Chân phải tiếp đất trước sau đó chuyển trọng tâm sang chân trái để lao nhanh về tâm sân."
    },
    combinedMovement: {
      title: "Phối Hợp: Bật Nhảy Đập Cầu Thuận Tay Dọc Biên",
      subTitle: "Lùi góc 5h + bật nhảy đổi chân + quất vợt cắm biên phải",
      description: "Toàn bộ sức mạnh cơ thể được dồn vào điểm tiếp xúc cầu trên không trung, đưa quả cầu bay dốc cắm sát vạch biên.",
      coachingTip: "Cú đập chuẩn xác phải có tiếng nổ đanh gọn và quỹ đạo cắm dốc qua mép lưới."
    },
    variations: [
      {
        id: "pos9_var1",
        shotName: "Đập Cầu Sấm Sét Thuận Tay (Full Power Smash)",
        shotType: "Đập cầu kết liễu",
        handMovement: {
          title: "Đập Cầu Thuận Tay Sấm Sét Dọc Biên",
          subTitle: "Mở rộng vai ngực, vung vợt từ sau lưng ra trước với tốc độ tối đa",
          description: "Cú đập cầu kết liễu từ góc thuận tay. Sử dụng chuỗi động tác: đạp chân -> xoay hông -> xoay vai -> quất cẳng tay -> gập cổ tay.",
          coachingTip: "Thả lỏng cổ tay khi đưa vợt ra sau lưng; chỉ siết chặt ngón tay vào thời điểm tiếp xúc cầu 0.01s."
        },
        footMovement: {
          title: "Bộ Chân Lùi Chéo Góc Phải (Forehand Rear Footwork)",
          subTitle: "Xoay hông hướng 5h -> Bước chéo chân trái qua trước -> Dậm chân phải bật nhảy",
          description: "Chạy lùi 3 bước nhịp nhàng về góc 5h, chân phải đặt sát vạch đáy làm trụ bật nhảy lên đón cầu.",
          coachingTip: "Chân phải tiếp đất trước sau đó chuyển trọng tâm sang chân trái để lao nhanh về tâm sân."
        },
        combinedMovement: {
          title: "Lùi Góc 5h & Bật Nhảy Đập Cầu Cháy Sân",
          subTitle: "Lùi góc 5h + bật nhảy đổi chân + quất vợt cắm biên phải",
          description: "Toàn bộ sức mạnh cơ thể được dồn vào điểm tiếp xúc cầu trên không trung, đưa quả cầu bay dốc cắm sát vạch biên.",
          coachingTip: "Cú đập chuẩn xác phải có tiếng nổ đanh gọn và quỹ đạo cắm dốc qua mép lưới."
        }
      },
      {
        id: "pos9_var2",
        shotName: "Chém Cầu Bỏ Nhỏ Chéo Sân (Cross-court Drop Shot)",
        shotType: "Bỏ nhỏ chéo góc",
        handMovement: {
          title: "Cắt Chéo Mặt Vợt Đưa Cầu Rơi Góc 1",
          subTitle: "Lấy đà như đập cầu mạnh nhưng xoay nghiêng mặt vợt chém nhẹ",
          description: "Đánh lừa đối phương tưởng đập cầu dọc biên, bất ngờ chém mặt vợt đưa cầu lượn chéo góc rơi sát lưới bên trái.",
          coachingTip: "Góc vợt nghiêng 45°, miết nhẹ sườn quả cầu tạo độ xoáy cuộn rơi nhanh."
        },
        footMovement: {
          title: "Lùi Chassé Góc 5h Chủ Động (Smooth Rear Approach)",
          subTitle: "Bước lùi êm ái, giữ thân trên không bị ngửa quá đà",
          description: "Tạo tư thế thoải mái để cánh tay có thể điều khiển góc mặt vợt biến hóa khôn lường.",
          coachingTip: "Chân trái bước đệm vững vàng giúp kiểm soát điểm rơi quả cầu."
        },
        combinedMovement: {
          title: "Giả Smash Chém Cầu Chéo Góc 1 Lưới Trái",
          subTitle: "Lùi góc 5h + vung tay giả smash + miết chéo mặt vợt",
          description: "Kéo giãn tối đa cự ly di chuyển của đối phương, đưa họ vào thế bị động hoàn toàn trên sân đấu.",
          coachingTip: "Quả cầu phải rơi sát mép lưới đối diện, không để cầu bay quá bổng."
        }
      },
      {
        id: "pos9_var3",
        shotName: "Phông Cầu Cao Sâu Chuẩn BWF (High Deep Clear)",
        shotType: "Phông cầu phòng thủ BWF",
        handMovement: {
          title: "Phông Cầu Bổng Chạm Trần Sâu Sát Vạch Đáy",
          subTitle: "Vung vợt hình cánh cung, đưa quả cầu bay vút lên trần nhà",
          description: "Đẩy đối thủ lùi sát tường ở góc 7 bên kia, tạo ra khoảng thời gian nghỉ 3-4 giây cho bản thân nạp lại thể lực.",
          coachingTip: "Điểm tiếp xúc cầu ngay phía trên đỉnh đầu, tay vươn thẳng hết biên độ."
        },
        footMovement: {
          title: "Lùi Sâu & Đạp Đà Lao Lên (Deep Corner & Forward Drive)",
          subTitle: "Lùi sâu tới vạch đáy, dậm chân phải rồi đạp cơ thể vọt lên",
          description: "Vung vợt xong tận dụng lực đẩy của chân phải để bước 2 bước dài về ngay tâm sân số 5.",
          coachingTip: "Luôn giữ thăng bằng lúc vung vợt để không bị ngã ngửa ra phía sau."
        },
        combinedMovement: {
          title: "Phông Cầu Cao Sâu Góc 9 & Đảo Ngược Thế Trận",
          subTitle: "Lùi góc 5h + vung vợt đẩy bổng + đạp đà lao về tâm sân",
          description: "Đưa quả cầu rơi theo phương thẳng đứng sát vạch cuối sân khiến đối thủ không thể tấn công nguy hiểm.",
          coachingTip: "Cú clear chuẩn BWF luôn đưa bóng chạm vạch đáy 2 lớp của sân cầu lông."
        }
      }
    ]
  }
];
