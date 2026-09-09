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
  Gauge,
  MapPin,
  Mic,
  MicOff,
  Sparkles,
  MousePointerClick
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

  const activeZones = config.targetZones && config.targetZones.length > 0 
    ? config.targetZones 
    : [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleSpeedPresetSelect = (preset: SpeedPreset, duration: number) => {
    onUpdateConfig({
      speedPreset: preset,
      actionDuration: duration
    });
  };

  const handleToggleZone = (zoneId: number) => {
    let next: number[];
    if (activeZones.includes(zoneId)) {
      next = activeZones.filter(id => id !== zoneId);
      if (next.length === 0) {
        next = [zoneId]; // Keep at least 1 zone
      }
    } else {
      next = [...activeZones, zoneId].sort((a, b) => a - b);
    }
    onUpdateConfig({ targetZones: next });
  };

  const isAllZones = activeZones.length === 9;
  const isCornersOnly = activeZones.length === 4 && [1, 3, 7, 9].every(z => activeZones.includes(z));
  const isNetOnly = activeZones.length === 3 && [1, 2, 3].every(z => activeZones.includes(z));
  const isMidOnly = activeZones.length === 3 && [4, 5, 6].every(z => activeZones.includes(z));
  const isRearOnly = activeZones.length === 3 && [7, 8, 9].every(z => activeZones.includes(z));

  const getZonePresetLabel = () => {
    if (isAllZones) return 'Toàn sân (9 ô)';
    if (isCornersOnly) return '4 Góc sân (1, 3, 7, 9)';
    if (isNetOnly) return '3 Ô lưới (1, 2, 3)';
    if (isMidOnly) return '3 Ô giữa sân (4, 5, 6)';
    if (isRearOnly) return '3 Ô cuối sân (7, 8, 9)';
    return `Tùy chọn ${activeZones.length} ô`;
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
                  soundEnabled: true,
                  voiceCoachEnabled: true,
                  targetZones: [1, 3, 7, 9] // 4 corners for beginners
                });
              }}
            >
              <Footprints size={15} />
              <span>🔰 Người Mới (10 hiệp • 4.0s thoải mái • 4 Góc Sân)</span>
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
                  soundEnabled: true,
                  voiceCoachEnabled: true,
                  targetZones: [1, 2, 3, 4, 5, 6, 7, 8, 9]
                });
              }}
            >
              <Zap size={15} />
              <span>⚡ Thi Đấu Nâng Cao (25 hiệp • 1.5s bứt tốc toàn sân)</span>
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

        {/* 2. Target Court Zones (Luyện tập theo vùng sân & điểm yếu) */}
        <div className="setup-section">
          <div className="section-label-row">
            <label className="section-label">2. VÙNG SÂN TẬP TRUNG ({activeZones.length}/9 Ô ĐƯỢC CHỌN)</label>
            <span className="current-speed-tag">
              <MapPin size={14} /> Điểm rơi: <strong>{getZonePresetLabel()}</strong>
            </span>
          </div>

          {/* Quick Preset Buttons for Zones */}
          <div className="zone-preset-row">
            <button 
              type="button" 
              className={`zone-preset-btn ${isAllZones ? 'active' : ''}`}
              onClick={() => onUpdateConfig({ targetZones: [1, 2, 3, 4, 5, 6, 7, 8, 9] })}
            >
              🌟 Toàn Sân (9 Ô)
            </button>
            <button 
              type="button" 
              className={`zone-preset-btn ${isCornersOnly ? 'active' : ''}`}
              onClick={() => onUpdateConfig({ targetZones: [1, 3, 7, 9] })}
            >
              ⚡ 4 Góc Sân (1, 3, 7, 9)
            </button>
            <button 
              type="button" 
              className={`zone-preset-btn ${isNetOnly ? 'active' : ''}`}
              onClick={() => onUpdateConfig({ targetZones: [1, 2, 3] })}
            >
              🏸 3 Ô Lưới (1, 2, 3)
            </button>
            <button 
              type="button" 
              className={`zone-preset-btn ${isMidOnly ? 'active' : ''}`}
              onClick={() => onUpdateConfig({ targetZones: [4, 5, 6] })}
            >
              🛡️ 3 Ô Giữa Sân (4, 5, 6)
            </button>
            <button 
              type="button" 
              className={`zone-preset-btn ${isRearOnly ? 'active' : ''}`}
              onClick={() => onUpdateConfig({ targetZones: [7, 8, 9] })}
            >
              💥 3 Ô Cuối Sân (7, 8, 9)
            </button>
          </div>

          {/* Interactive Mini 3x3 Court Grid */}
          <div className="mini-court-selector">
            <div className="mini-court-label">Chạm vào ô để bật / tắt vị trí bạn muốn tập luyện:</div>
            <div className="mini-court-grid">
              {[
                { id: 1, name: 'Lưới Trái', zone: 'net' },
                { id: 2, name: 'Lưới Giữa', zone: 'net' },
                { id: 3, name: 'Lưới Phải', zone: 'net' },
                { id: 4, name: 'TT Trái', zone: 'mid' },
                { id: 5, name: 'Tâm Sân', zone: 'mid' },
                { id: 6, name: 'TT Phải', zone: 'mid' },
                { id: 7, name: 'Đáy Trái', zone: 'rear' },
                { id: 8, name: 'Đáy Giữa', zone: 'rear' },
                { id: 9, name: 'Đáy Phải', zone: 'rear' }
              ].map(pos => {
                const isSelected = activeZones.includes(pos.id);
                return (
                  <button
                    key={pos.id}
                    type="button"
                    className={`mini-cell-btn ${isSelected ? 'is-selected is-active-zone is-glowing-active' : 'is-off is-inactive-zone'}`}
                    onClick={() => handleToggleZone(pos.id)}
                    title={`Ô ${pos.id}: ${pos.name} (${isSelected ? 'Đang BẬT' : 'Đang TẮT'})`}
                  >
                    <div className="cell-top-row">
                      <span className="mini-cell-num">{pos.id}</span>
                      {isSelected ? (
                        <span className="cell-active-indicator-badge">BẬT ✓</span>
                      ) : (
                        <span className="cell-off-indicator-badge">TẮT</span>
                      )}
                    </div>
                    <span className="mini-cell-name">{pos.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Speed & Response Time */}
        <div className="setup-section">
          <div className="section-label-row">
            <label className="section-label">3. TỐC ĐỘ PHẢN XẠ</label>
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

        {/* 4. Preparation / Move-to-Position Duration (1s - 10s) */}
        <div className="setup-section">
          <div className="section-label-row">
            <label className="section-label">4. THỜI GIAN DI CHUYỂN ĐẾN VỊ TRÍ (1s - 10s)</label>
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

        {/* 5. Number of rounds & Rest times */}
        <div className="setup-grid-dual">
          <div className="setup-col">
            <label className="section-label">5. SỐ LƯỢT TẬP (ROUNDS)</label>
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
            <label className="section-label">6. THỜI GIAN NGHỈ GIỮA HIỆP</label>
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

        {/* 7. Hardware & Audio Toggles */}
        <div className="setup-section toggles-row">
          <button
            className={`toggle-feature-btn ${config.manualAdvance !== false ? 'is-active' : ''}`}
            onClick={() => onUpdateConfig({ manualAdvance: config.manualAdvance === false })}
            title="Đợi bạn bấm chuột hoặc phím CÁCH mới chuyển sang ô mới"
          >
            <MousePointerClick size={18} className="text-lime" />
            <span>{config.manualAdvance !== false ? 'Chờ Bấm Chuột / Phím Cách: BẬT' : 'Tự Chuyển Theo Giây: BẬT'}</span>
          </button>

          <button
            className={`toggle-feature-btn ${config.soundEnabled ? 'is-active' : ''}`}
            onClick={() => onUpdateConfig({ soundEnabled: !config.soundEnabled })}
          >
            {config.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            <span>{config.soundEnabled ? 'Âm thanh còi: BẬT' : 'Âm thanh: TẮT'}</span>
          </button>

          <button
            className={`toggle-feature-btn ${config.voiceCoachEnabled !== false ? 'is-active' : ''}`}
            onClick={() => onUpdateConfig({ voiceCoachEnabled: config.voiceCoachEnabled === false })}
            title="Huấn luyện viên đọc to tên ô và động tác bằng giọng nói tiếng Việt"
          >
            {config.voiceCoachEnabled !== false ? <Mic size={18} className="text-cyan" /> : <MicOff size={18} />}
            <span>{config.voiceCoachEnabled !== false ? 'HLV Giọng Nói: BẬT' : 'HLV Giọng Nói: TẮT'}</span>
          </button>

          <button
            className={`toggle-feature-btn ${config.cameraEnabled ? 'is-active' : ''}`}
            onClick={() => onUpdateConfig({ cameraEnabled: !config.cameraEnabled })}
          >
            {config.cameraEnabled ? <Camera size={18} /> : <CameraOff size={18} />}
            <span>{config.cameraEnabled ? 'Camera: BẬT' : 'Camera: TẮT'}</span>
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
