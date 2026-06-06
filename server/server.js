const express = require("express");
const cors = require("cors");

const expenseRoutes = require("./routes/expenses");

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Expense Tracker API Running");
});

app.use("/api/expenses", expenseRoutes);

const PORT = 5009;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});