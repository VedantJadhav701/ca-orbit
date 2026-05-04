import os
import json
import logging
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import google.generativeai as genai

from app.core.database import get_db
from app.routes.deps import get_current_user
from app.models.user import User
from app.schemas.planner import SurveyData, AIStrategyResponse
from app.services import planner

logger = logging.getLogger(__name__)

router = APIRouter()

# Configure Gemini API if key is present
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

@router.post("/generate", response_model=AIStrategyResponse)
def generate_plan(
    survey: SurveyData,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Save survey data and generate AI strategy."""
    # Update user with survey details
    current_user.level = survey.level
    if survey.attempt_date:
        try:
            current_user.attempt_date = datetime.strptime(survey.attempt_date, "%Y-%m-%d").date()
        except ValueError:
            pass
    
    survey_dict = survey.dict()
    current_user.survey_data = json.dumps(survey_dict)
    current_user.onboarding_completed = True
    
    db.commit()
    
    # Generate AI Strategy
    strategy_text = "AI generation unavailable. Please set GEMINI_API_KEY environment variable."
    
    if GEMINI_API_KEY:
        try:
            model = genai.GenerativeModel('gemini-1.5-flash-latest')
            prompt = f"""
            You are an expert Chartered Accountant mentor. Create a custom study strategy for a CA student.
            
            Student Profile:
            - CA Level: {survey.level}
            - Attempt Date: {survey.attempt_date}
            - Weakest Subject: {survey.weakest_subject}
            - Daily Study Hours: {survey.study_hours}
            - Stress Level (1-10): {survey.stress_level}
            
            Based on this profile, generate a comprehensive study strategy. Include:
            1. Which subject they should tackle first and why.
            2. A daily study pattern suggestion.
            3. Specific tips to overcome their weakness in {survey.weakest_subject}.
            4. Advice on managing stress given their current level.
            
            Format the response clearly using Markdown.
            """
            response = model.generate_content(prompt)
            strategy_text = response.text
        except Exception as e:
            logger.error(f"Gemini API error: {e}")
            strategy_text = f"Error generating strategy: {str(e)}"
    else:
        # Fallback to smart mock text
        strategy_text = f"""# Your Personalized Strategy

Based on your profile, here is your game plan:

### 1. Priority Subject
Since your weakest subject is **{survey.weakest_subject}**, we recommend dedicating the first {max(1, int(survey.study_hours * 0.3))} hours of your daily study time to it while your mind is freshest.

### 2. Daily Routine ({survey.study_hours} Hours)
- **Morning Session**: Deep work on {survey.weakest_subject}
- **Afternoon Session**: Balance with a practical subject (e.g., Accounts or Costing)
- **Evening Session**: Review and light reading

### 3. Stress Management
Your stress level is {survey.stress_level}/10. Make sure to take a 10-minute break every hour. Do not compromise on sleep!

*(Note: Add GEMINI_API_KEY to Render environment variables to enable real AI generation)*"""

    current_user.ai_strategy = strategy_text
    db.commit()
    
    # Generate concrete tasks based on the survey
    planner.generate_study_plan(db, current_user, survey_dict)
    
    return {"strategy": strategy_text}

@router.get("/strategy", response_model=AIStrategyResponse)
def get_strategy(
    current_user: User = Depends(get_current_user),
):
    """Get the user's generated AI strategy."""
    if not current_user.ai_strategy:
        return {"strategy": "No strategy found. Please complete the survey."}
    return {"strategy": current_user.ai_strategy}
