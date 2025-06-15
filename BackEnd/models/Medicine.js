const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: Number,
  batchId: String,
  expiryDate: Date,
  image: String, // file path
  originalImageName: String, // <== ADD THIS LINE
 category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy' },
  discount: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Medicine', medicineSchema);
