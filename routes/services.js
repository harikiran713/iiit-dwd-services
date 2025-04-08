const express = require('express');
const router = express.Router();
const Service = require('../models/service');
const auth = require('../middleware/auth');

// Get all services status
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services' });
  }
});

// Update service status (protected route)
router.put('/:serviceType', auth, async (req, res) => {
  const { serviceType } = req.params;
  const { isOpen } = req.body;
  
  // Check if the user is authorized to update this service
  if (req.user.serviceType !== serviceType) {
    return res.status(403).json({ message: 'Unauthorized to update this service' });
  }

  try {
    const updatedService = await Service.findOneAndUpdate(
      { service: serviceType },
      { isOpen, lastUpdated: new Date() },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service status' });
  }
});

module.exports = router;