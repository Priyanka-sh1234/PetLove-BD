// // middleware/authMiddleware.js
// function authMiddleware(req, res, next) {
//     // Check if the user is authenticated by checking the session or token (adjust accordingly)
//     if (!req.isAuthenticated()) { // Example: replace with the actual check for your auth strategy (e.g., JWT, Passport)
//       return res.status(401).json({
//         success: false,
//         message: 'You must be logged in to access this resource',
//       });
//     }
  
//     next(); // If authenticated, proceed to the next middleware/route
//   }
  
//   module.exports = authMiddleware;
  