import React from 'react';
import { useNavigate } from 'react-router-dom';

function ModeSelection() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Wähle den Spielmodus</h1>
      <button
        style={{ margin: '10px', padding: '10px 20px' }}
        onClick={() => navigate('/artist')}
      >
        Errate den Künstler
      </button>
      <button
        style={{ margin: '10px', padding: '10px 20px' }}
        onClick={() => navigate('/title')}
      >
        Errate den Titel
      </button>
      <button
        style={{ margin: '10px', padding: '10px 20px' }}
        onClick={() => navigate('/genre')}
      >
        Titel nach Genre
      </button>
    </div>
  );
}

export default ModeSelection;