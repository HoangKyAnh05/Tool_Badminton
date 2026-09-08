import React, { useState, useEffect, useMemo } from 'react';
import { TACTICS_VIDEOS } from '../../data/videos';
import { TacticsVideo, VideoCategory } from '../../types';
import { storageService } from '../../services/storage';
import { VideoPlayerModal } from './VideoPlayerModal';
import { 
  Tv, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  BookOpen, 
  Plus, 
  Link as LinkIcon, 
  Trash2, 
  X, 
  Users, 
  User, 
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

type FilterCategory = 'ALL' | VideoCategory;

export const VideoSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('ALL');
  const [selectedVideo, setSelectedVideo] = useState<TacticsVideo | null>(null);
  const [watchedIds, setWatchedIds] = useState<string[]>([]);
  const [customVideos, setCustomVideos] = useState<TacticsVideo[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // New video form states
  const [newUrl, setNewUrl] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newSubTitle, setNewSubTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<VideoCategory>('DON_NAM');
  const [newDesc, setNewDesc] = useState<string>('');
  const [newTags, setNewTags] = useState<string>('Thực chiến, Kỹ thuật');

  const refreshWatchedStatus = () => {
    setWatchedIds(storageService.loadWatchedVideos());
  };

  const refreshCustomVideos = () => {
    setCustomVideos(storageService.loadCustomVideos());
  };

  useEffect(() => {
    refreshWatchedStatus();
    refreshCustomVideos();
  }, []);

  // Merge predefined library with custom user-added videos
  const allVideos = useMemo(() => {
    return [...TACTICS_VIDEOS, ...customVideos];
  }, [customVideos]);

  // Filtered list based on active tab
  const filteredVideos = useMemo(() => {
    if (activeCategory === 'ALL') return allVideos;
    return allVideos.filter(v => v.category === activeCategory);
  }, [allVideos, activeCategory]);

  const totalVideos = allVideos.length;
  const completedCount = allVideos.filter(v => watchedIds.includes(v.id)).length;
  const percentCompleted = totalVideos > 0 ? Math.round((completedCount / totalVideos) * 100) : 0;

  // Counts by category
  const countDonNam = allVideos.filter(v => v.category === 'DON_NAM').length;
  const countDoiNam = allVideos.filter(v => v.category === 'DOI_NAM').length;
  const countDonNu = allVideos.filter(v => v.category === 'DON_NU').length;
  const countDoiNu = allVideos.filter(v => v.category === 'DOI_NU').length;

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim() || !newTitle.trim()) {
      alert('Vui lòng nhập đầy đủ Đường dẫn Link và Tiêu đề video!');
      return;
    }

    const tagList = newTags.split(',').map(t => t.trim()).filter(Boolean);
    const newVideoItem: TacticsVideo = {
      id: `custom-video-${Date.now()}`,
      category: newCategory,
      title: newTitle.trim(),
      subTitle: newSubTitle.trim() || 'Video phân tích thực chiến',
      description: newDesc.trim() || 'Video giáo trình thực chiến do người dùng đính kèm.',
      videoUrl: newUrl.trim(),
      durationText: 'Tự thêm',
      tags: tagList.length > 0 ? tagList : ['Thực chiến'],
      isCustom: true
    };

    storageService.saveCustomVideo(newVideoItem);
    refreshCustomVideos();
    setIsAddModalOpen(false);

    // Reset form
    setNewUrl('');
    setNewTitle('');
    setNewSubTitle('');
    setNewDesc('');
  };

  const handleDeleteCustomVideo = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc muốn xóa video gắn link này không?')) {
      storageService.deleteCustomVideo(id);
      refreshCustomVideos();
    }
  };

  // Helper to get YouTube thumbnail
  const getThumbnailSrc = (video: TacticsVideo) => {
    if (video.thumbnailUrl) return video.thumbnailUrl;
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
    const match = video.videoUrl.match(regExp);
    if (match && match[1]) {
      return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
    return '';
  };

  const getCategoryLabel = (cat: VideoCategory) => {
    switch (cat) {
      case 'DON_NAM': return '👤 Đơn Nam';
      case 'DOI_NAM': return '👥 Đôi Nam';
      case 'DON_NU': return '👩 Đơn Nữ';
      case 'DOI_NU': return '👭 Đôi Nữ';
    }
  };

  return (
    <section className="video-section-container">
      {/* Section Header */}
      <div className="section-title-wrap video-section-header">
        <div className="section-header-left">
          <div className="video-eyebrow">
            <Tv size={16} className="text-cyan" />
            <span>KHO VIDEO GIÁO TRÌNH & CHIẾN THUẬT THỰC CHIẾN</span>
          </div>
          <h2 className="section-title">VIDEO THỰC TẾ: ĐƠN NAM • ĐÔI NAM • ĐƠN NỮ • ĐÔI NỮ</h2>
          <p className="video-section-subtitle">
            Học kỹ thuật di chuyển, điều cầu và chiến thuật đỉnh cao từ vận động viên thực tế. Hỗ trợ chạy mượt file video nội bộ và gắn link YouTube / Shorts không giới hạn dung lượng.
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
            {completedCount === totalVideos && totalVideos > 0 ? (
              <span className="text-emerald font-semibold flex-center-gap">
                <CheckCircle2 size={14} /> Hoàn thành toàn bộ giáo trình
              </span>
            ) : (
              <span>Cần xem xong {totalVideos - completedCount} video để hoàn thành</span>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter Tabs & Add Video Button */}
      <div className="video-controls-toolbar" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', margin: '20px 0 24px' }}>
        <div className="category-tabs-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button
            className={`btn-category-tab ${activeCategory === 'ALL' ? 'active' : ''}`}
            onClick={() => setActiveCategory('ALL')}
          >
            🏸 Tất cả ({totalVideos})
          </button>
          <button
            className={`btn-category-tab ${activeCategory === 'DON_NAM' ? 'active' : ''}`}
            onClick={() => setActiveCategory('DON_NAM')}
          >
            👤 Đơn Nam ({countDonNam})
          </button>
          <button
            className={`btn-category-tab ${activeCategory === 'DOI_NAM' ? 'active' : ''}`}
            onClick={() => setActiveCategory('DOI_NAM')}
          >
            👥 Đôi Nam ({countDoiNam})
          </button>
          <button
            className={`btn-category-tab ${activeCategory === 'DON_NU' ? 'active' : ''}`}
            onClick={() => setActiveCategory('DON_NU')}
          >
            👩 Đơn Nữ ({countDonNu})
          </button>
          <button
            className={`btn-category-tab ${activeCategory === 'DOI_NU' ? 'active' : ''}`}
            onClick={() => setActiveCategory('DOI_NU')}
          >
            👭 Đôi Nữ ({countDoiNu})
          </button>
        </div>

        <button
          className="btn-add-video-link"
          onClick={() => setIsAddModalOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            background: 'linear-gradient(135deg, #00f0ff 0%, #0284c7 100%)',
            color: '#020812',
            fontWeight: 800,
            fontSize: '13px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 240, 255, 0.3)'
          }}
        >
          <Plus size={16} />
          <span>GẮN LINK VIDEO MỚI</span>
        </button>
      </div>

      {/* Video Cards Grid */}
      <div className="video-grid">
        {filteredVideos.map((video, idx) => {
          const isWatched = watchedIds.includes(video.id);
          const thumbSrc = getThumbnailSrc(video);
          const isMp4 = video.videoUrl.endsWith('.mp4');

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
                {thumbSrc ? (
                  <img 
                    src={thumbSrc} 
                    alt={video.title} 
                    className="video-thumb-img"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : isMp4 ? (
                  <video
                    src={`${video.videoUrl}#t=0.5`}
                    preload="metadata"
                    muted
                    playsInline
                    className="video-thumb-img video-mp4-preview"
                  />
                ) : (
                  <div className="video-thumb-fallback">
                    <Tv size={40} className="text-cyan opacity-40" />
                  </div>
                )}
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

                {/* Anti-Seek or Online Badge on Bottom of thumbnail */}
                <div className="video-thumb-bottom-info">
                  <span className="video-anti-seek-pill">
                    <ShieldCheck size={12} />
                    <span>{isMp4 ? 'Video thực tế • Chống tua' : 'Video Online • HD'}</span>
                  </span>
                </div>

                {/* Delete button if custom video */}
                {video.isCustom && (
                  <button
                    className="btn-delete-custom-video"
                    onClick={(e) => handleDeleteCustomVideo(e, video.id)}
                    title="Xóa video tự thêm này"
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      background: 'rgba(239, 68, 68, 0.85)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '5px',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>

              {/* Card Content */}
              <div className="video-card-body">
                <div className="video-tags-row">
                  <span className="video-chip chip-category" style={{ background: 'rgba(0, 240, 255, 0.15)', color: '#00f0ff', borderColor: '#00f0ff' }}>
                    {getCategoryLabel(video.category)}
                  </span>
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

      {/* Add Custom Video Modal */}
      {isAddModalOpen && (
        <div className="custom-modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="custom-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="custom-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <LinkIcon size={20} className="text-cyan" />
                <h3 style={{ margin: 0, fontSize: '18px', color: '#fff' }}>GẮN LINK VIDEO GIÁO TRÌNH MỚI</h3>
              </div>
              <button className="btn-close-modal" onClick={() => setIsAddModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddVideo} className="custom-modal-form">
              <div className="form-group">
                <label>Phân loại chuyên mục thi đấu:</label>
                <select 
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value as VideoCategory)}
                  className="form-input"
                >
                  <option value="DON_NAM">👤 Đơn Nam</option>
                  <option value="DOI_NAM">👥 Đôi Nam</option>
                  <option value="DON_NU">👩 Đơn Nữ</option>
                  <option value="DOI_NU">👭 Đôi Nữ</option>
                </select>
              </div>

              <div className="form-group">
                <label>Đường dẫn Video (Link YouTube / Shorts / Link MP4 / Đường dẫn file):</label>
                <input
                  type="text"
                  placeholder="Ví dụ: https://www.youtube.com/watch?v=... hoặc ./videos/ten_video.mp4"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="form-input"
                  required
                />
                <span className="form-hint">Dán link YouTube, YouTube Shorts hoặc link video MP4 online. Không giới hạn dung lượng!</span>
              </div>

              <div className="form-group">
                <label>Tiêu đề bài học:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Kỹ thuật đập smash cắm sân của Lin Dan"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Mô tả ngắn kỹ thuật:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Phân tích bộ pháp bật nhảy scissor kick và gập cổ tay"
                  value={newSubTitle}
                  onChange={(e) => setNewSubTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Thẻ từ khóa (ngăn cách bằng dấu phẩy):</label>
                <input
                  type="text"
                  placeholder="Smash, Bước chân, Tấn công"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Trọng điểm huấn luyện (chi tiết):</label>
                <textarea
                  placeholder="Ghi chú kỹ thuật, hướng dẫn học viên cách quan sát..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="form-input form-textarea"
                  rows={3}
                />
              </div>

              <div className="form-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn-cancel" onClick={() => setIsAddModalOpen(false)}>
                  Hủy bỏ
                </button>
                <button type="submit" className="btn-submit-save">
                  ✓ Thêm Vào Giáo Trình
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
