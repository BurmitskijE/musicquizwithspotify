import React, { useState, useEffect } from "react";

const Quiz = ({ onQuizComplete }) => {
  const [tracks, setTracks] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchTracks = async () => {
      const token = new URLSearchParams(window.location.hash)
        .get("#access_token");
      const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTracks(data.items || []);
    };
    fetchTracks();
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    if (currentQuestion + 1 < tracks.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onQuizComplete(score);
    }
  };

  if (tracks.length === 0) return <p>Loading tracks...</p>;

  const question = tracks[currentQuestion];
  return (
    <div>
      <h2>Quiz Time!</h2>
      <p>
        Guess the artist of the song: <strong>{question.name}</strong>
      </p>
      <button onClick={() => handleAnswer(true)}>Correct</button>
      <button onClick={() => handleAnswer(false)}>Wrong</button>
    </div>
  );
};

export default Quiz;
