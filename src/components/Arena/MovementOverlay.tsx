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
        {/* Top bar with round, variation, and timer */}
        <div className="overlay-header">
          <div className="header-badge mode-badge">
            <Zap size={18} className="icon-pulse" />
            <span>CHẾ ĐỘ {modeTitle}</span>
          </div>

          {activeVar && (
            <div className="header-badge variation-badge">
              <Target size={16} className="text-cyan animate-pulse" />
              <span>KIỂU ĐÁNH <strong>{variationIndex + 1}/3</strong>: {activeVar.shotName}</span>
            </div>
          )}

          <div className="header-badge round-badge">
            <span>LƯỢT {roundNumber} / {totalRounds}</span>
          </div>

          {/* Large countdown / stopwatch timer */}
          <div className={`header-badge timer-badge ${isUnlimited ? 'is-unlimited-badge' : ''}`}>
            {isUnlimited ? (
              <>
                <InfinityIcon size={20} className="icon-pulse" />
                <span className="timer-number">{remainingTime.toFixed(1)}s (Tự do)</span>
              </>
            ) : (
              <>
                <Timer size={20} />
                <span className="timer-number">{remainingTime.toFixed(2)}s</span>
              </>
            )}
          </div>
        </div>

        {/* Progress indicator bar */}
        <div className="timer-bar-track">
          <div 
            className={`timer-bar-fill ${isUnlimited ? 'unlimited-glow' : ''}`}
            style={{ width: `${progressPercent}%` }} 
          />
        </div>

        {/* Large Prominent Visual Demonstration Area */}
        <div className="overlay-visual-arena">
          <MovementIllustration
            position={position}
            variation={activeVar}
            variationIndex={variationIndex}
            mode={mode}
            className="overlay-illustration"
          />

          {/* Floating Large Position Badge */}
          <div className="position-floating-pill">
            <span className="pill-circle">{position.id}</span>
            <div className="pill-text">
              <strong>{position.zoneName}</strong>
              <small>{position.directionLabel}</small>
            </div>
          </div>
        </div>

        {/* Detailed instructions for athlete standing 2-4m away */}
        <div className="overlay-instruction-card">
          <div className="instruction-title-row">
            <div>
              <div className="instruction-tag-row">
                <span className="shot-type-pill">
                  <Sparkles size={13} />
                  {activeVar?.shotType || 'Kỹ thuật thi đấu'}
                </span>
                <span className="shot-num-pill">
                  Biến thể {variationIndex + 1}/3
                </span>
              </div>
              <h2 className="movement-title">{movementData.title}</h2>
              <p className="movement-subtitle">{movementData.subTitle}</p>
            </div>
          </div>

          {/* Detailed Breakdown: Hand + Foot technique steps */}
          <div className="technique-breakdown-grid">
            <div className="technique-mini-card hand-card">
              <div className="mini-card-header">
                <Activity size={14} className="text-cyan" />
                <span>KỸ THUẬT VỢT / TAY</span>
              </div>
              <div className="mini-card-body">
                {activeVar?.handMovement.subTitle || position.handMovement.subTitle}
              </div>
            </div>

            <div className="technique-mini-card foot-card">
              <div className="mini-card-header">
                <Zap size={14} className="text-lime" />
                <span>BỘ PHÁP DI CHUYỂN</span>
              </div>
              <div className="mini-card-body">
                {activeVar?.footMovement.subTitle || position.footMovement.subTitle}
              </div>
            </div>
          </div>

          {movementData.description && (
            <p className="movement-full-desc">{movementData.description}</p>
          )}

          <div className="coaching-callout">
            <Lightbulb size={18} className="callout-icon" />
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
            <CheckCircle size={22} className="trigger-icon-check" />
            <span className="trigger-hint-text">
              TẬP XONG: <strong>BẤM PHÍM CÁCH</strong> HOẶC <strong>CHẠM VÀO MÀN HÌNH</strong> ĐỂ SANG BÀI KHÁC
            </span>
            <div className="trigger-pill-btn">
              <span>TIẾP THEO</span>
              <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
