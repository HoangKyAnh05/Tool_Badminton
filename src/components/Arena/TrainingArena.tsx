import React from 'react';
import { 
  SessionState, 
  ActiveRoundData, 
  TrainingConfig 
} from '../../types';
import { Grid9 } from './Grid9';
import { MovementOverlay } from './MovementOverlay';
import { TheoryQuestion } from '../Theory/TheoryQuestion';
import { CameraPreview } from '../Camera/CameraPreview';
import { 
  Pause, 
  Play, 
  XSquare, 
  Zap, 
  Timer as TimerIcon, 
  Coffee,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface TrainingArenaProps {
  state: SessionState;
  config: TrainingConfig;
  currentRound: number;
  activeData: ActiveRoundData | null;
  countdownNum: number | string;
  isArrived?: boolean;
  remainingTime: number;
  onAbort: () => void;
  onTogglePause: () => void;
  onCompleteAction?: () => void;
  onSubmitAnswer: (opt: 'A' | 'B' | 'C' | 'D') => void;
  onNextTheory: () => void;

  // Camera props
  cameraStream: MediaStream | null;
  cameraActive: boolean;
  cameraLoading: boolean;
  cameraError: string | null;
  onToggleCamera: () => void;
  onRetryCamera: () => void;
}

export const TrainingArena: React.FC<TrainingArenaProps> = ({
  state,
  config,
  currentRound,
  activeData,
  countdownNum,
  isArrived = false,
  remainingTime,
  onAbort,
  onTogglePause,
  onCompleteAction,
  onSubmitAnswer,
  onNextTheory,
  cameraStream,
  cameraActive,
  cameraLoading,
  cameraError,
  onToggleCamera,
  onRetryCamera
}) => {
  const isPaused = state === 'PAUSED';
  const isCountdown = state === 'COUNTDOWN';
  const isRest = state === 'REST';
  const isActive = state === 'ACTIVE';

  const isPhysical = activeData && activeData.actualMode !== 'LÝ THUYẾT' && activeData.position;
  const isTheory = activeData && activeData.actualMode === 'LÝ THUYẾT' && activeData.question;
  const isUnlimited = config.speedPreset === 'unlimited' || config.actionDuration <= 0;

  return (
    <div className="training-arena-wrapper">
      {/* Top Arena Control Strip */}
      <div className="arena-top-controls">
        <div className="arena-meta-group">
          <div className="arena-chip round-chip">
            <span className="chip-indicator" />
            <span>LƯỢT <strong>{currentRound}</strong> / {config.totalRounds}</span>
          </div>

          <div className="arena-chip speed-chip">
            <TimerIcon size={16} />
            <span>Tốc độ: <strong>{isUnlimited ? 'Không giới hạn (∞)' : `${config.actionDuration}s`}</strong></span>
          </div>

          {activeData && (
            <div className="arena-chip active-mode-chip">
              <Zap size={16} />
              <span>Chế độ: <strong>{activeData.actualMode}</strong></span>
            </div>
          )}
        </div>

        <div className="arena-buttons-group">
          {isActive && isPhysical && (
            <button 
              className="btn-arena-control next-action-btn animate-pulse"
              onClick={onCompleteAction}
              title="Chuyển sang bài tiếp theo (hoặc bấm phím CÁCH)"
            >
              <Zap size={18} />
              <span>BÀI TIẾP (CÁCH)</span>
            </button>
          )}

          <button 
            className={`btn-arena-control ${isPaused ? 'resume' : 'pause'}`}
            onClick={onTogglePause}
            title={isPaused ? 'Tiếp tục' : 'Tạm dừng'}
          >
            {isPaused ? <Play size={18} /> : <Pause size={18} />}
            <span>{isPaused ? 'TIẾP TỤC' : 'TẠM DỪNG'}</span>
          </button>

          <button 
            className="btn-arena-control abort"
            onClick={onAbort}
            title="Dừng bài tập và quay về"
          >
            <XSquare size={18} />
            <span>DỪNG BÀI TẬP</span>
          </button>
        </div>
      </div>

      {/* Main Center Playground */}
      <div className="arena-stage">
        {/* Background 3x3 Grid (Always in place and 100% visible) */}
        <div className={`grid-stage-wrapper ${isActive && isPhysical ? 'stage-dimmed' : ''}`}>
          <Grid9
            activePositionId={activeData?.position?.id}
            highlightMode={activeData?.actualMode as 'TAY' | 'CHÂN' | 'TAY + CHÂN'}
            countdownNum={countdownNum}
            isCountingDown={isCountdown}
            isArrived={isArrived}
            onPositionClick={() => onCompleteAction?.()}
            interactive={true}
          />
        </div>

        {/* Non-intrusive Corner Guide Pill (Leaves court 100% visible) */}
        {isCountdown && activeData?.position && (
          <div 
            className={`arena-corner-guide animate-slide-right ${isArrived ? 'is-arrived-mode' : ''}`}
            onClick={() => onCompleteAction?.()}
            title="Bấm để xác nhận sẵn sàng ngay (hoặc bấm phím CÁCH)"
          >
            <div className="corner-guide-icon">
              {isArrived ? (
                <CheckCircle2 size={24} className="text-emerald animate-pop" />
              ) : (
                <MapPin size={22} className="text-cyan animate-pulse" />
              )}
            </div>
            <div className="corner-guide-body">
              <div className="corner-guide-label">
                {isArrived ? '✅ ĐÃ DI CHUYỂN TỚI VỊ TRÍ' : '📍 VỊ TRÍ CẦN DI CHUYỂN:'}
              </div>
              <div className="corner-guide-title">
                Ô {activeData.position.id} – {activeData.position.zoneName}
                {activeData.variation && (
                  <span className="corner-guide-variation-tag"> • {activeData.variation.shotName}</span>
                )}
              </div>
              <div className="corner-guide-sub">
                {isArrived 
                  ? 'Chuẩn bị thực hiện động tác...' 
                  : `Đang đếm giây (${countdownNum}s) • Bấm CÁCH hoặc chạm ô để sẵn sàng ngay`}
              </div>
            </div>
          </div>
        )}

        {/* 2. Physical Mode Large Movement Overlay (TAY, CHÂN, TAY + CHÂN) */}
        {isActive && isPhysical && activeData.position && (
          <MovementOverlay
            position={activeData.position}
            variation={activeData.variation}
            variationIndex={activeData.variationIndex}
            mode={activeData.actualMode as 'TAY' | 'CHÂN' | 'TAY + CHÂN'}
            remainingTime={remainingTime}
            totalDuration={config.actionDuration}
            roundNumber={currentRound}
            totalRounds={config.totalRounds}
            isUnlimited={isUnlimited}
            onCompleteAction={onCompleteAction}
          />
        )}

        {/* 3. Tactical Theory Question Card (LÝ THUYẾT) */}
        {isActive && isTheory && activeData.question && (
          <div className="theory-modal-wrapper">
            <TheoryQuestion
              question={activeData.question}
              roundNumber={currentRound}
              totalRounds={config.totalRounds}
              userAnswer={activeData.userAnswer}
              isCorrect={activeData.isCorrect}
              onSelectAnswer={onSubmitAnswer}
              onNext={onNextTheory}
            />
          </div>
        )}

        {/* 4. Rest Phase between rounds */}
        {isRest && (
          <div className="rest-overlay animate-fade-in">
            <div className="rest-card animate-pop">
              <Coffee size={36} className="text-cyan" />
              <h3>NGHỈ HỒI PHỤC</h3>
              <div className="rest-countdown">{remainingTime.toFixed(1)}s</div>
              <p>Thu người về tâm sân (ô số 5) chuẩn bị cho lượt kế tiếp</p>
            </div>
          </div>
        )}

        {/* 5. Paused Overlay */}
        {isPaused && (
          <div className="paused-overlay animate-fade-in">
            <div className="paused-card animate-pop">
              <h2>ĐÃ TẠM DỪNG</h2>
              <p>Bài tập đang được tạm ngưng</p>
              <button className="btn-resume-large" onClick={onTogglePause}>
                <Play size={22} />
                <span>TIẾP TỤC LUYỆN TẬP</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Camera PIP Preview Float */}
      <div className={`camera-floating-container ${isActive && isPhysical && activeData?.position ? 'has-active-modal' : ''}`}>
        <CameraPreview
          stream={cameraStream}
          isActive={cameraActive}
          isLoading={cameraLoading}
          error={cameraError}
          onToggle={onToggleCamera}
          onRetry={onRetryCamera}
        />
      </div>
    </div>
  );
};
