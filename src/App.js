import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import QuestionCard from './components/QuestionCard';
import QuestionIndicator from './components/QuestionIndicator';
import TopicSelector from './components/TopicSelector';

function App() {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const fetchQuestions = async (selectedTopic) => {
    setShowResults(false);
    setSelectedAnswers({});
    setScore(0);
    setCurrentQuestionIndex(0);
    try {
      const response = await fetch(`http://192.168.1.3:8080/generate-questions?topic=${selectedTopic}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Received questions data:", data);
      setQuestions(data);
      // Scroll to the bottom of the page after questions are loaded, adding a small offset
      window.scrollTo({ top: document.body.scrollHeight + 100, behavior: 'smooth' });
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]);
    }
  };

  const handleOptionChange = (questionId, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz(); // Submit if it's the last question
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkipQuestion = () => {
    // Simply move to the next question without selecting an answer
    handleNextQuestion();
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctOptionIndex) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResults(true);
  };

  const handleResetQuiz = () => {
    setTopic('');
    setQuestions([]);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <div className="App container mt-5">
      <h1 className="mb-4">Quiz Application</h1>

      <TopicSelector
        fetchQuestions={fetchQuestions}
        topic={topic}
        handleTopicChange={handleTopicChange}
      />

      {questions.length > 0 && !showResults && (
        <div className="quiz-section mt-4">
          <QuestionIndicator
            current={currentQuestionIndex}
            total={questions.length}
          />
          <QuestionCard
            question={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswers={selectedAnswers}
            handleOptionChange={handleOptionChange}
          />

          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handlePreviousQuestion}
              disabled={isFirstQuestion}
            >
              Previous
            </button>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-warning btn-sm"
                onClick={handleSkipQuestion}
                disabled={isLastQuestion}
              >
                Skip
              </button>
              <button
                className="btn btn-dark btn-sm"
                onClick={handleNextQuestion}
              >
                {isLastQuestion ? 'Submit Quiz' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showResults && (
        <div className="results-section mt-4 p-3 border rounded bg-light">
          <h2>Quiz Results</h2>
          <p className="lead">You scored {score} out of {questions.length} correct answers!</p>
          <button className="btn btn-outline-info mt-3" onClick={handleResetQuiz}>
            Reset Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;