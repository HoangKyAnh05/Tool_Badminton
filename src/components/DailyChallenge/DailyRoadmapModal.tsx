import React, { useState } from 'react';
import { DAILY_PLAN_100, DailyWorkout } from '../../data/dailyPlan100';
import { DailyChallengeProgress } from '../../services/storage';
import { 
  X, 
  CheckCircle2, 
  Lock, 
  Play, 
  Trophy, 
  Flame, 
  Target, 
  Sparkles, 
  Calendar,
  Zap,
  Activity
} from 'lucide-react';
import { TrainingMode } from '../../types';

interface DailyRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: DailyChallengeProgress;
  onSelectWorkout: (workout: DailyWorkout) => void;
  onCompleteDay: (day: number) => void;
}

export const DailyRoadmapModal: React.FC<DailyRoadmapModalProps> = ({
  isOpen,
  onClose,
  progress,
  onSelectWorkout,
  onCompleteDay
}) => {
  const [selectedPhase, setSelectedPhase] = useState<number>(0); // 0 = all
  const [activeDayDetail, setActiveDayDetail] = useState<DailyWorkout | null>(null);

  if (!isOpen) return null;

  const filteredList = selectedPhase === 0
    ? DAILY_PLAN_100
    : DAILY_PLAN_100.filter((w) => w.phaseNumber === selectedPhase);

  const percent = Math.round((progress.completedDays.length / 100) * 100);

  const getCategoryBadgeColor = (cat: DailyWorkout['category']) => {
    switch (cat) {
      case 'SMASH': return 'cat-smash';
      case 'FOOTWORK': return 'cat-footwork';
      case 'SHADOW': return 'cat-shadow';
      case 'CLEAR': return 'cat-clear';
      case 'DRIVE': return 'cat-drive';
      case 'NET': return 'cat-net';
      case 'SERVE': return 'cat-serve';
      case 'TEST': return 'cat-test';
      case 'REVIEW': return 'cat-review';
      default: return '';
    }
  };

  return (
    <div className="roadmap-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="roadmap-modal-content animate-pop" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="roadmap-header">
          <div className="roadmap-title-wrap">
            <div className="roadmap-trophy-icon">
              <Trophy size={26} className="text-lime" />
            </div>
            <div>
              <h2 className="roadmap-title">
                LỘ TRÌNH <span className="highlight-text">100 NGÀY</span> LUYỆN TẬP
              </h2>
              <p className="roadmap-sub">Từ Newbie đến Vận động viên phản xạ toàn diện</p>
            </div>
          </div>

          <button className="roadmap-close-btn" onClick={onClose} aria-label="Đóng">
            <X size={20} />
          </button>
        </div>

        {/* Global Progress Bar Bar */}
        <div className="roadmap-progress-summary">
          <div className="progress-stats-row">
            <div className="prog-stat">
              <Calendar size={16} className="text-cyan" />
              <span>Đang ở: <strong>Ngày {progress.currentDay}/100</strong></span>
            </div>
            <div className="prog-stat">
              <CheckCircle2 size={16} className="text-emerald" />
              <span>Đã hoàn thành: <strong>{progress.completedDays.length}/100 ({percent}%)</strong></span>
            </div>
            <div className="prog-stat">
              <Flame size={16} className="text-orange" />
              <span>Chuỗi tập: <strong>{progress.streak} ngày liên tiếp</strong></span>
            </div>
          </div>

          <div className="roadmap-bar-track">
            <div 
              className="roadmap-bar-fill" 
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Phase Filter Tabs */}
        <div className="roadmap-phase-tabs">
          <button 
            className={`phase-tab-btn ${selectedPhase === 0 ? 'is-active' : ''}`}
            onClick={() => setSelectedPhase(0)}
          >
            Tất cả (100 ngày)
          </button>
          <button 
            className={`phase-tab-btn ${selectedPhase === 1 ? 'is-active' : ''}`}
            onClick={() => setSelectedPhase(1)}
          >
            Chặng 1 (1–20)
          </button>
          <button 
            className={`phase-tab-btn ${selectedPhase === 2 ? 'is-active' : ''}`}
            onClick={() => setSelectedPhase(2)}
          >
            Chặng 2 (21–40)
          </button>
          <button 
            className={`phase-tab-btn ${selectedPhase === 3 ? 'is-active' : ''}`}
            onClick={() => setSelectedPhase(3)}
          >
            Chặng 3 (41–60)
          </button>
          <button 
            className={`phase-tab-btn ${selectedPhase === 4 ? 'is-active' : ''}`}
            onClick={() => setSelectedPhase(4)}
          >
            Chặng 4 (61–80)
          </button>
          <button 
            className={`phase-tab-btn ${selectedPhase === 5 ? 'is-active' : ''}`}
            onClick={() => setSelectedPhase(5)}
          >
            Chặng 5 (81–100)
          </button>
        </div>

        {/* 100 Days Grid List */}
        <div className="roadmap-grid-scroll">
          <div className="roadmap-items-grid">
            {filteredList.map((item) => {
              const isCompleted = progress.completedDays.includes(item.day);
              const isCurrent = item.day === progress.currentDay && !isCompleted;
              const isLocked = item.day > progress.currentDay && !isCompleted;

              let cardStateClass = 'is-locked';
              if (isCompleted) cardStateClass = 'is-completed';
              else if (isCurrent) cardStateClass = 'is-current';

              return (
                <div 
                  key={item.day}
                  className={`roadmap-day-card ${cardStateClass} ${item.isSpecialTest ? 'is-test-card' : ''}`}
                  onClick={() => setActiveDayDetail(item)}
                >
                  <div className="card-top-row">
                    <span className="card-day-num">
                      {isCompleted ? (
                        <CheckCircle2 size={16} className="text-emerald check-anim" />
                      ) : isLocked ? (
                        <Lock size={14} className="text-muted" />
                      ) : (
                        <Sparkles size={14} className="text-cyan animate-pulse" />
                      )}
                      <span>NGÀY {item.day}</span>
                    </span>

                    <span className={`card-cat-badge ${getCategoryBadgeColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>

                  <h3 className="card-workout-title">{item.title}</h3>

                  <div className="card-bottom-row">
                    <span className="card-phase-tag">Chặng {item.phaseNumber}</span>

                    {isCurrent ? (
                      <span className="badge-status current">🎯 Hôm nay</span>
                    ) : isCompleted ? (
                      <span className="badge-status completed">✅ Xong</span>
                    ) : (
                      <span className="badge-status locked">🔒 Khóa</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Quick Inspector Drawer */}
        {activeDayDetail && (
          <div className="workout-detail-backdrop" onClick={() => setActiveDayDetail(null)}>
            <div className="workout-detail-card animate-pop" onClick={(e) => e.stopPropagation()}>
              <div className="detail-card-header">
                <div className="detail-day-badge">
                  <Calendar size={16} />
                  <span>BÀI TẬP NGÀY {activeDayDetail.day}</span>
                </div>
                <button className="detail-close-btn" onClick={() => setActiveDayDetail(null)}>
                  <X size={16} />
                </button>
              </div>

              <div className="detail-card-body">
                <div className="detail-tags-line">
                  <span className={`card-cat-badge ${getCategoryBadgeColor(activeDayDetail.category)}`}>
                    {activeDayDetail.category}
                  </span>
                  <span className="detail-phase-name">{activeDayDetail.phaseName}</span>
                </div>

                <h3 className="detail-workout-title">{activeDayDetail.title}</h3>
                <p className="detail-workout-desc">{activeDayDetail.description}</p>

                <div className="detail-recommend-box">
                  <Zap size={18} className="text-cyan" />
                  <div>
                    <strong>Chế độ phù hợp: </strong>
                    <span className="text-lime">{activeDayDetail.suggestedMode}</span>
                  </div>
                </div>
              </div>

              <div className="detail-card-actions">
                <button 
                  className="btn-start-workout-now"
                  onClick={() => {
                    onSelectWorkout(activeDayDetail);
                    onClose();
                  }}
                >
                  <Play size={16} fill="#050c14" />
                  <span>Vào Luyện Tập Ngay</span>
                </button>

                {!progress.completedDays.includes(activeDayDetail.day) && (
                  <button 
                    className="btn-mark-day-done"
                    onClick={() => {
                      onCompleteDay(activeDayDetail.day);
                      setActiveDayDetail(null);
                    }}
                  >
                    <CheckCircle2 size={16} />
                    <span>Đánh Dấu Đã Tập Xong</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
