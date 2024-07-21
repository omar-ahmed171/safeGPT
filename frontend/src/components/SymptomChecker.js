import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwtDecode
import '../App.css';

const symptomList = [
  'Fever',
  'Cough',
  'Headache',
  'Sore Throat',
  'Fatigue',
  'Nausea',
  'Vomiting',
  'Diarrhea',
  'Muscle Pain',
  'Shortness of Breath',
];

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('SymptomChecker');
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Log token for debugging

    if (!token) {
      navigate('/login'); // Redirect to login if no token is found
    } else {
      try {
        const decodedProfile = jwtDecode(token);
        console.log('Decoded Profile:', decodedProfile); // Log decoded profile for debugging
        setProfile(decodedProfile);
      } catch (error) {
        console.error('Error decoding token:', error);
        navigate('/login');
      }
    }
  }, [navigate]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedSymptoms((prev) =>
      checked ? [...prev, name] : prev.filter((symptom) => symptom !== name)
    );
  };

  const handleSendSymptoms = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token is found
      return;
    }

    setLoading(true);
    setResponse('');
    try {
      console.log('Selected symptoms:', selectedSymptoms); // Log selected symptoms for debugging
      const res = await axios.post(
        '/api/users/check',
        { profile, symptoms: selectedSymptoms },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Backend response:', res.data); // Log response for debugging
      setResponse(res.data.message);
    } catch (error) {
      console.error('Error submitting symptoms:', error);
      setResponse('Error checking symptoms.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendSymptoms();
    }
  };

  return (
    <div>
      <h1>Symptom Checker</h1>
      <form>
        <div className="symptom-list">
          {symptomList.map((symptom) => (
            <div key={symptom}>
              <input
                type="checkbox"
                name={symptom}
                onChange={handleCheckboxChange}
              />
              <label>{symptom}</label>
            </div>
          ))}
        </div>
        <button type="button" onClick={handleSendSymptoms} disabled={loading}>
          {loading ? 'Checking...' : 'Check Symptoms'}
        </button>
      </form>
      {response && (
        <div className="response">
          <h2>Response</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
