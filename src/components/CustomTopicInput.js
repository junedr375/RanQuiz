import React from 'react';

function CustomTopicInput({
  fetchQuestions,
  topic,
  handleTopicChange,
}) {
  return (
    <div className="mt-4">
      <label htmlFor="topicInput" className="form-label">Or Enter Custom Topic:</label>
      <input
        type="text"
        className="form-control"
        id="topicInput"
        value={topic}
        onChange={handleTopicChange}
        placeholder="e.g., General Knowledge"
      />
      <button className="btn btn-dark mt-2" onClick={() => fetchQuestions(topic)}>
        Generate Questions from Custom Topic
      </button>
    </div>
  );
}

export default CustomTopicInput;