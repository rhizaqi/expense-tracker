const jwt = require("jsonwebtoken");
const user = require("../models/User");

exports.protect = async (req, res, next) => {
  //   console.log("masulk get user");

  let token = req.headers.authorization?.split(" ")[1];

  //   console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }

  //   console.log("pass check token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decoded, `>>>>>>`);

    req.user = await user.findById(decoded.id).select("-passowrd");

    // console.log(req.user,111111111111);

    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Not authorized, token failed", error: error.message });
  }
};