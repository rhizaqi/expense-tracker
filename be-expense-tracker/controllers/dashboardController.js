const Income = require("../models/Income");
const Expense = require("../models/Expense");

const { isValidObjectId, Types } = require("mongoose");

// Dashboard Data

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    const userObjectId = new Types.ObjectId(String(userId));

    // MongoDB skips non-numeric values for $sum. so Use $toDouble
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: { $toDouble: "$amount" } } } },
    ]);

    console.log("totalIncomes", {
      totalIncome,
      userId: isValidObjectId(userId),
    });

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: { $toDouble: "$amount" } } } },
    ]);
    // MongoDB skips non-numeric values for $sum. so Use $toDouble

    console.log("totalExpenses", {
      totalExpense,
      userId: isValidObjectId(userId),
    });

    // Get income transactions in the last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: -1 });

    // Get total income for last 60 days

    const incomesLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, tranaction) => sum + tranaction.amount
    );

    // Get expense transactions in the last 30 days

    const last30DaysExpenseTransactions = await Income.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: -1 });

    // Get total expenses for last 30 days
    const expensesLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, tranaction) => sum + tranaction.amount
    );

    // Fetch last 5 transactions (Income + Expenses)

    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (el) => ({
          ...el.toObject(),
          type: "Income",
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (el) => ({
          ...el.toObject(),
          type: "Expense",
        })
      ),
    ].sort((a, b) => b.date - a.date);

    // Final Response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expensesLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomesLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    console.log(error, `????????????????`);

    res.status(500).json({
      message: "Server error",
    });
  }
};
