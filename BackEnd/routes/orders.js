const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const orderController = require('../controllers/orderController');


// GET all orders for a pharmacy
router.get('/', async (req, res) => {
  try {
    const { pharmacy } = req.query;
    const orders = await Order.find({ pharmacy }).populate('user');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/recent', orderController.getRecentOrders);


// POST: Create a new order
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update order status
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;