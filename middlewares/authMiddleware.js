// const jwt = require('jsonwebtoken');
// const jwtConfig = require('../config/jwtConfig');

// module.exports = (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ error: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, jwtConfig.secret);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: 'Token is not valid' });
//   }
// };
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

module.exports = (req, res, next) => {
  // Access the Authorization header
  const authHeader = req.headers.authorization;

  // Ensure the header is present and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  // Extract the token from the header
  const token = authHeader.replace('Bearer ', '');

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded; // Attach user information to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // Handle errors in token verification
    res.status(401).json({ error: 'Token is not valid' });
  }
};

