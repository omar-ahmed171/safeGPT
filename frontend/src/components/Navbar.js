import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isLoggedIn, handleLogout }) => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item" onClick={() => navigate('/')}>Home</li>
                {isLoggedIn ? (
                    <>
                        <li className="navbar-item" onClick={() => navigate('/chat')}>Chat</li>
                        <li className="navbar-item" onClick={() => navigate('/symptom-checker')}>Symptom Checker</li>
                        <li className="navbar-item" onClick={() => navigate('/first-aid')}>First Aid</li>
                        <li className="navbar-item" onClick={() => navigate('/doc')}>Upload Medical Documents</li>
                        <li className="navbar-item" onClick={handleLogout}>Logout</li>
                    </>
                ) : (
                    <>
                        <li className="navbar-item" onClick={() => navigate('/login')}>Login</li>
                        <li className="navbar-item" onClick={() => navigate('/register')}>Register</li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
