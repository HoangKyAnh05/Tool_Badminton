import React, { useState, useEffect } from 'react';
import { TrainingMode } from '../../types';
import { storageService, LifetimeStats } from '../../services/storage';
import { 
  Flame, 
  Trophy, 
  Zap, 
  ArrowRight, 
  Compass, 
  Play, 
  CheckCircle2,
  Camera,
  Activity,
  Target,
  Footprints,
  BookOpen,
  Layers,
  Award
} from 'lucide-react';
import { VideoSection } from '../Video/VideoSection';
import { DailyChallengeCard } from '../DailyChallenge/DailyChallengeCard';
import { DailyWorkout } from '../../data/dailyPlan100';

interface HomeDashboardProps {
  onSelectMode: (mode: TrainingMode) => void;
  onQuickStart: () => void;
  onOpenRecorder?: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onSelectMode,
  onQuickStart,
  onOpenRecorder
}) => {
  const [lifetime, setLifetime] = useState<LifetimeStats>(() => storageService.loadLifetimeStats());
  const [dailyProgress, setDailyProgress] = useState(() => storageService.loadDailyProgress());
  const [expLevel, setExpLevel] = useState<'BEGINNER' | 'ADVANCED'>(() => storageService.loadUserExperienceLevel());

  useEffect(() => {
    setLifetime(storageService.loadLifetimeStats());
    setDailyProgress(storageService.loadDailyProgress());
    setExpLevel(storageService.loadUserExperienceLevel());
  }, []);

  const handleToggleExpLevel = (level: 'BEGINNER' | 'ADVANCED') => {
    setExpLevel(level);
    storageService.saveUserExperienceLevel(level);
  };

  const handleCompleteDay = (dayNumber: number) => {
    const updated = storageService.completeDayWorkout(dayNumber);
    setDailyProgress(updated);
  };

  const handleSelectWorkout = (workout: DailyWorkout) => {
    onSelectMode(workout.suggestedMode);
  };

  const trainingCards: {
    mode: TrainingMode;
    title: string;
    tagline: string;
    desc: string;
    colorClass: string;
    badge: string;
  }[] = [
    {
      mode: 'TAY',
      title: 'KỸ THUẬT VỢT (TAY)',
      tagline: 'Phản xạ tay & tiếp xúc cầu',
      desc: 'Rèn luyện phản xạ đón cầu trên lưới, tạt cầu ngang mặt, vồ cầu và phòng thủ đập.',
      colorClass: 'card-tay',
      badge: 'Chuyên môn tay'
    },
    {
      mode: 'CHÂN',
      title: 'BỘ PHÁP DI CHUYỂN (CHÂN)',
      tagline: 'Bộ chân & nhịp bước trên sân',
      desc: 'Rèn luyện split-step, bước lunge dài lên lưới, bật lùi chéo góc và bước scissor kick.',
      colorClass: 'card-chan',
      badge: 'Bộ chân di chuyển'
    },
    {
      mode: 'TAY + CHÂN',
      title: 'PHỐI HỢP TAY & CHÂN',
      tagline: 'Đồng bộ động tác & bộ vị',
      desc: 'Đồng bộ nhịp tiếp đất chân thuận cùng thời điểm tiếp xúc cầu và nhanh chóng hồi tâm.',
      colorClass: 'card-tay-chan',
      badge: 'Phối hợp nhịp nhàng'
    },
    {
      mode: 'LÝ THUYẾT',
      title: 'LÝ THUYẾT CHIẾN THUẬT',
      tagline: 'Phân tích tình huống thi đấu',
      desc: 'Bộ câu hỏi xử lý tình huống thực tế: đánh đơn, đánh đôi, đọc ý đồ đối phương.',
      colorClass: 'card-theory',
      badge: 'Tư duy chiến thuật'
    },
    {
      mode: 'TOÀN BỘ',
      title: 'BÀI TẬP TỔNG HỢP',
      tagline: 'Mô phỏng trận đấu thực tế',
      desc: 'Trộn ngẫu nhiên kỹ thuật, bộ chân và phản xạ liên hoàn tạo áp lực như khi thi đấu.',
      colorClass: 'card-all',
      badge: 'Mô phỏng thi đấu'
    }
  ];

  return (
    <div className="home-dashboard animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <Activity size={16} className="text-emerald" />
            <span>HUẤN LUYỆN KỸ CHIẾN THUẬT CẦU LÔNG CHUYÊN NGHIỆP</span>
          </div>
          <h1 className="hero-title">
            CHƯƠNG TRÌNH HUẤN LUYỆN <span className="highlight-text">CẦU LÔNG</span>
          </h1>
          <p className="hero-desc">
            Chuẩn hóa bộ pháp di chuyển 9 ô sân, tối ưu tốc độ phản xạ và nâng cao tư duy chiến thuật thi đấu.
          </p>

          <div className="hero-cta-group">
            <button className="btn-hero-start" onClick={onQuickStart}>
              <Play size={20} fill="currentColor" />
              <span>BẮT ĐẦU LUYỆN TẬP</span>
            </button>

            {onOpenRecorder && (
              <button className="btn-hero-record" onClick={onOpenRecorder}>
                <Camera size={20} className="text-danger" />
                <span>QUAY VIDEO ĐỘNG TÁC</span>
              </button>
            )}
          </div>
        </div>

        {/* Lifetime Stats Quick Bar */}
        <div className="hero-stats-panel">
          <div className="stat-widget">
            <div className="stat-widget-icon icon-flame">
              <Flame size={24} />
            </div>
            <div className="stat-widget-info">
              <span className="stat-widget-val">{lifetime.streakDays} ngày</span>
              <span className="stat-widget-lbl">Chuỗi tập luyện</span>
            </div>
          </div>

          <div className="stat-widget">
            <div className="stat-widget-icon icon-trophy">
              <Trophy size={24} />
            </div>
            <div className="stat-widget-info">
              <span className="stat-widget-val">{lifetime.totalRoundsCompleted}</span>
              <span className="stat-widget-lbl">Lượt đã hoàn thành</span>
            </div>
          </div>

          <div className="stat-widget">
            <div className="stat-widget-icon icon-bolt">
              <Zap size={24} />
            </div>
            <div className="stat-widget-info">
              <span className="stat-widget-val">
                {lifetime.bestReactionTime > 0 ? `${lifetime.bestReactionTime}s` : '--'}
              </span>
              <span className="stat-widget-lbl">Kỷ lục phản xạ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Level Selector Bar (Nghiệp vụ Người Mới vs Nâng Cao) */}
      <div className="experience-level-strip animate-fade-in">
        <div className="exp-strip-left">
          <span className="exp-strip-label">CHẾ ĐỘ TẬP:</span>
          <div className="exp-tabs-group">
            <button 
              className={`exp-tab-btn ${expLevel === 'BEGINNER' ? 'is-active-beginner' : ''}`}
              onClick={() => handleToggleExpLevel('BEGINNER')}
            >
              <span className="exp-dot dot-green" />
              <span>NGƯỜI MỚI (PHONG TRÀO)</span>
            </button>
            <button 
              className={`exp-tab-btn ${expLevel === 'ADVANCED' ? 'is-active-advanced' : ''}`}
              onClick={() => handleToggleExpLevel('ADVANCED')}
            >
              <span className="exp-dot dot-red" />
              <span>NÂNG CAO (THI ĐẤU)</span>
            </button>
          </div>
        </div>
        <div className="exp-strip-right">
          {expLevel === 'BEGINNER' ? (
            <div className="exp-guide-hint">
              <span>🌱 <strong>Lời khuyên cho bạn:</strong> Tập trung chuẩn hóa nhịp chân Split-step & Lunge trước. Sử dụng tốc độ Cơ bản (4s - 5s) hoặc chế độ Tự do (phím CÁCH) để không bị vấp ngã.</span>
            </div>
          ) : (
            <div className="exp-guide-hint">
              <span>⚡ <strong>Thử thách thi đấu:</strong> Đẩy tốc độ lên 0.8s - 1.5s, bứt tốc 9 ô sân liên tục, tập trung đón đập cầu và ve chéo góc biến ảo.</span>
            </div>
          )}
        </div>
      </div>

      {/* Adaptive Quick Presets for Level */}
      <div className={`exp-presets-card ${expLevel === 'BEGINNER' ? 'preset-beginner' : 'preset-advanced'}`}>
        <div className="preset-card-header">
          <div className="preset-title-group">
            {expLevel === 'BEGINNER' ? (
              <>
                <Footprints size={18} className="text-emerald" />
                <h4>Gợi Ý Bắt Đầu Cho Người Mới</h4>
              </>
            ) : (
              <>
                <Zap size={18} className="text-amber" />
                <h4>Gói Luyện Tập Bứt Tốc Cho VĐV Nâng Cao</h4>
              </>
            )}
          </div>
          <span className="preset-badge">
            {expLevel === 'BEGINNER' ? 'Dễ làm quen • Tránh chấn thương' : 'Cường độ cao • Phản xạ thi đấu'}
          </span>
        </div>

        <div className="preset-buttons-grid">
          {expLevel === 'BEGINNER' ? (
            <>
              <button className="btn-preset-item" onClick={() => onSelectMode('CHÂN')}>
                <Footprints size={16} className="text-emerald" />
                <div>
                  <strong>Bộ pháp 4 góc sân cơ bản</strong>
                  <small>Split-step, nhịp đệm chân lunge chuẩn xác</small>
                </div>
              </button>
              <button className="btn-preset-item" onClick={() => onSelectMode('TAY')}>
                <Target size={16} className="text-cyan" />
                <div>
                  <strong>Cầm vợt & Kê lưới trái tay</strong>
                  <small>Cổ tay thả lỏng, mặt vợt 45 độ đón cầu</small>
                </div>
              </button>
              <button className="btn-preset-item" onClick={onQuickStart}>
                <Play size={16} className="text-lime" />
                <div>
                  <strong>Tập luyện phản xạ tự do</strong>
                  <small>Không áp lực thời gian, tự do làm chủ nhịp</small>
                </div>
              </button>
            </>
          ) : (
            <>
              <button className="btn-preset-item" onClick={() => onSelectMode('TAY + CHÂN')}>
                <Zap size={16} className="text-amber" />
                <div>
                  <strong>Phối hợp tay chân 9 ô tốc độ cao</strong>
                  <small>Tiếp đất cùng lúc chạm cầu, hồi tâm tức thì</small>
                </div>
              </button>
              <button className="btn-preset-item" onClick={() => onSelectMode('TOÀN BỘ')}>
                <Layers size={16} className="text-emerald" />
                <div>
                  <strong>Mô phỏng trận đấu liên hoàn</strong>
                  <small>Trộn ngẫu nhiên kỹ thuật, ép phản xạ dưới 1.5s</small>
                </div>
              </button>
              <button className="btn-preset-item" onClick={onQuickStart}>
                <Activity size={16} className="text-danger" />
                <div>
                  <strong>Thử thách phản xạ cực hạn 0.8s</strong>
                  <small>Đo thời gian phản xạ ms & xếp hạng Rank</small>
                </div>
              </button>
            </>
          )}
        </div>
      </div>

      {/* 100-Day Challenge Daily Assignment Hero */}
      <DailyChallengeCard
        progress={dailyProgress}
        onSelectWorkout={handleSelectWorkout}
        onCompleteDay={handleCompleteDay}
      />

      {/* Main Training Mode Cards */}
      <div className="modes-section">
        <div className="section-title-wrap">
          <h2 className="section-title">CHỌN NỘI DUNG TẬP LUYỆN</h2>
          <span className="section-count">5 CHẾ ĐỘ THỰC CHIẾN</span>
        </div>

        <div className="cards-grid">
          {trainingCards.map((c) => (
            <div
              key={c.mode}
              className={`mode-card ${c.colorClass}`}
              onClick={() => onSelectMode(c.mode)}
              role="button"
              tabIndex={0}
            >
              <div className="card-top-row">
                <div className="card-mode-icon-wrap">
                  {c.mode === 'TAY' && <Target size={22} className="text-cyan" />}
                  {c.mode === 'CHÂN' && <Footprints size={22} className="text-lime" />}
                  {c.mode === 'TAY + CHÂN' && <Zap size={22} className="text-amber" />}
                  {c.mode === 'LÝ THUYẾT' && <BookOpen size={22} className="text-purple" />}
                  {c.mode === 'TOÀN BỘ' && <Layers size={22} className="text-emerald" />}
                </div>
                <span className="card-badge">{c.badge}</span>
              </div>

              <h3 className="card-title">{c.title}</h3>
              <p className="card-tagline">{c.tagline}</p>
              <p className="card-desc">{c.desc}</p>

              <div className="card-footer">
                <span className="footer-action-text">Thiết lập & Bắt đầu</span>
                <div className="circle-arrow">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Course Section for Doubles Tactics */}
      <VideoSection initialLevel={expLevel === 'BEGINNER' ? 'Cơ bản' : 'ALL'} />

      {/* 9-Zone Court Concept Info Box */}
      <div className="court-explainer-banner">
        <div className="explainer-left">
          <Compass size={32} className="text-cyan" />
          <div>
            <h3>SƠ ĐỒ LƯỚI 9 VỊ TRÍ CHIẾN LƯỢC (3×3)</h3>
            <p>
              Hệ thống chia toàn bộ nửa sân thi đấu thành 9 ô phản xạ: 3 vị trí Lưới (1,2,3), 3 vị trí Trung tâm (4,5,6), và 3 vị trí Cuối sân (7,8,9).
            </p>
          </div>
        </div>
        <div className="explainer-right">
          <span className="court-badge">Chuẩn BWF</span>
        </div>
      </div>
    </div>
  );
};
