import React, { useState, useEffect } from 'react';
import { TACTICS_VIDEOS } from '../../data/videos';
import { TacticsVideo } from '../../types';
import { storageService } from '../../services/storage';
import { VideoPlayerModal } from './VideoPlayerModal';
import { 
  Tv, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const VideoSection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<TacticsVideo | null>(null);
  const [watchedIds, setWatchedIds] = useState<string[]>([]);

  const refreshWatchedStatus = () => {
    setWatchedIds(storageService.loadWatchedVideos());
  };

  useEffect(() => {
    refreshWatchedStatus();
  }, []);

  const totalVideos = TACTICS_VIDEOS.length;
  const completedCount = TACTICS_VIDEOS.filter(v => watchedIds.includes(v.id)).length;
  const percentCompleted = totalVideos > 0 ? Math.round((completedCount / totalVideos) * 100) : 0;

  return (
    <section className="video-section-container">
      {/* Section Header */}
      <div className="section-title-wrap video-section-header">
        <div className="section-header-left">
          <div className="video-eyebrow">
            <Tv size={16} className="text-cyan" />
            <span>GIÁO TRÌNH VIDEO CHIẾN THUẬT ĐÔI NAM</span>
          </div>
          <h2 className="section-title">VIDEO HỌC CHIẾN THUẬT ĐÔI NAM</h2>
          <p className="video-section-subtitle">
            Học kỹ năng bọc lót, đè lưới và phối hợp thực chiến từ HLV. Video tích hợp công nghệ chống tua nhanh và tự động tích xanh khi bạn theo dõi trọn vẹn.
          </p>
        </div>

        <div className="video-progress-card">
          <div className="progress-card-top">
            <span className="progress-label">Tiến độ khóa học:</span>
            <span className="progress-stat">{completedCount}/{totalVideos} Video</span>
          </div>
          <div className="progress-track-mini">
            <div 
              className="progress-fill-mini" 
              style={{ width: `${percentCompleted}%` }}
            />
          </div>
          <div className="progress-status-text">
            {completedCount === totalVideos ? (
              <span className="text-emerald font-semibold flex-center-gap">
                <CheckCircle2 size={14} /> Hoàn thành toàn bộ giáo trình
              </span>
            ) : (
              <span>Cần xem xong {totalVideos - completedCount} video để hoàn thành</span>
            )}
          </div>
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="video-grid">
        {TACTICS_VIDEOS.map((video, idx) => {
          const isWatched = watchedIds.includes(video.id);

          return (
            <div 
              key={video.id}
              className={`video-card ${isWatched ? 'card-completed' : ''}`}
              onClick={() => setSelectedVideo(video)}
              role="button"
              tabIndex={0}
            >
              {/* Card Thumbnail / Preview */}
              <div className="video-thumbnail-wrap">
                <img 
                  src={video.thumbnailUrl || './videos/766319825_1345687688618423_4346388704197900737_n.jpg'} 
                  alt={video.title} 
                  className="video-thumb-img"
                  onError={(e) => {
                    // Fallback to stylized dark badminton court thumbnail if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="video-thumb-overlay" />

                {/* Big Center Play Icon */}
                <div className="video-play-btn-circle">
                  <Play size={24} fill="currentColor" className="play-icon-offset" />
                </div>

                {/* Status Badges Overlay */}
                <div className="video-thumb-top-badges">
                  <span className="video-lesson-tag">
                    <BookOpen size={12} />
                    <span>{video.durationText || `Bài 0${idx + 1}`}</span>
                  </span>

                  {isWatched ? (
                    <span className="video-badge-watched">
                      <CheckCircle2 size={14} />
                      <span>ĐÃ XEM XONG</span>
                    </span>
                  ) : (
                    <span className="video-badge-unwatched">
                      <Play size={12} fill="currentColor" />
                      <span>CHƯA XEM</span>
                    </span>
                  )}
                </div>

                {/* Anti-Seek Badge on Bottom of thumbnail */}
                <div className="video-thumb-bottom-info">
                  <span className="video-anti-seek-pill">
                    <ShieldCheck size={12} />
                    <span>Chống tua • Tự động tích</span>
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="video-card-body">
                <div className="video-tags-row">
                  {video.tags.map(t => (
                    <span key={t} className="video-chip">{t}</span>
                  ))}
                </div>

                <h3 className="video-card-title">{video.title}</h3>
                <p className="video-card-desc">{video.subTitle}</p>

                <div className="video-card-footer">
                  <span className={`action-link ${isWatched ? 'text-emerald' : 'text-cyan'}`}>
                    {isWatched ? 'Xem lại bài học' : 'Bắt đầu học ngay'}
                  </span>
                  <div className="circle-arrow-video">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          onWatchedChanged={refreshWatchedStatus}
        />
      )}
    </section>
  );
};
