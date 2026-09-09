import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GridPosition, MovementVariation, SkillLevel, TacticsVideo } from '../../types';
import { storageService } from '../../services/storage';
import { videoStorageService } from '../../services/videoStorage';
import { EditYouTubeLinkModal, extractYouTubeId, extractTikTokId, isTikTokUrl } from '../Video/EditYouTubeLinkModal';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Zap, 
  Timer as TimerIcon, 
  Infinity as InfinityIcon, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Award,
  Layers,
  Edit3,
  UploadCloud,
  MousePointerClick,
  Maximize2,
  Scan
} from 'lucide-react';
import { Youtube } from '../Video/YoutubeIcon';

// Helper to resolve TikTok URL or ID directly to local downloaded MP4 video
const resolveTrainingVideoUrl = (url?: string): string => {
  if (!url) return '';
  if (url.startsWith('./videos/training/') || url.startsWith('/videos/training/')) {
    return url;
  }
  const match = url.match(/(\d{15,22})/);
  if (match && match[1]) {
    return `./videos/training/${match[1]}.mp4`;
  }
  return url;
};

interface MovementOverlayProps {
  position: GridPosition;
  variation?: MovementVariation;
  variationIndex?: number;
  mode: 'TAY' | 'CHÂN' | 'TAY + CHÂN';
  remainingTime: number;
  totalDuration: number;
  roundNumber: number;
  totalRounds: number;
  isUnlimited?: boolean;
  onCompleteAction?: () => void;
}

export const MovementOverlay: React.FC<MovementOverlayProps> = ({
  position,
  variation,
  variationIndex = 0,
  mode,
  remainingTime,
  totalDuration,
  roundNumber,
  totalRounds,
  isUnlimited = false,
  onCompleteAction
}) => {
  // Load overrides from storage so user-customized YouTube/TikTok/Local videos play in Arena
  const [videoOverrides, setVideoOverrides] = useState<Record<string, any>>(() => storageService.loadVideoOverrides());
  const [isEditingModalOpen, setIsEditingModalOpen] = useState<boolean>(false);
  const [localBlobUrl, setLocalBlobUrl] = useState<string | null>(null);
  type ZoomMode = 'cover' | 'zoom140' | 'zoom180' | 'contain';
  const [zoomMode, setZoomMode] = useState<ZoomMode>('cover');
  const [videoFallback, setVideoFallback] = useState<string | null>(null);

  // All 10 variations for this position
  const variationsList = position.variations && position.variations.length > 0 
    ? position.variations 
    : [
        {
          id: `pos_${position.id}_default`,
          shotName: position.name,
          shotType: 'Kỹ thuật cơ bản',
          level: 'Cơ bản' as SkillLevel,
          videoUrl: position.videoUrl || `./videos/clips/pos_${position.id}_clip_1.mp4`,
          handMovement: position.handMovement,
          footMovement: position.footMovement,
          combinedMovement: position.combinedMovement
        }
      ];

  const [activeIdx, setActiveIdx] = useState<number>(() => {
    if (variationIndex >= 0 && variationIndex < variationsList.length) {
      return variationIndex;
    }
    return 0;
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync index when variationIndex or position changes
  useEffect(() => {
    setVideoFallback(null);
    if (variationIndex >= 0 && variationIndex < variationsList.length) {
      setActiveIdx(variationIndex);
    } else {
      setActiveIdx(0);
    }
  }, [position.id, variationIndex, variationsList.length]);

  const currentVar = variationsList[activeIdx] || variationsList[0];
  
  // Resolve override if user customized this position video
  const overrideKey = currentVar.id || `video-pos-${position.id}-${activeIdx + 1}`;
  const customOverride = videoOverrides[overrideKey] || videoOverrides[`pos_${position.id}_clip_${activeIdx + 1}`];

  // Check if a local video file is stored in IndexedDB for this slot
  useEffect(() => {
    let isMounted = true;
    videoStorageService.getVideoObjectUrl(overrideKey).then((blobUrl) => {
      if (isMounted) {
        if (blobUrl) {
          setLocalBlobUrl(blobUrl);
        } else {
          setLocalBlobUrl(null);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [overrideKey]);

  const rawVideoUrl = videoFallback || localBlobUrl || customOverride?.videoUrl || currentVar.videoUrl || `./videos/clips/pos_${position.id}_clip_${activeIdx + 1}.mp4`;
  const currentVideoUrl = localBlobUrl ? localBlobUrl : resolveTrainingVideoUrl(rawVideoUrl);
  const ytId = extractYouTubeId(currentVideoUrl);
  const tiktokId = !currentVideoUrl.endsWith('.mp4') ? extractTikTokId(currentVideoUrl) : null;
  const isTikTok = !currentVideoUrl.endsWith('.mp4') ? isTikTokUrl(currentVideoUrl) : false;

  // Keyboard navigation for switching variations: Left Arrow & Right Arrow
  const handlePrevVariation = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setVideoFallback(null);
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : variationsList.length - 1));
  }, [variationsList.length]);

  const handleNextVariation = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setVideoFallback(null);
    setActiveIdx((prev) => (prev < variationsList.length - 1 ? prev + 1 : 0));
  }, [variationsList.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if modal is open
      if (isEditingModalOpen) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevVariation();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextVariation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditingModalOpen, handlePrevVariation, handleNextVariation]);

  // Autoplay video with sound when clip changes
  useEffect(() => {
    if (!ytId && videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.defaultMuted = isMuted;
      videoRef.current.volume = 1.0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // If browser blocked unmuted autoplay, retry muted
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
            }
          });
      }
    }
  }, [currentVideoUrl, ytId, activeIdx, isMuted]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.muted = isMuted;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    videoRef.current.volume = 1.0;
    setIsMuted(nextMuted);
    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
  };

  const cycleZoom = () => {
    setZoomMode((prev) => {
      if (prev === 'cover') return 'zoom140';
      if (prev === 'zoom140') return 'zoom180';
      if (prev === 'zoom180') return 'contain';
      return 'cover';
    });
  };

  const handleVideoError = () => {
    console.warn('Video failed to load:', currentVideoUrl);
    const fallbackPath = `./videos/clips/pos_${position.id}_clip_${activeIdx + 1}.mp4`;
    if (currentVideoUrl !== fallbackPath) {
      setVideoFallback(fallbackPath);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        videoRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  // Prepare pseudo TacticsVideo for editing
  const editingTacticsVideo: TacticsVideo = {
    id: overrideKey,
    category: `POS_${position.id}` as any,
    title: customOverride?.title || currentVar.shotName,
    subTitle: customOverride?.subTitle || `Ô ${position.id}: ${position.zoneName} • ${currentVar.shotType || 'Kỹ thuật'}`,
    level: customOverride?.level || currentVar.level || 'Cơ bản',
    description: customOverride?.description || currentVar.combinedMovement?.description || position.combinedMovement?.description || 'Video kỹ thuật động tác thực chiến.',
    videoUrl: currentVideoUrl,
    durationText: 'Thực chiến',
    tags: customOverride?.tags || ['Thực chiến', position.zoneName, currentVar.level || 'Cơ bản'],
    isCustom: !!customOverride || !!localBlobUrl
  };

  const handleSaveVideoOverride = (updated: TacticsVideo) => {
    setVideoOverrides(storageService.loadVideoOverrides());
    setIsEditingModalOpen(false);
  };

  const handleResetToDefault = (videoId: string) => {
    setVideoOverrides(storageService.loadVideoOverrides());
    setLocalBlobUrl(null);
    setIsEditingModalOpen(false);
  };

  const progressPercent = isUnlimited 
    ? 100 
    : Math.max(0, Math.min(100, (remainingTime / totalDuration) * 100));

  const levelColorClass = currentVar.level === 'Cơ bản' 
    ? 'level-badge-basic' 
    : currentVar.level === 'Trung cấp' 
      ? 'level-badge-inter' 
      : 'level-badge-adv';

  return (
    <div className="movement-overlay-backdrop">
      <div 
        className="movement-clean-modal animate-pop"
        onClick={() => onCompleteAction?.()}
      >
        {/* Top Header: Position, Level, Variation Step & Upload Button */}
        <div className="clean-overlay-header" onClick={(e) => e.stopPropagation()}>
          <div className="header-meta-row">
            <div className="clean-pos-pill">
              <span className="clean-pos-num">{position.id}</span>
              <span className="clean-pos-zone">{position.zoneName}</span>
            </div>

            {/* Level Badge */}
            <div className={`clean-level-badge ${levelColorClass}`}>
              <Award size={13} />
              <span>{currentVar.level || 'Cơ bản'}</span>
            </div>

            {/* Variation indicator */}
            <div className="clean-var-counter">
              <span>Động tác {activeIdx + 1}/{variationsList.length}</span>
            </div>

            {/* Live Upload Video Button */}
            <button 
              className="btn-arena-upload-yt"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingModalOpen(true);
              }}
              title="Đổi video cho động tác này"
            >
              <UploadCloud size={14} className="text-cyan" />
              <span>Đổi video</span>
            </button>

            {/* Round & Timer */}
            <div className="clean-timer-group">
              <span className="clean-round-pill">Lượt {roundNumber}/{totalRounds}</span>
              <span className="clean-timer-pill">
                <TimerIcon size={14} />
                <span>{remainingTime.toFixed(1)}s</span>
              </span>
            </div>
          </div>

          {/* Prominent Technique Title with Quick Navigation Arrows */}
          <div className="clean-technique-title-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h2 className="clean-technique-title">{currentVar.shotName}</h2>
              {currentVar.shotType && (
                <span className="clean-technique-type">• {currentVar.shotType}</span>
              )}
              {(customOverride || localBlobUrl) && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span className="arena-custom-tag" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '6px', padding: '2px 8px', fontSize: '11px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={12} />
                    <span>{localBlobUrl ? 'Video trên máy' : 'Tùy chỉnh'}</span>
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      storageService.removeVideoOverride(overrideKey);
                      setVideoOverrides(storageService.loadVideoOverrides());
                      setLocalBlobUrl(null);
                      setVideoFallback(null);
                    }}
                    title="Khôi phục video gốc mặc định"
                    style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', borderRadius: '6px', padding: '2px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Khôi phục
                  </button>
                </div>
              )}
            </div>

            {/* Left & Right Arrow Buttons Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                type="button"
                onClick={handlePrevVariation}
                className="btn-arrow-nav"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 14px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                title="Động tác trước (Phím mũi tên Trái ←)"
              >
                <ChevronLeft size={16} />
                <span>Trước</span>
              </button>

              <button
                type="button"
                onClick={handleNextVariation}
                className="btn-arrow-nav"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 14px', background: 'rgba(0, 242, 254, 0.15)', border: '1px solid #00f2fe', borderRadius: '8px', color: '#00f2fe', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                title="Động tác tiếp theo (Phím mũi tên Phải →)"
              >
                <span>Tiếp</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="clean-progress-track">
          <div 
            className="clean-progress-fill" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>

        {/* Center: Full-Focus Real Video Player with Floating Left/Right Arrow Overlays */}
        <div className="clean-video-arena" onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
          
          {/* Floating Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrevVariation}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 30,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              transition: 'all 0.2s'
            }}
            title="Đổi sang động tác trước (←)"
          >
            <ArrowLeft size={22} />
          </button>

          {/* Floating Right Arrow Button */}
          <button
            type="button"
            onClick={handleNextVariation}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 30,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(0, 242, 254, 0.85)',
              border: '1px solid #00f2fe',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 4px 12px rgba(0,242,254,0.4)',
              transition: 'all 0.2s'
            }}
            title="Đổi sang động tác tiếp theo (→)"
          >
            <ArrowRight size={22} />
          </button>

          <div className="clean-video-container">
            {ytId ? (
              <div className="arena-youtube-iframe-wrap">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=1&rel=0&modestbranding=1`}
                  title={currentVar.shotName}
                  className="clean-youtube-player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="arena-yt-badge">
                  <Youtube size={14} className="text-danger" />
                  <span>YouTube Video</span>
                </div>
              </div>
            ) : (tiktokId || isTikTok) && !localBlobUrl ? (
              <div className="arena-youtube-iframe-wrap" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '380px', background: '#050c17', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 0' }}>
                <div style={{ width: '100%', maxWidth: '320px', height: '100%', minHeight: '380px', borderRadius: '14px', overflow: 'hidden', background: '#000', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <iframe
                    src={tiktokId ? `https://www.tiktok.com/embed/v2/${tiktokId}` : `https://www.tiktok.com/embed/v2/?url=${encodeURIComponent(currentVideoUrl)}`}
                    title={currentVar.shotName}
                    className="clean-youtube-player"
                    style={{ width: '100%', height: '100%', minHeight: '380px', border: 'none', background: '#000' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="arena-yt-badge" style={{ background: 'rgba(0,0,0,0.85)', color: '#00f2fe' }}>
                  <span>🎵 TikTok Video</span>
                </div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={currentVideoUrl}
                  poster={currentVar.thumbnailUrl || `./thumbnails/video-pos-${position.id}-${activeIdx + 1}.jpg`}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  className={`clean-video-player fit-${zoomMode}`}
                  onClick={togglePlay}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onError={handleVideoError}
                />

                {!isPlaying && (
                  <div className="clean-video-pause-overlay" onClick={togglePlay} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'rgba(2, 132, 199, 0.9)', width: 'auto', height: 'auto', padding: '16px 28px', borderRadius: '18px' }}>
                    <Play size={36} className="pause-icon" />
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#020812' }}>BẤM ĐỂ PHÁT VIDEO</span>
                  </div>
                )}

                {/* Compact Floating Video Controls */}
                <div className="clean-video-actions">
                  <button 
                    className="clean-vid-btn" 
                    onClick={togglePlay}
                    title={isPlaying ? 'Tạm dừng video' : 'Phát tiếp'}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button 
                    className={`clean-vid-btn ${!isMuted ? 'active-cyan' : ''}`} 
                    onClick={toggleMute}
                    title={isMuted ? 'Bật âm thanh (Đang tắt tiếng)' : 'Tắt âm thanh (Đang bật tiếng)'}
                    style={{ color: !isMuted ? '#00f2fe' : '#ffffff' }}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <button 
                    className="clean-vid-btn active-cyan"
                    onClick={(e) => {
                      e.stopPropagation();
                      cycleZoom();
                    }}
                    title={`Chế độ thu phóng: ${zoomMode === 'cover' ? 'Phóng to đầy màn (Mặc định)' : zoomMode === 'zoom140' ? 'Phóng to 1.4x (Cắt viền đen)' : zoomMode === 'zoom180' ? 'Cận cảnh 1.8x' : 'Vừa khung (Fit)'} - Click để chuyển`}
                    style={{ minWidth: '58px', width: 'auto', padding: '0 8px', gap: '4px', fontSize: '11px', fontWeight: 800 }}
                  >
                    <Scan size={14} />
                    <span>{zoomMode === 'cover' ? 'Full' : zoomMode === 'zoom140' ? '1.4x' : zoomMode === 'zoom180' ? '1.8x' : 'Fit'}</span>
                  </button>
                  <button 
                    className="clean-vid-btn" 
                    onClick={toggleFullscreen}
                    title="Xem toàn màn hình"
                  >
                    <Maximize2 size={15} />
                  </button>
                  <button 
                    className="clean-vid-btn btn-change-link" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingModalOpen(true);
                    }}
                    title="Đẩy video file từ máy hoặc gắn link mới"
                  >
                    <UploadCloud size={15} />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* List of 10 Technique Variations for this corner */}
          <div className="clean-variation-selector" style={{ marginTop: '12px' }}>
            <div className="variation-selector-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={14} className="text-cyan" />
                <span>10 ĐỘNG TÁC TẠI Ô {position.id} (DÙNG MŨI TÊN ⬅ / ➔ ĐỂ ĐỔI):</span>
              </div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                Đang xem #{activeIdx + 1}/10
              </span>
            </div>

            <div className="variation-chips-scroll" style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '6px 2px' }}>
              {variationsList.map((v, i) => {
                const isSelected = i === activeIdx;
                const badgeClass = v.level === 'Cơ bản' 
                  ? 'chip-basic' 
                  : v.level === 'Trung cấp' 
                    ? 'chip-inter' 
                    : 'chip-adv';
                const hasCustom = !!videoOverrides[v.id || `video-pos-${position.id}-${i + 1}`];

                return (
                  <button
                    key={v.id || i}
                    className={`clean-var-chip ${isSelected ? 'is-selected' : ''} ${badgeClass}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIdx(i);
                    }}
                    title={v.shotName}
                    style={{
                      border: isSelected ? '2px solid #00f2fe' : '1px solid rgba(255,255,255,0.1)',
                      background: isSelected ? 'rgba(0, 242, 254, 0.2)' : 'rgba(15, 23, 42, 0.7)'
                    }}
                  >
                    <span className="chip-idx-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="chip-level-tag">{v.level}</span>
                    <span className="chip-name">{v.shotName}</span>
                    {hasCustom && <span style={{ color: '#10b981', fontSize: '10px' }}>★</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Interactive Trigger Bar */}
        <div 
          className="clean-bottom-trigger active-waiting"
          onClick={(e) => {
            e.stopPropagation();
            onCompleteAction?.();
          }}
          title="Bấm chuột hoặc gõ phím Space để qua bài tiếp theo"
        >
          <div className="trigger-left">
            <MousePointerClick size={20} className="trigger-click-pulsing text-lime" />
            <span className="trigger-main-text">
              Chạm màn hình hoặc bấm phím <strong className="text-lime">SPACE</strong> để chuyển bài
            </span>
          </div>
          <div className="trigger-right-btn">
            <span>QUA Ô TIẾP (SPACE)</span>
            <ArrowRight size={17} />
          </div>
        </div>
      </div>

      {/* Live Video Edit / File Upload Modal */}
      {isEditingModalOpen && (
        <EditYouTubeLinkModal
          video={editingTacticsVideo}
          isOpen={isEditingModalOpen}
          onClose={() => setIsEditingModalOpen(false)}
          onSave={handleSaveVideoOverride}
          onResetToDefault={handleResetToDefault}
        />
      )}
    </div>
  );
};
