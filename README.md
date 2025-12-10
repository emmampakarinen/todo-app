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
- **Email verification flow** (user must verify email before the first log in)  
- Create and delete to-do lists  
- Add, edit, toggle, and delete tasks
- Filter todo-list view and tasks
- **Reminder notifications** sent to e-mail when due tasks are approaching  
- Responsive UI (Tailwind + MUI Joy)  
- React Router for navigation  

### Backend (Java Spring Boot)

- JWT-based authentication  
- **Email verification system**:  
  - Generates verification token on registration  
  - Handles token expiry and validation  
  - Activates user after successful verification  
- **Automatic reminder system**:  
  - Scheduled job checks todos with upcoming or overdue deadlines  
  - Sends reminder emails only for tasks not completed and not previously reminded  
  - Updates `reminderSent` flag after sending  
- CRUD endpoints for users, lists, and todos  
- PostgreSQL integration  
- CORS configured for Netlify  
- Deployed on Google Cloud Run

### Database (PostgreSQL)


- Hosted on Neon  
- Serverless + connection pooling  
- Automatically created schema  
- **Email verification fields**:  
  - `verificationToken`  
  - `verificationTokenExpiresAt`  
- **Reminder system fields**:  
  - `dueAt`  
  - `reminderSent`  

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
GOOGLE_APPLICATION_CREDENTIALS=add-google-app-credentials # only for production

BE_URL_PROD="url" # only for production 
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

## API Endpoints

The backend exposes a REST API documented with Swagger/OpenAPI.  
The full, up-to-date list of endpoints can be viewed in Swagger UI at:

- Local: http://localhost:8080/swagger-ui/index.html

The main endpoint groups are:

- **auth-controller**
  - `POST /api/auth/register`
  - `POST /api/auth/login`
- **user-controller**
  - `PATCH /api/user`
  - `PATCH /api/user/update-user`
  - `PATCH /api/user/change-password`
  - `DELETE /api/user/delete-user`
  - `DELETE /api/user/delete-profile-image`
- **todo-list-controller**
  - `POST /api/todos`
  - `GET /api/lists`
  - `POST /api/lists`
  - `PATCH /api/todos/{id}/edit`
  - `PATCH /api/todos/{id}/done/{done}`
  - `GET /api/weeks/{monday}/todos`
  - `GET /api/lists/{id}/todos`
  - `DELETE /api/todos/{id}`
  - `DELETE /api/list/{id}`
- **health-controller**
  - `GET /api/health`

---

## Future Improvements

- Analytics & progress charts
- Shared lists between users
- Email-based password reset
- Dark mode
- Unit & integration tests

---

## Author

**Emma Pakarinen**
