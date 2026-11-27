# 🧠 QuizApp

A full-stack quiz application built with the MERN stack (MongoDB, Express, React, Node.js). Users can register, login (with email or Google), answer 15 coding questions, and compete on a leaderboard.

🔗 **Live demo:** https://quiz-app-amber-kappa.vercel.app

## 🚀 Features

- User authentication with JWT (email + password, or **Google login**)
- 15 general coding questions
- Score tracking (+5 per correct answer)
- Leaderboard with pagination
- Secure password hashing with bcrypt
- Protected routes with auth middleware
- **Rate limiting** on the auth routes (10 failed or successful requests per IP every 15 minutes)
- **Redis caching** of the quiz questions (1 hour), optional: the app works without Redis
- **Load balancing** setup with Docker Compose: 2 backend instances behind NGINX (round robin) sharing one Redis cache

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Google OAuth 2.0 (`google-auth-library`)
- express-rate-limit
- Redis (`redis` client)

**Frontend:**
- React.js
- React Router DOM
- React Circular Progressbar
- `@react-oauth/google`

**DevOps:**
- Docker + Docker Compose
- NGINX (reverse proxy and load balancer)
- Deployed on Vercel (frontend) and Render (backend), MongoDB Atlas

## 📁 Project Structure
```
quizapp/
├── back/
│   ├── config/
│   │   ├── db.js
│   │   └── redis.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── questionController.js
│   │   └── score.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Question.js
│   │   └── Score.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── auth.js
│   │   ├── questionRoutes.js
│   │   └── scoreRoutes.js
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── seed.js
│   └── server.js
├── front/
│   └── src/
│       ├── pages/
│       │   ├── Sign.js
│       │   ├── Login.js
│       │   ├── Quiz.js
│       │   ├── Scorepage.js
│       │   └── LeaderBoard.js
│       └── styles/
├── docker-compose.yml
└── nginx.conf
```

## ⚙️ Installation

### Backend
```bash
cd back
npm install
```

Create a `.env` file in the `back/` folder:
```
MONGO_URI=mongodb://localhost:27017/Quiz
JWT_SECRET=yourSecretKey
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
REDIS_URL=redis://localhost:6379
```

`REDIS_URL` is optional. Without it, Redis is disabled and the questions are read from MongoDB on every request.

Seed the database:
```bash
node seed.js
```

Start the server:
```bash
node server.js
```

### Frontend
```bash
cd front
npm install
```

Create a `.env` file in the `front/` folder:
```
REACT_APP_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

Then start the app:
```bash
npm start
```

### Google login setup

1. Create a project in the [Google Cloud Console](https://console.cloud.google.com) and configure the OAuth consent screen.
2. Create an **OAuth client ID** of type *Web application*.
3. Add your frontend address (for example `http://localhost:3000`) to the **Authorized JavaScript origins**.
4. Use the Client ID in both `.env` files above.

### Redis (local)

```bash
docker run -d --name quiz-redis -p 6379:6379 redis:alpine
```

## 🐳 Load balancing with Docker Compose

The `docker-compose.yml` at the root starts 4 services: Redis, two identical backend instances (`backend1`, `backend2`, built from `back/Dockerfile`) and NGINX, which receives every request and sends it to one backend after the other (round robin).

```
Client → NGINX (:8080) → backend1 / backend2 → Redis (shared cache) + MongoDB
```

Make sure `back/.env` exists, then run from the project root:
```bash
docker compose up --build
```

The API is then available through NGINX on `http://localhost:8080`. The logs show which backend handled each request, and the Redis cache is shared between the two backends.

To stop everything:
```bash
docker compose down
```

## 🔗 API Routes

All routes are prefixed with `/logic`.

| Method | Route | Description |
|--------|-------|-------------|
| POST | /logic/auth/sign | Register |
| POST | /logic/auth/login | Login |
| POST | /logic/auth/google | Login or register with a Google account |
| GET | /logic/questions/quiz | Get all questions (cached in Redis) |
| POST | /logic/questions/answer | Check answer |
| GET | /logic/score/currentuser | Get user score |
| GET | /logic/score/all | Get leaderboard |

## 🎮 How to Play

1. Register an account, or continue with Google
2. Login
3. Answer 15 coding questions
4. See your final score
5. Check the leaderboard!