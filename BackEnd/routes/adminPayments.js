const express = require('express');
const Payment = require('../models/Payment');
const Order = require('../models/Order');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// Optional: Only allow admins
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Admins only' });
};

// GET all payments for admin, with order, pharmacy, and user info
router.get('/', authenticate, adminOnly, async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate({
        path: 'order',
        populate: [
          { path: 'pharmacy', select: 'name' },
          { path: 'user', select: 'name email' }
        ],
        select: '_id date pharmacy user'
      });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;