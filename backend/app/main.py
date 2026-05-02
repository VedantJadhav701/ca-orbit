from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.routes import auth, tasks

app = FastAPI(title="CA Orbit API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(tasks.router, prefix="/tasks", tags=["tasks"])

@app.get("/")
async def root():
    return {"message": "Welcome to CA Orbit API"}
