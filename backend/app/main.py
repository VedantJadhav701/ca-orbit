from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from app.core.database import Base, engine
from app.models.user import User
from app.models.task import Task
from app.models.progress import Progress
from app.routes import auth, tasks, planner, progress

# Create all tables on startup (safe - only creates if they don't exist)
try:
    Base.metadata.create_all(bind=engine)
    logger.info("✅ Database tables created successfully!")
except Exception as e:
    logger.error(f"❌ Failed to create tables: {e}")

app = FastAPI(title="CA Orbit API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
app.include_router(planner.router, prefix="/planner", tags=["planner"])
app.include_router(progress.router, prefix="/progress", tags=["progress"])

@app.get("/")
async def root():
    return {"message": "Welcome to CA Orbit API"}

@app.get("/health")
async def health():
    """Health check that also verifies DB connectivity."""
    from app.core.database import SessionLocal
    from sqlalchemy import text
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        db.close()
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": str(e)}
