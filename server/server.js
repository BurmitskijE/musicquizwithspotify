require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const querystring = require('querystring');

const app = express();
const port = process.env.PORT || 5000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.use(cors());

const apiRouter = require('./src/api');

// Route zum Anmelden bei Spotify
app.get("/login", (req, res) => {
  const scope = "user-read-private user-read-email";
  const authUrl = "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
          response_type: "code",
          client_id: CLIENT_ID,
          scope: scope,
          redirect_uri: REDIRECT_URI,
      });

  res.redirect(authUrl);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  if (!code) {
      return res.redirect("/?error=login_failed");
  }

  try {
      const response = await axios.post("https://accounts.spotify.com/api/token",
          querystring.stringify({
              code: code,
              redirect_uri: REDIRECT_URI,
              grant_type: "authorization_code",
          }), {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  "Authorization": "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
              },
          }
      );

      const accessToken = response.data.access_token;

      if (accessToken) {
          // Falls eine Session oder ein Speicher genutzt wird:
          req.session.access_token = accessToken;

          // KORREKTE WEITERLEITUNG:
          res.redirect("/modeSelection.html");
      } else {
          res.redirect("/?error=invalid_token");
      }
  } catch (error) {
      console.error("Fehler beim Abrufen des Tokens:", error);
      res.redirect("/?error=server_error");
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});