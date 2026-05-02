from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship
from backend.app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    
    # Onboarding details
    level = Column(String)  # CA Foundation, Inter, Final
    attempt_date = Column(Date)
    
    tasks = relationship("Task", back_populates="owner")
    progress = relationship("Progress", back_populates="user")
