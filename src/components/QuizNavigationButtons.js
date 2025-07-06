import React from 'react';

function QuizNavigationButtons({
  handlePreviousQuestion,
  handleNextQuestion,
  handleSkipQuestion,
  isReviewMode,
  isFirstQuestion,
  isLastQuestion,
}) {
  return (
    <div className="d-flex justify-content-between mt-3">
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={handlePreviousQuestion}
        disabled={isFirstQuestion}
      >
        Previous
      </button>
      <div className="d-flex gap-2">
        {!isReviewMode && (
          <button
            className="btn btn-outline-warning btn-sm"
            onClick={handleSkipQuestion}
            disabled={isLastQuestion}
          >
            Skip
          </button>
        )}
        <button
          className="btn btn-dark btn-sm"
          onClick={handleNextQuestion}
        >
          {isReviewMode ? (isLastQuestion ? 'Back to Results' : 'Next') : (isLastQuestion ? 'Submit Quiz' : 'Next')}
        </button>
      </div>
    </div>
  );
}

export default QuizNavigationButtons;