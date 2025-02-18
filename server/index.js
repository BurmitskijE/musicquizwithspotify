const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.get('/login', (req, res) => {
  const clientId = 'a3e1c2e4e1f940fcaea7fc66085bea64';
  const redirectUri = 'http://localhost:3000/callback';
  const scopes = 'user-read-private user-read-email';
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  res.json({ authUrl });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
