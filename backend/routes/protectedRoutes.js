// routes/protectedRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// Example protected route
router.get('/dashboard', auth, (req, res) => {
  res.send('Welcome to the dashboard');
});

module.exports = router;
