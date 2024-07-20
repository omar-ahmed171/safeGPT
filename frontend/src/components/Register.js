import React, { useState } from 'react';
import api from '../api';
import '../styles/Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dateOfBirth: '',
        gender: '',
        medicalConditions: '',
        medications: '',
        allergies: '',
        pastSurgeries: '',
        bloodType: '',
        smoking: false,
        alcohol: false,
        exercise: '',
        dietaryRestrictions: '',
        sleepPatterns: '',
        stressLevels: '',
        height: '',
        weight: '',
        bloodPressure: '',
        heartRate: '',
        recentCheckup: false,
        wheelchair: false,
        emergencyContactName: '',
        emergencyContactRelationship: '',
        emergencyContactPhone: ''
    });

    const {
        name,
        email,
        password,
        dateOfBirth,
        gender,
        medicalConditions,
        medications,
        allergies,
        pastSurgeries,
        bloodType,
        smoking,
        alcohol,
        exercise,
        dietaryRestrictions,
        sleepPatterns,
        stressLevels,
        height,
        weight,
        bloodPressure,
        heartRate,
        recentCheckup,
        wheelchair,
        emergencyContactName,
        emergencyContactRelationship,
        emergencyContactPhone
    } = formData;

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.register(formData);
            // Redirect or handle success
        } catch (error) {
            console.error('Error during registration:', error.response.data.message);
        }
    };

    return (
        <div className="auth-container">
            <h1 className="title">Register</h1>
            <form className="auth-form" onSubmit={onSubmit}>
                <input type="text" name="name" placeholder="Name" className="input-field" value={name} onChange={onChange} />
                <input type="email" name="email" placeholder="Email" className="input-field" value={email} onChange={onChange} />
                <input type="password" name="password" placeholder="Password" className="input-field" value={password} onChange={onChange} />
                <input type="date" name="dateOfBirth" placeholder="Date of Birth" className="input-field" value={dateOfBirth} onChange={onChange} />
                <input type="text" name="gender" placeholder="Gender" className="input-field" value={gender} onChange={onChange} />
                <textarea name="medicalConditions" placeholder="Medical Conditions" className="input-field" value={medicalConditions} onChange={onChange}></textarea>
                <textarea name="medications" placeholder="Medications" className="input-field" value={medications} onChange={onChange}></textarea>
                <textarea name="allergies" placeholder="Allergies" className="input-field" value={allergies} onChange={onChange}></textarea>
                <textarea name="pastSurgeries" placeholder="Past Surgeries" className="input-field" value={pastSurgeries} onChange={onChange}></textarea>
                <select name="bloodType" className="input-field" value={bloodType} onChange={onChange}>
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
                <div className="checkbox-container">
                    <label>
                        Smoking:
                        <input type="checkbox" name="smoking" checked={smoking} onChange={onChange} />
                    </label>
                </div>
                <div className="checkbox-container">
                    <label>
                        Alcohol Use:
                        <input type="checkbox" name="alcohol" checked={alcohol} onChange={onChange} />
                    </label>
                </div>
                <textarea name="exercise" placeholder="Exercise Frequency" className="input-field" value={exercise} onChange={onChange}></textarea>
                <textarea name="dietaryRestrictions" placeholder="Dietary Restrictions" className="input-field" value={dietaryRestrictions} onChange={onChange}></textarea>
                <select name="sleepPatterns" className="input-field" value={sleepPatterns} onChange={onChange}>
                    <option value="">Select Sleep Patterns</option>
                    <option value="Less than 4 hours">Less than 4 hours</option>
                    <option value="4-6 hours">4-6 hours</option>
                    <option value="6-8 hours">6-8 hours</option>
                    <option value="More than 8 hours">More than 8 hours</option>
                </select>
                <select name="stressLevels" className="input-field" value={stressLevels} onChange={onChange}>
                    <option value="">Select Stress Levels</option>
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                    <option value="Very High">Very High</option>
                </select>
                <input type="text" name="height" placeholder="Height" className="input-field" value={height} onChange={onChange} />
                <input type="text" name="weight" placeholder="Weight" className="input-field" value={weight} onChange={onChange} />
                <textarea name="bloodPressure" placeholder="Blood Pressure" className="input-field" value={bloodPressure} onChange={onChange}></textarea>
                <textarea name="heartRate" placeholder="Heart Rate" className="input-field" value={heartRate} onChange={onChange}></textarea>
                <div className="checkbox-container">
                    <label>
                        Recent Health Check-up:
                        <input type="checkbox" name="recentCheckup" checked={recentCheckup} onChange={onChange} />
                    </label>
                </div>
                <div className="checkbox-container">
                    <label>
                        Use Wheelchair:
                        <input type="checkbox" name="wheelchair" checked={wheelchair} onChange={onChange} />
                    </label>
                </div>
                <input type="text" name="emergencyContactName" placeholder="Emergency Contact Name" className="input-field" value={emergencyContactName} onChange={onChange} />
                <input type="text" name="emergencyContactRelationship" placeholder="Emergency Contact Relationship" className="input-field" value={emergencyContactRelationship} onChange={onChange} />
                <input type="text" name="emergencyContactPhone" placeholder="Emergency Contact Phone" className="input-field" value={emergencyContactPhone} onChange={onChange} />
                <button className="btn" type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
