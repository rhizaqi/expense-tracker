const Income = require("../models/Income");
const User = require("../models/User");

//Add income source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !icon || !amount || !date) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(),
    });

    await newIncome.save();

    res.status(200).json(newIncome);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

//Get all income source
exports.getAllIncome = async (req, res) => {};

//Download income source
exports.downloadIncome = async (req, res) => {};

//Delete income source
exports.deleteIncome = async (req, res) => {};
