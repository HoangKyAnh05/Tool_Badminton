import React, { useState, useEffect, useMemo } from 'react';
import { TACTICS_VIDEOS } from '../../data/videos';
import { TacticsVideo, VideoCategory, SkillLevel } from '../../types';
import { storageService } from '../../services/storage';
import { VideoPlayerModal } from './VideoPlayerModal';
import { EditYouTubeLinkModal, extractYouTubeId } from './EditYouTubeLinkModal';
import { YouTubeGuideModal } from './YouTubeGuideModal';
import { BatchImportExportModal } from './BatchImportExportModal';
import { 
  Tv, 
  Play, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  MapPin,
  Search,
  Layers,
  Award,
  HelpCircle,
  FileJson,
  Edit3,
  Sparkles
} from 'lucide-react';
import { Youtube } from './YoutubeIcon';

type FilterCategory = 'ALL' | VideoCategory;
type GroupTab = 'ALL' | 'CORNERS' | 'MATCHES';
type LevelFilter = 'ALL' | SkillLevel;

const CORNER_CATEGORIES: { key: VideoCategory; label: string; num: number }[] = [
  { key: 'POS_1', label: 'Ô 1: Lưới Trái', num: 1 },
  { key: 'POS_2', label: 'Ô 2: Lưới Giữa', num: 2 },
  { key: 'POS_3', label: 'Ô 3: Lưới Phải', num: 3 },
  { key: 'POS_4', label: 'Ô 4: TT Trái', num: 4 },
  { key: 'POS_5', label: 'Ô 5: Tâm Sân', num: 5 },
  { key: 'POS_6', label: 'Ô 6: TT Phải', num: 6 },
  { key: 'POS_7', label: 'Ô 7: Đáy Trái', num: 7 },
  { key: 'POS_8', label: 'Ô 8: Đáy Giữa', num: 8 },
  { key: 'POS_9', label: 'Ô 9: Đáy Phải', num: 9 },
];

const MATCH_CATEGORIES: { key: VideoCategory; label: string }[] = [
  { key: 'DON_NAM', label: 'Đơn Nam' },
  { key: 'DOI_NAM', label: 'Đôi Nam' },
  { key: 'DON_NU', label: 'Đơn Nữ' },
  { key: 'DOI_NU', label: 'Đôi Nữ' },
];

export const VideoSection: React.FC = () => {
  const [groupTab, setGroupTab] = useState<GroupTab>('CORNERS');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('POS_1');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVideo, setSelectedVideo] = useState<TacticsVideo | null>(null);
  const [watchedIds, setWatchedIds] = useState<string[]>([]);
  const [customVideos, setCustomVideos] = useState<TacticsVideo[]>([]);
  const [videoOverrides, setVideoOverrides] = useState<Record<string, Partial<TacticsVideo>>>(() => storageService.loadVideoOverrides());

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingVideo, setEditingVideo] = useState<TacticsVideo | null>(null);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState<boolean>(false);

  // New video form states
  const [newUrl, setNewUrl] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newSubTitle, setNewSubTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<VideoCategory>('POS_1');
  const [newLevel, setNewLevel] = useState<SkillLevel>('Cơ bản');
  const [newDesc, setNewDesc] = useState<string>('');
  const [newTags, setNewTags] = useState<string>('Thực chiến, Kỹ thuật');

  const refreshWatchedStatus = () => {
    setWatchedIds(storageService.loadWatchedVideos());
  };

  const refreshCustomVideos = () => {
    setCustomVideos(storageService.loadCustomVideos());
  };

  const refreshOverrides = () => {
    setVideoOverrides(storageService.loadVideoOverrides());
  };

  useEffect(() => {
    refreshWatchedStatus();
    refreshCustomVideos();
    refreshOverrides();
  }, []);

  // Merge predefined library with overrides and custom user-added videos
  const allVideos = useMemo(() => {
    const mergedBase = TACTICS_VIDEOS.map(v => {
      const override = videoOverrides[v.id];
      return override ? { ...v, ...override } : v;
    });
    return [...mergedBase, ...customVideos];
  }, [customVideos, videoOverrides]);

  // Filter videos by category, level, and search query
  const filteredVideos = useMemo(() => {
    return allVideos.filter(v => {
      // Category filter
      if (activeCategory !== 'ALL' && v.category !== activeCategory) {
        return false;
      }
      // Level filter
      if (levelFilter !== 'ALL' && v.level !== levelFilter) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = v.title.toLowerCase().includes(q);
        const matchSub = v.subTitle?.toLowerCase().includes(q) || false;
        const matchDesc = v.description?.toLowerCase().includes(q) || false;
        const matchTag = v.tags?.some(t => t.toLowerCase().includes(q)) || false;
        if (!matchTitle && !matchSub && !matchDesc && !matchTag) {
          return false;
        }
      }
      return true;
    });
  }, [allVideos, activeCategory, levelFilter, searchQuery]);

  const totalVideos = allVideos.length;
  const completedCount = allVideos.filter(v => watchedIds.includes(v.id)).length;
  const percentCompleted = totalVideos > 0 ? Math.round((completedCount / totalVideos) * 100) : 0;
  const customCount = Object.keys(videoOverrides).length + customVideos.length;

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
      level: newLevel,
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

  const handleOpenEdit = (e: React.MouseEvent, video: TacticsVideo) => {
    e.stopPropagation();
    setEditingVideo(video);
    setIsEditModalOpen(true);
  };

  const handleSaveVideoOverride = (updated: TacticsVideo) => {
    refreshOverrides();
    refreshCustomVideos();
    if (selectedVideo && selectedVideo.id === updated.id) {
      setSelectedVideo(updated);
    }
  };

  const handleResetToDefault = (videoId: string) => {
    refreshOverrides();
    refreshCustomVideos();
  };

  const getThumbnailSrc = (video: TacticsVideo): string => {
    if (video.thumbnailUrl) return video.thumbnailUrl;
    const ytId = extractYouTubeId(video.videoUrl);
    if (ytId) {
      return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    }
    return '';
  };

  const getCategoryLabel = (cat: VideoCategory) => {
    const corner = CORNER_CATEGORIES.find(c => c.key === cat);
    if (corner) return corner.label;
    const match = MATCH_CATEGORIES.find(m => m.key === cat);
    if (match) return match.label;
    return cat;
  };

  return (
    <section className="video-section-container">
      {/* Section Header */}
      <div className="section-title-wrap video-section-header">
        <div className="section-header-left">
          <div className="video-eyebrow">
            <Youtube size={16} className="text-danger" />
            <span>KHO VIDEO GIÁO TRÌNH & CHIẾN THUẬT (PHƯƠNG ÁN YOUTUBE UNLISTED)</span>
          </div>
          <h2 className="section-title">HỆ THỐNG VIDEO THEO TỪNG GÓC SÂN & THỂ THỨC THI ĐẤU</h2>
          <p className="video-section-subtitle">
            Khám phá 90 video chia đều cho 9 vị trí góc sân cùng 40 video chiến thuật chuyên sâu. Bạn có thể tự upload video lên YouTube Unlisted và gắn link thay thế bất kỳ lúc nào!
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
              <span>Đã xem {completedCount}/{totalVideos} video ({percentCompleted}%)</span>
            )}
          </div>
        </div>
      </div>

      {/* YouTube Management Toolbar */}
      <div className="youtube-management-bar">
        <div className="yt-mgmt-left">
          <button 
            className="btn-yt-toolbar btn-guide-link"
            onClick={() => setIsGuideModalOpen(true)}
            title="Xem hướng dẫn cách tải video lên YouTube Unlisted"
          >
            <HelpCircle size={15} className="text-cyan" />
            <span>Cách Up Video YouTube Unlisted (3 bước)</span>
          </button>

          <button 
            className="btn-yt-toolbar btn-json-backup"
            onClick={() => setIsBatchModalOpen(true)}
            title="Sao lưu danh sách link ra file JSON hoặc dán đồng bộ nhiều link cùng lúc"
          >
            <FileJson size={15} className="text-emerald" />
            <span>Sao Lưu / Nhập JSON {customCount > 0 && <strong className="yt-counter-badge">({customCount})</strong>}</span>
          </button>
        </div>

        <div className="yt-mgmt-right">
          <button
            className="btn-add-video-link"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={15} />
            <span>GẮN THÊM VIDEO MỚI</span>
          </button>
        </div>
      </div>

      {/* Main Group Selector & Search Bar */}
      <div className="video-group-navigation-bar">
        {/* Tier 1: Group Selector */}
        <div className="group-tabs-switch">
          <button 
            className={`group-switch-btn ${groupTab === 'CORNERS' ? 'active' : ''}`}
            onClick={() => {
              setGroupTab('CORNERS');
              setActiveCategory('POS_1');
            }}
          >
            <MapPin size={16} />
            <span>9 VỊ TRÍ GÓC SÂN (90 Video)</span>
          </button>

          <button 
            className={`group-switch-btn ${groupTab === 'MATCHES' ? 'active' : ''}`}
            onClick={() => {
              setGroupTab('MATCHES');
              setActiveCategory('DON_NAM');
            }}
          >
            <Award size={16} />
            <span>CHUYÊN MỤC THI ĐẤU (40 Video)</span>
          </button>

          <button 
            className={`group-switch-btn ${groupTab === 'ALL' ? 'active' : ''}`}
            onClick={() => {
              setGroupTab('ALL');
              setActiveCategory('ALL');
            }}
          >
            <Layers size={16} />
            <span>TẤT CẢ VIDEO ({totalVideos})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="video-search-box">
          <Search size={16} className="search-icon" />
          <input 
            type="text"
            placeholder="Tìm kiếm kỹ thuật, tên động tác..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="video-search-input"
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>
      </div>

      {/* Tier 2: Category Filter Pills */}
      <div className="category-pills-row">
        {groupTab === 'CORNERS' && (
          <div className="pills-scroll-wrap">
            {CORNER_CATEGORIES.map(c => {
              const count = allVideos.filter(v => v.category === c.key).length;
              const isSelected = activeCategory === c.key;
              return (
                <button
                  key={c.key}
                  className={`btn-corner-pill ${isSelected ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(c.key)}
                >
                  <span className="corner-num-badge">{c.num}</span>
                  <span>{c.label}</span>
                  <span className="pill-count-badge">({count})</span>
                </button>
              );
            })}
          </div>
        )}

        {groupTab === 'MATCHES' && (
          <div className="pills-scroll-wrap">
            {MATCH_CATEGORIES.map(m => {
              const count = allVideos.filter(v => v.category === m.key).length;
              const isSelected = activeCategory === m.key;
              return (
                <button
                  key={m.key}
                  className={`btn-match-pill ${isSelected ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(m.key)}
                >
                  <span>{m.label}</span>
                  <span className="pill-count-badge">({count})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Tier 3: Sub-filters (Skill Level) */}
      <div className="video-subfilter-toolbar">
        <div className="level-filters-group">
          <span className="filter-label">Cấp độ:</span>
          {(['ALL', 'Cơ bản', 'Trung cấp', 'Nâng cao'] as const).map(lvl => (
            <button
              key={lvl}
              className={`btn-level-filter ${levelFilter === lvl ? 'active' : ''} ${lvl !== 'ALL' ? `lvl-${lvl}` : ''}`}
              onClick={() => setLevelFilter(lvl)}
            >
              {lvl === 'ALL' ? 'Tất cả cấp độ' : lvl}
            </button>
          ))}
        </div>

        <div className="filter-stats-hint">
          <span>Hiển thị <strong>{filteredVideos.length}</strong> / {totalVideos} video</span>
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="video-grid">
        {filteredVideos.length === 0 ? (
          <div className="empty-video-category-card">
            <Tv size={48} className="empty-icon text-cyan" />
            <h3>Không tìm thấy video phù hợp</h3>
            <p>
              Thử chọn danh mục khác hoặc xóa bộ lọc tìm kiếm để xem tất cả {totalVideos} video trong hệ thống.
            </p>
            <button
              className="btn-reset-filter"
              onClick={() => {
                setActiveCategory('ALL');
                setGroupTab('ALL');
                setLevelFilter('ALL');
                setSearchQuery('');
              }}
            >
              Xem tất cả video ({totalVideos})
            </button>
          </div>
        ) : (
          filteredVideos.map(video => {
            const isWatched = watchedIds.includes(video.id);
            const thumbSrc = getThumbnailSrc(video);
            const isMp4 = video.videoUrl.endsWith('.mp4');
            const isYt = !!extractYouTubeId(video.videoUrl);
            const hasOverride = !!videoOverrides[video.id];
            const isCustomOrOverridden = video.isCustom || hasOverride;

            const levelClass = video.level === 'Cơ bản'
              ? 'badge-lvl-basic'
              : video.level === 'Trung cấp'
                ? 'badge-lvl-inter'
                : 'badge-lvl-adv';

            return (
              <div 
                key={video.id}
                className={`video-card animate-fade-in ${isWatched ? 'is-watched' : ''} ${hasOverride ? 'has-custom-override' : ''}`}
                onClick={() => setSelectedVideo(video)}
              >
                {/* Video Media Preview */}
                <div className="video-card-media">
                  {thumbSrc ? (
                    <img 
                      src={thumbSrc} 
                      alt={video.title} 
                      className="video-thumb-img" 
                      loading="lazy" 
                    />
                  ) : isMp4 ? (
                    <video 
                      src={video.videoUrl} 
                      className="video-mp4-preview" 
                      muted 
                      playsInline 
                      preload="none"
                      onMouseEnter={(e) => {
                        e.currentTarget.play().catch(() => {});
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                  ) : (
                    <div className="video-thumb-fallback">
                      {isYt ? (
                        <Youtube size={44} className="text-danger" />
                      ) : (
                        <Tv size={40} className="text-cyan" />
                      )}
                    </div>
                  )}

                  <div className="video-play-hover-btn">
                    <Play size={28} className="icon-play-card" />
                  </div>

                  {/* Corner and Level Overlay Badges */}
                  <div className="card-top-badges">
                    <span className="card-cat-badge">
                      {getCategoryLabel(video.category)}
                    </span>
                    {video.level && (
                      <span className={`card-level-badge ${levelClass}`}>
                        <Award size={11} />
                        {video.level}
                      </span>
                    )}
                    {isCustomOrOverridden && (
                      <span className="card-override-indicator" title="Video do bạn tự gắn link YouTube">
                        <Youtube size={11} className="text-danger" />
                        <span>Link của bạn</span>
                      </span>
                    )}
                  </div>

                  {/* Quick Edit Button on Hover */}
                  <button 
                    className="btn-card-quick-edit"
                    onClick={(e) => handleOpenEdit(e, video)}
                    title="Gắn hoặc đổi link YouTube của bạn cho video này"
                  >
                    <Edit3 size={13} />
                    <span>Gắn link</span>
                  </button>

                  {/* Duration Text */}
                  <span className="video-duration-pill">{video.durationText}</span>

                  {/* Watched Status */}
                  {isWatched && (
                    <div className="video-watched-badge">
                      <CheckCircle2 size={13} />
                      <span>ĐÃ XEM</span>
                    </div>
                  )}
                </div>

                {/* Video Info Content */}
                <div className="video-card-content">
                  <h3 className="video-card-title" title={video.title}>{video.title}</h3>
                  <p className="video-card-desc">{video.subTitle || video.description}</p>

                  <div className="video-card-footer">
                    <div className="video-tags-list">
                      {video.tags?.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="video-meta-tag">#{tag}</span>
                      ))}
                    </div>

                    <div className="card-footer-actions">
                      <button 
                        className="btn-card-yt-link"
                        onClick={(e) => handleOpenEdit(e, video)}
                        title="Chỉnh sửa hoặc đổi link YouTube"
                      >
                        <Youtube size={14} className="text-danger" />
                        <span>Sửa link</span>
                      </button>

                      {video.isCustom && !TACTICS_VIDEOS.some(x => x.id === video.id) && (
                        <button 
                          className="btn-del-custom-video"
                          onClick={(e) => handleDeleteCustomVideo(e, video.id)}
                          title="Xóa video tự thêm này"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          isOpen={true}
          onClose={() => setSelectedVideo(null)}
          onWatchedChanged={refreshWatchedStatus}
          onEditYouTube={(vid) => {
            setEditingVideo(vid);
            setIsEditModalOpen(true);
          }}
        />
      )}

      {/* Edit YouTube Link Modal */}
      {isEditModalOpen && (
        <EditYouTubeLinkModal
          video={editingVideo}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingVideo(null);
          }}
          onSave={handleSaveVideoOverride}
          onResetToDefault={handleResetToDefault}
          onOpenGuide={() => {
            setIsEditModalOpen(false);
            setIsGuideModalOpen(true);
          }}
        />
      )}

      {/* YouTube Unlisted Guide Modal */}
      <YouTubeGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />

      {/* Batch Import & Export Modal */}
      <BatchImportExportModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        onDataChanged={() => {
          refreshOverrides();
          refreshCustomVideos();
        }}
      />

      {/* Add Custom Video Modal */}
      {isAddModalOpen && (
        <div className="video-modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="custom-modal-card animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <div className="custom-modal-header">
              <div className="flex-center-gap">
                <Youtube size={20} className="text-danger" />
                <h3>Gắn Thêm Video Giáo Trình Mới</h3>
              </div>
              <button className="theater-close-btn" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleAddVideo} className="custom-modal-form">
              <div className="form-group">
                <label>Đường dẫn Video (URL YouTube / Shorts / Unlisted)*</label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=... hoặc https://youtu.be/..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="modal-text-input"
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Chuyên mục Video*</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as VideoCategory)}
                    className="modal-select-input"
                  >
                    <optgroup label="9 Vị trí góc sân">
                      {CORNER_CATEGORIES.map(c => (
                        <option key={c.key} value={c.key}>{c.label}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Chuyên mục thi đấu">
                      {MATCH_CATEGORIES.map(m => (
                        <option key={m.key} value={m.key}>{m.label}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div className="form-group">
                  <label>Cấp độ kỹ thuật</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as SkillLevel)}
                    className="modal-select-input"
                  >
                    <option value="Cơ bản">🟢 Cơ bản (Newbie)</option>
                    <option value="Trung cấp">🟡 Trung cấp (Phong trào)</option>
                    <option value="Nâng cao">🔴 Nâng cao (Thi đấu)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Tiêu đề Video*</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Kỹ thuật đập smash cắm sàn..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="modal-text-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Mô tả tóm tắt kỹ thuật</label>
                <input
                  type="text"
                  placeholder="Tóm tắt điểm mấu chốt của động tác"
                  value={newSubTitle}
                  onChange={(e) => setNewSubTitle(e.target.value)}
                  className="modal-text-input"
                />
              </div>

              <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn-cancel" onClick={() => setIsAddModalOpen(false)}>Hủy</button>
                <button type="submit" className="btn-save-yt">LƯU VIDEO YOUTUBE</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
