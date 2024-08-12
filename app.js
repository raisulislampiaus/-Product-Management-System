const express = require('express');
const app = express();
const { sequelize } = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
require('dotenv').config();
app.use(express.json());

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
