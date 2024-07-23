import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="landing-container">
      {/* <nav className="navbar">
        <ul>
          <li onClick={handleLogin}>Login</li>
          <li onClick={handleRegister}>Register</li>
          <li onClick={() => navigate('/symptom-checker')}>Symptom Checker</li>
          <li onClick={() => navigate('/first-aid')}>First Aid</li>
        </ul>
      </nav> */}
      <h1 className="landing-title">Welcome to SafeGPT</h1>
      <div className="landing-buttons">
        <button className="landing-btn" onClick={handleLogin}>Login</button>
        <button className="landing-btn" onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default LandingPage;
