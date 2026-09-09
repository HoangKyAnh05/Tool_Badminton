import React, { useState, useEffect } from 'react';
import { TacticsVideo, SkillLevel } from '../../types';
import { storageService } from '../../services/storage';
import { 
  X, 
  Check, 
  RotateCcw, 
  Eye, 
  Film, 
  Sparkles, 
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { Youtube } from './YoutubeIcon';

interface EditYouTubeLinkModalProps {
  video: TacticsVideo | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedVideo: TacticsVideo) => void;
  onResetToDefault?: (videoId: string) => void;
  onOpenGuide?: () => void;
}

export const extractYouTubeId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

export const extractTikTokId = (url: string): string | null => {
  if (!url) return null;
  const trimmed = url.trim();
  const match = trimmed.match(/(?:video\/|v\/|embed\/(?:v2\/)?|v2\/)(\d{10,})/i) || 
                trimmed.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/i) || 
                trimmed.match(/\/(\d{15,})\b/);
  if (match) return match[1];
  const directDigits = trimmed.match(/^(\d{15,})$/);
  if (directDigits) return directDigits[1];
  return null;
};

export const isTikTokUrl = (url: string): boolean => {
  if (!url) return false;
  return url.includes('tiktok.com') || url.includes('douyin.com') || /^\d{15,}$/.test(url.trim());
};

export const EditYouTubeLinkModal: React.FC<EditYouTubeLinkModalProps> = ({
  video,
  isOpen,
  onClose,
  onSave,
  onResetToDefault,
  onOpenGuide
}) => {
  if (!isOpen || !video) return null;

  const [url, setUrl] = useState<string>(video.videoUrl || '');
  const [title, setTitle] = useState<string>(video.title || '');
  const [subTitle, setSubTitle] = useState<string>(video.subTitle || '');
  const [level, setLevel] = useState<SkillLevel>(video.level || 'Cơ bản');
  const [desc, setDesc] = useState<string>(video.description || '');
  const [tags, setTags] = useState<string>(video.tags ? video.tags.join(', ') : '');
  const [isPreviewing, setIsPreviewing] = useState<boolean>(false);

  useEffect(() => {
    if (video) {
      setUrl(video.videoUrl || '');
      setTitle(video.title || '');
      setSubTitle(video.subTitle || '');
      setLevel(video.level || 'Cơ bản');
      setDesc(video.description || '');
      setTags(video.tags ? video.tags.join(', ') : '');
      setIsPreviewing(false);
    }
  }, [video, isOpen]);

  const ytId = extractYouTubeId(url);
  const detectedThumb = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      alert('Vui lòng nhập đường dẫn Link YouTube!');
      return;
    }

    const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);

    const updatedVideo: TacticsVideo = {
      ...video,
      videoUrl: url.trim(),
      title: title.trim() || video.title,
      subTitle: subTitle.trim() || video.subTitle,
      level,
      description: desc.trim() || video.description,
      tags: tagList.length > 0 ? tagList : video.tags,
      isCustom: true
    };

    // Save override to storage
    storageService.saveVideoOverride(video.id, updatedVideo);
    onSave(updatedVideo);
    onClose();
  };

  const handleReset = () => {
    if (window.confirm('Khôi phục video này về liên kết mặc định ban đầu?')) {
      storageService.removeVideoOverride(video.id);
      if (onResetToDefault) onResetToDefault(video.id);
      onClose();
    }
  };

  return (
    <div className="video-modal-backdrop" onClick={onClose}>
      <div 
        className="edit-youtube-modal animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="edit-modal-header">
          <div className="header-badge-title">
            <div className="yt-icon-badge" style={{ background: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h3>Gắn Link Video TikTok / Clip Của Bạn</h3>
              <p className="modal-subtext">Hỗ trợ link video TikTok (@user/video/...), YouTube, hoặc link trực tiếp</p>
            </div>
          </div>
          <button className="theater-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-modal-body">
          {/* Quick 1-click TikTok search button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(0, 242, 254, 0.08)', borderRadius: '10px', border: '1px solid rgba(0, 242, 254, 0.25)', marginBottom: '14px' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              💡 Tìm nhanh video TikTok cho: <strong style={{ color: '#fff' }}>{video.title}</strong>
            </span>
            <a 
              href={`https://www.tiktok.com/search?q=${encodeURIComponent(video.title + ' (cầu lông)')}`}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 12px', background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)', color: '#000', borderRadius: '16px', fontSize: '11px', fontWeight: 800, textDecoration: 'none' }}
            >
              <ExternalLink size={12} /> <span>Mở TikTok Tìm Ngay</span>
            </a>
          </div>

          {/* Video Link Field */}
          <div className="form-group">
            <label className="form-label">
              <span className="required-star">*</span> Đường dẫn Video (TikTok URL / YouTube)
            </label>
            <div className="input-with-icon">
              <Sparkles size={18} className="input-icon text-cyan" />
              <input 
                type="text"
                className="modal-text-input"
                placeholder="Dán link TikTok (ví dụ: https://www.tiktok.com/@.../video/...) hoặc YouTube"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setIsPreviewing(false);
                }}
                autoFocus
                required
              />
            </div>
            <small className="field-hint">
              Chấp nhận mọi dạng link YouTube (Link xem, link rút gọn youtu.be, link Shorts, link Unlisted).
            </small>
          </div>

          {/* Live Thumbnail & Preview Box */}
          <div className="youtube-preview-panel">
            <div className="preview-header">
              <span className="preview-label">
                <Film size={15} /> Kiểm tra nhận diện YouTube
              </span>
              {ytId && (
                <button 
                  type="button" 
                  className="btn-toggle-preview"
                  onClick={() => setIsPreviewing(!isPreviewing)}
                >
                  <Eye size={14} />
                  <span>{isPreviewing ? 'Ẩn xem thử' : 'Phát thử video'}</span>
                </button>
              )}
            </div>

            {ytId ? (
              <div className="preview-content-box">
                {isPreviewing ? (
                  <div className="preview-iframe-wrap">
                    <iframe 
                      src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`}
                      title="Preview YouTube"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="preview-thumb-box">
                    <img src={detectedThumb!} alt="YouTube Thumbnail" className="preview-img" />
                    <div className="preview-badge-status">
                      <Check size={14} /> Nhận diện thành công ID: <code>{ytId}</code>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="preview-empty-box">
                <p>Dán link YouTube hợp lệ vào ô phía trên để tải ảnh bìa và kiểm tra video.</p>
              </div>
            )}
          </div>

          {/* Details Row: Title & Subtitle */}
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Tên động tác / Kỹ thuật</label>
              <input 
                type="text"
                className="modal-text-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tên kỹ thuật động tác"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Cấp độ kỹ thuật</label>
              <select 
                className="modal-select-input"
                value={level}
                onChange={(e) => setLevel(e.target.value as SkillLevel)}
              >
                <option value="Cơ bản">🟢 Cơ bản (Newbie / Nhập môn)</option>
                <option value="Trung cấp">🟡 Trung cấp (Phong trào)</option>
                <option value="Nâng cao">🔴 Nâng cao (Thi đấu)</option>
              </select>
            </div>
          </div>

          {/* Subtitle / Tip */}
          <div className="form-group">
            <label className="form-label">Mô tả tóm tắt kỹ thuật (Bộ chân / Tay)</label>
            <input 
              type="text"
              className="modal-text-input"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="VD: Split-step -> Bước đệm chân phải góc 10h..."
            />
          </div>

          {/* Description & Coaching Tips */}
          <div className="form-group">
            <label className="form-label">Chi tiết lưu ý khi tập luyện</label>
            <textarea 
              className="modal-textarea-input"
              rows={2}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Điểm tiếp xúc cầu, góc vợt, cách hồi tâm sau cú đánh..."
            />
          </div>

          {/* Action Footer */}
          <div className="edit-modal-footer">
            {video.isCustom && (
              <button 
                type="button" 
                className="btn-reset-default"
                onClick={handleReset}
                title="Xóa link tự gắn và khôi phục video mặc định"
              >
                <RotateCcw size={15} />
                <span>Khôi phục gốc</span>
              </button>
            )}

            <div className="footer-right-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Hủy
              </button>
              <button type="submit" className="btn-save-yt">
                <Check size={16} />
                <span>Lưu Link YouTube</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
