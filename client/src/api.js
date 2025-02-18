import axios from 'axios';

export const getTopTracks = async (token, limit = 50) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.items;
  } catch (error) {
    throw error;
  }
};

export const getTopTracksByGenre = async (token, genre, limit = 50) => {
  try {
    // Spotify API unterstützt das direkte Abrufen von Top-Tracks nach Genre nicht.
    // Stattdessen muss man die Empfehlungen basierend auf dem Genre nutzen.
    const response = await axios.get(`https://api.spotify.com/v1/recommendations?limit=${limit}&seed_genres=${genre}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.tracks; // Die Funktion gibt ein Array von Tracks zurück
  } catch (error) {
    throw error;
  }
};

export const getSpotifyGenres = async (token) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.genres;
  } catch (error) {
    throw error;
  }
};

export const getSpotifyToken = async (code) => {
  const response = await axios.post('/api/token', { code });
  return response.data;
};