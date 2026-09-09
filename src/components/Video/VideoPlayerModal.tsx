import React, { useState, useEffect } from 'react';
import { TacticsVideo } from '../../types';
import { storageService } from '../../services/storage';
import { videoStorageService } from '../../services/videoStorage';
import { 
  X, 
  CheckCircle2, 
  ExternalLink
} from 'lucide-react';
import { Youtube } from './YoutubeIcon';
import { extractYouTubeId, extractTikTokId, isTikTokUrl } from './EditYouTubeLinkModal';

const TikTokIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46V11.8a8.16 8.16 0 0 0 5.77 2.45v-3.45a4.85 4.85 0 0 1-3.77-4.11z" />
  </svg>
);

interface VideoPlayerModalProps {
  video: TacticsVideo;
  isOpen: boolean;
  onClose: () => void;
  onWatchedChanged: () => void;
  onEditYouTube?: (video: TacticsVideo) => void;
  onPrevVideo?: () => void;
  onNextVideo?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  isOpen,
  onClose,
  onWatchedChanged
}) => {
  const [localBlobUrl, setLocalBlobUrl] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(() => storageService.isVideoWatched(video.id));

  // Check if a local video file is stored in IndexedDB for this video
  useEffect(() => {
    let isMounted = true;
    videoStorageService.getVideoObjectUrl(video.id).then((blobUrl) => {
      if (isMounted) {
        setLocalBlobUrl(blobUrl);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [video.id, isOpen]);

  // Sync completion status when video or modal opens
  useEffect(() => {
    setIsCompleted(storageService.isVideoWatched(video.id));
  }, [video.id, isOpen]);

  // Handle hotkeys (Esc = close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeVideoUrl = localBlobUrl || video.videoUrl;
  const youtubeId = !localBlobUrl ? extractYouTubeId(activeVideoUrl) : null;
  const tiktokId = !localBlobUrl ? extractTikTokId(activeVideoUrl) : null;
  const isTikTok = !localBlobUrl ? isTikTokUrl(activeVideoUrl) : false;

  const handleToggleWatched = () => {
    const newState = storageService.toggleVideoWatched(video.id);
    setIsCompleted(newState);
    onWatchedChanged();
  };

  return (
    <div className="video-modal-backdrop animate-fade-in" onClick={onClose}>
      <div 
        className="video-theater-card animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="theater-header">
          <div className="theater-title-group">
            <div className="theater-badge-row">
              <span className="badge-tag">{video.tags.join(' • ')}</span>
            </div>
            <h2 className="theater-title">{video.title}</h2>
            {video.subTitle && <p className="theater-subtitle">{video.subTitle}</p>}
          </div>

          <button 
            className="theater-close-btn" 
            onClick={onClose} 
            title="Đóng (Esc)"
            aria-label="Đóng"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Screen Wrap */}
        <div className="theater-screen-wrap">
          {youtubeId ? (
            <div className="theater-embed-container theater-youtube-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={video.title}
                className="theater-video-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (tiktokId || isTikTok) ? (
            <div className="theater-embed-container theater-tiktok-frame">
              <iframe
                src={tiktokId ? `https://www.tiktok.com/embed/v2/${tiktokId}` : `https://www.tiktok.com/embed/v2/?url=${encodeURIComponent(video.videoUrl)}`}
                title={video.title}
                className="theater-video-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="theater-embed-container theater-native-video-frame">
              <video
                src={activeVideoUrl}
                className="theater-video-element"
                controls
                playsInline
                autoPlay
                onEnded={() => {
                  if (!isCompleted) {
                    storageService.markVideoWatched(video.id);
                    setIsCompleted(true);
                    onWatchedChanged();
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* Streamlined Action Bar: ONLY 2 BUTTONS (Tích đã xem + Mở video trên TikTok/YouTube) */}
        <div className="theater-action-bar">
          <button 
            type="button"
            className={`btn-theater-action btn-theater-watch ${isCompleted ? 'is-completed' : ''}`}
            onClick={handleToggleWatched}
            title={isCompleted ? "Nhấn để bỏ đánh dấu đã xem" : "Nhấn để đánh dấu đã xem"}
          >
            <CheckCircle2 size={18} className={isCompleted ? "text-emerald-400" : ""} />
            <span>{isCompleted ? 'Đã xem' : 'Đánh dấu đã xem'}</span>
          </button>

          {(tiktokId || isTikTok) ? (
            <a 
              href={video.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-theater-action btn-theater-tiktok"
              title="Mở video này trực tiếp trong ứng dụng hoặc trang web TikTok"
            >
              <TikTokIcon size={18} />
              <span>Mở video trên TikTok</span>
              <ExternalLink size={14} className="action-external-icon" />
            </a>
          ) : youtubeId ? (
            <a 
              href={video.videoUrl.startsWith('http') ? video.videoUrl : `https://www.youtube.com/watch?v=${youtubeId}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-theater-action btn-theater-youtube"
              title="Mở video này trên YouTube"
            >
              <Youtube size={18} />
              <span>Mở trên YouTube</span>
              <ExternalLink size={14} className="action-external-icon" />
            </a>
          ) : (
            <a 
              href={video.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-theater-action btn-theater-external"
              title="Mở video nguồn trong tab mới"
            >
              <ExternalLink size={18} />
              <span>Mở video</span>
            </a>
          )}
        </div>

        {/* Lesson Description Notes */}
        {video.description && (
          <div className="theater-footer-info">
            <div className="footer-notes">
              <h4>💡 Trọng điểm huấn luyện bài học:</h4>
              <p>{video.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
