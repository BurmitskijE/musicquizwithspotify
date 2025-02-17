import React, { useEffect, useState } from 'react';

function WebPlayback({ token, trackUri }) {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Spotify Quiz Player',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            player.connect().then(success => {
                if (success) console.log("🎶 Player erfolgreich verbunden!");
            });

            setPlayer(player);
        };
    }, [token]);

    useEffect(() => {
        if (player && trackUri) {
            player.getCurrentState().then(state => {
                if (!state) return;
                player.play({ uris: [trackUri] }).catch(console.error);
            });
        }
    }, [player, trackUri]);

    return null; // Kein sichtbares UI-Element nötig
}

export default WebPlayback;
