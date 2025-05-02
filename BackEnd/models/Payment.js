const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    method: { type: String, enum: ['card', 'cash', 'mobile'], default: 'cash' },
    status: { type: String, enum: ['paid', 'unpaid', 'refunded'], default: 'unpaid' },
    paidAt: Date
  });
  
  module.exports = mongoose.model('Payment', paymentSchema);
  