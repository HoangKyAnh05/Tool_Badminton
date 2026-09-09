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

  useEffect(() => {
    setLifetime(storageService.loadLifetimeStats());
    setDailyProgress(storageService.loadDailyProgress());
  }, []);

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
      <VideoSection />

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
