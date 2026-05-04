from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.routes.deps import get_current_user
from app.models.task import Task
from app.models.user import User
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
    """Calculate real progress per subject from tasks."""
    subjects = db.query(Task.subject).filter(
        Task.owner_id == current_user.id
    ).distinct().all()
    
    result = []
    for (subject,) in subjects:
        total = db.query(func.count(Task.id)).filter(
            Task.owner_id == current_user.id,
            Task.subject == subject
        ).scalar()
        completed = db.query(func.count(Task.id)).filter(
            Task.owner_id == current_user.id,
            Task.subject == subject,
            Task.completed == True
        ).scalar()
        percentage = round((completed / total * 100), 1) if total > 0 else 0
        result.append({"subject": subject, "percentage": percentage})
    
    return result

@router.get("/summary")
def get_progress_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Calculate real summary stats from tasks."""
    total_tasks = db.query(func.count(Task.id)).filter(
        Task.owner_id == current_user.id
    ).scalar() or 0
    
    completed_tasks = db.query(func.count(Task.id)).filter(
        Task.owner_id == current_user.id,
        Task.completed == True
    ).scalar() or 0
    
    total_hours = db.query(func.coalesce(func.sum(Task.estimated_time), 0)).filter(
        Task.owner_id == current_user.id,
        Task.completed == True
    ).scalar() or 0
    
    overall = round((completed_tasks / total_tasks * 100), 1) if total_tasks > 0 else 0
    
    return {
        "overall_completion": overall,
        "total_hours_studied": round(float(total_hours), 1),
        "current_streak": 0,  # Would need date tracking for real streaks
        "tasks_completed_today": completed_tasks,
        "total_tasks_today": total_tasks,
    }
