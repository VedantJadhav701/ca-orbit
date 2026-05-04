from datetime import date, timedelta
from typing import List
from app.models.user import User
from app.models.task import Task
from sqlalchemy.orm import Session

def generate_study_plan(db: Session, user: User):
    # Basic logic: Generate 3 tasks per day until exam date
    if not user.attempt_date:
        return []
    
    days_left = (user.attempt_date - date.today()).days
    if days_left <= 0:
        return []
    
    # Mock subject list based on level
    subjects_map = {
        "CA Foundation": ["Accounts", "Law", "Maths", "Economics"],
        "CA Inter": ["Adv Accounts", "Law", "Tax", "Costing", "Audit", "EIS-SM", "FM-Eco"],
        "CA Final": ["FR", "SFM", "Audit", "Law", "SCMPE", "DT", "IDT"]
    }
    
    user_subjects = subjects_map.get(user.level, ["General Study"])
    
    generated_tasks = []
    for i in range(min(days_left, 7)): # Generate for the next 7 days
        study_date = date.today() + timedelta(days=i)
        for subject in user_subjects[:3]: # 3 subjects per day
            task = Task(
                title=f"Revise {subject} - Chapter {i+1}",
                subject=subject,
                estimated_time=2.0,
                owner_id=user.id,
                completed=False
            )
            db.add(task)
            generated_tasks.append(task)
    
    db.commit()
    return generated_tasks
