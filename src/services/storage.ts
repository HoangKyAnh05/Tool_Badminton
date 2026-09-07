import { TrainingConfig, TrainingResultStats } from '../types';

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

  isVideoWatched(videoId: string): boolean {
    const list = storageService.loadWatchedVideos();
    return list.includes(videoId);
  }
};
