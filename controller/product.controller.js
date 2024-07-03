const Product = require('../models/Product');
const { Op } = require('sequelize');

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, category, price, stock } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const product = await Product.create({ name, description, category, price, stock, imageUrl });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products with sorting, filtering, and pagination
exports.getProducts = async (req, res) => {
  const { sort, filter, page = 1, limit = 10 } = req.query;

  const offset = (page - 1) * limit;

  const sortOption = sort ? [[sort, 'ASC']] : [['createdAt', 'DESC']];
  const filterOptions = filter ? { name: { [Op.like]: `%${filter}%` } } : {};

  try {
    const products = await Product.findAndCountAll({
      where: filterOptions,
      order: sortOption,
      limit,
      offset,
    });

    res.json({
      products: products.rows,
      totalItems: products.count,
      totalPages: Math.ceil(products.count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

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
  const { name, description, price, stock } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    await product.update({ name, description, price, stock });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    await product.destroy();

    res.json({ msg: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
