import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Register from './components/Register';
import Login from './components/Login';
const App = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/chat' element={<Chat/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
    </Routes>
);

export default App;
