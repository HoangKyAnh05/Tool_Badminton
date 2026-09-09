import React from 'react';
import { Volume2, VolumeX, History, Activity, Camera, FolderSync, Smartphone, Monitor } from 'lucide-react';
import { TrainingMode, SessionState } from '../../types';

interface NavbarProps {
  currentMode: TrainingMode;
  state: SessionState;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenHistory: () => void;
  onOpenRecorder: () => void;
  onOpenVideoHub: () => void;
  onGoHome: () => void;
  isMobileView?: boolean;
  onToggleMobileView?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  state,
  soundEnabled,
  onToggleSound,
  onOpenHistory,
  onOpenRecorder,
  onOpenVideoHub,
  onGoHome,
  isMobileView,
  onToggleMobileView
}) => {
  const isTraining = state === 'ACTIVE' || state === 'COUNTDOWN' || state === 'REST' || state === 'PAUSED';

  return (
    <header className="app-navbar">
      <div className="navbar-container">
        <div className="navbar-left-group">
          {onToggleMobileView && (
            <button 
              className={`btn-mobile-view-toggle ${isMobileView ? 'is-active' : ''}`}
              onClick={onToggleMobileView}
              title={isMobileView ? "Chuyển về giao diện máy tính" : "Chuyển sang giao diện điện thoại"}
            >
              {isMobileView ? <Monitor size={16} className="text-emerald" /> : <Smartphone size={16} className="text-cyan" />}
              <span className="mobile-toggle-label">{isMobileView ? 'Giao diện PC' : 'Giao diện Điện thoại'}</span>
            </button>
          )}

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
            className="nav-btn nav-btn-videohub"
            onClick={onOpenVideoHub}
            title="Trung tâm đổi video và gán link cho từng vị trí ô sân"
            aria-label="Đổi Video"
          >
            <FolderSync size={16} className="text-cyan" />
            <span className="nav-btn-text">Đổi Video</span>
          </button>

          <button 
            className="nav-btn nav-btn-record"
            onClick={onOpenRecorder}
            title="Quay video bài tập và tự động lưu về máy"
            aria-label="Quay Video"
          >
            <Camera size={16} className="text-danger" />
            <span className="nav-btn-text">Quay Video</span>
          </button>

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
