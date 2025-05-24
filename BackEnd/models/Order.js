const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ name: String, quantity: Number }], // or reference to Medicine
  total: Number,
  status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);