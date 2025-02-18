import React from 'react';

const Login = () => {
  const handleLogin = async () => {
    try {
      window.location.href = 'http://localhost:5000/login';
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h1>Login with Spotify</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;