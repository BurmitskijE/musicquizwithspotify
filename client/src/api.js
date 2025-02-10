import axios from 'axios';

export const getTopTracks = async (token, limit = 10) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.items;
  } catch (error) {
    throw error;
  }
};
