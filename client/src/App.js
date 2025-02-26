import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ModeSelection from './components/ModeSelection';
import QuizScreenArtist from './components/QuizScreenArtist';
import QuizScreenTitle from './components/QuizScreenTitle';
import QuizScreenGenre from './components/QuizScreenGenre';
import Callback from './components/Callback';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Token aus den URL-Parametern extrahieren
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    if (accessToken) {
      setToken(accessToken);
      // Redirect to ModeSelection
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  if (!token) {
    return <Login />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/" element={<ModeSelection />} />
        <Route path="/artist" element={<QuizScreenArtist token={token} />} />
        <Route path="/title" element={<QuizScreenTitle token={token} />} />
        <Route path="/genre" element={<QuizScreenGenre token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;