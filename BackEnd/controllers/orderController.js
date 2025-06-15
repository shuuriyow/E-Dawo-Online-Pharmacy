const Order = require('../models/Order');
const Pharmacy = require('../models/Pharmacy');

exports.getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('pharmacy', 'name'); // adjust field if needed

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recent orders' });
  }
};