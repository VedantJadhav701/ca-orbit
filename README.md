# 🚀 CA ORBIT

**Built for the Brave. Built for CA Students.**

CA Orbit is a **free, open-source** AI-powered Mission Command Center designed specifically for Chartered Accountancy (CA) students. The CA journey is notoriously challenging, and CA Orbit is built to help students strategically manage their study hours, tackle weak subjects, and stay motivated through a gamified, real-time community leaderboard.

---

## ✨ Features

- 🧠 **AI Strategy Generation:** Uses Gemini AI to analyze your exam level, study capacity, and weak subjects to generate a customized, daily study plan.
- 🏆 **Real-Time Leaderboard:** Gamified study tracking! Every hour you study translates into points. Watch your rank rise dynamically as you complete tasks.
- 🔐 **Seamless Authentication:** Google SSO and manual email/password login, powered by NextAuth and securely synced with our FastAPI backend.
- 📊 **Mission Dashboard:** Track your daily missions, visualize your subject progress, and monitor your current streak.
- 🎨 **Neo-Brutalist Design:** A bold, high-contrast, premium interface designed to keep you focused and energized.

---

## 🛠 Tech Stack

**Frontend:**
- [Next.js 14](https://nextjs.org/) (React, Tailwind CSS, Framer Motion)
- [NextAuth.js](https://next-auth.js.org/) (Google SSO Integration)

**Backend:**
- [FastAPI](https://fastapi.tiangolo.com/) (Python)
- [PostgreSQL](https://www.postgresql.org/) & [Alembic](https://alembic.sqlalchemy.org/)
- [Gemini AI](https://deepmind.google/technologies/gemini/) (For Strategy Generation)

---

## 🚀 Getting Started (Local Development)

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```
**Environment Variables (`backend/.env`):**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/caorbit
SECRET_KEY=your_super_secret_key
GEMINI_API_KEY=your_gemini_api_key
```
**Run Server:**
```bash
alembic upgrade head
uvicorn app.main:app --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
**Environment Variables (`frontend/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```
**Run Server:**
```bash
npm run dev
```

---

## 🌍 Open Source Mission

This project is entirely open-source and free to use. We believe that technology should empower students, not exploit them. Whether you are a developer looking to contribute, or a CA student looking to optimize your study routine—**Welcome to the Orbit.**

Feel free to fork this repository, open issues, and submit pull requests. Let's build the ultimate study ecosystem for CA students everywhere.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
**Copyright © 2026 Vedant Jadhav. All Rights Reserved.**
