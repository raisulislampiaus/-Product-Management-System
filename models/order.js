const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user');
const Product = require('./product');

const Order = sequelize.define('Order', {
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed'),
    defaultValue: 'pending'
  }
});

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsToMany(Product, { through: 'OrderProducts' });

module.exports = Order;
