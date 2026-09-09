import React from 'react';
import { 
  X, 
  Lock, 
  Share2, 
  CheckCircle2, 
  Lightbulb, 
  Camera, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Youtube } from './YoutubeIcon';

interface YouTubeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const YouTubeGuideModal: React.FC<YouTubeGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="video-modal-backdrop" onClick={onClose}>
      <div 
        className="guide-modal-card animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="edit-modal-header">
          <div className="header-badge-title">
            <div className="yt-icon-badge">
              <Youtube size={22} className="text-danger" />
            </div>
            <div>
              <h3>Hướng Dẫn Đăng Video YouTube "Không Công Khai" (Unlisted)</h3>
              <p className="modal-subtext">Lưu trữ video miễn phí 100%, load siêu nhanh, không lộ video trên kênh cá nhân</p>
            </div>
          </div>
          <button className="theater-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="guide-modal-content">
          {/* Benefit Banner */}
          <div className="guide-benefit-strip">
            <ShieldCheck size={20} className="text-emerald" />
            <span>
              <strong>Tại sao nên chọn YouTube Unlisted?</strong> Google CDN tối ưu độ nét 1080p/60fps, tự động tạo thumbnail, không tốn dung lượng máy chủ và hoàn toàn miễn phí băng thông.
            </span>
          </div>

          {/* 3 Step Flow */}
          <div className="guide-steps-grid">
            {/* Step 1 */}
            <div className="guide-step-card">
              <div className="step-number-badge">1</div>
              <div className="step-body">
                <h4>Quay & Tải Video Lên</h4>
                <p>
                  Dùng điện thoại hoặc webcam quay động tác ngắn (10s - 30s). Mở <strong>YouTube Studio</strong> hoặc app YouTube trên điện thoại và bấm nút <strong>Tải video lên (+)</strong>.
                </p>
                <div className="step-tip">
                  <Camera size={13} className="text-cyan" />
                  <small>Gợi ý: Đặt camera góc 45 độ ngang hông để thấy rõ điểm tiếp xúc cầu và bộ chân split-step.</small>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="guide-step-card is-highlight">
              <div className="step-number-badge">2</div>
              <div className="step-body">
                <h4>Chọn Chế Độ "Không Công Khai"</h4>
                <p>
                  Tại bước <strong>Hiển thị (Visibility)</strong>, chọn mục:
                </p>
                <div className="unlisted-visual-pill">
                  <Lock size={15} />
                  <span>Không công khai (Unlisted)</span>
                </div>
                <p className="step-subdetail">
                  🔒 Video sẽ <strong>KHÔNG</strong> xuất hiện trên trang cá nhân của bạn và không ai tìm thấy trên YouTube. Chỉ ai có link trong ứng dụng này mới xem được!
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="guide-step-card">
              <div className="step-number-badge">3</div>
              <div className="step-body">
                <h4>Sao Chép Link & Dán Vào App</h4>
                <p>
                  Bấm nút <strong>Chia sẻ (Share) ➔ Sao chép liên kết</strong>. Sau đó quay lại app, bấm nút <strong>"Gắn link"</strong> tại thẻ động tác và dán vào.
                </p>
                <div className="step-tip">
                  <Sparkles size={13} className="text-emerald" />
                  <small>App sẽ tự động trích xuất ID, tải ảnh đại diện nét căng và lưu lại ngay lập tức.</small>
                </div>
              </div>
            </div>
          </div>

          {/* Quick External Link */}
          <div className="guide-external-action">
            <a 
              href="https://studio.youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-open-yt-studio"
            >
              <Youtube size={18} />
              <span>Mở YouTube Studio trên tab mới</span>
              <ExternalLink size={14} />
            </a>
            <button className="btn-got-it" onClick={onClose}>
              <CheckCircle2 size={16} />
              <span>Tôi đã hiểu, đóng lại</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
