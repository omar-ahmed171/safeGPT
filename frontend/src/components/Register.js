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
    const { name, email, password, dateOfBirth, gender, bloodType, sleepPatterns, stressLevels, height, weight, smoking, alcohol, recentCheckup, wheelchair, emergencyContactName, emergencyContactRelationship, emergencyContactPhone, chronicConditions, allergies, medications, exerciseFrequency, dietaryPreferences, healthGoals, insuranceProvider, policyNumber } = formData;

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
        <div style={styles.container}>
            <form onSubmit={onSubmit} style={styles.form}>
                <h2 style={styles.header}>Register</h2>
                <div style={styles.row}>
                    <div style={styles.column}>
                        <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required style={styles.input} />
                        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required style={styles.input} />
                        <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required style={styles.input} />
                        <input type="date" name="dateOfBirth" value={dateOfBirth} onChange={onChange} style={styles.input} />

                        <select name="gender" value={gender} onChange={onChange} style={styles.select}>
                            <option value="">Select Gender</option>
                            {genderOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>

                        <select name="bloodType" value={bloodType} onChange={onChange} style={styles.select}>
                            <option value="">Select Blood Type</option>
                            {bloodTypeOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>

                        <select name="sleepPatterns" value={sleepPatterns} onChange={onChange} style={styles.select}>
                            <option value="">Select Sleep Patterns</option>
                            {sleepPatternsOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>

                        <select name="stressLevels" value={stressLevels} onChange={onChange} style={styles.select}>
                            <option value="">Select Stress Levels</option>
                            {stressLevelsOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>

                        <input type="text" name="height" value={height} onChange={onChange} placeholder="Height" style={styles.input} />
                        <input type="text" name="weight" value={weight} onChange={onChange} placeholder="Weight" style={styles.input} />
                    </div>
                    <div style={styles.column}>
                        {/* <input type="text" name="emergencyContactName" value={emergencyContactName} onChange={onChange} placeholder="Emergency Contact Name" style={styles.input} />
                        <input type="text" name="emergencyContactRelationship" value={emergencyContactRelationship} onChange={onChange} placeholder="Emergency Contact Relationship" style={styles.input} />
                        <input type="text" name="emergencyContactPhone" value={emergencyContactPhone} onChange={onChange} placeholder="Emergency Contact Phone" style={styles.input} /> */}

                        <input type="text" name="chronicConditions" value={chronicConditions} onChange={onChange} placeholder="Chronic Conditions" style={styles.input} />
                        <input type="text" name="allergies" value={allergies} onChange={onChange} placeholder="Allergies" style={styles.input} />
                        <input type="text" name="medications" value={medications} onChange={onChange} placeholder="Medications" style={styles.input} />

                        <select name="exerciseFrequency" value={exerciseFrequency} onChange={onChange} style={styles.select}>
                            <option value="">Select Exercise Frequency</option>
                            {exerciseFrequencyOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>

                        <select name="dietaryPreferences" value={dietaryPreferences} onChange={onChange} style={styles.select}>
                            <option value="">Select Dietary Preferences</option>
                            {dietaryPreferencesOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>

                  
                

                        <input type="text" name="insuranceProvider" value={insuranceProvider} onChange={onChange} placeholder="Insurance Provider" style={styles.input} />
                        <input type="text" name="policyNumber" value={policyNumber} onChange={onChange} placeholder="Policy Number" style={styles.input} />

                        <label style={styles.checkboxLabel}>
                            Smoking:
                            <input type="checkbox" name="smoking" checked={smoking} onChange={e => setFormData({ ...formData, smoking: e.target.checked })} style={styles.checkbox} />
                        </label>
                        <label style={styles.checkboxLabel}>
                            Alcohol:
                            <input type="checkbox" name="alcohol" checked={alcohol} onChange={e => setFormData({ ...formData, alcohol: e.target.checked })} style={styles.checkbox} />
                        </label>
                        <label style={styles.checkboxLabel}>
                            Recent Checkup:
                            <input type="checkbox" name="recentCheckup" checked={recentCheckup} onChange={e => setFormData({ ...formData, recentCheckup: e.target.checked })} style={styles.checkbox} />
                        </label>
                        <label style={styles.checkboxLabel}>
                            Wheelchair:
                            <input type="checkbox" name="wheelchair" checked={wheelchair} onChange={e => setFormData({ ...formData, wheelchair: e.target.checked })} style={styles.checkbox} />
                        </label>
                    </div>
                </div>
                <button type="submit" style={styles.button}>Register</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f7f7f7'
    },
    form: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '600px',
        maxHeight: '80vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        marginBottom: '20px',
        textAlign: 'center',
        color: '#333'
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    column: {
        width: '48%',
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px'
    },
    select: {
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px'
    },
    checkboxLabel: {
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        color: '#555'
    },
    checkbox: {
        marginLeft: '10px'
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px'
    }
};

export default Register;
