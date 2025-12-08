# CheckIt - Weekly To-Do App ✅

A full-stack productivity application for creating weekly to-do lists, tracking tasks, and managing history.  
Built with **React + TypeScript + Vite**, **Java Spring Boot**, and **PostgreSQL**.

**Frontend:** Netlify  
**Backend:** Google Cloud Run  
**Database:** Neon PostgreSQL

---

## Features

### Frontend (React + TypeScript + Vite)

- Register & login
- Create weekly to-do lists
- Add, edit, toggle, and delete tasks
- Responsive UI (Tailwind + MUI Joy)
- React Router for navigation

### Backend (Java Spring Boot)

- JWT-based authentication
- CRUD endpoints for users, lists, and todos
- PostgreSQL integration
- CORS configured for Netlify
- Deployed on Google Cloud Run

### Database (PostgreSQL)

- Hosted on Neon
- Serverless + connection pooling
- Automatically created schema

---

## Tech Stack

| Layer     | Technology                                  |
| --------- | ------------------------------------------- |
| Frontend  | React, TypeScript, Vite, MUI Joy, Tailwind  |
| Backend   | Spring Boot (Java 17), Spring Security, JWT |
| Database  | PostgreSQL (Neon)                           |
| Hosting   | Netlify (frontend), Cloud Run (backend)     |
| Local Dev | Docker Compose                              |
| Tooling   | pgAdmin, Docker, Maven                      |

---

## Running Locally (Development)

### 1. Clone the repository

```bash
git clone https://github.com/emmampakarinen/todo-app
cd todo-app
```

### 2. Environment variables

`client/.env`

```bash
VITE_API_URL=http://localhost:8080/api
```

`infra/.env`

```bash
PG_USER=todo_user
PG_PASSWORD=todo_pass
PG_DB=todo_db
PG_PORT=5433

PGADMIN_DEFAULT_EMAIL=admin@local.com
PGADMIN_DEFAULT_PASSWORD=supersecret
PGADMIN_PORT=5050

JWT_SECRET=your-jwt-secret-here-min-32-char
GOOGLE_APPLICATION_CREDENTIALS=add-google-app-credentials
```

`infra/.env`  
Before running the local development stack, create a `.env` file.  
Use the example template:

```bash
cp .env.example .env
```

Fill in your own values. The `.env.example` file shows all required variables without exposing secrets. The `GOOGLE_APPLICATION_CREDENTIALS` can be left empty (profile images cannot be uploaded/added when its empty)

### 3. Start the local development stack

```bash
docker compose -f docker-compose.dev.yaml up --build
```

This starts:

- PostgreSQL
- Spring Boot backend
- React frontend
- pgAdmin

Frontend → http://localhost:5173  
Backend → http://localhost:8080  
pgAdmin → http://localhost:5050

---

# API Endpoints

## Authentication

- POST /api/auth/register
- POST /api/auth/login

## User handling

- POST /api/user/add-profile-image
- PATCH /api/user
- PATCH /api/user/update-user
- PATCH /api/user/change-password
- DELETE /api/user/delete-user
- DELETE /api/user/delete-profile-image

## Todos

- GET /api/todos
- GET /api/lists/{id}/todos
- PATCH /api/todos/{id}/edit
- PATCH /api/todos/{id}/done/{done}
- DELETE /api/todos/{id}

## Lists

- GET /api/lists
- POST /api/lists
- DELETE /api/list/{id}

---

# Future Improvements

- Reordering tasks
- Analytics & progress charts
- Shared lists between users
- Email-based password reset
- Dark mode
- Unit & integration tests

---

# Author

**Emma Pakarinen**
