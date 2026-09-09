import os
import sys
import subprocess
import imageio_ffmpeg

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

os.makedirs('public/videos/clips', exist_ok=True)
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

# Define 6 to 8 technique clips for each of the 9 positions:
# Each item: (pos_id, clip_idx, source_video, start_sec, duration_sec, technique_name, level)
CLIPS_CONFIG = [
    # ================= Ô 1: LƯỚI TRÁI =================
    (1, 1, 'snaptik.vn_7501608184688299271.mp4', 1.0, 5.0, 'Đỡ Cầu & Kê Lưới Trái Tay', 'Cơ bản'),
    (1, 2, 'snaptik.vn_7598797082912181511.mp4', 2.0, 5.5, 'Bước Lunge Đón Cầu Góc Lưới Trái', 'Cơ bản'),
    (1, 3, 'snaptik.vn_7501608184688299271.mp4', 6.5, 5.5, 'Gài Lưới / Miết Cầu Xoáy Lộn Lưới', 'Trung cấp'),
    (1, 4, 'snaptik.vn_7495761376141397255.mp4', 4.0, 6.0, 'Hất Cầu Bổng Sâu Góc Lưới Trái', 'Trung cấp'),
    (1, 5, 'viesnap.vn_tiktok_ZSq6N6mx5.mp4', 12.0, 6.0, 'Vồ Cầu / Chụp Lưới Góc Trái', 'Nâng cao'),
    (1, 6, 'snaptik.vn_7598797082912181511.mp4', 14.0, 5.5, 'Múa Vợt Đổi Hướng Chém Chéo Lưới', 'Nâng cao'),

    # ================= Ô 2: LƯỚI GIỮA =================
    (2, 1, 'viesnap.vn_tiktok_ZSq6N6mx5.mp4', 25.0, 5.5, 'Chặn Đẩy Cầu Thẳng Mặt Lưới', 'Cơ bản'),
    (2, 2, 'snaptik.vn_7495761376141397255.mp4', 15.0, 5.5, 'Kê Cầu Chữ T Đổi Nhịp', 'Cơ bản'),
    (2, 3, 'viesnap.vn_tiktok_ZSq6N6mx5.mp4', 38.0, 6.0, 'Đè Lưới / Phản Tạt Nhanh Giữa Sân', 'Trung cấp'),
    (2, 4, 'snaptik.vn_7495761376141397255.mp4', 28.0, 6.0, 'Bung Cầu Bổng Sang Hai Góc', 'Trung cấp'),
    (2, 5, 'viesnap.vn_tiktok_ZSq6NmtCb.mp4', 5.0, 5.5, 'Búng Cổ Tay Chụp Lưới Dứt Điểm', 'Nâng cao'),
    (2, 6, 'snaptik.vn_7681640086798159124.mp4', 18.0, 6.0, 'Giả Bỏ Nhỏ Gạt Cầu Sát Vách Lưới', 'Nâng cao'),

    # ================= Ô 3: LƯỚI PHẢI =================
    (3, 1, 'snaptik.vn_7501608184688299271.mp4', 11.0, 5.5, 'Kê Cầu Thuận Tay Sát Lưới', 'Cơ bản'),
    (3, 2, 'snaptik.vn_7598797082912181511.mp4', 8.0, 5.5, 'Bước Lunge Chân Thuận Góc Phải', 'Cơ bản'),
    (3, 3, 'snaptik.vn_7495761376141397255.mp4', 38.0, 6.0, 'Miết Cầu Xoáy Lộn Lưới Thuận Tay', 'Trung cấp'),
    (3, 4, 'snaptik.vn_7495761376141397255.mp4', 48.0, 6.0, 'Hất Cầu Bổng Sâu Thuận Tay', 'Trung cấp'),
    (3, 5, 'viesnap.vn_tiktok_ZSq6N6mx5.mp4', 55.0, 6.0, 'Chụp Lưới / Đè Cầu Dứt Điểm Góc Phải', 'Nâng cao'),
    (3, 6, 'snaptik.vn_7681640086798159124.mp4', 35.0, 6.0, 'Giả Động Tác Chém Chéo Góc Lưới', 'Nâng cao'),

    # ================= Ô 4: TRUNG TÂM TRÁI =================
    (4, 1, 'snaptik.vn_7665340734379281682.mp4', 1.0, 5.0, 'Thủ Cầu Ngang Hông Trái Tay', 'Cơ bản'),
    (4, 2, 'snaptik.vn_7372888645730192658.mp4', 2.0, 5.5, 'Bước Trượt Ngang Đón Cầu Trái', 'Cơ bản'),
    (4, 3, 'snaptik.vn_7495761376141397255.mp4', 8.0, 6.0, 'Phản Tạt Ngang Lưới Trái Tay', 'Trung cấp'),
    (4, 4, 'snaptik.vn_7665340734379281682.mp4', 7.0, 5.5, 'Thủ Cầu Chéo Góc Thoát Hiểm', 'Trung cấp'),
    (4, 5, 'viesnap.vn_tiktok_7556982998449655047.mp4', 22.0, 6.0, 'Bung Phản Tạt Đè Góc Xa Trái Tay', 'Nâng cao'),
    (4, 6, 'snaptik.vn_7372888645730192658.mp4', 11.0, 6.0, 'Đỡ Smash Bỏ Nhỏ Đổi Nhịp', 'Nâng cao'),

    # ================= Ô 5: TÂM SÂN =================
    (5, 1, 'snaptik.vn_7465697345355713799.mp4', 5.0, 6.0, 'Bật Nhẹ Split-Step Sẵn Sàng', 'Cơ bản'),
    (5, 2, 'snaptik.vn_7500378802141269256.mp4', 3.0, 6.0, 'Bộ Pháp Di Chuyển 4 Góc Từ Tâm', 'Cơ bản'),
    (5, 3, 'snaptik.vn_7465697345355713799.mp4', 25.0, 6.5, 'Bắt Bài Nhịp Cầu Nửa Sân', 'Trung cấp'),
    (5, 4, 'viesnap.vn_tiktok_7556982998449655047.mp4', 45.0, 6.5, 'Xoay Hông Chuyển Trọng Tâm Nhanh', 'Trung cấp'),
    (5, 5, 'snaptik.vn_7669811035297172757.mp4', 12.0, 6.0, 'Đón Cầu Trên Không Nhịp Một', 'Nâng cao'),
    (5, 6, 'snaptik.vn_7465697345355713799.mp4', 55.0, 6.5, 'Đổi Hướng Đảo Chiều Đánh Lừa', 'Nâng cao'),

    # ================= Ô 6: TRUNG TÂM PHẢI =================
    (6, 1, 'snaptik.vn_7665340734379281682.mp4', 2.0, 5.0, 'Thủ Cầu Ngang Hông Thuận Tay', 'Cơ bản'),
    (6, 2, 'snaptik.vn_7372888645730192658.mp4', 6.0, 5.5, 'Bước Trượt Ngang Đón Cầu Phải', 'Cơ bản'),
    (6, 3, 'snaptik.vn_7495761376141397255.mp4', 20.0, 6.0, 'Phản Tạt Thuận Tay Đè Lưới', 'Trung cấp'),
    (6, 4, 'snaptik.vn_7372888645730192658.mp4', 13.0, 5.5, 'Thủ Kê Cầu Sát Lưới Đổi Nhịp', 'Trung cấp'),
    (6, 5, 'viesnap.vn_tiktok_7556982998449655047.mp4', 65.0, 6.0, 'Đè Cầu Tấn Công Góc Nách', 'Nâng cao'),
    (6, 6, 'snaptik.vn_7495761376141397255.mp4', 32.0, 6.0, 'Bật Ngang Vợt Phản Tạt Chéo Biên', 'Nâng cao'),

    # ================= Ô 7: CUỐI SÂN TRÁI =================
    (7, 1, 'snaptik.vn_7476759285720993040.mp4', 8.0, 6.0, 'Bộ Pháp Lùi Chéo Góc Trái', 'Cơ bản'),
    (7, 2, 'snaptik.vn_7567643845215669521.mp4', 4.0, 6.0, 'Phông Cầu Vòng Đầu Thuận Tay', 'Cơ bản'),
    (7, 3, 'snaptik.vn_7568145336158440724.mp4', 3.0, 5.5, 'Cắt Cầu Chéo Sân Vòng Đầu', 'Trung cấp'),
    (7, 4, 'snaptik.vn_7651286512998288661.mp4', 5.0, 6.0, 'Đập Cầu Vòng Đầu Tấn Công', 'Trung cấp'),
    (7, 5, 'snaptik.vn_7476759285720993040.mp4', 35.0, 6.5, 'Phông Cầu Trái Tay Cuối Sân (Backhand Clear)', 'Nâng cao'),
    (7, 6, 'snaptik.vn_7568145336158440724.mp4', 12.0, 6.0, 'Chém Cầu Trái Tay Rơi Lưới (Backhand Drop)', 'Nâng cao'),
    (7, 7, 'snaptik.vn_7651286512998288661.mp4', 16.0, 6.0, 'Bật Nhảy Smash Vòng Đầu Dứt Điểm', 'Nâng cao'),

    # ================= Ô 8: CUỐI SÂN GIỮA =================
    (8, 1, 'snaptik.vn_7476759285720993040.mp4', 18.0, 6.0, 'Bật Lùi Đón Cầu Đáy Giữa Sân', 'Cơ bản'),
    (8, 2, 'snaptik.vn_7567643845215669521.mp4', 12.0, 6.0, 'Phông Cầu Bổng Sâu Đáy Sân', 'Cơ bản'),
    (8, 3, 'snaptik.vn_7568145336158440724.mp4', 6.0, 5.5, 'Chém Cầu Thẳng Rơi Lưới (Straight Drop)', 'Trung cấp'),
    (8, 4, 'snaptik.vn_7631002086502649109.mp4', 10.0, 6.0, 'Đập Cầu Cắm Sàn Giữa Sân', 'Trung cấp'),
    (8, 5, 'snaptik.vn_7568145336158440724.mp4', 15.0, 5.5, 'Giả Phông Đập Chém Cầu Lỏng Tay', 'Nâng cao'),
    (8, 6, 'snaptik.vn_7631002086502649109.mp4', 28.0, 6.5, 'Bật Nhảy Hai Chân Đập Dứt Điểm', 'Nâng cao'),

    # ================= Ô 9: CUỐI SÂN PHẢI =================
    (9, 1, 'snaptik.vn_7476759285720993040.mp4', 50.0, 6.0, 'Bộ Pháp Lùi Góc Thuận Tay', 'Cơ bản'),
    (9, 2, 'snaptik.vn_7567643845215669521.mp4', 22.0, 6.0, 'Phông Cầu Cao Sâu Thuận Tay', 'Cơ bản'),
    (9, 3, 'snaptik.vn_7568145336158440724.mp4', 8.0, 5.5, 'Chém Cầu Xiên Góc Thuận Tay (Cross Drop)', 'Trung cấp'),
    (9, 4, 'snaptik.vn_7651286512998288661.mp4', 10.0, 6.0, 'Đập Cầu Dọc Biên Thuận Tay', 'Trung cấp'),
    (9, 5, 'snaptik.vn_7631002086502649109.mp4', 40.0, 6.5, 'Nhảy Đập Jump Smash Uy Lực', 'Nâng cao'),
    (9, 6, 'viesnap.vn_tiktok_ZSq6NmtCb.mp4', 20.0, 6.0, 'Chém Cầu Xoáy Giả Động Tác Đập', 'Nâng cao')
]

print(f"Bắt đầu cắt {len(CLIPS_CONFIG)} clip video ngắn cho 9 vị trí...")

for pos_id, clip_idx, src_name, start_t, dur_t, tech_name, level in CLIPS_CONFIG:
    src_path = os.path.join('public', 'videos', src_name)
    out_name = f'pos_{pos_id}_clip_{clip_idx}.mp4'
    out_path = os.path.join('public', 'videos', 'clips', out_name)

    if not os.path.exists(src_path):
        print(f"[CẢNH BÁO] Không tìm thấy file nguồn: {src_path}")
        continue

    # Use ffmpeg to extract high-speed x264 video with faststart for instant web playback
    cmd = [
        ffmpeg, '-y',
        '-ss', str(start_t),
        '-t', str(dur_t),
        '-i', src_path,
        '-c:v', 'libx264',
        '-preset', 'veryfast',
        '-crf', '24',
        '-an', # Remove audio for silent clean focus
        '-movflags', '+faststart',
        out_path
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0 and os.path.exists(out_path):
        size_kb = os.path.getsize(out_path) / 1024
        print(f"✓ Ô {pos_id} Clip {clip_idx} [{level}]: {tech_name} ({size_kb:.1f} KB) -> {out_name}")
    else:
        print(f"✗ Lỗi cắt Ô {pos_id} Clip {clip_idx}: {res.stderr[:100]}")

print("Hoàn tất cắt toàn bộ video clips!")
