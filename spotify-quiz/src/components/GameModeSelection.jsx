import React from 'react';
import { useNavigate } from 'react-router-dom';

function GameModeSelection() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Wähle deinen Spielmodus</h1>
            <button onClick={() => navigate('/guess-artist')}>Errate den Künstler</button>
            <button onClick={() => navigate('/guess-title')}>Errate den Titel</button>
        </div>
    );
}

export default GameModeSelection;
