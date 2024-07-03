const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: false,
});

module.exports = mongoose.model('Order', OrderSchema);
