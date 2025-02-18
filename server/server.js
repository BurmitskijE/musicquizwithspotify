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

const apiRouter = require('./src/api');

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

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});