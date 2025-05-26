const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Prescription = require('../models/Prescription');
const authenticate = require('../middleware/authenticate');


// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Get all prescriptions
router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.find().sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch prescriptions', error: err.message });
  }
});

// Upload a new prescription
// Upload a new prescription
router.post('/', authenticate, upload.single('prescription'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const prescription = new Prescription({
      imageUrl: `/uploads/${file.filename}`,
      originalFilename: file.originalname,
      fileSize: file.size,
      fileType: file.mimetype,
      user: req.user._id, // <-- Set user from authenticated user!
      status: 'pending'
    });
    await prescription.save();
    res.status(201).json(prescription);
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

// Update prescription status (approve/reject)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.json(prescription);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status', error: err.message });
  }
});

// Delete a prescription
router.delete('/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.json({ message: 'Prescription deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete prescription', error: err.message });
  }
});


// Approve prescription and assign to pharmacy
router.patch('/:id/approve', async (req, res) => {
  try {
    const { pharmacyId } = req.body;
    if (!pharmacyId) {
      return res.status(400).json({ message: 'pharmacyId is required' });
    }
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { status: 'approved', pharmacy: pharmacyId, updatedAt: Date.now() },
      { new: true }
    );
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.json(prescription);
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve prescription', error: err.message });
  }
});

module.exports = router;