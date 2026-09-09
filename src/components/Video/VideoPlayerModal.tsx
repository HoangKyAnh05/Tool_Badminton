import React, { useState, useRef, useEffect } from 'react';
import { TacticsVideo } from '../../types';
import { storageService } from '../../services/storage';
import { videoStorageService } from '../../services/videoStorage';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert,
  Award,
  Scan,
  Tv,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  UploadCloud
} from 'lucide-react';
import { Youtube } from './YoutubeIcon';

import { extractYouTubeId, extractTikTokId, isTikTokUrl } from './EditYouTubeLinkModal';

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
  onWatchedChanged,
  onEditYouTube,
  onPrevVideo,
  onNextVideo,
  hasPrev = false,
  hasNext = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [maxWatchedTime, setMaxWatchedTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isWindowFull, setIsWindowFull] = useState<boolean>(false);
  const [zoomMode, setZoomMode] = useState<'fill' | 'zoom2' | 'original'>('fill');
  const [localBlobUrl, setLocalBlobUrl] = useState<string | null>(null);
  
  // Status and Alerts
  const [isCompleted, setIsCompleted] = useState<boolean>(() => storageService.isVideoWatched(video.id));
  const [showSeekAlert, setShowSeekAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [justCompletedToast, setJustCompletedToast] = useState<boolean>(false);

  const maxWatchedRef = useRef<number>(0);

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

  const activeVideoUrl = localBlobUrl || video.videoUrl;
  const youtubeId = !localBlobUrl ? extractYouTubeId(activeVideoUrl) : null;
  const tiktokId = !localBlobUrl ? extractTikTokId(activeVideoUrl) : null;
  const isTikTok = !localBlobUrl ? isTikTokUrl(activeVideoUrl) : false;

  // Listen to browser fullscreen changes
  useEffect(() => {
    const handleFsChange = () => {
      const isFs = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
      setIsFullscreen(isFs);
      if (!isFs) setIsWindowFull(false);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, []);

  // Sync completion status when video changes
  useEffect(() => {
    const watched = storageService.isVideoWatched(video.id);
    setIsCompleted(watched);
    if (watched) {
      maxWatchedRef.current = 999999;
      setMaxWatchedTime(999999);
    } else {
      maxWatchedRef.current = 0;
      setMaxWatchedTime(0);
    }
    setCurrentTime(0);
    setIsPlaying(false);
    setJustCompletedToast(false);
  }, [video.id, isOpen]);

  // Handle hotkeys (Space = play/pause, F = fullscreen, Esc = exit, Left/Right arrows = navigate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        if (isFullscreen || isWindowFull) {
          if (document.fullscreenElement) {
            document.exitFullscreen?.().catch(() => {});
          }
          setIsFullscreen(false);
          setIsWindowFull(false);
        } else {
          onClose();
        }
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowLeft') {
        if (e.shiftKey || e.altKey || onPrevVideo) {
          if (onPrevVideo && hasPrev) {
            e.preventDefault();
            onPrevVideo();
          }
        } else {
          e.preventDefault();
          handleRewind(5);
        }
      } else if (e.key === 'ArrowRight') {
        if (e.shiftKey || e.altKey || onNextVideo) {
          if (onNextVideo && hasNext) {
            e.preventDefault();
            onNextVideo();
          }
        } else {
          e.preventDefault();
          triggerSeekWarning();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying, isFullscreen, isWindowFull, onPrevVideo, onNextVideo, hasPrev, hasNext]);

  if (!isOpen) return null;

  const triggerSeekWarning = () => {
    setAlertMessage('⚠️ KHÔNG ĐƯỢC TUA NHANH: Bạn phải xem tuần tự để được tính là hoàn thành!');
    setShowSeekAlert(true);
    setTimeout(() => {
      setShowSeekAlert(false);
    }, 2800);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.warn('Play interrupted', err));
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setCurrentTime(current);

    // If video is not already completed, strictly enforce forward seeking restriction
    if (!isCompleted) {
      if (current > maxWatchedRef.current) {
        // Normal sequential playing step
        if (current - maxWatchedRef.current <= 1.5) {
          maxWatchedRef.current = current;
          setMaxWatchedTime(current);
        } else {
          // Detected skip forward!
          videoRef.current.currentTime = maxWatchedRef.current;
          triggerSeekWarning();
        }
      }
    }

    // Auto complete check if near end (within 0.6s of duration or reached ended)
    if (dur > 0 && current >= dur - 0.6 && !isCompleted) {
      handleCompleteVideo();
    }
  };

  const handleSeeking = () => {
    if (!videoRef.current || isCompleted) return;
    const current = videoRef.current.currentTime;
    if (current > maxWatchedRef.current + 0.3) {
      videoRef.current.currentTime = maxWatchedRef.current;
      triggerSeekWarning();
    }
  };

  const handleRewind = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - seconds);
  };

  const handleCompleteVideo = () => {
    storageService.markVideoWatched(video.id);
    setIsCompleted(true);
    setJustCompletedToast(true);
    onWatchedChanged();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = percent * duration;

    // Strict check: cannot jump past max watched time if not completed
    if (!isCompleted && targetTime > maxWatchedRef.current + 0.5) {
      triggerSeekWarning();
      videoRef.current.currentTime = maxWatchedRef.current;
    } else {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMute = !isMuted;
    videoRef.current.muted = newMute;
    setIsMuted(newMute);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const toggleFullscreen = async () => {
    const container = document.getElementById('video-theater-wrapper');
    if (!container) return;

    if (!document.fullscreenElement && !isWindowFull) {
      try {
        if (container.requestFullscreen) {
          await container.requestFullscreen();
          setIsFullscreen(true);
        } else if ((container as any).webkitRequestFullscreen) {
          await (container as any).webkitRequestFullscreen();
          setIsFullscreen(true);
        } else {
          setIsWindowFull(true);
        }
      } catch {
        // Fallback to full window if browser fullscreen API is blocked
        setIsWindowFull(true);
      }
    } else {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen?.();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen?.();
        }
      } catch {
        // ignore
      }
      setIsFullscreen(false);
      setIsWindowFull(false);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const unlockedPercent = duration > 0 ? Math.min(100, (maxWatchedTime / duration) * 100) : 0;

  return (
    <div className="video-modal-backdrop animate-fade-in" onClick={onClose}>
      <div 
        id="video-theater-wrapper"
        className={`video-theater-card animate-scale-up ${(isFullscreen || isWindowFull) ? 'is-full-screen-mode' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="theater-header">
          <div className="theater-title-group">
            <div className="theater-badge-row">
              <span className="badge-tag">{video.tags.join(' • ')}</span>
              {isCompleted ? (
                <span className="badge-completed-pill animate-bounce-subtle">
                  <CheckCircle2 size={16} />
                  <span>ĐÃ XEM XONG</span>
                </span>
              ) : (
                <span className="badge-watching-pill">
                  <ShieldAlert size={15} />
                  <span>CHỐNG TUA (CẦN XEM HẾT)</span>
                </span>
              )}
            </div>
            <h2 className="theater-title">{video.title}</h2>
            <p className="theater-subtitle">{video.subTitle}</p>
          </div>

          <div className="theater-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Prev / Next Navigation Buttons */}
            {onPrevVideo && (
              <button 
                className="btn-theater-nav"
                onClick={onPrevVideo}
                disabled={!hasPrev}
                title="Động tác trước (←)"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '7px 12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: hasPrev ? '#fff' : '#475569', fontSize: '12px', fontWeight: 700, cursor: hasPrev ? 'pointer' : 'not-allowed', opacity: hasPrev ? 1 : 0.5 }}
              >
                <ChevronLeft size={16} />
                <span>Trước</span>
              </button>
            )}

            {onNextVideo && (
              <button 
                className="btn-theater-nav"
                onClick={onNextVideo}
                disabled={!hasNext}
                title="Động tác tiếp theo (→)"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '7px 12px', background: 'rgba(0, 242, 254, 0.15)', border: '1px solid #00f2fe', borderRadius: '8px', color: hasNext ? '#00f2fe' : '#475569', fontSize: '12px', fontWeight: 700, cursor: hasNext ? 'pointer' : 'not-allowed', opacity: hasNext ? 1 : 0.5 }}
              >
                <span>Tiếp</span>
                <ChevronRight size={16} />
              </button>
            )}

            {onEditYouTube && (
              <button 
                className="btn-theater-edit-yt"
                onClick={() => onEditYouTube(video)}
                title="Đẩy video file từ máy hoặc gắn link TikTok / YouTube cho clip này"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.2), rgba(79, 172, 254, 0.2))', border: '1px solid #00f2fe', color: '#fff', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
              >
                <UploadCloud size={15} className="text-cyan" />
                <span>Đẩy Video / Gắn Link</span>
              </button>
            )}
            <button className="theater-close-btn" onClick={onClose} title="Đóng">
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Video Canvas Container */}
        <div className="theater-screen-wrap">
          {/* Anti-seek alert floating toast */}
          {showSeekAlert && (
            <div className="anti-seek-toast animate-slide-down">
              <AlertTriangle size={20} className="toast-icon" />
              <span>{alertMessage}</span>
            </div>
          )}

          {/* Just completed celebration banner */}
          {justCompletedToast && (
            <div className="completion-toast animate-scale-up">
              <div className="completion-toast-inner">
                <Award size={36} className="completion-trophy" />
                <div className="completion-text">
                  <h3>XUẤT SẮC! BẠN ĐÃ XEM XONG</h3>
                  <p>Hệ thống đã tự động ghi nhận tích xanh hoàn thành cho bài học này.</p>
                </div>
                <button 
                  className="btn-toast-ack"
                  onClick={() => setJustCompletedToast(false)}
                >
                  <CheckCircle2 size={16} /> Tiếp tục
                </button>
              </div>
            </div>
          )}

          {youtubeId ? (
            <div className="theater-youtube-wrapper" style={{ width: '100%', height: '100%', minHeight: '480px', display: 'flex' }}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={video.title}
                className="theater-youtube-iframe"
                style={{ width: '100%', height: '100%', border: 'none', minHeight: '480px' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (tiktokId || isTikTok) ? (
            <div className="theater-tiktok-wrapper" style={{ width: '100%', height: '100%', minHeight: '520px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#070d18', position: 'relative', padding: '20px 16px' }}>
              {/* Overload-protect warning & direct open card */}
              <div style={{ width: '100%', maxWidth: '440px', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(0, 242, 254, 0.3)', borderRadius: '16px', padding: '16px 20px', marginBottom: '14px', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#00f2fe', fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>
                  <AlertTriangle size={18} className="text-warning" />
                  <span>TikTok Đang Chặn Nhúng (Overload Protect)</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '12px', lineHeight: '1.5', margin: '0 0 14px 0' }}>
                  Hệ thống bảo vệ của TikTok thường chặn phát qua iframe trên web. Hãy bấm nút dưới đây để xem mượt mà 60fps hoặc chuyển sang dùng link YouTube:
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a 
                    href={video.videoUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)', color: '#000', borderRadius: '24px', fontSize: '13px', fontWeight: 800, textDecoration: 'none', boxShadow: '0 4px 14px rgba(0,242,254,0.4)' }}
                  >
                    <ExternalLink size={15} /> Xem Trực Tiếp Trên TikTok
                  </a>
                  {onEditYouTube && (
                    <button 
                      onClick={() => onEditYouTube(video)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', borderRadius: '24px', fontSize: '13px', fontWeight: 700, border: '1px solid rgba(239, 68, 68, 0.4)', cursor: 'pointer' }}
                    >
                      <Youtube size={15} /> Đổi sang link YouTube
                    </button>
                  )}
                </div>
              </div>

              {/* TikTok iframe embed attempt */}
              <div style={{ width: '100%', maxWidth: '345px', height: '100%', minHeight: '440px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', background: '#000', display: 'flex', justifyContent: 'center' }}>
                <iframe
                  src={tiktokId ? `https://www.tiktok.com/embed/v2/${tiktokId}` : `https://www.tiktok.com/embed/v2/?url=${encodeURIComponent(video.videoUrl)}`}
                  title={video.title}
                  className="theater-tiktok-iframe"
                  style={{ width: '100%', height: '100%', minHeight: '440px', border: 'none', background: '#000' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                src={video.videoUrl}
                className={`theater-video-element ${
                  zoomMode === 'fill' 
                    ? 'is-fill-crop' 
                    : zoomMode === 'zoom2' 
                      ? 'is-zoom2' 
                      : 'is-original'
                }`}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onSeeking={handleSeeking}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    setDuration(videoRef.current.duration);
                  }
                }}
                onEnded={handleCompleteVideo}
                onClick={togglePlay}
                onDoubleClick={toggleFullscreen}
                title="Nhấp 1 lần để Phát/Tạm dừng • Nhấp đúp để Bật/Tắt Toàn Màn Hình"
              />

              {/* Center Play Overlay Icon when paused */}
              {!isPlaying && !justCompletedToast && (
                <div className="theater-center-play" onClick={togglePlay}>
                  <Play size={48} fill="currentColor" />
                </div>
              )}
            </>
          )}
        </div>

        {/* Custom Restricted Video Controls Bar */}
        {(youtubeId || tiktokId || isTikTok) ? (
          <div className="theater-controls-bar theater-youtube-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', background: '#09131f' }}>
            <div className="controls-left" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span className="text-cyan font-bold" style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Tv size={16} /> Video bài giảng trực tuyến {isTikTok ? '(TikTok)' : '(YouTube)'}
              </span>
              <button 
                className="ctrl-btn"
                onClick={handleCompleteVideo}
                style={{ 
                  padding: '7px 16px', 
                  borderRadius: '8px', 
                  background: isCompleted ? '#059669' : '#0284c7', 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  fontWeight: 600,
                  fontSize: '13px'
                }}
              >
                <CheckCircle2 size={16} />
                <span>{isCompleted ? '✓ Đã hoàn thành bài học' : 'Đánh dấu đã xem'}</span>
              </button>
            </div>
            <div className="controls-right">
              <button className="ctrl-btn" onClick={toggleFullscreen} title="Toàn màn hình">
                <Maximize2 size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="theater-controls-bar">

          {/* Progress Timeline Scrubber */}
          <div 
            className="theater-progress-track" 
            ref={progressBarRef}
            onClick={handleProgressClick}
            title={isCompleted ? "Tua đến thời gian" : "Chỉ có thể tua lại phần đã xem"}
          >
            {/* Unlocked / Watched progress preview */}
            {!isCompleted && (
              <div 
                className="theater-progress-unlocked" 
                style={{ width: `${unlockedPercent}%` }}
                title="Vùng đã xem được phép tua lại"
              />
            )}
            {/* Current playhead */}
            <div 
              className="theater-progress-played" 
              style={{ width: `${currentPercent}%` }}
            />
            {/* Scrubber handle dot */}
            <div 
              className="theater-progress-thumb" 
              style={{ left: `${currentPercent}%` }}
            />
          </div>

          {/* Bottom Control Buttons */}
          <div className="theater-control-actions">
            <div className="controls-left">
              {/* Play/Pause */}
              <button className="ctrl-btn main-play-btn" onClick={togglePlay} title={isPlaying ? "Tạm dừng" : "Phát"}>
                {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
              </button>

              {/* Rewind 5s (Allowed) */}
              <button 
                className="ctrl-btn" 
                onClick={() => handleRewind(5)} 
                title="Tua lại 5 giây"
              >
                <RotateCcw size={18} />
                <span className="btn-micro-text">-5s</span>
              </button>

              {/* Time Display */}
              <div className="ctrl-time-display">
                <span className="current-time">{formatTime(currentTime)}</span>
                <span className="time-divider">/</span>
                <span className="total-time">{formatTime(duration)}</span>
              </div>

              {/* Lock restriction indicator */}
              {!isCompleted && (
                <div className="ctrl-lock-pill" title="Tính năng bảo vệ: Không cho phép tua vượt quá thời gian đã xem">
                  <ShieldAlert size={14} />
                  <span>Khóa tua tiến</span>
                </div>
              )}
            </div>

            <div className="controls-right">
              {/* Volume Slider */}
              <div className="ctrl-volume-group">
                <button className="ctrl-btn" onClick={toggleMute} title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}>
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                  title="Âm lượng"
                />
              </div>

              {/* Playback Speed Selector */}
              <div className="ctrl-speed-selector">
                {[0.75, 1, 1.25].map((speed) => (
                  <button
                    key={speed}
                    className={`speed-pill ${playbackRate === speed ? 'active' : ''}`}
                    onClick={() => handleSpeedChange(speed)}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              {/* Zoom & Letterbox Cropping Selector */}
              <div className="ctrl-zoom-selector" title="Tùy chỉnh tỷ lệ hiển thị video">
                <button
                  className={`speed-pill zoom-pill ${zoomMode === 'fill' ? 'active-fill' : ''}`}
                  onClick={() => setZoomMode('fill')}
                  title="Cắt viền đen trên dưới (Phóng to vừa vặn khung hình 16:9)"
                >
                  <Scan size={14} />
                  <span>Tràn viền 16:9</span>
                </button>
                <button
                  className={`speed-pill zoom-pill ${zoomMode === 'zoom2' ? 'active-fill' : ''}`}
                  onClick={() => setZoomMode('zoom2')}
                  title="Phóng to 2.0x"
                >
                  <span>2x</span>
                </button>
                <button
                  className={`speed-pill zoom-pill ${zoomMode === 'original' ? 'active-fill' : ''}`}
                  onClick={() => setZoomMode('original')}
                  title="Kích thước gốc của video"
                >
                  <span>Khung gốc</span>
                </button>
              </div>

              {/* Fullscreen Button - Prominent & Clearly Named */}
              <button 
                className={`ctrl-btn btn-fullscreen-main ${(isFullscreen || isWindowFull) ? 'is-active-fullscreen' : ''}`} 
                onClick={toggleFullscreen} 
                title="Toàn màn hình (Phím F hoặc Nhấp đúp vào video)"
              >
                {isFullscreen || isWindowFull ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                <span>{isFullscreen || isWindowFull ? 'Thu nhỏ' : 'Toàn màn hình'}</span>
              </button>
            </div>
          </div>
        </div>
      )}


        {/* Lesson Description & Tactical Notes */}
        <div className="theater-footer-info">
          <div className="footer-notes">
            <h4>💡 Trọng điểm huấn luyện bài học:</h4>
            <p>{video.description}</p>
          </div>
          <div className="footer-status-box">
            {isCompleted ? (
              <div className="status-complete-box">
                <CheckCircle2 size={24} className="text-emerald" />
                <div>
                  <strong>Trạng thái: ĐÃ XEM XONG</strong>
                  <p>Bạn đã hoàn thành giáo trình này và đủ điều kiện chuyển bài tiếp theo.</p>
                </div>
              </div>
            ) : (
              <div className="status-learning-box">
                <ShieldAlert size={24} className="text-cyan" />
                <div>
                  <strong>Trạng thái: ĐANG THEO HỌC</strong>
                  <p>Hệ thống tự động tích xanh khi bạn theo dõi đến giây cuối cùng của video.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
