# 🚀 CA ORBIT - DEPLOYMENT GUIDE

This project is structured for rapid deployment to **Vercel** (Frontend) and **Render/Railway** (Backend).

## 🛠 Prerequisites
- GitHub Repository
- [Vercel Account](https://vercel.com)
- [Render Account](https://render.com) (or Railway)
- PostgreSQL Database (e.g., [Supabase](https://supabase.com) or Render Postgres)

---

## 📡 Backend Deployment (FastAPI) - On Render
1. **Connect Repository**: Link your GitHub repo to Render.
2. **Select Root**: Set `Root Directory` to `backend`.
3. **Environment Variables**:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `SECRET_KEY`: A random long string for JWT.
4. **Build Command**: `pip install -r requirements.txt`
5. **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

---

## 🎨 Frontend Deployment (Next.js) - On Vercel
1. **Connect Repository**: Link your GitHub repo to Vercel.
2. **Select Folder**: Set `Root Directory` to `frontend`.
3. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: The URL of your deployed Backend (e.g., `https://ca-orbit-api.onrender.com`).
4. **Deploy**: Hit the deploy button!

---

## 🏗 Local "Live" Run (Docker)
If you want to run the full stack locally as it would be in production:
```bash
docker-compose up --build
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`

---

## 🎨 Design System: NEO-BRUTALIST
- **YELLOW**: #FFD60A
- **RED**: #FF3B30
- **BORDERS**: 4px solid black
- **SHADOWS**: 12px hard offset

**BUILT FOR THE BRAVE. BUILT FOR CA STUDENTS.**
