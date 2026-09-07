import React, { useState, useEffect } from 'react';
import { TrainingResultStats } from '../../types';
import { storageService } from '../../services/storage';
import { X, Trash2, Calendar, Target, Clock, Zap, Award } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose }) => {
  const [historyList, setHistoryList] = useState<TrainingResultStats[]>([]);

  useEffect(() => {
    if (isOpen) {
      setHistoryList(storageService.loadHistory());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClear = () => {
    if (window.confirm('Bạn có chắc muốn xóa toàn bộ lịch sử tập luyện không?')) {
      storageService.clearHistory();
      setHistoryList([]);
    }
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="modal-content history-modal animate-pop" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-title">
            <Calendar size={22} className="text-cyan" />
            <h2>LỊCH SỬ TẬP LUYỆN</h2>
          </div>
          <div className="header-actions">
            {historyList.length > 0 && (
              <button className="btn-icon-clear" onClick={handleClear} title="Xóa lịch sử">
                <Trash2 size={16} />
                <span>Xóa hết</span>
              </button>
            )}
            <button className="btn-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="history-table-wrapper">
          {historyList.length === 0 ? (
            <div className="empty-history-state">
              <Award size={48} className="empty-icon" />
              <p>Chưa có dữ liệu bài tập nào được lưu.</p>
              <span>Hãy hoàn thành một bài tập để lưu lại thành tích của bạn!</span>
            </div>
          ) : (
            <div className="history-list">
              {historyList.map((item) => (
                <div key={item.id} className="history-item-row">
                  <div className="item-main-col">
                    <div className="item-date">{item.date}</div>
                    <div className="item-mode-badge">{item.mode}</div>
                  </div>

                  <div className="item-stats-group">
                    <div className="stat-chip">
                      <span className="chip-label">Lượt:</span>
                      <strong>{item.completedRounds}/{item.totalRounds}</strong>
                    </div>

                    <div className="stat-chip">
                      <Target size={14} className="text-cyan" />
                      <strong>{item.accuracy}%</strong>
                    </div>

                    <div className="stat-chip">
                      <Clock size={14} className="text-amber" />
                      <span>{item.averageResponseTime}s</span>
                    </div>

                    {item.bestResponseTime > 0 && (
                      <div className="stat-chip highlight">
                        <Zap size={14} className="text-lime" />
                        <strong>{item.bestResponseTime}s</strong>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
