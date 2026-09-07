import React, { useState } from 'react';
import { GridPosition, MovementVariation } from '../../types';
import { User, Compass, Upload, Image as ImageIcon } from 'lucide-react';

interface MovementIllustrationProps {
  position: GridPosition;
  variation?: MovementVariation;
  variationIndex?: number;
  mode: 'TAY' | 'CHÂN' | 'TAY + CHÂN';
  className?: string;
}

export const MovementIllustration: React.FC<MovementIllustrationProps> = ({
  position,
  variation,
  variationIndex,
  mode,
  className = ''
}) => {
  // Tab view: 'ATHLETE' (Hình ảnh bài tập) vs 'COURT' (Sơ đồ di chuyển sân)
  const [activeTab, setActiveTab] = useState<'ATHLETE' | 'COURT'>('ATHLETE');
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);

  // Check if position has predefined custom image URL
  const defaultImg = mode === 'TAY' 
    ? position.handMovement.imageUrl 
    : mode === 'CHÂN' 
      ? position.footMovement.imageUrl 
      : position.combinedMovement.imageUrl;

  const currentImg = customPhoto || defaultImg;

  const isHand = mode === 'TAY';
  const isFoot = mode === 'CHÂN';
  const isCombined = mode === 'TAY + CHÂN';

  // Accent colors
  const primaryColor = isHand ? '#00f0ff' : isFoot ? '#39ff14' : '#ffb703';
  const badgeText = isHand ? '✋ PHẢN XẠ TAY' : isFoot ? '🦶 FOOTWORK CHÂN' : '⚡ PHỐI HỢP TAY & CHÂN';

  // Handle local image upload for user custom coaching photos
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setCustomPhoto(evt.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Render Athlete Exercise Illustration based on zone and mode
  const renderAthleteExerciseVisual = () => {
    if (currentImg) {
      return (
        <div className="custom-photo-wrap">
          <img 
            src={currentImg} 
            alt={position.name} 
            className="illustration-img"
            onError={() => setCustomPhoto(null)}
          />
        </div>
      );
    }

    const posId = position.id;

    // Archetype selection:
    // Net: 1, 2, 3
    // Mid: 4, 5, 6
    // Rear: 7, 8, 9
    return (
      <svg
        viewBox="0 0 640 400"
        className="illustration-svg athlete-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bgAthleteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0b1728" />
            <stop offset="60%" stopColor="#071220" />
            <stop offset="100%" stopColor="#040914" />
          </linearGradient>

          <linearGradient id="courtFloorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#093028" />
            <stop offset="100%" stopColor="#051c17" />
          </linearGradient>

          <linearGradient id="athleteJersey" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <linearGradient id="glowRacket" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Stadium Athletic Court Background */}
        <rect x="20" y="15" width="600" height="370" rx="20" fill="url(#bgAthleteGrad)" stroke="#1e3a5f" strokeWidth="2.5" />

        {/* Realistic Green Badminton Court Floor */}
        <polygon points="20,270 620,270 620,385 20,385" fill="url(#courtFloorGrad)" />
        <line x1="20" y1="270" x2="620" y2="270" stroke="#39ff14" strokeWidth="3" strokeOpacity="0.8" filter="url(#glowEffect)" />
        <line x1="120" y1="385" x2="200" y2="270" stroke="#ffffff" strokeWidth="2.5" strokeOpacity="0.6" />
        <line x1="320" y1="385" x2="320" y2="270" stroke="#ffffff" strokeWidth="2.5" strokeOpacity="0.6" />
        <line x1="520" y1="385" x2="440" y2="270" stroke="#ffffff" strokeWidth="2.5" strokeOpacity="0.6" />

        {/* Non-overlapping Sleek Top Corner Badge */}
        <g transform="translate(36, 28)">
          <rect width="190" height="32" rx="16" fill="rgba(10, 20, 35, 0.9)" stroke="#00f0ff" strokeWidth="1.5" />
          <circle cx="18" cy="16" r="10" fill="#00f0ff" />
          <text x="18" y="20" fill="#020812" fontSize="12" fontWeight="900" textAnchor="middle">{posId}</text>
          <text x="36" y="20" fill="#ffffff" fontSize="12" fontWeight="800">{position.zoneName}</text>
        </g>

        {/* Render Specific Athlete Posture Archetype */}
        {renderPostureByPosition(posId, primaryColor)}

        {/* Key Technical Cues Floating Overlay - High Contrast */}
        <g transform="translate(36, 310)">
          <rect width="255" height="56" rx="10" fill="rgba(6, 15, 28, 0.95)" stroke="#00f0ff" strokeWidth="1.5" />
          <text x="12" y="23" fill="#00f0ff" fontSize="12" fontWeight="900">
            🎯 ĐIỂM TIẾP XÚC CẦU:
          </text>
          <text x="12" y="43" fill="#ffffff" fontSize="12" fontWeight="700">
            {posId <= 3 ? 'Đón cầu đỉnh lưới trước mặt' : posId <= 6 ? 'Ngang sườn hông, đè cầu phẳng' : 'Vị trí cao nhất trên không'}
          </text>
        </g>

        <g transform="translate(349, 310)">
          <rect width="255" height="56" rx="10" fill="rgba(6, 15, 28, 0.95)" stroke="#39ff14" strokeWidth="1.5" />
          <text x="12" y="23" fill="#39ff14" fontSize="12" fontWeight="900">
            🦶 BỘ PHÁP FOOTWORK:
          </text>
          <text x="12" y="43" fill="#ffffff" fontSize="12" fontWeight="700">
            {posId <= 3 ? 'Lunge chân thuận, gối vững 90°' : posId === 5 ? 'Nhún bật Split-step đàn hồi' : posId <= 6 ? 'Bước ngang chassé xoay hông' : 'Bật nhảy cắt kéo (Scissor-kick)'}
          </text>
        </g>
      </svg>
    );
  };

  // Detailed Badminton Athlete Vector Graphics for 9 positions
  const renderPostureByPosition = (posId: number, color: string) => {
    switch (posId) {
      // 1. Góc Lưới Trái (Backhand Net Slice / Lunge Left)
      case 1:
        return (
          <g transform="translate(180, 50)">
            {/* Net boundary */}
            <line x1="220" y1="20" x2="220" y2="280" stroke="#00f0ff" strokeWidth="2.5" strokeDasharray="5 5" opacity="0.6" />
            <text x="225" y="40" fill="#64748b" fontSize="11">LƯỚI</text>

            {/* Shuttlecock at net */}
            <g transform="translate(200, 70) rotate(35)">
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#ffffff" />
              <polygon points="-6,2 -11,16 11,16 6,2" fill="#e2e8f0" stroke="#94a3b8" />
            </g>

            {/* Swing Arc Path */}
            <path d="M 120 120 Q 170 80 200 70" fill="none" stroke={color} strokeWidth="3" strokeDasharray="4 4" filter="url(#glowEffect)" />

            {/* Athlete Torso & Head */}
            <circle cx="100" cy="80" r="18" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="2" /> {/* Head */}
            <ellipse cx="95" cy="140" rx="20" ry="36" fill="url(#athleteJersey)" /> {/* Torso leaning forward */}

            {/* Backhand Racket Arm extending forward to net */}
            <path d="M 85 125 L 120 110 L 165 85" fill="none" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" />
            {/* Racket Handle, Shaft, Frame */}
            <line x1="165" y1="85" x2="195" y2="70" stroke="#94a3b8" strokeWidth="3.5" />
            <ellipse cx="205" cy="65" rx="14" ry="20" fill="none" stroke="url(#glowRacket)" strokeWidth="3" transform="rotate(-30 205 65)" />

            {/* Non-racket arm for balance */}
            <path d="M 105 130 L 70 145 L 45 130" fill="none" stroke="#fbcfe8" strokeWidth="6" strokeLinecap="round" />

            {/* Deep Forecourt Lunge Legs */}
            {/* Front right leg bent deep at 90 deg */}
            <path d="M 105 170 L 140 210 L 140 260" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="130" y="255" width="28" height="12" rx="4" fill="#ffffff" /> {/* Right Shoe */}

            {/* Rear left leg stretched back for support */}
            <path d="M 85 170 L 40 210 L 0 255" fill="none" stroke="#0369a1" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="-8" y="250" width="24" height="10" rx="3" fill="#ffffff" /> {/* Left Shoe */}
          </g>
        );

      // 2. Lưới Giữa (Net Kill / Tap & Forward Leap)
      case 2:
        return (
          <g transform="translate(180, 50)">
            {/* Net boundary */}
            <line x1="220" y1="20" x2="220" y2="280" stroke="#00f0ff" strokeWidth="2.5" strokeDasharray="5 5" opacity="0.6" />
            <text x="225" y="40" fill="#64748b" fontSize="11">LƯỚI CHỮ T</text>

            {/* Shuttlecock popped up high above net */}
            <g transform="translate(205, 55) rotate(-15)">
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#ffffff" />
              <polygon points="-6,2 -11,16 11,16 6,2" fill="#e2e8f0" stroke="#94a3b8" />
            </g>

            {/* Sharp downward snap tap arrow */}
            <path d="M 195 40 L 220 85" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" filter="url(#glowEffect)" />

            {/* Athlete jumping aggressively forward with racket high */}
            <circle cx="110" cy="65" r="18" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="2" />
            <ellipse cx="105" cy="125" rx="20" ry="34" fill="url(#athleteJersey)" />

            {/* Right arm reaching high above head */}
            <path d="M 115 110 L 150 75 L 180 45" fill="none" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" />
            {/* Racket poised to snap down */}
            <line x1="180" y1="45" x2="200" y2="35" stroke="#94a3b8" strokeWidth="3.5" />
            <ellipse cx="210" cy="30" rx="14" ry="20" fill="none" stroke="url(#glowRacket)" strokeWidth="3" transform="rotate(45 210 30)" />

            {/* Left arm counter-balancing */}
            <path d="M 95 120 L 60 110 L 40 125" fill="none" stroke="#fbcfe8" strokeWidth="6" strokeLinecap="round" />

            {/* Dynamic leaping forward legs */}
            <path d="M 115 155 L 145 195 L 150 255" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="140" y="250" width="28" height="12" rx="4" fill="#ffffff" />
            <path d="M 95 155 L 75 195 L 50 240" fill="none" stroke="#0369a1" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="42" y="235" width="24" height="10" rx="3" fill="#ffffff" />
          </g>
        );

      // 3. Lưới Phải (Forehand Net Drop / Cross Net)
      case 3:
        return (
          <g transform="translate(180, 50)">
            <line x1="220" y1="20" x2="220" y2="280" stroke="#00f0ff" strokeWidth="2.5" strokeDasharray="5 5" opacity="0.6" />
            <text x="225" y="40" fill="#64748b" fontSize="11">GÓC LƯỚI PHẢI</text>

            <g transform="translate(200, 75) rotate(-40)">
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#ffffff" />
              <polygon points="-6,2 -11,16 11,16 6,2" fill="#e2e8f0" stroke="#94a3b8" />
            </g>

            {/* Gentle slice curve */}
            <path d="M 130 110 Q 170 95 200 75" fill="none" stroke={color} strokeWidth="3" filter="url(#glowEffect)" />

            {/* Athlete lunging right with open chest forehand */}
            <circle cx="90" cy="75" r="18" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="2" />
            <ellipse cx="95" cy="135" rx="20" ry="34" fill="url(#athleteJersey)" />

            {/* Forehand racket arm sweeping gently */}
            <path d="M 105 120 L 145 105 L 180 85" fill="none" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" />
            <line x1="180" y1="85" x2="205" y2="78" stroke="#94a3b8" strokeWidth="3.5" />
            <ellipse cx="215" cy="75" rx="14" ry="20" fill="none" stroke="url(#glowRacket)" strokeWidth="3" transform="rotate(20 215 75)" />

            <path d="M 80 125 L 50 140 L 30 120" fill="none" stroke="#fbcfe8" strokeWidth="6" strokeLinecap="round" />

            <path d="M 105 165 L 145 205 L 155 260" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="145" y="255" width="28" height="12" rx="4" fill="#ffffff" />
            <path d="M 85 165 L 45 205 L 10 250" fill="none" stroke="#0369a1" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="2" y="245" width="24" height="10" rx="3" fill="#ffffff" />
          </g>
        );

      // 4. Ngang Trái (Backhand Midcourt Drive & Defense)
      case 4:
        return (
          <g transform="translate(180, 50)">
            {/* Defensive drive horizontal flight path */}
            <line x1="0" y1="130" x2="260" y2="130" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 6" filter="url(#glowEffect)" />
            <g transform="translate(75, 130) rotate(85)">
              <ellipse cx="0" cy="0" rx="7" ry="11" fill="#ffffff" />
              <polygon points="-7,2 -13,18 13,18 7,2" fill="#e2e8f0" stroke="#94a3b8" />
            </g>

            {/* Low athletic squat stance - high contrast */}
            <circle cx="140" cy="85" r="20" fill="#fde047" stroke="#ca8a04" strokeWidth="2.5" />
            <path d="M 120 83 Q 140 75 160 83" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="140" cy="140" rx="25" ry="35" fill="url(#athleteJersey)" stroke="#38bdf8" strokeWidth="2.5" />

            {/* Arms crossed in front for backhand punch drive */}
            <path d="M 130 130 L 105 135 L 85 130" fill="none" stroke="#fed7aa" strokeWidth="10" strokeLinecap="round" />
            <line x1="85" y1="130" x2="65" y2="130" stroke="#cbd5e1" strokeWidth="4.5" />
            <ellipse cx="48" cy="130" rx="16" ry="22" fill="none" stroke="url(#glowRacket)" strokeWidth="3.5" transform="rotate(-15 48 130)" />
            {/* Racket Strings Net */}
            <line x1="48" y1="110" x2="48" y2="150" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
            <line x1="34" y1="130" x2="62" y2="130" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />

            {/* Wide stable defensive feet */}
            <path d="M 150 170 L 185 205 L 190 260" fill="none" stroke="#0284c7" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="180" y="255" width="32" height="14" rx="5" fill="#ffffff" stroke="#39ff14" strokeWidth="2" />
            <path d="M 130 170 L 95 205 L 90 260" fill="none" stroke="#0369a1" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="78" y="255" width="32" height="14" rx="5" fill="#ffffff" stroke="#39ff14" strokeWidth="2" />
          </g>
        );

      // 5. Tâm Sân (Base Split-Step Ready Position)
      case 5:
        return (
          <g transform="translate(180, 45)">
            {/* Split-step spring energy rings */}
            <ellipse cx="140" cy="265" rx="80" ry="14" fill="none" stroke="#39ff14" strokeWidth="2.5" strokeDasharray="5 5" filter="url(#glowEffect)" />

            {/* Balanced centered athlete */}
            <circle cx="140" cy="70" r="19" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="2" />
            <ellipse cx="140" cy="130" rx="22" ry="34" fill="url(#athleteJersey)" />

            {/* Both hands holding racket ready in front of chest */}
            <path d="M 125 120 L 135 110 L 140 95" fill="none" stroke="#fbcfe8" strokeWidth="7" strokeLinecap="round" />
            <path d="M 155 120 L 145 110 L 140 95" fill="none" stroke="#fbcfe8" strokeWidth="7" strokeLinecap="round" />
            <line x1="140" y1="95" x2="140" y2="65" stroke="#94a3b8" strokeWidth="3.5" />
            <ellipse cx="140" cy="50" rx="15" ry="20" fill="none" stroke="url(#glowRacket)" strokeWidth="3" />

            {/* Symmetrical split legs ready to burst in any direction */}
            <path d="M 150 160 L 185 200 L 195 255" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="185" y="250" width="28" height="12" rx="4" fill="#ffffff" />
            <path d="M 130 160 L 95 200 L 85 255" fill="none" stroke="#0369a1" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="75" y="250" width="28" height="12" rx="4" fill="#ffffff" />
          </g>
        );

      // 6. Ngang Phải (Forehand Flat Drive)
      case 6:
        return (
          <g transform="translate(180, 50)">
            {/* Flat drive rocket trajectory */}
            <line x1="140" y1="125" x2="260" y2="125" stroke="#00f0ff" strokeWidth="3" strokeDasharray="5 5" />
            <g transform="translate(230, 125) rotate(-85)">
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#ffffff" />
              <polygon points="-6,2 -11,16 11,16 6,2" fill="#e2e8f0" stroke="#94a3b8" />
            </g>

            {/* Rotated chest facing right */}
            <circle cx="110" cy="80" r="18" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="2" />
            <ellipse cx="115" cy="135" rx="22" ry="32" fill="url(#athleteJersey)" />

            {/* Power right arm whip forehand drive */}
            <path d="M 125 125 L 165 125 L 205 125" fill="none" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" />
            <line x1="205" y1="125" x2="225" y2="125" stroke="#94a3b8" strokeWidth="3.5" />
            <ellipse cx="240" cy="125" rx="14" ry="20" fill="none" stroke="url(#glowRacket)" strokeWidth="3" transform="rotate(25 240 125)" />

            {/* Left arm stabilizing rotation */}
            <path d="M 105 125 L 80 135 L 65 120" fill="none" stroke="#fbcfe8" strokeWidth="6" strokeLinecap="round" />

            {/* Right foot stepped wide right */}
            <path d="M 125 165 L 165 205 L 175 260" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="165" y="255" width="28" height="12" rx="4" fill="#ffffff" />
            <path d="M 105 165 L 80 205 L 75 260" fill="none" stroke="#0369a1" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="65" y="255" width="24" height="10" rx="3" fill="#ffffff" />
          </g>
        );

      // 7. Đáy Trái (Round-The-Head Clear / Smash)
      case 7:
        return (
          <g transform="translate(180, 45)">
            {/* High arched trajectory to rear left */}
            <g transform="translate(60, 40) rotate(45)">
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#ffffff" />
              <polygon points="-6,2 -11,16 11,16 6,2" fill="#e2e8f0" stroke="#94a3b8" />
            </g>

            {/* Circular overhead stroke arc */}
            <path d="M 140 100 Q 110 30 70 40" fill="none" stroke={color} strokeWidth="3.5" filter="url(#glowEffect)" />

            {/* Arched spine reaching over head */}
            <circle cx="120" cy="80" r="18" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="2" />
            <ellipse cx="125" cy="140" rx="20" ry="34" fill="url(#athleteJersey)" transform="rotate(12 125 140)" />

            {/* Right arm curling over head to left shoulder */}
            <path d="M 135 115 Q 120 50 80 45" fill="none" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" />
            <line x1="80" y1="45" x2="65" y2="40" stroke="#94a3b8" strokeWidth="3.5" />
            <ellipse cx="55" cy="35" rx="14" ry="20" fill="none" stroke="url(#glowRacket)" strokeWidth="3" transform="rotate(-40 55 35)" />

            {/* Backward deep chassé legs */}
            <path d="M 130 170 L 155 210 L 160 260" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="150" y="255" width="28" height="12" rx="4" fill="#ffffff" />
            <path d="M 110 170 L 85 210 L 60 255" fill="none" stroke="#0369a1" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="50" y="250" width="24" height="10" rx="3" fill="#ffffff" />
          </g>
        );

      // 8. Đáy Giữa (High Defensive Clear / Lift)
      case 8:
        return (
          <g transform="translate(180, 45)">
            <g transform="translate(140, 25) rotate(15)">
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#ffffff" />
              <polygon points="-6,2 -11,16 11,16 6,2" fill="#e2e8f0" stroke="#94a3b8" />
            </g>

            {/* High upward lift trajectory */}
            <path d="M 140 70 L 140 25" fill="none" stroke="#39ff14" strokeWidth="3" filter="url(#glowEffect)" />

            {/* Straight tall extension */}
            <circle cx="140" cy="75" r="18" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="2" />
            <ellipse cx="140" cy="135" rx="20" ry="34" fill="url(#athleteJersey)" />

            {/* Full vertical reach overhead */}
            <path d="M 145 115 L 145 75 L 140 45" fill="none" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" />
            <line x1="140" y1="45" x2="140" y2="25" stroke="#94a3b8" strokeWidth="3.5" />
            <ellipse cx="140" cy="15" rx="14" ry="20" fill="none" stroke="url(#glowRacket)" strokeWidth="3" />

            <path d="M 145 165 L 160 205 L 165 260" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="155" y="255" width="28" height="12" rx="4" fill="#ffffff" />
            <path d="M 130 165 L 115 205 L 110 260" fill="none" stroke="#0369a1" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="100" y="255" width="24" height="10" rx="3" fill="#ffffff" />
          </g>
        );

      // 9. Đáy Phải (Forehand Jump Smash & Scissor Kick)
      case 9:
      default:
        return (
          <g transform="translate(180, 40)">
            {/* Smash steep downward impact line */}
            <line x1="190" y1="45" x2="260" y2="180" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" filter="url(#glowEffect)" />
            <g transform="translate(195, 45) rotate(-65)">
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#ffffff" />
              <polygon points="-6,2 -11,16 11,16 6,2" fill="#e2e8f0" stroke="#94a3b8" />
            </g>

            {/* Airborne athlete during Scissor Kick */}
            <circle cx="110" cy="70" r="18" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="2" />
            <ellipse cx="115" cy="125" rx="20" ry="34" fill="url(#athleteJersey)" transform="rotate(-15 115 125)" />

            {/* High power smash arm whipping forward */}
            <path d="M 125 105 L 155 70 L 185 45" fill="none" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" />
            <line x1="185" y1="45" x2="205" y2="35" stroke="#94a3b8" strokeWidth="3.5" />
            <ellipse cx="215" cy="28" rx="14" ry="20" fill="none" stroke="url(#glowRacket)" strokeWidth="3" transform="rotate(35 215 28)" />

            {/* Left arm pulling down for torque */}
            <path d="M 105 115 L 75 125 L 60 145" fill="none" stroke="#fbcfe8" strokeWidth="6" strokeLinecap="round" />

            {/* Flying Scissor-Kick legs in mid-air (feet off ground!) */}
            <path d="M 125 155 L 155 190 L 175 230" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="170" y="225" width="26" height="12" rx="4" fill="#ffffff" transform="rotate(20 170 225)" />
            <path d="M 105 155 L 75 190 L 45 220" fill="none" stroke="#0369a1" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="40" y="215" width="24" height="10" rx="3" fill="#ffffff" transform="rotate(-25 40 215)" />
          </g>
        );
    }
  };

  // Render Half Badminton Court Diagram View
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

  return (
    <div className={`illustration-container ${className}`}>
      {/* Visual Mode Navigation Switcher */}
      <div className="illustration-view-tabs">
        <button
          className={`view-tab-btn ${activeTab === 'ATHLETE' ? 'is-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab('ATHLETE');
          }}
        >
          <User size={14} />
          <span className="tab-full-label">HÌNH ẢNH ĐỘNG TÁC</span>
          <span className="tab-mobile-label">Động tác</span>
        </button>

        <button
          className={`view-tab-btn ${activeTab === 'COURT' ? 'is-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab('COURT');
          }}
        >
          <Compass size={14} />
          <span className="tab-full-label">SƠ ĐỒ DI CHUYỂN</span>
          <span className="tab-mobile-label">Sơ đồ sân</span>
        </button>

        {/* Upload Custom Image Button */}
        <label className="view-tab-btn upload-tab-btn" title="Tải ảnh bài tập riêng">
          <Upload size={13} />
          <span className="tab-full-label">Tải ảnh riêng</span>
          <span className="tab-mobile-label">Tải ảnh</span>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* Main Visual Display */}
      <div className="illustration-display-stage">
        {activeTab === 'ATHLETE' ? renderAthleteExerciseVisual() : renderCourtDiagram()}
      </div>
    </div>
  );
};
