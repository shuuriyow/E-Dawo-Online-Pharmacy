const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // remove required: true  pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy' },
  imageUrl: { type: String, required: true },
  originalFilename: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'failed'],
    default: 'pending'
  },
  rejectionReason: String,
  fileSize: Number,
  fileType: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

prescriptionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Prescription', prescriptionSchema);