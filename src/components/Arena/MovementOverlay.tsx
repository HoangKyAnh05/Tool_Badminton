import React from 'react';
import { GridPosition } from '../../types';
import { MovementIllustration } from './MovementIllustration';
import { Timer, Zap, Lightbulb } from 'lucide-react';

interface MovementOverlayProps {
  position: GridPosition;
  mode: 'TAY' | 'CHÂN' | 'TAY + CHÂN';
  remainingTime: number;
  totalDuration: number;
  roundNumber: number;
  totalRounds: number;
}

export const MovementOverlay: React.FC<MovementOverlayProps> = ({
  position,
  mode,
  remainingTime,
  totalDuration,
  roundNumber,
  totalRounds
}) => {
  const movementData = mode === 'TAY'
    ? position.handMovement
    : mode === 'CHÂN'
      ? position.footMovement
      : position.combinedMovement;

  const modeTitle = mode === 'TAY' ? 'TAY' : mode === 'CHÂN' ? 'CHÂN' : 'TAY + CHÂN';
  const progressPercent = Math.max(0, Math.min(100, (remainingTime / totalDuration) * 100));

  return (
    <div className="movement-overlay-backdrop">
      <div className="movement-overlay-modal animate-pop">
        {/* Top bar with round and timer */}
        <div className="overlay-header">
          <div className="header-badge mode-badge">
            <Zap size={18} className="icon-pulse" />
            <span>CHẾ ĐỘ {modeTitle}</span>
          </div>

          <div className="header-badge round-badge">
            <span>LƯỢT {roundNumber} / {totalRounds}</span>
          </div>

          {/* Large countdown timer */}
          <div className="header-badge timer-badge">
            <Timer size={20} />
            <span className="timer-number">{remainingTime.toFixed(2)}s</span>
          </div>
        </div>

        {/* Progress indicator bar */}
        <div className="timer-bar-track">
          <div 
            className="timer-bar-fill" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>

        {/* Large Prominent Visual Demonstration Area */}
        <div className="overlay-visual-arena">
          <MovementIllustration
            position={position}
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

        {/* Large readable instructions for athlete standing 2-4m away */}
        <div className="overlay-instruction-card">
          <h2 className="movement-title">{movementData.title}</h2>
          <p className="movement-subtitle">{movementData.subTitle}</p>

          <div className="coaching-callout">
            <Lightbulb size={18} className="callout-icon" />
            <p><strong>Mẹo HLV:</strong> {movementData.coachingTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
