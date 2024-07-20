import React, { useState } from 'react';

const Chat = () => {
    const [profile, setProfile] = useState({
        name: '',
        age: '',
        healthConditions: ''
    });
    const [scenario, setScenario] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log('profile:', profile);
            console.log('scenario:', scenario);
            
            // Using fetch to make the POST request
            const response = await fetch('/api/chat/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ profile, scenario })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('data:', data);
            setResponse(data.response);

        } catch (error) {
            console.error('Error fetching ChatGPT response:', error);
            setResponse('Sorry, there was an error.');
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Chat with Assistant</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>User Profile</h3>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Age:
                        <input
                            type="number"
                            value={profile.age}
                            onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Health Conditions:
                        <input
                            type="text"
                            value={profile.healthConditions}
                            onChange={(e) => setProfile({ ...profile, healthConditions: e.target.value })}
                        />
                    </label>
                </div>
                <br />
                <div>
                    <h3>Emergency Scenario</h3>
                    <textarea
                        value={scenario}
                        onChange={(e) => setScenario(e.target.value)}
                        placeholder="Describe the emergency scenario..."
                        rows="4"
                        cols="50"
                    />
                </div>
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </form>
            {response && (
                <div>
                    <h3>Response:</h3>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default Chat;
