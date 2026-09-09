import React, { useState, useRef, useEffect } from 'react';
import { GridPosition, MovementVariation, SkillLevel, TacticsVideo } from '../../types';
import { storageService } from '../../services/storage';
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
  Award,
  Layers,
  Edit3,
  MousePointerClick
} from 'lucide-react';
import { Youtube } from '../Video/YoutubeIcon';

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
  // Load overrides from storage so user-customized YouTube videos play in Arena
  const [videoOverrides, setVideoOverrides] = useState<Record<string, any>>(() => storageService.loadVideoOverrides());
  const [isEditingModalOpen, setIsEditingModalOpen] = useState<boolean>(false);

  // All variations for this position (6-7 real technique clips)
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
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync index when variationIndex or position changes
  useEffect(() => {
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

  const currentVideoUrl = customOverride?.videoUrl || currentVar.videoUrl || `./videos/clips/pos_${position.id}_clip_${activeIdx + 1}.mp4`;
  const ytId = extractYouTubeId(currentVideoUrl);
  const tiktokId = extractTikTokId(currentVideoUrl);
  const isTikTok = isTikTokUrl(currentVideoUrl);

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
    isCustom: !!customOverride
  };

  const handleSaveVideoOverride = (updated: TacticsVideo) => {
    setVideoOverrides(storageService.loadVideoOverrides());
    setIsEditingModalOpen(false);
  };

  const handleResetToDefault = (videoId: string) => {
    setVideoOverrides(storageService.loadVideoOverrides());
    setIsEditingModalOpen(false);
  };

  // Autoplay video when clip changes
  useEffect(() => {
    if (!ytId && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [currentVideoUrl, ytId]);

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

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
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
        {/* Top Minimalist Header: Position, Level & Technique Name Only */}
        <div className="clean-overlay-header" onClick={(e) => e.stopPropagation()}>
          <div className="header-meta-row">
            <div className="clean-pos-pill">
              <span className="clean-pos-num">{position.id}</span>
              <span className="clean-pos-zone">{position.zoneName}</span>
            </div>

            {/* Level Badge (Cơ bản / Trung cấp / Nâng cao) */}
            <div className={`clean-level-badge ${levelColorClass}`}>
              <Award size={14} />
              <span>{currentVar.level || 'Cơ bản'}</span>
            </div>

            {/* Live Upload Video Button */}
            <button 
              className="btn-arena-upload-yt"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingModalOpen(true);
              }}
              title="Đổi hoặc gắn link YouTube video của bạn vào ô này"
            >
              <Youtube size={14} className="text-danger" />
              <span>Đổi / Gắn Link Video Ô Này</span>
            </button>

            {/* Round & Timer */}
            <div className="clean-timer-group">
              <span className="clean-round-pill">LƯỢT {roundNumber}/{totalRounds}</span>
              <span className="clean-timer-pill">
                <TimerIcon size={14} />
                <span>{remainingTime.toFixed(1)}s</span>
              </span>
            </div>
          </div>

          {/* Prominent Technique Title */}
          <div className="clean-technique-title-wrap">
            <h2 className="clean-technique-title">{currentVar.shotName}</h2>
            {currentVar.shotType && (
              <span className="clean-technique-type">• {currentVar.shotType}</span>
            )}
            {customOverride && (
              <span className="arena-custom-tag">
                <Youtube size={11} className="text-danger" />
                <span>Video của bạn</span>
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="clean-progress-track">
          <div 
            className="clean-progress-fill" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>

        {/* Center: Full-Focus Real Video Player (Supports YouTube, TikTok & MP4) */}
        <div className="clean-video-arena" onClick={(e) => e.stopPropagation()}>
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
            ) : (tiktokId || isTikTok) ? (
              <div className="arena-youtube-iframe-wrap" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '380px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <iframe
                  src={tiktokId ? `https://www.tiktok.com/embed/v2/${tiktokId}` : `https://www.tiktok.com/embed/v2/?url=${encodeURIComponent(currentVideoUrl)}`}
                  title={currentVar.shotName}
                  className="clean-youtube-player"
                  style={{ width: '100%', height: '100%', minHeight: '380px', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <div className="arena-yt-badge" style={{ background: 'rgba(0,0,0,0.85)', color: '#00f2fe' }}>
                  <span>🎵 TikTok Video</span>
                </div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={currentVideoUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="clean-video-player"
                  onClick={togglePlay}
                />

                {!isPlaying && (
                  <div className="clean-video-pause-overlay" onClick={togglePlay}>
                    <Play size={44} className="pause-icon" />
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
                    className="clean-vid-btn" 
                    onClick={toggleMute}
                    title={isMuted ? 'Bật âm thanh' : 'Tắt âm'}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <button 
                    className="clean-vid-btn btn-change-link" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingModalOpen(true);
                    }}
                    title="Gắn link YouTube / TikTok của bạn"
                  >
                    <Edit3 size={15} />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Quick Technique Variation Selector (5-7 videos per position categorized by level) */}
          <div className="clean-variation-selector">
            <div className="variation-selector-header">
              <Layers size={14} />
              <span>ĐỘNG TÁC TẠI Ô {position.id} ({variationsList.length} VIDEO THẬT):</span>
            </div>
            <div className="variation-chips-scroll">
              {variationsList.map((v, i) => {
                const isSelected = i === activeIdx;
                const badgeClass = v.level === 'Cơ bản' 
                  ? 'chip-basic' 
                  : v.level === 'Trung cấp' 
                    ? 'chip-inter' 
                    : 'chip-adv';
                return (
                  <button
                    key={v.id || i}
                    className={`clean-var-chip ${isSelected ? 'is-selected' : ''} ${badgeClass}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIdx(i);
                    }}
                    title={v.shotName}
                  >
                    <span className="chip-idx-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="chip-level-tag">{v.level}</span>
                    <span className="chip-name">{v.shotName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Interactive Trigger Bar (Đợi người dùng bấm chuột / phím Cách) */}
        <div 
          className="clean-bottom-trigger active-waiting"
          onClick={(e) => {
            e.stopPropagation();
            onCompleteAction?.();
          }}
          title="Bấm chuột vào đây hoặc gõ phím CÁCH (Space) để qua ô mới"
        >
          <div className="trigger-left">
            <MousePointerClick size={24} className="trigger-click-pulsing text-lime" />
            <span className="trigger-main-text">
              ĐÃ XONG ĐỘNG TÁC: <strong className="text-lime">CLICK CHUỘT VÀO MÀN HÌNH</strong> HOẶC <strong className="text-lime">BẤM PHÍM CÁCH [SPACE]</strong> ĐỂ QUA Ô MỚI
            </span>
          </div>
          <div className="trigger-right-btn">
            <span>QUA Ô TIẾP</span>
            <ArrowRight size={18} />
          </div>
        </div>
      </div>

      {/* Live YouTube Edit / Upload Modal */}
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

