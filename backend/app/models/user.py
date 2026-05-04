from sqlalchemy import Column, Integer, String, Date, Boolean, Text
from sqlalchemy.orm import relationship
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=True) # Optional for Google users
    full_name = Column(String)
    
    # Auth Providers
    google_id = Column(String, unique=True, index=True, nullable=True)
    avatar_url = Column(String, nullable=True)
    
    # Onboarding & AI Analysis
    level = Column(String)  # CA Foundation, Inter, Final
    attempt_date = Column(Date)
    onboarding_completed = Column(Boolean, default=False)
    survey_data = Column(Text, nullable=True) # Store raw survey JSON
    ai_strategy = Column(Text, nullable=True) # AI generated study plan
    
    tasks = relationship("Task", back_populates="owner")
    progress = relationship("Progress", back_populates="user")
