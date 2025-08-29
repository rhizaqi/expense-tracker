const Expense = require("../models/Expense");
const Income = require("../models/Income");
const User = require("../models/User");
const xlsx = require("xlsx");

//Add expense source
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    // console.log("test masuk route+ controller");
    const { icon, category, amount, date } = req.body;

    if (!category || !amount || !date) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(),
    });

    await newExpense.save();

    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

//Get all expense source
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  // console.log(userId);

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

//Delete expense source
exports.downloadExpense = async (req, res) => {
  console.log(req.params.id);

  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Income deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

//Download expense source
exports.deleteExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    // Prepare data for excel

    const data = expense.map((el) => ({
      Source: el.source,
      Amounth: el.amount,
      Date: el.date,
    }));

    console.log(data, `pen liat aja`);

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx");

    res.download("expense_details.xlsx");
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
