import React, { useState, useEffect, useMemo } from 'react';
import { BADMINTON_POSITIONS } from '../../data/movements';
import { TACTICS_VIDEOS } from '../../data/videos';
import { TacticsVideo, SkillLevel, VideoCategory } from '../../types';
import { storageService } from '../../services/storage';
import { extractYouTubeId, extractTikTokId, isTikTokUrl } from '../Video/EditYouTubeLinkModal';
import { YouTubeGuideModal } from '../Video/YouTubeGuideModal';
import { BatchImportExportModal } from '../Video/BatchImportExportModal';
import { VideoPlayerModal } from '../Video/VideoPlayerModal';
import { 
  X, 
  Search, 
  Check, 
  RotateCcw, 
  Play, 
  Layers, 
  MapPin, 
  Award, 
  FileJson, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  ExternalLink,
  Sparkles,
  Link2,
  RefreshCw,
  FolderSync
} from 'lucide-react';
import { Youtube } from '../Video/YoutubeIcon';

export interface VideoSlotItem {
  id: string;
  aliases?: string[];
  sourceType: 'COURT_POSITION' | 'TACTICS_MATCH';
  zoneNumber?: number;
  zoneName?: string;
  categoryKey: string;
  categoryLabel: string;
  clipIndex?: number;
  totalClipsInZone?: number;
  title: string;
  subTitle?: string;
  level: SkillLevel;
  defaultVideoUrl: string;
  description: string;
  coachingTip?: string;
}

interface VideoAssignmentHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged?: () => void;
}

export const VideoAssignmentHubModal: React.FC<VideoAssignmentHubModalProps> = ({
  isOpen,
  onClose,
  onDataChanged
}) => {
  const [videoOverrides, setVideoOverrides] = useState<Record<string, Partial<TacticsVideo>>>(() => storageService.loadVideoOverrides());
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'MISSING' | 'CONFIGURED'>('MISSING');
  const [zoneFilter, setZoneFilter] = useState<string>('ALL');
  const [levelFilter, setLevelFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Input tracking per slot ID for inline URL edits
  const [inputUrls, setInputUrls] = useState<Record<string, string>>({});
  const [savedFeedback, setSavedFeedback] = useState<Record<string, boolean>>({});

  // Sub-modals
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isBatchOpen, setIsBatchOpen] = useState<boolean>(false);
  const [previewVideo, setPreviewVideo] = useState<TacticsVideo | null>(null);

  const refreshOverrides = () => {
    const data = storageService.loadVideoOverrides();
    setVideoOverrides(data);
    onDataChanged?.();
  };

  useEffect(() => {
    if (isOpen) {
      refreshOverrides();
    }
  }, [isOpen]);

  // Aggregate all slots across 9 Court Positions and 130 Tactics Videos
  const allSlots: VideoSlotItem[] = useMemo(() => {
    const list: VideoSlotItem[] = [];

    // 1. 9 Court Positions & Variations
    BADMINTON_POSITIONS.forEach((pos) => {
      const vars = pos.variations && pos.variations.length > 0
        ? pos.variations
        : [
            {
              id: `pos_${pos.id}_var_1`,
              shotName: pos.name,
              shotType: 'Kỹ thuật cơ bản',
              level: pos.level || 'Cơ bản',
              videoUrl: pos.videoUrl || `./videos/clips/pos_${pos.id}_clip_1.mp4`,
              handMovement: pos.handMovement,
              footMovement: pos.footMovement,
              combinedMovement: pos.combinedMovement
            }
          ];

      vars.forEach((v, vIdx) => {
        const primaryId = v.id || `pos_${pos.id}_var_${vIdx + 1}`;
        const aliases = [
          primaryId,
          `video-pos-${pos.id}-${vIdx + 1}`,
          `pos_${pos.id}_clip_${vIdx + 1}`
        ];

        list.push({
          id: primaryId,
          aliases,
          sourceType: 'COURT_POSITION',
          zoneNumber: pos.id,
          zoneName: pos.zoneName,
          categoryKey: `POS_${pos.id}`,
          categoryLabel: `Ô ${pos.id} • ${pos.zoneName}`,
          clipIndex: vIdx + 1,
          totalClipsInZone: vars.length,
          title: v.shotName || pos.name,
          subTitle: v.handMovement?.subTitle || pos.handMovement?.subTitle || '',
          level: (v.level || pos.level || 'Cơ bản') as SkillLevel,
          defaultVideoUrl: v.videoUrl || `./videos/clips/pos_${pos.id}_clip_${vIdx + 1}.mp4`,
          description: v.handMovement?.description || pos.handMovement?.description || 'Kỹ thuật di chuyển và tiếp xúc cầu chuẩn xác.',
          coachingTip: v.handMovement?.coachingTip || pos.handMovement?.coachingTip || ''
        });
      });
    });

    // 2. Tactics and Match Videos
    TACTICS_VIDEOS.forEach((tv) => {
      // Avoid re-adding if already listed under POS_
      if (!tv.category.startsWith('POS_')) {
        let catLabel = 'Chiến Thuật Thi Đấu';
        if (tv.category === 'DON_NAM') catLabel = 'Đơn Nam';
        else if (tv.category === 'DOI_NAM') catLabel = 'Đôi Nam';
        else if (tv.category === 'DON_NU') catLabel = 'Đơn Nữ';
        else if (tv.category === 'DOI_NU') catLabel = 'Đôi Nữ';

        list.push({
          id: tv.id,
          aliases: [tv.id],
          sourceType: 'TACTICS_MATCH',
          categoryKey: tv.category,
          categoryLabel: catLabel,
          title: tv.title,
          subTitle: tv.subTitle || '',
          level: tv.level || 'Cơ bản',
          defaultVideoUrl: tv.videoUrl,
          description: tv.description || 'Video phân tích chiến thuật thực chiến.'
        });
      }
    });

    return list;
  }, []);

  // Filter slots
  const filteredSlots = useMemo(() => {
    return allSlots.filter((slot) => {
      // Check if configured
      const hasCustom = Boolean(
        videoOverrides[slot.id] ||
        (slot.aliases && slot.aliases.some(a => videoOverrides[a]))
      );

      // Status Filter
      if (statusFilter === 'MISSING' && hasCustom) return false;
      if (statusFilter === 'CONFIGURED' && !hasCustom) return false;

      // Zone Filter
      if (zoneFilter !== 'ALL') {
        if (zoneFilter.startsWith('POS_')) {
          if (slot.categoryKey !== zoneFilter) return false;
        } else if (zoneFilter === 'TACTICS') {
          if (slot.sourceType !== 'TACTICS_MATCH') return false;
        }
      }

      // Level Filter
      if (levelFilter !== 'ALL' && slot.level !== levelFilter) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = slot.title.toLowerCase().includes(q);
        const matchSub = slot.subTitle?.toLowerCase().includes(q) || false;
        const matchZone = slot.categoryLabel.toLowerCase().includes(q);
        const matchDesc = slot.description.toLowerCase().includes(q);
        if (!matchTitle && !matchSub && !matchZone && !matchDesc) return false;
      }

      return true;
    });
  }, [allSlots, videoOverrides, statusFilter, zoneFilter, levelFilter, searchQuery]);

  // Overall Statistics
  const totalSlots = allSlots.length;
  const configuredCount = allSlots.filter(s => 
    Boolean(videoOverrides[s.id] || (s.aliases && s.aliases.some(a => videoOverrides[a])))
  ).length;
  const missingCount = totalSlots - configuredCount;
  const percentConfigured = Math.round((configuredCount / totalSlots) * 100);

  // Handle Save Single URL for a Slot
  const handleSaveSlot = (slot: VideoSlotItem) => {
    const rawUrl = inputUrls[slot.id];
    const urlToSave = rawUrl !== undefined ? rawUrl.trim() : '';

    if (!urlToSave) {
      alert('Vui lòng dán đường dẫn link (YouTube, TikTok, Video MP4) vào ô trước khi lưu!');
      return;
    }

    const ytId = extractYouTubeId(urlToSave);
    const ttId = extractTikTokId(urlToSave);
    const isTT = isTikTokUrl(urlToSave);
    if (!ytId && !ttId && !isTT && !urlToSave.startsWith('http') && !urlToSave.endsWith('.mp4')) {
      alert('Đường dẫn không hợp lệ. Vui lòng dán link YouTube (youtu.be/...), link TikTok (@.../video/...), hoặc link video trực tiếp.');
      return;
    }

    const payload: Partial<TacticsVideo> = {
      videoUrl: urlToSave,
      title: slot.title,
      subTitle: slot.subTitle,
      level: slot.level,
      description: slot.description,
      isCustom: true
    };

    // Save to primary ID and all aliases for seamless 100% sync
    storageService.saveVideoOverride(slot.id, payload);
    if (slot.aliases) {
      slot.aliases.forEach(alias => {
        storageService.saveVideoOverride(alias, payload);
      });
    }

    // Trigger visual feedback
    setSavedFeedback(prev => ({ ...prev, [slot.id]: true }));
    setTimeout(() => {
      setSavedFeedback(prev => ({ ...prev, [slot.id]: false }));
    }, 2500);

    refreshOverrides();
  };

  // Reset Single Slot to Default
  const handleResetSlot = (slot: VideoSlotItem) => {
    if (window.confirm(`Khôi phục video mặc định cho "${slot.title}"?`)) {
      storageService.removeVideoOverride(slot.id);
      if (slot.aliases) {
        slot.aliases.forEach(alias => {
          storageService.removeVideoOverride(alias);
        });
      }
      setInputUrls(prev => {
        const next = { ...prev };
        delete next[slot.id];
        return next;
      });
      refreshOverrides();
    }
  };

  // Handle previewing video - always use real-time typed input if available
  const handlePreview = (slot: VideoSlotItem, fallbackUrl?: string) => {
    const typed = inputUrls[slot.id] ? inputUrls[slot.id].trim() : '';
    const override = videoOverrides[slot.id] || (slot.aliases && slot.aliases.map(a => videoOverrides[a]).find(Boolean));
    const urlToPlay = typed || override?.videoUrl || fallbackUrl || slot.defaultVideoUrl;

    setPreviewVideo({
      id: slot.id,
      category: slot.categoryKey as any,
      title: slot.title,
      subTitle: slot.subTitle || slot.categoryLabel,
      level: slot.level,
      description: slot.description,
      videoUrl: urlToPlay,
      durationText: 'Thực chiến',
      tags: ['Thực chiến', slot.level]
    });
  };

  // Handle Reset All Custom Videos to Defaults
  const handleResetAllToDefault = () => {
    if (window.confirm('Khôi phục toàn bộ các video về liên kết chuẩn ban đầu của hệ thống?')) {
      storageService.saveVideoOverride('__reset__', {});
      localStorage.removeItem('badminton_video_overrides_v1');
      setInputUrls({});
      refreshOverrides();
      setStatusFilter('ALL');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="video-hub-modal-backdrop" onClick={onClose}>
      <div className="video-hub-modal-card animate-scale-up" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="video-hub-header">
          <div className="hub-header-left">
            <div className="hub-title-row">
              <div className="hub-icon-badge">
                <FolderSync size={24} className="text-cyan" />
              </div>
              <div>
                <h2 className="hub-main-title">Trung Tâm Gán Video Tự Động & Thủ Công</h2>
                <p className="hub-sub-title">
                  Gom tất cả {totalSlots} vị trí ô sân & kỹ thuật vào một nơi. Bạn chỉ cần dán link tại đây là ra ngoài chỗ nào cũng tự động có video chuẩn!
                </p>
              </div>
            </div>
          </div>

          <div className="hub-header-actions">
            <button 
              className="btn-hub-tool btn-reset-all"
              onClick={handleResetAllToDefault}
              title="Xóa toàn bộ các link tùy chỉnh đã lưu và khôi phục về mặc định"
            >
              <RotateCcw size={15} className="text-warning" />
              <span>Khôi Phục Gốc Tất Cả</span>
            </button>

            <button 
              className="btn-hub-tool btn-guide-link"
              onClick={() => setIsGuideOpen(true)}
              title="Xem hướng dẫn cách tải video lên YouTube Unlisted"
            >
              <HelpCircle size={15} className="text-cyan" />
              <span>Cách Up Video YouTube (3 bước)</span>
            </button>

            <button 
              className="btn-hub-tool btn-json-backup"
              onClick={() => setIsBatchOpen(true)}
              title="Sao lưu danh sách link ra JSON hoặc nhập hàng loạt"
            >
              <FileJson size={15} className="text-emerald" />
              <span>Sao Lưu / Nhập JSON</span>
            </button>

            <button className="hub-close-btn" onClick={onClose} title="Đóng">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Global Progress & Statistics Banner */}
        <div className="hub-progress-banner">
          <div className="hub-progress-info">
            <div className="hub-stat-item">
              <span className="stat-label">Tổng vị trí cần video:</span>
              <strong className="stat-val text-white">{totalSlots} Vị trí</strong>
            </div>
            <div className="hub-stat-item">
              <span className="stat-label">Đã gắn video của bạn:</span>
              <strong className="stat-val text-emerald">{configuredCount} Vị trí</strong>
            </div>
            <div className="hub-stat-item">
              <span className="stat-label">Chưa có video của bạn:</span>
              <strong className="stat-val text-danger">{missingCount} Vị trí</strong>
            </div>
          </div>

          <div className="hub-progress-track">
            <div 
              className="hub-progress-fill" 
              style={{ width: `${percentConfigured}%` }}
            />
          </div>
        </div>

        {/* Navigation & Filters Bar */}
        <div className="hub-filter-bar">
          {/* Status Switch Tabs */}
          <div className="hub-status-tabs">
            <button 
              className={`btn-status-tab ${statusFilter === 'MISSING' ? 'active-missing' : ''}`}
              onClick={() => setStatusFilter('MISSING')}
            >
              <AlertCircle size={15} />
              <span>CHƯA GẮN VIDEO RIÊNG ({missingCount})</span>
            </button>

            <button 
              className={`btn-status-tab ${statusFilter === 'CONFIGURED' ? 'active-configured' : ''}`}
              onClick={() => setStatusFilter('CONFIGURED')}
            >
              <CheckCircle2 size={15} />
              <span>ĐÃ GẮN VIDEO ({configuredCount})</span>
            </button>

            <button 
              className={`btn-status-tab ${statusFilter === 'ALL' ? 'active-all' : ''}`}
              onClick={() => setStatusFilter('ALL')}
            >
              <Layers size={15} />
              <span>TẤT CẢ ({totalSlots})</span>
            </button>
          </div>

          {/* Quick Zone Selector */}
          <div className="hub-zone-select-wrap">
            <Filter size={15} className="text-muted" />
            <select 
              value={zoneFilter} 
              onChange={(e) => setZoneFilter(e.target.value)}
              className="hub-select-input"
            >
              <option value="ALL">Toàn bộ 9 Ô Sân & Thi Đấu</option>
              <optgroup label="9 Ô Sân Thực Chiến">
                <option value="POS_1">Ô 1: Lưới Trái</option>
                <option value="POS_2">Ô 2: Lưới Giữa</option>
                <option value="POS_3">Ô 3: Lưới Phải</option>
                <option value="POS_4">Ô 4: TT Trái</option>
                <option value="POS_5">Ô 5: Tâm Sân</option>
                <option value="POS_6">Ô 6: TT Phải</option>
                <option value="POS_7">Ô 7: Cuối Sân Trái</option>
                <option value="POS_8">Ô 8: Cuối Sân Giữa</option>
                <option value="POS_9">Ô 9: Cuối Sân Phải</option>
              </optgroup>
              <optgroup label="Chuyên mục Thi Đấu">
                <option value="TACTICS">Video Chiến Thuật Thi Đấu</option>
              </optgroup>
            </select>
          </div>

          {/* Level Filter */}
          <div className="hub-level-filter-wrap">
            <select 
              value={levelFilter} 
              onChange={(e) => setLevelFilter(e.target.value)}
              className="hub-select-input"
            >
              <option value="ALL">Tất cả cấp độ</option>
              <option value="Cơ bản">🟢 Cơ bản</option>
              <option value="Trung cấp">🟡 Trung cấp</option>
              <option value="Nâng cao">🔴 Nâng cao</option>
            </select>
          </div>

          {/* Search Box */}
          <div className="hub-search-box">
            <Search size={15} className="search-icon" />
            <input 
              type="text"
              placeholder="Tìm theo tên động tác, kỹ thuật..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hub-search-input"
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')}>×</button>
            )}
          </div>
        </div>

        {/* Slot List Scroll Container */}
        <div className="hub-slot-list-container">
          {filteredSlots.length === 0 ? (
            <div className="hub-empty-state">
              <CheckCircle2 size={48} className="text-emerald" />
              <h3>Không có vị trí nào cần hiển thị</h3>
              <p>
                {statusFilter === 'MISSING' 
                  ? 'Tuyệt vời! Bạn đã đẩy video riêng vào tất cả các vị trí trong bộ lọc này.' 
                  : 'Hãy thử đổi bộ lọc hoặc tìm kiếm tên kỹ thuật khác.'}
              </p>
              <button 
                className="btn-hub-reset-filter"
                onClick={() => {
                  setStatusFilter('ALL');
                  setZoneFilter('ALL');
                  setLevelFilter('ALL');
                  setSearchQuery('');
                }}
              >
                Xem tất cả {totalSlots} vị trí
              </button>
            </div>
          ) : (
            <div className="hub-slots-grid">
              {filteredSlots.map((slot) => {
                const override = videoOverrides[slot.id] || (slot.aliases && slot.aliases.map(a => videoOverrides[a]).find(Boolean));
                const hasCustom = Boolean(override);
                const currentSavedUrl = override?.videoUrl || slot.defaultVideoUrl;
                const inputValue = inputUrls[slot.id] !== undefined ? inputUrls[slot.id] : (hasCustom ? override?.videoUrl || '' : '');
                const effectiveDisplayUrl = (inputValue && inputValue.trim()) || currentSavedUrl;
                const ytId = extractYouTubeId(effectiveDisplayUrl);
                const tiktokId = extractTikTokId(effectiveDisplayUrl);
                const isTT = isTikTokUrl(effectiveDisplayUrl);
                const isSaved = savedFeedback[slot.id];

                const levelClass = slot.level === 'Cơ bản'
                  ? 'badge-lvl-basic'
                  : slot.level === 'Trung cấp'
                    ? 'badge-lvl-inter'
                    : 'badge-lvl-adv';

                return (
                  <div 
                    key={slot.id} 
                    className={`hub-slot-card ${hasCustom ? 'is-configured' : 'is-missing'}`}
                  >
                    {/* Slot Header Information */}
                    <div className="slot-card-header">
                      <div className="slot-meta-badges">
                        <span className="slot-zone-pill">
                          {slot.zoneNumber ? `Ô ${slot.zoneNumber}` : 'THI ĐẤU'}
                        </span>
                        <span className="slot-category-tag">
                          {slot.categoryLabel} {slot.clipIndex && `(Clip #${slot.clipIndex}/${slot.totalClipsInZone})`}
                        </span>
                        <span className={`slot-level-badge ${levelClass}`}>
                          {slot.level}
                        </span>
                      </div>

                      <div className="slot-status-indicator">
                        {hasCustom ? (
                          <span className="status-badge-done">
                            <CheckCircle2 size={13} />
                            <span>Đã gắn video của bạn</span>
                          </span>
                        ) : (
                          <span className="status-badge-missing">
                            <AlertCircle size={13} />
                            <span>Chưa gắn link riêng</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Technique Title & Detailed Description */}
                    <div className="slot-technique-body">
                      <h3 className="slot-technique-name">{slot.title}</h3>
                      {slot.subTitle && (
                        <p className="slot-technique-sub">{slot.subTitle}</p>
                      )}
                      <p className="slot-technique-desc">{slot.description}</p>
                    </div>

                    {/* Video Link Input Form */}
                    <div className="slot-input-action-row">
                      <div className="slot-input-wrapper">
                        <Link2 size={16} className="input-link-icon" />
                        <input
                          type="text"
                          placeholder="Dán link YouTube (youtu.be/...) hoặc TikTok (@.../video/...)"
                          value={inputValue}
                          onChange={(e) => setInputUrls(prev => ({ ...prev, [slot.id]: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveSlot(slot);
                            }
                          }}
                          className={`slot-url-input ${isSaved ? 'input-saved-glow' : ''}`}
                        />
                      </div>

                      <button
                        className={`btn-save-slot ${isSaved ? 'is-saved-success' : ''}`}
                        onClick={() => handleSaveSlot(slot)}
                        title="Lưu video này ngay lập tức"
                      >
                        {isSaved ? (
                          <>
                            <Check size={16} />
                            <span>ĐÃ LƯU ✓</span>
                          </>
                        ) : (
                          <>
                            <Check size={16} />
                            <span>LƯU LINK</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Card Footer: Current status & Preview action */}
                    <div className="slot-card-footer">
                      <div className="slot-current-source">
                        <span className="source-label">Nguồn phát:</span>
                        {ytId ? (
                          <span className="source-badge yt-source">
                            <Youtube size={12} className="text-danger" />
                            <span>YouTube ID: {ytId}</span>
                          </span>
                        ) : (tiktokId || isTT) ? (
                          <span className="source-badge yt-source" style={{ borderColor: 'rgba(0, 242, 254, 0.4)', background: 'rgba(0, 242, 254, 0.1)' }}>
                            <span style={{ color: '#00f2fe' }}>🎵 TikTok: {tiktokId || 'Đã nhận link'}</span>
                          </span>
                        ) : hasCustom ? (
                          <span className="source-badge yt-source" style={{ borderColor: 'rgba(16, 185, 129, 0.4)', background: 'rgba(16, 185, 129, 0.1)' }}>
                            <span style={{ color: '#10b981' }}>🌐 Video Riêng Của Bạn</span>
                          </span>
                        ) : (
                          <span className="source-badge mp4-source">
                            <span>Video MP4 Mặc Định</span>
                          </span>
                        )}
                      </div>

                      <div className="slot-action-btns">
                        <button 
                          className="btn-slot-preview"
                          onClick={() => handlePreview(slot, currentSavedUrl)}
                          title="Xem thử video hoạt động"
                        >
                          <Play size={13} />
                          <span>Xem thử</span>
                        </button>

                        {hasCustom && (
                          <button 
                            className="btn-slot-reset"
                            onClick={() => handleResetSlot(slot)}
                            title="Xóa link riêng và khôi phục video mặc định"
                          >
                            <RotateCcw size={13} />
                            <span>Khôi phục gốc</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="video-hub-footer">
          <div className="hub-footer-hint">
            <span>💡 <strong>Khuyên dùng:</strong> Sử dụng <strong>Link YouTube / YouTube Shorts</strong> để video tải nhanh trong 0.1s, mượt mà 60fps và không bị giới hạn <em>Overload Protect</em> như TikTok!</span>
          </div>

          <button className="btn-hub-done" onClick={onClose}>
            <span>HOÀN TẤT & ĐÓNG</span>
          </button>
        </div>
      </div>

      {/* Guide Modal */}
      <YouTubeGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Batch Import/Export Modal */}
      <BatchImportExportModal
        isOpen={isBatchOpen}
        onClose={() => setIsBatchOpen(false)}
        onDataChanged={refreshOverrides}
      />

      {/* Video Player Modal for Preview */}
      {previewVideo && (
        <VideoPlayerModal
          video={previewVideo}
          isOpen={true}
          onClose={() => setPreviewVideo(null)}
          onWatchedChanged={() => {}}
        />
      )}
    </div>
  );
};
