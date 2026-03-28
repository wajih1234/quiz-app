# 🧠 QuizApp

A full-stack quiz application built with the MERN stack (MongoDB, Express, React, Node.js). Users can register, login, answer 15 coding questions, and compete on a leaderboard.

## 🚀 Features

- User authentication with JWT
- 15 general coding questions
- Score tracking (+5 per correct answer)
- Leaderboard with pagination
- Secure password hashing with bcrypt
- Protected routes with auth middleware

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

**Frontend:**
- React.js
- React Router DOM
- React Circular Progressbar

## 📁 Project Structure
```
quizapp/
├── back/
│   ├── config/
│   │   └── db.js
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
│   ├── seed.js
│   └── server.js
└── front/
    └── src/
        ├── pages/
        │   ├── Sign.js
        │   ├── Login.js
        │   ├── Quiz.js
        │   ├── Scorepage.js
        │   └── LeaderBoard.js
        └── styles/
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
```

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
npm start
```

## 🔗 API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/sign | Register |
| POST | /api/auth/login | Login |
| GET | /api/questions/quiz | Get all questions |
| POST | /api/questions/answer | Check answer |
| GET | /api/score/currentuser | Get user score |
| GET | /api/score/all | Get leaderboard |

## 🎮 How to Play

1. Register an account
2. Login
3. Answer 15 coding questions
4. See your final score
5. Check the leaderboard!