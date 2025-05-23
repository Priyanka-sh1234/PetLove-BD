// const User = require("../models/User");
// const TokenLogin = require("../models/Jwtmodel");
// const jwt = require("jsonwebtoken")



// const login = async (req, res) => {
//   try {
//     const {email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: "User not registered! Please register first." });
//     }


//     // Check if password matches
//     if (user.password !== password) {
//       return res.status(400).json({ success: false, message: "Incorrect password.Please try again." });
//     }



//     // Create a JWT token

//     const username= user.username

//      const token = jwt.sign({username, email, password},
//           process.env.JWT_SECRET, {
//           expiresIn: process.env.JWT_TIMEOUT,
//         });
    
    
//         const newToken = new TokenLogin({username, email, password, token})
//         await newToken.save()


//     // Send username and email separately
//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       data: {
//         username: user.username,
//         email: user.email,
//         token: token
//       }
//     });

//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// module.exports = login;






// //usermodel

// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   username: { type: String,
//      required: true, },
//   email: {
//      type: String, 
//      required: true,},
//   password: {
//      type: String, 
//      required: true },
// });

// module.exports = mongoose.model("User", UserSchema)



// //token model
// const mongoose = require("mongoose");
// const Jwttoken = new mongoose.Schema({
//     username:{
//         type: String,
//         reuired:true,
//     },
//   email: {
//      type: String, 
//      required: true, 
//     },
//   password: {
//      type: String, 
//      required: true },
//   token:{
//     type: String,
//     required:true
//   }
// });

// module.exports = mongoose.model("Jwttoken", Jwttoken);