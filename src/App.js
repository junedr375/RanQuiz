import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import QuestionCard from './components/QuestionCard';
import QuestionIndicator from './components/QuestionIndicator';
import TopicSelector from './components/TopicSelector';
import QuizNavigationButtons from './components/QuizNavigationButtons';
import QuizResults from './components/QuizResults';
import LoadingIndicator from './components/LoadingIndicator';

function App() {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isTopicSelectorOpen, setIsTopicSelectorOpen] = useState(true); // New state for collapse
  const [isReviewMode, setIsReviewMode] = useState(false); // New state for review mode

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const fetchQuestions = async (selectedTopic) => {
    setShowResults(false);
    setSelectedAnswers({});
    setScore(0);
    setCurrentQuestionIndex(0);
    setIsLoading(true); // Set loading to true when fetch starts
    setTopic(selectedTopic); // Set the topic state here
    try {
      const response = await fetch(`http://192.168.1.3:8080/generate-questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: selectedTopic }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Received questions data:", data);
      const questionsWithCorrectIndex = data.map(q => ({
        ...q,
        correctOptionIndex: q.options.indexOf(q.answer)
      }));
      setQuestions(questionsWithCorrectIndex);
      window.scrollTo({ top: document.body.scrollHeight + 100, behavior: 'smooth' });
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]);
    } finally {
      setIsLoading(false); // Set loading to false when fetch completes (success or error)
    }
  };

  const handleOptionChange = (questionId, optionIndex) => {
    if (!isReviewMode) { // Only allow changing answers if not in review mode
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: optionIndex,
      });
    }
  };

  const handleNextQuestion = () => {
    if (isReviewMode) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // End of review mode
        setIsReviewMode(false);
        setShowResults(true); // Go back to results page
      }
    } else {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        handleSubmitQuiz(); // Submit if it's the last question
      }
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
    setIsTopicSelectorOpen(true); // Ensure topic selector is open on reset
    setIsReviewMode(false); // Exit review mode on reset
  };

  const toggleTopicSelector = () => {
    setIsTopicSelectorOpen(!isTopicSelectorOpen);
  };

  const handleReviewAnswers = () => {
    setShowResults(false);
    setIsReviewMode(true);
    setCurrentQuestionIndex(0); // Start review from the first question
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <div className="App container mt-5">
      <h1 className="mb-4">Quiz Application</h1>

      {!questions.length > 0 && !isReviewMode && (
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Choose a Topic:</h4>
            <button
              onClick={toggleTopicSelector}
              className="btn btn-link p-0 text-dark"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className={`bi bi-chevron-down ${isTopicSelectorOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </div>
          {isTopicSelectorOpen && (
            <TopicSelector
              fetchQuestions={fetchQuestions}
              topic={topic}
              handleTopicChange={handleTopicChange}
            />
          )}
        </div>
      )}

      {isLoading && <LoadingIndicator />}

      {(questions.length > 0 && !showResults && !isLoading) && (
        <div className="quiz-section mt-4 position-relative">
          <button
            className="btn btn-outline-danger btn-xs position-absolute top-0 end-0 mt-2 me-2"
            onClick={handleResetQuiz}
          >
            Reset Quiz
          </button>
          <QuestionIndicator
            current={currentQuestionIndex}
            total={questions.length}
            topic={topic}
          />
          <QuestionCard
            question={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswers={selectedAnswers}
            handleOptionChange={handleOptionChange}
            isReviewMode={isReviewMode} // Pass isReviewMode to QuestionCard
          />

          <QuizNavigationButtons
            handlePreviousQuestion={handlePreviousQuestion}
            handleNextQuestion={handleNextQuestion}
            handleSkipQuestion={handleSkipQuestion}
            isReviewMode={isReviewMode}
            isFirstQuestion={isFirstQuestion}
            isLastQuestion={isLastQuestion}
          />
        </div>
      )}

      {showResults && (
        <QuizResults
          score={score}
          totalQuestions={questions.length}
          handleResetQuiz={handleResetQuiz}
          handleReviewAnswers={handleReviewAnswers}
        />
      )}
    </div>
  );
}

export default App;
