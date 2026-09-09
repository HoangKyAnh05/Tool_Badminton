import os
import sys
import subprocess
import imageio_ffmpeg
import shutil

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

os.makedirs('public/videos/clips', exist_ok=True)
os.makedirs('dist/videos/clips', exist_ok=True)
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

# Exact configuration: 10 clips for EACH of the 9 positions = 90 clips!
# (pos_id, clip_idx, src_video, start_sec, dur_sec, name, level)
CONFIG_90 = [
    # ===== Ô 1: LƯỚI TRÁI (10 CLIPS) =====
    (1, 1, 'snaptik.vn_7501608184688299271.mp4', 1.0, 5.0, 'Đỡ Cầu & Kê Lưới Trái Tay', 'Cơ bản'),
    (1, 2, 'snaptik.vn_7598797082912181511.mp4', 2.0, 5.0, 'Bước Lunge Đón Cầu Góc Lưới Trái', 'Cơ bản'),
    (1, 3, 'snaptik.vn_7501608184688299271.mp4', 12.0, 5.0, 'Kê Cầu Vuốt Mép Lưới Đổi Nhịp', 'Cơ bản'),
    (1, 4, 'snaptik.vn_7501608184688299271.mp4', 6.5, 5.5, 'Gài Lưới / Miết Cầu Xoáy Lộn Lưới', 'Trung cấp'),
    (1, 5, 'snaptik.vn_7495761376141397255.mp4', 4.0, 5.5, 'Hất Cầu Bổng Sâu Góc Lưới Trái', 'Trung cấp'),
    (1, 6, 'snaptik.vn_7598797082912181511.mp4', 19.0, 5.0, 'Kéo Lưới Đổi Hướng Sang Biên Phải', 'Trung cấp'),
    (1, 7, 'viesnap.vn_tiktok_ZSq6N6mx5.mp4', 12.0, 5.5, 'Vồ Cầu / Chụp Lưới Góc Trái', 'Nâng cao'),
    (1, 8, 'snaptik.vn_7598797082912181511.mp4', 14.0, 5.0, 'Múa Vợt Đổi Hướng Chém Chéo Lưới', 'Nâng cao'),
    (1, 9, 'viesnap.vn_tiktok_ZSq6N6mx5.mp4', 75.0, 5.5, 'Giả Động Tác Đẩy Bổng Cắt Cầu Sát Lưới', 'Nâng cao'),
    (1, 10, 'viesnap.vn_tiktok_ZSq6N6mx5.mp4', 110.0, 5.5, 'Bật Lướt Đón Cầu Dứt Điểm Mép Chữ T', 'Nâng cao'),

    # ===== Ô 2: LƯỚI GIỮA (10 CLIPS) =====
    (2, 1, 'viesnap.vn_tiktok_ZSq6N6mx5.mp4', 25.0, 5.0, 'Chặn Đẩy Cầu Thẳng Mặt Lưới', 'Cơ bản'),
    (2, 2, 'snaptik.vn_7495761376141397255.mp4', 15.0, 5.0, 'Kê Cầu Chữ T Đổi Nhịp', 'Cơ bản'),
    (2, 3, 'viesnap.vn_tiktok_ZSq6N6mx5.mp4', 60.0, 5.0, 'Bước Thẳng Đón Cầu Chữ T', 'Cơ bản'),
    (2, 4, 'viesnap.vn_tiktok_ZSq6N6mx5.mp4', 38.0, 5.5, 'Đè Lưới / Phản Tạt Nhanh Giữa Sân', 'Trung cấp'),
    (2, 5, 'snaptik.vn_7495761376141397255.mp4', 28.0, 5.5, 'Bung Cầu Bổng Sang Hai Góc', 'Trung cấp'),
    (2, 6, 'snaptik.vn_7495761376141397255.mp4', 55.0, 5.0, 'Tạt Cầu Ngang Đầu Vợt Ép Đối Phương', 'Trung cấp'),
    (2, 7, 'viesnap.vn_tiktok_ZSq6NmtCb.mp4', 5.0, 5.0, 'Búng Cổ Tay Chụp Lưới Dứt Điểm', 'Nâng cao'),
    (2, 8, 'snaptik.vn_7681640086798159124.mp4', 18.0, 5.5, 'Giả Bỏ Nhỏ Gạt Cầu Sát Vách Lưới', 'Nâng cao'),
    (2, 9, 'viesnap.vn_tiktok_ZSq6NmtCb.mp4', 32.0, 5.0, 'Chớp Cơ Hội Bồi Cầu Cắm Sàn Chữ T', 'Nâng cao'),
    (2, 10, 'snaptik.vn_7681640086798159124.mp4', 60.0, 5.5, 'Bắt Bài Đường Cầu Tạt Ngang Đầu', 'Nâng cao'),

    # ===== Ô 3: LƯỚI PHẢI (10 CLIPS) =====
    (3, 1, 'snaptik.vn_7501608184688299271.mp4', 11.0, 5.0, 'Kê Cầu Thuận Tay Sát Lưới', 'Cơ bản'),
    (3, 2, 'snaptik.vn_7598797082912181511.mp4', 8.0, 5.0, 'Bước Lunge Chân Thuận Góc Phải', 'Cơ bản'),
    (3, 3, 'snaptik.vn_7501608184688299271.mp4', 3.0, 4.5, 'Kê Cầu Chéo Góc Thuận Tay', 'Cơ bản'),
    (3, 4, 'snaptik.vn_7495761376141397255.mp4', 38.0, 5.5, 'Miết Cầu Xoáy Lộn Lưới Thuận Tay', 'Trung cấp'),
    (3, 5, 'snaptik.vn_7495761376141397255.mp4', 48.0, 5.5, 'Hất Cầu Bổng Sâu Thuận Tay', 'Trung cấp'),
    (3, 6, 'snaptik.vn_7598797082912181511.mp4', 23.0, 4.5, 'Kéo Lưới Lừa Hướng Thuận Tay', 'Trung cấp'),
    (3, 7, 'viesnap.vn_tiktok_ZSq6N6mx5.mp4', 55.0, 5.5, 'Chụp Lưới / Đè Cầu Dứt Điểm Góc Phải', 'Nâng cao'),
    (3, 8, 'snaptik.vn_7681640086798159124.mp4', 35.0, 5.5, 'Giả Động Tác Chém Chéo Góc Lưới', 'Nâng cao'),
    (3, 9, 'viesnap.vn_tiktok_ZSq6N6mx5.mp4', 135.0, 5.5, 'Đè Cầu Tấn Công Góc Biên Thuận Tay', 'Nâng cao'),
    (3, 10, 'snaptik.vn_7681640086798159124.mp4', 85.0, 5.5, 'Bật Lao Người Chụp Cầu Mép Trên', 'Nâng cao'),

    # ===== Ô 4: TRUNG TÂM TRÁI (10 CLIPS) =====
    (4, 1, 'snaptik.vn_7665340734379281682.mp4', 1.0, 4.5, 'Thủ Cầu Ngang Hông Trái Tay', 'Cơ bản'),
    (4, 2, 'snaptik.vn_7372888645730192658.mp4', 2.0, 5.0, 'Bước Trượt Ngang Đón Cầu Trái', 'Cơ bản'),
    (4, 3, 'snaptik.vn_7665340734379281682.mp4', 11.0, 4.0, 'Đỡ Cầu Phản Xạ Tầm Trung', 'Cơ bản'),
    (4, 4, 'snaptik.vn_7495761376141397255.mp4', 8.0, 5.5, 'Phản Tạt Ngang Lưới Trái Tay', 'Trung cấp'),
    (4, 5, 'snaptik.vn_7665340734379281682.mp4', 7.0, 4.5, 'Thủ Cầu Chéo Góc Thoát Hiểm', 'Trung cấp'),
    (4, 6, 'snaptik.vn_7372888645730192658.mp4', 14.0, 5.0, 'Chặn Cầu Ngang Hông Hãm Xung Lực', 'Trung cấp'),
    (4, 7, 'viesnap.vn_tiktok_7556982998449655047.mp4', 22.0, 5.5, 'Bung Phản Tạt Đè Góc Xa Trái Tay', 'Nâng cao'),
    (4, 8, 'snaptik.vn_7372888645730192658.mp4', 8.0, 5.0, 'Đỡ Smash Bỏ Nhỏ Đổi Nhịp', 'Nâng cao'),
    (4, 9, 'viesnap.vn_tiktok_7556982998449655047.mp4', 90.0, 5.5, 'Phản Công Đè Cầu Tấn Công Góc Nách', 'Nâng cao'),
    (4, 10, 'viesnap.vn_tiktok_7556982998449655047.mp4', 120.0, 5.5, 'Bật Vẩy Cổ Tay Trái Tay Ép Đáy', 'Nâng cao'),

    # ===== Ô 5: TÂM SÂN (10 CLIPS) =====
    (5, 1, 'snaptik.vn_7465697345355713799.mp4', 5.0, 5.5, 'Bật Nhẹ Split-Step Sẵn Sàng', 'Cơ bản'),
    (5, 2, 'snaptik.vn_7500378802141269256.mp4', 3.0, 5.5, 'Bộ Pháp Di Chuyển 4 Góc Từ Tâm', 'Cơ bản'),
    (5, 3, 'snaptik.vn_7465697345355713799.mp4', 15.0, 5.0, 'Nhịp Dừng Hồi Tâm Ổn Định', 'Cơ bản'),
    (5, 4, 'snaptik.vn_7465697345355713799.mp4', 25.0, 5.5, 'Bắt Bài Nhịp Cầu Nửa Sân', 'Trung cấp'),
    (5, 5, 'viesnap.vn_tiktok_7556982998449655047.mp4', 45.0, 5.5, 'Xoay Hông Chuyển Trọng Tâm Nhanh', 'Trung cấp'),
    (5, 6, 'snaptik.vn_7500378802141269256.mp4', 18.0, 5.0, 'Bước Đệm Đón Cầu Nửa Sân', 'Trung cấp'),
    (5, 7, 'snaptik.vn_7669811035297172757.mp4', 12.0, 5.0, 'Đón Cầu Trên Không Nhịp Một', 'Nâng cao'),
    (5, 8, 'snaptik.vn_7465697345355713799.mp4', 55.0, 5.5, 'Đổi Hướng Đảo Chiều Đánh Lừa', 'Nâng cao'),
    (5, 9, 'snaptik.vn_7465697345355713799.mp4', 85.0, 5.5, 'Chớp Thời Cơ Cắt Cầu Giữa Sân', 'Nâng cao'),
    (5, 10, 'snaptik.vn_7669811035297172757.mp4', 28.0, 5.5, 'Hoán Đổi Vị Trí Công Thủ Linh Hoạt', 'Nâng cao'),

    # ===== Ô 6: TRUNG TÂM PHẢI (10 CLIPS) =====
    (6, 1, 'snaptik.vn_7665340734379281682.mp4', 2.0, 4.5, 'Thủ Cầu Ngang Hông Thuận Tay', 'Cơ bản'),
    (6, 2, 'snaptik.vn_7372888645730192658.mp4', 6.0, 5.0, 'Bước Trượt Ngang Đón Cầu Phải', 'Cơ bản'),
    (6, 3, 'snaptik.vn_7665340734379281682.mp4', 9.0, 4.0, 'Đỡ Cầu Ngang Ngực Thuận Tay', 'Cơ bản'),
    (6, 4, 'snaptik.vn_7495761376141397255.mp4', 20.0, 5.5, 'Phản Tạt Thuận Tay Đè Lưới', 'Trung cấp'),
    (6, 5, 'snaptik.vn_7372888645730192658.mp4', 13.0, 5.0, 'Thủ Kê Cầu Sát Lưới Đổi Nhịp', 'Trung cấp'),
    (6, 6, 'snaptik.vn_7495761376141397255.mp4', 60.0, 5.0, 'Đẩy Cầu Nhanh Ngang Thân', 'Trung cấp'),
    (6, 7, 'viesnap.vn_tiktok_7556982998449655047.mp4', 65.0, 5.5, 'Đè Cầu Tấn Công Góc Nách Thuận Tay', 'Nâng cao'),
    (6, 8, 'snaptik.vn_7495761376141397255.mp4', 32.0, 5.5, 'Bật Ngang Vợt Phản Tạt Chéo Biên', 'Nâng cao'),
    (6, 9, 'viesnap.vn_tiktok_7556982998449655047.mp4', 140.0, 5.5, 'Phản Đòn Smash Bằng Quả Tạt Cắm Sàn', 'Nâng cao'),
    (6, 10, 'snaptik.vn_7372888645730192658.mp4', 10.0, 5.0, 'Đỡ Cầu Bật Phản Công Dồn Dập', 'Nâng cao'),

    # ===== Ô 7: CUỐI SÂN TRÁI (10 CLIPS) =====
    (7, 1, 'snaptik.vn_7476759285720993040.mp4', 8.0, 5.5, 'Bộ Pháp Lùi Chéo Góc Trái', 'Cơ bản'),
    (7, 2, 'snaptik.vn_7567643845215669521.mp4', 4.0, 5.5, 'Phông Cầu Vòng Đầu Thuận Tay', 'Cơ bản'),
    (7, 3, 'snaptik.vn_7476759285720993040.mp4', 25.0, 5.0, 'Đón Điểm Rơi Góc Trái Đáy Sân', 'Cơ bản'),
    (7, 4, 'snaptik.vn_7568145336158440724.mp4', 3.0, 5.0, 'Cắt Cầu Chéo Sân Vòng Đầu', 'Trung cấp'),
    (7, 5, 'snaptik.vn_7651286512998288661.mp4', 5.0, 5.5, 'Đập Cầu Vòng Đầu Tấn Công', 'Trung cấp'),
    (7, 6, 'snaptik.vn_7567643845215669521.mp4', 15.0, 5.0, 'Phông Cao Sâu Ép Biên Trái', 'Trung cấp'),
    (7, 7, 'snaptik.vn_7476759285720993040.mp4', 35.0, 6.0, 'Phông Cầu Trái Tay Cuối Sân (Backhand Clear)', 'Nâng cao'),
    (7, 8, 'snaptik.vn_7568145336158440724.mp4', 12.0, 5.5, 'Chém Cầu Trái Tay Rơi Lưới (Backhand Drop)', 'Nâng cao'),
    (7, 9, 'snaptik.vn_7651286512998288661.mp4', 16.0, 5.5, 'Bật Nhảy Smash Vòng Đầu Dứt Điểm', 'Nâng cao'),
    (7, 10, 'snaptik.vn_7476759285720993040.mp4', 70.0, 5.5, 'Giả Phông Chém Chéo Rơi Sát Mép Biên', 'Nâng cao'),

    # ===== Ô 8: CUỐI SÂN GIỮA (10 CLIPS) =====
    (8, 1, 'snaptik.vn_7476759285720993040.mp4', 18.0, 5.5, 'Bật Lùi Đón Cầu Đáy Giữa Sân', 'Cơ bản'),
    (8, 2, 'snaptik.vn_7567643845215669521.mp4', 12.0, 5.5, 'Phông Cầu Bổng Sâu Đáy Sân', 'Cơ bản'),
    (8, 3, 'snaptik.vn_7476759285720993040.mp4', 42.0, 5.0, 'Bộ Pháp Scissor Kick Đón Cầu Cao', 'Cơ bản'),
    (8, 4, 'snaptik.vn_7568145336158440724.mp4', 6.0, 5.0, 'Chém Cầu Thẳng Rơi Lưới (Straight Drop)', 'Trung cấp'),
    (8, 5, 'snaptik.vn_7631002086502649109.mp4', 10.0, 5.5, 'Đập Cầu Cắm Sàn Giữa Sân', 'Trung cấp'),
    (8, 6, 'snaptik.vn_7567643845215669521.mp4', 28.0, 5.0, 'Phông Cầu Ép Sâu Vạch Cuối', 'Trung cấp'),
    (8, 7, 'snaptik.vn_7568145336158440724.mp4', 15.0, 5.0, 'Giả Phông Đập Chém Cầu Lỏng Tay', 'Nâng cao'),
    (8, 8, 'snaptik.vn_7631002086502649109.mp4', 28.0, 6.0, 'Bật Nhảy Hai Chân Đập Dứt Điểm', 'Nâng cao'),
    (8, 9, 'snaptik.vn_7631002086502649109.mp4', 48.0, 5.5, 'Smash Điểm Rơi Cắm Khe Chữ T', 'Nâng cao'),
    (8, 10, 'snaptik.vn_7568145336158440724.mp4', 1.0, 4.5, 'Chém Cầu Đảo Cánh Đánh Gục Bộ Pháp', 'Nâng cao'),

    # ===== Ô 9: CUỐI SÂN PHẢI (10 CLIPS) =====
    (9, 1, 'snaptik.vn_7476759285720993040.mp4', 50.0, 5.5, 'Bộ Pháp Lùi Góc Thuận Tay', 'Cơ bản'),
    (9, 2, 'snaptik.vn_7567643845215669521.mp4', 22.0, 5.5, 'Phông Cầu Cao Sâu Thuận Tay', 'Cơ bản'),
    (9, 3, 'snaptik.vn_7476759285720993040.mp4', 85.0, 5.0, 'Đón Cầu Góc Thuận Tay Ổn Định', 'Cơ bản'),
    (9, 4, 'snaptik.vn_7568145336158440724.mp4', 8.0, 5.0, 'Chém Cầu Xiên Góc Thuận Tay (Cross Drop)', 'Trung cấp'),
    (9, 5, 'snaptik.vn_7651286512998288661.mp4', 10.0, 5.5, 'Đập Cầu Dọc Biên Thuận Tay', 'Trung cấp'),
    (9, 6, 'snaptik.vn_7651286512998288661.mp4', 20.0, 4.5, 'Cắt Cầu Thẳng Rơi Sát Lưới', 'Trung cấp'),
    (9, 7, 'snaptik.vn_7631002086502649109.mp4', 40.0, 6.0, 'Nhảy Đập Jump Smash Uy Lực', 'Nâng cao'),
    (9, 8, 'viesnap.vn_tiktok_ZSq6NmtCb.mp4', 20.0, 5.5, 'Chém Cầu Xoáy Giả Động Tác Đập', 'Nâng cao'),
    (9, 9, 'snaptik.vn_7631002086502649109.mp4', 18.0, 5.5, 'Đập Cầu Góc Nách Đối Phương', 'Nâng cao'),
    (9, 10, 'viesnap.vn_tiktok_ZSq6NmtCb.mp4', 38.0, 5.5, 'Stick Smash Búng Cổ Tay Chớp Nhoáng', 'Nâng cao')
]

print(f"Bắt đầu cắt đúng 90 video clips (mỗi vị trí 10 video)...")

success_count = 0
for pos_id, clip_idx, src_name, start_t, dur_t, tech_name, level in CONFIG_90:
    src_path = os.path.join('public', 'videos', src_name)
    out_name = f'pos_{pos_id}_clip_{clip_idx}.mp4'
    out_pub = os.path.join('public', 'videos', 'clips', out_name)
    out_dist = os.path.join('dist', 'videos', 'clips', out_name)

    if not os.path.exists(src_path):
        continue

    # If clip already exists and non-empty, avoid redundant re-encoding
    if not (os.path.exists(out_pub) and os.path.getsize(out_pub) > 10000):
        cmd = [
            ffmpeg, '-y',
            '-ss', str(start_t),
            '-t', str(dur_t),
            '-i', src_path,
            '-c:v', 'libx264',
            '-preset', 'veryfast',
            '-crf', '24',
            '-an',
            '-movflags', '+faststart',
            out_pub
        ]
        subprocess.run(cmd, capture_output=True, text=True)

    if os.path.exists(out_pub) and os.path.getsize(out_pub) > 0:
        shutil.copy2(out_pub, out_dist)
        success_count += 1
        print(f"✓ Ô {pos_id} Clip {clip_idx}/10 [{level}]: {tech_name}")

print(f"\n===> HOÀN TẤT: Đã tạo thành công {success_count}/90 video clips cho 9 vị trí sân!")
