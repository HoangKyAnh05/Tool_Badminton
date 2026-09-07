import React, { useState, useEffect } from 'react';
import { TrainingMode } from '../../types';
import { storageService, LifetimeStats } from '../../services/storage';
import { 
  Flame, 
  Trophy, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Play, 
  CheckCircle2 
} from 'lucide-react';

interface HomeDashboardProps {
  onSelectMode: (mode: TrainingMode) => void;
  onQuickStart: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onSelectMode,
  onQuickStart
}) => {
  const [lifetime, setLifetime] = useState<LifetimeStats>(() => storageService.loadLifetimeStats());

  useEffect(() => {
    setLifetime(storageService.loadLifetimeStats());
  }, []);

  const trainingCards: {
    mode: TrainingMode;
    emoji: string;
    title: string;
    tagline: string;
    desc: string;
    colorClass: string;
    badge: string;
  }[] = [
    {
      mode: 'TAY',
      emoji: '✋',
      title: 'TAY (VỢT & THÂN TRÊN)',
      tagline: 'Luyện phản xạ tay chớp nhoáng',
      desc: 'Phản ứng với các đường cầu sát lưới, tạt cầu, vồ cầu và phòng thủ đập cầu.',
      colorClass: 'card-tay',
      badge: 'Cơ bản & Nâng cao'
    },
    {
      mode: 'CHÂN',
      emoji: '🦶',
      title: 'CHÂN (FOOTWORK)',
      tagline: 'Luyện bộ pháp & bước lướt',
      desc: 'Bứt tốc split-step, bước lunge lên lưới, chạy lùi chéo góc và scissor kick.',
      colorClass: 'card-chan',
      badge: 'Bộ pháp đỉnh cao'
    },
    {
      mode: 'TAY + CHÂN',
      emoji: '⚡',
      title: 'TAY + CHÂN (PHỐI HỢP)',
      tagline: 'Đồng bộ động tác & bộ chân',
      desc: 'Kết hợp nhịp nhàng chân chạm đất đồng thời tay vung vợt và tức tốc hồi tâm.',
      colorClass: 'card-tay-chan',
      badge: 'Toàn diện thực chiến'
    },
    {
      mode: 'LÝ THUYẾT',
      emoji: '🧠',
      title: 'LÝ THUYẾT CHIẾN THUẬT',
      tagline: 'Tư duy chiến thuật 4 phương án',
      desc: '20+ tình huống thực tế: đánh đơn, đánh đôi, đọc hướng cầu, khắc chế điểm mù.',
      colorClass: 'card-theory',
      badge: 'Tư duy HLV'
    },
    {
      mode: 'TOÀN BỘ',
      emoji: '🌐',
      title: 'TOÀN BỘ (TỔNG HỢP)',
      tagline: 'Trộn ngẫu nhiên liên tục cả 4 chế độ',
      desc: 'Mô phỏng áp lực trận đấu thực thụ: vừa bung sức di chuyển vừa vận dụng trí óc.',
      colorClass: 'card-all',
      badge: 'Thử thách tối thượng'
    }
  ];

  return (
    <div className="home-dashboard animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <Sparkles size={16} className="text-lime" />
            <span>HỆ THỐNG HUẤN LUYỆN CẦU LÔNG CHUYÊN NGHIỆP</span>
          </div>
          <h1 className="hero-title">
            BẠN MUỐN LUYỆN TẬP GÌ <span className="highlight-text">HÔM NAY?</span>
          </h1>
          <p className="hero-desc">
            Nâng cao tốc độ phản ứng, chuẩn hóa bộ chân di chuyển 9 ô và tôi luyện tư duy chiến thuật trên sân đấu.
          </p>

          <div className="hero-cta-group">
            <button className="btn-hero-start" onClick={onQuickStart}>
              <Play size={20} fill="currentColor" />
              <span>VÀO PHÒNG TẬP NGAY</span>
            </button>
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
                <span className="card-emoji">{c.emoji}</span>
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
