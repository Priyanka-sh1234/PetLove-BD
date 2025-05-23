// middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>
  
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    // Decode and verify the token
    const decoded = jwt.verify(token, 'your-secret-key'); // Use your secret key here
    req.user = decoded; // Attach decoded token (e.g., user id) to the request object
    next(); // Move to the next middleware/handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = verifyToken;
