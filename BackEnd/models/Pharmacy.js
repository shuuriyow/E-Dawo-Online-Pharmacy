const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  license: { type: String, required: true },
  manager: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  logo: { type: String, required: true }, // Optional field for logo
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pharmacy', pharmacySchema);