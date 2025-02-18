const express = require('express');
const axios = require('axios');
const qs = require('qs');
const router = express.Router();

router.post('/spotify/callback', async (req, res) => {
  const { code } = req.body;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, refresh_token } = response.data;
    // Redirect to frontend with tokens
    res.redirect(`http://localhost:3000?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    console.error('Error during Spotify token exchange:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
