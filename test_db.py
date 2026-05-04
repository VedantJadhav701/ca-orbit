from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os

load_dotenv("backend/.env")
DATABASE_URL = os.getenv("DATABASE_URL")
if "channel_binding" in DATABASE_URL:
    parts = DATABASE_URL.split("?")
    if len(parts) > 1:
        base = parts[0]
        params = [p for p in parts[1].split("&") if not p.startswith("channel_binding")]
        DATABASE_URL = base + ("?" + "&".join(params) if params else "")

print("Connecting to:", DATABASE_URL.split("@")[1])
engine = create_engine(DATABASE_URL)
with engine.begin() as conn:
    try:
        conn.execute(text("ALTER TABLE users ADD COLUMN survey_data TEXT;"))
        print("Added survey_data")
    except Exception as e:
        print("survey_data:", e)
        
    try:
        conn.execute(text("ALTER TABLE users ADD COLUMN ai_strategy TEXT;"))
        print("Added ai_strategy")
    except Exception as e:
        print("ai_strategy:", e)
