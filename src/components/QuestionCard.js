
function QuestionCard({ question, currentQuestionIndex, selectedAnswers, handleOptionChange }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Q{currentQuestionIndex + 1}: {question.text}</h5>
        {question.options && question.options.map((option, oIndex) => (
          <div key={oIndex} className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={`question-${question.id}`}
              id={`question-${question.id}-option-${oIndex}`}
              value={oIndex}
              checked={selectedAnswers[question.id] === oIndex}
              onChange={() => handleOptionChange(question.id, oIndex)}
            />
            <label className="form-check-label" htmlFor={`question-${question.id}-option-${oIndex}`}>
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
