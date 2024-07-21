// src/pages/Chat.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login if no token is found
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

        try {
            const profile = {
                name: "John Doe",
                age: 30,
                weight: "70kg",
                height: "180cm",
                sex: "Male",
                diseases: "None",
                wheelchair: false,
            };
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
        <div>
            <h1>Chat</h1>
            <div className="chat-box">
                {messages.map((message, index) => (
                    <div key={index} className={message.user ? 'user-message' : 'bot-message'}>
                        {message.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;
