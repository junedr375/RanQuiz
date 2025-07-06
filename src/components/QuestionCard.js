
function QuestionCard({ question, currentQuestionIndex, selectedAnswers, handleOptionChange, isReviewMode }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Q{currentQuestionIndex + 1}: {question.text}</h5>
        {question.options && question.options.map((option, oIndex) => {
          const isCorrect = oIndex === question.correctOptionIndex;
          const isSelected = selectedAnswers[question.id] === oIndex;
          const isUserWrong = isSelected && !isCorrect;

          let optionClassName = "form-check-label";
          if (isReviewMode) {
            if (isCorrect) {
              optionClassName += " text-success fw-bold"; // Green for correct answer
            } else if (isUserWrong) {
              optionClassName += " text-danger"; // Red for user's wrong answer
            }
          }

          return (
            <div key={oIndex} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={`question-${question.id}`}
                id={`question-${question.id}-option-${oIndex}`}
                value={oIndex}
                checked={isSelected}
                onChange={() => handleOptionChange(question.id, oIndex)}
                disabled={isReviewMode} // Disable input in review mode
              />
              <label className={optionClassName} htmlFor={`question-${question.id}-option-${oIndex}`}>
                {option}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionCard;
