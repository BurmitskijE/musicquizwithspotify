import React from "react";
import "./styles.css";

const Home = ({ onLogin }) => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to MusicQuiz</h1>
      <p className="home-subtitle">Test your music knowledge with Spotify!</p>
      <button className="home-button" onClick={onLogin}>Login with Spotify</button>
    </div>
  );
};

export default Home;