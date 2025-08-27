const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
  // if (!req.body) {
  //   return res.status(400).json({ message: "Request body is missing" });
  // }

  // so if i didnt insert headers in postman key as Content-Type and value as application/json my test in postman will got error because it cant  destructure property 'fullName' of 'req.body' as it is undefined.

  const { fullName, email, password, profileImageUrl } = req.body;

  // Validation check for missing files
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All field are required" });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create the user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {};

// Get User Info
exports.getUserInfo = async (req, res) => {};
