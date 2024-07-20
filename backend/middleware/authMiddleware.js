// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('Access denied');
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).send('User not found');
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

module.exports = auth;
