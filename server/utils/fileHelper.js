const fs = require("fs-extra");
const path = require("path");

const filePath = path.join(__dirname, "../data/expenses.json");

const readExpenses = async () => {
  try {
    const data = await fs.readJson(filePath);
    return data;
  } catch (error) {
    return [];
  }
};

const writeExpenses = async (expenses) => {
  await fs.writeJson(filePath, expenses, {
    spaces: 2,
  });
};

module.exports = {
  readExpenses,
  writeExpenses,
};