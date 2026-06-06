import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Paper,
  Typography,
  Grid,
} from "@mui/material";

const categories = ["Food", "Transport", "Bills", "Entertainment", "Other"];

const ExpenseForm = ({ onSubmit, editingExpense, cancelEdit }) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date,
        note: editingExpense.note,
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(formData.amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    if (!formData.category) {
      alert("Category is required");
      return;
    }
    const today = new Date().toISOString().split("T")[0];

    if (formData.date > today) {
      alert("Future dates are not allowed");
      return;
    }
    // onSubmit(formData);
    onSubmit({
      ...formData,
      amount: Number(formData.amount),
    });

    setFormData({
      amount: "",
      category: "",
      date: "",
      note: "",
    });
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" mb={2}>
        {editingExpense ? "Edit Expense" : "Add Expense"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              //   label="Date"
              type="date"
              inputProps={{
                max: new Date().toISOString().split("T")[0],
              }}
              name="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Note"
              name="note"
              value={formData.note}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <div style={{ marginTop: 16 }}>
          <Button variant="contained" type="submit">
            {editingExpense ? "Update Expense" : "Add Expense"}
          </Button>

          {editingExpense && (
            <Button sx={{ ml: 2 }} variant="outlined" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Paper>
  );
};

export default ExpenseForm;
