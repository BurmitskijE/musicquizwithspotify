import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopTracks } from '../api';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function QuizScreenArtist({ token }) {
  const [track, setTrack] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrack();
  }, [token]);

  const fetchTrack = async () => {
    try {
      const tracks = await getTopTracks(token, 10);
      if (tracks.length === 0) {
        setMessage('Keine Top-Tracks gefunden.');
        return;
      }
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
    const correctArtist = selectedTrack.artists[0].name;
    const artistOptions = [correctArtist];
    let count = 0;
    const shuffledTracks = shuffleArray([...tracks]);
    for (const trackItem of shuffledTracks) {
      const artistName = trackItem.artists[0].name;
      if (artistName !== correctArtist && !artistOptions.includes(artistName)) {
        artistOptions.push(artistName);
        count++;
      }
      if (count === 3) break;
    }
    setOptions(shuffleArray(artistOptions));
  };

  const handleAnswer = (selectedOption) => {
    const correctArtist = track.artists[0].name;
    if (selectedOption === correctArtist) {
      setMessage('Richtig!');
    } else {
      setMessage(`Falsch. Richtig wäre: ${correctArtist}`);
    }
    setTimeout(() => {
      setMessage('');
      fetchTrack();
    }, 3000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', position: 'relative', minHeight: '90vh' }}>
      <h2>Errate den Künstler</h2>
      {track && track.album && track.album.images.length > 0 && (
        <img 
          src={track.album.images[0].url} 
          alt="Album Cover" 
          style={{ width: '200px', borderRadius: '10px', marginBottom: '20px' }}
        />
      )}
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
      <button onClick={() => navigate('/')} style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', padding: '10px 20px', backgroundColor: '#1DB954', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>Zurück</button>
    </div>
  );
}

export default QuizScreenArtist;