from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost/caorbit")

# Neon requires sslmode; strip channel_binding if present (psycopg2 doesn't support it)
if "channel_binding" in DATABASE_URL:
    # Remove channel_binding parameter
    parts = DATABASE_URL.split("?")
    if len(parts) > 1:
        base = parts[0]
        params = [p for p in parts[1].split("&") if not p.startswith("channel_binding")]
        DATABASE_URL = base + ("?" + "&".join(params) if params else "")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
