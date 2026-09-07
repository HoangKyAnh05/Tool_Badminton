import { useState, useRef, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  TrainingConfig, 
  SessionState, 
  ActiveRoundData, 
  TrainingResultStats 
} from '../types';
import { randomizer } from '../services/randomizer';
import { storageService, DEFAULT_CONFIG } from '../services/storage';
import { useSound } from './useSound';

export function useTraining() {
  const [config, setConfig] = useState<TrainingConfig>(() => storageService.loadConfig());
  const [state, setState] = useState<SessionState>('IDLE');
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [activeData, setActiveData] = useState<ActiveRoundData | null>(null);
  const [countdownNum, setCountdownNum] = useState<number | string>(3);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [results, setResults] = useState<TrainingResultStats | null>(null);

  // Sound generator
  const { 
    playCountdownBeep, 
    playGoSound, 
    playCorrect, 
    playIncorrect, 
    playComplete 
  } = useSound(config.soundEnabled);

  // Refs for animation & precise timing loops
  const timerLoopRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const roundsHistoryRef = useRef<ActiveRoundData[]>([]);
  const stateRef = useRef<SessionState>('IDLE');
  const activeDataRef = useRef<ActiveRoundData | null>(null);
  const currentRoundRef = useRef<number>(1);
  const configRef = useRef<TrainingConfig>(config);

  // Keep refs in sync
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    activeDataRef.current = activeData;
  }, [activeData]);

  useEffect(() => {
    currentRoundRef.current = currentRound;
  }, [currentRound]);

  useEffect(() => {
    configRef.current = config;
    storageService.saveConfig(config);
  }, [config]);

  // Clean up any running timers on unmount
  useEffect(() => {
    return () => {
      if (timerLoopRef.current) cancelAnimationFrame(timerLoopRef.current);
    };
  }, []);

  // Update training configuration
  const updateConfig = useCallback((partial: Partial<TrainingConfig>) => {
    setConfig(prev => ({ ...prev, ...partial }));
  }, []);

  // Finish whole training session
  const finishSession = useCallback(() => {
    if (timerLoopRef.current) cancelAnimationFrame(timerLoopRef.current);
    setState('COMPLETE');

    const history = [...roundsHistoryRef.current];
    const totalRounds = configRef.current.totalRounds;
    const completedRounds = history.length;

    // Calculate theory accuracy & reaction metrics
    let theoryCorrectCount = 0;
    let theoryTotalCount = 0;
    const physicalTimes: number[] = [];
    const modeBreakdown = { tay: 0, chan: 0, tayChan: 0, lyThuyet: 0 };

    history.forEach(r => {
      if (r.actualMode === 'TAY') modeBreakdown.tay++;
      else if (r.actualMode === 'CHÂN') modeBreakdown.chan++;
      else if (r.actualMode === 'TAY + CHÂN') modeBreakdown.tayChan++;
      else if (r.actualMode === 'LÝ THUYẾT') {
        modeBreakdown.lyThuyet++;
        theoryTotalCount++;
        if (r.isCorrect) theoryCorrectCount++;
      }

      if (r.responseTime && r.responseTime > 0 && r.actualMode !== 'LÝ THUYẾT') {
        physicalTimes.push(r.responseTime);
      }
    });

    const averageResponseTime = physicalTimes.length > 0 
      ? Number((physicalTimes.reduce((a, b) => a + b, 0) / physicalTimes.length).toFixed(2))
      : (theoryTotalCount > 0 ? 1.2 : 0);

    const bestResponseTime = physicalTimes.length > 0
      ? Number(Math.min(...physicalTimes).toFixed(2))
      : 0;

    let accuracy = 100;
    if (theoryTotalCount > 0) {
      accuracy = Math.round((theoryCorrectCount / theoryTotalCount) * 100);
    }

    const sessionStats: TrainingResultStats = {
      id: 'session_' + Date.now(),
      date: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      mode: configRef.current.mode,
      totalRounds,
      completedRounds,
      accuracy,
      averageResponseTime,
      bestResponseTime,
      modeBreakdown,
      theoryCorrectCount,
      theoryTotalCount,
      historyRounds: history
    };

    setResults(sessionStats);
    storageService.saveSession(sessionStats);

    // Audio & Confetti celebration
    playComplete();
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if canvas blocked
    }
  }, [playComplete]);

  // Start next round or end
  const startNextRoundOrFinish = useCallback(() => {
    const nextRound = currentRoundRef.current + 1;
    if (nextRound > configRef.current.totalRounds) {
      finishSession();
      return;
    }
    setCurrentRound(nextRound);
    startRoundSequence(nextRound);
  }, [finishSession]);

  // Start active action for physical or theory round
  const executeActiveRound = useCallback((roundNum: number, actualMode: 'TAY' | 'CHÂN' | 'TAY + CHÂN' | 'LÝ THUYẾT') => {
    setState('ACTIVE');
    const now = performance.now();
    startTimeRef.current = now;

    if (actualMode === 'LÝ THUYẾT') {
      const q = randomizer.getNextQuestion();
      const roundData: ActiveRoundData = {
        roundNumber: roundNum,
        totalRounds: configRef.current.totalRounds,
        actualMode: 'LÝ THUYẾT',
        question: q,
        startTime: now
      };
      setActiveData(roundData);
      setRemainingTime(0);
    } else {
      const pos = randomizer.getNextPosition();
      const roundData: ActiveRoundData = {
        roundNumber: roundNum,
        totalRounds: configRef.current.totalRounds,
        actualMode,
        position: pos,
        startTime: now
      };
      setActiveData(roundData);

      // Play "GO!" sound for movement
      playGoSound();

      const isUnlimited = configRef.current.speedPreset === 'unlimited' || configRef.current.actionDuration <= 0;

      if (isUnlimited) {
        // Unlimited mode: timer counts up elapsed seconds and does not auto-abort
        setRemainingTime(0);
        const loop = (timestamp: number) => {
          const elapsed = (timestamp - now) / 1000;
          setRemainingTime(Number(elapsed.toFixed(1)));
          timerLoopRef.current = requestAnimationFrame(loop);
        };
        timerLoopRef.current = requestAnimationFrame(loop);
      } else {
        // Precision countdown loop for physical movement action duration
        const durationMs = configRef.current.actionDuration * 1000;
        setRemainingTime(configRef.current.actionDuration);

        const loop = (timestamp: number) => {
          const elapsed = timestamp - now;
          const left = Math.max(0, (durationMs - elapsed) / 1000);
          setRemainingTime(Number(left.toFixed(2)));

          if (elapsed >= durationMs) {
            // Action time elapsed
            const recordedRound: ActiveRoundData = {
              ...roundData,
              responseTime: Number((configRef.current.actionDuration).toFixed(2))
            };
            roundsHistoryRef.current.push(recordedRound);

            // Rest phase or straight next
            if (configRef.current.restDuration > 0) {
              setState('REST');
              setRemainingTime(configRef.current.restDuration);
              setTimeout(() => {
                if (stateRef.current !== 'IDLE' && stateRef.current !== 'PAUSED') {
                  startNextRoundOrFinish();
                }
              }, configRef.current.restDuration * 1000);
            } else {
              startNextRoundOrFinish();
            }
          } else {
            timerLoopRef.current = requestAnimationFrame(loop);
          }
        };

        timerLoopRef.current = requestAnimationFrame(loop);
      }
    }
  }, [playGoSound, startNextRoundOrFinish]);

  // Manually finish current physical action round (triggered by Space key or screen tap)
  const completeCurrentAction = useCallback(() => {
    if (stateRef.current !== 'ACTIVE') return;
    if (!activeDataRef.current || activeDataRef.current.actualMode === 'LÝ THUYẾT') return;

    if (timerLoopRef.current) cancelAnimationFrame(timerLoopRef.current);

    const now = performance.now();
    const elapsedSec = Number(Math.max(0.1, (now - startTimeRef.current) / 1000).toFixed(2));

    const recordedRound: ActiveRoundData = {
      ...activeDataRef.current,
      responseTime: elapsedSec
    };
    roundsHistoryRef.current.push(recordedRound);

    // Play confirm tone
    playGoSound();

    if (configRef.current.restDuration > 0) {
      setState('REST');
      setRemainingTime(configRef.current.restDuration);
      setTimeout(() => {
        if (stateRef.current !== 'IDLE' && stateRef.current !== 'PAUSED') {
          startNextRoundOrFinish();
        }
      }, configRef.current.restDuration * 1000);
    } else {
      startNextRoundOrFinish();
    }
  }, [playGoSound, startNextRoundOrFinish]);

  // Spacebar hotkey listener to advance exercises
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If focused inside an input or textarea, ignore
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return;
      }
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (stateRef.current === 'ACTIVE' && activeDataRef.current?.actualMode !== 'LÝ THUYẾT') {
          completeCurrentAction();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [completeCurrentAction]);

  // Round sequence with countdown 3-2-1
  const startRoundSequence = useCallback((roundNum: number) => {
    if (timerLoopRef.current) cancelAnimationFrame(timerLoopRef.current);

    const prevMode = roundsHistoryRef.current.length > 0 
      ? roundsHistoryRef.current[roundsHistoryRef.current.length - 1].actualMode 
      : undefined;

    const actualMode = randomizer.determineRoundMode(configRef.current.mode, prevMode);

    // If first round or physical round, run prep countdown
    if (roundNum === 1 && configRef.current.prepDuration > 0) {
      setState('COUNTDOWN');
      let step = 3;
      setCountdownNum(3);
      playCountdownBeep(440);

      const cdInterval = setInterval(() => {
        step -= 1;
        if (step > 0) {
          setCountdownNum(step);
          playCountdownBeep(440);
        } else if (step === 0) {
          setCountdownNum('GO!');
          playGoSound();
        } else {
          clearInterval(cdInterval);
          executeActiveRound(roundNum, actualMode);
        }
      }, 800);
    } else {
      executeActiveRound(roundNum, actualMode);
    }
  }, [executeActiveRound, playCountdownBeep, playGoSound]);

  // Submit theory answer
  const submitAnswer = useCallback((selectedOptionId: 'A' | 'B' | 'C' | 'D') => {
    if (!activeDataRef.current || activeDataRef.current.actualMode !== 'LÝ THUYẾT' || !activeDataRef.current.question) {
      return;
    }
    // Prevent multiple submissions
    if (activeDataRef.current.userAnswer !== undefined) return;

    const q = activeDataRef.current.question;
    const isCorrect = selectedOptionId === q.correctAnswer;
    const responseTime = Number(((performance.now() - activeDataRef.current.startTime) / 1000).toFixed(2));

    const updatedData: ActiveRoundData = {
      ...activeDataRef.current,
      userAnswer: selectedOptionId,
      isCorrect,
      responseTime
    };

    setActiveData(updatedData);
    roundsHistoryRef.current.push(updatedData);

    if (isCorrect) {
      playCorrect();
    } else {
      playIncorrect();
    }
  }, [playCorrect, playIncorrect]);

  // Advance from theory feedback to next round
  const nextTheoryQuestion = useCallback(() => {
    startNextRoundOrFinish();
  }, [startNextRoundOrFinish]);

  // Start whole session from Beginning
  const startSession = useCallback(() => {
    if (timerLoopRef.current) cancelAnimationFrame(timerLoopRef.current);
    randomizer.reset();
    roundsHistoryRef.current = [];
    setCurrentRound(1);
    setResults(null);
    startRoundSequence(1);
  }, [startRoundSequence]);

  // Abort session back to Home/Idle
  const abortSession = useCallback(() => {
    if (timerLoopRef.current) cancelAnimationFrame(timerLoopRef.current);
    setState('IDLE');
    setActiveData(null);
    setRemainingTime(0);
  }, []);

  // Pause / Resume
  const togglePause = useCallback(() => {
    setState(prev => prev === 'PAUSED' ? 'ACTIVE' : 'PAUSED');
  }, []);

  return {
    config,
    updateConfig,
    state,
    setState,
    currentRound,
    activeData,
    countdownNum,
    remainingTime,
    results,
    startSession,
    abortSession,
    togglePause,
    completeCurrentAction,
    submitAnswer,
    nextTheoryQuestion,
    finishSession
  };
}
