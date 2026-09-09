import { GridPosition } from "../types";

export const BADMINTON_POSITIONS: GridPosition[] = [
  // ==========================================
  // Ô 1: GÓC LƯỚI TRÁI (NET LEFT)
  // ==========================================
  {
    id: 1,
    name: "Góc Lưới Trái (Net Left)",
    zoneName: "LƯỚI TRÁI",
    row: 1,
    col: 1,
    directionLabel: "Vị trí 1 - Góc lưới bên trái",
    courtZone: "front",
    courtSide: "left",
    level: "Cơ bản",
        videoUrl: "",
    handMovement: {
      title: "Đỡ Cầu & Kê Lưới Trái Tay",
      subTitle: "Mặt vợt ngửa 45 độ, thả lỏng cổ tay đón cầu sát lưới",
      description: "Đỡ Cầu & Kê Lưới Trái Tay tại LƯỚI TRÁI",
      coachingTip: "Mặt vợt ngửa 45 độ, thả lỏng cổ tay đón cầu sát lưới"
    },
    footMovement: {
      title: "Bộ pháp Ô 1",
      subTitle: "Split-step -> Bước đệm chân phải góc 10h",
      description: "Di chuyển đến LƯỚI TRÁI",
      coachingTip: "Split-step -> Bước đệm chân phải góc 10h"
    },
    combinedMovement: {
      title: "Đỡ Cầu & Kê Lưới Trái Tay",
      subTitle: "Mặt vợt ngửa 45 độ, thả lỏng cổ tay đón cầu sát lưới + Split-step -> Bước đệm chân phải góc 10h",
      description: "Đỡ Cầu & Kê Lưới Trái Tay",
      coachingTip: "Tập trung chuẩn xác động tác"
    },
    variations: [
      {
        id: "pos_1_var_1",
        shotName: "Đỡ Cầu & Kê Lưới Trái Tay",
        shotType: "Kê lưới",
        level: "Cơ bản",
        videoUrl: "https://www.tiktok.com/@congdongvnbadminton/video/7461076755865029904",
        handMovement: {
          title: "Đỡ Cầu & Kê Lưới Trái Tay",
          subTitle: "Mặt vợt ngửa 45 độ, thả lỏng cổ tay đón cầu sát lưới",
          description: "Đỡ Cầu & Kê Lưới Trái Tay",
          coachingTip: "Mặt vợt ngửa 45 độ, thả lỏng cổ tay đón cầu sát lưới"
        },
        footMovement: {
          title: "Bộ pháp Ô 1",
          subTitle: "Split-step -> Bước đệm chân phải góc 10h",
          description: "Bộ pháp Ô 1",
          coachingTip: "Split-step -> Bước đệm chân phải góc 10h"
        },
        combinedMovement: {
          title: "Đỡ Cầu & Kê Lưới Trái Tay",
          subTitle: "Mặt vợt ngửa 45 độ, thả lỏng cổ tay đón cầu sát lưới + Split-step -> Bước đệm chân phải góc 10h",
          description: "Đỡ Cầu & Kê Lưới Trái Tay",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_1_var_2",
        shotName: "Bước Lunge Đón Cầu Góc Lưới Trái",
        shotType: "Bộ pháp",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Bước Lunge Đón Cầu Góc Lưới Trái",
          subTitle: "Giơ vợt ổn định trước ngực giữ thăng bằng",
          description: "Bước Lunge Đón Cầu Góc Lưới Trái",
          coachingTip: "Giơ vợt ổn định trước ngực giữ thăng bằng"
        },
        footMovement: {
          title: "Bộ pháp Ô 1",
          subTitle: "Lunge chân phải vươn dài, gót chạm đất trước",
          description: "Bộ pháp Ô 1",
          coachingTip: "Lunge chân phải vươn dài, gót chạm đất trước"
        },
        combinedMovement: {
          title: "Bước Lunge Đón Cầu Góc Lưới Trái",
          subTitle: "Giơ vợt ổn định trước ngực giữ thăng bằng + Lunge chân phải vươn dài, gót chạm đất trước",
          description: "Bước Lunge Đón Cầu Góc Lưới Trái",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_1_var_3",
        shotName: "Kê Cầu Vuốt Mép Lưới Đổi Nhịp",
        shotType: "Kê lưới",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Kê Cầu Vuốt Mép Lưới Đổi Nhịp",
          subTitle: "Vuốt nhẹ đầu vợt triệt tiêu quán tính quả cầu",
          description: "Kê Cầu Vuốt Mép Lưới Đổi Nhịp",
          coachingTip: "Vuốt nhẹ đầu vợt triệt tiêu quán tính quả cầu"
        },
        footMovement: {
          title: "Bộ pháp Ô 1",
          subTitle: "Chùng gối chân thuận hãm quán tính",
          description: "Bộ pháp Ô 1",
          coachingTip: "Chùng gối chân thuận hãm quán tính"
        },
        combinedMovement: {
          title: "Kê Cầu Vuốt Mép Lưới Đổi Nhịp",
          subTitle: "Vuốt nhẹ đầu vợt triệt tiêu quán tính quả cầu + Chùng gối chân thuận hãm quán tính",
          description: "Kê Cầu Vuốt Mép Lưới Đổi Nhịp",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_1_var_4",
        shotName: "Gài Lưới / Miết Cầu Xoáy Lộn Lưới",
        shotType: "Bỏ nhỏ xoáy",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Gài Lưới / Miết Cầu Xoáy Lộn Lưới",
          subTitle: "Miết nhẹ đầu quả cầu tạo độ xoáy lộn mép lưới",
          description: "Gài Lưới / Miết Cầu Xoáy Lộn Lưới",
          coachingTip: "Miết nhẹ đầu quả cầu tạo độ xoáy lộn mép lưới"
        },
        footMovement: {
          title: "Bộ pháp Ô 1",
          subTitle: "Chân phải chạm đất đồng thời vung cổ tay",
          description: "Bộ pháp Ô 1",
          coachingTip: "Chân phải chạm đất đồng thời vung cổ tay"
        },
        combinedMovement: {
          title: "Gài Lưới / Miết Cầu Xoáy Lộn Lưới",
          subTitle: "Miết nhẹ đầu quả cầu tạo độ xoáy lộn mép lưới + Chân phải chạm đất đồng thời vung cổ tay",
          description: "Gài Lưới / Miết Cầu Xoáy Lộn Lưới",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_1_var_5",
        shotName: "Hất Cầu Bổng Sâu Góc Lưới Trái",
        shotType: "Hất bổng",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Hất Cầu Bổng Sâu Góc Lưới Trái",
          subTitle: "Vung vợt từ dưới lên bung lực cẳng tay đẩy cầu sâu",
          description: "Hất Cầu Bổng Sâu Góc Lưới Trái",
          coachingTip: "Vung vợt từ dưới lên bung lực cẳng tay đẩy cầu sâu"
        },
        footMovement: {
          title: "Bộ pháp Ô 1",
          subTitle: "Bật đẩy chân phải tạo đà lùi về tâm",
          description: "Bộ pháp Ô 1",
          coachingTip: "Bật đẩy chân phải tạo đà lùi về tâm"
        },
        combinedMovement: {
          title: "Hất Cầu Bổng Sâu Góc Lưới Trái",
          subTitle: "Vung vợt từ dưới lên bung lực cẳng tay đẩy cầu sâu + Bật đẩy chân phải tạo đà lùi về tâm",
          description: "Hất Cầu Bổng Sâu Góc Lưới Trái",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_1_var_6",
        shotName: "Kéo Lưới Đổi Hướng Sang Biên Phải",
        shotType: "Kéo lưới",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Kéo Lưới Đổi Hướng Sang Biên Phải",
          subTitle: "Nghiêng góc mặt vợt đưa cầu lướt ngang mép lưới",
          description: "Kéo Lưới Đổi Hướng Sang Biên Phải",
          coachingTip: "Nghiêng góc mặt vợt đưa cầu lướt ngang mép lưới"
        },
        footMovement: {
          title: "Bộ pháp Ô 1",
          subTitle: "Trụ vững chân trước, giữ thân thăng bằng",
          description: "Bộ pháp Ô 1",
          coachingTip: "Trụ vững chân trước, giữ thân thăng bằng"
        },
        combinedMovement: {
          title: "Kéo Lưới Đổi Hướng Sang Biên Phải",
          subTitle: "Nghiêng góc mặt vợt đưa cầu lướt ngang mép lưới + Trụ vững chân trước, giữ thân thăng bằng",
          description: "Kéo Lưới Đổi Hướng Sang Biên Phải",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_1_var_7",
        shotName: "Vồ Cầu / Chụp Lưới Góc Trái",
        shotType: "Vồ cầu",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Vồ Cầu / Chụp Lưới Góc Trái",
          subTitle: "Đón cầu đỉnh lưới, búng ngón cái giật gõ cắm sàn",
          description: "Vồ Cầu / Chụp Lưới Góc Trái",
          coachingTip: "Đón cầu đỉnh lưới, búng ngón cái giật gõ cắm sàn"
        },
        footMovement: {
          title: "Bộ pháp Ô 1",
          subTitle: "Bứt tốc chân trái đẩy chân phải phóng dài",
          description: "Bộ pháp Ô 1",
          coachingTip: "Bứt tốc chân trái đẩy chân phải phóng dài"
        },
        combinedMovement: {
          title: "Vồ Cầu / Chụp Lưới Góc Trái",
          subTitle: "Đón cầu đỉnh lưới, búng ngón cái giật gõ cắm sàn + Bứt tốc chân trái đẩy chân phải phóng dài",
          description: "Vồ Cầu / Chụp Lưới Góc Trái",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_1_var_8",
        shotName: "Múa Vợt Đổi Hướng Chém Chéo Lưới",
        shotType: "Đánh lừa",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Múa Vợt Đổi Hướng Chém Chéo Lưới",
          subTitle: "Giả động tác đẩy thẳng rồi chém cổ tay chéo sân",
          description: "Múa Vợt Đổi Hướng Chém Chéo Lưới",
          coachingTip: "Giả động tác đẩy thẳng rồi chém cổ tay chéo sân"
        },
        footMovement: {
          title: "Bộ pháp Ô 1",
          subTitle: "Giữ thăng bằng trên một chân rồi thu chân",
          description: "Bộ pháp Ô 1",
          coachingTip: "Giữ thăng bằng trên một chân rồi thu chân"
        },
        combinedMovement: {
          title: "Múa Vợt Đổi Hướng Chém Chéo Lưới",
          subTitle: "Giả động tác đẩy thẳng rồi chém cổ tay chéo sân + Giữ thăng bằng trên một chân rồi thu chân",
          description: "Múa Vợt Đổi Hướng Chém Chéo Lưới",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_1_var_9",
        shotName: "Giả Động Tác Đẩy Bổng Cắt Cầu Sát Lưới",
        shotType: "Kỹ xảo",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Giả Động Tác Đẩy Bổng Cắt Cầu Sát Lưới",
          subTitle: "Tạo đà vung bổng nhưng hãm vợt miết nhẹ mép cầu",
          description: "Giả Động Tác Đẩy Bổng Cắt Cầu Sát Lưới",
          coachingTip: "Tạo đà vung bổng nhưng hãm vợt miết nhẹ mép cầu"
        },
        footMovement: {
          title: "Bộ pháp Ô 1",
          subTitle: "Đổi trọng tâm tức thì đánh lừa đối phương",
          description: "Bộ pháp Ô 1",
          coachingTip: "Đổi trọng tâm tức thì đánh lừa đối phương"
        },
        combinedMovement: {
          title: "Giả Động Tác Đẩy Bổng Cắt Cầu Sát Lưới",
          subTitle: "Tạo đà vung bổng nhưng hãm vợt miết nhẹ mép cầu + Đổi trọng tâm tức thì đánh lừa đối phương",
          description: "Giả Động Tác Đẩy Bổng Cắt Cầu Sát Lưới",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_1_var_10",
        shotName: "Bật Lướt Đón Cầu Dứt Điểm Mép Chữ T",
        shotType: "Bật lướt",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Bật Lướt Đón Cầu Dứt Điểm Mép Chữ T",
          subTitle: "Bật người trên không gõ cắm cầu trước khi qua lưới",
          description: "Bật Lướt Đón Cầu Dứt Điểm Mép Chữ T",
          coachingTip: "Bật người trên không gõ cắm cầu trước khi qua lưới"
        },
        footMovement: {
          title: "Bộ pháp Ô 1",
          subTitle: "Bật bằng mũi chân trái, tiếp đất êm ái",
          description: "Bộ pháp Ô 1",
          coachingTip: "Bật bằng mũi chân trái, tiếp đất êm ái"
        },
        combinedMovement: {
          title: "Bật Lướt Đón Cầu Dứt Điểm Mép Chữ T",
          subTitle: "Bật người trên không gõ cắm cầu trước khi qua lưới + Bật bằng mũi chân trái, tiếp đất êm ái",
          description: "Bật Lướt Đón Cầu Dứt Điểm Mép Chữ T",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      }
    ]
  },
  // ==========================================
  // Ô 2: LƯỚI GIỮA (FRONT CENTER)
  // ==========================================
  {
    id: 2,
    name: "Lưới Giữa (Front Center)",
    zoneName: "LƯỚI GIỮA",
    row: 1,
    col: 2,
    directionLabel: "Vị trí 2 - Trung lộ mép lưới (chữ T)",
    courtZone: "front",
    courtSide: "center",
    level: "Cơ bản",
        videoUrl: "",
    handMovement: {
      title: "Chặn Đẩy Cầu Thẳng Mặt Lưới",
      subTitle: "Đẩy mặt vợt thẳng hướng quả cầu rơi",
      description: "Chặn Đẩy Cầu Thẳng Mặt Lưới tại LƯỚI GIỮA",
      coachingTip: "Đẩy mặt vợt thẳng hướng quả cầu rơi"
    },
    footMovement: {
      title: "Bộ pháp Ô 2",
      subTitle: "Bước thẳng chân phải vào vạch chữ T",
      description: "Di chuyển đến LƯỚI GIỮA",
      coachingTip: "Bước thẳng chân phải vào vạch chữ T"
    },
    combinedMovement: {
      title: "Chặn Đẩy Cầu Thẳng Mặt Lưới",
      subTitle: "Đẩy mặt vợt thẳng hướng quả cầu rơi + Bước thẳng chân phải vào vạch chữ T",
      description: "Chặn Đẩy Cầu Thẳng Mặt Lưới",
      coachingTip: "Tập trung chuẩn xác động tác"
    },
    variations: [
      {
        id: "pos_2_var_1",
        shotName: "Chặn Đẩy Cầu Thẳng Mặt Lưới",
        shotType: "Chặn đẩy",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Chặn Đẩy Cầu Thẳng Mặt Lưới",
          subTitle: "Đẩy mặt vợt thẳng hướng quả cầu rơi",
          description: "Chặn Đẩy Cầu Thẳng Mặt Lưới",
          coachingTip: "Đẩy mặt vợt thẳng hướng quả cầu rơi"
        },
        footMovement: {
          title: "Bộ pháp Ô 2",
          subTitle: "Bước thẳng chân phải vào vạch chữ T",
          description: "Bộ pháp Ô 2",
          coachingTip: "Bước thẳng chân phải vào vạch chữ T"
        },
        combinedMovement: {
          title: "Chặn Đẩy Cầu Thẳng Mặt Lưới",
          subTitle: "Đẩy mặt vợt thẳng hướng quả cầu rơi + Bước thẳng chân phải vào vạch chữ T",
          description: "Chặn Đẩy Cầu Thẳng Mặt Lưới",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_2_var_2",
        shotName: "Kê Cầu Chữ T Đổi Nhịp",
        shotType: "Kê lưới",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Kê Cầu Chữ T Đổi Nhịp",
          subTitle: "Thả lỏng cổ tay triệt tiêu lực quả cầu",
          description: "Kê Cầu Chữ T Đổi Nhịp",
          coachingTip: "Thả lỏng cổ tay triệt tiêu lực quả cầu"
        },
        footMovement: {
          title: "Bộ pháp Ô 2",
          subTitle: "Chân thuận tiếp đất vững chắc",
          description: "Bộ pháp Ô 2",
          coachingTip: "Chân thuận tiếp đất vững chắc"
        },
        combinedMovement: {
          title: "Kê Cầu Chữ T Đổi Nhịp",
          subTitle: "Thả lỏng cổ tay triệt tiêu lực quả cầu + Chân thuận tiếp đất vững chắc",
          description: "Kê Cầu Chữ T Đổi Nhịp",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_2_var_3",
        shotName: "Bước Thẳng Đón Cầu Chữ T",
        shotType: "Bộ pháp",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Bước Thẳng Đón Cầu Chữ T",
          subTitle: "Đưa vợt sớm trước mặt đón đầu quả cầu",
          description: "Bước Thẳng Đón Cầu Chữ T",
          coachingTip: "Đưa vợt sớm trước mặt đón đầu quả cầu"
        },
        footMovement: {
          title: "Bộ pháp Ô 2",
          subTitle: "Bước đuổi thẳng từ tâm sân vào chữ T",
          description: "Bộ pháp Ô 2",
          coachingTip: "Bước đuổi thẳng từ tâm sân vào chữ T"
        },
        combinedMovement: {
          title: "Bước Thẳng Đón Cầu Chữ T",
          subTitle: "Đưa vợt sớm trước mặt đón đầu quả cầu + Bước đuổi thẳng từ tâm sân vào chữ T",
          description: "Bước Thẳng Đón Cầu Chữ T",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_2_var_4",
        shotName: "Đè Lưới / Phản Tạt Nhanh Giữa Sân",
        shotType: "Đè lưới",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Đè Lưới / Phản Tạt Nhanh Giữa Sân",
          subTitle: "Gập cổ tay chớp nhoáng đẩy cầu đi căng thấp",
          description: "Đè Lưới / Phản Tạt Nhanh Giữa Sân",
          coachingTip: "Gập cổ tay chớp nhoáng đẩy cầu đi căng thấp"
        },
        footMovement: {
          title: "Bộ pháp Ô 2",
          subTitle: "Nhịp bật lướt đón cầu ngang tầm mắt",
          description: "Bộ pháp Ô 2",
          coachingTip: "Nhịp bật lướt đón cầu ngang tầm mắt"
        },
        combinedMovement: {
          title: "Đè Lưới / Phản Tạt Nhanh Giữa Sân",
          subTitle: "Gập cổ tay chớp nhoáng đẩy cầu đi căng thấp + Nhịp bật lướt đón cầu ngang tầm mắt",
          description: "Đè Lưới / Phản Tạt Nhanh Giữa Sân",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_2_var_5",
        shotName: "Bung Cầu Bổng Sang Hai Góc",
        shotType: "Bung bổng",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Bung Cầu Bổng Sang Hai Góc",
          subTitle: "Bung lực cổ tay hất cao bổng sang góc trống",
          description: "Bung Cầu Bổng Sang Hai Góc",
          coachingTip: "Bung lực cổ tay hất cao bổng sang góc trống"
        },
        footMovement: {
          title: "Bộ pháp Ô 2",
          subTitle: "Hạ thấp trọng tâm cứu cầu sát sàn",
          description: "Bộ pháp Ô 2",
          coachingTip: "Hạ thấp trọng tâm cứu cầu sát sàn"
        },
        combinedMovement: {
          title: "Bung Cầu Bổng Sang Hai Góc",
          subTitle: "Bung lực cổ tay hất cao bổng sang góc trống + Hạ thấp trọng tâm cứu cầu sát sàn",
          description: "Bung Cầu Bổng Sang Hai Góc",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_2_var_6",
        shotName: "Tạt Cầu Ngang Đầu Vợt Ép Đối Phương",
        shotType: "Phản tạt",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Tạt Cầu Ngang Đầu Vợt Ép Đối Phương",
          subTitle: "Tạt phẳng cầu sát mép trên của lưới",
          description: "Tạt Cầu Ngang Đầu Vợt Ép Đối Phương",
          coachingTip: "Tạt phẳng cầu sát mép trên của lưới"
        },
        footMovement: {
          title: "Bộ pháp Ô 2",
          subTitle: "Dậm chân phải tạo lực đè bóng",
          description: "Bộ pháp Ô 2",
          coachingTip: "Dậm chân phải tạo lực đè bóng"
        },
        combinedMovement: {
          title: "Tạt Cầu Ngang Đầu Vợt Ép Đối Phương",
          subTitle: "Tạt phẳng cầu sát mép trên của lưới + Dậm chân phải tạo lực đè bóng",
          description: "Tạt Cầu Ngang Đầu Vợt Ép Đối Phương",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_2_var_7",
        shotName: "Búng Cổ Tay Chụp Lưới Dứt Điểm",
        shotType: "Vồ cầu",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Búng Cổ Tay Chụp Lưới Dứt Điểm",
          subTitle: "Đón đỉnh lưới gõ cắm thẳng xuống đất đối thủ",
          description: "Búng Cổ Tay Chụp Lưới Dứt Điểm",
          coachingTip: "Đón đỉnh lưới gõ cắm thẳng xuống đất đối thủ"
        },
        footMovement: {
          title: "Bộ pháp Ô 2",
          subTitle: "Bật rướn nhanh chặn đầu quả cầu",
          description: "Bộ pháp Ô 2",
          coachingTip: "Bật rướn nhanh chặn đầu quả cầu"
        },
        combinedMovement: {
          title: "Búng Cổ Tay Chụp Lưới Dứt Điểm",
          subTitle: "Đón đỉnh lưới gõ cắm thẳng xuống đất đối thủ + Bật rướn nhanh chặn đầu quả cầu",
          description: "Búng Cổ Tay Chụp Lưới Dứt Điểm",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_2_var_8",
        shotName: "Giả Bỏ Nhỏ Gạt Cầu Sát Vách Lưới",
        shotType: "Đánh lừa",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Giả Bỏ Nhỏ Gạt Cầu Sát Vách Lưới",
          subTitle: "Giữ nhịp vợt tĩnh (Hold) rồi gạt nhanh đổi hướng",
          description: "Giả Bỏ Nhỏ Gạt Cầu Sát Vách Lưới",
          coachingTip: "Giữ nhịp vợt tĩnh (Hold) rồi gạt nhanh đổi hướng"
        },
        footMovement: {
          title: "Bộ pháp Ô 2",
          subTitle: "Trụ vững chân trước, cơ thể ổn định",
          description: "Bộ pháp Ô 2",
          coachingTip: "Trụ vững chân trước, cơ thể ổn định"
        },
        combinedMovement: {
          title: "Giả Bỏ Nhỏ Gạt Cầu Sát Vách Lưới",
          subTitle: "Giữ nhịp vợt tĩnh (Hold) rồi gạt nhanh đổi hướng + Trụ vững chân trước, cơ thể ổn định",
          description: "Giả Bỏ Nhỏ Gạt Cầu Sát Vách Lưới",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_2_var_9",
        shotName: "Chớp Cơ Hội Bồi Cầu Cắm Sàn Chữ T",
        shotType: "Bồi cầu",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Chớp Cơ Hội Bồi Cầu Cắm Sàn Chữ T",
          subTitle: "Đón quả cầu trả bổng của đối phương đập cắm sàn",
          description: "Chớp Cơ Hội Bồi Cầu Cắm Sàn Chữ T",
          coachingTip: "Đón quả cầu trả bổng của đối phương đập cắm sàn"
        },
        footMovement: {
          title: "Bộ pháp Ô 2",
          subTitle: "Bật lò xo giậm nhảy dứt điểm",
          description: "Bộ pháp Ô 2",
          coachingTip: "Bật lò xo giậm nhảy dứt điểm"
        },
        combinedMovement: {
          title: "Chớp Cơ Hội Bồi Cầu Cắm Sàn Chữ T",
          subTitle: "Đón quả cầu trả bổng của đối phương đập cắm sàn + Bật lò xo giậm nhảy dứt điểm",
          description: "Chớp Cơ Hội Bồi Cầu Cắm Sàn Chữ T",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_2_var_10",
        shotName: "Bắt Bài Đường Cầu Tạt Ngang Đầu",
        shotType: "Cắt cầu",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Bắt Bài Đường Cầu Tạt Ngang Đầu",
          subTitle: "Đưa vợt đón lõng trên không đánh chặn tức thì",
          description: "Bắt Bài Đường Cầu Tạt Ngang Đầu",
          coachingTip: "Đưa vợt đón lõng trên không đánh chặn tức thì"
        },
        footMovement: {
          title: "Bộ pháp Ô 2",
          subTitle: "Bật nhảy đón đầu hướng bay quả cầu",
          description: "Bộ pháp Ô 2",
          coachingTip: "Bật nhảy đón đầu hướng bay quả cầu"
        },
        combinedMovement: {
          title: "Bắt Bài Đường Cầu Tạt Ngang Đầu",
          subTitle: "Đưa vợt đón lõng trên không đánh chặn tức thì + Bật nhảy đón đầu hướng bay quả cầu",
          description: "Bắt Bài Đường Cầu Tạt Ngang Đầu",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      }
    ]
  },
  // ==========================================
  // Ô 3: GÓC LƯỚI PHẢI (NET RIGHT)
  // ==========================================
  {
    id: 3,
    name: "Góc Lưới Phải (Net Right)",
    zoneName: "LƯỚI PHẢI",
    row: 1,
    col: 3,
    directionLabel: "Vị trí 3 - Góc lưới bên phải",
    courtZone: "front",
    courtSide: "right",
    level: "Cơ bản",
        videoUrl: "",
    handMovement: {
      title: "Kê Cầu Thuận Tay Sát Lưới",
      subTitle: "Mặt vợt mở nhẹ thuận tay đón cầu êm",
      description: "Kê Cầu Thuận Tay Sát Lưới tại LƯỚI PHẢI",
      coachingTip: "Mặt vợt mở nhẹ thuận tay đón cầu êm"
    },
    footMovement: {
      title: "Bộ pháp Ô 3",
      subTitle: "Bước đệm chân phải hướng góc 2h",
      description: "Di chuyển đến LƯỚI PHẢI",
      coachingTip: "Bước đệm chân phải hướng góc 2h"
    },
    combinedMovement: {
      title: "Kê Cầu Thuận Tay Sát Lưới",
      subTitle: "Mặt vợt mở nhẹ thuận tay đón cầu êm + Bước đệm chân phải hướng góc 2h",
      description: "Kê Cầu Thuận Tay Sát Lưới",
      coachingTip: "Tập trung chuẩn xác động tác"
    },
    variations: [
      {
        id: "pos_3_var_1",
        shotName: "Kê Cầu Thuận Tay Sát Lưới",
        shotType: "Kê lưới",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Kê Cầu Thuận Tay Sát Lưới",
          subTitle: "Mặt vợt mở nhẹ thuận tay đón cầu êm",
          description: "Kê Cầu Thuận Tay Sát Lưới",
          coachingTip: "Mặt vợt mở nhẹ thuận tay đón cầu êm"
        },
        footMovement: {
          title: "Bộ pháp Ô 3",
          subTitle: "Bước đệm chân phải hướng góc 2h",
          description: "Bộ pháp Ô 3",
          coachingTip: "Bước đệm chân phải hướng góc 2h"
        },
        combinedMovement: {
          title: "Kê Cầu Thuận Tay Sát Lưới",
          subTitle: "Mặt vợt mở nhẹ thuận tay đón cầu êm + Bước đệm chân phải hướng góc 2h",
          description: "Kê Cầu Thuận Tay Sát Lưới",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_3_var_2",
        shotName: "Bước Lunge Chân Thuận Góc Phải",
        shotType: "Bộ pháp",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Bước Lunge Chân Thuận Góc Phải",
          subTitle: "Tay mở rộng giữ cân bằng trọng tâm",
          description: "Bước Lunge Chân Thuận Góc Phải",
          coachingTip: "Tay mở rộng giữ cân bằng trọng tâm"
        },
        footMovement: {
          title: "Bộ pháp Ô 3",
          subTitle: "Lunge dài chân phải, đùi song song mặt sàn",
          description: "Bộ pháp Ô 3",
          coachingTip: "Lunge dài chân phải, đùi song song mặt sàn"
        },
        combinedMovement: {
          title: "Bước Lunge Chân Thuận Góc Phải",
          subTitle: "Tay mở rộng giữ cân bằng trọng tâm + Lunge dài chân phải, đùi song song mặt sàn",
          description: "Bước Lunge Chân Thuận Góc Phải",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_3_var_3",
        shotName: "Kê Cầu Chéo Góc Thuận Tay",
        shotType: "Kê lưới",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Kê Cầu Chéo Góc Thuận Tay",
          subTitle: "Nghiêng nhẹ mặt vợt đón cầu đưa sang góc đối diện",
          description: "Kê Cầu Chéo Góc Thuận Tay",
          coachingTip: "Nghiêng nhẹ mặt vợt đón cầu đưa sang góc đối diện"
        },
        footMovement: {
          title: "Bộ pháp Ô 3",
          subTitle: "Gót chân phải tiếp đất trước hãm đà",
          description: "Bộ pháp Ô 3",
          coachingTip: "Gót chân phải tiếp đất trước hãm đà"
        },
        combinedMovement: {
          title: "Kê Cầu Chéo Góc Thuận Tay",
          subTitle: "Nghiêng nhẹ mặt vợt đón cầu đưa sang góc đối diện + Gót chân phải tiếp đất trước hãm đà",
          description: "Kê Cầu Chéo Góc Thuận Tay",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_3_var_4",
        shotName: "Miết Cầu Xoáy Lộn Lưới Thuận Tay",
        shotType: "Bỏ nhỏ xoáy",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Miết Cầu Xoáy Lộn Lưới Thuận Tay",
          subTitle: "Xoay cổ tay miết mép ngoài quả cầu lộn lưới",
          description: "Miết Cầu Xoáy Lộn Lưới Thuận Tay",
          coachingTip: "Xoay cổ tay miết mép ngoài quả cầu lộn lưới"
        },
        footMovement: {
          title: "Bộ pháp Ô 3",
          subTitle: "Chân trụ hãm đà quán tính",
          description: "Bộ pháp Ô 3",
          coachingTip: "Chân trụ hãm đà quán tính"
        },
        combinedMovement: {
          title: "Miết Cầu Xoáy Lộn Lưới Thuận Tay",
          subTitle: "Xoay cổ tay miết mép ngoài quả cầu lộn lưới + Chân trụ hãm đà quán tính",
          description: "Miết Cầu Xoáy Lộn Lưới Thuận Tay",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_3_var_5",
        shotName: "Hất Cầu Bổng Sâu Thuận Tay",
        shotType: "Hất sâu",
        level: "Trung cấp",
        videoUrl: "https://www.tiktok.com/@saigonsmashsquad/video/7672279216209136916",
        handMovement: {
          title: "Hất Cầu Bổng Sâu Thuận Tay",
          subTitle: "Vung hết biên độ hất cầu cao về đáy góc 7",
          description: "Hất Cầu Bổng Sâu Thuận Tay",
          coachingTip: "Vung hết biên độ hất cầu cao về đáy góc 7"
        },
        footMovement: {
          title: "Bộ pháp Ô 3",
          subTitle: "Bật lùi hồi vị ngay sau chạm cầu",
          description: "Bộ pháp Ô 3",
          coachingTip: "Bật lùi hồi vị ngay sau chạm cầu"
        },
        combinedMovement: {
          title: "Hất Cầu Bổng Sâu Thuận Tay",
          subTitle: "Vung hết biên độ hất cầu cao về đáy góc 7 + Bật lùi hồi vị ngay sau chạm cầu",
          description: "Hất Cầu Bổng Sâu Thuận Tay",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_3_var_6",
        shotName: "Kéo Lưới Lừa Hướng Thuận Tay",
        shotType: "Kéo lưới",
        level: "Trung cấp",
        videoUrl: "https://www.tiktok.com/@badmintonun/video/7609534277692165384",
        handMovement: {
          title: "Kéo Lưới Lừa Hướng Thuận Tay",
          subTitle: "Cắt chéo đường bay đưa cầu lướt dọc vạch trắng lưới",
          description: "Kéo Lưới Lừa Hướng Thuận Tay",
          coachingTip: "Cắt chéo đường bay đưa cầu lướt dọc vạch trắng lưới"
        },
        footMovement: {
          title: "Bộ pháp Ô 3",
          subTitle: "Xoay hông nhẹ đẩy thân người",
          description: "Bộ pháp Ô 3",
          coachingTip: "Xoay hông nhẹ đẩy thân người"
        },
        combinedMovement: {
          title: "Kéo Lưới Lừa Hướng Thuận Tay",
          subTitle: "Cắt chéo đường bay đưa cầu lướt dọc vạch trắng lưới + Xoay hông nhẹ đẩy thân người",
          description: "Kéo Lưới Lừa Hướng Thuận Tay",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_3_var_7",
        shotName: "Chụp Lưới / Đè Cầu Dứt Điểm Góc Phải",
        shotType: "Đè lưới",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Chụp Lưới / Đè Cầu Dứt Điểm Góc Phải",
          subTitle: "Lao vào gõ cắm thẳng góc biên",
          description: "Chụp Lưới / Đè Cầu Dứt Điểm Góc Phải",
          coachingTip: "Lao vào gõ cắm thẳng góc biên"
        },
        footMovement: {
          title: "Bộ pháp Ô 3",
          subTitle: "Bứt tốc bước dài áp sát mép lưới",
          description: "Bộ pháp Ô 3",
          coachingTip: "Bứt tốc bước dài áp sát mép lưới"
        },
        combinedMovement: {
          title: "Chụp Lưới / Đè Cầu Dứt Điểm Góc Phải",
          subTitle: "Lao vào gõ cắm thẳng góc biên + Bứt tốc bước dài áp sát mép lưới",
          description: "Chụp Lưới / Đè Cầu Dứt Điểm Góc Phải",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_3_var_8",
        shotName: "Giả Động Tác Chém Chéo Góc Lưới",
        shotType: "Đánh lừa",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Giả Động Tác Chém Chéo Góc Lưới",
          subTitle: "Vung giả đẩy thẳng rồi bẻ cổ tay cắt chéo",
          description: "Giả Động Tác Chém Chéo Góc Lưới",
          coachingTip: "Vung giả đẩy thẳng rồi bẻ cổ tay cắt chéo"
        },
        footMovement: {
          title: "Bộ pháp Ô 3",
          subTitle: "Trọng tâm vững vàng hồi tâm sân",
          description: "Bộ pháp Ô 3",
          coachingTip: "Trọng tâm vững vàng hồi tâm sân"
        },
        combinedMovement: {
          title: "Giả Động Tác Chém Chéo Góc Lưới",
          subTitle: "Vung giả đẩy thẳng rồi bẻ cổ tay cắt chéo + Trọng tâm vững vàng hồi tâm sân",
          description: "Giả Động Tác Chém Chéo Góc Lưới",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_3_var_9",
        shotName: "Đè Cầu Tấn Công Góc Biên Thuận Tay",
        shotType: "Tấn công",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Đè Cầu Tấn Công Góc Biên Thuận Tay",
          subTitle: "Vung vợt biên độ hẹp gõ cắm sát vạch biên",
          description: "Đè Cầu Tấn Công Góc Biên Thuận Tay",
          coachingTip: "Vung vợt biên độ hẹp gõ cắm sát vạch biên"
        },
        footMovement: {
          title: "Bộ pháp Ô 3",
          subTitle: "Bật chân phải lướt nhanh sát lưới",
          description: "Bộ pháp Ô 3",
          coachingTip: "Bật chân phải lướt nhanh sát lưới"
        },
        combinedMovement: {
          title: "Đè Cầu Tấn Công Góc Biên Thuận Tay",
          subTitle: "Vung vợt biên độ hẹp gõ cắm sát vạch biên + Bật chân phải lướt nhanh sát lưới",
          description: "Đè Cầu Tấn Công Góc Biên Thuận Tay",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_3_var_10",
        shotName: "Bật Lao Người Chụp Cầu Mép Trên",
        shotType: "Chụp cầu",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Bật Lao Người Chụp Cầu Mép Trên",
          subTitle: "Vươn toàn thân đón cầu tầm cao dứt điểm",
          description: "Bật Lao Người Chụp Cầu Mép Trên",
          coachingTip: "Vươn toàn thân đón cầu tầm cao dứt điểm"
        },
        footMovement: {
          title: "Bộ pháp Ô 3",
          subTitle: "Hãm đà an toàn tránh chạm lưới",
          description: "Bộ pháp Ô 3",
          coachingTip: "Hãm đà an toàn tránh chạm lưới"
        },
        combinedMovement: {
          title: "Bật Lao Người Chụp Cầu Mép Trên",
          subTitle: "Vươn toàn thân đón cầu tầm cao dứt điểm + Hãm đà an toàn tránh chạm lưới",
          description: "Bật Lao Người Chụp Cầu Mép Trên",
          coachingTip: "Tập trung chuẩn xác động tác"
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
    directionLabel: "Vị trí 4 - Trung lộ cánh trái",
    courtZone: "mid",
    courtSide: "left",
    level: "Cơ bản",
        videoUrl: "",
    handMovement: {
      title: "Thủ Cầu Ngang Hông Trái Tay",
      subTitle: "Ngón cái tì cán vợt, mở mặt vợt đỡ trước hông",
      description: "Thủ Cầu Ngang Hông Trái Tay tại TRUNG TÂM TRÁI",
      coachingTip: "Ngón cái tì cán vợt, mở mặt vợt đỡ trước hông"
    },
    footMovement: {
      title: "Bộ pháp Ô 4",
      subTitle: "Hạ thấp trọng tâm, hai chân mở rộng",
      description: "Di chuyển đến TRUNG TÂM TRÁI",
      coachingTip: "Hạ thấp trọng tâm, hai chân mở rộng"
    },
    combinedMovement: {
      title: "Thủ Cầu Ngang Hông Trái Tay",
      subTitle: "Ngón cái tì cán vợt, mở mặt vợt đỡ trước hông + Hạ thấp trọng tâm, hai chân mở rộng",
      description: "Thủ Cầu Ngang Hông Trái Tay",
      coachingTip: "Tập trung chuẩn xác động tác"
    },
    variations: [
      {
        id: "pos_4_var_1",
        shotName: "Thủ Cầu Ngang Hông Trái Tay",
        shotType: "Thủ cầu",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Thủ Cầu Ngang Hông Trái Tay",
          subTitle: "Ngón cái tì cán vợt, mở mặt vợt đỡ trước hông",
          description: "Thủ Cầu Ngang Hông Trái Tay",
          coachingTip: "Ngón cái tì cán vợt, mở mặt vợt đỡ trước hông"
        },
        footMovement: {
          title: "Bộ pháp Ô 4",
          subTitle: "Hạ thấp trọng tâm, hai chân mở rộng",
          description: "Bộ pháp Ô 4",
          coachingTip: "Hạ thấp trọng tâm, hai chân mở rộng"
        },
        combinedMovement: {
          title: "Thủ Cầu Ngang Hông Trái Tay",
          subTitle: "Ngón cái tì cán vợt, mở mặt vợt đỡ trước hông + Hạ thấp trọng tâm, hai chân mở rộng",
          description: "Thủ Cầu Ngang Hông Trái Tay",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_4_var_2",
        shotName: "Bước Trượt Ngang Đón Cầu Trái",
        shotType: "Bộ pháp",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Bước Trượt Ngang Đón Cầu Trái",
          subTitle: "Vợt giơ ngang ngực sẵn sàng",
          description: "Bước Trượt Ngang Đón Cầu Trái",
          coachingTip: "Vợt giơ ngang ngực sẵn sàng"
        },
        footMovement: {
          title: "Bộ pháp Ô 4",
          subTitle: "Bước trượt ngang Chasse sang trái",
          description: "Bộ pháp Ô 4",
          coachingTip: "Bước trượt ngang Chasse sang trái"
        },
        combinedMovement: {
          title: "Bước Trượt Ngang Đón Cầu Trái",
          subTitle: "Vợt giơ ngang ngực sẵn sàng + Bước trượt ngang Chasse sang trái",
          description: "Bước Trượt Ngang Đón Cầu Trái",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_4_var_3",
        shotName: "Đỡ Cầu Phản Xạ Tầm Trung",
        shotType: "Phòng thủ",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Đỡ Cầu Phản Xạ Tầm Trung",
          subTitle: "Mặt vợt vững vàng chặn quả đập ngang sườn",
          description: "Đỡ Cầu Phản Xạ Tầm Trung",
          coachingTip: "Mặt vợt vững vàng chặn quả đập ngang sườn"
        },
        footMovement: {
          title: "Bộ pháp Ô 4",
          subTitle: "Chùng gối hai chân hấp thụ xung lực",
          description: "Bộ pháp Ô 4",
          coachingTip: "Chùng gối hai chân hấp thụ xung lực"
        },
        combinedMovement: {
          title: "Đỡ Cầu Phản Xạ Tầm Trung",
          subTitle: "Mặt vợt vững vàng chặn quả đập ngang sườn + Chùng gối hai chân hấp thụ xung lực",
          description: "Đỡ Cầu Phản Xạ Tầm Trung",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_4_var_4",
        shotName: "Phản Tạt Ngang Lưới Trái Tay",
        shotType: "Phản tạt",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Phản Tạt Ngang Lưới Trái Tay",
          subTitle: "Vung ngang mặt vợt tạt thẳng mép lưới",
          description: "Phản Tạt Ngang Lưới Trái Tay",
          coachingTip: "Vung ngang mặt vợt tạt thẳng mép lưới"
        },
        footMovement: {
          title: "Bộ pháp Ô 4",
          subTitle: "Xoay hông nhẹ dồn lực vào quả tạt",
          description: "Bộ pháp Ô 4",
          coachingTip: "Xoay hông nhẹ dồn lực vào quả tạt"
        },
        combinedMovement: {
          title: "Phản Tạt Ngang Lưới Trái Tay",
          subTitle: "Vung ngang mặt vợt tạt thẳng mép lưới + Xoay hông nhẹ dồn lực vào quả tạt",
          description: "Phản Tạt Ngang Lưới Trái Tay",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_4_var_5",
        shotName: "Thủ Cầu Chéo Góc Thoát Hiểm",
        shotType: "Thủ chéo",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Thủ Cầu Chéo Góc Thoát Hiểm",
          subTitle: "Nghiêng góc vợt đẩy cầu rơi chéo sân đối diện",
          description: "Thủ Cầu Chéo Góc Thoát Hiểm",
          coachingTip: "Nghiêng góc vợt đẩy cầu rơi chéo sân đối diện"
        },
        footMovement: {
          title: "Bộ pháp Ô 4",
          subTitle: "Chùng gối trái nhận lực",
          description: "Bộ pháp Ô 4",
          coachingTip: "Chùng gối trái nhận lực"
        },
        combinedMovement: {
          title: "Thủ Cầu Chéo Góc Thoát Hiểm",
          subTitle: "Nghiêng góc vợt đẩy cầu rơi chéo sân đối diện + Chùng gối trái nhận lực",
          description: "Thủ Cầu Chéo Góc Thoát Hiểm",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_4_var_6",
        shotName: "Chặn Cầu Ngang Hông Hãm Xung Lực",
        shotType: "Hãm lực",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Chặn Cầu Ngang Hông Hãm Xung Lực",
          subTitle: "Thả lỏng ngón tay đón bóng làm bóng rơi sát lưới",
          description: "Chặn Cầu Ngang Hông Hãm Xung Lực",
          coachingTip: "Thả lỏng ngón tay đón bóng làm bóng rơi sát lưới"
        },
        footMovement: {
          title: "Bộ pháp Ô 4",
          subTitle: "Thân trên giữ tĩnh ổn định",
          description: "Bộ pháp Ô 4",
          coachingTip: "Thân trên giữ tĩnh ổn định"
        },
        combinedMovement: {
          title: "Chặn Cầu Ngang Hông Hãm Xung Lực",
          subTitle: "Thả lỏng ngón tay đón bóng làm bóng rơi sát lưới + Thân trên giữ tĩnh ổn định",
          description: "Chặn Cầu Ngang Hông Hãm Xung Lực",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_4_var_7",
        shotName: "Bung Phản Tạt Đè Góc Xa Trái Tay",
        shotType: "Phản công",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Bung Phản Tạt Đè Góc Xa Trái Tay",
          subTitle: "Bung hết lực ngón cái đè bóng sâu về góc trống",
          description: "Bung Phản Tạt Đè Góc Xa Trái Tay",
          coachingTip: "Bung hết lực ngón cái đè bóng sâu về góc trống"
        },
        footMovement: {
          title: "Bộ pháp Ô 4",
          subTitle: "Bật người đón cầu điểm cao nhất",
          description: "Bộ pháp Ô 4",
          coachingTip: "Bật người đón cầu điểm cao nhất"
        },
        combinedMovement: {
          title: "Bung Phản Tạt Đè Góc Xa Trái Tay",
          subTitle: "Bung hết lực ngón cái đè bóng sâu về góc trống + Bật người đón cầu điểm cao nhất",
          description: "Bung Phản Tạt Đè Góc Xa Trái Tay",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_4_var_8",
        shotName: "Đỡ Smash Bỏ Nhỏ Đổi Nhịp",
        shotType: "Hãm lực",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Đỡ Smash Bỏ Nhỏ Đổi Nhịp",
          subTitle: "Thả lỏng cổ tay đón cú smash cho cầu rơi sát lưới",
          description: "Đỡ Smash Bỏ Nhỏ Đổi Nhịp",
          coachingTip: "Thả lỏng cổ tay đón cú smash cho cầu rơi sát lưới"
        },
        footMovement: {
          title: "Bộ pháp Ô 4",
          subTitle: "Đứng vững hai chân, giữ thân người tĩnh",
          description: "Bộ pháp Ô 4",
          coachingTip: "Đứng vững hai chân, giữ thân người tĩnh"
        },
        combinedMovement: {
          title: "Đỡ Smash Bỏ Nhỏ Đổi Nhịp",
          subTitle: "Thả lỏng cổ tay đón cú smash cho cầu rơi sát lưới + Đứng vững hai chân, giữ thân người tĩnh",
          description: "Đỡ Smash Bỏ Nhỏ Đổi Nhịp",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_4_var_9",
        shotName: "Phản Công Đè Cầu Tấn Công Góc Nách",
        shotType: "Tấn công",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Phản Công Đè Cầu Tấn Công Góc Nách",
          subTitle: "Bật người đè cầu cắm sát nách đối phương",
          description: "Phản Công Đè Cầu Tấn Công Góc Nách",
          coachingTip: "Bật người đè cầu cắm sát nách đối phương"
        },
        footMovement: {
          title: "Bộ pháp Ô 4",
          subTitle: "Dậm mạnh chân trái tạo điểm tựa",
          description: "Bộ pháp Ô 4",
          coachingTip: "Dậm mạnh chân trái tạo điểm tựa"
        },
        combinedMovement: {
          title: "Phản Công Đè Cầu Tấn Công Góc Nách",
          subTitle: "Bật người đè cầu cắm sát nách đối phương + Dậm mạnh chân trái tạo điểm tựa",
          description: "Phản Công Đè Cầu Tấn Công Góc Nách",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_4_var_10",
        shotName: "Bật Vẩy Cổ Tay Trái Tay Ép Đáy",
        shotType: "Phát lực",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Bật Vẩy Cổ Tay Trái Tay Ép Đáy",
          subTitle: "Búng cổ tay cực nhanh đưa cầu bay vút góc đáy đối diện",
          description: "Bật Vẩy Cổ Tay Trái Tay Ép Đáy",
          coachingTip: "Búng cổ tay cực nhanh đưa cầu bay vút góc đáy đối diện"
        },
        footMovement: {
          title: "Bộ pháp Ô 4",
          subTitle: "Xoay trục thân người trợ lực",
          description: "Bộ pháp Ô 4",
          coachingTip: "Xoay trục thân người trợ lực"
        },
        combinedMovement: {
          title: "Bật Vẩy Cổ Tay Trái Tay Ép Đáy",
          subTitle: "Búng cổ tay cực nhanh đưa cầu bay vút góc đáy đối diện + Xoay trục thân người trợ lực",
          description: "Bật Vẩy Cổ Tay Trái Tay Ép Đáy",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      }
    ]
  },
  // ==========================================
  // Ô 5: TÂM SÂN (COURT CENTER)
  // ==========================================
  {
    id: 5,
    name: "Tâm Sân (Court Center)",
    zoneName: "TÂM SÂN",
    row: 2,
    col: 2,
    directionLabel: "Vị trí 5 - Trung tâm điều phối chiến thuật",
    courtZone: "mid",
    courtSide: "center",
    level: "Cơ bản",
        videoUrl: "",
    handMovement: {
      title: "Bật Nhẹ Split-Step Sẵn Sàng",
      subTitle: "Vợt giơ ngang cằm, khuỷu tay mở rộng",
      description: "Bật Nhẹ Split-Step Sẵn Sàng tại TÂM SÂN",
      coachingTip: "Vợt giơ ngang cằm, khuỷu tay mở rộng"
    },
    footMovement: {
      title: "Bộ pháp Ô 5",
      subTitle: "Bật nhảy hai chân tiếp đất bằng mũi chân",
      description: "Di chuyển đến TÂM SÂN",
      coachingTip: "Bật nhảy hai chân tiếp đất bằng mũi chân"
    },
    combinedMovement: {
      title: "Bật Nhẹ Split-Step Sẵn Sàng",
      subTitle: "Vợt giơ ngang cằm, khuỷu tay mở rộng + Bật nhảy hai chân tiếp đất bằng mũi chân",
      description: "Bật Nhẹ Split-Step Sẵn Sàng",
      coachingTip: "Tập trung chuẩn xác động tác"
    },
    variations: [
      {
        id: "pos_5_var_1",
        shotName: "Bật Nhẹ Split-Step Sẵn Sàng",
        shotType: "Bộ pháp",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Bật Nhẹ Split-Step Sẵn Sàng",
          subTitle: "Vợt giơ ngang cằm, khuỷu tay mở rộng",
          description: "Bật Nhẹ Split-Step Sẵn Sàng",
          coachingTip: "Vợt giơ ngang cằm, khuỷu tay mở rộng"
        },
        footMovement: {
          title: "Bộ pháp Ô 5",
          subTitle: "Bật nhảy hai chân tiếp đất bằng mũi chân",
          description: "Bộ pháp Ô 5",
          coachingTip: "Bật nhảy hai chân tiếp đất bằng mũi chân"
        },
        combinedMovement: {
          title: "Bật Nhẹ Split-Step Sẵn Sàng",
          subTitle: "Vợt giơ ngang cằm, khuỷu tay mở rộng + Bật nhảy hai chân tiếp đất bằng mũi chân",
          description: "Bật Nhẹ Split-Step Sẵn Sàng",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_5_var_2",
        shotName: "Bộ Pháp Di Chuyển 4 Góc Từ Tâm",
        shotType: "Bộ pháp",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Bộ Pháp Di Chuyển 4 Góc Từ Tâm",
          subTitle: "Phối hợp tay vợt linh hoạt theo hướng chạy",
          description: "Bộ Pháp Di Chuyển 4 Góc Từ Tâm",
          coachingTip: "Phối hợp tay vợt linh hoạt theo hướng chạy"
        },
        footMovement: {
          title: "Bộ pháp Ô 5",
          subTitle: "Bước chéo chân xuất phát nhanh đến 4 góc",
          description: "Bộ pháp Ô 5",
          coachingTip: "Bước chéo chân xuất phát nhanh đến 4 góc"
        },
        combinedMovement: {
          title: "Bộ Pháp Di Chuyển 4 Góc Từ Tâm",
          subTitle: "Phối hợp tay vợt linh hoạt theo hướng chạy + Bước chéo chân xuất phát nhanh đến 4 góc",
          description: "Bộ Pháp Di Chuyển 4 Góc Từ Tâm",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_5_var_3",
        shotName: "Nhịp Dừng Hồi Tâm Ổn Định",
        shotType: "Hồi vị",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Nhịp Dừng Hồi Tâm Ổn Định",
          subTitle: "Thu vợt trước ngực sẵn sàng đón nhịp tiếp theo",
          description: "Nhịp Dừng Hồi Tâm Ổn Định",
          coachingTip: "Thu vợt trước ngực sẵn sàng đón nhịp tiếp theo"
        },
        footMovement: {
          title: "Bộ pháp Ô 5",
          subTitle: "Trọng tâm rơi đúng tâm ô số 5",
          description: "Bộ pháp Ô 5",
          coachingTip: "Trọng tâm rơi đúng tâm ô số 5"
        },
        combinedMovement: {
          title: "Nhịp Dừng Hồi Tâm Ổn Định",
          subTitle: "Thu vợt trước ngực sẵn sàng đón nhịp tiếp theo + Trọng tâm rơi đúng tâm ô số 5",
          description: "Nhịp Dừng Hồi Tâm Ổn Định",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_5_var_4",
        shotName: "Bắt Bài Nhịp Cầu Nửa Sân",
        shotType: "Bắt bài",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Bắt Bài Nhịp Cầu Nửa Sân",
          subTitle: "Giơ vợt đón đầu quả cầu bay lửng giữa sân",
          description: "Bắt Bài Nhịp Cầu Nửa Sân",
          coachingTip: "Giơ vợt đón đầu quả cầu bay lửng giữa sân"
        },
        footMovement: {
          title: "Bộ pháp Ô 5",
          subTitle: "Bật một bước cắt ngang đường cầu",
          description: "Bộ pháp Ô 5",
          coachingTip: "Bật một bước cắt ngang đường cầu"
        },
        combinedMovement: {
          title: "Bắt Bài Nhịp Cầu Nửa Sân",
          subTitle: "Giơ vợt đón đầu quả cầu bay lửng giữa sân + Bật một bước cắt ngang đường cầu",
          description: "Bắt Bài Nhịp Cầu Nửa Sân",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_5_var_5",
        shotName: "Xoay Hông Chuyển Trọng Tâm Nhanh",
        shotType: "Hồi vị",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Xoay Hông Chuyển Trọng Tâm Nhanh",
          subTitle: "Thu vợt về ngực sau mỗi pha đánh",
          description: "Xoay Hông Chuyển Trọng Tâm Nhanh",
          coachingTip: "Thu vợt về ngực sau mỗi pha đánh"
        },
        footMovement: {
          title: "Bộ pháp Ô 5",
          subTitle: "Xoay trục hông hồi vị ngay tâm ô số 5",
          description: "Bộ pháp Ô 5",
          coachingTip: "Xoay trục hông hồi vị ngay tâm ô số 5"
        },
        combinedMovement: {
          title: "Xoay Hông Chuyển Trọng Tâm Nhanh",
          subTitle: "Thu vợt về ngực sau mỗi pha đánh + Xoay trục hông hồi vị ngay tâm ô số 5",
          description: "Xoay Hông Chuyển Trọng Tâm Nhanh",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_5_var_6",
        shotName: "Bước Đệm Đón Cầu Nửa Sân",
        shotType: "Bộ pháp",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Bước Đệm Đón Cầu Nửa Sân",
          subTitle: "Đón cầu ngang ngực chuyển từ thủ sang công",
          description: "Bước Đệm Đón Cầu Nửa Sân",
          coachingTip: "Đón cầu ngang ngực chuyển từ thủ sang công"
        },
        footMovement: {
          title: "Bộ pháp Ô 5",
          subTitle: "Bước đệm nhịp nhàng hai chân",
          description: "Bộ pháp Ô 5",
          coachingTip: "Bước đệm nhịp nhàng hai chân"
        },
        combinedMovement: {
          title: "Bước Đệm Đón Cầu Nửa Sân",
          subTitle: "Đón cầu ngang ngực chuyển từ thủ sang công + Bước đệm nhịp nhàng hai chân",
          description: "Bước Đệm Đón Cầu Nửa Sân",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_5_var_7",
        shotName: "Đón Cầu Trên Không Nhịp Một",
        shotType: "Cắt cầu",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Đón Cầu Trên Không Nhịp Một",
          subTitle: "Bật nhảy đón cầu trên không gõ cắm sàn",
          description: "Đón Cầu Trên Không Nhịp Một",
          coachingTip: "Bật nhảy đón cầu trên không gõ cắm sàn"
        },
        footMovement: {
          title: "Bộ pháp Ô 5",
          subTitle: "Bật thẳng hai chân giậm nhảy tiếp đất",
          description: "Bộ pháp Ô 5",
          coachingTip: "Bật thẳng hai chân giậm nhảy tiếp đất"
        },
        combinedMovement: {
          title: "Đón Cầu Trên Không Nhịp Một",
          subTitle: "Bật nhảy đón cầu trên không gõ cắm sàn + Bật thẳng hai chân giậm nhảy tiếp đất",
          description: "Đón Cầu Trên Không Nhịp Một",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_5_var_8",
        shotName: "Đổi Hướng Đảo Chiều Đánh Lừa",
        shotType: "Chiến thuật",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Đổi Hướng Đảo Chiều Đánh Lừa",
          subTitle: "Giả động tác sang trái rồi vung sang phải",
          description: "Đổi Hướng Đảo Chiều Đánh Lừa",
          coachingTip: "Giả động tác sang trái rồi vung sang phải"
        },
        footMovement: {
          title: "Bộ pháp Ô 5",
          subTitle: "Đổi trụ chân tức thì đánh lừa đối thủ",
          description: "Bộ pháp Ô 5",
          coachingTip: "Đổi trụ chân tức thì đánh lừa đối thủ"
        },
        combinedMovement: {
          title: "Đổi Hướng Đảo Chiều Đánh Lừa",
          subTitle: "Giả động tác sang trái rồi vung sang phải + Đổi trụ chân tức thì đánh lừa đối thủ",
          description: "Đổi Hướng Đảo Chiều Đánh Lừa",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_5_var_9",
        shotName: "Chớp Thời Cơ Cắt Cầu Giữa Sân",
        shotType: "Tấn công",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Chớp Thời Cơ Cắt Cầu Giữa Sân",
          subTitle: "Cắt ngang đường bay quả cầu dứt điểm cắm sàn",
          description: "Chớp Thời Cơ Cắt Cầu Giữa Sân",
          coachingTip: "Cắt ngang đường bay quả cầu dứt điểm cắm sàn"
        },
        footMovement: {
          title: "Bộ pháp Ô 5",
          subTitle: "Lao người chớp nhoáng trên không",
          description: "Bộ pháp Ô 5",
          coachingTip: "Lao người chớp nhoáng trên không"
        },
        combinedMovement: {
          title: "Chớp Thời Cơ Cắt Cầu Giữa Sân",
          subTitle: "Cắt ngang đường bay quả cầu dứt điểm cắm sàn + Lao người chớp nhoáng trên không",
          description: "Chớp Thời Cơ Cắt Cầu Giữa Sân",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_5_var_10",
        shotName: "Hoán Đổi Vị Trí Công Thủ Linh Hoạt",
        shotType: "Đôi nam/nữ",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Hoán Đổi Vị Trí Công Thủ Linh Hoạt",
          subTitle: "Phân công che chắn khu vực khi đồng đội dâng cao",
          description: "Hoán Đổi Vị Trí Công Thủ Linh Hoạt",
          coachingTip: "Phân công che chắn khu vực khi đồng đội dâng cao"
        },
        footMovement: {
          title: "Bộ pháp Ô 5",
          subTitle: "Di chuyển bọc lót theo hình thoi",
          description: "Bộ pháp Ô 5",
          coachingTip: "Di chuyển bọc lót theo hình thoi"
        },
        combinedMovement: {
          title: "Hoán Đổi Vị Trí Công Thủ Linh Hoạt",
          subTitle: "Phân công che chắn khu vực khi đồng đội dâng cao + Di chuyển bọc lót theo hình thoi",
          description: "Hoán Đổi Vị Trí Công Thủ Linh Hoạt",
          coachingTip: "Tập trung chuẩn xác động tác"
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
    directionLabel: "Vị trí 6 - Trung lộ cánh phải",
    courtZone: "mid",
    courtSide: "right",
    level: "Cơ bản",
        videoUrl: "",
    handMovement: {
      title: "Thủ Cầu Ngang Hông Thuận Tay",
      subTitle: "Cổ tay mở, đón cầu ngang sườn phải",
      description: "Thủ Cầu Ngang Hông Thuận Tay tại TRUNG TÂM PHẢI",
      coachingTip: "Cổ tay mở, đón cầu ngang sườn phải"
    },
    footMovement: {
      title: "Bộ pháp Ô 6",
      subTitle: "Hạ thấp gối, trọng tâm dồn đều hai chân",
      description: "Di chuyển đến TRUNG TÂM PHẢI",
      coachingTip: "Hạ thấp gối, trọng tâm dồn đều hai chân"
    },
    combinedMovement: {
      title: "Thủ Cầu Ngang Hông Thuận Tay",
      subTitle: "Cổ tay mở, đón cầu ngang sườn phải + Hạ thấp gối, trọng tâm dồn đều hai chân",
      description: "Thủ Cầu Ngang Hông Thuận Tay",
      coachingTip: "Tập trung chuẩn xác động tác"
    },
    variations: [
      {
        id: "pos_6_var_1",
        shotName: "Thủ Cầu Ngang Hông Thuận Tay",
        shotType: "Thủ cầu",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Thủ Cầu Ngang Hông Thuận Tay",
          subTitle: "Cổ tay mở, đón cầu ngang sườn phải",
          description: "Thủ Cầu Ngang Hông Thuận Tay",
          coachingTip: "Cổ tay mở, đón cầu ngang sườn phải"
        },
        footMovement: {
          title: "Bộ pháp Ô 6",
          subTitle: "Hạ thấp gối, trọng tâm dồn đều hai chân",
          description: "Bộ pháp Ô 6",
          coachingTip: "Hạ thấp gối, trọng tâm dồn đều hai chân"
        },
        combinedMovement: {
          title: "Thủ Cầu Ngang Hông Thuận Tay",
          subTitle: "Cổ tay mở, đón cầu ngang sườn phải + Hạ thấp gối, trọng tâm dồn đều hai chân",
          description: "Thủ Cầu Ngang Hông Thuận Tay",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_6_var_2",
        shotName: "Bước Trượt Ngang Đón Cầu Phải",
        shotType: "Bộ pháp",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Bước Trượt Ngang Đón Cầu Phải",
          subTitle: "Vợt giơ sẵn sàng trước ngực",
          description: "Bước Trượt Ngang Đón Cầu Phải",
          coachingTip: "Vợt giơ sẵn sàng trước ngực"
        },
        footMovement: {
          title: "Bộ pháp Ô 6",
          subTitle: "Trượt ngang chân phải mở rộng sang sườn",
          description: "Bộ pháp Ô 6",
          coachingTip: "Trượt ngang chân phải mở rộng sang sườn"
        },
        combinedMovement: {
          title: "Bước Trượt Ngang Đón Cầu Phải",
          subTitle: "Vợt giơ sẵn sàng trước ngực + Trượt ngang chân phải mở rộng sang sườn",
          description: "Bước Trượt Ngang Đón Cầu Phải",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_6_var_3",
        shotName: "Đỡ Cầu Ngang Ngực Thuận Tay",
        shotType: "Phòng thủ",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Đỡ Cầu Ngang Ngực Thuận Tay",
          subTitle: "Đỡ quả cầu đánh ép ngực phải đẩy đi an toàn",
          description: "Đỡ Cầu Ngang Ngực Thuận Tay",
          coachingTip: "Đỡ quả cầu đánh ép ngực phải đẩy đi an toàn"
        },
        footMovement: {
          title: "Bộ pháp Ô 6",
          subTitle: "Trụ vững hai chân hấp thụ chấn động",
          description: "Bộ pháp Ô 6",
          coachingTip: "Trụ vững hai chân hấp thụ chấn động"
        },
        combinedMovement: {
          title: "Đỡ Cầu Ngang Ngực Thuận Tay",
          subTitle: "Đỡ quả cầu đánh ép ngực phải đẩy đi an toàn + Trụ vững hai chân hấp thụ chấn động",
          description: "Đỡ Cầu Ngang Ngực Thuận Tay",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_6_var_4",
        shotName: "Phản Tạt Thuận Tay Đè Lưới",
        shotType: "Phản tạt",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Phản Tạt Thuận Tay Đè Lưới",
          subTitle: "Vung ngang vợt đè phẳng đường bay của cầu",
          description: "Phản Tạt Thuận Tay Đè Lưới",
          coachingTip: "Vung ngang vợt đè phẳng đường bay của cầu"
        },
        footMovement: {
          title: "Bộ pháp Ô 6",
          subTitle: "Bước chân phải đón cầu, dồn lực tiến",
          description: "Bộ pháp Ô 6",
          coachingTip: "Bước chân phải đón cầu, dồn lực tiến"
        },
        combinedMovement: {
          title: "Phản Tạt Thuận Tay Đè Lưới",
          subTitle: "Vung ngang vợt đè phẳng đường bay của cầu + Bước chân phải đón cầu, dồn lực tiến",
          description: "Phản Tạt Thuận Tay Đè Lưới",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_6_var_5",
        shotName: "Thủ Kê Cầu Sát Lưới Đổi Nhịp",
        shotType: "Thủ mềm",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Thủ Kê Cầu Sát Lưới Đổi Nhịp",
          subTitle: "Hãm xung lực cho bóng rơi sát vạch chữ T",
          description: "Thủ Kê Cầu Sát Lưới Đổi Nhịp",
          coachingTip: "Hãm xung lực cho bóng rơi sát vạch chữ T"
        },
        footMovement: {
          title: "Bộ pháp Ô 6",
          subTitle: "Giữ thăng bằng không bị chúi người",
          description: "Bộ pháp Ô 6",
          coachingTip: "Giữ thăng bằng không bị chúi người"
        },
        combinedMovement: {
          title: "Thủ Kê Cầu Sát Lưới Đổi Nhịp",
          subTitle: "Hãm xung lực cho bóng rơi sát vạch chữ T + Giữ thăng bằng không bị chúi người",
          description: "Thủ Kê Cầu Sát Lưới Đổi Nhịp",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_6_var_6",
        shotName: "Đẩy Cầu Nhanh Ngang Thân",
        shotType: "Phản tạt",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Đẩy Cầu Nhanh Ngang Thân",
          subTitle: "Đẩy nhanh mặt vợt đưa cầu đi sát người đối thủ",
          description: "Đẩy Cầu Nhanh Ngang Thân",
          coachingTip: "Đẩy nhanh mặt vợt đưa cầu đi sát người đối thủ"
        },
        footMovement: {
          title: "Bộ pháp Ô 6",
          subTitle: "Dồn trọng tâm chân thuận",
          description: "Bộ pháp Ô 6",
          coachingTip: "Dồn trọng tâm chân thuận"
        },
        combinedMovement: {
          title: "Đẩy Cầu Nhanh Ngang Thân",
          subTitle: "Đẩy nhanh mặt vợt đưa cầu đi sát người đối thủ + Dồn trọng tâm chân thuận",
          description: "Đẩy Cầu Nhanh Ngang Thân",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_6_var_7",
        shotName: "Đè Cầu Tấn Công Góc Nách Thuận Tay",
        shotType: "Tấn công",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Đè Cầu Tấn Công Góc Nách Thuận Tay",
          subTitle: "Bung lực cổ tay ép cầu cắm vào người đối thủ",
          description: "Đè Cầu Tấn Công Góc Nách Thuận Tay",
          coachingTip: "Bung lực cổ tay ép cầu cắm vào người đối thủ"
        },
        footMovement: {
          title: "Bộ pháp Ô 6",
          subTitle: "Tiến nửa bước dồn ép không gian",
          description: "Bộ pháp Ô 6",
          coachingTip: "Tiến nửa bước dồn ép không gian"
        },
        combinedMovement: {
          title: "Đè Cầu Tấn Công Góc Nách Thuận Tay",
          subTitle: "Bung lực cổ tay ép cầu cắm vào người đối thủ + Tiến nửa bước dồn ép không gian",
          description: "Đè Cầu Tấn Công Góc Nách Thuận Tay",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_6_var_8",
        shotName: "Bật Ngang Vợt Phản Tạt Chéo Biên",
        shotType: "Phản tạt chéo",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Bật Ngang Vợt Phản Tạt Chéo Biên",
          subTitle: "Chém xiên mặt vợt đưa cầu vút sang góc xa",
          description: "Bật Ngang Vợt Phản Tạt Chéo Biên",
          coachingTip: "Chém xiên mặt vợt đưa cầu vút sang góc xa"
        },
        footMovement: {
          title: "Bộ pháp Ô 6",
          subTitle: "Xoay người đẩy cơ thể hồi vị",
          description: "Bộ pháp Ô 6",
          coachingTip: "Xoay người đẩy cơ thể hồi vị"
        },
        combinedMovement: {
          title: "Bật Ngang Vợt Phản Tạt Chéo Biên",
          subTitle: "Chém xiên mặt vợt đưa cầu vút sang góc xa + Xoay người đẩy cơ thể hồi vị",
          description: "Bật Ngang Vợt Phản Tạt Chéo Biên",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_6_var_9",
        shotName: "Phản Đòn Smash Bằng Quả Tạt Cắm Sàn",
        shotType: "Phản công",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Phản Đòn Smash Bằng Quả Tạt Cắm Sàn",
          subTitle: "Mượn lực cú smash tạt ngược lại cắm sàn đối phương",
          description: "Phản Đòn Smash Bằng Quả Tạt Cắm Sàn",
          coachingTip: "Mượn lực cú smash tạt ngược lại cắm sàn đối phương"
        },
        footMovement: {
          title: "Bộ pháp Ô 6",
          subTitle: "Bật cổ tay đón đúng tâm vợt",
          description: "Bộ pháp Ô 6",
          coachingTip: "Bật cổ tay đón đúng tâm vợt"
        },
        combinedMovement: {
          title: "Phản Đòn Smash Bằng Quả Tạt Cắm Sàn",
          subTitle: "Mượn lực cú smash tạt ngược lại cắm sàn đối phương + Bật cổ tay đón đúng tâm vợt",
          description: "Phản Đòn Smash Bằng Quả Tạt Cắm Sàn",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_6_var_10",
        shotName: "Đỡ Cầu Bật Phản Công Dồn Dập",
        shotType: "Liên hoàn",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Đỡ Cầu Bật Phản Công Dồn Dập",
          subTitle: "Cứu cầu liên tục 2 nhịp chuyển thế trận chủ động",
          description: "Đỡ Cầu Bật Phản Công Dồn Dập",
          coachingTip: "Cứu cầu liên tục 2 nhịp chuyển thế trận chủ động"
        },
        footMovement: {
          title: "Bộ pháp Ô 6",
          subTitle: "Chuyển trụ chân trái sang phải linh hoạt",
          description: "Bộ pháp Ô 6",
          coachingTip: "Chuyển trụ chân trái sang phải linh hoạt"
        },
        combinedMovement: {
          title: "Đỡ Cầu Bật Phản Công Dồn Dập",
          subTitle: "Cứu cầu liên tục 2 nhịp chuyển thế trận chủ động + Chuyển trụ chân trái sang phải linh hoạt",
          description: "Đỡ Cầu Bật Phản Công Dồn Dập",
          coachingTip: "Tập trung chuẩn xác động tác"
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
    zoneName: "ĐÁY TRÁI",
    row: 3,
    col: 1,
    directionLabel: "Vị trí 7 - Góc đáy cuối sân bên trái",
    courtZone: "rear",
    courtSide: "left",
    level: "Cơ bản",
        videoUrl: "",
    handMovement: {
      title: "Bộ Pháp Lùi Chéo Góc Trái",
      subTitle: "Giơ vợt vòng qua đầu đón điểm rơi",
      description: "Bộ Pháp Lùi Chéo Góc Trái tại ĐÁY TRÁI",
      coachingTip: "Giơ vợt vòng qua đầu đón điểm rơi"
    },
    footMovement: {
      title: "Bộ pháp Ô 7",
      subTitle: "Bước chéo lùi chân đón bóng ở góc 8h",
      description: "Di chuyển đến ĐÁY TRÁI",
      coachingTip: "Bước chéo lùi chân đón bóng ở góc 8h"
    },
    combinedMovement: {
      title: "Bộ Pháp Lùi Chéo Góc Trái",
      subTitle: "Giơ vợt vòng qua đầu đón điểm rơi + Bước chéo lùi chân đón bóng ở góc 8h",
      description: "Bộ Pháp Lùi Chéo Góc Trái",
      coachingTip: "Tập trung chuẩn xác động tác"
    },
    variations: [
      {
        id: "pos_7_var_1",
        shotName: "Bộ Pháp Lùi Chéo Góc Trái",
        shotType: "Bộ pháp lùi",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Bộ Pháp Lùi Chéo Góc Trái",
          subTitle: "Giơ vợt vòng qua đầu đón điểm rơi",
          description: "Bộ Pháp Lùi Chéo Góc Trái",
          coachingTip: "Giơ vợt vòng qua đầu đón điểm rơi"
        },
        footMovement: {
          title: "Bộ pháp Ô 7",
          subTitle: "Bước chéo lùi chân đón bóng ở góc 8h",
          description: "Bộ pháp Ô 7",
          coachingTip: "Bước chéo lùi chân đón bóng ở góc 8h"
        },
        combinedMovement: {
          title: "Bộ Pháp Lùi Chéo Góc Trái",
          subTitle: "Giơ vợt vòng qua đầu đón điểm rơi + Bước chéo lùi chân đón bóng ở góc 8h",
          description: "Bộ Pháp Lùi Chéo Góc Trái",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_7_var_2",
        shotName: "Phông Cầu Vòng Đầu Thuận Tay",
        shotType: "Phông cầu",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Phông Cầu Vòng Đầu Thuận Tay",
          subTitle: "Vung tay vòng qua đầu phông sâu cuối sân",
          description: "Phông Cầu Vòng Đầu Thuận Tay",
          coachingTip: "Vung tay vòng qua đầu phông sâu cuối sân"
        },
        footMovement: {
          title: "Bộ pháp Ô 7",
          subTitle: "Chân phải làm trụ bật đổi chân (Scissor kick)",
          description: "Bộ pháp Ô 7",
          coachingTip: "Chân phải làm trụ bật đổi chân (Scissor kick)"
        },
        combinedMovement: {
          title: "Phông Cầu Vòng Đầu Thuận Tay",
          subTitle: "Vung tay vòng qua đầu phông sâu cuối sân + Chân phải làm trụ bật đổi chân (Scissor kick)",
          description: "Phông Cầu Vòng Đầu Thuận Tay",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_7_var_3",
        shotName: "Đón Điểm Rơi Góc Trái Đáy Sân",
        shotType: "Phán đoán",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Đón Điểm Rơi Góc Trái Đáy Sân",
          subTitle: "Mở rộng vai đón quả cầu bổng sâu",
          description: "Đón Điểm Rơi Góc Trái Đáy Sân",
          coachingTip: "Mở rộng vai đón quả cầu bổng sâu"
        },
        footMovement: {
          title: "Bộ pháp Ô 7",
          subTitle: "Lùi bước đuổi chân nhịp nhàng",
          description: "Bộ pháp Ô 7",
          coachingTip: "Lùi bước đuổi chân nhịp nhàng"
        },
        combinedMovement: {
          title: "Đón Điểm Rơi Góc Trái Đáy Sân",
          subTitle: "Mở rộng vai đón quả cầu bổng sâu + Lùi bước đuổi chân nhịp nhàng",
          description: "Đón Điểm Rơi Góc Trái Đáy Sân",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_7_var_4",
        shotName: "Cắt Cầu Chéo Sân Vòng Đầu",
        shotType: "Drop shot",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Cắt Cầu Chéo Sân Vòng Đầu",
          subTitle: "Chém nghiêng mặt vợt cắt cầu rơi chéo mép lưới",
          description: "Cắt Cầu Chéo Sân Vòng Đầu",
          coachingTip: "Chém nghiêng mặt vợt cắt cầu rơi chéo mép lưới"
        },
        footMovement: {
          title: "Bộ pháp Ô 7",
          subTitle: "Tiếp đất chân phải rồi đẩy tiến về tâm",
          description: "Bộ pháp Ô 7",
          coachingTip: "Tiếp đất chân phải rồi đẩy tiến về tâm"
        },
        combinedMovement: {
          title: "Cắt Cầu Chéo Sân Vòng Đầu",
          subTitle: "Chém nghiêng mặt vợt cắt cầu rơi chéo mép lưới + Tiếp đất chân phải rồi đẩy tiến về tâm",
          description: "Cắt Cầu Chéo Sân Vòng Đầu",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_7_var_5",
        shotName: "Đập Cầu Vòng Đầu Tấn Công",
        shotType: "Smash vòng đầu",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Đập Cầu Vòng Đầu Tấn Công",
          subTitle: "Gập bụng và cổ tay smash uy lực",
          description: "Đập Cầu Vòng Đầu Tấn Công",
          coachingTip: "Gập bụng và cổ tay smash uy lực"
        },
        footMovement: {
          title: "Bộ pháp Ô 7",
          subTitle: "Bật nhịp chân thuận dứt điểm",
          description: "Bộ pháp Ô 7",
          coachingTip: "Bật nhịp chân thuận dứt điểm"
        },
        combinedMovement: {
          title: "Đập Cầu Vòng Đầu Tấn Công",
          subTitle: "Gập bụng và cổ tay smash uy lực + Bật nhịp chân thuận dứt điểm",
          description: "Đập Cầu Vòng Đầu Tấn Công",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_7_var_6",
        shotName: "Phông Cao Sâu Ép Biên Trái",
        shotType: "Phông sâu",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Phông Cao Sâu Ép Biên Trái",
          subTitle: "Phát lực cổ tay đưa cầu cao vút sát vạch biên",
          description: "Phông Cao Sâu Ép Biên Trái",
          coachingTip: "Phát lực cổ tay đưa cầu cao vút sát vạch biên"
        },
        footMovement: {
          title: "Bộ pháp Ô 7",
          subTitle: "Xoay thân dồn lực vai",
          description: "Bộ pháp Ô 7",
          coachingTip: "Xoay thân dồn lực vai"
        },
        combinedMovement: {
          title: "Phông Cao Sâu Ép Biên Trái",
          subTitle: "Phát lực cổ tay đưa cầu cao vút sát vạch biên + Xoay thân dồn lực vai",
          description: "Phông Cao Sâu Ép Biên Trái",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_7_var_7",
        shotName: "Phông Cầu Trái Tay Cuối Sân (Backhand Clear)",
        shotType: "Phông trái tay",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Phông Cầu Trái Tay Cuối Sân (Backhand Clear)",
          subTitle: "Xoay lưng, bung hết lực cẳng tay ngón cái",
          description: "Phông Cầu Trái Tay Cuối Sân (Backhand Clear)",
          coachingTip: "Xoay lưng, bung hết lực cẳng tay ngón cái"
        },
        footMovement: {
          title: "Bộ pháp Ô 7",
          subTitle: "Bước chân phải dài về góc, lưng xoay về lưới",
          description: "Bộ pháp Ô 7",
          coachingTip: "Bước chân phải dài về góc, lưng xoay về lưới"
        },
        combinedMovement: {
          title: "Phông Cầu Trái Tay Cuối Sân (Backhand Clear)",
          subTitle: "Xoay lưng, bung hết lực cẳng tay ngón cái + Bước chân phải dài về góc, lưng xoay về lưới",
          description: "Phông Cầu Trái Tay Cuối Sân (Backhand Clear)",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_7_var_8",
        shotName: "Chém Cầu Trái Tay Rơi Lưới (Backhand Drop)",
        shotType: "Chém trái tay",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Chém Cầu Trái Tay Rơi Lưới (Backhand Drop)",
          subTitle: "Giả động tác phông sâu rồi chém nhẹ rơi lưới",
          description: "Chém Cầu Trái Tay Rơi Lưới (Backhand Drop)",
          coachingTip: "Giả động tác phông sâu rồi chém nhẹ rơi lưới"
        },
        footMovement: {
          title: "Bộ pháp Ô 7",
          subTitle: "Chân phải trụ vững, xoay người thu chân",
          description: "Bộ pháp Ô 7",
          coachingTip: "Chân phải trụ vững, xoay người thu chân"
        },
        combinedMovement: {
          title: "Chém Cầu Trái Tay Rơi Lưới (Backhand Drop)",
          subTitle: "Giả động tác phông sâu rồi chém nhẹ rơi lưới + Chân phải trụ vững, xoay người thu chân",
          description: "Chém Cầu Trái Tay Rơi Lưới (Backhand Drop)",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_7_var_9",
        shotName: "Bật Nhảy Smash Vòng Đầu Dứt Điểm",
        shotType: "Jump smash",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Bật Nhảy Smash Vòng Đầu Dứt Điểm",
          subTitle: "Bật cao gập người đập cắm biên",
          description: "Bật Nhảy Smash Vòng Đầu Dứt Điểm",
          coachingTip: "Bật cao gập người đập cắm biên"
        },
        footMovement: {
          title: "Bộ pháp Ô 7",
          subTitle: "Bật nhảy 2 chân trên không tiếp đất",
          description: "Bộ pháp Ô 7",
          coachingTip: "Bật nhảy 2 chân trên không tiếp đất"
        },
        combinedMovement: {
          title: "Bật Nhảy Smash Vòng Đầu Dứt Điểm",
          subTitle: "Bật cao gập người đập cắm biên + Bật nhảy 2 chân trên không tiếp đất",
          description: "Bật Nhảy Smash Vòng Đầu Dứt Điểm",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_7_var_10",
        shotName: "Giả Phông Chém Chéo Rơi Sát Mép Biên",
        shotType: "Đánh lừa",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Giả Phông Chém Chéo Rơi Sát Mép Biên",
          subTitle: "Đà vung phông cực mạnh nhưng vuốt cạnh vợt cắt cầu",
          description: "Giả Phông Chém Chéo Rơi Sát Mép Biên",
          coachingTip: "Đà vung phông cực mạnh nhưng vuốt cạnh vợt cắt cầu"
        },
        footMovement: {
          title: "Bộ pháp Ô 7",
          subTitle: "Thân người bay trên không đảo hướng",
          description: "Bộ pháp Ô 7",
          coachingTip: "Thân người bay trên không đảo hướng"
        },
        combinedMovement: {
          title: "Giả Phông Chém Chéo Rơi Sát Mép Biên",
          subTitle: "Đà vung phông cực mạnh nhưng vuốt cạnh vợt cắt cầu + Thân người bay trên không đảo hướng",
          description: "Giả Phông Chém Chéo Rơi Sát Mép Biên",
          coachingTip: "Tập trung chuẩn xác động tác"
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
    zoneName: "ĐÁY GIỮA",
    row: 3,
    col: 2,
    directionLabel: "Vị trí 8 - Đáy sân khu vực trung lộ",
    courtZone: "rear",
    courtSide: "center",
    level: "Cơ bản",
        videoUrl: "",
    handMovement: {
      title: "Bật Lùi Đón Cầu Đáy Giữa Sân",
      subTitle: "Mở rộng vai, giơ vợt cao nhất có thể",
      description: "Bật Lùi Đón Cầu Đáy Giữa Sân tại ĐÁY GIỮA",
      coachingTip: "Mở rộng vai, giơ vợt cao nhất có thể"
    },
    footMovement: {
      title: "Bộ pháp Ô 8",
      subTitle: "Bước giật lùi nhanh đón cầu sau đầu",
      description: "Di chuyển đến ĐÁY GIỮA",
      coachingTip: "Bước giật lùi nhanh đón cầu sau đầu"
    },
    combinedMovement: {
      title: "Bật Lùi Đón Cầu Đáy Giữa Sân",
      subTitle: "Mở rộng vai, giơ vợt cao nhất có thể + Bước giật lùi nhanh đón cầu sau đầu",
      description: "Bật Lùi Đón Cầu Đáy Giữa Sân",
      coachingTip: "Tập trung chuẩn xác động tác"
    },
    variations: [
      {
        id: "pos_8_var_1",
        shotName: "Bật Lùi Đón Cầu Đáy Giữa Sân",
        shotType: "Bộ pháp",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Bật Lùi Đón Cầu Đáy Giữa Sân",
          subTitle: "Mở rộng vai, giơ vợt cao nhất có thể",
          description: "Bật Lùi Đón Cầu Đáy Giữa Sân",
          coachingTip: "Mở rộng vai, giơ vợt cao nhất có thể"
        },
        footMovement: {
          title: "Bộ pháp Ô 8",
          subTitle: "Bước giật lùi nhanh đón cầu sau đầu",
          description: "Bộ pháp Ô 8",
          coachingTip: "Bước giật lùi nhanh đón cầu sau đầu"
        },
        combinedMovement: {
          title: "Bật Lùi Đón Cầu Đáy Giữa Sân",
          subTitle: "Mở rộng vai, giơ vợt cao nhất có thể + Bước giật lùi nhanh đón cầu sau đầu",
          description: "Bật Lùi Đón Cầu Đáy Giữa Sân",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_8_var_2",
        shotName: "Phông Cầu Bổng Sâu Đáy Sân",
        shotType: "Phông cao sâu",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Phông Cầu Bổng Sâu Đáy Sân",
          subTitle: "Phát lực trọn vẹn đưa cầu cao vút về vạch cuối",
          description: "Phông Cầu Bổng Sâu Đáy Sân",
          coachingTip: "Phát lực trọn vẹn đưa cầu cao vút về vạch cuối"
        },
        footMovement: {
          title: "Bộ pháp Ô 8",
          subTitle: "Đổi chân trên không đưa chân phải lên trước",
          description: "Bộ pháp Ô 8",
          coachingTip: "Đổi chân trên không đưa chân phải lên trước"
        },
        combinedMovement: {
          title: "Phông Cầu Bổng Sâu Đáy Sân",
          subTitle: "Phát lực trọn vẹn đưa cầu cao vút về vạch cuối + Đổi chân trên không đưa chân phải lên trước",
          description: "Phông Cầu Bổng Sâu Đáy Sân",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_8_var_3",
        shotName: "Bộ Pháp Scissor Kick Đón Cầu Cao",
        shotType: "Bộ pháp",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Bộ Pháp Scissor Kick Đón Cầu Cao",
          subTitle: "Bật đổi chân cắt kéo trên không",
          description: "Bộ Pháp Scissor Kick Đón Cầu Cao",
          coachingTip: "Bật đổi chân cắt kéo trên không"
        },
        footMovement: {
          title: "Bộ pháp Ô 8",
          subTitle: "Tiếp đất an toàn bằng chân thuận",
          description: "Bộ pháp Ô 8",
          coachingTip: "Tiếp đất an toàn bằng chân thuận"
        },
        combinedMovement: {
          title: "Bộ Pháp Scissor Kick Đón Cầu Cao",
          subTitle: "Bật đổi chân cắt kéo trên không + Tiếp đất an toàn bằng chân thuận",
          description: "Bộ Pháp Scissor Kick Đón Cầu Cao",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_8_var_4",
        shotName: "Chém Cầu Thẳng Rơi Lưới (Straight Drop)",
        shotType: "Drop shot",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Chém Cầu Thẳng Rơi Lưới (Straight Drop)",
          subTitle: "Chém vuốt cạnh quả cầu cho rơi sát lưới thẳng",
          description: "Chém Cầu Thẳng Rơi Lưới (Straight Drop)",
          coachingTip: "Chém vuốt cạnh quả cầu cho rơi sát lưới thẳng"
        },
        footMovement: {
          title: "Bộ pháp Ô 8",
          subTitle: "Hạ đà tiến lên đón cầu tiếp theo",
          description: "Bộ pháp Ô 8",
          coachingTip: "Hạ đà tiến lên đón cầu tiếp theo"
        },
        combinedMovement: {
          title: "Chém Cầu Thẳng Rơi Lưới (Straight Drop)",
          subTitle: "Chém vuốt cạnh quả cầu cho rơi sát lưới thẳng + Hạ đà tiến lên đón cầu tiếp theo",
          description: "Chém Cầu Thẳng Rơi Lưới (Straight Drop)",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_8_var_5",
        shotName: "Đập Cầu Cắm Sàn Giữa Sân",
        shotType: "Smash",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Đập Cầu Cắm Sàn Giữa Sân",
          subTitle: "Phát lực cổ tay cắm thẳng vào khe giữa hai đối thủ",
          description: "Đập Cầu Cắm Sàn Giữa Sân",
          coachingTip: "Phát lực cổ tay cắm thẳng vào khe giữa hai đối thủ"
        },
        footMovement: {
          title: "Bộ pháp Ô 8",
          subTitle: "Chân sau bật đưa về phía trước",
          description: "Bộ pháp Ô 8",
          coachingTip: "Chân sau bật đưa về phía trước"
        },
        combinedMovement: {
          title: "Đập Cầu Cắm Sàn Giữa Sân",
          subTitle: "Phát lực cổ tay cắm thẳng vào khe giữa hai đối thủ + Chân sau bật đưa về phía trước",
          description: "Đập Cầu Cắm Sàn Giữa Sân",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_8_var_6",
        shotName: "Phông Cầu Ép Sâu Vạch Cuối",
        shotType: "Phông sâu",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Phông Cầu Ép Sâu Vạch Cuối",
          subTitle: "Ép đối phương lùi sâu sát vách phông cầu",
          description: "Phông Cầu Ép Sâu Vạch Cuối",
          coachingTip: "Ép đối phương lùi sâu sát vách phông cầu"
        },
        footMovement: {
          title: "Bộ pháp Ô 8",
          subTitle: "Xoay thân hoàn tất cú đánh",
          description: "Bộ pháp Ô 8",
          coachingTip: "Xoay thân hoàn tất cú đánh"
        },
        combinedMovement: {
          title: "Phông Cầu Ép Sâu Vạch Cuối",
          subTitle: "Ép đối phương lùi sâu sát vách phông cầu + Xoay thân hoàn tất cú đánh",
          description: "Phông Cầu Ép Sâu Vạch Cuối",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_8_var_7",
        shotName: "Giả Phông Đập Chém Cầu Lỏng Tay",
        shotType: "Đánh lừa",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Giả Phông Đập Chém Cầu Lỏng Tay",
          subTitle: "Đà vung cực mạnh nhưng giảm tốc chạm bóng nhẹ",
          description: "Giả Phông Đập Chém Cầu Lỏng Tay",
          coachingTip: "Đà vung cực mạnh nhưng giảm tốc chạm bóng nhẹ"
        },
        footMovement: {
          title: "Bộ pháp Ô 8",
          subTitle: "Trụ cơ thể ổn định trên không",
          description: "Bộ pháp Ô 8",
          coachingTip: "Trụ cơ thể ổn định trên không"
        },
        combinedMovement: {
          title: "Giả Phông Đập Chém Cầu Lỏng Tay",
          subTitle: "Đà vung cực mạnh nhưng giảm tốc chạm bóng nhẹ + Trụ cơ thể ổn định trên không",
          description: "Giả Phông Đập Chém Cầu Lỏng Tay",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_8_var_8",
        shotName: "Bật Nhảy Hai Chân Đập Dứt Điểm",
        shotType: "Jump smash",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Bật Nhảy Hai Chân Đập Dứt Điểm",
          subTitle: "Treo người trên không smash cực đại",
          description: "Bật Nhảy Hai Chân Đập Dứt Điểm",
          coachingTip: "Treo người trên không smash cực đại"
        },
        footMovement: {
          title: "Bộ pháp Ô 8",
          subTitle: "Bật lò xo hai chân tiếp đất gối chùng",
          description: "Bộ pháp Ô 8",
          coachingTip: "Bật lò xo hai chân tiếp đất gối chùng"
        },
        combinedMovement: {
          title: "Bật Nhảy Hai Chân Đập Dứt Điểm",
          subTitle: "Treo người trên không smash cực đại + Bật lò xo hai chân tiếp đất gối chùng",
          description: "Bật Nhảy Hai Chân Đập Dứt Điểm",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_8_var_9",
        shotName: "Smash Điểm Rơi Cắm Khe Chữ T",
        shotType: "Smash điểm",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Smash Điểm Rơi Cắm Khe Chữ T",
          subTitle: "Gập cổ tay cắm bóng sát vạch chữ T đáy sân",
          description: "Smash Điểm Rơi Cắm Khe Chữ T",
          coachingTip: "Gập cổ tay cắm bóng sát vạch chữ T đáy sân"
        },
        footMovement: {
          title: "Bộ pháp Ô 8",
          subTitle: "Bật cao thu chân tiếp đất",
          description: "Bộ pháp Ô 8",
          coachingTip: "Bật cao thu chân tiếp đất"
        },
        combinedMovement: {
          title: "Smash Điểm Rơi Cắm Khe Chữ T",
          subTitle: "Gập cổ tay cắm bóng sát vạch chữ T đáy sân + Bật cao thu chân tiếp đất",
          description: "Smash Điểm Rơi Cắm Khe Chữ T",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_8_var_10",
        shotName: "Chém Cầu Đảo Cánh Đánh Gục Bộ Pháp",
        shotType: "Chém cầu",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Chém Cầu Đảo Cánh Đánh Gục Bộ Pháp",
          subTitle: "Chém xiên cắt ngang mặt cầu đổi góc 90 độ",
          description: "Chém Cầu Đảo Cánh Đánh Gục Bộ Pháp",
          coachingTip: "Chém xiên cắt ngang mặt cầu đổi góc 90 độ"
        },
        footMovement: {
          title: "Bộ pháp Ô 8",
          subTitle: "Thăng bằng hoàn hảo khi rơi xuống",
          description: "Bộ pháp Ô 8",
          coachingTip: "Thăng bằng hoàn hảo khi rơi xuống"
        },
        combinedMovement: {
          title: "Chém Cầu Đảo Cánh Đánh Gục Bộ Pháp",
          subTitle: "Chém xiên cắt ngang mặt cầu đổi góc 90 độ + Thăng bằng hoàn hảo khi rơi xuống",
          description: "Chém Cầu Đảo Cánh Đánh Gục Bộ Pháp",
          coachingTip: "Tập trung chuẩn xác động tác"
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
    zoneName: "ĐÁY PHẢI",
    row: 3,
    col: 3,
    directionLabel: "Vị trí 9 - Góc đáy cuối sân bên phải",
    courtZone: "rear",
    courtSide: "right",
    level: "Cơ bản",
        videoUrl: "",
    handMovement: {
      title: "Bộ Pháp Lùi Góc Thuận Tay",
      subTitle: "Mở góc vai phải, đưa vợt ra sau gáy chuẩn bị",
      description: "Bộ Pháp Lùi Góc Thuận Tay tại ĐÁY PHẢI",
      coachingTip: "Mở góc vai phải, đưa vợt ra sau gáy chuẩn bị"
    },
    footMovement: {
      title: "Bộ pháp Ô 9",
      subTitle: "Bước đuổi lùi chéo về góc 4h",
      description: "Di chuyển đến ĐÁY PHẢI",
      coachingTip: "Bước đuổi lùi chéo về góc 4h"
    },
    combinedMovement: {
      title: "Bộ Pháp Lùi Góc Thuận Tay",
      subTitle: "Mở góc vai phải, đưa vợt ra sau gáy chuẩn bị + Bước đuổi lùi chéo về góc 4h",
      description: "Bộ Pháp Lùi Góc Thuận Tay",
      coachingTip: "Tập trung chuẩn xác động tác"
    },
    variations: [
      {
        id: "pos_9_var_1",
        shotName: "Bộ Pháp Lùi Góc Thuận Tay",
        shotType: "Bộ pháp",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Bộ Pháp Lùi Góc Thuận Tay",
          subTitle: "Mở góc vai phải, đưa vợt ra sau gáy chuẩn bị",
          description: "Bộ Pháp Lùi Góc Thuận Tay",
          coachingTip: "Mở góc vai phải, đưa vợt ra sau gáy chuẩn bị"
        },
        footMovement: {
          title: "Bộ pháp Ô 9",
          subTitle: "Bước đuổi lùi chéo về góc 4h",
          description: "Bộ pháp Ô 9",
          coachingTip: "Bước đuổi lùi chéo về góc 4h"
        },
        combinedMovement: {
          title: "Bộ Pháp Lùi Góc Thuận Tay",
          subTitle: "Mở góc vai phải, đưa vợt ra sau gáy chuẩn bị + Bước đuổi lùi chéo về góc 4h",
          description: "Bộ Pháp Lùi Góc Thuận Tay",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_9_var_2",
        shotName: "Phông Cầu Cao Sâu Thuận Tay",
        shotType: "Phông cầu",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Phông Cầu Cao Sâu Thuận Tay",
          subTitle: "Vung hết biên độ phông cầu bổng sâu",
          description: "Phông Cầu Cao Sâu Thuận Tay",
          coachingTip: "Vung hết biên độ phông cầu bổng sâu"
        },
        footMovement: {
          title: "Bộ pháp Ô 9",
          subTitle: "Đổi chân bật kéo thân người về tâm",
          description: "Bộ pháp Ô 9",
          coachingTip: "Đổi chân bật kéo thân người về tâm"
        },
        combinedMovement: {
          title: "Phông Cầu Cao Sâu Thuận Tay",
          subTitle: "Vung hết biên độ phông cầu bổng sâu + Đổi chân bật kéo thân người về tâm",
          description: "Phông Cầu Cao Sâu Thuận Tay",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_9_var_3",
        shotName: "Đón Cầu Góc Thuận Tay Ổn Định",
        shotType: "Căn bản",
        level: "Cơ bản",
        videoUrl: "",
        handMovement: {
          title: "Đón Cầu Góc Thuận Tay Ổn Định",
          subTitle: "Đón điểm rơi đúng tầm với trước trán",
          description: "Đón Cầu Góc Thuận Tay Ổn Định",
          coachingTip: "Đón điểm rơi đúng tầm với trước trán"
        },
        footMovement: {
          title: "Bộ pháp Ô 9",
          subTitle: "Hạ gót chân phải làm điểm tựa",
          description: "Bộ pháp Ô 9",
          coachingTip: "Hạ gót chân phải làm điểm tựa"
        },
        combinedMovement: {
          title: "Đón Cầu Góc Thuận Tay Ổn Định",
          subTitle: "Đón điểm rơi đúng tầm với trước trán + Hạ gót chân phải làm điểm tựa",
          description: "Đón Cầu Góc Thuận Tay Ổn Định",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_9_var_4",
        shotName: "Chém Cầu Xiên Góc Thuận Tay (Cross Drop)",
        shotType: "Drop shot",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Chém Cầu Xiên Góc Thuận Tay (Cross Drop)",
          subTitle: "Cắt chéo mặt vợt đưa cầu rơi sát mép lưới đối diện",
          description: "Chém Cầu Xiên Góc Thuận Tay (Cross Drop)",
          coachingTip: "Cắt chéo mặt vợt đưa cầu rơi sát mép lưới đối diện"
        },
        footMovement: {
          title: "Bộ pháp Ô 9",
          subTitle: "Tiếp đất bằng chân phải, bật tiến",
          description: "Bộ pháp Ô 9",
          coachingTip: "Tiếp đất bằng chân phải, bật tiến"
        },
        combinedMovement: {
          title: "Chém Cầu Xiên Góc Thuận Tay (Cross Drop)",
          subTitle: "Cắt chéo mặt vợt đưa cầu rơi sát mép lưới đối diện + Tiếp đất bằng chân phải, bật tiến",
          description: "Chém Cầu Xiên Góc Thuận Tay (Cross Drop)",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_9_var_5",
        shotName: "Đập Cầu Dọc Biên Thuận Tay",
        shotType: "Smash dọc biên",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Đập Cầu Dọc Biên Thuận Tay",
          subTitle: "Smash cắm sát vạch biên đơn",
          description: "Đập Cầu Dọc Biên Thuận Tay",
          coachingTip: "Smash cắm sát vạch biên đơn"
        },
        footMovement: {
          title: "Bộ pháp Ô 9",
          subTitle: "Dồn trọng tâm chân phải bật tiến",
          description: "Bộ pháp Ô 9",
          coachingTip: "Dồn trọng tâm chân phải bật tiến"
        },
        combinedMovement: {
          title: "Đập Cầu Dọc Biên Thuận Tay",
          subTitle: "Smash cắm sát vạch biên đơn + Dồn trọng tâm chân phải bật tiến",
          description: "Đập Cầu Dọc Biên Thuận Tay",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_9_var_6",
        shotName: "Cắt Cầu Thẳng Rơi Sát Lưới",
        shotType: "Drop shot",
        level: "Trung cấp",
        videoUrl: "",
        handMovement: {
          title: "Cắt Cầu Thẳng Rơi Sát Lưới",
          subTitle: "Cắt thẳng quả cầu rơi êm ái sát mép lưới đối diện",
          description: "Cắt Cầu Thẳng Rơi Sát Lưới",
          coachingTip: "Cắt thẳng quả cầu rơi êm ái sát mép lưới đối diện"
        },
        footMovement: {
          title: "Bộ pháp Ô 9",
          subTitle: "Chuyển đà tiến về phía trước",
          description: "Bộ pháp Ô 9",
          coachingTip: "Chuyển đà tiến về phía trước"
        },
        combinedMovement: {
          title: "Cắt Cầu Thẳng Rơi Sát Lưới",
          subTitle: "Cắt thẳng quả cầu rơi êm ái sát mép lưới đối diện + Chuyển đà tiến về phía trước",
          description: "Cắt Cầu Thẳng Rơi Sát Lưới",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_9_var_7",
        shotName: "Nhảy Đập Jump Smash Uy Lực",
        shotType: "Jump smash",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Nhảy Đập Jump Smash Uy Lực",
          subTitle: "Bật cao điểm tiếp xúc tối đa, smash sấm sét",
          description: "Nhảy Đập Jump Smash Uy Lực",
          coachingTip: "Bật cao điểm tiếp xúc tối đa, smash sấm sét"
        },
        footMovement: {
          title: "Bộ pháp Ô 9",
          subTitle: "Bật nhảy chân thuận xoay hông trên không",
          description: "Bộ pháp Ô 9",
          coachingTip: "Bật nhảy chân thuận xoay hông trên không"
        },
        combinedMovement: {
          title: "Nhảy Đập Jump Smash Uy Lực",
          subTitle: "Bật cao điểm tiếp xúc tối đa, smash sấm sét + Bật nhảy chân thuận xoay hông trên không",
          description: "Nhảy Đập Jump Smash Uy Lực",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_9_var_8",
        shotName: "Chém Cầu Xoáy Giả Động Tác Đập",
        shotType: "Đánh lừa",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Chém Cầu Xoáy Giả Động Tác Đập",
          subTitle: "Giả vung smash nhưng miết cạnh vợt xoáy rơi sát lưới",
          description: "Chém Cầu Xoáy Giả Động Tác Đập",
          coachingTip: "Giả vung smash nhưng miết cạnh vợt xoáy rơi sát lưới"
        },
        footMovement: {
          title: "Bộ pháp Ô 9",
          subTitle: "Hãm đà trên không và lao lên bắt lưới",
          description: "Bộ pháp Ô 9",
          coachingTip: "Hãm đà trên không và lao lên bắt lưới"
        },
        combinedMovement: {
          title: "Chém Cầu Xoáy Giả Động Tác Đập",
          subTitle: "Giả vung smash nhưng miết cạnh vợt xoáy rơi sát lưới + Hãm đà trên không và lao lên bắt lưới",
          description: "Chém Cầu Xoáy Giả Động Tác Đập",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_9_var_9",
        shotName: "Đập Cầu Góc Nách Đối Phương",
        shotType: "Tấn công",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Đập Cầu Góc Nách Đối Phương",
          subTitle: "Smash nhắm thẳng vào nách tay cầm vợt đối thủ",
          description: "Đập Cầu Góc Nách Đối Phương",
          coachingTip: "Smash nhắm thẳng vào nách tay cầm vợt đối thủ"
        },
        footMovement: {
          title: "Bộ pháp Ô 9",
          subTitle: "Phát lực gập bụng dứt khoát",
          description: "Bộ pháp Ô 9",
          coachingTip: "Phát lực gập bụng dứt khoát"
        },
        combinedMovement: {
          title: "Đập Cầu Góc Nách Đối Phương",
          subTitle: "Smash nhắm thẳng vào nách tay cầm vợt đối thủ + Phát lực gập bụng dứt khoát",
          description: "Đập Cầu Góc Nách Đối Phương",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      },
      {
        id: "pos_9_var_10",
        shotName: "Stick Smash Búng Cổ Tay Chớp Nhoáng",
        shotType: "Stick smash",
        level: "Nâng cao",
        videoUrl: "",
        handMovement: {
          title: "Stick Smash Búng Cổ Tay Chớp Nhoáng",
          subTitle: "Búng cổ tay cực nhanh góc cắm hiểm",
          description: "Stick Smash Búng Cổ Tay Chớp Nhoáng",
          coachingTip: "Búng cổ tay cực nhanh góc cắm hiểm"
        },
        footMovement: {
          title: "Bộ pháp Ô 9",
          subTitle: "Bật nhảy nhịp một tiếp đất tức thì",
          description: "Bộ pháp Ô 9",
          coachingTip: "Bật nhảy nhịp một tiếp đất tức thì"
        },
        combinedMovement: {
          title: "Stick Smash Búng Cổ Tay Chớp Nhoáng",
          subTitle: "Búng cổ tay cực nhanh góc cắm hiểm + Bật nhảy nhịp một tiếp đất tức thì",
          description: "Stick Smash Búng Cổ Tay Chớp Nhoáng",
          coachingTip: "Tập trung chuẩn xác động tác"
        }
      }
    ]
  }
];
