const express = require('express');
const Pharmacy = require('../models/Pharmacy');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// GET all pharmacies
router.get('/', async (req, res) => {
  try {
    // Populate manager field with name and email
    const pharmacies = await Pharmacy.find().populate('manager', 'name email');
    res.status(200).json(pharmacies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pharmacies', error: error.message });
  }
});

// GET the pharmacy for the current manager
router.get('/me', authenticate, async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findOne({ manager: req.user.id });
    if (!pharmacy) {
      return res.status(404).json({ message: 'Pharmacy not found for this manager' });
    }
    res.status(200).json(pharmacy);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pharmacy', error: error.message });
  }
});


// POST: Create a new pharmacy
router.post('/', async (req, res) => {
  try {
    const newPharmacy = new Pharmacy({
      ...req.body
      // manager comes from req.body.manager (selected in the form)
    });
    const savedPharmacy = await newPharmacy.save();
    res.status(201).json(savedPharmacy);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create pharmacy', error: error.message });
  }
});

// PUT: Update an existing pharmacy
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPharmacy = await Pharmacy.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPharmacy) {
      return res.status(404).json({ message: 'Pharmacy not found' });
    }
    res.status(200).json(updatedPharmacy);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update pharmacy', error: error.message });
  }
});

// DELETE: Remove a pharmacy
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPharmacy = await Pharmacy.findByIdAndDelete(id);
    if (!deletedPharmacy) {
      return res.status(404).json({ message: 'Pharmacy not found' });
    }
    res.status(200).json({ message: 'Pharmacy deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete pharmacy', error: error.message });
  }
});

module.exports = router;