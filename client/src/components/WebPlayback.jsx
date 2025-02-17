import React, { useState, useEffect } from 'react';

const initialTrack = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function WebPlayback({ token, trackUri, isPlayerReady, setIsPlayerReady }) {
    console.log("WebPlayback rendered, token:", token, "trackUri:", trackUri);
    const [isPaused, setPaused] = useState(false);
    const [isActive, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [currentTrack, setTrack] = useState(initialTrack);

    useEffect(() => {
        console.log("WebPlayback useEffect triggered");
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            console.log("Spotify Web Playback SDK Ready");
            const player = new window.Spotify.Player({
                name: 'Music Quiz Web Player',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setIsPlayerReady(true);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', (state => {
                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then(state => { 
                    (!state) ? setActive(false) : setActive(true) 
                });
            }));

            player.connect();
        };

        return () => {
            if (player) {
                player.disconnect();
            }
        };
    }, [token]);

    useEffect(() => {
        console.log("Track change effect triggered", isPlayerReady, player, trackUri);
        if (isPlayerReady && player && trackUri) {
            console.log("Versuche Track abzuspielen:", trackUri);
            player.getCurrentState().then(state => {
                if (!state) {
                    console.error("Player ist nicht bereit");
                    return;
                }
                player.play({
                    uris: [trackUri]
                }).then(() => {
                    console.log("Playback started");
                }).catch(error => {
                    console.error("Playback error:", error);
                });
            });
        } else {
            console.log("Konnte nicht abspielen: Player oder Track nicht verfügbar.");
        }
    }, [isPlayerReady, player, trackUri]);
    
    

    if (!isActive) { 
        console.log("Player not active");
        return null; // Render nothing if not active
    }

    return (
        <div style={{ display: 'none' }}>
            {/* Hidden player controls */}
            <button onClick={() => { player.togglePlay() }}>
                { isPaused ? "Play" : "Pause" }
            </button>
        </div>
    );
}

export default WebPlayback;
