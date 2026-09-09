import os
import sys
import json

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# 9 positions x 10 clips metadata
POS_DATA = [
    {
        "id": 1, "name": "Góc Lưới Trái (Net Left)", "zoneName": "LƯỚI TRÁI",
        "row": 1, "col": 1, "directionLabel": "Vị trí 1 - Góc lưới bên trái",
        "courtZone": "front", "courtSide": "left",
        "clips": [
            ("Đỡ Cầu & Kê Lưới Trái Tay", "Kê lưới", "Cơ bản", "Mặt vợt ngửa 45 độ, thả lỏng cổ tay đón cầu sát lưới", "Split-step -> Bước đệm chân phải góc 10h"),
            ("Bước Lunge Đón Cầu Góc Lưới Trái", "Bộ pháp", "Cơ bản", "Giơ vợt ổn định trước ngực giữ thăng bằng", "Lunge chân phải vươn dài, gót chạm đất trước"),
            ("Kê Cầu Vuốt Mép Lưới Đổi Nhịp", "Kê lưới", "Cơ bản", "Vuốt nhẹ đầu vợt triệt tiêu quán tính quả cầu", "Chùng gối chân thuận hãm quán tính"),
            ("Gài Lưới / Miết Cầu Xoáy Lộn Lưới", "Bỏ nhỏ xoáy", "Trung cấp", "Miết nhẹ đầu quả cầu tạo độ xoáy lộn mép lưới", "Chân phải chạm đất đồng thời vung cổ tay"),
            ("Hất Cầu Bổng Sâu Góc Lưới Trái", "Hất bổng", "Trung cấp", "Vung vợt từ dưới lên bung lực cẳng tay đẩy cầu sâu", "Bật đẩy chân phải tạo đà lùi về tâm"),
            ("Kéo Lưới Đổi Hướng Sang Biên Phải", "Kéo lưới", "Trung cấp", "Nghiêng góc mặt vợt đưa cầu lướt ngang mép lưới", "Trụ vững chân trước, giữ thân thăng bằng"),
            ("Vồ Cầu / Chụp Lưới Góc Trái", "Vồ cầu", "Nâng cao", "Đón cầu đỉnh lưới, búng ngón cái giật gõ cắm sàn", "Bứt tốc chân trái đẩy chân phải phóng dài"),
            ("Múa Vợt Đổi Hướng Chém Chéo Lưới", "Đánh lừa", "Nâng cao", "Giả động tác đẩy thẳng rồi chém cổ tay chéo sân", "Giữ thăng bằng trên một chân rồi thu chân"),
            ("Giả Động Tác Đẩy Bổng Cắt Cầu Sát Lưới", "Kỹ xảo", "Nâng cao", "Tạo đà vung bổng nhưng hãm vợt miết nhẹ mép cầu", "Đổi trọng tâm tức thì đánh lừa đối phương"),
            ("Bật Lướt Đón Cầu Dứt Điểm Mép Chữ T", "Bật lướt", "Nâng cao", "Bật người trên không gõ cắm cầu trước khi qua lưới", "Bật bằng mũi chân trái, tiếp đất êm ái")
        ]
    },
    {
        "id": 2, "name": "Lưới Giữa (Front Center)", "zoneName": "LƯỚI GIỮA",
        "row": 1, "col": 2, "directionLabel": "Vị trí 2 - Trung lộ mép lưới (chữ T)",
        "courtZone": "front", "courtSide": "center",
        "clips": [
            ("Chặn Đẩy Cầu Thẳng Mặt Lưới", "Chặn đẩy", "Cơ bản", "Đẩy mặt vợt thẳng hướng quả cầu rơi", "Bước thẳng chân phải vào vạch chữ T"),
            ("Kê Cầu Chữ T Đổi Nhịp", "Kê lưới", "Cơ bản", "Thả lỏng cổ tay triệt tiêu lực quả cầu", "Chân thuận tiếp đất vững chắc"),
            ("Bước Thẳng Đón Cầu Chữ T", "Bộ pháp", "Cơ bản", "Đưa vợt sớm trước mặt đón đầu quả cầu", "Bước đuổi thẳng từ tâm sân vào chữ T"),
            ("Đè Lưới / Phản Tạt Nhanh Giữa Sân", "Đè lưới", "Trung cấp", "Gập cổ tay chớp nhoáng đẩy cầu đi căng thấp", "Nhịp bật lướt đón cầu ngang tầm mắt"),
            ("Bung Cầu Bổng Sang Hai Góc", "Bung bổng", "Trung cấp", "Bung lực cổ tay hất cao bổng sang góc trống", "Hạ thấp trọng tâm cứu cầu sát sàn"),
            ("Tạt Cầu Ngang Đầu Vợt Ép Đối Phương", "Phản tạt", "Trung cấp", "Tạt phẳng cầu sát mép trên của lưới", "Dậm chân phải tạo lực đè bóng"),
            ("Búng Cổ Tay Chụp Lưới Dứt Điểm", "Vồ cầu", "Nâng cao", "Đón đỉnh lưới gõ cắm thẳng xuống đất đối thủ", "Bật rướn nhanh chặn đầu quả cầu"),
            ("Giả Bỏ Nhỏ Gạt Cầu Sát Vách Lưới", "Đánh lừa", "Nâng cao", "Giữ nhịp vợt tĩnh (Hold) rồi gạt nhanh đổi hướng", "Trụ vững chân trước, cơ thể ổn định"),
            ("Chớp Cơ Hội Bồi Cầu Cắm Sàn Chữ T", "Bồi cầu", "Nâng cao", "Đón quả cầu trả bổng của đối phương đập cắm sàn", "Bật lò xo giậm nhảy dứt điểm"),
            ("Bắt Bài Đường Cầu Tạt Ngang Đầu", "Cắt cầu", "Nâng cao", "Đưa vợt đón lõng trên không đánh chặn tức thì", "Bật nhảy đón đầu hướng bay quả cầu")
        ]
    },
    {
        "id": 3, "name": "Góc Lưới Phải (Net Right)", "zoneName": "LƯỚI PHẢI",
        "row": 1, "col": 3, "directionLabel": "Vị trí 3 - Góc lưới bên phải",
        "courtZone": "front", "courtSide": "right",
        "clips": [
            ("Kê Cầu Thuận Tay Sát Lưới", "Kê lưới", "Cơ bản", "Mặt vợt mở nhẹ thuận tay đón cầu êm", "Bước đệm chân phải hướng góc 2h"),
            ("Bước Lunge Chân Thuận Góc Phải", "Bộ pháp", "Cơ bản", "Tay mở rộng giữ cân bằng trọng tâm", "Lunge dài chân phải, đùi song song mặt sàn"),
            ("Kê Cầu Chéo Góc Thuận Tay", "Kê lưới", "Cơ bản", "Nghiêng nhẹ mặt vợt đón cầu đưa sang góc đối diện", "Gót chân phải tiếp đất trước hãm đà"),
            ("Miết Cầu Xoáy Lộn Lưới Thuận Tay", "Bỏ nhỏ xoáy", "Trung cấp", "Xoay cổ tay miết mép ngoài quả cầu lộn lưới", "Chân trụ hãm đà quán tính"),
            ("Hất Cầu Bổng Sâu Thuận Tay", "Hất sâu", "Trung cấp", "Vung hết biên độ hất cầu cao về đáy góc 7", "Bật lùi hồi vị ngay sau chạm cầu"),
            ("Kéo Lưới Lừa Hướng Thuận Tay", "Kéo lưới", "Trung cấp", "Cắt chéo đường bay đưa cầu lướt dọc vạch trắng lưới", "Xoay hông nhẹ đẩy thân người"),
            ("Chụp Lưới / Đè Cầu Dứt Điểm Góc Phải", "Đè lưới", "Nâng cao", "Lao vào gõ cắm thẳng góc biên", "Bứt tốc bước dài áp sát mép lưới"),
            ("Giả Động Tác Chém Chéo Góc Lưới", "Đánh lừa", "Nâng cao", "Vung giả đẩy thẳng rồi bẻ cổ tay cắt chéo", "Trọng tâm vững vàng hồi tâm sân"),
            ("Đè Cầu Tấn Công Góc Biên Thuận Tay", "Tấn công", "Nâng cao", "Vung vợt biên độ hẹp gõ cắm sát vạch biên", "Bật chân phải lướt nhanh sát lưới"),
            ("Bật Lao Người Chụp Cầu Mép Trên", "Chụp cầu", "Nâng cao", "Vươn toàn thân đón cầu tầm cao dứt điểm", "Hãm đà an toàn tránh chạm lưới")
        ]
    },
    {
        "id": 4, "name": "Trung Tâm Trái (Midcourt Left)", "zoneName": "TRUNG TÂM TRÁI",
        "row": 2, "col": 1, "directionLabel": "Vị trí 4 - Trung lộ cánh trái",
        "courtZone": "mid", "courtSide": "left",
        "clips": [
            ("Thủ Cầu Ngang Hông Trái Tay", "Thủ cầu", "Cơ bản", "Ngón cái tì cán vợt, mở mặt vợt đỡ trước hông", "Hạ thấp trọng tâm, hai chân mở rộng"),
            ("Bước Trượt Ngang Đón Cầu Trái", "Bộ pháp", "Cơ bản", "Vợt giơ ngang ngực sẵn sàng", "Bước trượt ngang Chasse sang trái"),
            ("Đỡ Cầu Phản Xạ Tầm Trung", "Phòng thủ", "Cơ bản", "Mặt vợt vững vàng chặn quả đập ngang sườn", "Chùng gối hai chân hấp thụ xung lực"),
            ("Phản Tạt Ngang Lưới Trái Tay", "Phản tạt", "Trung cấp", "Vung ngang mặt vợt tạt thẳng mép lưới", "Xoay hông nhẹ dồn lực vào quả tạt"),
            ("Thủ Cầu Chéo Góc Thoát Hiểm", "Thủ chéo", "Trung cấp", "Nghiêng góc vợt đẩy cầu rơi chéo sân đối diện", "Chùng gối trái nhận lực"),
            ("Chặn Cầu Ngang Hông Hãm Xung Lực", "Hãm lực", "Trung cấp", "Thả lỏng ngón tay đón bóng làm bóng rơi sát lưới", "Thân trên giữ tĩnh ổn định"),
            ("Bung Phản Tạt Đè Góc Xa Trái Tay", "Phản công", "Nâng cao", "Bung hết lực ngón cái đè bóng sâu về góc trống", "Bật người đón cầu điểm cao nhất"),
            ("Đỡ Smash Bỏ Nhỏ Đổi Nhịp", "Hãm lực", "Nâng cao", "Thả lỏng cổ tay đón cú smash cho cầu rơi sát lưới", "Đứng vững hai chân, giữ thân người tĩnh"),
            ("Phản Công Đè Cầu Tấn Công Góc Nách", "Tấn công", "Nâng cao", "Bật người đè cầu cắm sát nách đối phương", "Dậm mạnh chân trái tạo điểm tựa"),
            ("Bật Vẩy Cổ Tay Trái Tay Ép Đáy", "Phát lực", "Nâng cao", "Búng cổ tay cực nhanh đưa cầu bay vút góc đáy đối diện", "Xoay trục thân người trợ lực")
        ]
    },
    {
        "id": 5, "name": "Tâm Sân (Court Center)", "zoneName": "TÂM SÂN",
        "row": 2, "col": 2, "directionLabel": "Vị trí 5 - Trung tâm điều phối chiến thuật",
        "courtZone": "mid", "courtSide": "center",
        "clips": [
            ("Bật Nhẹ Split-Step Sẵn Sàng", "Bộ pháp", "Cơ bản", "Vợt giơ ngang cằm, khuỷu tay mở rộng", "Bật nhảy hai chân tiếp đất bằng mũi chân"),
            ("Bộ Pháp Di Chuyển 4 Góc Từ Tâm", "Bộ pháp", "Cơ bản", "Phối hợp tay vợt linh hoạt theo hướng chạy", "Bước chéo chân xuất phát nhanh đến 4 góc"),
            ("Nhịp Dừng Hồi Tâm Ổn Định", "Hồi vị", "Cơ bản", "Thu vợt trước ngực sẵn sàng đón nhịp tiếp theo", "Trọng tâm rơi đúng tâm ô số 5"),
            ("Bắt Bài Nhịp Cầu Nửa Sân", "Bắt bài", "Trung cấp", "Giơ vợt đón đầu quả cầu bay lửng giữa sân", "Bật một bước cắt ngang đường cầu"),
            ("Xoay Hông Chuyển Trọng Tâm Nhanh", "Hồi vị", "Trung cấp", "Thu vợt về ngực sau mỗi pha đánh", "Xoay trục hông hồi vị ngay tâm ô số 5"),
            ("Bước Đệm Đón Cầu Nửa Sân", "Bộ pháp", "Trung cấp", "Đón cầu ngang ngực chuyển từ thủ sang công", "Bước đệm nhịp nhàng hai chân"),
            ("Đón Cầu Trên Không Nhịp Một", "Cắt cầu", "Nâng cao", "Bật nhảy đón cầu trên không gõ cắm sàn", "Bật thẳng hai chân giậm nhảy tiếp đất"),
            ("Đổi Hướng Đảo Chiều Đánh Lừa", "Chiến thuật", "Nâng cao", "Giả động tác sang trái rồi vung sang phải", "Đổi trụ chân tức thì đánh lừa đối thủ"),
            ("Chớp Thời Cơ Cắt Cầu Giữa Sân", "Tấn công", "Nâng cao", "Cắt ngang đường bay quả cầu dứt điểm cắm sàn", "Lao người chớp nhoáng trên không"),
            ("Hoán Đổi Vị Trí Công Thủ Linh Hoạt", "Đôi nam/nữ", "Nâng cao", "Phân công che chắn khu vực khi đồng đội dâng cao", "Di chuyển bọc lót theo hình thoi")
        ]
    },
    {
        "id": 6, "name": "Trung Tâm Phải (Midcourt Right)", "zoneName": "TRUNG TÂM PHẢI",
        "row": 2, "col": 3, "directionLabel": "Vị trí 6 - Trung lộ cánh phải",
        "courtZone": "mid", "courtSide": "right",
        "clips": [
            ("Thủ Cầu Ngang Hông Thuận Tay", "Thủ cầu", "Cơ bản", "Cổ tay mở, đón cầu ngang sườn phải", "Hạ thấp gối, trọng tâm dồn đều hai chân"),
            ("Bước Trượt Ngang Đón Cầu Phải", "Bộ pháp", "Cơ bản", "Vợt giơ sẵn sàng trước ngực", "Trượt ngang chân phải mở rộng sang sườn"),
            ("Đỡ Cầu Ngang Ngực Thuận Tay", "Phòng thủ", "Cơ bản", "Đỡ quả cầu đánh ép ngực phải đẩy đi an toàn", "Trụ vững hai chân hấp thụ chấn động"),
            ("Phản Tạt Thuận Tay Đè Lưới", "Phản tạt", "Trung cấp", "Vung ngang vợt đè phẳng đường bay của cầu", "Bước chân phải đón cầu, dồn lực tiến"),
            ("Thủ Kê Cầu Sát Lưới Đổi Nhịp", "Thủ mềm", "Trung cấp", "Hãm xung lực cho bóng rơi sát vạch chữ T", "Giữ thăng bằng không bị chúi người"),
            ("Đẩy Cầu Nhanh Ngang Thân", "Phản tạt", "Trung cấp", "Đẩy nhanh mặt vợt đưa cầu đi sát người đối thủ", "Dồn trọng tâm chân thuận"),
            ("Đè Cầu Tấn Công Góc Nách Thuận Tay", "Tấn công", "Nâng cao", "Bung lực cổ tay ép cầu cắm vào người đối thủ", "Tiến nửa bước dồn ép không gian"),
            ("Bật Ngang Vợt Phản Tạt Chéo Biên", "Phản tạt chéo", "Nâng cao", "Chém xiên mặt vợt đưa cầu vút sang góc xa", "Xoay người đẩy cơ thể hồi vị"),
            ("Phản Đòn Smash Bằng Quả Tạt Cắm Sàn", "Phản công", "Nâng cao", "Mượn lực cú smash tạt ngược lại cắm sàn đối phương", "Bật cổ tay đón đúng tâm vợt"),
            ("Đỡ Cầu Bật Phản Công Dồn Dập", "Liên hoàn", "Nâng cao", "Cứu cầu liên tục 2 nhịp chuyển thế trận chủ động", "Chuyển trụ chân trái sang phải linh hoạt")
        ]
    },
    {
        "id": 7, "name": "Cuối Sân Trái (Rear Left)", "zoneName": "ĐÁY TRÁI",
        "row": 3, "col": 1, "directionLabel": "Vị trí 7 - Góc đáy cuối sân bên trái",
        "courtZone": "rear", "courtSide": "left",
        "clips": [
            ("Bộ Pháp Lùi Chéo Góc Trái", "Bộ pháp lùi", "Cơ bản", "Giơ vợt vòng qua đầu đón điểm rơi", "Bước chéo lùi chân đón bóng ở góc 8h"),
            ("Phông Cầu Vòng Đầu Thuận Tay", "Phông cầu", "Cơ bản", "Vung tay vòng qua đầu phông sâu cuối sân", "Chân phải làm trụ bật đổi chân (Scissor kick)"),
            ("Đón Điểm Rơi Góc Trái Đáy Sân", "Phán đoán", "Cơ bản", "Mở rộng vai đón quả cầu bổng sâu", "Lùi bước đuổi chân nhịp nhàng"),
            ("Cắt Cầu Chéo Sân Vòng Đầu", "Drop shot", "Trung cấp", "Chém nghiêng mặt vợt cắt cầu rơi chéo mép lưới", "Tiếp đất chân phải rồi đẩy tiến về tâm"),
            ("Đập Cầu Vòng Đầu Tấn Công", "Smash vòng đầu", "Trung cấp", "Gập bụng và cổ tay smash uy lực", "Bật nhịp chân thuận dứt điểm"),
            ("Phông Cao Sâu Ép Biên Trái", "Phông sâu", "Trung cấp", "Phát lực cổ tay đưa cầu cao vút sát vạch biên", "Xoay thân dồn lực vai"),
            ("Phông Cầu Trái Tay Cuối Sân (Backhand Clear)", "Phông trái tay", "Nâng cao", "Xoay lưng, bung hết lực cẳng tay ngón cái", "Bước chân phải dài về góc, lưng xoay về lưới"),
            ("Chém Cầu Trái Tay Rơi Lưới (Backhand Drop)", "Chém trái tay", "Nâng cao", "Giả động tác phông sâu rồi chém nhẹ rơi lưới", "Chân phải trụ vững, xoay người thu chân"),
            ("Bật Nhảy Smash Vòng Đầu Dứt Điểm", "Jump smash", "Nâng cao", "Bật cao gập người đập cắm biên", "Bật nhảy 2 chân trên không tiếp đất"),
            ("Giả Phông Chém Chéo Rơi Sát Mép Biên", "Đánh lừa", "Nâng cao", "Đà vung phông cực mạnh nhưng vuốt cạnh vợt cắt cầu", "Thân người bay trên không đảo hướng")
        ]
    },
    {
        "id": 8, "name": "Cuối Sân Giữa (Rear Center)", "zoneName": "ĐÁY GIỮA",
        "row": 3, "col": 2, "directionLabel": "Vị trí 8 - Đáy sân khu vực trung lộ",
        "courtZone": "rear", "courtSide": "center",
        "clips": [
            ("Bật Lùi Đón Cầu Đáy Giữa Sân", "Bộ pháp", "Cơ bản", "Mở rộng vai, giơ vợt cao nhất có thể", "Bước giật lùi nhanh đón cầu sau đầu"),
            ("Phông Cầu Bổng Sâu Đáy Sân", "Phông cao sâu", "Cơ bản", "Phát lực trọn vẹn đưa cầu cao vút về vạch cuối", "Đổi chân trên không đưa chân phải lên trước"),
            ("Bộ Pháp Scissor Kick Đón Cầu Cao", "Bộ pháp", "Cơ bản", "Bật đổi chân cắt kéo trên không", "Tiếp đất an toàn bằng chân thuận"),
            ("Chém Cầu Thẳng Rơi Lưới (Straight Drop)", "Drop shot", "Trung cấp", "Chém vuốt cạnh quả cầu cho rơi sát lưới thẳng", "Hạ đà tiến lên đón cầu tiếp theo"),
            ("Đập Cầu Cắm Sàn Giữa Sân", "Smash", "Trung cấp", "Phát lực cổ tay cắm thẳng vào khe giữa hai đối thủ", "Chân sau bật đưa về phía trước"),
            ("Phông Cầu Ép Sâu Vạch Cuối", "Phông sâu", "Trung cấp", "Ép đối phương lùi sâu sát vách phông cầu", "Xoay thân hoàn tất cú đánh"),
            ("Giả Phông Đập Chém Cầu Lỏng Tay", "Đánh lừa", "Nâng cao", "Đà vung cực mạnh nhưng giảm tốc chạm bóng nhẹ", "Trụ cơ thể ổn định trên không"),
            ("Bật Nhảy Hai Chân Đập Dứt Điểm", "Jump smash", "Nâng cao", "Treo người trên không smash cực đại", "Bật lò xo hai chân tiếp đất gối chùng"),
            ("Smash Điểm Rơi Cắm Khe Chữ T", "Smash điểm", "Nâng cao", "Gập cổ tay cắm bóng sát vạch chữ T đáy sân", "Bật cao thu chân tiếp đất"),
            ("Chém Cầu Đảo Cánh Đánh Gục Bộ Pháp", "Chém cầu", "Nâng cao", "Chém xiên cắt ngang mặt cầu đổi góc 90 độ", "Thăng bằng hoàn hảo khi rơi xuống")
        ]
    },
    {
        "id": 9, "name": "Cuối Sân Phải (Rear Right)", "zoneName": "ĐÁY PHẢI",
        "row": 3, "col": 3, "directionLabel": "Vị trí 9 - Góc đáy cuối sân bên phải",
        "courtZone": "rear", "courtSide": "right",
        "clips": [
            ("Bộ Pháp Lùi Góc Thuận Tay", "Bộ pháp", "Cơ bản", "Mở góc vai phải, đưa vợt ra sau gáy chuẩn bị", "Bước đuổi lùi chéo về góc 4h"),
            ("Phông Cầu Cao Sâu Thuận Tay", "Phông cầu", "Cơ bản", "Vung hết biên độ phông cầu bổng sâu", "Đổi chân bật kéo thân người về tâm"),
            ("Đón Cầu Góc Thuận Tay Ổn Định", "Căn bản", "Cơ bản", "Đón điểm rơi đúng tầm với trước trán", "Hạ gót chân phải làm điểm tựa"),
            ("Chém Cầu Xiên Góc Thuận Tay (Cross Drop)", "Drop shot", "Trung cấp", "Cắt chéo mặt vợt đưa cầu rơi sát mép lưới đối diện", "Tiếp đất bằng chân phải, bật tiến"),
            ("Đập Cầu Dọc Biên Thuận Tay", "Smash dọc biên", "Trung cấp", "Smash cắm sát vạch biên đơn", "Dồn trọng tâm chân phải bật tiến"),
            ("Cắt Cầu Thẳng Rơi Sát Lưới", "Drop shot", "Trung cấp", "Cắt thẳng quả cầu rơi êm ái sát mép lưới đối diện", "Chuyển đà tiến về phía trước"),
            ("Nhảy Đập Jump Smash Uy Lực", "Jump smash", "Nâng cao", "Bật cao điểm tiếp xúc tối đa, smash sấm sét", "Bật nhảy chân thuận xoay hông trên không"),
            ("Chém Cầu Xoáy Giả Động Tác Đập", "Đánh lừa", "Nâng cao", "Giả vung smash nhưng miết cạnh vợt xoáy rơi sát lưới", "Hãm đà trên không và lao lên bắt lưới"),
            ("Đập Cầu Góc Nách Đối Phương", "Tấn công", "Nâng cao", "Smash nhắm thẳng vào nách tay cầm vợt đối thủ", "Phát lực gập bụng dứt khoát"),
            ("Stick Smash Búng Cổ Tay Chớp Nhoáng", "Stick smash", "Nâng cao", "Búng cổ tay cực nhanh góc cắm hiểm", "Bật nhảy nhịp một tiếp đất tức thì")
        ]
    }
]

# 1. GENERATE src/data/movements.ts
movements_code = ['import { GridPosition } from "../types";\n\nexport const BADMINTON_POSITIONS: GridPosition[] = [']

for p in POS_DATA:
    pos_id = p["id"]
    movements_code.append(f'  // ==========================================')
    movements_code.append(f'  // Ô {pos_id}: {p["name"].upper()}')
    movements_code.append(f'  // ==========================================')
    movements_code.append('  {')
    movements_code.append(f'    id: {pos_id},')
    movements_code.append(f'    name: "{p["name"]}",')
    movements_code.append(f'    zoneName: "{p["zoneName"]}",')
    movements_code.append(f'    row: {p["row"]},')
    movements_code.append(f'    col: {p["col"]},')
    movements_code.append(f'    directionLabel: "{p["directionLabel"]}",')
    movements_code.append(f'    courtZone: "{p["courtZone"]}",')
    movements_code.append(f'    courtSide: "{p["courtSide"]}",')
    movements_code.append('    level: "Cơ bản",')
    movements_code.append(f'    videoUrl: "./videos/clips/pos_{pos_id}_clip_1.mp4",')

    c0 = p["clips"][0]
    movements_code.append('    handMovement: {')
    movements_code.append(f'      title: "{c0[0]}",')
    movements_code.append(f'      subTitle: "{c0[3]}",')
    movements_code.append(f'      description: "{c0[0]} tại {p["zoneName"]}",')
    movements_code.append(f'      coachingTip: "{c0[3]}"')
    movements_code.append('    },')
    movements_code.append('    footMovement: {')
    movements_code.append(f'      title: "Bộ pháp Ô {pos_id}",')
    movements_code.append(f'      subTitle: "{c0[4]}",')
    movements_code.append(f'      description: "Di chuyển đến {p["zoneName"]}",')
    movements_code.append(f'      coachingTip: "{c0[4]}"')
    movements_code.append('    },')
    movements_code.append('    combinedMovement: {')
    movements_code.append(f'      title: "{c0[0]}",')
    movements_code.append(f'      subTitle: "{c0[3]} + {c0[4]}",')
    movements_code.append(f'      description: "{c0[0]}",')
    movements_code.append('      coachingTip: "Tập trung chuẩn xác động tác"')
    movements_code.append('    },')

    movements_code.append('    variations: [')
    for idx, c in enumerate(p["clips"], 1):
        v_url = f'./videos/clips/pos_{pos_id}_clip_{idx}.mp4'
        movements_code.append('      {')
        movements_code.append(f'        id: "pos_{pos_id}_var_{idx}",')
        movements_code.append(f'        shotName: "{c[0]}",')
        movements_code.append(f'        shotType: "{c[1]}",')
        movements_code.append(f'        level: "{c[2]}",')
        movements_code.append(f'        videoUrl: "{v_url}",')
        movements_code.append('        handMovement: {')
        movements_code.append(f'          title: "{c[0]}",')
        movements_code.append(f'          subTitle: "{c[3]}",')
        movements_code.append(f'          description: "{c[0]}",')
        movements_code.append(f'          coachingTip: "{c[3]}"')
        movements_code.append('        },')
        movements_code.append('        footMovement: {')
        movements_code.append(f'          title: "Bộ pháp Ô {pos_id}",')
        movements_code.append(f'          subTitle: "{c[4]}",')
        movements_code.append(f'          description: "Bộ pháp Ô {pos_id}",')
        movements_code.append(f'          coachingTip: "{c[4]}"')
        movements_code.append('        },')
        movements_code.append('        combinedMovement: {')
        movements_code.append(f'          title: "{c[0]}",')
        movements_code.append(f'          subTitle: "{c[3]} + {c[4]}",')
        movements_code.append(f'          description: "{c[0]}",')
        movements_code.append('          coachingTip: "Tập trung chuẩn xác động tác"')
        movements_code.append('        }')
        movements_code.append('      },' if idx < len(p["clips"]) else '      }')
    movements_code.append('    ]')
    movements_code.append('  },' if pos_id < 9 else '  }')

movements_code.append('];\n')

with open('src/data/movements.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(movements_code))
print("✓ Đã ghi src/data/movements.ts (90 variations)")

# 2. GENERATE src/data/videos.ts (13 categories x 10 videos = 130 videos)
videos_code = ['import { TacticsVideo } from "../types";\n\nexport const TACTICS_VIDEOS: TacticsVideo[] = [']

# A. 9 Vị trí sân (POS_1 đến POS_9, mỗi vị trí 10 video)
for p in POS_DATA:
    pos_id = p["id"]
    cat = f'POS_{pos_id}'
    videos_code.append(f'  // ==========================================')
    videos_code.append(f'  // CATEGORY: {cat} - {p["name"].upper()} (10 VIDEO)')
    videos_code.append(f'  // ==========================================')
    for idx, c in enumerate(p["clips"], 1):
        v_url = f'./videos/clips/pos_{pos_id}_clip_{idx}.mp4'
        videos_code.append('  {')
        videos_code.append(f'    id: "video-pos-{pos_id}-{idx}",')
        videos_code.append(f'    category: "{cat}",')
        videos_code.append(f'    positionId: {pos_id},')
        videos_code.append(f'    level: "{c[2]}",')
        videos_code.append(f'    title: "{c[0]}",')
        videos_code.append(f'    subTitle: "{p["zoneName"]} • {c[1]} • Cấp độ {c[2]}",')
        videos_code.append(f'    description: "{c[3]}. {c[4]}.",')
        videos_code.append(f'    videoUrl: "{v_url}",')
        videos_code.append(f'    durationText: "Clip {idx:02d}",')
        videos_code.append(f'    tags: ["Ô {pos_id}", "{p["zoneName"]}", "{c[2]}", "{c[1]}"]')
        videos_code.append('  },')

# B. 4 Chuyên mục thi đấu: DON_NAM (10), DOI_NAM (10), DON_NU (10), DOI_NU (10)
COMPETITION_CATS = [
    ('DON_NAM', 'Đơn Nam', [
        ('Kỹ Thuật Đọc Hướng & Di Chuyển 4 Góc Sân Đơn Nam', './videos/snaptik.vn_7465697345355713799.mp4', 'Bộ pháp đơn nam: Bật đà từ tâm sân, cứu cầu 4 góc và hồi vị tức thì', 'Cơ bản', 'Bài 01'),
        ('Chiến Thuật Ép Cầu Hai Góc Cuối Sân Đơn Nam', './videos/snaptik.vn_7476759285720993040.mp4', 'Kỹ năng phông bổng sâu, ép đối thủ xoay lưng và mở góc tấn công', 'Trung cấp', 'Bài 02'),
        ('Phản Xạ Bỏ Nhỏ Sát Lưới & Kéo Lưới Đổi Hướng', './videos/snaptik.vn_7501608184688299271.mp4', 'Miết mặt vợt tinh tế, gài cầu lộn mép lưới ép đối thủ nâng bổng', 'Trung cấp', 'Bài 03'),
        ('Kỹ Thuật Bước Lùi Đón Cầu & Chém Cầu Bạt Góc', './videos/snaptik.vn_7568145336158440724.mp4', 'Đổi góc vung vợt chém cầu rơi chéo sân đánh lừa phán đoán', 'Trung cấp', 'Bài 04'),
        ('Bật Nhảy Đập Cầu Tấn Công Dứt Điểm (Jump Smash Đơn Nam)', './videos/snaptik.vn_7631002086502649109.mp4', 'Tạo đà bằng chân thuận, bật cao gập bụng phát lực cắm sàn', 'Nâng cao', 'Bài 05'),
        ('Kỹ Năng Thủ Cầu Bung Sâu Đảo Ngược Thế Trận', './videos/snaptik.vn_7665340734379281682.mp4', 'Đón đỡ cú đập sát sườn hông, bung lực cẳng tay đẩy cầu về cuối sân', 'Cơ bản', 'Bài 06'),
        ('Stick Smash & Chém Cầu Lừa Hướng Cuối Sân Đơn Nam', './videos/clips/pos_8_clip_7.mp4', 'Vung đà đập cực mạnh nhưng giảm tốc chém lỏng tay rơi sát lưới', 'Nâng cao', 'Bài 07'),
        ('Bứt Tốc Lao Lưới Vồ Cầu Dứt Điểm Đơn Nam', './videos/clips/pos_1_clip_7.mp4', 'Bật người cực nhanh chớp cơ hội khi đối thủ bỏ nhỏ non', 'Nâng cao', 'Bài 08'),
        ('Kỹ Năng Phông Cầu Trái Tay Đảo Góc Cuối Sân', './videos/clips/pos_7_clip_7.mp4', 'Xoay lưng búng lực ngón cái giải tỏa áp lực góc chết', 'Nâng cao', 'Bài 09'),
        ('Bộ Pháp Di Chuyển Lùi Scissor Kick Chớp Nhoáng', './videos/clips/pos_8_clip_3.mp4', 'Bật đổi chân trên không tiếp đất chuẩn bị cho pha dứt điểm', 'Cơ bản', 'Bài 10')
    ]),
    ('DOI_NAM', 'Đôi Nam', [
        ('Chiến Thuật Bọc Lót & Đổi Vị Trí Trong Đôi Nam', './videos/viesnap.vn_tiktok_7556982998449655047.mp4', 'Quy tắc công - thủ, di chuyển xoay tua và phân công khu vực', 'Cơ bản', 'Bài 01'),
        ('Kỹ Năng Đè Lưới & Phản Tạt Ép Góc Đôi Nam', './videos/viesnap.vn_tiktok_ZSq6N6mx5.mp4', 'Kỹ thuật giữ lưới chủ động, tạt cầu thấp tước đoạt quyền tấn công', 'Trung cấp', 'Bài 02'),
        ('Phối Hợp Tấn Công Đập Cầu & Bồi Cầu Dứt Điểm', './videos/viesnap.vn_tiktok_ZSq6NmtCb.mp4', 'Phối hợp nhịp nhàng giữa người công sau và người đè trước', 'Nâng cao', 'Bài 03'),
        ('Kỹ Thuật Đè Lưới Cắt Đầu Vợt Tốc Độ Cao', './videos/clips/pos_2_clip_4.mp4', 'Bắt nhịp phản xạ cực nhanh không cho đối phương nâng bổng', 'Trung cấp', 'Bài 04'),
        ('Chiến Thuật Giữ Lưới Chủ Động & Búng Cổ Tay', './videos/clips/pos_2_clip_7.mp4', 'Đón đỉnh lưới gõ cắm thẳng xuống đất đối thủ', 'Nâng cao', 'Bài 05'),
        ('Đập Cầu Dọc Biên Uy Lực Ép Đối Thủ Mở Góc', './videos/clips/pos_9_clip_5.mp4', 'Cú smash sấm sét mở đường cho đồng đội dứt điểm trên lưới', 'Nâng cao', 'Bài 06'),
        ('Thủ Cầu Bung Góc Thoát Vây Bị Tấn Công Liên Hoàn', './videos/clips/pos_4_clip_4.mp4', 'Hạ trọng tâm đón cầu smash đẩy chéo góc xa thoát hiểm', 'Trung cấp', 'Bài 07'),
        ('Phản Tạt Căng Ngang Sườn Phá Thế Công Đôi Nam', './videos/clips/pos_6_clip_4.mp4', 'Đè phẳng đường bay quả cầu khiến đối thủ phải lùi thế phòng ngự', 'Trung cấp', 'Bài 08'),
        ('Bộ Pháp Bọc Lót Đôi Khi Đồng Đội Rướn Cứu Cầu', './videos/clips/pos_5_clip_10.mp4', 'Di chuyển bù khoảng trống tức thì giữ vững trận địa phòng thủ', 'Cơ bản', 'Bài 09'),
        ('Bắt Bài Đường Cầu Lửng Giữa Sân Chốt Hạ Trận Đấu', './videos/clips/pos_5_clip_9.mp4', 'Lao vào cắt ngang đường cầu dứt điểm cắm sàn chớp nhoáng', 'Nâng cao', 'Bài 10')
    ]),
    ('DON_NU', 'Đơn Nữ', [
        ('Kỹ Thuật Di Chuyển Bộ Pháp Dẻo Dai & Điều Cầu Đơn Nữ', './videos/snaptik.vn_7500378802141269256.mp4', 'Bộ pháp linh hoạt, di chuyển 4 góc sân êm ái và hồi vị nhịp nhàng', 'Cơ bản', 'Bài 01'),
        ('Chiến Thuật Ép Cầu Đáy Sân & Mở Góc Tấn Công Đơn Nữ', './videos/snaptik.vn_7567643845215669521.mp4', 'Kỹ thuật phông cầu cao sâu, khai thác khoảng trống hai góc biên', 'Trung cấp', 'Bài 02'),
        ('Kỹ Thuật Bỏ Nhỏ Sát Lưới & Kéo Lưới Lừa Hướng Đơn Nữ', './videos/snaptik.vn_7598797082912181511.mp4', 'Cảm giác mặt vợt tinh tế, cắt cầu đổi hướng đánh gục phản xạ', 'Trung cấp', 'Bài 03'),
        ('Kỹ Năng Đập Cầu Điểm Rơi & Chém Cầu Bạt Góc Đơn Nữ', './videos/snaptik.vn_7651286512998288661.mp4', 'Biến hóa giữa đập cắm biên và chém cầu rơi chéo sân dứt điểm', 'Nâng cao', 'Bài 04'),
        ('Kỹ Thuật Cắt Cầu Chéo Sân Vòng Đầu Đơn Nữ', './videos/clips/pos_7_clip_4.mp4', 'Vung tay giả phông sâu rồi miết vợt đưa cầu rơi sát mép lưới', 'Trung cấp', 'Bài 05'),
        ('Bộ Pháp Lunge Sâu Cứu Cầu Sát Sàn Đơn Nữ', './videos/clips/pos_1_clip_2.mp4', 'Hạ gối chùng sâu rướn người cứu những pha bỏ nhỏ hiểm hóc', 'Cơ bản', 'Bài 06'),
        ('Phông Cầu Cao Sâu Bền Bỉ Ép Đối Thủ Tiêu Hao Thể Lực', './videos/clips/pos_8_clip_2.mp4', 'Phát lực từ vai và cổ tay đưa cầu cắm sâu vạch cuối sân', 'Cơ bản', 'Bài 07'),
        ('Chém Cầu Thẳng Sát Lưới Ép Đối Thủ Rướn Cứu', './videos/clips/pos_8_clip_4.mp4', 'Chém cầu điểm rơi chính xác khiến đối phương bị động', 'Trung cấp', 'Bài 08'),
        ('Kỹ Năng Bật Nhảy Đập Điểm Rơi Sát Vạch Biên Đơn Nữ', './videos/clips/pos_9_clip_4.mp4', 'Gập cổ tay tạo độ cắm hiểm hóc sát mép vạch đơn', 'Nâng cao', 'Bài 09'),
        ('Kéo Lưới Lừa Hướng Đánh Gục Bộ Pháp Đối Phương', './videos/clips/pos_3_clip_6.mp4', 'Mặt vợt miết nhẹ đổi hướng bóng làm đối thủ lỡ đà', 'Nâng cao', 'Bài 10')
    ]),
    ('DOI_NU', 'Đôi Nữ', [
        ('Chiến Thuật Bọc Lót & Phòng Thủ Bền Bỉ Đôi Nữ', './videos/snaptik.vn_7372888645730192658.mp4', 'Phối hợp di chuyển bọc lót, cứu cầu liên hoàn và phá thế tấn công', 'Cơ bản', 'Bài 01'),
        ('Kỹ Thuật Phản Tạt Đè Cầu & Gài Lưới Đôi Nữ', './videos/snaptik.vn_7495761376141397255.mp4', 'Giữ thế chủ động trên lưới, tạt cầu thấp không cho đối thủ nâng bổng', 'Trung cấp', 'Bài 02'),
        ('Đổi Vị Trí Công - Thủ & Chuyển Giao Quyền Tấn Công', './videos/snaptik.vn_7669811035297172757.mp4', 'Quy tắc di chuyển hoán đổi trước - sau trong trận đấu đôi nữ', 'Trung cấp', 'Bài 03'),
        ('Tấn Công Liên Hoàn Đập Cầu & Bắt Lưới Dứt Điểm Đôi Nữ', './videos/snaptik.vn_7681640086798159124.mp4', 'Phối hợp nhịp nhàng giữa quả đập phía sau và quả chớp lưới phía trước', 'Nâng cao', 'Bài 04'),
        ('Kỹ Năng Gài Lưới Xoáy Ép Đối Thủ Nâng Cầu Bổng', './videos/clips/pos_1_clip_4.mp4', 'Miết mép vợt tạo độ lộn cầu sát mép lưới đối phương', 'Trung cấp', 'Bài 05'),
        ('Thủ Cầu Bung Cao Sâu Hồi Phục Đội Hình Đôi Nữ', './videos/clips/pos_4_clip_1.mp4', 'Bung hết lực cẳng tay đẩy cầu về tận đáy sân giải vây', 'Cơ bản', 'Bài 06'),
        ('Kỹ Năng Đè Lưới Chớp Nhoáng Cắt Đứt Đợt Tấn Công', './videos/clips/pos_2_clip_4.mp4', 'Chặn đầu quả tạt của đối phương tước đoạt quyền chủ động', 'Trung cấp', 'Bài 07'),
        ('Đập Cầu Liên Hoàn Phía Sau Cho Đồng Đội Lao Bắt Lưới', './videos/clips/pos_9_clip_5.mp4', 'Smash dồn dập ép đối thủ bung cầu non', 'Nâng cao', 'Bài 08'),
        ('Bọc Lót Góc Chết Cuối Sân Khi Đối Phương Ép Góc', './videos/clips/pos_7_clip_1.mp4', 'Di chuyển hoán đổi nhịp nhàng không để hở khoảng trống', 'Cơ bản', 'Bài 09'),
        ('Chụp Lưới Dứt Điểm Cắm Sàn Kết Thúc Pha Cầu Đôi Nữ', './videos/clips/pos_3_clip_7.mp4', 'Lao vào gõ cắm cầu chớp nhoáng tại mép lưới', 'Nâng cao', 'Bài 10')
    ])
]

for cat_id, cat_name, items in COMPETITION_CATS:
    videos_code.append(f'  // ==========================================')
    videos_code.append(f'  // CATEGORY: {cat_id} - {cat_name.upper()} (10 VIDEO)')
    videos_code.append(f'  // ==========================================')
    for idx, (title, v_url, desc, level, duration) in enumerate(items, 1):
        videos_code.append('  {')
        videos_code.append(f'    id: "video-{cat_id.lower().replace("_", "-")}-{idx}",')
        videos_code.append(f'    category: "{cat_id}",')
        videos_code.append(f'    level: "{level}",')
        videos_code.append(f'    title: "{title}",')
        videos_code.append(f'    subTitle: "{cat_name} • {level} • {duration}",')
        videos_code.append(f'    description: "{desc}",')
        videos_code.append(f'    videoUrl: "{v_url}",')
        videos_code.append(f'    durationText: "{duration}",')
        videos_code.append(f'    tags: ["{cat_name}", "{level}", "Thực chiến"]')
        videos_code.append('  },')

videos_code.append('];\n')

with open('src/data/videos.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(videos_code))
print("✓ Đã ghi src/data/videos.ts (130 videos, 13 categories x 10 videos)")
