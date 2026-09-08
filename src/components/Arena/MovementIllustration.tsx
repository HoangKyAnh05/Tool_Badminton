import React, { useState, useRef, useEffect } from 'react';
import { GridPosition, MovementVariation } from '../../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Compass, 
  Video as VideoIcon, 
  Link as LinkIcon, 
  Upload, 
  Zap,
  Gauge,
  User,
  X,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface MovementIllustrationProps {
  position: GridPosition;
  variation?: MovementVariation;
  variationIndex?: number;
  mode: 'TAY' | 'CHÂN' | 'TAY + CHÂN';
  className?: string;
}

// 9 Real Badminton Athlete Videos mapped to the 9 court zones
const POSITION_REAL_VIDEOS: Record<number, { videoUrl: string; label: string; tip: string }> = {
  1: {
    videoUrl: './videos/snaptik.vn_7501608184688299271.mp4',
    label: 'Gài lưới miết mặt vợt trái tay (Net Spin & Low Lunge)',
    tip: 'Lunge chân phải vươn dài, cổ tay thả lỏng miết nhẹ đầu quả cầu lộn sát mép lưới'
  },
  2: {
    videoUrl: './videos/viesnap.vn_tiktok_ZSq6N6mx5.mp4',
    label: 'Vồ cầu đè lưới chớp nhoáng (Forecourt Net Kill)',
    tip: 'Vươn vợt đón cầu trên đỉnh mép lưới, gõ cắm thẳng quả cầu xuống sàn đối thủ'
  },
  3: {
    videoUrl: './videos/snaptik.vn_7501608184688299271.mp4',
    label: 'Bỏ nhỏ thuận tay & gài lưới tinh tế (Forehand Net Slice)',
    tip: 'Mở mặt vợt 45°, cắt xiên đáy quả cầu rơi sát chữ T mép lưới'
  },
  4: {
    videoUrl: './videos/snaptik.vn_7665340734379281682.mp4',
    label: 'Thủ ve trái tay & phản tạt ngang hông (Backhand Defense)',
    tip: 'Hạ thấp trọng tâm, ngón cái tì cạnh vát cán vợt bung lực cẳng tay đẩy sâu'
  },
  5: {
    videoUrl: './videos/snaptik.vn_7465697345355713799.mp4',
    label: 'Split-Step trung tâm & Bộ pháp di chuyển 4 góc',
    tip: 'Nhún bật hai chân đàn hồi, luôn sẵn sàng phóng đà tới 4 góc sân'
  },
  6: {
    videoUrl: './videos/viesnap.vn_tiktok_ZSq6N6mx5.mp4',
    label: 'Phản tạt phẳng đè cầu thuận tay (Flat Forehand Drive)',
    tip: 'Đón cầu ngang sườn hông, đè cầu phẳng sát mép lưới tước đoạt quyền công'
  },
  7: {
    videoUrl: './videos/snaptik.vn_7476759285720993040.mp4',
    label: 'Chém cầu & Ve trái tay cuối sân (Round-the-head / Backhand Clear)',
    tip: 'Bước lùi chassé nhanh, xoay vai bung cầu cao sâu về góc chữ U đối phương'
  },
  8: {
    videoUrl: './videos/snaptik.vn_7568145336158440724.mp4',
    label: 'Chém cầu bạt góc & Phông cầu cao sâu đáy sân (Slice Drop / Clear)',
    tip: 'Động tác giả đập smash, giảm lực miết cổ tay chém cầu rơi chéo mép biên'
  },
  9: {
    videoUrl: './videos/snaptik.vn_7631002086502649109.mp4',
    label: 'Bật nhảy đập cầu cắm sàn Scissor Kick (Jump Smash)',
    tip: 'Tạo đà chân thuận, bật cao gập bụng dồn lực cổ tay đập cầu cắm sân đối thủ'
  }
};

export const MovementIllustration: React.FC<MovementIllustrationProps> = ({
  position,
  variation,
  variationIndex,
  mode,
  className = ''
}) => {
  // Tab view: 'VIDEO' (Video thực tế) vs 'COURT' (Sơ đồ di chuyển sân) vs 'CUSTOM' (Gắn link riêng)
  const [activeTab, setActiveTab] = useState<'VIDEO' | 'COURT' | 'CUSTOM'>('VIDEO');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isSlowMo, setIsSlowMo] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const posId = position.id;
  const isHand = mode === 'TAY';
  const isFoot = mode === 'CHÂN';
  const primaryColor = isHand ? '#00f0ff' : isFoot ? '#39ff14' : '#ffb703';

  // Load custom video for this position if saved in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`badminton_custom_video_pos_${posId}`);
      if (stored) {
        setCustomVideoUrl(stored);
      } else {
        setCustomVideoUrl(null);
      }
    } catch {
      setCustomVideoUrl(null);
    }
  }, [posId]);

  const defaultVideoInfo = POSITION_REAL_VIDEOS[posId] || POSITION_REAL_VIDEOS[5];
  const activeVideoUrl = customVideoUrl || defaultVideoInfo.videoUrl;

  // Handle Play/Pause
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Toggle Slow-mo (0.5x vs 1.0x) for in-depth technique analysis
  const toggleSlowMo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextSlow = !isSlowMo;
    videoRef.current.playbackRate = nextSlow ? 0.5 : 1.0;
    setIsSlowMo(nextSlow);
  };

  // Toggle Mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Toggle Fullscreen
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!stageRef.current) return;
    if (!document.fullscreenElement) {
      stageRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  // Handle custom URL save
  const handleSaveCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    localStorage.setItem(`badminton_custom_video_pos_${posId}`, inputUrl.trim());
    setCustomVideoUrl(inputUrl.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveTab('VIDEO');
    }, 1200);
  };

  // Reset to default real video
  const handleResetDefaultVideo = () => {
    localStorage.removeItem(`badminton_custom_video_pos_${posId}`);
    setCustomVideoUrl(null);
    setInputUrl('');
    setActiveTab('VIDEO');
  };

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setCustomVideoUrl(blobUrl);
      setActiveTab('VIDEO');
    }
  };

  // Detect if active video is a YouTube link
  const getYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    return match ? match[1] : null;
  };

  const ytId = getYouTubeId(activeVideoUrl);

  // Render Real Video Demonstration Stage
  const renderRealVideoVisual = () => {
    if (ytId) {
      return (
        <div className="movement-real-video-wrap">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=1`}
            title={defaultVideoInfo.label}
            className="movement-yt-iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    return (
      <div className="movement-real-video-wrap" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={activeVideoUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="movement-video-element"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Video Overlay Badges */}
        <div className="movement-video-top-bar">
          <div className="video-pos-badge" style={{ borderColor: primaryColor }}>
            <span className="pos-badge-num" style={{ background: primaryColor }}>{posId}</span>
            <span className="pos-badge-title">{position.zoneName}</span>
          </div>

          <div className="video-meta-pills">
            <span className="real-video-pill">
              <VideoIcon size={12} className="text-cyan" />
              <span>CLIP THỰC TẾ</span>
            </span>
            {isSlowMo && (
              <span className="slow-mo-pill animate-pulse">
                <Gauge size={12} />
                <span>SLOW-MO 0.5x</span>
              </span>
            )}
          </div>
        </div>

        {/* Center Pause Icon */}
        {!isPlaying && (
          <div className="movement-video-center-paused">
            <Play size={44} fill="currentColor" />
          </div>
        )}

        {/* Video Control Bar On Bottom */}
        <div className="movement-video-bottom-controls" onClick={(e) => e.stopPropagation()}>
          <div className="mv-ctrl-left">
            <button className="mv-btn" onClick={togglePlay} title={isPlaying ? "Tạm dừng" : "Phát"}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
            </button>
            <button 
              className={`mv-btn ${isSlowMo ? 'is-active-btn' : ''}`} 
              onClick={toggleSlowMo} 
              title="Chế độ quay chậm 0.5x phân tích bộ pháp"
            >
              <Gauge size={15} />
              <span style={{ fontSize: '11px', fontWeight: 'bold' }}>0.5x</span>
            </button>
            <button className="mv-btn" onClick={toggleMute} title={isMuted ? "Bật tiếng" : "Tắt tiếng"}>
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>

          <div className="mv-ctrl-center">
            <span className="mv-video-label-text">
              {defaultVideoInfo.label}
            </span>
          </div>

          <div className="mv-ctrl-right">
            <button className="mv-btn" onClick={toggleFullscreen} title="Toàn màn hình">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render Court Tactical Diagram
  const renderCourtDiagram = () => {
    const targetX = position.col === 1 ? 160 : position.col === 2 ? 300 : 440;
    const targetY = position.row === 1 ? 110 : position.row === 2 ? 220 : 330;
    const baseX = 300;
    const baseY = 220;

    return (
      <svg
        viewBox="0 0 600 370"
        className="illustration-svg court-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="courtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d1b2a" />
            <stop offset="100%" stopColor="#050c14" />
          </linearGradient>

          <linearGradient id="targetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
          </linearGradient>

          <filter id="glowCourt" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill={primaryColor} />
          </marker>
        </defs>

        <rect x="50" y="20" width="500" height="330" rx="16" fill="url(#courtGrad)" stroke="#1e3a5f" strokeWidth="2.5" />

        {/* Lines */}
        <line x1="50" y1="40" x2="550" y2="40" stroke="#334e68" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="50" y1="330" x2="550" y2="330" stroke="#334e68" strokeWidth="2" />
        <line x1="90" y1="20" x2="90" y2="350" stroke="#243b53" strokeWidth="2" />
        <line x1="510" y1="20" x2="510" y2="350" stroke="#243b53" strokeWidth="2" />
        <line x1="300" y1="120" x2="300" y2="350" stroke="#243b53" strokeWidth="2" />

        {/* Net */}
        <rect x="50" y="20" width="500" height="38" fill="#000" fillOpacity="0.4" />
        <line x1="50" y1="58" x2="550" y2="58" stroke="#00f0ff" strokeWidth="3" opacity="0.8" />
        <text x="300" y="38" fill="#627d98" fontSize="13" fontWeight="bold" textAnchor="middle" letterSpacing="3">
          NET / LƯỚI THI ĐẤU
        </text>

        {/* Short Service Line */}
        <line x1="50" y1="120" x2="550" y2="120" stroke="#334e68" strokeWidth="2" />

        {/* Movement Vector Path */}
        {position.id !== 5 && (
          <path
            d={`M ${baseX} ${baseY} Q ${(baseX + targetX) / 2 + (targetX > baseX ? 20 : -20)} ${(baseY + targetY) / 2 - 15} ${targetX} ${targetY}`}
            fill="none"
            stroke={primaryColor}
            strokeWidth="4"
            strokeDasharray={isFoot ? "8 6" : "none"}
            markerEnd="url(#arrow)"
            filter="url(#glowCourt)"
          />
        )}

        {/* Center Base Marker */}
        <circle cx={baseX} cy={baseY} r="16" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
        <circle cx={baseX} cy={baseY} r="6" fill="#94a3b8" />
        <text x={baseX} y={baseY + 32} fill="#94a3b8" fontSize="12" fontWeight="600" textAnchor="middle">
          TÂM SÂN (Ô 5)
        </text>

        {/* Target Zone Highlight */}
        <circle cx={targetX} cy={targetY} r="48" fill={primaryColor} fillOpacity="0.18" filter="url(#glowCourt)" />
        <circle cx={targetX} cy={targetY} r="34" fill="url(#targetGrad)" stroke="#ffffff" strokeWidth="3.5" />
        <text x={targetX} y={targetY + 8} fill="#050c14" fontSize="24" fontWeight="900" textAnchor="middle">
          {position.id}
        </text>

        {/* Shuttlecock */}
        <g transform={`translate(${targetX + 28}, ${targetY - 30}) rotate(-25)`}>
          <ellipse cx="0" cy="0" rx="7" ry="11" fill="#fff" />
          <path d="M -7 4 L -13 20 L 13 20 L 7 4 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
        </g>
      </svg>
    );
  };

  // Render Custom Link / Upload Form
  const renderCustomLinkForm = () => {
    return (
      <div className="movement-custom-link-panel" style={{ padding: '24px', background: 'rgba(10, 20, 35, 0.95)', borderRadius: '16px', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
        <h4 style={{ color: '#00f0ff', marginTop: 0, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LinkIcon size={18} /> GẮN LINK VIDEO THỰC TẾ CHO VỊ TRÍ {posId} ({position.zoneName})
        </h4>
        <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.5 }}>
          Bạn có thể dán link <strong>YouTube Shorts</strong>, link video <strong>MP4 online</strong>, hoặc chọn file video clip thực tế từ máy tính để cá nhân hóa động tác của bạn!
        </p>

        <form onSubmit={handleSaveCustomUrl} style={{ marginTop: '16px' }}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#e2e8f0', marginBottom: '6px' }}>
              Đường dẫn link Video (YouTube / Shorts / MP4):
            </label>
            <input
              type="text"
              placeholder="https://www.youtube.com/shorts/... hoặc ./videos/clip.mp4"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: '#071220',
                border: '1px solid #1e3a5f',
                color: '#fff',
                fontSize: '13px'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            <button
              type="submit"
              style={{
                padding: '9px 18px',
                borderRadius: '8px',
                background: '#00f0ff',
                color: '#020812',
                border: 'none',
                fontWeight: 800,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Lưu Video Này
            </button>

            <label
              style={{
                padding: '9px 18px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Upload size={14} /> Tải file video từ máy
              <input type="file" accept="video/mp4,video/webm" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>

            {customVideoUrl && (
              <button
                type="button"
                onClick={handleResetDefaultVideo}
                style={{
                  padding: '9px 14px',
                  borderRadius: '8px',
                  background: 'transparent',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Khôi phục video mặc định
              </button>
            )}

            {savedSuccess && (
              <span style={{ color: '#39ff14', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={16} /> Đã lưu thành công!
              </span>
            )}
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className={`illustration-container ${className}`}>
      {/* Visual Mode Navigation Switcher */}
      <div className="illustration-view-tabs">
        <button
          className={`view-tab-btn ${activeTab === 'VIDEO' ? 'is-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab('VIDEO');
          }}
        >
          <VideoIcon size={14} />
          <span className="tab-full-label">🎬 VIDEO THỰC TẾ</span>
          <span className="tab-mobile-label">Video</span>
        </button>

        <button
          className={`view-tab-btn ${activeTab === 'COURT' ? 'is-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab('COURT');
          }}
        >
          <Compass size={14} />
          <span className="tab-full-label">🏟️ SƠ ĐỒ DI CHUYỂN</span>
          <span className="tab-mobile-label">Sơ đồ sân</span>
        </button>

        <button
          className={`view-tab-btn ${activeTab === 'CUSTOM' ? 'is-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab('CUSTOM');
          }}
        >
          <LinkIcon size={14} />
          <span className="tab-full-label">🔗 GẮN LINK CLIP</span>
          <span className="tab-mobile-label">Gắn link</span>
        </button>
      </div>

      {/* Main Visual Display Stage */}
      <div className="illustration-display-stage" ref={stageRef}>
        {activeTab === 'VIDEO' && renderRealVideoVisual()}
        {activeTab === 'COURT' && renderCourtDiagram()}
        {activeTab === 'CUSTOM' && renderCustomLinkForm()}
      </div>
    </div>
  );
};
