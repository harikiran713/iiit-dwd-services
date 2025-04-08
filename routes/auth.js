const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

// Hardcoded users for each service
const predefinedUsers = [
  { email: 'canteen@iiitdwd.ac.in', password: '123456', serviceType: 'canteen' },
  { email: 'laundry@iiitdwd.ac.in', password: '123456', serviceType: 'laundromat' },
  { email: 'medical@iiitdwd.ac.in', password: '123456', serviceType: 'medical' },
  { email: 'store@iiitdwd.ac.in', password: '123456', serviceType: 'store' },
  { email: 'milk@iiitdwd.ac.in', password: '123456', serviceType: 'milk' }
];

// Initialize users if they don't exist
router.post('/init', async (req, res) => {
  try {
    for (const user of predefinedUsers) {
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create(user);
      }
    }
    res.status(200).json({ message: 'Users initialized successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error initializing users' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, serviceType: user.serviceType },
      config.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, serviceType: user.serviceType });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;