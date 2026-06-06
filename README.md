# Expense Tracker

## Description

This project is a full-stack Expense Tracker application built as part of Exercise 2: Mini Expense Tracker. Users can add, edit, delete, and filter expenses by category and date range. The application also provides spending summaries and category-wise visualization through charts.

## Live Demo

Frontend: 

Backend: 

## Tech Stack

Frontend:

* React
* Material UI
* Recharts
* Axios

Backend:

* Node.js
* Express.js

Database:

*  JSON 

## Features

* Add expenses
* Edit expenses
* Delete expenses
* Category filtering
* Date range filtering
* Expense summaries
* Expense charts
* Currency formatting
* Form validation

## How To Run Locally

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## API Documentation

### Get Expenses

GET /expenses

Response:

```json
[
  {
    "id": 1,
    "amount": 500,
    "category": "Food",
    "date": "2025-06-01",
    "note": "Lunch"
  }
]
```

### Create Expense

POST /expenses

Request:

```json
{
  "amount": 500,
  "category": "Food",
  "date": "2025-06-01",
  "note": "Lunch"
}
```

### Update Expense

PUT /expenses/:id

### Delete Expense

DELETE /expenses/:id

### Summary

GET /expenses/summary

Response:

```json
{
  "totalSpent": 5000,
  "highestExpense": 1500,
  "totalEntries": 10,
  "categoryTotals": {
    "Food": 2500,
    "Transport": 1500,
    "Other": 1000
  }
}
```

## Project Structure

```text
client/
server/
README.md
```

## Next Steps

* Budget per category
* Advanced analytics
* User authentication
* Recurring expenses
* CSV export enhancements
