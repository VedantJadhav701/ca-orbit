from pydantic import BaseModel
from typing import Optional

class TaskBase(BaseModel):
    title: str
    subject: str
    estimated_time: Optional[float] = 1.0

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    subject: Optional[str] = None
    estimated_time: Optional[float] = None
    actual_time: Optional[float] = None
    completed: Optional[bool] = None

class Task(TaskBase):
    id: int
    owner_id: int
    actual_time: float
    completed: bool

    class Config:
        from_attributes = True
