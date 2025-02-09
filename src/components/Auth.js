import React from "react";

const Auth = ({ onLogin }) => {
  const handleLogin = () => {
    const clientId = "a3e1c2e4e1f940fcaea7fc66085bea64";
    const redirectUri = "http://localhost:3000/callback";
    const scopes = "user-read-private user-read-email";
    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes)}`;
    window.location = authUrl;
  };

  return (
    <div>
      <h1>MusicQuiz</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Auth;