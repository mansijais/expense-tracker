import { Card, CardContent, Typography, Grid } from "@mui/material";

const SummaryCards = ({ summary }) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const cards = [
    {
      title: "Total Spent",
      value: formatCurrency(summary.totalSpent || 0),
    },
    {
      title: "Highest Expense",
      value: formatCurrency(summary.highestExpense || 0),
    },
    {
      title: "Total Entries",
      value: summary.totalEntries || 0,
    },
  ];
 
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {cards.map((card) => (
        <Grid item xs={12} md={4} key={card.title}>
          <Card
            sx={{
              textAlign: "center",
              py: 2,
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                {card.title}
              </Typography>

              <Typography variant="h4" fontWeight="bold">
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;
