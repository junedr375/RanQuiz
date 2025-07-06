import React from 'react';

function QuizResults({
  score,
  totalQuestions,
  handleResetQuiz,
  handleReviewAnswers,
}) {
  return (
    <div className="results-section mt-4 p-3 border rounded bg-light">
      <h2>Quiz Results</h2>
      <p className="lead">You scored {score} out of {totalQuestions} correct answers!</p>
      <div className="d-flex justify-content-center gap-2 mt-3">
        <button className="btn btn-outline-info" onClick={handleResetQuiz}>
          Reset Quiz
        </button>
        <button className="btn btn-primary" onClick={handleReviewAnswers}>
          Review Answers
        </button>
      </div>
    </div>
  );
}

export default QuizResults;