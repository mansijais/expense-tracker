const express = require("express");
const { v4: uuidv4 } = require("uuid");

const { readExpenses, writeExpenses } = require("../utils/fileHelper");

const router = express.Router();

// GET ALL EXPENSES
router.get("/", async (req, res) => {
  try {
    const expenses = await readExpenses();

    expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses",
    });
  }
});

// CREATE EXPENSE
router.post("/", async (req, res) => {
  try {
    const { amount, category, date, note } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than 0",
      });
    }

    if (!category) {
      return res.status(400).json({
        message: "Category is required",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    if (date > today) {
      return res.status(400).json({
        message: "Future dates are not allowed",
      });
    }

    const expenses = await readExpenses();

    const newExpense = {
      id: uuidv4(),
      amount: Number(amount),
      category,
      date,
      note: note || "",
      createdAt: new Date().toISOString(),
    };

    expenses.push(newExpense);

    await writeExpenses(expenses);

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create expense",
    });
  }
});

// SUMMARY API
router.get("/summary", async (req, res) => {
  try {
    const expenses = await readExpenses();

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // const monthlyExpenses = expenses.filter((expense) => {
    //   const expenseDate = new Date(expense.date);

    //   return (
    //     expenseDate.getMonth() === currentMonth &&
    //     expenseDate.getFullYear() === currentYear
    //   );
    // });
    const monthlyExpenses = expenses;
    const totalSpent = monthlyExpenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0,
    );

    const highestExpense =
      monthlyExpenses.length > 0
        ? Math.max(...monthlyExpenses.map((expense) => Number(expense.amount)))
        : 0;

    const categoryTotals = monthlyExpenses.reduce((acc, expense) => {
      acc[expense.category] =
        Number(acc[expense.category] || 0) + Number(expense.amount);

      return acc;
    }, {});

    res.json({
      totalSpent,
      highestExpense,
      totalEntries: monthlyExpenses.length,
      categoryTotals,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate summary",
    });
  }
});
// UPDATE EXPENSE
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const expenses = await readExpenses();

    const expenseIndex = expenses.findIndex((expense) => expense.id === id);

    if (expenseIndex === -1) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // expenses[expenseIndex] = {
    //   ...expenses[expenseIndex],
    //   ...req.body,
    // };
    expenses[expenseIndex] = {
      ...expenses[expenseIndex],
      ...req.body,
      amount: Number(req.body.amount),
    };
    await writeExpenses(expenses);

    res.json(expenses[expenseIndex]);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update expense",
    });
  }
});

// DELETE EXPENSE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const expenses = await readExpenses();

    const filteredExpenses = expenses.filter((expense) => expense.id !== id);

    await writeExpenses(filteredExpenses);

    res.json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete expense",
    });
  }
});

module.exports = router;
