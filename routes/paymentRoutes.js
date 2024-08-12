// routes/paymentRoutes.js

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/process', authMiddleware, paymentController.processPayment);

module.exports = router;
