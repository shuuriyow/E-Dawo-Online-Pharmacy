const mongoose = require('mongoose');
const orderItemSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
    quantity: Number,
    price: Number,
    discount: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
