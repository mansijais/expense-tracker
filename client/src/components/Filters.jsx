import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
} from "@mui/material";

const Filters = ({
  categoryFilter,
  setCategoryFilter,
  dateFilter,
  setDateFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
        }}
      >
        {/* Category Filter */}
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>

          <Select
            value={categoryFilter}
            label="Category"
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
          >
            <MenuItem value="All">
              All Categories
            </MenuItem>

            <MenuItem value="Food">Food</MenuItem>

            <MenuItem value="Transport">
              Transport
            </MenuItem>

            <MenuItem value="Bills">
              Bills
            </MenuItem>

            <MenuItem value="Entertainment">
              Entertainment
            </MenuItem>

            <MenuItem value="Other">
              Other
            </MenuItem>
          </Select>
        </FormControl>

        {/* Date Filter */}
        <FormControl fullWidth>
          <InputLabel>Date Range</InputLabel>

          <Select
            value={dateFilter}
            label="Date Range"
            onChange={(e) =>
              setDateFilter(e.target.value)
            }
          >
            <MenuItem value="all">
              All Dates
            </MenuItem>

            <MenuItem value="thisMonth">
              This Month
            </MenuItem>

            <MenuItem value="lastMonth">
              Last Month
            </MenuItem>

            <MenuItem value="custom">
              Custom Range
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Custom Date Range */}
      {dateFilter === "custom" && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            fullWidth
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(e.target.value)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Filters;