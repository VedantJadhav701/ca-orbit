from pydantic import BaseModel
from typing import Optional

class SurveyData(BaseModel):
    level: str
    attempt_date: str
    weakest_subject: str
    study_hours: int
    stress_level: Optional[int] = 5

class AIStrategyResponse(BaseModel):
    strategy: str
