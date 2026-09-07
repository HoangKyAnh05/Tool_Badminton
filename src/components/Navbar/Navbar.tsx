import React from 'react';
import { Volume2, VolumeX, History, Sparkles, Activity } from 'lucide-react';
import { TrainingMode, SessionState } from '../../types';

interface NavbarProps {
  currentMode: TrainingMode;
  state: SessionState;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenHistory: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  state,
  soundEnabled,
  onToggleSound,
  onOpenHistory,
  onGoHome
}) => {
  const isTraining = state === 'ACTIVE' || state === 'COUNTDOWN' || state === 'REST' || state === 'PAUSED';

  return (
    <header className="app-navbar">
      <div className="navbar-container">
        {/* Brand */}
        <div className="navbar-brand" onClick={onGoHome} role="button" tabIndex={0}>
          <div className="brand-logo-badge">
            <Activity size={22} className="brand-icon" />
          </div>
          <div className="brand-texts">
            <span className="brand-name">BADMINTON<span className="highlight-text">PRO</span></span>
            <span className="brand-tag">REACTION & FOOTWORK TRAINER</span>
          </div>
        </div>

        {/* Live Status indicator if training */}
        {isTraining && (
          <div className="navbar-training-pill animate-pulse">
            <span className="live-dot" />
            <span className="pill-text-desktop">ĐANG TẬP: <strong>{currentMode}</strong></span>
            <span className="pill-text-mobile"><strong>{currentMode}</strong></span>
          </div>
        )}

        {/* Right Tools */}
        <div className="navbar-actions">
          <button 
            className={`nav-btn ${soundEnabled ? 'is-active' : ''}`}
            onClick={onToggleSound}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            <span className="nav-btn-text">{soundEnabled ? 'Âm thanh' : 'Tắt tiếng'}</span>
          </button>

          <button 
            className="nav-btn"
            onClick={onOpenHistory}
            title="Lịch sử tập luyện"
            aria-label="View History"
          >
            <History size={18} />
            <span className="nav-btn-text">Lịch sử</span>
          </button>
        </div>
      </div>
    </header>
  );
};
