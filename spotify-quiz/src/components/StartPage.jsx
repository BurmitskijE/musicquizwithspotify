import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {
    const navigate = useNavigate();
    
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Willkommen beim Spotify-Quiz!</h1>
            <button onClick={() => navigate('/select-mode')}>Spielmodus wählen</button>
        </div>
    );
}

export default StartPage;
