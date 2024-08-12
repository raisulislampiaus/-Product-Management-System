const Product = require('../models/product');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
};
// controllers/productController.js

exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 6, search = '', category = '' } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (search) where.name = { [Op.like]: `%${search}%` };
    if (category) where.category = category;

    const products = await Product.findAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, price, stockQuantity, category } = req.body;

  const product = await Product.create({
    name,
    description,
    price,
    stockQuantity,
    category
  });

  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { name, description, price, stockQuantity, category } = req.body;

  await product.update({ name, description, price, stockQuantity, category });

  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  await product.destroy();

  res.json({ message: 'Product deleted' });
};
