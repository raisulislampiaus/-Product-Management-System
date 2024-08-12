const Order = require('../models/order');
const Product = require('../models/product');
const { validationResult } = require('express-validator');

exports.createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { productIds, totalAmount } = req.body;

  const order = await Order.create({
    userId: req.user.id,
    totalAmount,
    status: 'pending'
  });

  const products = await Product.findAll({ where: { id: productIds } });
  await order.addProducts(products);

  res.status(201).json(order);
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findByPk(req.params.id, {
    include: Product
  });
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
};
