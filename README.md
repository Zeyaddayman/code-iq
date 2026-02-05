# 👨‍💻 Code IQ

A quiz application to test programmers knowledge of various programming languages. Built with MERN stack, Multiple themes, Timer for each quiz, Result display at the end of the quiz, Highlights incorrect answers with correct solutions, Stores and displays previous quiz results.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://code-iq.netlify.app)

---

## 🚀 Features

* **Custom Themes**
* **Multi-Language** – Questions covering various programming languages.
* **Randomized Questions**
* **Quiz Timer**
* **Anti-Cheat** – Measures to ensure fair play.
* **Instant Results**
* **Review** – Highlights mistakes with the correct solutions.
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

### ⌨️ Keyboard Navigation & Focus Management
**The Challenge:** Keyboard users were unable to stay within the quiz. Pressing Tab on the last item would jump focus out of the quiz and ends it, creating an inaccessible experience.

**The Solution:** I added a focus trap to keep keyboard navigation within the quiz. Now, when users tab past the last option, the focus loops back to the first element, preventing them from accidentally exiting the quiz.

#### **Before: Broken Flow**
![Broken keyboard flow - focus exits the quiz](https://github.com/user-attachments/assets/64c583bc-ba41-43f8-bc5e-817fd413fa76)

*Pressing Tab on the final quiz element would immediately exit the quiz interface.*

#### **After: Fixed with Focus Trap**
![Fixed focus trap in action](https://github.com/user-attachments/assets/87c26c1c-2e2a-4836-9ae4-1a815bbcece9)

*Focus now cycles seamlessly within the quiz container.*

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