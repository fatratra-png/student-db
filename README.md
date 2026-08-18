# Student DB

A student database with a **REST API** (Express + TypeScript + PostgreSQL) and a React frontend.

The API lets you register/login, then list, create and manage students. Every request needs an API key, and `/students` also requires a JWT.

The frontend is just for testing the endpoints (login form, student list, stats).

## Backend

```bash
cd backend
npm run dev   # http://localhost:3000
```

## Frontend

```bash
cd frontend
npm run dev   # http://localhost:5173
```

Default account: `admin@example.com` / `admin123`