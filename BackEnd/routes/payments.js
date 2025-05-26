const express = require('express');
const Payment = require('../models/Payment');
const Order = require('../models/Order');
const router = express.Router();

// GET payments for a pharmacy (manager only sees his pharmacy)
router.get('/', async (req, res) => {
  try {
    const { pharmacy } = req.query;
    // Find orders for this pharmacy
    const orders = await Order.find({ pharmacy }).select('_id');
    const orderIds = orders.map(order => order._id);

    // Find payments for these orders, populate order for orderId and date
    const payments = await Payment.find({ order: { $in: orderIds } })
      .populate({ path: 'order', select: '_id date' });

    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Create a new payment
router.post('/', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const saved = await payment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// put: Update a payment
router.put('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;