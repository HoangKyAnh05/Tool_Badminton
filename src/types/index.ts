// Core Type Definitions for Badminton Reaction & Training App

export type TrainingMode = 'TAY' | 'CHÂN' | 'TAY + CHÂN' | 'LÝ THUYẾT' | 'TOÀN BỘ';

export type SpeedPreset = 'very_slow' | 'slow' | 'normal' | 'fast' | 'very_fast' | 'custom' | 'unlimited';

export type SessionState = 
  | 'IDLE' 
  | 'SETUP' 
  | 'COUNTDOWN' 
  | 'ACTIVE' 
  | 'REST' 
  | 'PAUSED' 
  | 'COMPLETE';

export type SkillLevel = 'Cơ bản' | 'Trung cấp' | 'Nâng cao';

export interface GridPosition {
  id: number; // 1 to 9
  name: string; // e.g. "Lưới Trái (Backhand Net)"
  zoneName: string; // Short code e.g. "LƯỚI TRÁI"
  row: number; // 1, 2, 3
  col: number; // 1, 2, 3
  directionLabel: string; // e.g. "Góc Lưới Trái (P1)"
  courtZone: 'front' | 'mid' | 'rear';
  courtSide: 'left' | 'center' | 'right';
  level?: SkillLevel;
  videoUrl?: string;
  
  // Visual & movement data
  handMovement: MovementDetail;
  footMovement: MovementDetail;
  combinedMovement: MovementDetail;
  variations?: MovementVariation[];
}

export interface MovementDetail {
  title: string;
  subTitle: string;
  description: string;
  coachingTip: string;
  imageSvg?: string;
  imageUrl?: string;
}

export interface MovementVariation {
  id: string;
  shotName: string;
  shotType: string;
  level?: SkillLevel;
  videoUrl?: string;
  handMovement: MovementDetail;
  footMovement: MovementDetail;
  combinedMovement: MovementDetail;
}

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export type QuestionCategory = 
  | 'Di chuyển' 
  | 'Đánh đơn' 
  | 'Đánh đôi' 
  | 'Phòng thủ' 
  | 'Tấn công' 
  | 'Footwork' 
  | 'Vị trí sân' 
  | 'Chiến thuật' 
  | 'Đọc hướng cầu' 
  | 'Phản xạ';

export interface TheoryQuestion {
  id: number | string;
  category: QuestionCategory;
  difficulty: 'Cơ bản' | 'Trung bình' | 'Nâng cao';
  question: string;
  options: QuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  contextTip?: string;
}

export interface TrainingConfig {
  mode: TrainingMode;
  totalRounds: number;
  speedPreset: SpeedPreset;
  actionDuration: number; // seconds
  prepDuration: number; // seconds (default 3s)
  restDuration: number; // seconds
  soundEnabled: boolean;
  voiceCoachEnabled?: boolean;
  targetZones?: number[]; // [1..9], e.g. [1, 3, 7, 9] for 4 corners
  manualAdvance?: boolean; // Wait for user click / space before advancing to next cell
  cameraEnabled: boolean;
}

export interface ActiveRoundData {
  roundNumber: number;
  totalRounds: number;
  actualMode: 'TAY' | 'CHÂN' | 'TAY + CHÂN' | 'LÝ THUYẾT';
  position?: GridPosition;
  variation?: MovementVariation;
  variationIndex?: number;
  question?: TheoryQuestion;
  startTime: number;
  userAnswer?: 'A' | 'B' | 'C' | 'D';
  isCorrect?: boolean;
  responseTime?: number; // seconds
}

export interface TrainingResultStats {
  id: string;
  date: string;
  mode: TrainingMode;
  totalRounds: number;
  completedRounds: number;
  accuracy: number; // percentage
  averageResponseTime: number; // seconds
  bestResponseTime: number; // seconds
  modeBreakdown: {
    tay: number;
    chan: number;
    tayChan: number;
    lyThuyet: number;
  };
  theoryCorrectCount: number;
  theoryTotalCount: number;
  historyRounds: ActiveRoundData[];
  zoneStats?: Record<number, { count: number; totalTime: number; avgTime: number }>;
}

export type VideoCategory = 
  | 'DON_NAM' 
  | 'DOI_NAM' 
  | 'DON_NU' 
  | 'DOI_NU'
  | 'POS_1'
  | 'POS_2'
  | 'POS_3'
  | 'POS_4'
  | 'POS_5'
  | 'POS_6'
  | 'POS_7'
  | 'POS_8'
  | 'POS_9';

export interface TacticsVideo {
  id: string;
  category: VideoCategory;
  positionId?: number; // 1 to 9
  level?: SkillLevel; // 'Cơ bản' | 'Trung cấp' | 'Nâng cao'
  title: string;
  subTitle: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  durationText: string;
  tags: string[];
  isCustom?: boolean;
}
