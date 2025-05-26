const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// (Optional) Only allow admins
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Admins only' });
};

// GET all orders for admin, with user and pharmacy info
router.get('/', authenticate, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('pharmacy', 'name');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;