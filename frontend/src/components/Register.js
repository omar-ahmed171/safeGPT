import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dateOfBirth: '',
        gender: '',
        bloodType: '',
        sleepPatterns: '',
        stressLevels: '',
        height: '',
        weight: '',
        smoking: false,
        alcohol: false,
        recentCheckup: false,
        wheelchair: false,
        emergencyContactName: '',
        emergencyContactRelationship: '',
        emergencyContactPhone: '',
        chronicConditions: '',
        allergies: '',
        medications: '',
        exerciseFrequency: '',
        dietaryPreferences: '',
        healthGoals: '',
        insuranceProvider: '',
        policyNumber: ''
    });

    const navigate = useNavigate();
    const {
        name, email, password, dateOfBirth, gender, bloodType, sleepPatterns, stressLevels, height, weight, smoking, alcohol, recentCheckup, wheelchair, emergencyContactName, emergencyContactRelationship, emergencyContactPhone, chronicConditions, allergies, medications, exerciseFrequency, dietaryPreferences, healthGoals, insuranceProvider, policyNumber
    } = formData;

    const genderOptions = ['Male', 'Female'];
    const bloodTypeOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const sleepPatternsOptions = ['-4h', '4-6h', '6-8h', '8+h'];
    const stressLevelsOptions = ['Low', 'Medium', 'High'];
    const exerciseFrequencyOptions = ['Sedentary', 'Light', 'Moderate', 'Active'];
    const dietaryPreferencesOptions = ['None', 'Vegetarian', 'Vegan', 'Gluten-Free'];

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/register', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/chat');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="register-page">
            {/* <nav className="navbar">
                <ul>
                    <li onClick={() => navigate('/')}>Home</li>
                    <li onClick={() => navigate('/login')}>Login</li>
                    <li onClick={() => navigate('/register')}>Register</li>
                    <li onClick={() => navigate('/symptom-checker')}>Symptom Checker</li>
                    <li onClick={() => navigate('/first-aid')}>First Aid</li>
                </ul>
            </nav> */}
            <div className="register-container">
                <form onSubmit={onSubmit} className="register-form">
                    <h2 className="register-title">Register</h2>
                    <div className="row">
                        <div className="column">
                            <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required className="input-field" />
                            <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required className="input-field" />
                            <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required className="input-field" />
                            <input type="date" name="dateOfBirth" value={dateOfBirth} onChange={onChange} className="input-field" />
                            <select name="gender" value={gender} onChange={onChange} className="select-field">
                                <option value="">Select Gender</option>
                                {genderOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <select name="bloodType" value={bloodType} onChange={onChange} className="select-field">
                                <option value="">Select Blood Type</option>
                                {bloodTypeOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <select name="sleepPatterns" value={sleepPatterns} onChange={onChange} className="select-field">
                                <option value="">Select Sleep Patterns</option>
                                {sleepPatternsOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <select name="stressLevels" value={stressLevels} onChange={onChange} className="select-field">
                                <option value="">Select Stress Levels</option>
                                {stressLevelsOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <input type="text" name="height" value={height} onChange={onChange} placeholder="Height" className="input-field" />
                            <input type="text" name="weight" value={weight} onChange={onChange} placeholder="Weight" className="input-field" />
                        </div>
                        <div className="column">
                            <input type="text" name="chronicConditions" value={chronicConditions} onChange={onChange} placeholder="Chronic Conditions" className="input-field" />
                            <input type="text" name="allergies" value={allergies} onChange={onChange} placeholder="Allergies" className="input-field" />
                            <input type="text" name="medications" value={medications} onChange={onChange} placeholder="Medications" className="input-field" />
                            <select name="exerciseFrequency" value={exerciseFrequency} onChange={onChange} className="select-field">
                                <option value="">Select Exercise Frequency</option>
                                {exerciseFrequencyOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <select name="dietaryPreferences" value={dietaryPreferences} onChange={onChange} className="select-field">
                                <option value="">Select Dietary Preferences</option>
                                {dietaryPreferencesOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <input type="text" name="insuranceProvider" value={insuranceProvider} onChange={onChange} placeholder="Insurance Provider" className="input-field" />
                            <input type="text" name="policyNumber" value={policyNumber} onChange={onChange} placeholder="Policy Number" className="input-field" />
                            <label className="checkbox-label">
                                Smoking:
                                <input type="checkbox" name="smoking" checked={smoking} onChange={e => setFormData({ ...formData, smoking: e.target.checked })} className="checkbox-field" />
                            </label>
                            <label className="checkbox-label">
                                Alcohol:
                                <input type="checkbox" name="alcohol" checked={alcohol} onChange={e => setFormData({ ...formData, alcohol: e.target.checked })} className="checkbox-field" />
                            </label>
                            <label className="checkbox-label">
                                Recent Checkup:
                                <input type="checkbox" name="recentCheckup" checked={recentCheckup} onChange={e => setFormData({ ...formData, recentCheckup: e.target.checked })} className="checkbox-field" />
                            </label>
                            <label className="checkbox-label">
                                Wheelchair:
                                <input type="checkbox" name="wheelchair" checked={wheelchair} onChange={e => setFormData({ ...formData, wheelchair: e.target.checked })} className="checkbox-field" />
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
