import React from 'react';
import { TrainingResultStats } from '../../types';
import { Trophy, RotateCcw, Home, History, CheckCircle, Zap, Clock, Target, Award } from 'lucide-react';

interface TrainingResultsProps {
  stats: TrainingResultStats;
  onRestart: () => void;
  onHome: () => void;
  onViewHistory: () => void;
}

export const TrainingResults: React.FC<TrainingResultsProps> = ({
  stats,
  onRestart,
  onHome,
  onViewHistory
}) => {
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
        </div>
      </div>
    </div>
  );
};
