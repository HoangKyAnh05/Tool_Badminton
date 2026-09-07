import React from 'react';
import { GridPosition } from '../../types';

interface MovementIllustrationProps {
  position: GridPosition;
  mode: 'TAY' | 'CHÂN' | 'TAY + CHÂN';
  className?: string;
}

export const MovementIllustration: React.FC<MovementIllustrationProps> = ({
  position,
  mode,
  className = ''
}) => {
  // Check if position has custom image URL
  const customImg = mode === 'TAY' 
    ? position.handMovement.imageUrl 
    : mode === 'CHÂN' 
      ? position.footMovement.imageUrl 
      : position.combinedMovement.imageUrl;

  if (customImg) {
    return (
      <div className={`illustration-container ${className}`}>
        <img 
          src={customImg} 
          alt={position.name} 
          className="illustration-img"
          onError={(e) => {
            // Fallback gracefully if image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  // Generate athletic, high-contrast visual SVG diagram for badminton
  // Coordinates on 3x3 court: col: 1 (left), 2 (center), 3 (right); row: 1 (net), 2 (mid), 3 (rear)
  const targetX = position.col === 1 ? 160 : position.col === 2 ? 300 : 440;
  const targetY = position.row === 1 ? 110 : position.row === 2 ? 220 : 330;

  // Base player position (center position 5)
  const baseX = 300;
  const baseY = 220;

  const isHand = mode === 'TAY';
  const isFoot = mode === 'CHÂN';
  const isCombined = mode === 'TAY + CHÂN';

  // Accent colors
  const primaryColor = isHand ? '#00f0ff' : isFoot ? '#39ff14' : '#ffb703';
  const badgeText = isHand ? '✋ PHẢN XẠ TAY' : isFoot ? '🦶 FOOTWORK CHÂN' : '⚡ PHỐI HỢP TAY & CHÂN';

  return (
    <div className={`illustration-container ${className}`}>
      <svg
        viewBox="0 0 600 400"
        className="illustration-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="courtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d1b2a" />
            <stop offset="100%" stopColor="#050c14" />
          </linearGradient>

          <linearGradient id="targetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Arrow marker */}
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

        {/* Badminton Court Background */}
        <rect x="50" y="30" width="500" height="340" rx="16" fill="url(#courtGrad)" stroke="#1e3a5f" strokeWidth="3" />

        {/* Net & Court Lines */}
        <line x1="50" y1="50" x2="550" y2="50" stroke="#334e68" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="50" y1="350" x2="550" y2="350" stroke="#334e68" strokeWidth="2" />
        <line x1="90" y1="30" x2="90" y2="370" stroke="#243b53" strokeWidth="2" />
        <line x1="510" y1="30" x2="510" y2="370" stroke="#243b53" strokeWidth="2" />

        {/* Center Line */}
        <line x1="300" y1="130" x2="300" y2="370" stroke="#243b53" strokeWidth="2" />

        {/* Net Area (Front) */}
        <rect x="50" y="30" width="500" height="40" fill="#000" fillOpacity="0.4" />
        <line x1="50" y1="70" x2="550" y2="70" stroke="#00f0ff" strokeWidth="3" opacity="0.7" />
        <text x="300" y="48" fill="#627d98" fontSize="13" fontWeight="bold" textAnchor="middle" letterSpacing="3">
          NET / LƯỚI THI ĐẤU
        </text>

        {/* Short Service Line */}
        <line x1="50" y1="130" x2="550" y2="130" stroke="#334e68" strokeWidth="2" />

        {/* Movement Vector Path from Base (Center) to Target */}
        {position.id !== 5 && (
          <path
            d={`M ${baseX} ${baseY} Q ${(baseX + targetX) / 2 + (targetX > baseX ? 20 : -20)} ${(baseY + targetY) / 2 - 15} ${targetX} ${targetY}`}
            fill="none"
            stroke={primaryColor}
            strokeWidth="4"
            strokeDasharray={isFoot ? "8 6" : "none"}
            markerEnd="url(#arrow)"
            filter="url(#glow)"
          />
        )}

        {/* Center Base Marker (Start Position 5) */}
        <circle cx={baseX} cy={baseY} r="16" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
        <circle cx={baseX} cy={baseY} r="6" fill="#94a3b8" />
        <text x={baseX} y={baseY + 32} fill="#94a3b8" fontSize="12" fontWeight="600" textAnchor="middle">
          TÂM SÂN (Ô 5)
        </text>

        {/* Target Zone Glowing Highlight */}
        <circle
          cx={targetX}
          cy={targetY}
          r="48"
          fill={primaryColor}
          fillOpacity="0.18"
          filter="url(#glow)"
        />
        <circle
          cx={targetX}
          cy={targetY}
          r="34"
          fill="url(#targetGrad)"
          stroke="#ffffff"
          strokeWidth="3.5"
        />

        {/* Target Zone Number & Zone Title */}
        <text x={targetX} y={targetY + 8} fill="#050c14" fontSize="24" fontWeight="900" textAnchor="middle">
          {position.id}
        </text>

        {/* Shuttlecock Visual at Target */}
        <g transform={`translate(${targetX + 28}, ${targetY - 32}) rotate(-25)`}>
          <ellipse cx="0" cy="0" rx="8" ry="12" fill="#fff" />
          <path d="M -8 4 L -14 22 L 14 22 L 8 4 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="-10" y1="12" x2="10" y2="12" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="-12" y1="18" x2="12" y2="18" stroke="#cbd5e1" strokeWidth="1.5" />
        </g>

        {/* Stance / Movement Badge overlay */}
        <rect x="70" y="325" width="220" height="34" rx="8" fill="#0f172a" fillOpacity="0.9" stroke="#334155" />
        <text x="82" y="347" fill={primaryColor} fontSize="13" fontWeight="bold">
          {badgeText}
        </text>

        {/* Direction tag */}
        <rect x="310" y="325" width="220" height="34" rx="8" fill="#0f172a" fillOpacity="0.9" stroke="#334155" />
        <text x="322" y="347" fill="#f8fafc" fontSize="13" fontWeight="bold">
          {position.zoneName}
        </text>
      </svg>
    </div>
  );
};
