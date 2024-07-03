const Product = require('../models/Product');
const { Op } = require('sequelize');

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, category, price, stock, imageUrl } = req.body;

  try {
    const product = new Product({ name, description, category, price, stock, imageUrl });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all products with sorting, filtering, and pagination
exports.getProducts = async (req, res) => {
  const { sort, filter, page = 1, limit = 100 } = req.query;

  const skip = (page - 1) * limit;
  const sortOption = sort ? { [sort]: 1 } : { createdAt: -1 };
  const filterOptions = filter ? { name: new RegExp(filter, 'i') } : {};

  try {
    const products = await Product.find(filterOptions)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const count = await Product.countDocuments(filterOptions);

    res.json({
      products,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get a product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update a product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, imageUrl } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.imageUrl = imageUrl || product.imageUrl;

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.json({ msg: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
