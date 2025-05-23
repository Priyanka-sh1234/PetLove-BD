const Login = require("../../../models/LoginModel");
const { loginValidation } = require("../../../services/loginvalidation");

const login = async (req, res, next) => {
  try {


    // Step 1: Validation
    const loginValues = await loginValidation.ValidateAsync(req.body);
    const { username, password } = loginValues;



    // Step 2: Verify 
    const user = await Login.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Step 3:password matching

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Step 4: response
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { username },
    });
  } catch (error) {
    next(error); 
  }
};

module.exports = login;
