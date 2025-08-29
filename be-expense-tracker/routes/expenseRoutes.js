const express = require("express");

const {
  addExpense,
  getAllExpense,
  downloadExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, downloadExpense);
router.delete("/:id", protect, deleteExpense);

module.exports = router;
