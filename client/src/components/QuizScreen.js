import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getTopTracks } from '../api';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function QuizScreen({ token }) {
  const [track, setTrack] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTrack();
  }, [token]);

  const fetchTrack = async () => {
    try {
      // Hole die Top-Tracks des Nutzers (10 Titel)
      const tracks = await getTopTracks(token, 10);
      if (tracks.length === 0) {
        setMessage('Keine Top-Tracks gefunden. Versuche es mit einem anderen Account.');
        return;
      }
      // Zufälligen Track auswählen
      const randomIndex = Math.floor(Math.random() * tracks.length);
      const selectedTrack = tracks[randomIndex];
      setTrack(selectedTrack);
      generateOptions(selectedTrack, tracks);
    } catch (error) {
      console.error(error);
      setMessage('Fehler beim Laden des Tracks.');
    }
  };

  const generateOptions = (selectedTrack, tracks) => {
    const correctArtist = selectedTrack.artists.name;
    const artistOptions = [correctArtist];
    let count = 0;
    // Durch mischen der Tracks werden alternative Künstler ermittelt
    const shuffledTracks = shuffleArray([...tracks]);
    for (const trackItem of shuffledTracks) {
      const artistName = trackItem.artists.name;
      if (artistName !== correctArtist && !artistOptions.includes(artistName)) {
        artistOptions.push(artistName);
        count++;
      }
      if (count === 3) break;
    }
    setOptions(shuffleArray(artistOptions));
  };

  const handleAnswer = (selectedOption) => {
    if (selectedOption === track.artists.name) {
      setMessage('Richtig!');
    } else {
      setMessage(`Falsch. Richtig wäre: ${track.artists.name}`);
    }
    // Nach 3 Sekunden wird die nächste Frage geladen
    setTimeout(() => {
      setMessage('');
      fetchTrack();
    }, 3000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Errate den Künstler</h2>
      {track && track.preview_url ? (
        <audio src={track.preview_url} controls autoPlay style={{ margin: '20px 0' }} />
      ) : (
        <p>Kein Audio Preview verfügbar.</p>
      )}
      <div>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            style={{ margin: '10px', padding: '10px 20px' }}
          >
            {option}
          </button>
        ))}
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default QuizScreen;