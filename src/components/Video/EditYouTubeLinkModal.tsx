import React, { useState, useEffect, useRef } from 'react';
import { TacticsVideo, SkillLevel } from '../../types';
import { storageService } from '../../services/storage';
import { videoStorageService } from '../../services/videoStorage';
import { 
  X, 
  Check, 
  RotateCcw, 
  Eye, 
  Film, 
  Sparkles, 
  ExternalLink,
  UploadCloud,
  FileVideo,
  CheckCircle2,
  Trash2,
  Play
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
  onResetToDefault
}) => {
  if (!isOpen || !video) return null;

  const [activeTab, setActiveTab] = useState<'UPLOAD_FILE' | 'LINK'>('UPLOAD_FILE');
  const [url, setUrl] = useState<string>(video.videoUrl || '');
  const [title, setTitle] = useState<string>(video.title || '');
  const [subTitle, setSubTitle] = useState<string>(video.subTitle || '');
  const [level, setLevel] = useState<SkillLevel>(video.level || 'Cơ bản');
  const [desc, setDesc] = useState<string>(video.description || '');
  
  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [hasStoredLocalFile, setHasStoredLocalFile] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (video) {
      setUrl(video.videoUrl || '');
      setTitle(video.title || '');
      setSubTitle(video.subTitle || '');
      setLevel(video.level || 'Cơ bản');
      setDesc(video.description || '');
      setSelectedFile(null);
      setFilePreviewUrl(null);

      // Check if this video has a local stored file in IndexedDB
      videoStorageService.getVideoObjectUrl(video.id).then((storedUrl) => {
        if (storedUrl) {
          setHasStoredLocalFile(true);
          setFilePreviewUrl(storedUrl);
          setActiveTab('UPLOAD_FILE');
        } else {
          setHasStoredLocalFile(false);
          if (video.videoUrl && (video.videoUrl.startsWith('http') || video.videoUrl.includes('tiktok.com'))) {
            setActiveTab('LINK');
          } else {
            setActiveTab('UPLOAD_FILE');
          }
        }
      });
    }
  }, [video, isOpen]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        alert('Vui lòng chọn file định dạng video (.mp4, .webm, .mov, .avi)');
        return;
      }
      setSelectedFile(file);
      const tempUrl = URL.createObjectURL(file);
      setFilePreviewUrl(tempUrl);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      const tempUrl = URL.createObjectURL(file);
      setFilePreviewUrl(tempUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let finalVideoUrl = url.trim();

      // If user uploaded a local file, store it in IndexedDB
      if (activeTab === 'UPLOAD_FILE' && selectedFile) {
        finalVideoUrl = await videoStorageService.saveVideoFile(video.id, selectedFile);
      } else if (hasStoredLocalFile && filePreviewUrl && activeTab === 'UPLOAD_FILE') {
        finalVideoUrl = filePreviewUrl;
      }

      const updatedVideo: TacticsVideo = {
        ...video,
        videoUrl: finalVideoUrl,
        title: title.trim() || video.title,
        subTitle: subTitle.trim() || video.subTitle,
        level,
        description: desc.trim() || video.description,
        isCustom: true
      };

      // Save to localStorage overrides
      storageService.saveVideoOverride(video.id, {
        title: updatedVideo.title,
        subTitle: updatedVideo.subTitle,
        level: updatedVideo.level,
        description: updatedVideo.description,
        videoUrl: finalVideoUrl,
        isCustom: true
      });

      onSave(updatedVideo);
      onClose();
    } catch (err) {
      console.error('Error saving video override', err);
      alert('Có lỗi xảy ra khi lưu video: ' + String(err));
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục về video mặc định?')) {
      await videoStorageService.deleteVideoFile(video.id);
      storageService.removeVideoOverride(video.id);
      if (onResetToDefault) {
        onResetToDefault(video.id);
      }
      onClose();
    }
  };

  const ytId = extractYouTubeId(url);
  const tiktokId = extractTikTokId(url);
  const isTT = isTikTokUrl(url);

  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div 
        className="modal-card-custom animate-pop" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px', width: '92%' }}
      >
        {/* Modal Header */}
        <div className="modal-header-custom" style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="modal-title-wrap" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #00f2fe, #4facfe)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UploadCloud size={20} color="#000" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#fff' }}>
                Đẩy Video Động Tác Của Bạn
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>
                Tải file video trực tiếp (.mp4, .webm) hoặc dán link TikTok / YouTube
              </p>
            </div>
          </div>
          <button className="btn-modal-close" onClick={onClose} title="Đóng">
            <X size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div style={{ display: 'flex', padding: '12px 20px 0', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            type="button"
            onClick={() => setActiveTab('UPLOAD_FILE')}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '8px 8px 0 0',
              background: activeTab === 'UPLOAD_FILE' ? 'rgba(0, 242, 254, 0.12)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'UPLOAD_FILE' ? '2px solid #00f2fe' : '2px solid transparent',
              color: activeTab === 'UPLOAD_FILE' ? '#00f2fe' : '#94a3b8',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <FileVideo size={16} />
            <span>📁 Tải File Video Từ Máy (Đã Lưu)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('LINK')}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '8px 8px 0 0',
              background: activeTab === 'LINK' ? 'rgba(0, 242, 254, 0.12)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'LINK' ? '2px solid #00f2fe' : '2px solid transparent',
              color: activeTab === 'LINK' ? '#00f2fe' : '#94a3b8',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Sparkles size={16} />
            <span>🔗 Gắn Link TikTok / YouTube</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          {activeTab === 'UPLOAD_FILE' ? (
            <div style={{ marginBottom: '16px' }}>
              <input 
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/ogg,video/quicktime"
                style={{ display: 'none' }}
                onChange={handleFileSelect}
              />

              <div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: selectedFile || hasStoredLocalFile ? '2px solid #10b981' : '2px dashed rgba(0, 242, 254, 0.4)',
                  borderRadius: '12px',
                  padding: '24px 16px',
                  textAlign: 'center',
                  background: 'rgba(15, 23, 42, 0.6)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {filePreviewUrl ? (
                  <div>
                    <video 
                      src={filePreviewUrl} 
                      controls 
                      style={{ maxHeight: '200px', width: '100%', borderRadius: '8px', background: '#000', marginBottom: '12px' }} 
                    />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#10b981', fontSize: '13px', fontWeight: 700 }}>
                      <CheckCircle2 size={16} />
                      <span>{selectedFile ? `Đã chọn file: ${selectedFile.name} (${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)` : 'Đã có video lưu trên thiết bị của bạn'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      style={{ marginTop: '8px', padding: '4px 12px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '6px', color: '#cbd5e1', fontSize: '12px', cursor: 'pointer' }}
                    >
                      Chọn file khác
                    </button>
                  </div>
                ) : (
                  <div>
                    <UploadCloud size={40} style={{ color: '#00f2fe', margin: '0 auto 10px' }} />
                    <p style={{ margin: '0 0 6px', fontSize: '14px', fontWeight: 700, color: '#fff' }}>
                      Bấm vào đây để chọn file video hoặc kéo thả file vào đây
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>
                      Hỗ trợ định dạng MP4, WebM, MOV. Video sẽ được lưu offline trên máy để xem mượt mà!
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: '16px' }}>
              {/* 1-Click Search Helper */}
              <div style={{ background: 'rgba(0, 242, 254, 0.08)', border: '1px solid rgba(0, 242, 254, 0.25)', borderRadius: '10px', padding: '10px 14px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <span style={{ fontSize: '12px', color: '#cbd5e1' }}>
                  💡 Tìm nhanh trên TikTok: <strong>{title || video.title}</strong>
                </span>
                <a 
                  href={`https://www.tiktok.com/search?q=${encodeURIComponent((title || video.title) + ' (cầu lông)')}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: '#00f2fe', color: '#000', borderRadius: '6px', fontSize: '11px', fontWeight: 800, textDecoration: 'none' }}
                >
                  <ExternalLink size={12} />
                  <span>Mở TikTok Tìm</span>
                </a>
              </div>

              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>
                Đường dẫn Video (TikTok URL / YouTube / Link Trực Tiếp):
              </label>
              <input 
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.tiktok.com/@.../video/... hoặc https://youtu.be/..."
                className="form-input-custom"
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', fontSize: '13px' }}
              />
            </div>
          )}

          {/* Technique Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>
                Tên động tác:
              </label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input-custom"
                style={{ width: '100%', padding: '8px 12px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>
                Cấp độ kỹ thuật:
              </label>
              <select 
                value={level}
                onChange={(e) => setLevel(e.target.value as SkillLevel)}
                style={{ width: '100%', padding: '8px 12px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', fontSize: '13px' }}
              >
                <option value="Cơ bản">🟢 Cơ bản</option>
                <option value="Trung cấp">🟡 Trung cấp</option>
                <option value="Nâng cao">🔴 Nâng cao</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>
              Mô tả chi tiết / Lời dặn HLV:
            </label>
            <textarea 
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={2}
              style={{ width: '100%', padding: '8px 12px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', fontSize: '13px' }}
            />
          </div>

          {/* Modal Footer Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
            <button 
              type="button" 
              onClick={handleReset}
              className="btn-modal-reset"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
            >
              <RotateCcw size={14} />
              <span>Khôi phục gốc</span>
            </button>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                type="button" 
                onClick={onClose}
                style={{ padding: '8px 16px', background: 'transparent', color: '#94a3b8', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                Hủy
              </button>

              <button 
                type="submit" 
                disabled={isUploading}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 20px', background: 'linear-gradient(135deg, #00f2fe, #4facfe)', color: '#000', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}
              >
                {isUploading ? (
                  <span>Đang lưu...</span>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Lưu Video Động Tác</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
