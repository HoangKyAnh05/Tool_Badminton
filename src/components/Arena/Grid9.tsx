import React from 'react';
import { BADMINTON_POSITIONS } from '../../data/movements';
import { GridPosition } from '../../types';

interface Grid9Props {
  activePositionId?: number;
  highlightMode?: 'TAY' | 'CHÂN' | 'TAY + CHÂN';
  onPositionClick?: (pos: GridPosition) => void;
  interactive?: boolean;
}

export const Grid9: React.FC<Grid9Props> = ({
  activePositionId,
  highlightMode = 'TAY',
  onPositionClick,
  interactive = false
}) => {
  return (
    <div className="grid-9-container">
      <div className="grid-9-board">
        {BADMINTON_POSITIONS.map((pos) => {
          const isActive = activePositionId === pos.id;
          
          return (
            <div
              key={pos.id}
              className={`grid-cell ${isActive ? 'is-active' : ''} ${interactive ? 'is-clickable' : ''}`}
              onClick={() => interactive && onPositionClick?.(pos)}
              data-position={pos.id}
            >
              {/* Circular Target */}
              <div className="circle-target">
                <div className="circle-inner">
                  <span className="pos-number">{pos.id}</span>
                </div>
                {isActive && <div className="pulse-ring" />}
                {isActive && <div className="pulse-ring delay" />}
              </div>

              {/* Sub label */}
              <div className="cell-label">
                <span className="zone-name">{pos.zoneName}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
