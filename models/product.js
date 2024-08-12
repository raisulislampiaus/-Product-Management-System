const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Product;
