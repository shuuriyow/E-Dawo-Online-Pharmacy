const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: Number,
  batchId: String,
  expiryDate: Date,
  discount: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy' },
  createdAt: { type: Date, default: Date.now }
});
