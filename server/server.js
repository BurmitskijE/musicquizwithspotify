require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const querystring = require('querystring');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.use(cors());

// Route zum Anmelden bei Spotify
app.get('/login', (req, res) => {
  const scope = 'user-top-read user-library-read';
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI
      })
  );
});

// Callback-Route, um den Access-Token zu erhalten
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const authString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  try {
    const tokenResponse = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + authString
      }
    });
    const { access_token, refresh_token } = tokenResponse.data;
    // Leite zum Frontend weiter und übergebe die Tokens als Query-Parameter
    res.redirect(`http://localhost:3000?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    console.error(error);
    res.send('Fehler beim Abrufen der Tokens.');
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});