// Core Type Definitions for Badminton Reaction & Training App

export type TrainingMode = 'TAY' | 'CHÂN' | 'TAY + CHÂN' | 'LÝ THUYẾT' | 'TOÀN BỘ';

export type SpeedPreset = 'very_slow' | 'slow' | 'normal' | 'fast' | 'very_fast' | 'custom';

export type SessionState = 
  | 'IDLE' 
  | 'SETUP' 
  | 'COUNTDOWN' 
  | 'ACTIVE' 
  | 'REST' 
  | 'PAUSED' 
  | 'COMPLETE';

export interface GridPosition {
  id: number; // 1 to 9
  name: string; // e.g. "Lưới Trái (Backhand Net)"
  zoneName: string; // Short code e.g. "LƯỚI TRÁI"
  row: number; // 1, 2, 3
  col: number; // 1, 2, 3
  directionLabel: string; // e.g. "Góc Lưới Trái (P1)"
  courtZone: 'front' | 'mid' | 'rear';
  courtSide: 'left' | 'center' | 'right';
  
  // Visual & movement data
  handMovement: {
    title: string;
    subTitle: string;
    description: string;
    coachingTip: string;
    imageSvg?: string;
    imageUrl?: string;
  };
  footMovement: {
    title: string;
    subTitle: string;
    description: string;
    coachingTip: string;
    imageSvg?: string;
    imageUrl?: string;
  };
  combinedMovement: {
    title: string;
    subTitle: string;
    description: string;
    coachingTip: string;
    imageSvg?: string;
    imageUrl?: string;
  };
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
  cameraEnabled: boolean;
}

export interface ActiveRoundData {
  roundNumber: number;
  totalRounds: number;
  actualMode: 'TAY' | 'CHÂN' | 'TAY + CHÂN' | 'LÝ THUYẾT';
  position?: GridPosition;
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
}
