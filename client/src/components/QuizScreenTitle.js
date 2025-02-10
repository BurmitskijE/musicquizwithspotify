import React, { useEffect, useState } from 'react';
import { getTopTracks } from '../api';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function QuizScreenTitle({ token }) {
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
        setMessage('Keine Top-Tracks gefunden.');
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
    const correctTitle = selectedTrack.name;
    const titleOptions = [correctTitle];
    let count = 0;
    // Mische die Tracks, um alternative Titel zu ermitteln
    const shuffledTracks = shuffleArray([...tracks]);
    for (const trackItem of shuffledTracks) {
      const titleName = trackItem.name;
      if (titleName !== correctTitle && !titleOptions.includes(titleName)) {
        titleOptions.push(titleName);
        count++;
      }
      if (count === 3) break;
    }
    setOptions(shuffleArray(titleOptions));
  };

  const handleAnswer = (selectedOption) => {
    const correctTitle = track.name;
    if (selectedOption === correctTitle) {
      setMessage('Richtig!');
    } else {
      setMessage(`Falsch. Richtig wäre: ${correctTitle}`);
    }
    // Nach 3 Sekunden wird die nächste Frage geladen
    setTimeout(() => {
      setMessage('');
      fetchTrack();
    }, 3000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Errate den Titel</h2>
      {/* Hintergrund-Audio des zu erratenden Liedes */}
      {track && track.preview_url && (
        <audio src={track.preview_url} autoPlay loop style={{ display: 'none' }} />
      )}
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(option)}
          style={{ margin: '10px', padding: '10px 20px' }}
        >
          {option}
        </button>
      ))}
      {message && <p>{message}</p>}
    </div>
  );
}

export default QuizScreenTitle;
