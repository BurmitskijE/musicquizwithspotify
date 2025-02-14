import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopTracksByGenre, getSpotifyGenres } from '../api';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function QuizScreenGenre({ token }) {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [track, setTrack] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const genreList = await getSpotifyGenres(token);
      setGenres(genreList);
    } catch (error) {
      console.error(error);
      setMessage('Fehler beim Laden der Genres.');
    }
  };

  const fetchTrack = async () => {
    try {
      const tracks = await getTopTracksByGenre(token, selectedGenre, 10);
      if (tracks.length === 0) {
        setMessage('Keine Tracks gefunden.');
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
    const correctTitle = selectedTrack.name;
    const titleOptions = [correctTitle];
    let count = 0;
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

  const handleGenreSelection = (genre) => {
    setSelectedGenre(genre);
    fetchTrack();
  };

  const handleAnswer = (selectedOption) => {
    const correctTitle = track.name;
    if (selectedOption === correctTitle) {
      setMessage('Richtig!');
    } else {
      setMessage(`Falsch. Richtig wäre: ${correctTitle}`);
    }
    setTimeout(() => {
      setMessage('');
      fetchTrack();
    }, 3000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', position: 'relative', minHeight: '90vh' }}>
      {!selectedGenre ? (
        <>
          <h2>Wähle ein Genre</h2>
          {genres.map((genre, index) => (
            <button
              key={index}
              onClick={() => handleGenreSelection(genre)}
              style={{ margin: '10px', padding: '10px 20px' }}
            >
              {genre}
            </button>
          ))}
        </>
      ) : (
        <>
          <h2>Errate den Titel</h2>
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
        </>
      )}
      <button onClick={() => navigate('/')} style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', padding: '10px 20px', backgroundColor: '#1DB954', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>Zurück</button>
    </div>
  );
}

export default QuizScreenGenre;