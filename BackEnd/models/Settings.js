const mongoose = require('mongoose');
const settingsSchema = new mongoose.Schema({
    siteName: String,
    contactEmail: String,
    maintenanceMode: Boolean,
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Settings', settingsSchema);
  