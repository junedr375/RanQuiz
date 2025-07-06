import React from 'react';

function TopicSelector({ fetchQuestions }) {
  return (
    <div className="mb-3">
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
        <button className="btn btn-outline-primary rounded-pill topic-chip" onClick={() => fetchQuestions("history")}>
          History
        </button>
        <button className="btn btn-outline-success rounded-pill topic-chip" onClick={() => fetchQuestions("science")}>
          Science
        </button>
        <button className="btn btn-outline-info rounded-pill topic-chip" onClick={() => fetchQuestions("maths")}>
          Maths
        </button>
        <button className="btn btn-outline-secondary rounded-pill topic-chip" onClick={() => fetchQuestions("geography")}>
          Geography
        </button>
        <button className="btn btn-outline-dark rounded-pill topic-chip" onClick={() => fetchQuestions("evs")}>
          EVS
        </button>
        <button className="btn btn-outline-danger rounded-pill topic-chip" onClick={() => fetchQuestions("gk")}>
          GK
        </button>
        <button className="btn btn-outline-warning rounded-pill topic-chip" onClick={() => fetchQuestions("computers")}>
          Computers
        </button>
      </div>
    </div>
  );
}

export default TopicSelector;
