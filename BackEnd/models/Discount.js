const mongoose = require('mongoose');
const discountSchema = new mongoose.Schema({
    name: { type: String, required: true },
    percentage: Number,
    description: String,
    startDate: Date,
    endDate: Date
  });
  module.exports = mongoose.model('Discount', discountSchema);
