import React, { useEffect, useState } from 'react';
import { getTopTracks } from '../api/spotify';
import WebPlayback from './WebPlayback';

function GuessTitle({ token }) {
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

        const correctTitle = selectedTrack.name;
        const titleOptions = [correctTitle, ...tracks.slice(0, 3).map(t => t.name)];
        setOptions(titleOptions.sort(() => Math.random() - 0.5));
    };

    const handleAnswer = (selectedOption) => {
        const correctTitle = track.name;
        setMessage(selectedOption === correctTitle ? '✅ Richtig!' : `❌ Falsch! Richtig wäre: ${correctTitle}`);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Errate den Titel</h2>
            {track && <img src={track.album.images[0].url} alt="Album Cover" width="200px" />}
            {track && <WebPlayback token={token} trackUri={track.uri} />}
            {options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option)}>{option}</button>
            ))}
            {message && <p>{message}</p>}
        </div>
    );
}

export default GuessTitle;
