import React from 'react';
import { GridPosition, MovementVariation } from '../../types';
import { MovementIllustration } from './MovementIllustration';
import { Timer, Zap, Lightbulb, ArrowRight, CheckCircle, Infinity as InfinityIcon, Target, Sparkles, Activity } from 'lucide-react';

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
  const activeVar = variation || (position.variations && position.variations[0]);

  const movementData = activeVar
    ? (mode === 'TAY' 
        ? activeVar.handMovement 
        : mode === 'CHÂN' 
          ? activeVar.footMovement 
          : activeVar.combinedMovement)
    : (mode === 'TAY'
        ? position.handMovement
        : mode === 'CHÂN'
          ? position.footMovement
          : position.combinedMovement);

  const modeTitle = mode === 'TAY' ? 'TAY' : mode === 'CHÂN' ? 'CHÂN' : 'TAY + CHÂN';
  const progressPercent = isUnlimited 
    ? 100 
    : Math.max(0, Math.min(100, (remainingTime / totalDuration) * 100));

  return (
    <div className="movement-overlay-backdrop">
      <div 
        className="movement-overlay-modal animate-pop"
        onClick={() => onCompleteAction?.()}
      >
        {/* Sleek, organized top header */}
        <div className="overlay-header">
          {/* Row 1: Position on left, Meta & Timer on right */}
          <div className="overlay-header-top">
            <div className="header-badge position-header-pill">
              <span className="pos-badge-circle">{position.id}</span>
              <div className="pos-badge-text">
                <strong>{position.zoneName}</strong>
                <small>{position.directionLabel}</small>
              </div>
            </div>

            {/* Mode & Round Badges */}
            <div className="header-right-meta">
              <div className="header-badge mode-badge">
                <Zap size={14} />
                <span>CHẾ ĐỘ {modeTitle}</span>
              </div>

              <div className="header-badge round-badge">
                <span>LƯỢT {roundNumber}/{totalRounds}</span>
              </div>

              {/* Stopwatch / Timer */}
              <div className={`header-badge timer-badge ${isUnlimited ? 'is-unlimited-badge' : ''}`}>
                {isUnlimited ? (
                  <>
                    <InfinityIcon size={16} className="icon-pulse" />
                    <span className="timer-number">{remainingTime.toFixed(1)}s</span>
                  </>
                ) : (
                  <>
                    <Timer size={16} />
                    <span className="timer-number">{remainingTime.toFixed(2)}s</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Row 2: Technique Variation Pill */}
          {activeVar && (
            <div className="header-badge variation-badge">
              <Target size={15} className="text-cyan animate-pulse" />
              <span>KIỂU ĐÁNH <strong>{variationIndex + 1}/3</strong>: {activeVar.shotName}</span>
            </div>
          )}
        </div>

        {/* Progress indicator bar */}
        <div className="timer-bar-track">
          <div 
            className={`timer-bar-fill ${isUnlimited ? 'unlimited-glow' : ''}`}
            style={{ width: `${progressPercent}%` }} 
          />
        </div>

        {/* Visual Demonstration Area (Clean, Centered, NO overlapping floating pill) */}
        <div className="overlay-visual-arena">
          <MovementIllustration
            position={position}
            variation={activeVar}
            variationIndex={variationIndex}
            mode={mode}
            className="overlay-illustration"
          />
        </div>

        {/* Clear Instructions for the athlete */}
        <div className="overlay-instruction-card">
          <div className="instruction-top-line">
            <div className="instruction-tags">
              <span className="shot-type-pill">
                <Sparkles size={13} />
                {activeVar?.shotType || 'Kỹ thuật thi đấu'}
              </span>
              <span className="shot-num-pill">
                Biến thể kỹ thuật {variationIndex + 1}/3
              </span>
            </div>

            <h2 className="movement-title">{movementData.title}</h2>
            <p className="movement-subtitle">{movementData.subTitle}</p>
          </div>

          {/* Technique Breakdown: Hand + Foot specs */}
          <div className="technique-breakdown-grid">
            <div className="technique-mini-card hand-card">
              <div className="mini-card-header">
                <Activity size={14} className="text-cyan" />
                <span>KỸ THUẬT VỢT / TAY:</span>
              </div>
              <div className="mini-card-body">
                {activeVar?.handMovement.subTitle || position.handMovement.subTitle}
              </div>
            </div>

            <div className="technique-mini-card foot-card">
              <div className="mini-card-header">
                <Zap size={14} className="text-lime" />
                <span>BỘ PHÁP DI CHUYỂN:</span>
              </div>
              <div className="mini-card-body">
                {activeVar?.footMovement.subTitle || position.footMovement.subTitle}
              </div>
            </div>
          </div>

          {/* Coaching Tip */}
          <div className="coaching-callout">
            <Lightbulb size={18} className="callout-icon text-amber" />
            <p><strong>Mẹo HLV:</strong> {movementData.coachingTip}</p>
          </div>
        </div>

        {/* Bottom Interactive Trigger Bar: Click / Touch or Spacebar */}
        <div 
          className="overlay-action-trigger" 
          onClick={(e) => {
            e.stopPropagation();
            onCompleteAction?.();
          }}
          role="button"
          tabIndex={0}
        >
          <div className="action-trigger-content">
            <CheckCircle size={20} className="trigger-icon-check" />
            <span className="trigger-hint-text">
              TẬP XONG: <strong>BẤM PHÍM CÁCH</strong> HOẶC <strong>CHẠM VÀO ĐÂY</strong> ĐỂ SANG BÀI KHÁC
            </span>
            <div className="trigger-pill-btn">
              <span>TIẾP THEO</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
