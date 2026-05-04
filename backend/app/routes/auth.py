from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core import security
from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, Token, User as UserSchema
from typing import Any

router = APIRouter()

@router.post("/register", response_model=UserSchema)
def register(user_in: UserCreate, db: Session = Depends(get_db)) -> Any:
    try:
        user = db.query(User).filter(User.email == user_in.email).first()
        if user:
            raise HTTPException(
                status_code=400,
                detail="The user with this email already exists in the system.",
            )
        db_obj = User(
            email=user_in.email,
            hashed_password=security.get_password_hash(user_in.password),
            full_name=user_in.full_name,
            level=user_in.level,
            attempt_date=user_in.attempt_date,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Registration Error: {str(e)}")

@router.post("/login", response_model=Token)
def login(
    db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    try:
        user = db.query(User).filter(User.email == form_data.username).first()
        if not user or not user.hashed_password or not security.verify_password(form_data.password, user.hashed_password):
            raise HTTPException(status_code=400, detail="Incorrect email or password")
        
        access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
        return {
            "access_token": security.create_access_token(
                user.id, expires_delta=access_token_expires
            ),
            "token_type": "bearer",
            "onboarding_completed": user.onboarding_completed,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Login Error: {str(e)}")

from pydantic import BaseModel
from typing import Optional

class GoogleLogin(BaseModel):
    email: str
    full_name: str
    google_id: str
    avatar_url: Optional[str] = None

@router.post("/google", response_model=Token)
def google_auth(user_data: GoogleLogin, db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.email == user_data.email).first()
        if not user:
            user = User(
                email=user_data.email,
                full_name=user_data.full_name,
                google_id=user_data.google_id,
                avatar_url=user_data.avatar_url,
                onboarding_completed=False
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        
        access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
        return {
            "access_token": security.create_access_token(
                user.id, expires_delta=access_token_expires
            ),
            "token_type": "bearer",
            "onboarding_completed": user.onboarding_completed,
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Google Auth Error: {str(e)}")
