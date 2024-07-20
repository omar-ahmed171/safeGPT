import React from 'react';
import EmergencyProcedures from '../components/EmergencyProcedures';
import SafetyPlans from '../components/SafetyPlans';

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <EmergencyProcedures />
            <SafetyPlans />
        </div>
    );
};

export default Dashboard;
