const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { check } = require('express-validator');

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  userController.register
);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile/update', authMiddleware, userController.updateProfile);

module.exports = router;
