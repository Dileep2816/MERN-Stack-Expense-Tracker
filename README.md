# MERN Expense Tracker

A modern single-page Personal Expense Tracker built with the MERN stack. Polished UI/UX with responsive layout, charts, sortable/filterable table, and intuitive form.

## Tech Stack
- Server: Node.js, Express, MongoDB (Mongoose)
- Client: React (Vite), React Router, Axios, Recharts, date-fns

## Structure
```
expense-tracker/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── expenses.js
│   │   ├── components/
│   │   │   ├── FormInput.js
│   │   │   ├── TableRow.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Expenses.js
│   │   ├── utils/
│   │   │   ├── format.js
│   │   ├── App.js
│   │   ├── index.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│
├── server/
│   ├── config/
│   │   ├── db.js
│   ├── models/
│   │   ├── ExpenseModel.js
│   ├── controllers/
│   │   ├── expenseController.js
│   ├── routes/
│   │   ├── expenseRoutes.js
│   ├── index.js
│   ├── package.json
│
├── .gitignore
├── README.md
```

## Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

## Setup
### Server
1. Create server env file `expense-tracker/server/.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/expense_tracker
NODE_ENV=development
```
2. Install deps and run:
```
cd server
npm install
npm run dev
```

### Client
1. Install deps and run:
```
cd client
npm install
npm run dev
```
2. Client expects API at `http://localhost:5000/api`. Override with `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

## Notes
- Aggregation endpoint: `GET /api/expenses/summary?from=YYYY-MM-DD&to=YYYY-MM-DD`
- CRUD endpoints under `/api/expenses`.
