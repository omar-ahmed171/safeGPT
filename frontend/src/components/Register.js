// components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        wheelchair: false
    });

    const navigate = useNavigate();
    const { name, email, password, dateOfBirth, gender, bloodType, sleepPatterns, stressLevels, height, weight, smoking, alcohol, recentCheckup, wheelchair } = formData;

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
        <form onSubmit={onSubmit}>
            <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required />
            <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
            <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
            <input type="date" name="dateOfBirth" value={dateOfBirth} onChange={onChange} />
            <input type="text" name="gender" value={gender} onChange={onChange} placeholder="Gender" />
            <input type="text" name="bloodType" value={bloodType} onChange={onChange} placeholder="Blood Type" />
            <input type="text" name="sleepPatterns" value={sleepPatterns} onChange={onChange} placeholder="Sleep Patterns" />
            <input type="text" name="stressLevels" value={stressLevels} onChange={onChange} placeholder="Stress Levels" />
            <input type="text" name="height" value={height} onChange={onChange} placeholder="Height" />
            <input type="text" name="weight" value={weight} onChange={onChange} placeholder="Weight" />
            <label>
                Smoking:
                <input type="checkbox" name="smoking" checked={smoking} onChange={e => setFormData({ ...formData, smoking: e.target.checked })} />
            </label>
            <label>
                Alcohol:
                <input type="checkbox" name="alcohol" checked={alcohol} onChange={e => setFormData({ ...formData, alcohol: e.target.checked })} />
            </label>
            <label>
                Recent Checkup:
                <input type="checkbox" name="recentCheckup" checked={recentCheckup} onChange={e => setFormData({ ...formData, recentCheckup: e.target.checked })} />
            </label>
            <label>
                Wheelchair:
                <input type="checkbox" name="wheelchair" checked={wheelchair} onChange={e => setFormData({ ...formData, wheelchair: e.target.checked })} />
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
