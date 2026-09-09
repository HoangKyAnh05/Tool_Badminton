import React, { useState, useRef, useEffect } from 'react';
import { GridPosition, MovementVariation, SkillLevel } from '../../types';
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
  Sparkles,
  Layers
} from 'lucide-react';

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
  const currentVideoUrl = currentVar.videoUrl || `./videos/clips/pos_${position.id}_clip_${activeIdx + 1}.mp4`;

  // Autoplay video when clip changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [currentVideoUrl]);

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
              <Sparkles size={14} />
              <span>{currentVar.level || 'Cơ bản'}</span>
            </div>

            {/* Round & Timer */}
            <div className="clean-timer-group">
              <span className="clean-round-pill">LƯỢT {roundNumber}/{totalRounds}</span>
              <span className="clean-timer-pill">
                {isUnlimited ? (
                  <>
                    <InfinityIcon size={14} />
                    <span>{remainingTime.toFixed(1)}s</span>
                  </>
                ) : (
                  <>
                    <TimerIcon size={14} />
                    <span>{remainingTime.toFixed(1)}s</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Prominent Technique Title */}
          <div className="clean-technique-title-wrap">
            <h2 className="clean-technique-title">{currentVar.shotName}</h2>
            {currentVar.shotType && (
              <span className="clean-technique-type">• {currentVar.shotType}</span>
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

        {/* Center: Full-Focus Real Video Player (No wall of text) */}
        <div className="clean-video-arena" onClick={(e) => e.stopPropagation()}>
          <div className="clean-video-container" onClick={togglePlay}>
            <video
              ref={videoRef}
              src={currentVideoUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="clean-video-player"
            />

            {!isPlaying && (
              <div className="clean-video-pause-overlay">
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
            </div>
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
                    <span className="chip-level-tag">{v.level}</span>
                    <span className="chip-name">{v.shotName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Interactive Trigger Bar */}
        <div 
          className="clean-bottom-trigger"
          onClick={(e) => {
            e.stopPropagation();
            onCompleteAction?.();
          }}
        >
          <div className="trigger-left">
            <CheckCircle size={22} className="trigger-check-icon" />
            <span className="trigger-main-text">
              TẬP XONG: <strong>BẤM PHÍM CÁCH</strong> HOẶC <strong>CHẠM VÀO ĐÂY</strong> ĐỂ TIẾP TỤC
            </span>
          </div>
          <div className="trigger-right-btn">
            <span>BÀI TIẾP</span>
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
