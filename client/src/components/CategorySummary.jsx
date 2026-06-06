import { Paper, Typography, Grid, Box } from "@mui/material";

const CategorySummary = ({ categoryTotals }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Spending by Category
      </Typography>

      <Grid container spacing={2}>
        {Object.entries(categoryTotals || {}).map(([category, total]) => (
          <Grid item xs={12} sm={6} md={3} key={category}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                textAlign: "center",
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {category}
              </Typography>

              <Typography variant="h6" fontWeight="bold">
                ₹{Number(total).toLocaleString("en-IN")}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategorySummary;
