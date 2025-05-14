const express = require('express');
const Medicine = require('../models/Medicine');

const router = express.Router();

// GET all medicines with populated category, pharmacy, and discount
router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find()
      .populate('category', 'name') // Populate category name
      .populate('pharmacy', 'name') // Populate pharmacy name
      .populate('discount', 'campaignName discountValue'); // Populate discount campaignName and discountValue

    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch medicines', error: error.message });
  }
});

// POST: Create a new medicine
router.post('/', async (req, res) => {
  try {
    const { category, discount, pharmacy, ...rest } = req.body;

    const newMedicine = new Medicine({
      ...rest,
      category: category || null, // Set category to null if not provided
      discount: discount || null, // Set discount to null if not provided
      pharmacy: pharmacy || null, // Set pharmacy to null if not provided
    });

    const savedMedicine = await newMedicine.save();
    res.status(201).json(savedMedicine);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create medicine', error: error.message });
  }
});

// PUT: Update an existing medicine
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { category, discount, pharmacy, ...rest } = req.body;

    const updatedMedicine = await Medicine.findByIdAndUpdate(
      id,
      {
        ...rest,
        category: category || null, // Set category to null if not provided
        discount: discount || null, // Set discount to null if not provided
        pharmacy: pharmacy || null, // Set pharmacy to null if not provided
      },
      { new: true }
    );

    if (!updatedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.status(200).json(updatedMedicine);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update medicine', error: error.message });
  }
});

// DELETE: Remove a medicine
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMedicine = await Medicine.findByIdAndDelete(id);
    if (!deletedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete medicine', error: error.message });
  }
});

module.exports = router;