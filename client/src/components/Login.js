import React from 'react';

function Login() {
  const handleLogin = () => {
    // Weiterleitung an den Backend-Endpoint, der die Spotify OAuth-Authentifizierung übernimmt
    window.location.href = 'http://localhost:5000/login';
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Music Quiz</h1>
      <button onClick={handleLogin}>Mit Spotify anmelden</button>
    </div>
  );
}

export default Login;
