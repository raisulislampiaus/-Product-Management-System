const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { validationResult, body } = require('express-validator');
const jwtConfig = require('../config/jwtConfig');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  res.status(201).json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn
  });

  res.json({ token });
};

exports.getProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  res.json(user);
};
exports.updateProfile = async (req, res) => {
  try {
    const { name, password, role } = req.body;
    const userId = req.user.id; // Assuming user ID is attached to req.user

    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10); // Hash new password
    if (role) user.role = role;

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
