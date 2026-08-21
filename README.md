# Student DB

A full-stack student management application built for a web development course.
It consists of a **React frontend** where users log in and manage a list of
students, an **Express + TypeScript REST API** that enforces authentication,
authorization and input validation, and a **PostgreSQL database**.

## Live Deployment

| Component | Platform | URL |
| --------- | -------- | --- |
| Frontend  | Vercel   | https://student-db-app.vercel.app |
| Backend API | Vercel (serverless) | https://student-db-api-three.vercel.app |
| Database  | Supabase PostgreSQL | managed in the Supabase dashboard |

The app is deployed automatically per environment; the API runs as a Vercel
serverless function (`backend/api/index.ts`) that also creates the schema and
seeds a default admin user on cold start.

## Features

- **Authentication** — register and login with JWT (1-hour expiry), bcrypt-hashed passwords
- **API key protection** — every request must send an `x-api-key` header
- **Student management** — list, create, update, and delete students (JWT required)
- **Statistics** — total students, average/min/max age, and students added in the last 7 days
- **Input validation** — email format, name constraints, age bounds, password strength
- **Uniform error handling** — every endpoint answers with `{ success, data }` or `{ success, message }`

## Tech Stack

| Layer    | Technology                     |
| -------- | ------------------------------ |
| Backend  | Node.js, Express 5, TypeScript |
| Database | PostgreSQL (node-postgres), Supabase |
| Security | JSON Web Tokens, bcrypt        |
| Frontend | React 19, Vite                 |

## Getting Started (local development)

### 1. Configure the backend

Create `backend/.env` (see `backend/.env.example`):

```env
DATABASE_URL = postgresql://user:password@host:5432/postgres
JWT_SECRET = your-strong-jwt-secret
API_KEY = your-strong-api-key
CORS_ORIGIN =
```

Any PostgreSQL instance works; remote hosts are connected to over SSL.

### 2. Run the backend

```bash
cd backend
npm install
npm run dev        # http://localhost:3000
```

On startup the server creates the tables and seeds a default admin user:
`admin@example.com` / `admin123` (change this for any real deployment).

### 3. Run the frontend

Create `frontend/.env` (see `frontend/.env.example`):

```env
VITE_API_KEY = your-strong-api-key
VITE_API_URL = http://localhost:3000
```

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

## API Endpoints

All endpoints require the `x-api-key` header; `/students` also requires
`Authorization: Bearer <token>` obtained from login or register.

| Method | Route             | Purpose                       |
| ------ | ----------------- | ----------------------------- |
| POST   | `/auth/register`  | Create account, returns a JWT |
| POST   | `/auth/login`     | Log in, returns a JWT         |
| GET    | `/students`       | List students                 |
| GET    | `/students/stats` | Students statistics           |
| GET    | `/students/:id`   | Get a single student          |
| POST   | `/students`       | Create a student              |
| PUT    | `/students/:id`   | Update a student              |
| DELETE | `/students/:id`   | Delete a student              |

Example login:

```bash
curl -X POST https://student-db-api-three.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

## Project Structure

```
backend/
  api/index.ts             Serverless entry point (seeds DB, handles requests)
  src/
    app.ts                 Express app and middleware
    server.ts              Entry point for local/Render runs
    config/                DB pool and seed logic
    controllers/           Route handlers
    services/              Business logic and validation
    repositories/          SQL queries
    security/              JWT, password hashing, auth middleware
    types/                 Shared TypeScript types
frontend/
  src/
    api/studentAPI.js      API client (fetch helpers)
    components/            Login form and stats components
    App.jsx                Main application logic and views
render.yaml                Optional blueprint for deploying the API on Render
```

## Deployment Notes

- **Backend on Vercel**: `backend/vercel.json` rewrites all routes to the
  serverless function; production env vars are set in the Vercel dashboard.
- **Frontend on Vercel**: `frontend/vercel.json` serves the Vite build as a
  static SPA; `VITE_API_URL` must point at the deployed API.
- **Database**: use the Supabase **pooler** connection string (IPv4) for
  serverless platforms; direct `db.<ref>.supabase.co` hosts are IPv6-only.
- **Alternative**: `render.yaml` deploys the same API as a long-running Render
  web service (`npm ci && npm run build`, start `npm start`, health check `/health`).
