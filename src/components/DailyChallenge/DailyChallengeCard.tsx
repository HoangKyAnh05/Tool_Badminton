import React, { useState } from 'react';
import { DAILY_PLAN_100, DailyWorkout } from '../../data/dailyPlan100';
import { DailyChallengeProgress } from '../../services/storage';
import { 
  Trophy, 
  Flame, 
  CheckCircle2, 
  Play, 
  Calendar, 
  ListOrdered, 
  Sparkles, 
  RotateCcw,
  Zap,
  ArrowRight
} from 'lucide-react';
import { DailyRoadmapModal } from './DailyRoadmapModal';
import { TrainingMode } from '../../types';

interface DailyChallengeCardProps {
  progress: DailyChallengeProgress;
  onSelectWorkout: (workout: DailyWorkout) => void;
  onCompleteDay: (day: number) => void;
}

export const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({
  progress,
  onSelectWorkout,
  onCompleteDay
}) => {
  const [isRoadmapOpen, setIsRoadmapOpen] = useState<boolean>(false);

  // Current active workout
  const currentWorkout: DailyWorkout = DAILY_PLAN_100.find(w => w.day === progress.currentDay) || DAILY_PLAN_100[0];
  const isTodayCompleted = progress.completedDays.includes(currentWorkout.day);
  const percent = Math.round((progress.completedDays.length / 100) * 100);

  return (
    <>
      <div className="daily-challenge-card animate-fade-in">
        <div className="daily-card-inner">
          {/* Top Bar: Day Badge + Streak */}
          <div className="daily-card-top">
            <div className="daily-tag-group">
              <div className="daily-pill-badge">
                <Calendar size={15} className="text-cyan" />
                <span>BÀI TẬP HÔM NAY: <strong>NGÀY {currentWorkout.day}/100</strong></span>
              </div>
              <span className="daily-phase-badge">{currentWorkout.phaseName.split(':')[0]}</span>
            </div>

            <div className="daily-stats-pills">
              <div className="stat-pill streak-pill" title="Chuỗi ngày luyện tập liên tiếp">
                <Flame size={15} className="text-orange animate-pulse" />
                <span>Streak: <strong>{progress.streak} ngày</strong></span>
              </div>
              <div className="stat-pill count-pill" title="Tổng số ngày đã hoàn thành">
                <Trophy size={14} className="text-lime" />
                <span><strong>{progress.completedDays.length}/100</strong></span>
              </div>
            </div>
          </div>

          {/* Main Title & Description */}
          <div className="daily-card-content">
            <div className="daily-title-row">
              <h2 className="daily-workout-title">
                {currentWorkout.title}
              </h2>
            </div>
            <p className="daily-workout-desc">
              {currentWorkout.description}
            </p>
          </div>

          {/* Progress bar */}
          <div className="daily-card-progress">
            <div className="progress-labels">
              <span>Tiến độ 100 ngày:</span>
              <span><strong>{percent}%</strong> ({progress.completedDays.length}/100 ngày)</span>
            </div>
            <div className="daily-bar-track">
              <div className="daily-bar-fill" style={{ width: `${percent}%` }} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="daily-card-actions">
            <button 
              className="btn-daily-action primary"
              onClick={() => onSelectWorkout(currentWorkout)}
            >
              <Play size={16} fill="#050c14" />
              <span>Vào Luyện Tập Ngay</span>
            </button>

            {!isTodayCompleted ? (
              <button 
                className="btn-daily-action success"
                onClick={() => onCompleteDay(currentWorkout.day)}
                title="Bấm để ghi nhận hoàn thành bài tập của ngày hôm nay và mở khóa ngày tiếp theo"
              >
                <CheckCircle2 size={16} />
                <span>Đánh Dấu Đã Tập Xong</span>
              </button>
            ) : (
              <div className="daily-completed-tag animate-pop">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>Đã Hoàn Thành Bài Ngày {currentWorkout.day}!</span>
              </div>
            )}

            <button 
              className="btn-daily-action outline"
              onClick={() => setIsRoadmapOpen(true)}
              title="Xem danh sách toàn bộ 100 ngày"
            >
              <ListOrdered size={16} />
              <span>Lộ Trình 100 Ngày</span>
            </button>
          </div>
        </div>
      </div>

      {/* 100-Day Roadmap Modal */}
      <DailyRoadmapModal
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
        progress={progress}
        onSelectWorkout={onSelectWorkout}
        onCompleteDay={onCompleteDay}
      />
    </>
  );
};
