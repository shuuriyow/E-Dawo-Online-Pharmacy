const express = require('express');
const Prescription = require('../models/Prescription');
const User = require('../models/User');
const router = express.Router();

// GET: All prescriptions for a pharmacy (with patient and pharmacy names)
router.get('/', async (req, res) => {
  try {
    const { pharmacy } = req.query;
    if (!pharmacy) {
      return res.status(400).json({ message: 'Pharmacy ID is required' });
    }
    const prescriptions = await Prescription.find({ pharmacy })
      .populate('user', 'name') // <-- Make sure this is present!
      .populate('pharmacy', 'name');
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH: Mark as filled or update status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.json(prescription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;