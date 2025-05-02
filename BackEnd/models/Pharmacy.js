const mongoose = require('mongoose');
const pharmacySchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String,
    phone: String,
    logo: String,
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Pharmacy', pharmacySchema);