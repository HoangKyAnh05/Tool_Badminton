import { TrainingConfig, TrainingResultStats, TacticsVideo } from '../types';

const STORAGE_KEYS = {
  SETTINGS: 'badminton_trainer_settings_v1',
  HISTORY: 'badminton_trainer_history_v1',
  STATS: 'badminton_trainer_lifetime_stats_v1',
  WATCHED_VIDEOS: 'badminton_watched_videos_v1'
};

export const DEFAULT_CONFIG: TrainingConfig = {
  mode: 'TOÀN BỘ',
  totalRounds: 15,
  speedPreset: 'slow',
  actionDuration: 4.0,
  prepDuration: 6,
  restDuration: 1.5,
  soundEnabled: true,
  voiceCoachEnabled: true,
  targetZones: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  manualAdvance: true,
  cameraEnabled: false
};

export interface LifetimeStats {
  totalSessions: number;
  totalRoundsCompleted: number;
  bestReactionTime: number; // in seconds
  averageAccuracy: number; // percentage
  streakDays: number;
  lastTrainedDate: string;
}

const DEFAULT_LIFETIME: LifetimeStats = {
  totalSessions: 0,
  totalRoundsCompleted: 0,
  bestReactionTime: 0,
  averageAccuracy: 0,
  streakDays: 0,
  lastTrainedDate: ''
};

export const storageService = {
  loadConfig(): TrainingConfig {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (data) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(data) };
      }
    } catch (e) {
      console.warn('Could not read config from localStorage', e);
    }
    return { ...DEFAULT_CONFIG };
  },

  saveConfig(config: TrainingConfig): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(config));
    } catch (e) {
      console.warn('Could not save config to localStorage', e);
    }
  },

  loadHistory(): TrainingResultStats[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Could not read history from localStorage', e);
    }
    return [];
  },

  saveSession(result: TrainingResultStats): void {
    try {
      const history = this.loadHistory();
      // Prepend newest session
      history.unshift(result);
      // Keep maximum 50 sessions
      if (history.length > 50) history.pop();
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));

      // Update lifetime stats
      this.updateLifetimeStats(result);
    } catch (e) {
      console.warn('Could not save session to localStorage', e);
    }
  },

  clearHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
    } catch (e) {
      console.warn('Could not clear history', e);
    }
  },

  loadLifetimeStats(): LifetimeStats {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STATS);
      if (data) {
        return { ...DEFAULT_LIFETIME, ...JSON.parse(data) };
      }
    } catch (e) {
      console.warn('Could not read stats from localStorage', e);
    }
    return { ...DEFAULT_LIFETIME };
  },

  updateLifetimeStats(newResult: TrainingResultStats): void {
    try {
      const stats = this.loadLifetimeStats();
      const todayStr = new Date().toISOString().slice(0, 10);

      stats.totalSessions += 1;
      stats.totalRoundsCompleted += newResult.completedRounds;

      // Update best reaction time
      if (newResult.bestResponseTime > 0) {
        if (stats.bestReactionTime === 0 || newResult.bestResponseTime < stats.bestReactionTime) {
          stats.bestReactionTime = newResult.bestResponseTime;
        }
      }

      // Calculate new moving average accuracy
      stats.averageAccuracy = Math.round(
        (stats.averageAccuracy * (stats.totalSessions - 1) + newResult.accuracy) / stats.totalSessions
      );

      // Streak logic
      if (stats.lastTrainedDate) {
        const lastDate = new Date(stats.lastTrainedDate);
        const today = new Date(todayStr);
        const diffDays = Math.round((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          stats.streakDays += 1;
        } else if (diffDays > 1) {
          stats.streakDays = 1;
        }
      } else {
        stats.streakDays = 1;
      }
      stats.lastTrainedDate = todayStr;

      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch (e) {
      console.warn('Could not update lifetime stats', e);
    }
  },

  loadWatchedVideos(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WATCHED_VIDEOS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Could not load watched videos', e);
    }
    return [];
  },

  markVideoWatched(videoId: string): void {
    try {
      const current = storageService.loadWatchedVideos();
      if (!current.includes(videoId)) {
        const updated = [...current, videoId];
        localStorage.setItem(STORAGE_KEYS.WATCHED_VIDEOS, JSON.stringify(updated));
      }
    } catch (e) {
      console.warn('Could not mark video as watched', e);
    }
  },

  unmarkVideoWatched(videoId: string): void {
    try {
      const current = storageService.loadWatchedVideos();
      const updated = current.filter(id => id !== videoId);
      localStorage.setItem(STORAGE_KEYS.WATCHED_VIDEOS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not unmark video as watched', e);
    }
  },

  toggleVideoWatched(videoId: string): boolean {
    const isWatched = storageService.isVideoWatched(videoId);
    if (isWatched) {
      storageService.unmarkVideoWatched(videoId);
      return false;
    } else {
      storageService.markVideoWatched(videoId);
      return true;
    }
  },

  isVideoWatched(videoId: string): boolean {
    const list = storageService.loadWatchedVideos();
    return list.includes(videoId);
  },

  loadCustomVideos(): TacticsVideo[] {
    try {
      const data = localStorage.getItem('badminton_custom_videos_v1');
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Could not load custom videos', e);
    }
    return [];
  },

  saveCustomVideo(video: TacticsVideo): void {
    try {
      const list = storageService.loadCustomVideos();
      const existingIdx = list.findIndex(v => v.id === video.id);
      if (existingIdx >= 0) {
        list[existingIdx] = video;
      } else {
        list.unshift(video);
      }
      localStorage.setItem('badminton_custom_videos_v1', JSON.stringify(list));
    } catch (e) {
      console.warn('Could not save custom video', e);
    }
  },

  deleteCustomVideo(videoId: string): void {
    try {
      const list = storageService.loadCustomVideos().filter(v => v.id !== videoId);
      localStorage.setItem('badminton_custom_videos_v1', JSON.stringify(list));
    } catch (e) {
      console.warn('Could not delete custom video', e);
    }
  },

  // 100-Day Challenge Progress
  loadDailyProgress(): DailyChallengeProgress {
    try {
      const data = localStorage.getItem('badminton_daily_challenge_100_v1');
      if (data) {
        return { ...DEFAULT_DAILY_CHALLENGE, ...JSON.parse(data) };
      }
    } catch (e) {
      console.warn('Could not load daily challenge progress', e);
    }
    return { ...DEFAULT_DAILY_CHALLENGE };
  },

  completeDayWorkout(dayNumber: number): DailyChallengeProgress {
    try {
      const current = storageService.loadDailyProgress();
      const todayStr = new Date().toISOString().split('T')[0];
      
      const newCompleted = current.completedDays.includes(dayNumber)
        ? current.completedDays
        : [...current.completedDays, dayNumber].sort((a, b) => a - b);
      
      // Calculate streak
      let newStreak = current.streak;
      if (current.lastCompletedDate) {
        const lastDate = new Date(current.lastCompletedDate);
        const today = new Date(todayStr);
        const diffDays = Math.round((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      // Current active day is the next incomplete day, or dayNumber + 1
      const nextDay = Math.min(100, Math.max(current.currentDay, dayNumber + 1));

      const updated: DailyChallengeProgress = {
        currentDay: nextDay,
        completedDays: newCompleted,
        lastCompletedDate: todayStr,
        streak: newStreak
      };

      localStorage.setItem('badminton_daily_challenge_100_v1', JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.warn('Could not save daily challenge completion', e);
      return storageService.loadDailyProgress();
    }
  },

  resetDailyProgress(): DailyChallengeProgress {
    try {
      localStorage.removeItem('badminton_daily_challenge_100_v1');
    } catch (e) {
      console.warn('Could not reset daily challenge', e);
    }
    return { ...DEFAULT_DAILY_CHALLENGE };
  },

  // Video YouTube / Custom Overrides
  loadVideoOverrides(): Record<string, Partial<TacticsVideo>> {
    try {
      const data = localStorage.getItem('badminton_video_overrides_v1');
      if (data) {
        const parsed = JSON.parse(data);
        // Automatically purge any dummy/broken generated TikTok URLs
        const cleaned: Record<string, Partial<TacticsVideo>> = {};
        let hasBad = false;
        for (const [k, v] of Object.entries(parsed)) {
          let url = ((v as any)?.videoUrl || '') as string;
          if (
            url.includes('8192839') || 
            url.includes('8293819') || 
            url.includes('7470') || 
            url.includes('7462819') || 
            url.includes('7463819') || 
            url.includes('7464819') || 
            url.includes('7465819') || 
            url.includes('7466819') || 
            url.includes('7467819') || 
            url.includes('7468819') || 
            url.includes('7469819')
          ) {
            hasBad = true;
          } else if (url.includes('tiktok.com')) {
            const match = url.match(/(\d{15,22})/);
            if (match && match[1]) {
              cleaned[k] = {
                ...(v as any),
                videoUrl: `./videos/training/${match[1]}.mp4`
              };
              hasBad = true;
            } else {
              cleaned[k] = v as Partial<TacticsVideo>;
            }
          } else {
            cleaned[k] = v as Partial<TacticsVideo>;
          }
        }
        if (hasBad) {
          localStorage.setItem('badminton_video_overrides_v1', JSON.stringify(cleaned));
          return cleaned;
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Could not load video overrides', e);
    }
    return {};
  },

  saveVideoOverride(videoId: string, override: Partial<TacticsVideo>): void {
    try {
      const current = this.loadVideoOverrides();
      current[videoId] = {
        ...(current[videoId] || {}),
        ...override,
        isCustom: true
      };
      localStorage.setItem('badminton_video_overrides_v1', JSON.stringify(current));
    } catch (e) {
      console.warn('Could not save video override', e);
    }
  },

  removeVideoOverride(videoId: string): void {
    try {
      const current = this.loadVideoOverrides();
      delete current[videoId];
      localStorage.setItem('badminton_video_overrides_v1', JSON.stringify(current));
    } catch (e) {
      console.warn('Could not remove video override', e);
    }
  },

  // Export & Import toàn bộ overrides ra/vào JSON
  exportVideoOverrides(): string {
    const overrides = this.loadVideoOverrides();
    const customVideos = this.loadCustomVideos();
    return JSON.stringify({
      version: '1.0',
      exportDate: new Date().toISOString(),
      overrides,
      customVideos
    }, null, 2);
  },

  importVideoOverrides(jsonString: string | object): { success: boolean; count: number; error?: string } {
    try {
      const data = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
      let count = 0;
      const targetOverrides = (data && data.overrides && typeof data.overrides === 'object') ? data.overrides : data;
      if (targetOverrides && typeof targetOverrides === 'object') {
        const current = this.loadVideoOverrides();
        Object.assign(current, targetOverrides);
        localStorage.setItem('badminton_video_overrides_v1', JSON.stringify(current));
        count += Object.keys(targetOverrides).length;
      }
      if (Array.isArray(data?.customVideos)) {
        const existing = this.loadCustomVideos();
        data.customVideos.forEach((cv: TacticsVideo) => {
          if (!existing.some(x => x.id === cv.id)) {
            existing.push(cv);
            count++;
          }
        });
        localStorage.setItem('badminton_custom_videos_v1', JSON.stringify(existing));
      }
      return { success: true, count };
    } catch (err: any) {
      return { success: false, count: 0, error: err?.message || 'Định dạng JSON không hợp lệ' };
    }
  },

  // User Experience Level (Người Mới vs Nâng Cao)
  loadUserExperienceLevel(): 'BEGINNER' | 'ADVANCED' {
    try {
      const val = localStorage.getItem('badminton_user_experience_level_v1');
      if (val === 'ADVANCED' || val === 'BEGINNER') {
        return val;
      }
    } catch (e) {
      console.warn('Could not load experience level', e);
    }
    return 'BEGINNER'; // Mặc định thân thiện cho người mới
  },

  saveUserExperienceLevel(level: 'BEGINNER' | 'ADVANCED'): void {
    try {
      localStorage.setItem('badminton_user_experience_level_v1', level);
    } catch (e) {
      console.warn('Could not save experience level', e);
    }
  }
};

export interface DailyChallengeProgress {
  currentDay: number;
  completedDays: number[];
  lastCompletedDate: string | null;
  streak: number;
}

const DEFAULT_DAILY_CHALLENGE: DailyChallengeProgress = {
  currentDay: 1,
  completedDays: [],
  lastCompletedDate: null,
  streak: 0
};

