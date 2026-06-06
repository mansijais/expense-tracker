import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const ExpenseChart = ({ categoryTotals }) => {
  const data = Object.entries(categoryTotals || {}).map(([name, value]) => ({
    name,
    value,
  }));
  console.log("categoryTotals", categoryTotals);
  console.log("data", data);
  if (!data.length) return null;

  return (
    <div
      style={{
        width: "100%",
        height: "350px",
        background: "#fff",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer> 
     
    </div>
  );
};

export default ExpenseChart;
