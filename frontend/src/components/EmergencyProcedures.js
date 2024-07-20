import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmergencyProcedures = () => {
    const [procedures, setProcedures] = useState([]);

    useEffect(() => {
        const fetchProcedures = async () => {
            const { data } = await axios.get('/api/emergencies');
            setProcedures(data);
        };
        fetchProcedures();
    }, []);

    return (
        <div>
            <h2>Emergency Procedures</h2>
            <ul>
                {procedures.map((proc, index) => (
                    <li key={index}>{proc.type}: {proc.procedures.join(', ')}</li>
                ))}
            </ul>
        </div>
    );
};

export default EmergencyProcedures;
