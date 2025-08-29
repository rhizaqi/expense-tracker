const Income = require("../models/Income");
const User = require("../models/User");
const xlsx = require("xlsx");

//Add income source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
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
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  // console.log(userId);

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

//Delete income source
exports.deleteIncome = async (req, res) => {
  console.log(req.params.id);

  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Income deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

//Download income source
exports.downloadIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    // Prepare data for excel

    const data = income.map((el) => ({
      Source: el.source,
      Amounth: el.amount,
      Date: el.date,
    }));

    console.log(data);

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx");

    res.download("income_details.xlsx");
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
