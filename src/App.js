import React, { useState } from "react";
import Auth from "./components/Auth";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Auth onLogin={() => setIsLoggedIn(true)} />
      ) : quizResult === null ? (
        <Quiz onQuizComplete={setQuizResult} />
      ) : (
        <Result result={quizResult} onRestart={() => setQuizResult(null)} />
      )}
    </div>
  );
};

export default App;