import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";

const ExpenseTable = ({
  expenses,
  onEdit,
  onDelete,
}) => {
  if (!expenses.length) {
    return (
      <Paper sx={{ p: 3 }}>
        No expenses found.
      </Paper>
    );
  }
const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>
                {/* ₹{expense.amount} */}
                {formatCurrency(expense.amount)}
              </TableCell>

              <TableCell>
                {expense.category}
              </TableCell>

              <TableCell>
                {expense.date}
              </TableCell>

              <TableCell>
                {expense.note}
              </TableCell>

              <TableCell>
                <Button
                  size="small"
                  onClick={() =>
                    onEdit(expense)
                  }
                >
                  Edit
                </Button>

                <Button
                  color="error"
                  size="small"
                  onClick={() =>
                    onDelete(expense.id)
                  }
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ExpenseTable;