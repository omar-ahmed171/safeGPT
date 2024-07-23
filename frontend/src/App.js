import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Register from './components/Register';
import Login from './components/Login';
import SymptomChecker from './components/SymptomChecker';
import ProtectedRoute from './components/protectedRoutes';
import FirstAid from './components/FirstAidTips';
import Navbar from './components/Navbar';
import MedicalDocumentUpload from './components/MedicalDocumentUpload';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/chat" element={<ProtectedRoute element={<Chat />} />} />
                <Route path="/symptom-checker" element={<SymptomChecker />} />
                <Route path="/first-aid" element={<FirstAid />} />
                <Route path="/doc" element={<MedicalDocumentUpload />} />
            </Routes>
        </>
    );
};

export default App;
