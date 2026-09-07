import React, { useState, useRef, useEffect } from 'react';
import { TacticsVideo } from '../../types';
import { storageService } from '../../services/storage';
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
  Tv
} from 'lucide-react';

interface VideoPlayerModalProps {
  video: TacticsVideo;
  isOpen: boolean;
  onClose: () => void;
  onWatchedChanged: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  isOpen,
  onClose,
  onWatchedChanged
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
  const [zoomMode, setZoomMode] = useState<'fill' | 'zoom2' | 'original'>('fill');
  
  // Status and Alerts
  const [isCompleted, setIsCompleted] = useState<boolean>(() => storageService.isVideoWatched(video.id));
  const [showSeekAlert, setShowSeekAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [justCompletedToast, setJustCompletedToast] = useState<boolean>(false);

  const maxWatchedRef = useRef<number>(0);

  // Sync completion status when video changes
  useEffect(() => {
    const watched = storageService.isVideoWatched(video.id);
    setIsCompleted(watched);
    // If already watched before, user is permitted to seek anywhere freely, or keep locked if strictly desired
    // Per requirement: "ko cho phép tua khi xem xong thì ng xem sẽ tự đọng đc tích kaf mình đã xem xong roi"
    // If not watched, start maxWatched at 0. If already watched, unlock full duration.
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

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleRewind(5);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        triggerSeekWarning();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying]);

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

  const toggleFullscreen = () => {
    const container = document.getElementById('video-theater-wrapper');
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
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
        className="video-theater-card animate-scale-up" 
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

          <button className="theater-close-btn" onClick={onClose} title="Đóng">
            <X size={22} />
          </button>
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
          />

          {/* Center Play Overlay Icon when paused */}
          {!isPlaying && !justCompletedToast && (
            <div className="theater-center-play" onClick={togglePlay}>
              <Play size={48} fill="currentColor" />
            </div>
          )}
        </div>

        {/* Custom Restricted Video Controls Bar */}
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
                  title="Phóng to tràn màn hình (Tự động cắt viền đen TikTok để video to rõ nhất)"
                >
                  <Scan size={14} />
                  <span>Toàn màn hình</span>
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
                  title="Kích thước gốc TikTok (Có viền đen trên dưới)"
                >
                  <span>Khung gốc</span>
                </button>
              </div>

              {/* Fullscreen */}
              <button className="ctrl-btn" onClick={toggleFullscreen} title="Toàn màn hình">
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
            </div>
          </div>
        </div>

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
