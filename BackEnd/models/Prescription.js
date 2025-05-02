const mongoose = require('mongoose');
const prescriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy' },
    imageUrl: String,
    description: String,
    createdAt: { type: Date, default: Date.now }
  });
  module.exports = mongoose.model('Prescription', prescriptionSchema);
  