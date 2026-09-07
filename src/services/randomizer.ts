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
   * Selects a random grid position (1-9) while avoiding immediately repeated positions
   */
  public getNextPosition(excludeId?: number): GridPosition {
    const pool = BADMINTON_POSITIONS.filter(p => {
      // Exclude passed ID
      if (excludeId !== undefined && p.id === excludeId) return false;
      // Exclude recently picked positions if pool allows
      return !this.recentPositionIds.includes(p.id);
    });

    const candidates = pool.length > 0 ? pool : BADMINTON_POSITIONS.filter(p => p.id !== excludeId);
    const selected = candidates[Math.floor(Math.random() * candidates.length)];

    // Update recent history
    this.recentPositionIds.push(selected.id);
    if (this.recentPositionIds.length > this.maxPositionHistory) {
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
