const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  method: { type: String, enum: ['Credit Card', 'Cash', 'Mobile'], default: 'Cash' },
  status: { type: String, enum: ['Paid', 'Pending', 'Failed'], default: 'Pending' },
  amount: { type: Number, required: true },
  paidAt: Date
});

module.exports = mongoose.model('Payment', paymentSchema);