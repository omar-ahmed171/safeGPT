const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
// connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
//console.log('User Routes:', userRoutes);
app.use('/api/auth', require('./routes/authRoutes'));

// app.use('/api/emergencies', require('./routes/emergencyRoutes'));
// app.use('/api/health', require('./routes/healthRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
