from datetime import date, timedelta
from typing import List
from app.models.user import User
from app.models.task import Task
from sqlalchemy.orm import Session

def generate_study_plan(db: Session, user: User, survey_data: dict):
    """Generate daily tasks based on survey data."""
    if not user.attempt_date:
        return []
        
    days_left = (user.attempt_date - date.today()).days
    if days_left <= 0:
        return []
        
    # Clear existing incomplete tasks if re-generating
    db.query(Task).filter(Task.owner_id == user.id, Task.completed == False).delete()
    db.commit()
    
    # Subjects
    subjects_map = {
        "CA Foundation": ["Accounts", "Law", "Maths", "Economics"],
        "CA Inter": ["Adv Accounts", "Law", "Tax", "Costing", "Audit", "EIS-SM", "FM-Eco"],
        "CA Final": ["FR", "SFM", "Audit", "Law", "SCMPE", "DT", "IDT"]
    }
    
    user_subjects = subjects_map.get(user.level, ["General Study"])
    weakest = survey_data.get("weakest_subject", "")
    
    # Ensure weakest subject is in the list
    if weakest and weakest not in user_subjects:
        user_subjects.insert(0, weakest)
    elif weakest in user_subjects:
        user_subjects.remove(weakest)
        user_subjects.insert(0, weakest)
        
    study_hours = int(survey_data.get("study_hours", 6))
    
    generated_tasks = []
    # Generate tasks for the next 7 days
    for i in range(min(days_left, 7)):
        study_date = date.today() + timedelta(days=i)
        
        # Determine subjects for the day (rotate through them)
        day_subjects = []
        day_subjects.append(user_subjects[0]) # Always include weakest subject
        day_subjects.append(user_subjects[(i + 1) % len(user_subjects)])
        
        # Calculate time split (more time on weakest subject)
        weakest_time = round(study_hours * 0.6, 1)
        other_time = round(study_hours * 0.4, 1)
        
        # Create task 1
        task1 = Task(
            title=f"Deep Dive: {day_subjects[0]}",
            subject=day_subjects[0],
            estimated_time=weakest_time,
            owner_id=user.id,
            completed=False
        )
        db.add(task1)
        generated_tasks.append(task1)
        
        # Create task 2
        task2 = Task(
            title=f"Review: {day_subjects[1]}",
            subject=day_subjects[1],
            estimated_time=other_time,
            owner_id=user.id,
            completed=False
        )
        db.add(task2)
        generated_tasks.append(task2)
        
    db.commit()
    return generated_tasks
