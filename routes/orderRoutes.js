const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { check } = require('express-validator');

router.post(
  '/',
  authMiddleware,
  [
    check('productIds', 'Product IDs are required').isArray({ min: 1 }),
    check('totalAmount', 'Total amount is required').isFloat({ gt: 0 })
  ],
  orderController.createOrder
);
router.get('/', authMiddleware, orderController.getAllOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);

module.exports = router;
