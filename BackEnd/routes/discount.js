const express = require('express');
const Discount = require('../models/Discount');

const router = express.Router();

// GET all discounts
router.get('/', async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch discounts' });
  }
});

// POST a new discount
router.post('/', async (req, res) => {
  try {
    const discount = new Discount(req.body);
    await discount.save();
    res.status(201).json(discount);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create discount', details: error.message });
  }
});

// PUT (update) a discount
router.put('/:id', async (req, res) => {
  try {
    const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!discount) return res.status(404).json({ error: 'Discount not found' });
    res.json(discount);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update discount', details: error.message });
  }
});

// DELETE a discount
router.delete('/:id', async (req, res) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);
    if (!discount) return res.status(404).json({ error: 'Discount not found' });
    res.json({ message: 'Discount deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete discount' });
  }
});

module.exports = router;