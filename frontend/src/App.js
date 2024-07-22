import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/chat';
import Register from './components/Register';
import Login from './components/Login';
import SymptomChecker from './components/SymptomChecker';
import ProtectedRoute from './components/protectedRoutes';
import FirstAid from './components/FirstAidTips';

const App = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ProtectedRoute element={<Chat />} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/first-aid" element={<FirstAid />} />
    </Routes>
);

export default App;
