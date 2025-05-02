const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy' },
    totalPrice: Number,
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
    createdAt: { type: Date, default: Date.now }
  });
  module.exports = mongoose.model('Order', orderSchema);
