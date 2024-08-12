const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { check } = require('express-validator');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post(
  '/',
  [authMiddleware, adminMiddleware],
  [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price is required').isFloat({ gt: 0 }),
    check('stockQuantity', 'Stock quantity is required').isInt({ min: 0 }),
    check('category', 'Category is required').not().isEmpty()
  ],
  productController.createProduct
);
router.put('/:id', [authMiddleware, adminMiddleware], productController.updateProduct);
router.delete('/:id', [authMiddleware, adminMiddleware], productController.deleteProduct);

module.exports = router;
