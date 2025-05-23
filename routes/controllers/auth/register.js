// routes/controllers/auth/register.js
const Register = require("../../../models/registerModel");
const { registrationValidation } = require("../../../services/registerValidationSchema");

const register = async (req, res, next) => {
  try {
    // Step 1: Validate the incoming data
    const registerValues = await registrationValidation.validateAsync(req.body);
    const { username, email, password } = registerValues;



    // Step 2: Check if the username already exists
    const userExists = await Register.findOne({ username });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Username already taken",
        data: {username}
      });
    }



    // Step 3: Create a new user
    const newUser = new Register({ username, email, password });
    await newUser.save();



    // Step 4: Response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { username, email },
    });
  }
  
  catch (error) {
    next(error);
  }
};

module.exports = register;

