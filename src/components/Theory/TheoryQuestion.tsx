import React from 'react';
import { TheoryQuestion as ITheoryQuestion } from '../../types';
import { CheckCircle2, XCircle, ArrowRight, Brain, Award } from 'lucide-react';

interface TheoryQuestionProps {
  question: ITheoryQuestion;
  roundNumber: number;
  totalRounds: number;
  userAnswer?: 'A' | 'B' | 'C' | 'D';
  isCorrect?: boolean;
  onSelectAnswer: (optionId: 'A' | 'B' | 'C' | 'D') => void;
  onNext: () => void;
}

export const TheoryQuestion: React.FC<TheoryQuestionProps> = ({
  question,
  roundNumber,
  totalRounds,
  userAnswer,
  isCorrect,
  onSelectAnswer,
  onNext
}) => {
  const hasAnswered = userAnswer !== undefined;

  return (
    <div className="theory-container animate-fade-in">
      {/* Top Header Card */}
      <div className="theory-header">
        <div className="theory-meta-left">
          <span className="badge-theory-mode">
            <Brain size={16} />
            LÝ THUYẾT CHIẾN THUẬT
          </span>
          <span className="badge-category">{question.category}</span>
          <span className="badge-difficulty">{question.difficulty}</span>
        </div>

        <div className="theory-meta-right">
          <span className="round-indicator">
            Câu {roundNumber} / {totalRounds}
          </span>
        </div>
      </div>

      {/* Main Question Text */}
      <div className="theory-question-box">
        <h2 className="question-text">{question.question}</h2>
        {question.contextTip && (
          <p className="question-context-tip">💡 <em>{question.contextTip}</em></p>
        )}
      </div>

      {/* 4 Options: A, B, C, D */}
      <div className="theory-options-grid">
        {question.options.map((opt) => {
          const isSelected = userAnswer === opt.id;
          const isTargetCorrect = opt.id === question.correctAnswer;

          let btnClass = 'option-btn';
          if (hasAnswered) {
            if (isSelected && isCorrect) {
              btnClass += ' option-correct';
            } else if (isSelected && !isCorrect) {
              btnClass += ' option-wrong';
            } else if (isTargetCorrect) {
              btnClass += ' option-show-correct';
            } else {
              btnClass += ' option-dimmed';
            }
          }

          return (
            <button
              key={opt.id}
              className={btnClass}
              disabled={hasAnswered}
              onClick={() => onSelectAnswer(opt.id)}
            >
              <div className="option-letter">{opt.id}</div>
              <div className="option-text">{opt.text}</div>
            </button>
          );
        })}
      </div>

      {/* Instant Result & Tactical Explanation */}
      {hasAnswered && (
        <div className={`theory-feedback-panel animate-pop ${isCorrect ? 'feedback-success' : 'feedback-error'}`}>
          <div className="feedback-status-row">
            {isCorrect ? (
              <div className="status-label success">
                <CheckCircle2 size={24} />
                <span>CHÍNH XÁC!</span>
              </div>
            ) : (
              <div className="status-label error">
                <XCircle size={24} />
                <span>CHƯA CHÍNH XÁC</span>
                <span className="correct-answer-hint">
                  (Đáp án đúng: <strong>{question.correctAnswer}</strong>)
                </span>
              </div>
            )}

            <button className="next-question-btn" onClick={onNext} autoFocus>
              <span>{roundNumber >= totalRounds ? 'HOÀN THÀNH BÀI TẬP' : 'TIẾP TỤC'}</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="feedback-explanation">
            <strong>Phân tích chiến thuật:</strong>
            <p>{question.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};
