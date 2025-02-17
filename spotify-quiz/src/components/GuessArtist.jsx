import React, { useEffect, useState } from 'react';
import { getTopTracks } from '../api/spotify';
import WebPlayback from './WebPlayback';

function GuessArtist({ token }) {
    const [track, setTrack] = useState(null);
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        fetchTrack();
    }, [token]);

    const fetchTrack = async () => {
        const tracks = await getTopTracks(token, 10);
        const selectedTrack = tracks[Math.floor(Math.random() * tracks.length)];
        setTrack(selectedTrack);

        const correctArtist = selectedTrack.artists[0].name;
        const artistOptions = [correctArtist, ...tracks.slice(0, 3).map(t => t.artists[0].name)];
        setOptions(artistOptions.sort(() => Math.random() - 0.5));
    };

    const handleAnswer = (selectedOption) => {
        const correctArtist = track.artists[0].name;
        setMessage(selectedOption === correctArtist ? 'Richtig!' : `Falsch! Richtig wäre: ${correctArtist}`);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Errate den Künstler</h2>
            {track && <img src={track.album.images[0].url} alt="Album Cover" width="200px" />}
            {track && <WebPlayback token={token} trackUri={track.uri} />}
            {options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option)}>{option}</button>
            ))}
            {message && <p>{message}</p>}
        </div>
    );
}

export default GuessArtist;
