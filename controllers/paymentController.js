// controllers/paymentController.js

// Simulate payment processing
exports.processPayment = async (req, res) => {
    try {
      // Simulate payment process
      const { orderId, amount } = req.body;
  
      // Normally, you would call an external payment API here
  
      res.json({ message: 'Payment processed successfully', orderId, amount });
    } catch (err) {
      res.status(500).json({ message: 'Payment processing error' });
    }
  };
  