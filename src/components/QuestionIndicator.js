
function QuestionIndicator({ current, total }) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="question-indicator mb-3">
      <p className="text-muted">Question {current + 1} of {total}</p>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={current + 1}
          aria-valuemin="0"
          aria-valuemax={total}
        ></div>
      </div>
    </div>
  );
}

export default QuestionIndicator;
