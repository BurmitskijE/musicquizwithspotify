import axios from 'axios';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const SCOPES = process.env.REACT_APP_SPOTIFY_SCOPES;

export const getAuthUrl = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;
    return authUrl;
};

export const getTopTracks = async (token, limit = 10) => {
    const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.items;
};
