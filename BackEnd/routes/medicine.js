const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Medicine = require('../models/Medicine');

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/medicines';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Serve images statically
router.use('/images', express.static(path.join(__dirname, '..', 'uploads', 'medicines')));

// GET medicines by pharmacy name
router.get('/pharmacy/:pharmacyName', async (req, res) => {
  try {
    const { pharmacyName } = req.params;
    // Adjust the field name if your Medicine model stores pharmacy as an object or string
    const medicines = await Medicine.find({ pharmacy: pharmacyName });
    res.json(Array.isArray(medicines) ? medicines : []);
  } catch (error) {
    res.status(500).json([]);
  }
});

// GET all medicines
router.get('/', async (req, res) => {
  try {
    const pharmacyId = req.query.pharmacy;

    const query = pharmacyId ? { pharmacy: pharmacyId } : {};

    const medicines = await Medicine.find(query)
      .populate('category', 'name')
      .populate('pharmacy', 'name')
      .populate('discount', 'campaignName discountValue');

    // Add full image URL
    const withImagePath = medicines.map((m) => ({
      ...m._doc,
      imageUrl: m.image ? `${req.protocol}://${req.get('host')}/api/medicines/images/${m.image}` : null,
    }));

    res.status(200).json(withImagePath);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch medicines', error: error.message });
  }
});

// POST: Create medicine
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { category, discount, pharmacy, ...rest } = req.body;
    const imagePath = req.file ? req.file.filename : null;
    const originalImageName = req.file ? req.file.originalname : null;

    const newMedicine = new Medicine({
      ...rest,
      category: category || null,
      discount: discount || null,
      pharmacy: pharmacy || null,
      image: imagePath,
      originalImageName: originalImageName, // <== ADD THIS LINE
    });

    const saved = await newMedicine.save();
    const populated = await saved.populate('category pharmacy discount');

    res.status(201).json({
      ...populated._doc,
      imageUrl: populated.image ? `${req.protocol}://${req.get('host')}/api/medicines/images/${populated.image}` : null,
    });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create medicine', error: error.message });
  }
});

// PUT: Update medicine
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { category, discount, pharmacy, ...rest } = req.body;

    const imagePath = req.file ? req.file.filename : null;
    const originalImageName = req.file ? req.file.originalname : null;
    const updateData = {
      ...rest,
      category: category || null,
      discount: discount || null,
      pharmacy: pharmacy || null,
      ...(imagePath && { image: imagePath }),
      ...(originalImageName && { originalImageName: originalImageName }), // <== ADD
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await Medicine.findByIdAndUpdate(id, updateData, { new: true })
      .populate('category pharmacy discount');

    if (!updated) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json({
      ...updated._doc,
      imageUrl: updated.image ? `${req.protocol}://${req.get('host')}/api/medicines/images/${updated.image}` : null,
    });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update medicine', error: error.message });
  }
});

// DELETE: Remove medicine
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await Medicine.findByIdAndDelete(id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    // Optionally delete the image file
    if (medicine.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', 'medicines', medicine.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete medicine', error: error.message });
  }
});

module.exports = router;
