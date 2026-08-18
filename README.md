# Student DB

A full-stack student management application: an Express + TypeScript REST API backed by PostgreSQL, with a React frontend used to exercise the endpoints.

## Features

- **Authentication** — register and login with JWT (1-day expiry), bcrypt-hashed passwords
- **API key protection** — every request must send an `x-api-key` header
- **Student management** — list, create, update, and delete students (JWT required)
- **Statistics** — total, average/min/max age, and students added in the last 7 days
- **Input validation** — email format, name constraints, age bounds, password strength

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Backend    | Node.js, Express 5, TypeScript      |
| Database   | PostgreSQL (node-postgres)          |
| Security   | JSON Web Tokens, bcrypt             |
| Frontend   | React 19, Vite                      |

## Getting Started

### 1. Database

Create a PostgreSQL database and configure the connection in `backend/.env` (see `backend/.env.example`).

### 2. Backend

```bash
cd backend
npm install
npm run dev        # http://localhost:3000
```

On startup the server seeds the schema and a default admin user.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

## API Endpoints

All endpoints require the `x-api-key` header; `/students` also requires `Authorization: Bearer <token>`.

| Method | Route             | Purpose                            |
| ------ | ----------------- | ---------------------------------- |
| POST   | `/auth/register`  | Create account, returns a JWT      |
| POST   | `/auth/login`     | Log in, returns a JWT              |
| GET    | `/students`       | List students                      |
| GET    | `/students/stats` | Students statistics                |
| GET    | `/students/:id`   | Get a single student               |
| POST   | `/students`       | Create a student                   |
| PUT    | `/students/:id`   | Update a student                   |
| DELETE | `/students/:id`   | Delete a student                   |

## Project Structure

```
backend/src/
  app.ts                    Express app and middleware
  server.ts                 Entry point (DB seed + server start)
  config/                   DB pool and seed logic
  controllers/              Route handlers
  services/                 Business logic and validation
  repositories/             SQL queries
  security/                 JWT, password hashing, auth middleware
  types/                    Shared TypeScript types
frontend/src/
  api/                      API client (fetch helpers)
  components/               Login form and stats components
  App.jsx                   Main application logic and views
```

## Default Account

Seeded at startup: `admin@example.com` / `admin123`