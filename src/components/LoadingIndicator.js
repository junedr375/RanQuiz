import React from 'react';

function LoadingIndicator() {
  return (
    <div className="text-center mt-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Generating questions, please wait...</p>
    </div>
  );
}

export default LoadingIndicator;