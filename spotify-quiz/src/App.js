import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import GameModeSelection from './components/GameModeSelection';
import GuessArtist from './components/GuessArtist';
import GuessTitle from './components/GuessTitle';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/select-mode" element={<GameModeSelection />} />
                <Route path="/guess-artist" element={<GuessArtist />} />
                <Route path="/guess-title" element={<GuessTitle />} />
            </Routes>
        </Router>
    );
}

export default App;
