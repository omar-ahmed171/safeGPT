import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwtDecode
import '../styles/Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login if no token is found
        } else {
            try {
                const decodedProfile = jwtDecode(token);
                console.log('Decoded profile:', decodedProfile); // Log decoded profile for debugging
                setProfile(decodedProfile);
            } catch (error) {
                console.error('Error decoding token:', error);
                navigate('/login');
            }
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login if no token is found
            return;
        }

        if (!profile) {
            console.error('Profile not loaded');
            return;
        }

        try {
            const scenario = input;

            const response = await axios.post(
                '/api/chat/ask',
                { profile, scenario },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Backend response:', response.data); // Log response for debugging
            setMessages([...messages, { text: input, user: true }, { text: response.data.response, user: false }]);
            setInput('');
        } catch (error) {
            console.error('Error generating response', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chat-page">
            <h1 className="chat-title">Chat</h1>
            <div className="chat-box">
                {messages.map((message, index) => (
                    <div key={index} className={message.user ? 'user-message' : 'bot-message'}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="input-field"
                />
                <button onClick={handleSendMessage} className="send-btn">Send</button>
            </div>
        </div>
    );
};

export default Chat;

