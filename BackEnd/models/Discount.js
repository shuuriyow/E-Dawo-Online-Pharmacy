const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  campaignName: { type: String, required: true },
  discountCode: { type: String, required: true, unique: true },
  discountValue: { type: Number, required: true, min: 0, max: 100 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model('Discount', discountSchema);