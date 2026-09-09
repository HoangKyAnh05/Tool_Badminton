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
  CheckCircle2, 
  Camera,
  MapPin,
  AlertTriangle,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { storageService, DailyChallengeProgress } from '../../services/storage';
import { DAILY_PLAN_100, DailyWorkout } from '../../data/dailyPlan100';
import { DailyRoadmapModal } from '../DailyChallenge/DailyRoadmapModal';
import { VideoRecorderModal } from '../Recorder/VideoRecorderModal';

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
  const [isRecorderOpen, setIsRecorderOpen] = useState<boolean>(false);

  // Current day and homework calculation
  const todayWorkout = DAILY_PLAN_100.find(w => w.day === dailyProgress.currentDay) || DAILY_PLAN_100[0];
  const isTodayCompleted = dailyProgress.completedDays.includes(todayWorkout.day);

  // Homework for the next day
  const homeworkWorkout = DAILY_PLAN_100.find(w => w.day === (isTodayCompleted ? Math.min(100, todayWorkout.day + 1) : todayWorkout.day + 1)) || DAILY_PLAN_100[Math.min(99, todayWorkout.day)];

  const handleCompleteCurrentDay = () => {
    const updated = storageService.completeDayWorkout(todayWorkout.day);
    setDailyProgress(updated);
  };

  const percent = Math.round((dailyProgress.completedDays.length / 100) * 100);

  // Weakness Analysis
  const zoneStats = stats.zoneStats || {};
  const activeZoneEntries = Object.entries(zoneStats)
    .map(([id, st]) => ({ id: Number(id), ...st }))
    .sort((a, b) => b.avgTime - a.avgTime); // slowest first

  const slowestZone = activeZoneEntries.length > 0 ? activeZoneEntries[0] : null;
  const fastestZone = activeZoneEntries.length > 0 ? activeZoneEntries[activeZoneEntries.length - 1] : null;

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
            WEAKNESS ANALYSIS REPORT & 3x3 COURT HEATMAP
            ========================================================================== */}
        {activeZoneEntries.length > 0 && (
          <div className="weakness-analysis-card animate-fade-in">
            <div className="weakness-card-header">
              <div className="flex-center-gap">
                <Target size={20} className="text-cyan" />
                <h3>BÁO CÁO PHÂN TÍCH ĐIỂM YẾU & TỐC ĐỘ 9 Ô SÂN</h3>
              </div>
              <span className="weakness-badge">HLV AI Đánh Giá</span>
            </div>

            <div className="weakness-content-grid">
              {/* Left: 3x3 Heatmap */}
              <div className="court-heatmap-wrapper">
                <div className="heatmap-label">Bản đồ nhiệt phản xạ theo từng góc sân (ms):</div>
                <div className="results-heatmap-grid">
                  {[
                    { id: 1, name: 'Lưới Trái' },
                    { id: 2, name: 'Lưới Giữa' },
                    { id: 3, name: 'Lưới Phải' },
                    { id: 4, name: 'TT Trái' },
                    { id: 5, name: 'Tâm Sân' },
                    { id: 6, name: 'TT Phải' },
                    { id: 7, name: 'Đáy Trái' },
                    { id: 8, name: 'Đáy Giữa' },
                    { id: 9, name: 'Đáy Phải' }
                  ].map(pos => {
                    const st = zoneStats[pos.id];
                    const isSlowest = slowestZone && slowestZone.id === pos.id && activeZoneEntries.length > 1;
                    const isFastest = fastestZone && fastestZone.id === pos.id && activeZoneEntries.length > 1;
                    return (
                      <div 
                        key={pos.id} 
                        className={`heatmap-cell ${isSlowest ? 'is-weakness' : isFastest ? 'is-strength' : st ? 'is-trained' : 'is-empty'}`}
                      >
                        <div className="heat-cell-top">
                          <span className="heat-cell-id">{pos.id}</span>
                          <span className="heat-cell-name">{pos.name}</span>
                        </div>
                        {st ? (
                          <div className="heat-cell-time">{st.avgTime}s</div>
                        ) : (
                          <div className="heat-cell-time text-muted">--</div>
                        )}
                        {isSlowest && <span className="heat-tag-weak">⚠️ Chậm nhất</span>}
                        {isFastest && <span className="heat-tag-strong">⚡ Nhanh nhất</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: AI Coaching Advice */}
              <div className="weakness-advice-box">
                {slowestZone && activeZoneEntries.length > 1 ? (
                  <div className="advice-inner-wrap">
                    <div className="advice-header-row text-danger">
                      <AlertTriangle size={18} />
                      <strong>CẢNH BÁO ĐIỂM YẾU: Ô SỐ {slowestZone.id}</strong>
                    </div>
                    <p className="advice-text">
                      Tốc độ phản xạ tại <strong>Ô {slowestZone.id}</strong> trung bình là <strong>{slowestZone.avgTime}s</strong> (chậm hơn {fastestZone ? Math.round(((slowestZone.avgTime - fastestZone.avgTime) / fastestZone.avgTime) * 100) : 30}% so với góc tốt nhất của bạn).
                    </p>
                    <div className="advice-tip-box">
                      💡 <strong>Lời khuyên từ Huấn Luyện Viên:</strong> 
                      {slowestZone.id === 7 ? (
                        <span> Bạn bị chậm ở góc Ve trái tay cuối sân. Hãy vào phần <strong>Cấu hình</strong>, chọn <strong>Vùng sân tập trung: Chỉ Ô 7</strong> và luyện thêm 15 lượt bước lùi chéo chân.</span>
                      ) : slowestZone.id <= 3 ? (
                        <span> Bạn tiếp cận lưới chưa đủ nhanh. Hãy chuẩn bị sẵn mặt vợt trước ngực và bật split-step sớm hơn nửa nhịp.</span>
                      ) : (
                        <span> Hãy tập trung trọng tâm thấp ở giữa sân để bật lùi đón cầu góc này nhanh hơn.</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="advice-good-box">
                    <CheckCircle2 size={32} className="text-emerald" />
                    <div>
                      <strong>Tốc độ phản xạ rất đồng đều!</strong>
                      <p>Bạn duy trì phản xạ tốt và cân bằng ở tất cả các vị trí góc sân trong hiệp này.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

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
                    className="btn-record-homework"
                    onClick={() => setIsRecorderOpen(true)}
                  >
                    <Camera size={16} />
                    <span>QUAY VIDEO BÀI TẬP</span>
                  </button>
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
          <button className="btn-action record-btn" onClick={() => setIsRecorderOpen(true)}>
            <Camera size={18} className="text-danger" />
            <span>QUAY VIDEO</span>
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

      {/* Dedicated Video Recorder Modal (Auto-download to device) */}
      <VideoRecorderModal
        isOpen={isRecorderOpen}
        onClose={() => setIsRecorderOpen(false)}
      />
    </div>
  );
};
