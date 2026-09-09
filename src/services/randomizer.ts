import { GridPosition, TheoryQuestion, TrainingMode, QuestionOption } from '../types';
import { BADMINTON_POSITIONS } from '../data/movements';
import { BADMINTON_QUESTIONS } from '../data/questions';

export class BadmintonRandomizer {
  private recentPositionIds: number[] = [];
  private recentQuestionIds: (number | string)[] = [];
  private maxPositionHistory: number = 2; // Prevent immediate repeat of last 2 positions
  private physicalModes: ('TAY' | 'CHÂN' | 'TAY + CHÂN')[] = ['TAY', 'CHÂN', 'TAY + CHÂN'];

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.recentPositionIds = [];
    this.recentQuestionIds = [];
  }

  /**
   * Selects a random grid position (1-9) matching targetZones while avoiding repeats
   */
  public getNextPosition(excludeId?: number, targetZones?: number[]): GridPosition {
    const validPositions = (targetZones && targetZones.length > 0)
      ? BADMINTON_POSITIONS.filter(p => targetZones.includes(p.id))
      : BADMINTON_POSITIONS;

    const basePositions = validPositions.length > 0 ? validPositions : BADMINTON_POSITIONS;

    const pool = basePositions.filter(p => {
      if (basePositions.length > 1 && excludeId !== undefined && p.id === excludeId) return false;
      return !this.recentPositionIds.includes(p.id);
    });

    const candidates = pool.length > 0 ? pool : basePositions.filter(p => basePositions.length <= 1 || p.id !== excludeId);
    const finalCandidates = candidates.length > 0 ? candidates : basePositions;
    const selected = finalCandidates[Math.floor(Math.random() * finalCandidates.length)];

    // Update recent history
    this.recentPositionIds.push(selected.id);
    if (this.recentPositionIds.length > Math.min(this.maxPositionHistory, Math.max(1, basePositions.length - 1))) {
      this.recentPositionIds.shift();
    }

    return selected;
  }

  /**
   * Selects a random theory question while minimizing repeats
   */
  public getNextQuestion(): TheoryQuestion {
    const available = BADMINTON_QUESTIONS.filter(
      q => !this.recentQuestionIds.includes(q.id)
    );

    const pool = available.length > 0 ? available : BADMINTON_QUESTIONS;
    const baseQuestion = pool[Math.floor(Math.random() * pool.length)];

    this.recentQuestionIds.push(baseQuestion.id);
    if (this.recentQuestionIds.length >= BADMINTON_QUESTIONS.length - 2) {
      this.recentQuestionIds.shift();
    }

    // Shuffle options and recalculate correct answer letter
    return this.shuffleQuestionOptions(baseQuestion);
  }

  /**
   * Shuffles question options while ensuring correctAnswer matches the new option letter
   */
  private shuffleQuestionOptions(question: TheoryQuestion): TheoryQuestion {
    const originalCorrectOption = question.options.find(opt => opt.id === question.correctAnswer);
    const correctText = originalCorrectOption ? originalCorrectOption.text : question.options[0].text;

    // Shuffle options texts
    const shuffledTexts = [...question.options.map(o => o.text)].sort(() => Math.random() - 0.5);
    const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

    let newCorrectLetter: 'A' | 'B' | 'C' | 'D' = 'A';

    const newOptions: QuestionOption[] = letters.map((letter, idx) => {
      const text = shuffledTexts[idx];
      if (text === correctText) {
        newCorrectLetter = letter;
      }
      return {
        id: letter,
        text: text
      };
    });

    return {
      ...question,
      options: newOptions,
      correctAnswer: newCorrectLetter
    };
  }

  /**
   * Determines the actual round mode.
   * If config mode is 'TOÀN BỘ', dynamically mixes TAY, CHÂN, TAY + CHÂN, LÝ THUYẾT.
   */
  public determineRoundMode(
    configMode: TrainingMode, 
    lastMode?: 'TAY' | 'CHÂN' | 'TAY + CHÂN' | 'LÝ THUYẾT'
  ): 'TAY' | 'CHÂN' | 'TAY + CHÂN' | 'LÝ THUYẾT' {
    if (configMode !== 'TOÀN BỘ') {
      return configMode as 'TAY' | 'CHÂN' | 'TAY + CHÂN' | 'LÝ THUYẾT';
    }

    const allModes: ('TAY' | 'CHÂN' | 'TAY + CHÂN' | 'LÝ THUYẾT')[] = [
      'TAY', 
      'CHÂN', 
      'TAY + CHÂN', 
      'LÝ THUYẾT'
    ];

    // Filter out last mode to avoid same mode 3 times in a row
    const candidates = allModes.filter(m => m !== lastMode);
    return candidates[Math.floor(Math.random() * candidates.length)];
  }
}

export const randomizer = new BadmintonRandomizer();
