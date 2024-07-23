import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FirstAid.css';

const scenarioOptions = [
  { label: 'Burn', value: 'burn' },
  { label: 'Cut', value: 'cut' },
  { label: 'Allergic Reaction', value: 'allergic_reaction' },
  { label: 'Fracture', value: 'fracture' },
  { label: 'Poisoning', value: 'poisoning' },
  { label: 'Choking', value: 'choking' },
  { label: 'Heart Attack', value: 'heart_attack' },
  { label: 'Stroke', value: 'stroke' },
  { label: 'Nosebleed', value: 'nosebleed' },
  { label: 'Hypothermia', value: 'hypothermia' },
  { label: 'Heat Stroke', value: 'heat_stroke' },
  { label: 'Snake Bite', value: 'snake_bite' },
  { label: 'Drowning', value: 'drowning' },
  { label: 'Severe Bleeding', value: 'severe_bleeding' },
  { label: 'Electric Shock', value: 'electric_shock' },
  { label: 'Head Injury', value: 'head_injury' },
];

const FirstAid = () => {
  const [selectedScenario, setSelectedScenario] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScenarioChange = (e) => {
    setSelectedScenario(e.target.value);
  };

  const handleSendQuery = async () => {
    setLoading(true);
    setResponse('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        '/api/users/first-aid',
        { scenario: selectedScenario },
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

  return (
    <div className="firstaid-container">
      <h1 className="title">First Aid</h1>
      <div className="scenario-selection">
        <h3>Select Scenario</h3>
        <div>
          <select value={selectedScenario} onChange={handleScenarioChange}>
            <option value="">Select Scenario</option>
            {scenarioOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button className="btn" onClick={handleSendQuery} disabled={loading}>
          {loading ? 'Fetching advice...' : 'Get First Aid Advice'}
        </button>
      </div>
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
