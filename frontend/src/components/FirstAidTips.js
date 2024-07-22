import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const FirstAid = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSendQuery = async () => {
    setLoading(true);
    setResponse('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        '/api/users/first-aid',
        { query },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponse(res.data.message);
    } catch (error) {
      console.error('Error fetching first aid advice:', error);
      setResponse('Error fetching first aid advice.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendQuery();
    }
  };

  return (
    <div>
      <h1>First Aid</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Describe the situation or symptoms..."
      />
      <button onClick={handleSendQuery} disabled={loading}>
        {loading ? 'Fetching advice...' : 'Get First Aid Advice'}
      </button>
      {response && (
        <div className="response">
          <h2>Advice</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default FirstAid;
