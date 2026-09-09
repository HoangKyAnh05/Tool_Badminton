import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# 9 positions metadata
POS_META = [
    {
        "id": 1,
        "name": "Góc Lưới Trái (Net Left)",
        "zoneName": "LƯỚI TRÁI",
        "row": 1, "col": 1,
        "directionLabel": "Vị trí 1 - Góc lưới bên trái",
        "courtZone": "front", "courtSide": "left",
        "variations": [
            {"name": "Đỡ Cầu & Kê Lưới Trái Tay", "type": "Kê lưới", "level": "Cơ bản", "hand": "Mặt vợt ngửa 45 độ, thả lỏng cổ tay đón cầu sát lưới", "foot": "Split-step -> Bước đệm chân phải hướng góc 10h"},
            {"name": "Bước Lunge Đón Cầu Góc Lưới Trái", "type": "Bộ pháp", "level": "Cơ bản", "hand": "Giơ vợt ổn định trước ngực giữ thăng bằng", "foot": "Lunge chân phải vươn dài, gót chạm đất trước"},
            {"name": "Gài Lưới / Miết Cầu Xoáy Lộn Lưới", "type": "Bỏ nhỏ xoáy", "level": "Trung cấp", "hand": "Miết nhẹ đầu quả cầu tạo độ xoáy lộn mép lưới", "foot": "Chùng gối chân thuận hãm trọng tâm"},
            {"name": "Hất Cầu Bổng Sâu Góc Lưới Trái", "type": "Hất cầu sâu", "level": "Trung cấp", "hand": "Vung vợt từ dưới lên bung lực cẳng tay đẩy cầu sâu", "foot": "Bật đẩy chân phải tạo đà lùi về tâm"},
            {"name": "Vồ Cầu / Chụp Lưới Góc Trái", "type": "Vồ cầu dứt điểm", "level": "Nâng cao", "hand": "Đón cầu đỉnh lưới, búng ngón cái giật gõ cắm sàn", "foot": "Bứt tốc chân trái đẩy chân phải phóng dài"},
            {"name": "Múa Vợt Đổi Hướng Chém Chéo Lưới", "type": "Đánh lừa", "level": "Nâng cao", "hand": "Giả động tác đẩy thẳng rồi chém cổ tay chéo sân", "foot": "Giữ thăng bằng trên một chân rồi thu chân hồi vị"}
        ]
    },
    {
        "id": 2,
        "name": "Lưới Giữa (Front Center)",
        "zoneName": "LƯỚI GIỮA",
        "row": 1, "col": 2,
        "directionLabel": "Vị trí 2 - Trung lộ mép lưới (chữ T)",
        "courtZone": "front", "courtSide": "center",
        "variations": [
            {"name": "Chặn Đẩy Cầu Thẳng Mặt Lưới", "type": "Chặn đẩy", "level": "Cơ bản", "hand": "Đẩy mặt vợt thẳng hướng quả cầu rơi", "foot": "Bước thẳng chân phải vào vạch chữ T"},
            {"name": "Kê Cầu Chữ T Đổi Nhịp", "type": "Kê lưới", "level": "Cơ bản", "hand": "Thả lỏng cổ tay triệt tiêu lực quả cầu", "foot": "Chân thuận tiếp đất vững chắc"},
            {"name": "Đè Lưới / Phản Tạt Nhanh Giữa Sân", "type": "Đè lưới", "level": "Trung cấp", "hand": "Gập cổ tay chớp nhoáng đẩy cầu đi căng thấp", "foot": "Nhịp bật lướt đón cầu ngang tầm mắt"},
            {"name": "Bung Cầu Bổng Sang Hai Góc", "type": "Bung bổng", "level": "Trung cấp", "hand": "Bung lực cổ tay hất cao bổng sang góc trống", "foot": "Hạ thấp trọng tâm cứu cầu sát sàn"},
            {"name": "Búng Cổ Tay Chụp Lưới Dứt Điểm", "type": "Vồ cầu", "level": "Nâng cao", "hand": "Đón đỉnh lưới gõ cắm thẳng xuống đất đối thủ", "foot": "Bật rướn nhanh chặn đầu quả cầu"},
            {"name": "Giả Bỏ Nhỏ Gạt Cầu Sát Vách Lưới", "type": "Đánh lừa", "level": "Nâng cao", "hand": "Giữ nhịp vợt tĩnh (Hold) rồi gạt nhanh đổi hướng", "foot": "Trụ vững chân trước, cơ thể ổn định"}
        ]
    },
    {
        "id": 3,
        "name": "Góc Lưới Phải (Net Right)",
        "zoneName": "LƯỚI PHẢI",
        "row": 1, "col": 3,
        "directionLabel": "Vị trí 3 - Góc lưới bên phải",
        "courtZone": "front", "courtSide": "right",
        "variations": [
            {"name": "Kê Cầu Thuận Tay Sát Lưới", "type": "Kê lưới", "level": "Cơ bản", "hand": "Mặt vợt mở nhẹ thuận tay đón cầu êm", "foot": "Bước đệm chân phải hướng góc 2h"},
            {"name": "Bước Lunge Chân Thuận Góc Phải", "type": "Bộ pháp", "level": "Cơ bản", "hand": "Tay mở rộng giữ cân bằng trọng tâm", "foot": "Lunge dài chân phải, đùi song song mặt sàn"},
            {"name": "Miết Cầu Xoáy Lộn Lưới Thuận Tay", "type": "Bỏ nhỏ xoáy", "level": "Trung cấp", "hand": "Xoay cổ tay miết mép ngoài quả cầu lộn lưới", "foot": "Chân trụ hãm đà quán tính"},
            {"name": "Hất Cầu Bổng Sâu Thuận Tay", "type": "Hất cầu sâu", "level": "Trung cấp", "hand": "Vung hết biên độ hất cầu cao về đáy góc 7", "foot": "Bật lùi hồi vị ngay sau chạm cầu"},
            {"name": "Chụp Lưới / Đè Cầu Dứt Điểm Góc Phải", "type": "Đè lưới", "level": "Nâng cao", "hand": "Lao vào gõ cắm thẳng góc biên", "foot": "Bứt tốc bước dài áp sát mép lưới"},
            {"name": "Giả Động Tác Chém Chéo Góc Lưới", "type": "Đánh lừa", "level": "Nâng cao", "hand": "Vung giả đẩy thẳng rồi bẻ cổ tay cắt chéo", "foot": "Trọng tâm vững vàng hồi tâm sân"}
        ]
    },
    {
        "id": 4,
        "name": "Trung Tâm Trái (Midcourt Left)",
        "zoneName": "TRUNG TÂM TRÁI",
        "row": 2, "col": 1,
        "directionLabel": "Vị trí 4 - Trung lộ cánh trái",
        "courtZone": "mid", "courtSide": "left",
        "variations": [
            {"name": "Thủ Cầu Ngang Hông Trái Tay", "type": "Thủ cầu", "level": "Cơ bản", "hand": "Ngón cái tì cán vợt, mở mặt vợt đỡ trước hông", "foot": "Hạ thấp trọng tâm, hai chân mở rộng"},
            {"name": "Bước Trượt Ngang Đón Cầu Trái", "type": "Bộ pháp", "level": "Cơ bản", "hand": "Vợt giơ ngang ngực sẵn sàng", "foot": "Bước trượt ngang Chasse sang trái"},
            {"name": "Phản Tạt Ngang Lưới Trái Tay", "type": "Phản tạt", "level": "Trung cấp", "hand": "Vung ngang mặt vợt tạt thẳng mép lưới", "foot": "Xoay hông nhẹ dồn lực vào quả tạt"},
            {"name": "Thủ Cầu Chéo Góc Thoát Hiểm", "type": "Thủ chéo", "level": "Trung cấp", "hand": "Nghiêng góc vợt đẩy cầu rơi chéo sân đối diện", "foot": "Chùng gối trái nhận lực"},
            {"name": "Bung Phản Tạt Đè Góc Xa Trái Tay", "type": "Phản công", "level": "Nâng cao", "hand": "Bung hết lực ngón cái đè bóng sâu về góc trống", "foot": "Bật người đón cầu điểm cao nhất"},
            {"name": "Đỡ Smash Bỏ Nhỏ Đổi Nhịp", "type": "Hãm lực", "level": "Nâng cao", "hand": "Thả lỏng cổ tay đón cú smash cho cầu rơi sát lưới", "foot": "Đứng vững hai chân, giữ thân người tĩnh"}
        ]
    },
    {
        "id": 5,
        "name": "Tâm Sân (Court Center)",
        "zoneName": "TÂM SÂN",
        "row": 2, "col": 2,
        "directionLabel": "Vị trí 5 - Trung tâm điều phối chiến thuật",
        "courtZone": "mid", "courtSide": "center",
        "variations": [
            {"name": "Bật Nhẹ Split-Step Sẵn Sàng", "type": "Bộ pháp cơ bản", "level": "Cơ bản", "hand": "Vợt giơ ngang cằm, khuỷu tay mở rộng", "foot": "Bật nhảy hai chân tiếp đất bằng mũi chân"},
            {"name": "Bộ Pháp Di Chuyển 4 Góc Từ Tâm", "type": "Bộ pháp 4 góc", "level": "Cơ bản", "hand": "Phối hợp tay vợt linh hoạt theo hướng chạy", "foot": "Bước chéo chân xuất phát nhanh đến 4 góc"},
            {"name": "Bắt Bài Nhịp Cầu Nửa Sân", "type": "Bắt bài", "level": "Trung cấp", "hand": "Giơ vợt đón đầu quả cầu bay lửng giữa sân", "foot": "Bật một bước cắt ngang đường cầu"},
            {"name": "Xoay Hông Chuyển Trọng Tâm Nhanh", "type": "Hồi vị", "level": "Trung cấp", "hand": "Thu vợt về ngực sau mỗi pha đánh", "foot": "Xoay trục hông hồi vị ngay tâm ô số 5"},
            {"name": "Đón Cầu Trên Không Nhịp Một", "type": "Cắt cầu", "level": "Nâng cao", "hand": "Bật nhảy đón cầu trên không gõ cắm sàn", "foot": "Bật thẳng hai chân giậm nhảy tiếp đất an toàn"},
            {"name": "Đổi Hướng Đảo Chiều Đánh Lừa", "type": "Chiến thuật", "level": "Nâng cao", "hand": "Giả động tác sang trái rồi vung sang phải", "foot": "Đổi trụ chân tức thì đánh lừa phán đoán đối thủ"}
        ]
    },
    {
        "id": 6,
        "name": "Trung Tâm Phải (Midcourt Right)",
        "zoneName": "TRUNG TÂM PHẢI",
        "row": 2, "col": 3,
        "directionLabel": "Vị trí 6 - Trung lộ cánh phải",
        "courtZone": "mid", "courtSide": "right",
        "variations": [
            {"name": "Thủ Cầu Ngang Hông Thuận Tay", "type": "Thủ cầu", "level": "Cơ bản", "hand": "Cổ tay mở, đón cầu ngang sườn phải", "foot": "Hạ thấp gối, trọng tâm dồn đều hai chân"},
            {"name": "Bước Trượt Ngang Đón Cầu Phải", "type": "Bộ pháp", "level": "Cơ bản", "hand": "Vợt giơ sẵn sàng trước ngực", "foot": "Trượt ngang chân phải mở rộng sang sườn"},
            {"name": "Phản Tạt Thuận Tay Đè Lưới", "type": "Phản tạt", "level": "Trung cấp", "hand": "Vung ngang vợt đè phẳng đường bay của cầu", "foot": "Bước chân phải đón cầu, dồn lực tiến tới"},
            {"name": "Thủ Kê Cầu Sát Lưới Đổi Nhịp", "type": "Thủ mềm", "level": "Trung cấp", "hand": "Hãm xung lực cho bóng rơi sát vạch chữ T", "foot": "Giữ thăng bằng không bị chúi người"},
            {"name": "Đè Cầu Tấn Công Góc Nách", "type": "Tấn công", "level": "Nâng cao", "hand": "Bung lực cổ tay ép cầu cắm vào người đối thủ", "foot": "Tiến nửa bước dồn ép không gian"},
            {"name": "Bật Ngang Vợt Phản Tạt Chéo Biên", "type": "Phản tạt chéo", "level": "Nâng cao", "hand": "Chém xiên mặt vợt đưa cầu vút sang góc xa", "foot": "Xoay người đẩy cơ thể hồi vị"}
        ]
    },
    {
        "id": 7,
        "name": "Cuối Sân Trái (Rear Left)",
        "zoneName": "ĐÁY TRÁI",
        "row": 3, "col": 1,
        "directionLabel": "Vị trí 7 - Góc đáy cuối sân bên trái",
        "courtZone": "rear", "courtSide": "left",
        "variations": [
            {"name": "Bộ Pháp Lùi Chéo Góc Trái", "type": "Bộ pháp lùi", "level": "Cơ bản", "hand": "Giơ vợt vòng qua đầu đón điểm rơi", "foot": "Bước chéo lùi chân đón bóng ở góc 8h"},
            {"name": "Phông Cầu Vòng Đầu Thuận Tay", "type": "Phông cầu", "level": "Cơ bản", "hand": "Vung tay vòng qua đầu phông sâu cuối sân", "foot": "Chân phải làm trụ bật đổi chân (Scissor kick)"},
            {"name": "Cắt Cầu Chéo Sân Vòng Đầu", "type": "Drop shot", "level": "Trung cấp", "hand": "Chém nghiêng mặt vợt cắt cầu rơi chéo mép lưới", "foot": "Tiếp đất chân phải rồi đẩy tiến về tâm"},
            {"name": "Đập Cầu Vòng Đầu Tấn Công", "type": "Smash vòng đầu", "level": "Trung cấp", "hand": "Gập bụng và cổ tay smash uy lực", "foot": "Bật nhịp chân thuận dứt điểm"},
            {"name": "Phông Cầu Trái Tay Cuối Sân (Backhand Clear)", "type": "Phông trái tay", "level": "Nâng cao", "hand": "Xoay lưng, bung hết lực cẳng tay ngón cái", "foot": "Bước chân phải dài về góc, lưng xoay về lưới"},
            {"name": "Chém Cầu Trái Tay Rơi Lưới (Backhand Drop)", "type": "Chém trái tay", "level": "Nâng cao", "hand": "Giả động tác phông sâu rồi chém nhẹ rơi lưới", "foot": "Chân phải trụ vững, xoay người thu chân"},
            {"name": "Bật Nhảy Smash Vòng Đầu Dứt Điểm", "type": "Jump smash", "level": "Nâng cao", "hand": "Bật cao gập người đập cắm biên", "foot": "Bật nhảy 2 chân trên không tiếp đất an toàn"}
        ]
    },
    {
        "id": 8,
        "name": "Cuối Sân Giữa (Rear Center)",
        "zoneName": "ĐÁY GIỮA",
        "row": 3, "col": 2,
        "directionLabel": "Vị trí 8 - Đáy sân khu vực trung lộ",
        "courtZone": "rear", "courtSide": "center",
        "variations": [
            {"name": "Bật Lùi Đón Cầu Đáy Giữa Sân", "type": "Bộ pháp", "level": "Cơ bản", "hand": "Mở rộng vai, giơ vợt cao nhất có thể", "foot": "Bước giật lùi nhanh đón cầu sau đầu"},
            {"name": "Phông Cầu Bổng Sâu Đáy Sân", "type": "Phông cao sâu", "level": "Cơ bản", "hand": "Phát lực trọn vẹn đưa cầu cao vút về vạch cuối", "foot": "Đổi chân trên không đưa chân phải lên trước"},
            {"name": "Chém Cầu Thẳng Rơi Lưới (Straight Drop)", "type": "Drop shot", "level": "Trung cấp", "hand": "Chém vuốt cạnh quả cầu cho rơi sát lưới thẳng", "foot": "Hạ đà tiến lên đón cầu tiếp theo"},
            {"name": "Đập Cầu Cắm Sàn Giữa Sân", "type": "Smash", "level": "Trung cấp", "hand": "Phát lực cổ tay cắm thẳng vào khe giữa hai đối thủ", "foot": "Chân sau bật đưa về phía trước"},
            {"name": "Giả Phông Đập Chém Cầu Lỏng Tay", "type": "Đánh lừa", "level": "Nâng cao", "hand": "Đà vung cực mạnh nhưng giảm tốc chạm bóng nhẹ", "foot": "Trụ cơ thể ổn định trên không"},
            {"name": "Bật Nhảy Hai Chân Đập Dứt Điểm", "type": "Jump smash", "level": "Nâng cao", "hand": "Treo người trên không smash cực đại", "foot": "Bật lò xo hai chân tiếp đất gối chùng"}
        ]
    },
    {
        "id": 9,
        "name": "Cuối Sân Phải (Rear Right)",
        "zoneName": "ĐÁY PHẢI",
        "row": 3, "col": 3,
        "directionLabel": "Vị trí 9 - Góc đáy cuối sân bên phải",
        "courtZone": "rear", "courtSide": "right",
        "variations": [
            {"name": "Bộ Pháp Lùi Góc Thuận Tay", "type": "Bộ pháp", "level": "Cơ bản", "hand": "Mở góc vai phải, đưa vợt ra sau gáy chuẩn bị", "foot": "Bước đuổi lùi chéo về góc 4h"},
            {"name": "Phông Cầu Cao Sâu Thuận Tay", "type": "Phông cầu", "level": "Cơ bản", "hand": "Vung hết biên độ phông cầu bổng sâu", "foot": "Đổi chân bật kéo thân người về tâm"},
            {"name": "Chém Cầu Xiên Góc Thuận Tay (Cross Drop)", "type": "Drop shot", "level": "Trung cấp", "hand": "Cắt chéo mặt vợt đưa cầu rơi sát mép lưới đối diện", "foot": "Tiếp đất bằng chân phải, bật tiến"},
            {"name": "Đập Cầu Dọc Biên Thuận Tay", "type": "Smash dọc biên", "level": "Trung cấp", "hand": "Smash cắm sát vạch biên đơn", "foot": "Dồn trọng tâm chân phải bật tiến dứt khoát"},
            {"name": "Nhảy Đập Jump Smash Uy Lực", "type": "Jump smash", "level": "Nâng cao", "hand": "Bật cao điểm tiếp xúc tối đa, smash sấm sét", "foot": "Bật nhảy chân thuận xoay hông trên không"},
            {"name": "Chém Cầu Xoáy Giả Động Tác Đập", "type": "Đánh lừa", "level": "Nâng cao", "hand": "Giả vung smash nhưng miết cạnh vợt xoáy rơi sát lưới", "foot": "Hãm đà trên không và lao lên bắt lưới"}
        ]
    }
]

code = ['import { GridPosition } from "../types";\n\nexport const BADMINTON_POSITIONS: GridPosition[] = [']

for p in POS_META:
    pos_id = p["id"]
    code.append(f'  // ==========================================')
    code.append(f'  // Ô {pos_id}: {p["name"].upper()}')
    code.append(f'  // ==========================================')
    code.append('  {')
    code.append(f'    id: {pos_id},')
    code.append(f'    name: "{p["name"]}",')
    code.append(f'    zoneName: "{p["zoneName"]}",')
    code.append(f'    row: {p["row"]},')
    code.append(f'    col: {p["col"]},')
    code.append(f'    directionLabel: "{p["directionLabel"]}",')
    code.append(f'    courtZone: "{p["courtZone"]}",')
    code.append(f'    courtSide: "{p["courtSide"]}",')
    code.append(f'    level: "Cơ bản",')
    code.append(f'    videoUrl: "./videos/clips/pos_{pos_id}_clip_1.mp4",')

    v0 = p["variations"][0]
    code.append('    handMovement: {')
    code.append(f'      title: "{v0["name"]}",')
    code.append(f'      subTitle: "{v0["hand"]}",')
    code.append(f'      description: "{v0["name"]} tại {p["zoneName"]}",')
    code.append(f'      coachingTip: "{v0["hand"]}"')
    code.append('    },')
    code.append('    footMovement: {')
    code.append(f'      title: "Bộ pháp Ô {pos_id}",')
    code.append(f'      subTitle: "{v0["foot"]}",')
    code.append(f'      description: "Di chuyển đến {p["zoneName"]}",')
    code.append(f'      coachingTip: "{v0["foot"]}"')
    code.append('    },')
    code.append('    combinedMovement: {')
    code.append(f'      title: "{v0["name"]}",')
    code.append(f'      subTitle: "{v0["hand"]} + {v0["foot"]}",')
    code.append(f'      description: "{v0["name"]} tại {p["zoneName"]}",')
    code.append(f'      coachingTip: "Phối hợp tay và chân nhịp nhàng"')
    code.append('    },')

    code.append('    variations: [')
    for idx, v in enumerate(p["variations"], 1):
        v_url = f'./videos/clips/pos_{pos_id}_clip_{idx}.mp4'
        code.append('      {')
        code.append(f'        id: "pos_{pos_id}_var_{idx}",')
        code.append(f'        shotName: "{v["name"]}",')
        code.append(f'        shotType: "{v["type"]}",')
        code.append(f'        level: "{v["level"]}",')
        code.append(f'        videoUrl: "{v_url}",')
        code.append('        handMovement: {')
        code.append(f'          title: "{v["name"]}",')
        code.append(f'          subTitle: "{v["hand"]}",')
        code.append(f'          description: "{v["name"]}",')
        code.append(f'          coachingTip: "{v["hand"]}"')
        code.append('        },')
        code.append('        footMovement: {')
        code.append(f'          title: "Bộ pháp Ô {pos_id}",')
        code.append(f'          subTitle: "{v["foot"]}",')
        code.append(f'          description: "Bộ pháp Ô {pos_id}",')
        code.append(f'          coachingTip: "{v["foot"]}"')
        code.append('        },')
        code.append('        combinedMovement: {')
        code.append(f'          title: "{v["name"]}",')
        code.append(f'          subTitle: "{v["hand"]} + {v["foot"]}",')
        code.append(f'          description: "{v["name"]}",')
        code.append('          coachingTip: "Tập trung chuẩn xác động tác"')
        code.append('        }')
        code.append('      },' if idx < len(p["variations"]) else '      }')
    code.append('    ]')
    code.append('  },' if pos_id < 9 else '  }')

code.append('];\n')

target_file = os.path.join('src', 'data', 'movements.ts')
with open(target_file, 'w', encoding='utf-8') as f:
    f.write('\n'.join(code))

print(f"Đã tạo thành công {target_file} với 55 bài tập chi tiết chia theo 3 cấp độ!")
