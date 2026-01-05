# 👨‍💻 Code IQ

A minimal and efficient quiz platform designed for developers to test their coding knowledge.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://code-iq.netlify.app)

---

## 🚀 Features

* **Custom Themes** – Choose from multiple color schemes.
* **Multi-Language** – Questions covering various programming languages.
* **Randomized Questions** – Every quiz session pulls a random set of questions.
* **Quiz Timer** – Tracked sessions for every quiz.
* **Anti-Cheat** – Built-in measures to ensure fair play.
* **Instant Results** – Immediate performance summary at the end.
* **Smart Review** – Highlights mistakes with the correct solutions.
* **Score History** – View and track your previous results.

---

## 🛠️ Tech Stack

**Frontend**
* React & TypeScript
* Redux Toolkit (State Management)
* React Router (Navigation)
* Tailwind CSS & Headless UI (Styling)

**Backend**
* Express.js
* Prisma ORM
* MongoDB (Database)

---

## 🧠 Technical Challenges & Solutions

### 🛡️ Anti-Cheat
**The Challenge:** Quiz applications are prone to cheating via "inspect element" to find answers, tab switching to search for solutions, or pre-loading questions to bypass timers.

**The Solution:** I implemented a multi-layered security approach:
* **Deferred Loading:** Questions are only fetched after the user acknowledges instructions to prevent early access.
* **Answer Masking:** Correct answers are never sent to the client; they remain secure on the server.
* **Visibility Monitoring:** Event listeners detect if a user exits fullscreen or switches tabs, ending the quiz immediately.
* **Server-Side Validation:** Quiz logic and scoring are processed entirely on the server to prevent score manipulation.

---

## 🧰 Installation & Setup

1. **Clone the repo:** `git clone https://github.com/Zeyaddayman/code-iq.git`
2. **Navigate to server directory:** `cd server`
3. **Install dependencies:** `npm install`
4. **Env Variables:** Create a `.env` file.
5. **Generate the Prisma Client:** `npx prisma generate`
6. **Database Sync:** `npx prisma db push`
7. **Run Dev Server:** `npm run dev`
8. **Navigate to client directory:** `cd ../client`
9. **Install dependencies:** `npm install`
10. **Env Variables:** Create a `.env` file.
11. **Run Dev Server:** `npm run dev`