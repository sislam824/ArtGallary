const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: false,
});

module.exports = mongoose.model('Product', ProductSchema);
