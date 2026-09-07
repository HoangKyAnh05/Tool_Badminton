import React, { useState } from 'react';
import { useTraining } from './hooks/useTraining';
import { useCamera } from './hooks/useCamera';
import { Navbar } from './components/Navbar/Navbar';
import { HomeDashboard } from './components/Home/HomeDashboard';
import { TrainingSetup } from './components/Setup/TrainingSetup';
import { TrainingArena } from './components/Arena/TrainingArena';
import { TrainingResults } from './components/Results/TrainingResults';
import { HistoryModal } from './components/History/HistoryModal';
import { TrainingMode } from './types';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'HOME' | 'SETUP' | 'TRAINING' | 'RESULTS'>('HOME');
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  const training = useTraining();
  const camera = useCamera(training.config.cameraEnabled);

  // Home actions
  const handleSelectMode = (mode: TrainingMode) => {
    training.updateConfig({ mode });
    setCurrentView('SETUP');
  };

  const handleQuickStart = () => {
    setCurrentView('SETUP');
  };

  // Setup actions
  const handleStartTraining = () => {
    setCurrentView('TRAINING');
    training.startSession();
  };

  // Arena actions
  const handleAbort = () => {
    training.abortSession();
    setCurrentView('HOME');
  };

  // If training state transitions to COMPLETE, switch view to RESULTS
  React.useEffect(() => {
    if (training.state === 'COMPLETE') {
      setCurrentView('RESULTS');
    }
  }, [training.state]);

  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <Navbar
        currentMode={training.config.mode}
        state={training.state}
        soundEnabled={training.config.soundEnabled}
        onToggleSound={() => training.updateConfig({ soundEnabled: !training.config.soundEnabled })}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onGoHome={() => {
          if (training.state === 'ACTIVE' || training.state === 'COUNTDOWN') {
            if (window.confirm('Bạn có chắc muốn thoát bài tập đang diễn ra không?')) {
              handleAbort();
            }
          } else {
            setCurrentView('HOME');
          }
        }}
      />

      {/* Main Content View Switcher */}
      <main className="app-main-content">
        {currentView === 'HOME' && (
          <HomeDashboard
            onSelectMode={handleSelectMode}
            onQuickStart={handleQuickStart}
          />
        )}

        {currentView === 'SETUP' && (
          <TrainingSetup
            config={training.config}
            onUpdateConfig={training.updateConfig}
            onStart={handleStartTraining}
            onBack={() => setCurrentView('HOME')}
          />
        )}

        {currentView === 'TRAINING' && (
          <TrainingArena
            state={training.state}
            config={training.config}
            currentRound={training.currentRound}
            activeData={training.activeData}
            countdownNum={training.countdownNum}
            remainingTime={training.remainingTime}
            onAbort={handleAbort}
            onTogglePause={training.togglePause}
            onSubmitAnswer={training.submitAnswer}
            onNextTheory={training.nextTheoryQuestion}
            cameraStream={camera.stream}
            cameraActive={camera.isActive}
            cameraLoading={camera.isLoading}
            cameraError={camera.error}
            onToggleCamera={camera.toggleCamera}
            onRetryCamera={camera.startCamera}
          />
        )}

        {currentView === 'RESULTS' && training.results && (
          <TrainingResults
            stats={training.results}
            onRestart={() => {
              setCurrentView('TRAINING');
              training.startSession();
            }}
            onHome={() => setCurrentView('HOME')}
            onViewHistory={() => setIsHistoryOpen(true)}
          />
        )}
      </main>

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </div>
  );
};

export default App;
