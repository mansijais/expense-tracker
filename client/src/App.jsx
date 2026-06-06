import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";

import API from "./services/api";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import Filters from "./components/Filters";
import SummaryCards from "./components/SummaryCards";
import ExpenseChart from "./components/ExpenseChart";
import CategorySummary from "./components/CategorySummary";
function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({});
  console.log("summary", summary);
  const [loading, setLoading] = useState(false);

  const [editingExpense, setEditingExpense] = useState(null);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("all");

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");
  const getFilteredExpenses = () => {
    let filtered = [...expenses];

    // Category Filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (expense) => expense.category === categoryFilter,
      );
    }

    const now = new Date();

    // This Month
    if (dateFilter === "thisMonth") {
      filtered = filtered.filter((expense) => {
        const d = new Date(expense.date);

        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      });
    }

    // Last Month
    else if (dateFilter === "lastMonth") {
      filtered = filtered.filter((expense) => {
        const d = new Date(expense.date);

        const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;

        const year =
          now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

        return d.getMonth() === lastMonth && d.getFullYear() === year;
      });
    }

    // Custom Range
    else if (dateFilter === "custom" && startDate && endDate) {
      filtered = filtered.filter((expense) => {
        const expenseDate = new Date(expense.date);

        return (
          expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate)
        );
      });
    }

    return filtered;
  };

  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const res = await API.get("/expenses");

      setExpenses(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await API.get("/expenses/summary");

      setSummary(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  const addExpense = async (data) => {
    try {
      await API.post("/expenses", data);

      fetchExpenses();
      fetchSummary();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating expense");
    }
  };

  const updateExpense = async (data) => {
    try {
      await API.put(`/expenses/${editingExpense.id}`, data);

      setEditingExpense(null);

      fetchExpenses();
      fetchSummary();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (data) => {
    if (editingExpense) {
      updateExpense(data);
    } else {
      addExpense(data);
    }
  };

  const deleteExpense = async (id) => {
    const confirmDelete = window.confirm("Delete this expense?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/expenses/${id}`);

      fetchExpenses();
      fetchSummary();
    } catch (error) {
      console.error(error);
    }
  };

  // const filteredExpenses =
  //   categoryFilter === "All"
  //     ? expenses
  //     : expenses.filter((expense) => expense.category === categoryFilter);
  const filteredExpenses = getFilteredExpenses();
  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
      }}
      className="dashboard-container"
    >
      <Typography
        variant="h3"
        // sx={{
        //   textAlign: "center",
        //   my: 4,
        // }}
        className="page-title"
      >
        Expense Tracker
      </Typography>

      <SummaryCards summary={summary} />

      <CategorySummary categoryTotals={summary.categoryTotals} />
      <ExpenseForm
        onSubmit={handleSubmit}
        editingExpense={editingExpense}
        cancelEdit={() => setEditingExpense(null)}
      />

     
      <Filters
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <ExpenseChart categoryTotals={summary.categoryTotals} />

      {loading ? (
        <CircularProgress />
      ) : (
        <ExpenseTable
          expenses={sortedExpenses}
          onEdit={setEditingExpense}
          onDelete={deleteExpense}
        />
      )}
    </Container>
  );
}

export default App;
