import React, { useState, useRef, useEffect } from 'react';
import { GridPosition, MovementVariation } from '../../types';
import { TACTICS_VIDEOS } from '../../data/videos';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Compass, 
  Video as VideoIcon, 
  Link as LinkIcon, 
  Upload, 
  Zap,
  Gauge,
  User,
  X,
  CheckCircle2,
  Film
} from 'lucide-react';

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
  variationIndex = 0,
  mode,
  className = ''
}) => {
  // Helper to automatically pick the matching video for each court position
  const getDefaultVideoIndexForPosition = (id: number): number => {
    switch (id) {
      case 1: return 2; // Ô 1: Lưới Trái -> Bài 03 Đơn Nam: Bỏ nhỏ sát lưới & kéo lưới
      case 2: return 7; // Ô 2: Lưới Giữa -> Bài 02 Đôi Nam: Đè lưới & phản tạt ép góc
      case 3: return 8; // Ô 3: Lưới Phải -> Bài 03 Đôi Nam: Tấn công đập cầu & bồi cầu
      case 4: return 5; // Ô 4: Trung Tâm Trái -> Bài 06 Đơn Nam: Thủ cầu bung sâu đảo ngược thế trận
      case 5: return 0; // Ô 5: Tâm Sân -> Bài 01 Đơn Nam: Đọc hướng & di chuyển 4 góc
      case 6: return 6; // Ô 6: Trung Tâm Phải -> Bài 01 Đôi Nam: Chiến thuật bọc lót & di chuyển đôi
      case 7: return 1; // Ô 7: Đáy Trái -> Bài 02 Đơn Nam: Ép cầu hai góc cuối sân
      case 8: return 3; // Ô 8: Đáy Giữa -> Bài 04 Đơn Nam: Bước lùi đón cầu & chém bạt góc
      case 9: return 4; // Ô 9: Đáy Phải -> Bài 05 Đơn Nam: Bật nhảy Jump Smash đập cầu
      default: return 0;
    }
  };

  // Tab view: Default is 'VIDEO' (Video thực chiến)
  const [activeTab, setActiveTab] = useState<'VIDEO' | 'TECHNIQUE' | 'COURT' | 'CUSTOM'>('VIDEO');
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(() => getDefaultVideoIndexForPosition(position.id));
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isSlowMo, setIsSlowMo] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const posId = position.id;
  const isHand = mode === 'TAY';
  const isFoot = mode === 'CHÂN';
  const primaryColor = isHand ? '#00f0ff' : isFoot ? '#39ff14' : '#ffb703';

  // Automatically update video to match the new position when posId changes
  useEffect(() => {
    setSelectedVideoIndex(getDefaultVideoIndexForPosition(posId));
  }, [posId]);

  // Load custom video for this position if saved in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`badminton_custom_video_pos_${posId}`);
      if (stored) {
        setCustomVideoUrl(stored);
      } else {
        setCustomVideoUrl(null);
      }
    } catch {
      setCustomVideoUrl(null);
    }
  }, [posId]);

  // Handle Play/Pause
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

  // Toggle Slow-mo (0.5x vs 1.0x) for in-depth technique analysis
  const toggleSlowMo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextSlow = !isSlowMo;
    videoRef.current.playbackRate = nextSlow ? 0.5 : 1.0;
    setIsSlowMo(nextSlow);
  };

  // Toggle Mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Toggle Fullscreen
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!stageRef.current) return;
    if (!document.fullscreenElement) {
      stageRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  // Handle custom URL save
  const handleSaveCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    localStorage.setItem(`badminton_custom_video_pos_${posId}`, inputUrl.trim());
    setCustomVideoUrl(inputUrl.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveTab('VIDEO');
    }, 1200);
  };

  // Reset to default real video
  const handleResetDefaultVideo = () => {
    localStorage.removeItem(`badminton_custom_video_pos_${posId}`);
    setCustomVideoUrl(null);
    setInputUrl('');
  };

  // Active video selection
  const currentVideoItem = TACTICS_VIDEOS[selectedVideoIndex % TACTICS_VIDEOS.length];
  const activeVideoUrl = customVideoUrl || currentVideoItem?.videoUrl || './videos/viesnap.vn_tiktok_7556982998449655047.mp4';

  // Auto-play when activeVideoUrl changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [activeVideoUrl]);

  // 1. Render Accurate Biomechanical Athlete Simulation (ALWAYS 100% MATCHES THE DRILL)
  const renderAthleteTechniqueVisual = () => {
    const activeVarName = variation?.shotName || position.handMovement.title;

    return (
      <div className="athlete-technique-display-stage">
        <svg
          viewBox="0 0 640 380"
          className="illustration-svg athlete-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bgAthleteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0a1628" />
              <stop offset="60%" stopColor="#061120" />
              <stop offset="100%" stopColor="#030814" />
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

          {/* Stadium Court Background */}
          <rect x="20" y="15" width="600" height="350" rx="18" fill="url(#bgAthleteGrad)" stroke="#1e3a5f" strokeWidth="2" />

          {/* Realistic Green Badminton Court Floor */}
          <polygon points="20,255 620,255 620,365 20,365" fill="url(#courtFloorGrad)" />
          <line x1="20" y1="255" x2="620" y2="255" stroke="#39ff14" strokeWidth="2.5" strokeOpacity="0.8" filter="url(#glowEffect)" />
          <line x1="120" y1="365" x2="200" y2="255" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.5" />
          <line x1="320" y1="365" x2="320" y2="255" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.5" />
          <line x1="520" y1="365" x2="440" y2="255" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.5" />

          {/* Non-overlapping Top Corner Badge */}
          <g transform="translate(36, 28)">
            <rect width="210" height="32" rx="16" fill="rgba(10, 20, 35, 0.92)" stroke="#00f0ff" strokeWidth="1.5" />
            <circle cx="18" cy="16" r="10" fill="#00f0ff" />
            <text x="18" y="20" fill="#020812" fontSize="12" fontWeight="900" textAnchor="middle">{posId}</text>
            <text x="36" y="20" fill="#ffffff" fontSize="12" fontWeight="800">{position.zoneName}</text>
          </g>

          {/* Render Specific Athlete Posture Archetype */}
          {renderPostureByPosition(posId, primaryColor)}

          {/* Technical Guidance Cues Floating Overlay - High Contrast */}
          <g transform="translate(36, 290)">
            <rect width="260" height="60" rx="10" fill="rgba(6, 15, 28, 0.95)" stroke="#00f0ff" strokeWidth="1.5" />
            <text x="12" y="24" fill="#00f0ff" fontSize="11" fontWeight="900">
              🎯 TIẾP XÚC CẦU ({posId <= 3 ? 'LƯỚI' : posId <= 6 ? 'TRUNG SÂN' : 'CUỐI SÂN'}):
            </text>
            <text x="12" y="44" fill="#ffffff" fontSize="12" fontWeight="700">
              {posId <= 3 ? 'Đón cầu sát đỉnh lưới trước mặt' : posId <= 6 ? 'Ngang sườn hông, đè cầu phẳng' : 'Điểm cao nhất trên không'}
            </text>
          </g>

          <g transform="translate(344, 290)">
            <rect width="260" height="60" rx="10" fill="rgba(6, 15, 28, 0.95)" stroke="#39ff14" strokeWidth="1.5" />
            <text x="12" y="24" fill="#39ff14" fontSize="11" fontWeight="900">
              🦶 BỘ PHÁP CHÂN THỰC HIỆN:
            </text>
            <text x="12" y="44" fill="#ffffff" fontSize="12" fontWeight="700">
              {posId <= 3 ? 'Lunge chân thuận, gối vững 90°' : posId === 5 ? 'Nhún bật Split-step đàn hồi' : posId <= 6 ? 'Bước chassé ngang hông' : 'Bật nhảy Scissor-kick'}
            </text>
          </g>
        </svg>
      </div>
    );
  };

  // Detailed Badminton Athlete Vector Graphics for 9 positions
  const renderPostureByPosition = (id: number, color: string) => {
    switch (id) {
      // 1. Góc Lưới Trái (Backhand Net Slice / Lunge Left)
      case 1:
        return (
          <g transform="translate(180, 45)">
            <line x1="220" y1="20" x2="220" y2="260" stroke="#00f0ff" strokeWidth="2.5" strokeDasharray="5 5" opacity="0.6" />
            <text x="225" y="40" fill="#64748b" fontSize="11">LƯỚI</text>
            <g transform="translate(200, 70) rotate(35)">
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#ffffff" />
              <polygon points="-6,2 -11,16 11,16 6,2" fill="#e2e8f0" stroke="#94a3b8" />
            </g>
            <path d="M 120 120 Q 170 80 200 70" fill="none" stroke={color} strokeWidth="3" strokeDasharray="4 4" filter="url(#glowEffect)" />
            <circle cx="100" cy="80" r="18" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="2" />
            <ellipse cx="95" cy="140" rx="20" ry="36" fill="url(#athleteJersey)" />
            <path d="M 85 125 L 120 110 L 165 85" fill="none" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" />
            <line x1="165" y1="85" x2="195" y2="70" stroke="#94a3b8" strokeWidth="3.5" />
            <ellipse cx="205" cy="65" rx="14" ry="20" fill="none" stroke="url(#glowRacket)" strokeWidth="3" transform="rotate(-30 205 65)" />
            <path d="M 105 170 L 140 210 L 140 255" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="130" y="250" width="28" height="12" rx="4" fill="#ffffff" />
            <path d="M 85 170 L 40 210 L 0 250" fill="none" stroke="#0369a1" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="-8" y="245" width="24" height="10" rx="3" fill="#ffffff" />
          </g>
        );

      // 2. Lưới Giữa (Net Kill / Tap & Forward Leap)
      case 2:
        return (
          <g transform="translate(180, 45)">
            <line x1="220" y1="20" x2="220" y2="260" stroke="#00f0ff" strokeWidth="2.5" strokeDasharray="5 5" opacity="0.6" />
            <text x="225" y="40" fill="#64748b" fontSize="11">LƯỚI CHỮ T</text>
            <g transform="translate(205, 55) rotate(-15)">
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#ffffff" />
              <polygon points="-6,2 -11,16 11,16 6,2" fill="#e2e8f0" stroke="#94a3b8" />
            </g>
            <path d="M 195 40 L 220 85" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" filter="url(#glowEffect)" />
            <circle cx="110" cy="65" r="18" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="2" />
            <ellipse cx="105" cy="125" rx="20" ry="34" fill="url(#athleteJersey)" />
            <path d="M 115 110 L 150 75 L 180 45" fill="none" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" />
            <line x1="180" y1="45" x2="200" y2="35" stroke="#94a3b8" strokeWidth="3.5" />
            <ellipse cx="210" cy="30" rx="14" ry="20" fill="none" stroke="url(#glowRacket)" strokeWidth="3" transform="rotate(45 210 30)" />
            <path d="M 115 155 L 145 195 L 150 250" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="140" y="245" width="28" height="12" rx="4" fill="#ffffff" />
            <path d="M 95 155 L 75 195 L 50 240" fill="none" stroke="#0369a1" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="42" y="235" width="24" height="10" rx="3" fill="#ffffff" />
          </g>
        );

      // 3. Lưới Phải (Forehand Net Drop)
      case 3:
        return (
          <g transform="translate(180, 45)">
            <line x1="220" y1="20" x2="220" y2="260" stroke="#00f0ff" strokeWidth="2.5" strokeDasharray="5 5" opacity="0.6" />
            <text x="225" y="40" fill="#64748b" fontSize="11">GÓC LƯỚI PHẢI</text>
            <g transform="translate(200, 75) rotate(-40)">
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#ffffff" />
              <polygon points="-6,2 -11,16 11,16 6,2" fill="#e2e8f0" stroke="#94a3b8" />
            </g>
            <circle cx="90" cy="75" r="18" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="2" />
            <ellipse cx="95" cy="135" rx="20" ry="34" fill="url(#athleteJersey)" />
            <path d="M 105 120 L 145 105 L 180 85" fill="none" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" />
            <line x1="180" y1="85" x2="205" y2="78" stroke="#94a3b8" strokeWidth="3.5" />
            <ellipse cx="215" cy="75" rx="14" ry="20" fill="none" stroke="url(#glowRacket)" strokeWidth="3" transform="rotate(20 215 75)" />
            <path d="M 105 165 L 145 205 L 155 255" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="145" y="250" width="28" height="12" rx="4" fill="#ffffff" />
            <path d="M 85 165 L 45 205 L 10 245" fill="none" stroke="#0369a1" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="2" y="240" width="24" height="10" rx="3" fill="#ffffff" />
          </g>
        );

      // 4. Ngang Trái (Backhand Midcourt Drive & Defense)
      case 4:
        return (
          <g transform="translate(180, 45)">
            <line x1="0" y1="130" x2="260" y2="130" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 6" filter="url(#glowEffect)" />
            <g transform="translate(75, 130) rotate(85)">
              <ellipse cx="0" cy="0" rx="7" ry="11" fill="#ffffff" />
              <polygon points="-7,2 -13,18 13,18 7,2" fill="#e2e8f0" stroke="#94a3b8" />
            </g>
            <circle cx="140" cy="85" r="20" fill="#fde047" stroke="#ca8a04" strokeWidth="2.5" />
            <path d="M 120 83 Q 140 75 160 83" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="140" cy="140" rx="25" ry="35" fill="url(#athleteJersey)" stroke="#38bdf8" strokeWidth="2.5" />
            <path d="M 130 130 L 105 135 L 85 130" fill="none" stroke="#fed7aa" strokeWidth="10" strokeLinecap="round" />
            <line x1="85" y1="130" x2="65" y2="130" stroke="#cbd5e1" strokeWidth="4.5" />
            <ellipse cx="48" cy="130" rx="16" ry="22" fill="none" stroke="url(#glowRacket)" strokeWidth="3.5" transform="rotate(-15 48 130)" />
            <path d="M 150 170 L 185 205 L 190 255" fill="none" stroke="#0284c7" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="180" y="250" width="32" height="14" rx="5" fill="#ffffff" stroke="#39ff14" strokeWidth="2" />
            <path d="M 130 170 L 95 205 L 90 255" fill="none" stroke="#0369a1" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="78" y="250" width="32" height="14" rx="5" fill="#ffffff" stroke="#39ff14" strokeWidth="2" />
          </g>
        );

      // 5. Tâm Sân (Base Split-Step)
      case 5:
        return (
          <g transform="translate(180, 40)">
            <ellipse cx="140" cy="255" rx="80" ry="14" fill="none" stroke="#39ff14" strokeWidth="2.5" strokeDasharray="5 5" filter="url(#glowEffect)" />
            <circle cx="140" cy="70" r="19" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="2" />
            <ellipse cx="140" cy="130" rx="22" ry="34" fill="url(#athleteJersey)" />
            <path d="M 125 120 L 135 110 L 140 95" fill="none" stroke="#fbcfe8" strokeWidth="7" strokeLinecap="round" />
            <path d="M 155 120 L 145 110 L 140 95" fill="none" stroke="#fbcfe8" strokeWidth="7" strokeLinecap="round" />
            <line x1="140" y1="95" x2="140" y2="65" stroke="#94a3b8" strokeWidth="3.5" />
            <ellipse cx="140" cy="50" rx="15" ry="20" fill="none" stroke="url(#glowRacket)" strokeWidth="3" />
            <path d="M 150 160 L 185 200 L 195 250" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="185" y="245" width="28" height="12" rx="4" fill="#ffffff" />
            <path d="M 130 160 L 95 200 L 85 250" fill="none" stroke="#0369a1" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="75" y="245" width="28" height="12" rx="4" fill="#ffffff" />
          </g>
        );

      // 6. Ngang Phải (Forehand Flat Drive)
      case 6:
        return (
          <g transform="translate(180, 45)">
            <line x1="140" y1="125" x2="260" y2="125" stroke="#00f0ff" strokeWidth="3" strokeDasharray="5 5" />
            <g transform="translate(230, 125) rotate(-85)">
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#ffffff" />
              <polygon points="-6,2 -11,16 11,16 6,2" fill="#e2e8f0" stroke="#94a3b8" />
            </g>
            <circle cx="110" cy="80" r="18" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="2" />
            <ellipse cx="115" cy="135" rx="22" ry="32" fill="url(#athleteJersey)" />
            <path d="M 125 125 L 165 125 L 205 125" fill="none" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" />
            <line x1="205" y1="125" x2="225" y2="125" stroke="#94a3b8" strokeWidth="3.5" />
            <ellipse cx="240" cy="125" rx="14" ry="20" fill="none" stroke="url(#glowRacket)" strokeWidth="3" transform="rotate(25 240 125)" />
            <path d="M 125 165 L 165 205 L 175 255" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="165" y="250" width="28" height="12" rx="4" fill="#ffffff" />
            <path d="M 105 165 L 80 205 L 75 255" fill="none" stroke="#0369a1" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="65" y="250" width="24" height="10" rx="3" fill="#ffffff" />
          </g>
        );

      // 7. Đáy Trái (Round-The-Head / Backhand Clear)
      case 7:
        return (
          <g transform="translate(180, 40)">
            <g transform="translate(60, 40) rotate(45)">
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#ffffff" />
              <polygon points="-6,2 -11,16 11,16 6,2" fill="#e2e8f0" stroke="#94a3b8" />
            </g>
            <circle cx="120" cy="80" r="18" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="2" />
            <ellipse cx="125" cy="140" rx="20" ry="34" fill="url(#athleteJersey)" transform="rotate(12 125 140)" />
            <path d="M 135 115 Q 120 50 80 45" fill="none" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" />
            <line x1="80" y1="45" x2="65" y2="40" stroke="#94a3b8" strokeWidth="3.5" />
            <ellipse cx="55" cy="35" rx="14" ry="20" fill="none" stroke="url(#glowRacket)" strokeWidth="3" transform="rotate(-40 55 35)" />
            <path d="M 130 170 L 155 210 L 160 255" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="150" y="250" width="28" height="12" rx="4" fill="#ffffff" />
            <path d="M 110 170 L 85 210 L 60 250" fill="none" stroke="#0369a1" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="50" y="245" width="24" height="10" rx="3" fill="#ffffff" />
          </g>
        );

      // 8. Đáy Giữa (High Defensive Clear)
      case 8:
        return (
          <g transform="translate(180, 40)">
            <g transform="translate(140, 25) rotate(15)">
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#ffffff" />
              <polygon points="-6,2 -11,16 11,16 6,2" fill="#e2e8f0" stroke="#94a3b8" />
            </g>
            <circle cx="140" cy="75" r="18" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="2" />
            <ellipse cx="140" cy="135" rx="20" ry="34" fill="url(#athleteJersey)" />
            <path d="M 145 115 L 145 75 L 140 45" fill="none" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" />
            <line x1="140" y1="45" x2="140" y2="25" stroke="#94a3b8" strokeWidth="3.5" />
            <ellipse cx="140" cy="15" rx="14" ry="20" fill="none" stroke="url(#glowRacket)" strokeWidth="3" />
            <path d="M 145 165 L 160 205 L 165 255" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="155" y="250" width="28" height="12" rx="4" fill="#ffffff" />
            <path d="M 130 165 L 115 205 L 110 255" fill="none" stroke="#0369a1" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="100" y="250" width="24" height="10" rx="3" fill="#ffffff" />
          </g>
        );

      // 9. Đáy Phải (Forehand Jump Smash Scissor Kick)
      case 9:
      default:
        return (
          <g transform="translate(180, 35)">
            <line x1="190" y1="45" x2="260" y2="180" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" filter="url(#glowEffect)" />
            <g transform="translate(195, 45) rotate(-65)">
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#ffffff" />
              <polygon points="-6,2 -11,16 11,16 6,2" fill="#e2e8f0" stroke="#94a3b8" />
            </g>
            <circle cx="110" cy="70" r="18" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="2" />
            <ellipse cx="115" cy="125" rx="20" ry="34" fill="url(#athleteJersey)" transform="rotate(-15 115 125)" />
            <path d="M 125 105 L 155 70 L 185 45" fill="none" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" />
            <line x1="185" y1="45" x2="205" y2="35" stroke="#94a3b8" strokeWidth="3.5" />
            <ellipse cx="215" cy="28" rx="14" ry="20" fill="none" stroke="url(#glowRacket)" strokeWidth="3" transform="rotate(35 215 28)" />
            <path d="M 125 155 L 155 190 L 175 230" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="170" y="225" width="26" height="12" rx="4" fill="#ffffff" transform="rotate(20 170 225)" />
            <path d="M 105 155 L 75 190 L 45 220" fill="none" stroke="#0369a1" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="40" y="215" width="24" height="10" rx="3" fill="#ffffff" transform="rotate(-25 40 215)" />
          </g>
        );
    }
  };

  // 2. Render Tactical Court Diagram
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

        <circle cx={baseX} cy={baseY} r="16" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
        <circle cx={baseX} cy={baseY} r="6" fill="#94a3b8" />
        <text x={baseX} y={baseY + 32} fill="#94a3b8" fontSize="12" fontWeight="600" textAnchor="middle">
          TÂM SÂN (Ô 5)
        </text>

        <circle cx={targetX} cy={targetY} r="48" fill={primaryColor} fillOpacity="0.18" filter="url(#glowCourt)" />
        <circle cx={targetX} cy={targetY} r="34" fill="url(#targetGrad)" stroke="#ffffff" strokeWidth="3.5" />
        <text x={targetX} y={targetY + 8} fill="#050c14" fontSize="24" fontWeight="900" textAnchor="middle">
          {position.id}
        </text>

        <g transform={`translate(${targetX + 28}, ${targetY - 30}) rotate(-25)`}>
          <ellipse cx="0" cy="0" rx="7" ry="11" fill="#fff" />
          <path d="M -7 4 L -13 20 L 13 20 L 7 4 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
        </g>
      </svg>
    );
  };

  // 3. Render Real Video In Uncropped Contain View
  const renderRealVideoVisual = () => {
    return (
      <div className="movement-real-video-wrap" onClick={togglePlay} style={{ background: '#050c14' }}>
        <video
          ref={videoRef}
          src={activeVideoUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="movement-video-element"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Video Selector Dropdown on Top */}
        <div className="movement-video-top-bar" onClick={(e) => e.stopPropagation()}>
          <div className="video-pos-badge" style={{ borderColor: primaryColor }}>
            <span className="pos-badge-num" style={{ background: primaryColor }}>{posId}</span>
            <span className="pos-badge-title">{position.zoneName}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <select
              value={selectedVideoIndex}
              onChange={(e) => setSelectedVideoIndex(Number(e.target.value))}
              style={{
                background: 'rgba(10, 20, 35, 0.92)',
                border: '1px solid rgba(0, 240, 255, 0.4)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 700,
                borderRadius: '8px',
                padding: '4px 8px',
                cursor: 'pointer',
                outline: 'none',
                maxWidth: '220px'
              }}
            >
              {TACTICS_VIDEOS.map((v, i) => (
                <option key={v.id} value={i}>
                  {v.category === 'DON_NAM' ? '👤 Đơn Nam' : '👥 Đôi Nam'}: {v.title}
                </option>
              ))}
            </select>

            {isSlowMo && (
              <span className="slow-mo-pill animate-pulse">
                <Gauge size={12} />
                <span>SLOW-MO 0.5x</span>
              </span>
            )}
          </div>
        </div>

        {!isPlaying && (
          <div className="movement-video-center-paused">
            <Play size={44} fill="currentColor" />
          </div>
        )}

        {/* Video Control Bar On Bottom */}
        <div className="movement-video-bottom-controls" onClick={(e) => e.stopPropagation()}>
          <div className="mv-ctrl-left">
            <button className="mv-btn" onClick={togglePlay} title={isPlaying ? "Tạm dừng" : "Phát"}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
            </button>
            <button 
              className={`mv-btn ${isSlowMo ? 'is-active-btn' : ''}`} 
              onClick={toggleSlowMo} 
              title="Chế độ quay chậm 0.5x"
            >
              <Gauge size={15} />
              <span style={{ fontSize: '11px', fontWeight: 'bold' }}>0.5x</span>
            </button>
            <button className="mv-btn" onClick={toggleMute} title={isMuted ? "Bật tiếng" : "Tắt tiếng"}>
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>

          <div className="mv-ctrl-center">
            <span className="mv-video-label-text">
              {currentVideoItem?.title || 'Clip thực tế'}
            </span>
          </div>

          <div className="mv-ctrl-right">
            <button className="mv-btn" onClick={toggleFullscreen} title="Toàn màn hình">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 4. Render Custom Link Form
  const renderCustomLinkForm = () => {
    return (
      <div className="movement-custom-link-panel" style={{ padding: '24px', background: 'rgba(10, 20, 35, 0.95)', borderRadius: '16px', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
        <h4 style={{ color: '#00f0ff', marginTop: 0, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LinkIcon size={18} /> GẮN LINK VIDEO CHO ĐỘNG TÁC: {position.zoneName}
        </h4>
        <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.5 }}>
          Dán đường dẫn video MP4 hoặc link clip ngắn của riêng bạn vào bài tập này:
        </p>

        <form onSubmit={handleSaveCustomUrl} style={{ marginTop: '16px' }}>
          <div style={{ marginBottom: '14px' }}>
            <input
              type="text"
              placeholder="./videos/clip.mp4 hoặc https://..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: '#071220',
                border: '1px solid #1e3a5f',
                color: '#fff',
                fontSize: '13px'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            <button
              type="submit"
              style={{
                padding: '9px 18px',
                borderRadius: '8px',
                background: '#00f0ff',
                color: '#020812',
                border: 'none',
                fontWeight: 800,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Lưu Video
            </button>

            {customVideoUrl && (
              <button
                type="button"
                onClick={handleResetDefaultVideo}
                style={{
                  padding: '9px 14px',
                  borderRadius: '8px',
                  background: 'transparent',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Xóa video riêng
              </button>
            )}

            {savedSuccess && (
              <span style={{ color: '#39ff14', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={16} /> Đã lưu thành công!
              </span>
            )}
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className={`illustration-container ${className}`}>
      {/* Visual Mode Navigation Switcher */}
      <div className="illustration-view-tabs">
        <button
          className={`view-tab-btn ${activeTab === 'VIDEO' ? 'is-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab('VIDEO');
          }}
        >
          <Film size={14} />
          <span className="tab-full-label">🎥 VIDEO THỰC CHIẾN</span>
          <span className="tab-mobile-label">Video</span>
        </button>

        <button
          className={`view-tab-btn ${activeTab === 'TECHNIQUE' ? 'is-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab('TECHNIQUE');
          }}
        >
          <User size={14} />
          <span className="tab-full-label">🏃 ĐỘNG TÁC THỊ PHẠM</span>
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
          <span className="tab-full-label">🏟️ SƠ ĐỒ DI CHUYỂN</span>
          <span className="tab-mobile-label">Sơ đồ sân</span>
        </button>

        <button
          className={`view-tab-btn ${activeTab === 'CUSTOM' ? 'is-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab('CUSTOM');
          }}
        >
          <LinkIcon size={14} />
          <span className="tab-full-label">🔗 GẮN LINK RIÊNG</span>
          <span className="tab-mobile-label">Gắn link</span>
        </button>
      </div>

      {/* Main Visual Display Stage */}
      <div className="illustration-display-stage" ref={stageRef}>
        {activeTab === 'TECHNIQUE' && renderAthleteTechniqueVisual()}
        {activeTab === 'COURT' && renderCourtDiagram()}
        {activeTab === 'VIDEO' && renderRealVideoVisual()}
        {activeTab === 'CUSTOM' && renderCustomLinkForm()}
      </div>
    </div>
  );
};
