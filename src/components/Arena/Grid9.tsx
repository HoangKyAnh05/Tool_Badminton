import React from 'react';
import { BADMINTON_POSITIONS } from '../../data/movements';
import { GridPosition } from '../../types';
import { CheckCircle2, Zap } from 'lucide-react';

interface Grid9Props {
  activePositionId?: number;
  highlightMode?: 'TAY' | 'CHÂN' | 'TAY + CHÂN';
  onPositionClick?: (pos: GridPosition) => void;
  interactive?: boolean;
  countdownNum?: number | string;
  isCountingDown?: boolean;
  isArrived?: boolean;
}

export const Grid9: React.FC<Grid9Props> = ({
  activePositionId,
  highlightMode = 'TAY',
  onPositionClick,
  interactive = true,
  countdownNum,
  isCountingDown = false,
  isArrived = false
}) => {
  return (
    <div className="grid-9-container">
      <div className="grid-9-board">
        {BADMINTON_POSITIONS.map((pos) => {
          const isActive = activePositionId === pos.id;
          
          return (
            <div
              key={pos.id}
              className={`grid-cell ${isActive ? 'is-active' : ''} ${
                isActive && isCountingDown ? 'is-countdown-active' : ''
              } ${isActive && isArrived ? 'is-arrived-active' : ''} ${interactive ? 'is-clickable' : ''}`}
              onClick={() => {
                if (interactive && isActive) {
                  onPositionClick?.(pos);
                } else if (interactive) {
                  onPositionClick?.(pos);
                }
              }}
              data-position={pos.id}
              title={isActive ? `Vị trí mục tiêu: Ô ${pos.id} (${pos.zoneName})` : `Ô ${pos.id} - ${pos.zoneName}`}
            >
              {/* Circular Target Dot on Badminton Court Floor */}
              <div className={`circle-target ${isActive && isCountingDown ? 'target-counting-down' : ''} ${isActive && isArrived ? 'target-arrived' : ''}`}>
                <div className="circle-inner">
                  {isActive && isCountingDown ? (
                    isArrived ? (
                      <div className="circle-arrived-content animate-pop">
                        <CheckCircle2 size={32} className="arrived-check-icon" />
                        <span className="arrived-check-label">ĐÃ TỚI!</span>
                      </div>
                    ) : (
                      <div className="circle-countdown-content">
                        <span className="dot-countdown-digit animate-pulse-glow">
                          {countdownNum}
                        </span>
                        <span className="dot-countdown-sub">GIÂY</span>
                      </div>
                    )
                  ) : (
                    <span className="pos-number">{pos.id}</span>
                  )}
                </div>

                {/* Multiple Glowing Radar Pulsing Waves */}
                {isActive && <div className="pulse-ring" />}
                {isActive && <div className="pulse-ring delay" />}
                {isActive && isCountingDown && <div className="pulse-ring outer-glow" />}
              </div>

              {/* Sub label */}
              <div className="cell-label">
                <span className={`zone-name ${isActive ? 'zone-name-active' : ''}`}>
                  {pos.zoneName}
                </span>

                {isActive && isCountingDown && (
                  <div className="cell-active-indicator-tag animate-bounce-subtle">
                    {isArrived ? (
                      <span className="tag-arrived">✅ ĐÃ ĐẾN VỊ TRÍ</span>
                    ) : (
                      <span className="tag-move-here">🏃 CHẠY ĐẾN ĐÂY</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
