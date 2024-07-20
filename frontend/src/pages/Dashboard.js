// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGuestAccess = () => {
    navigate('/guest');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <h1>Welcome to SafeGPT</h1>
      <button onClick={handleGuestAccess}>Enter as Guest</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default LandingPage;
