const express = require("express");
const cors = require("cors");

const expenseRoutes = require("./routes/expenses");

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "https://expense-tracker-orpin-nine-50.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
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