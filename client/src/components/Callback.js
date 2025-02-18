import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Callback = () => {
  const location = useLocation();

  useEffect(() => {
    const fetchToken = async () => {
      const code = new URLSearchParams(location.search).get('code');
      if (code) {
        try {
          const response = await axios.post('/api/token', { code });
          const { accessToken } = response.data;
          localStorage.setItem('spotifyAccessToken', accessToken);
          window.location.href = '/';
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      }
    };

    fetchToken();
  }, [location]);

  return <div>Loading...</div>;
};

export default Callback;
