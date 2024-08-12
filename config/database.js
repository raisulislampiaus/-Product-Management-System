require('dotenv').config(); // Load environment variables

const { Sequelize } = require('sequelize');

// Create a Sequelize instance with XAMPP MySQL configuration
const sequelize = new Sequelize(process.env.DB_NAME || 'ecommerce_db', // Replace with your database name
                                process.env.DB_USER || 'root',  // Default user for XAMPP MySQL
                                process.env.DB_PASSWORD || '',  // Default password is empty
                                {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  port: process.env.DB_PORT || 3306, // Default port for MySQL
  logging: false, // Set to true if you want to see SQL queries in the console
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Export the sequelize instance
module.exports = { sequelize };
