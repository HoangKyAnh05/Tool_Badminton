import React from 'react';
import { TrainingConfig, TrainingMode, SpeedPreset } from '../../types';
import { Play, ArrowLeft, Volume2, VolumeX, Camera, CameraOff, Clock, ShieldAlert, Sparkles, Activity } from 'lucide-react';

interface TrainingSetupProps {
  config: TrainingConfig;
  onUpdateConfig: (partial: Partial<TrainingConfig>) => void;
  onStart: () => void;
  onBack: () => void;
}

export const TrainingSetup: React.FC<TrainingSetupProps> = ({
  config,
  onUpdateConfig,
  onStart,
  onBack
}) => {
  const modes: { id: TrainingMode; title: string; desc: string; icon: string }[] = [
    { id: 'TAY', title: '✋ TAY', desc: 'Vợt & phản xạ thân trên', icon: '✋' },
    { id: 'CHÂN', title: '🦶 CHÂN', desc: 'Bộ pháp & bước lướt', icon: '🦶' },
    { id: 'TAY + CHÂN', title: '⚡ TAY + CHÂN', desc: 'Phối hợp toàn thân', icon: '⚡' },
    { id: 'LÝ THUYẾT', title: '🧠 LÝ THUYẾT', desc: 'Chiến thuật 4 đáp án', icon: '🧠' },
    { id: 'TOÀN BỘ', title: '🌐 TOÀN BỘ', desc: 'Xáo trộn ngẫu nhiên tất cả', icon: '🌐' }
  ];

  const speedPresets: { id: SpeedPreset; label: string; duration: number }[] = [
    { id: 'unlimited', label: '♾️ Không giới hạn (Tự do)', duration: 0 },
    { id: 'very_slow', label: 'Rất chậm (3.0s)', duration: 3.0 },
    { id: 'slow', label: 'Chậm (2.0s)', duration: 2.0 },
    { id: 'normal', label: 'Bình thường (1.5s)', duration: 1.5 },
    { id: 'fast', label: 'Nhanh (1.0s)', duration: 1.0 },
    { id: 'very_fast', label: 'Rất nhanh (0.5s)', duration: 0.5 },
    { id: 'custom', label: 'Tùy chỉnh', duration: config.actionDuration > 0 ? config.actionDuration : 1.5 }
  ];

  const roundOptions = [10, 20, 30, 50, 100];

  const handleSpeedPresetSelect = (preset: SpeedPreset, duration: number) => {
    onUpdateConfig({
      speedPreset: preset,
      actionDuration: duration
    });
  };

  return (
    <div className="setup-container animate-fade-in">
      <div className="setup-card">
        {/* Header */}
        <div className="setup-header">
          <button className="btn-back-link" onClick={onBack}>
            <ArrowLeft size={18} />
            <span>Trang chủ</span>
          </button>
          <div className="setup-title-group">
            <h1 className="setup-title">CẤU HÌNH PHÒNG TẬP PHẢN XẠ</h1>
            <p className="setup-subtitle">Tùy chỉnh chế độ, tốc độ phản xạ và số lượt thi đấu</p>
          </div>
        </div>

        {/* 1. Select Mode */}
        <div className="setup-section">
          <label className="section-label">1. CHỌN CHẾ ĐỘ TẬP</label>
          <div className="mode-selection-grid">
            {modes.map((m) => {
              const isSelected = config.mode === m.id;
              return (
                <button
                  key={m.id}
                  className={`mode-select-card ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => onUpdateConfig({ mode: m.id })}
                >
                  <span className="mode-select-icon">{m.icon}</span>
                  <div className="mode-select-info">
                    <strong>{m.title}</strong>
                    <small>{m.desc}</small>
                  </div>
                  {isSelected && <div className="selected-indicator" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Speed & Response Time */}
        <div className="setup-section">
          <div className="section-label-row">
            <label className="section-label">2. TỐC ĐỘ PHẢN XẠ</label>
            <span className="current-speed-tag">
              <Clock size={14} /> Thời gian hành động: <strong>{config.speedPreset === 'unlimited' ? 'Không giới hạn (∞)' : `${config.actionDuration.toFixed(2)}s`}</strong>
            </span>
          </div>

          <div className="speed-pills-row">
            {speedPresets.map((sp) => (
              <button
                key={sp.id}
                className={`speed-pill ${config.speedPreset === sp.id ? 'is-active' : ''}`}
                onClick={() => handleSpeedPresetSelect(sp.id, sp.duration)}
              >
                {sp.label}
              </button>
            ))}
          </div>

          {config.speedPreset === 'unlimited' ? (
            <div className="unlimited-notice-card animate-fade-in">
              <Sparkles size={18} className="notice-icon" />
              <div>
                <strong>Chế độ không giới hạn thời gian đã chọn:</strong>
                <p>Bài tập sẽ giữ nguyên cho đến khi bạn sẵn sàng. Khi hoàn thành động tác, chỉ cần <strong>bấm phím CÁCH</strong> hoặc <strong>chạm vào màn hình</strong> để chuyển ngay sang bài khác!</p>
              </div>
            </div>
          ) : (
            /* Custom Duration Slider */
            <div className="slider-wrapper">
              <span className="slider-bound">0.4s</span>
              <input
                type="range"
                min="0.4"
                max="4.0"
                step="0.1"
                value={config.actionDuration > 0 ? config.actionDuration : 1.5}
                onChange={(e) =>
                  onUpdateConfig({
                    speedPreset: 'custom',
                    actionDuration: parseFloat(e.target.value)
                  })
                }
                className="range-slider"
              />
              <span className="slider-bound">4.0s</span>
            </div>
          )}
        </div>

        {/* 3. Number of rounds & Rest times */}
        <div className="setup-grid-dual">
          <div className="setup-col">
            <label className="section-label">3. SỐ LƯỢT TẬP (ROUNDS)</label>
            <div className="round-pills-row">
              {roundOptions.map((r) => (
                <button
                  key={r}
                  className={`round-pill ${config.totalRounds === r ? 'is-active' : ''}`}
                  onClick={() => onUpdateConfig({ totalRounds: r })}
                >
                  {r} lượt
                </button>
              ))}
            </div>
          </div>

          <div className="setup-col">
            <label className="section-label">4. THỜI GIAN NGHỈ GIỮA HIỆP</label>
            <div className="rest-pills-row">
              {[0.4, 0.8, 1.2, 2.0].map((sec) => (
                <button
                  key={sec}
                  className={`round-pill ${config.restDuration === sec ? 'is-active' : ''}`}
                  onClick={() => onUpdateConfig({ restDuration: sec })}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Hardware & Toggles */}
        <div className="setup-section toggles-row">
          <button
            className={`toggle-feature-btn ${config.cameraEnabled ? 'is-active' : ''}`}
            onClick={() => onUpdateConfig({ cameraEnabled: !config.cameraEnabled })}
          >
            {config.cameraEnabled ? <Camera size={18} /> : <CameraOff size={18} />}
            <span>{config.cameraEnabled ? 'Camera: BẬT' : 'Camera: TẮT'}</span>
          </button>

          <button
            className={`toggle-feature-btn ${config.soundEnabled ? 'is-active' : ''}`}
            onClick={() => onUpdateConfig({ soundEnabled: !config.soundEnabled })}
          >
            {config.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            <span>{config.soundEnabled ? 'Âm thanh: BẬT' : 'Âm thanh: TẮT'}</span>
          </button>
        </div>

        {/* Start Button */}
        <div className="setup-footer">
          <button className="btn-start-training" onClick={onStart}>
            <Play size={22} fill="currentColor" />
            <span>BẮT ĐẦU TẬP LUYỆN NGAY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
