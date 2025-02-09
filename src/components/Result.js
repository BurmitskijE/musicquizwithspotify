import React from "react";

const Result = ({ result, onRestart }) => (
  <div>
    <h1>Your Score: {result}</h1>
    <button onClick={onRestart}>Play Again</button>
  </div>
);

export default Result;