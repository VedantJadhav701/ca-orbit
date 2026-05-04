from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.models.user import User
from app.models.task import Task
from typing import Any, List

router = APIRouter()

@router.get("/leaderboard")
def get_leaderboard(db: Session = Depends(get_db)) -> Any:
    # Get all users
    users = db.query(User).all()
    
    leaderboard = []
    for user in users:
        # Calculate completed hours and points for the user
        completed_tasks = db.query(Task).filter(Task.owner_id == user.id, Task.completed == True).all()
        hours = sum(task.estimated_time for task in completed_tasks if task.estimated_time)
        points = int(hours * 100) # 1 hour = 100 points
        
        # Simple streak calculation (placeholder for now, can be expanded later)
        streak = min(1 + int(hours / 2), 7) if hours > 0 else 0
        
        # Only include users who have onboarded or have a name
        name = user.full_name or user.email.split('@')[0]
        
        leaderboard.append({
            "id": user.id,
            "name": name,
            "level": user.level or "CA Inter",
            "hours": round(hours, 1),
            "points": points,
            "streak": streak
        })
    
    # Sort by points descending
    leaderboard.sort(key=lambda x: x["points"], reverse=True)
    
    # Add rank
    for i, user_data in enumerate(leaderboard):
        user_data["rank"] = i + 1
        
    return leaderboard
