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

### Prerequisites

To run the application locally using Docker (recommended), the following tools are required:

### Required
- **Docker** (version 20+)
- **Docker Compose**
- **Git**

These are sufficient to run the full local development stack (frontend, backend, PostgreSQL, and pgAdmin) without installing any additional runtimes.

### Optional (only needed if running components manually)
- **Node.js 20+** — required only if running the React frontend without Docker  
- **Java 17+** — required only if running the Spring Boot backend without Docker  
- **PostgreSQL 16** — optional, only required if not using Docker  
- **pgAdmin** — optional database administration tool

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

MAIL_USERNAME="<asd>@gmail.com" # for production
MAIL_PASSWORD="password" # for production

BE_URL_PROD="url" # only for production 
```

Before running the local development stack, create an `.env` file in both /client and /infra as shown above.   
For the infra-folder, you can use the example template found in the folder already:

```bash
cp .env.example .env
```

Fill in your own values. The `.env.example` file shows all required variables without exposing secrets. The `GOOGLE_APPLICATION_CREDENTIALS` can be left empty (profile images cannot be uploaded/added when its empty, and mail-service (which registration/login depends on) won't work unless you provide credentials)

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


### Troubleshooting
If you face following errors: ```bash todo-postgres | 2025-12-10 18:47:53.781 EET [121] FATAL: role "todo_user" does not exist```
run ```bashdocker compose -f docker-compose.dev.yaml down -v``` and rerun the docker compose command

Note, that the mail service and image uploading does not work, unless you provide your own credentials to the env. file. 

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
