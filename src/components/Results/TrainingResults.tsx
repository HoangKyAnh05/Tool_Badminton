import React, { useState } from 'react';
import { TrainingResultStats } from '../../types';
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  History, 
  CheckCircle, 
  Zap, 
  Clock, 
  Target, 
  Award,
  BookOpen,
  Calendar,
  Flame,
  Play,
  ListOrdered,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { storageService, DailyChallengeProgress } from '../../services/storage';
import { DAILY_PLAN_100, DailyWorkout } from '../../data/dailyPlan100';
import { DailyRoadmapModal } from '../DailyChallenge/DailyRoadmapModal';

interface TrainingResultsProps {
  stats: TrainingResultStats;
  onRestart: () => void;
  onHome: () => void;
  onViewHistory: () => void;
  onStartWorkout?: (workout: DailyWorkout) => void;
}

export const TrainingResults: React.FC<TrainingResultsProps> = ({
  stats,
  onRestart,
  onHome,
  onViewHistory,
  onStartWorkout
}) => {
  const [dailyProgress, setDailyProgress] = useState<DailyChallengeProgress>(() => storageService.loadDailyProgress());
  const [isRoadmapOpen, setIsRoadmapOpen] = useState<boolean>(false);

  // Current day and homework calculation
  const todayWorkout = DAILY_PLAN_100.find(w => w.day === dailyProgress.currentDay) || DAILY_PLAN_100[0];
  const isTodayCompleted = dailyProgress.completedDays.includes(todayWorkout.day);

  // Homework for the next day
  const nextDayNumber = isTodayCompleted 
    ? Math.min(100, todayWorkout.day + 1)
    : Math.min(100, todayWorkout.day);
  const homeworkWorkout = DAILY_PLAN_100.find(w => w.day === (isTodayCompleted ? Math.min(100, todayWorkout.day + 1) : todayWorkout.day + 1)) || DAILY_PLAN_100[Math.min(99, todayWorkout.day)];

  const handleCompleteCurrentDay = () => {
    const updated = storageService.completeDayWorkout(todayWorkout.day);
    setDailyProgress(updated);
  };

  const percent = Math.round((dailyProgress.completedDays.length / 100) * 100);

  return (
    <div className="results-container animate-fade-in">
      <div className="results-card">
        {/* Trophy banner */}
        <div className="results-banner">
          <div className="trophy-icon-wrapper">
            <Trophy size={48} className="trophy-gold" />
          </div>
          <h1 className="results-title">HOÀN THÀNH BÀI TẬP!</h1>
          <p className="results-subtitle">
            Chế độ <strong>{stats.mode}</strong> • {stats.date}
          </p>
        </div>

        {/* Primary 4 Metric Cards */}
        <div className="metrics-grid">
          <div className="metric-box">
            <div className="metric-icon-row">
              <Target size={20} className="icon-cyan" />
              <span>ĐỘ CHÍNH XÁC</span>
            </div>
            <div className="metric-value text-cyan">{stats.accuracy}%</div>
            <div className="metric-sub">
              {stats.theoryTotalCount > 0 
                ? `Lý thuyết: ${stats.theoryCorrectCount}/${stats.theoryTotalCount}`
                : '100% Phản xạ hoàn thành'}
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-icon-row">
              <Zap size={20} className="icon-lime" />
              <span>PHẢN XẠ NHANH NHẤT</span>
            </div>
            <div className="metric-value text-lime">
              {stats.bestResponseTime > 0 ? `${stats.bestResponseTime}s` : 'N/A'}
            </div>
            <div className="metric-sub">Kỷ lục của lượt tập</div>
          </div>

          <div className="metric-box">
            <div className="metric-icon-row">
              <Clock size={20} className="icon-amber" />
              <span>TỐC ĐỘ TRUNG BÌNH</span>
            </div>
            <div className="metric-value text-amber">
              {stats.averageResponseTime > 0 ? `${stats.averageResponseTime}s` : '1.5s'}
            </div>
            <div className="metric-sub">Thời gian trung bình</div>
          </div>

          <div className="metric-box">
            <div className="metric-icon-row">
              <CheckCircle size={20} className="icon-purple" />
              <span>TỔNG SỐ LƯỢT</span>
            </div>
            <div className="metric-value text-purple">
              {stats.completedRounds} / {stats.totalRounds}
            </div>
            <div className="metric-sub">Số lượt đã thi đấu</div>
          </div>
        </div>

        {/* Mode breakdown */}
        <div className="breakdown-section">
          <h3 className="section-subtitle">PHÂN BỔ CÁC CHẾ ĐỘ</h3>
          <div className="breakdown-cards-row">
            <div className="breakdown-pill">
              <span className="pill-dot dot-tay" />
              <span className="pill-name">TAY:</span>
              <strong>{stats.modeBreakdown.tay} lượt</strong>
            </div>
            <div className="breakdown-pill">
              <span className="pill-dot dot-chan" />
              <span className="pill-name">CHÂN:</span>
              <strong>{stats.modeBreakdown.chan} lượt</strong>
            </div>
            <div className="breakdown-pill">
              <span className="pill-dot dot-combined" />
              <span className="pill-name">TAY + CHÂN:</span>
              <strong>{stats.modeBreakdown.tayChan} lượt</strong>
            </div>
            <div className="breakdown-pill">
              <span className="pill-dot dot-theory" />
              <span className="pill-name">LÝ THUYẾT:</span>
              <strong>{stats.modeBreakdown.lyThuyet} lượt</strong>
            </div>
          </div>
        </div>

        {/* ==========================================================================
            HOMEWORK ASSIGNMENT / GIAO BÀI TẬP VỀ NHÀ (THỬ THÁCH 100 NGÀY)
            ========================================================================== */}
        <div className="results-homework-card animate-pop">
          <div className="homework-card-header">
            <div className="homework-title-group">
              <div className="homework-badge-icon">
                <BookOpen size={20} className="text-cyan" />
              </div>
              <div>
                <span className="homework-label-top">NHIỆM VỤ TIẾP THEO</span>
                <h3 className="homework-main-title">
                  {isTodayCompleted 
                    ? `BÀI TẬP VỀ NHÀ GIAO CHO BẠN (NGÀY ${homeworkWorkout.day}/100)`
                    : `BÀI TẬP HÔM NAY (NGÀY ${todayWorkout.day}/100)`}
                </h3>
              </div>
            </div>

            <div className="homework-meta-pills">
              <span className="hw-pill streak-pill">
                <Flame size={14} className="text-orange" />
                <span>Streak: <strong>{dailyProgress.streak} ngày</strong></span>
              </span>
              <span className="hw-pill count-pill">
                <Trophy size={14} className="text-lime" />
                <span><strong>{dailyProgress.completedDays.length}/100 ngày ({percent}%)</strong></span>
              </span>
            </div>
          </div>

          <div className="homework-card-body">
            {/* Show current status / confirmation */}
            {!isTodayCompleted ? (
              <div className="homework-pending-box">
                <p className="hw-prompt-text">
                  Bạn vừa hoàn thành xuất sắc lượt tập! Hãy xác nhận hoàn thành bài tập của <strong>Ngày {todayWorkout.day}</strong> để nhận bài tập về nhà ngày tiếp theo:
                </p>
                <div className="hw-current-task">
                  <div className="hw-task-num">Bài hôm nay:</div>
                  <div className="hw-task-title">{todayWorkout.title}</div>
                </div>
                <button 
                  className="btn-claim-homework"
                  onClick={handleCompleteCurrentDay}
                >
                  <CheckCircle2 size={18} />
                  <span>XÁC NHẬN ĐÃ TẬP XONG NGÀY {todayWorkout.day} & NHẬN BÀI VỀ NHÀ</span>
                </button>
              </div>
            ) : (
              <div className="homework-assigned-box">
                <div className="assigned-status-banner">
                  <CheckCircle2 size={18} className="text-emerald" />
                  <span>Đã tích xanh Ngày {todayWorkout.day}! Dưới đây là bài tập về nhà được giao:</span>
                </div>

                <div className="assigned-workout-detail">
                  <div className="assigned-header-row">
                    <span className="assigned-day-pill">NGÀY {homeworkWorkout.day}</span>
                    <span className="assigned-cat-pill">{homeworkWorkout.category}</span>
                    <span className="assigned-phase-tag">{homeworkWorkout.phaseName}</span>
                  </div>

                  <h4 className="assigned-workout-title">
                    {homeworkWorkout.title}
                  </h4>
                  <p className="assigned-workout-desc">
                    💡 <strong>Hướng dẫn HLV:</strong> {homeworkWorkout.description}
                  </p>

                  <div className="assigned-suggest-bar">
                    <Zap size={16} className="text-cyan" />
                    <span>Chế độ luyện tập phù hợp: <strong>{homeworkWorkout.suggestedMode}</strong></span>
                  </div>
                </div>

                <div className="assigned-actions-row">
                  {onStartWorkout && (
                    <button 
                      className="btn-practice-homework-now"
                      onClick={() => onStartWorkout(homeworkWorkout)}
                    >
                      <Play size={16} fill="#050c14" />
                      <span>TẬP LUÔN BÀI NGÀY {homeworkWorkout.day}</span>
                    </button>
                  )}
                  <button 
                    className="btn-view-roadmap"
                    onClick={() => setIsRoadmapOpen(true)}
                  >
                    <ListOrdered size={16} />
                    <span>XEM LỘ TRÌNH 100 NGÀY</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="results-actions-row">
          <button className="btn-action primary" onClick={onRestart}>
            <RotateCcw size={18} />
            <span>TẬP LẠI</span>
          </button>
          <button className="btn-action secondary" onClick={onHome}>
            <Home size={18} />
            <span>VỀ TRANG CHỦ</span>
          </button>
          <button className="btn-action tertiary" onClick={onViewHistory}>
            <History size={18} />
            <span>LỊCH SỬ</span>
          </button>
          <button className="btn-action roadmap-btn" onClick={() => setIsRoadmapOpen(true)}>
            <ListOrdered size={18} />
            <span>100 NGÀY</span>
          </button>
        </div>
      </div>

      {/* 100-Day Roadmap Modal */}
      <DailyRoadmapModal
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
        progress={dailyProgress}
        onSelectWorkout={(w) => {
          setIsRoadmapOpen(false);
          onStartWorkout?.(w);
        }}
        onCompleteDay={(day) => {
          const updated = storageService.completeDayWorkout(day);
          setDailyProgress(updated);
        }}
      />
    </div>
  );
};
