import React from 'react';
import { TrainingConfig, TrainingMode, SpeedPreset } from '../../types';
import { 
  Play, 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Camera, 
  CameraOff, 
  Clock, 
  Activity,
  Target,
  Footprints,
  Zap,
  BookOpen,
  Layers,
  Gauge
} from 'lucide-react';

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
  const modes: { 
    id: TrainingMode; 
    title: string; 
    desc: string; 
    icon: React.ReactNode;
  }[] = [
    { 
      id: 'TAY', 
      title: 'KỸ THUẬT VỢT (TAY)', 
      desc: 'Phản xạ tay, đón cầu trên lưới & phòng thủ', 
      icon: <Target size={20} className="text-emerald" /> 
    },
    { 
      id: 'CHÂN', 
      title: 'BỘ PHÁP DI CHUYỂN (CHÂN)', 
      desc: 'Split-step, lunge, di chuyển 9 ô và hồi tâm', 
      icon: <Footprints size={20} className="text-sky" /> 
    },
    { 
      id: 'TAY + CHÂN', 
      title: 'PHỐI HỢP TAY & CHÂN', 
      desc: 'Đồng bộ nhịp tiếp đất & điểm chạm cầu', 
      icon: <Zap size={20} className="text-amber" /> 
    },
    { 
      id: 'LÝ THUYẾT', 
      title: 'LÝ THUYẾT CHIẾN THUẬT', 
      desc: 'Tình huống xử lý điểm rơi & đọc hướng cầu', 
      icon: <BookOpen size={20} className="text-purple" /> 
    },
    { 
      id: 'TOÀN BỘ', 
      title: 'BÀI TẬP TỔNG HỢP', 
      desc: 'Xáo trộn ngẫu nhiên tất cả nội dung thực chiến', 
      icon: <Layers size={20} className="text-emerald" /> 
    }
  ];

  const speedPresets: { id: SpeedPreset; label: string; duration: number }[] = [
    { id: 'unlimited', label: 'Không giới hạn (Tự do)', duration: 0 },
    { id: 'very_slow', label: 'Mới bắt đầu (5.0s)', duration: 5.0 },
    { id: 'slow', label: 'Cơ bản (4.0s)', duration: 4.0 },
    { id: 'normal', label: 'Tiêu chuẩn (2.5s)', duration: 2.5 },
    { id: 'fast', label: 'Nhanh (1.5s)', duration: 1.5 },
    { id: 'very_fast', label: 'Tốc độ cao (0.8s)', duration: 0.8 },
    { id: 'custom', label: 'Tùy chỉnh', duration: config.actionDuration > 0 ? config.actionDuration : 4.0 }
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

        {/* Quick Presets for Beginner vs Advanced */}
        <div className="setup-preset-switch-box">
          <span className="preset-switch-title">Lựa chọn nhanh theo trình độ:</span>
          <div className="preset-switch-buttons">
            <button 
              type="button"
              className={`btn-quick-preset preset-btn-beginner ${config.actionDuration >= 4.0 || config.speedPreset === 'unlimited' ? 'is-active' : ''}`}
              onClick={() => {
                onUpdateConfig({
                  speedPreset: 'slow',
                  actionDuration: 4.0,
                  prepDuration: 5,
                  totalRounds: 10,
                  soundEnabled: true
                });
              }}
            >
              <Footprints size={15} />
              <span>🔰 Người Mới (10 hiệp • 4.0s thoải mái • Bật âm thanh)</span>
            </button>
            <button 
              type="button"
              className={`btn-quick-preset preset-btn-advanced ${config.actionDuration < 2.0 && config.speedPreset !== 'unlimited' ? 'is-active' : ''}`}
              onClick={() => {
                onUpdateConfig({
                  speedPreset: 'fast',
                  actionDuration: 1.5,
                  prepDuration: 3,
                  totalRounds: 25,
                  soundEnabled: true
                });
              }}
            >
              <Zap size={15} />
              <span>⚡ Thi Đấu Nâng Cao (25 hiệp • 1.5s bứt tốc)</span>
            </button>
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
              <Activity size={18} className="notice-icon text-emerald" />
              <div>
                <strong>Chế độ không giới hạn thời gian đã chọn:</strong>
                <p>Bài tập sẽ giữ nguyên cho đến khi bạn sẵn sàng. Khi hoàn thành động tác, chỉ cần <strong>bấm phím CÁCH</strong> hoặc <strong>chạm vào màn hình</strong> để chuyển ngay sang bài khác!</p>
              </div>
            </div>
          ) : (
            /* Custom Duration Slider */
            <div className="slider-wrapper">
              <span className="slider-bound">0.5s (Chớp nhoáng)</span>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.1"
                value={config.actionDuration > 0 ? config.actionDuration : 4.0}
                onChange={(e) =>
                  onUpdateConfig({
                    speedPreset: 'custom',
                    actionDuration: parseFloat(e.target.value)
                  })
                }
                className="range-slider"
              />
              <span className="slider-bound">6.0s (Chậm rãi cho Newbie)</span>
            </div>
          )}
        </div>

        {/* 3. Preparation / Move-to-Position Duration (1s - 10s) */}
        <div className="setup-section">
          <div className="section-label-row">
            <label className="section-label">3. THỜI GIAN DI CHUYỂN ĐẾN VỊ TRÍ (1s - 10s)</label>
            <span className="current-speed-tag">
              <Clock size={14} /> Chờ người học tới vị trí: <strong>{config.prepDuration ?? 3}s</strong>
            </span>
          </div>

          <div className="speed-pills-row">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sec) => (
              <button
                key={sec}
                className={`speed-pill ${(config.prepDuration ?? 3) === sec ? 'is-active' : ''}`}
                onClick={() => onUpdateConfig({ prepDuration: sec })}
              >
                {sec}s
              </button>
            ))}
          </div>

          <div className="slider-wrapper">
            <span className="slider-bound">1s (Chạy nhanh)</span>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={config.prepDuration ?? 3}
              onChange={(e) => onUpdateConfig({ prepDuration: parseInt(e.target.value, 10) })}
              className="range-slider"
            />
            <span className="slider-bound">10s (Thoải mái vào form)</span>
          </div>

          <div className="unlimited-notice-card animate-fade-in" style={{ marginTop: '10px' }}>
            <Activity size={18} className="notice-icon" />
            <div>
              <strong>Thời gian chuẩn bị cho mỗi lượt:</strong>
              <p>Lưới 9 ô sẽ sáng vị trí trước và đếm lùi để bạn kịp di chuyển đến vị trí đó. Khi hết thời gian (hoặc bạn bấm phím CÁCH / chạm màn hình khi vừa tới nơi), bài học sẽ bắt đầu!</p>
            </div>
          </div>
        </div>

        {/* 4. Number of rounds & Rest times */}
        <div className="setup-grid-dual">
          <div className="setup-col">
            <label className="section-label">4. SỐ LƯỢT TẬP (ROUNDS)</label>
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
            <label className="section-label">5. THỜI GIAN NGHỈ GIỮA HIỆP</label>
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
