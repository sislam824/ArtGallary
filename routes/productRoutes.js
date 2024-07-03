const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controller/product.controller');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/multerConfig');


const router = express.Router();

// Create a new product
router.post('/addProduct', upload.single('image'), createProduct);

// Get all products with sorting, filtering, and pagination
router.get('/getProduct', getProducts);

// Get a product by ID
router.get('getProduct/:id', getProductById);

// Update a product by ID
router.put('updateProduct/:id', updateProduct);

// Delete a product by ID
router.delete('deleteProduct/:id', deleteProduct);

module.exports = router;
