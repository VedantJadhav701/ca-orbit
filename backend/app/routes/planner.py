from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.routes.deps import get_current_user
from app.models.user import User
from app.services import planner
from app.schemas.task import Task as TaskSchema
from typing import List

router = APIRouter()

@router.post("/generate", response_model=List[TaskSchema])
def generate_plan(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    tasks = planner.generate_study_plan(db, current_user)
    if not tasks:
        raise HTTPException(status_code=400, detail="Could not generate plan. Check attempt date.")
    return tasks
