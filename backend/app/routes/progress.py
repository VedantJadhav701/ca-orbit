from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.routes.deps import get_current_user
from backend.app.models.progress import Progress
from backend.app.models.user import User
from pydantic import BaseModel

router = APIRouter()

class SubjectProgress(BaseModel):
    subject: str
    percentage: float

@router.get("/", response_model=List[SubjectProgress])
def get_progress(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    # In a real app, this would calculate progress from completed tasks vs total tasks
    # For now, returning mock data for the UI
    mock_progress = [
        {"subject": "ACCOUNTING", "percentage": 65.0},
        {"subject": "LAW", "percentage": 28.0},
        {"subject": "COSTING", "percentage": 52.0},
        {"subject": "TAXATION", "percentage": 45.0},
    ]
    return mock_progress

@router.get("/summary")
def get_progress_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return {
        "overall_completion": 42.5,
        "total_hours_studied": 156.0,
        "current_streak": 12,
        "tasks_completed_today": 2,
        "total_tasks_today": 3
    }
